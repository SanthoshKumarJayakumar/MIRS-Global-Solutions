import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import SessionTimeoutWarning from './components/SessionTimeoutWarning';

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Services = React.lazy(() => import('./pages/Services'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const Careers = React.lazy(() => import('./pages/Careers'));
const Contact = React.lazy(() => import('./pages/Contact'));
const AdminLogin = React.lazy(() => import('./pages/AdminLogin'));
const AdminBlog = React.lazy(() => import('./pages/AdminBlog'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <SessionTimeoutWarning />
          <div className="min-h-screen bg-white">
            <Routes>
              <Route path="/admin/login" element={
                <Suspense fallback={<LoadingSpinner fullScreen text="Loading admin login..." />}>
                  <AdminLogin />
                </Suspense>
              } />
              <Route path="/admin/blog" element={
                <ProtectedRoute>
                  <Suspense fallback={<LoadingSpinner fullScreen text="Loading admin panel..." />}>
                    <>
                      <TopBar />
                      <Navbar />
                      <AdminBlog />
                      <Footer />
                    </>
                  </Suspense>
                </ProtectedRoute>
              } />
              <Route path="/" element={
                <>
                  <TopBar />
                  <Navbar />
                  <Suspense fallback={<LoadingSpinner fullScreen text="Loading page..." />}>
                    <Home />
                  </Suspense>
                  <Footer />
                </>
              } />
              <Route path="/about" element={
                <>
                  <TopBar />
                  <Navbar />
                  <Suspense fallback={<LoadingSpinner fullScreen text="Loading page..." />}>
                    <About />
                  </Suspense>
                  <Footer />
                </>
              } />
              <Route path="/services" element={
                <>
                  <TopBar />
                  <Navbar />
                  <Suspense fallback={<LoadingSpinner fullScreen text="Loading page..." />}>
                    <Services />
                  </Suspense>
                  <Footer />
                </>
              } />
              <Route path="/blog" element={
                <>
                  <TopBar />
                  <Navbar />
                  <Suspense fallback={<LoadingSpinner fullScreen text="Loading page..." />}>
                    <Blog />
                  </Suspense>
                  <Footer />
                </>
              } />
              <Route path="/blog/:id" element={
                <>
                  <TopBar />
                  <Navbar />
                  <Suspense fallback={<LoadingSpinner fullScreen text="Loading page..." />}>
                    <BlogPost />
                  </Suspense>
                  <Footer />
                </>
              } />
              <Route path="/careers" element={
                <>
                  <TopBar />
                  <Navbar />
                  <Suspense fallback={<LoadingSpinner fullScreen text="Loading page..." />}>
                    <Careers />
                  </Suspense>
                  <Footer />
                </>
              } />
              <Route path="/contact" element={
                <>
                  <TopBar />
                  <Navbar />
                  <Suspense fallback={<LoadingSpinner fullScreen text="Loading page..." />}>
                    <Contact />
                  </Suspense>
                  <Footer />
                </>
              } />
              <Route path="*" element={
                <>
                  <TopBar />
                  <Navbar />
                  <Suspense fallback={<LoadingSpinner fullScreen text="Loading page..." />}>
                    <NotFound />
                  </Suspense>
                  <Footer />
                </>
              } />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;