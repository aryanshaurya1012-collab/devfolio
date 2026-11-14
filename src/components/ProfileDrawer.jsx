import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, ExternalLink, Code2, AtSign, Link2, Mail } from 'lucide-react';

export default function ProfileDrawer({ isOpen, onClose, portfolioData, mode = 'dark' }) {
  const isLight = (mode || portfolioData?.mode) === 'light';

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 flex justify-end transition-colors duration-300 ${
            isLight ? 'bg-black/35 backdrop-blur-sm' : 'bg-black/60 backdrop-blur-md'
          }`}
        >
          {/* Backdrop Dismiss */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 cursor-pointer"
          />

          {/* Slide-Over Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`relative z-10 w-full sm:w-[480px] h-full border-l p-7 sm:p-10 flex flex-col justify-between overflow-y-auto shadow-2xl font-sans ${
              isLight
                ? 'bg-white border-zinc-200 text-zinc-950 shadow-[0_25px_70px_rgba(0,0,0,0.18)]'
                : 'bg-[#0d0a12] border-white/10 text-[#e0e0e0] shadow-2xl'
            }`}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: isLight ? '#ffffff' : '#0d0a12',
              color: isLight ? '#09090b' : '#f4f4f5',
            }}
          >
            {/* Header */}
            <div>
              <div
                className={`flex items-center justify-between pb-5 border-b ${
                  isLight ? 'border-zinc-200' : 'border-white/10'
                }`}
              >
                <span
                  className={`font-mono text-xs uppercase tracking-widest font-bold ${
                    isLight ? 'text-zinc-900' : 'text-zinc-500'
                  }`}
                >
                  ARCHITECT // PROFILE
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className={`font-sans text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1 cursor-pointer font-medium ${
                    isLight
                      ? 'text-zinc-900 hover:text-black border-zinc-300 hover:border-black bg-zinc-100 hover:bg-zinc-200'
                      : 'text-zinc-400 hover:text-white border-white/10 hover:border-white'
                  }`}
                >
                  <X size={14} />
                  <span>Close</span>
                </button>
              </div>

              {/* Bio & Details */}
              <div className="pt-8 space-y-6">
                <div>
                  <h3
                    className={`font-serif text-3xl sm:text-4xl leading-tight ${
                      isLight ? 'text-zinc-950 font-bold' : 'text-white font-normal'
                    }`}
                  >
                    {portfolioData.name || 'ALEXANDER VANE'}
                  </h3>
                  <p
                    className={`font-sans text-sm font-bold tracking-wide mt-1.5 ${
                      isLight ? 'text-purple-700' : 'text-amber-400/90'
                    }`}
                  >
                    {portfolioData.role || 'Creative Developer & Systems Architect'}
                  </p>

                  {portfolioData.location && (
                    <div
                      className={`flex items-center gap-1.5 text-xs mt-2 font-mono ${
                        isLight ? 'text-zinc-700 font-bold' : 'text-zinc-400'
                      }`}
                    >
                      <MapPin size={13} className={isLight ? 'text-purple-700' : 'text-zinc-500'} />
                      <span>{portfolioData.location}</span>
                    </div>
                  )}
                </div>

                <div
                  className={`pt-5 border-t ${
                    isLight ? 'border-zinc-200' : 'border-white/10'
                  }`}
                >
                  <h4
                    className={`font-sans text-xs uppercase tracking-widest mb-2.5 font-bold ${
                      isLight ? 'text-zinc-900' : 'text-zinc-400'
                    }`}
                  >
                    Statement &amp; Background
                  </h4>
                  <p
                    className={`font-sans text-xs sm:text-sm leading-relaxed ${
                      isLight ? 'text-zinc-800 font-normal' : 'text-zinc-300'
                    }`}
                  >
                    {portfolioData.bio ||
                      'Specializing in real-time WebGL materiality, distributed systems, and cinematic digital presence.'}
                  </p>
                </div>

                {/* Skills Stack */}
                <div
                  className={`pt-5 border-t ${
                    isLight ? 'border-zinc-200' : 'border-white/10'
                  }`}
                >
                  <h4
                    className={`font-sans text-xs uppercase tracking-widest mb-3 font-bold ${
                      isLight ? 'text-zinc-900' : 'text-zinc-400'
                    }`}
                  >
                    Core Technical Arsenal
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(portfolioData.skills || []).map((skill) => (
                      <span
                        key={skill}
                        className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                          isLight
                            ? 'text-zinc-950 bg-zinc-100 border-zinc-300'
                            : 'text-zinc-200 bg-white/5 border-white/10'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Connect */}
                <div
                  className={`pt-5 border-t ${
                    isLight ? 'border-zinc-200' : 'border-white/10'
                  }`}
                >
                  <h4
                    className={`font-sans text-xs uppercase tracking-widest mb-3 font-bold ${
                      isLight ? 'text-zinc-900' : 'text-zinc-400'
                    }`}
                  >
                    Direct Network &amp; Code
                  </h4>
                  <div className="space-y-2.5">
                    {portfolioData.socials?.github && (
                      <a
                        href={portfolioData.socials.github}
                        target="_blank"
                        rel="noreferrer"
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs font-mono font-bold transition-all group ${
                          isLight
                            ? 'bg-zinc-50 border-zinc-200 hover:border-zinc-900 text-zinc-950 hover:bg-zinc-100'
                            : 'bg-white/[0.03] border-white/10 hover:border-white/30 text-zinc-300 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Code2
                            size={16}
                            className={isLight ? 'text-purple-700' : 'text-amber-400'}
                          />
                          <span>GitHub Repository</span>
                        </div>
                        <ExternalLink
                          size={13}
                          className="text-zinc-500 group-hover:text-current transition-colors"
                        />
                      </a>
                    )}

                    {portfolioData.socials?.linkedin && (
                      <a
                        href={portfolioData.socials.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs font-mono font-bold transition-all group ${
                          isLight
                            ? 'bg-zinc-50 border-zinc-200 hover:border-zinc-900 text-zinc-950 hover:bg-zinc-100'
                            : 'bg-white/[0.03] border-white/10 hover:border-white/30 text-zinc-300 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Link2
                            size={16}
                            className={isLight ? 'text-blue-700' : 'text-sky-400'}
                          />
                          <span>LinkedIn Professional</span>
                        </div>
                        <ExternalLink
                          size={13}
                          className="text-zinc-500 group-hover:text-current transition-colors"
                        />
                      </a>
                    )}

                    {portfolioData.socials?.twitter && (
                      <a
                        href={portfolioData.socials.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs font-mono font-bold transition-all group ${
                          isLight
                            ? 'bg-zinc-50 border-zinc-200 hover:border-zinc-900 text-zinc-950 hover:bg-zinc-100'
                            : 'bg-white/[0.03] border-white/10 hover:border-white/30 text-zinc-300 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <AtSign
                            size={16}
                            className={isLight ? 'text-pink-700' : 'text-pink-400'}
                          />
                          <span>Twitter / X Feed</span>
                        </div>
                        <ExternalLink
                          size={13}
                          className="text-zinc-500 group-hover:text-current transition-colors"
                        />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Direct CTA */}
            <div
              className={`pt-6 border-t mt-8 ${
                isLight ? 'border-zinc-200' : 'border-white/10'
              }`}
            >
              <a
                href={`mailto:${portfolioData.socials?.email || 'contact@studio-vane.io'}`}
                className={`w-full py-3 px-5 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                  isLight
                    ? 'bg-zinc-950 text-white hover:bg-black'
                    : 'bg-white text-black hover:bg-zinc-200'
                }`}
              >
                <Mail size={14} />
                <span>Transmit Electronic Dispatch</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
