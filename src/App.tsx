import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowLeft,
  Download,
  Copy,
  Check,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
} from 'lucide-react';
import { Navbar } from './components/layout/Navbar';
import { IntroLoader } from './components/layout/IntroLoader';
import { PageTransition } from './components/layout/PageTransition';
import { CyberArtifactScene } from './components/three/CyberArtifactScene';
import { ArchitectureDiagram } from './components/diagrams/ArchitectureDiagram';
import {
  PROFILE_DATA,
  PROJECTS_DATA,
  EXPERIENCE_DATA,
  SKILL_DOMAINS,
} from './data/portfolioData';
import { ProjectCategory } from './types/portfolio';
import { soundFX } from './utils/sound';

// Shared Persona 5 Section Heading with Outlined Watermark & Slanted Banner
const SectionHeading: React.FC<{
  code: string;
  watermark: string;
  title: string;
  subtitle: string;
}> = ({ code, watermark, title, subtitle }) => (
  <div className="mb-12 sm:mb-16 relative overflow-hidden pt-4">
    {/* Giant Outlined Background Comic Watermark */}
    <span
      className="font-display text-7xl sm:text-9xl uppercase text-stroke-white select-none pointer-events-none absolute -top-2 right-0 opacity-30 leading-none hidden sm:block"
      aria-hidden="true"
    >
      {watermark}
    </span>

    <div className="relative z-10">
      <div className="inline-block bg-p5-red text-white font-mono text-xs font-bold uppercase tracking-widest px-3.5 py-1 transform -skew-x-12 mb-3 shadow-p5-white border border-white">
        <span className="inline-block transform skew-x-12">// {code}</span>
      </div>
      <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-wide text-white leading-none">
        {title}
      </h1>
      <p className="font-sans text-base sm:text-lg text-p5-muted mt-3 max-w-2xl border-l-4 border-p5-red pl-4">
        {subtitle}
      </p>
    </div>
  </div>
);

