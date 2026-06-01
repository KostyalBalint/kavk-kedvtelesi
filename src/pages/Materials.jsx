import { Link } from "react-router-dom";
import { KISHAJO_TOPICS } from "../data/kishajo.js";

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
  {
    id: "tablak",
    icon: "🪧",
    title: "Táblák",
    subtitle: "Parti jelzőtáblák – tiltó, kötelező, korlátozó, tájékoztató",
  },
  {
    id: "bojak",
    icon: "🟢",
    title: "Bóják, hajóút",
    subtitle: "Laterális kitűzőjelek és a hajóút jelölése",
  },
  {
    id: "hangjelzesek",
    icon: "🔊",
    title: "Hangjelzések",
    subtitle: "Rövid/hosszú hangok és jelentésük",
  },
  {
    id: "kiteres",
    icon: "↔️",
    title: "Kitérés, elsőbbség",
    subtitle: "Találkozás, keresztezés, kitérési szabályok",
  },
];

// Top-level study categories. HSZ holds the current material; the others are
// placeholders to be filled later.
export const CATEGORIES = [
  {
    id: "hsz",
    icon: "📕",
    title: "Hajózási Szabályzat (HSZ)",
    subtitle: "Jelzések, táblák, fények, bóják, hangjelek, kitérés",
    topics: TOPICS,
  },
  {
    id: "kishajo",
    icon: "🚤",
    title: "Kishajó",
    subtitle: "Motor, hajótest, manőver, biztonság, időjárás",
    topics: KISHAJO_TOPICS,
  },
  {
    id: "tengeri",
    icon: "⚓",
    title: "Tengeri IV. osztály",
    subtitle: "Hamarosan",
    topics: [],
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
        <p className="text-sm text-slate-500">Válassz témakört</p>
      </header>

      <div className="flex flex-col gap-3">
        {CATEGORIES.map((c) => {
          const empty = c.topics.length === 0;
          return (
            <Link
              key={c.id}
              to={`/materials/${c.id}`}
              className={`flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm active:bg-slate-50 ${
                empty ? "opacity-60" : ""
              }`}
            >
              <span className="text-3xl leading-none">{c.icon}</span>
              <div className="min-w-0">
                <h2 className="text-base font-semibold text-slate-800">{c.title}</h2>
                <p className="text-sm text-slate-500">
                  {empty ? "Hamarosan" : `${c.topics.length} témakör`}
                </p>
              </div>
              <span className="ml-auto text-slate-300">›</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
