import { NavLink } from "react-router-dom";

const items = [
  { to: "/", label: "Bankok", icon: "🏠", end: true },
  { to: "/stats", label: "Haladás", icon: "📊" },
];

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 mx-auto max-w-md border-t border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.end}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-0.5 py-2.5 text-xs font-medium transition-colors ${
                isActive ? "text-brand" : "text-slate-500"
              }`
            }
          >
            <span className="text-lg leading-none">{it.icon}</span>
            {it.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
