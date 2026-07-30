import {
  Code2, Layers, Database, GitBranch, Server, Activity,
  Github, FileText, User, MapPin, Zap, Globe, Target, Star,
} from "lucide-react";

// ─── Design tokens ───────────────────────────────────────
const C = {
  bg:       "#080c18",
  card:     "#0d1628",
  cardDark: "#090e1e",
  border:   "rgba(0,212,184,0.18)",
  teal:     "#00d4b8",
  tealGlow: "rgba(0,212,184,0.28)",
  green:    "#00ff88",
  white:    "#e8f0fe",
  gray:     "#8892a4",
  grayDim:  "#3a4255",
  orange:   "#ff8c42",
  purple:   "#9b59b6",
  yellow:   "#f0c020",
};

// ─── Data ────────────────────────────────────────────────
const SERVICES = [
  { name: "Languages Service",      desc: "Programming Languages",        Icon: Code2,     v: "v1.0", latency: "9ms",  ok: true  },
  { name: "Frameworks Service",     desc: "Backend Frameworks & Libraries",Icon: Layers,    v: "v1.0", latency: "12ms", ok: true  },
  { name: "Database Service",       desc: "Data Storage solutions",        Icon: Database,  v: "v1.0", latency: "8ms",  ok: true  },
  { name: "DevOps Service",         desc: "DevOps & CI/CD Tools",          Icon: GitBranch, v: "v1.0", latency: "7ms",  ok: true  },
  { name: "Infrastructure Service", desc: "Infrastructure as Code & Tools",Icon: Server,    v: "v1.0", latency: "9ms",  ok: true  },
  { name: "Monitoring Service",     desc: "Monitoring & Observability",    Icon: Activity,  v: "v1.0", latency: "5ms",  ok: false },
  { name: "GitHub Activity",        desc: "Real-time GitHub Analytics",    Icon: Github,    v: "v1.0", latency: "7ms",  ok: true  },
  { name: "Blog Service",           desc: "Technical Articles & Blog",     Icon: FileText,  v: "v1.0", latency: "9ms",  ok: true  },
  { name: "Contact Service",        desc: "Social Links & Contact info",   Icon: User,      v: "v1.0", latency: "9ms",  ok: true  },
];

const HUB_NODES = [
  { label: "API GATEWAY",   sub: "REST / GraphQL", ms: "2ms",  angle: -90  },
  { label: "AUTH SERVICE",  sub: "JWT / OAuth2",   ms: "4ms",  angle: -150 },
  { label: "CACHE SERVICE", sub: "Redis",           ms: "1ms",  angle: 180  },
  { label: "DATABASE",      sub: "PostgreSQL",      ms: "8ms",  angle: 132  },
  { label: "OBSERVABILITY", sub: "Logs / Traces",   ms: "3ms",  angle: 90   },
  { label: "STORAGE",       sub: "S3 / Files",      ms: "12ms", angle: 38   },
  { label: "MESSAGE QUEUE", sub: "RabbitMQ",        ms: "5ms",  angle: -32  },
];

const PROJECTS = [
  { name: "ComplexEcommerce",          tech: "Django", stars: "128", dot: C.teal   },
  { name: "TownStream",                tech: "Django", stars: "71",  dot: C.purple },
  { name: "Monitoring Platform",       tech: "Django", stars: "5k",  dot: C.teal   },
  { name: "Microservices Boilerplate", tech: "Python", stars: "3k",  dot: C.yellow },
];

const METRICS = [
  { label: "CPU",     value: 23, seed: 10 },
  { label: "MEMORY",  value: 41, seed: 11 },
  { label: "DISK",    value: 37, seed: 12 },
  { label: "NETWORK", value: 68, seed: 13 },
];

