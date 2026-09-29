// PIEL DE ARCA — instrumento visual. Physarum (tejido) + steering (venas y "alma"). Sin librerías.
const cv = document.getElementById('c'), ctx = cv.getContext('2d');
const N = 60000, CELL = 3;               // agentes Physarum y tamaño de celda (sube CELL si va lento)
const K = ['sa', 'ra', 'so', 'ss', 'dep', 'dec'];
const M = [ // sa: ángulo sensor, ra: giro, so: distancia sensor, ss: paso, dep: depósito, dec: persistencia
  { sa: .6,  ra: .5, so: 10, ss: 1.1, dep: .22, dec: .93,  pal: 0 }, // 1 tejido
  { sa: .28, ra: .9, so: 18, ss: 1.6, dep: .3,  dec: .965, pal: 1 }, // 2 cicatriz
  { sa: 1.1, ra: .6, so: 6,  ss: .8,  dep: .28, dec: .95,  pal: 2 }, // 3 células
  { sa: .4,  ra: .2, so: 4,  ss: .6,  dep: .3,  dec: .975, pal: 3 }  // 4 coágulo
];
const PAL = [ // 5 paradas: negro → rojo oscuro → morado/rojo → piel
  [[0,0,0],[70,4,22],[140,20,60],[200,90,110],[250,190,170]],
  [[0,0,0],[40,6,60],[110,25,120],[190,70,140],[245,200,215]],
  [[0,0,0],[90,5,20],[190,20,40],[240,110,100],[255,215,185]],
  [[0,0,0],[50,0,25],[120,10,60],[130,50,150],[235,170,190]]];
const lut = new Float32Array(768), tl = new Float32Array(768);
function buildLUT(p, out) {
  for (let k = 0; k < 256; k++) {
    const t = k / 255 * 4, i = Math.min(3, t | 0), f = t - i;
    for (let c = 0; c < 3; c++) out[k * 3 + c] = PAL[p][i][c] + (PAL[p][i + 1][c] - PAL[p][i][c]) * f;
  }
}
let mode = 0, T = M[0], P = {}; K.forEach(k => P[k] = T[k]);
buildLUT(0, lut); buildLUT(0, tl);

let W, H, gw, gh, trail, tmp, ax, ay, aa, img, px, tc, tctx, glowMap, veinC, vctx, activeN = 0, burst = 0, rt;
function noiseMap() {
  const s = 22, cw = Math.ceil(gw / s) + 2, ch = Math.ceil(gh / s) + 2, g = Float32Array.from({ length: cw * ch }, Math.random), m = new Float32Array(gw * gh);
  for (let y = 0; y < gh; y++) for (let x = 0; x < gw; x++) {
    const fx = x / s, fy = y / s, ix = fx | 0, iy = fy | 0; let u = fx - ix, v = fy - iy; u = u * u * (3 - 2 * u); v = v * v * (3 - 2 * v);
    const a = g[iy * cw + ix], b = g[iy * cw + ix + 1], c = g[(iy + 1) * cw + ix], d = g[(iy + 1) * cw + ix + 1];
    m[y * gw + x] = .35 + .65 * ((a + (b - a) * u) * (1 - v) + (c + (d - c) * u) * v);
  }
  return m;
}
function seed(k) { // el tejido nace desde k "heridas"
  const cs = Array.from({ length: k }, () => [gw * (.2 + Math.random() * .6), gh * (.2 + Math.random() * .6)]);
  for (let i = 0; i < N; i++) {
    const c = cs[i % k], a = Math.random() * 6.283, r = Math.sqrt(Math.random()) * Math.min(gw, gh) * .09;
    ax[i] = c[0] + Math.cos(a) * r; ay[i] = c[1] + Math.sin(a) * r; aa[i] = Math.random() * 6.283;
  }
  activeN = k > 1 ? 3000 : 400;
}
function init() {
  W = cv.width = innerWidth; H = cv.height = innerHeight; gw = Math.ceil(W / CELL); gh = Math.ceil(H / CELL);
  trail = new Float32Array(gw * gh); tmp = new Float32Array(gw * gh);
  tc = document.createElement('canvas'); tc.width = gw; tc.height = gh; tctx = tc.getContext('2d');
  img = tctx.createImageData(gw, gh); px = new Uint32Array(img.data.buffer);
  veinC = document.createElement('canvas'); veinC.width = W; veinC.height = H; vctx = veinC.getContext('2d');
  ax = new Float32Array(N); ay = new Float32Array(N); aa = new Float32Array(N);
  glowMap = noiseMap(); seed(1); veins = []; vgrid.clear(); souls = []; soul = soulT = 0;
}

