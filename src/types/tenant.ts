export interface TenantConfig {
  id: string;
  name: string;
  displayName: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    logoUrl?: string;
  };
  features: {
    analytics: boolean;
    customDomain: boolean;
    advancedReporting: boolean;
    apiAccess: boolean;
  };
  branding: {
    companyName: string;
    tagline?: string;
    favicon?: string;
    customCss?: string;
  };
  contact: {
    email: string;
    phone?: string;
    address?: string;
  };
}

export interface TenantContextType {
  tenant: TenantConfig;
  isLoading: boolean;
} 