// PIEL DE ARCA — instrumento visual. Physarum (tejido) + steering (venas y "alma"). Sin libreríasso.
const cv = document.getElementById('c'), ctx = cv.getContext('2d');
let N = 0;                                // agentes (se calcula según la resolución de la simulación)
const GRID = 520;                         // ancho de la rejilla: más alto = tejido más fino, pero más pesado
// Estilo 36 Points: cada parámetro p(v) = a + b·v^c, con v = valor del trail bajo la partícula (0..1)
// [sa: ángulo sensor, ra: giro, so: distancia sensor, ss: paso] (a,b,c) c/u, luego vs, dep, dec, resp, gain, paleta
const M = [
  [.78,0,1, .45,.7,1, 6,0,1, 1.1,-.4,1, .5,.1,.72,.02, 2.5, 0], // 1 tejido
  [.78,0,1, .78,0,1, 6,0,1, 1,0,1,      .5,.1,.75,.01, 2.5, 1], // 2 cicatriz
  [.6,.5,1, .3,1.5,1.2, 6,0,1, 1.5,-1,1, .4,.25,.88,.015, 1.2, 2], // 3 pliegues
  [.78,0,1, .5,.6,1, 7,0,1, 1.2,-.5,1,  .5,.1,.75,.02, 2.5, 3], // 4 fibras
  [.6,.5,1, .1,2,1, 5,0,1, 1.4,-1.1,1,  .4,.15,.8,.006, 2, 4]   // 5 alma: manchas + telaraña
];
const PAL = [ // 5 paradas por paleta
  [[0,0,0],[70,4,22],[140,20,60],[200,90,110],[250,190,170]],
  [[0,0,0],[40,6,60],[110,25,120],[190,70,140],[245,200,215]],
  [[0,0,0],[90,5,20],[190,20,40],[240,110,100],[255,215,185]],
  [[0,0,0],[50,0,25],[120,10,60],[130,50,150],[235,170,190]],
  [[0,0,0],[90,50,0],[220,160,10],[255,220,60],[255,250,210]]]; // alma: amarillo
const lut = new Float32Array(768), tl = new Float32Array(768);
function buildLUT(p, out) {
  for (let k = 0; k < 256; k++) {
    const t = k / 255 * 4, i = Math.min(3, t | 0), f = t - i;
    for (let c = 0; c < 3; c++) out[k * 3 + c] = PAL[p][i][c] + (PAL[p][i + 1][c] - PAL[p][i][c]) * f;
  }
}
let mode = 0, T = M[0]; const P = Float32Array.from(M[0]);
buildLUT(0, lut); buildLUT(0, tl);
const G = new Uint8Array(1024); for (let i = 0; i < 1024; i++) G[i] = 255 * Math.pow(i / 1023, .6);
const QN = 256, qcs = new Float32Array(QN + 1), qsn = new Float32Array(QN + 1), qra = new Float32Array(QN + 1), qso = new Float32Array(QN + 1), qss = new Float32Array(QN + 1);
function buildQ() { // tabla de parámetros según el valor del trail (evita pow por agente)
  for (let k = 0; k <= QN; k++) {
    const v = k / QN, sa = P[0] + P[1] * Math.pow(v, P[2]);
    qcs[k] = Math.cos(sa); qsn[k] = Math.sin(sa);
    qra[k] = Math.max(0, P[3] + P[4] * Math.pow(v, P[5]));
    qso[k] = Math.max(1, P[6] + P[7] * Math.pow(v, P[8]));
    qss[k] = Math.max(.05, P[9] + P[10] * Math.pow(v, P[11]));
  }
}

