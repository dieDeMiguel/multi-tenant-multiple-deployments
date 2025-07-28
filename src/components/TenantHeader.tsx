'use client';

import { useTenant } from '@/contexts/TenantContext';
import Image from 'next/image';

export default function TenantHeader() {
  const { tenant } = useTenant();

  return (
    <header 
      className="w-full py-6 px-8 border-b-2"
      style={{ 
        borderColor: tenant.theme.primaryColor,
        backgroundColor: tenant.theme.backgroundColor 
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          {tenant.theme.logoUrl && (
            <Image
              src={tenant.theme.logoUrl}
              alt={`${tenant.branding.companyName} logo`}
              width={60}
              height={60}
              className="rounded-lg"
              onError={(e) => {
                // Hide image if it fails to load
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          <div>
            <h1 
              className="text-2xl font-bold"
              style={{ color: tenant.theme.primaryColor }}
            >
              {tenant.branding.companyName}
            </h1>
            {tenant.branding.tagline && (
              <p 
                className="text-sm opacity-80"
                style={{ color: tenant.theme.textColor }}
              >
                {tenant.branding.tagline}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span 
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{ 
              backgroundColor: tenant.theme.primaryColor + '20',
              color: tenant.theme.primaryColor 
            }}
          >
            Tenant: {tenant.displayName}
          </span>
        </div>
      </div>
    </header>
  );
} 