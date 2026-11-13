export const defaultPortfolioData = {
  name: "ALEXANDER VANE",
  role: "Creative Developer & Systems Architect",
  location: "San Francisco, CA",
  bio: "Specializing in real-time WebGL materiality, distributed systems, and cinematic digital presence. Crafting high-performance spatial interfaces and autonomous computational visualizers.",
  theme: "obsidian",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
    email: "contact@studio-vane.io",
  },
  skills: [
    "Three.js / WebGL",
    "React 18",
    "GLSL Shaders",
    "TypeScript",
    "Web Audio API",
    "Tailwind CSS",
    "Next.js",
    "Framer Motion",
  ],
  projects: [
    {
      id: "proj-1",
      title: "Aether",
      category: "PROTOCOL INTERFACE",
      year: "2026",
      accent: "#a78bfa",
      gradient: "from-violet-500/30 via-indigo-950/40 to-zinc-950",
      description:
        "Decentralized real-time liquidity visualization engine powered by physical WebGL shaders and low-latency websocket streams.",
      tech: ["React", "WebGL", "Ethers.js", "GLSL"],
      highlights: [
        "Sub-millisecond data stream visualization pipeline.",
        "Custom physical glass shader with real-time chromatic dispersion.",
        "Autonomous topology clustering algorithms for high-frequency telemetry.",
      ],
      liveUrl: "https://github.com",
      sourceUrl: "https://github.com",
    },
    {
      id: "proj-2",
      title: "Monolith",
      category: "GENERATIVE ARCHITECTURE",
      year: "2025",
      accent: "#f472b6",
      gradient: "from-pink-500/30 via-rose-950/40 to-zinc-950",
      description:
        "Generative 3D monolith visualizer mapping architectural forms through procedural raymarching and reactive audio acoustics.",
      tech: ["Three.js", "Raymarching", "Web Audio API", "GLSL"],
      highlights: [
        "Procedural SDF raymarching running at 60 FPS in browser.",
        "Fast Fourier Transform (FFT) harmonic spatial decomposition.",
        "GPU particle displacement simulation with compute shaders.",
      ],
      liveUrl: "https://github.com",
      sourceUrl: "https://github.com",
    },
    {
      id: "proj-3",
      title: "Chronos",
      category: "SPATIAL COMPUTING",
      year: "2024",
      accent: "#38bdf8",
      gradient: "from-sky-500/30 via-blue-950/40 to-zinc-950",
      description:
        "A spatial audio sequencing environment modeled after mid-century analog synthesizers with 3D tactile controls.",
      tech: ["Vue", "Tone.js", "WebXR", "Three.js"],
      highlights: [
        "Binaural 3D spatial acoustics mapped to 6DoF camera position.",
        "Interactive analog modular patching using bezier spline curves.",
        "Zero-latency Web Audio worklet implementation.",
      ],
      liveUrl: "https://github.com",
      sourceUrl: "https://github.com",
    },
    {
      id: "proj-4",
      title: "Kinesis",
      category: "KINETIC TYPOGRAPHY",
      year: "2026",
      accent: "#34d399",
      gradient: "from-emerald-500/30 via-teal-950/40 to-zinc-950",
      description:
        "Experimental kinetic typography engine exploring fluid dynamics, magnetic cursor repulsion, and variable font morphing.",
      tech: ["Canvas API", "WebGL", "Physics Engine", "Math"],
      highlights: [
        "Navier-Stokes grid fluid simulation reacting to cursor velocity.",
        "Variable font glyph vertex displacement at 120Hz.",
        "Organic spring physics with dampening velocity kinematics.",
      ],
      liveUrl: "https://github.com",
      sourceUrl: "https://github.com",
    },
    {
      id: "proj-5",
      title: "Prism",
      category: "SPECTRAL RENDERER",
      year: "2025",
      accent: "#fbbf24",
      gradient: "from-amber-500/30 via-orange-950/40 to-zinc-950",
      description:
        "Real-time spectral refraction engine simulating thin-film optical interference, caustic projections, and iridescent lighting.",
      tech: ["WebGL2", "GLSL", "Three.js", "PostProcessing"],
      highlights: [
        "Wavelength-dependent Fresnel diffraction and dispersion.",
        "Multi-pass volumetric caustic map generation.",
        "Physical microfacet BRDF simulation with metallic sheen.",
      ],
      liveUrl: "https://github.com",
      sourceUrl: "https://github.com",
    },
  ],
};

export const THEMES = {
  obsidian: {
    name: "Royal Obsidian",
    bgHex: "#0c0f1d",
    fogHex: "#0c0f1d",
    keyLight: "#a78bfa",
    rimLight: "#f472b6",
    sparkle: "#c4b5fd",
    cssBg:
      "radial-gradient(circle at 50% 35%, #1b2141 0%, #0b0e1b 55%, #05060c 100%)",
  },
  amber: {
    name: "Amber Noir",
    bgHex: "#120d16",
    fogHex: "#120d16",
    keyLight: "#ff8a4c",
    rimLight: "#818cf8",
    sparkle: "#fbbf24",
    cssBg:
      "radial-gradient(circle at 50% 35%, #24172b 0%, #110b15 55%, #070509 100%)",
  },
};
