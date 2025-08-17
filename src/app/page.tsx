
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, BrainCircuit, BookOpenCheck, LogOut, Settings, Library, Briefcase, History, Facebook, Twitter, Instagram, MessageSquare } from 'lucide-react';
import GethubLogo from '@/components/gethub-logo';
import { examCategories } from '@/lib/exam-categories';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import Image from 'next/image';


function HomePageContent() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoaderCircle className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  const PageHeader = () => (
     <header className="flex items-center justify-between p-4 border-b border-white/10 sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2">
            <GethubLogo className="w-8 h-8 text-primary" width={32} height={32}/>
            <span className="text-xl font-bold">GETHUB</span>
        </div>
        <div className="flex items-center gap-2">
            {user ? (
                 <div className="flex items-center gap-4">
                     <Button variant="ghost" asChild>
                        <Link href="/history">
                            <History className="mr-2"/>
                            History
                        </Link>
                    </Button>
                    <div className="h-6 w-px bg-white/10"></div>
                     <Button variant="ghost" size="icon" asChild>
                        <Link href="/settings">
                            <Settings />
                            <span className="sr-only">Settings</span>
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={logout}>
                        <LogOut />
                        <span className="sr-only">Logout</span>
                    </Button>
                   <Avatar>
                      <AvatarImage src={user.photoURL ?? 'https://placehold.co/100x100.png'} alt={user.displayName || 'User'} data-ai-hint="student portrait" />
                      <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                </div>
            ) : (
                <>
                <Button asChild variant="ghost">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
                </>
            )}
        </div>
    </header>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
        <PageHeader/>
        <main className="flex-1">
            <section className="text-center py-20 px-4 border-b border-white/10">
                 <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Welcome to GETHUB</h1>
                 <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
                    Your hub for competitive exam preparation. Choose an exam below to start your journey.
                 </p>
                 <div className="mt-8 flex justify-center gap-4">
                     <Button asChild size="lg" variant="secondary">
                        <Link href="/practice">
                            <BrainCircuit className="mr-2"/> AI Practice
                        </Link>
                    </Button>
                </div>
            </section>
            
            <section id="gallery" className="py-20 px-4 border-b border-white/10 bg-secondary/30">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight">Our Success Stories</h2>
                    <p className="text-muted-foreground mt-2">See how GETHUB has helped students achieve their dreams.</p>
                </div>
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
                    <div className="grid grid-cols-2 gap-4">
                        <Image src="https://placehold.co/600x400.png" alt="Student studying" width={600} height={400} className="rounded-lg shadow-lg" data-ai-hint="student studying"/>
                        <Image src="https://placehold.co/600x400.png" alt="Exam hall" width={600} height={400} className="rounded-lg shadow-lg" data-ai-hint="exam hall"/>
                        <Image src="https://placehold.co/600x400.png" alt="Graduation ceremony" width={600} height={400} className="rounded-lg shadow-lg" data-ai-hint="graduation ceremony"/>
                        <Image src="https://placehold.co/600x400.png" alt="Student celebrating" width={600} height={400} className="rounded-lg shadow-lg" data-ai-hint="student celebrating"/>
                    </div>
                    <div className="prose prose-invert text-lg">
                        <h3>From Aspiration to Achievement</h3>
                        <p>Join thousands of students who have transformed their preparation with GETHUB. Our AI-powered tools, detailed syllabus breakdowns, and on-demand practice exams provide the edge you need to excel in competitive exams.</p>
                        <p>Whether you're aiming for civil services, engineering, or medical school, our platform is designed to guide you at every step of your journey. Start today and unlock your potential.</p>
                         <Button asChild size="lg">
                            <Link href="#exams">
                                Explore Exams <ArrowRight className="ml-2"/>
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            <section id="exams" className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
              <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold tracking-tight">Choose Your Exam</h2>
                  <p className="text-muted-foreground mt-2">Select an exam to view its syllabus and start preparing.</p>
              </div>

               <div className="space-y-12">
                {examCategories.map((category) => (
                    <div key={category.category}>
                        <h3 className="text-2xl font-bold tracking-tight mb-6 text-primary">{category.category}</h3>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {category.exams.map((exam) => (
                            <Card key={exam.examId} className="flex flex-col bg-secondary border-white/10 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
                                <CardHeader>
                                <CardTitle>{exam.examName}</CardTitle>
                                <CardDescription className="mt-2">{exam.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow flex flex-col justify-end gap-4">
                                <Button asChild className="w-full mt-auto">
                                    <Link href={`/exam/${exam.examId}`}>
                                        <BookOpenCheck className="mr-2" /> View Syllabus
                                    </Link>
                                </Button>
                                </CardContent>
                            </Card>
                            ))}
                        </div>
                    </div>
                ))}
              </div>
          </section>
        </main>
        <footer className="p-6 border-t border-white/10 text-center">
          <div className="max-w-7xl mx-auto grid gap-6">
            <div>
              <p className="font-semibold">GETHUB</p>
              <p className="text-sm text-muted-foreground">Kakinada, Andhrapradesh-533001</p>
            </div>
             <div className="flex justify-center gap-4">
                <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><MessageSquare /></Link>
             </div>
             <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} GETHUB. All rights reserved.</p>
          </div>
        </footer>
    </div>
  );
}

export default function HomePage() {
  return (
    <AuthProvider>
      <HomePageContent />
    </AuthProvider>
  );
}