// ---------- Physarum ----------
const S = (x, y) => {
  const xi = x < 0 ? x + gw | 0 : x >= gw ? x - gw | 0 : x | 0, yi = y < 0 ? y + gh | 0 : y >= gh ? y - gh | 0 : y | 0;
  return trail[yi * gw + xi];
};
function step() {
  const { sa, ra, so, dep } = P, cs = Math.cos(sa), sn = Math.sin(sa), n = activeN | 0;
  const sp = P.ss * (1 + burst / 8) * (1 + bass * .4), d = dep * (1 + bass * .6);
  if (burst > 0) burst--;
  for (let i = 0; i < n; i++) {
    let x = ax[i], y = ay[i], a = aa[i]; const c = Math.cos(a), s = Math.sin(a);
    const f = S(x + c * so, y + s * so),
      l = S(x + (c * cs + s * sn) * so, y + (s * cs - c * sn) * so),
      r = S(x + (c * cs - s * sn) * so, y + (s * cs + c * sn) * so);
    if (f > l && f > r) { } else if (f < l && f < r) a += Math.random() < .5 ? -ra : ra; else if (l > r) a -= ra; else if (r > l) a += ra;
    x += Math.cos(a) * sp; y += Math.sin(a) * sp;
    if (x < 0) x += gw; else if (x >= gw) x -= gw; if (y < 0) y += gh; else if (y >= gh) y -= gh;
    ax[i] = x; ay[i] = y; aa[i] = a; trail[(y | 0) * gw + (x | 0)] += d;
  }
}
function diffuse() {
  const dec = P.dec * (soulT ? .9 : 1);
  for (let y = 1; y < gh - 1; y++) for (let x = 1; x < gw - 1; x++) {
    const i = y * gw + x, t = trail[i];
    const s = (trail[i - gw - 1] + trail[i - gw] + trail[i - gw + 1] + trail[i - 1] + t + trail[i + 1] + trail[i + gw - 1] + trail[i + gw] + trail[i + gw + 1]) / 9;
    const v = (t + (s - t) * .6) * dec; tmp[i] = v > 4 ? 4 : v;
  }
  [trail, tmp] = [tmp, trail];
}

// ---------- Audio ----------
let ac, an, fd, srcNode, glow = 0, bass = 0, peak = .05, sens = 1;
const keys = {};
function audioSetup() { if (ac) return; ac = new AudioContext(); an = ac.createAnalyser(); an.fftSize = 1024; an.smoothingTimeConstant = .8; fd = new Uint8Array(an.frequencyBinCount); }
document.getElementById('mic').onclick = async () => {
  audioSetup();
  const s = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
  ac.createMediaStreamSource(s).connect(an); ac.resume();
};
document.getElementById('file').onchange = e => {
  audioSetup(); const aud = document.getElementById('aud');
  aud.src = URL.createObjectURL(e.target.files[0]); aud.style.display = 'block';
  if (!srcNode) { srcNode = ac.createMediaElementSource(aud); srcNode.connect(an); an.connect(ac.destination); }
  ac.resume(); aud.play();
};
function listen() {
  let hi = 0, lo = 0;
  if (an) { // agudos (~6–15 kHz) → brillo rojo; graves → pulso
    an.getByteFrequencyData(fd);
    for (let i = 150; i < 350; i++) hi += fd[i]; hi /= 200 * 255;
    for (let i = 1; i < 9; i++) lo += fd[i]; lo /= 8 * 255;
  }
  peak = Math.max(peak * .9995, hi, .02);
  let tg = Math.min(1, Math.pow(hi / peak, 3) * sens); if (keys.g) tg = 1;
  glow += (tg - glow) * (tg > glow ? .08 : .02); bass += (lo - bass) * .2;
}

