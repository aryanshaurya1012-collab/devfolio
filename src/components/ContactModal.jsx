import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Copy, Check, ArrowUpRight, Send } from 'lucide-react'

export default function ContactModal({ isOpen, onClose, portfolioData }) {
  const [copied, setCopied] = useState(false)
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const email = portfolioData.socials?.email || 'contact@studio-vane.io'

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  function handleSendSimulation(e) {
    e.preventDefault()
    if (!message.trim()) return
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setMessage('')
      onClose()
    }, 1800)
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
            className="w-full max-w-lg bg-[#0e0b14] border border-white/15 rounded-2xl p-8 sm:p-10 shadow-2xl text-[#e0e0e0] font-sans relative select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div>
                <h3 className="font-serif text-2xl text-white font-normal">
                  Direct Connect
                </h3>
                <p className="font-sans text-xs text-zinc-400 mt-1">
                  Inquiries, protocol architecture &amp; collaborative builds.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="text-zinc-400 hover:text-white p-2 rounded-full border border-white/10 hover:border-white transition-all cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Direct Email Card */}
            <div className="my-6 p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">
                    Direct Electronic Mail
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className="font-mono text-sm text-white hover:text-amber-400 transition-colors font-medium"
                  >
                    {email}
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/30 text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
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
                <label className="block font-sans text-xs text-zinc-400 uppercase tracking-wider mb-2">
                  Immediate Message Dispatch
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details regarding your timeline or project requirements..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 transition-colors resize-none font-sans"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <a
                  href={`mailto:${email}?subject=Collaboration%20Inquiry&body=${encodeURIComponent(
                    message,
                  )}`}
                  className="font-mono text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Open in Mail Client</span>
                  <ArrowUpRight size={13} />
                </a>

                <button
                  type="submit"
                  disabled={!message.trim() || sent}
                  className="px-5 py-2.5 rounded-full font-sans text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-40"
                >
                  {sent ? (
                    <>
                      <Check size={14} />
                      <span>Message Dispatched</span>
                    </>
                  ) : (
                    <>
                      <Send size={13} />
                      <span>Send Dispatch</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

