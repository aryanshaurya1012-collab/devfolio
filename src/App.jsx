import { useState, useEffect, useRef } from 'react'
import Scene from './components/Scene'
import EditorModal from './components/EditorModal'
import ProfileDrawer from './components/ProfileDrawer'
import ContactModal from './components/ContactModal'
import CaseStudyModal from './components/CaseStudyModal'
import { defaultPortfolioData, THEMES } from './data/portfolio'
import { ArrowLeft, ArrowRight, Palette, SlidersHorizontal } from 'lucide-react'

const STORAGE_KEY = 'devos_portfolio_v2'

export default function App() {
  // Step 24: Persistent LocalStorage Engine
  const [portfolioData, setPortfolioData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) return JSON.parse(saved)
    } catch {
      // fallback
    }
    return defaultPortfolioData
  })

  // Modals & Drawers state
  const [isEditing, setIsEditing] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null)

  // Carousel active index and navigation target ref
  const [activeIndex, setActiveIndex] = useState(0)
  const targetIndexRef = useRef(null)

  // Step 23: Scroll Isolation Lock
  const isAnyModalOpen =
    isEditing || isProfileOpen || isContactOpen || Boolean(selectedCaseStudy)

  // Auto-sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolioData))
    } catch {
      // ignore
    }
  }, [portfolioData])

  function handleResetDefault() {
    setPortfolioData(defaultPortfolioData)
    localStorage.removeItem(STORAGE_KEY)
  }

  // Prev / Next Navigation Handlers
  const projects = portfolioData.projects || []
  const totalProjects = projects.length

  function handlePrev() {
    const prev = Math.max(0, activeIndex - 1)
    targetIndexRef.current = prev
    setActiveIndex(prev)
  }

  function handleNext() {
    const next = Math.min(totalProjects - 1, activeIndex + 1)
    targetIndexRef.current = next
    setActiveIndex(next)
  }

  function handleGoToIndex(index) {
    targetIndexRef.current = index
    setActiveIndex(index)
  }

  // Theme configuration
  const currentThemeKey = portfolioData.theme || 'amber'
  const currentTheme = THEMES[currentThemeKey] || THEMES.amber

  function cycleTheme() {
    const keys = Object.keys(THEMES)
    const currentIdx = keys.indexOf(currentThemeKey)
    const nextKey = keys[(currentIdx + 1) % keys.length]
    setPortfolioData((prev) => ({ ...prev, theme: nextKey }))
  }

  return (
    // Step 1: Rich Atmospheric Background & Step 3: Global Reset
    <div
      className="fixed inset-0 w-screen h-screen overflow-hidden text-[#e0e0e0] font-sans select-none"
      style={{
        background: currentTheme.cssBg,
      }}
    >
      {/* 3D WebGL Canvas Layer */}
      <div
        className={`absolute inset-0 z-0 ${
          isAnyModalOpen ? 'pointer-events-none' : 'pointer-events-auto'
        }`}
      >
        <Scene
          portfolioData={portfolioData}
          isEditing={isAnyModalOpen}
          onOpenCaseStudy={(proj) => setSelectedCaseStudy(proj)}
          onActiveIndexChange={(idx) => setActiveIndex(idx)}
          targetIndexRef={targetIndexRef}
        />
      </div>

      {/* Step 21: Working Interactive Header HUD */}
      <header className="absolute top-0 left-0 w-full p-6 sm:p-8 flex justify-between items-center z-20 pointer-events-none mix-blend-difference select-none">
        {/* Left: devfolio © 2026 */}
        <div className="font-sans text-xs tracking-[0.2em] text-[#bbb] uppercase font-medium">
          devfolio &copy; 2026
        </div>

        {/* Center: Dynamic Name */}
        <div className="font-serif text-lg sm:text-2xl tracking-widest text-white uppercase font-normal text-center">
          {portfolioData.name || 'SHAURYA ARYAN'}
        </div>

        {/* Right: Working Navigation Links */}
        <nav
          className="pointer-events-auto flex items-center gap-5 sm:gap-7 font-sans text-xs tracking-widest text-[#aaa] uppercase"
          aria-label="Primary Navigation"
        >
          <button
            type="button"
            onClick={() => handleGoToIndex(0)}
            className="hover:text-white transition-colors cursor-pointer uppercase"
          >
            Work
          </button>
          <button
            type="button"
            onClick={() => setIsProfileOpen(true)}
            className="hover:text-white transition-colors cursor-pointer uppercase"
          >
            Profile
          </button>
          <button
            type="button"
            onClick={() => setIsContactOpen(true)}
            className="hover:text-white transition-colors cursor-pointer uppercase"
          >
            Contact
          </button>
          <button
            type="button"
            onClick={cycleTheme}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 p-1 rounded-full border border-white/20 hover:border-white text-[11px]"
            title={`Current Theme: ${currentTheme.name} (Click to Cycle)`}
          >
            <Palette size={13} style={{ color: currentTheme.accent }} />
          </button>
        </nav>
      </header>

      {/* Step 22: Bottom Carousel Controller & Editor HUD */}
      <footer className="absolute bottom-6 sm:bottom-8 left-0 w-full px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 z-20 pointer-events-none select-none">
        {/* Left: Project Progress Counter & Dots */}
        <div className="pointer-events-auto flex items-center gap-3">
          <span className="font-mono text-xs text-white/90 font-medium tracking-widest">
            0{activeIndex + 1} // 0{Math.max(1, totalProjects)}
          </span>

          <div className="flex items-center gap-1.5 ml-2">
            {projects.map((p, idx) => (
              <button
                key={p.id || idx}
                type="button"
                onClick={() => handleGoToIndex(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  activeIndex === idx
                    ? 'w-6 bg-white shadow-sm'
                    : 'w-1.5 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Jump to project ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Center: Prev / Next Buttons */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className="p-2.5 rounded-full border border-white/15 bg-black/40 backdrop-blur-md text-white/80 hover:text-white hover:border-white/40 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
            aria-label="Previous Project"
          >
            <ArrowLeft size={15} />
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={activeIndex >= totalProjects - 1}
            className="p-2.5 rounded-full border border-white/15 bg-black/40 backdrop-blur-md text-white/80 hover:text-white hover:border-white/40 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
            aria-label="Next Project"
          >
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Right: Sleek SaaS Studio Trigger Pill */}
        <div className="pointer-events-auto">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="px-5 py-2 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-zinc-300 hover:text-white text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <SlidersHorizontal size={13} />
            <span>Edit Portfolio</span>
          </button>
        </div>
      </footer>

      {/* Step 26: Project Case Study Modal */}
      <CaseStudyModal
        project={selectedCaseStudy}
        isOpen={Boolean(selectedCaseStudy)}
        onClose={() => setSelectedCaseStudy(null)}
      />

      {/* Step 21: Profile & Skills Drawer */}
      <ProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        portfolioData={portfolioData}
      />

      {/* Step 21: Direct Connect Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        portfolioData={portfolioData}
      />

      {/* Step 27: SaaS Matrix Studio Modal */}
      <EditorModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        portfolioData={portfolioData}
        setPortfolioData={setPortfolioData}
        onResetDefault={handleResetDefault}
      />
    </div>
  )
}
