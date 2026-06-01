// Self-rendered SVG diagrams for the study materials (no external images).
// Colors map to the Hajózási Szabályzat signal colors.

const PAINT = {
  black: "#1f2937",
  red: "#dc2626",
  green: "#16a34a",
  yellow: "#facc15",
  blue: "#2563eb",
  white: "#f8fafc",
};

const stroke = "#475569";

// ---- Day shapes (nappali jelzések) -------------------------------------

export function DayShape({ kind, color = "black", count = 1, size = 64 }) {
  const fill = PAINT[color] ?? color;
  const w = size;
  const pad = 4;
  const pitch = size * 0.82; // vertical spacing between stacked shapes
  const h = (count > 1 ? (count - 1) * pitch + size : size) + pad * 2;

  const draw = (k, cx, cy, s) => {
    switch (k) {
      case "ball":
        return <circle cx={cx} cy={cy} r={s * 0.42} fill={fill} stroke={stroke} />;
      case "cone": // point up
        return (
          <polygon
            points={`${cx},${cy - s * 0.45} ${cx - s * 0.4},${cy + s * 0.4} ${cx + s * 0.4},${cy + s * 0.4}`}
            fill={fill}
            stroke={stroke}
            strokeLinejoin="round"
          />
        );
      case "cone-down": // point down
        return (
          <polygon
            points={`${cx},${cy + s * 0.45} ${cx - s * 0.4},${cy - s * 0.4} ${cx + s * 0.4},${cy - s * 0.4}`}
            fill={fill}
            stroke={stroke}
            strokeLinejoin="round"
          />
        );
      case "cylinder":
        return (
          <g fill={fill} stroke={stroke} strokeLinejoin="round">
            <rect x={cx - s * 0.3} y={cy - s * 0.42} width={s * 0.6} height={s * 0.84} rx={s * 0.04} />
          </g>
        );
      case "doublecone": {
        // two cones joined base-to-base → diamond; two triangles share the
        // horizontal middle edge (left-mid ↔ right-mid).
        const lx = cx - s * 0.4;
        const rx = cx + s * 0.4;
        return (
          <g fill={fill} stroke={stroke} strokeLinejoin="round">
            <polygon points={`${cx},${cy - s * 0.45} ${lx},${cy} ${rx},${cy}`} />
            <polygon points={`${cx},${cy + s * 0.45} ${lx},${cy} ${rx},${cy}`} />
          </g>
        );
      }
      default:
        return null;
    }
  };

  const items = [];
  for (let i = 0; i < count; i++) {
    const cy = pad + size / 2 + i * pitch;
    items.push(<g key={i}>{draw(kind, w / 2, cy, size * 0.9)}</g>);
  }

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0">
      {items}
    </svg>
  );
}

// ---- Navigation lights: top-view sector diagram -----------------------
// A boat seen from above (bow up). Each light is drawn as the colored arc
// (visibility sector) an observer would see it shine into, plus a dot at the
// lamp's position on the hull. Angles are degrees clockwise from the bow.

// Named light sectors (from, to clockwise from bow; to may wrap past 360).
const LIGHT = {
  masthead: { from: 247.5, to: 472.5, color: PAINT.white, pos: "bow" }, // 225° fwd
  starboard: { from: 0, to: 112.5, color: PAINT.green, pos: "stbd" },
  port: { from: 247.5, to: 360, color: PAINT.red, pos: "port" },
  stern: { from: 112.5, to: 247.5, color: PAINT.white, pos: "stern" }, // 135° aft
  allround: { from: 0, to: 360, color: PAINT.white, pos: "center" },
};

