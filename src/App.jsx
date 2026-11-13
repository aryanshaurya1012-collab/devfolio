import React, { useState, useEffect, useRef } from 'react';
import Scene from './components/Scene';
import ProfileDrawer from './components/ProfileDrawer';
import ContactModal from './components/ContactModal';
import CaseStudyModal from './components/CaseStudyModal';
import EditorModal from './components/EditorModal';
import { defaultPortfolioData, THEMES } from './data/portfolio';

export default function App() {
  const [portfolioData, setPortfolioData] = useState(() => {
    try {
      const saved = localStorage.getItem('devos_portfolio_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.projects?.length) return parsed;
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
      localStorage.setItem('devos_portfolio_v2', JSON.stringify(portfolioData));
    } catch (e) {
      console.error(e);
    }
  }, [portfolioData]);

  const totalProjects = portfolioData.projects?.length || 1;
  const currentTheme = THEMES[portfolioData.theme] || THEMES.obsidian || THEMES.amber;
  const isAnyModalOpen = isEditorOpen || isProfileOpen || isContactOpen || Boolean(inspectedProject);

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

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAnyModalOpen, totalProjects]);

  return (
    <div
      className="fixed inset-0 w-screen h-screen overflow-hidden select-none text-white transition-colors duration-700"
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
      <header className="absolute top-0 left-0 right-0 z-20 px-6 sm:px-12 py-7 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          <span className="text-xs tracking-[0.25em] uppercase text-white/75 font-mono font-medium">
            DEVFOLIO © 2026
          </span>
          {/* Theme Aroma Switcher Pills */}
          <div className="hidden md:flex items-center gap-1.5 bg-black/40 border border-white/15 rounded-full px-3 py-1 backdrop-blur-md">
            {Object.entries(THEMES).map(([key, t]) => (
              <button
                key={key}
                type="button"
                onClick={() => setPortfolioData((prev) => ({ ...prev, theme: key }))}
                title={t.name}
                className={`w-3.5 h-3.5 rounded-full transition-transform cursor-pointer ${
                  portfolioData.theme === key ? 'scale-125 ring-2 ring-white' : 'opacity-60 hover:opacity-100'
                }`}
                style={{ backgroundColor: t.keyLight }}
              />
            ))}
          </div>
        </div>

        {/* Center Identity */}
        <div className="text-center pointer-events-auto">
          <h1 className="font-serif text-xl sm:text-2xl tracking-[0.2em] uppercase text-white drop-shadow">
            {portfolioData.name}
          </h1>
          <p className="text-[10px] tracking-[0.3em] uppercase text-amber-300/80 hidden sm:block">
            {portfolioData.role}
          </p>
        </div>

        {/* Right Interactive Navigation */}
        <nav className="flex items-center gap-6 text-xs tracking-[0.22em] uppercase pointer-events-auto font-mono">
          <button
            type="button"
            onClick={() => {
              setIsProfileOpen(false);
              setIsContactOpen(false);
              setInspectedProject(null);
              setIsEditorOpen(false);
            }}
            className="text-white hover:text-amber-300 transition cursor-pointer"
          >
            Work
          </button>
          <button
            type="button"
            onClick={() => setIsProfileOpen(true)}
            className="text-white/80 hover:text-amber-300 transition cursor-pointer"
          >
            Profile
          </button>
          <button
            type="button"
            onClick={() => setIsContactOpen(true)}
            className="text-white/80 hover:text-amber-300 transition cursor-pointer"
          >
            Contact
          </button>
        </nav>
      </header>

      {/* Bottom Interactive Carousel Controls & Builder Bar */}
      <footer className="absolute bottom-7 left-0 right-0 z-20 px-6 sm:px-12 flex items-center justify-between pointer-events-none">
        {/* Left: Active Card Indicator Dots */}
        <div className="hidden sm:flex items-center gap-3 pointer-events-auto bg-black/45 border border-white/15 backdrop-blur-md px-4 py-2 rounded-full">
          <span className="text-[11px] tracking-[0.2em] uppercase text-white/70 font-mono">
            GALLERY
          </span>
          <div className="flex items-center gap-1.5">
            {portfolioData.projects.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  activeIndex === idx ? 'w-6 bg-amber-400' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
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
            className="w-10 h-10 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white disabled:opacity-30 hover:bg-white hover:text-black transition flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
            aria-label="Previous Project"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => setIsEditorOpen(true)}
            className="px-7 py-2.5 rounded-full border border-amber-400/50 bg-black/65 backdrop-blur-xl text-white text-xs font-semibold tracking-[0.22em] uppercase hover:bg-amber-400 hover:text-black shadow-[0_0_30px_rgba(245,158,11,0.25)] transition-all duration-300 cursor-pointer"
          >
            ✦ Edit Portfolio
          </button>

          <button
            type="button"
            onClick={() => setActiveIndex((prev) => Math.min(totalProjects - 1, prev + 1))}
            disabled={activeIndex === totalProjects - 1}
            className="w-10 h-10 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white disabled:opacity-30 hover:bg-white hover:text-black transition flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
            aria-label="Next Project"
          >
            →
          </button>
        </div>

        {/* Right: Active Project Quick Label */}
        <div className="hidden sm:block text-right pointer-events-auto">
          <span className="text-[11px] tracking-[0.22em] uppercase text-white/60 font-mono">
            ACTIVE // {portfolioData.projects[activeIndex]?.title || 'PROJECT'}
          </span>
        </div>
      </footer>

      {/* Profile Slide-Over Drawer */}
      <ProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        portfolioData={portfolioData}
      />

      {/* Contact Direct Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        portfolioData={portfolioData}
      />

      {/* Case Study Modal */}
      <CaseStudyModal
        isOpen={Boolean(inspectedProject)}
        onClose={() => setInspectedProject(null)}
        project={inspectedProject}
      />

      {/* SaaS Portfolio Maker Studio */}
      <EditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        portfolioData={portfolioData}
        setPortfolioData={setPortfolioData}
        onResetDefault={() => {
          localStorage.removeItem('devos_portfolio_v2');
          setPortfolioData(defaultPortfolioData);
          setActiveIndex(0);
        }}
      />
    </div>
  );
}
