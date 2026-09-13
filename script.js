/* ============================================================
   A LITTLE SOMETHING FOR YOU — script.js
   Everything you'd want to personalize lives in CONFIG below.
   ============================================================ */

/* ---------------------------------------------------------
   0. Safety net — if GSAP failed to load (a blocked CDN, an
   offline viewer, a restrictive network/ad-blocker), every
   scene below would throw on its first gsap call and stay
   blank. This installs a tiny fallback with the same API
   surface used in this file: it jumps straight to each
   animation's end state instead of animating, so the tree,
   cake, and every other scene still render — just without
   the fancy motion — rather than disappearing entirely.
   --------------------------------------------------------- */
if (typeof window.gsap === "undefined") {
  const resolveTargets = (target) => {
    if (typeof target === "string") return Array.from(document.querySelectorAll(target));
    if (target instanceof Element) return [target];
    if (target && typeof target.length === "number") return Array.from(target);
    return target ? [target] : [];
  };
  const gsapState = new WeakMap();
  const applyVars = (elements, vars) => {
    vars = vars || {};
    elements.forEach((el) => {
      if (!el || !el.style) return;
      const merged = Object.assign({}, gsapState.get(el), vars);
      gsapState.set(el, merged);

      if (merged.opacity !== undefined) el.style.opacity = merged.opacity;
      if (merged.transformOrigin !== undefined) el.style.transformOrigin = merged.transformOrigin;
      if (merged.strokeDashoffset !== undefined) el.style.strokeDashoffset = merged.strokeDashoffset;
      const t = [];
      if (merged.xPercent !== undefined || merged.yPercent !== undefined) {
        t.push(`translate(${merged.xPercent || 0}%, ${merged.yPercent || 0}%)`);
      }
      if (merged.x !== undefined || merged.y !== undefined) {
        t.push(`translate(${merged.x || 0}px, ${merged.y || 0}px)`);
      }
      const rot = merged.rotate !== undefined ? merged.rotate : merged.rotation;
      if (rot !== undefined) t.push(`rotate(${rot}deg)`);
      if (merged.scale !== undefined) {
        t.push(`scale(${typeof merged.scale === "function" ? 1 : merged.scale})`);
      } else if (merged.scaleX !== undefined || merged.scaleY !== undefined) {
        t.push(`scale(${merged.scaleX !== undefined ? merged.scaleX : 1}, ${merged.scaleY !== undefined ? merged.scaleY : 1})`);
      }
      if (t.length) el.style.transform = t.join(" ");
    });
  };

  window.gsap = {
    set(target, vars) { applyVars(resolveTargets(target), vars); return this; },
    to(target, vars) {
      const rest = Object.assign({}, vars);
      const onComplete = rest.onComplete;
      delete rest.onComplete;
      applyVars(resolveTargets(target), rest);
      if (onComplete) onComplete();
      return this;
    },
    fromTo(target, fromVars, toVars) {
      const rest = Object.assign({}, toVars);
      const onComplete = rest.onComplete;
      delete rest.onComplete;
      applyVars(resolveTargets(target), rest);
      if (onComplete) onComplete();
      return this;
    },
    killTweensOf() {},
    timeline(opts) {
      opts = opts || {};
      const tl = {
        to(target, vars) { applyVars(resolveTargets(target), vars); return tl; },
        set(target, vars) { applyVars(resolveTargets(target), vars); return tl; },
        fromTo(target, fromVars, toVars) { applyVars(resolveTargets(target), toVars); return tl; },
        call(fn) { if (fn) fn(); return tl; }
      };
      if (opts.onComplete) setTimeout(opts.onComplete, 0);
      return tl;
    }
  };
}

/* ---------------------------------------------------------
   1. PERSONALIZE ME — edit this object for your own surprise
   --------------------------------------------------------- */
const CONFIG = {
  recipientName: "Arina",
  senderName: "Shubham",

  // Scene 3 — tree
  treeLine1: "Happy Birthday,",
  treeLine2: "My Favorite Person",

  // Scene 4 — balloons (exactly 5 works best with the layout)
  reasons: [
    "You make bad days feel lighter",
    "Your laugh is my favorite sound in the world",
    "You believe in me even when I don't",
    "Every memory with you feels like home",
    "You make ordinary days feel extraordinary"
  ],

  // Scene 5 — gallery. Add "image: 'path/to/photo.jpg'" to any
  // entry to use a real photo instead of the gradient placeholder.
  photos: [
    { caption: "The day it all began", date: "Feb 14, 2023", colors: ["#f6d9c9", "#e8a6a1"], image: null },
    { caption: "Our first trip together", date: "Jun 02, 2023", colors: ["#ddc7ea", "#a685c9"], image: null },
    { caption: "That silly rainy afternoon", date: "Sep 18, 2023", colors: ["#cbe6dd", "#7fb8a6"], image: null },
    { caption: "Dancing in the kitchen", date: "Dec 24, 2023", colors: ["#f2c9d9", "#e087a3"], image: null },
    { caption: "Just another perfect day", date: "Mar 30, 2024", colors: ["#f2ddaf", "#dba85c"], image: null }
  ],

  // Scene 5.5 — cake
  cakeMessage: "Happy Birthday, Arina 🎂",
  cakeTopperText: "Happy Birthday!",

  // Scene 5.5 — favorites filmstrip. "type" is 'image' or 'video'.
  // Leave "src" as null to show a nice placeholder; set it to a real
  // file path (e.g. "assets/temple.jpg") to use your own media.
  favorites: [
    { icon: "🛕", label: "Our Favorite Temple", caption: "Peace, always", type: "image", src: null, colors: ["#e6cfa0", "#b98d4f"] },
    { icon: "🍜", label: "Our Favorite Food", caption: "Comfort in a bowl", type: "image", src: null, colors: ["#f0b199", "#c96a4e"] },
    { icon: "✈️", label: "Our Favorite Place", caption: "Where we belong", type: "image", src: null, colors: ["#a9c9e0", "#5c8fb8"] },
    { icon: "🎬", label: "Our Favorite Movie", caption: "Watched a hundred times", type: "image", src: null, colors: ["#cbb3e0", "#8a5fc9"] },
    { icon: "🎵", label: "Our Song", caption: "Plays in my head, always", type: "image", src: null, colors: ["#e0a3c4", "#c9527f"] }
  ],

  // Scene 6 — letter
  letterSalutation: "Dear Arina,",
  letterBody:
`I still don't know how someone like you came into my life, but I'm endlessly thankful that you did. You make the ordinary feel magical, and every single day with you feels like a gift I didn't know I was allowed to keep.

Here's to more laughter, more quiet mornings, and every little moment in between — with you, always.`,
  letterSignoff: "With all my love,",

  // Scene 6.5 — "Do you love me?" bunny
  questionMessages: [
    "Do you love me?",
    "Wait... are you sure?",
    "Nah that's not right...",
    "Please...?",
    "You're breaking my heart",
    "Okay now you're just playing...",
    "Okay, last chance..."
  ],

  // Scene 6.6 — galaxy of hearts (exactly 10 — one per rose heart)
  galaxyMessages: [
    "Every star out here reminds me of you.",
    "I'd cross a galaxy just to see you smile.",
    "You're my favorite constellation.",
    "Somewhere in this universe, we were always meant to meet.",
    "You make even the vastness of space feel like home.",
    "My heart orbits you.",
    "You're rarer than any star in this sky.",
    "If I had a star for every reason I love you, I'd own the galaxy.",
    "You're the gravity that keeps me grounded.",
    "Forever isn't long enough with you."
  ],

  // Scene 7 — finale card
  finaleCutieLabel: "Cutie"
};