let W, H, gw, gh, trail, tmp, ax, ay, aa, img, px, tc, tctx, glowMap, veinC, vctx, activeN = 0, burst = 0, rt, reach = 0, centers = [[0, 0]];
function noiseMap() {
  const s = 22, cw = Math.ceil(gw / s) + 2, ch = Math.ceil(gh / s) + 2, g = Float32Array.from({ length: cw * ch }, Math.random), m = new Float32Array(gw * gh);
  for (let y = 0; y < gh; y++) for (let x = 0; x < gw; x++) {
    const fx = x / s, fy = y / s, ix = fx | 0, iy = fy | 0; let u = fx - ix, v = fy - iy; u = u * u * (3 - 2 * u); v = v * v * (3 - 2 * v);
    const a = g[iy * cw + ix], b = g[iy * cw + ix + 1], c = g[(iy + 1) * cw + ix], d = g[(iy + 1) * cw + ix + 1];
    m[y * gw + x] = .35 + .65 * ((a + (b - a) * u) * (1 - v) + (c + (d - c) * u) * v);
  }
  return m;
}
function seed(k) { // el tejido nace desde k "heridas" y se extiende (reach crece)
  centers = Array.from({ length: k }, () => [gw * (.2 + Math.random() * .6), gh * (.2 + Math.random() * .6)]);
  reach = Math.min(gw, gh) * .09;
  for (let i = 0; i < N; i++) {
    const c = centers[i % k], a = Math.random() * 6.283, r = Math.sqrt(Math.random()) * reach;
    ax[i] = c[0] + Math.cos(a) * r; ay[i] = c[1] + Math.sin(a) * r; aa[i] = Math.random() * 6.283;
  }
  activeN = k > 1 ? N * .05 : 400;
}
function init() {
  W = cv.width = innerWidth; H = cv.height = innerHeight; gw = Math.min(GRID, Math.ceil(W / 2)); gh = Math.ceil(gw * H / W);
  N = Math.round(gw * gh * .45);
  trail = new Float32Array(gw * gh); tmp = new Float32Array(gw * gh);
  tc = document.createElement('canvas'); tc.width = gw; tc.height = gh; tctx = tc.getContext('2d');
  img = tctx.createImageData(gw, gh); px = new Uint32Array(img.data.buffer);
  veinC = document.createElement('canvas'); veinC.width = W; veinC.height = H; vctx = veinC.getContext('2d');
  ax = new Float32Array(N); ay = new Float32Array(N); aa = new Float32Array(N);
  glowMap = noiseMap(); seed(1); veins = []; vgrid.clear(); soul = soulT = 0;
}