export function LightView({ lights = ["starboard", "port", "stern"], size = 150, glow = false }) {
  const c = size / 2;
  const r = size * 0.4;
  const polar = (deg, rad) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return [c + rad * Math.cos(a), c + rad * Math.sin(a)];
  };
  const dotPos = {
    bow: polar(0, r * 0.5),
    stern: polar(180, r * 0.55),
    stbd: polar(60, r * 0.5),
    port: polar(300, r * 0.5),
    center: [c, c],
  };

  const wedge = (key) => {
    const { from, to, color } = LIGHT[key];
    if (to - from >= 360) {
      return <circle key={key} cx={c} cy={c} r={r} fill={color} opacity="0.5" stroke="#334155" strokeWidth="0.5" />;
    }
    const [x1, y1] = polar(from, r);
    const [x2, y2] = polar(to, r);
    const large = to - from > 180 ? 1 : 0;
    return (
      <path
        key={key}
        d={`M ${c} ${c} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`}
        fill={color}
        opacity="0.5"
        stroke="#334155"
        strokeWidth="0.5"
      />
    );
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">
      {/* faint full-circle reference */}
      <circle cx={c} cy={c} r={r} fill="none" stroke="#e2e8f0" strokeWidth="1" />
      {lights.map(wedge)}
      {/* hull (bow up) */}
      <path
        d={`M ${c} ${c - size * 0.26} C ${c + size * 0.13} ${c - size * 0.18}, ${c + size * 0.13} ${c + size * 0.16}, ${c} ${c + size * 0.22} C ${c - size * 0.13} ${c + size * 0.16}, ${c - size * 0.13} ${c - size * 0.18}, ${c} ${c - size * 0.26} Z`}
        fill="#64748b"
        stroke="#334155"
        strokeWidth="0.5"
      />
      {/* lamp dots */}
      {lights.map((key) => {
        const [dx, dy] = dotPos[LIGHT[key].pos];
        const col = LIGHT[key].color;
        return (
          <circle
            key={`d-${key}`}
            cx={dx}
            cy={dy}
            r={size * 0.028}
            fill={col}
            stroke="#1e293b"
            strokeWidth="0.7"
            style={glow ? { filter: `drop-shadow(0 0 3px ${col})` } : undefined}
          />
        );
      })}
      <text x={c} y={size * 0.07} textAnchor="middle" fontSize={size * 0.07} fill="#475569">
        orr
      </text>
      <text x={c} y={size * 0.99} textAnchor="middle" fontSize={size * 0.07} fill="#475569">
        far
      </text>
    </svg>
  );
}

// Plain single-color signal flag on a short staff (belvízi jelzőlobogók).
export function PlainFlag({ color = "red", count = 1, size = 72 }) {
  const fill = PAINT[color] ?? color;
  const fw = size * 0.5;
  const fh = size * 0.34;
  const gap = fh + 6;
  const h = (count - 1) * gap + fh + 4;
  return (
    <svg width={size * 0.62} height={h} viewBox={`0 0 ${size * 0.62} ${h}`} className="shrink-0">
      <line x1="3" y1="0" x2="3" y2={h} stroke="#94a3b8" strokeWidth="2" />
      {Array.from({ length: count }).map((_, i) => (
        <rect
          key={i}
          x="4"
          y={2 + i * gap}
          width={fw}
          height={fh}
          fill={fill}
          stroke={stroke}
          strokeWidth="0.5"
        />
      ))}
    </svg>
  );
}

// ---- Code flags (kódlobogók) ------------------------------------------
// Accurate ICS designs for the exam-relevant flags.

export function CodeFlag({ letter, size = 80 }) {
  const w = size;
  const h = size * 0.66;
  const designs = {
    // Alpha: white (hoist) + blue (fly), swallowtail
    A: (
      <g>
        <rect width={w / 2} height={h} fill={PAINT.white} stroke={stroke} strokeWidth="0.5" />
        <path
          d={`M ${w / 2} 0 H ${w} L ${w * 0.8} ${h / 2} L ${w} ${h} H ${w / 2} Z`}
          fill={PAINT.blue}
        />
      </g>
    ),
    // Bravo: all red, swallowtail
    B: (
      <path
        d={`M 0 0 H ${w} L ${w * 0.8} ${h / 2} L ${w} ${h} H 0 Z`}
        fill={PAINT.red}
        stroke={stroke}
        strokeWidth="0.5"
      />
    ),
    // Oscar: diagonal red (upper hoist) / yellow (lower fly)
    O: (
      <g stroke={stroke} strokeWidth="0.5">
        <polygon points={`0,0 ${w},0 0,${h}`} fill={PAINT.red} />
        <polygon points={`${w},0 ${w},${h} 0,${h}`} fill={PAINT.yellow} />
      </g>
    ),
    // Hotel: vertical white (hoist) + red (fly)
    H: (
      <g stroke={stroke} strokeWidth="0.5">
        <rect width={w / 2} height={h} fill={PAINT.white} />
        <rect x={w / 2} width={w / 2} height={h} fill={PAINT.red} />
      </g>
    ),
    // Papa ("blue peter"): blue field with centered white square
    P: (
      <g stroke={stroke} strokeWidth="0.5">
        <rect width={w} height={h} fill={PAINT.blue} />
        <rect x={w * 0.3} y={h * 0.3} width={w * 0.4} height={h * 0.4} fill={PAINT.white} />
      </g>
    ),
  };
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0 rounded-sm shadow-sm">
      {designs[letter] ?? <rect width={w} height={h} fill="#e2e8f0" />}
    </svg>
  );
}
