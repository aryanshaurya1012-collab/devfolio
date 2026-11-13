import { useState } from 'react'

export default function EditorForm({ portfolioData, setPortfolioData }) {
  const [deployStatus, setDeployStatus] = useState(null)

  function handleProfileChange(field, value) {
    setPortfolioData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  function handleProjectChange(index, field, value) {
    setPortfolioData((prev) => {
      const updatedProjects = [...prev.projects]
      updatedProjects[index] = {
        ...updatedProjects[index],
        [field]: value,
      }
      return {
        ...prev,
        projects: updatedProjects,
      }
    })
  }

  function handleAddProject() {
    const newProjectNumber = (portfolioData.projects?.length || 0) + 1
    const newProject = {
      id: `proj-${Date.now()}`,
      title: `Project 0${newProjectNumber}`,
      tech: 'React / Web3',
      category: 'Protocol',
      description: 'A cutting-edge interactive decentralized interface.',
    }
    setPortfolioData((prev) => ({
      ...prev,
      projects: [...(prev.projects || []), newProject],
    }))
  }

  function handleRemoveProject(index) {
    setPortfolioData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }))
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

  return (
    <div className="flex flex-col h-full space-y-6 text-zinc-200">
      {/* Brand & Status */}
      <div className="border-b border-white/10 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="font-mono text-sm tracking-widest text-white uppercase font-bold">
              TXSIGHT // BUILDER
            </h2>
          </div>
          <span className="font-mono text-[10px] bg-white/10 text-cyan-400 px-2 py-0.5 rounded">
            v2.4 CRT
          </span>
        </div>
        <p className="font-mono text-[11px] text-zinc-400 mt-1">
          Configure real-time 3D reactive portfolio
        </p>
      </div>

      {/* Profile Section */}
      <div className="space-y-4">
        <h3 className="font-mono text-xs uppercase tracking-wider text-purple-400 font-semibold">
          01 // Identity
        </h3>

        <div>
          <label className="block font-mono text-[11px] text-zinc-400 uppercase tracking-wider mb-1.5">
            Display Name
          </label>
          <input
            type="text"
            value={portfolioData.name || ''}
            onChange={(e) => handleProfileChange('name', e.target.value)}
            placeholder="e.g. Satoshi Nakamoto"
            className="w-full bg-white/5 border border-white/10 text-white font-mono text-xs rounded-md px-3 py-2.5 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-zinc-600"
          />
        </div>

        <div>
          <label className="block font-mono text-[11px] text-zinc-400 uppercase tracking-wider mb-1.5">
            Professional Role
          </label>
          <input
            type="text"
            value={portfolioData.role || ''}
            onChange={(e) => handleProfileChange('role', e.target.value)}
            placeholder="e.g. Web3 Systems Architect"
            className="w-full bg-white/5 border border-white/10 text-white font-mono text-xs rounded-md px-3 py-2.5 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-zinc-600"
          />
        </div>

        <div>
          <label className="block font-mono text-[11px] text-zinc-400 uppercase tracking-wider mb-1.5">
            Brief Bio / Manifesto
          </label>
          <textarea
            rows={2}
            value={portfolioData.bio || ''}
            onChange={(e) => handleProfileChange('bio', e.target.value)}
            placeholder="Architecting robust smart contracts and reactive web visualizers..."
            className="w-full bg-white/5 border border-white/10 text-white font-mono text-xs rounded-md px-3 py-2.5 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-zinc-600 resize-none"
          />
        </div>
      </div>

      {/* Dynamic Projects Section */}
      <div className="space-y-4 pt-2 border-t border-white/10">
        <div className="flex items-center justify-between">
          <h3 className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold">
            02 // Works ({portfolioData.projects?.length || 0})
          </h3>
          <button
            type="button"
            onClick={handleAddProject}
            className="font-mono text-[11px] text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 border border-cyan-800/60 px-2.5 py-1 rounded transition-colors"
          >
            + ADD PROJECT
          </button>
        </div>

        <div className="space-y-3.5 max-h-[340px] overflow-y-auto pr-1">
          {(!portfolioData.projects || portfolioData.projects.length === 0) && (
            <div className="text-center py-6 border border-dashed border-white/10 rounded-lg">
              <p className="font-mono text-xs text-zinc-500">No projects added yet.</p>
              <button
                type="button"
                onClick={handleAddProject}
                className="mt-2 font-mono text-xs text-cyan-400 hover:underline"
              >
                + Create First Card
              </button>
            </div>
          )}

          {portfolioData.projects?.map((project, idx) => (
            <div
              key={project.id || idx}
              className="p-3.5 bg-black/40 border border-white/10 rounded-lg space-y-2.5 relative group hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span className="font-mono text-[10px] text-purple-400 font-semibold">
                  SLOT 0{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveProject(idx)}
                  className="font-mono text-[10px] text-red-400/80 hover:text-red-300 hover:bg-red-950/30 px-1.5 py-0.5 rounded transition-colors"
                >
                  REMOVE ×
                </button>
              </div>

              <div>
                <label className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={project.title || ''}
                  onChange={(e) => handleProjectChange(idx, 'title', e.target.value)}
                  placeholder="Project Title"
                  className="w-full bg-white/5 border border-white/10 text-white font-mono text-xs rounded px-2.5 py-1.5 focus:outline-none focus:border-cyan-400 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                    Primary Tech
                  </label>
                  <input
                    type="text"
                    value={project.tech || ''}
                    onChange={(e) => handleProjectChange(idx, 'tech', e.target.value)}
                    placeholder="e.g. Solidity"
                    className="w-full bg-white/5 border border-white/10 text-emerald-400 font-mono text-xs rounded px-2.5 py-1.5 focus:outline-none focus:border-cyan-400 transition-all"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={project.category || ''}
                    onChange={(e) => handleProjectChange(idx, 'category', e.target.value)}
                    placeholder="e.g. Web3"
                    className="w-full bg-white/5 border border-white/10 text-zinc-300 font-mono text-xs rounded px-2.5 py-1.5 focus:outline-none focus:border-cyan-400 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                  Summary
                </label>
                <input
                  type="text"
                  value={project.description || ''}
                  onChange={(e) => handleProjectChange(idx, 'description', e.target.value)}
                  placeholder="Brief description..."
                  className="w-full bg-white/5 border border-white/10 text-zinc-300 font-mono text-[11px] rounded px-2.5 py-1.5 focus:outline-none focus:border-cyan-400 transition-all"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deploy Button */}
      <div className="pt-2 mt-auto">
        <button
          type="button"
          onClick={handleDeploy}
          disabled={Boolean(deployStatus)}
          className="w-full py-3.5 px-4 rounded-lg font-mono text-xs font-extrabold uppercase tracking-widest text-black bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 hover:opacity-95 shadow-lg shadow-emerald-500/20 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-75"
        >
          {deployStatus || '⚡ DEPLOY PORTFOLIO'}
        </button>
        <p className="font-mono text-[10px] text-zinc-500 text-center mt-2">
          Syncs WebGL buffer &amp; updates 3D preview in real-time
        </p>
      </div>
    </div>
  )
}

