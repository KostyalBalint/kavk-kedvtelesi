import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { loadBank } from "../lib/banks.js";
import { useProgress } from "../lib/useProgress.js";
import QuestionCard from "../components/QuestionCard.jsx";

export default function Review() {
  const { bankId } = useParams();
  const [questions, setQuestions] = useState(null);
  const [error, setError] = useState(null);
  const { progress, recordAnswer } = useProgress(bankId);

  // Snapshot the failed queue once on mount so answering doesn't reshuffle the
  // list under us; we still read live `progress.failed` to know what's resolved.
  const [queue, setQueue] = useState(null);
  const [pos, setPos] = useState(0);
  const [qkey, setQkey] = useState(0);
  const [resolved, setResolved] = useState(0);

  useEffect(() => {
    loadBank(bankId)
      .then((qs) => {
        setQuestions(qs);
        setQueue(progress.failed.slice());
      })
      .catch((e) => setError(e.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bankId]);

  const byId = useMemo(() => {
    const m = new Map();
    (questions ?? []).forEach((q) => m.set(q.id, q));
    return m;
  }, [questions]);

  if (error) return <p className="p-6 text-center text-rose-600">{error}</p>;
  if (!questions || !queue)
    return <p className="p-6 text-center text-slate-400">Betöltés…</p>;

  const current = pos < queue.length ? byId.get(queue[pos]) : null;
  const remaining = progress.failed.length;

  if (!current) {
    return (
      <div className="flex flex-col items-center gap-4 p-8 text-center">
        <div className="text-5xl">{remaining === 0 ? "✅" : "📋"}</div>
        <h2 className="text-xl font-bold text-slate-800">
          {remaining === 0 ? "Nincs több hibás kérdés!" : "Kör vége"}
        </h2>
        <p className="text-slate-500">
          {resolved} kérdést javítottál ki ebben a körben.
          {remaining > 0 && ` Még ${remaining} hibás maradt.`}
        </p>
        <Link to="/" className="rounded-xl bg-brand px-5 py-3 font-semibold text-white">
          Bankok
        </Link>
      </div>
    );
  }

  function handleAnswer(isCorrect) {
    recordAnswer(current.id, isCorrect);
    if (isCorrect) setResolved((n) => n + 1);
  }

  function handleNext() {
    setQkey((k) => k + 1);
    setPos((p) => p + 1);
  }

  return (
    <div className="p-4">
      <div className="mb-3 flex items-center justify-between px-1">
        <Link to="/" className="text-sm font-medium text-brand">
          ← Vissza
        </Link>
        <span className="text-sm text-slate-500">{remaining} hibás maradt</span>
      </div>
      <QuestionCard
        key={qkey}
        question={current}
        onAnswer={handleAnswer}
        onNext={handleNext}
        footer={`Hibás kérdések · ${pos + 1} / ${queue.length}`}
      />
    </div>
  );
}
