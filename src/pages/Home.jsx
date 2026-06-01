import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadIndex } from "../lib/banks.js";
import { loadProgress } from "../lib/storage.js";
import ProgressBar from "../components/ProgressBar.jsx";

export default function Home() {
  const [banks, setBanks] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadIndex().then(setBanks).catch((e) => setError(e.message));
  }, []);

  if (error)
    return <p className="p-6 text-center text-rose-600">{error}</p>;
  if (!banks) return <p className="p-6 text-center text-slate-400">Betöltés…</p>;

  return (
    <div className="p-4">
      <header className="mb-4 px-1 pt-3">
        <h1 className="text-2xl font-bold text-slate-800">Hajós vizsga</h1>
        <p className="text-sm text-slate-500">
          Válassz kérdésbankot a gyakorláshoz
        </p>
      </header>

      <div className="flex flex-col gap-3">
        {banks.map((b) => {
          const p = loadProgress(b.id);
          const mastered = Object.keys(p.correct).length;
          return (
            <div key={b.id} className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="mb-1 flex items-baseline justify-between">
                <h2 className="text-base font-semibold text-slate-800">
                  {b.title}
                </h2>
                <span className="text-xs text-slate-400">{b.count} kérdés</span>
              </div>
              <ProgressBar value={mastered} max={b.count} className="mb-1" />
              <p className="mb-3 text-xs text-slate-400">
                {mastered}/{b.count} megtanult
                {p.failed.length > 0 && ` · ${p.failed.length} hibás`}
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => navigate(`/quiz/${b.id}/random`)}
                  className="rounded-lg bg-brand py-2.5 text-sm font-semibold text-white active:bg-brand-dark"
                >
                  Véletlen
                </button>
                <button
                  onClick={() => navigate(`/quiz/${b.id}/systematic`)}
                  className="rounded-lg bg-slate-700 py-2.5 text-sm font-semibold text-white active:bg-slate-800"
                >
                  Sorban
                </button>
                <button
                  onClick={() => navigate(`/review/${b.id}`)}
                  disabled={p.failed.length === 0}
                  className="rounded-lg bg-rose-500 py-2.5 text-sm font-semibold text-white active:bg-rose-600 disabled:bg-slate-200 disabled:text-slate-400"
                >
                  Hibás ({p.failed.length})
                </button>
              </div>
              <button
                onClick={() => navigate(`/study/${b.id}`)}
                className="mt-2 w-full rounded-lg border border-brand py-2.5 text-sm font-semibold text-brand active:bg-cyan-50"
              >
                📖 Tanulás (helyes válaszok)
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
