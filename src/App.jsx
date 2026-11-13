import { useState, useEffect } from 'react'
import Scene from './components/Scene'
import EditorCommandCenter from './components/EditorCommandCenter'

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
      description:
        'Decentralized liquidity visualizer with real-time on-chain telemetry and reactive shaders.',
    },
    {
      id: 'proj-2',
      title: 'NEURAL NEXUS',
      tech: 'TypeScript, WebGL, Node.js',
      category: 'AI Node',
      description:
        'Generative AI node orchestrator and monitoring console with sub-millisecond dispatch.',
    },
    {
      id: 'proj-3',
      title: 'CHRONO MATRIX',
      tech: 'GLSL, WebAudio, Vite',
      category: 'Creative',
      description:
        'Spatial audio synth & algorithmic visualizer inspired by retro-futuristic CRT systems.',
    },
    {
      id: 'proj-4',
      title: 'SYNAPSE LABS',
      tech: 'Rust, ZK-Snarks, React',
      category: 'Cryptography',
      description:
        'Zero-knowledge identity verification suite with minimal on-chain biometric proofs.',
    },
  ],
}

export default function App() {
  const [portfolioData, setPortfolioData] = useState(INITIAL_PORTFOLIO)
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
      {/* 100% Full-Screen Cinematic WebGL Canvas */}
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
              DEV-OS // 3D ENGINE
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
            <span className="animate-pulse">
              SCROLL HORIZONTALLY TO NAVIGATE MATRIX
            </span>
            <span>&rarr;</span>
          </div>
        </div>

        {/* Bottom HUD: Status Telemetry */}
        <footer className="flex items-center justify-between w-full font-mono text-[10px] sm:text-xs text-zinc-500 tracking-wider">
          <div className="flex items-center gap-3">
            <span className="text-cyan-400 font-semibold">PREVIEW_MATRIX</span>
            <span>::</span>
            <span>{portfolioData.projects?.length || 0} MODULES LOADED</span>
            <span className="hidden sm:inline text-zinc-600">|</span>
            <span className="hidden sm:inline text-purple-400">
              PHYSICS DAMPENED 60FPS
            </span>
          </div>
          <div className="hidden sm:block text-zinc-600">
            [ FOV 35 // CAMERA CALIBRATED ]
          </div>
        </footer>
      </div>

      {/* Bottom-Docked SaaS Command Center */}
      <EditorCommandCenter
        portfolioData={portfolioData}
        setPortfolioData={setPortfolioData}
      />
    </div>
  )
}
