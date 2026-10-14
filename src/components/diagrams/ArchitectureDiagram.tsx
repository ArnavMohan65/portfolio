import React, { useState } from 'react';
import { ArchitectureNode } from '../../types/portfolio';

interface ArchitectureDiagramProps {
  title: string;
  summary: string;
  nodes: ArchitectureNode[];
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({
  title,
  summary,
  nodes,
}) => {
  const [activeNodeId, setActiveNodeId] = useState<string>(nodes[0]?.id || '');
  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];

  const roleColors: Record<ArchitectureNode['role'], string> = {
    input: 'border-p5-cyan text-p5-cyan',
    process: 'border-p5-red text-p5-red',
    storage: 'border-amber-400 text-amber-400',
    output: 'border-emerald-400 text-emerald-400',
  };

  return (
    <div className="bg-p5-panel border-2 border-white/20 p-5 sm:p-6 shadow-p5-dark relative overflow-hidden clip-p5-card">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-white/10">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-p5-red block">
            // INTERACTIVE ARCHITECTURE BLUEPRINT
          </span>
          <h4 className="font-display text-xl sm:text-2xl tracking-wide uppercase text-white mt-0.5">
            {title}
          </h4>
        </div>
        <span className="font-mono text-[11px] px-3 py-1 bg-black border border-p5-cyan text-p5-cyan clip-p5-tag">
          CLICK OR HOVER ANY NODE TO INSPECT
        </span>
      </div>

      {/* Interactive Node Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10 my-4">
        {nodes.map((node, index) => {
          const isSelected = activeNode?.id === node.id;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setActiveNodeId(node.id)}
              onMouseEnter={() => setActiveNodeId(node.id)}
              className={`text-left p-4 bg-p5-black border-2 transition-all duration-150 relative group focus:outline-none focus:ring-2 focus:ring-p5-cyan ${
                isSelected
                  ? 'border-p5-red shadow-p5-red -translate-y-1'
                  : 'border-white/20 hover:border-white/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-p5-muted">
                  STAGE 0{index + 1}
                </span>
                <span
                  className={`font-mono text-[10px] uppercase px-1.5 py-0.5 border ${roleColors[node.role]}`}
                >
                  {node.role}
                </span>
              </div>
              <div className="font-sans font-bold text-sm sm:text-base text-white mb-1">
                {node.label}
              </div>
              <div className="font-mono text-xs text-p5-muted">{node.sublabel}</div>

              {/* Connector Arrow on Desktop */}
              {index < nodes.length - 1 && (
                <div
                  className="hidden md:flex items-center justify-center absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-5 h-5 bg-p5-red text-white font-mono text-xs font-bold transform rotate-45"
                  aria-hidden="true"
                >
                  <span className="transform -rotate-45">→</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Node Engineering Telemetry Inspector */}
      {activeNode && (
        <div className="bg-black border-l-4 border-p5-cyan p-4 mt-4 space-y-1">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-p5-cyan font-bold uppercase">
              INSPECTING NODE // {activeNode.label}
            </span>
            <span className="text-p5-muted uppercase">ROLE: {activeNode.role}</span>
          </div>
          <p className="font-sans text-sm text-p5-white leading-relaxed">
            {activeNode.technicalSpec}
          </p>
        </div>
      )}

      <p className="font-mono text-xs text-p5-muted leading-relaxed mt-3 pt-3 border-t border-white/10">
        SUMMARY: {summary}
      </p>
    </div>
  );
};