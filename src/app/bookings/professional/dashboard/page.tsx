import { Metadata } from 'next';
import ProfessionalDashboard from '@/components/bookings/ProfessionalDashboard';

export const metadata: Metadata = {
  title: 'Dashboard Profissional - Gerencie seus Bookings | Valhalla Hub',
  description: 'Dashboard profissional para gerenciar serviços, bookings e acompanhar performance como prestador de serviços musicais.',
  keywords: [
    'dashboard profissional',
    'gestão de bookings',
    'serviços musicais',
    'freelancer música',
    'prestador serviços'
  ],
};

export default function ProfessionalDashboardPage() {
  return <ProfessionalDashboard />;
}