/* ---------------------------------------------------------
   2. Scene order & shared state
   --------------------------------------------------------- */
const SCENES = ["intro", "heart", "tree", "balloons", "gallery", "cake", "letter", "question", "galaxy", "finale"];
let currentKey = "intro";
let gallerySwiperInstance = null;
let heartReleased = false;
let unwrapped = false;
let letterOpened = false;
let typeIntervalId = null;
let poppedCount = 0;
let toastTimeout = null;

const $ = (sel, scope = document) => scope.querySelector(sel);
const $$ = (sel, scope = document) => Array.from(scope.querySelectorAll(sel));
const cssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

/* ---------------------------------------------------------
   3. Viewport height fix (mobile browser chrome)
   --------------------------------------------------------- */
function setVH() {
  document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
}
window.addEventListener("resize", setVH);
window.addEventListener("orientationchange", setVH);
setVH();

/* ---------------------------------------------------------
   4. Ambient night-sky canvas (stars + drifting gold embers)
   --------------------------------------------------------- */
function initSky() {
  const canvas = document.getElementById("sky-canvas");
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let w, h, dpr, stars = [], embers = [];

  function spawnEmber() {
    return {
      x: Math.random() * w,
      y: h + Math.random() * h * 0.3,
      r: (Math.random() * 2 + 1) * dpr,
      speed: (Math.random() * 0.25 + 0.08) * dpr,
      drift: (Math.random() - 0.5) * 0.15 * dpr,
      a: Math.random() * 0.35 + 0.2
    };
  }

  function buildField() {
    const area = window.innerWidth * window.innerHeight;
    const starCount = Math.round(area / 9000);
    const emberCount = Math.round(area / 70000);
    stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h * 0.8,
      r: (Math.random() * 1.3 + 0.3) * dpr,
      baseA: Math.random() * 0.5 + 0.3,
      speed: Math.random() * 0.02 + 0.006,
      phase: Math.random() * Math.PI * 2
    }));
    embers = Array.from({ length: emberCount }, spawnEmber);
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width = window.innerWidth * dpr;
    h = canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    buildField();
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    stars.forEach((s) => {
      const tw = reduceMotion ? s.baseA : s.baseA + Math.sin(t * s.speed + s.phase) * 0.25;
      ctx.beginPath();
      ctx.fillStyle = `rgba(248,236,236,${Math.max(0, tw)})`;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });
    embers.forEach((e) => {
      ctx.beginPath();
      ctx.fillStyle = `rgba(230,181,102,${e.a})`;
      ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
      ctx.fill();
      if (!reduceMotion) {
        e.y -= e.speed;
        e.x += e.drift;
        if (e.y < -10) Object.assign(e, spawnEmber(), { y: h + 10 });
      }
    });
    if (!reduceMotion) requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(draw);
}

/* ---------------------------------------------------------
   5. Floating heart-particle burst (used by heart-pull & balloons)
   --------------------------------------------------------- */
function burstHearts(x, y, count = 16, opts = {}) {
  const spread = opts.spread || 160;
  const sizeMin = opts.sizeMin || 14;
  const sizeMax = opts.sizeMax || 26;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.className = "burst-heart";
    el.textContent = Math.random() > 0.4 ? "♥" : "❤";
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.style.fontSize = (sizeMin + Math.random() * (sizeMax - sizeMin)) + "px";
    el.style.color = Math.random() > 0.5 ? cssVar("--color-rose") : cssVar("--color-gold");
    document.body.appendChild(el);
    gsap.set(el, { xPercent: -50, yPercent: -50 });

    const angle = Math.random() * Math.PI * 2;
    const dist = spread * 0.4 + Math.random() * spread;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - spread * 0.5;

    gsap.to(el, {
      x: dx,
      y: dy,
      opacity: 0,
      rotate: (Math.random() - 0.5) * 200,
      scale: 0.5 + Math.random() * 0.7,
      duration: 1 + Math.random() * 0.7,
      ease: "power2.out",
      onComplete: () => el.remove()
    });
  }
}

/* ---------------------------------------------------------
   6. Scene manager
   --------------------------------------------------------- */
function buildProgressDots() {
  const nav = document.getElementById("progress-dots");
  nav.innerHTML = SCENES.map((s, i) => `<span class="dot" data-i="${i}"></span>`).join("");
}

function updateProgressDots(key) {
  const idx = SCENES.indexOf(key);
  $$("#progress-dots .dot").forEach((d, i) => {
    d.classList.toggle("done", i < idx);
    d.classList.toggle("current", i === idx);
  });
  document.getElementById("progress-dots").classList.toggle("visible", key !== "intro" && key !== "finale");
}

function updateBackButton(key) {
  const idx = SCENES.indexOf(key);
  backBtn.classList.toggle("visible", idx > 0);
  backBtn.classList.toggle("on-light", key === "finale");
  musicBtn.classList.toggle("on-light", key === "finale");
}

function goToScene(key) {
  if (key === currentKey) return;
  const nextEl = document.getElementById(`scene-${key}`);
  const curEl = document.getElementById(`scene-${currentKey}`);
  if (!nextEl) return;

  if (currentKey === "cake" && key !== "cake") stopCakeSparkles();
  if (currentKey === "galaxy" && key !== "galaxy") stopGalaxyDrag();

  currentKey = key;
  updateProgressDots(key);
  updateBackButton(key);

  nextEl.classList.add("active");
  gsap.fromTo(nextEl, { opacity: 0 }, { opacity: 1, duration: 0.7, ease: "power2.out" });

  if (curEl && curEl !== nextEl) {
    gsap.to(curEl, {
      opacity: 0,
      duration: 0.45,
      ease: "power2.out",
      onComplete: () => curEl.classList.remove("active")
    });
  }

  runSceneEnter(key);
}

function runSceneEnter(key) {
  if (key === "intro") resetIntro();
  else if (key === "heart") resetHeart();
  else if (key === "tree") initTree();
  else if (key === "balloons") initBalloons();
  else if (key === "gallery") initGallery();
  else if (key === "cake") initCake();
  else if (key === "letter") initLetter();
  else if (key === "question") initQuestion();
  else if (key === "galaxy") initGalaxy();
  else if (key === "finale") initFinale();
}

// Generic "Continue" button wiring — any element with [data-next]
// advances from its parent .scene to the next scene in SCENES.
$$("[data-next]").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const sceneEl = e.currentTarget.closest(".scene");
    const key = sceneEl.dataset.scene;
    const idx = SCENES.indexOf(key);
    if (idx > -1 && idx < SCENES.length - 1) goToScene(SCENES[idx + 1]);
  });
});

// Back button — steps to the previous scene, hidden on the very first one.
const backBtn = document.getElementById("back-btn");
backBtn.addEventListener("click", () => {
  const idx = SCENES.indexOf(currentKey);
  if (idx > 0) goToScene(SCENES[idx - 1]);
});

// Background music — browsers block audio until a user gesture, so it
// starts on the very first tap anywhere and can be muted/unmuted after.
const bgAudio = document.getElementById("bg-audio");
const musicBtn = document.getElementById("music-btn");
let musicStarted = false;
let musicMuted = false;

