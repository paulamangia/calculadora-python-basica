import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/calculatorData';

export const QuizSection: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const score = calculateScore();
  const allAnswered = QUIZ_QUESTIONS.every((q) => selectedAnswers[q.id] !== undefined);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl p-5 sm:p-6" id="quiz">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <h2 className="text-base font-bold text-white">Desafio de Fixação para Iniciantes</h2>
          </div>
          <p className="text-xs text-slate-400">
            Teste se você assimilou os conceitos principais da calculadora em Python
          </p>
        </div>

        {showResults && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-lg text-xs font-semibold">
              <Trophy className="w-3.5 h-3.5" />
              <span>Pontuação: {score} / {QUIZ_QUESTIONS.length}</span>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-3 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Tentar novamente</span>
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {QUIZ_QUESTIONS.map((q, idx) => {
          const userAnswer = selectedAnswers[q.id];
          const isCorrect = userAnswer === q.correctIndex;

          return (
            <div
              key={q.id}
              className="p-4 bg-slate-950/50 rounded-lg border border-slate-800/80 space-y-3"
            >
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <h3 className="text-xs sm:text-sm font-semibold text-slate-100 leading-snug">
                  {q.question}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-7">
                {q.options.map((option, optIdx) => {
                  const isSelected = userAnswer === optIdx;
                  let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700';

                  if (showResults) {
                    if (optIdx === q.correctIndex) {
                      btnStyle = 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-medium';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-500/15 border-rose-500/40 text-rose-300';
                    } else {
                      btnStyle = 'bg-slate-900/60 border-slate-800/60 text-slate-500';
                    }
                  } else if (isSelected) {
                    btnStyle = 'bg-amber-500/20 border-amber-500/50 text-amber-200 font-medium';
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={showResults}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`text-left p-2.5 rounded-lg text-xs border transition-all flex items-center justify-between gap-2 ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {showResults && optIdx === q.correctIndex && (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      )}
                      {showResults && isSelected && !isCorrect && (
                        <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {showResults && (
                <div className={`ml-7 p-2.5 rounded text-xs leading-relaxed ${
                  isCorrect ? 'bg-emerald-500/10 text-emerald-300' : 'bg-amber-500/10 text-amber-300'
                }`}>
                  <span className="font-semibold">{isCorrect ? 'Parabéns! ' : 'Explicação: '}</span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}

        {!showResults && (
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setShowResults(true)}
              disabled={!allAnswered}
              className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all shadow-sm ${
                allAnswered
                  ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 active:scale-95'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {allAnswered ? 'Verificar Respostas' : 'Responda todas as perguntas para conferir'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
