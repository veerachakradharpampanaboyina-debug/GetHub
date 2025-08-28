
'use client';

import { Suspense, useState, useRef, useEffect, useCallback } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, LogOut, Settings, Home as HomeIcon, History, Shield, BrainCircuit, Copy, Mic, LoaderCircle, GalleryHorizontal, Languages } from 'lucide-react';
import GethubLogo from '@/components/gethub-logo';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { generateCommunicationFeedback } from '@/ai/flows/generate-communication-feedback';
import { textToSpeech, TextToSpeechInput } from '@/ai/flows/text-to-speech';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { markdownToHtml } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isGenerating?: boolean;
};

// Extend window type to include SpeechRecognition and webkitSpeechRecognition
declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}
const SpeechRecognition =
  (typeof window !== 'undefined' && (window.SpeechRecognition || (window as any).webkitSpeechRecognition));
  
const nativeLanguages = [
  'Telugu', 'Hindi', 'Tamil', 'Kannada', 'Malayalam', 'Bengali', 'Marathi', 'Gujarati', 'Punjabi', 'Spanish', 'French', 'German', 'Mandarin Chinese', 'Japanese', 'Korean', 'Russian'
];

function CommunicationPracticePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [micDelay, setMicDelay] = useState(false);
  const [voice, setVoice] = useState<TextToSpeechInput['voice']>('algenib');
  const [nativeLanguage, setNativeLanguage] = useState<string>('Telugu');

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/comms-practice');
    }
  }, [user, loading, router]);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const playAudio = useCallback((audioDataUri: string) => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
    }
    const audio = audioRef.current;
    if (audio) {
      if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
      audio.src = audioDataUri;
      audio.play().catch(e => {
        if (e.name !== 'AbortError') {
          console.error("Audio playback failed:", e);
          toast({ title: "Audio Error", description: "Could not play the audio response.", variant: "destructive" });
        }
        setIsSpeaking(false);
      });
    }
  }, [isRecording, toast]);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isGenerating || isSpeaking) return;
  
    setUserInput('');
    setIsGenerating(true);
      
    const userMessage: Message = { id: `user-${Date.now()}`, role: 'user', content: text };
    const assistantMessageId = `assistant-${Date.now()}`;
    const thinkingMessage: Message = { id: assistantMessageId, role: 'assistant', content: '', isGenerating: true };
  
    setMessages(prev => [...prev, userMessage, thinkingMessage]);
  
    try {
      const feedbackResult = await generateCommunicationFeedback({ text, nativeLanguage });
      const aiResponseText = feedbackResult.response;
      if (aiResponseText.trim()) {
        // Only call TTS if text is not empty or too short
        let ttsResult = null;
        if (aiResponseText.trim().length > 2) {
          try {
            ttsResult = await textToSpeech({ text: aiResponseText, voice });
            console.log('TTS audioDataUri:', ttsResult.audioDataUri);
            if (!ttsResult.audioDataUri || ttsResult.audioDataUri.length < 30) {
              toast({ title: "TTS Error", description: "No audio could be generated for this response. (Debug: Empty or too short audioDataUri)", variant: "destructive" });
            } else {
              playAudio(ttsResult.audioDataUri);
            }
          } catch (ttsErr) {
            console.error('TTS Error:', ttsErr);
            let errMsg = '';
            if (ttsErr instanceof Error) {
              errMsg = ttsErr.message;
            } else if (typeof ttsErr === 'object' && ttsErr !== null && 'message' in ttsErr) {
              errMsg = (ttsErr as any).message;
            } else {
              errMsg = String(ttsErr);
            }
            toast({ title: "TTS Error", description: `Text-to-speech failed. Please try again. (Debug: ${errMsg})`, variant: "destructive" });
          }
        }
        // Replace visible 'AI', 'Ai', or 'ai' with 'GETHUB' in the assistant's response
        const gethubResponse = aiResponseText.replace(/\bAI\b|\bAi\b|\bai\b/g, 'GETHUB');
        setMessages(prev => prev.map(m => m.id === assistantMessageId ? { ...m, content: gethubResponse, isGenerating: false } : m));
      } else {
        setMessages(prev => prev.filter(m => m.id !== assistantMessageId));
      }
  
    } catch (err) {
      console.error("Failed to get feedback:", err);
      const errorMessage = "I'm having a little trouble connecting right now. Let's try that again in a moment.";
      setMessages(prev => prev.map(m => m.id === assistantMessageId ? { ...m, content: errorMessage, isGenerating: false } : m));
    } finally {
      setIsGenerating(false);
    }
  }, [isGenerating, isSpeaking, voice, nativeLanguage, playAudio]);
  
   useEffect(() => {
    if (!SpeechRecognition) return;

    if (!recognitionRef.current) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        
        let finalTranscript = '';
        let transcriptSent = false;
    
        recognition.onstart = () => {
            setIsRecording(true);
            finalTranscript = '';
            transcriptSent = false;
        };
        
        const sendFinalTranscript = () => {
            if (speechTimeoutRef.current) {
                clearTimeout(speechTimeoutRef.current);
                speechTimeoutRef.current = null;
            }
            const transcriptToSend = finalTranscript.trim();
            if (transcriptToSend && !transcriptSent) {
                transcriptSent = true; 
                handleSendMessage(transcriptToSend);
                finalTranscript = ''; 
            }
        };

  recognition.onresult = (event: any) => {
           if (speechTimeoutRef.current) {
                clearTimeout(speechTimeoutRef.current);
           }

          let interimTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript + ' ';
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }
          setUserInput(finalTranscript + interimTranscript);
          
           speechTimeoutRef.current = setTimeout(sendFinalTranscript, 2000);
        };

        recognition.onend = () => {
          setIsRecording(false);
          sendFinalTranscript(); 
        };

  recognition.onerror = (event: any) => {
          if (event.error !== 'no-speech' && event.error !== 'aborted') {
            toast({ title: "Speech Recognition Error", description: `Error: ${event.error}`, variant: "destructive"});
          }
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
    }
  }, [toast, handleSendMessage]);

  useEffect(() => {
      if (!audioRef.current) {
        audioRef.current = new Audio();
        
        audioRef.current.onplay = () => {
            setIsSpeaking(true);
        };

    audioRef.current.onended = () => {
      setMicDelay(true);
      setTimeout(() => {
        setIsSpeaking(false);
        setMicDelay(false);
      }, 1000);
    };

    audioRef.current.onerror = (e) => {
      // e can be Event or string (per OnErrorEventHandler)
      const target = (e && typeof e !== 'string' && 'currentTarget' in e) ? (e.currentTarget as HTMLAudioElement) : null;
      // Error code 20 is a DOMException for abort, which is expected if we interrupt playback.
      if (target && target.error && target.error.code !== 20) { 
        console.error("Audio element error:", e);
        toast({ title: "Audio Error", description: "Could not play the audio response.", variant: "destructive" });
      }
      // Always ensure speaking state is reset, even on error.
      setIsSpeaking(false);
    };
      }

      return () => {
          if (recognitionRef.current) {
            recognitionRef.current.abort();
          }
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
          }
           if (speechTimeoutRef.current) {
                clearTimeout(speechTimeoutRef.current);
           }
      };
  }, [toast]);


  const handleToggleRecording = () => {
     if (!SpeechRecognition) {
      toast({ title: "Browser Not Supported", description: "Your browser does not support speech recognition.", variant: "destructive"});
      return;
    }
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
       if (audioRef.current && !audioRef.current.paused) {
         audioRef.current.pause();
       }
      setUserInput('');
      recognitionRef.current?.start();
    }
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "The text has been copied to your clipboard." });
  };
  
  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoaderCircle className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  const isUIActive = isRecording || isGenerating || isSpeaking;

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <GethubLogo className="w-8 h-8 text-primary" width={32} height={32} />
            <span className="text-lg font-semibold">GETHUB</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
           <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarMenu>
               <SidebarMenuItem>
                <Link href="/">
                  <SidebarMenuButton tooltip="Homepage">
                    <HomeIcon />
                    <span>Homepage</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/history">
                  <SidebarMenuButton tooltip="Exam History">
                    <History />
                    <span>History</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <Link href="/gallery">
                  <SidebarMenuButton tooltip="Gallery">
                    <GalleryHorizontal />
                    <span>Gallery</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Practice</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/practice">
                    <SidebarMenuButton tooltip="Practice Exam">
                        <BrainCircuit />
                        <span>Practice Exam</span>
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/comms-practice">
                    <SidebarMenuButton tooltip="Communication Practice" isActive>
                        <MessageCircle />
                        <span>Comm. Practice</span>
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
           {user && user.email === 'admin@gethub.com' && (
             <SidebarGroup>
               <SidebarGroupLabel>Admin</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                      <Link href="/admin">
                          <SidebarMenuButton tooltip="Admin Dashboard">
                              <Shield />
                              <span>Admin</span>
                          </SidebarMenuButton>
                      </Link>
                  </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
           )}
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/settings">
                  <SidebarMenuButton tooltip="Settings">
                    <Settings />
                    <span>Settings</span>
                  </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Profile">
                <Avatar className="w-7 h-7">
                  <AvatarImage src={user.photoURL ?? 'https://placehold.co/100x100.png'} alt="@teacher" data-ai-hint="teacher portrait"/>
                  <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{user.displayName || user.email}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton tooltip="Logout" onClick={logout}>
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
             <h1 className="text-xl font-semibold flex items-center gap-3">
                <MessageCircle className="w-6 h-6"/>
                GETHUB Language Coach
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Languages className="w-5 h-5 text-muted-foreground"/>
              <Select value={nativeLanguage} onValueChange={setNativeLanguage} disabled={isUIActive}>
                  <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                      {nativeLanguages.map(lang => (
                        <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                      ))}
                  </SelectContent>
              </Select>
            </div>
      <RadioGroup value={voice} onValueChange={(v) => setVoice(v as TextToSpeechInput['voice'])} className="flex items-center gap-4" disabled={isUIActive}>
        <Label>Voice:</Label>
        <div className="flex items-center space-x-2">
            <RadioGroupItem value="algenib" id="male-voice" />
            <Label htmlFor="male-voice">Male (algenib)</Label>
        </div>
        <div className="flex items-center space-x-2">
            <RadioGroupItem value="schedar" id="female-voice" />
            <Label htmlFor="female-voice">Female (schedar)</Label>
        </div>
      </RadioGroup>
          </div>
        </header>
        <main className="flex flex-col h-[calc(100vh-61px)]">
          <ScrollArea className="flex-1 p-4 md:p-6 lg:p-8" ref={scrollAreaRef}>
            <div className="space-y-6">
                {messages.length === 0 && !isUIActive && (
                    <Card className="max-w-2xl mx-auto border-dashed">
                        <CardHeader className="text-center items-center">
                             <GethubLogo className="w-16 h-16 mb-4" width={64} height={64} />
                            <CardTitle>Start a Conversation</CardTitle>
                            <CardDescription>Practice your English by clicking the microphone and speaking. GETHUB will reply and help you improve.</CardDescription>
                        </CardHeader>
                    </Card>
                )}
                {messages.map((message) => (
                    <div key={message.id} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                         {message.role === 'assistant' && (
                           <GethubLogo className="w-8 h-8" width={32} height={32} />
                        )}
                        <div className={`max-w-xl rounded-lg p-4 ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                           {message.isGenerating ? (
                              <div className="flex items-center gap-2">
                                <LoaderCircle className="w-4 h-4 animate-spin" />
                                <span>GETHUB is thinking...</span>
                              </div>
                           ) : (
                             <div className="prose prose-sm prose-invert max-w-none text-current" dangerouslySetInnerHTML={{ __html: markdownToHtml(message.content.replace(/\bAI\b|\bAi\b|\bai\b/g, 'GETHUB')) }} />
                           )}
                           {message.role === 'assistant' && !message.isGenerating && (
                            <div className="flex gap-2 mt-3 -mb-2">
                                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleCopyText(message.content)}>
                                    <Copy className="w-4 h-4"/>
                                </Button>
                            </div>
                           )}
                        </div>
                        {message.role === 'user' && (
                            <Avatar className="w-8 h-8">
                                <AvatarImage src={user.photoURL ?? 'https://placehold.co/100x100.png'} alt="@user" data-gethub-hint="student portrait" />
                                <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                ))}
            </div>
          </ScrollArea>
          <div className="p-4 border-t bg-background">
             <div className="relative max-w-2xl mx-auto">
                 <Textarea 
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(userInput); } }}
                    placeholder={isRecording ? "Listening..." : "Click the mic to speak, or type here..."}
                    className="pr-16 min-h-[52px]" 
                    rows={1}
                    disabled={isUIActive}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                    {SpeechRecognition && (
                      <Button 
                          type="button" 
                          size="icon" 
                          variant={isRecording ? "destructive" : "ghost"}
                          onClick={() => { if (!isSpeaking && !micDelay) handleToggleRecording(); }}
                          disabled={isGenerating || isSpeaking || micDelay}
                      >
                          <Mic className="w-5 h-5" />
                      </Button>
                    )}
                  </div>
             </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

function SidebarInset({ children }: { children: React.ReactNode}) {
  return (
    <div className="flex-1">{children}</div>
  )
}

function CommunicationPracticePageWrapper() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center">
            <div className="text-center flex flex-col items-center gap-4">
                <LoaderCircle className="w-12 h-12 animate-spin text-primary" />
                <h1 className="text-2xl font-bold">Loading...</h1>
            </div>
        </div>}>
            <CommunicationPracticePage />
        </Suspense>
    );
}

export default function CommunicationPracticePageWrapperWithAuth() {
  return (
    <AuthProvider>
      <CommunicationPracticePageWrapper />
    </AuthProvider>
  );
}

    