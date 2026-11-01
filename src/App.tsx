import React, { useState } from 'react';
import { Header } from './components/Header';
import { ModernCalculator } from './components/ModernCalculator';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { RecruiterHighlights } from './components/RecruiterHighlights';
import { Calculator, Terminal, CheckCircle2, Github, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'terminal'>('calculator');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans" id="inicio">
      {/* Top Bar Navigation */}
      <Header
        activeFilename="calculadora.py"
        activeCode={`# ========================================================
# CALCULADORA SIMPLES EM PYTHON
# ========================================================

print("========================================")
print("     CALCULADORA BÁSICA EM PYTHON       ")
print("========================================")
print("Operações: (+) Soma  (-) Subtração  (*) Multiplicação  (/) Divisão  (%) Porcentagem\\n")

num1 = float(input("Digite o primeiro número: "))
operacao = input("Digite a operação (+, -, *, /, %): ")
num2 = float(input("Digite o segundo número: "))

if operacao == "+":
    resultado = num1 + num2
    print(f"\\n✅ Resultado: {num1} + {num2} = {resultado}")

elif operacao == "-":
    resultado = num1 - num2
    print(f"\\n✅ Resultado: {num1} - {num2} = {resultado}")

elif operacao == "*":
    resultado = num1 * num2
    print(f"\\n✅ Resultado: {num1} * {num2} = {resultado}")

elif operacao == "/":
    if num2 == 0:
        print("\\n❌ Erro: Não é possível dividir um número por zero!")
    else:
        resultado = num1 / num2
        print(f"\\n✅ Resultado: {num1} / {num2} = {resultado}")

elif operacao == "%":
    resultado = (num1 * num2) / 100
    print(f"\\n✅ Resultado: {num1}% de {num2} = {resultado}")

else:
    print("\\n⚠️ Erro: Operação inválida! Escolha apenas +, -, *, / ou %.")
`}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* Author & Profile Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 p-0.5">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-bold text-amber-400 text-sm">
                PM
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white">Paula Mangia</h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="w-2.5 h-2.5" /> Disponível para Oportunidades
                </span>
              </div>
              <p className="text-xs text-slate-400">Calculadora em Python · Lógica & Interface Interativa</p>
            </div>
          </div>

          <a
            href="https://github.com/paulamangia/calculadora-python-basica"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700/80 transition-all shadow-sm"
          >
            <Github className="w-4 h-4" />
            <span>Repositório GitHub</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>

        {/* Live Calculator Section */}
        <section className="space-y-4" id="calculadora">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Calculadora Interativa
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Experimente a calculadora gráfica ou teste diretamente no simulador de terminal Python.
              </p>
            </div>

            {/* View Switcher Tabs */}
            <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-xl">
              <button
                onClick={() => setActiveTab('calculator')}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'calculator'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Calculadora Visual</span>
              </button>
              <button
                onClick={() => setActiveTab('terminal')}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  activeTab === 'terminal'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Terminal Python</span>
              </button>
            </div>
          </div>

          {activeTab === 'calculator' ? (
            <ModernCalculator />
          ) : (
            <InteractiveTerminal />
          )}
        </section>

        {/* Technical Highlights for Recruiters */}
        <RecruiterHighlights />
      </main>

      {/* Clean Footer */}
      <footer className="mt-16 border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Paula Mangia</span>
            <span aria-hidden="true">·</span>
            <span>Calculadora Python (Básica + Porcentagem)</span>
          </div>
          <a
            href="https://github.com/paulamangia/calculadora-python-basica"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-amber-400 transition-colors"
          >
            github.com/paulamangia/calculadora-python-basica
          </a>
        </div>
      </footer>
    </div>
  );
}
