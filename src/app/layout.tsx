import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TenantProvider } from "@/contexts/TenantContext";
import { getTenantConfig } from "@/config/tenants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Generate metadata based on tenant configuration
export async function generateMetadata(): Promise<Metadata> {
  const tenant = getTenantConfig();
  
  return {
    title: `${tenant.branding.companyName}${tenant.branding.tagline ? ' - ' + tenant.branding.tagline : ''}`,
    description: `Welcome to ${tenant.branding.companyName}${tenant.branding.tagline ? ' - ' + tenant.branding.tagline : ''}`,
    icons: {
      icon: tenant.branding.favicon || '/favicon.ico',
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tenant = getTenantConfig();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          backgroundColor: tenant.theme.backgroundColor,
          color: tenant.theme.textColor,
        }}
      >
        <TenantProvider initialTenant={tenant}>
          {children}
        </TenantProvider>
      </body>
    </html>
  );
}