const TECH = [
  { label: "Python",     bg: "#1a3a5c", color: "#4da6ff" },
  { label: "dj",         bg: "#0d2e1a", color: "#44b78b" },
  { label: "FastAPI",    bg: "#0d2e2a", color: "#00d4b8" },
  { label: "PostgreSQL", bg: "#1a2e4a", color: "#336791" },
  { label: "Redis",      bg: "#3a1a1a", color: "#dc382d" },
  { label: "Docker",     bg: "#0d2040", color: "#2496ed" },
  { label: "Kubernetes", bg: "#0d1e40", color: "#326ce5" },
  { label: "Nginx",      bg: "#0d2a1a", color: "#009639" },
  { label: "Git",        bg: "#3a1a0d", color: "#f05032" },
  { label: "Linux",      bg: "#2a2a0d", color: "#fcc624" },
];

// ─── Helpers ─────────────────────────────────────────────
function seededRand(seed: number) {
  let s = seed;
  return () => {
    s = ((s * 1664525 + 1013904223) | 0) >>> 0;
    return s / 0xffffffff;
  };
}

function hexPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  }).join(" ");
}

// ─── Micro-components ────────────────────────────────────
function SvcCard({ s }: { s: typeof SERVICES[0] }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "8px",
      padding: "6px 9px",
      background: C.card,
      border: `1px solid ${C.border}`,
      borderLeft: `2px solid rgba(0,212,184,0.45)`,
      borderRadius: "6px",
    }}>
      <div style={{
        width: "32px", height: "32px", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,212,184,0.06)",
        border: `1px solid rgba(0,212,184,0.38)`,
        borderRadius: "6px", color: C.teal,
      }}>
        <s.Icon size={13} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: C.white, fontWeight: 600, fontSize: "10.5px", lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {s.name}
        </div>
        <div style={{ color: C.gray, fontSize: "9px", lineHeight: 1.2 }}>{s.desc}</div>
        <div style={{ display: "flex", gap: "8px", marginTop: "1px" }}>
          <span style={{ color: C.grayDim, fontSize: "8.5px" }}>{s.v}</span>
          <span style={{ color: C.gray, fontSize: "8.5px" }}>Latency: {s.latency}</span>
        </div>
      </div>
      <div style={{
        padding: "2px 7px", borderRadius: "3px", fontSize: "8px", fontWeight: 700,
        letterSpacing: "0.4px", flexShrink: 0,
        background: s.ok ? "rgba(0,255,136,0.08)" : "rgba(255,140,66,0.12)",
        color: s.ok ? C.green : C.orange,
        border: `1px solid ${s.ok ? "rgba(0,255,136,0.25)" : "rgba(255,140,66,0.3)"}`,
      }}>
        {s.ok ? "ONLINE" : "WARN"}
      </div>
    </div>
  );
}

