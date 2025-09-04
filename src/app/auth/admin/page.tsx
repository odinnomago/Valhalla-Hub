'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

import { loginUser } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { useLanguage, type Language } from '@/hooks/use-language';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Music, Loader2, Shield } from 'lucide-react';

const adminLoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;

const translations = {
  en: {
    title: "Admin Login",
    description: "Enter your admin credentials to access the dashboard",
    emailLabel: "Admin Email",
    passwordLabel: "Admin Password",
    loginButton: "Access Admin Dashboard",
    forgotPassword: "Forgot your password?",
    loginSuccessTitle: "Success!",
    loginSuccessDesc: "Welcome to the admin dashboard.",
    loginFailedTitle: "Login Failed",
    invalidCredentials: "Invalid admin credentials.",
    notAuthorized: "You are not authorized to access the admin panel.",
  },
  pt: {
    title: "Login de Administrador",
    description: "Digite suas credenciais de administrador para acessar o painel",
    emailLabel: "E-mail do Administrador",
    passwordLabel: "Senha do Administrador",
    loginButton: "Acessar Painel de Administração",
    forgotPassword: "Esqueceu sua senha?",
    loginSuccessTitle: "Sucesso!",
    loginSuccessDesc: "Bem-vindo ao painel de administração.",
    loginFailedTitle: "Falha no Login",
    invalidCredentials: "Credenciais de administrador inválidas.",
    notAuthorized: "Você não está autorizado a acessar o painel de administração.",
  },
  es: {
    title: "Inicio de Sesión de Administrador",
    description: "Introduce tus credenciales de administrador para acceder al panel",
    emailLabel: "Correo Electrónico del Administrador",
    passwordLabel: "Contraseña del Administrador",
    loginButton: "Acceder al Panel de Administración",
    forgotPassword: "¿Olvidaste tu contraseña?",
    loginSuccessTitle: "¡Éxito!",
    loginSuccessDesc: "Bienvenido al panel de administración.",
    loginFailedTitle: "Fallo de Inicio de Sesión",
    invalidCredentials: "Credenciales de administrador inválidas.",
    notAuthorized: "No estás autorizado para acceder al panel de administración.",
  }
};

export default function AdminLoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;

  const form = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: AdminLoginFormValues) => {
    startTransition(async () => {
      const result = await loginUser(values);
      
      if (result.error) {
        toast({
          title: t.loginFailedTitle,
          description: result.error,
          variant: 'destructive',
        });
        return;
      }
      
      // Check if user is admin (in a real implementation, this would check against the database)
      // For now, we'll check if the email ends with @valhallarecords.com or is a specific admin email
      const isAdmin = values.email.endsWith('@valhallarecords.com') || 
                     values.email === 'admin@valhallahub.com' ||
                     values.email === 'admin@valhallarecords.com';
      
      if (!isAdmin) {
        toast({
          title: t.loginFailedTitle,
          description: t.notAuthorized,
          variant: 'destructive',
        });
        return;
      }
      
      toast({
        title: t.loginSuccessTitle,
        description: t.loginSuccessDesc,
      });
      
      router.push('/dashboard');
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-12 px-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <Music className="h-6 w-6 text-primary" />
              <span className="font-headline">Valhalla Hub</span>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle className="text-2xl font-headline">{t.title}</CardTitle>
          </div>
          <CardDescription>{t.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.emailLabel}</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="admin@valhallarecords.com" 
                        {...field} 
                        disabled={isPending} 
                      />
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
                      <Input 
                        type="password" 
                        {...field} 
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isPending}
              >
                {isPending && <Loader2 className="mr-2 h-4 animate-spin" />}
                {t.loginButton}
              </Button>
            </form>
          </Form>
          
          <div className="mt-4 text-center text-sm">
            <Link href="/auth/login" className="underline">
              Regular user login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}