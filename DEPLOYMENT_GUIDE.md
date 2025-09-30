# MIRS Global Solutions - Deployment Guide

## 🚀 Deploying to Your GoDaddy Domain

Since your application is built with **Vite + React + Supabase**, here are the best deployment options:

### Option 1: Netlify (Recommended)
1. **Build the project locally:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com) and sign up
   - Drag and drop your `dist` folder to Netlify
   - Or connect your GitHub repository for automatic deployments

3. **Configure Custom Domain:**
   - In Netlify dashboard, go to Domain Settings
   - Add your GoDaddy domain
   - Update DNS records in GoDaddy:
     - Add CNAME record: `www` → `your-site.netlify.app`
     - Add A record: `@` → `75.2.60.5`

### Option 2: Vercel
1. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com) and sign up
   - Import your project from GitHub
   - Or use Vercel CLI: `npx vercel --prod`

2. **Configure Custom Domain:**
   - In Vercel dashboard, go to Domains
   - Add your GoDaddy domain
   - Update DNS in GoDaddy as instructed

### Option 3: Traditional Web Hosting (GoDaddy Hosting)
1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload to GoDaddy:**
   - Upload all files from `dist` folder to your GoDaddy hosting `public_html` directory
   - Ensure `.htaccess` file is configured for SPA routing

3. **Configure .htaccess:**
   ```apache
   RewriteEngine On
   RewriteBase /
   RewriteRule ^index\.html$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

## 🔧 Environment Variables Setup

### For Netlify/Vercel:
Add these environment variables in your deployment platform:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

### For Traditional Hosting:
Create a `.env.production` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📧 Email Configuration
1. **Set up Resend API:**
   - Create account at [resend.com](https://resend.com)
   - Get API key from dashboard
   - Add `RESEND_API_KEY` to Supabase Edge Functions environment

2. **Configure in Supabase:**
   - Go to Edge Functions settings
   - Add environment variable: `RESEND_API_KEY`

## 🗄️ Database Setup
Your Supabase database is already configured. Ensure:
- All migrations are applied
- RLS policies are enabled
- Environment variables are set correctly

## 📱 Mobile Optimizations Applied
- ✅ Improved mobile padding (24px left/right)
- ✅ TopBar hides on scroll in mobile
- ✅ TopBar shows only icons on mobile
- ✅ Footer content centered on mobile
- ✅ Responsive design for all screen sizes

## 🔍 Testing Your Deployment
1. Test all pages load correctly
2. Test form submissions
3. Test admin login functionality
4. Test blog CRUD operations
5. Test email sending functionality

## 📞 Support
If you need help with deployment, contact your hosting provider or use the platform-specific documentation.