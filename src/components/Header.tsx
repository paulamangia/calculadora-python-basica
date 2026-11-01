import React from 'react';
import { Download, Terminal, Calculator, Award } from 'lucide-react';

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
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Wordmark */}
        <a 
          href="#inicio" 
          className="flex items-center gap-2.5 text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-amber-400 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-400 to-amber-500 flex items-center justify-center text-slate-950 shadow-sm font-black">
            <Calculator className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="leading-tight">Paula Mangia</span>
            <span className="text-[10px] font-normal text-slate-400">Calculadora Python</span>
          </div>
        </a>

        {/* Zone 2: Links de Navegação */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
          <a href="#recrutadores" className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-indigo-300">
            <Award className="w-3.5 h-3.5 text-indigo-400" />
            <span>Para Recrutadores</span>
          </a>
          <a href="#calculadora" className="hover:text-amber-400 transition-colors">
            Demo ao Vivo
          </a>
          <a href="#codigo" className="hover:text-amber-400 transition-colors">
            Código Python
          </a>
          <a href="#fundamentos" className="hover:text-amber-400 transition-colors">
            Fundamentos
          </a>
          <a href="#github" className="hover:text-amber-400 transition-colors text-sky-400">
            Guia GitHub
          </a>
          <a href="#quiz" className="hover:text-amber-400 transition-colors">
            Desafio
          </a>
        </nav>

        {/* Zone 3: Ação Primária */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-amber-950/20 active:scale-95"
            title={`Baixar ${activeFilename}`}
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Baixar Script Python</span>
            <span className="sm:hidden">Baixar .py</span>
          </button>
        </div>
      </div>
    </header>
  );
};
