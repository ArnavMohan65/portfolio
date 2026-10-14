import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Volume2, VolumeX, Menu, X, Terminal } from 'lucide-react';
import { soundFX } from '../../utils/sound';

export interface NavItem {
  label: string;
  path: string;
  code: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'HOME', path: '/', code: '01' },
  { label: 'PROJECTS', path: '/projects', code: '02' },
  { label: 'EXPERIENCE', path: '/experience', code: '03' },
  { label: 'TECH STACK', path: '/skills', code: '04' },
  { label: 'ABOUT', path: '/about', code: '05' },
  { label: 'RESUME', path: '/resume', code: '06' },
  { label: 'CONTACT', path: '/contact', code: '07' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioOn, setAudioOn] = useState(soundFX.enabled);
  const location = useLocation();
  const navigate = useNavigate();
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Arrow-key navigation inside the desktop game menu bar
  const handleMenuKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (idx + 1) % NAV_ITEMS.length;
      soundFX.playHover();
      navRefs.current[next]?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (idx - 1 + NAV_ITEMS.length) % NAV_ITEMS.length;
      soundFX.playHover();
      navRefs.current[prev]?.focus();
    }
  };

  const handleToggleAudio = () => {
    const nextState = soundFX.toggle();
    setAudioOn(nextState);
  };

  return (
    <header className="sticky top-0 z-50 bg-p5-black/95 backdrop-blur-md border-b-4 border-p5-red no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Identity / Quick Return to Home */}
        <button
          type="button"
          onClick={() => {
            soundFX.playSelect();
            navigate('/');
          }}
          className="group flex items-center gap-3 text-left focus:outline-none focus:ring-2 focus:ring-p5-cyan"
          aria-label="Arnav Mohan - Return to Home Screen"
        >
          <div className="w-10 h-10 bg-p5-red flex items-center justify-center transform -skew-x-12 border-2 border-white group-hover:bg-white transition-colors shadow-p5-dark">
            <Terminal className="w-5 h-5 text-white group-hover:text-p5-black transform skew-x-12" />
          </div>
          <div>
            <span className="font-display text-2xl tracking-wider text-white block leading-none">
              ARNAV MOHAN
            </span>
            <span className="font-mono text-[10px] tracking-widest text-p5-cyan block mt-0.5">
              PHANTOM.SYS // ENG.PORTFOLIO
            </span>
          </div>
        </button>

        {/* Desktop Persona 5 Slanted Game-Menu Navigation */}
        <nav
          className="hidden lg:flex items-center space-x-1.5"
          aria-label="Main Game Menu Navigation (Use Left/Right Arrows to Cycle)"
        >
          {NAV_ITEMS.map((item, idx) => {
            const isActive =
              item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                ref={(el) => {
                  navRefs.current[idx] = el;
                }}
                to={item.path}
                onKeyDown={(e) => handleMenuKeyDown(e, idx)}
                onMouseEnter={() => soundFX.playHover()}
                onClick={() => soundFX.playSelect()}
                className={`group relative px-4 py-1.5 font-display text-base tracking-wider uppercase transition-all transform -skew-x-12 focus:outline-none focus:ring-2 focus:ring-p5-cyan ${
                  isActive
                    ? 'bg-p5-red text-white shadow-p5-white -translate-y-0.5 border border-white'
                    : 'text-p5-white hover:bg-white hover:text-p5-black'
                }`}
              >
                {/* Animated Diamond Reticle on Active/Hover */}
                <span
                  className={`inline-block w-1.5 h-1.5 mr-1.5 transform rotate-45 transition-transform ${
                    isActive
                      ? 'bg-p5-cyan scale-125'
                      : 'bg-p5-red group-hover:bg-p5-red group-hover:rotate-90'
                  }`}
                  aria-hidden="true"
                />
                <span className="inline-block transform skew-x-12">
                  <span className="font-mono text-[10px] mr-1 opacity-75">{item.code}</span>
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* Sound Toggle & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleToggleAudio}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-p5-panel border-2 border-white/25 hover:border-p5-red text-xs font-mono uppercase tracking-wider text-white transition-colors clip-p5-tag focus:outline-none focus:ring-2 focus:ring-p5-cyan"
            aria-pressed={audioOn}
            aria-label={audioOn ? 'Mute UI Sound Effects' : 'Enable UI Sound Effects'}
            title="Optional synthesized UI sound effects (Muted by default)"
          >
            {audioOn ? (
              <>
                <Volume2 className="w-4 h-4 text-p5-cyan" />
                <span className="hidden sm:inline text-p5-cyan">SFX: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-p5-muted" />
                <span className="hidden sm:inline text-p5-muted">SFX: OFF</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 bg-p5-red text-white border border-white focus:outline-none focus:ring-2 focus:ring-p5-cyan"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav
          className="lg:hidden bg-p5-black border-b-4 border-p5-red px-4 pt-3 pb-6 space-y-2 bg-halftone"
          aria-label="Mobile Navigation"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => soundFX.playSelect()}
                className={`block px-4 py-2.5 font-display text-xl tracking-wider uppercase border-l-4 transform -skew-x-6 ${
                  isActive
                    ? 'bg-p5-red text-white border-white shadow-p5-white'
                    : 'bg-p5-panel text-p5-white border-p5-red/40 hover:border-p5-red'
                }`}
              >
                <span className="inline-block transform skew-x-6">
                  <span className="font-mono text-xs mr-2 opacity-75">[{item.code}]</span>
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </nav>
      )}
    </header>
  );
};