// ---------- Venas (steering: wander + seek) ----------
let veins = [], fam = 0, erasing = 0; const vgrid = new Map(), VC = ['rgba(210,50,80,.7)', 'rgba(150,50,150,.65)', 'rgba(235,150,140,.55)'];
const gk = (x, y) => (x / 24 | 0) + ',' + (y / 24 | 0);
function addPt(x, y, f) { const k = gk(x, y); let a = vgrid.get(k); if (!a) vgrid.set(k, a = []); a.push({ x, y, f }); }
function spawnVein(x, y, ang, f) {
  if (veins.length >= 26) return;
  veins.push({ x, y, px: x, py: y, vx: Math.cos(ang) * 1.4, vy: Math.sin(ang) * 1.4, age: 0, life: 300 + Math.random() * 500, f, col: VC[Math.random() * 3 | 0] });
}
function growVeins(x, y) {
  let f = ++fam;
  if (x === undefined) {
    const a = [...vgrid.values()];
    if (a.length && Math.random() < .85) { const c = a[Math.random() * a.length | 0], p = c[Math.random() * c.length | 0]; x = p.x; y = p.y; f = p.f; }
    else { x = Math.random() * W; y = Math.random() * H; }
  }
  spawnVein(x, y, Math.random() * 6.283, f); spawnVein(x, y, Math.random() * 6.283, f);
}
function eraseVeins() { veins = []; vgrid.clear(); erasing = 160; }
function nearest(v) {
  let best = null, bd = 3600; const cx = v.x / 24 | 0, cy = v.y / 24 | 0;
  for (let i = -2; i <= 2; i++) for (let j = -2; j <= 2; j++) {
    const a = vgrid.get((cx + i) + ',' + (cy + j));
    if (a) for (const p of a) { if (p.f === v.f) continue; const d = (p.x - v.x) ** 2 + (p.y - v.y) ** 2; if (d < bd) { bd = d; best = p; } }
  }
  return best;
}
function updateVeins() {
  vctx.lineCap = 'round'; vctx.lineWidth = .9;
  for (const v of veins) {
    v.age++;
    const h = Math.atan2(v.vy, v.vx) + (Math.random() - .5) * .7; // wander
    let fx = Math.cos(h) * .08, fy = Math.sin(h) * .08;
    let join = null;
    if (v.age > 90) { // seek: buscar otra vena y conectarse
      const p = nearest(v);
      if (p) { const dx = p.x - v.x, dy = p.y - v.y, d = Math.hypot(dx, dy); if (d < 4) join = p; else { fx += dx / d * .25; fy += dy / d * .25; } }
    }
    v.vx += fx; v.vy += fy; const sp = Math.hypot(v.vx, v.vy); if (sp > 1.6) { v.vx *= 1.6 / sp; v.vy *= 1.6 / sp; }
    v.px = v.x; v.py = v.y; v.x += v.vx; v.y += v.vy;
    vctx.strokeStyle = v.col; vctx.beginPath(); vctx.moveTo(v.px, v.py); vctx.lineTo(join ? join.x : v.x, join ? join.y : v.y); vctx.stroke();
    if (join) v.dead = 1;
    if (v.age % 5 === 0) addPt(v.x, v.y, v.f);
    if (Math.random() < .004) spawnVein(v.x, v.y, Math.atan2(v.vy, v.vx) + (Math.random() < .5 ? -1 : 1) * (.6 + Math.random() * .5), v.f);
    if (v.age > v.life || v.x < 0 || v.y < 0 || v.x > W || v.y > H) v.dead = 1;
  }
  veins = veins.filter(v => !v.dead);
  if (erasing > 0) {
    vctx.globalCompositeOperation = 'destination-out'; vctx.fillStyle = 'rgba(0,0,0,.05)'; vctx.fillRect(0, 0, W, H);
    vctx.globalCompositeOperation = 'source-over'; if (--erasing === 0) vctx.clearRect(0, 0, W, H);
  }
}

