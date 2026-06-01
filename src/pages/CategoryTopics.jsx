import { Link, useParams } from "react-router-dom";
import { CATEGORIES } from "./Materials.jsx";

export default function CategoryTopics() {
  const { cat } = useParams();
  const c = CATEGORIES.find((x) => x.id === cat);

  if (!c) {
    return (
      <div className="p-6 text-center text-slate-500">
        <p>Ismeretlen témakör.</p>
        <Link to="/materials" className="mt-3 inline-block text-brand">
          ← Tananyag
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-3 px-1">
        <Link to="/materials" className="text-sm font-medium text-brand">
          ← Tananyag
        </Link>
      </div>

      <header className="mb-4 flex items-center gap-3 px-1">
        <span className="text-3xl leading-none">{c.icon}</span>
        <div>
          <h1 className="text-xl font-bold text-slate-800">{c.title}</h1>
          <p className="text-sm text-slate-500">{c.subtitle}</p>
        </div>
      </header>

      {c.topics.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center text-slate-400 shadow-sm">
          Hamarosan elérhető.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {c.topics.map((t) => (
            <Link
              key={t.id}
              to={`/materials/${c.id}/${t.id}`}
              className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm active:bg-slate-50"
            >
              <span className="text-3xl leading-none">{t.icon}</span>
              <div className="min-w-0">
                <h2 className="text-base font-semibold text-slate-800">{t.title}</h2>
                <p className="text-sm text-slate-500">{t.subtitle}</p>
              </div>
              <span className="ml-auto text-slate-300">›</span>
            </Link>
          ))}
        </div>
      )}

      {c.id === "hsz" && (
        <p className="mt-6 px-1 text-xs leading-relaxed text-slate-400">
          Forrás: 57/2011. (XI. 22.) NFM rendelet – Hajózási Szabályzat
          (belvízi), valamint a Nemzetközi Jelzési Kódex (ICS) kódlobogói.
        </p>
      )}
    </div>
  );
}
