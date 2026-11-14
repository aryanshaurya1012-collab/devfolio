import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import Scene from './components/Scene';
import ProfileDrawer from './components/ProfileDrawer';
import ContactModal from './components/ContactModal';
import CaseStudyModal from './components/CaseStudyModal';
import EditorModal from './components/EditorModal';
import { defaultPortfolioData, THEMES, getActiveTheme } from './data/portfolio';

const STORAGE_KEY = 'devos_showcase_v4';

export default function App() {
  const [portfolioData, setPortfolioData] = useState(() => {
    try {
      // Purge legacy storage keys to guarantee no old user data persists
      localStorage.removeItem('devos_portfolio_v2');
      localStorage.removeItem('devos_portfolio_data');
      localStorage.removeItem('portfolio_maker_data');
      localStorage.removeItem('devos_showcase_v3');

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          parsed?.projects?.length &&
          !parsed?.name?.toLowerCase().includes('shaurya') &&
          !parsed?.name?.toLowerCase().includes('aryan')
        ) {
          return parsed;
        }
      }
      return defaultPortfolioData;
    } catch {
      return defaultPortfolioData;
    }
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [inspectedProject, setInspectedProject] = useState(null);
  const wheelCooldown = useRef(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolioData));
    } catch (e) {
      console.error(e);
    }
  }, [portfolioData]);

  const mode = portfolioData.mode || 'dark';
  const isLight = mode === 'light';
  const currentTheme = getActiveTheme(portfolioData.theme, mode);
  const totalProjects = portfolioData.projects?.length || 1;
  const isAnyModalOpen =
    isEditorOpen || isProfileOpen || isContactOpen || Boolean(inspectedProject);

  const toggleMode = () => {
    setPortfolioData((prev) => ({
      ...prev,
      mode: prev.mode === 'light' ? 'dark' : 'light',
    }));
  };

  // Clamp activeIndex if project count changes
  useEffect(() => {
    if (activeIndex >= totalProjects) {
      setActiveIndex(Math.max(0, totalProjects - 1));
    }
  }, [totalProjects, activeIndex]);

  // Smooth Wheel & Keyboard Carousel Navigation
  useEffect(() => {
    const handleWheel = (e) => {
      if (isAnyModalOpen) return;
      if (wheelCooldown.current) return;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 18) return;

      wheelCooldown.current = true;
      setTimeout(() => {
        wheelCooldown.current = false;
      }, 300);

      if (delta > 0) {
        setActiveIndex((prev) => Math.min(totalProjects - 1, prev + 1));
      } else {
        setActiveIndex((prev) => Math.max(0, prev - 1));
      }
    };

    const handleKeyDown = (e) => {
      if (isAnyModalOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setActiveIndex((prev) => Math.min(totalProjects - 1, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setActiveIndex((prev) => Math.max(0, prev - 1));
      }
    };

    // Touch Swipe Gesture Navigation
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      if (isAnyModalOpen) return;
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e) => {
      if (isAnyModalOpen) return;
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
        if (diffX < 0) {
          setActiveIndex((prev) => Math.min(totalProjects - 1, prev + 1));
        } else {
          setActiveIndex((prev) => Math.max(0, prev - 1));
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isAnyModalOpen, totalProjects]);

  return (
    <div
      className={`fixed inset-0 w-screen h-screen overflow-hidden select-none transition-colors duration-700 ${
        isLight ? 'text-zinc-900' : 'text-white'
      }`}
      style={{ background: currentTheme.cssBg }}
    >
      {/* 3D WebGL Background Canvas */}
      <div className="absolute inset-0 z-0">
        <Scene
          portfolioData={portfolioData}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onInspectProject={(proj) => setInspectedProject(proj)}
          isModalOpen={isAnyModalOpen}
        />
      </div>

      {/* Top Editorial HUD Header */}
      <header className="absolute top-0 left-0 right-0 z-20 px-4 sm:px-10 py-3.5 sm:py-4 flex items-center justify-between pointer-events-none">
        {/* Left: Brand, Mode Switcher & 4 Color Theme Pills */}
        <div className="flex items-center gap-2.5 sm:gap-4 pointer-events-auto">
          <span
            className={`text-[11px] sm:text-xs tracking-[0.25em] uppercase font-mono transition-colors ${
              isLight ? 'text-zinc-950 font-bold' : 'text-white/80 font-medium'
            }`}
          >
            DEVFOLIO © 2026
          </span>

          {/* Light / Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleMode}
            title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            className={`p-1.5 sm:p-2 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
              isLight
                ? 'bg-white hover:bg-zinc-100 border-zinc-300 text-zinc-950 shadow-sm'
                : 'bg-black/50 hover:bg-black/80 border-white/20 text-amber-300'
            }`}
          >
            {isLight ? <Moon size={13} className="text-zinc-950" /> : <Sun size={13} />}
          </button>

          {/* 4 Theme Color Aroma Switcher Pills */}
          <div
            className={`flex items-center gap-1.5 sm:gap-2 border rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 backdrop-blur-md transition-colors ${
              isLight
                ? 'bg-white/90 border-zinc-300 shadow-sm'
                : 'bg-black/45 border-white/15'
            }`}
          >
            {Object.values(THEMES).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setPortfolioData((prev) => ({ ...prev, theme: t.id }))}
                title={`${t.name}`}
                className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer ${
                  portfolioData.theme === t.id
                    ? isLight
                      ? 'scale-125 ring-2 ring-zinc-950 ring-offset-1 ring-offset-white'
                      : 'scale-125 ring-2 ring-white ring-offset-1 ring-offset-black'
                    : 'opacity-50 hover:opacity-100 hover:scale-110'
                }`}
                style={{ backgroundColor: t.pillColor }}
              />
            ))}
          </div>
        </div>

        {/* Center Top Identity Heading */}
        <div className="absolute top-3 sm:top-3.5 left-1/2 -translate-x-1/2 text-center pointer-events-auto px-4 transition-all duration-300">
          <h1
            className={`font-serif text-lg sm:text-xl md:text-2xl tracking-[0.22em] uppercase leading-tight transition-colors duration-300 ${
              isLight ? 'text-zinc-950 font-bold' : 'text-white drop-shadow-md font-normal'
            }`}
          >
            {portfolioData.name}
          </h1>
          <p
            className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase font-mono mt-0.5 transition-colors duration-300"
            style={{
              color: isLight ? currentTheme.accentText : currentTheme.accent,
              fontWeight: isLight ? '700' : '500',
            }}
          >
            {portfolioData.role}
          </p>
        </div>

        {/* Right Interactive Navigation */}
        <nav
          className={`flex items-center gap-4 sm:gap-6 text-xs tracking-[0.22em] uppercase pointer-events-auto font-mono transition-colors ${
            isLight ? 'text-zinc-950 font-bold' : 'text-white/85 font-medium'
          }`}
        >
          <button
            type="button"
            onClick={() => {
              setIsProfileOpen(false);
              setIsContactOpen(false);
              setInspectedProject(null);
              setIsEditorOpen(false);
            }}
            className={`transition cursor-pointer ${
              isLight ? 'text-zinc-950 hover:text-black font-bold' : 'hover:text-white'
            }`}
          >
            Work
          </button>
          <button
            type="button"
            onClick={() => setIsProfileOpen(true)}
            className={`transition cursor-pointer ${
              isLight ? 'text-zinc-950 hover:text-black font-bold' : 'hover:text-white'
            }`}
          >
            Profile
          </button>
          <button
            type="button"
            onClick={() => setIsContactOpen(true)}
            className={`transition cursor-pointer ${
              isLight ? 'text-zinc-950 hover:text-black font-bold' : 'hover:text-white'
            }`}
          >
            Contact
          </button>
        </nav>
      </header>

      {/* Bottom Interactive Carousel Controls & Builder Bar */}
      <footer className="absolute bottom-6 left-0 right-0 z-20 px-4 sm:px-10 flex items-center justify-between pointer-events-none">
        {/* Left: Active Card Indicator Dots */}
        <div
          className={`hidden sm:flex items-center gap-3 pointer-events-auto border backdrop-blur-md px-4 py-2 rounded-full transition-colors ${
            isLight
              ? 'bg-white/90 border-zinc-300 shadow-sm text-zinc-950'
              : 'bg-black/45 border-white/15 text-white/70'
          }`}
        >
          <span className={`text-[11px] tracking-[0.2em] uppercase font-mono ${
            isLight ? 'font-bold text-zinc-950' : 'font-medium'
          }`}>
            GALLERY
          </span>
          <div className="flex items-center gap-1.5">
            {portfolioData.projects.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  activeIndex === idx
                    ? 'w-6'
                    : isLight
                    ? 'w-2 bg-zinc-400 hover:bg-zinc-700'
                    : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
                style={{
                  backgroundColor:
                    activeIndex === idx ? currentTheme.accent : undefined,
                }}
                title={`Project 0${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Center: Prev / Edit Portfolio / Next Controls */}
        <div className="mx-auto flex items-center gap-3 pointer-events-auto">
          <button
            type="button"
            onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
            disabled={activeIndex === 0}
            className={`w-10 h-10 rounded-full border transition flex items-center justify-center cursor-pointer disabled:cursor-not-allowed ${
              isLight
                ? 'bg-white border-zinc-300 text-zinc-950 font-bold disabled:opacity-25 hover:bg-zinc-950 hover:text-white shadow-sm'
                : 'bg-black/50 border-white/20 text-white disabled:opacity-30 hover:bg-white hover:text-black'
            }`}
            aria-label="Previous Project"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => setIsEditorOpen(true)}
            className={`px-7 py-2.5 rounded-full border text-xs tracking-[0.22em] uppercase transition-all duration-300 cursor-pointer shadow-lg ${
              isLight
                ? 'bg-white border-zinc-300 text-zinc-950 font-bold hover:bg-zinc-950 hover:text-white'
                : 'bg-black/65 border-white/20 text-white font-semibold hover:bg-white hover:text-black'
            }`}
            style={{
              borderColor: `${currentTheme.accent}80`,
            }}
          >
            ✦ Edit Portfolio
          </button>

          <button
            type="button"
            onClick={() => setActiveIndex((prev) => Math.min(totalProjects - 1, prev + 1))}
            disabled={activeIndex === totalProjects - 1}
            className={`w-10 h-10 rounded-full border transition flex items-center justify-center cursor-pointer disabled:cursor-not-allowed ${
              isLight
                ? 'bg-white border-zinc-300 text-zinc-950 font-bold disabled:opacity-25 hover:bg-zinc-950 hover:text-white shadow-sm'
                : 'bg-black/50 border-white/20 text-white disabled:opacity-30 hover:bg-white hover:text-black'
            }`}
            aria-label="Next Project"
          >
            →
          </button>
        </div>

        {/* Right: Active Project Quick Label */}
        <div className="hidden sm:block text-right pointer-events-auto">
          <span
            className={`text-[11px] tracking-[0.22em] uppercase font-mono ${
              isLight
                ? 'text-zinc-950 font-bold bg-white/85 border border-zinc-300 px-3 py-1.5 rounded-full shadow-sm'
                : 'text-white/70 font-medium'
            }`}
          >
            ACTIVE // {portfolioData.projects[activeIndex]?.title || 'PROJECT'}
          </span>
        </div>
      </footer>

      {/* Profile Slide-Over Drawer */}
      <ProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        portfolioData={portfolioData}
        mode={mode}
      />

      {/* Contact Direct Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        portfolioData={portfolioData}
        mode={mode}
      />

      {/* Case Study Modal */}
      <CaseStudyModal
        isOpen={Boolean(inspectedProject)}
        onClose={() => setInspectedProject(null)}
        project={inspectedProject}
        mode={mode}
      />

      {/* SaaS Portfolio Maker Studio */}
      <EditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        portfolioData={portfolioData}
        setPortfolioData={setPortfolioData}
        onResetDefault={() => {
          localStorage.removeItem(STORAGE_KEY);
          setPortfolioData(defaultPortfolioData);
          setActiveIndex(0);
        }}
        mode={mode}
      />
    </div>
  );
}
