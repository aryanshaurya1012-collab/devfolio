import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Rocket,
  Settings,
  Plus,
  Trash2,
  Copy,
  Download,
  Code2,
  AtSign,
  Link2,
  ExternalLink,
  Zap,
  Check,
  X,
  Sparkles,
} from 'lucide-react'

const TABS = [
  { id: 'profile', label: 'Profile', icon: User, desc: 'Identity & Socials' },
  { id: 'projects', label: 'Projects', icon: Rocket, desc: 'Works & Tech Stack' },
  { id: 'export', label: 'Export', icon: Settings, desc: 'Live Configuration' },
]

export default function EditorModal({
  isOpen,
  onClose,
  portfolioData,
  setPortfolioData,
}) {
  const [activeTab, setActiveTab] = useState('profile')
  const [deployStatus, setDeployStatus] = useState(null)
  const [copied, setCopied] = useState(false)

  // New project staging form
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    tech: '',
    category: '',
  })

  // Keyboard shortcut: Escape to close
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // --- State Updaters ---
  function handleProfileChange(field, value) {
    setPortfolioData((prev) => ({ ...prev, [field]: value }))
  }

  function handleSocialChange(field, value) {
    setPortfolioData((prev) => ({
      ...prev,
      socials: { ...(prev.socials || {}), [field]: value },
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
    const proj = {
      id: `proj-${Date.now()}`,
      title: newProject.title.trim(),
      description: newProject.description.trim(),
      tech: newProject.tech.trim() || 'React',
      category: newProject.category.trim() || 'Project',
    }
    setPortfolioData((prev) => ({
      ...prev,
      projects: [...(prev.projects || []), proj],
    }))
    setNewProject({ title: '', description: '', tech: '', category: '' })
  }

  function handleCopyJSON() {
    navigator.clipboard.writeText(JSON.stringify(portfolioData, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleExportJSON() {
    const blob = new Blob([JSON.stringify(portfolioData, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${(portfolioData.name || 'portfolio')
      .toLowerCase()
      .replace(/\s+/g, '-')}-config.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleDeploy() {
    setDeployStatus('BUILDING MATRIX...')
    setTimeout(() => {
      setDeployStatus('UPLOADING TO IPFS...')
      setTimeout(() => {
        setDeployStatus('DEPLOYED // LIVE')
        setTimeout(() => setDeployStatus(null), 3500)
      }, 1200)
    }, 800)
  }

  const inputCls =
    'w-full bg-white/5 border border-white/10 text-white font-mono text-xs rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all placeholder:text-zinc-600'

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xl">
          {/* Backdrop Click Dismiss */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 -z-10"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 25 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-[90vw] max-w-5xl h-[80vh] bg-[#0a0a0a]/90 border border-white/10 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden backdrop-blur-2xl text-zinc-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Left Sidebar / Navigation */}
            <div className="w-full md:w-64 bg-black/50 border-b md:border-b-0 md:border-r border-white/10 p-5 md:p-6 flex flex-col justify-between shrink-0">
              <div>
                {/* Branding */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#10b981]" />
                    <span className="font-mono text-sm tracking-widest text-white uppercase font-black">
                      TXSIGHT // MODAL
                    </span>
                  </div>
                  <span className="font-mono text-[10px] bg-white/10 text-cyan-400 px-2 py-0.5 rounded">
                    v4.0
                  </span>
                </div>

                {/* Tab Navigation Buttons */}
                <nav className="space-y-1.5" aria-label="Editor Tabs">
                  {TABS.map((tab) => {
                    const Icon = tab.icon
                    const isActive = activeTab === tab.id
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                          isActive
                            ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/10 border border-cyan-400/40 text-white shadow-[0_0_15px_rgba(20,241,149,0.1)]'
                            : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon
                            size={16}
                            className={isActive ? 'text-cyan-400' : 'text-zinc-500'}
                          />
                          <span>{tab.label}</span>
                        </div>
                        {tab.id === 'projects' && (
                          <span className="text-[10px] font-mono bg-white/10 text-emerald-400 px-2 py-0.5 rounded-full">
                            {portfolioData.projects?.length || 0}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </nav>
              </div>

              {/* Sidebar Footer: Deploy CTA */}
              <div className="pt-4 mt-4 border-t border-white/10 hidden md:block">
                <button
                  type="button"
                  onClick={handleDeploy}
                  disabled={Boolean(deployStatus)}
                  className="w-full py-3 px-4 rounded-xl font-mono text-xs font-black uppercase tracking-widest text-black bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 hover:opacity-95 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2"
                >
                  <Zap size={14} />
                  {deployStatus || 'DEPLOY PORTFOLIO'}
                </button>
                <p className="font-mono text-[9px] text-zinc-500 text-center mt-2">
                  WebGL 3D Buffer Live Sync
                </p>
              </div>
            </div>

            {/* Modal Right Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#0c0c10]/70">
              {/* Header Bar with Close Button */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/30">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-white font-bold flex items-center gap-2">
                    <Sparkles size={14} className="text-[#9945FF]" />
                    <span>
                      {TABS.find((t) => t.id === activeTab)?.label} Settings
                    </span>
                  </h3>
                  <p className="font-mono text-[10px] text-zinc-500 mt-0.5">
                    {TABS.find((t) => t.id === activeTab)?.desc}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline font-mono text-[10px] text-zinc-500">
                    PRESS [ESC] TO CLOSE
                  </span>
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white border border-white/10 transition-all cursor-pointer"
                    aria-label="Close Modal"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Tab Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                {/* ========= PROFILE TAB ========= */}
                {activeTab === 'profile' && (
                  <div className="space-y-6 max-w-3xl">
                    <section className="space-y-4">
                      <h4 className="font-mono text-xs uppercase tracking-wider text-purple-400 font-semibold flex items-center gap-2">
                        <User size={14} /> Identity Information
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-1.5">
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
                          <label className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-1.5">
                            Professional Role
                          </label>
                          <input
                            type="text"
                            value={portfolioData.role || ''}
                            onChange={(e) => handleProfileChange('role', e.target.value)}
                            placeholder="e.g. WEB3 & GRAPHICS ENGINEER"
                            className={inputCls}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-1.5">
                          Bio / Manifesto
                        </label>
                        <textarea
                          rows={3}
                          value={portfolioData.bio || ''}
                          onChange={(e) => handleProfileChange('bio', e.target.value)}
                          placeholder="Designing real-time decentralized interfaces and high-performance WebGL systems..."
                          className={`${inputCls} resize-none`}
                        />
                      </div>
                    </section>

                    <section className="space-y-4 pt-6 border-t border-white/10">
                      <h4 className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-2">
                        <ExternalLink size={14} /> Social Channels
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                            GitHub
                          </label>
                          <div className="flex items-center gap-2">
                            <Code2 size={16} className="text-zinc-500 shrink-0" />
                            <input
                              type="text"
                              value={portfolioData.socials?.github || ''}
                              onChange={(e) =>
                                handleSocialChange('github', e.target.value)
                              }
                              placeholder="github.com/handle"
                              className={inputCls}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                            X / Twitter
                          </label>
                          <div className="flex items-center gap-2">
                            <AtSign size={16} className="text-zinc-500 shrink-0" />
                            <input
                              type="text"
                              value={portfolioData.socials?.twitter || ''}
                              onChange={(e) =>
                                handleSocialChange('twitter', e.target.value)
                              }
                              placeholder="x.com/handle"
                              className={inputCls}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                            LinkedIn
                          </label>
                          <div className="flex items-center gap-2">
                            <Link2 size={16} className="text-zinc-500 shrink-0" />
                            <input
                              type="text"
                              value={portfolioData.socials?.linkedin || ''}
                              onChange={(e) =>
                                handleSocialChange('linkedin', e.target.value)
                              }
                              placeholder="linkedin.com/in/name"
                              className={inputCls}
                            />
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                )}

                {/* ========= PROJECTS TAB ========= */}
                {activeTab === 'projects' && (
                  <div className="space-y-6 max-w-4xl">
                    {/* Add New Project Card Sub-Form */}
                    <section className="p-5 bg-white/[0.02] border border-white/10 rounded-xl space-y-4">
                      <h4 className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-2">
                        <Plus size={14} /> Add Project to Matrix
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                            Project Title
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
                            Category / Sector
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
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                            Tech Stack (comma-separated chips)
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
                            Summary Description
                          </label>
                          <input
                            type="text"
                            value={newProject.description}
                            onChange={(e) =>
                              setNewProject((p) => ({
                                ...p,
                                description: e.target.value,
                              }))
                            }
                            placeholder="Brief synopsis..."
                            className={inputCls}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="button"
                          onClick={handleAddProject}
                          disabled={!newProject.title.trim()}
                          className="px-5 py-2.5 font-mono text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-400/50 text-cyan-300 hover:text-white hover:bg-cyan-500/30 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/10"
                        >
                          <Plus size={14} />
                          Add Project Card
                        </button>
                      </div>
                    </section>

                    {/* Existing Projects List */}
                    <section className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-mono text-xs uppercase tracking-wider text-purple-400 font-semibold flex items-center gap-2">
                          <Rocket size={14} /> Active Matrix Projects (
                          {portfolioData.projects?.length || 0})
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {(!portfolioData.projects ||
                          portfolioData.projects.length === 0) && (
                          <div className="col-span-full text-center py-10 border border-dashed border-white/10 rounded-xl">
                            <p className="font-mono text-xs text-zinc-500">
                              No projects in matrix. Add your first card above.
                            </p>
                          </div>
                        )}

                        {portfolioData.projects?.map((project, idx) => (
                          <div
                            key={project.id || idx}
                            className="p-4 bg-white/[0.03] border border-white/10 rounded-xl flex flex-col justify-between hover:border-cyan-400/40 transition-all group"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-mono text-[10px] text-purple-400 font-bold uppercase tracking-wider">
                                  SLOT 0{idx + 1} // {project.category || 'PROJECT'}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveProject(idx)}
                                  className="text-zinc-500 hover:text-red-400 p-1 rounded hover:bg-red-950/30 transition-colors cursor-pointer"
                                  aria-label={`Delete ${project.title}`}
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                              <h5 className="font-mono text-sm font-bold text-white uppercase tracking-wide">
                                {project.title}
                              </h5>
                              <p className="font-mono text-xs text-zinc-400 line-clamp-2 mt-1">
                                {project.description || 'No description provided.'}
                              </p>
                            </div>

                            <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between">
                              <span className="font-mono text-[11px] text-emerald-400 font-semibold">
                                {project.tech || 'DEV'}
                              </span>
                              <span className="font-mono text-[9px] text-zinc-600">
                                3D MOUNTED
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                )}

                {/* ========= EXPORT TAB ========= */}
                {activeTab === 'export' && (
                  <div className="space-y-6 max-w-3xl">
                    <section className="space-y-3">
                      <h4 className="font-mono text-xs uppercase tracking-wider text-purple-400 font-semibold flex items-center gap-2">
                        <Settings size={14} /> Live Matrix Configuration
                      </h4>
                      <p className="font-mono text-xs text-zinc-500">
                        This reactive JSON structure feeds the Three.js 3D canvas and
                        projections in real time.
                      </p>

                      <div className="relative">
                        <pre className="bg-black/70 border border-white/10 rounded-xl p-5 text-[11px] font-mono text-emerald-400/90 max-h-[340px] overflow-auto leading-relaxed whitespace-pre-wrap break-all shadow-inner">
                          {JSON.stringify(portfolioData, null, 2)}
                        </pre>
                        <button
                          type="button"
                          onClick={handleCopyJSON}
                          className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white p-2 rounded-lg transition-all flex items-center gap-1.5 font-mono text-[10px] cursor-pointer"
                          aria-label="Copy JSON Configuration"
                        >
                          {copied ? (
                            <>
                              <Check size={14} className="text-emerald-400" />
                              <span className="text-emerald-400">COPIED</span>
                            </>
                          ) : (
                            <>
                              <Copy size={14} />
                              <span>COPY JSON</span>
                            </>
                          )}
                        </button>
                      </div>
                    </section>

                    <section className="pt-4 border-t border-white/10 flex flex-wrap gap-4">
                      <button
                        type="button"
                        onClick={handleExportJSON}
                        className="flex-1 py-3 px-5 font-mono text-xs uppercase tracking-wider bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Download size={15} />
                        Export JSON File
                      </button>

                      <button
                        type="button"
                        onClick={handleDeploy}
                        disabled={Boolean(deployStatus)}
                        className="flex-1 py-3 px-5 font-mono text-xs uppercase tracking-widest text-black font-extrabold bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 hover:opacity-95 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20 disabled:opacity-75"
                      >
                        <Zap size={15} />
                        {deployStatus || 'DEPLOY CONFIGURATION'}
                      </button>
                    </section>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

