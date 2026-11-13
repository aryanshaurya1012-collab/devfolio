import { useState } from 'react'
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
} from 'lucide-react'

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'projects', label: 'Projects', icon: Rocket },
  { id: 'export', label: 'Export', icon: Settings },
]

export default function EditorForm({ portfolioData, setPortfolioData }) {
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
    a.download = 'portfolio-config.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleDeploy() {
    setDeployStatus('BUILDING...')
    setTimeout(() => {
      setDeployStatus('UPLOADING TO IPFS...')
      setTimeout(() => {
        setDeployStatus('DEPLOYED // LIVE')
        setTimeout(() => setDeployStatus(null), 3500)
      }, 1200)
    }, 800)
  }

  // Shared input class
  const inputCls =
    'w-full bg-white/5 border border-white/10 text-white font-mono text-xs rounded-md px-3 py-2.5 focus:outline-none focus:border-cyan-500/70 focus:ring-1 focus:ring-cyan-500/40 transition-all placeholder:text-zinc-600'

  return (
    <div className="flex flex-col h-full text-zinc-200">
      {/* Brand Header */}
      <div className="pb-4 mb-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="font-mono text-sm tracking-widest text-white uppercase font-bold">
              TXSIGHT
            </h2>
          </div>
          <span className="font-mono text-[10px] bg-white/10 text-cyan-400 px-2 py-0.5 rounded">
            v3.0
          </span>
        </div>
        <p className="font-mono text-[11px] text-zinc-500 mt-1">
          Portfolio Builder // Real-Time 3D Preview
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1 mb-5">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 font-mono text-[11px] uppercase tracking-wider py-2 rounded-md transition-all ${
                isActive
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Icon size={13} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-5">
        {/* ========= PROFILE TAB ========= */}
        {activeTab === 'profile' && (
          <>
            <section className="space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-wider text-purple-400 font-semibold flex items-center gap-1.5">
                <User size={12} /> Identity
              </h3>

              <div>
                <label className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={portfolioData.name || ''}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                  placeholder="e.g. Satoshi Nakamoto"
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
                  placeholder="e.g. Web3 Systems Architect"
                  className={inputCls}
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-1.5">
                  Bio / Manifesto
                </label>
                <textarea
                  rows={3}
                  value={portfolioData.bio || ''}
                  onChange={(e) => handleProfileChange('bio', e.target.value)}
                  placeholder="Your mission statement..."
                  className={`${inputCls} resize-none`}
                />
              </div>
            </section>

            <section className="space-y-4 pt-4 border-t border-white/10">
              <h3 className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                <ExternalLink size={12} /> Social Links
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Code2 size={14} className="text-zinc-500 shrink-0" />
                  <input
                    type="text"
                    value={portfolioData.socials?.github || ''}
                    onChange={(e) => handleSocialChange('github', e.target.value)}
                    placeholder="github.com/username"
                    className={inputCls}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <AtSign size={14} className="text-zinc-500 shrink-0" />
                  <input
                    type="text"
                    value={portfolioData.socials?.twitter || ''}
                    onChange={(e) => handleSocialChange('twitter', e.target.value)}
                    placeholder="x.com/handle"
                    className={inputCls}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Link2 size={14} className="text-zinc-500 shrink-0" />
                  <input
                    type="text"
                    value={portfolioData.socials?.linkedin || ''}
                    onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                    placeholder="linkedin.com/in/name"
                    className={inputCls}
                  />
                </div>
              </div>
            </section>
          </>
        )}

        {/* ========= PROJECTS TAB ========= */}
        {activeTab === 'projects' && (
          <>
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-xs uppercase tracking-wider text-purple-400 font-semibold flex items-center gap-1.5">
                  <Rocket size={12} /> Works ({portfolioData.projects?.length || 0})
                </h3>
              </div>

              {/* Existing Projects List */}
              <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                {(!portfolioData.projects || portfolioData.projects.length === 0) && (
                  <div className="text-center py-6 border border-dashed border-white/10 rounded-lg">
                    <p className="font-mono text-xs text-zinc-500">
                      No projects yet. Add one below.
                    </p>
                  </div>
                )}

                {portfolioData.projects?.map((project, idx) => (
                  <div
                    key={project.id || idx}
                    className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/10 rounded-lg group hover:border-white/20 transition-all"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-purple-400 font-bold">
                          0{idx + 1}
                        </span>
                        <p className="font-mono text-xs text-white truncate font-medium">
                          {project.title || 'Untitled'}
                        </p>
                      </div>
                      <p className="font-mono text-[10px] text-emerald-400/80 mt-0.5 truncate">
                        {project.tech || 'No stack'}
                        {project.category ? ` · ${project.category}` : ''}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveProject(idx)}
                      className="text-zinc-600 hover:text-red-400 transition-colors p-1 rounded hover:bg-red-950/30"
                      aria-label={`Delete ${project.title}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Add New Project Sub-Form */}
            <section className="space-y-3 pt-4 border-t border-white/10">
              <h3 className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                <Plus size={12} /> Add New Project
              </h3>

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
                  Description
                </label>
                <input
                  type="text"
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject((p) => ({ ...p, description: e.target.value }))
                  }
                  placeholder="Brief summary..."
                  className={inputCls}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                    Tech Stack
                  </label>
                  <input
                    type="text"
                    value={newProject.tech}
                    onChange={(e) =>
                      setNewProject((p) => ({ ...p, tech: e.target.value }))
                    }
                    placeholder="React, Solidity"
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
                    placeholder="DeFi, AI"
                    className={inputCls}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddProject}
                disabled={!newProject.title.trim()}
                className="w-full flex items-center justify-center gap-2 py-2.5 font-mono text-xs uppercase tracking-wider bg-white/5 border border-white/10 text-cyan-400 hover:bg-cyan-950/30 hover:border-cyan-800/50 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Plus size={14} />
                Add Project Card
              </button>
            </section>
          </>
        )}

        {/* ========= EXPORT TAB ========= */}
        {activeTab === 'export' && (
          <>
            <section className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-wider text-purple-400 font-semibold flex items-center gap-1.5">
                <Settings size={12} /> Live Configuration
              </h3>
              <p className="font-mono text-[11px] text-zinc-500">
                Real-time portfolio state. Copy or export to save.
              </p>

              <div className="relative">
                <pre className="bg-black/60 border border-white/10 rounded-lg p-4 text-[10px] font-mono text-emerald-400/90 max-h-[320px] overflow-auto leading-relaxed whitespace-pre-wrap break-all">
                  {JSON.stringify(portfolioData, null, 2)}
                </pre>
                <button
                  type="button"
                  onClick={handleCopyJSON}
                  className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 text-zinc-400 hover:text-white p-1.5 rounded transition-all"
                  aria-label="Copy JSON"
                >
                  {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                </button>
              </div>
            </section>

            <section className="space-y-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={handleExportJSON}
                className="w-full flex items-center justify-center gap-2 py-3 font-mono text-xs uppercase tracking-wider bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-lg transition-all"
              >
                <Download size={14} />
                Export JSON File
              </button>
            </section>
          </>
        )}
      </div>

      {/* Deploy Button — always visible */}
      <div className="pt-4 mt-4 border-t border-white/10">
        <button
          type="button"
          onClick={handleDeploy}
          disabled={Boolean(deployStatus)}
          className="w-full py-3.5 px-4 rounded-lg font-mono text-xs font-extrabold uppercase tracking-widest text-black bg-gradient-to-r from-purple-500 to-emerald-400 hover:opacity-95 shadow-lg shadow-emerald-500/20 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2"
        >
          <Zap size={14} />
          {deployStatus || 'DEPLOY PORTFOLIO'}
        </button>
        <p className="font-mono text-[10px] text-zinc-600 text-center mt-2">
          Syncs WebGL buffer &amp; pushes live build
        </p>
      </div>
    </div>
  )
}
