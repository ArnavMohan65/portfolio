# 🎭 Arnav Mohan — Persona 5 Themed Software Engineering Portfolio

> **"I BUILD SYSTEMS THAT SCALE."**  
> A high-voltage, Persona 5-inspired portfolio showcasing backend engineering, distributed cloud systems, and AI/ML architectures.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.2-646cff?logo=vite)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.2-f08?logo=framer)](https://www.framer.com/motion/)

---

## ⚡ Overview

This web application is the interactive developer portfolio of **Arnav Mohan** — Computer Science Engineer specializing in:
- **Backend Systems**: High-throughput REST & WebSocket architectures, microservices, stateless JWT auth, distributed pipelines.
- **Cloud Infrastructure**: Google Cloud Platform (Cloud Run, Pub/Sub, Cloud Functions, BigQuery), AWS (S3, EC2, Lambda).
- **AI/ML & Vision**: Real-time multi-modal computer vision (YOLO, OpenCV, CNNs, Tesseract OCR).

Designed with the iconic visual identity of **Persona 5**:
- Dynamic comic-book angular panel cuts & jagged badges.
- Halftone pattern overlays and high-contrast red (`#E60012`), obsidian black (`#070709`), and neon cyan accents.
- Retro UI SFX (synthesized audio clicks, confirms, and switches via Web Audio API).
- Calling Card contact modal & interactive Dossier.

---

## 🛠️ Tech Stack

- **Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, PostCSS, Custom Persona 5 tokens & keyframes
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Graphics & 3D**: Three.js, React Three Fiber, React Three Drei
- **Sound**: Native Web Audio API sound generator (no external audio assets needed)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ArnavMohan65/arnav-p5-portfolio.git
   cd arnav-p5-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR) |
| `npm run build` | Type-checks with `tsc` and compiles optimized production assets to `dist/` |
| `npm run preview` | Locally serves the production build for testing |

---

## 📁 Project Structure

```text
arnav-p5-portfolio/
├── public/                  # Static assets (Favicon, Resume PDF)
├── src/
│   ├── components/          # Reusable UI widgets & P5 thematic components
│   ├── data/                # Portfolio content, projects, experience, metrics
│   ├── types/               # TypeScript interfaces & domain models
│   ├── utils/               # Web Audio SFX synth & utility helpers
│   ├── App.tsx              # Main application router and view orchestrator
│   ├── main.tsx             # Application bootstrap
│   └── index.css            # P5 styling tokens, typography, halftone shaders
├── index.html               # Main HTML entry with Google Fonts & meta tags
├── tailwind.config.js       # Custom palette, shadows & skew utilities
├── tsconfig.json            # Strict TypeScript configuration
└── vite.config.ts           # Vite build configuration
```

---

## 👤 Author

**Arnav Mohan**
- **Website/Portfolio**: [Persona 5 Portfolio](https://github.com/ArnavMohan65)
- **GitHub**: [@ArnavMohan65](https://github.com/ArnavMohan65)
- **LinkedIn**: [/in/arnav-mohan](https://www.linkedin.com/in/arnav-mohan)
- **Email**: [arnavmohan65@gmail.com](mailto:arnavmohan65@gmail.com)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
