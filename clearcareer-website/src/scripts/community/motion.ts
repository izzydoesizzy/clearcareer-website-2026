/**
 * Motion engine for the /community landing page.
 *
 * Wires Lenis smooth scroll into GSAP ScrollTrigger and drives every
 * scroll-linked behaviour on the page via data-attributes so the markup stays
 * declarative:
 *   [data-cc-reveal]      heading word-by-word reveal
 *   [data-cc-fade]        fade + rise on enter (optional data-cc-delay ms)
 *   [data-cc-stagger]     container whose direct children stagger in
 *   [data-cc-count]       number count-up (data-cc-to, -prefix, -suffix, -decimals)
 *   [data-cc-parallax]    vertical parallax (data-cc-speed, default 0.15)
 *   [data-cc-horizontal]  section pinned while its [data-cc-track] scrolls sideways
 *   [data-cc-progress]    element whose scaleY tracks the section's scroll progress
 *   [data-magnetic]       button/link that eases toward the cursor
 *   [data-cc-tilt]        card that tilts toward the cursor
 *
 * Honours prefers-reduced-motion (everything shown statically, no Lenis, no
 * WebGL) and skips the heavy hero canvas on small / low-capability devices.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const FINE_POINTER = window.matchMedia("(pointer: fine)").matches;
const DESKTOP = window.matchMedia("(min-width: 768px)").matches;

function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function initCommunityMotion() {
  document.documentElement.classList.add("cc-js");

  if (REDUCED) {
    // Show everything; no smooth scroll, no canvas.
    document.querySelectorAll<HTMLElement>("[data-cc-reveal],[data-cc-fade],[data-cc-stagger] > *").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    runCounters(true);
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ── Lenis smooth scroll synced to ScrollTrigger ──
  const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  (window as any).__ccLenis = lenis;
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // anchor links route through Lenis for buttery jumps
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: -40 });
      }
    });
  });

  setupReveals();
  setupFades();
  setupStaggers();
  runCounters(false);
  setupParallax();
  setupHorizontal();
  setupProgress();
  if (FINE_POINTER) {
    setupMagnetic();
    setupTilt();
  }

  // ── lazy WebGL hero ──
  const canvas = document.getElementById("cc-hero-canvas") as HTMLCanvasElement | null;
  if (canvas && DESKTOP && hasWebGL()) {
    import("./hero-webgl")
      .then(({ initHeroWebGL }) => {
        const handle = initHeroWebGL(canvas);
        if (handle) canvas.classList.add("is-active");
      })
      .catch(() => {});
  }

  ScrollTrigger.refresh();
}

// ── heading word reveal ──
function setupReveals() {
  document.querySelectorAll<HTMLElement>("[data-cc-reveal]").forEach((el) => {
    const text = el.textContent ?? "";
    el.innerHTML = "";
    const words = text.split(/(\s+)/);
    const spans: HTMLElement[] = [];
    words.forEach((w) => {
      if (/^\s+$/.test(w)) {
        el.appendChild(document.createTextNode(w));
        return;
      }
      const outer = document.createElement("span");
      outer.style.display = "inline-block";
      outer.style.overflow = "hidden";
      outer.style.verticalAlign = "top";
      const inner = document.createElement("span");
      // Preserve the source element's classes (e.g. gradient bg-clip-text) on each
      // word so styled headings don't lose their fill when split. inline-block via
      // inline style wins over any `block` utility copied here.
      inner.className = el.className;
      inner.style.display = "inline-block";
      inner.textContent = w;
      outer.appendChild(inner);
      el.appendChild(outer);
      spans.push(inner);
    });
    el.style.opacity = "1";
    gsap.set(spans, { yPercent: 115 });
    gsap.to(spans, {
      yPercent: 0,
      duration: 0.9,
      ease: "expo.out",
      stagger: 0.06,
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
  });
}

function setupFades() {
  document.querySelectorAll<HTMLElement>("[data-cc-fade]").forEach((el) => {
    const delay = parseFloat(el.dataset.ccDelay ?? "0") / 1000;
    gsap.fromTo(
      el,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      }
    );
  });
}

function setupStaggers() {
  document.querySelectorAll<HTMLElement>("[data-cc-stagger]").forEach((el) => {
    const kids = Array.from(el.children) as HTMLElement[];
    gsap.fromTo(
      kids,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: "top 82%" },
      }
    );
  });
}

function runCounters(reducedMode: boolean) {
  document.querySelectorAll<HTMLElement>("[data-cc-count]").forEach((el) => {
    const to = parseFloat(el.dataset.ccTo ?? "0");
    const prefix = el.dataset.ccPrefix ?? "";
    const suffix = el.dataset.ccSuffix ?? "";
    const decimals = parseInt(el.dataset.ccDecimals ?? "0", 10);
    const format = (v: number) => `${prefix}${v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
    if (reducedMode) {
      el.textContent = format(to);
      return;
    }
    const obj = { v: 0 };
    el.textContent = format(0);
    gsap.to(obj, {
      v: to,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%" },
      onUpdate: () => {
        el.textContent = format(obj.v);
      },
    });
  });
}

function setupParallax() {
  document.querySelectorAll<HTMLElement>("[data-cc-parallax]").forEach((el) => {
    const speed = parseFloat(el.dataset.ccSpeed ?? "0.15");
    gsap.fromTo(
      el,
      { yPercent: -speed * 100 },
      {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      }
    );
  });
}

// ── pinned horizontal scroll track (desktop only; stacks vertically below md) ──
function setupHorizontal() {
  const mm = gsap.matchMedia();
  mm.add("(min-width: 768px)", () => {
    document.querySelectorAll<HTMLElement>("[data-cc-horizontal]").forEach((section) => {
      const track = section.querySelector<HTMLElement>("[data-cc-track]");
      if (!track) return;
      const getScroll = () => Math.max(0, track.scrollWidth - window.innerWidth);
      if (getScroll() <= 0) return;
      gsap.to(track, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScroll()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });
  });
}

function setupProgress() {
  document.querySelectorAll<HTMLElement>("[data-cc-progress]").forEach((el) => {
    const section = el.closest<HTMLElement>("[data-cc-progress-section]") ?? el.parentElement!;
    gsap.fromTo(
      el,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        transformOrigin: "top",
        scrollTrigger: { trigger: section, start: "top 60%", end: "bottom 70%", scrub: true },
      }
    );
  });
}

function setupMagnetic() {
  document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
    const strength = parseFloat(el.dataset.magneticStrength ?? "0.4");
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      gsap.to(el, { x, y, duration: 0.4, ease: "power3.out" });
    });
    el.addEventListener("pointerleave", () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    });
  });
}

function setupTilt() {
  document.querySelectorAll<HTMLElement>("[data-cc-tilt]").forEach((el) => {
    el.style.transformStyle = "preserve-3d";
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(el, { rotateY: px * 10, rotateX: -py * 10, duration: 0.4, ease: "power2.out" });
    });
    el.addEventListener("pointerleave", () => {
      gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power2.out" });
    });
  });
}