function startMusicOnce() {
  if (musicStarted) return;
  musicStarted = true;
  bgAudio.volume = 0.55;
  bgAudio.play().catch(() => { /* still blocked — user can tap the music button */ });
  document.removeEventListener("pointerdown", startMusicOnce);
}
document.addEventListener("pointerdown", startMusicOnce);

musicBtn.addEventListener("click", () => {
  musicMuted = !musicMuted;
  musicBtn.classList.toggle("muted", musicMuted);
  if (musicMuted) {
    bgAudio.pause();
  } else {
    startMusicOnce();
    bgAudio.play().catch(() => {});
  }
});

/* ---------------------------------------------------------
   7. Scene 1 — Intro / Unwrap
   --------------------------------------------------------- */
function initIntro() {
  document.getElementById("intro-name").textContent = CONFIG.recipientName;
}

function resetIntro() {
  unwrapped = false;
  gsap.set("#unwrap-btn", { opacity: 1, y: 0 });
  gsap.set(".envelope__flap", { rotateX: 0 });
  gsap.set(".envelope__glow", { opacity: 0, scale: 1 });
  gsap.set("#envelope", { scale: 1 });
  gsap.set(".scene--intro .scene-inner", { opacity: 1, y: 0 });
}

function playUnwrap() {
  if (unwrapped) return;
  unwrapped = true;
  const tl = gsap.timeline({ onComplete: () => goToScene("heart") });
  tl.to("#unwrap-btn", { opacity: 0, y: 10, duration: 0.3 });
  tl.to(".envelope__flap", { rotateX: -170, duration: 0.6, ease: "power2.inOut" }, "-=0.05");
  tl.to(".envelope__glow", { opacity: 1, scale: 1.7, duration: 0.55 }, "<");
  tl.to("#envelope", { scale: 1.08, duration: 0.4, ease: "power2.out" }, "<0.1");
  tl.to(".scene--intro .scene-inner", { opacity: 0, y: -20, duration: 0.5, ease: "power2.in" }, "+=0.25");
}

document.getElementById("unwrap-btn").addEventListener("click", playUnwrap);
document.getElementById("envelope").addEventListener("click", playUnwrap);

/* ---------------------------------------------------------
   8. Scene 2 — Heart pull & release
   --------------------------------------------------------- */
const heartDrag = document.getElementById("heart-drag");
const heartString = document.getElementById("heart-string");
const heartHint = document.getElementById("heart-hint");

const DRAG_MAX = 130;
const DRAG_THRESHOLD = 88;
let dragging = false;
let dragStartY = 0;
let dragY = 0;

function resetHeart() {
  heartReleased = false;
  dragging = false;
  dragY = 0;
  gsap.set(heartDrag, { xPercent: -50, y: 0, opacity: 1 });
  gsap.set(heartString, { scaleY: 1, opacity: 1 });
  heartHint.style.opacity = 1;
  heartHint.textContent = "Drag down, then release";
}

heartDrag.addEventListener("pointerdown", (e) => {
  if (heartReleased) return;
  dragging = true;
  heartDrag.setPointerCapture(e.pointerId);
  dragStartY = e.clientY;
  heartHint.style.opacity = 0;
});

heartDrag.addEventListener("pointermove", (e) => {
  if (!dragging) return;
  let dy = Math.max(0, e.clientY - dragStartY);
  dy = dy < DRAG_MAX ? dy : DRAG_MAX + (dy - DRAG_MAX) * 0.15;
  dragY = dy;
  gsap.set(heartDrag, { xPercent: -50, y: dy });
  gsap.set(heartString, { scaleY: 1 + dy / 70 });
});

