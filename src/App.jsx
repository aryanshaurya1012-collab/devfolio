import { useState, useEffect } from 'react'
import Scene from './components/Scene'
import EditorForm from './components/EditorForm'

const INITIAL_PORTFOLIO = {
  name: 'ALEXANDER VANE',
  role: 'WEB3 & GRAPHICS ENGINEER',
  bio: 'Designing real-time decentralized interfaces and high-performance WebGL systems.',
  socials: {
    github: 'github.com/avane',
    twitter: 'x.com/avane_dev',
    linkedin: 'linkedin.com/in/avane',
  },
  skills: ['React', 'Three.js', 'Solidity', 'TypeScript', 'WebGL', 'GLSL'],
  projects: [
    {
      id: 'proj-1',
      title: 'AETHER PROTOCOL',
      tech: 'Solidity',
      category: 'DeFi',
      description: 'Decentralized liquidity visualizer with real-time on-chain telemetry.',
    },
    {
      id: 'proj-2',
      title: 'NEURAL NEXUS',
      tech: 'TypeScript',
      category: 'AI Node',
      description: 'Generative AI node orchestrator and monitoring console.',
    },
    {
      id: 'proj-3',
      title: 'CHRONO MATRIX',
      tech: 'GLSL / WebAudio',
      category: 'Creative',
      description: 'Spatial audio synth & algorithmic visualizer inspired by retro systems.',
    },
  ],
}

export default function App() {
  const [portfolioData, setPortfolioData] = useState(INITIAL_PORTFOLIO)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [time, setTime] = useState('')

  useEffect(() => {
    function updateClock() {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const seconds = String(now.getSeconds()).padStart(2, '0')
      const millis = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0')
      setTime(`${hours}:${minutes}:${seconds}:${millis}`)
    }

    updateClock()
    const timer = setInterval(updateClock, 50)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-black select-none">
      {/* Left SaaS Sidebar — fixed width, non-overlapping */}
      {sidebarOpen && (
        <aside className="shrink-0 w-full sm:w-96 h-full bg-[#09090b] border-r border-white/10 shadow-2xl z-20 p-6 overflow-y-auto flex flex-col">
          <EditorForm
            portfolioData={portfolioData}
            setPortfolioData={setPortfolioData}
          />
        </aside>
      )}

      {/* Main 3D Canvas Preview — takes remaining space */}
      <div className="relative flex-1 h-full min-w-0">
        {/* WebGL Scene */}
        <div className="absolute inset-0 z-0">
          <Scene portfolioData={portfolioData} />
        </div>

        {/* Sidebar Toggle Button */}
        <button
          type="button"
          onClick={() => setSidebarOpen((open) => !open)}
          className="absolute top-5 left-5 z-30 bg-black/60 hover:bg-black/90 border border-white/20 text-zinc-300 hover:text-white font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-md backdrop-blur-md transition-all shadow-lg flex items-center gap-2"
        >
          <span
            className={`inline-block w-2 h-2 rounded-full ${
              sidebarOpen ? 'bg-purple-400' : 'bg-emerald-400'
            }`}
          />
          <span>{sidebarOpen ? 'HIDE' : 'BUILDER'}</span>
        </button>

        {/* HUD Overlay with CRT Monitor Edge Simulation */}
        <div
          className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 md:p-8"
          style={{ boxShadow: 'inset 0 0 100px rgba(0,0,0,0.9)' }}
        >
          {/* Top Header */}
          <header className="flex items-center justify-between w-full">
            {/* Top-left: REC + Timestamp */}
            <div className="flex items-center gap-3 font-mono text-xs sm:text-sm tracking-widest ml-32">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="font-bold text-red-500">REC</span>
              </div>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-400">{time || '00:00:00:00'}</span>
            </div>

            {/* Top-right: HUD System Tags */}
            <div className="pointer-events-auto flex items-center gap-4 sm:gap-6 font-mono text-[11px] sm:text-xs tracking-wider uppercase text-zinc-400">
              <span className="hidden lg:inline text-purple-400">
                TXSIGHT // 3D ENGINE
              </span>
              <span className="text-emerald-400 font-semibold">ONLINE</span>
            </div>
          </header>

          {/* Bottom Status Telemetry */}
          <footer className="flex items-center justify-between w-full font-mono text-[10px] sm:text-xs text-zinc-500 tracking-wider">
            <div className="flex items-center gap-3">
              <span className="text-cyan-400">PREVIEW</span>
              <span>::</span>
              <span>{portfolioData.projects?.length || 0} CARDS</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-zinc-400/80 animate-pulse">
                SCROLL //
              </span>
              <span>60FPS EASED</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