function AvatarSVG() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80">
      <defs>
        <radialGradient id="face-grad" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#b07848" />
          <stop offset="100%" stopColor="#7a4a28" />
        </radialGradient>
        <clipPath id="avatar-clip">
          <circle cx="40" cy="40" r="39" />
        </clipPath>
      </defs>
      <circle cx="40" cy="40" r="40" fill="#101828" />
      <g clipPath="url(#avatar-clip)">
        {/* Shirt */}
        <ellipse cx="40" cy="78" rx="28" ry="16" fill="#1a2448" />
        <rect x="26" y="62" width="28" height="20" fill="#1a2448" />
        {/* Neck */}
        <rect x="34" y="54" width="12" height="14" rx="4" fill="#8B5E3C" />
        {/* Head */}
        <ellipse cx="40" cy="38" rx="22" ry="24" fill="url(#face-grad)" />
        {/* Hair top */}
        <ellipse cx="40" cy="16" rx="22" ry="11" fill="#1e0e06" />
        <rect x="18" y="16" width="44" height="10" fill="#1e0e06" />
        {/* Side hair */}
        <rect x="18" y="22" width="4" height="18" rx="2" fill="#1e0e06" />
        <rect x="58" y="22" width="4" height="18" rx="2" fill="#1e0e06" />
        {/* Ears */}
        <ellipse cx="18" cy="38" rx="3.5" ry="5" fill="#8B5E3C" />
        <ellipse cx="62" cy="38" rx="3.5" ry="5" fill="#8B5E3C" />
        {/* Eyebrows */}
        <path d="M28 30 Q33 27 37 30" stroke="#2C1810" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M43 30 Q47 27 52 30" stroke="#2C1810" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Eyes */}
        <ellipse cx="33" cy="36" rx="3.5" ry="4" fill="#1a1010" />
        <ellipse cx="47" cy="36" rx="3.5" ry="4" fill="#1a1010" />
        <ellipse cx="34" cy="35" rx="1.2" ry="1.2" fill="rgba(255,255,255,0.45)" />
        <ellipse cx="48" cy="35" rx="1.2" ry="1.2" fill="rgba(255,255,255,0.45)" />
        {/* Nose */}
        <path d="M40 40 Q38 45 40 47 Q42 45 40 40" fill="#6a3a1a" />
        {/* Mouth */}
        <path d="M33 53 Q40 58 47 53" stroke="#4a2818" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function HubDiagram() {
  const cx = 230, cy = 185, orbitR = 132, hubR = 58, nodeR = 35;

  const nodes = HUB_NODES.map(n => {
    const rad = (n.angle * Math.PI) / 180;
    return { ...n, x: cx + orbitR * Math.cos(rad), y: cy + orbitR * Math.sin(rad) };
  });

  return (
    <svg viewBox="0 0 460 370" width="100%" height="100%" style={{ display: "block" }}>
      <defs>
        <filter id="hub-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#00d4b8" stopOpacity="0.2" />
          <stop offset="55%"  stopColor="#00d4b8" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#00d4b8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="node-aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#00d4b8" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#00d4b8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Central glow aura */}
      <circle cx={cx} cy={cy} r={105} fill="url(#aura)" />

      {/* Dashed connection lines */}
      {nodes.map((n, i) => (
        <line key={i}
          x1={cx} y1={cy} x2={n.x} y2={n.y}
          stroke={C.teal} strokeWidth="0.9"
          strokeOpacity="0.38" strokeDasharray="5 5"
        />
      ))}

      {/* Outer decorative ring */}
      <polygon points={hexPoints(cx, cy, hubR + 14)}
        fill="none" stroke={C.teal} strokeWidth="0.5" strokeOpacity="0.15" />

      {/* Center hex — outer */}
      <polygon points={hexPoints(cx, cy, hubR)}
        fill="rgba(9,14,30,0.92)"
        stroke={C.teal} strokeWidth="2.2"
        filter="url(#hub-glow)"
      />
      {/* Center hex — inner ring */}
      <polygon points={hexPoints(cx, cy, hubR - 11)}
        fill="none" stroke={C.teal} strokeWidth="0.7" strokeOpacity="0.45" />

      {/* Center text */}
      <text x={cx} y={cy - 14} textAnchor="middle" fill={C.teal} fontSize="8.5" fontWeight="800" letterSpacing="1.8" fontFamily="Inter, sans-serif">PROFILE CORE</text>
      <text x={cx} y={cy - 2}  textAnchor="middle" fill={C.teal} fontSize="8.5" fontWeight="800" letterSpacing="1.8" fontFamily="Inter, sans-serif">SERVICE</text>
      <text x={cx} y={cy + 14} textAnchor="middle" fill={C.gray} fontSize="6.5" fontFamily="Inter, sans-serif">Central Profile Aggregator</text>

      {/* Surrounding nodes */}
      {nodes.map((n, i) => {
        const words = n.label.split(" ");
        return (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={nodeR + 10} fill="url(#node-aura)" />
            <polygon points={hexPoints(n.x, n.y, nodeR)}
              fill={C.cardDark}
              stroke={C.teal} strokeWidth="1.4" strokeOpacity="0.6"
              filter="url(#node-glow)"
            />
            {/* Words stacked */}
            {words.map((word, wi) => (
              <text key={wi}
                x={n.x} y={n.y - 10 + wi * 11}
                textAnchor="middle" fill={C.white}
                fontSize="7" fontWeight="700" letterSpacing="0.4"
                fontFamily="Inter, sans-serif"
              >{word}</text>
            ))}
            {/* Sub-label */}
            <text x={n.x} y={n.y + words.length * 11 - 4}
              textAnchor="middle" fill={C.teal} fontSize="6"
              fontFamily="Inter, sans-serif"
            >{n.sub}</text>
            {/* Latency */}
            <text x={n.x} y={n.y + words.length * 11 + 6}
              textAnchor="middle" fill={C.gray} fontSize="5.5"
              fontFamily="Inter, sans-serif"
            >{n.ms}</text>
            {/* Status dot */}
            <circle cx={n.x + nodeR - 7} cy={n.y - nodeR + 8} r={2.8} fill={C.green}
              style={{ filter: `drop-shadow(0 0 3px ${C.green})` }} />
          </g>
        );
      })}
    </svg>
  );
}

