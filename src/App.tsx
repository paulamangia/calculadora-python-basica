import React, { useState } from 'react';
import { Header } from './components/Header';
import { CodeViewer } from './components/CodeViewer';
import { LineExplainer } from './components/LineExplainer';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ModernCalculator } from './components/ModernCalculator';
import { RecruiterHighlights } from './components/RecruiterHighlights';
import { FundamentalsGuide } from './components/FundamentalsGuide';
import { GitHubPublisherGuide } from './components/GitHubPublisherGuide';
import { QuizSection } from './components/QuizSection';
import { CALCULATOR_TEMPLATES, CodeLineAnnotation } from './data/calculatorData';
import { Terminal, Code2, GitBranch, Calculator, Sparkles, CheckCircle2, Github, ExternalLink } from 'lucide-react';

export default function App() {
  const [currentLevel, setCurrentLevel] = useState<'basic' | 'functions' | 'loop'>('basic');
  const [selectedAnnotation, setSelectedAnnotation] = useState<CodeLineAnnotation | null>(null);
  const [activeTab, setActiveTab] = useState<'calculator' | 'terminal'>('calculator');

  const activeTemplate = CALCULATOR_TEMPLATES[currentLevel];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans" id="inicio">
      {/* Top Bar Navigation */}
      <Header
        activeFilename={activeTemplate.filename}
        activeCode={activeTemplate.code}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-12">
        {/* Hero Section & Developer Profile */}
        <div className="space-y-6 pt-2">
          {/* Recruiter Badge / Author Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-indigo-500 p-0.5">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-bold text-amber-400 text-sm">
                  PM
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">Paula Mangia</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="w-2.5 h-2.5" /> Disponível para Oportunidades
                  </span>
                </div>
                <p className="text-xs text-slate-400">Desenvolvimento de Software · Python & Frontend Moderno</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com/paulamangia"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg border border-slate-700/60 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub @paulamangia</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-medium">
              <span className="text-amber-400 font-semibold">Portfólio de Engenharia</span>
              <span aria-hidden="true">·</span>
              <span>Python 3.8+ & React 19</span>
              <span aria-hidden="true">·</span>
              <span>5 Operações (+, -, *, /, %)</span>
              <span aria-hidden="true">·</span>
              <span>Validação Defensiva & Testes</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance max-w-4xl">
              Calculadora em Python: Lógica Pura & Apresentação Interativa
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
              Projeto demonstrando conceitos essenciais de engenharia de software: 
              <strong className="text-white font-semibold"> tipagem defensiva</strong>, 
              <strong className="text-white font-semibold"> prevenção de falhas em runtime</strong>, 
              <strong className="text-white font-semibold"> evolução arquitetural (modularidade e DRY)</strong> e 
              uma interface moderna projetada para recrutadores e desenvolvedores.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="#calculadora"
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs rounded-lg transition-colors shadow-sm active:scale-95"
            >
              <Calculator className="w-4 h-4" />
              <span>Experimentar Calculadora Online</span>
            </a>
            <a
              href="#recrutadores"
              className="flex items-center gap-2 px-4 py-2.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold text-xs rounded-lg transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Destaques Técnicos do Projeto</span>
            </a>
            <a
              href="#codigo"
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs rounded-lg transition-colors"
            >
              <Code2 className="w-4 h-4" />
              <span>Inspecionar Código Fonte</span>
            </a>
          </div>
        </div>

        {/* Section: Recruiter Highlights Card */}
        <RecruiterHighlights />

        {/* Section: Live Interactive Showcase (Calculator & Terminal) */}
        <section className="space-y-4" id="calculadora">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                01. Demonstração Interativa em Tempo Real
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Alterne entre a Calculadora Gráfica com suporte a porcentagem e o Simulador de Terminal Python.
              </p>
            </div>

            {/* View Switcher Tabs */}
            <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-lg">
              <button
                onClick={() => setActiveTab('calculator')}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
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
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
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

        {/* Section: Code Viewer & Line-by-Line Breakdown */}
        <section className="space-y-6" id="codigo">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                02. Código Fonte & Níveis de Maturidade
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Inspecione a evolução do script em Python: do código básico às boas práticas com funções modulares e loops seguros.
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

        {/* Section: Fundamentals & How to run locally */}
        <section className="space-y-4" id="fundamentos">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-xl font-bold text-white tracking-tight">
              03. Guia de Fundamentos & Execução Local
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Instruções de instalação, comandos de terminal e conceitos-chave da linguagem Python.
            </p>
          </div>

          <FundamentalsGuide />
        </section>

        {/* Section: GitHub Publisher Guide & README Generator */}
        <section className="space-y-4" id="github">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-xl font-bold text-white tracking-tight">
              04. Versionamento & Publicação no GitHub
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Boas práticas de Git, commits semânticos e estrutura profissional de documentação.
            </p>
          </div>

          <GitHubPublisherGuide />
        </section>

        {/* Section: Quiz Challenge */}
        <section className="space-y-4" id="quiz">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-xl font-bold text-white tracking-tight">
              05. Desafio de Fixação
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Perguntas técnicas para reforçar conceitos de controle de fluxo e tipagem em Python.
            </p>
          </div>

          <QuizSection />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-900 bg-slate-950 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Paula Mangia</span>
            <span aria-hidden="true">·</span>
            <span>Portfólio de Software: Calculadora Python & Aplicação Web Interativa</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/paulamangia/calculadora-python-basica"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-amber-400 transition-colors"
            >
              GitHub Repository
            </a>
            <span aria-hidden="true">·</span>
            <a href="#inicio" className="text-slate-400 hover:text-amber-400 transition-colors">
              Voltar ao Topo ↑
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
