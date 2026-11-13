import { useState, useEffect } from 'react'
import Scene from './components/Scene'
import EditorModal from './components/EditorModal'

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
      tech: 'Solidity, Three.js, React',
      category: 'DeFi',
      description: 'Decentralized liquidity visualizer with real-time on-chain telemetry.',
    },
    {
      id: 'proj-2',
      title: 'NEURAL NEXUS',
      tech: 'TypeScript, WebGL, Node.js',
      category: 'AI Node',
      description: 'Generative AI node orchestrator and monitoring console.',
    },
    {
      id: 'proj-3',
      title: 'CHRONO MATRIX',
      tech: 'GLSL, WebAudio, Vite',
      category: 'Creative',
      description: 'Spatial audio synth & algorithmic visualizer inspired by retro systems.',
    },
    {
      id: 'proj-4',
      title: 'SYNAPSE LABS',
      tech: 'Rust, ZK-Snarks, React',
      category: 'Cryptography',
      description: 'Zero-knowledge identity verification suite with minimal biometric proofs.',
    },
  ],
}

export default function App() {
  const [portfolioData, setPortfolioData] = useState(INITIAL_PORTFOLIO)
  const [isEditing, setIsEditing] = useState(false)
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
      {/* 100% Full-Screen 3D WebGL Canvas */}
      <div className="absolute inset-0 z-0">
        <Scene portfolioData={portfolioData} />
      </div>

      {/* Floating HUD Overlay with CRT Monitor Edge Simulation */}
      <div
        className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 sm:p-8"
        style={{ boxShadow: 'inset 0 0 100px rgba(0,0,0,0.9)' }}
      >
        {/* Top HUD: Display Name and Retro CRT REC Telemetry */}
        <header className="flex items-center justify-between w-full">
          {/* Top-left: REC + Live Timestamp + Identity */}
          <div className="flex items-center gap-3 sm:gap-4 font-mono text-xs sm:text-sm tracking-widest">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" />
              <span className="font-bold text-red-500">REC</span>
            </div>
            <span className="text-zinc-600">//</span>
            <span className="text-zinc-300 font-medium">
              {time ? time.slice(0, 8) : '01:19:14'}
            </span>
            <span className="hidden md:inline text-zinc-600">|</span>
            <span className="hidden md:inline text-cyan-400 font-bold uppercase tracking-wider">
              {portfolioData.name || 'ANONYMOUS'}
            </span>
          </div>

          {/* Top-right: HUD Status Tags */}
          <div className="flex items-center gap-4 font-mono text-[11px] sm:text-xs tracking-wider uppercase text-zinc-400">
            <span className="hidden sm:inline text-purple-400">
              TXSIGHT // 3D MATRIX
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              ONLINE
            </span>
          </div>
        </header>

        {/* Ambient Center Scroll Cue */}
        <div className="w-full flex justify-center opacity-60">
          <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-zinc-500 uppercase flex items-center gap-3">
            <span>&larr;</span>
            <span className="animate-pulse">SCROLL HORIZONTALLY TO EXPLORE MATRIX</span>
            <span>&rarr;</span>
          </div>
        </div>

        {/* Bottom HUD: Status Telemetry & Glowing Modal Launcher */}
        <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full font-mono text-[10px] sm:text-xs text-zinc-500 tracking-wider">
          {/* Left Telemetry */}
          <div className="flex items-center gap-3">
            <span className="text-cyan-400 font-semibold">PREVIEW_MODE</span>
            <span>::</span>
            <span>{portfolioData.projects?.length || 0} CARDS MOUNTED</span>
            <span className="hidden sm:inline text-zinc-600">|</span>
            <span className="hidden sm:inline text-purple-400">60FPS CRT</span>
          </div>

          {/* Glowing Modal Toggle Button */}
          <div className="pointer-events-auto">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="group relative px-6 py-3 rounded-xl font-mono text-xs font-black uppercase tracking-[0.2em] text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:via-indigo-500 hover:to-cyan-400 shadow-[0_0_25px_rgba(153,69,255,0.45)] hover:shadow-[0_0_35px_rgba(20,241,149,0.5)] border border-white/20 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>[ EDIT PORTFOLIO MATRIX ]</span>
            </button>
          </div>
        </footer>
      </div>

      {/* Centered Screen-Filling Editor Modal */}
      <EditorModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        portfolioData={portfolioData}
        setPortfolioData={setPortfolioData}
      />
    </div>
  )
}
