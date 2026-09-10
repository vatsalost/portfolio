import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useLenisScroll } from './hooks/useLenisScroll';
import { GrainOverlay } from './components/layout/GrainOverlay';
import { CustomCursor } from './components/ui/CustomCursor';
import { Preloader } from './components/ui/Preloader';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { PageTransition } from './components/layout/PageTransition';

import { HomePage } from './pages/HomePage';
import { WorkPage } from './pages/WorkPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

export function App() {
  const [isLoaded, setIsLoaded] = useState(() => {
    // Only play preloader on session start or if not yet completed
    return sessionStorage.getItem('kaien_preloaded') === 'true';
  });

  const location = useLocation();
  useLenisScroll();

  const isAdminRoute = location.pathname.startsWith('/admin');

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('kaien_preloaded', 'true');
    setIsLoaded(true);
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#F5F5F0]">
      {/* Film Grain Texture Overlay */}
      <GrainOverlay />

      {/* Cybernetic Custom Cursor */}
      <CustomCursor />

      {/* Intro Preloader Sequence */}
      {!isLoaded && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Public Navigation (suppressed on admin console routes) */}
      {!isAdminRoute && <Navbar />}

      {/* Routed Views with Curtain Page Transitions */}
      <PageTransition>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          {/* Catch-all fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </PageTransition>

      {/* Public Footer */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}
