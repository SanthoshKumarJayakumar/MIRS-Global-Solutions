# MIRS Global Solutions Website

A modern, responsive website for MIRS Global Solutions - a pioneer in IT-enabled services since 2022.

## 🚀 Features

- **Modern React Architecture**: Built with React 18, TypeScript, and Vite
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance Optimized**: Lazy loading, code splitting, and image optimization
- **SEO Ready**: Meta tags, sitemap, and structured data
- **Admin Panel**: Blog management system with authentication
- **Contact Forms**: Enquiry and career application forms with email notifications
- **Blog System**: Dynamic blog with search and filtering
- **Error Handling**: Comprehensive error boundaries and loading states

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Supabase (Database, Auth, Edge Functions)
- **Email**: Resend API
- **Icons**: Lucide React
- **Carousel**: React Slick

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project2609
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GA_MEASUREMENT_ID=your_ga_measurement_id (optional)
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the SQL migrations in `supabase/migrations/`
   - Deploy the edge functions in `supabase/functions/`

5. **Start development server**
   ```bash
   npm run dev
   ```

## 🗄️ Database Schema

### Tables
- `enquiries` - Contact form submissions
- `career_applications` - Job application submissions
- `blog_posts` - Blog articles
- `admin_users` - Admin authentication

### Edge Functions
- `send-enquiry-email` - Sends email notifications for enquiries
- `send-career-application-email` - Sends email notifications for job applications

## 🚀 Deployment

### Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Vercel
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Carousel.tsx
│   ├── EnquiryForm.tsx
│   ├── ErrorBoundary.tsx
│   ├── LoadingSpinner.tsx
│   ├── Navbar.tsx
│   └── ...
├── contexts/           # React contexts
│   └── AuthContext.tsx
├── pages/              # Page components
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Blog.tsx
│   ├── Careers.tsx
│   ├── Contact.tsx
│   └── ...
├── lib/                # Utilities and configurations
│   └── supabase.ts
├── utils/              # Helper functions
│   └── performance.ts
└── App.tsx
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Customization

### Colors
The website uses a blue color scheme. To change colors, update the Tailwind configuration in `tailwind.config.js`.

### Content
- Update company information in individual page components
- Modify services in `src/pages/Services.tsx`
- Update contact information in `src/components/Footer.tsx`

### Styling
- Global styles are in `src/index.css`
- Component-specific styles use Tailwind CSS classes
- Responsive breakpoints follow Tailwind's default system

## 🔒 Security

- All forms include client-side validation
- Admin routes are protected with authentication
- Environment variables are properly configured
- CORS policies are set for API endpoints

## 📈 Performance

- Lazy loading for all pages
- Image optimization with loading states
- Code splitting for better bundle sizes
- Error boundaries for graceful error handling
- SEO optimization with meta tags and sitemap

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary to MIRS Global Solutions.

## 📞 Support

For support or questions, contact:
- Email: mirsglobalsolutions@gmail.com
- Phone: 8610401452 / 8220481711
- Address: 548/1, Anna Nagar, Kitchipalayam, Salem-636015, Tamil Nadu, India





