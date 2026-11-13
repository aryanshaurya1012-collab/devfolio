import { useState, useEffect } from 'react'
import Scene from './components/Scene'
import EditorForm from './components/EditorForm'

const INITIAL_PORTFOLIO = {
  name: 'ALEXANDER VANE',
  role: 'WEB3 & GRAPHICS ENGINEER',
  bio: 'Designing real-time decentralized interfaces and high-performance WebGL systems.',
  projects: [
    {
      id: 'proj-1',
      title: 'AETHER PROTOCOL',
      tech: 'SOLIDITY',
      category: 'DEFI',
      description: 'Decentralized liquidity visualizer with real-time on-chain telemetry.',
    },
    {
      id: 'proj-2',
      title: 'NEURAL NEXUS',
      tech: 'TYPESCRIPT',
      category: 'AI NODE',
      description: 'Generative AI node orchestrator and monitoring console.',
    },
    {
      id: 'proj-3',
      title: 'CHRONO MATRIX',
      tech: 'GLSL / WEBAUDIO',
      category: 'CREATIVE',
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
    <div className="relative w-screen h-screen overflow-hidden bg-black select-none">
      {/* 3D WebGL Scene Preview in Background */}
      <div className="absolute inset-0 z-0">
        <Scene portfolioData={portfolioData} />
      </div>

      {/* Left Glassmorphic Sidebar (Portfolio Editor) */}
      <aside
        className={`absolute left-0 top-0 h-full w-full sm:w-[400px] bg-black/50 backdrop-blur-xl border-r border-white/10 z-20 p-6 md:p-8 overflow-y-auto transition-transform duration-300 ease-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <EditorForm
          portfolioData={portfolioData}
          setPortfolioData={setPortfolioData}
        />
      </aside>

      {/* Floating Sidebar Toggle Button */}
      <button
        type="button"
        onClick={() => setSidebarOpen((open) => !open)}
        className="absolute top-6 left-6 z-30 pointer-events-auto bg-black/60 hover:bg-black/90 border border-white/20 text-zinc-300 hover:text-white font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-md backdrop-blur-md transition-all shadow-lg flex items-center gap-2"
        style={{ left: sidebarOpen ? '416px' : '24px' }}
      >
        <span
          className={`inline-block w-2 h-2 rounded-full ${
            sidebarOpen ? 'bg-purple-400' : 'bg-emerald-400'
          }`}
        />
        <span>{sidebarOpen ? 'HIDE BUILDER' : 'SHOW BUILDER'}</span>
      </button>

      {/* HUD Overlay with CRT Monitor Edge Simulation */}
      <div
        className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 md:p-8"
        style={{ boxShadow: 'inset 0 0 100px rgba(0,0,0,0.9)' }}
      >
        {/* Top Header */}
        <header className="flex items-center justify-between w-full">
          {/* Top-left: Blinking REC and Live Timestamp (visible when sidebar is closed or on wider screens) */}
          <div
            className={`flex items-center gap-3 font-mono text-xs sm:text-sm tracking-widest transition-opacity duration-200 ${
              sidebarOpen ? 'opacity-0 md:opacity-100 md:ml-[500px]' : 'opacity-100 ml-36 sm:ml-40'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="font-bold text-red-500">REC</span>
            </div>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-400">{time || '00:00:00:00'}</span>
          </div>

          {/* Top-right: HUD System Tags */}
          <div className="pointer-events-auto flex items-center gap-4 sm:gap-6 font-mono text-[11px] sm:text-xs tracking-wider uppercase text-zinc-400">
            <span className="hidden lg:inline text-purple-400">TXSIGHT // DYNAMIC 3D ENGINE</span>
            <span className="text-emerald-400 font-semibold">ONLINE</span>
          </div>
        </header>

        {/* Bottom Status Telemetry */}
        <footer className="flex items-center justify-between w-full font-mono text-[10px] sm:text-xs text-zinc-500 tracking-wider">
          <div
            className={`flex items-center gap-3 transition-all duration-200 ${
              sidebarOpen ? 'ml-0 sm:ml-[400px]' : 'ml-0'
            }`}
          >
            <span className="text-cyan-400">PREVIEW_MODE</span>
            <span>::</span>
            <span>{portfolioData.projects?.length || 0} CARDS MOUNTED</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-zinc-400/80 animate-pulse">
              SCROLL PREVIEW //
            </span>
            <span>60FPS EASED</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
