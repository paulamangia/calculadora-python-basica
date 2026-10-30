import React from 'react';
import { Download, Terminal } from 'lucide-react';

interface HeaderProps {
  activeFilename: string;
  activeCode: string;
}

export const Header: React.FC<HeaderProps> = ({ activeFilename, activeCode }) => {
  const handleDownload = () => {
    const blob = new Blob([activeCode], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Wordmark */}
        <a 
          href="#inicio" 
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-amber-400 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Terminal className="w-4 h-4" />
          </div>
          <span>PythonCalc Tutorial</span>
        </a>

        {/* Zone 2: 4-5 concise single-line links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#codigo" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Código Python
          </a>
          <a href="#simulador" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Simulador Interativo
          </a>
          <a href="#componentes" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Componentes Explicados
          </a>
          <a href="#fundamentos" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Fundamentos
          </a>
          <a href="#github" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 text-sky-400 font-semibold">
            Publicar no GitHub
          </a>
          <a href="#quiz" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Desafio Rápido
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-amber-950/20 active:scale-95"
            title={`Baixar ${activeFilename}`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar {activeFilename}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
