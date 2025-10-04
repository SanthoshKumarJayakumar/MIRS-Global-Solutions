import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Enhanced HTML template
const getHTMLTemplate = (title, description, path) => {
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
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://yourdomain.com${path}">
  <meta property="twitter:title" content="${title}">
  <meta property="twitter:description" content="${description}">
  
  <!-- Preconnect to external domains -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
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
    
    /* Hide SSR content when React loads */
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

// Route metadata
const getRouteMetadata = (path) => {
  const routes = {
    '/': {
      title: 'Home - Your App',
      description: 'Welcome to our amazing application. Discover our services and solutions designed to help your business grow.'
    },
    '/about': {
      title: 'About Us - Your App',
      description: 'Learn more about our company, mission, and the dedicated team behind our success.'
    },
    '/services': {
      title: 'Our Services - Your App',
      description: 'Discover our comprehensive range of professional services designed to meet your specific needs.'
    },
    '/blog': {
      title: 'Blog - Your App',
      description: 'Read our latest articles, insights, and industry news to stay informed.'
    },
    '/careers': {
      title: 'Careers - Your App',
      description: 'Join our team and build the future with us. Explore exciting career opportunities.'
    },
    '/contact': {
      title: 'Contact Us - Your App',
      description: 'Get in touch with our team. We\'re here to help and answer your questions.'
    },
    '/admin/login': {
      title: 'Admin Login - Your App',
      description: 'Administrator login portal for managing your account.'
    },
    '/admin/blog': {
      title: 'Admin Blog - Your App',
      description: 'Blog management dashboard for administrators.'
    }
  };

  if (path.startsWith('/blog/') && path !== '/blog') {
    return {
      title: 'Blog Post - Your App',
      description: 'Read this insightful blog post.'
    };
  }

  return routes[path] || {
    title: 'Your App',
    description: 'Your App Description'
  };
};

export default async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const path = req.url;
    const metadata = getRouteMetadata(path);
    
    const html = getHTMLTemplate(metadata.title, metadata.description, path);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    res.status(200).send(html);
    
  } catch (error) {
    console.error('Error in SSR handler:', error);
    
    const fallbackHTML = getHTMLTemplate(
      'Your App',
      'Your App Description',
      req.url
    );
    
    res.status(200).send(fallbackHTML);
  }
};
