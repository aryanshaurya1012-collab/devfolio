# 🌐 Dev-OS: The Web3 Portfolio Engine

Dev-OS is a high-performance, Awwwards-inspired 3D portfolio generator built for Web3 engineers, designers, and full-stack developers. 

It transforms static JSON data into a hyper-immersive, retro-futuristic CRT WebGL experience using React Three Fiber, Framer Motion, and Tailwind CSS.

## 🚀 Features
- **Cinematic WebGL Engine**: Hardware-accelerated 3D carousel with fluid `maath` physics dampening.
- **Glassmorphic UI**: Physical glass materials combined with razor-sharp HTML projected overlays.
- **Real-Time Command Center**: A sleek, bottom-docked editor to inject your identity, social links, and projects on the fly.
- **Zero-Build Export**: Design your portfolio in the browser, copy the generated JSON matrix, and deploy instantly.
- **CRT Post-Processing**: Professional-grade chromatic aberration, scanlines, and film grain via `@react-three/postprocessing`.

## 🛠 Tech Stack
- **Framework**: React 18 + Vite
- **3D Engine**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Physics**: `maath` (mathematical easing)
- **Styling**: Tailwind CSS + CSS Variables
- **Icons**: Lucide React

## 📦 Quick Start
```bash
git clone <your-repo>
cd devfolio
npm install --legacy-peer-deps
npm run dev
```
*Note: We use `--legacy-peer-deps` to ensure maximum stability between Three.js v8 and React 18.*

## 🕹 How to Use the SaaS Builder
1. Launch the app locally.
2. Click the `[ SYSTEM.OVERRIDE // EDIT_PORTFOLIO ]` pill at the bottom of the screen.
3. Inject your personal data into the Command Center.
4. Watch the 3D scene update in real-time.
5. Click **Export Bundle** to save your `portfolio.json` state.
