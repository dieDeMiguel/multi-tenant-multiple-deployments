'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { TenantConfig, TenantContextType } from '@/types/tenant';

const TenantContext = createContext<TenantContextType | undefined>(undefined);

interface TenantProviderProps {
  children: React.ReactNode;
  initialTenant: TenantConfig;
}

export function TenantProvider({ children, initialTenant }: TenantProviderProps) {
  const [tenant] = useState<TenantConfig>(initialTenant);
  const [isLoading] = useState(false);

  // Apply tenant-specific CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--tenant-primary', tenant.theme.primaryColor);
    root.style.setProperty('--tenant-secondary', tenant.theme.secondaryColor);
    root.style.setProperty('--tenant-bg', tenant.theme.backgroundColor);
    root.style.setProperty('--tenant-text', tenant.theme.textColor);
    
    // Update document title and favicon
    document.title = `${tenant.branding.companyName}${tenant.branding.tagline ? ' - ' + tenant.branding.tagline : ''}`;
    
    // Update favicon if specified
    if (tenant.branding.favicon) {
      const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      if (favicon) {
        favicon.href = tenant.branding.favicon;
      } else {
        const newFavicon = document.createElement('link');
        newFavicon.rel = 'icon';
        newFavicon.href = tenant.branding.favicon;
        document.head.appendChild(newFavicon);
      }
    }
  }, [tenant]);

  const contextValue: TenantContextType = {
    tenant,
    isLoading,
  };

  return (
    <TenantContext.Provider value={contextValue}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant(): TenantContextType {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
} 