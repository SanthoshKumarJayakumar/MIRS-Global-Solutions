# Vercel 404 Error Fix for Vite React SPA

This guide explains how to fix the common 404 error when deploying a Vite React SPA to Vercel.

## Problem
When deploying a React SPA (Single Page Application) with client-side routing to Vercel, users encounter 404 errors when:
- Directly accessing routes like `/about`, `/services`, etc.
- Refreshing the page on any route other than `/`
- Sharing URLs with specific routes

## Root Cause
Vercel serves static files, but when a user directly accesses a route like `/about`, Vercel looks for a physical file at `/about/index.html` which doesn't exist. The client-side router (React Router) needs the server to serve `index.html` for all routes so it can handle the routing.

## Solution Implemented

### 1. Updated `vercel.json`
The main fix is in the `vercel.json` configuration file:

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/((?!api/|assets/|_next/|favicon.ico|robots.txt|sitemap.xml|.*\\.).*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "trailingSlash": false,
  "cleanUrls": false
}
```

**Key points:**
- `rewrites` rule redirects all non-asset requests to `/index.html`
- Excludes API routes, assets, and static files from the rewrite
- `trailingSlash: false` and `cleanUrls: false` ensure consistent URL handling

### 2. Updated `vite.config.ts`
Added proper base configuration:

```typescript
export default defineConfig({
  // ... other config
  base: '/',
  preview: {
    port: 3000,
    strictPort: true,
  },
});
```

### 3. Enhanced `_redirects` file
The `public/_redirects` file provides fallback support:

```
# Handle client-side routing for SPA
/*    /index.html   200

# Specific routes for better compatibility
/admin/*    /index.html   200
/about    /index.html   200
/services    /index.html   200
/blog    /index.html   200
/blog/*    /index.html   200
/careers    /index.html   200
/contact    /index.html   200
```

### 4. Updated build script
Added postbuild script to ensure `_redirects` is copied to dist:

```json
{
  "scripts": {
    "postbuild": "cp public/_redirects dist/_redirects"
  }
}
```

## How It Works

1. **Static Assets**: Files like `/assets/script.js` are served directly
2. **API Routes**: `/api/*` routes are handled by Vercel functions
3. **SPA Routes**: All other routes (`/about`, `/services`, etc.) are rewritten to `/index.html`
4. **Client-Side Routing**: React Router takes over and renders the correct component

## Testing the Fix

1. Deploy to Vercel
2. Test these scenarios:
   - Direct access to `/about` - should work
   - Refresh on `/services` - should work
   - Navigate to `/blog/123` - should work
   - Share URL with `/contact` - should work

## Alternative Solutions

If the above doesn't work, try these alternatives:

### Option 1: Use `vercel-spa.json`
Rename `vercel-spa.json` to `vercel.json` for a more comprehensive configuration.

### Option 2: Serverless Function Approach
The `api/index.js` file provides a serverless function approach that can be used if rewrites don't work.

### Option 3: Netlify-style redirects
Ensure the `_redirects` file is properly copied to the dist folder during build.

## Common Issues and Solutions

### Issue: Still getting 404s
**Solution**: Check that the rewrite pattern is correct and excludes all static assets.

### Issue: Assets not loading
**Solution**: Ensure the rewrite pattern excludes the `/assets/` directory.

### Issue: API routes not working
**Solution**: Make sure API routes are excluded from the rewrite rule.

## Verification

After deployment, verify:
1. All routes work when accessed directly
2. Page refreshes work on any route
3. Assets load correctly
4. API endpoints function properly
5. SEO meta tags are present (if using SSR)

This solution follows the Vite SSR Vercel deployment best practices and should resolve the 404 error issue completely.


