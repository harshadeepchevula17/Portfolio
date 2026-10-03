import {
  Component,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { Sparkles, RotateCcw } from "lucide-react";

// ============================================================================
// SHARED TYPES / CONSTANTS
// ============================================================================
type Story = { chapter: number; awake: boolean; power: number };
type Drag = { yaw: number; pitch: number; dragging: boolean; lx: number; ly: number; mouse: boolean };

const CHAPTERS = [
  { id: "who-i-am", title: "WHO I AM" },
  { id: "what-i-build", title: "WHAT I BUILD" },
  { id: "my-technology", title: "MY TECHNOLOGY" },
  { id: "how-i-think", title: "HOW I THINK" },
  { id: "what-ive-built", title: "WHAT I'VE BUILT" },
  { id: "ready-to-build", title: "READY TO BUILD" },
];

const LID_START = THREE.MathUtils.degToRad(25); // initial opening angle (from base)
const LID_END = THREE.MathUtils.degToRad(108); // final opening angle
const SCREEN_W = 3.4;
const SCREEN_H = 2.125; // 16:10, matches the 1280x800 texture
const SCREEN_Y = 1.25; // centre of display inside the lid (lid-local)

// ============================================================================
// 1. CANVAS TEXTURE UI (everything the screen shows is drawn here)
// ============================================================================
const TW = 1280;
const TH = 800;
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const SANS = "Inter, system-ui, -apple-system, 'Segoe UI', sans-serif";
const CYAN = "#22d3ee";
const LIME = "#a3e635";
const TXT = "#e6edf7";
const MUTED = "#8b9ab3";
const PANEL = "#0d1526";
const LINE = "#1e2d47";

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrap(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxW: number, lh: number) {
  const words = text.split(" ");
  let line = "";
  let cy = y;
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, x, cy);
      line = w;
      cy += lh;
    } else line = test;
  }
  if (line) ctx.fillText(line, x, cy);
  return cy;
}

const typed = (s: string, ct: number, delay: number, cps = 40) =>
  s.slice(0, Math.max(0, Math.min(s.length, Math.floor((ct - delay) * cps))));
const blink = (ct: number) => Math.floor(ct * 2) % 2 === 0;

function chip(ctx: CanvasRenderingContext2D, label: string, x: number, y: number) {
  ctx.font = `bold 20px ${MONO}`;
  const w = ctx.measureText(label).width + 36;
  ctx.fillStyle = "rgba(34,211,238,0.12)";
  rr(ctx, x, y, w, 38, 19);
  ctx.fill();
  ctx.strokeStyle = "rgba(34,211,238,0.45)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = CYAN;
  ctx.textBaseline = "alphabetic";
  ctx.fillText(label, x + 18, y + 26);
}

