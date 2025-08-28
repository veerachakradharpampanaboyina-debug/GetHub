
'use client';

import { Suspense } from 'react';
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
import { BrainCircuit, LogOut, Settings, Home as HomeIcon, History, Shield, Library, MessageCircle, GalleryHorizontal } from 'lucide-react';
import type { Exam, Question } from '@/lib/types';
import { ExamView } from '@/components/exam-view';
import GethubLogo from '@/components/gethub-logo';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { generatePracticeExam } from '@/ai/flows/generate-practice-exam';
import { getSeenQuestions } from '@/services/exam-service';
import { LoaderCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


function PracticeExamGenerator() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const topic = searchParams.get('topic') || 'a general knowledge';
  const [exam, setExam] = useState<Exam | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [numQuestions, setNumQuestions] = useState('5');

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=/practice?topic=${encodeURIComponent(topic)}`);
    }
  }, [user, loading, router, topic]);

  const handleGenerateExam = async () => {
    if (!user) return;
    setIsGenerating(true);
    setGenerationError(null);
    setExam(null);

    try {
      const seenQuestions = await getSeenQuestions(user.uid);
      const response = await generatePracticeExam({
        examTopic: topic,
        numQuestions: parseInt(numQuestions, 10),
        seenQuestions,
      });

      const examQuestions: Question[] = response.questions.map(q => ({
        ...q,
        studentAnswer: '',
      }));

      const newExam: Exam = {
        student: {
          name: user.displayName || user.email || 'Student',
          id: user.uid,
          avatarUrl: user.photoURL || `https://placehold.co/100x100.png`,
        },
        examName: `Practice Exam: ${topic}`,
        examId: `practice-${Date.now()}`,
        questions: examQuestions,
      };
      setExam(newExam);
    } catch (err) {
      console.error("Failed to generate exam:", err);
      setGenerationError("Sorry, we couldn't generate a practice exam at this time. Please try again later.");
    } finally {
      setIsGenerating(false);
    }
  };
  
  if (loading) {
     return (
      <div className="flex h-screen items-center justify-center">
        <LoaderCircle className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
     return (
      <div className="flex h-screen items-center justify-center">
         <p>Redirecting to login...</p>
      </div>
    );
  }

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
                    <SidebarMenuButton tooltip="Practice Exam" isActive>
                        <BrainCircuit />
                        <span>Practice Exam</span>
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/comms-practice">
                    <SidebarMenuButton tooltip="Communication Practice">
                        <MessageCircle />
                        <span>Comm. Practice</span>
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              {exam && (
                 <SidebarMenuItem>
                    <SidebarMenuButton tooltip={exam.examName}>
                      <Library />
                      <span>{exam.examName}</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
              )}
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
                <BrainCircuit className="w-6 h-6"/>
                GETHUB Practice Exam
            </h1>
          </div>
        </header>
        <main className="p-4 md:p-6 lg:p-8">
          {isGenerating ? (
              <div className="flex flex-col items-center justify-center text-center gap-4">
                  <LoaderCircle className="w-12 h-12 animate-spin text-primary" />
                  <h1 className="text-2xl font-bold">Generating Your Practice Exam...</h1>
                  <p className="text-muted-foreground">The GETHUB is preparing {numQuestions} questions for the {topic} exam.</p>
              </div>
          ) : exam ? (
            <ExamView exam={exam} />
          ) : (
            <Card className="max-w-xl mx-auto">
                <CardHeader>
                    <CardTitle>Generate a Practice Exam</CardTitle>
                    <CardDescription>
                       Select the number of questions you want to generate for the topic: <span className="font-semibold text-primary">{topic}</span>.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {generationError && (
                         <div className="text-destructive text-center">{generationError}</div>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="num-questions">Number of Questions</Label>
                        <Select value={numQuestions} onValueChange={setNumQuestions}>
                            <SelectTrigger id="num-questions">
                                <SelectValue placeholder="Select number of questions" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="5">5 Questions</SelectItem>
                                <SelectItem value="10">10 Questions</SelectItem>
                                <SelectItem value="15">15 Questions</SelectItem>
                                <SelectItem value="25">25 Questions</SelectItem>
                                <SelectItem value="50">50 Questions</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <Button onClick={handleGenerateExam} disabled={isGenerating} className="w-full">
                        <BrainCircuit className="mr-2" />
                        Generate Exam
                    </Button>
                </CardContent>
            </Card>
          )}
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

function PracticePage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center">
            <div className="text-center flex flex-col items-center gap-4">
                <LoaderCircle className="w-12 h-12 animate-spin text-primary" />
                <h1 className="text-2xl font-bold">Loading...</h1>
            </div>
        </div>}>
            <PracticeExamGenerator />
        </Suspense>
    );
}


export default function PracticePageWrapper() {
  return (
    <AuthProvider>
      <PracticePage />
    </AuthProvider>
  );
}
