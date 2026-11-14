import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  User,
  Briefcase,
  Code2,
  Link2,
  Palette,
  LayoutTemplate,
  Download,
  Upload,
  Copy,
  Check,
  Trash2,
  Plus,
  ArrowUp,
  ArrowDown,
  Edit3,
  RotateCcw,
  X,
  ExternalLink,
  FileText,
  Sun,
  Moon,
} from 'lucide-react';
import { THEMES, STARTER_TEMPLATES } from '../data/portfolio';

const QUICK_SKILL_SUGGESTIONS = [
  'React 18',
  'Three.js',
  'WebGL',
  'GLSL Shaders',
  'TypeScript',
  'Next.js',
  'Tailwind CSS',
  'WebGPU',
  'Python',
  'Rust',
  'Docker',
  'Figma',
  'Framer Motion',
  'Web Audio API',
];

const PRESET_ACCENTS = [
  { hex: '#a78bfa', name: 'Violet' },
  { hex: '#f472b6', name: 'Rose' },
  { hex: '#38bdf8', name: 'Sky' },
  { hex: '#34d399', name: 'Emerald' },
  { hex: '#fbbf24', name: 'Amber' },
  { hex: '#f97316', name: 'Orange' },
];

export default function EditorModal({
  isOpen,
  onClose,
  portfolioData,
  setPortfolioData,
  onResetDefault,
  mode = 'dark',
}) {
  const isLight = (mode || portfolioData?.mode) === 'light';

  // Active Tab: 'profile' | 'projects' | 'skills' | 'socials' | 'theme' | 'templates' | 'export'
  const [activeTab, setActiveTab] = useState('profile');
  const [copied, setCopied] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  // Project Editor state
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [showAddProject, setShowAddProject] = useState(false);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState(null);

  const [newProject, setNewProject] = useState({
    title: '',
    category: 'WEB3 / CREATIVE',
    year: '2026',
    accent: '#a78bfa',
    gradient: 'from-violet-500/30 via-indigo-950/40 to-zinc-950',
    description: '',
    tech: 'React, Three.js, WebGL',
    highlights: [
      'Real-time physical rendering pipeline.',
      'Sub-second state synchronization.',
      'High-contrast accessible architecture.',
    ],
    liveUrl: 'https://github.com',
    sourceUrl: 'https://github.com',
  });

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  // Profile Field Handlers
  const handleProfileChange = (field, value) => {
    setPortfolioData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (field, value) => {
    setPortfolioData((prev) => ({
      ...prev,
      socials: { ...(prev.socials || {}), [field]: value },
    }));
  };

  const handleThemeChange = (themeKey) => {
    setPortfolioData((prev) => ({ ...prev, theme: themeKey }));
    showToast(`Applied ${THEMES[themeKey]?.name || themeKey} theme`);
  };

  const handleModeToggle = (targetMode) => {
    setPortfolioData((prev) => ({ ...prev, mode: targetMode }));
    showToast(`Switched to ${targetMode} mode`);
  };

  // Project Management Handlers
  const handleMoveProject = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= portfolioData.projects.length) return;
    setPortfolioData((prev) => {
      const copy = [...prev.projects];
      const temp = copy[index];
      copy[index] = copy[targetIdx];
      copy[targetIdx] = temp;
      return { ...prev, projects: copy };
    });
  };

  const handleRemoveProject = (index) => {
    if (portfolioData.projects.length <= 1) {
      showToast('At least 1 project is required');
      return;
    }
    const removedTitle = portfolioData.projects[index]?.title;
    setPortfolioData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
    showToast(`Removed "${removedTitle}"`);
  };

  const handleDuplicateProject = (index) => {
    const orig = portfolioData.projects[index];
    const clone = {
      ...orig,
      id: `proj-${Date.now()}`,
      title: `${orig.title} (Copy)`,
    };
    setPortfolioData((prev) => {
      const copy = [...prev.projects];
      copy.splice(index + 1, 0, clone);
      return { ...prev, projects: copy };
    });
    showToast(`Duplicated "${orig.title}"`);
  };

  const handleUpdateProjectField = (id, field, value) => {
    setPortfolioData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => {
        if (p.id !== id) return p;
        if (field === 'tech' && typeof value === 'string') {
          return {
            ...p,
            tech: value.split(/[,/·]/).map((t) => t.trim()).filter(Boolean),
          };
        }
        return { ...p, [field]: value };
      }),
    }));
  };

  const handleUpdateProjectHighlight = (id, highlightIdx, text) => {
    setPortfolioData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => {
        if (p.id !== id) return p;
        const currentHighlights = [...(p.highlights || ['', '', ''])];
        currentHighlights[highlightIdx] = text;
        return { ...p, highlights: currentHighlights };
      }),
    }));
  };

  const handleAddProject = () => {
    if (!newProject.title.trim()) return;
    const techArray = newProject.tech
      ? String(newProject.tech).split(/[,/·]/).map((t) => t.trim()).filter(Boolean)
      : ['React', 'WebGL'];

    const project = {
      id: `proj-${Date.now()}`,
      title: newProject.title.trim(),
      category: newProject.category.trim() || 'PROJECT',
      year: newProject.year.trim() || '2026',
      accent: newProject.accent || '#a78bfa',
      gradient:
        newProject.gradient ||
        'from-violet-500/30 via-indigo-950/40 to-zinc-950',
      description:
        newProject.description.trim() ||
        'Interactive architecture and high-performance design engineering.',
      tech: techArray,
      highlights: newProject.highlights.filter((h) => h.trim().length > 0),
      liveUrl: newProject.liveUrl.trim(),
      sourceUrl: newProject.sourceUrl.trim(),
    };

    setPortfolioData((prev) => ({
      ...prev,
      projects: [...(prev.projects || []), project],
    }));

    setNewProject({
      title: '',
      category: 'WEB3 / CREATIVE',
      year: '2026',
      accent: '#a78bfa',
      gradient: 'from-violet-500/30 via-indigo-950/40 to-zinc-950',
      description: '',
      tech: 'React, Three.js, WebGL',
      highlights: [
        'Real-time physical rendering pipeline.',
        'Sub-second state synchronization.',
        'High-contrast accessible architecture.',
      ],
      liveUrl: 'https://github.com',
      sourceUrl: 'https://github.com',
    });
    setShowAddProject(false);
    showToast(`Mounted "${project.title}" to 3D matrix`);
  };

  // Skills Handlers
  const handleAddSkill = (skillName) => {
    const trimmed = (skillName || newSkillInput).trim();
    if (!trimmed) return;
    if (portfolioData.skills?.includes(trimmed)) {
      showToast(`"${trimmed}" is already added`);
      return;
    }
    setPortfolioData((prev) => ({
      ...prev,
      skills: [...(prev.skills || []), trimmed],
    }));
    setNewSkillInput('');
    showToast(`Added skill: ${trimmed}`);
  };

  const handleRemoveSkill = (skillToRemove) => {
    setPortfolioData((prev) => ({
      ...prev,
      skills: (prev.skills || []).filter((s) => s !== skillToRemove),
    }));
  };

  // Starter Template Apply Handler
  const handleApplyTemplate = (template) => {
    setPortfolioData({
      ...template.data,
      theme: template.theme || template.data.theme || 'obsidian',
      mode: template.mode || template.data.mode || 'dark',
    });
    showToast(`Applied template: ${template.title}`);
  };

  // Import / Export Handlers
  const handleCopyJSON = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(portfolioData, null, 2));
      setCopied(true);
      showToast('Copied full JSON bundle to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Failed to copy');
    }
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(portfolioData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(portfolioData.name || 'devos')
      .toLowerCase()
      .replace(/\s+/g, '-')}-portfolio.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded portfolio.json');
  };

  const handleImportJSON = () => {
    try {
      setImportError(null);
      const parsed = JSON.parse(importJsonText);
      if (!parsed.name || !Array.isArray(parsed.projects)) {
        throw new Error('Invalid schema: Missing required "name" or "projects" array.');
      }
      setPortfolioData(parsed);
      setImportJsonText('');
      showToast('Successfully imported portfolio!');
    } catch (err) {
      setImportError(err.message || 'Malformed JSON format. Please verify syntax.');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        setImportError(null);
        const parsed = JSON.parse(event.target?.result);
        if (!parsed.name || !Array.isArray(parsed.projects)) {
          throw new Error('Invalid schema: Missing required "name" or "projects" array.');
        }
        setPortfolioData(parsed);
        showToast(`Loaded ${file.name} successfully!`);
      } catch (err) {
        setImportError(`File parse error: ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  const inputCls = isLight
    ? 'w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2 text-xs font-mono text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-colors font-medium'
    : 'w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/40 transition-colors';

  const labelCls = `block font-sans text-xs uppercase tracking-wider mb-1.5 font-bold ${
    isLight ? 'text-zinc-900' : 'text-zinc-400'
  }`;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    {
      id: 'projects',
      label: `Projects (${portfolioData.projects?.length || 0})`,
      icon: Briefcase,
    },
    {
      id: 'skills',
      label: `Skills (${portfolioData.skills?.length || 0})`,
      icon: Code2,
    },
    { id: 'socials', label: 'Socials', icon: Link2 },
    { id: 'theme', label: 'Theme & Style', icon: Palette },
    { id: 'templates', label: 'Starter Presets', icon: LayoutTemplate },
    { id: 'export', label: 'Import / Export', icon: Download },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 transition-colors duration-300 ${
            isLight ? 'bg-black/40 backdrop-blur-md' : 'bg-black/85 backdrop-blur-2xl'
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
            className={`w-[95vw] max-w-5xl h-[88vh] border rounded-3xl p-5 sm:p-8 shadow-2xl font-sans flex flex-col justify-between overflow-hidden select-none relative ${
              isLight
                ? 'bg-white border-zinc-200 text-zinc-950 shadow-[0_25px_70px_rgba(0,0,0,0.18)]'
                : 'bg-[#0d0a12] border-white/20 text-[#e0e0e0] shadow-2xl'
            }`}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: isLight ? '#ffffff' : '#0d0a12',
              color: isLight ? '#09090b' : '#f4f4f5',
            }}
          >
            {/* Toast Alert */}
            {toastMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-zinc-900 text-white text-xs font-mono border border-white/20 shadow-xl flex items-center gap-2"
              >
                <Sparkles size={13} className="text-amber-400" />
                <span>{toastMsg}</span>
              </motion.div>
            )}

            {/* Studio Header */}
            <div
              className={`flex items-center justify-between pb-5 border-b shrink-0 ${
                isLight ? 'border-black/10' : 'border-white/10'
              }`}
            >
              <div>
                <h3
                  className={`font-serif text-2xl sm:text-3xl tracking-tight flex items-center gap-2.5 ${
                    isLight ? 'text-zinc-950 font-medium' : 'text-white'
                  }`}
                >
                  <Sparkles
                    size={22}
                    className={isLight ? 'text-purple-600' : 'text-amber-400'}
                  />
                  <span>Portfolio Maker Studio</span>
                </h3>
                <p
                  className={`font-sans text-xs uppercase tracking-widest mt-1 ${
                    isLight ? 'text-zinc-600 font-medium' : 'text-zinc-400'
                  }`}
                >
                  Real-Time 3D Engine &amp; Creative Portfolio Configurator
                </p>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={onResetDefault}
                  className={`font-sans text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 cursor-pointer ${
                    isLight
                      ? 'text-zinc-700 hover:text-black border-black/15 hover:border-black'
                      : 'text-zinc-400 hover:text-white border-white/10 hover:border-white'
                  }`}
                  title="Reset to default showcase portfolio"
                >
                  <RotateCcw size={13} />
                  <span className="hidden sm:inline">Reset Default</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className={`p-2 rounded-full border transition-all cursor-pointer ${
                    isLight
                      ? 'text-zinc-700 hover:text-black border-black/15 hover:border-black'
                      : 'text-zinc-400 hover:text-white border-white/10 hover:border-white'
                  }`}
                  aria-label="Close Editor"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Navigation Tabs Bar */}
            <div
              className={`flex items-center gap-1 sm:gap-2 py-3 border-b overflow-x-auto shrink-0 scrollbar-none ${
                isLight ? 'border-black/10' : 'border-white/10'
              }`}
            >
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1.5 rounded-xl font-sans text-xs font-medium tracking-wide flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? isLight
                          ? 'bg-zinc-900 text-white shadow-sm'
                          : 'bg-white text-black shadow-md'
                        : isLight
                        ? 'text-zinc-600 hover:text-black hover:bg-black/5'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <IconComponent size={14} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Body Container */}
            <div className="flex-1 overflow-y-auto py-6 pr-1 space-y-6">
              {/* TAB 1: PROFILE */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className={labelCls}>Full Name / Display</label>
                      <input
                        type="text"
                        value={portfolioData.name || ''}
                        onChange={(e) => handleProfileChange('name', e.target.value)}
                        placeholder="e.g. ALEXANDER VANE"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className={labelCls}>Professional Title</label>
                      <input
                        type="text"
                        value={portfolioData.role || ''}
                        onChange={(e) => handleProfileChange('role', e.target.value)}
                        placeholder="e.g. Creative Developer & Systems Architect"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className={labelCls}>Location</label>
                      <input
                        type="text"
                        value={portfolioData.location || ''}
                        onChange={(e) => handleProfileChange('location', e.target.value)}
                        placeholder="e.g. San Francisco, CA"
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>Bio / Philosophy Manifesto</label>
                    <textarea
                      rows={3}
                      value={portfolioData.bio || ''}
                      onChange={(e) => handleProfileChange('bio', e.target.value)}
                      placeholder="Outline your design philosophy, engineering architecture, and digital presence..."
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: PROJECTS MANAGER */}
              {activeTab === 'projects' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4
                        className={`font-serif text-lg font-normal ${
                          isLight ? 'text-zinc-950 font-medium' : 'text-white'
                        }`}
                      >
                        3D Monolith Works ({portfolioData.projects?.length || 0})
                      </h4>
                      <p
                        className={`font-sans text-xs mt-0.5 ${
                          isLight ? 'text-zinc-600' : 'text-zinc-400'
                        }`}
                      >
                        Reorder cards, edit details inline, or add brand-new monoliths.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowAddProject((prev) => !prev)}
                      className={`px-4 py-2 rounded-full font-sans text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
                        isLight
                          ? 'bg-zinc-900 text-white hover:bg-black'
                          : 'bg-white text-black hover:bg-zinc-200'
                      }`}
                    >
                      <Plus size={14} />
                      <span>{showAddProject ? 'Close Form' : '+ Add Project'}</span>
                    </button>
                  </div>

                  {/* Add New Project Form */}
                  {showAddProject && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`p-5 rounded-2xl border space-y-4 shadow-xl ${
                        isLight
                          ? 'bg-black/[0.02] border-black/15'
                          : 'bg-[#150f1e] border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between border-b pb-3 border-current/10">
                        <span className="font-mono text-xs uppercase font-bold text-amber-500">
                          Create New Monolith Card
                        </span>
                        <span className="text-[11px] text-zinc-500 font-mono">
                          Will mount at position {portfolioData.projects.length + 1}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className={labelCls}>Project Title</label>
                          <input
                            type="text"
                            value={newProject.title}
                            onChange={(e) =>
                              setNewProject((p) => ({ ...p, title: e.target.value }))
                            }
                            placeholder="e.g. Aether"
                            className={inputCls}
                          />
                        </div>

                        <div>
                          <label className={labelCls}>Category Badge</label>
                          <input
                            type="text"
                            value={newProject.category}
                            onChange={(e) =>
                              setNewProject((p) => ({ ...p, category: e.target.value }))
                            }
                            placeholder="PROTOCOL INTERFACE"
                            className={inputCls}
                          />
                        </div>

                        <div>
                          <label className={labelCls}>Year</label>
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
                          <label className={labelCls}>Accent Color</label>
                          <div className="flex items-center gap-2">
                            {PRESET_ACCENTS.map((acc) => (
                              <button
                                key={acc.hex}
                                type="button"
                                onClick={() =>
                                  setNewProject((p) => ({ ...p, accent: acc.hex }))
                                }
                                title={acc.name}
                                className={`w-6 h-6 rounded-full transition-transform cursor-pointer ${
                                  newProject.accent === acc.hex
                                    ? 'scale-125 ring-2 ring-white ring-offset-1'
                                    : 'opacity-70 hover:opacity-100'
                                }`}
                                style={{ backgroundColor: acc.hex }}
                              />
                            ))}
                            <input
                              type="color"
                              value={newProject.accent}
                              onChange={(e) =>
                                setNewProject((p) => ({ ...p, accent: e.target.value }))
                              }
                              className="w-7 h-7 rounded border border-current/20 bg-transparent cursor-pointer ml-2"
                            />
                          </div>
                        </div>

                        <div>
                          <label className={labelCls}>Tech Stack (comma-separated)</label>
                          <input
                            type="text"
                            value={newProject.tech}
                            onChange={(e) =>
                              setNewProject((p) => ({ ...p, tech: e.target.value }))
                            }
                            placeholder="React, Three.js, WebGL"
                            className={inputCls}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={labelCls}>Executive Synopsis</label>
                        <textarea
                          rows={2}
                          value={newProject.description}
                          onChange={(e) =>
                            setNewProject((p) => ({
                              ...p,
                              description: e.target.value,
                            }))
                          }
                          placeholder="Comprehensive description of the design engineering and technology..."
                          className={`${inputCls} resize-none`}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelCls}>Live URL</label>
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
                          <label className={labelCls}>Source Code URL</label>
                          <input
                            type="text"
                            value={newProject.sourceUrl}
                            onChange={(e) =>
                              setNewProject((p) => ({
                                ...p,
                                sourceUrl: e.target.value,
                              }))
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
                          className={`px-6 py-2.5 rounded-full font-sans text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer shadow-md disabled:opacity-40 disabled:cursor-not-allowed ${
                            isLight
                              ? 'bg-zinc-900 text-white hover:bg-black'
                              : 'bg-white text-black hover:bg-zinc-200'
                          }`}
                        >
                          Mount Card to 3D Matrix
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Existing Projects List with In-Place Edit */}
                  <div className="space-y-3">
                    {portfolioData.projects?.map((project, idx) => {
                      const isExpanded = editingProjectId === project.id;
                      return (
                        <div
                          key={project.id || idx}
                          className={`rounded-2xl border transition-all overflow-hidden ${
                            isLight
                              ? 'bg-black/[0.02] border-black/10 hover:border-black/25'
                              : 'bg-white/[0.03] border-white/10 hover:border-white/25'
                          }`}
                        >
                          {/* Card Header Row */}
                          <div className="p-4 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              {/* Reorder Buttons */}
                              <div className="flex flex-col gap-1 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => handleMoveProject(idx, -1)}
                                  disabled={idx === 0}
                                  className="p-1 rounded hover:bg-current/10 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                                  title="Move Up in Carousel"
                                >
                                  <ArrowUp size={12} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleMoveProject(idx, 1)}
                                  disabled={idx === portfolioData.projects.length - 1}
                                  className="p-1 rounded hover:bg-current/10 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                                  title="Move Down in Carousel"
                                >
                                  <ArrowDown size={12} />
                                </button>
                              </div>

                              <div
                                className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                                style={{ backgroundColor: project.accent || '#a78bfa' }}
                              />

                              <span className="font-mono text-xs font-semibold text-zinc-500 shrink-0">
                                0{idx + 1}
                              </span>

                              <div className="truncate">
                                <h5
                                  className={`font-serif text-base truncate font-normal ${
                                    isLight ? 'text-zinc-950 font-medium' : 'text-white'
                                  }`}
                                >
                                  {project.title}
                                </h5>
                                <p className="font-sans text-[11px] text-zinc-500 truncate">
                                  {project.category} · {project.year}
                                </p>
                              </div>
                            </div>

                            {/* Actions: Edit toggle, Duplicate, Delete */}
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() =>
                                  setEditingProjectId((prev) =>
                                    prev === project.id ? null : project.id
                                  )
                                }
                                className={`px-3 py-1.5 rounded-lg border text-xs font-sans font-medium flex items-center gap-1.5 cursor-pointer transition-colors ${
                                  isExpanded
                                    ? isLight
                                      ? 'bg-zinc-900 text-white border-zinc-900'
                                      : 'bg-white text-black border-white'
                                    : isLight
                                    ? 'bg-white border-black/15 text-zinc-800 hover:bg-black/5'
                                    : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10'
                                }`}
                              >
                                <Edit3 size={12} />
                                <span>{isExpanded ? 'Done' : 'Edit'}</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDuplicateProject(idx)}
                                className="p-2 rounded-lg hover:bg-current/10 text-zinc-500 hover:text-current transition-colors cursor-pointer"
                                title="Duplicate Project"
                              >
                                <Copy size={14} />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleRemoveProject(idx)}
                                disabled={portfolioData.projects.length <= 1}
                                className="p-2 rounded-lg hover:bg-rose-500/10 text-zinc-500 hover:text-rose-500 transition-colors cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
                                title="Delete Project"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>

                          {/* In-Place Expanded Edit Accordion */}
                          {isExpanded && (
                            <div
                              className={`p-5 border-t space-y-4 ${
                                isLight
                                  ? 'bg-white border-black/10'
                                  : 'bg-black/40 border-white/10'
                              }`}
                            >
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                  <label className={labelCls}>Title</label>
                                  <input
                                    type="text"
                                    value={project.title}
                                    onChange={(e) =>
                                      handleUpdateProjectField(
                                        project.id,
                                        'title',
                                        e.target.value
                                      )
                                    }
                                    className={inputCls}
                                  />
                                </div>
                                <div>
                                  <label className={labelCls}>Category</label>
                                  <input
                                    type="text"
                                    value={project.category}
                                    onChange={(e) =>
                                      handleUpdateProjectField(
                                        project.id,
                                        'category',
                                        e.target.value
                                      )
                                    }
                                    className={inputCls}
                                  />
                                </div>
                                <div>
                                  <label className={labelCls}>Year</label>
                                  <input
                                    type="text"
                                    value={project.year}
                                    onChange={(e) =>
                                      handleUpdateProjectField(
                                        project.id,
                                        'year',
                                        e.target.value
                                      )
                                    }
                                    className={inputCls}
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className={labelCls}>Accent Color</label>
                                  <div className="flex items-center gap-2">
                                    {PRESET_ACCENTS.map((acc) => (
                                      <button
                                        key={acc.hex}
                                        type="button"
                                        onClick={() =>
                                          handleUpdateProjectField(
                                            project.id,
                                            'accent',
                                            acc.hex
                                          )
                                        }
                                        className={`w-5 h-5 rounded-full transition-transform cursor-pointer ${
                                          project.accent === acc.hex
                                            ? 'scale-125 ring-2 ring-current ring-offset-1'
                                            : 'opacity-70 hover:opacity-100'
                                        }`}
                                        style={{ backgroundColor: acc.hex }}
                                      />
                                    ))}
                                    <input
                                      type="color"
                                      value={project.accent || '#a78bfa'}
                                      onChange={(e) =>
                                        handleUpdateProjectField(
                                          project.id,
                                          'accent',
                                          e.target.value
                                        )
                                      }
                                      className="w-6 h-6 rounded border border-current/20 bg-transparent cursor-pointer ml-1"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label className={labelCls}>
                                    Tech Stack (comma-separated)
                                  </label>
                                  <input
                                    type="text"
                                    value={
                                      Array.isArray(project.tech)
                                        ? project.tech.join(', ')
                                        : project.tech || ''
                                    }
                                    onChange={(e) =>
                                      handleUpdateProjectField(
                                        project.id,
                                        'tech',
                                        e.target.value
                                      )
                                    }
                                    className={inputCls}
                                  />
                                </div>
                              </div>

                              <div>
                                <label className={labelCls}>Description</label>
                                <textarea
                                  rows={2}
                                  value={project.description}
                                  onChange={(e) =>
                                    handleUpdateProjectField(
                                      project.id,
                                      'description',
                                      e.target.value
                                    )
                                  }
                                  className={`${inputCls} resize-none`}
                                />
                              </div>

                              {/* Highlights */}
                              <div>
                                <label className={labelCls}>
                                  Key Architectural Innovations (Shown in Case Study)
                                </label>
                                <div className="space-y-2">
                                  {[0, 1, 2].map((hIdx) => (
                                    <input
                                      key={hIdx}
                                      type="text"
                                      value={project.highlights?.[hIdx] || ''}
                                      onChange={(e) =>
                                        handleUpdateProjectHighlight(
                                          project.id,
                                          hIdx,
                                          e.target.value
                                        )
                                      }
                                      placeholder={`Innovation highlight #${hIdx + 1}...`}
                                      className={inputCls}
                                    />
                                  ))}
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className={labelCls}>Live URL</label>
                                  <input
                                    type="text"
                                    value={project.liveUrl || ''}
                                    onChange={(e) =>
                                      handleUpdateProjectField(
                                        project.id,
                                        'liveUrl',
                                        e.target.value
                                      )
                                    }
                                    className={inputCls}
                                  />
                                </div>
                                <div>
                                  <label className={labelCls}>Source URL</label>
                                  <input
                                    type="text"
                                    value={project.sourceUrl || ''}
                                    onChange={(e) =>
                                      handleUpdateProjectField(
                                        project.id,
                                        'sourceUrl',
                                        e.target.value
                                      )
                                    }
                                    className={inputCls}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: SKILLS MANAGER */}
              {activeTab === 'skills' && (
                <div className="space-y-6">
                  <div>
                    <label className={labelCls}>Active Skills Arsenal</label>
                    <div className="flex flex-wrap gap-2 p-4 rounded-2xl border bg-black/[0.02] border-current/10 min-h-[90px]">
                      {(portfolioData.skills || []).map((skill) => (
                        <span
                          key={skill}
                          className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium border flex items-center gap-1.5 transition-colors ${
                            isLight
                              ? 'bg-black/5 border-black/15 text-zinc-800'
                              : 'bg-white/10 border-white/15 text-zinc-200'
                          }`}
                        >
                          <span>{skill}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="text-zinc-500 hover:text-rose-500 cursor-pointer"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Add Custom Skill */}
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newSkillInput}
                      onChange={(e) => setNewSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkill(newSkillInput);
                        }
                      }}
                      placeholder="Type a skill (e.g. WebGPU, Rust, GraphQL) and press Enter..."
                      className={inputCls}
                    />
                    <button
                      type="button"
                      onClick={() => handleAddSkill(newSkillInput)}
                      className={`px-5 py-2 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold shrink-0 cursor-pointer transition-all ${
                        isLight
                          ? 'bg-zinc-900 text-white hover:bg-black'
                          : 'bg-white text-black hover:bg-zinc-200'
                      }`}
                    >
                      + Add
                    </button>
                  </div>

                  {/* Quick Suggestions */}
                  <div>
                    <label className={labelCls}>Quick Add Popular Skills</label>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {QUICK_SKILL_SUGGESTIONS.map((sug) => {
                        const isAdded = portfolioData.skills?.includes(sug);
                        return (
                          <button
                            key={sug}
                            type="button"
                            disabled={isAdded}
                            onClick={() => handleAddSkill(sug)}
                            className={`px-3 py-1 rounded-full text-xs font-mono border transition-all cursor-pointer ${
                              isAdded
                                ? 'opacity-30 border-current/10 cursor-not-allowed'
                                : isLight
                                ? 'border-black/15 hover:border-black text-zinc-700 hover:text-black bg-white'
                                : 'border-white/15 hover:border-white text-zinc-300 hover:text-white bg-white/5'
                            }`}
                          >
                            {isAdded ? `✓ ${sug}` : `+ ${sug}`}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: SOCIALS */}
              {activeTab === 'socials' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls}>GitHub Profile URL</label>
                      <input
                        type="text"
                        value={portfolioData.socials?.github || ''}
                        onChange={(e) => handleSocialChange('github', e.target.value)}
                        placeholder="https://github.com/username"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className={labelCls}>LinkedIn URL</label>
                      <input
                        type="text"
                        value={portfolioData.socials?.linkedin || ''}
                        onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                        placeholder="https://linkedin.com/in/username"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className={labelCls}>X / Twitter URL</label>
                      <input
                        type="text"
                        value={portfolioData.socials?.twitter || ''}
                        onChange={(e) => handleSocialChange('twitter', e.target.value)}
                        placeholder="https://x.com/username"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className={labelCls}>Direct Email Address</label>
                      <input
                        type="email"
                        value={portfolioData.socials?.email || ''}
                        onChange={(e) => handleSocialChange('email', e.target.value)}
                        placeholder="contact@example.com"
                        className={inputCls}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: THEME & STYLE */}
              {activeTab === 'theme' && (
                <div className="space-y-6">
                  {/* Mode Selector */}
                  <div>
                    <label className={labelCls}>Display Mode</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => handleModeToggle('dark')}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          !isLight
                            ? 'bg-white/10 border-white text-white shadow-lg'
                            : 'bg-black/[0.02] border-black/10 text-zinc-500 hover:border-black/30'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Moon size={18} className="text-amber-400" />
                          <div>
                            <span className="font-sans text-xs font-semibold block">
                              Dark Obsidian Mode
                            </span>
                            <span className="text-[11px] text-zinc-500">
                              Cinematic retro WebGL aesthetic
                            </span>
                          </div>
                        </div>
                        {!isLight && (
                          <span className="text-[10px] font-mono font-bold text-emerald-400">
                            ACTIVE
                          </span>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleModeToggle('light')}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isLight
                            ? 'bg-zinc-900 border-zinc-900 text-white shadow-lg'
                            : 'bg-white/[0.02] border-white/10 text-zinc-500 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Sun size={18} className="text-amber-500" />
                          <div>
                            <span className="font-sans text-xs font-semibold block">
                              Light Editorial Mode
                            </span>
                            <span className="text-[11px] text-zinc-400">
                              Clean Swiss alabaster aesthetic
                            </span>
                          </div>
                        </div>
                        {isLight && (
                          <span className="text-[10px] font-mono font-bold text-amber-300">
                            ACTIVE
                          </span>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* 4 Color Aromas */}
                  <div>
                    <label className={labelCls}>3D Atmosphere &amp; Color Aromas</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      {Object.values(THEMES).map((t) => {
                        const isSelected = (portfolioData.theme || 'obsidian') === t.id;
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => handleThemeChange(t.id)}
                            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? isLight
                                  ? 'bg-black/10 border-black shadow-md'
                                  : 'bg-white/10 border-white shadow-lg'
                                : isLight
                                ? 'bg-black/[0.02] border-black/10 hover:border-black/30'
                                : 'bg-white/[0.02] border-white/10 hover:border-white/30'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div
                                className="w-4 h-4 rounded-full shadow-sm"
                                style={{ backgroundColor: t.pillColor }}
                              />
                              {isSelected && (
                                <span className="text-[10px] font-mono font-bold text-emerald-400">
                                  ACTIVE
                                </span>
                              )}
                            </div>
                            <div>
                              <span className="font-sans text-xs font-semibold block">
                                {t.name}
                              </span>
                              <span className="text-[10px] text-zinc-500 font-mono">
                                {t.id}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: STARTER PRESETS */}
              {activeTab === 'templates' && (
                <div className="space-y-4">
                  <div>
                    <h4
                      className={`font-serif text-lg font-normal ${
                        isLight ? 'text-zinc-950 font-medium' : 'text-white'
                      }`}
                    >
                      1-Click Portfolio Starter Templates
                    </h4>
                    <p
                      className={`font-sans text-xs mt-0.5 ${
                        isLight ? 'text-zinc-600' : 'text-zinc-400'
                      }`}
                    >
                      Choose an archetype to jumpstart your portfolio with curated projects,
                      theme lighting, and skills.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {STARTER_TEMPLATES.map((tmpl) => (
                      <div
                        key={tmpl.id}
                        className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                          isLight
                            ? 'bg-black/[0.02] border-black/10 hover:border-black/30'
                            : 'bg-white/[0.02] border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase border font-semibold">
                              {tmpl.badge}
                            </span>
                            <span className="text-xs font-mono text-zinc-500">
                              {tmpl.data.projects?.length} Projects
                            </span>
                          </div>
                          <h5
                            className={`font-serif text-lg font-normal mt-2 ${
                              isLight ? 'text-zinc-950 font-medium' : 'text-white'
                            }`}
                          >
                            {tmpl.title}
                          </h5>
                          <p className="font-sans text-xs text-zinc-500 mt-1">
                            {tmpl.subtitle}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleApplyTemplate(tmpl)}
                          className={`mt-5 py-2.5 px-4 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                            isLight
                              ? 'bg-zinc-900 text-white hover:bg-black'
                              : 'bg-white/10 hover:bg-white text-white hover:text-black border border-white/20'
                          }`}
                        >
                          <Sparkles size={13} />
                          <span>Load This Archetype</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: IMPORT / EXPORT */}
              {activeTab === 'export' && (
                <div className="space-y-6">
                  {/* Export Options */}
                  <div>
                    <label className={labelCls}>Export Portfolio Configuration</label>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={handleCopyJSON}
                        className={`px-5 py-2.5 rounded-xl border font-sans text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                          isLight
                            ? 'bg-black/5 hover:bg-black/10 border-black/15 text-zinc-900'
                            : 'bg-white/5 hover:bg-white/10 border-white/15 text-white'
                        }`}
                      >
                        {copied ? (
                          <>
                            <Check size={14} className="text-emerald-500 font-bold" />
                            <span className="text-emerald-500">Copied Bundle</span>
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
                        className={`px-5 py-2.5 rounded-xl border font-sans text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                          isLight
                            ? 'bg-black/5 hover:bg-black/10 border-black/15 text-zinc-900'
                            : 'bg-white/5 hover:bg-white/10 border-white/15 text-white'
                        }`}
                      >
                        <Download size={14} />
                        <span>Download .json File</span>
                      </button>
                    </div>
                  </div>

                  {/* Import Options */}
                  <div>
                    <label className={labelCls}>Import Custom JSON Bundle</label>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <label
                          className={`px-4 py-2 rounded-xl border font-sans text-xs uppercase tracking-wider font-semibold cursor-pointer transition-colors flex items-center gap-2 ${
                            isLight
                              ? 'bg-white border-black/15 text-zinc-800 hover:border-black'
                              : 'bg-white/5 border-white/15 text-zinc-300 hover:border-white'
                          }`}
                        >
                          <Upload size={14} />
                          <span>Upload .json File</span>
                          <input
                            type="file"
                            accept=".json,application/json"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                        <span className="text-xs text-zinc-500">or paste JSON below</span>
                      </div>

                      <textarea
                        rows={4}
                        value={importJsonText}
                        onChange={(e) => {
                          setImportJsonText(e.target.value);
                          setImportError(null);
                        }}
                        placeholder='Paste your exported {"name": "...", "projects": [...]} JSON bundle here...'
                        className={`${inputCls} font-mono resize-none`}
                      />

                      {importError && (
                        <p className="text-xs font-mono text-rose-500">{importError}</p>
                      )}

                      <button
                        type="button"
                        onClick={handleImportJSON}
                        disabled={!importJsonText.trim()}
                        className={`px-5 py-2 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                          isLight
                            ? 'bg-zinc-900 text-white hover:bg-black'
                            : 'bg-white text-black hover:bg-zinc-200'
                        }`}
                      >
                        Apply Imported Config
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Studio Bottom Bar */}
            <div
              className={`pt-4 border-t flex items-center justify-between shrink-0 text-xs ${
                isLight ? 'border-black/10' : 'border-white/10'
              }`}
            >
              <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>DEV-OS STUDIO // AUTO-SAVED TO LOCALSTORAGE</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className={`px-6 py-2 rounded-full font-sans text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer shadow-md ${
                  isLight
                    ? 'bg-zinc-900 text-white hover:bg-black'
                    : 'bg-white text-black hover:bg-zinc-200'
                }`}
              >
                Done / Return to 3D View
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
