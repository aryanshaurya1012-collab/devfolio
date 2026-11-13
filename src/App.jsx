import { useState, useEffect } from 'react'
import Scene from './components/Scene'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Profile', href: '#profile' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

export default function App() {
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
      {/* 3D WebGL Scene */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      {/* HUD Overlay with CRT monitor edge simulation */}
      <div
        className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 md:p-8"
        style={{ boxShadow: 'inset 0 0 100px rgba(0,0,0,0.9)' }}
      >
        {/* Top Header */}
        <header className="flex items-center justify-between w-full">
          {/* Top-left: Blinking REC and Live Timestamp */}
          <div className="flex items-center gap-3 font-mono text-xs sm:text-sm tracking-widest">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="font-bold text-red-500">REC</span>
            </div>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-400">{time || '00:00:00:00'}</span>
          </div>

          {/* Top-right: Navigation Links */}
          <nav
            className="pointer-events-auto flex items-center gap-5 sm:gap-8 font-mono text-xs sm:text-sm tracking-wider uppercase"
            aria-label="Main Navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-zinc-400 hover:text-cyan-400 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </header>

        {/* Bottom Status Telemetry */}
        <footer className="flex items-center justify-between w-full font-mono text-[10px] sm:text-xs text-zinc-500 tracking-wider">
          <div className="flex items-center gap-3">
            <span className="text-cyan-500/80">SYS.ONLINE</span>
            <span>::</span>
            <span>CH_01_FEED</span>
          </div>
          <div>CRT_RENDER_V1 // 60HZ</div>
        </footer>
      </div>
    </div>
  )
}