function Heatmap() {
  const rand = seededRand(42);
  const cols = 16, rows = 7, cell = 8, gap = 2;
  const cells = Array.from({ length: cols * rows }, (_, i) => {
    const v = rand();
    const col = Math.floor(i / rows), row = i % rows;
    const fill = v < 0.35 ? "#161b22" : v < 0.55 ? "#0e4429" : v < 0.72 ? "#006d32" : v < 0.88 ? "#26a641" : "#39d353";
    return { col, row, fill };
  });
  return (
    <svg width={cols * (cell + gap)} height={rows * (cell + gap)} style={{ display: "block" }}>
      {cells.map((c, i) => (
        <rect key={i}
          x={c.col * (cell + gap)} y={c.row * (cell + gap)}
          width={cell} height={cell} rx={2} fill={c.fill}
        />
      ))}
    </svg>
  );
}

function Sparkline({ seed, color = C.teal }: { seed: number; color?: string }) {
  const rand = seededRand(seed);
  const pts = Array.from({ length: 20 }, () => rand() * 0.7 + 0.15);
  const w = 90, h = 22, max = Math.max(...pts);
  const path = pts.map((v, i) =>
    `${(i / (pts.length - 1)) * w},${h - (v / max) * (h - 2)}`
  ).join(" ");
  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      <polyline points={path} fill="none" stroke={color} strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ContribGraph() {
  const rand = seededRand(99);
  const pts = Array.from({ length: 30 }, () => rand() * 0.7 + 0.12);
  const w = 260, h = 46, max = Math.max(...pts);
  const path = pts.map((v, i) =>
    `${(i / (pts.length - 1)) * w},${h - (v / max) * (h - 4)}`
  ).join(" ");
  const areaPath = `0,${h} ` + path + ` ${w},${h}`;
  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      <defs>
        <linearGradient id="cg-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={C.green} stopOpacity="0.22" />
          <stop offset="100%" stopColor={C.green} stopOpacity="0.01" />
        </linearGradient>
      </defs>
      <polygon points={areaPath} fill="url(#cg-fill)" />
      <polyline points={path} fill="none" stroke={C.green} strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((v, i) => (
        <circle key={i}
          cx={(i / (pts.length - 1)) * w}
          cy={h - (v / max) * (h - 4)}
          r={1.8} fill={C.green}
        />
      ))}
    </svg>
  );
}

