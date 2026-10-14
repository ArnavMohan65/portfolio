import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const IntroLoader: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return !window.sessionStorage.getItem('arnav_p5_intro_seen');
  });

  useEffect(() => {
    if (!visible) return;
    if (reducedMotion) {
      window.sessionStorage.setItem('arnav_p5_intro_seen', 'true');
      setVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      window.sessionStorage.setItem('arnav_p5_intro_seen', 'true');
      setVisible(false);
    }, 950);

    return () => clearTimeout(timer);
  }, [visible, reducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          className="fixed inset-0 z-[100] bg-p5-black flex flex-col items-center justify-center overflow-hidden select-none"
          role="status"
          aria-label="Loading Portfolio Interface"
        >
          {/* Diagonal Crimson Slash */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.35, ease: 'circOut' }}
            className="w-[140%] h-28 bg-p5-red transform -rotate-6 flex items-center justify-center shadow-p5-white"
          >
            <div className="text-center transform rotate-6">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-black font-bold">
                SYSTEM INITIALIZATION // ARNAV MOHAN
              </p>
              <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-wider text-white">
                TAKE YOUR TIME // EXPLORE THE ARCHITECTURE
              </h1>
            </div>
          </motion.div>

          <button
            type="button"
            onClick={() => {
              window.sessionStorage.setItem('arnav_p5_intro_seen', 'true');
              setVisible(false);
            }}
            className="mt-8 font-mono text-xs uppercase tracking-widest text-p5-muted hover:text-white border border-white/20 px-3 py-1"
          >
            [ SKIP INTRO ]
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};