function drawScreen(
  ctx: CanvasRenderingContext2D,
  ch: number,
  ct: number,
  power: number,
  fade: number
) {
  ctx.save();
  ctx.clearRect(0, 0, TW, TH);
  rr(ctx, 0, 0, TW, TH, 40); // rounded display corners
  ctx.clip();
  ctx.fillStyle = "#02050a";
  ctx.fillRect(0, 0, TW, TH);
  if (power < 0.01) {
    ctx.restore();
    return;
  }

  // ---- chrome (window bar + footer) ----
  ctx.globalAlpha = power;
  const bg = ctx.createLinearGradient(0, 0, TW, TH);
  bg.addColorStop(0, "#0b1424");
  bg.addColorStop(1, "#060a14");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, TW, TH);

  ctx.fillStyle = "#0a1020";
  ctx.fillRect(0, 0, TW, 64);
  ctx.fillStyle = "#ef4444";
  ctx.beginPath(); ctx.arc(40, 32, 8, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#eab308";
  ctx.beginPath(); ctx.arc(68, 32, 8, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#22c55e";
  ctx.beginPath(); ctx.arc(96, 32, 8, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = MUTED;
  ctx.font = `20px ${MONO}`;
  ctx.fillText(`harsha@portfolio: ~/about/${CHAPTERS[ch].id}`, 132, 39);

  ctx.strokeStyle = LINE;
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, TH - 64); ctx.lineTo(TW, TH - 64); ctx.stroke();
  ctx.fillStyle = CYAN;
  ctx.font = `bold 20px ${MONO}`;
  ctx.fillText(`0${ch + 1} / 0${CHAPTERS.length}   ${CHAPTERS[ch].title}`, 40, TH - 24);
  for (let i = 0; i < CHAPTERS.length; i++) {
    ctx.fillStyle = i === ch ? CYAN : "#22314d";
    rr(ctx, TW - 40 - (CHAPTERS.length - i) * 30 + (i === ch ? -10 : 0), TH - 36, i === ch ? 30 : 14, 14, 7);
    ctx.fill();
  }

  // ---- chapter content ----
  const base = power * fade;
  const L = 72; // left margin
  const CW = TW - 144; // content width
  const stag = (i: number, d = 0.12) => clamp01((ct - i * d) / 0.35);
  ctx.globalAlpha = base;
  ctx.textBaseline = "alphabetic";

  if (ch === 0) {
    chip(ctx, "01 / WHO I AM", L, 112);
    ctx.fillStyle = TXT;
    ctx.font = `bold 78px ${SANS}`;
    const name = typed("Chevula Harsha Deep", ct, 0.15, 32);
    const done = name.length === "Chevula Harsha Deep".length;
    ctx.fillText(name + (!done || blink(ct) ? "\u258D" : ""), L, 262);
    ctx.globalAlpha = base * clamp01((ct - 0.9) / 0.4);
    ctx.fillStyle = CYAN;
    ctx.font = `bold 34px ${MONO}`;
    ctx.fillText("FULL STACK DEVELOPER", L, 326);
    ctx.globalAlpha = base * clamp01((ct - 1.3) / 0.5);
    ctx.fillStyle = MUTED;
    ctx.font = `30px ${SANS}`;
    const y = wrap(
      ctx,
      "B.E. Information Technology student and Full Stack Developer focused on building scalable web applications, backend systems, REST APIs and modern user experiences.",
      L, 410, 1000, 46
    );
    ctx.fillStyle = LIME;
    ctx.font = `22px ${MONO}`;
    ctx.fillText("React.js \u00B7 Spring Boot \u00B7 Node.js \u00B7 Express.js \u00B7 MySQL \u00B7 REST APIs", L, y + 84);
  } else if (ch === 1) {
    chip(ctx, "02 / WHAT I BUILD", L, 112);
    ctx.fillStyle = TXT;
    ctx.font = `bold 52px ${SANS}`;
    ctx.fillText("What I build", L, 218);
    const items = [
      "Scalable web applications",
      "Backend services",
      "REST APIs",
      "Authentication systems",
      "Dashboards",
      "Real-world software solutions",
    ];
    const cw = (CW - 48) / 3;
    items.forEach((t, i) => {
      const x = L + (i % 3) * (cw + 24);
      const y = 268 + Math.floor(i / 3) * 154;
      ctx.globalAlpha = base * stag(i);
      ctx.fillStyle = PANEL;
      rr(ctx, x, y, cw, 130, 16); ctx.fill();
      ctx.strokeStyle = "rgba(34,211,238,0.35)"; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = CYAN; ctx.font = `bold 20px ${MONO}`;
      ctx.fillText(`0${i + 1}`, x + 22, y + 38);
      ctx.fillStyle = TXT; ctx.font = `bold 27px ${SANS}`;
      wrap(ctx, t, x + 22, y + 82, cw - 44, 34);
    });
    ctx.globalAlpha = base * clamp01((ct - 0.9) / 0.4);
    ctx.fillStyle = MUTED; ctx.font = `22px ${MONO}`;
    ctx.fillText("Hands-on with React.js, Spring Boot, Node.js, Express.js, MySQL and REST APIs.", L, 620);
  } else if (ch === 2) {
    chip(ctx, "03 / MY TECHNOLOGY", L, 112);
    const tech: [string, string][] = [
      ["Java", "Language"], ["Spring Boot", "Backend"], ["React.js", "Frontend"],
      ["Node.js", "Runtime"], ["Express.js", "Backend"], ["MySQL", "Database"],
      ["Docker", "DevOps"], ["Redis", "Cache / queue"], ["PostgreSQL", "Database"],
    ];
    const cw = (CW - 48) / 3;
    tech.forEach(([n, c], i) => {
      const x = L + (i % 3) * (cw + 24);
      const y = 188 + Math.floor(i / 3) * 124;
      ctx.globalAlpha = base * stag(i, 0.08);
      ctx.fillStyle = PANEL;
      rr(ctx, x, y, cw, 102, 16); ctx.fill();
      ctx.strokeStyle = i % 2 ? "rgba(163,230,53,0.4)" : "rgba(34,211,238,0.4)";
      ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = TXT; ctx.font = `bold 33px ${MONO}`;
      ctx.fillText(n, x + 24, y + 48);
      ctx.fillStyle = MUTED; ctx.font = `20px ${SANS}`;
      ctx.fillText(c, x + 24, y + 80);
    });
    ctx.globalAlpha = base * clamp01((ct - 0.9) / 0.4);
    ctx.fillStyle = MUTED; ctx.font = `22px ${SANS}`;
    ctx.fillText("Plus modern development tools across the stack.", L, 610);
  } else if (ch === 3) {
    chip(ctx, "04 / HOW I THINK", L, 112);
    ctx.fillStyle = TXT;
    ctx.font = `bold 52px ${SANS}`;
    ctx.fillText("How I think", L, 218);
    const rows = ["Problem solving", "DSA", "Algorithmic thinking", "Computer science fundamentals"];
    rows.forEach((t, i) => {
      const y = 300 + i * 78;
      ctx.globalAlpha = base * stag(i, 0.18);
      ctx.fillStyle = "rgba(34,211,238,0.5)"; ctx.font = `20px ${MONO}`;
      ctx.fillText(String(i + 1).padStart(2, "0"), L, y);
      ctx.fillStyle = CYAN; ctx.font = `bold 38px ${MONO}`;
      ctx.fillText(">", L + 56, y + 2);
      ctx.fillStyle = TXT; ctx.font = `bold 40px ${SANS}`;
      ctx.fillText(t, L + 110, y + 2);
    });
    ctx.globalAlpha = base * clamp01((ct - 1.0) / 0.4);
    ctx.fillStyle = MUTED; ctx.font = `26px ${SANS}`;
    wrap(ctx, "Continuously strengthening problem-solving and DSA skills alongside solid fundamentals.", L, 640, 1000, 36);
  } else if (ch === 4) {
    chip(ctx, "05 / WHAT I'VE BUILT", L, 112);
    const cards = [
      { tag: "HEALTHCARE + AI", name: "MediConnect", c: CYAN,
        d: "Role-based healthcare platform with Spring Boot backend, MySQL, Docker and MediAssist AI.",
        t: "React \u00B7 Spring Boot \u00B7 MySQL \u00B7 Docker" },
      { tag: "DISTRIBUTED QUEUE", name: "Email Scheduler", c: LIME,
        d: "Background job processor with BullMQ, Redis and PostgreSQL persistence.",
        t: "Node.js \u00B7 BullMQ \u00B7 Redis \u00B7 PostgreSQL" },
    ];
    const cw = (CW - 28) / 2;
    cards.forEach((c, i) => {
      const x = L + i * (cw + 28);
      ctx.globalAlpha = base * stag(i, 0.25);
      ctx.fillStyle = PANEL;
      rr(ctx, x, 180, cw, 440, 20); ctx.fill();
      ctx.strokeStyle = c.c; ctx.lineWidth = 2.5; ctx.globalAlpha *= 0.8; ctx.stroke();
      ctx.globalAlpha = base * stag(i, 0.25);
      ctx.fillStyle = c.c; ctx.font = `bold 20px ${MONO}`;
      ctx.fillText(c.tag, x + 30, 236);
      ctx.fillStyle = TXT; ctx.font = `bold 46px ${SANS}`;
      ctx.fillText(c.name, x + 30, 306);
      ctx.fillStyle = MUTED; ctx.font = `25px ${SANS}`;
      wrap(ctx, c.d, x + 30, 366, cw - 60, 36);
      ctx.fillStyle = c.c; ctx.font = `bold 20px ${MONO}`;
      ctx.fillText(c.t, x + 30, 570);
    });
  } else {
    ctx.textAlign = "center";
    ctx.fillStyle = MUTED; ctx.font = `22px ${MONO}`;
    ctx.fillText("06 / READY TO BUILD", TW / 2, 200);
    ctx.fillStyle = LIME; ctx.font = `bold 92px ${MONO}`;
    ctx.fillText("SYSTEM READY", TW / 2, 340);
    ctx.fillStyle = "#02050a";
    rr(ctx, TW / 2 - 400, 420, 800, 100, 16); ctx.fill();
    ctx.strokeStyle = "rgba(34,211,238,0.6)"; ctx.lineWidth = 2; ctx.stroke();
    const cmd = typed("harsha@portfolio:~$ open projects", ct, 0.4, 28);
    ctx.fillStyle = CYAN; ctx.font = `bold 34px ${MONO}`;
    ctx.fillText(cmd + (blink(ct) ? "\u258D" : ""), TW / 2, 484);
    ctx.fillStyle = MUTED; ctx.font = `22px ${SANS}`;
    ctx.fillText("Scroll on to explore the projects.", TW / 2, 600);
    ctx.textAlign = "left";
  }
  ctx.restore();
}

// ============================================================================
// 2. SCREEN MESH: plane + CanvasTexture, child of the LID (rotates with it)
// ============================================================================
function LaptopScreen({ story }: { story: MutableRefObject<Story> }) {
  const gl = useThree((s) => s.gl);
  const { ctx, tex } = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = TW;
    canvas.height = TH;
    const ctx = canvas.getContext("2d")!;
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = gl.capabilities.getMaxAnisotropy();
    tex.generateMipmaps = false;
    tex.minFilter = THREE.LinearFilter;
    drawScreen(ctx, 0, 0, 0, 0);
    tex.needsUpdate = true;
    return { ctx, tex };
  }, [gl]);
  const L = useRef({ shown: 0, fade: 1, ct: 0, acc: 0 });

  useEffect(() => () => tex.dispose(), [tex]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const s = story.current;
    const l = L.current;
    if (s.chapter !== l.shown) {
      l.fade = Math.max(0, l.fade - dt / 0.18);
      if (l.fade <= 0) {
        l.shown = s.chapter;
        l.ct = 0;
      }
    } else l.fade = Math.min(1, l.fade + dt / 0.25);
    if (s.power > 0.02) l.ct += dt;
    else l.ct = 0;
    l.acc += dt;
    if (l.acc < 1 / 30) return;
    l.acc = 0;
    drawScreen(ctx, l.shown, l.ct, s.power, l.fade);
    tex.needsUpdate = true;
  });

  return (
    <mesh name="ScreenContent" position={[0, SCREEN_Y, 0.0065]}>
      <planeGeometry args={[SCREEN_W, SCREEN_H]} />
      <meshBasicMaterial map={tex} toneMapped={false} />
    </mesh>
  );
}

