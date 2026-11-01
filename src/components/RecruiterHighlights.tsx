import React from 'react';
import { CheckCircle2, ShieldCheck, GitBranch, Layers, Award, Github, ExternalLink, Terminal } from 'lucide-react';

export const RecruiterHighlights: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl" id="recrutadores">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Para Recrutadores & Engenheiros de Software</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Destaques de Engenharia & Qualidade do Projeto
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Resumo dos conceitos, padrões de código e decisões arquiteturais aplicadas neste repositório.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/paulamangia/calculadora-python-basica"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-lg transition-colors shadow-sm"
          >
            <Github className="w-4 h-4" />
            <span>Repositório GitHub</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Grid of 4 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pillar 1 */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-white">Programação Defensiva</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Tratamento rigoroso para evitar exceções críticas (<code className="text-sky-300">ZeroDivisionError</code>) e validação de operadores desconhecidos via cláusula segura.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
            <Layers className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-white">Evolução Arquitetural</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Demonstração de maturidade progressiva: do código sequencial para modularização em funções (<code className="text-sky-300">def</code>) e resiliência com <code className="text-sky-300">try/except</code>.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all space-y-2">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/20">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-white">Testes Automatizados</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            100% de aprovação nos cenários de teste unitário das operações básicas (<code className="text-sky-300">+</code>, <code className="text-sky-300">-</code>, <code className="text-sky-300">*</code>, <code className="text-sky-300">/</code>) e porcentagem (<code className="text-sky-300">%</code>).
          </p>
        </div>

        {/* Pillar 4 */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all space-y-2">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
            <GitBranch className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-white">Boas Práticas de Git</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Histórico semântico com commits estruturados (<code className="text-sky-300">Conventional Commits</code>), README técnico completo com badges e guias de execução.
          </p>
        </div>
      </div>

      {/* Code Standards Checklist */}
      <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="flex items-center gap-1.5 text-slate-300 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> PEP 8 Compliance
          </span>
          <span className="flex items-center gap-1.5 text-slate-300 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Zero Dependências Externas em Python
          </span>
          <span className="flex items-center gap-1.5 text-slate-300 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Tipagem Estrita TypeScript
          </span>
          <span className="flex items-center gap-1.5 text-slate-300 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Interface Responsiva Mobile-First
          </span>
        </div>
        <span className="text-[11px] text-slate-500 font-mono">
          Desenvolvido por Paula Mangia
        </span>
      </div>
    </div>
  );
};
