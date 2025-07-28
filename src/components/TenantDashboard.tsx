'use client';

import { useTenant } from '@/contexts/TenantContext';

export default function TenantDashboard() {
  const { tenant } = useTenant();

  const features = [
    { key: 'analytics', label: 'Analytics', description: 'Track your performance metrics' },
    { key: 'customDomain', label: 'Custom Domain', description: 'Use your own domain name' },
    { key: 'advancedReporting', label: 'Advanced Reporting', description: 'Detailed insights and reports' },
    { key: 'apiAccess', label: 'API Access', description: 'Integrate with external systems' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Welcome Section */}
      <div 
        className="rounded-lg p-8 mb-8"
        style={{ backgroundColor: tenant.theme.primaryColor + '10' }}
      >
        <h2 
          className="text-3xl font-bold mb-4"
          style={{ color: tenant.theme.primaryColor }}
        >
          Welcome to {tenant.branding.companyName}
        </h2>
        <p 
          className="text-lg opacity-90"
          style={{ color: tenant.theme.textColor }}
        >
          {tenant.branding.tagline || 'Your personalized dashboard'}
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {features.map((feature) => {
          const isEnabled = tenant.features[feature.key as keyof typeof tenant.features];
          return (
            <div
              key={feature.key}
              className={`p-6 rounded-lg border-2 transition-all ${
                isEnabled ? 'opacity-100' : 'opacity-50'
              }`}
              style={{
                borderColor: isEnabled ? tenant.theme.primaryColor : '#e5e7eb',
                backgroundColor: isEnabled ? tenant.theme.primaryColor + '05' : '#f9fafb',
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 
                  className="font-semibold"
                  style={{ color: tenant.theme.textColor }}
                >
                  {feature.label}
                </h3>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    isEnabled ? 'text-green-700 bg-green-100' : 'text-gray-500 bg-gray-100'
                  }`}
                >
                  {isEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <p 
                className="text-sm opacity-80"
                style={{ color: tenant.theme.textColor }}
              >
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Contact Information */}
      <div 
        className="rounded-lg p-6"
        style={{ backgroundColor: tenant.theme.secondaryColor + '10' }}
      >
        <h3 
          className="text-xl font-semibold mb-4"
          style={{ color: tenant.theme.secondaryColor }}
        >
          Contact Information
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <p 
              className="font-medium mb-1"
              style={{ color: tenant.theme.textColor }}
            >
              Email
            </p>
            <a
              href={`mailto:${tenant.contact.email}`}
              className="hover:underline"
              style={{ color: tenant.theme.primaryColor }}
            >
              {tenant.contact.email}
            </a>
          </div>
          {tenant.contact.phone && (
            <div>
              <p 
                className="font-medium mb-1"
                style={{ color: tenant.theme.textColor }}
              >
                Phone
              </p>
              <a
                href={`tel:${tenant.contact.phone}`}
                className="hover:underline"
                style={{ color: tenant.theme.primaryColor }}
              >
                {tenant.contact.phone}
              </a>
            </div>
          )}
          {tenant.contact.address && (
            <div>
              <p 
                className="font-medium mb-1"
                style={{ color: tenant.theme.textColor }}
              >
                Address
              </p>
              <p 
                className="text-sm"
                style={{ color: tenant.theme.textColor }}
              >
                {tenant.contact.address}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 