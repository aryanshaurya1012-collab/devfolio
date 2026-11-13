import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Rocket,
  Download,
  Plus,
  Trash2,
  Copy,
  Check,
  ChevronDown,
  Sparkles,
  Zap,
} from 'lucide-react'

export default function EditorCommandCenter({
  portfolioData,
  setPortfolioData,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [copiedToast, setCopiedToast] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)

  // Quick state for adding a new project
  const [newProject, setNewProject] = useState({
    title: '',
    tech: '',
    category: '',
    description: '',
  })

  // Keyboard shortcut: Escape closes command center
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // --- Handlers ---
  function handleProfileChange(field, value) {
    setPortfolioData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  function handleRemoveProject(index) {
    setPortfolioData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }))
  }

  function handleAddProject() {
    if (!newProject.title.trim()) return
    const project = {
      id: `proj-${Date.now()}`,
      title: newProject.title.trim(),
      tech: newProject.tech.trim() || 'React, Web3',
      category: newProject.category.trim() || 'MODULE',
      description:
        newProject.description.trim() ||
        'Decentralized interface module with reactive shaders.',
    }
    setPortfolioData((prev) => ({
      ...prev,
      projects: [...(prev.projects || []), project],
    }))
    setNewProject({ title: '', tech: '', category: '', description: '' })
    setShowAddModal(false)
  }

  async function handleExportBundle() {
    try {
      const jsonStr = JSON.stringify(portfolioData, null, 2)
      await navigator.clipboard.writeText(jsonStr)
      setCopiedToast(true)
      setTimeout(() => setCopiedToast(false), 2500)
    } catch {
      // Fallback
      setCopiedToast(true)
      setTimeout(() => setCopiedToast(false), 2500)
    }
  }

  const inputCls =
    'w-full bg-white/5 border border-white/10 text-white font-mono text-xs rounded-xl px-3.5 py-2 focus:border-[#14F195] focus:ring-1 focus:ring-[#14F195]/40 focus:outline-none transition-all placeholder:text-zinc-600'

  return (
    <>
      {/* Toast Notification */}
      <AnimatePresence>
        {copiedToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-[#14F195] text-black font-mono text-xs font-bold px-5 py-2.5 rounded-full shadow-[0_0_30px_rgba(20,241,149,0.5)] flex items-center gap-2"
          >
            <Check size={16} />
            <span>[ CONFIGURATION BUNDLE COPIED TO CLIPBOARD // DEPLOY READY ]</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed State: Sleek Floating Pill at Bottom Center */}
      {!isOpen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group relative px-7 py-3.5 rounded-full font-mono text-xs font-black uppercase tracking-[0.2em] text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-500 hover:from-purple-500 hover:to-emerald-400 shadow-[0_0_35px_rgba(20,241,149,0.35)] border border-white/20 active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#14F195] animate-ping shadow-[0_0_10px_#14F195]" />
            <span>[ SYSTEM.OVERRIDE // EDIT_PORTFOLIO ]</span>
          </button>
        </div>
      )}

      {/* Expanded State: Bottom-Docked Command Center Taking 45% Screen */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 left-0 right-0 h-[45vh] w-full bg-black/85 backdrop-blur-3xl border-t border-white/10 p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 z-50 pointer-events-auto shadow-2xl text-zinc-200 overflow-y-auto md:overflow-hidden select-none"
          >
            {/* Top Bar / Minimize Button */}
            <div className="absolute top-3 right-6 flex items-center gap-3">
              <span className="font-mono text-[10px] text-zinc-500 hidden sm:inline">
                DEV-OS // COMMAND CENTER v5.0
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="font-mono text-[11px] text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1 rounded-lg border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronDown size={14} />
                <span>[ MINIMIZE ]</span>
              </button>
            </div>

            {/* COLUMN 1: IDENTITY */}
            <div className="flex flex-col h-full overflow-y-auto pr-2 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/5">
                <User size={15} className="text-[#9945FF]" />
                <h4 className="font-mono text-xs uppercase tracking-widest text-white font-bold">
                  01 // IDENTITY MATRIX
                </h4>
              </div>

              <div className="space-y-3.5 flex-1">
                <div>
                  <label className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={portfolioData.name || ''}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                    placeholder="e.g. ALEXANDER VANE"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                    Engineering Role
                  </label>
                  <input
                    type="text"
                    value={portfolioData.role || ''}
                    onChange={(e) => handleProfileChange('role', e.target.value)}
                    placeholder="e.g. WEB3 & GRAPHICS ARCHITECT"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                    Bio / Manifesto
                  </label>
                  <textarea
                    rows={2}
                    value={portfolioData.bio || ''}
                    onChange={(e) => handleProfileChange('bio', e.target.value)}
                    placeholder="Architecting real-time decentralized systems..."
                    className={`${inputCls} resize-none`}
                  />
                </div>
              </div>
            </div>

            {/* COLUMN 2: PROJECTS MATRIX */}
            <div className="flex flex-col h-full overflow-y-auto pr-2 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Rocket size={15} className="text-[#14F195]" />
                  <h4 className="font-mono text-xs uppercase tracking-widest text-white font-bold">
                    02 // PROJECTS MATRIX ({portfolioData.projects?.length || 0})
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddModal(true)}
                  className="px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-black bg-[#14F195] hover:bg-[#14F195]/90 rounded-md transition-all shadow-[0_0_15px_rgba(20,241,149,0.4)] flex items-center gap-1 cursor-pointer"
                >
                  <Plus size={12} />
                  + ADD NEW
                </button>
              </div>

              {/* Scrollable List of Current Projects */}
              <div className="space-y-2.5 overflow-y-auto flex-1 pr-1">
                {(!portfolioData.projects || portfolioData.projects.length === 0) && (
                  <div className="text-center py-8 border border-dashed border-white/10 rounded-xl">
                    <p className="font-mono text-xs text-zinc-500">
                      Matrix is empty. Click + ADD NEW to insert cards.
                    </p>
                  </div>
                )}

                {portfolioData.projects?.map((project, idx) => (
                  <div
                    key={project.id || idx}
                    className="p-3 bg-white/[0.03] border border-white/10 hover:border-[#14F195]/40 rounded-xl flex items-center justify-between gap-3 group transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-[#9945FF] font-bold">
                          0{idx + 1}
                        </span>
                        <h5 className="font-mono text-xs text-white font-bold truncate">
                          {project.title}
                        </h5>
                      </div>
                      <p className="font-mono text-[10px] text-[#14F195] truncate mt-0.5">
                        {project.tech || 'DEV_STACK'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveProject(idx)}
                      className="text-zinc-600 hover:text-red-400 p-1 rounded hover:bg-red-950/30 transition-colors cursor-pointer"
                      aria-label="Remove Project"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* COLUMN 3: DEPLOYMENT */}
            <div className="flex flex-col h-full overflow-hidden">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Download size={15} className="text-cyan-400" />
                  <h4 className="font-mono text-xs uppercase tracking-widest text-white font-bold">
                    03 // DEPLOYMENT BUNDLE
                  </h4>
                </div>
                <span className="font-mono text-[10px] text-zinc-500">
                  REAL-TIME JSON
                </span>
              </div>

              {/* Massive JSON Export Block with Syntax Highlighting Look */}
              <div className="flex-1 bg-black/90 border border-white/10 rounded-xl p-3.5 font-mono text-[11px] text-[#14F195] overflow-auto select-all leading-relaxed whitespace-pre shadow-inner">
                {JSON.stringify(portfolioData, null, 2)}
              </div>

              {/* Highly Visible Export Bundle Button */}
              <div className="pt-3 mt-2">
                <button
                  type="button"
                  onClick={handleExportBundle}
                  className="w-full py-3 px-4 rounded-xl font-mono text-xs font-black uppercase tracking-widest text-black bg-gradient-to-r from-purple-500 via-cyan-400 to-[#14F195] hover:opacity-95 shadow-[0_0_25px_rgba(20,241,149,0.35)] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Zap size={15} />
                  <span>EXPORT BUNDLE</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sub-Modal for Adding New Project */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#0d0d12] border border-white/15 rounded-2xl p-6 space-y-4 shadow-2xl text-zinc-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h4 className="font-mono text-xs uppercase tracking-widest text-white font-bold flex items-center gap-2">
                  <Sparkles size={14} className="text-[#14F195]" />
                  <span>Insert Project Card</span>
                </h4>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="font-mono text-xs text-zinc-500 hover:text-white"
                >
                  [ × ]
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) =>
                      setNewProject((p) => ({ ...p, title: e.target.value }))
                    }
                    placeholder="e.g. AETHER PROTOCOL"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={newProject.category}
                    onChange={(e) =>
                      setNewProject((p) => ({ ...p, category: e.target.value }))
                    }
                    placeholder="e.g. DeFi, AI Node, Creative"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                    Tech Stack (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={newProject.tech}
                    onChange={(e) =>
                      setNewProject((p) => ({ ...p, tech: e.target.value }))
                    }
                    placeholder="e.g. Solidity, Three.js, React"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={newProject.description}
                    onChange={(e) =>
                      setNewProject((p) => ({
                        ...p,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Synopsis of this project..."
                    className={`${inputCls} resize-none`}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 font-mono text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddProject}
                  disabled={!newProject.title.trim()}
                  className="px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider bg-[#14F195] text-black hover:bg-[#14F195]/90 rounded-lg transition-all disabled:opacity-40"
                >
                  Add Card
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

