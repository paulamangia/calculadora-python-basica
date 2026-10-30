import React, { useState } from 'react';
import { Copy, Check, Info, Code2, Download } from 'lucide-react';
import { CALCULATOR_TEMPLATES, CodeTemplate, CodeLineAnnotation } from '../data/calculatorData';

interface CodeViewerProps {
  currentLevel: 'basic' | 'functions' | 'loop';
  onLevelChange: (level: 'basic' | 'functions' | 'loop') => void;
  selectedAnnotation: CodeLineAnnotation | null;
  onSelectAnnotation: (annotation: CodeLineAnnotation | null) => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  currentLevel,
  onLevelChange,
  selectedAnnotation,
  onSelectAnnotation,
}) => {
  const [copied, setCopied] = useState(false);
  const template: CodeTemplate = CALCULATOR_TEMPLATES[currentLevel];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(template.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = template.code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([template.code], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = template.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Helper for syntax highlighting styling
  const renderHighlightedLine = (line: string) => {
    if (line.trim().startsWith('#')) {
      return <span className="text-emerald-400/80 italic">{line}</span>;
    }

    // Split words/tokens safely for highlighting keywords
    const keywords = ['def', 'return', 'if', 'elif', 'else', 'while', 'try', 'except', 'break', 'continue', 'not', 'in', 'float', 'input', 'print', '__name__', '__main__'];
    
    // Check if line contains a string
    const parts = line.split(/(".*?"|'.*?'|#.*$)/g);

    return (
      <span>
        {parts.map((part, pIdx) => {
          if (!part) return null;
          if (part.startsWith('#')) {
            return <span key={pIdx} className="text-emerald-400/80 italic">{part}</span>;
          }
          if ((part.startsWith('"') && part.endsWith('"')) || (part.startsWith("'") && part.endsWith("'"))) {
            return <span key={pIdx} className="text-amber-300">{part}</span>;
          }

          // Replace known keywords in standard tokens
          const tokens = part.split(/(\b(?:def|return|if|elif|else|while|try|except|break|continue|not|in|float|input|print|True|False)\b|[=+\-*/:(),])/g);
          return (
            <span key={pIdx}>
              {tokens.map((token, tIdx) => {
                if (keywords.includes(token)) {
                  return <span key={tIdx} className="text-sky-400 font-semibold">{token}</span>;
                }
                if (['True', 'False'].includes(token)) {
                  return <span key={tIdx} className="text-purple-400 font-semibold">{token}</span>;
                }
                if (['+', '-', '*', '/', '==', '='].includes(token)) {
                  return <span key={tIdx} className="text-rose-400">{token}</span>;
                }
                if ([':', '(', ')', ','].includes(token)) {
                  return <span key={tIdx} className="text-slate-500">{token}</span>;
                }
                return <span key={tIdx}>{token}</span>;
              })}
            </span>
          );
        })}
      </span>
    );
  };

  const lines = template.code.split('\n');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl" id="codigo">
      {/* Top Controller Header */}
      <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Level Switcher (interactive filter tabs) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/60 rounded-lg border border-slate-800/80">
          <button
            onClick={() => {
              onLevelChange('basic');
              onSelectAnnotation(null);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
              currentLevel === 'basic'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            1. Básico (Linear)
          </button>
          <button
            onClick={() => {
              onLevelChange('functions');
              onSelectAnnotation(null);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
              currentLevel === 'functions'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            2. Com Funções (def)
          </button>
          <button
            onClick={() => {
              onLevelChange('loop');
              onSelectAnnotation(null);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
              currentLevel === 'loop'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3. Loop & Proteção
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 rounded-md transition-colors border border-slate-700/60"
            title="Copiar código para a área de transferência"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar</span>
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 rounded-md transition-colors border border-slate-700/60"
            title="Baixar arquivo .py"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar .py</span>
          </button>
        </div>
      </div>

      {/* Description banner */}
      <div className="px-5 py-3 bg-slate-950/40 border-b border-slate-800/80 flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3 text-slate-400">
          <span className="font-mono text-amber-400/90 font-medium">{template.filename}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>{template.description}</span>
        </div>
        <div className="hidden lg:flex items-center gap-1.5 text-slate-400 text-xs shrink-0">
          <Info className="w-3.5 h-3.5 text-amber-400" />
          <span>Dica: clique nas linhas marcadas para ver a explicação!</span>
        </div>
      </div>

      {/* Code Body */}
      <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto bg-slate-950/70 max-h-[580px] overflow-y-auto">
        <div className="min-w-[620px]">
          {lines.map((line, idx) => {
            const lineNum = idx + 1;
            const annotation = template.annotations.find((a) => a.lineNumber === lineNum);
            const isSelected = selectedAnnotation?.lineNumber === lineNum;

            return (
              <div
                key={idx}
                onClick={() => {
                  if (annotation) {
                    onSelectAnnotation(isSelected ? null : annotation);
                  }
                }}
                className={`group flex items-start gap-4 py-0.5 px-2 -mx-2 rounded transition-colors ${
                  annotation ? 'cursor-pointer hover:bg-amber-500/10' : ''
                } ${isSelected ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}
              >
                {/* Line number */}
                <span className="w-8 shrink-0 select-none text-right text-slate-600 font-mono text-xs pt-0.5">
                  {lineNum}
                </span>

                {/* Code line content */}
                <div className="flex-1 flex items-center justify-between gap-2">
                  <div className="text-slate-200">
                    {renderHighlightedLine(line)}
                  </div>

                  {/* Visual clue if annotated */}
                  {annotation && (
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] font-sans text-amber-400/90 flex items-center gap-1 shrink-0 ml-2">
                      <Code2 className="w-3 h-3" />
                      <span>{annotation.component}</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
