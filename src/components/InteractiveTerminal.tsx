import React, { useState } from 'react';
import { Play, RotateCcw, Terminal, Cpu, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

export const InteractiveTerminal: React.FC = () => {
  const [num1, setNum1] = useState<string>('15');
  const [operacao, setOperacao] = useState<string>('+');
  const [num2, setNum2] = useState<string>('3');

  // Execution state
  const [terminalLogs, setTerminalLogs] = useState<Array<{ text: string; type: 'cmd' | 'output' | 'input' | 'result' | 'error' }>>([
    { text: '$ python calculadora_simples.py', type: 'cmd' },
    { text: '--- Calculadora Simples em Python ---', type: 'output' },
    { text: 'Operações disponíveis: (+, -, *, /, %)', type: 'output' },
    { text: 'Digite o primeiro número: 15.0', type: 'input' },
    { text: 'Digite a operação (+, -, *, /, %): +', type: 'input' },
    { text: 'Digite o segundo número: 3.0', type: 'input' },
    { text: 'Resultado: 15.0 + 3.0 = 18.0', type: 'result' },
  ]);

  const [lastTrace, setLastTrace] = useState<{
    n1: number | null;
    op: string;
    n2: number | null;
    result: number | string | null;
    status: 'success' | 'division_by_zero' | 'invalid_op' | 'invalid_number';
    stepExplanation: string;
  }>({
    n1: 15,
    op: '+',
    n2: 3,
    result: 18,
    status: 'success',
    stepExplanation: 'Avaliou `if operacao == "+":`, somou 15.0 e 3.0, gerando 18.0.',
  });

  const runCalculation = (overrideN1?: string, overrideOp?: string, overrideN2?: string) => {
    const val1Str = overrideN1 !== undefined ? overrideN1 : num1;
    const opStr = overrideOp !== undefined ? overrideOp : operacao;
    const val2Str = overrideN2 !== undefined ? overrideN2 : num2;

    const n1Parsed = parseFloat(val1Str);
    const n2Parsed = parseFloat(val2Str);

    const logs: Array<{ text: string; type: 'cmd' | 'output' | 'input' | 'result' | 'error' }> = [
      { text: '$ python calculadora_simples.py', type: 'cmd' },
      { text: '--- Calculadora Simples em Python ---', type: 'output' },
      { text: `Digite o primeiro número: ${val1Str}`, type: 'input' },
      { text: `Digite a operação (+, -, *, /, %): ${opStr}`, type: 'input' },
      { text: `Digite o segundo número: ${val2Str}`, type: 'input' },
    ];

    if (isNaN(n1Parsed) || isNaN(n2Parsed)) {
      logs.push({
        text: 'ValueError: could not convert string to float! (Digite apenas números)',
        type: 'error',
      });
      setTerminalLogs(logs);
      setLastTrace({
        n1: null,
        op: opStr,
        n2: null,
        result: null,
        status: 'invalid_number',
        stepExplanation: 'A função float() falhou ao tentar converter um texto não numérico.',
      });
      return;
    }

    if (!['+', '-', '*', '/', '%'].includes(opStr)) {
      logs.push({
        text: 'Erro: Operação inválida! Escolha apenas +, -, *, / ou %.',
        type: 'error',
      });
      setTerminalLogs(logs);
      setLastTrace({
        n1: n1Parsed,
        op: opStr,
        n2: n2Parsed,
        result: null,
        status: 'invalid_op',
        stepExplanation: 'Caiu no bloco `else:` final porque a operação digitada não coincide com +, -, *, / ou %.',
      });
      return;
    }

    if (opStr === '/' && n2Parsed === 0) {
      logs.push({
        text: 'Erro: Não é possível dividir um número por zero!',
        type: 'error',
      });
      setTerminalLogs(logs);
      setLastTrace({
        n1: n1Parsed,
        op: opStr,
        n2: 0,
        result: 'Indefinido',
        status: 'division_by_zero',
        stepExplanation: 'Entrou no if de segurança `if num2 == 0:` e evitou que o Python travasse com ZeroDivisionError!',
      });
      return;
    }

    let res = 0;
    let logicBranch = '';
    let resultMessage = '';

    switch (opStr) {
      case '+':
        res = n1Parsed + n2Parsed;
        logicBranch = 'Avaliou `if operacao == "+":` (Verdadeiro)';
        break;
      case '-':
        res = n1Parsed - n2Parsed;
        logicBranch = 'Avaliou `elif operacao == "-":` (Verdadeiro)';
        break;
      case '*':
        res = n1Parsed * n2Parsed;
        logicBranch = 'Avaliou `elif operacao == "*":` (Verdadeiro)';
        break;
      case '/':
        res = n1Parsed / n2Parsed;
        logicBranch = 'Passou pela checagem de zero e avaliou `elif operacao == "/":`';
        break;
      case '%':
        res = (n1Parsed * n2Parsed) / 100;
        logicBranch = 'Avaliou `elif operacao == "%":` calculando porcentagem';
        resultMessage = `Resultado: ${n1Parsed}% de ${n2Parsed} = `;
        break;
    }

    // Round nicely if floating point issue occurs (e.g. 0.1 + 0.2)
    const formattedRes = Math.round(res * 10000000) / 10000000;

    logs.push({
      text: resultMessage ? `${resultMessage}${formattedRes}` : `Resultado: ${n1Parsed} ${opStr} ${n2Parsed} = ${formattedRes}`,
      type: 'result',
    });

    setTerminalLogs(logs);
    setLastTrace({
      n1: n1Parsed,
      op: opStr,
      n2: n2Parsed,
      result: formattedRes,
      status: 'success',
      stepExplanation: `${logicBranch}. Resultado calculado e impresso com sucesso.`,
    });
  };

  const handlePreset = (presetN1: string, presetOp: string, presetN2: string) => {
    setNum1(presetN1);
    setOperacao(presetOp);
    setNum2(presetN2);
    runCalculation(presetN1, presetOp, presetN2);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl" id="simulador">
      {/* Top Header */}
      <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <h2 className="text-sm font-semibold text-white">Simulador Interativo do Terminal Python</h2>
        </div>
        <div className="text-xs text-slate-400">
          Experimente valores e veja como o Python executa linha a linha
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Controls Panel (Left 5 cols) */}
        <div className="lg:col-span-5 p-5 border-b lg:border-b-0 lg:border-r border-slate-800 space-y-4 bg-slate-900/50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Dados de Entrada (Inputs)
            </span>
            <button
              onClick={() => {
                setNum1('15');
                setOperacao('+');
                setNum2('3');
                runCalculation('15', '+', '3');
              }}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
              title="Restaurar valores padrão"
            >
              <RotateCcw className="w-3 h-3" />
              Resetar
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Primeiro Número (num1)
              </label>
              <input
                type="text"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                placeholder="Ex: 10 ou 3.5"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Operação Matemática (operacao)
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {[
                  { symbol: '+', label: 'Soma' },
                  { symbol: '-', label: 'Subtração' },
                  { symbol: '*', label: 'Mult.' },
                  { symbol: '/', label: 'Divisão' },
                  { symbol: '%', label: 'Porcent.' },
                ].map((item) => (
                  <button
                    key={item.symbol}
                    type="button"
                    onClick={() => setOperacao(item.symbol)}
                    className={`p-2 rounded-lg text-center transition-all border ${
                      operacao === item.symbol
                        ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <div className="text-base font-bold font-mono">{item.symbol}</div>
                    <div className="text-[10px] text-slate-400">{item.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Segundo Número (num2)
              </label>
              <input
                type="text"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                placeholder="Ex: 2 ou 0 (para testar erro)"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              />
            </div>

            <button
              onClick={() => runCalculation()}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors shadow-sm active:scale-98"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Executar no Terminal Simulado</span>
            </button>
          </div>

          {/* Quick presets for beginners */}
          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <span className="text-[11px] font-medium text-slate-400">
              Testes rápidos para experimentar:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => handlePreset('10', '/', '2')}
                className="px-2.5 py-1 text-[11px] bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded"
              >
                10 ÷ 2 (Normal)
              </button>
              <button
                onClick={() => handlePreset('10', '/', '0')}
                className="px-2.5 py-1 text-[11px] bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 rounded"
              >
                10 ÷ 0 (Divisão por zero)
              </button>
              <button
                onClick={() => handlePreset('15', '%', '200')}
                className="px-2.5 py-1 text-[11px] bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 rounded"
              >
                15% de 200 (Porcentagem)
              </button>
              <button
                onClick={() => handlePreset('4.5', '+', '2.3')}
                className="px-2.5 py-1 text-[11px] bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded"
              >
                4.5 + 2.3 (Decimais)
              </button>
              <button
                onClick={() => handlePreset('9', '*', '7')}
                className="px-2.5 py-1 text-[11px] bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded"
              >
                9 × 7 (Multiplicação)
              </button>
            </div>
          </div>
        </div>

        {/* Terminal Screen & Memory Trace (Right 7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950">
          {/* Terminal Window */}
          <div className="p-4 sm:p-5 font-mono text-xs leading-relaxed overflow-x-auto min-h-[220px]">
            {/* Terminal Window Header */}
            <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-slate-900">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-[10px] text-slate-500">bash / python terminal</span>
            </div>

            {/* Output lines */}
            <div className="space-y-1">
              {terminalLogs.map((log, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  {log.type === 'cmd' && (
                    <span className="text-emerald-400 font-bold select-none">&gt;</span>
                  )}
                  {log.type === 'input' && (
                    <span className="text-sky-400 font-bold select-none">?</span>
                  )}
                  {log.type === 'result' && (
                    <span className="text-emerald-400 select-none">✔</span>
                  )}
                  {log.type === 'error' && (
                    <span className="text-rose-400 select-none">✖</span>
                  )}

                  <span
                    className={`
                      ${log.type === 'cmd' ? 'text-slate-300 font-semibold' : ''}
                      ${log.type === 'output' ? 'text-slate-400' : ''}
                      ${log.type === 'input' ? 'text-sky-200' : ''}
                      ${log.type === 'result' ? 'text-emerald-300 font-semibold' : ''}
                      ${log.type === 'error' ? 'text-rose-300 font-medium' : ''}
                    `}
                  >
                    {log.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Python Internal Execution Trace */}
          <div className="p-4 bg-slate-900/90 border-t border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                <span>O que aconteceu na memória do Python:</span>
              </div>
              <div className="flex items-center gap-1">
                {lastTrace.status === 'success' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle className="w-2.5 h-2.5" /> Execução OK
                  </span>
                )}
                {lastTrace.status === 'division_by_zero' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    <AlertTriangle className="w-2.5 h-2.5" /> Tratamento de Erro
                  </span>
                )}
                {(lastTrace.status === 'invalid_op' || lastTrace.status === 'invalid_number') && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <AlertTriangle className="w-2.5 h-2.5" /> Entrada Inválida
                  </span>
                )}
              </div>
            </div>

            {/* Visual Variables Box */}
            <div className="grid grid-cols-4 gap-2 mb-2 text-center font-mono text-[11px]">
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-[9px] text-slate-500 uppercase block">num1 (float)</span>
                <span className="text-sky-300 font-bold">{lastTrace.n1 ?? '—'}</span>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-[9px] text-slate-500 uppercase block">operacao (str)</span>
                <span className="text-amber-300 font-bold">'{lastTrace.op}'</span>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-[9px] text-slate-500 uppercase block">num2 (float)</span>
                <span className="text-sky-300 font-bold">{lastTrace.n2 ?? '—'}</span>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-[9px] text-slate-500 uppercase block">resultado</span>
                <span className="text-emerald-300 font-bold">{lastTrace.result ?? '—'}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 flex items-start gap-1.5 leading-snug">
              <ArrowRight className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>{lastTrace.stepExplanation}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
