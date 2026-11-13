import React, { useState, useEffect, useRef } from 'react';
import Scene from './components/Scene';
import EditorCommandCenter from './components/EditorCommandCenter';
import { defaultPortfolioData, THEMES } from './data/portfolio';

export default function App() {
  const [portfolioData, setPortfolioData] = useState(() => {
    try {
      const saved = localStorage.getItem('devos_portfolio_v2');
      return saved ? JSON.parse(saved) : defaultPortfolioData;
    } catch {
      return defaultPortfolioData;
    }
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState(null); // 'profile' | 'contact' | null
  const [inspectedProject, setInspectedProject] = useState(null);
  const wheelCooldown = useRef(false);

  useEffect(() => {
    try {
      localStorage.setItem('devos_portfolio_v2', JSON.stringify(portfolioData));
    } catch (e) {
      console.error(e);
    }
  }, [portfolioData]);

  const totalProjects = portfolioData.projects.length;
  const currentTheme = THEMES[portfolioData.theme] || THEMES.amber;
  const isAnyModalOpen = isEditorOpen || Boolean(activeDrawer) || Boolean(inspectedProject);

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
      }, 320);

      if (delta > 0) {
        setActiveIndex((prev) => Math.min(totalProjects - 1, prev + 1));
      } else {
        setActiveIndex((prev) => Math.max(0, prev - 1));
      }
    };

    const handleKeyDown = (e) => {
      if (isAnyModalOpen) return;
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => Math.min(totalProjects - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
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
      className="fixed inset-0 w-screen h-screen overflow-hidden select-none text-white"
      style={{ background: currentTheme.cssBg }}
    >
      {/* 3D WebGL Background Canvas */}
      <div className="absolute inset-0 z-0">
        <Scene activeIndex="{activeIndex}" onInspectProject="{(proj)" portfolioData="{portfolioData}" setActiveIndex="{setActiveIndex}"> setInspectedProject(proj)}
          isModalOpen={isAnyModalOpen}
        />
      </div>

      {/* Top Editorial HUD Header */}
      <header className="absolute top-0 left-0 right-0 z-20 px-6 sm:px-12 py-7 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          <span className="text-xs tracking-[0.25em] uppercase text-white/75 font-medium">
            DEVFOLIO © 2026
          </span>
          {/* Theme Aroma Switcher Pills */}
          <div className="hidden md:flex items-center gap-1.5 bg-black/40 border border-white/15 rounded-full px-3 py-1 backdrop-blur-md">
            {Object.entries(THEMES).map(([key, t]) => (
              <button
                key={key}
                onClick={() => setPortfolioData((prev) => ({ ...prev, theme: key }))}
                title={t.name}
                className={`w-3.5 h-3.5 rounded-full transition-transform ${portfolioData.theme === key ? 'scale-125 ring-2 ring-white' : 'opacity-60 hover:opacity-100'
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
        <nav className="flex items-center gap-6 text-xs tracking-[0.22em] uppercase pointer-events-auto">
          <button
            onClick={() => {
              setActiveDrawer(null);
              setInspectedProject(null);
            }}
            className="text-white hover:text-amber-300 transition"
          >
            Work
          </button>
          <button
            onClick={() => setActiveDrawer('profile')}
            className="text-white/80 hover:text-amber-300 transition"
          >
            Profile
          </button>
          <button
            onClick={() => setActiveDrawer('contact')}
            className="text-white/80 hover:text-amber-300 transition"
          >
            Contact
          </button>
        </nav>
      </header>

      {/* Bottom Interactive Carousel Controls & Builder Bar */}
      <footer className="absolute bottom-7 left-0 right-0 z-20 px-6 sm:px-12 flex items-center justify-between pointer-events-none">
        {/* Left: Active Card Counter */}
        <div className="hidden sm:flex items-center gap-3 pointer-events-auto bg-black/45 border border-white/15 backdrop-blur-md px-4 py-2 rounded-full">
          <span className="text-[11px] tracking-[0.2em] uppercase text-white/70">
            SCROLL OR CLICK
          </span>
          <div className="flex items-center gap-1.5">
            {portfolioData.projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${activeIndex === idx ? 'w-6 bg-amber-400' : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Center: Prev / Edit Portfolio / Next Controls */}
        <div className="mx-auto flex items-center gap-3 pointer-events-auto">
          <button
            onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
            disabled={activeIndex === 0}
            className="w-10 h-10 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white disabled:opacity-30 hover:bg-white hover:text-black transition flex items-center justify-center"
          >
            ←
          </button>

          <button
            onClick={() => setIsEditorOpen(true)}
            className="px-7 py-2.5 rounded-full border border-amber-400/50 bg-black/65 backdrop-blur-xl text-white text-xs font-semibold tracking-[0.22em] uppercase hover:bg-amber-400 hover:text-black shadow-[0_0_30px_rgba(245,158,11,0.25)] transition-all duration-300"
          >
            ✦ Edit Portfolio
          </button>

          <button
            onClick={() => setActiveIndex((prev) => Math.min(totalProjects - 1, prev + 1))}
            disabled={activeIndex === totalProjects - 1}
            className="w-10 h-10 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white disabled:opacity-30 hover:bg-white hover:text-black transition flex items-center justify-center"
          >
            →
          </button>
        </div>

        {/* Right: Active Project Quick Label */}
        <div className="hidden sm:block text-right pointer-events-auto">
          <span className="text-[11px] tracking-[0.22em] uppercase text-white/60">
            ACTIVE // {portfolioData.projects[activeIndex]?.title}
          </span>
        </div>
      </footer>

      {/* Profile & Contact Drawer Modal */}
      {activeDrawer && (
        <div
          onClick={() => setActiveDrawer(null)}
          className="fixed inset-0 z-40 bg-black/75 backdrop-blur-xl flex items-center justify-center p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-[#15111c] border border-white/20 rounded-3xl p-8 text-white shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs tracking-[0.25em] uppercase text-amber-400">
                {activeDrawer === 'profile' ? '01 // ARCHITECT PROFILE' : '02 // DIRECT DISPATCH'}
              </span>
              <button
                onClick={() => setActiveDrawer(null)}
                className="text-xs uppercase tracking-widest px-3 py-1 rounded-lg bg-white/10 hover:bg-white hover:text-black"
              >
                Close ✕
              </button>
            </div>

            {activeDrawer === 'profile' ? (
              <div>
                <h2 className="font-serif text-4xl mb-2">{portfolioData.name}</h2>
                <p className="text-sm text-amber-300 mb-5">{portfolioData.role}</p>
                <p className="text-sm text-zinc-300 leading-relaxed mb-6">{portfolioData.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {(portfolioData.skills || []).map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/15"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="font-serif text-4xl mb-2">Initiate Contact</h2>
                <p className="text-sm text-zinc-300">
                  Available for Web3 hackathons, full-stack engineering roles, and creative collaborations.
                </p>
                <div className="pt-4 flex flex-col gap-3">
                  <a
                    href={`mailto:${portfolioData.socials?.email || 'hello@example.com'}`}
                    className="w-full py-3 rounded-xl bg-amber-400 text-black font-semibold text-center text-xs uppercase tracking-widest"
                  >
                    Send Direct Email ↗
                  </a>
                  <a
                    href={portfolioData.socials?.github || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 rounded-xl bg-white/10 border border-white/15 text-center text-xs uppercase tracking-widest hover:bg-white hover:text-black transition"
                  >
                    GitHub Profile ↗
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Inspected Project Case Study Modal */}
      {inspectedProject && (
        <div
          onClick={() => setInspectedProject(null)}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xl flex items-center justify-center p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#16121e] border border-white/20 rounded-3xl p-8 text-white shadow-2xl"
          >
            <span className="text-xs tracking-[0.2em] uppercase text-amber-400">
              {inspectedProject.category} • {inspectedProject.year}
            </span>
            <h2 className="font-serif text-5xl uppercase my-3">{inspectedProject.title}</h2>
            <p className="text-sm text-zinc-300 leading-relaxed mb-6">
              {inspectedProject.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {(Array.isArray(inspectedProject.tech)
                ? inspectedProject.tech
                : String(inspectedProject.tech).split(',')
              ).map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs bg-white/10 border border-white/15 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              <a
                href={inspectedProject.liveUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 rounded-xl bg-white text-black font-semibold text-center text-xs uppercase tracking-widest hover:bg-amber-400 transition"
              >
                Launch Project ↗
              </a>
              <button
                onClick={() => setInspectedProject(null)}
                className="px-6 py-3 rounded-xl border border-white/20 text-xs uppercase tracking-widest hover:bg-white/10"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SaaS Portfolio Maker Studio */}
      <EditorCommandCenter isOpen="{isEditorOpen}" onClose="{()"> setIsEditorOpen(false)}
        portfolioData={portfolioData}
        setPortfolioData={setPortfolioData}
        onReset={() => {
          localStorage.removeItem('devos_portfolio_v2');
          setPortfolioData(defaultPortfolioData);
          setActiveIndex(0);
        }}
      />
    </div>
  );
}