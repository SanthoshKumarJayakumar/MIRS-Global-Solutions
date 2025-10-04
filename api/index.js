import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Enhanced HTML template with better SEO and performance
const getHTMLTemplate = (content, title = 'Your App', description = 'Your App Description', path = '/') => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://yourdomain.com${path}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="https://yourdomain.com/og-image.jpg">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://yourdomain.com${path}">
  <meta property="twitter:title" content="${title}">
  <meta property="twitter:description" content="${description}">
  <meta property="twitter:image" content="https://yourdomain.com/og-image.jpg">
  
  <!-- Preconnect to external domains -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  
  <!-- Critical CSS -->
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #ffffff;
    }
    
    .ssr-loading {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    
    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-top: 4px solid #fff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 20px;
    }
    
    .loading-text {
      font-size: 18px;
      font-weight: 500;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    /* Hide loading when React takes over */
    .react-loaded .ssr-loading {
      display: none;
    }
    
    /* Basic layout styles for better initial render */
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    header {
      background: #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    main {
      min-height: calc(100vh - 200px);
    }
    
    footer {
      background: #f8f9fa;
      padding: 40px 0;
      margin-top: 60px;
    }
  </style>
</head>
<body>
  <div id="root">
    <div class="ssr-loading">
      <div class="spinner"></div>
      <div class="loading-text">Loading ${title}...</div>
    </div>
  </div>
  ${content}
  
  <script>
    // Mark as loaded when React hydrates
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(() => {
        document.body.classList.add('react-loaded');
      }, 100);
    });
  </script>
</body>
</html>`;
};

// Comprehensive route metadata
const getRouteMetadata = (path) => {
  const routes = {
    '/': {
      title: 'Home - Your App',
      description: 'Welcome to our amazing application. Discover our services and solutions.',
      keywords: 'home, welcome, services, solutions'
    },
    '/about': {
      title: 'About Us - Your App',
      description: 'Learn more about our company, mission, and the dedicated team behind our success.',
      keywords: 'about, company, mission, team, history'
    },
    '/services': {
      title: 'Our Services - Your App',
      description: 'Discover our comprehensive range of professional services designed to meet your needs.',
      keywords: 'services, solutions, professional, consulting'
    },
    '/blog': {
      title: 'Blog - Your App',
      description: 'Read our latest articles, insights, and industry news to stay informed.',
      keywords: 'blog, articles, news, insights, industry'
    },
    '/careers': {
      title: 'Careers - Your App',
      description: 'Join our team and build the future with us. Explore exciting career opportunities.',
      keywords: 'careers, jobs, employment, team, opportunities'
    },
    '/contact': {
      title: 'Contact Us - Your App',
      description: 'Get in touch with our team. We\'re here to help and answer your questions.',
      keywords: 'contact, support, help, questions, get in touch'
    },
    '/admin/login': {
      title: 'Admin Login - Your App',
      description: 'Administrator login portal for managing your account.',
      keywords: 'admin, login, management, portal'
    },
    '/admin/blog': {
      title: 'Admin Blog Management - Your App',
      description: 'Blog management dashboard for administrators.',
      keywords: 'admin, blog, management, dashboard'
    }
  };

  // Handle dynamic routes
  if (path.startsWith('/blog/') && path !== '/blog') {
    const postId = path.split('/blog/')[1];
    return {
      title: `Blog Post ${postId} - Your App`,
      description: `Read this insightful blog post about ${postId}.`,
      keywords: 'blog, post, article, insights'
    };
  }

  return routes[path] || {
    title: 'Your App',
    description: 'Your App Description',
    keywords: 'app, website, services'
  };
};

// Enhanced SSR handler with better error handling and performance
export default async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const path = req.url;
    const metadata = getRouteMetadata(path);
    
    // Read the built index.html file
    const indexPath = join(__dirname, '..', 'dist', 'index.html');
    let indexContent;
    
    try {
      indexContent = readFileSync(indexPath, 'utf8');
    } catch (error) {
      console.warn('Could not read index.html, using fallback template');
      // If index.html doesn't exist, create a basic template
      indexContent = getHTMLTemplate('', metadata.title, metadata.description, path);
    }

    // Inject route-specific metadata
    let html = indexContent;
    
    // Update title
    html = html.replace(/<title>.*?<\/title>/, `<title>${metadata.title}</title>`);
    
    // Add or update meta description
    if (html.includes('<meta name="description"')) {
      html = html.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${metadata.description}">`);
    } else {
      html = html.replace('</head>', `  <meta name="description" content="${metadata.description}">\n</head>`);
    }

    // Add keywords meta tag
    if (!html.includes('<meta name="keywords"')) {
      html = html.replace('</head>', `  <meta name="keywords" content="${metadata.keywords}">\n</head>`);
    }

    // Add structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": metadata.title,
      "description": metadata.description,
      "url": `https://yourdomain.com${path}`,
      "mainEntity": {
        "@type": "Organization",
        "name": "Your App",
        "url": "https://yourdomain.com"
      }
    };

    const structuredDataScript = `
  <script type="application/ld+json">
    ${JSON.stringify(structuredData, null, 2)}
  </script>`;

    if (!html.includes('application/ld+json')) {
      html = html.replace('</head>', `${structuredDataScript}\n</head>`);
    }

    // Set content type and caching headers
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    
    // Send the HTML content
    res.status(200).send(html);
    
  } catch (error) {
    console.error('Error in SSR handler:', error);
    
    // Fallback to basic HTML with error information
    const fallbackHTML = getHTMLTemplate('', 'Your App', 'Your App Description', req.url);
    res.status(200).send(fallbackHTML);
  }
};