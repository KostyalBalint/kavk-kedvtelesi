import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { loadBank } from "../lib/banks.js";
import { pickRandom } from "../lib/shuffle.js";
import { useProgress } from "../lib/useProgress.js";
import QuestionCard from "../components/QuestionCard.jsx";

export default function Quiz() {
  const { bankId, mode } = useParams();
  const [questions, setQuestions] = useState(null);
  const [error, setError] = useState(null);
  const { progress, recordAnswer, setCursor } = useProgress(bankId);

  const [idx, setIdx] = useState(0); // index into questions (systematic)
  const [current, setCurrent] = useState(null); // current question object
  const [done, setDone] = useState(false);
  const [seen, setSeen] = useState(0);
  const [right, setRight] = useState(0);
  const [qkey, setQkey] = useState(0); // forces QuestionCard remount on advance

  const startCursor = useRef(progress.cursor);

  useEffect(() => {
    loadBank(bankId)
      .then((qs) => {
        setQuestions(qs);
        if (mode === "random") {
          setCurrent(pickRandom(qs));
        } else {
          const start = Math.min(startCursor.current, qs.length - 1);
          setIdx(start);
          setCurrent(qs[start] ?? null);
        }
      })
      .catch((e) => setError(e.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bankId, mode]);

  if (error) return <p className="p-6 text-center text-rose-600">{error}</p>;
  if (!questions) return <p className="p-6 text-center text-slate-400">Betöltés…</p>;

  const total = questions.length;

  if (done) {
    return <Done bankId={bankId} seen={seen} right={right} />;
  }
  if (!current) return <p className="p-6 text-center text-slate-400">Betöltés…</p>;

  function handleAnswer(isCorrect) {
    recordAnswer(current.id, isCorrect);
    setSeen((n) => n + 1);
    if (isCorrect) setRight((n) => n + 1);
  }

  function handleNext() {
    setQkey((k) => k + 1);
    if (mode === "random") {
      setCurrent(pickRandom(questions));
      return;
    }
    const nextIdx = idx + 1;
    if (nextIdx >= total) {
      setCursor(0);
      setDone(true);
      return;
    }
    setCursor(nextIdx);
    setIdx(nextIdx);
    setCurrent(questions[nextIdx]);
  }

  const footer =
    mode === "systematic"
      ? `${idx + 1} / ${total} kérdés`
      : "Véletlen kérdés";

  return (
    <div className="p-4">
      <div className="mb-3 flex items-center justify-between px-1">
        <Link to="/" className="text-sm font-medium text-brand">
          ← Vissza
        </Link>
        <span className="text-sm text-slate-500">
          {right}/{seen} helyes
        </span>
      </div>
      <QuestionCard
        key={qkey}
        question={current}
        onAnswer={handleAnswer}
        onNext={handleNext}
        footer={footer}
      />
    </div>
  );
}

function Done({ bankId, seen, right }) {
  return (
    <div className="flex flex-col items-center gap-4 p-8 text-center">
      <div className="text-5xl">🎉</div>
      <h2 className="text-xl font-bold text-slate-800">Végigértél a bankon!</h2>
      <p className="text-slate-500">
        {right}/{seen} helyes válasz ebben a körben.
      </p>
      <div className="mt-2 flex gap-3">
        <Link
          to="/"
          className="rounded-xl bg-brand px-5 py-3 font-semibold text-white"
        >
          Bankok
        </Link>
      </div>
    </div>
  );
}
