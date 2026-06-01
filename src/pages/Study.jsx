import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { imageUrl, loadBank, loadIndex } from "../lib/banks.js";

export default function Study() {
  const { bankId } = useParams();
  const [questions, setQuestions] = useState(null);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    Promise.all([loadBank(bankId), loadIndex()])
      .then(([qs, idx]) => {
        setQuestions(qs);
        setTitle(idx.find((b) => b.id === bankId)?.title ?? bankId);
      })
      .catch((e) => setError(e.message));
  }, [bankId]);

  const filtered = useMemo(() => {
    if (!questions) return [];
    const q = query.trim().toLowerCase();
    if (!q) return questions;
    return questions.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.options.some((o) => o.text.toLowerCase().includes(q))
    );
  }, [questions, query]);

  if (error) return <p className="p-6 text-center text-rose-600">{error}</p>;
  if (!questions) return <p className="p-6 text-center text-slate-400">Betöltés…</p>;

  return (
    <div className="p-4">
      <div className="mb-3 flex items-center justify-between px-1">
        <Link to="/" className="text-sm font-medium text-brand">
          ← Vissza
        </Link>
        <span className="text-sm text-slate-500">{filtered.length} kérdés</span>
      </div>

      <header className="mb-3 px-1">
        <h1 className="text-xl font-bold text-slate-800">{title}</h1>
        <p className="text-sm text-slate-500">Tanulás – helyes válaszok</p>
      </header>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Keresés a kérdések közt…"
        className="mb-4 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
      />

      <div className="flex flex-col gap-3">
        {filtered.map((item) => {
          const img = imageUrl(item.image);
          return (
            <div key={item.id} className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="mb-1.5 text-xs font-medium text-slate-400">
                #{item.number}
              </div>
              <p className="text-[15px] font-semibold leading-snug text-slate-800">
                {item.question}
              </p>
              {img && (
                <img
                  src={img}
                  alt=""
                  loading="lazy"
                  className="mt-3 max-h-56 w-full rounded-lg object-contain"
                />
              )}
              <ul className="mt-3 flex flex-col gap-1.5">
                {item.options.map((opt, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-2 rounded-lg px-3 py-2 text-sm leading-snug ${
                      opt.correct
                        ? "bg-emerald-50 font-medium text-emerald-900"
                        : "text-slate-400"
                    }`}
                  >
                    <span className="mt-px">{opt.correct ? "✓" : "·"}</span>
                    <span>{opt.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-slate-400">Nincs találat.</p>
        )}
      </div>
    </div>
  );
}
