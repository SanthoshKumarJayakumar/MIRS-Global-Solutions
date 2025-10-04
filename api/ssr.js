import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// This is a more advanced SSR handler that could render React components
// For now, it provides enhanced HTML with proper meta tags and loading states

const getSSRHTML = (path, metadata) => {
  const { title, description, keywords } = metadata;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="keywords" content="${keywords}">
  
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
  
  <!-- Critical CSS for better initial render -->
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
    
    .ssr-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .ssr-header {
      background: #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 1rem 0;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .ssr-nav {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .ssr-logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: #333;
      text-decoration: none;
    }
    
    .ssr-nav-links {
      display: flex;
      list-style: none;
      gap: 2rem;
    }
    
    .ssr-nav-links a {
      color: #666;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }
    
    .ssr-nav-links a:hover {
      color: #333;
    }
    
    .ssr-main {
      flex: 1;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      width: 100%;
    }
    
    .ssr-content {
      background: #fff;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .ssr-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #333;
      margin-bottom: 1rem;
    }
    
    .ssr-description {
      font-size: 1.2rem;
      color: #666;
      margin-bottom: 2rem;
    }
    
    .ssr-loading {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 400px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 8px;
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
    
    .ssr-footer {
      background: #f8f9fa;
      padding: 2rem 0;
      margin-top: 4rem;
      text-align: center;
      color: #666;
    }
    
    /* Hide SSR content when React hydrates */
    .react-loaded .ssr-container {
      display: none;
    }
    
    .react-loaded #root {
      display: block;
    }
    
    #root {
      display: none;
    }
  </style>
</head>
<body>
  <!-- SSR Content (hidden when React loads) -->
  <div class="ssr-container">
    <header class="ssr-header">
      <nav class="ssr-nav">
        <a href="/" class="ssr-logo">Your App</a>
        <ul class="ssr-nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/careers">Careers</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
    
    <main class="ssr-main">
      <div class="ssr-content">
        <h1 class="ssr-title">${title}</h1>
        <p class="ssr-description">${description}</p>
        <div class="ssr-loading">
          <div class="spinner"></div>
          <div class="loading-text">Loading ${title}...</div>
        </div>
      </div>
    </main>
    
    <footer class="ssr-footer">
      <p>&copy; 2024 Your App. All rights reserved.</p>
    </footer>
  </div>
  
  <!-- React App (shown when React loads) -->
  <div id="root">
    <div class="ssr-loading">
      <div class="spinner"></div>
      <div class="loading-text">Loading...</div>
    </div>
  </div>
  
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

// Route-specific metadata with enhanced SEO
const getRouteMetadata = (path) => {
  const routes = {
    '/': {
      title: 'Home - Your App',
      description: 'Welcome to our amazing application. Discover our services and solutions designed to help your business grow.',
      keywords: 'home, welcome, services, solutions, business, growth'
    },
    '/about': {
      title: 'About Us - Your App',
      description: 'Learn more about our company, mission, and the dedicated team behind our success. We are committed to excellence.',
      keywords: 'about, company, mission, team, history, excellence, commitment'
    },
    '/services': {
      title: 'Our Services - Your App',
      description: 'Discover our comprehensive range of professional services designed to meet your specific needs and exceed expectations.',
      keywords: 'services, solutions, professional, consulting, expertise, quality'
    },
    '/blog': {
      title: 'Blog - Your App',
      description: 'Read our latest articles, insights, and industry news to stay informed and ahead of the competition.',
      keywords: 'blog, articles, news, insights, industry, trends, updates'
    },
    '/careers': {
      title: 'Careers - Your App',
      description: 'Join our team and build the future with us. Explore exciting career opportunities and grow your professional journey.',
      keywords: 'careers, jobs, employment, team, opportunities, growth, professional'
    },
    '/contact': {
      title: 'Contact Us - Your App',
      description: 'Get in touch with our team. We\'re here to help and answer your questions. Reach out today!',
      keywords: 'contact, support, help, questions, get in touch, assistance'
    },
    '/admin/login': {
      title: 'Admin Login - Your App',
      description: 'Administrator login portal for managing your account and accessing admin features.',
      keywords: 'admin, login, management, portal, administrator'
    },
    '/admin/blog': {
      title: 'Admin Blog Management - Your App',
      description: 'Blog management dashboard for administrators to create and manage content.',
      keywords: 'admin, blog, management, dashboard, content, administrator'
    }
  };

  // Handle dynamic routes
  if (path.startsWith('/blog/') && path !== '/blog') {
    const postId = path.split('/blog/')[1];
    return {
      title: `Blog Post ${postId} - Your App`,
      description: `Read this insightful blog post about ${postId}. Discover valuable insights and information.`,
      keywords: 'blog, post, article, insights, information, content'
    };
  }

  return routes[path] || {
    title: 'Your App',
    description: 'Your App Description',
    keywords: 'app, website, services, solutions'
  };
};

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
    
    // Generate SSR HTML
    const html = getSSRHTML(path, metadata);

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
    
    // Fallback to basic HTML
    const fallbackHTML = getSSRHTML(req.url, {
      title: 'Your App',
      description: 'Your App Description',
      keywords: 'app, website'
    });
    res.status(200).send(fallbackHTML);
  }
};
