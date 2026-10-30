import React from 'react';
import { BookOpen, Lightbulb, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { CodeLineAnnotation } from '../data/calculatorData';

interface LineExplainerProps {
  selectedAnnotation: CodeLineAnnotation | null;
  annotations: CodeLineAnnotation[];
  onSelect: (item: CodeLineAnnotation) => void;
}

export const LineExplainer: React.FC<LineExplainerProps> = ({
  selectedAnnotation,
  annotations,
  onSelect,
}) => {
  const current = selectedAnnotation || annotations[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl" id="componentes">
      <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-semibold text-white">Análise Detalhada dos Componentes</h2>
        </div>
        <span className="text-xs text-slate-400">
          Clique nos componentes para navegar
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
        {/* Component selector list */}
        <div className="lg:col-span-4 p-3 bg-slate-950/40 space-y-1.5 max-h-[380px] overflow-y-auto">
          {annotations.map((item) => {
            const isActive = current?.lineNumber === item.lineNumber;
            return (
              <button
                key={item.lineNumber}
                onClick={() => onSelect(item)}
                className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-start justify-between gap-2 border ${
                  isActive
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-200'
                    : 'border-transparent text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <div>
                  <div className="font-semibold">{item.component}</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5 truncate max-w-[200px]">
                    Linha {item.lineNumber}: {item.code.split('\n')[0]}
                  </div>
                </div>
                {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />}
              </button>
            );
          })}
        </div>

        {/* Detailed Explanation Display */}
        {current && (
          <div className="lg:col-span-8 p-5 sm:p-6 space-y-4 bg-slate-900/50">
            {/* Header info */}
            <div className="space-y-1">
              <div className="text-xs text-amber-400 font-mono">
                Linha {current.lineNumber} do código
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {current.component}
              </h3>
            </div>

            {/* Code Snippet */}
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto">
              <code>{current.code}</code>
            </div>

            {/* Content cards */}
            <div className="space-y-3 pt-1">
              {/* O que faz */}
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  O que esse comando faz:
                </span>
                <p className="text-sm text-slate-300 leading-relaxed pl-5">
                  {current.explanation}
                </p>
              </div>

              {/* Por que é essencial */}
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-sky-400" />
                  Por que isso é fundamental:
                </span>
                <p className="text-sm text-slate-300 leading-relaxed pl-5">
                  {current.whyImportant}
                </p>
              </div>

              {/* Dica para iniciantes */}
              <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-amber-300">Dica de Ouro: </span>
                  {current.beginnerTip}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
