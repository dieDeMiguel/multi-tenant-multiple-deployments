# Multi-Tenant App - Multiple Deployments Approach

This is a Next.js multi-tenant application using the "Multiple Deployments for Each Tenant" approach. Each tenant has its own deployment and project, allowing for easier observability and customization for individual tenants.

## Architecture Overview

- **Single Repository**: One codebase for all tenants
- **Multiple Vercel Projects**: Each tenant gets its own Vercel project
- **Environment-Based Configuration**: Tenants are differentiated using environment variables
- **Tenant-Specific Theming**: Each tenant has its own colors, branding, and features

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Vercel CLI (for deployment)

### Local Development

1. Clone the repository:
```bash
git clone <your-repo-url>
cd multi-tenant-multiple-deployments
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

4. Edit `.env.local` with your desired tenant configuration:
```bash
TENANT_ID=juan  # Options: juan, maria, admin
TENANT_NAME="Juan's Business"
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the tenant-specific application.

## Tenant Configuration

### Available Tenants

The application comes with three pre-configured tenants:

1. **Juan** (`juan`) - Blue theme, full features enabled
2. **Maria** (`maria`) - Pink theme, limited features
3. **Admin** (`admin`) - Green theme, admin dashboard

### Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `TENANT_ID` | Tenant identifier | Yes | `juan`, `maria`, `admin` |
| `TENANT_NAME` | Display name override | No | `"Juan's Business"` |
| `TENANT_PRIMARY_COLOR` | Primary theme color | No | `#3b82f6` |
| `TENANT_SECONDARY_COLOR` | Secondary theme color | No | `#1e40af` |
| `TENANT_BG_COLOR` | Background color | No | `#ffffff` |
| `TENANT_TEXT_COLOR` | Text color | No | `#1f2937` |
| `TENANT_COMPANY_NAME` | Company name override | No | `"Juan's Enterprise"` |
| `TENANT_TAGLINE` | Company tagline | No | `"Innovation at its finest"` |
| `TENANT_LOGO_URL` | Logo image URL | No | `/logos/juan-logo.png` |
| `TENANT_CONTACT_EMAIL` | Contact email | No | `contact@juan.com` |
| `TENANT_CONTACT_PHONE` | Contact phone | No | `"+1 (555) 123-4567"` |

## Deployment to Vercel

### Step 1: Create Multiple Vercel Projects

For each tenant, create a separate Vercel project from the same repository:

```bash
# Install Vercel CLI
npm i -g vercel

# Create project for Juan
vercel --name tenant-juan

# Create project for Maria  
vercel --name tenant-maria

# Create project for Admin
vercel --name tenant-admin
```

### Step 2: Configure Environment Variables

For each Vercel project, set the appropriate environment variables:

#### Juan's Project (tenant-juan)
```bash
vercel env add TENANT_ID
# Enter: juan

vercel env add TENANT_NAME
# Enter: Juan's Business

vercel env add TENANT_COMPANY_NAME
# Enter: Juan's Enterprise Solutions
```

#### Maria's Project (tenant-maria)
```bash
vercel env add TENANT_ID
# Enter: maria

vercel env add TENANT_NAME  
# Enter: Maria's Store

vercel env add TENANT_COMPANY_NAME
# Enter: Maria's Boutique
```

#### Admin Project (tenant-admin)
```bash
vercel env add TENANT_ID
# Enter: admin

vercel env add TENANT_NAME
# Enter: Admin Dashboard

vercel env add TENANT_COMPANY_NAME
# Enter: Multi-Tenant Admin
```

### Step 3: Deploy Each Project

```bash
# Deploy Juan's project
vercel --prod --name tenant-juan

# Deploy Maria's project
vercel --prod --name tenant-maria

# Deploy Admin project
vercel --prod --name tenant-admin
```

### Using Pre-configured Environment Files

You can use the pre-configured environment files in the `deployment-configs/` directory:

1. Copy the appropriate config file to your Vercel project
2. Use the Vercel dashboard to import environment variables
3. Or use the Vercel CLI to set them individually

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with TenantProvider
│   │   └── page.tsx            # Main tenant page
│   ├── components/
│   │   ├── TenantHeader.tsx    # Tenant-specific header
│   │   └── TenantDashboard.tsx # Tenant-specific dashboard
│   ├── contexts/
│   │   └── TenantContext.tsx   # React context for tenant data
│   ├── config/
│   │   └── tenants.ts          # Tenant configurations
│   └── types/
│       └── tenant.ts           # TypeScript types
├── deployment-configs/         # Environment files for each tenant
│   ├── tenant-juan.env
│   ├── tenant-maria.env
│   └── tenant-admin.env
└── env.example                 # Example environment variables
```

## Features

### Tenant-Specific Features

- **Dynamic Theming**: Each tenant has its own color scheme
- **Custom Branding**: Company names, taglines, and logos
- **Feature Toggles**: Enable/disable features per tenant
- **Contact Information**: Tenant-specific contact details
- **Metadata**: Dynamic page titles and favicons

### Technical Features

- **Server-Side Rendering**: Tenant configuration loaded at build time
- **Type Safety**: Full TypeScript support
- **Responsive Design**: Mobile-first responsive layout
- **Performance**: Optimized for fast loading

## Adding New Tenants

1. Add tenant configuration to `src/config/tenants.ts`:
```typescript
newTenant: {
  id: 'newTenant',
  name: 'newTenant',
  displayName: 'New Tenant Name',
  // ... other configuration
}
```

2. Create environment file in `deployment-configs/tenant-new.env`

3. Create new Vercel project:
```bash
vercel --name tenant-new
```

4. Set environment variables and deploy

## Development Tips

### Testing Different Tenants Locally

Change the `TENANT_ID` in your `.env.local` file and restart the development server to test different tenant configurations.

### Custom Styling

Each tenant's theme colors are applied as CSS custom properties:
- `--tenant-primary`
- `--tenant-secondary` 
- `--tenant-bg`
- `--tenant-text`

### Adding Features

To add tenant-specific features:

1. Update the `TenantConfig` interface in `src/types/tenant.ts`
2. Add the feature to tenant configurations in `src/config/tenants.ts`
3. Use the feature in your components via the `useTenant()` hook

## Monitoring and Observability

Each tenant deployment is completely isolated, providing:

- **Separate Analytics**: Each tenant has its own Vercel analytics
- **Individual Logs**: Isolated error tracking and logging
- **Performance Metrics**: Per-tenant performance monitoring
- **Custom Domains**: Each tenant can have its own domain

## Cost Considerations

- Each tenant requires a separate Vercel project
- Consider Vercel pricing tiers based on number of tenants
- Monitor usage across all tenant deployments
- Consider consolidating low-traffic tenants if needed

## Support

For questions or issues:
- Check the tenant-specific contact information
- Review environment variable configuration
- Verify Vercel project settings
- Check deployment logs for each tenant project
