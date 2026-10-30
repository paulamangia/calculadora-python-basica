import React, { useState } from 'react';
import { Header } from './components/Header';
import { CodeViewer } from './components/CodeViewer';
import { LineExplainer } from './components/LineExplainer';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { FundamentalsGuide } from './components/FundamentalsGuide';
import { GitHubPublisherGuide } from './components/GitHubPublisherGuide';
import { QuizSection } from './components/QuizSection';
import { CALCULATOR_TEMPLATES, CodeLineAnnotation } from './data/calculatorData';
import { Sparkles, Terminal, Code2, ArrowDown, BookOpen, GitBranch } from 'lucide-react';

export default function App() {
  const [currentLevel, setCurrentLevel] = useState<'basic' | 'functions' | 'loop'>('basic');
  const [selectedAnnotation, setSelectedAnnotation] = useState<CodeLineAnnotation | null>(null);

  const activeTemplate = CALCULATOR_TEMPLATES[currentLevel];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans" id="inicio">
      {/* Top Bar Navigation */}
      <Header
        activeFilename={activeTemplate.filename}
        activeCode={activeTemplate.code}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* Hero Section */}
        <div className="space-y-4 pt-2">
          {/* Metadata line (Zero-pill discipline) */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-medium">
            <span>Guia Passo a Passo</span>
            <span aria-hidden="true">·</span>
            <span>Python 3.8+</span>
            <span aria-hidden="true">·</span>
            <span>4 Operações Básicas (+, -, *, /)</span>
            <span aria-hidden="true">·</span>
            <span>Sem dependências externas</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance max-w-3xl">
            Calculadora Simples em Python para Iniciantes
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Bem-vindo ao mundo da programação! Criar uma calculadora é o projeto clássico e perfeito para aprender 
            <strong className="text-white font-semibold"> entrada de dados (`input`)</strong>, 
            <strong className="text-white font-semibold"> conversão de números (`float`)</strong>, 
            <strong className="text-white font-semibold"> tomada de decisões (`if/elif/else`)</strong> e 
            <strong className="text-white font-semibold"> prevenção de erros matemáticos</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#codigo"
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs rounded-lg transition-colors shadow-sm active:scale-95"
            >
              <Code2 className="w-4 h-4" />
              <span>Ver Código & Explicação</span>
            </a>
            <a
              href="#simulador"
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs rounded-lg transition-colors"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Testar no Simulador</span>
            </a>
            <a
              href="#github"
              className="flex items-center gap-2 px-4 py-2.5 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 font-semibold text-xs rounded-lg transition-colors"
            >
              <GitBranch className="w-4 h-4" />
              <span>Como Publicar no GitHub</span>
            </a>
          </div>
        </div>

        {/* Section 1: Code Viewer & Line-by-Line Breakdown */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                01. Código Fonte Organizado
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Alterne entre os níveis de maturidade e clique nas linhas para inspecionar os componentes.
              </p>
            </div>
            <div className="text-xs text-amber-400/90 font-mono">
              {activeTemplate.badge}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <CodeViewer
              currentLevel={currentLevel}
              onLevelChange={setCurrentLevel}
              selectedAnnotation={selectedAnnotation}
              onSelectAnnotation={setSelectedAnnotation}
            />

            <LineExplainer
              selectedAnnotation={selectedAnnotation}
              annotations={activeTemplate.annotations}
              onSelect={setSelectedAnnotation}
            />
          </div>
        </section>

        {/* Section 2: Interactive Terminal Simulator */}
        <section className="space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-xl font-bold text-white tracking-tight">
              02. Simulador Interativo do Terminal
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Experimente contas reais, veja o comportamento do terminal e o estado das variáveis na memória.
            </p>
          </div>

          <InteractiveTerminal />
        </section>

        {/* Section 3: Fundamentals & How to run locally */}
        <section className="space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-xl font-bold text-white tracking-tight">
              03. Guia de Fundamentos & Execução Local
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Tudo o que você precisa saber para entender a sintaxe e rodar o script no seu computador.
            </p>
          </div>

          <FundamentalsGuide />
        </section>

        {/* Section 4: GitHub Publisher Guide & README Generator */}
        <section className="space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-xl font-bold text-white tracking-tight">
              04. Publicando seu Projeto no GitHub
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Modelos de nome, descrição, tópicos e arquivo README.md prontos para o seu portfólio.
            </p>
          </div>

          <GitHubPublisherGuide />
        </section>

        {/* Section 5: Quiz Challenge */}
        <section className="space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-xl font-bold text-white tracking-tight">
              05. Desafio de Fixação
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Confirme seu aprendizado respondendo às 4 perguntas fundamentais sobre o programa.
            </p>
          </div>

          <QuizSection />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-900 bg-slate-950 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">PythonCalc Tutorial</span>
            <span aria-hidden="true">·</span>
            <span>Material educativo em Python para iniciantes</span>
          </div>
          <div>
            Pratique modificando o código e adicionando novas operações (ex: exponenciação com **).
          </div>
        </div>
      </footer>
    </div>
  );
}
