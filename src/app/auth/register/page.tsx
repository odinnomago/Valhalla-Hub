'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { registerUser } from '@/lib/auth';
import { signInWithGoogle } from '@/lib/auth-client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage, type Language } from '@/hooks/use-language';


import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Music, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';


const registerSchema = z.object({
  fullName: z.string().min(3, { message: 'Full name must be at least 3 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const translations: Record<Language, any> = {
    en: {
        title: "Create an Account",
        description: "Enter your information to create an account",
        fullNameLabel: "Full Name",
        emailLabel: "Email",
        passwordLabel: "Password",
        createAccountButton: "Create Account",
        orContinueWith: "Or continue with",
        googleButton: "Google",
        alreadyHaveAccount: "Already have an account?",
        logIn: "Log in",
        registrationFailed: "Registration Failed",
        successTitle: "Success!",
        successDescription: "Your account has been created.",
        welcome: "Welcome!",
        signUpFailed: "Sign-up Failed",
    },
    pt: {
        title: "Criar uma Conta",
        description: "Insira suas informações para criar uma conta",
        fullNameLabel: "Nome Completo",
        emailLabel: "E-mail",
        passwordLabel: "Senha",
        createAccountButton: "Criar Conta",
        orContinueWith: "Ou continue com",
        googleButton: "Google",
        alreadyHaveAccount: "Já tem uma conta?",
        logIn: "Entrar",
        registrationFailed: "Falha no Registro",
        successTitle: "Sucesso!",
        successDescription: "Sua conta foi criada.",
        welcome: "Bem-vindo(a)!",
        signUpFailed: "Falha no Cadastro",
    },
    es: {
        title: "Crear una Cuenta",
        description: "Introduce tu información para crear una cuenta",
        fullNameLabel: "Nombre Completo",
        emailLabel: "Correo Electrónico",
        passwordLabel: "Contraseña",
        createAccountButton: "Crear Cuenta",
        orContinueWith: "O continuar con",
        googleButton: "Google",
        alreadyHaveAccount: "¿Ya tienes una cuenta?",
        logIn: "Iniciar sesión",
        registrationFailed: "Fallo en el Registro",
        successTitle: "¡Éxito!",
        successDescription: "Tu cuenta ha sido creada.",
        welcome: "¡Bienvenido(a)!",
        signUpFailed: "Fallo en el Registro",
    }
};


const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>Google</title>
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.6 1.98-4.66 1.98-3.57 0-6.47-2.92-6.47-6.47s2.9-6.47 6.47-6.47c1.92 0 3.32.74 4.09 1.45l2.38-2.38C18.24 1.96 15.68 1 12.48 1 7.03 1 3 5.03 3 10.5s4.03 9.5 9.48 9.5c2.73 0 4.93-.91 6.47-2.43 1.6-1.58 2.24-3.87 2.24-6.31 0-.6-.05-1.19-.16-1.78Z" />
  </svg>
);


export default function RegisterPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isGooglePending, startGoogleTransition] = useTransition();
  const { language } = useLanguage();
  const t = translations[language];

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: RegisterFormValues) => {
    startTransition(async () => {
      const result = await registerUser(values);
      if (result.error) {
        toast({
          title: t.registrationFailed,
          description: result.error,
          variant: 'destructive',
        });
      } else {
        toast({
          title: t.successTitle,
          description: t.successDescription,
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
          title: t.signUpFailed,
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
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.fullNameLabel}</FormLabel>
                      <FormControl>
                        <Input placeholder={t.fullNameLabel} {...field} disabled={isPending || isGooglePending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                      <FormLabel>{t.passwordLabel}</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder={t.passwordLabel} {...field} disabled={isPending || isGooglePending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isPending || isGooglePending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {t.createAccountButton}
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
            {t.alreadyHaveAccount}{' '}
            <Link href="/auth/login" className="underline">
              {t.logIn}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}