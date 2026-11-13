import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Trash2,
  Copy,
  Check,
  Download,
  X,
  RotateCcw,
  Palette,
  Sparkles,
} from 'lucide-react'
import { THEMES, defaultPortfolioData } from '../data/portfolio'

export default function EditorModal({
  isOpen,
  onClose,
  portfolioData,
  setPortfolioData,
  onResetDefault,
}) {
  const [copied, setCopied] = useState(false)
  const [showAddProject, setShowAddProject] = useState(false)
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'WEB3',
    year: '2026',
    accent: '#f59e0b',
    gradient: 'from-amber-500/30 via-orange-950/40 to-zinc-950',
    description: '',
    tech: 'React, TypeScript, Web3',
    liveUrl: 'https://github.com',
    sourceUrl: 'https://github.com',
  })

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  function handleProfileChange(field, value) {
    setPortfolioData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  function handleSocialChange(field, value) {
    setPortfolioData((prev) => ({
      ...prev,
      socials: {
        ...(prev.socials || {}),
        [field]: value,
      },
    }))
  }

  function handleThemeChange(themeKey) {
    setPortfolioData((prev) => ({
      ...prev,
      theme: themeKey,
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
    const techArray = newProject.tech
      ? String(newProject.tech)
          .split(/[,/·]/)
          .map((t) => t.trim())
          .filter(Boolean)
      : ['React', 'Web3']

    const project = {
      id: `proj-${Date.now()}`,
      title: newProject.title.trim(),
      category: newProject.category.trim() || 'EXPERIMENT',
      year: newProject.year.trim() || '2026',
      accent: newProject.accent || '#f59e0b',
      gradient:
        newProject.gradient ||
        'from-amber-500/30 via-orange-950/40 to-zinc-950',
      description: newProject.description.trim() || 'Project architecture.',
      tech: techArray,
      liveUrl: newProject.liveUrl.trim(),
      sourceUrl: newProject.sourceUrl.trim(),
    }

    setPortfolioData((prev) => ({
      ...prev,
      projects: [...(prev.projects || []), project],
    }))

    setNewProject({
      title: '',
      category: 'WEB3',
      year: '2026',
      accent: '#f59e0b',
      gradient: 'from-amber-500/30 via-orange-950/40 to-zinc-950',
      description: '',
      tech: 'React, TypeScript, Web3',
      liveUrl: 'https://github.com',
      sourceUrl: 'https://github.com',
    })
    setShowAddProject(false)
  }

  async function handleCopyJSON() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(portfolioData, null, 2))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  function handleDownloadJSON() {
    const blob = new Blob([JSON.stringify(portfolioData, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${(portfolioData.name || 'devos')
      .toLowerCase()
      .replace(/\s+/g, '-')}-portfolio.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const inputCls =
    'bg-transparent border-b border-[#333] text-white font-sans focus:border-amber-400 transition-colors py-2 outline-none w-full text-xs sm:text-sm placeholder:text-[#555]'

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-2xl p-4 sm:p-6">
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
            className="w-[90vw] max-w-4xl max-h-[85vh] overflow-y-auto bg-[#0d0a12] border border-white/20 rounded-3xl p-8 sm:p-10 shadow-2xl text-[#e0e0e0] font-sans flex flex-col justify-between space-y-8 select-none relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div>
                <h3 className="font-serif text-3xl text-white tracking-tight flex items-center gap-2.5">
                  <Sparkles size={22} className="text-amber-400" />
                  <span>SaaS Studio &amp; Architecture</span>
                </h3>
                <p className="font-sans text-xs text-zinc-400 uppercase tracking-widest mt-1">
                  DEV-OS 3D High-Contrast Matrix Configurator
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onResetDefault}
                  className="font-sans text-xs text-zinc-400 hover:text-white px-3 py-1.5 rounded-full border border-white/10 hover:border-white transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Reset to default Shaurya Aryan portfolio"
                >
                  <RotateCcw size={13} />
                  <span className="hidden sm:inline">Reset Defaults</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="font-sans text-xs text-zinc-400 hover:text-white p-2 rounded-full border border-white/10 hover:border-white transition-all cursor-pointer"
                  aria-label="Close Editor"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Form Sections */}
            <div className="space-y-10">
              {/* Theme Aroma Selection */}
              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <Palette size={14} className="text-amber-400" />
                  <h4 className="font-sans text-xs text-zinc-400 uppercase tracking-widest font-semibold">
                    Step 25: 3D Color Aroma &amp; Atmosphere
                  </h4>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {Object.entries(THEMES).map(([key, t]) => {
                    const isSelected = (portfolioData.theme || 'amber') === key
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleThemeChange(key)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-white/10 border-white text-white shadow-lg'
                            : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div
                            className="w-3 h-3 rounded-full shadow-sm"
                            style={{ backgroundColor: t.accent }}
                          />
                          {isSelected && (
                            <span className="text-[10px] font-mono font-bold text-white">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <span className="font-sans text-xs font-semibold">
                          {t.name}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </section>

              {/* Identity Section */}
              <section className="space-y-4 pt-4 border-t border-white/10">
                <h4 className="font-sans text-xs text-zinc-400 uppercase tracking-widest font-semibold">
                  Identity &amp; Persona
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block font-sans text-xs text-zinc-400 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={portfolioData.name || ''}
                      onChange={(e) => handleProfileChange('name', e.target.value)}
                      placeholder="e.g. SHAURYA ARYAN"
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-xs text-zinc-400 mb-1">
                      Professional Role
                    </label>
                    <input
                      type="text"
                      value={portfolioData.role || ''}
                      onChange={(e) => handleProfileChange('role', e.target.value)}
                      placeholder="e.g. Full Stack & Web3 Architect"
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-xs text-zinc-400 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={portfolioData.location || ''}
                      onChange={(e) =>
                        handleProfileChange('location', e.target.value)
                      }
                      placeholder="e.g. Kolkata, India"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-xs text-zinc-400 mb-1">
                    Bio / Philosophy Statement
                  </label>
                  <textarea
                    rows={2}
                    value={portfolioData.bio || ''}
                    onChange={(e) => handleProfileChange('bio', e.target.value)}
                    placeholder="B.Tech CSE undergraduate & Chapter Lead..."
                    className={`${inputCls} resize-none`}
                  />
                </div>
              </section>

              {/* Social Channels */}
              <section className="space-y-4 pt-4 border-t border-white/10">
                <h4 className="font-sans text-xs text-zinc-400 uppercase tracking-widest font-semibold">
                  Direct Networks &amp; Handles
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-xs text-zinc-400 mb-1">
                      GitHub URL
                    </label>
                    <input
                      type="text"
                      value={portfolioData.socials?.github || ''}
                      onChange={(e) => handleSocialChange('github', e.target.value)}
                      placeholder="https://github.com/aryanshaurya1012-collab"
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-xs text-zinc-400 mb-1">
                      LinkedIn URL
                    </label>
                    <input
                      type="text"
                      value={portfolioData.socials?.linkedin || ''}
                      onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-xs text-zinc-400 mb-1">
                      X / Twitter URL
                    </label>
                    <input
                      type="text"
                      value={portfolioData.socials?.twitter || ''}
                      onChange={(e) => handleSocialChange('twitter', e.target.value)}
                      placeholder="https://x.com/username"
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-xs text-zinc-400 mb-1">
                      Direct Email Address
                    </label>
                    <input
                      type="email"
                      value={portfolioData.socials?.email || ''}
                      onChange={(e) => handleSocialChange('email', e.target.value)}
                      placeholder="shaurya@example.com"
                      className={inputCls}
                    />
                  </div>
                </div>
              </section>

              {/* Projects CRUD Section */}
              <section className="space-y-5 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-sans text-xs text-zinc-400 uppercase tracking-widest font-semibold">
                      Selected 3D Monolith Works ({portfolioData.projects?.length || 0})
                    </h4>
                    <p className="font-sans text-[11px] text-zinc-500 mt-0.5">
                      Mounted directly in the high-contrast 3D cylindrical arch.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAddProject((prev) => !prev)}
                    className="font-sans text-xs uppercase tracking-widest text-white px-3.5 py-1.5 rounded-full border border-white/20 hover:border-white transition-all flex items-center gap-1.5 cursor-pointer bg-white/5"
                  >
                    <Plus size={13} />
                    <span>{showAddProject ? 'Cancel' : '+ Add Project'}</span>
                  </button>
                </div>

                {/* Sub-form to Add New Project */}
                {showAddProject && (
                  <div className="p-6 bg-[#120d18] border border-white/20 rounded-2xl space-y-4 shadow-xl">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-sans text-xs text-zinc-400 mb-1">
                          Project Title
                        </label>
                        <input
                          type="text"
                          value={newProject.title}
                          onChange={(e) =>
                            setNewProject((p) => ({ ...p, title: e.target.value }))
                          }
                          placeholder="e.g. TxSight"
                          className={inputCls}
                        />
                      </div>

                      <div>
                        <label className="block font-sans text-xs text-zinc-400 mb-1">
                          Category / Track
                        </label>
                        <input
                          type="text"
                          value={newProject.category}
                          onChange={(e) =>
                            setNewProject((p) => ({ ...p, category: e.target.value }))
                          }
                          placeholder="WEB3 SECURITY"
                          className={inputCls}
                        />
                      </div>

                      <div>
                        <label className="block font-sans text-xs text-zinc-400 mb-1">
                          Year
                        </label>
                        <input
                          type="text"
                          value={newProject.year}
                          onChange={(e) =>
                            setNewProject((p) => ({ ...p, year: e.target.value }))
                          }
                          placeholder="2026"
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-sans text-xs text-zinc-400 mb-1">
                          Accent Color Hex
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={newProject.accent}
                            onChange={(e) =>
                              setNewProject((p) => ({ ...p, accent: e.target.value }))
                            }
                            className="w-8 h-8 rounded border border-white/20 bg-transparent cursor-pointer"
                          />
                          <input
                            type="text"
                            value={newProject.accent}
                            onChange={(e) =>
                              setNewProject((p) => ({ ...p, accent: e.target.value }))
                            }
                            className={inputCls}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-sans text-xs text-zinc-400 mb-1">
                          Tech Stack (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={newProject.tech}
                          onChange={(e) =>
                            setNewProject((p) => ({ ...p, tech: e.target.value }))
                          }
                          placeholder="Next.js, Solana Kit, Gemini AI"
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-sans text-xs text-zinc-400 mb-1">
                        Executive Description
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
                        placeholder="Comprehensive description of innovations..."
                        className={`${inputCls} resize-none`}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-sans text-xs text-zinc-400 mb-1">
                          Live Demo URL
                        </label>
                        <input
                          type="text"
                          value={newProject.liveUrl}
                          onChange={(e) =>
                            setNewProject((p) => ({ ...p, liveUrl: e.target.value }))
                          }
                          placeholder="https://github.com"
                          className={inputCls}
                        />
                      </div>

                      <div>
                        <label className="block font-sans text-xs text-zinc-400 mb-1">
                          Source Repository URL
                        </label>
                        <input
                          type="text"
                          value={newProject.sourceUrl}
                          onChange={(e) =>
                            setNewProject((p) => ({ ...p, sourceUrl: e.target.value }))
                          }
                          placeholder="https://github.com"
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={handleAddProject}
                        disabled={!newProject.title.trim()}
                        className="px-6 py-2.5 font-sans text-xs uppercase tracking-widest bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-all disabled:opacity-40 cursor-pointer shadow-lg"
                      >
                        Mount Card to Matrix
                      </button>
                    </div>
                  </div>
                )}

                {/* Projects List */}
                <div className="space-y-3">
                  {portfolioData.projects?.map((project, idx) => (
                    <div
                      key={project.id || idx}
                      className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-between gap-4 group hover:border-white/30 transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: project.accent || '#f59e0b' }}
                          />
                          <span className="font-mono text-xs text-zinc-500">
                            0{idx + 1}
                          </span>
                          <h5 className="font-serif text-lg text-white font-normal truncate">
                            {project.title}
                          </h5>
                          <span className="font-sans text-[11px] text-zinc-400 uppercase tracking-wider ml-auto hidden sm:inline">
                            {project.category} · {project.year}
                          </span>
                        </div>
                        <p className="font-sans text-xs text-zinc-400 truncate mt-1">
                          {project.description}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveProject(idx)}
                        className="text-zinc-600 hover:text-red-400 p-2 transition-colors cursor-pointer"
                        aria-label="Delete project"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Step 28: 1-Click JSON Copy & Download */}
              <section className="space-y-4 pt-4 border-t border-white/10">
                <h4 className="font-sans text-xs text-zinc-400 uppercase tracking-widest font-semibold">
                  Step 28: Configuration Bundle Export
                </h4>

                <div className="relative">
                  <pre className="bg-black/80 border border-white/10 rounded-2xl p-5 font-mono text-xs text-amber-400/90 max-h-[190px] overflow-auto select-all leading-relaxed whitespace-pre">
                    {JSON.stringify(portfolioData, null, 2)}
                  </pre>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCopyJSON}
                    className="px-6 py-2.5 rounded-full border border-white/20 hover:border-white font-sans text-xs uppercase tracking-widest text-white transition-all flex items-center gap-2 cursor-pointer bg-white/5"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-emerald-400" />
                        <span className="text-emerald-400 font-bold">
                          Copied to Clipboard
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy JSON Bundle</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadJSON}
                    className="px-6 py-2.5 rounded-full border border-white/20 hover:border-white font-sans text-xs uppercase tracking-widest text-zinc-300 hover:text-white transition-all flex items-center gap-2 cursor-pointer bg-white/5"
                  >
                    <Download size={14} />
                    <span>Download JSON File</span>
                  </button>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
