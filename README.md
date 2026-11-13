# 🌐 Dev-OS: High-Contrast Cinematic 3D Engine

Dev-OS is an Awwwards-inspired 3D WebGL portfolio and SaaS engine built with **React 18, Three.js, React Three Fiber, Drei, and Tailwind CSS**.

Directly inspired by **Arc Marumo**, this edition eliminates low-contrast pitfalls and delivers high-contrast physical monoliths, interactive cylindrical arch kinematics, mouse-orbit camera rigs, and a full SaaS studio configurator.

---

## ⚡ Core Architecture Innovations

### 1. High-Contrast Atmosphere & Studio Lighting
- **Atmospheric Canvas**: Replaced flat `#050505` with rich Midnight Obsidian & Warm Espresso radial gradients (`#120e16` to `#09070b`).
- **Volumetric Depth Fog**: Soft background fog (`#0d0a12`, near `12`, far `28`) allowing distant cards to gracefully recede.
- **3-Point Lighting Matrix**:
  - Warm Amber Key Light (`#ff7e47`, intensity `3.5`) at `[8, 6, 8]`
  - Electric Indigo Rim Light (`#6366f1`, intensity `4.0`) at `[-8, -5, 5]`
  - Overhead Champagne Spotlight (`#fde68a`, intensity `2.5`)
  - Ambient Fill (`#ffffff`, intensity `0.85`)
- **Reflective Studio Floor Plane**: Subtly catches bottom light bounce below the floating cards.
- **Tactile Floating Particles**: Ambient sparkles (`@react-three/drei`) for dimensional depth.

### 2. Cylindrical 3D Arch Trajectory & Camera Rig
- **Zero-Offset Centering**: Project 0 starts dead-center at `[0, 0, 0]` on initial load.
- **Curved Arch Kinematics**: As cards move away from the center (`dist = index - currentIndex`), they push back in Z (`z = -|dist| * 2.2`) and angle inward toward the viewer (`rotY = -dist * 0.28`).
- **Mouse-Orbit Camera Rig**: Cursor movement gently tilts the camera view (`pointer.x * 0.6`, `pointer.y * 0.4`) with smooth mathematical easing.
- **3D Card Hover Tilt**: Hovering any card dynamically tilts the monolith toward the pointer in 3D space with a `+0.6` Z-depth forward push.

### 3. Massive Physical Monoliths & Editorial Proportions
- **Physical Monolith**: `<boxGeometry args={[4.4, 6.0, 0.22]} />` with metallic bronze/champagne sleeve.
- **Glowing Backplate**: Custom glowing plane (`args={[4.6, 6.2]}`) highlighting the active center project.
- **Full Viewport Presence**: Scaled with `distanceFactor={5.2}` and `w-[380px] h-[520px]` so the active card commands 60%+ of vertical screen real estate.
- **Unique Per-Project Aromas**: Custom color accents & gradients (Amber, Rose, Emerald, Royal Indigo).
- **Direct Case Study Integration**: Clicking an active card or clicking `"Explore Case Study ↗"` launches an executive showcase modal.

### 4. Interactive HUD, Navigation & SaaS Studio
- **Working Top Navigation**:
  - `WORK`: Smoothly glides carousel back to Project 0.
  - `PROFILE`: Slides out the Bio, Technical Stack & Social Network Drawer.
  - `CONTACT`: Launches the Direct Connect Dispatch Modal.
  - `PALETTE`: Cycles live 3D theme atmospheres (`Amber Noir`, `Crimson Velvet`, `Emerald Matrix`, `Royal Obsidian`).
- **Bottom Carousel Controller**: `← PREV` / `NEXT →` arrows, progress indicator (`01 // 04`), and clickable navigation dots.
- **Scroll Isolation Lock**: Automatically suspends canvas scroll capture whenever any modal is open.
- **LocalStorage Persistence Engine**: Auto-syncs portfolio changes to `localStorage` (`devos_portfolio_v2`) with a one-click Reset to Defaults option.
- **1-Click Export**: Copy configuration bundle to clipboard with instant feedback toast and download `.json` files.

---

## 🛠 Tech Stack

- **Framework**: React 18 + Vite
- **3D & Canvas**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Post-Processing**: `@react-three/postprocessing` (Crisp optical Vignette & ultra-fine Film Grain)
- **Mathematical Physics**: `maath/easing`
- **Animations**: `framer-motion`
- **Icons**: `lucide-react`
- **Styling**: Tailwind CSS, Playfair Display & Inter Typography

---

## 🚀 Quick Start

```bash
# Clone repository
git clone <your-repo>
cd devfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Compile production bundle
npm run build
```

---

## 🕹 Usage Guide

1. **Navigate the 3D Matrix**: Use your mouse wheel, drag horizontally, click side cards, or use the bottom `← PREV` / `NEXT →` HUD buttons.
2. **Inspect Case Studies**: Click on any active center card or the **Explore Case Study** button to view architecture and live links.
3. **Open SaaS Studio**: Click the **Edit Portfolio** button in the bottom controller HUD to customize projects, themes, identity, and download the JSON bundle.
4. **View Profile**: Click **Profile** in the top navigation bar to open the slide-over drawer.
5. **Cycle Theme Aromas**: Click the palette icon in the top header to dynamically shift the 3D lighting atmosphere between Amber, Crimson, Emerald, and Obsidian.
