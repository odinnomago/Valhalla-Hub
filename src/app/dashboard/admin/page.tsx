'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Music, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  FileText, 
  Mail, 
  Shield,
  LogOut
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { logoutUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutUser();
      router.push('/');
      toast({
        title: 'Success',
        description: 'You have been logged out successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to log out. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const adminStats = [
    {
      title: 'Total Users',
      value: '1,245',
      icon: Users,
      change: '+12% from last month',
    },
    {
      title: 'Releases',
      value: '89',
      icon: Music,
      change: '+5% from last month',
    },
    {
      title: 'Orders',
      value: '1,423',
      icon: ShoppingCart,
      change: '+8% from last month',
    },
    {
      title: 'Revenue',
      value: 'R$ 42,120',
      icon: BarChart3,
      change: '+15% from last month',
    },
  ];

  const adminActions = [
    {
      title: 'Manage Users',
      description: 'View and manage all registered users',
      icon: Users,
      href: '/dashboard/admin/users',
    },
    {
      title: 'Manage Releases',
      description: 'Add, edit, or remove music releases',
      icon: Music,
      href: '/dashboard/admin/releases',
    },
    {
      title: 'View Orders',
      description: 'Monitor and manage customer orders',
      icon: ShoppingCart,
      href: '/dashboard/admin/orders',
    },
    {
      title: 'Site Settings',
      description: 'Configure global site settings',
      icon: Settings,
      href: '/dashboard/admin/settings',
    },
    {
      title: 'Content Management',
      description: 'Manage blog posts, events, and other content',
      icon: FileText,
      href: '/dashboard/admin/content',
    },
    {
      title: 'Email Campaigns',
      description: 'Create and send email campaigns',
      icon: Mail,
      href: '/dashboard/admin/email',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <Shield className="h-6 w-6 text-primary" />
            <span>Admin Dashboard</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user?.email}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Welcome to the Valhalla Hub admin panel. Manage your site from here.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {adminStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {adminActions.map((action, index) => (
            <Card key={index} className="hover:bg-accent transition-colors">
              <CardHeader>
                <action.icon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={action.href}>
                  <Button variant="outline" className="w-full">
                    Manage
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}