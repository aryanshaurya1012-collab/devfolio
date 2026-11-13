export const defaultPortfolioData = {
  name: "ALEXANDER VANE",
  role: "Creative Developer & Architect",
  location: "San Francisco, CA",
  bio: "A minimal study in digital presence, editorial typography, and physical WebGL materiality. Designing real-time decentralized interfaces and high-performance systems.",
  theme: "obsidian",
  socials: { github: "#", linkedin: "#", twitter: "#", email: "hello@example.com" },
  skills: ["React 18", "Three.js", "WebGL", "Framer Motion", "Tailwind CSS", "Next.js"],
  projects: [
    {
      id: "proj-1", title: "Aether", category: "PROTOCOL INTERFACE", year: "2026",
      accent: "#a78bfa", gradient: "from-violet-500/30 via-indigo-950/40 to-zinc-950",
      description: "A decentralized liquidity interface built with real-time on-chain data visualization and reactive physical materials.",
      tech: ["React", "Ethers.js", "WebGL"], liveUrl: "#", sourceUrl: "#"
    },
    {
      id: "proj-2", title: "Monolith", category: "GENERATIVE ART", year: "2025",
      accent: "#f472b6", gradient: "from-pink-500/30 via-rose-950/40 to-zinc-950",
      description: "High-fidelity generative architecture visualizer with real-time reactive shaders.",
      tech: ["Three.js", "GLSL", "Web Audio API"], liveUrl: "#", sourceUrl: "#"
    },
    {
      id: "proj-3", title: "Chronos", category: "SPATIAL AUDIO", year: "2024",
      accent: "#38bdf8", gradient: "from-sky-500/30 via-blue-950/40 to-zinc-950",
      description: "A sonic and spatial interface inspired by mid-century audio engineering.",
      tech: ["Vue", "Tone.js", "GSAP"], liveUrl: "#", sourceUrl: "#"
    },
    {
      id: "proj-4", title: "Kinesis", category: "EXPERIMENTAL", year: "2026",
      accent: "#34d399", gradient: "from-emerald-500/30 via-teal-950/40 to-zinc-950",
      description: "Experimental kinetic typography engine exploring fluid dynamics.",
      tech: ["Vanilla JS", "Canvas API", "Math"], liveUrl: "#", sourceUrl: "#"
    }
  ]
};

export const THEMES = {
  obsidian: { name: "Royal Obsidian", bgHex: "#0c0f1d", fogHex: "#0c0f1d", keyLight: "#a78bfa", rimLight: "#f472b6", sparkle: "#c4b5fd", cssBg: "radial-gradient(circle at 50% 35%, #1b2141 0%, #0b0e1b 55%, #05060c 100%)" },
  amber: { name: "Amber Noir", bgHex: "#120d16", fogHex: "#120d16", keyLight: "#ff8a4c", rimLight: "#818cf8", sparkle: "#fbbf24", cssBg: "radial-gradient(circle at 50% 35%, #24172b 0%, #110b15 55%, #070509 100%)" }
};