// ---------- Alma (steering: separación + wander) ----------
let souls = [], soul = 0, soulT = 0, flash = 0;
const spr = document.createElement('canvas'); spr.width = spr.height = 128;
{ const g = spr.getContext('2d'), gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  gr.addColorStop(0, 'rgba(255,250,200,1)'); gr.addColorStop(.3, 'rgba(255,225,70,.95)'); gr.addColorStop(.65, 'rgba(255,190,0,.45)'); gr.addColorStop(1, 'rgba(255,170,0,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128); }
function enterSoul() {
  if (soulT) return; soulT = 1; flash = 1; burst = 45;
  const sc = Math.min(W, H) / 900;
  souls = Array.from({ length: 150 }, () => { const a = Math.random() * 6.283, s = 6 + Math.random() * 10; return { x: W / 2, y: H / 2, vx: Math.cos(a) * s, vy: Math.sin(a) * s, r: (6 + Math.pow(Math.random(), 2.2) * 44) * sc, ph: Math.random() * 6.28 }; });
  for (let i = 0; i < N; i++) aa[i] = Math.atan2(ay[i] - gh / 2, ax[i] - gw / 2) + (Math.random() - .5); // el tejido estalla
  eraseVeins();
}
function updateSouls(t) {
  for (const a of souls) {
    let sx = 0, sy = 0;
    for (const b of souls) {
      if (a === b) continue; const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy) || 1, m = (a.r + b.r) * 1.15 + 8;
      if (d < m) { const k = (m - d) / m; sx += dx / d * k; sy += dy / d * k; }
    }
    a.vx += sx * .9 + (Math.random() - .5) * .12; a.vy += sy * .9 + (Math.random() - .5) * .12;
    if (a.x < a.r) a.vx += .3; if (a.x > W - a.r) a.vx -= .3; if (a.y < a.r) a.vy += .3; if (a.y > H - a.r) a.vy -= .3;
    a.vx *= .94; a.vy *= .94; a.x += a.vx; a.y += a.vy;
    const rr = a.r * 1.3 * (1 + bass * .35 + .06 * Math.sin(t / 700 + a.ph));
    ctx.drawImage(spr, a.x - rr, a.y - rr, rr * 2, rr * 2);
  }
}

// ---------- Control ----------
function reconstruct(full) {
  if (full) trail.fill(0); else for (let i = 0; i < trail.length; i++) trail[i] *= .25;
  seed(full ? 1 : 3);
}
function setMode(i) {
  if (soulT) { soulT = 0; flash = 0; reconstruct(true); }
  mode = i; T = M[i]; buildLUT(T.pal, tl);
}
addEventListener('keydown', e => {
  const k = e.key.toLowerCase(); if (e.repeat) return; keys[k] = 1;
  if (/^[1-4]$/.test(k)) setMode(+k - 1); else if (k === '5') enterSoul();
  else if (k === 'v') growVeins(); else if (k === 'b') eraseVeins(); else if (k === 'r') reconstruct(false);
  else if (k === 'h') { const u = document.getElementById('ui'); u.hidden = !u.hidden; }
  else if (k === 'f') document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
  else if (k === 'a') document.getElementById('mic').click();
  else if (k === ',') sens *= .85; else if (k === '.') sens *= 1.18;
});
addEventListener('keyup', e => keys[e.key.toLowerCase()] = 0);
cv.addEventListener('pointerdown', e => { if (!soulT) growVeins(e.clientX, e.clientY); });
addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(init, 250); });

// ---------- Loop ----------
function frame(t) {
  listen();
  for (const k of K) P[k] += (T[k] - P[k]) * .03;
  for (let j = 0; j < 768; j++) lut[j] += (tl[j] - lut[j]) * .04;
  soul += (soulT - soul) * .04; if (Math.abs(soulT - soul) < .002) soul = soulT;
  if (soul < .995) { activeN = Math.min(N, activeN + 15); step(); diffuse(); }

  const f = 1 - soul, gl = glow * f, n = gw * gh;
  for (let i = 0; i < n; i++) { // tejido + luz roja desde abajo
    const k = Math.min(255, trail[i] * 230) | 0, g = gl * glowMap[i] * (1 - k / 300), j = k * 3;
    const r = Math.min(255, lut[j] * f + g * 230), gg = Math.min(255, lut[j + 1] * f + g * 14), b = Math.min(255, lut[j + 2] * f + g * 38);
    px[i] = 0xff000000 | (b << 16) | (gg << 8) | r;
  }
  tctx.putImageData(img, 0, 0);
  ctx.globalCompositeOperation = 'source-over'; ctx.imageSmoothingEnabled = true; ctx.globalAlpha = 1;
  ctx.drawImage(tc, 0, 0, W, H);

  updateVeins();
  ctx.globalAlpha = Math.min(1, (.8 + bass * .4) * f); ctx.drawImage(veinC, 0, 0);
  if (soul > .01) { ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = soul; updateSouls(t); }
  ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
  if (flash > .01) { ctx.fillStyle = `rgba(255,240,170,${flash * .9})`; ctx.fillRect(0, 0, W, H); flash *= .9; }
  requestAnimationFrame(frame);
}
init(); requestAnimationFrame(frame);
