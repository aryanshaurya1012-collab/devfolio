import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Copy, Check, ArrowUpRight, Send } from 'lucide-react';

export default function ContactModal({ isOpen, onClose, portfolioData, mode = 'dark' }) {
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const isLight = (mode || portfolioData?.mode) === 'light';
  const email = portfolioData.socials?.email || 'contact@studio-vane.io';

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function handleSendSimulation(e) {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setMessage('');
      onClose();
    }, 1800);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-colors duration-300 ${
            isLight ? 'bg-black/40 backdrop-blur-md' : 'bg-black/80 backdrop-blur-xl'
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
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full max-w-lg border rounded-2xl p-7 sm:p-10 shadow-2xl font-sans relative select-none ${
              isLight
                ? 'bg-white border-zinc-200 text-zinc-950 shadow-[0_25px_70px_rgba(0,0,0,0.18)]'
                : 'bg-[#0e0b14] border-white/15 text-[#e0e0e0] shadow-2xl'
            }`}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: isLight ? '#ffffff' : '#0e0b14',
              color: isLight ? '#09090b' : '#f4f4f5',
            }}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between pb-5 border-b ${
                isLight ? 'border-zinc-200' : 'border-white/10'
              }`}
            >
              <div>
                <h3
                  className={`font-serif text-2xl font-normal ${
                    isLight ? 'text-zinc-950 font-medium' : 'text-white'
                  }`}
                >
                  Direct Connect
                </h3>
                <p
                  className={`font-sans text-xs mt-1 ${
                    isLight ? 'text-zinc-700 font-medium' : 'text-zinc-400'
                  }`}
                >
                  Inquiries, protocol architecture &amp; collaborative builds.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className={`p-2 rounded-full border transition-all cursor-pointer ${
                  isLight
                    ? 'text-zinc-800 hover:text-black border-zinc-300 hover:border-black bg-zinc-100 hover:bg-zinc-200'
                    : 'text-zinc-400 hover:text-white border-white/10 hover:border-white'
                }`}
                aria-label="Close Contact Modal"
              >
                <X size={15} />
              </button>
            </div>

            {/* Direct Email Card */}
            <div
              className={`my-6 p-4 rounded-xl border flex items-center justify-between ${
                isLight
                  ? 'bg-zinc-50 border-zinc-200 text-zinc-950'
                  : 'bg-white/[0.03] border-white/10 text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2.5 rounded-lg border ${
                    isLight
                      ? 'bg-purple-100 border-purple-300 text-purple-800'
                      : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                  }`}
                >
                  <Mail size={18} />
                </div>
                <div>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-widest block font-bold ${
                      isLight ? 'text-zinc-600' : 'text-zinc-500'
                    }`}
                  >
                    Direct Electronic Mail
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className={`font-mono text-sm transition-colors font-bold ${
                      isLight
                        ? 'text-zinc-950 hover:text-purple-700'
                        : 'text-white hover:text-amber-400'
                    }`}
                  >
                    {email}
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isLight
                    ? 'border-zinc-300 hover:border-zinc-900 bg-white text-zinc-950 hover:bg-zinc-100'
                    : 'border-white/10 hover:border-white/30 text-zinc-300 hover:text-white'
                }`}
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-600 font-bold" />
                    <span className="text-emerald-600 font-bold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Dispatch Form */}
            <form onSubmit={handleSendSimulation} className="space-y-4">
              <div>
                <label
                  className={`block font-sans text-xs uppercase tracking-wider mb-2 font-bold ${
                    isLight ? 'text-zinc-900' : 'text-zinc-400'
                  }`}
                >
                  Message Payload
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Outline your architectural proposal or inquiry..."
                  className={`w-full rounded-xl p-3.5 text-xs font-mono transition-colors resize-none border ${
                    isLight
                      ? 'bg-zinc-50 border-zinc-300 text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950 font-medium'
                      : 'bg-black/40 border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400/80'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={sent || !message.trim()}
                className={`w-full py-3 px-5 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-40 disabled:cursor-not-allowed ${
                  isLight
                    ? 'bg-zinc-950 text-white hover:bg-black'
                    : 'bg-white text-black hover:bg-zinc-200'
                }`}
              >
                {sent ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span>Transmission Confirmed</span>
                  </>
                ) : (
                  <>
                    <Send size={13} />
                    <span>Transmit Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