// 1. HOME PAGE
const HomePage: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
  const featuredProjects = PROJECTS_DATA.filter((p) => p.featured);

  return (
    <div className="space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 lg:pt-16 overflow-hidden">
        {/* Decorative Diagonal Background Slash */}
        <div
          className="absolute -top-24 -right-24 w-[520px] h-[520px] bg-diagonal-stripes transform rotate-12 pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Asymmetrical Column: Editorial Typography & CTAs */}
            <div className="lg:col-span-7 space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 bg-p5-panel border-l-4 border-p5-red px-3.5 py-1.5 shadow-p5-dark">
                <span className="w-2 h-2 rounded-full bg-p5-cyan animate-pulse" />
                <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-p5-white">
                  {PROFILE_DATA.introLabel}
                </span>
              </div>

              <div className="relative">
                <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.94] text-white">
                  I BUILD{' '}
                  <span className="bg-p5-red text-white px-3.5 py-0.5 inline-block transform -skew-x-6 shadow-p5-white border-2 border-white">
                    SYSTEMS
                  </span>{' '}
                  THAT SCALE.
                </h1>
              </div>

              <h2 className="font-mono text-sm sm:text-base text-p5-cyan uppercase tracking-wider font-semibold">
                {PROFILE_DATA.supportingHeadline}
              </h2>

              <p className="font-sans text-base sm:text-lg text-p5-muted leading-relaxed max-w-2xl">
                {PROFILE_DATA.heroDescription}
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/projects"
                  onClick={() => soundFX.playSelect()}
                  className="px-6 py-3.5 bg-p5-red hover:bg-white text-white hover:text-p5-black font-display text-lg tracking-wider uppercase transition-all transform -skew-x-12 shadow-p5-white border border-white flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-p5-cyan"
                >
                  <span className="transform skew-x-12 flex items-center gap-2">
                    EXPLORE MY WORK <ArrowUpRight className="w-5 h-5" />
                  </span>
                </Link>

                <Link
                  to="/resume"
                  onClick={() => soundFX.playSelect()}
                  className="px-6 py-3.5 bg-p5-panel hover:bg-p5-red text-white font-display text-lg tracking-wider uppercase border-2 border-white/40 hover:border-white transition-all transform -skew-x-12 focus:outline-none focus:ring-2 focus:ring-p5-cyan"
                >
                  <span className="transform skew-x-12">VIEW RESUME</span>
                </Link>

                <Link
                  to="/contact"
                  onClick={() => soundFX.playSelect()}
                  className="px-5 py-3.5 bg-transparent hover:bg-white/10 text-p5-white font-mono text-xs sm:text-sm uppercase tracking-widest border border-white/25 transition-colors focus:outline-none focus:ring-2 focus:ring-p5-cyan"
                >
                  GET IN TOUCH
                </Link>
              </div>

              {/* Verified External Profiles */}
              <div className="pt-4 flex flex-wrap items-center gap-6 border-t border-white/10 text-xs font-mono text-p5-muted">
                <a
                  href={PROFILE_DATA.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-p5-red transition-colors"
                >
                  <Github className="w-4 h-4 text-p5-red" />
                  GITHUB // ArnavMohan65
                </a>
                <a
                  href={PROFILE_DATA.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-p5-cyan transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-p5-cyan" />
                  LINKEDIN // ARNAV MOHAN
                </a>
              </div>
            </div>

            {/* Right Column: Single High-Impact Three.js Centerpiece + Technical HUD */}
            <div className="lg:col-span-5 relative">
              <div className="bg-p5-panel/90 border-2 border-white/20 p-3 relative shadow-p5-red bg-halftone clip-p5-card">
                <div className="flex items-center justify-between font-mono text-[11px] text-p5-muted border-b border-white/10 pb-2 mb-2">
                  <span>ARTIFACT // SYS-CORE-01</span>
                  <span className="text-p5-cyan">WEBGL TELEMETRY ACTIVE</span>
                </div>
                <CyberArtifactScene reducedMotion={reducedMotion} />
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 font-mono text-[11px]">
                  <div className="bg-black/90 p-2 border-l-2 border-p5-red">
                    <span className="text-p5-muted block">BACKEND</span>
                    <span className="text-white font-bold">NODE / PYTHON</span>
                  </div>
                  <div className="bg-black/90 p-2 border-l-2 border-p5-cyan">
                    <span className="text-p5-muted block">CLOUD</span>
                    <span className="text-white font-bold">GCP / AWS</span>
                  </div>
                  <div className="bg-black/90 p-2 border-l-2 border-white">
                    <span className="text-p5-muted block">VISION AI</span>
                    <span className="text-white font-bold">CNN / YOLO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED ENGINEERING CASE STUDIES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-p5-red block mb-2">
              // INTERVIEW-READY ARCHITECTURAL CASE STUDIES
            </span>
            <h2 className="font-display text-4xl sm:text-5xl uppercase tracking-wide text-white">
              FEATURED SYSTEMS ARCHIVE
            </h2>
          </div>
          <Link
            to="/projects"
            className="font-mono text-xs uppercase tracking-widest text-p5-cyan hover:text-white flex items-center gap-1.5 border-b border-p5-cyan pb-1 self-start sm:self-auto"
          >
            OPEN FULL PROJECT INDEX <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-10">
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className="bg-p5-panel border-2 border-white/20 hover:border-p5-red transition-all p-6 sm:p-8 shadow-p5-red relative group clip-p5-card"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-display text-3xl sm:text-4xl text-p5-red bg-black px-3 py-0.5 border border-p5-red transform -skew-x-12">
                      #{project.number}
                    </span>
                    {project.categories.map((cat) => (
                      <span
                        key={cat}
                        className="font-mono text-xs uppercase px-2.5 py-1 bg-black border border-white/20 text-p5-white clip-p5-tag"
                      >
                        {cat}
                      </span>
                    ))}
                    {project.achievementBadge && (
                      <span className="font-mono text-xs uppercase px-2.5 py-1 bg-p5-red text-white font-bold">
                        ★ {project.achievementBadge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-white group-hover:text-p5-red transition-colors">
                    {project.name} —{' '}
                    <span className="text-p5-muted text-xl sm:text-2xl font-sans font-semibold normal-case">
                      {project.tagline}
                    </span>
                  </h3>

                  <p className="font-sans text-p5-muted text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>

                  {/* Concrete Architectural Highlight */}
                  <div className="bg-black/70 border-l-4 border-p5-cyan p-3 font-mono text-xs text-p5-white">
                    <span className="text-p5-cyan font-bold">ARCHITECTURE: </span>
                    {project.architectureSummary}
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-6">
                  <div className="grid grid-cols-2 gap-3">
                    {project.metrics.slice(0, 2).map((metric) => (
                      <div key={metric.label} className="bg-black p-3 border border-white/15">
                        <div className="font-display text-2xl sm:text-3xl text-p5-red">
                          {metric.value}
                        </div>
                        <div className="font-mono text-[11px] text-p5-muted uppercase mt-0.5">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={`/projects/${project.slug}`}
                    onClick={() => soundFX.playSelect()}
                    className="w-full py-3 px-4 bg-p5-red hover:bg-white text-white hover:text-black font-display text-base tracking-wider uppercase text-center transition-colors flex items-center justify-center gap-2 shadow-p5-white"
                  >
                    INSPECT ARCHITECTURE & CODE <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

// 2. PROJECTS INDEX PAGE
const ProjectsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories: ('ALL' | ProjectCategory)[] = [
    'ALL',
    'Backend Engineering',
    'Full-Stack Development',
    'Cloud & Infrastructure',
    'AI/ML Engineering',
    'Real-Time Systems',
  ];

  const filteredProjects =
    selectedCategory === 'ALL'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) =>
          p.categories.includes(selectedCategory as ProjectCategory)
        );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <SectionHeading
        code="ARCHIVE // 02"
        watermark="SYSTEMS"
        title="ENGINEERING CASE STUDIES"
        subtitle="Deep-dive technical breakdowns covering system architecture, API/WebSocket contracts, computer vision pipelines, and resume-verified outcomes."
      />

      {/* Category Filter Bar */}
      <div
        className="flex flex-wrap gap-2 pb-4 border-b border-white/15"
        role="tablist"
        aria-label="Filter projects by engineering domain"
      >
        {categories.map((category) => {
          const active = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => {
                soundFX.playSelect();
                setSelectedCategory(category);
              }}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all transform -skew-x-12 ${
                active
                  ? 'bg-p5-red text-white shadow-p5-white font-bold border border-white'
                  : 'bg-p5-panel text-p5-muted hover:text-white border border-white/15'
              }`}
            >
              <span className="inline-block transform skew-x-12">{category}</span>
            </button>
          );
        })}
      </div>

      {/* Editorial Project Cards + Interactive Architecture Previews */}
      <div className="space-y-16">
        {filteredProjects.map((project) => (
          <section
            key={project.id}
            className="bg-p5-panel border-2 border-white/20 p-6 sm:p-10 shadow-p5-red space-y-8 clip-p5-panel"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="font-display text-4xl sm:text-5xl text-p5-red">
                    #{project.number}
                  </span>
                  {project.categories.map((cat) => (
                    <span
                      key={cat}
                      className="font-mono text-xs uppercase px-2.5 py-1 bg-black border border-white/20 text-white clip-p5-tag"
                    >
                      {cat}
                    </span>
                  ))}
                  {project.achievementBadge && (
                    <span className="font-mono text-xs uppercase px-3 py-1 bg-p5-red text-white font-bold">
                      ★ {project.achievementBadge}
                    </span>
                  )}
                </div>
                <h2 className="font-display text-3xl sm:text-5xl uppercase text-white tracking-wide">
                  {project.name}
                </h2>
                <p className="font-mono text-sm text-p5-cyan mt-1">{project.tagline}</p>
              </div>

              <Link
                to={`/projects/${project.slug}`}
                onClick={() => soundFX.playSelect()}
                className="px-5 py-3 bg-p5-red hover:bg-white text-white hover:text-black font-display text-base tracking-wider uppercase transition-colors flex items-center gap-2 shadow-p5-white"
              >
                OPEN FULL CASE STUDY <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="font-mono text-xs uppercase tracking-widest text-p5-red">
                  // PROBLEM & ARCHITECTURAL OVERVIEW
                </h3>
                <p className="font-sans text-p5-white text-base leading-relaxed">
                  {project.description}
                </p>
                <p className="font-sans text-p5-muted text-sm leading-relaxed">
                  {project.problemStatement}
                </p>

                <div className="pt-2">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-p5-cyan mb-2">
                    KEY ENGINEERING CONTRIBUTIONS
                  </h4>
                  <ul className="space-y-2">
                    {project.contributions.map((item, i) => (
                      <li key={i} className="font-sans text-sm text-p5-muted flex items-start gap-2">
                        <span className="text-p5-red font-bold">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <h3 className="font-mono text-xs uppercase tracking-widest text-p5-red">
                  // REPORTED RESULTS & TELEMETRY
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="bg-black p-4 border-l-4 border-p5-red">
                      <div className="font-display text-3xl text-white">{m.value}</div>
                      <div className="font-mono text-xs text-p5-cyan uppercase mt-1">{m.label}</div>
                      <p className="font-sans text-xs text-p5-muted mt-1">{m.context}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive SVG Architecture Pipeline */}
            <ArchitectureDiagram
              title={`${project.name} System Pipeline`}
              summary={project.architectureSummary}
              nodes={project.architectureNodes}
            />
          </section>
        ))}
      </div>
    </div>
  );
};

// 3. PROJECT DETAIL PAGE (Substantive Reusable Template with Code Blueprint)
const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = PROJECTS_DATA.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <h1 className="font-display text-5xl text-p5-red uppercase">PROJECT DOSSIER NOT FOUND</h1>
        <p className="font-sans text-p5-muted">
          The requested project slug does not match an entry in the archive.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 bg-p5-red text-white font-display uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> RETURN TO PROJECT INDEX
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <button
        type="button"
        onClick={() => navigate('/projects')}
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-p5-cyan hover:text-white border border-white/20 px-3.5 py-2 bg-p5-panel"
      >
        <ArrowLeft className="w-4 h-4" /> BACK TO PROJECTS INDEX
      </button>

      {/* Header Banner */}
      <header className="bg-p5-panel border-2 border-p5-red p-6 sm:p-10 shadow-p5-white space-y-4 clip-p5-card">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-display text-4xl text-p5-red">CASE #{project.number}</span>
          {project.categories.map((c) => (
            <span
              key={c}
              className="font-mono text-xs uppercase px-2.5 py-1 bg-black border border-white/20 text-white"
            >
              {c}
            </span>
          ))}
          {project.achievementBadge && (
            <span className="font-mono text-xs uppercase px-3 py-1 bg-p5-red text-white font-bold">
              ★ {project.achievementBadge}
            </span>
          )}
        </div>
        <h1 className="font-display text-4xl sm:text-6xl uppercase text-white tracking-wide">
          {project.name}
        </h1>
        <p className="font-mono text-base sm:text-lg text-p5-cyan">{project.tagline}</p>
        <p className="font-sans text-base text-p5-muted max-w-3xl leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
          {project.techStack.map((t) => (
            <span
              key={t}
              className="font-mono text-xs px-3 py-1 bg-black border-l-2 border-p5-red text-white"
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      {/* Problem Statement & Design Constraints */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-p5-panel border border-white/20 p-6 space-y-3">
          <h2 className="font-display text-2xl uppercase text-p5-red tracking-wide">
            01 // PROBLEM STATEMENT
          </h2>
          <p className="font-sans text-sm sm:text-base text-p5-white leading-relaxed">
            {project.problemStatement}
          </p>
        </section>

        <section className="bg-p5-panel border border-white/20 p-6 space-y-3">
          <h2 className="font-display text-2xl uppercase text-p5-cyan tracking-wide">
            02 // GOALS & DESIGN CONSTRAINTS
          </h2>
          <ul className="space-y-2">
            {project.goalsAndConstraints.map((g, i) => (
              <li key={i} className="font-sans text-sm text-p5-muted flex items-start gap-2">
                <span className="text-p5-cyan font-bold">▸</span>
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* High-Level Interactive Architecture Diagram */}
      <ArchitectureDiagram
        title={`${project.name} — Interactive System Pipeline`}
        summary={project.architectureSummary}
        nodes={project.architectureNodes}
      />

      {/* Code & Architectural Blueprint Artifact */}
      <section className="bg-p5-panel border-2 border-white/20 p-6 sm:p-8 space-y-4 shadow-p5-dark">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-p5-red" />
            <h2 className="font-display text-2xl uppercase text-white tracking-wide">
              03 // IMPLEMENTATION BLUEPRINT — {project.technicalArtifact.title}
            </h2>
          </div>
          <span className="font-mono text-xs uppercase px-2.5 py-1 bg-black border border-p5-cyan text-p5-cyan">
            {project.technicalArtifact.language}
          </span>
        </div>
        <p className="font-sans text-sm text-p5-muted">
          {project.technicalArtifact.explanation}
        </p>
        <pre className="bg-black border-l-4 border-p5-red p-4 overflow-x-auto font-mono text-xs sm:text-sm text-p5-white leading-relaxed">
          <code>{project.technicalArtifact.code}</code>
        </pre>
      </section>

      {/* Contributions, Implementation Details & Trade-offs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="bg-p5-panel border border-white/20 p-6 space-y-4">
          <h2 className="font-display text-2xl uppercase text-white tracking-wide">
            04 // MY CONTRIBUTIONS
          </h2>
          <ul className="space-y-2.5">
            {project.contributions.map((c, i) => (
              <li key={i} className="font-sans text-sm text-p5-muted flex items-start gap-2">
                <span className="text-p5-red font-bold">▸</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-p5-panel border border-white/20 p-6 space-y-4">
          <h2 className="font-display text-2xl uppercase text-white tracking-wide">
            05 // KEY IMPLEMENTATION DETAILS
          </h2>
          <ul className="space-y-2.5">
            {project.implementationDetails.map((d, i) => (
              <li key={i} className="font-sans text-sm text-p5-muted flex items-start gap-2">
                <span className="text-p5-cyan font-bold">▸</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-p5-panel border border-white/20 p-6 space-y-4">
          <h2 className="font-display text-2xl uppercase text-white tracking-wide">
            06 // CHALLENGES & TRADE-OFFS
          </h2>
          <ul className="space-y-2.5">
            {project.challengesAndTradeoffs.map((t, i) => (
              <li key={i} className="font-sans text-sm text-p5-muted flex items-start gap-2">
                <span className="text-white font-bold">▸</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Results & Resume-Reported Metrics */}
      <section className="bg-p5-panel border-2 border-white/20 p-6 sm:p-8 space-y-4">
        <h2 className="font-display text-2xl uppercase text-p5-red tracking-wide">
          07 // RESUME-REPORTED RESULTS & METRICS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="bg-black p-4 border-l-4 border-p5-red">
              <div className="font-display text-3xl text-white">{metric.value}</div>
              <div className="font-mono text-xs text-p5-cyan uppercase mt-1">{metric.label}</div>
              <p className="font-sans text-xs text-p5-muted mt-1">{metric.context}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Source Links */}
      {project.repoUrl && (
        <div className="flex flex-wrap items-center justify-between gap-4 bg-black p-6 border border-white/20">
          <div>
            <span className="font-mono text-xs text-p5-muted block">SOURCE CODE & REPOSITORY</span>
            <span className="font-sans text-sm text-white">
              Inspect additional repositories and source contributions on GitHub.
            </span>
          </div>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-p5-red hover:bg-white text-white hover:text-black font-display uppercase tracking-wider flex items-center gap-2 transition-colors"
          >
            <Github className="w-4 h-4" /> VIEW ON GITHUB <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}
    </article>
  );
};

// 4. EXPERIENCE PAGE (Includes Interactive Deloitte GCP & Observability Pipeline)
const ExperiencePage: React.FC = () => (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
    <SectionHeading
      code="CHRONOLOGY // 03"
      watermark="CAREER"
      title="PROFESSIONAL EXPERIENCE"
      subtitle="Enterprise software engineering and cloud analytics experience across real-time Python/GCP data pipelines, distributed tracing, and cloud workflow automation."
    />

    <div className="relative border-l-4 border-p5-red ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-16">
      {EXPERIENCE_DATA.map((exp, idx) => (
        <article
          key={exp.id}
          className="bg-p5-panel border-2 border-white/20 p-6 sm:p-8 shadow-p5-red relative space-y-8 clip-p5-card"
        >
          {/* Timeline Node Badge */}
          <div className="absolute -left-[38px] sm:-left-[54px] top-6 w-7 h-7 bg-p5-red border-2 border-white transform rotate-45 flex items-center justify-center">
            <span className="transform -rotate-45 font-mono text-[10px] font-bold text-white">
              0{idx + 1}
            </span>
          </div>

          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-p5-cyan block">
                {exp.period} // {exp.location} ({exp.arrangement})
              </span>
              <h2 className="font-display text-3xl sm:text-4xl uppercase text-white mt-1">
                {exp.role} — <span className="text-p5-red">{exp.company}</span>
              </h2>
              <p className="font-mono text-xs text-p5-muted mt-1">
                DOMAIN FOCUS: {exp.domainFocus}
              </p>
            </div>
          </div>

          <ul className="space-y-3">
            {exp.responsibilities.map((resp, i) => (
              <li
                key={i}
                className="font-sans text-sm sm:text-base text-p5-white flex items-start gap-3"
              >
                <span className="text-p5-red font-bold mt-0.5">▸</span>
                <span>{resp}</span>
              </li>
            ))}
          </ul>

          {/* Interactive Architecture & Reliability Blueprint per Role */}
          <ArchitectureDiagram
            title={`${exp.company} — Engineering & Observability Workflow`}
            summary={exp.domainFocus}
            nodes={exp.architectureNodes}
          />

          {/* Deep-Dive Callout Box */}
          <div className="bg-black/80 border-l-4 border-p5-red p-5 space-y-2">
            <h3 className="font-mono text-xs uppercase tracking-widest text-p5-cyan font-bold">
              // {exp.engineeringDeepDive.title}
            </h3>
            <ul className="space-y-1.5">
              {exp.engineeringDeepDive.points.map((pt, i) => (
                <li key={i} className="font-sans text-xs sm:text-sm text-p5-muted">
                  • {pt}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs px-3 py-1 bg-black border border-white/20 text-p5-white clip-p5-tag"
              >
                {tech}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  </div>
);

// 5. TECH STACK / CAPABILITY MAP PAGE
const SkillsPage: React.FC = () => {
  const [activeDomainId, setActiveDomainId] = useState<string>(SKILL_DOMAINS[0].id);
  const activeDomain =
    SKILL_DOMAINS.find((d) => d.id === activeDomainId) || SKILL_DOMAINS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <SectionHeading
        code="CAPABILITY MAP // 04"
        watermark="ARSENAL"
        title="TECHNICAL SKILLS & ARCHITECTURAL DOMAINS"
        subtitle="Organized by functional engineering domains rather than arbitrary percentage bars. Select any domain node to highlight connected technical areas."
      />

      {/* Interactive Domain Connection Highlighting Banner */}
      <div className="bg-p5-panel border-2 border-p5-red p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-p5-white">
        <div>
          <span className="font-mono text-xs text-p5-cyan uppercase tracking-widest block">
            ACTIVE DOMAIN FOCUS // {activeDomain.code}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl uppercase text-white">
            {activeDomain.title}
          </h2>
          <p className="font-sans text-sm text-p5-muted mt-1">{activeDomain.description}</p>
        </div>
        <div className="font-mono text-xs text-p5-white bg-black px-4 py-2.5 border border-white/20 shrink-0">
          CONNECTED DOMAINS: {activeDomain.connectedDomains.length} LINKED NODES
        </div>
      </div>

      {/* Capability Domain Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILL_DOMAINS.map((domain) => {
          const isSelected = domain.id === activeDomainId;
          const isConnected = activeDomain.connectedDomains.includes(domain.id);

          return (
            <div
              key={domain.id}
              onMouseEnter={() => setActiveDomainId(domain.id)}
              onClick={() => setActiveDomainId(domain.id)}
              className={`p-6 bg-p5-panel border-2 transition-all cursor-pointer clip-p5-card ${
                isSelected
                  ? 'border-p5-red shadow-p5-red -translate-y-1'
                  : isConnected
                  ? 'border-p5-cyan/80 shadow-p5-cyan'
                  : 'border-white/15 opacity-85 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-p5-red font-bold">{domain.code}</span>
                {isSelected && (
                  <span className="font-mono text-[10px] px-2 py-0.5 bg-p5-red text-white uppercase">
                    PRIMARY FOCUS
                  </span>
                )}
                {!isSelected && isConnected && (
                  <span className="font-mono text-[10px] px-2 py-0.5 bg-black border border-p5-cyan text-p5-cyan uppercase">
                    LINKED DOMAIN
                  </span>
                )}
              </div>

              <h3 className="font-display text-2xl uppercase text-white tracking-wide mb-2">
                {domain.title}
              </h3>
              <p className="font-sans text-xs text-p5-muted mb-4 leading-relaxed">
                {domain.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {domain.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs px-2.5 py-1 bg-black border border-white/20 text-p5-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 6. ABOUT PAGE
const AboutPage: React.FC = () => (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
    <SectionHeading
      code="IDENTITY // 05"
      watermark="PROFILE"
      title="ABOUT & ENGINEERING PHILOSOPHY"
      subtitle="Academic foundation, architectural focus areas, and core principles guiding how I build and operate software systems."
    />

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Professional Narrative */}
      <div className="lg:col-span-7 bg-p5-panel border-2 border-white/20 p-6 sm:p-8 space-y-4 shadow-p5-dark clip-p5-card">
        <span className="font-mono text-xs uppercase tracking-widest text-p5-red block">
          // PROFESSIONAL SUMMARY
        </span>
        <h2 className="font-display text-3xl uppercase text-white">
          SYSTEMS-FIRST SOFTWARE ENGINEERING
        </h2>
        {PROFILE_DATA.professionalSummary.map((para, idx) => (
          <p key={idx} className="font-sans text-base text-p5-muted leading-relaxed">
            {para}
          </p>
        ))}
      </div>

      {/* Education Card */}
      <div className="lg:col-span-5 bg-p5-panel border-2 border-p5-red p-6 sm:p-8 space-y-4 shadow-p5-white clip-p5-card">
        <span className="font-mono text-xs uppercase tracking-widest text-p5-cyan block">
          // ACADEMIC RECORD
        </span>
        <h2 className="font-display text-3xl uppercase text-white">
          {PROFILE_DATA.education.institution}
        </h2>
        <p className="font-sans text-base font-semibold text-p5-white">
          {PROFILE_DATA.education.degree}
        </p>
        <p className="font-mono text-xs text-p5-muted">
          {PROFILE_DATA.education.location} · {PROFILE_DATA.education.dates}
        </p>

        <div className="bg-black p-4 border-l-4 border-p5-cyan mt-4">
          <div className="font-display text-4xl text-white">
            CGPA: {PROFILE_DATA.education.cgpa}
          </div>
          <div className="font-mono text-xs text-p5-muted uppercase mt-1">
            {PROFILE_DATA.education.cgpaNote}
          </div>
        </div>
      </div>
    </div>

    {/* Engineering Philosophy Principles */}
    <section className="space-y-6">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-p5-red block">
          // OPERATING DOCTRINE
        </span>
        <h2 className="font-display text-3xl sm:text-4xl uppercase text-white mt-1">
          ENGINEERING PRINCIPLES
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROFILE_DATA.engineeringPhilosophy.map((item) => (
          <div
            key={item.code}
            className="bg-p5-panel border-2 border-white/15 hover:border-p5-red p-6 transition-colors clip-p5-card"
          >
            <span className="font-mono text-xs text-p5-red font-bold block mb-2">
              {item.code}
            </span>
            <h3 className="font-display text-2xl uppercase text-white tracking-wide mb-2">
              {item.title}
            </h3>
            <p className="font-sans text-sm text-p5-muted leading-relaxed">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

// 7. RESUME DOSSIER PAGE
const ResumePage: React.FC = () => (
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-p5-red pb-6">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-p5-red block">
          // CLASSIFIED ENGINEERING DOSSIER
        </span>
        <h1 className="font-display text-4xl sm:text-6xl uppercase text-white">
          CURRICULUM VITAE
        </h1>
      </div>

      <div className="flex flex-wrap gap-3 no-print">
        <a
          href={PROFILE_DATA.resumePdfPath}
          download="Arnav_Mohan_Resume.pdf"
          onClick={() => soundFX.playSelect()}
          className="px-6 py-3 bg-p5-red hover:bg-white text-white hover:text-black font-display text-lg uppercase tracking-wider flex items-center gap-2 shadow-p5-white transition-colors"
        >
          <Download className="w-5 h-5" /> DOWNLOAD RESUME PDF
        </a>
        <button
          type="button"
          onClick={() => window.print()}
          className="px-4 py-3 bg-p5-panel border border-white/30 hover:border-white font-mono text-xs uppercase tracking-wider text-white"
        >
          PRINT READABLE VIEW
        </button>
      </div>
    </div>

    {/* Printable Structured Resume Sheet */}
    <div className="bg-p5-panel border-2 border-white/20 p-6 sm:p-10 space-y-8 shadow-p5-dark">
      {/* Header */}
      <div className="border-b border-white/15 pb-6 flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="font-display text-4xl uppercase text-white">{PROFILE_DATA.name}</h2>
          <p className="font-mono text-sm text-p5-cyan mt-1">
            Software Engineer — Backend, Cloud Infrastructure, Full-Stack & AI/ML
          </p>
        </div>
        <div className="font-mono text-xs text-p5-muted space-y-1 sm:text-right">
          <div>{PROFILE_DATA.location}</div>
          <div>{PROFILE_DATA.email}</div>
          <div>github.com/ArnavMohan65</div>
        </div>
      </div>

      {/* Education */}
      <section className="space-y-2">
        <h3 className="font-mono text-xs uppercase tracking-widest text-p5-red font-bold">
          // EDUCATION
        </h3>
        <div className="flex flex-wrap justify-between items-baseline">
          <div className="font-sans font-bold text-lg text-white">
            {PROFILE_DATA.education.institution} — {PROFILE_DATA.education.degree}
          </div>
          <div className="font-mono text-xs text-p5-muted">{PROFILE_DATA.education.dates}</div>
        </div>
        <p className="font-mono text-xs text-p5-cyan">
          CGPA: {PROFILE_DATA.education.cgpa} ({PROFILE_DATA.education.cgpaNote}) ·{' '}
          {PROFILE_DATA.education.location}
        </p>
      </section>

      {/* Experience */}
      <section className="space-y-4">
        <h3 className="font-mono text-xs uppercase tracking-widest text-p5-red font-bold">
          // EXPERIENCE
        </h3>
        {EXPERIENCE_DATA.map((exp) => (
          <div key={exp.id} className="space-y-1.5 border-l-2 border-p5-red pl-4">
            <div className="flex flex-wrap justify-between items-baseline">
              <h4 className="font-sans font-bold text-base text-white">
                {exp.role} · {exp.company}
              </h4>
              <span className="font-mono text-xs text-p5-muted">
                {exp.period} | {exp.location} ({exp.arrangement})
              </span>
            </div>
            <ul className="space-y-1">
              {exp.responsibilities.map((r, i) => (
                <li key={i} className="font-sans text-sm text-p5-muted">
                  • {r}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Projects */}
      <section className="space-y-4">
        <h3 className="font-mono text-xs uppercase tracking-widest text-p5-red font-bold">
          // FEATURED PROJECTS
        </h3>
        {PROJECTS_DATA.map((proj) => (
          <div key={proj.id} className="space-y-1.5 border-l-2 border-white/30 pl-4">
            <div className="flex flex-wrap justify-between items-baseline gap-2">
              <h4 className="font-sans font-bold text-base text-white">
                {proj.name} — <span className="text-p5-cyan font-normal">{proj.tagline}</span>
              </h4>
              <span className="font-mono text-xs text-p5-muted">
                {proj.techStack.join(' · ')}
              </span>
            </div>
            <p className="font-sans text-sm text-p5-muted">{proj.description}</p>
          </div>
        ))}
      </section>

      {/* Condensed Skills Matrix */}
      <section className="space-y-3">
        <h3 className="font-mono text-xs uppercase tracking-widest text-p5-red font-bold">
          // TECHNICAL SKILLS
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SKILL_DOMAINS.map((dom) => (
            <div key={dom.id} className="bg-black/60 p-3 border border-white/10">
              <span className="font-mono text-xs text-p5-cyan uppercase block mb-1">
                {dom.title}
              </span>
              <span className="font-sans text-xs text-p5-white">
                {dom.skills.join(', ')}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
);

// 8. CONTACT PAGE
const ContactPage: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    soundFX.playSelect();
    try {
      await navigator.clipboard.writeText(PROFILE_DATA.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <SectionHeading
        code="COMMUNICATIONS TERMINAL // 07"
        watermark="CONNECT"
        title="INITIATE DIRECT CONTACT"
        subtitle="Available for software engineering opportunities, backend/cloud architecture discussions, and technical collaborations."
      />

      <div className="bg-p5-panel border-2 border-p5-red p-6 sm:p-10 shadow-p5-white space-y-8 clip-p5-card">
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-p5-cyan block">
            // DIRECT TRANSMISSION CHANNEL
          </span>
          <div className="font-display text-3xl sm:text-5xl text-white break-all">
            {PROFILE_DATA.email}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={handleCopyEmail}
            className="px-6 py-3.5 bg-p5-red hover:bg-white text-white hover:text-black font-display text-lg uppercase tracking-wider flex items-center gap-2 transition-colors shadow-p5-white"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" /> EMAIL COPIED TO CLIPBOARD
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" /> COPY EMAIL ADDRESS
              </>
            )}
          </button>

          <a
            href={`mailto:${PROFILE_DATA.email}?subject=Software%20Engineering%20Opportunity%20%E2%80%94%20Arnav%20Mohan`}
            onClick={() => soundFX.playSelect()}
            className="px-6 py-3.5 bg-black hover:bg-white/10 text-white font-display text-lg uppercase tracking-wider border-2 border-white/30 flex items-center gap-2 transition-colors"
          >
            <Mail className="w-5 h-5 text-p5-cyan" /> LAUNCH MAIL CLIENT
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/15">
          <a
            href={PROFILE_DATA.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 bg-black border border-white/20 hover:border-p5-red flex items-center justify-between group transition-colors"
          >
            <div>
              <span className="font-mono text-xs text-p5-muted block">GITHUB PROFILE</span>
              <span className="font-display text-2xl text-white group-hover:text-p5-red uppercase">
                github.com/ArnavMohan65
              </span>
            </div>
            <Github className="w-7 h-7 text-p5-red" />
          </a>

          <a
            href={PROFILE_DATA.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 bg-black border border-white/20 hover:border-p5-cyan flex items-center justify-between group transition-colors"
          >
            <div>
              <span className="font-mono text-xs text-p5-muted block">LINKEDIN NETWORK</span>
              <span className="font-display text-2xl text-white group-hover:text-p5-cyan uppercase">
                Arnav Mohan
              </span>
            </div>
            <Linkedin className="w-7 h-7 text-p5-cyan" />
          </a>
        </div>
      </div>
    </div>
  );
};

// 9. CUSTOM 404 PAGE
const NotFoundPage: React.FC = () => (
  <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-6">
    <div className="inline-block bg-p5-red text-white font-mono text-xs px-3 py-1 uppercase">
      ERROR 404 // ROUTE UNMAPPED
    </div>
    <h1 className="font-display text-6xl sm:text-7xl uppercase text-white">
      COORDINATES NOT FOUND
    </h1>
    <p className="font-sans text-p5-muted">
      The requested URL does not correspond to an active node in Arnav Mohan's portfolio.
    </p>
    <Link
      to="/"
      className="inline-flex items-center gap-2 px-6 py-3 bg-p5-red text-white font-display text-lg uppercase tracking-wider shadow-p5-white"
    >
      <ArrowLeft className="w-5 h-5" /> RETURN TO HOME BASE
    </Link>
  </div>
);

// Animated Route Wrapper using PageTransition.tsx
const AnimatedRoutes: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  }, [location.pathname, reducedMotion]);

  return (
    <AnimatePresence mode="wait">
      <PageTransition
        key={location.pathname}
        routeKey={location.pathname}
        reducedMotion={reducedMotion}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage reducedMotion={reducedMotion} />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PageTransition>
    </AnimatePresence>
  );
};

export const App: React.FC = () => {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-p5-black text-p5-white bg-grid-pattern flex flex-col justify-between">
        <IntroLoader reducedMotion={prefersReducedMotion} />
        <Navbar />
        <AnimatedRoutes reducedMotion={prefersReducedMotion} />

        <footer className="border-t-2 border-p5-red bg-p5-panel py-8 px-4 sm:px-6 lg:px-8 no-print">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-p5-muted">
            <div>
              © {new Date().getFullYear()} {PROFILE_DATA.name}. ALL SYSTEMS OPERATIONAL.
            </div>
            <div className="flex items-center gap-6">
              <Link to="/projects" className="hover:text-p5-red">
                PROJECTS
              </Link>
              <Link to="/experience" className="hover:text-p5-red">
                EXPERIENCE
              </Link>
              <Link to="/resume" className="hover:text-p5-red">
                RESUME
              </Link>
              <Link to="/contact" className="hover:text-p5-cyan">
                CONTACT
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;