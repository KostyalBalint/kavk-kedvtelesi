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

// Draw one regulatory shape centred at (cx,cy), characteristic size s.
function drawShape(k, cx, cy, s, fill) {
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
        <rect
          x={cx - s * 0.3}
          y={cy - s * 0.42}
          width={s * 0.6}
          height={s * 0.84}
          rx={s * 0.04}
          fill={fill}
          stroke={stroke}
          strokeLinejoin="round"
        />
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
    case "hourglass": {
      // two cones apex-to-apex (points toward each other) → bowtie/hourglass.
      const lx = cx - s * 0.4;
      const rx = cx + s * 0.4;
      return (
        <g fill={fill} stroke={stroke} strokeLinejoin="round">
          <polygon points={`${cx},${cy} ${lx},${cy - s * 0.45} ${rx},${cy - s * 0.45}`} />
          <polygon points={`${cx},${cy} ${lx},${cy + s * 0.45} ${rx},${cy + s * 0.45}`} />
        </g>
      );
    }
    default:
      return null;
  }
}

export function DayShape({ kind, color = "black", count = 1, size = 64 }) {
  const fill = PAINT[color] ?? color;
  const w = size;
  const pad = 4;
  const pitch = size * 0.82; // vertical spacing between stacked shapes
  const h = (count > 1 ? (count - 1) * pitch + size : size) + pad * 2;

  const items = [];
  for (let i = 0; i < count; i++) {
    const cy = pad + size / 2 + i * pitch;
    items.push(<g key={i}>{drawShape(kind, w / 2, cy, size * 0.9, fill)}</g>);
  }

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0">
      {items}
    </svg>
  );
}

// A vertical stack of differing shapes, e.g. ball–doublecone–ball.
export function ShapeStack({ shapes, size = 50 }) {
  const w = size;
  const pad = 4;
  const pitch = size * 0.78;
  const h = (shapes.length - 1) * pitch + size + pad * 2;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0">
      {shapes.map((sp, i) => (
        <g key={i}>
          {drawShape(sp.kind, w / 2, pad + size / 2 + i * pitch, size * 0.9, PAINT[sp.color ?? "black"])}
        </g>
      ))}
    </svg>
  );
}

// ---- Encounter / right-of-way scenes (top view) ------------------------
// Boat silhouette pointing "up" (toward bow) at (x,y), rotated `rot` degrees,
// scaled by `sc`. fill = hull colour.
function Boat({ x, y, rot = 0, sc = 1, fill = "#475569" }) {
  const w = 10 * sc;
  const h = 22 * sc;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <path
        d={`M0 ${-h / 2} C${w / 2} ${-h / 4}, ${w / 2} ${h / 2}, 0 ${h / 2} C${-w / 2} ${h / 2}, ${-w / 2} ${-h / 4}, 0 ${-h / 2} Z`}
        fill={fill}
        stroke="#1e293b"
        strokeWidth="0.6"
      />
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, color = "#334155", dashed = false, width = 2 }) {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const hl = 5;
  const a1 = ang + Math.PI - 0.5;
  const a2 = ang + Math.PI + 0.5;
  return (
    <g stroke={color} strokeWidth={width} fill="none" strokeLinecap="round">
      <line x1={x1} y1={y1} x2={x2} y2={y2} strokeDasharray={dashed ? "3 3" : undefined} />
      <line x1={x2} y1={y2} x2={x2 + hl * Math.cos(a1)} y2={y2 + hl * Math.sin(a1)} />
      <line x1={x2} y1={y2} x2={x2 + hl * Math.cos(a2)} y2={y2 + hl * Math.sin(a2)} />
    </g>
  );
}

