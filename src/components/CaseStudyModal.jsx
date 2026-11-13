import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Code2, CheckCircle2 } from 'lucide-react'

export default function CaseStudyModal({ project, isOpen, onClose }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!project) return null

  const techList = Array.isArray(project.tech) ? project.tech : []

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-2xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 -z-10"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#0d0a12] border border-white/20 rounded-3xl p-8 sm:p-10 shadow-2xl text-[#e0e0e0] font-sans relative select-none"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: `0 25px 70px -10px ${project.accent}33`,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span
                  className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border"
                  style={{
                    backgroundColor: `${project.accent}18`,
                    borderColor: `${project.accent}50`,
                    color: project.accent || '#f59e0b',
                  }}
                >
                  {project.category || 'CASE STUDY'}
                </span>
                <span className="font-mono text-xs text-zinc-500">
                  {project.year || '2026'}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="text-zinc-400 hover:text-white p-2 rounded-full border border-white/10 hover:border-white transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Title & Accent Glow */}
            <div className="py-6 space-y-4">
              <h2 className="font-serif text-4xl sm:text-5xl text-white font-normal tracking-tight leading-tight">
                {project.title}
              </h2>

              <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Architecture Highlights */}
            <div className="py-6 border-t border-white/10 space-y-4">
              <h4 className="font-sans text-xs uppercase tracking-widest text-zinc-400 font-semibold">
                Architecture &amp; Key Innovations
              </h4>
              <div className="space-y-3 font-sans text-xs sm:text-sm text-zinc-300">
                {(project.highlights || [
                  'High-performance real-time rendering architecture designed for 60+ FPS fidelity.',
                  'Zero-latency state synchronization with reactive physical material pipelines.',
                  'Modular design system with strict type safety and accessible interaction layers.',
                ]).map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5"
                  >
                    <CheckCircle2
                      size={16}
                      className="shrink-0 mt-0.5"
                      style={{ color: project.accent || '#f59e0b' }}
                    />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Arsenal */}
            <div className="py-6 border-t border-white/10 space-y-3">
              <h4 className="font-sans text-xs uppercase tracking-widest text-zinc-400 font-semibold">
                Engine &amp; Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {techList.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-zinc-200 bg-white/5 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-5 rounded-full font-sans text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Launch Live Protocol</span>
                  <ExternalLink size={14} />
                </a>
              )}

              {project.sourceUrl && (
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-5 rounded-full font-sans text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Code2 size={14} />
                  <span>Inspect Source</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