// ============================================================================
// 3. LAPTOP RIG  (LaptopRoot > Base / LidPivot > Lid > Bezel, Display, ScreenContent)
// ============================================================================
const KEY_UNIT = 0.235;
const ones = (n: number) => Array<number>(n).fill(1);
const KEY_ROWS: number[][] = [
  ones(14),
  ones(14),
  [1.5, ...ones(11), 1.5],
  [1.75, ...ones(10), 2.25],
  [2.25, ...ones(9), 2.75],
  [1.25, 1.25, 1.25, 6.25, 1.25, 1.25, 1.5],
];

function LaptopRig({ story, drag }: { story: MutableRefObject<Story>; drag: MutableRefObject<Drag> }) {
  const root = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const lidPivot = useRef<THREE.Group>(null);
  const glow = useRef<THREE.PointLight>(null);
  const camMat = useRef<THREE.MeshBasicMaterial>(null);
  const lidT = useRef(0);
  const yaw = useRef(drag.current.yaw);
  const pitch = useRef(0);

  const keys = useMemo(() => {
    const out: { x: number; z: number; w: number; d: number }[] = [];
    const total = 14 * KEY_UNIT;
    KEY_ROWS.forEach((row, r) => {
      let cx = -total / 2;
      row.forEach((u) => {
        const w = u * KEY_UNIT;
        out.push({ x: cx + w / 2, z: -0.9 + r * KEY_UNIT, w: w - 0.03, d: r === 0 ? 0.14 : 0.2 });
        cx += w;
      });
    });
    return out;
  }, []);
  const keyGeo = useMemo(() => new THREE.BoxGeometry(1, 0.03, 1), []);
  const keyMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#14171c", metalness: 0.2, roughness: 0.55 }),
    []
  );
  useEffect(() => () => { keyGeo.dispose(); keyMat.dispose(); }, [keyGeo, keyMat]);

  // dev-only hierarchy log (this laptop is procedural; there is no GLTF to inspect)
  useEffect(() => {
    if (!(import.meta as unknown as { env?: { DEV?: boolean } }).env?.DEV || !root.current) return;
    const lines: string[] = [];
    const walk = (o: THREE.Object3D, d: number) => {
      if (o.name) lines.push(`${"  ".repeat(d)}${o.name} (${o.type})`);
      o.children.forEach((c) => walk(c, o.name ? d + 1 : d));
    };
    walk(root.current, 0);
    console.log("[About] laptop hierarchy\n" + lines.join("\n"));
  }, []);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const s = story.current;
    // lid opens ONLY by rotating LidPivot around the hinge axis (x)
    lidT.current = THREE.MathUtils.damp(lidT.current, s.awake ? 1 : 0, 2.4, dt);
    const open = LID_START + (LID_END - LID_START) * lidT.current;
    if (lidPivot.current) lidPivot.current.rotation.x = Math.PI / 2 - open;
    s.power = THREE.MathUtils.damp(s.power, s.awake && lidT.current > 0.6 ? 1 : 0, 3.5, dt);

    // user rotation on a wrapper group (never used to open the lid)
    yaw.current = THREE.MathUtils.damp(yaw.current, drag.current.yaw, 6, dt);
    pitch.current = THREE.MathUtils.damp(pitch.current, drag.current.pitch, 6, dt);
    if (spin.current) {
      spin.current.rotation.y = yaw.current;
      spin.current.rotation.x = pitch.current;
    }
    if (glow.current) glow.current.intensity = s.power * 2.6;
    if (camMat.current) camMat.current.color.set(s.power > 0.5 ? "#34d399" : "#1a1d22");
  });

  return (
    <group ref={root} name="LaptopRoot">
      <group ref={spin} name="LaptopSpin">
        {/* ---------------------------- BASE ---------------------------- */}
        <group name="Base">
          <RoundedBox name="BottomChassis" args={[3.8, 0.16, 2.6]} radius={0.05} smoothness={4} position={[0, -0.08, 0]}>
            <meshStandardMaterial color="#2b2f36" metalness={0.85} roughness={0.38} envMapIntensity={1.1} />
          </RoundedBox>
          <group name="Keyboard">
            <mesh position={[0, 0.002, -0.33]}>
              <boxGeometry args={[3.5, 0.004, 1.5]} />
              <meshStandardMaterial color="#0b0d11" roughness={0.7} />
            </mesh>
            {keys.map((k, i) => (
              <mesh
                key={i}
                geometry={keyGeo}
                material={keyMat}
                position={[k.x, 0.017, k.z]}
                scale={[k.w, 1, k.d]}
              />
            ))}
          </group>
          <mesh name="Trackpad" position={[0, 0.002, 0.82]}>
            <boxGeometry args={[1.25, 0.004, 0.75]} />
            <meshStandardMaterial color="#363b44" metalness={0.6} roughness={0.25} />
          </mesh>
          <mesh name="Hinge" position={[0, 0.02, -1.25]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.07, 0.07, 3.4, 20]} />
            <meshStandardMaterial color="#4a505b" metalness={0.9} roughness={0.3} />
          </mesh>
        </group>

        {/* --------------------- LID PIVOT AT THE HINGE ------------------ */}
        <group ref={lidPivot} name="LidPivot" position={[0, 0.02, -1.25]} rotation={[Math.PI / 2 - LID_START, 0, 0]}>
          <group name="Lid">
            <RoundedBox args={[3.8, 2.5, 0.08]} radius={0.04} smoothness={4} position={[0, 1.29, -0.04]}>
              <meshStandardMaterial color="#2b2f36" metalness={0.85} roughness={0.38} envMapIntensity={1.1} />
            </RoundedBox>
            <mesh name="Bezel" position={[0, 1.29, 0]}>
              <boxGeometry args={[3.74, 2.44, 0.01]} />
              <meshStandardMaterial color="#05070b" roughness={0.5} />
            </mesh>
            <mesh position={[0, 2.43, 0.0065]}>
              <circleGeometry args={[0.025, 20]} />
              <meshBasicMaterial ref={camMat} color="#1a1d22" />
            </mesh>

            {/* Display = texture plane (lid-local, tiny forward offset) + glass */}
            <group name="Display">
              <LaptopScreen story={story} />
              <mesh position={[0, SCREEN_Y, 0.0078]}>
                <planeGeometry args={[SCREEN_W, SCREEN_H]} />
                <meshPhysicalMaterial
                  color="#000000"
                  transparent
                  opacity={0.1}
                  roughness={0.06}
                  metalness={0}
                  clearcoat={1}
                  depthWrite={false}
                />
              </mesh>
            </group>
            <pointLight ref={glow} position={[0, SCREEN_Y, 0.8]} color="#22d3ee" intensity={0} distance={4.5} decay={2} />
          </group>
        </group>
      </group>
    </group>
  );
}

