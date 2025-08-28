
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import GethubLogo from '@/components/gethub-logo';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const {
    user,
    loginWithEmail,
    loginWithGoogle,
    loginWithFacebook,
    loading,
  } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/';


  useEffect(() => {
    if (!loading && user) {
      router.push(redirectPath);
    }
  }, [user, loading, router, redirectPath]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await loginWithEmail(email, password);
      router.push(redirectPath);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      router.push(redirectPath);
    } catch (err: any) {
      setError(err.message);
    }
  };
  
  const handleFacebookLogin = async () => {
    try {
      await loginWithFacebook();
      router.push(redirectPath);
    } catch (err: any) {
      setError(err.message);
    }
  };


  return (
    <div className="flex h-screen items-center justify-center bg-background p-4">
       <div className="absolute inset-0 bg-grid-zinc-700/[0.2] [mask-image:linear-gradient(to_bottom,white_5%,transparent_100%)]"></div>
      <Card className="w-full max-w-sm relative z-10 bg-background/80 backdrop-blur-sm">
        <CardHeader className="text-center">
           <Link href="/" className="flex justify-center items-center gap-2 mb-4">
            <GethubLogo className="w-10 h-10 text-primary" width={40} height={40}/>
            <span className="text-2xl font-bold">GETHUB</span>
          </Link>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>
            Login to access your personalized dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </form>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
           <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={handleGoogleLogin} disabled={loading}>
              Google
            </Button>
            <Button variant="outline" onClick={handleFacebookLogin} disabled={loading}>
              Facebook
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function LoginPageWrapper() {
  return (
    <AuthProvider>
      <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
        <LoginPage />
      </Suspense>
    </AuthProvider>
  );
}
