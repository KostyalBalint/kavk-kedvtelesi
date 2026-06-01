import { useEffect, useState } from "react";
import { loadIndex } from "../lib/banks.js";
import { loadProgress, resetBank, summarize } from "../lib/storage.js";
import ProgressBar from "../components/ProgressBar.jsx";

export default function Stats() {
  const [banks, setBanks] = useState(null);
  const [tick, setTick] = useState(0); // re-read storage after reset
  const [error, setError] = useState(null);

  useEffect(() => {
    loadIndex().then(setBanks).catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="p-6 text-center text-rose-600">{error}</p>;
  if (!banks) return <p className="p-6 text-center text-slate-400">Betöltés…</p>;

  function handleReset(bankId, title) {
    if (window.confirm(`Biztosan törlöd a haladást? (${title})`)) {
      resetBank(bankId);
      setTick((t) => t + 1);
    }
  }

  return (
    <div className="p-4" key={tick}>
      <header className="mb-4 px-1 pt-3">
        <h1 className="text-2xl font-bold text-slate-800">Haladás</h1>
        <p className="text-sm text-slate-500">Bankonkénti statisztika</p>
      </header>

      <div className="flex flex-col gap-3">
        {banks.map((b) => {
          const s = summarize(loadProgress(b.id), b.count);
          return (
            <div key={b.id} className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="mb-2 flex items-baseline justify-between">
                <h2 className="text-base font-semibold text-slate-800">
                  {b.title}
                </h2>
                <span className="text-xs text-slate-400">
                  {Math.round((s.mastered / s.total) * 100)}%
                </span>
              </div>
              <ProgressBar value={s.mastered} max={s.total} className="mb-3" />
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <Stat label="Megtanult" value={`${s.mastered}/${s.total}`} />
                <Stat label="Megválaszolt" value={s.answered} />
                <Stat label="Hibás" value={s.failed} accent="text-rose-600" />
              </div>
              <button
                onClick={() => handleReset(b.id, b.title)}
                className="mt-3 w-full rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-500 active:bg-slate-50"
              >
                Haladás törlése
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ label, value, accent = "text-slate-800" }) {
  return (
    <div className="rounded-lg bg-slate-50 py-2">
      <div className={`text-lg font-bold ${accent}`}>{value}</div>
      <div className="text-[11px] text-slate-400">{label}</div>
    </div>
  );
}
