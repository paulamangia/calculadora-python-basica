import React, { useState } from 'react';
import { 
  GitBranch, 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  Globe, 
  Terminal, 
  FolderGit2, 
  Sparkles, 
  FileText, 
  Tag, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { REPO_NAME_SUGGESTIONS, SUGGESTED_TOPICS, GENERATE_README_CONTENT } from '../data/githubGuideData';

export const GitHubPublisherGuide: React.FC = () => {
  const [selectedRepoIdx, setSelectedRepoIdx] = useState(0);
  const [authorName, setAuthorName] = useState('Paula');
  const [publishMethod, setPublishMethod] = useState<'web' | 'terminal' | 'vscode'>('web');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const currentRepo = REPO_NAME_SUGGESTIONS[selectedRepoIdx];
  const readmeText = GENERATE_README_CONTENT(currentRepo.name, authorName);

  const handleCopy = async (text: string, sectionId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(sectionId);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedSection(sectionId);
      setTimeout(() => setCopiedSection(null), 2000);
    }
  };

  const handleDownloadReadme = () => {
    const blob = new Blob([readmeText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'README.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl" id="github">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-800 bg-slate-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <GitBranch className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Guia Completo de Publicação no GitHub
            </h2>
            <p className="text-xs text-slate-400">
              Nome, descrição, tópicos e gerador do arquivo README.md para o seu portfólio
            </p>
          </div>
        </div>

        <a
          href="https://github.com/new"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors shrink-0"
        >
          <span>Abrir github.com/new</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>
      </div>

      <div className="p-5 sm:p-6 space-y-8">
        {/* Step 1: Suggested Names & Descriptions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-bold">1</span>
              <h3 className="text-sm font-bold text-white">Escolha o Nome e a Descrição do Repositório</h3>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline">Clique em uma das opções sugeridas</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {REPO_NAME_SUGGESTIONS.map((item, idx) => {
              const isSelected = selectedRepoIdx === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedRepoIdx(idx)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500/50 text-white shadow-sm'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-semibold text-amber-300">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-sans">
                        {item.tagline}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      {isSelected ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                          <span className="text-amber-300 font-medium">Selecionado</span>
                        </>
                      ) : (
                        'Clique para usar'
                      )}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(item.name, `name-${idx}`);
                      }}
                      className="px-2 py-0.5 rounded text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1"
                    >
                      {copiedSection === `name-${idx}` ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copiar nome</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Copy Box for GitHub Fields */}
          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800/80 space-y-3">
            <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Valores prontos para preencher na tela do GitHub:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 text-[11px] block">Repository name:</span>
                <div className="flex items-center justify-between p-2 bg-slate-900 border border-slate-800 rounded font-mono text-amber-300">
                  <span>{currentRepo.name}</span>
                  <button
                    onClick={() => handleCopy(currentRepo.name, 'current-name')}
                    className="p-1 hover:text-white text-slate-400"
                    title="Copiar nome"
                  >
                    {copiedSection === 'current-name' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 text-[11px] block">Description (opcional, mas muito recomendado):</span>
                <div className="flex items-center justify-between p-2 bg-slate-900 border border-slate-800 rounded text-slate-200">
                  <span className="truncate pr-2">{currentRepo.description}</span>
                  <button
                    onClick={() => handleCopy(currentRepo.description, 'current-desc')}
                    className="p-1 hover:text-white text-slate-400 shrink-0"
                    title="Copiar descrição"
                  >
                    {copiedSection === 'current-desc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Suggested Tags / Topics */}
            <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
              <span className="text-slate-400 text-[11px] flex items-center gap-1">
                <Tag className="w-3 h-3 text-sky-400" />
                Tags/Tópicos recomendados para adicionar nas opções do repositório:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_TOPICS.map((topic, tIdx) => (
                  <span
                    key={tIdx}
                    onClick={() => handleCopy(topic, `topic-${tIdx}`)}
                    className="px-2 py-0.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded text-[11px] font-mono text-sky-300 cursor-pointer flex items-center gap-1"
                    title="Clique para copiar esta tag"
                  >
                    <span>{topic}</span>
                    {copiedSection === `topic-${tIdx}` && <Check className="w-3 h-3 text-emerald-400" />}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Interactive README.md Generator */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-bold">2</span>
              <h3 className="text-sm font-bold text-white">Arquivo README.md Completo (A Vitrine do seu GitHub)</h3>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>Seu nome:</span>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Nome no rodapé"
                  className="px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-white w-28 focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                onClick={() => handleCopy(readmeText, 'readme')}
                className="flex items-center gap-1 px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded transition-colors"
              >
                {copiedSection === 'readme' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copiar README</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownloadReadme}
                className="flex items-center gap-1 px-2.5 py-1 text-xs bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold rounded transition-colors"
                title="Baixar arquivo README.md"
              >
                <Download className="w-3 h-3" />
                <span>Baixar README.md</span>
              </button>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs leading-relaxed max-h-72 overflow-y-auto text-slate-300 whitespace-pre-wrap select-all">
            {readmeText}
          </div>
        </div>

        {/* Step 3: Choose Publication Workflow */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-bold">3</span>
            <h3 className="text-sm font-bold text-white">Como Fazer o Upload para o Repositório</h3>
          </div>

          {/* Workflow Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-lg border border-slate-800 w-fit">
            <button
              onClick={() => setPublishMethod('web')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                publishMethod === 'web'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Opção A: Pelo Navegador (Sem comandos - Mais Fácil)</span>
            </button>
            <button
              onClick={() => setPublishMethod('terminal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                publishMethod === 'terminal'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Opção B: Via Terminal Git</span>
            </button>
            <button
              onClick={() => setPublishMethod('vscode')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                publishMethod === 'vscode'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Opção C: Pelo VS Code</span>
            </button>
          </div>

          {/* Workflow Content */}
          {publishMethod === 'web' && (
            <div className="p-5 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-4 text-xs">
              <div className="text-slate-300 leading-relaxed">
                Essa é a forma mais rápida e simples caso você ainda não tenha configurado chaves SSH ou o Git no seu terminal:
              </div>

              <ol className="space-y-3 pl-1">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">1</span>
                  <div>
                    <strong className="text-white">Crie o repositório no GitHub:</strong>
                    <p className="text-slate-400 mt-0.5">
                      Acesse <a href="https://github.com/new" target="_blank" rel="noreferrer" className="text-amber-400 underline">github.com/new</a>. Cole o nome <code className="text-amber-300">{currentRepo.name}</code> e a descrição. Marque o repositório como <strong>Public</strong>. Não precisa marcar README agora se você for subir o gerado aqui. Clique em <em>"Create repository"</em>.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">2</span>
                  <div>
                    <strong className="text-white">Envie os arquivos pelo navegador:</strong>
                    <p className="text-slate-400 mt-0.5">
                      Na página vazia que abrir, clique no link <em>"uploading an existing file"</em> (ou arraste os arquivos para a janela).
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">3</span>
                  <div>
                    <strong className="text-white">Arraste os dois arquivos essenciais:</strong>
                    <p className="text-slate-400 mt-0.5">
                      Arraste o seu arquivo <code className="text-sky-300">calculadora.py</code> e o arquivo <code className="text-sky-300">README.md</code> que você baixou acima.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">4</span>
                  <div>
                    <strong className="text-white">Confirme o envio (Commit changes):</strong>
                    <p className="text-slate-400 mt-0.5">
                      No campo de mensagem escreva: <code className="text-emerald-400 font-mono">Primeira versão da calculadora básica</code> e clique no botão verde <em>"Commit changes"</em>. Pronto! Seu projeto estará online no GitHub com a página linda.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          )}

          {publishMethod === 'terminal' && (
            <div className="p-5 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-4 text-xs">
              <div className="text-slate-300 leading-relaxed">
                Se você já possui o <strong>Git</strong> instalado e configurado na sua máquina, abra o terminal na pasta do seu projeto e rode:
              </div>

              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-amber-300 space-y-2 overflow-x-auto relative group">
                <button
                  onClick={() => handleCopy(`git init\ngit add .\ngit commit -m "feat: primeira versao da calculadora simples"\ngit branch -M main\ngit remote add origin https://github.com/SEU-USUARIO/${currentRepo.name}.git\ngit push -u origin main`, 'git-cmds')}
                  className="absolute top-2.5 right-2.5 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] flex items-center gap-1"
                >
                  {copiedSection === 'git-cmds' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSection === 'git-cmds' ? 'Copiado' : 'Copiar comandos'}</span>
                </button>

                <p className="text-slate-500"># 1. Iniciar o repositório local</p>
                <p>git init</p>
                <p className="text-slate-500"># 2. Adicionar os arquivos (calculadora.py e README.md)</p>
                <p>git add .</p>
                <p className="text-slate-500"># 3. Criar o primeiro commit</p>
                <p>git commit -m "feat: primeira versao da calculadora simples"</p>
                <p className="text-slate-500"># 4. Definir a branch principal como main</p>
                <p>git branch -M main</p>
                <p className="text-slate-500"># 5. Conectar com seu repositório no GitHub (troque SEU-USUARIO pelo seu username)</p>
                <p>git remote add origin https://github.com/<span className="text-sky-300 underline font-semibold">SEU-USUARIO</span>/{currentRepo.name}.git</p>
                <p className="text-slate-500"># 6. Enviar para o GitHub</p>
                <p>git push -u origin main</p>
              </div>
            </div>
          )}

          {publishMethod === 'vscode' && (
            <div className="p-5 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-3 text-xs">
              <div className="text-slate-300 leading-relaxed">
                Se você está usando o <strong>Visual Studio Code</strong>:
              </div>
              <ul className="space-y-2 text-slate-300 pl-4 list-disc">
                <li>Abra a pasta do projeto no VS Code (<code className="text-amber-300">Arquivo &gt; Abrir Pasta</code>).</li>
                <li>Clique no ícone de <strong>Controle de Versão</strong> na barra lateral esquerda (ou pressione <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300">Ctrl + Shift + G</kbd>).</li>
                <li>Clique no botão azul <strong>"Publicar no GitHub" (Publish to GitHub)</strong>.</li>
                <li>Escolha se prefere torná-lo <strong>Público</strong> (recomendado para portfólio de estudos) ou Privado.</li>
                <li>O VS Code fará o login na sua conta do GitHub e enviará tudo automaticamente com 1 clique!</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
