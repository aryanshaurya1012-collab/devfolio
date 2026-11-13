import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Copy, Check, Download, X } from 'lucide-react'

export default function EditorModal({
  isOpen,
  onClose,
  portfolioData,
  setPortfolioData,
}) {
  const [copied, setCopied] = useState(false)
  const [showAddProject, setShowAddProject] = useState(false)
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    year: 'YEAR // 2026',
    tech: '',
  })

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
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
      description: newProject.description.trim(),
      year: newProject.year.trim() || 'YEAR // 2026',
      tech: newProject.tech.trim(),
    }
    setPortfolioData((prev) => ({
      ...prev,
      projects: [...(prev.projects || []), project],
    }))
    setNewProject({ title: '', description: '', year: 'YEAR // 2026', tech: '' })
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
    a.download = `${(portfolioData.name || 'portfolio')
      .toLowerCase()
      .replace(/\s+/g, '-')}-portfolio.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const inputCls =
    'bg-transparent border-b border-[#333] text-white font-sans focus:border-white transition-colors py-2 outline-none w-full text-sm placeholder:text-[#555]'

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-2xl p-4 sm:p-6">
          {/* Backdrop Dismiss */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 -z-10"
          />

          {/* Step 13: Sleek macOS / Notion Style Editor Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-[90vw] max-w-4xl max-h-[85vh] overflow-y-auto bg-[#0f0f0f] border border-[#222] rounded-2xl p-8 sm:p-10 shadow-2xl text-[#e0e0e0] font-sans flex flex-col justify-between space-y-8 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-[#222]">
              <div>
                <h3 className="font-serif text-3xl text-white tracking-tight">
                  Edit Portfolio
                </h3>
                <p className="font-sans text-xs text-[#777] uppercase tracking-widest mt-1">
                  Arc Marumo Design Architecture
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="font-sans text-xs uppercase tracking-widest text-[#888] hover:text-white px-3 py-1.5 rounded-full border border-[#2a2a2a] hover:border-white transition-all flex items-center gap-1.5 cursor-pointer"
                aria-label="Close Editor"
              >
                <X size={13} />
                <span>Close</span>
              </button>
            </div>

            {/* Form Content */}
            <div className="space-y-10">
              {/* Identity Section */}
              <section className="space-y-4">
                <h4 className="font-sans text-xs text-[#777] uppercase tracking-widest">
                  Identity &amp; Presence
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-sans text-xs text-[#888] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={portfolioData.name || ''}
                      onChange={(e) => handleProfileChange('name', e.target.value)}
                      placeholder="e.g. Alexander Vane"
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-xs text-[#888] mb-1">
                      Professional Role
                    </label>
                    <input
                      type="text"
                      value={portfolioData.role || ''}
                      onChange={(e) => handleProfileChange('role', e.target.value)}
                      placeholder="e.g. Creative Developer"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-xs text-[#888] mb-1">
                    Bio / Manifesto
                  </label>
                  <textarea
                    rows={2}
                    value={portfolioData.bio || ''}
                    onChange={(e) => handleProfileChange('bio', e.target.value)}
                    placeholder="Brief architectural statement..."
                    className={`${inputCls} resize-none`}
                  />
                </div>
              </section>

              {/* Projects Management Section */}
              <section className="space-y-5 pt-4 border-t border-[#1a1a1a]">
                <div className="flex items-center justify-between">
                  <h4 className="font-sans text-xs text-[#777] uppercase tracking-widest">
                    Selected Works ({portfolioData.projects?.length || 0})
                  </h4>
                  <button
                    type="button"
                    onClick={() => setShowAddProject((prev) => !prev)}
                    className="font-sans text-xs uppercase tracking-widest text-white px-3.5 py-1.5 rounded-full border border-[#333] hover:border-white transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus size={13} />
                    <span>{showAddProject ? 'Cancel' : 'Add Project'}</span>
                  </button>
                </div>

                {/* Sub-form to Add New Project */}
                {showAddProject && (
                  <div className="p-6 bg-[#141414] border border-[#262626] rounded-xl space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-sans text-xs text-[#888] mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={newProject.title}
                          onChange={(e) =>
                            setNewProject((p) => ({ ...p, title: e.target.value }))
                          }
                          placeholder="Project title..."
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className="block font-sans text-xs text-[#888] mb-1">
                          Year Eyebrow
                        </label>
                        <input
                          type="text"
                          value={newProject.year}
                          onChange={(e) =>
                            setNewProject((p) => ({ ...p, year: e.target.value }))
                          }
                          placeholder="YEAR // 2026"
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-sans text-xs text-[#888] mb-1">
                          Description
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
                          placeholder="Clean editorial description..."
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className="block font-sans text-xs text-[#888] mb-1">
                          Technologies / Medium
                        </label>
                        <input
                          type="text"
                          value={newProject.tech}
                          onChange={(e) =>
                            setNewProject((p) => ({ ...p, tech: e.target.value }))
                          }
                          placeholder="e.g. React · WebGL"
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={handleAddProject}
                        disabled={!newProject.title.trim()}
                        className="px-5 py-2 font-sans text-xs uppercase tracking-widest bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-all disabled:opacity-40 cursor-pointer"
                      >
                        Insert Card
                      </button>
                    </div>
                  </div>
                )}

                {/* Projects List */}
                <div className="space-y-3">
                  {portfolioData.projects?.map((project, idx) => (
                    <div
                      key={project.id || idx}
                      className="p-4 bg-[#141414]/60 border border-[#222] rounded-xl flex items-center justify-between gap-4 group hover:border-[#333] transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-sans text-xs text-[#666]">
                            0{idx + 1}
                          </span>
                          <h5 className="font-serif text-lg text-white font-normal truncate">
                            {project.title}
                          </h5>
                          <span className="font-sans text-[11px] text-[#777] uppercase tracking-wider ml-auto hidden sm:inline">
                            {project.year || 'YEAR // 2026'}
                          </span>
                        </div>
                        <p className="font-sans text-xs text-[#777] truncate mt-1">
                          {project.description}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveProject(idx)}
                        className="text-[#555] hover:text-red-400 p-1.5 transition-colors cursor-pointer"
                        aria-label="Delete project"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Export Section */}
              <section className="space-y-4 pt-4 border-t border-[#1a1a1a]">
                <h4 className="font-sans text-xs text-[#777] uppercase tracking-widest">
                  Configuration Export
                </h4>

                <div className="relative">
                  <pre className="bg-[#080808] border border-[#222] rounded-xl p-5 font-mono text-xs text-[#888] max-h-[180px] overflow-auto select-all leading-relaxed whitespace-pre">
                    {JSON.stringify(portfolioData, null, 2)}
                  </pre>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCopyJSON}
                    className="px-5 py-2.5 rounded-full border border-[#333] hover:border-white font-sans text-xs uppercase tracking-widest text-white transition-all flex items-center gap-2 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-white" />
                        <span>Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy JSON</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadJSON}
                    className="px-5 py-2.5 rounded-full border border-[#333] hover:border-white font-sans text-xs uppercase tracking-widest text-[#aaa] hover:text-white transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Download JSON</span>
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