// ─── Panels ──────────────────────────────────────────────
function LeftPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0", overflow: "hidden", height: "100%" }}>
      {/* Column header */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        padding: "2px 10px 6px",
        color: C.gray, fontSize: "8.5px", letterSpacing: "1.2px", fontWeight: 600,
      }}>
        <span>MICROSERVICES</span>
        <span>STATUS</span>
      </div>

      {/* Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1, overflowY: "auto", minHeight: 0 }}>
        {SERVICES.map((s, i) => <SvcCard key={i} s={s} />)}
      </div>

      {/* Tech stack */}
      <div style={{
        marginTop: "8px",
        padding: "8px 10px",
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: "6px",
        flexShrink: 0,
      }}>
        <div style={{ color: C.gray, fontSize: "8px", letterSpacing: "1.2px", marginBottom: "7px", fontWeight: 600 }}>
          TECHNOLOGY STACK
        </div>
        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
          {TECH.map((t, i) => (
            <div key={i} style={{
              padding: "3px 8px",
              background: t.bg,
              borderRadius: "4px",
              fontSize: "9px",
              color: t.color,
              fontWeight: 700,
              border: `1px solid rgba(255,255,255,0.08)`,
            }}>{t.label}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CenterPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", height: "100%", overflow: "hidden" }}>
      {/* Profile card */}
      <div style={{
        padding: "12px 16px",
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: "8px",
        display: "flex", gap: "16px", alignItems: "flex-start",
        flexShrink: 0,
      }}>
        {/* Avatar */}
        <div style={{
          flexShrink: 0,
          width: "80px", height: "80px", borderRadius: "50%",
          border: `2px solid ${C.teal}`,
          boxShadow: `0 0 24px ${C.tealGlow}, 0 0 6px ${C.tealGlow}`,
          overflow: "hidden",
        }}>
          <AvatarSVG />
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: C.white, fontSize: "20px", fontWeight: 800, lineHeight: 1.2 }}>Maryus Myary</div>
          <div style={{ color: C.teal, fontSize: "12px", fontWeight: 600, marginTop: "2px" }}>Backend Engineer</div>
          <div style={{ color: C.gray, fontSize: "10px", marginTop: "4px", lineHeight: 1.4 }}>
            Building <span style={{ color: C.teal }}>scalable systems</span>. Solving{" "}
            <span style={{ color: C.orange }}>complex</span> problems.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px 20px", marginTop: "8px" }}>
            {[
              { Icon: MapPin, label: "Location",   val: "Earth"                      },
              { Icon: Activity, label: "Status",   val: "Available for opportunities" },
              { Icon: Target,  label: "Focus",     val: "Backend Engineering"         },
              { Icon: Zap,     label: "Experience",val: "Hands-on & Passionate"       },
              { Icon: Globe,   label: "Website",   val: "maryus.dev"                  },
            ].map(({ Icon, label, val }, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "5px" }}>
                <Icon size={9} style={{ color: C.teal, marginTop: "2px", flexShrink: 0 }} />
                <div style={{ fontSize: "9px", lineHeight: 1.4 }}>
                  <span style={{ color: C.gray }}>{label}: </span>
                  <span style={{ color: C.white }}>{val}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hub diagram */}
      <div style={{
        flex: 1,
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: "8px",
        overflow: "hidden",
        minHeight: 0,
        position: "relative",
      }}>
        <HubDiagram />
      </div>
    </div>
  );
}

function RightPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", height: "100%", overflow: "hidden" }}>

      {/* GitHub Activity */}
      <div style={{
        padding: "10px 13px",
        background: C.card, border: `1px solid ${C.border}`, borderRadius: "8px",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <span style={{ color: C.gray, fontSize: "8.5px", fontWeight: 600, letterSpacing: "1.2px" }}>GITHUB ACTIVITY</span>
          <span style={{ color: C.green, fontSize: "8px", fontWeight: 700 }}>● LIVE</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "10px" }}>
          <div style={{ flexShrink: 0 }}>
            <div style={{ color: C.teal, fontSize: "30px", fontWeight: 800, lineHeight: 1 }}>683</div>
            <div style={{ color: C.gray, fontSize: "8px", lineHeight: 1.4 }}>Contributions</div>
            <div style={{ color: C.gray, fontSize: "8px" }}>This Year</div>
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Heatmap />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "4px" }}>
          {[
            { label: "Repositories", val: "24"  },
            { label: "Stars",        val: "156" },
            { label: "Followers",    val: "89"  },
            { label: "Pull Requests",val: "42"  },
          ].map(({ label, val }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ color: C.white, fontSize: "15px", fontWeight: 700 }}>{val}</div>
              <div style={{ color: C.gray, fontSize: "7.5px", lineHeight: 1.3 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Overview */}
      <div style={{
        padding: "10px 13px",
        background: C.card, border: `1px solid ${C.border}`, borderRadius: "8px",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <span style={{ color: C.gray, fontSize: "8.5px", fontWeight: 600, letterSpacing: "1.2px" }}>PROJECTS OVERVIEW</span>
          <span style={{
            padding: "1px 6px", borderRadius: "3px", fontSize: "7.5px", fontWeight: 700,
            background: "rgba(0,255,136,0.08)", color: C.green,
            border: "1px solid rgba(0,255,136,0.22)",
          }}>● ACTIVE</span>
        </div>
        {PROJECTS.map((p, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "5px 0",
            borderBottom: i < PROJECTS.length - 1 ? `1px solid ${C.grayDim}` : "none",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: p.dot, boxShadow: `0 0 5px ${p.dot}` }} />
              <span style={{ color: C.white, fontSize: "10px", fontWeight: 500 }}>{p.name}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{
                padding: "1px 5px", borderRadius: "3px", fontSize: "7.5px",
                background: "rgba(0,212,184,0.08)", color: C.teal,
                border: `1px solid rgba(0,212,184,0.2)`,
              }}>{p.tech}</span>
              <div style={{ display: "flex", alignItems: "center", gap: "3px", color: C.gray, fontSize: "9px" }}>
                <Star size={8} />
                <span>{p.stars}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* System Metrics */}
      <div style={{
        padding: "10px 13px",
        background: C.card, border: `1px solid ${C.border}`, borderRadius: "8px",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <span style={{ color: C.gray, fontSize: "8.5px", fontWeight: 600, letterSpacing: "1.2px" }}>SYSTEM METRICS</span>
          <span style={{ color: C.green, fontSize: "7.5px", fontWeight: 700 }}>● ALL OK / LIVE</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          {METRICS.map((m) => (
            <div key={m.label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                <span style={{ color: C.gray, fontSize: "8.5px", letterSpacing: "0.5px" }}>{m.label}</span>
                <span style={{ color: C.white, fontSize: "9px", fontWeight: 600 }}>{m.value}%</span>
              </div>
              <Sparkline seed={m.seed} color={C.teal} />
            </div>
          ))}
        </div>
      </div>

      {/* Contribution Graph */}
      <div style={{
        padding: "10px 13px",
        background: C.card, border: `1px solid ${C.border}`, borderRadius: "8px",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
          <span style={{ color: C.gray, fontSize: "8.5px", fontWeight: 600, letterSpacing: "1.2px" }}>CONTRIBUTION GRAPH</span>
          <span style={{ color: C.gray, fontSize: "7.5px" }}>LAST 1 YEAR</span>
        </div>
        <ContribGraph />
      </div>

      {/* System Status + Quote */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", flexShrink: 0 }}>
        <div style={{
          padding: "10px 11px",
          background: C.card, border: `1px solid ${C.border}`, borderRadius: "8px",
        }}>
          <div style={{ color: C.gray, fontSize: "8px", fontWeight: 600, letterSpacing: "1.2px", marginBottom: "8px" }}>
            SYSTEM STATUS
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
            <div style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: C.green, boxShadow: `0 0 8px ${C.green}`, flexShrink: 0,
            }} />
            <span style={{ color: C.green, fontSize: "9px", fontWeight: 600, lineHeight: 1.3 }}>
              All Systems Operational
            </span>
          </div>
          <div style={{ color: C.gray, fontSize: "8.5px" }}>99.99% Uptime</div>
        </div>

        <div style={{
          padding: "10px 11px",
          background: C.card, border: `1px solid ${C.border}`, borderRadius: "8px",
        }}>
          <div style={{ color: C.gray, fontSize: "8px", fontWeight: 600, letterSpacing: "1.2px", marginBottom: "6px" }}>
            QUOTE
          </div>
          <div style={{ color: C.white, fontSize: "8.5px", fontStyle: "italic", lineHeight: 1.5 }}>
            "Simplicity is prerequisite for reliability."
          </div>
          <div style={{ color: C.teal, fontSize: "8px", marginTop: "4px" }}>— Edgar Dijkstra</div>
        </div>
      </div>

    </div>
  );
}

// ─── Root ────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{
      background: C.bg,
      minHeight: "100vh",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: C.white,
      fontSize: "12px",
      boxSizing: "border-box",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "285px 1fr 315px",
        gap: "10px",
        padding: "10px",
        height: "100vh",
        boxSizing: "border-box",
      }}>
        <LeftPanel />
        <CenterPanel />
        <RightPanel />
      </div>
    </div>
  );
}