// kind: "crossRight" | "riverMeet" | "noCrossAhead" | "sternZone" | "dist30"
export function EncounterScene({ kind, label, color = "#dc2626", size = 130 }) {
  const W = 130;
  const H = 104;
  const red = "#dc2626";
  let body = null;

  if (kind === "crossRight") {
    body = (
      <>
        {/* stand-on vessel: comes from the right, has priority, holds course */}
        <Boat x={95} y={38} rot={-90} fill="#475569" />
        <Arrow x1={86} y1={38} x2={46} y2={38} color="#475569" width={2} />
        <text x={70} y={20} fontSize="9" fill="#475569" fontWeight="700" textAnchor="middle">
          elsőbbsége van
        </text>
        {/* own (give-way) vessel: from below; dashed = original course */}
        <Arrow x1={42} y1={80} x2={42} y2={52} color="#94a3b8" dashed width={1.5} />
        {/* give-way: turn to starboard and pass astern (green) */}
        <Arrow x1={42} y1={80} x2={74} y2={70} color="#16a34a" width={2.5} />
        <Boat x={42} y={88} rot={0} fill="#0ea5e9" />
        <text x={72} y={97} fontSize="9" fill="#0ea5e9" fontWeight="700" textAnchor="middle">
          te: kitérsz
        </text>
      </>
    );
  } else if (kind === "riverMeet") {
    body = (
      <>
        {/* banks */}
        <line x1="12" y1="0" x2="12" y2={H} stroke="#cbd5e1" strokeWidth="3" />
        <line x1={W - 12} y1="0" x2={W - 12} y2={H} stroke="#cbd5e1" strokeWidth="3" />
        {/* current */}
        <Arrow x1={22} y1={26} x2={22} y2={56} color="#93c5fd" width={1.5} />
        <text x={22} y={18} fontSize="8" fill="#60a5fa" textAnchor="middle">sodrás</text>
        {/* upstream gives way (top) */}
        <text x={74} y={14} fontSize="9" fill="#b45309" fontWeight="700" textAnchor="middle">hegy: utat ad</text>
        <Boat x={82} y={44} rot={18} fill="#f59e0b" />
        <Arrow x1={82} y1={38} x2={101} y2={26} color="#f59e0b" dashed />
        {/* downstream priority (bottom) */}
        <Boat x={50} y={62} rot={180} fill="#16a34a" />
        <text x={50} y={96} fontSize="9" fill="#16a34a" fontWeight="700" textAnchor="middle">völgy ✓</text>
      </>
    );
  } else if (kind === "noCrossAhead") {
    body = (
      <>
        {/* forbidden zone ahead (across the channel) */}
        <rect x="16" y="6" width="98" height="36" fill={color} opacity="0.16" />
        <line x1="16" y1="6" x2="114" y2="6" stroke={color} strokeDasharray="4 3" />
        <line x1="16" y1="42" x2="114" y2="42" stroke={color} strokeDasharray="4 3" />
        {/* small craft crossing through the zone (forbidden) */}
        <Boat x={106} y={22} rot={-90} sc={0.8} fill="#0ea5e9" />
        <Arrow x1={98} y1={22} x2={42} y2={22} color={red} dashed />
        <text x={48} y={18} fontSize="13" fill={red} fontWeight="800" textAnchor="middle">✕</text>
        <text x={74} y={38} fontSize="12" fill={red} fontWeight="800" textAnchor="middle">{label}</text>
        {/* big vessel below, heading up toward the zone */}
        <Boat x={65} y={86} rot={0} sc={1.4} fill="#475569" />
        <Arrow x1={65} y1={68} x2={65} y2={48} color="#475569" width={2.5} />
      </>
    );
  } else if (kind === "sternZone") {
    body = (
      <>
        {/* vessel at top, heading away (up) */}
        <Boat x={65} y={24} rot={0} sc={1.4} fill="#475569" />
        <Arrow x1={65} y1={14} x2={65} y2={4} color="#475569" width={2} />
        {/* forbidden zone behind the stern */}
        <rect x="16" y="54" width="98" height="42" fill={color} opacity="0.16" />
        <line x1="16" y1="54" x2="114" y2="54" stroke={color} strokeDasharray="4 3" />
        {/* craft approaching the stern from below-left (forbidden) */}
        <Boat x={38} y={90} rot={0} sc={0.8} fill="#0ea5e9" />
        <Arrow x1={38} y1={84} x2={38} y2={60} color={red} dashed />
        <text x={38} y={52} fontSize="13" fill={red} fontWeight="800" textAnchor="middle">✕</text>
        <text x={86} y={78} fontSize="12" fill={red} fontWeight="800" textAnchor="middle">{label}</text>
      </>
    );
  } else if (kind === "dist30") {
    body = (
      <>
        <Boat x={40} y={58} rot={0} fill="#0ea5e9" />
        <Boat x={92} y={58} rot={0} fill="#475569" />
        <line x1="48" y1="58" x2="84" y2="58" stroke="#334155" strokeDasharray="3 3" />
        <line x1="48" y1="50" x2="48" y2="66" stroke="#334155" />
        <line x1="84" y1="50" x2="84" y2="66" stroke="#334155" />
        <text x={66} y={42} fontSize="12" fill="#334155" fontWeight="800" textAnchor="middle">{label}</text>
      </>
    );
  }

  return (
    <svg width={size} height={size * (H / W)} viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[200px] rounded-lg bg-slate-50">
      {body}
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

// A mast with vertically stacked all-round lights (top → bottom). Used for
// configurations whose distinguishing feature is stacked lights (komp,
// halász, révkalauz, kötelékek, úszómunkagép…).
export function LightMast({ lights = ["white"], size = 84, glow = true }) {
  const w = size * 0.7;
  const h = size;
  const cx = w / 2;
  const r = size * 0.085;
  const top = size * 0.13;
  const gap = lights.length > 1 ? Math.min(size * 0.19, (h * 0.5) / (lights.length - 1)) : 0;
  const deckY = h * 0.85;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0">
      <path
        d={`M${cx - w * 0.34} ${deckY} H${cx + w * 0.34} L${cx + w * 0.24} ${h * 0.97} H${cx - w * 0.24} Z`}
        fill="#64748b"
      />
      <line x1={cx} y1={top} x2={cx} y2={deckY} stroke="#94a3b8" strokeWidth="2" />
      {lights.map((col, i) => {
        const fill = PAINT[col] ?? col;
        return (
          <circle
            key={i}
            cx={cx}
            cy={top + i * gap}
            r={r}
            fill={fill}
            stroke="#1e293b"
            strokeWidth="0.6"
            style={glow ? { filter: `drop-shadow(0 0 3px ${fill})` } : undefined}
          />
        );
      })}
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

// ---- Special signals (lengők, fények, vészjelek) ----------------------
export function SpecialSignal({ kind, size = 56 }) {
  const s = size;
  const t = (n) => n * s;
  const red = PAINT.red, white = PAINT.white, yellow = PAINT.yellow, blue = PAINT.blue;
  const staff = (
    <line x1={t(0.18)} y1={t(0.06)} x2={t(0.18)} y2={t(0.96)} stroke="#94a3b8" strokeWidth={s * 0.045} />
  );
  let body = null;
  switch (kind) {
    case "redpennant": // tapering pennant on a staff
      body = <><polygon points={`${t(0.2)},${t(0.1)} ${t(0.9)},${t(0.28)} ${t(0.2)},${t(0.46)}`} fill={red} stroke={stroke} strokeWidth="0.5" />{staff}</>;
      break;
    case "diamond": // white diamond, blue border
      body = <polygon points={`${t(0.5)},${t(0.12)} ${t(0.88)},${t(0.5)} ${t(0.5)},${t(0.88)} ${t(0.12)},${t(0.5)}`} fill={white} stroke={blue} strokeWidth={s * 0.1} strokeLinejoin="round" />;
      break;
    case "redwhite": // red over white flag on staff
      body = <><rect x={t(0.2)} y={t(0.12)} width={t(0.66)} height={t(0.21)} fill={red} stroke={stroke} strokeWidth="0.4" /><rect x={t(0.2)} y={t(0.33)} width={t(0.66)} height={t(0.21)} fill={white} stroke={stroke} strokeWidth="0.4" />{staff}</>;
      break;
    case "yellowlight": { // glowing yellow light with rays
      const rays = [0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const r1 = t(0.26), r2 = t(0.38), rad = (a * Math.PI) / 180;
        return <line key={a} x1={t(0.5) + r1 * Math.cos(rad)} y1={t(0.5) + r1 * Math.sin(rad)} x2={t(0.5) + r2 * Math.cos(rad)} y2={t(0.5) + r2 * Math.sin(rad)} stroke={yellow} strokeWidth={s * 0.05} strokeLinecap="round" />;
      });
      body = <g>{rays}<circle cx={t(0.5)} cy={t(0.5)} r={t(0.2)} fill={yellow} stroke="#ca8a04" strokeWidth="0.6" style={{ filter: `drop-shadow(0 0 4px ${yellow})` }} /></g>;
      break;
    }
    case "circle": { // flag with circular-motion arrows
      body = <><polygon points={`${t(0.2)},${t(0.14)} ${t(0.6)},${t(0.14)} ${t(0.6)},${t(0.42)} ${t(0.2)},${t(0.42)}`} fill={red} stroke={stroke} strokeWidth="0.4" />{staff}<path d={`M ${t(0.62)} ${t(0.66)} A ${t(0.22)} ${t(0.22)} 0 1 1 ${t(0.5)} ${t(0.46)}`} fill="none" stroke="#334155" strokeWidth={s * 0.05} /><polygon points={`${t(0.5)},${t(0.4)} ${t(0.58)},${t(0.5)} ${t(0.46)},${t(0.52)}`} fill="#334155" /></>;
      break;
    }
    case "rocket": { // red star-shell going up
      body = <><line x1={t(0.5)} y1={t(0.9)} x2={t(0.5)} y2={t(0.42)} stroke={red} strokeWidth={s * 0.05} strokeDasharray="3 3" />{[0, 72, 144, 216, 288].map((a) => { const rad = ((a - 90) * Math.PI) / 180; return <line key={a} x1={t(0.5)} y1={t(0.28)} x2={t(0.5) + t(0.18) * Math.cos(rad)} y2={t(0.28) + t(0.18) * Math.sin(rad)} stroke={red} strokeWidth={s * 0.05} strokeLinecap="round" />; })}<circle cx={t(0.5)} cy={t(0.28)} r={t(0.05)} fill={red} /></>;
      break;
    }
    case "sos":
      body = <text x={t(0.5)} y={t(0.58)} textAnchor="middle" fontSize={t(0.22)} fontWeight="800" fill="#334155">···−−−···</text>;
      break;
    case "flagball": // flag on staff with a ball below it
      body = <><polygon points={`${t(0.2)},${t(0.1)} ${t(0.62)},${t(0.1)} ${t(0.62)},${t(0.34)} ${t(0.2)},${t(0.34)}`} fill={red} stroke={stroke} strokeWidth="0.4" /><circle cx={t(0.18)} cy={t(0.62)} r={t(0.11)} fill="#1f2937" />{staff}</>;
      break;
    default:
      body = null;
  }
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} className="shrink-0">
      {body}
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

// ---- Lateral buoys (laterális úszó kitűzőjelek) -----------------------
// Red can/cylinder = right edge of fairway; green cone = left edge.

export function Buoy({ side = "right", size = 90 }) {
  const w = size * 0.7;
  const h = size;
  const cx = w / 2;
  const water = h * 0.82;
  const red = PAINT.red;
  const green = PAINT.green;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0">
      {/* water line */}
      <line x1="0" y1={water} x2={w} y2={water} stroke="#93c5fd" strokeWidth="2" />
      {/* float base */}
      <rect x={cx - w * 0.18} y={water - h * 0.1} width={w * 0.36} height={h * 0.12} fill="#94a3b8" />
      {side === "right" ? (
        // red can (cylinder) topmark
        <rect
          x={cx - w * 0.26}
          y={h * 0.18}
          width={w * 0.52}
          height={h * 0.46}
          rx={w * 0.04}
          fill={red}
          stroke={stroke}
          strokeWidth="0.6"
        />
      ) : (
        // green cone (point up) topmark
        <polygon
          points={`${cx},${h * 0.14} ${cx - w * 0.28},${h * 0.64} ${cx + w * 0.28},${h * 0.64}`}
          fill={green}
          stroke={stroke}
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

// ---- Sign pictograms (glyphs) ------------------------------------------
// Each returns SVG centred in a 100×100 user space; `c` is the stroke/fill.

function Glyph({ name, c = "#1f2937", size = 100 }) {
  const sw = size * 0.07;
  const props = { stroke: c, strokeWidth: sw, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" };
  const S = size;
  const t = (n) => n * S; // fraction → px
  switch (name) {
    case "arrowUp":
      return <g {...props}><line x1={t(0.5)} y1={t(0.78)} x2={t(0.5)} y2={t(0.22)} /><path d={`M${t(0.32)} ${t(0.4)} L${t(0.5)} ${t(0.2)} L${t(0.68)} ${t(0.4)}`} /></g>;
    case "keep": // straight along, arrow up with side line
      return <g {...props}><line x1={t(0.5)} y1={t(0.78)} x2={t(0.5)} y2={t(0.24)} /><path d={`M${t(0.34)} ${t(0.42)} L${t(0.5)} ${t(0.22)} L${t(0.66)} ${t(0.42)}`} /></g>;
    case "cross": // bent arrow (cross to other side)
      return <g {...props}><path d={`M${t(0.3)} ${t(0.78)} L${t(0.3)} ${t(0.45)} Q${t(0.3)} ${t(0.3)} ${t(0.5)} ${t(0.3)} L${t(0.7)} ${t(0.3)}`} /><path d={`M${t(0.56)} ${t(0.18)} L${t(0.72)} ${t(0.3)} L${t(0.56)} ${t(0.42)}`} /></g>;
    case "turn": // U-turn
      return <g {...props}><path d={`M${t(0.34)} ${t(0.8)} L${t(0.34)} ${t(0.4)} Q${t(0.34)} ${t(0.22)} ${t(0.54)} ${t(0.22)} Q${t(0.72)} ${t(0.22)} ${t(0.72)} ${t(0.42)} L${t(0.72)} ${t(0.62)}`} /><path d={`M${t(0.58)} ${t(0.5)} L${t(0.72)} ${t(0.64)} L${t(0.86)} ${t(0.5)}`} /></g>;
    case "overtake":
      return <g {...props}><path d={`M${t(0.22)} ${t(0.62)} H${t(0.66)}`} /><path d={`M${t(0.54)} ${t(0.5)} L${t(0.68)} ${t(0.62)} L${t(0.54)} ${t(0.74)}`} /><path d={`M${t(0.34)} ${t(0.38)} H${t(0.78)}`} /></g>;
    case "meet":
      return <g {...props}><path d={`M${t(0.2)} ${t(0.4)} H${t(0.62)}`} /><path d={`M${t(0.5)} ${t(0.28)} L${t(0.64)} ${t(0.4)} L${t(0.5)} ${t(0.52)}`} /><path d={`M${t(0.8)} ${t(0.62)} H${t(0.38)}`} /><path d={`M${t(0.5)} ${t(0.5)} L${t(0.36)} ${t(0.62)} L${t(0.5)} ${t(0.74)}`} /></g>;
    case "stop":
      return <g><circle cx={t(0.5)} cy={t(0.5)} r={t(0.3)} fill={PAINT.red} /><rect x={t(0.28)} y={t(0.43)} width={t(0.44)} height={t(0.14)} fill={PAINT.white} /></g>;
    case "anchor":
      return <g {...props}><circle cx={t(0.5)} cy={t(0.22)} r={t(0.06)} /><line x1={t(0.5)} y1={t(0.28)} x2={t(0.5)} y2={t(0.78)} /><line x1={t(0.34)} y1={t(0.42)} x2={t(0.66)} y2={t(0.42)} /><path d={`M${t(0.26)} ${t(0.58)} Q${t(0.3)} ${t(0.78)} ${t(0.5)} ${t(0.78)} Q${t(0.7)} ${t(0.78)} ${t(0.74)} ${t(0.58)}`} /></g>;
    case "moor": // bollard
      return <g {...props}><path d={`M${t(0.4)} ${t(0.78)} L${t(0.42)} ${t(0.34)} Q${t(0.5)} ${t(0.26)} ${t(0.58)} ${t(0.34)} L${t(0.6)} ${t(0.78)}`} /><line x1={t(0.34)} y1={t(0.78)} x2={t(0.66)} y2={t(0.78)} /></g>;
    case "wave":
      return <g {...props}>{[0.42, 0.58].map((y, i) => <path key={i} d={`M${t(0.2)} ${t(y)} q${t(0.075)} ${t(-0.1)} ${t(0.15)} 0 q${t(0.075)} ${t(0.1)} ${t(0.15)} 0 q${t(0.075)} ${t(-0.1)} ${t(0.15)} 0`} />)}</g>;
    case "horn":
      return <g {...props}><path d={`M${t(0.28)} ${t(0.42)} H${t(0.46)} L${t(0.66)} ${t(0.28)} V${t(0.72)} L${t(0.46)} ${t(0.58)} H${t(0.28)} Z`} /><path d={`M${t(0.74)} ${t(0.38)} q${t(0.08)} ${t(0.12)} 0 ${t(0.24)}`} /></g>;
    case "radio":
      return <g {...props}><line x1={t(0.5)} y1={t(0.8)} x2={t(0.5)} y2={t(0.4)} /><path d={`M${t(0.34)} ${t(0.32)} Q${t(0.5)} ${t(0.2)} ${t(0.66)} ${t(0.32)}`} /><path d={`M${t(0.4)} ${t(0.4)} Q${t(0.5)} ${t(0.34)} ${t(0.6)} ${t(0.4)}`} /></g>;
    case "motor": // propeller
      return <g fill={c}>{[0, 120, 240].map((a) => <ellipse key={a} cx={t(0.5)} cy={t(0.32)} rx={t(0.07)} ry={t(0.15)} transform={`rotate(${a} ${t(0.5)} ${t(0.5)})`} />)}<circle cx={t(0.5)} cy={t(0.5)} r={t(0.05)} /></g>;
    case "sail":
      return <g><path d={`M${t(0.5)} ${t(0.2)} L${t(0.5)} ${t(0.66)} L${t(0.28)} ${t(0.66)} Z`} fill={c} /><path d={`M${t(0.54)} ${t(0.24)} L${t(0.72)} ${t(0.66)} L${t(0.54)} ${t(0.66)} Z`} fill={c} /><path d={`M${t(0.22)} ${t(0.72)} H${t(0.78)} L${t(0.7)} ${t(0.8)} H${t(0.3)} Z`} fill={c} /></g>;
    case "rec": // small power boat
    case "ferry":
      return <g><path d={`M${t(0.22)} ${t(0.56)} H${t(0.78)} L${t(0.68)} ${t(0.7)} H${t(0.32)} Z`} fill={c} /><rect x={t(0.4)} y={t(0.4)} width={t(0.2)} height={t(0.16)} fill={c} /></g>;
    case "row":
      return <g><path d={`M${t(0.22)} ${t(0.5)} Q${t(0.5)} ${t(0.74)} ${t(0.78)} ${t(0.5)} Z`} fill={c} /><g {...props}><line x1={t(0.4)} y1={t(0.52)} x2={t(0.28)} y2={t(0.34)} /><line x1={t(0.6)} y1={t(0.52)} x2={t(0.72)} y2={t(0.34)} /></g></g>;
    case "waterski":
      return <g {...props}><circle cx={t(0.5)} cy={t(0.26)} r={t(0.07)} fill={c} stroke="none" /><path d={`M${t(0.5)} ${t(0.34)} L${t(0.5)} ${t(0.56)} M${t(0.5)} ${t(0.42)} L${t(0.32)} ${t(0.36)} M${t(0.5)} ${t(0.42)} L${t(0.66)} ${t(0.34)} M${t(0.5)} ${t(0.56)} L${t(0.4)} ${t(0.72)} M${t(0.5)} ${t(0.56)} L${t(0.62)} ${t(0.72)}`} /><line x1={t(0.24)} y1={t(0.8)} x2={t(0.76)} y2={t(0.8)} /></g>;
    case "windsurf":
      return <g><path d={`M${t(0.5)} ${t(0.22)} Q${t(0.74)} ${t(0.38)} ${t(0.56)} ${t(0.6)} L${t(0.5)} ${t(0.6)} Z`} fill={c} /><g {...props}><line x1={t(0.5)} y1={t(0.2)} x2={t(0.5)} y2={t(0.62)} /><path d={`M${t(0.3)} ${t(0.74)} H${t(0.7)}`} /></g></g>;
    case "highspeed":
      return <g><path d={`M${t(0.26)} ${t(0.5)} H${t(0.74)} L${t(0.64)} ${t(0.64)} H${t(0.36)} Z`} fill={c} /><g {...props}><line x1={t(0.2)} y1={t(0.34)} x2={t(0.5)} y2={t(0.34)} /><line x1={t(0.28)} y1={t(0.44)} x2={t(0.5)} y2={t(0.44)} /></g></g>;
    case "jetski":
      return <g><path d={`M${t(0.22)} ${t(0.58)} Q${t(0.4)} ${t(0.7)} ${t(0.78)} ${t(0.62)} L${t(0.74)} ${t(0.5)} Q${t(0.5)} ${t(0.54)} ${t(0.3)} ${t(0.48)} Z`} fill={c} /><g {...props}><path d={`M${t(0.46)} ${t(0.48)} L${t(0.46)} ${t(0.34)} L${t(0.6)} ${t(0.34)}`} /></g></g>;
    case "slip":
      return <g {...props}><path d={`M${t(0.24)} ${t(0.74)} L${t(0.7)} ${t(0.3)}`} /><path d={`M${t(0.5)} ${t(0.5)} l${t(0.18)} ${t(0.08)} l${t(-0.06)} ${t(0.12)} Z`} fill={c} stroke="none" /><line x1={t(0.2)} y1={t(0.78)} x2={t(0.8)} y2={t(0.78)} stroke={PAINT.blue} /></g>;
    case "speed":
      return <text x={t(0.5)} y={t(0.5)} dy={t(0.13)} textAnchor="middle" fontSize={t(0.26)} fontWeight="700" fill={c}>km/h</text>;
    case "warn":
      return <text x={t(0.5)} y={t(0.5)} dy={t(0.2)} textAnchor="middle" fontSize={t(0.6)} fontWeight="800" fill={c}>!</text>;
    case "depth":
      return <g {...props}><path d={`M${t(0.5)} ${t(0.28)} V${t(0.7)} M${t(0.36)} ${t(0.56)} L${t(0.5)} ${t(0.72)} L${t(0.64)} ${t(0.56)}`} /><line x1={t(0.3)} y1={t(0.24)} x2={t(0.7)} y2={t(0.24)} /></g>;
    case "height":
      return <g {...props}><line x1={t(0.3)} y1={t(0.24)} x2={t(0.7)} y2={t(0.24)} /><line x1={t(0.3)} y1={t(0.76)} x2={t(0.7)} y2={t(0.76)} /><path d={`M${t(0.5)} ${t(0.3)} V${t(0.7)} M${t(0.4)} ${t(0.4)} L${t(0.5)} ${t(0.28)} L${t(0.6)} ${t(0.4)} M${t(0.4)} ${t(0.6)} L${t(0.5)} ${t(0.72)} L${t(0.6)} ${t(0.6)}`} /></g>;
    case "width":
      return <g {...props}><line x1={t(0.24)} y1={t(0.3)} x2={t(0.24)} y2={t(0.7)} /><line x1={t(0.76)} y1={t(0.3)} x2={t(0.76)} y2={t(0.7)} /><path d={`M${t(0.3)} ${t(0.5)} H${t(0.7)} M${t(0.4)} ${t(0.4)} L${t(0.28)} ${t(0.5)} L${t(0.4)} ${t(0.6)} M${t(0.6)} ${t(0.4)} L${t(0.72)} ${t(0.5)} L${t(0.6)} ${t(0.6)}`} /></g>;
    case "power": // overhead line / tower
      return <g {...props}><path d={`M${t(0.3)} ${t(0.76)} L${t(0.5)} ${t(0.24)} L${t(0.7)} ${t(0.76)}`} /><line x1={t(0.38)} y1={t(0.5)} x2={t(0.62)} y2={t(0.5)} /><path d={`M${t(0.5)} ${t(0.24)} l${t(-0.06)} ${t(0.12)} l${t(0.12)} 0 Z`} fill={c} /></g>;
    case "weir":
      return <g {...props}><line x1={t(0.3)} y1={t(0.26)} x2={t(0.3)} y2={t(0.74)} /><line x1={t(0.5)} y1={t(0.26)} x2={t(0.5)} y2={t(0.74)} /><line x1={t(0.7)} y1={t(0.26)} x2={t(0.7)} y2={t(0.74)} /></g>;
    case "water": // tap/drop
      return <g><path d={`M${t(0.5)} ${t(0.26)} q${t(0.16)} ${t(0.24)} 0 ${t(0.4)} q${t(-0.16)} ${t(-0.16)} 0 ${t(-0.4)}`} fill={c} /></g>;
    case "phone":
      return <g><path d={`M${t(0.3)} ${t(0.34)} q${t(0.04)} ${t(-0.06)} ${t(0.1)} ${t(-0.02)} l${t(0.06)} ${t(0.08)} q${t(0.02)} ${t(0.04)} ${t(-0.02)} ${t(0.06)} q${t(-0.06)} ${t(0.1)} ${t(0.06)} ${t(0.22)} q${t(0.12)} ${t(0.12)} ${t(0.22)} ${t(0.06)} q${t(0.04)} ${t(-0.04)} ${t(0.06)} ${t(-0.02)} l${t(0.08)} ${t(0.06)} q${t(0.04)} ${t(0.06)} ${t(-0.02)} ${t(0.1)} q${t(-0.12)} ${t(0.1)} ${t(-0.32)} ${t(-0.06)} q${t(-0.2)} ${t(-0.2)} ${t(-0.06)} ${t(-0.32)}`} fill={c} /></g>;
    default:
      return null;
  }
}

// ---- Waterway sign boards (CEVNI A/B/C/D/E, I–7 melléklet) --------------
// Renders the correct board per category + a pictogram glyph; special
// striped boards: A.1 (rwr), E.1 (gwg). Falls back to the sign code.

export function SignBoard({ code = "", cat = "E", glyph, img, size = 76 }) {
  const s = size;
  const r = s * 0.1;
  // Prefer the official sign image when available.
  if (img) {
    return (
      <img
        src={img}
        alt={code}
        width={s}
        loading="lazy"
        className="shrink-0 rounded"
        style={{ maxHeight: s * 1.05, objectFit: "contain" }}
      />
    );
  }
  const banded = glyph === "rwr" || glyph === "gwg";
  const isInfo = cat === "E";
  const isRec = cat === "D";
  const ground = banded ? PAINT.white : isInfo ? PAINT.blue : isRec ? PAINT.yellow : PAINT.white;
  const glyphColor = isInfo ? PAINT.white : "#1f2937";
  const showGlyph = glyph && !banded && glyph !== "yellowsq";

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} className="shrink-0">
      <rect x="1.5" y="1.5" width={s - 3} height={s - 3} rx={r} fill={ground} stroke={stroke} strokeWidth="1" />
      {/* A.1 = red-white-red, E.1 = green-white-green horizontal bands */}
      {banded && (
        <g>
          <rect x="1.5" y="1.5" width={s - 3} height={(s - 3) / 3} fill={glyph === "rwr" ? PAINT.red : PAINT.green} />
          <rect x="1.5" y={1.5 + (2 * (s - 3)) / 3} width={s - 3} height={(s - 3) / 3} fill={glyph === "rwr" ? PAINT.red : PAINT.green} />
        </g>
      )}
      {/* category border: A/B/C red, D none, E none */}
      {(cat === "A" || cat === "B" || cat === "C") && !banded && (
        <rect x="1.5" y="1.5" width={s - 3} height={s - 3} rx={r} fill="none" stroke={PAINT.red} strokeWidth={s * 0.1} />
      )}
      {/* prohibition diagonal */}
      {cat === "A" && !banded && (
        <line x1={s * 0.18} y1={s * 0.18} x2={s * 0.82} y2={s * 0.82} stroke={PAINT.red} strokeWidth={s * 0.09} />
      )}
      {showGlyph && (
        <g transform={`translate(${s * 0.16} ${s * 0.16}) scale(${(s * 0.68) / s})`}>
          <Glyph name={glyph} c={glyphColor} size={s} />
        </g>
      )}
      {!showGlyph && !banded && (
        <text x={s / 2} y={s / 2} dy={s * 0.11} textAnchor="middle" fontSize={s * 0.26} fontWeight="700" fill={glyphColor}>
          {code}
        </text>
      )}
    </svg>
  );
}
