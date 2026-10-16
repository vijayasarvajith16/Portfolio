/**
 * "Snap" disintegration: redraws an element (background, border and text) into a canvas,
 * turns every few pixels into a dust grain of that colour, and blows the grains away on a
 * turbulent breeze, sweeping left to right. Played in reverse, the dust reassembles.
 * Browser-only; call from event handlers.
 */

type Grain = {
  x: number; // origin within the element, CSS px
  y: number;
  r: number;
  g: number;
  b: number;
  alpha: number;
  /** Colour the grain turns as it drifts: pale ash, or a gold ember for a few. */
  tint: [number, number, number];
  delay: number; // 0..1, when this grain starts moving
  driftX: number;
  driftY: number;
  phase: number;
};

const STEP = 2; // CSS px between grains
const MARGIN = { left: 16, top: 150, right: 220, bottom: 30 }; // room for the dust to drift into
const GRAIN_TRAVEL = 0.55; // share of the timeline each grain spends moving
const ASH: [number, number, number] = [196, 184, 168];
const EMBER: [number, number, number] = [240, 180, 41];
const EMBER_SHARE = 0.07;

/** Draws the element's box and text into a canvas at `scale`. */
function snapshot(el: HTMLElement, scale: number) {
  const box = el.getBoundingClientRect();
  const w = Math.ceil(box.width);
  const h = Math.ceil(box.height);
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(w * scale);
  canvas.height = Math.ceil(h * scale);
  const ctx = canvas.getContext("2d")!;
  ctx.scale(scale, scale);

  const cs = getComputedStyle(el);
  const radius = parseFloat(cs.borderTopLeftRadius) || 0;
  const page = getComputedStyle(document.body).backgroundColor;
  ctx.beginPath();
  ctx.roundRect(0.5, 0.5, w - 1, h - 1, radius);
  ctx.fillStyle = page; // the card is translucent; settle it on the page colour first
  ctx.fill();
  ctx.fillStyle = cs.backgroundColor;
  ctx.fill();
  ctx.strokeStyle = cs.borderTopColor;
  ctx.lineWidth = 1;
  ctx.stroke();

  // Text: draw each word where the browser laid it out, in its own font and colour.
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  for (let node = walker.nextNode() as Text | null; node; node = walker.nextNode() as Text | null) {
    const parent = node.parentElement;
    if (!parent || !node.data.trim()) continue;
    const pr = parent.getBoundingClientRect();
    if (pr.width <= 1 || pr.height <= 1) continue; // screen-reader-only text
    const ps = getComputedStyle(parent);
    ctx.font = ps.font;
    ctx.fillStyle = ps.color;
    ctx.textBaseline = "middle";
    if ("letterSpacing" in ctx) (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = ps.letterSpacing;
    const upper = ps.textTransform === "uppercase";
    for (const m of node.data.matchAll(/\S+/g)) {
      range.setStart(node, m.index);
      range.setEnd(node, m.index + m[0].length);
      const r = range.getClientRects()[0];
      if (!r) continue;
      ctx.fillText(upper ? m[0].toUpperCase() : m[0], r.left - box.left, r.top - box.top + r.height / 2);
    }
  }
  return { canvas, ctx, w, h };
}

function makeGrains(el: HTMLElement, scale: number): { grains: Grain[]; w: number; h: number } {
  const { ctx, w, h } = snapshot(el, scale);
  const data = ctx.getImageData(0, 0, Math.ceil(w * scale), Math.ceil(h * scale)).data;
  const stride = Math.ceil(w * scale);
  const grains: Grain[] = [];
  for (let y = 0; y < h; y += STEP) {
    for (let x = 0; x < w; x += STEP) {
      const i = (Math.floor(y * scale) * stride + Math.floor(x * scale)) * 4;
      const a = data[i + 3];
      if (a < 12) continue;
      // Sweep from left to right with a ragged, noisy front.
      const sweep = x / w;
      grains.push({
        x,
        y,
        r: data[i],
        g: data[i + 1],
        b: data[i + 2],
        alpha: a / 255,
        tint: Math.random() < EMBER_SHARE ? EMBER : ASH,
        delay: Math.min(1 - GRAIN_TRAVEL, Math.max(0, sweep * 0.32 + Math.random() * 0.13 + (y / h) * 0.04)),
        driftX: 70 + Math.random() * 170,
        driftY: -(25 + Math.random() * 110),
        phase: Math.random() * Math.PI * 2,
      });
    }
  }
  return { grains, w, h };
}

const ease = (t: number) => t * t * (3 - 2 * t);

/**
 * Plays the dust over `el`, inside `host` (a positioned ancestor). Forward blows the
 * element away; reverse reassembles it. Resolves when the animation ends.
 */
export function playDust(el: HTMLElement, host: HTMLElement, { reverse = false, duration = 1800 } = {}) {
  return new Promise<void>((resolve) => {
    const scale = Math.min(window.devicePixelRatio || 1, 1.5);
    const { grains, w, h } = makeGrains(el, scale);

    const cw = w + MARGIN.left + MARGIN.right;
    const ch = h + MARGIN.top + MARGIN.bottom;
    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.width = Math.ceil(cw * scale);
    canvas.height = Math.ceil(ch * scale);
    Object.assign(canvas.style, {
      position: "absolute",
      left: `${el.offsetLeft - MARGIN.left}px`,
      top: `${el.offsetTop - MARGIN.top}px`,
      width: `${cw}px`,
      height: `${ch}px`,
      pointerEvents: "none",
      zIndex: "10",
    });
    host.appendChild(canvas);

    const ctx = canvas.getContext("2d")!;
    const image = ctx.createImageData(canvas.width, canvas.height);
    const pixels = new Uint32Array(image.data.buffer);
    const W = canvas.width;
    const H = canvas.height;
    const block = Math.max(1, Math.round(STEP * scale));
    const start = performance.now();

    function frame(now: number) {
      const raw = Math.min(1, (now - start) / duration);
      const t = reverse ? 1 - ease(raw) : raw;
      pixels.fill(0);
      for (const g of grains) {
        const u = Math.min(1, Math.max(0, (t - g.delay) / GRAIN_TRAVEL));
        const e = u * u * (1.4 - 0.4 * u); // accelerate away like windblown dust
        const fade = Math.pow(1 - u, 1.3);
        if (fade <= 0.02) continue;
        const swirl = Math.sin(g.phase + e * 7 + g.y * 0.05) * 14 * e;
        const px = MARGIN.left + g.x + g.driftX * e + swirl;
        const py = MARGIN.top + g.y + g.driftY * e + Math.cos(g.phase + e * 5 + g.x * 0.04) * 10 * e;
        const X = Math.round(px * scale);
        const Y = Math.round(py * scale);
        if (X < 0 || Y < 0 || X + block > W || Y + block > H) continue;
        // Grains thin out as they travel: shrink the block once they are on the move.
        const size = u > 0.15 ? Math.max(1, block - 1) : block;
        // Dark card pixels turn to pale ash as they lift off, so the cloud reads on a dark page.
        const k = Math.min(1, u * 2.2) * 0.75;
        const r = g.r + (g.tint[0] - g.r) * k;
        const gr = g.g + (g.tint[1] - g.g) * k;
        const b = g.b + (g.tint[2] - g.b) * k;
        const a = Math.round(g.alpha * fade * 255);
        const colour = ((a << 24) | (b << 16) | (gr << 8) | r) >>> 0;
        for (let by = 0; by < size; by++) {
          let idx = (Y + by) * W + X;
          for (let bx = 0; bx < size; bx++) pixels[idx++] = colour;
        }
      }
      ctx.putImageData(image, 0, 0);
      if (raw < 1) requestAnimationFrame(frame);
      else {
        // Let the caller show the real element first, then drop the canvas, so there is no gap.
        resolve();
        requestAnimationFrame(() => canvas.remove());
      }
    }
    requestAnimationFrame(frame);
  });
}
