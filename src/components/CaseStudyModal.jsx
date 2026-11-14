import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Code2, CheckCircle2 } from 'lucide-react';

export default function CaseStudyModal({ project, isOpen, onClose, mode = 'dark' }) {
  const isLight = mode === 'light';

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!project) return null;

  const techList = Array.isArray(project.tech) ? project.tech : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-colors duration-300 ${
            isLight ? 'bg-black/40 backdrop-blur-md' : 'bg-black/80 backdrop-blur-2xl'
          }`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 -z-10 cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full max-w-2xl max-h-[85vh] overflow-y-auto border rounded-3xl p-7 sm:p-10 shadow-2xl font-sans relative select-none ${
              isLight
                ? 'bg-white border-zinc-200 text-zinc-950 shadow-[0_25px_70px_rgba(0,0,0,0.18)]'
                : 'bg-[#0d0a12] border-white/20 text-[#e0e0e0] shadow-2xl'
            }`}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: isLight ? '#ffffff' : '#0d0a12',
              color: isLight ? '#09090b' : '#f4f4f5',
              boxShadow: isLight
                ? `0 25px 70px -10px ${project.accent}30`
                : `0 25px 70px -10px ${project.accent}40`,
            }}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between pb-5 border-b ${
                isLight ? 'border-zinc-200' : 'border-white/10'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border"
                  style={{
                    backgroundColor: `${project.accent}20`,
                    borderColor: `${project.accent}60`,
                    color: isLight ? '#000000' : project.accent || '#f59e0b',
                  }}
                >
                  {project.category || 'CASE STUDY'}
                </span>
                <span
                  className={`font-mono text-xs font-bold ${
                    isLight ? 'text-zinc-700' : 'text-zinc-500'
                  }`}
                >
                  {project.year || '2026'}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className={`p-2 rounded-full border transition-all cursor-pointer ${
                  isLight
                    ? 'text-zinc-800 hover:text-black border-zinc-300 hover:border-black bg-zinc-100 hover:bg-zinc-200'
                    : 'text-zinc-400 hover:text-white border-white/10 hover:border-white'
                }`}
                aria-label="Close Case Study"
              >
                <X size={16} />
              </button>
            </div>

            {/* Title & Accent Glow */}
            <div className="py-6 space-y-3">
              <h2
                className={`font-serif text-3xl sm:text-5xl font-normal tracking-tight leading-tight ${
                  isLight ? 'text-zinc-950 font-medium' : 'text-white'
                }`}
              >
                {project.title}
              </h2>

              <p
                className={`font-sans text-sm sm:text-base leading-relaxed font-normal ${
                  isLight ? 'text-zinc-800' : 'text-zinc-300'
                }`}
              >
                {project.description}
              </p>
            </div>

            {/* Architecture Highlights */}
            <div
              className={`py-6 border-t space-y-4 ${
                isLight ? 'border-zinc-200' : 'border-white/10'
              }`}
            >
              <h4
                className={`font-sans text-xs uppercase tracking-widest font-bold ${
                  isLight ? 'text-zinc-900' : 'text-zinc-400'
                }`}
              >
                Architecture &amp; Key Innovations
              </h4>
              <div className="space-y-3 font-sans text-xs sm:text-sm">
                {(project.highlights || [
                  'High-performance real-time rendering architecture designed for 60+ FPS fidelity.',
                  'Zero-latency state synchronization with reactive physical material pipelines.',
                  'Modular design system with strict type safety and accessible interaction layers.',
                ]).map((highlight, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-2.5 p-3 rounded-xl border ${
                      isLight
                        ? 'bg-zinc-50 border-zinc-200 text-zinc-900 font-medium'
                        : 'bg-white/[0.02] border-white/5 text-zinc-300'
                    }`}
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
            <div
              className={`py-6 border-t space-y-3 ${
                isLight ? 'border-zinc-200' : 'border-white/10'
              }`}
            >
              <h4
                className={`font-sans text-xs uppercase tracking-widest font-bold ${
                  isLight ? 'text-zinc-900' : 'text-zinc-400'
                }`}
              >
                Engine &amp; Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {techList.map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border ${
                      isLight
                        ? 'text-zinc-900 bg-zinc-100 border-zinc-300'
                        : 'text-zinc-200 bg-white/5 border-white/10'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div
              className={`pt-6 border-t flex flex-wrap gap-3 ${
                isLight ? 'border-zinc-200' : 'border-white/10'
              }`}
            >
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex-1 py-3 px-5 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                    isLight
                      ? 'bg-zinc-950 text-white hover:bg-black'
                      : 'bg-white text-black hover:bg-zinc-200'
                  }`}
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
                  className={`flex-1 py-3 px-5 rounded-full font-sans text-xs font-bold uppercase tracking-wider border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isLight
                      ? 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-950'
                      : 'bg-white/5 hover:bg-white/10 border-white/15 text-zinc-300 hover:text-white'
                  }`}
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
  );
}
