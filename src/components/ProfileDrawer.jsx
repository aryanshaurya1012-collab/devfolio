import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, ExternalLink, Code2, AtSign, Link2, Mail } from 'lucide-react'

export default function ProfileDrawer({ isOpen, onClose, portfolioData }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-md">
          {/* Backdrop Dismiss */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
          />

          {/* Slide-Over Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full sm:w-[480px] h-full bg-[#0d0a12]/95 border-l border-white/10 backdrop-blur-2xl p-8 sm:p-10 flex flex-col justify-between overflow-y-auto shadow-2xl text-[#e0e0e0] font-sans"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                  ARCHITECT // PROFILE
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="font-sans text-xs text-zinc-400 hover:text-white px-3 py-1.5 rounded-full border border-white/10 hover:border-white transition-all flex items-center gap-1 cursor-pointer"
                >
                  <X size={14} />
                  <span>Close</span>
                </button>
              </div>

              {/* Bio & Details */}
              <div className="pt-8 space-y-6">
                <div>
                  <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
                    {portfolioData.name || 'ALEXANDER VANE'}
                  </h3>
                  <p className="font-sans text-sm text-amber-400/90 font-medium tracking-wide mt-1">
                    {portfolioData.role || 'Creative Developer & Systems Architect'}
                  </p>

                  {portfolioData.location && (
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-2 font-mono">
                      <MapPin size={13} className="text-zinc-500" />
                      <span>{portfolioData.location}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h4 className="font-sans text-xs uppercase tracking-widest text-zinc-400 mb-2.5">
                    Statement &amp; Background
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {portfolioData.bio ||
                      'Designing high-performance WebGL interfaces, decentralized protocols, and AI-driven security systems.'}
                  </p>
                </div>

                {/* Skills Stack */}
                <div className="pt-4 border-t border-white/10">
                  <h4 className="font-sans text-xs uppercase tracking-widest text-zinc-400 mb-3">
                    Core Technical Arsenal
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(portfolioData.skills || []).map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-xs font-mono font-medium text-zinc-200 bg-white/5 border border-white/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Connect */}
                <div className="pt-4 border-t border-white/10">
                  <h4 className="font-sans text-xs uppercase tracking-widest text-zinc-400 mb-3">
                    Direct Network &amp; Code
                  </h4>
                  <div className="space-y-2.5">
                    {portfolioData.socials?.github && (
                      <a
                        href={portfolioData.socials.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/30 text-xs font-mono text-zinc-300 hover:text-white transition-all group"
                      >
                        <div className="flex items-center gap-2.5">
                          <Code2 size={16} className="text-amber-400" />
                          <span>GitHub Repository</span>
                        </div>
                        <ExternalLink
                          size={13}
                          className="text-zinc-500 group-hover:text-white transition-colors"
                        />
                      </a>
                    )}

                    {portfolioData.socials?.linkedin && (
                      <a
                        href={portfolioData.socials.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/30 text-xs font-mono text-zinc-300 hover:text-white transition-all group"
                      >
                        <div className="flex items-center gap-2.5">
                          <Link2 size={16} className="text-amber-400" />
                          <span>LinkedIn Network</span>
                        </div>
                        <ExternalLink
                          size={13}
                          className="text-zinc-500 group-hover:text-white transition-colors"
                        />
                      </a>
                    )}

                    {portfolioData.socials?.twitter && (
                      <a
                        href={portfolioData.socials.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/30 text-xs font-mono text-zinc-300 hover:text-white transition-all group"
                      >
                        <div className="flex items-center gap-2.5">
                          <AtSign size={16} className="text-amber-400" />
                          <span>X / Twitter</span>
                        </div>
                        <ExternalLink
                          size={13}
                          className="text-zinc-500 group-hover:text-white transition-colors"
                        />
                      </a>
                    )}

                    {portfolioData.socials?.email && (
                      <a
                        href={`mailto:${portfolioData.socials.email}`}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/30 text-xs font-mono text-zinc-300 hover:text-white transition-all group"
                      >
                        <div className="flex items-center gap-2.5">
                          <Mail size={16} className="text-amber-400" />
                          <span>{portfolioData.socials.email}</span>
                        </div>
                        <ExternalLink
                          size={13}
                          className="text-zinc-500 group-hover:text-white transition-colors"
                        />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-8 border-t border-white/10 font-mono text-[10px] text-zinc-500 flex items-center justify-between">
              <span>DEV-OS ARCHITECTURE</span>
              <span>2026 EDITION</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

