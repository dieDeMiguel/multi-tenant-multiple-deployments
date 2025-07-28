import TenantHeader from '@/components/TenantHeader';
import TenantDashboard from '@/components/TenantDashboard';

export default function Home() {
  return (
    <div className="min-h-screen">
      <TenantHeader />
      <TenantDashboard />
    </div>
  );
}
