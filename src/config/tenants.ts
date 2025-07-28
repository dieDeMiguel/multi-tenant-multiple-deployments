import { TenantConfig } from '@/types/tenant';

// Default tenant configurations
const defaultTenantConfigs: Record<string, TenantConfig> = {
  juan: {
    id: 'juan',
    name: 'juan',
    displayName: 'Juan\'s Business',
    theme: {
      primaryColor: '#3b82f6',
      secondaryColor: '#1e40af',
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      logoUrl: '/logos/juan-logo.png',
    },
    features: {
      analytics: true,
      customDomain: true,
      advancedReporting: true,
      apiAccess: true,
    },
    branding: {
      companyName: 'Juan\'s Enterprise Solutions',
      tagline: 'Innovation at its finest',
      favicon: '/favicons/juan-favicon.ico',
    },
    contact: {
      email: 'contact@juan-business.com',
      phone: '+1 (555) 123-4567',
      address: '123 Business Ave, Suite 100',
    },
  },
  maria: {
    id: 'maria',
    name: 'maria',
    displayName: 'Maria\'s Store',
    theme: {
      primaryColor: '#ec4899',
      secondaryColor: '#be185d',
      backgroundColor: '#fdf2f8',
      textColor: '#374151',
      logoUrl: '/logos/maria-logo.png',
    },
    features: {
      analytics: true,
      customDomain: false,
      advancedReporting: false,
      apiAccess: true,
    },
    branding: {
      companyName: 'Maria\'s Boutique',
      tagline: 'Style meets elegance',
      favicon: '/favicons/maria-favicon.ico',
    },
    contact: {
      email: 'hello@maria-store.com',
      phone: '+1 (555) 987-6543',
    },
  },
  admin: {
    id: 'admin',
    name: 'admin',
    displayName: 'Admin Dashboard',
    theme: {
      primaryColor: '#059669',
      secondaryColor: '#047857',
      backgroundColor: '#f0fdf4',
      textColor: '#111827',
      logoUrl: '/logos/admin-logo.png',
    },
    features: {
      analytics: true,
      customDomain: true,
      advancedReporting: true,
      apiAccess: true,
    },
    branding: {
      companyName: 'Multi-Tenant Admin',
      tagline: 'Manage all tenants',
      favicon: '/favicons/admin-favicon.ico',
    },
    contact: {
      email: 'admin@multitenant.com',
    },
  },
};

export function getTenantConfig(): TenantConfig {
  const tenantId = process.env.TENANT_ID || 'juan';
  const tenantName = process.env.TENANT_NAME;
  
  // Get base config
  const baseConfig = defaultTenantConfigs[tenantId];
  
  if (!baseConfig) {
    throw new Error(`Tenant configuration not found for ID: ${tenantId}`);
  }
  
  // Override with environment variables if provided
  const config: TenantConfig = {
    ...baseConfig,
    displayName: tenantName || baseConfig.displayName,
    theme: {
      ...baseConfig.theme,
      primaryColor: process.env.TENANT_PRIMARY_COLOR || baseConfig.theme.primaryColor,
      secondaryColor: process.env.TENANT_SECONDARY_COLOR || baseConfig.theme.secondaryColor,
      backgroundColor: process.env.TENANT_BG_COLOR || baseConfig.theme.backgroundColor,
      textColor: process.env.TENANT_TEXT_COLOR || baseConfig.theme.textColor,
      logoUrl: process.env.TENANT_LOGO_URL || baseConfig.theme.logoUrl,
    },
    branding: {
      ...baseConfig.branding,
      companyName: process.env.TENANT_COMPANY_NAME || baseConfig.branding.companyName,
      tagline: process.env.TENANT_TAGLINE || baseConfig.branding.tagline,
    },
    contact: {
      ...baseConfig.contact,
      email: process.env.TENANT_CONTACT_EMAIL || baseConfig.contact.email,
      phone: process.env.TENANT_CONTACT_PHONE || baseConfig.contact.phone,
    },
  };
  
  return config;
}

export { defaultTenantConfigs }; 