import { Link } from "react-router-dom";

export const TOPICS = [
  {
    id: "gombok-kupok",
    icon: "⚫",
    title: "Gömbök, kúpok",
    subtitle: "Nappali jelzések – alakzatok és jelentésük",
  },
  {
    id: "zaszlok",
    icon: "🚩",
    title: "Zászlók",
    subtitle: "Lobogóviselés és nemzetközi kódlobogók",
  },
  {
    id: "fenyek",
    icon: "💡",
    title: "Fények (Lights)",
    subtitle: "Éjszakai navigációs fényjelzések",
  },
];

export default function Materials() {
  return (
    <div className="p-4">
      <div className="mb-3 px-1">
        <Link to="/" className="text-sm font-medium text-brand">
          ← Vissza
        </Link>
      </div>

      <header className="mb-4 px-1">
        <h1 className="text-2xl font-bold text-slate-800">Tananyag</h1>
        <p className="text-sm text-slate-500">
          Hajózási jelzések – nappali alakzatok, lobogók, éjszakai fények
        </p>
      </header>

      <div className="flex flex-col gap-3">
        {TOPICS.map((t) => (
          <Link
            key={t.id}
            to={`/materials/${t.id}`}
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

      <p className="mt-6 px-1 text-xs leading-relaxed text-slate-400">
        Forrás: 57/2011. (XI. 22.) NFM rendelet – Hajózási Szabályzat (belvízi),
        valamint a Nemzetközi Jelzési Kódex (ICS) kódlobogói.
      </p>
    </div>
  );
}
