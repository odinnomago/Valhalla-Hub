import { Metadata } from 'next';
import ClientDashboard from '@/components/bookings/ClientDashboard';

export const metadata: Metadata = {
  title: 'Meus Bookings - Dashboard Cliente | Valhalla Hub',
  description: 'Gerencie todos os seus projetos musicais, acompanhe o status dos bookings e avalie profissionais contratados.',
  keywords: [
    'dashboard cliente',
    'meus bookings',
    'projetos musicais',
    'gestão de contratos',
    'avaliações profissionais',
    'pagamentos musicais'
  ],
};

export default function ClientDashboardPage() {
  return <ClientDashboard />;
}