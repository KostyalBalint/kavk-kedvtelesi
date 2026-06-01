import { useMemo, useState } from "react";
import { imageUrl } from "../lib/banks.js";
import { shuffle } from "../lib/shuffle.js";

// Renders a single question. Calls onAnswer(isCorrect) once, then onNext().
export default function QuestionCard({ question, onAnswer, onNext, footer }) {
  const [chosen, setChosen] = useState(null);

  // Shuffle options once per question (re-derives when question.id changes).
  const options = useMemo(() => shuffle(question.options), [question.id]);
  const img = imageUrl(question.image);

  const answered = chosen !== null;

  function choose(idx) {
    if (answered) return;
    setChosen(idx);
    onAnswer(options[idx].correct);
  }

  function next() {
    setChosen(null);
    onNext();
  }

  function optionClass(idx) {
    if (!answered) {
      return "border-slate-200 bg-white active:bg-slate-50";
    }
    if (options[idx].correct) {
      return "border-emerald-500 bg-emerald-50 text-emerald-900";
    }
    if (idx === chosen) {
      return "border-rose-500 bg-rose-50 text-rose-900";
    }
    return "border-slate-200 bg-white opacity-60";
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        {footer && (
          <div className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
            {footer}
          </div>
        )}
        <p className="text-base font-semibold leading-snug text-slate-800">
          {question.question}
        </p>
        {img && (
          <img
            src={img}
            alt=""
            loading="lazy"
            className="mt-3 max-h-64 w-full rounded-lg object-contain"
          />
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => choose(idx)}
            disabled={answered}
            className={`w-full rounded-xl border-2 px-4 py-3 text-left text-[15px] leading-snug transition-colors ${optionClass(
              idx
            )}`}
          >
            <span className="flex items-start gap-2">
              {answered && options[idx].correct && <span>✓</span>}
              {answered && idx === chosen && !options[idx].correct && <span>✗</span>}
              <span>{opt.text}</span>
            </span>
          </button>
        ))}
      </div>

      {answered && (
        <button
          onClick={next}
          className="mt-1 w-full rounded-xl bg-brand py-3.5 text-base font-semibold text-white active:bg-brand-dark"
        >
          Következő →
        </button>
      )}
    </div>
  );
}
