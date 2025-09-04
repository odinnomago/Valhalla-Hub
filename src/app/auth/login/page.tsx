'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

import { loginUser } from '@/lib/auth';
import { signInWithGoogle } from '@/lib/auth-client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage, type Language } from '@/hooks/use-language';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Music, Loader2 } from 'lucide-react';


const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const translations = {
    en: {
        title: "Welcome Back",
        description: "Enter your email below to login to your account",
        emailLabel: "Email",
        passwordLabel: "Password",
        forgotPassword: "Forgot your password?",
        loginButton: "Login",
        orContinueWith: "Or continue with",
        googleButton: "Google",
        noAccount: "Don't have an account?",
        signUp: "Sign up",
        loginSuccessTitle: "Success!",
        loginSuccessDesc: "Welcome back.",
        loginFailedTitle: "Login Failed",
    },
    pt: {
        title: "Bem-vindo de Volta",
        description: "Digite seu e-mail abaixo para fazer login em sua conta",
        emailLabel: "E-mail",
        passwordLabel: "Senha",
        forgotPassword: "Esqueceu sua senha?",
        loginButton: "Entrar",
        orContinueWith: "Ou continue com",
        googleButton: "Google",
        noAccount: "Não tem uma conta?",
        signUp: "Inscreva-se",
        loginSuccessTitle: "Sucesso!",
        loginSuccessDesc: "Bem-vindo de volta.",
        loginFailedTitle: "Falha no Login",
    },
    es: {
        title: "Bienvenido de Nuevo",
        description: "Introduce tu correo electrónico a continuación para iniciar sesión en tu cuenta",
        emailLabel: "Correo Electrónico",
        passwordLabel: "Contraseña",
        forgotPassword: "¿Olvidaste tu contraseña?",
        loginButton: "Iniciar Sesión",
        orContinueWith: "O continuar con",
        googleButton: "Google",
        noAccount: "¿No tienes una cuenta?",
        signUp: "Regístrate",
        loginSuccessTitle: "¡Éxito!",
        loginSuccessDesc: "Bienvenido de nuevo.",
        loginFailedTitle: "Fallo de Inicio de Sesión",
    }
}


const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>Google</title>
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.6 1.98-4.66 1.98-3.57 0-6.47-2.92-6.47-6.47s2.9-6.47 6.47-6.47c1.92 0 3.32.74 4.09 1.45l2.38-2.38C18.24 1.96 15.68 1 12.48 1 7.03 1 3 5.03 3 10.5s4.03 9.5 9.48 9.5c2.73 0 4.93-.91 6.47-2.43 1.6-1.58 2.24-3.87 2.24-6.31 0-.6-.05-1.19-.16-1.78Z" />
  </svg>
);

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isGooglePending, startGoogleTransition] = useTransition();
  const { language } = useLanguage();
  const t = translations[language];

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    startTransition(async () => {
      const result = await loginUser(values);
      if (result.error) {
        toast({
          title: t.loginFailedTitle,
          description: result.error,
          variant: 'destructive',
        });
      } else {
        toast({
          title: t.loginSuccessTitle,
          description: t.loginSuccessDesc,
        });
        router.push('/dashboard');
      }
    });
  };

  const handleGoogleSignIn = () => {
    startGoogleTransition(async () => {
      const result = await signInWithGoogle();
      if (result.error) {
        toast({
          title: t.loginFailedTitle,
          description: result.error,
          variant: 'destructive',
        });
      }
      // Note: For OAuth, the user will be redirected to Google,
      // so we don't handle success here. The callback will handle the return.
    });
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-12 px-4">
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <Music className="h-6 w-6 text-primary" />
              <span className="font-headline">Valhalla Hub</span>
            </Link>
          </div>
          <CardTitle className="text-2xl font-headline">{t.title}</CardTitle>
          <CardDescription>{t.description}</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="grid gap-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.emailLabel}</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder={t.emailLabel} {...field} disabled={isPending || isGooglePending} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <Label htmlFor="password">{t.passwordLabel}</Label>
                          <Link href="#" className="ml-auto inline-block text-sm underline">
                            {t.forgotPassword}
                          </Link>
                        </div>
                        <FormControl>
                          <Input type="password" placeholder={t.passwordLabel} {...field} disabled={isPending || isGooglePending}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isPending || isGooglePending}>
                    {isPending && <Loader2 className="mr-2 h-4 animate-spin" />}
                    {t.loginButton}
                  </Button>
                </form>
              </Form>
              {/* 
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    {t.orContinueWith}
                  </span>
                </div>
              </div>
              <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isPending || isGooglePending}>
                 {isGooglePending ? (
                    <Loader2 className="mr-2 h-4 animate-spin" />
                 ) : (
                    <GoogleIcon className="mr-2 h-4 w-4" />
                 )}
                {t.googleButton}
              </Button>
              */}
           </div>
          <div className="mt-4 text-center text-sm">
            {t.noAccount}{' '}
            <Link href="/auth/register" className="underline">
              {t.signUp}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}