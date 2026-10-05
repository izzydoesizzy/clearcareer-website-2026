/**
 * Animated WebGL hero background for the /community page.
 *
 * A single full-screen plane runs a fragment shader that renders a slow,
 * flowing aurora of the ClearCareer brand colours (navy -> blue -> teal).
 * Kept deliberately cheap: one draw call, DPR capped, rAF paused when the
 * hero scrolls out of view or the tab is hidden. Lazily imported by motion.ts
 * only on capable, motion-friendly desktop sessions; everything degrades to a
 * CSS gradient painted behind the canvas if this never runs.
 */
import * as THREE from "three";

export interface HeroHandle {
  destroy: () => void;
}

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec2 uMouse;

  // ClearCareer palette
  const vec3 NAVY = vec3(0.011, 0.024, 0.125);   // #030620
  const vec3 BLUE = vec3(0.004, 0.380, 0.937);   // #0161EF
  const vec3 TEAL = vec3(0.024, 0.714, 0.831);   // #06b6d4
  const vec3 GLOW = vec3(0.42, 0.64, 1.0);

  // -- value noise + fbm --------------------------------------------------
  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uRes.x / max(uRes.y, 1.0);
    vec2 p = uv;
    p.x *= aspect;

    float t = uTime * 0.04;
    vec2 mo = (uMouse - 0.5) * 0.35;

    // layered flowing field
    float n1 = fbm(p * 2.2 + vec2(t, t * 0.6) + mo);
    float n2 = fbm(p * 3.4 - vec2(t * 0.8, t) + n1);
    float flow = fbm(p * 1.4 + vec2(n2 * 0.8, -t * 0.5));

    // colour ramp navy -> blue -> teal driven by the field
    float m = smoothstep(-0.4, 0.7, flow);
    vec3 col = mix(NAVY, BLUE, smoothstep(0.15, 0.85, m));
    col = mix(col, TEAL, smoothstep(0.55, 1.0, n2) * 0.55);

    // soft aurora ribbons
    float ribbon = smoothstep(0.42, 0.5, abs(sin(flow * 3.1416 + t * 4.0)));
    col += GLOW * (1.0 - ribbon) * 0.16;

    // radial vignette anchoring content readability
    float d = distance(uv, vec2(0.5, 0.42));
    col = mix(col, NAVY, smoothstep(0.35, 1.05, d) * 0.9);

    // subtle grain to kill banding
    float grain = (hash(uv * uRes + t).x) * 0.025;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export function initHeroWebGL(canvas: HTMLCanvasElement): HeroHandle | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: "high-performance" });
  } catch {
    return null;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const geometry = new THREE.PlaneGeometry(2, 2);

  const uniforms = {
    uTime: { value: 0 },
    uRes: { value: new THREE.Vector2(1, 1) },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
  };

  const material = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const targetMouse = { x: 0.5, y: 0.5 };

  function resize() {
    const parent = canvas.parentElement ?? canvas;
    const w = parent.clientWidth || window.innerWidth;
    const h = parent.clientHeight || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    uniforms.uRes.value.set(w * dpr, h * dpr);
  }

  function onPointer(e: PointerEvent) {
    targetMouse.x = e.clientX / window.innerWidth;
    targetMouse.y = 1.0 - e.clientY / window.innerHeight;
  }

  // pause rendering when off-screen or tab hidden
  let visible = true;
  let running = false;
  let rafId = 0;
  const clock = new THREE.Clock();

  function frame() {
    if (!running) return;
    const dt = clock.getDelta();
    uniforms.uTime.value += dt;
    uniforms.uMouse.value.x += (targetMouse.x - uniforms.uMouse.value.x) * 0.04;
    uniforms.uMouse.value.y += (targetMouse.y - uniforms.uMouse.value.y) * 0.04;
    renderer.render(scene, camera);
    rafId = requestAnimationFrame(frame);
  }

  function start() {
    if (running || !visible || document.hidden) return;
    running = true;
    clock.start();
    rafId = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(rafId);
  }

  const io = new IntersectionObserver(
    (entries) => {
      visible = entries[0]?.isIntersecting ?? false;
      visible ? start() : stop();
    },
    { threshold: 0.01 }
  );
  io.observe(canvas);

  function onVisibility() {
    document.hidden ? stop() : start();
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("pointermove", onPointer, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);
  start();

  return {
    destroy() {
      stop();
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
