import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  routeKey: string;
  reducedMotion: boolean;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  routeKey,
  reducedMotion,
}) => {
  if (reducedMotion) {
    return <main className="min-h-[calc(100vh-8rem)]">{children}</main>;
  }

  return (
    <div key={routeKey} className="relative min-h-[calc(100vh-8rem)] overflow-hidden">
      {/* Layer 1: High-Speed Crimson Diagonal Slash Wipe */}
      <motion.div
        initial={{ x: '-10%', skewX: '-18deg', scaleX: 1.3 }}
        animate={{ x: '130%', skewX: '-18deg', scaleX: 1.3 }}
        transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-y-0 left-0 w-full bg-p5-red z-50 pointer-events-none border-r-8 border-white shadow-2xl"
        aria-hidden="true"
      />

      {/* Layer 2: Secondary Obsidian & Halftone Trailing Shutter */}
      <motion.div
        initial={{ x: '-25%', skewX: '-18deg', scaleX: 1.3 }}
        animate={{ x: '135%', skewX: '-18deg', scaleX: 1.3 }}
        transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
        className="fixed inset-y-0 left-0 w-full bg-p5-black bg-halftone z-40 pointer-events-none border-r-4 border-p5-cyan"
        aria-hidden="true"
      />

      {/* Main Content Container with Crisp Angular Entrance */}
      <motion.main
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.28, ease: 'easeOut', delay: 0.08 }}
      >
        {children}
      </motion.main>
    </div>
  );
};