function CameraRig() {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const size = useThree((s) => s.size);
  useEffect(() => {
    const aspect = size.width / Math.max(1, size.height);
    const t = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
    const dist = Math.max(1.75 / t, 2.45 / (t * aspect));
    camera.position.set(0, 0.95 + dist * 0.38, dist);
    camera.lookAt(0, 0.95, 0);
    camera.updateProjectionMatrix();
  }, [camera, size]);
  return null;
}

function Scene({ story, drag }: { story: MutableRefObject<Story>; drag: MutableRefObject<Drag> }) {
  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 6, 5]} intensity={1.3} color="#f1f5ff" />
      <directionalLight position={[-5, 3, -5]} intensity={1.1} color="#7dd3fc" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.2} position={[0, 5, 4]} scale={[9, 3, 1]} />
        <Lightformer form="rect" intensity={1.4} color="#22d3ee" position={[-6, 2, -3]} scale={[6, 2, 1]} />
        <Lightformer form="rect" intensity={0.9} position={[6, 1, 2]} scale={[3, 5, 1]} />
      </Environment>
      <LaptopRig story={story} drag={drag} />
      <ContactShadows position={[0, -0.165, 0]} opacity={0.65} scale={9} blur={2.6} far={2} />
    </>
  );
}

// ============================================================================
// 4. WEBGL SAFETY + STATIC FALLBACK
// ============================================================================
function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

class CanvasBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function StaticLaptop({ chapter }: { chapter: number }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-4">
      <div className="w-full max-w-md rounded-t-2xl border-4 border-zinc-700 bg-zinc-900 p-2 shadow-2xl">
        <div className="flex aspect-[16/10] flex-col justify-center rounded-lg bg-[#060a14] p-5 font-mono">
          <p className="text-[10px] text-cyan-400">0{chapter + 1} / {CHAPTERS[chapter].title}</p>
          <p className="mt-2 text-lg font-bold text-white">Chevula Harsha Deep</p>
          <p className="text-xs font-bold text-cyan-400">FULL STACK DEVELOPER</p>
        </div>
      </div>
      <div className="h-3 w-full max-w-[28rem] rounded-b-2xl bg-gradient-to-b from-zinc-600 to-zinc-800" />
    </div>
  );
}

// ============================================================================
// 5. ABOUT SECTION (scroll -> story state, drag -> laptop rotation)
// ============================================================================
export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const story = useRef<Story>({ chapter: 0, awake: false, power: 0 });
  const drag = useRef<Drag>({ yaw: -0.3, pitch: 0, dragging: false, lx: 0, ly: 0, mouse: true });
  const [activeChapter, setActiveChapter] = useState(0);
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setWebgl(hasWebGL() && !reduceMotion);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = Math.max(1, el.offsetHeight - vh);
      const p = clamp01(-rect.top / scrollable);
      const idx = Math.min(Math.floor(p * CHAPTERS.length), CHAPTERS.length - 1);
      story.current.chapter = idx;
      story.current.awake = rect.top < vh * 0.55 && rect.bottom > vh * 0.25;
      setActiveChapter(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [webgl]);

  const jumpTo = (idx: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY + (idx + 0.5) * window.innerHeight;
    window.scrollTo({ top, behavior: "smooth" });
  };

  // horizontal drag rotates the laptop; vertical touch is left to page scroll (story progression)
  const onDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    d.dragging = true;
    d.lx = e.clientX;
    d.ly = e.clientY;
    d.mouse = e.pointerType === "mouse";
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.dragging) return;
    d.yaw = THREE.MathUtils.clamp(d.yaw + (e.clientX - d.lx) * 0.008, -1.15, 1.15);
    if (d.mouse) d.pitch = THREE.MathUtils.clamp(d.pitch + (e.clientY - d.ly) * 0.003, -0.1, 0.16);
    d.lx = e.clientX;
    d.ly = e.clientY;
  };
  const onUp = () => {
    drag.current.dragging = false;
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full overflow-x-clip"
      style={{ height: `${(CHAPTERS.length + 1) * 100}vh` }}
    >
      <div
        className="sticky top-0 flex h-screen w-full flex-col overflow-hidden px-4 py-5 sm:px-8"
        style={{ background: "radial-gradient(ellipse at 50% 45%, #121a2b 0%, #070a12 62%, #04060b 100%)" }}
      >
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-primary">
            <Sparkles size={14} />
            <span>My story</span>
          </div>
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            Drag to rotate the laptop &bull; Scroll to move through the story
          </p>
        </div>

        {/* LAPTOP (hero) */}
        <div
          className="relative mx-auto my-2 min-h-0 w-full max-w-6xl flex-1 cursor-grab select-none active:cursor-grabbing"
          style={{ touchAction: "pan-y" }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          {webgl === null ? (
            <div className="flex h-full items-center justify-center font-mono text-xs text-muted-foreground">
              Loading laptop...
            </div>
          ) : webgl ? (
            <CanvasBoundary fallback={<StaticLaptop chapter={activeChapter} />}>
              <Canvas
                camera={{ fov: 38, position: [0, 3, 7], near: 0.1, far: 60 }}
                dpr={[1, 1.5]}
                gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
                style={{ width: "100%", height: "100%" }}
              >
                <Scene story={story} drag={drag} />
              </Canvas>
            </CanvasBoundary>
          ) : (
            <StaticLaptop chapter={activeChapter} />
          )}
        </div>

        {/* Chapter indicator */}
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-3 border-t border-border/40 pt-3 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary" />
            <span className="font-mono text-xs font-bold tracking-widest text-primary sm:text-sm">
              0{activeChapter + 1} / {CHAPTERS[activeChapter].title}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {CHAPTERS.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => jumpTo(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  idx === activeChapter ? "w-8 bg-primary" : "w-2.5 bg-secondary hover:bg-primary/50"
                }`}
                title={ch.title}
                aria-label={`Jump to ${ch.title}`}
              />
            ))}
          </div>
          <div className="hidden items-center gap-2 font-mono text-[11px] text-muted-foreground sm:flex">
            <RotateCcw size={12} className="text-primary" />
            <span>Drag to rotate</span>
          </div>
        </div>
      </div>
    </section>
  );
}
