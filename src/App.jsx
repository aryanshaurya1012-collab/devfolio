import { useState } from 'react'
import Scene from './components/Scene'
import EditorModal from './components/EditorModal'

const INITIAL_PORTFOLIO = {
  name: 'ALEXANDER VANE',
  role: 'Creative Developer & Architect',
  bio: 'A minimal study in digital presence, editorial typography, and physical WebGL materiality.',
  socials: {
    github: 'github.com/avane',
    twitter: 'x.com/avane_dev',
    linkedin: 'linkedin.com/in/avane',
  },
  projects: [
    {
      id: 'proj-1',
      title: 'Aether',
      description:
        'A minimal study in digital presence, editorial typography, and physical WebGL materiality.',
      year: 'YEAR // 2026',
      tech: 'React · WebGL',
    },
    {
      id: 'proj-2',
      title: 'Monolith',
      description:
        'High-fidelity generative architecture visualizer with real-time reactive shaders.',
      year: 'YEAR // 2025',
      tech: 'GLSL · Three.js',
    },
    {
      id: 'proj-3',
      title: 'Chronos',
      description:
        'A sonic and spatial interface inspired by mid-century audio engineering.',
      year: 'YEAR // 2024',
      tech: 'WebAudio · Canvas',
    },
    {
      id: 'proj-4',
      title: 'Kinesis',
      description:
        'Experimental kinetic typography engine exploring fluid dynamics in browser canvas.',
      year: 'YEAR // 2023',
      tech: 'GLSL · WebGPU',
    },
  ],
}

export default function App() {
  const [portfolioData, setPortfolioData] = useState(INITIAL_PORTFOLIO)
  const [isEditing, setIsEditing] = useState(false)

  return (
    // Step 3: Strict root wrapper preventing scroll breaking
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#050505] text-[#e0e0e0]">
      {/* 3D WebGL Canvas Layer */}
      <div
        className={`absolute inset-0 z-0 ${
          isEditing ? 'pointer-events-none' : 'pointer-events-auto'
        }`}
      >
        <Scene portfolioData={portfolioData} isEditing={isEditing} />
      </div>

      {/* Step 11: Minimalist Header HUD */}
      <header className="absolute top-0 left-0 w-full p-8 flex justify-between items-start z-20 pointer-events-none mix-blend-difference select-none">
        {/* Left: devfolio © 2026 */}
        <div className="font-sans text-xs tracking-widest text-[#aaa] uppercase">
          devfolio &copy; 2026
        </div>

        {/* Center: Elegant static logo or name */}
        <div className="font-serif text-lg md:text-xl tracking-widest text-[#eaeaea] uppercase font-normal text-center">
          {portfolioData.name || 'ALEXANDER VANE'}
        </div>

        {/* Right: Simple navigation text with pointer-events-auto */}
        <nav
          className="pointer-events-auto flex items-center gap-6 font-sans text-xs tracking-widest text-[#aaa] uppercase"
          aria-label="Navigation"
        >
          <a
            href="#work"
            className="hover:text-white transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            Work
          </a>
          <a
            href="#profile"
            className="hover:text-white transition-colors"
            onClick={(e) => {
              e.preventDefault()
              setIsEditing(true)
            }}
          >
            Profile
          </a>
          <a
            href="#contact"
            className="hover:text-white transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            Contact
          </a>
        </nav>
      </header>

      {/* Step 12: Elegant Editor Toggle Button */}
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-auto px-6 py-2 rounded-full border border-[#333] bg-black/50 backdrop-blur-md text-[#aaa] text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500 cursor-pointer"
      >
        Edit Portfolio
      </button>

      {/* Step 13: Sleek Notion / macOS SaaS Editor Modal */}
      <EditorModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        portfolioData={portfolioData}
        setPortfolioData={setPortfolioData}
      />
    </div>
  )
}
