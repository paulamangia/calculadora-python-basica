import React from 'react';
import { Download, Calculator } from 'lucide-react';

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
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center text-slate-950 font-black shadow-sm">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-white text-sm sm:text-base tracking-tight block leading-tight">
              Calculadora Python
            </span>
            <span className="text-[11px] text-slate-400">Paula Mangia</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm active:scale-95"
            title={`Baixar ${activeFilename}`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar calculadora.py</span>
          </button>
        </div>
      </div>
    </header>
  );
};
