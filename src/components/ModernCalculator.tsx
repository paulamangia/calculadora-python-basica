import React, { useState } from 'react';
import { Calculator as CalcIcon, History, Trash2, ArrowRight } from 'lucide-react';

export const ModernCalculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [subDisplay, setSubDisplay] = useState<string>('');
  const [history, setHistory] = useState<Array<{ expr: string; res: string }>>([
    { expr: '15% de 200', res: '30' },
    { expr: '45 * 12', res: '540' },
  ]);
  const [resetNext, setResetNext] = useState<boolean>(false);

  const handleDigit = (digit: string) => {
    if (display === '0' || resetNext) {
      setDisplay(digit);
      setResetNext(false);
    } else {
      if (display.length < 14) {
        setDisplay(display + digit);
      }
    }
  };

  const handleDecimal = () => {
    if (resetNext) {
      setDisplay('0.');
      setResetNext(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setSubDisplay('');
    setResetNext(false);
  };

  const handleOperator = (op: string) => {
    setSubDisplay(`${display} ${op}`);
    setResetNext(true);
  };

  const handlePercentage = () => {
    // If there's an active expression like "200 *", calculate the percentage of 200
    if (subDisplay) {
      const parts = subDisplay.split(' ');
      const baseNum = parseFloat(parts[0]);
      const currentVal = parseFloat(display);
      if (!isNaN(baseNum) && !isNaN(currentVal)) {
        const percValue = (baseNum * currentVal) / 100;
        const expr = `${currentVal}% de ${baseNum}`;
        const resStr = String(Math.round(percValue * 1000000) / 1000000);
        setDisplay(resStr);
        setSubDisplay(expr + ' =');
        setHistory((prev) => [{ expr, res: resStr }, ...prev.slice(0, 4)]);
        setResetNext(true);
        return;
      }
    }
    // Standalone percentage: divide by 100
    const val = parseFloat(display);
    if (!isNaN(val)) {
      const res = val / 100;
      const resStr = String(res);
      setDisplay(resStr);
      setSubDisplay(`${val}% =`);
      setHistory((prev) => [{ expr: `${val}%`, res: resStr }, ...prev.slice(0, 4)]);
      setResetNext(true);
    }
  };

  const handleEquals = () => {
    if (!subDisplay || subDisplay.includes('=')) return;

    const parts = subDisplay.trim().split(' ');
    const num1 = parseFloat(parts[0]);
    const op = parts[1];
    const num2 = parseFloat(display);

    if (isNaN(num1) || isNaN(num2)) return;

    let res = 0;
    if (op === '+') res = num1 + num2;
    else if (op === '-') res = num1 - num2;
    else if (op === '×' || op === '*') res = num1 * num2;
    else if (op === '÷' || op === '/') {
      if (num2 === 0) {
        setDisplay('Erro: Div/0');
        setSubDisplay(`${num1} ÷ 0`);
        setResetNext(true);
        return;
      }
      res = num1 / num2;
    }

    const rounded = Math.round(res * 10000000) / 10000000;
    const expr = `${num1} ${op} ${num2}`;
    const resStr = String(rounded);

    setDisplay(resStr);
    setSubDisplay(`${expr} =`);
    setHistory((prev) => [{ expr, res: resStr }, ...prev.slice(0, 4)]);
    setResetNext(true);
  };

  const handleToggleSign = () => {
    if (display !== '0' && display !== 'Erro: Div/0') {
      if (display.startsWith('-')) {
        setDisplay(display.slice(1));
      } else {
        setDisplay('-' + display);
      }
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Top Banner */}
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
            <CalcIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">Calculadora Gráfica em Tempo Real</h3>
            <p className="text-[11px] text-slate-400">Interface moderna demonstrando arquitetura reativa em React + TypeScript</p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Interactive Demo
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Calculator Body (8 cols on large) */}
        <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-950/40">
          <div className="w-full max-w-sm bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 shadow-2xl backdrop-blur-xl">
            {/* Display screen */}
            <div className="bg-slate-950/90 border border-slate-800/90 rounded-xl p-4 mb-4 text-right shadow-inner">
              <div className="text-xs font-mono text-slate-400 min-h-[18px] tracking-wider mb-1">
                {subDisplay || '\u00A0'}
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight overflow-x-auto whitespace-nowrap">
                {display}
              </div>
            </div>

            {/* Keypad Grid */}
            <div className="grid grid-cols-4 gap-2.5">
              {/* Row 1 */}
              <button
                onClick={handleClear}
                className="p-3.5 rounded-xl font-bold text-sm bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 active:scale-95 transition-all"
              >
                AC
              </button>
              <button
                onClick={handleToggleSign}
                className="p-3.5 rounded-xl font-semibold text-sm bg-slate-800/80 text-slate-300 border border-slate-700/50 hover:bg-slate-800 active:scale-95 transition-all"
              >
                +/-
              </button>
              <button
                onClick={handlePercentage}
                className="p-3.5 rounded-xl font-bold text-sm bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 active:scale-95 transition-all"
                title="Cálculo de Porcentagem (%)"
              >
                %
              </button>
              <button
                onClick={() => handleOperator('÷')}
                className="p-3.5 rounded-xl font-bold text-base bg-amber-400 text-slate-950 hover:bg-amber-300 active:scale-95 transition-all shadow-sm"
              >
                ÷
              </button>

              {/* Row 2 */}
              <button
                onClick={() => handleDigit('7')}
                className="p-3.5 rounded-xl font-semibold text-base bg-slate-800/60 text-slate-100 border border-slate-800 hover:bg-slate-800 hover:text-white active:scale-95 transition-all"
              >
                7
              </button>
              <button
                onClick={() => handleDigit('8')}
                className="p-3.5 rounded-xl font-semibold text-base bg-slate-800/60 text-slate-100 border border-slate-800 hover:bg-slate-800 hover:text-white active:scale-95 transition-all"
              >
                8
              </button>
              <button
                onClick={() => handleDigit('9')}
                className="p-3.5 rounded-xl font-semibold text-base bg-slate-800/60 text-slate-100 border border-slate-800 hover:bg-slate-800 hover:text-white active:scale-95 transition-all"
              >
                9
              </button>
              <button
                onClick={() => handleOperator('×')}
                className="p-3.5 rounded-xl font-bold text-base bg-amber-400 text-slate-950 hover:bg-amber-300 active:scale-95 transition-all shadow-sm"
              >
                ×
              </button>

              {/* Row 3 */}
              <button
                onClick={() => handleDigit('4')}
                className="p-3.5 rounded-xl font-semibold text-base bg-slate-800/60 text-slate-100 border border-slate-800 hover:bg-slate-800 hover:text-white active:scale-95 transition-all"
              >
                4
              </button>
              <button
                onClick={() => handleDigit('5')}
                className="p-3.5 rounded-xl font-semibold text-base bg-slate-800/60 text-slate-100 border border-slate-800 hover:bg-slate-800 hover:text-white active:scale-95 transition-all"
              >
                5
              </button>
              <button
                onClick={() => handleDigit('6')}
                className="p-3.5 rounded-xl font-semibold text-base bg-slate-800/60 text-slate-100 border border-slate-800 hover:bg-slate-800 hover:text-white active:scale-95 transition-all"
              >
                6
              </button>
              <button
                onClick={() => handleOperator('-')}
                className="p-3.5 rounded-xl font-bold text-base bg-amber-400 text-slate-950 hover:bg-amber-300 active:scale-95 transition-all shadow-sm"
              >
                -
              </button>

              {/* Row 4 */}
              <button
                onClick={() => handleDigit('1')}
                className="p-3.5 rounded-xl font-semibold text-base bg-slate-800/60 text-slate-100 border border-slate-800 hover:bg-slate-800 hover:text-white active:scale-95 transition-all"
              >
                1
              </button>
              <button
                onClick={() => handleDigit('2')}
                className="p-3.5 rounded-xl font-semibold text-base bg-slate-800/60 text-slate-100 border border-slate-800 hover:bg-slate-800 hover:text-white active:scale-95 transition-all"
              >
                2
              </button>
              <button
                onClick={() => handleDigit('3')}
                className="p-3.5 rounded-xl font-semibold text-base bg-slate-800/60 text-slate-100 border border-slate-800 hover:bg-slate-800 hover:text-white active:scale-95 transition-all"
              >
                3
              </button>
              <button
                onClick={() => handleOperator('+')}
                className="p-3.5 rounded-xl font-bold text-base bg-amber-400 text-slate-950 hover:bg-amber-300 active:scale-95 transition-all shadow-sm"
              >
                +
              </button>

              {/* Row 5 */}
              <button
                onClick={() => handleDigit('0')}
                className="col-span-2 p-3.5 rounded-xl font-semibold text-base bg-slate-800/60 text-slate-100 border border-slate-800 hover:bg-slate-800 hover:text-white active:scale-95 transition-all text-left pl-6"
              >
                0
              </button>
              <button
                onClick={handleDecimal}
                className="p-3.5 rounded-xl font-bold text-base bg-slate-800/60 text-slate-100 border border-slate-800 hover:bg-slate-800 hover:text-white active:scale-95 transition-all"
              >
                .
              </button>
              <button
                onClick={handleEquals}
                className="p-3.5 rounded-xl font-bold text-base bg-emerald-500 text-slate-950 hover:bg-emerald-400 active:scale-95 transition-all shadow-md"
              >
                =
              </button>
            </div>
          </div>
        </div>

        {/* History & Recruiter Technical Notes (4 cols on large) */}
        <div className="lg:col-span-4 p-6 flex flex-col justify-between bg-slate-900/60 space-y-6">
          {/* History Widget */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-amber-400" />
                Histórico de Operações
              </span>
              {history.length > 0 && (
                <button
                  onClick={() => setHistory([])}
                  className="text-slate-500 hover:text-rose-400 transition-colors"
                  title="Limpar histórico"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <p className="text-xs text-slate-500 py-3 text-center italic">Nenhum cálculo recente</p>
            ) : (
              <div className="space-y-2">
                {history.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-center justify-between font-mono text-xs"
                  >
                    <span className="text-slate-400 truncate mr-2">{item.expr}</span>
                    <span className="text-emerald-400 font-bold">= {item.res}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Technical Highlights */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block">
              Destaques Técnicos
            </span>
            <ul className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Prevenção de <strong>divisão por zero</strong> nativa.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Nova operação de <strong>porcentagem (%)</strong> integrada.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Tratamento defensivo para arredondamentos flutuantes IEEE-754.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
