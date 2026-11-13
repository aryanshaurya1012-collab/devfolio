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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 -z-10"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full max-w-lg border rounded-2xl p-8 sm:p-10 shadow-2xl font-sans relative select-none ${
              isLight
                ? 'bg-white/98 border-black/15 text-zinc-900 shadow-2xl'
                : 'bg-[#0e0b14] border-white/15 text-[#e0e0e0] shadow-2xl'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between pb-6 border-b ${
                isLight ? 'border-black/10' : 'border-white/10'
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
                    isLight ? 'text-zinc-600 font-medium' : 'text-zinc-400'
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
                    ? 'text-zinc-700 hover:text-black border-black/15 hover:border-black'
                    : 'text-zinc-400 hover:text-white border-white/10 hover:border-white'
                }`}
              >
                <X size={15} />
              </button>
            </div>

            {/* Direct Email Card */}
            <div
              className={`my-6 p-4 rounded-xl border flex items-center justify-between ${
                isLight
                  ? 'bg-black/[0.03] border-black/10'
                  : 'bg-white/[0.03] border-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2.5 rounded-lg border ${
                    isLight
                      ? 'bg-purple-100 border-purple-200 text-purple-700'
                      : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                  }`}
                >
                  <Mail size={18} />
                </div>
                <div>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-widest block font-medium ${
                      isLight ? 'text-zinc-500' : 'text-zinc-500'
                    }`}
                  >
                    Direct Electronic Mail
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className={`font-mono text-sm transition-colors font-semibold ${
                      isLight
                        ? 'text-zinc-900 hover:text-purple-700'
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
                className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                  isLight
                    ? 'border-black/15 hover:border-black/30 text-zinc-700 hover:text-black'
                    : 'border-white/10 hover:border-white/30 text-zinc-300 hover:text-white'
                }`}
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-500 font-bold" />
                    <span className="text-emerald-500 font-semibold">Copied</span>
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
                  className={`block font-sans text-xs uppercase tracking-wider mb-2 font-semibold ${
                    isLight ? 'text-zinc-700' : 'text-zinc-400'
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
                      ? 'bg-black/[0.03] border-black/15 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900'
                      : 'bg-black/40 border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400/80'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={sent || !message.trim()}
                className={`w-full py-3 px-5 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-40 disabled:cursor-not-allowed ${
                  isLight
                    ? 'bg-zinc-900 text-white hover:bg-black'
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
