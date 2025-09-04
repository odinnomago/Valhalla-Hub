'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Loader2 } from 'lucide-react';

import { loginUser, registerUser } from '@/lib/auth';
import { signInWithGoogle } from '@/lib/auth-client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage, type Language } from '@/hooks/use-language';
import { useAuthModal } from '@/contexts/AuthModalContext';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

const registerSchema = z.object({
  fullName: z.string().min(3, { message: 'Full name must be at least 3 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const translations: Record<Language, any> = {
  en: {
    loginTitle: "Welcome Back",
    loginDescription: "Enter your email below to login to your account",
    registerTitle: "Create an Account",
    registerDescription: "Enter your information to create an account",
    emailLabel: "Email",
    emailPlaceholder: "m@example.com",
    passwordLabel: "Password",
    fullNameLabel: "Full Name",
    fullNamePlaceholder: "John Doe",
    forgotPassword: "Forgot your password?",
    loginButton: "Login",
    createAccountButton: "Create Account",
    orContinueWith: "Or continue with",
    googleButton: "Google",
    noAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    signUp: "Sign up",
    logIn: "Log in",
    loginSuccessTitle: "Success!",
    loginSuccessDesc: "Welcome back.",
    registrationSuccessTitle: "Success!",
    registrationSuccessDesc: "Your account has been created.",
    loginFailedTitle: "Login Failed",
    registrationFailed: "Registration Failed",
  },
  pt: {
    loginTitle: "Bem-vindo de Volta",
    loginDescription: "Digite seu e-mail abaixo para fazer login em sua conta",
    registerTitle: "Criar uma Conta",
    registerDescription: "Insira suas informações para criar uma conta",
    emailLabel: "E-mail",
    emailPlaceholder: "m@exemplo.com",
    passwordLabel: "Senha",
    fullNameLabel: "Nome Completo",
    fullNamePlaceholder: "João da Silva",
    forgotPassword: "Esqueceu sua senha?",
    loginButton: "Entrar",
    createAccountButton: "Criar Conta",
    orContinueWith: "Ou continue com",
    googleButton: "Google",
    noAccount: "Não tem uma conta?",
    alreadyHaveAccount: "Já tem uma conta?",
    signUp: "Inscreva-se",
    logIn: "Entrar",
    loginSuccessTitle: "Sucesso!",
    loginSuccessDesc: "Bem-vindo de volta.",
    registrationSuccessTitle: "Sucesso!",
    registrationSuccessDesc: "Sua conta foi criada.",
    loginFailedTitle: "Falha no Login",
    registrationFailed: "Falha no Registro",
  },
  es: {
    loginTitle: "Bienvenido de Nuevo",
    loginDescription: "Introduce tu correo electrónico a continuación para iniciar sesión en tu cuenta",
    registerTitle: "Crear una Cuenta",
    registerDescription: "Introduce tu información para crear una cuenta",
    emailLabel: "Correo Electrónico",
    emailPlaceholder: "m@ejemplo.com",
    passwordLabel: "Contraseña",
    fullNameLabel: "Nombre Completo",
    fullNamePlaceholder: "Juan Pérez",
    forgotPassword: "¿Olvidaste tu contraseña?",
    loginButton: "Iniciar Sesión",
    createAccountButton: "Crear Cuenta",
    orContinueWith: "O continuar con",
    googleButton: "Google",
    noAccount: "¿No tienes una cuenta?",
    alreadyHaveAccount: "¿Ya tienes una cuenta?",
    signUp: "Regístrate",
    logIn: "Iniciar sesión",
    loginSuccessTitle: "¡Éxito!",
    loginSuccessDesc: "Bienvenido de nuevo.",
    registrationSuccessTitle: "¡Éxito!",
    registrationSuccessDesc: "Tu cuenta ha sido creada.",
    loginFailedTitle: "Fallo de Inicio de Sesión",
    registrationFailed: "Fallo en el Registro",
  }
};

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>Google</title>
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.6 1.98-4.66 1.98-3.57 0-6.47-2.92-6.47-6.47s2.9-6.47 6.47-6.47c1.92 0 3.32.74 4.09 1.45l2.38-2.38C18.24 1.96 15.68 1 12.48 1 7.03 1 3 5.03 3 10.5s4.03 9.5 9.48 9.5c2.73 0 4.93-.91 6.47-2.43 1.6-1.58 2.24-3.87 2.24-6.31 0-.6-.05-1.19-.16-1.78Z" />
  </svg>
);

export default function AuthModal() {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isGooglePending, startGoogleTransition] = useTransition();
  const { language } = useLanguage();
  const t = translations[language];
  
  const { 
    isModalOpen, 
    modalView, 
    closeModal, 
    switchToLogin, 
    switchToRegister 
  } = useAuthModal();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const handleLogin = (values: LoginFormValues) => {
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
        closeModal();
        router.refresh();
      }
    });
  };

  const handleRegister = (values: RegisterFormValues) => {
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
          title: t.registrationSuccessTitle,
          description: t.registrationSuccessDesc,
        });
        closeModal();
        router.refresh();
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
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>
              {modalView === 'login' ? t.loginTitle : t.registerTitle}
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={closeModal}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            {modalView === 'login' ? t.loginDescription : t.registerDescription}
          </p>
        </DialogHeader>
        
        {modalView === 'login' ? (
          <div className="space-y-4">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.emailLabel}</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder={t.emailPlaceholder} 
                          {...field} 
                          disabled={isPending || isGooglePending} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <Label htmlFor="password">{t.passwordLabel}</Label>
                        <button 
                          type="button"
                          className="ml-auto inline-block text-sm underline"
                          onClick={() => alert('Password reset functionality would go here')}
                        >
                          {t.forgotPassword}
                        </button>
                      </div>
                      <FormControl>
                        <Input 
                          type="password" 
                          {...field} 
                          disabled={isPending || isGooglePending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isPending || isGooglePending}
                >
                  {isPending && <Loader2 className="mr-2 h-4 animate-spin" />}
                  {t.loginButton}
                </Button>
              </form>
            </Form>
            
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
            
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleGoogleSignIn}
              disabled={isPending || isGooglePending}
            >
              {isGooglePending ? (
                <Loader2 className="mr-2 h-4 animate-spin" />
              ) : (
                <GoogleIcon className="mr-2 h-4 w-4" />
              )}
              {t.googleButton}
            </Button>
            
            <div className="text-center text-sm">
              {t.noAccount}{' '}
              <button 
                type="button"
                className="underline"
                onClick={switchToRegister}
              >
                {t.signUp}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Form {...registerForm}>
              <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                <FormField
                  control={registerForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.fullNameLabel}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={t.fullNamePlaceholder} 
                          {...field} 
                          disabled={isPending || isGooglePending} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.emailLabel}</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder={t.emailPlaceholder} 
                          {...field} 
                          disabled={isPending || isGooglePending} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.passwordLabel}</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          {...field} 
                          disabled={isPending || isGooglePending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isPending || isGooglePending}
                >
                  {isPending && <Loader2 className="mr-2 h-4 animate-spin" />}
                  {t.createAccountButton}
                </Button>
              </form>
            </Form>
            
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
            
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleGoogleSignIn}
              disabled={isPending || isGooglePending}
            >
              {isGooglePending ? (
                <Loader2 className="mr-2 h-4 animate-spin" />
              ) : (
                <GoogleIcon className="mr-2 h-4 w-4" />
              )}
              {t.googleButton}
            </Button>
            
            <div className="text-center text-sm">
              {t.alreadyHaveAccount}{' '}
              <button 
                type="button"
                className="underline"
                onClick={switchToLogin}
              >
                {t.logIn}
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}