function endDrag() {
  if (!dragging) return;
  dragging = false;
  if (dragY >= DRAG_THRESHOLD) {
    releaseHeart();
  } else {
    gsap.to(heartDrag, { xPercent: -50, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
    gsap.to(heartString, { scaleY: 1, duration: 0.6, ease: "elastic.out(1,0.4)" });
    heartHint.style.opacity = 1;
  }
}
heartDrag.addEventListener("pointerup", endDrag);
heartDrag.addEventListener("pointercancel", endDrag);

function releaseHeart() {
  heartReleased = true;
  const rect = heartDrag.getBoundingClientRect();
  burstHearts(rect.left + rect.width / 2, rect.top + rect.height / 2, 22, { spread: 200 });

  const tl = gsap.timeline({ onComplete: () => setTimeout(() => goToScene("tree"), 250) });
  tl.to(heartString, { opacity: 0, duration: 0.25 });
  tl.to(heartDrag, { xPercent: -50, y: -window.innerHeight * 0.55, opacity: 0, duration: 0.55, ease: "power2.in" }, "<");
  tl.to(heartHint, { opacity: 0, duration: 0.2 }, "<");
}

/* ---------------------------------------------------------
   9. Scene 3 — Growing tree of hearts
   --------------------------------------------------------- */
const SVG_NS = "http://www.w3.org/2000/svg";
const LEAF_HEART_PATH = "M0,-3 C-5,-9 -13,-9 -13,-1 C-13,6 -6,11 0,17 C6,11 13,6 13,-1 C13,-9 5,-9 0,-3 Z";

const BRANCHES = [
  "M200,520 L200,340",
  "M200,400 C170,380 140,350 105,300",
  "M105,300 C90,270 95,240 75,215",
  "M105,300 C120,270 110,240 130,210",
  "M200,370 C230,345 265,320 300,280",
  "M300,280 C315,250 310,220 330,195",
  "M300,280 C290,250 300,220 280,190",
  "M200,340 C180,310 160,280 140,240",
  "M140,240 C125,215 130,185 110,165",
  "M140,240 C150,210 145,185 165,160",
  "M200,340 C220,310 245,280 265,235",
  "M265,235 C280,205 275,180 295,160",
  "M265,235 C255,205 265,180 250,155",
  "M200,340 C200,300 200,260 200,220",
  "M200,220 C185,195 190,165 175,140",
  "M200,220 C215,195 210,165 225,140"
];

const LEAF_POSITIONS = [
  { x: 75, y: 215 }, { x: 130, y: 210 },
  { x: 330, y: 195 }, { x: 280, y: 190 },
  { x: 110, y: 165 }, { x: 165, y: 160 },
  { x: 295, y: 160 }, { x: 250, y: 155 },
  { x: 175, y: 140 }, { x: 225, y: 140 },
  { x: 105, y: 300 }, { x: 300, y: 280 },
  { x: 140, y: 240 }, { x: 265, y: 235 }, { x: 200, y: 220 },
  // extra canopy-filling centers, so the tree blooms fuller
  { x: 95, y: 255 }, { x: 310, y: 235 },
  { x: 150, y: 195 }, { x: 245, y: 195 },
  { x: 200, y: 170 }, { x: 60, y: 245 },
  { x: 340, y: 220 }, { x: 190, y: 250 }
];

function initTree() {
  document.getElementById("tree-line1").textContent = CONFIG.treeLine1;
  document.getElementById("tree-line2").textContent = CONFIG.treeLine2;

  const branchesGroup = document.getElementById("branches-group");
  const heartsGroup = document.getElementById("hearts-group");
  branchesGroup.innerHTML = "";
  heartsGroup.innerHTML = "";

  const continueBtn = document.getElementById("tree-continue");
  continueBtn.hidden = true;
  gsap.set(continueBtn, { opacity: 0, y: 10 });
  gsap.set("#tree-line1, #tree-line2", { opacity: 0, y: 14 });

  const paths = BRANCHES.map((d) => {
    const p = document.createElementNS(SVG_NS, "path");
    p.setAttribute("d", d);
    branchesGroup.appendChild(p);
    return p;
  });
  paths.forEach((p) => {
    const len = p.getTotalLength();
    p.style.strokeDasharray = len;
    p.style.strokeDashoffset = len;
  });

  const leafColors = [
    cssVar("--color-rose"),
    cssVar("--color-blush"),
    cssVar("--color-gold"),
    "#ff8fa3",
    "#caa1de",
    "#f0866a",
    "#8c1f3f",
    "#f6d9a0"
  ];
  const leafEls = [];
  let colorIdx = 0;
  LEAF_POSITIONS.forEach((center) => {
    const clusterSize = 2 + Math.floor(Math.random() * 2); // 2-3 hearts per spot = a fuller bloom
    for (let j = 0; j < clusterSize; j++) {
      const isPrimary = j === 0;
      const jitterX = isPrimary ? 0 : (Math.random() - 0.5) * 34;
      const jitterY = isPrimary ? 0 : (Math.random() - 0.5) * 26;
      const finalScale = isPrimary ? 1 + Math.random() * 0.25 : 0.55 + Math.random() * 0.3;
      const rot = (Math.random() - 0.5) * 40;

      const g = document.createElementNS(SVG_NS, "g");
      g.setAttribute("transform", `translate(${center.x + jitterX},${center.y + jitterY}) rotate(${rot})`);
      const p = document.createElementNS(SVG_NS, "path");
      p.setAttribute("d", LEAF_HEART_PATH);
      p.setAttribute("class", "leaf-heart");
      p.setAttribute("fill", leafColors[colorIdx % leafColors.length]);
      p.dataset.finalScale = finalScale.toFixed(2);
      colorIdx++;
      g.appendChild(p);
      heartsGroup.appendChild(g);
      gsap.set(p, { scale: 0 });
      leafEls.push(p);
    }
  });

  const tl = gsap.timeline({
    onComplete: () => {
      continueBtn.hidden = false;
      gsap.to(continueBtn, { opacity: 1, y: 0, duration: 0.5 });
    }
  });
  tl.to(paths, { strokeDashoffset: 0, duration: 0.85, ease: "power1.inOut", stagger: 0.07 });
  tl.to(leafEls, {
    scale: (i, el) => parseFloat(el.dataset.finalScale),
    duration: 0.45,
    ease: "back.out(2.2)",
    stagger: 0.035
  }, "-=0.3");
  tl.to("#tree-line1, #tree-line2", { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 }, "-=0.35");
}

/* ---------------------------------------------------------
   10. Scene 4 — Pop the balloons
   --------------------------------------------------------- */
const BALLOON_COLORS = ["#e8607e", "#f2b45a", "#caa1de", "#f0866a", "#e0a3c4"];

function initBalloons() {
  const wrap = document.getElementById("balloons-wrap");
  wrap.innerHTML = "";
  poppedCount = 0;

  const zoneWidth = 100 / CONFIG.reasons.length;
  CONFIG.reasons.forEach((reason, i) => {
    const btn = document.createElement("button");
    btn.className = "balloon";
    btn.type = "button";
    btn.setAttribute("aria-label", `Pop balloon ${i + 1}`);
    btn.style.setProperty("--balloon-color", BALLOON_COLORS[i % BALLOON_COLORS.length]);
    btn.style.setProperty("--delay", `${(Math.random() * 2).toFixed(2)}s`);
    btn.style.animationDuration = `${(6 + Math.random() * 3).toFixed(2)}s`;
    // Scatter within a horizontal "zone" per balloon so they spread out
    // rather than cluster, then drift freely via the balloonFloat animation.
    const leftPct = zoneWidth * i + zoneWidth * (0.15 + Math.random() * 0.6);
    const topPct = 16 + Math.random() * 54;
    btn.style.left = `${Math.max(2, Math.min(83, leftPct))}%`;
    btn.style.top = `${topPct}%`;
    btn.innerHTML = `<span class="balloon__body"></span><span class="balloon__knot"></span><span class="balloon__string"></span>`;
    btn.addEventListener("click", () => popBalloon(btn, i));
    wrap.appendChild(btn);
  });
}

function popBalloon(btn, i) {
  if (btn.classList.contains("popped")) return;
  btn.classList.add("popped");
  const rect = btn.getBoundingClientRect();
  burstHearts(rect.left + rect.width / 2, rect.top + rect.height / 2, 10, { spread: 90, sizeMin: 10, sizeMax: 18 });
  poppedCount++;
  showReason(i);
}

function showReason(i) {
  document.getElementById("reason-index").textContent = `Reason #${i + 1}`;
  document.getElementById("reason-text").textContent = CONFIG.reasons[i];
  document.getElementById("reason-overlay").classList.add("visible");
}
document.getElementById("reason-close").addEventListener("click", () => {
  document.getElementById("reason-overlay").classList.remove("visible");
  if (poppedCount >= CONFIG.reasons.length) {
    setTimeout(() => {
      const idx = SCENES.indexOf("balloons");
      if (idx > -1 && idx < SCENES.length - 1) goToScene(SCENES[idx + 1]);
    }, 350);
  }
});

/* ---------------------------------------------------------
   11. Scene 5 — Polaroid gallery (Swiper cards effect)
   --------------------------------------------------------- */
function initGallery() {
  if (gallerySwiperInstance) {
    gallerySwiperInstance.slideTo(0, 0);
    return;
  }
  const wrapper = document.getElementById("gallery-wrapper");
  CONFIG.photos.forEach((photo) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide polaroid";
    const photoInner = photo.image
      ? `<img src="${photo.image}" alt="${photo.caption}" style="width:100%;height:100%;object-fit:cover;border-radius:2px;">`
      : `<span class="polaroid__icon">♥</span>`;
    const bg = photo.image ? "" : `style="background:linear-gradient(155deg, ${photo.colors[0]}, ${photo.colors[1]})"`;
    slide.innerHTML = `
      <div class="polaroid__photo" ${bg}>${photoInner}</div>
      <p class="polaroid__caption">${photo.caption}</p>
      <p class="polaroid__date">${photo.date}</p>`;
    wrapper.appendChild(slide);
  });

  if (typeof Swiper !== "undefined") {
    gallerySwiperInstance = new Swiper(".gallery-swiper", {
      effect: "cards",
      grabCursor: true,
      cardsEffect: { perSlideOffset: 10, perSlideRotate: 4, slideShadows: false },
      touchEventsTarget: "container"
    });
  } else {
    // Swiper failed to load — slides are still in the DOM and visible via
    // the swiper-wrapper's plain CSS flex layout, just without swipe/effects.
    gallerySwiperInstance = { slideTo() {} };
  }
}

/* ---------------------------------------------------------
   11.5. Scene 5.5 — Cake + Favorite Things filmstrip
   --------------------------------------------------------- */
let cakeSparkleInterval = null;
let filmstripBuilt = false;
let cakeDecorBuilt = false;

const DECOR_LAYOUT = [
  { type: "orb", left: "4%", bottom: "2px", size: 15 },
  { type: "rose", left: "18%", bottom: "0px", size: 22 },
  { type: "orb", left: "37%", bottom: "7px", size: 11 },
  { type: "orb", left: "54%", bottom: "0px", size: 19 },
  { type: "rose", left: "73%", bottom: "4px", size: 22 },
  { type: "orb", left: "90%", bottom: "1px", size: 13 }
];

function buildCakeDecor() {
  if (cakeDecorBuilt) return;
  cakeDecorBuilt = true;
  const wrap = document.getElementById("cake-decor");
  DECOR_LAYOUT.forEach((d) => {
    const el = document.createElement("span");
    el.className = `decor-item ${d.type === "orb" ? "decor-orb" : "decor-rose"}`;
    el.style.left = d.left;
    el.style.bottom = d.bottom;
    if (d.type === "orb") {
      el.style.width = d.size + "px";
      el.style.height = d.size + "px";
    }
    wrap.appendChild(el);
  });
}

function startTopperSway(flagEl) {
  gsap.to(flagEl, { rotate: 2.5, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
}

function initCake() {
  document.getElementById("cake-message").textContent = CONFIG.cakeMessage;
  document.getElementById("cake-topper-flag").textContent = CONFIG.cakeTopperText;
  buildFilmstrip();
  buildCakeDecor();

  $$("#cake-candles .candle__flame").forEach((f) => f.classList.remove("out"));

  const stand = document.getElementById("cake-stand");
  const tierTop = document.getElementById("tier-top");
  const tierMid = document.getElementById("tier-mid");
  const tierBottom = document.getElementById("tier-bottom");
  const trims = $$(".cake-trim");
  const glaze = document.getElementById("cake-glaze");
  const candles = document.getElementById("cake-candles");
  const topperFlag = document.getElementById("cake-topper-flag");
  const decorItems = $$("#cake-decor .decor-item");

  gsap.killTweensOf(topperFlag);
  gsap.set(stand, { opacity: 0, y: 10 });
  gsap.set([tierBottom, tierMid, tierTop], { y: -220, opacity: 0 });
  gsap.set(trims, { scaleX: 0, opacity: 0 });
  gsap.set(glaze, { xPercent: -50, scale: 0 });
  gsap.set(candles, { y: 14, opacity: 0 });
  gsap.set(topperFlag, { y: -40, opacity: 0, rotate: -6 });
  gsap.set(".cake-message", { opacity: 0, y: 10 });
  gsap.set("#favorites-section", { opacity: 0, y: 16 });
  decorItems.forEach((el, i) => {
    const fromX = i % 2 === 0 ? -(70 + Math.random() * 40) : 70 + Math.random() * 40;
    gsap.set(el, { x: fromX, y: -50 - Math.random() * 20, scale: 0, opacity: 0 });
  });

  const tl = gsap.timeline({
    onComplete: () => {
      startCakeSparkles();
      gsap.to("#favorites-section", { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" });
    }
  });

  // The three sponge layers float down and stack, bottom tier landing first
  tl.to(stand, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
  tl.to(tierBottom, { y: 0, opacity: 1, duration: 0.65, ease: "bounce.out" }, "-=0.1");
  tl.to(tierMid, { y: 0, opacity: 1, duration: 0.6, ease: "bounce.out" }, "-=0.35");
  tl.to(tierTop, { y: 0, opacity: 1, duration: 0.55, ease: "bounce.out" }, "-=0.32");

  // Gold trims pop into place between the layers
  tl.to(trims, { scaleX: 1, opacity: 1, duration: 0.4, ease: "power2.out", stagger: 0.12 }, "-=0.3");

  // A glaze is poured and settles over the top tier
  tl.to(glaze, { xPercent: -50, scale: 1, duration: 0.5, ease: "power2.out" }, "-=0.05");

  // The topper banner drops in, then sways gently forever
  tl.to(topperFlag, { y: 0, opacity: 1, rotate: 0, duration: 0.55, ease: "back.out(1.8)" }, "-=0.1");
  tl.call(() => startTopperSway(topperFlag));

  // Candles rise onto the top tier
  tl.to(candles, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.35");

  // Gold orbs and roses fly in from alternating sides and land along the base
  tl.to(decorItems, { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.55, ease: "back.out(2.2)", stagger: 0.08 }, "-=0.2");

  tl.to(".cake-message", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.15");
}

function startCakeSparkles() {
  stopCakeSparkles();
  const cakeEl = document.getElementById("cake");
  cakeSparkleInterval = setInterval(() => {
    if (currentKey !== "cake") return;
    const rect = cakeEl.getBoundingClientRect();
    const x = rect.left + rect.width * (0.25 + Math.random() * 0.5);
    const y = rect.top + rect.height * 0.2;
    spawnCakeSparkle(x, y);
  }, 450);
}
function stopCakeSparkles() {
  if (cakeSparkleInterval) clearInterval(cakeSparkleInterval);
  cakeSparkleInterval = null;
}

function spawnCakeSparkle(x, y) {
  const el = document.createElement("div");
  el.className = "cake-sparkle";
  const size = 3 + Math.random() * 3;
  el.style.width = size + "px";
  el.style.height = size + "px";
  el.style.left = x + "px";
  el.style.top = y + "px";
  document.body.appendChild(el);
  gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });
  gsap.to(el, {
    opacity: 1,
    y: -60 - Math.random() * 40,
    x: (Math.random() - 0.5) * 50,
    duration: 0.3,
    ease: "power1.out",
    onComplete: () => {
      gsap.to(el, {
        opacity: 0,
        duration: 0.6,
        delay: 0.4,
        onComplete: () => el.remove()
      });
    }
  });
}

function buildFilmstrip() {
  if (filmstripBuilt) return;
  filmstripBuilt = true;
  const track = document.getElementById("filmstrip-track");
  // Render the list twice back-to-back so the CSS marquee (translateX -50%) loops seamlessly.
  const items = [...CONFIG.favorites, ...CONFIG.favorites];
  items.forEach((fav, i) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "fav-card";
    card.setAttribute("aria-label", fav.label);
    const heartBg = fav.src ? "" : `style="background:linear-gradient(155deg, ${fav.colors[0]}, ${fav.colors[1]})"`;
    const heartMedia = fav.src && fav.type === "image"
      ? `<img src="${fav.src}" alt="${fav.label}" style="width:100%;height:100%;object-fit:cover;">`
      : `<span class="fav-card__icon">${fav.icon}</span>`;
    card.innerHTML = `
      <span class="fav-card__heart" ${heartBg}>
        ${heartMedia}
        <span class="fav-card__play">${fav.type === "video" ? "▶ Play" : "View"}</span>
      </span>
      <span class="fav-card__label">${fav.label}</span>`;
    card.addEventListener("click", () => openFavModal(fav));
    track.appendChild(card);
  });
}

/* ---- Favorite-memory modal ---- */
const favModal = document.getElementById("fav-modal");
function openFavModal(fav) {
  const media = document.getElementById("fav-modal-media");
  media.innerHTML = "";
  if (fav.src && fav.type === "video") {
    media.innerHTML = `<video src="${fav.src}" controls autoplay playsinline></video>`;
  } else if (fav.src) {
    media.innerHTML = `<img src="${fav.src}" alt="${fav.label}">`;
  } else {
    media.style.background = `linear-gradient(155deg, ${fav.colors[0]}, ${fav.colors[1]})`;
    media.innerHTML = `<span class="fav-modal__icon">${fav.icon}</span>`;
  }
  document.getElementById("fav-modal-title").textContent = fav.label;
  document.getElementById("fav-modal-caption").textContent = fav.caption || "";
  favModal.classList.add("visible");
}
function closeFavModal() {
  favModal.classList.remove("visible");
  const video = document.querySelector("#fav-modal-media video");
  if (video) video.pause();
}
document.getElementById("fav-modal-close").addEventListener("click", closeFavModal);
document.getElementById("fav-modal-backdrop").addEventListener("click", closeFavModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && favModal.classList.contains("visible")) closeFavModal();
});

/* ---------------------------------------------------------
   12. Scene 6 — Love letter (wax seal + typewriter)
   --------------------------------------------------------- */
const envelope2 = document.getElementById("envelope2");
const letterPaper = document.getElementById("letter-paper");
const letterHint = document.getElementById("letter-hint");
const letterBodyEl = document.getElementById("letter-body");
const letterContinue = document.getElementById("letter-continue");

function initLetter() {
  letterOpened = false;
  clearInterval(typeIntervalId);
  envelope2.classList.remove("open");
  letterPaper.classList.remove("open");
  letterHint.style.display = "";
  document.getElementById("letter-to").textContent = CONFIG.letterSalutation;
  document.getElementById("letter-sign").textContent = `${CONFIG.letterSignoff}\n— ${CONFIG.senderName}`;
  letterBodyEl.textContent = "";
  letterContinue.hidden = true;
  gsap.set(letterContinue, { opacity: 0, y: 10 });
}

function openLetter() {
  if (letterOpened) return;
  letterOpened = true;
  envelope2.classList.add("open");
  letterHint.style.opacity = 0;
  setTimeout(() => {
    letterPaper.classList.add("open");
    startTypewriter(CONFIG.letterBody);
  }, 1100);
}
envelope2.addEventListener("click", openLetter);

function startTypewriter(text) {
  let idx = 0;
  letterBodyEl.textContent = "";
  typeIntervalId = setInterval(() => {
    idx += 1;
    letterBodyEl.textContent = text.slice(0, idx);
    const caret = document.createElement("span");
    caret.className = "caret";
    letterBodyEl.appendChild(caret);

    if (idx >= text.length) {
      clearInterval(typeIntervalId);
      letterContinue.hidden = false;
      gsap.to(letterContinue, { opacity: 1, y: 0, duration: 0.5 });
    }
  }, 18);
}

/* ---------------------------------------------------------
   12.5. Scene 6.5 — "Do you love me?" bunny
   --------------------------------------------------------- */
const bunnyEl = document.getElementById("bunny");
const questionTextEl = document.getElementById("question-text");
const questionStage = document.getElementById("question-stage");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const bigHeartEl = document.getElementById("big-heart");

let dodgeCount = 0;
let questionResolved = false;

function initQuestion() {
  dodgeCount = 0;
  questionResolved = false;
  bunnyEl.classList.remove("peeking");
  questionTextEl.textContent = CONFIG.questionMessages[0];
  gsap.set(yesBtn, { scale: 1, xPercent: -50, yPercent: -50, x: 0, y: 0 });
  gsap.set(noBtn, { scale: 1, xPercent: -50, yPercent: -50, x: 0, y: 0, opacity: 1 });
  noBtn.style.left = "68%";
  noBtn.style.top = "50%";
  gsap.set(bigHeartEl, { scale: 0.4, opacity: 0, xPercent: -50, yPercent: -50, y: window.innerHeight * 0.65, filter: "blur(0px)" });
  gsap.set(bunnyEl, { opacity: 1, scale: 1 });
  gsap.set(questionStage, { opacity: 1 });
  gsap.set(questionTextEl, { opacity: 1, y: 0 });
}

function dodgeNoButton() {
  if (questionResolved) return;
  dodgeCount++;

  const msgIdx = Math.min(dodgeCount, CONFIG.questionMessages.length - 1);
  questionTextEl.textContent = CONFIG.questionMessages[msgIdx];
  gsap.fromTo(questionTextEl, { opacity: 0.3, y: -6 }, { opacity: 1, y: 0, duration: 0.35 });

  // NO shrinks and drifts to a random safe spot; YES grows a little each time
  const stageRect = questionStage.getBoundingClientRect();
  const margin = 30;
  const randLeftPct = 12 + Math.random() * 76;
  const randTopPct = 15 + Math.random() * 70;
  noBtn.style.left = `${randLeftPct}%`;
  noBtn.style.top = `${randTopPct}%`;

  const noScale = Math.max(0.4, 1 - dodgeCount * 0.09);
  const yesScale = Math.min(1.9, 1 + dodgeCount * 0.14);
  gsap.to(noBtn, { scale: noScale, duration: 0.35, ease: "power2.out" });
  gsap.to(yesBtn, { scale: yesScale, duration: 0.35, ease: "power2.out" });

  if (dodgeCount >= CONFIG.questionMessages.length - 1) {
    gsap.to(noBtn, { opacity: 0.55, duration: 0.3 });
  }
  void stageRect; void margin;
}

// A tap/click would land where the finger touches down, so intercept on
// pointerdown/mouseenter — the button has already moved by the time any
// "click" would register, meaning NO can never actually be pressed.
noBtn.addEventListener("pointerdown", (e) => { e.preventDefault(); dodgeNoButton(); });
noBtn.addEventListener("mouseenter", dodgeNoButton);

yesBtn.addEventListener("click", () => {
  if (questionResolved) return;
  questionResolved = true;
  bunnyEl.classList.add("peeking");

  const bunnyRect = bunnyEl.getBoundingClientRect();
  const burstX = bunnyRect.left + bunnyRect.width * 0.5;
  const burstY = bunnyRect.top + bunnyRect.height * 0.42;

  const tl = gsap.timeline({ onComplete: () => setTimeout(() => goToScene("galaxy"), 200) });
  tl.to([questionTextEl, questionStage], { opacity: 0, duration: 0.35, ease: "power2.out" });
  tl.to(bunnyEl, { scale: 1.06, duration: 0.4, ease: "power2.out" }, "-=0.1");
  tl.call(() => burstHearts(burstX, burstY, 16, { spread: 140, sizeMin: 10, sizeMax: 20 }));
  tl.to(bigHeartEl, { opacity: 1, scale: 1, y: 0, duration: 0.75, ease: "power3.out" }, "-=0.05");
  tl.to(bigHeartEl, { scale: 1.15, duration: 0.25, ease: "sine.inOut", yoyo: true, repeat: 1 });
  tl.to(bunnyEl, { opacity: 0, duration: 0.7, ease: "power1.in" }, "-=0.15");
  tl.to(bigHeartEl, { scale: 16, filter: "blur(46px)", opacity: 0.9, duration: 1.3, ease: "power1.in" }, "<");
});

/* ---------------------------------------------------------
   12.6. Scene 6.6 — Galaxy of hearts (draggable, 10 rose hearts)
   --------------------------------------------------------- */
let galaxyBuilt = false;
let galaxyOffset = { x: 0, y: 0 };
let galaxyDragging = false;
let galaxyDragStart = { x: 0, y: 0, offX: 0, offY: 0 };
let galaxyDragDistance = 0;
let galaxyBounds = { maxX: 0, maxY: 0 };
const GALAXY_PARALLAX = 0.45; // background drifts slower than the hearts = depth
const galaxyViewport = document.getElementById("galaxy-viewport");
const galaxyField = document.getElementById("galaxy-field");
const galaxyCanvas = document.getElementById("galaxy-canvas");

function initGalaxy() {
  buildGalaxyField();
  gsap.set(galaxyField, { x: galaxyOffset.x, y: galaxyOffset.y });
  gsap.set(galaxyCanvas, { x: galaxyOffset.x * GALAXY_PARALLAX, y: galaxyOffset.y * GALAXY_PARALLAX });
  startGalaxyDrag();

  // Reset the message-reveal progress so a replay starts fresh
  galaxyRevealIndex = 0;
  clearInterval(galaxyBannerTypeId);
  galaxyBanner.classList.remove("visible");
  galaxyBannerText.textContent = "";
  $$(".galaxy-heart--rose").forEach((h) => h.classList.remove("collected"));
}

function startGalaxyRotation() {
  // A slow continuous spin gives the whole scene a real "turning galaxy"
  // feel. The moon rotates in the exact same tween as the star/heart field
  // so they always turn together; the background canvas spins slightly
  // slower for parallax depth.
  const galaxyMoon = document.getElementById("galaxy-moon");
  gsap.set([galaxyField, galaxyCanvas, galaxyMoon], { transformOrigin: "50% 50%" });
  gsap.to([galaxyField, galaxyMoon], { rotation: 360, duration: 150, repeat: -1, ease: "none" });
  gsap.to(galaxyCanvas, { rotation: 360, duration: 210, repeat: -1, ease: "none" });
}

function drawGalaxyBackground(canvas, w, h) {
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");

  // Deep space base
  const base = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.4, Math.max(w, h) * 0.75);
  base.addColorStop(0, "#2c1852");
  base.addColorStop(0.35, "#1c0f3a");
  base.addColorStop(0.7, "#130a26");
  base.addColorStop(1, "#0a0512");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, w, h);

  // Soft colored nebula clouds
  const nebulaColors = [
    "rgba(110,150,255,0.30)",
    "rgba(190,120,255,0.26)",
    "rgba(255,140,200,0.20)",
    "rgba(120,220,255,0.16)",
    "rgba(230,181,102,0.10)"
  ];
  for (let i = 0; i < 10; i++) {
    const cx = Math.random() * w;
    const cy = Math.random() * h;
    const r = Math.min(w, h) * (0.18 + Math.random() * 0.24);
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grad.addColorStop(0, nebulaColors[i % nebulaColors.length]);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // The Milky Way band: a wide, softly-glowing diagonal streak densely
  // packed with tiny stars, like looking along the galactic plane.
  ctx.save();
  ctx.translate(w * 0.5, h * 0.46);
  ctx.rotate(-0.4);
  const bandLength = Math.max(w, h) * 1.5;
  const bandWidth = Math.min(w, h) * 0.34;
  const bandGrad = ctx.createLinearGradient(0, -bandWidth / 2, 0, bandWidth / 2);
  bandGrad.addColorStop(0, "rgba(205,215,255,0)");
  bandGrad.addColorStop(0.5, "rgba(215,220,255,0.16)");
  bandGrad.addColorStop(1, "rgba(205,215,255,0)");
  ctx.fillStyle = bandGrad;
  ctx.fillRect(-bandLength / 2, -bandWidth / 2, bandLength, bandWidth);

  const bandStarCount = Math.round((bandLength * bandWidth) / 260);
  for (let i = 0; i < bandStarCount; i++) {
    const bx = (Math.random() - 0.5) * bandLength;
    // denser toward the centerline of the band
    const by = (Math.random() - 0.5) * bandWidth * Math.pow(Math.random(), 1.6);
    const size = Math.random() * 1.3 + 0.25;
    ctx.fillStyle = `rgba(255,255,255,${(Math.random() * 0.7 + 0.25).toFixed(2)})`;
    ctx.beginPath();
    ctx.arc(bx, by, size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // General star scatter across the whole field
  const starCount = Math.round((w * h) / 1600);
  for (let i = 0; i < starCount; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const size = Math.random() * 1.2 + 0.2;
    ctx.fillStyle = `rgba(255,255,255,${(Math.random() * 0.55 + 0.15).toFixed(2)})`;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  // A handful of brighter glowing stars for sparkle
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const r = Math.random() * 2.6 + 1.6;
    const halo = ctx.createRadialGradient(x, y, 0, x, y, r * 7);
    halo.addColorStop(0, "rgba(255,255,255,0.6)");
    halo.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(x, y, r * 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(x, y, r * 0.55, 0, Math.PI * 2);
    ctx.fill();
  }
}

function buildGalaxyField() {
  if (galaxyBuilt) return;
  galaxyBuilt = true;

  // The field now rotates continuously, so it must stay large enough at
  // every angle to fully cover the viewport — a plain 2.2x rectangle was
  // only safe for panning, not spinning. Sizing off the viewport diagonal
  // guarantees no empty corner ever peeks through while it turns.
  const diagonal = Math.hypot(window.innerWidth, window.innerHeight);
  const FIELD_SIZE = Math.max(diagonal * 1.7, Math.max(window.innerWidth, window.innerHeight) * 2.4);
  const FIELD_W = FIELD_SIZE;
  const FIELD_H = FIELD_SIZE;
  const offsetX = -(FIELD_W - window.innerWidth) / 2;
  const offsetY = -(FIELD_H - window.innerHeight) / 2;

  galaxyField.style.width = FIELD_W + "px";
  galaxyField.style.height = FIELD_H + "px";
  galaxyField.style.left = offsetX + "px";
  galaxyField.style.top = offsetY + "px";

  galaxyCanvas.style.width = FIELD_W + "px";
  galaxyCanvas.style.height = FIELD_H + "px";
  galaxyCanvas.style.left = offsetX + "px";
  galaxyCanvas.style.top = offsetY + "px";
  drawGalaxyBackground(galaxyCanvas, FIELD_W, FIELD_H);

  // Bounds are still expressed relative to the viewport so dragging feels
  // consistent regardless of how large the underlying field had to become.
  galaxyBounds.maxX = Math.min((FIELD_W - window.innerWidth) / 2, window.innerWidth * 0.9);
  galaxyBounds.maxY = Math.min((FIELD_H - window.innerHeight) / 2, window.innerHeight * 0.9);

  startGalaxyRotation();

  // A galaxy full of blue hearts, drifting gently — sized/faded for depth
  const blueCount = 220;
  const heartsFrag = document.createDocumentFragment();
  for (let i = 0; i < blueCount; i++) {
    const h = document.createElement("span");
    h.className = "galaxy-heart galaxy-heart--blue";
    h.textContent = "♥";
    h.style.left = Math.random() * FIELD_W + "px";
    h.style.top = Math.random() * FIELD_H + "px";
    const depth = Math.random();
    const size = 7 + depth * 17;
    h.style.fontSize = size + "px";
    h.style.setProperty("--base-opacity", (0.25 + depth * 0.55).toFixed(2));
    h.style.animationDuration = 5 + Math.random() * 4 + "s";
    h.style.animationDelay = -(Math.random() * 6) + "s";
    heartsFrag.appendChild(h);
  }
  galaxyField.appendChild(heartsFrag);

  // Exactly 10 rose hearts — clicking any of them (in whatever order the
  // person finds them) reveals the messages in the order given in CONFIG,
  // not tied to which specific heart was tapped.
  CONFIG.galaxyMessages.forEach(() => {
    const h = document.createElement("button");
    h.type = "button";
    h.className = "galaxy-heart galaxy-heart--rose";
    h.textContent = "♥";
    h.setAttribute("aria-label", "Reveal a message");
    h.style.left = (0.1 + 0.8 * Math.random()) * FIELD_W + "px";
    h.style.top = (0.1 + 0.8 * Math.random()) * FIELD_H + "px";
    h.style.fontSize = 22 + Math.random() * 6 + "px";
    h.style.animationDuration = 4.5 + Math.random() * 3 + "s";
    h.style.animationDelay = -(Math.random() * 5) + "s";
    h.addEventListener("click", () => {
      if (galaxyDragDistance > 6) return; // was a drag, not a tap
      revealGalaxyMessage(h);
    });
    galaxyField.appendChild(h);
  });
}

function clampGalaxyOffset(x, y) {
  return {
    x: Math.max(-galaxyBounds.maxX, Math.min(galaxyBounds.maxX, x)),
    y: Math.max(-galaxyBounds.maxY, Math.min(galaxyBounds.maxY, y))
  };
}

function onGalaxyPointerDown(e) {
  galaxyDragging = true;
  galaxyDragDistance = 0;
  galaxyDragStart = { x: e.clientX, y: e.clientY, offX: galaxyOffset.x, offY: galaxyOffset.y };
  galaxyViewport.classList.add("dragging");
  galaxyViewport.setPointerCapture(e.pointerId);
}
function onGalaxyPointerMove(e) {
  if (!galaxyDragging) return;
  const dx = e.clientX - galaxyDragStart.x;
  const dy = e.clientY - galaxyDragStart.y;
  galaxyDragDistance = Math.max(galaxyDragDistance, Math.hypot(dx, dy));
  const next = clampGalaxyOffset(galaxyDragStart.offX + dx, galaxyDragStart.offY + dy);
  galaxyOffset = next;
  gsap.set(galaxyField, { x: next.x, y: next.y });
  gsap.set(galaxyCanvas, { x: next.x * GALAXY_PARALLAX, y: next.y * GALAXY_PARALLAX });
}
function onGalaxyPointerUp() {
  galaxyDragging = false;
  galaxyViewport.classList.remove("dragging");
}

function startGalaxyDrag() {
  galaxyViewport.addEventListener("pointerdown", onGalaxyPointerDown);
  galaxyViewport.addEventListener("pointermove", onGalaxyPointerMove);
  galaxyViewport.addEventListener("pointerup", onGalaxyPointerUp);
  galaxyViewport.addEventListener("pointercancel", onGalaxyPointerUp);
}
function stopGalaxyDrag() {
  galaxyDragging = false;
  galaxyViewport.classList.remove("dragging");
}

let galaxyRevealIndex = 0;
let galaxyBannerTypeId = null;
const galaxyBanner = document.getElementById("galaxy-banner");
const galaxyBannerText = document.getElementById("galaxy-banner-text");

function revealGalaxyMessage(heartEl) {
  if (heartEl.classList.contains("collected")) return;
  if (galaxyRevealIndex >= CONFIG.galaxyMessages.length) return;
  heartEl.classList.add("collected");
  const message = CONFIG.galaxyMessages[galaxyRevealIndex];
  galaxyRevealIndex++;
  showGalaxyBanner(message);
}

function showGalaxyBanner(text) {
  clearInterval(galaxyBannerTypeId);
  galaxyBanner.classList.add("visible");
  let idx = 0;
  galaxyBannerText.textContent = "";
  galaxyBannerTypeId = setInterval(() => {
    idx++;
    galaxyBannerText.textContent = text.slice(0, idx);
    const caret = document.createElement("span");
    caret.className = "caret";
    galaxyBannerText.appendChild(caret);
    if (idx >= text.length) clearInterval(galaxyBannerTypeId);
  }, 26);
}

/* ---------------------------------------------------------
   13. Scene 7 — Grand finale (confetti + replay/share)
   --------------------------------------------------------- */
function initFinale() {
  document.getElementById("finale-badge-text").textContent = CONFIG.recipientName;
  document.getElementById("finale-cutie").textContent = CONFIG.finaleCutieLabel;
  document.getElementById("finale-sender").textContent = CONFIG.senderName;

  const bunting = $$(".finale-card__bunting");
  const sparkles = $$(".finale-card__sparkle");
  const titleLines = $$(".finale-card__title-line");
  const badge = document.querySelector(".finale-card__badge");
  const illustration = document.querySelector(".finale-card__illustration");
  const cutie = document.querySelector(".finale-card__cutie");
  const fromText = document.querySelector(".finale-card__from");
  const actions = document.querySelector(".finale-card__actions");

  gsap.set(bunting, { opacity: 0, y: -16 });
  gsap.set(sparkles, { opacity: 0, scale: 0 });
  gsap.set(titleLines, { opacity: 0, y: 20 });
  gsap.set(badge, { opacity: 0, y: 16, scale: 0.9 });
  gsap.set(illustration, { opacity: 0, y: 24, scale: 0.9 });
  gsap.set(cutie, { opacity: 0, y: 12 });
  gsap.set(fromText, { opacity: 0 });
  gsap.set(actions, { opacity: 0, y: 14 });

  const tl = gsap.timeline({ onComplete: launchConfetti });
  tl.to(bunting, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" });
  tl.to(sparkles, { opacity: 0.8, scale: 1, duration: 0.4, stagger: 0.15, ease: "back.out(2)" }, "-=0.2");
  tl.to(titleLines, { opacity: 1, y: 0, duration: 0.55, stagger: 0.18, ease: "back.out(1.6)" }, "-=0.1");
  tl.to(badge, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(2)" }, "-=0.1");
  tl.to(illustration, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" }, "-=0.15");
  tl.to(cutie, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, "-=0.25");
  tl.to(fromText, { opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.15");
  tl.to(actions, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.1");
}

let confettiEndTime = 0;
let confettiBurstTimeout = null;

function launchConfetti() {
  if (typeof confetti !== "function") return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const heartShape = confetti.shapeFromText ? confetti.shapeFromText({ text: "❤️", scalar: 2.2 }) : "circle";
  const colors = ["#e6b566", "#c53a5c", "#f5c9d6", "#f8dfa8"];
  confettiEndTime = Date.now() + 2200;

  (function frame() {
    confetti({ particleCount: 3, angle: 60, spread: 65, origin: { x: 0, y: 0.65 }, colors, shapes: [heartShape, "circle"], ticks: 220 });
    confetti({ particleCount: 3, angle: 120, spread: 65, origin: { x: 1, y: 0.65 }, colors, shapes: [heartShape, "circle"], ticks: 220 });
    if (Date.now() < confettiEndTime) requestAnimationFrame(frame);
  })();

  confettiBurstTimeout = setTimeout(() => {
    confetti({ particleCount: 60, spread: 110, origin: { y: 0.5 }, startVelocity: 36, colors, shapes: [heartShape], scalar: 1.3 });
  }, 300);
}

function stopConfetti() {
  confettiEndTime = 0;
  if (confettiBurstTimeout) {
    clearTimeout(confettiBurstTimeout);
    confettiBurstTimeout = null;
  }
  if (typeof confetti !== "undefined" && confetti.reset) confetti.reset();
}

document.getElementById("replay-btn").addEventListener("click", () => {
  stopConfetti();
  galaxyOffset = { x: 0, y: 0 };
  goToScene("intro");
  unwrapped = false;
});

/* ---------------------------------------------------------
   14. Toast
   --------------------------------------------------------- */
function showToast(msg) {
  const toastEl = document.getElementById("toast");
  toastEl.textContent = msg;
  toastEl.classList.add("visible");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toastEl.classList.remove("visible"), 2600);
}

/* ---------------------------------------------------------
   15. Boot
   --------------------------------------------------------- */
buildProgressDots();
initIntro();
initSky();
