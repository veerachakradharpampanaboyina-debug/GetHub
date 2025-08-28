
'use client';

import { useState, useEffect } from 'react';
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
import { LogOut, Settings, Home as HomeIcon, History, BrainCircuit, Shield, MessageCircle, GalleryHorizontal } from 'lucide-react';
import GethubLogo from '@/components/gethub-logo';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { LoaderCircle } from 'lucide-react';
import { pdfToQuizJson } from '@/ai/flows/pdf-to-quiz-json';
import { saveScheduledExam } from '@/services/scheduled-exam-service';
import { examCategories } from '@/lib/exam-categories';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { addGalleryItem, uploadGalleryImage } from '@/services/gallery-service';


function AdminPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  // State for weekly exam upload
  const [file, setFile] = useState<File | null>(null);
  const [isUploadingExam, setIsUploadingExam] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState<string>('');

  // State for gallery upload
  const [galleryImage, setGalleryImage] = useState<File | null>(null);
  const [studentName, setStudentName] = useState('');
  const [achievement, setAchievement] = useState('');
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);


  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/admin');
    }
    // Simple admin check, in a real app this should be based on roles in a database
    if (!loading && user && user.email !== 'pydah.edu@gmail.com') {
        toast({
            title: "Access Denied",
            description: "You do not have permission to access the admin page.",
            variant: "destructive"
        });
        router.push('/');
    }
  }, [user, loading, router, toast]);

  const handleExamFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleGalleryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setGalleryImage(e.target.files[0]);
    }
  };

  const handleExamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({ title: "No file selected", description: "Please select a PDF file to upload.", variant: "destructive" });
      return;
    }
     if (!selectedExamId) {
      toast({ title: "No exam selected", description: "Please select an exam to associate with the PDF.", variant: "destructive" });
      return;
    }

    setIsUploadingExam(true);
    
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async (event) => {
          const pdfDataUri = event.target?.result as string;
          
          toast({ title: "Processing PDF", description: "The AI is converting the PDF to a quiz. This may take a moment..." });

          const quizData = await pdfToQuizJson({ pdfDataUri });

          if (!quizData.questions || quizData.questions.length === 0) {
              throw new Error("The AI could not extract any questions from the PDF.");
          }
          
          const selectedExam = examCategories.flatMap(c => c.exams).find(e => e.examId === selectedExamId);

          await saveScheduledExam({
              examId: selectedExamId,
              examName: selectedExam?.examName || 'Scheduled Exam',
              questions: quizData.questions.map(q => ({...q, studentAnswer: ''})),
          });

          toast({ title: "Upload Successful", description: "The weekly scheduled exam has been created." });
          setFile(null);
          setSelectedExamId('');
          // Reset file input
          const fileInput = document.getElementById('pdf-upload') as HTMLInputElement;
          if(fileInput) fileInput.value = '';
      };
    } catch (error: any) {
        console.error("Failed to process and save exam:", error);
        toast({
          title: "Upload Failed",
          description: error.message || "An unexpected error occurred.",
          variant: "destructive"
        });
    } finally {
        setIsUploadingExam(false);
    }
  };

  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryImage || !studentName || !achievement) {
      toast({ title: "Missing Information", description: "Please fill out all fields and select an image.", variant: "destructive" });
      return;
    }

    setIsUploadingGallery(true);

    try {
        const photoURL = await uploadGalleryImage(galleryImage);
        await addGalleryItem({
            studentName,
            achievement,
            photoURL,
        });

        toast({ title: "Success", description: "New achievement has been added to the gallery."});
        setGalleryImage(null);
        setStudentName('');
        setAchievement('');
        const fileInput = document.getElementById('gallery-upload') as HTMLInputElement;
        if(fileInput) fileInput.value = '';

    } catch (error: any) {
        console.error("Failed to upload gallery item:", error);
        toast({
          title: "Upload Failed",
          description: error.message || "An unexpected error occurred.",
          variant: "destructive"
        });
    } finally {
        setIsUploadingGallery(false);
    }
  };


  if (loading || !user || user.email !== 'pydah.edu@gmail.com') {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoaderCircle className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }
  
  const allExams = examCategories.flatMap(category => category.exams);

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
                        <SidebarMenuButton tooltip="Communication Practice">
                            <MessageCircle />
                            <span>Comm. Practice</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
             <SidebarGroupLabel>Admin</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                    <Link href="/admin">
                        <SidebarMenuButton tooltip="Admin Dashboard" isActive>
                            <Shield />
                            <span>Admin</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
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
              <Shield className="w-6 h-6"/>
              Admin Dashboard
            </h1>
          </div>
        </header>
        <main className="p-4 md:p-6 lg:p-8 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Upload Weekly Scheduled Exam</CardTitle>
                <CardDescription>
                  Select an exam and upload a PDF question paper. The AI will convert it to a quiz and schedule it.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleExamSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="exam-select">Competitive Exam</Label>
                     <Select value={selectedExamId} onValueChange={setSelectedExamId}>
                        <SelectTrigger id="exam-select">
                            <SelectValue placeholder="Select an exam" />
                        </SelectTrigger>
                        <SelectContent>
                            {allExams.map((exam) => (
                                <SelectItem key={exam.examId} value={exam.examId}>{exam.examName}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pdf-upload">Question Paper PDF</Label>
                    <Input id="pdf-upload" type="file" accept=".pdf" onChange={handleExamFileChange} />
                  </div>
                  <Button type="submit" disabled={isUploadingExam}>
                    {isUploadingExam ? <LoaderCircle className="w-4 h-4 animate-spin mr-2" /> : null}
                    Upload & Schedule Exam
                  </Button>
                </form>
              </CardContent>
            </Card>

             <Card>
              <CardHeader>
                <CardTitle>Add to Student Gallery</CardTitle>
                <CardDescription>
                  Upload a student's photo and their achievement to showcase on the Gallery page.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleGallerySubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-name">Student Name</Label>
                    <Input id="student-name" value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Enter student's full name" />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="achievement">Achievement / Description</Label>
                    <Textarea id="achievement" value={achievement} onChange={(e) => setAchievement(e.target.value)} placeholder="e.g., 'Secured All India Rank 1 in UPSC CSE'" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gallery-upload">Student Photo</Label>
                    <Input id="gallery-upload" type="file" accept="image/*" onChange={handleGalleryFileChange} />
                  </div>
                  <Button type="submit" disabled={isUploadingGallery}>
                    {isUploadingGallery ? <LoaderCircle className="w-4 h-4 animate-spin mr-2" /> : null}
                    Add to Gallery
                  </Button>
                </form>
              </CardContent>
            </Card>
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

export default function AdminPageWrapper() {
  return (
    <AuthProvider>
      <AdminPage />
    </AuthProvider>
  );
}
