import React from 'react';
import { BookOpen, Terminal, CheckCircle2, AlertCircle, Compass, Laptop } from 'lucide-react';
import { PYTHON_FUNDAMENTALS, HOW_TO_RUN_GUIDE } from '../data/calculatorData';

export const FundamentalsGuide: React.FC = () => {
  return (
    <div className="space-y-8" id="fundamentos">
      {/* Fundamentals Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Compass className="w-4 h-4 text-amber-400" />
          <h2 className="text-base font-bold text-white">4 Conceitos Essenciais para quem está Começando</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PYTHON_FUNDAMENTALS.map((fund, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-950/60 rounded-lg border border-slate-800/80 space-y-2.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h3 className="text-sm font-semibold text-slate-100">{fund.topic}</h3>
                  <span className="text-[11px] font-medium text-amber-400/90 font-mono">
                    {fund.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {fund.summary}
                </p>
              </div>

              <div className="p-2.5 bg-slate-900 rounded border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto whitespace-pre">
                {fund.example}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arithmetic Operators Table & How to Run */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Operators Cheatsheet */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-bold text-white">Operadores Matemáticos em Python</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Além das quatro operações básicas, o Python tem operadores matemáticos extras muito úteis:
          </p>

          <div className="divide-y divide-slate-800 text-xs">
            {[
              { op: '+', name: 'Adição', ex: '5 + 2', res: '7' },
              { op: '-', name: 'Subtração', ex: '5 - 2', res: '3' },
              { op: '*', name: 'Multiplicação', ex: '5 * 2', res: '10' },
              { op: '/', name: 'Divisão (decimal)', ex: '5 / 2', res: '2.5' },
              { op: '//', name: 'Divisão Inteira', ex: '5 // 2', res: '2 (descarta a fração)' },
              { op: '%', name: 'Módulo (Resto)', ex: '5 % 2', res: '1 (sobra da divisão)' },
              { op: '**', name: 'Potência / Expoente', ex: '5 ** 2', res: '25 (5 elevado a 2)' },
            ].map((row, i) => (
              <div key={i} className="py-2 flex items-center justify-between font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-slate-800 text-amber-300 flex items-center justify-center font-bold text-xs">
                    {row.op}
                  </span>
                  <span className="font-sans text-slate-300">{row.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 mr-2">{row.ex} =</span>
                  <span className="text-emerald-400 font-semibold">{row.res}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to run locally step-by-step */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Laptop className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Como Executar este Código no Seu Computador</h3>
          </div>

          <div className="space-y-3">
            {HOW_TO_RUN_GUIDE.map((step, sIdx) => (
              <div key={sIdx} className="flex items-start gap-3 p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                <span className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {sIdx + 1}
                </span>
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold text-slate-100">{step.step}</div>
                  <div className="text-xs text-slate-300 leading-relaxed">{step.detail}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">$</span>
              <span className="text-emerald-400">python calculadora_simples.py</span>
            </div>
            <span className="text-[11px] text-slate-500 font-sans">Pressione Enter</span>
          </div>
        </div>
      </div>
    </div>
  );
};
