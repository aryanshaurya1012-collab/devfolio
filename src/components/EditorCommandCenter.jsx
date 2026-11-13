import React, { useState } from 'react';

const GRADIENTS = [
    { accent: '#f59e0b', gradient: 'from-amber-500/30 via-orange-950/40 to-zinc-950' },
    { accent: '#f43f5e', gradient: 'from-rose-500/30 via-red-950/40 to-zinc-950' },
    { accent: '#10b981', gradient: 'from-emerald-500/30 via-teal-950/40 to-zinc-950' },
    { accent: '#6366f1', gradient: 'from-indigo-500/30 via-violet-950/40 to-zinc-950' }
];

export default function EditorCommandCenter({
    isOpen,
    onClose,
    portfolioData,
    setPortfolioData,
    onReset
}) {
    const [copied, setCopied] = useState(false);
    const [newProj, setNewProj] = useState({
        title: '',
        category: 'WEB3 / AI',
        year: '2026',
        description: '',
        tech: 'React, Three.js, Tailwind',
        liveUrl: ''
    });

    if (!isOpen) return null;

    const handleProfileChange = (field, value) => {
        setPortfolioData((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddProject = (e) => {
        e.preventDefault();
        if (!newProj.title.trim()) return;
        const palette = GRADIENTS[portfolioData.projects.length % GRADIENTS.length];
        const created = {
            id: `proj-${Date.now()}`,
            title: newProj.title,
            category: newProj.category,
            year: newProj.year,
            description: newProj.description || 'Interactive architecture and modern engineering showcase.',
            tech: newProj.tech.split(',').map((t) => t.trim()).filter(Boolean),
            liveUrl: newProj.liveUrl || '#',
            accent: palette.accent,
            gradient: palette.gradient
        };
        setPortfolioData((prev) => ({
            ...prev,
            projects: [...prev.projects, created]
        }));
        setNewProj({ title: '', category: 'WEB3 / AI', year: '2026', description: '', tech: 'React, Three.js', liveUrl: '' });
    };

    const handleDeleteProject = (id) => {
        if (portfolioData.projects.length <= 1) return;
        setPortfolioData((prev) => ({
            ...prev,
            projects: prev.projects.filter((p) => p.id !== id)
        }));
    };

    const copyJson = () => {
        navigator.clipboard.writeText(JSON.stringify(portfolioData, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-2xl p-4 sm:p-8">
            <div className="w-full max-w-4xl max-h-[88vh] overflow-y-auto bg-[#14111a] border border-white/15 rounded-3xl p-6 sm:p-10 text-white shadow-[0_25px_90px_rgba(0,0,0,0.9)]">
                <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
                    <div>
                        <h2 className="font-serif text-3xl text-white">Portfolio Studio</h2>
                        <p className="text-xs tracking-[0.2em] uppercase text-amber-400/80 mt-1">
                            Real-Time 3D Engine & Free Portfolio Builder
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onReset}
                            className="px-4 py-2 rounded-xl border border-white/15 text-xs uppercase tracking-widest text-zinc-300 hover:bg-white/10"
                        >
                            Reset Default
                        </button>
                        <button
                            onClick={onClose}
                            className="px-5 py-2 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-amber-400 transition"
                        >
                            Done ✕
                        </button>
                    </div>
                </div>

                {/* Identity Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="text-[11px] uppercase tracking-widest text-zinc-400">Full Name</label>
                        <input
                            value={portfolioData.name}
                            onChange={(e) => handleProfileChange('name', e.target.value)}
                            className="w-full mt-1 bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white outline-none focus:border-amber-400"
                        />
                    </div>
                    <div>
                        <label className="text-[11px] uppercase tracking-widest text-zinc-400">Professional Role</label>
                        <input
                            value={portfolioData.role}
                            onChange={(e) => handleProfileChange('role', e.target.value)}
                            className="w-full mt-1 bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white outline-none focus:border-amber-400"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="text-[11px] uppercase tracking-widest text-zinc-400">Bio / Manifesto</label>
                        <textarea
                            rows={2}
                            value={portfolioData.bio}
                            onChange={(e) => handleProfileChange('bio', e.target.value)}
                            className="w-full mt-1 bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white outline-none focus:border-amber-400"
                        />
                    </div>
                </div>

                {/* Add New Project Form */}
                <form onSubmit={handleAddProject} className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8">
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">
                        + Add New 3D Project Monolith
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                        <input
                            placeholder="Project Title (e.g. Nexus AI)"
                            value={newProj.title}
                            onChange={(e) => setNewProj({ ...newProj, title: e.target.value })}
                            className="bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-sm text-white"
                        />
                        <input
                            placeholder="Category (e.g. WEB3 SECURITY)"
                            value={newProj.category}
                            onChange={(e) => setNewProj({ ...newProj, category: e.target.value })}
                            className="bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-sm text-white"
                        />
                        <input
                            placeholder="Tech (comma separated)"
                            value={newProj.tech}
                            onChange={(e) => setNewProj({ ...newProj, tech: e.target.value })}
                            className="bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-sm text-white"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            placeholder="Short punchy description..."
                            value={newProj.description}
                            onChange={(e) => setNewProj({ ...newProj, description: e.target.value })}
                            className="flex-1 bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-sm text-white"
                        />
                        <button
                            type="submit"
                            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs uppercase tracking-widest transition"
                        >
                            + Add Card
                        </button>
                    </div>
                </form>

                {/* Existing Projects List */}
                <div className="space-y-3 mb-8">
                    <h3 className="text-xs uppercase tracking-widest text-zinc-400">
                        Active 3D Carousel Cards ({portfolioData.projects.length})
                    </h3>
                    {portfolioData.projects.map((proj, idx) => (
                        <div
                            key={proj.id}
                            className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                        >
                            <div>
                                <span className="text-xs text-amber-400 mr-3">0{idx + 1}</span>
                                <span className="font-semibold text-white">{proj.title}</span>
                                <span className="text-xs text-zinc-400 ml-3">{proj.category}</span>
                            </div>
                            <button
                                onClick={() => handleDeleteProject(proj.id)}
                                className="text-xs text-rose-400 hover:text-rose-300 uppercase tracking-wider px-3 py-1 rounded-lg bg-rose-500/10"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>

                {/* Export JSON */}
                <div className="flex items-center justify-between bg-black/50 border border-white/10 rounded-2xl p-4">
                    <span className="text-xs text-zinc-400">
                        Export your customized portfolio configuration as JSON
                    </span>
                    <button
                        onClick={copyJson}
                        className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white hover:text-black text-xs uppercase tracking-widest transition"
                    >
                        {copied ? '✓ Copied to Clipboard' : 'Copy JSON Config'}
                    </button>
                </div>
            </div>
        </div>
    );
}