// ---------- Physarum ----------
const S = (x, y) => {
  const xi = x < 0 ? x + gw | 0 : x >= gw ? x - gw | 0 : x | 0, yi = y < 0 ? y + gh | 0 : y >= gh ? y - gh | 0 : y | 0;
  return trail[yi * gw + xi];
};
function step() {
  const iv = QN / P[12], d = P[13] * (1 + bass * .6), resp = P[15], spm = (1 + burst / 8) * (1 + bass * .4), n = activeN | 0, uni = reach >= gw * .6;
  if (burst > 0) burst--;
  for (let i = 0; i < n; i++) {
    let x = ax[i], y = ay[i], a = aa[i];
    let k = trail[(y | 0) * gw + (x | 0)] * iv; k = k >= QN ? QN : k | 0;
    const cs = qcs[k], sn = qsn[k], ra = qra[k], so = qso[k], c = Math.cos(a), s = Math.sin(a);
    const f = S(x + c * so, y + s * so),
      l = S(x + (c * cs + s * sn) * so, y + (s * cs - c * sn) * so),
      r = S(x + (c * cs - s * sn) * so, y + (s * cs + c * sn) * so);
    if (f > l && f > r) { } else if (f < l && f < r) a += Math.random() < .5 ? -ra : ra; else if (l > r) a -= ra; else if (r > l) a += ra;
    const sp = qss[k] * spm; x += Math.cos(a) * sp; y += Math.sin(a) * sp;
    if (Math.random() < resp) { // reaparición periódica
      if (uni) { x = Math.random() * gw; y = Math.random() * gh; }
      else { const cc = centers[i % centers.length], rr = Math.sqrt(Math.random()) * reach, q = Math.random() * 6.283; x = cc[0] + Math.cos(q) * rr; y = cc[1] + Math.sin(q) * rr; }
    }
    if (x < 0) x += gw; else if (x >= gw) x -= gw; if (y < 0) y += gh; else if (y >= gh) y -= gh;
    ax[i] = x; ay[i] = y; aa[i] = a; trail[(y | 0) * gw + (x | 0)] += d;
  }
}
function diffuse() {
  const dec = P[14];
  for (let y = 1; y < gh - 1; y++) for (let x = 1; x < gw - 1; x++) {
    const i = y * gw + x;
    const v = (trail[i - gw - 1] + trail[i - gw] + trail[i - gw + 1] + trail[i - 1] + trail[i] + trail[i + 1] + trail[i + gw - 1] + trail[i + gw] + trail[i + gw + 1]) / 9 * dec;
    tmp[i] = v > 4 ? 4 : v;
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

// ---------- Alma: mismo Physarum con otros parámetros (manchas unidas por telaraña), en amarillo ----------
let soul = 0, soulT = 0, flash = 0;
function enterSoul() {
  if (soulT) return; soulT = 1; flash = 1; burst = 45; applyMode(4); activeN = N;
  for (let i = 0; i < N; i++) aa[i] = Math.atan2(ay[i] - gh / 2, ax[i] - gw / 2) + (Math.random() - .5); // el tejido estalla
  for (let i = 0; i < trail.length; i++) trail[i] *= .35;
  eraseVeins();
}

// ---------- Control ----------
function reconstruct(full) {
  if (full) trail.fill(0); else for (let i = 0; i < trail.length; i++) trail[i] *= .25;
  seed(full ? 1 : 3);
}
function applyMode(i) { mode = i; T = M[i]; buildLUT(T[17], tl); }
function setMode(i) { if (soulT) { soulT = 0; flash = 0; } applyMode(i); }
addEventListener('keydown', e => {
  const k = e.key.toLowerCase(); if (e.repeat) return; keys[k] = 1;
  if (/^[1-4]$/.test(k)) setMode(+k - 1); else if (k === '5') enterSoul();
  else if (k === 'v') { if (!soulT) growVeins(); } else if (k === 'b') eraseVeins(); else if (k === 'r') reconstruct(false);
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
  for (let j = 0; j < 17; j++) P[j] += (T[j] - P[j]) * .03;
  for (let j = 0; j < 768; j++) lut[j] += (tl[j] - lut[j]) * .04;
  soul += (soulT - soul) * .04; buildQ();
  activeN = Math.min(N, activeN + 15); reach += .15; step(); diffuse();

  const gl = glow * (1 - soul), n = gw * gh, gain = P[16] * 256;
  for (let i = 0; i < n; i++) { // tejido + luz roja desde abajo
    const k = G[Math.min(1023, trail[i] * gain | 0)], g = gl * glowMap[i] * (1 - k / 300), j = k * 3;
    const r = Math.min(255, lut[j] + g * 230), gg = Math.min(255, lut[j + 1] + g * 14), b = Math.min(255, lut[j + 2] + g * 38);
    px[i] = 0xff000000 | (b << 16) | (gg << 8) | r;
  }
  tctx.putImageData(img, 0, 0);
  ctx.globalAlpha = 1; ctx.imageSmoothingEnabled = true; ctx.drawImage(tc, 0, 0, W, H);

  updateVeins();
  ctx.globalAlpha = Math.min(1, (.8 + bass * .4) * (1 - soul)); ctx.drawImage(veinC, 0, 0); ctx.globalAlpha = 1;
  if (flash > .01) { ctx.fillStyle = `rgba(255,240,170,${flash * .9})`; ctx.fillRect(0, 0, W, H); flash *= .9; }
  requestAnimationFrame(frame);
}
init(); requestAnimationFrame(frame);
