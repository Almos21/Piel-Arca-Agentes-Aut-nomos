const POINTS = [
  [0.000, 4.000, 0.300, 0.100, 51.32, 20.00, 0.410, 4.000, 0.000, 0.100, 6.000, 0.100, 0.000, 0.000, 22.0], // 0 pure_multiscale
  [0.000, 28.04, 14.53, 0.090, 1, 0.000, 0.010, 1.400, 1.120, 0.830, 3, 0.000, 0.570, 0.030, 36.0], // 1 hex_hole_open
  [17.92, 2, 0.000, 0.520, 1, 0.000, 0.180, 1, 0.000, 0.100, 6.050, 0.170, 0.000, 0.000, 18.0], // 2 vertebrata
  [3.000, 10.17, 0.400, 1.030, 2.300, 2.000, 1.420, 20.00, 0.750, 0.830, 1.560, 0.110, 1.070, 0.000, 13.0], // 3 star_network
  [0.000, 8.510, 0.190, 0.610, 1, 0.000, 3.350, 1, 0.000, 0.750, 12.62, 0.060, 0.000, 0.000, 34.0], // 4 enmeshed_singularities
  [0.000, 0.820, 0.030, 0.180, 1, 0.000, 0.260, 1, 0.000, 0.000, 20.00, 0.650, 0.200, 0.900, 31.5], // 5 waves_upturn
  [1.500, 1.940, 0.280, 1.730, 1.120, 0.710, 0.180, 2.220, 0.850, 0.500, 4.130, 0.110, 1.120, 0.000, 15.0], // 6 more_individuals
  [2.870, 3.040, 0.280, 0.090, 1, 0.000, 0.440, 0.850, 0.000, 0.000, 2.220, 0.140, 0.300, 0.850, 11.0], // 7 sloppy_bucky
  [0.140, 1.120, 0.190, 0.270, 1.400, 0.000, 1.130, 2.000, 0.390, 0.750, 2.220, 0.190, 0.000, 7.140, 9.00], // 8 massive_structure
  [0.001, 2.540, 0.080, 0.000, 1, 0.000, 3.350, 1, 0.000, 0.100, 12.62, 0.060, 0.000, 0.000, 30.5], // 9 speed_modulation
  [0.000, 28.04, 20.00, 0.180, 26.74, 20.00, 0.010, 1.400, 1.120, 0.830, 3, 0.000, 2.540, 0.000, 39.0], // 10 transmission_tower
  [0.000, 20.00, 3.000, 0.260, 2.150, 4.760, 0.410, 6.600, 12.62, 0.300, 6.600, 0.037, 0.400, 0.040, 28.0], // 11 ink_on_white
  [27.50, 2.000, 2.540, 0.880, 26.74, 0.000, 0.090, 2.000, 1.400, 0.100, 5.000, 7.410, 1.400, 14.25, 12.0], // 12 vanishing_points
  [0.000, 6.000, 100.0, 0.157, 1.000, 1.070, 0.000, 1.000, 5.000, 0.830, 5.000, 20.00, 0.400, 0.000, 8.00], // 13 scaling_nodule_emergence
  [0.000, 15.00, 8.600, 0.030, 1, 0.000, 0.340, 2.000, 1.070, 0.220, 15.00, 0.100, 2.300, 0.820, 38.0], // 14 hyp_offset
  [0.000, 32.88, 402.0, 0.410, 3.000, 0.000, 0.100, 1, 0.000, 0.300, 6.000, 0.000, 0.000, 0.000, 32.0], // 15 strike
  [0.000, 0.800, 0.020, 5.200, 1, 0.000, 0.260, 0.100, 2.790, 0.830, 32.88, 37.74, 0.090, 0.330, 22.0], // 16 clear_spaghetti
  [3.000, 10.17, 0.400, 1.030, 0.308, 0.000, 0.148, 20.00, 0.750, 0.830, 1.560, 0.110, 1.070, 0.040, 9.00], // 17 17 <-- R
  [0.000, 5.000, 0.050, 0.900, 2.800, 0.000, 0.006, 0.840, 1.110, 0.750, 1.200, 0.000, 0.000, 0.000, 21.0], // 18 18 <-- S
  [27.50, 28.04, 0.000, 0.390, 1.400, 0.000, 0.090, 0.846, 1.400, 0.100, 2.031, 0.070, 1.400, 0.030, 15.3], // 19 19 <-- T
  [0.000, 8.500, 0.029, 0.270, 0.000, 0.000, 0.410, 0.000, 0.000, 0.750, 12.62, 0.060, 0.840, 0.000, 31.8], // 20 20 <-- U
  [0.000, 6.370, 5.425, 1.030, 0.000, 0.000, 0.180, 0.289, 0.443, 0.300, 2.200, 0.065, 1.070, 0.040, 19.0], // 21 21 <-- V
  [1.464, 20.00, 80.00, 0.260, 2.150, 4.760, 1.513, 2.000, 12.62, 0.385, 12.62, 0.037, 1.000, 0.000, 25.0], // 22 
  [0.000, 6.000, 100.0, 0.650, 0.175, 1.284, 0.000, 0.600, 5.000, 0.830, 5.395, 20.00, 0.400, 0.000, 8.60], // 23 
];
const POINT_NAMES = ["pure_multiscale", "hex_hole_open", "vertebrata", "star_network", "enmeshed_singularities", "waves_upturn", "more_individuals", "sloppy_bucky", "massive_structure", "speed_modulation", "transmission_tower", "ink_on_white", "vanishing_points", "scaling_nodule_emergence", "hyp_offset", "strike", "clear_spaghetti", "17", "18", "19", "20", "21"];

// ============================================================================
// PIEL DE ARCA — instrumento visual en vivo
// Algoritmo: Physarum (Jeff Jones 2010) con la técnica de "36 Points" (Sage Jenson):
//   parámetro = A + B·x^C, con x = valor del trail sensado (con offsets), respawn periódico.
// Implementación GPU en WebGL2 adaptada del proyecto interactive-physarum de Etienne Jacob (Bleuje),
// que usa los parámetros de 36 Points. Licencia CC BY-NC-SA 3.0 — ver créditos en la página.
// Venas: steering behaviors (wander + seek), en un canvas 2D encima.
// ============================================================================
const Q = new URLSearchParams(location.search);
const TEST = Q.get('test');                      // modo de prueba (sin audio), p.ej. ?test=3
const SIM_W = +(Q.get('w') || 1280);             // ancho de simulación (baja a 960 o 800 si tu GPU sufre)
const DENSITY = +(Q.get('d') || 2.0);            // partículas por píxel de simulación
const S = SIM_W / 1280;                          // escala de longitudes respecto al diseño original
const HEAL = +(Q.get('heal') || 20);          // segundos que tarda en "curarse" (rojo -> morado -> piel) tras cada cambio
const PAL = {
  rojo:    [[6,0,3],[90,4,18],[190,16,36],[236,60,60],[255,150,130]],     // herida abierta
  morado:  [[5,0,8],[52,8,70],[116,30,128],[176,72,160],[232,160,210]],   // cicatrizando
  piel:    [[10,3,4],[84,40,40],[170,100,86],[224,160,130],[250,214,186]],// curado
  amarillo:[[0,0,0],[92,52,0],[222,162,10],[255,224,64],[255,252,214]] };  // alma
// Modos (teclas 1..7 = tejidos, 0 = ALMA). Cada uno es [índice del Point en POINTS, paleta].
// Cambia los números para elegir otros Points; con las teclas [ y ] puedes recorrer los 24 en vivo y ver cuál te gusta.
let MODES = [[0,0],[8,0],[2,0],[1,0],[16,0],[4,0],[6,0],[3,1]];
try { const sv = JSON.parse(localStorage.getItem('pielModes') || 'null'); if (sv && sv.length === MODES.length) MODES = sv; } catch (e) { }
const ALMA = 7;   // el último modo (amarillo) rompe el tejido
const cv = document.getElementById('c'), gl = cv.getContext('webgl2', { antialias: false, alpha: false, preserveDrawingBuffer: !!TEST });
const vc = document.getElementById('v'), vctx = vc.getContext('2d');
let W, H, SIM_H, PW = 2048, PH, N, activeRows;
const ext = gl && gl.getExtension('EXT_color_buffer_float'); gl.getExtension('EXT_float_blend'); gl.getExtension('OES_texture_float_linear');
if (!gl || !ext) document.body.insertAdjacentHTML('beforeend', '<p style="position:fixed;top:40%;width:100%;text-align:center;color:#eab">Necesitas un navegador con WebGL2 (Chrome, Edge o Firefox recientes).</p>');

// ---------- utilidades GL ----------
const VS_Q = `#version 300 es
void main(){ vec2 p=vec2((gl_VertexID&1)*2-1,(gl_VertexID>>1)*2-1); gl_Position=vec4(p,0,1); }`;
const GLSL_COMMON = `#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
float h21(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float vnoise(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.-2.*f);
 return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y); }
uniform vec2 uSim; uniform float uTime; uniform vec2 uC; uniform float uR, uWd;
float lerper(vec2 p){ // 1 = aún "nuevo modo" (zona alcanzada por el frente), 0 = modo de fondo
 float d=length((p-uC)/uSim.y)*(0.86+0.28*vnoise(p/uSim.y*5.+uTime*.25));
 return 1.-smoothstep(uR-uWd,uR,d); }
`;
function sh(type, src) { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s), src.split('\n').map((l, i) => (i + 1) + ' ' + l).join('\n')); return s; }
function prog(vs, fs) { const p = gl.createProgram(); gl.attachShader(p, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(p); if (!gl.getProgramParameter(p, gl.LINK_STATUS)) console.error(gl.getProgramInfoLog(p)); p.u = {}; p.l = n => p.u[n] ?? (p.u[n] = gl.getUniformLocation(p, n)); return p; }
function tex(w, h, ifmt, fmt, type, data, filter) {
  const t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t);
  gl.texImage2D(gl.TEXTURE_2D, 0, ifmt, w, h, 0, fmt, type, data || null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); return t; }
function fbo(t) { const f = gl.createFramebuffer(); gl.bindFramebuffer(gl.FRAMEBUFFER, f); gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0); return f; }
function bindTex(u, unit, t, p, name) { gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t); gl.uniform1i(p.l(name), unit); }

// ---------- shaders ----------
const P_MOVE = prog(VS_Q, GLSL_COMMON + `
uniform sampler2D uP, uT; uniform float uA[15], uB[15]; uniform float uS, uGrowR, uReset; uniform vec2 uOrigin; uniform int uFrame;
out vec4 o;
uint hh(uint v){ v=v*747796405u+2891336453u; uint w=((v>>((v>>28u)+4u))^v)*277803737u; return (w>>22u)^w; }
float rnd(inout uint s){ s=hh(s); return float(s)*(1./4294967296.); }
float sampleT(vec2 p){ ivec2 S=ivec2(uSim); ivec2 q=ivec2(floor(p+.5)); q=((q%S)+S)%S; return texelFetch(uT,q,0).x; }
void main(){
 ivec2 ip=ivec2(gl_FragCoord.xy);
 vec4 s=texelFetch(uP,ip,0); vec2 pos=s.xy; float hd=s.z, age=s.w;
 uint seed=uint(ip.x)*1973u ^ uint(ip.y)*9277u ^ uint(uFrame)*26699u ^ 911u;
 float lp=lerper(pos); float P[15];
 for(int i=0;i<15;i++) P[i]=mix(uA[i],uB[i],lp);
 vec2 dir=vec2(cos(hd),sin(hd));
 float sv=clamp(sampleT(pos+P[13]*uS*dir+vec2(0.,P[12]*uS))*P[14],1e-9,1.);
 float sd=P[0]*uS+P[2]*pow(sv,P[1])*250.*uS;
 float md=P[9]*uS+P[11]*pow(sv,P[10])*250.*uS;
 float sa=P[3]+P[5]*pow(sv,P[4]);
 float ra=P[6]+P[8]*pow(sv,P[7]);
 float sl=sampleT(pos+sd*vec2(cos(hd-sa),sin(hd-sa)));
 float sm=sampleT(pos+sd*dir);
 float sr=sampleT(pos+sd*vec2(cos(hd+sa),sin(hd+sa)));
 float nh=hd;
 if(sm>sl&&sm>sr){} else if(sm<sl&&sm<sr){ nh = rnd(seed)<.5 ? hd-ra : hd+ra; }
 else if(sr<sl) nh=hd-ra; else if(sl<sr) nh=hd+ra;
 vec2 np=pos+md*vec2(cos(nh),sin(nh));
 np=mod(np,uSim);
 if(age<0.001 || uReset>.5){ // respawn (36 Points): reaparece al azar, limitado por el radio de crecimiento
   vec2 p=vec2(rnd(seed),rnd(seed))*uSim;
   if(uReset>.5){ float a=rnd(seed)*6.2832, r=sqrt(rnd(seed))*.05*uSim.y; p=uOrigin+r*vec2(cos(a),sin(a)); age=rnd(seed); nh=rnd(seed)*6.2832; }
   vec2 d=p-uOrigin; float len=length(d/uSim.y); if(len>uGrowR) d*=uGrowR/len;
   np=mod(uOrigin+d,uSim); }
 o=vec4(np,mod(nh,6.28318531),fract(age+0.001));
}`);
const P_COUNT = prog(`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
uniform sampler2D uP; uniform vec2 uSim; uniform int uPW;
void main(){ int id=gl_VertexID; vec4 s=texelFetch(uP,ivec2(id%uPW,id/uPW),0);
 vec2 p=(mod(floor(s.xy+.5),uSim)+.5)/uSim*2.-1.; gl_Position=vec4(p,0,1); gl_PointSize=1.; }`,
 `#version 300 es
precision highp float; out vec4 o; void main(){ o=vec4(1,0,0,0); }`);
const P_DIFF = prog(VS_Q, GLSL_COMMON + `
uniform sampler2D uT, uCnt; uniform float uDec, uDep; out vec4 o;
void main(){ ivec2 p=ivec2(gl_FragCoord.xy), S=ivec2(uSim); vec2 sum=vec2(0);
 for(int dy=-1;dy<=1;dy++) for(int dx=-1;dx<=1;dx++){ ivec2 q=((p+ivec2(dx,dy))%S+S)%S;
  float c=min(texelFetch(uCnt,q,0).x,100.); vec2 t=texelFetch(uT,q,0).xy; sum+=vec2(t.x+sqrt(c)*uDep,t.y); }
 sum/=9.; float cur=sum.x*uDec; o=vec4(cur,.8*cur+.2*sum.y,0,1); }`);
const P_SHOW = prog(VS_Q, GLSL_COMMON + `
uniform sampler2D uT, uCnt; uniform vec2 uRes; uniform vec3 uPR[5], uPP[5], uPS[5], uPY[5];
uniform float uGlow, uBass, uFlash, uPalBg, uPalPen, uHeal; uniform vec2 uTC[3]; uniform float uTT[3], uTS[3];
float healAge(vec2 p){ float nz=.86+.28*vnoise(p/uSim.y*5.);
 for(int i=0;i<3;i++){ float d=length((p-uTC[i])/uSim.y)*nz; float a=uTime-uTT[i]-d/uTS[i]; if(a>=0.) return a; }
 return 1000.; }
out vec4 o;
vec3 grad(vec3 st[5], float f){ f=clamp(f,0.,1.)*4.; int i=int(min(f,3.)); float t=f-float(i); return mix(st[i],st[i+1],t); }
void main(){ vec2 uv=gl_FragCoord.xy/uRes;
 float c=texture(uCnt,uv).x; float ty=texture(uT,uv).y;
 float cv=min(1.,pow(tanh(7.5*pow(max(0.,(c-1.)/1000.),.3)),8.5)*1.1);
 float tv=min(1.,pow(tanh(9.*pow(max(0.,(250.*ty-1.)/1100.),.3)),8.5)*1.05);
 float v=smoothstep(.05,1.,clamp(max(cv,tv*.9),0.,1.));
 float lp=lerper(uv*uSim);
 float age=healAge(uv*uSim); float hh=clamp(age/uHeal,0.,1.);
 vec3 ch=mix(mix(grad(uPR,v),grad(uPP,v),smoothstep(0.,.5,hh)),grad(uPS,v),smoothstep(.45,1.,hh))/255.;
 ch*=1.+.6*exp(-age*1.1); ch+=exp(-age*1.6)*vec3(.28,.0,.03)*(.35+v); // borde de la herida: recién "abierta"
 vec3 cy=grad(uPY,v)/255.;
 vec3 col=mix(mix(ch,cy,uPalBg),mix(ch,cy,uPalPen),lp);
 float g=.35+.65*vnoise(uv*vec2(uRes.x/uRes.y,1.)*3.+vec2(uTime*.04,0.)) ;
 col+=uGlow*g*vec3(.85,.05,.12)*(1.-v*.85);
 col*=1.+uBass*.18;
 col=mix(col,vec3(1.,.94,.62),uFlash);
 o=vec4(col,1); }`);

// ---------- estado ----------
let POINT_BG, POINT_PEN, palBg = 0, palPen = 0, trR = -1, trC = [0, 0], trSpeed = .55, trW = .14, flash = 0;
let pA, pB, tA, tB, fA, fB, tTA, tTB, fTA, fTB, cntT, cntF, cur = 0, curT = 0, frameNo = 0, growR = .08, growT0 = 0, resetFlag = 0, originSim = [0, 0];
let hasMouse = false, mx = 0, my = 0, soul = 0, soulT = 0;
function P(i) { return Float32Array.from(POINTS[i]); }
function init() {
  W = vc.width = cv.width = innerWidth; H = vc.height = cv.height = innerHeight;
  SIM_H = Math.round(SIM_W * H / W); PH = Math.ceil(SIM_W * SIM_H * DENSITY / PW); N = PW * PH; activeRows = PH;
  const d = new Float32Array(N * 4), cx = SIM_W / 2, cy = SIM_H / 2;
  for (let i = 0; i < N; i++) { const a = Math.random() * 6.283, r = Math.sqrt(Math.random()) * .06 * SIM_H; d[i * 4] = TEST ? Math.random() * SIM_W : cx + Math.cos(a) * r; d[i * 4 + 1] = TEST ? Math.random() * SIM_H : cy + Math.sin(a) * r; d[i * 4 + 2] = Math.random() * 6.283; d[i * 4 + 3] = Math.random(); }
  pA = tex(PW, PH, gl.RGBA32F, gl.RGBA, gl.FLOAT, d, gl.NEAREST); pB = tex(PW, PH, gl.RGBA32F, gl.RGBA, gl.FLOAT, null, gl.NEAREST);
  fA = fbo(pA); fB = fbo(pB);
  tTA = tex(SIM_W, SIM_H, gl.RGBA16F, gl.RGBA, gl.HALF_FLOAT, null, gl.NEAREST); tTB = tex(SIM_W, SIM_H, gl.RGBA16F, gl.RGBA, gl.HALF_FLOAT, null, gl.NEAREST);
  fTA = fbo(tTA); fTB = fbo(tTB);
  cntT = tex(SIM_W, SIM_H, gl.RGBA16F, gl.RGBA, gl.HALF_FLOAT, null, gl.LINEAR); cntF = fbo(cntT);
  growT0 = performance.now() / 1000; growR = .08; originSim = [cx, cy]; cur = curT = 0; TR.length = 0; pushTr([cx, cy], .06);
}
function origin() { return hasMouse ? [mx / W * SIM_W, (1 - my / H) * SIM_H] : [SIM_W / 2, SIM_H / 2]; }
function commit() { if (trR >= 0) { POINT_BG = POINT_PEN; palBg = palPen; trR = -1; } }
function setMode(i, fast) {
  if (i < 0 || i >= MODES.length) return; commit();
  POINT_PEN = P(MODES[i][0]); palPen = MODES[i][1]; trC = origin(); pushTr(trC, fast ? 1.5 : .5); trR = 0; trSpeed = fast ? 1.5 : .5; trW = fast ? .22 : .14;
  soulT = (i === ALMA) ? 1 : 0; if (i === ALMA) { flash = 1; eraseVeins(); } mode = i;
}
let mode = 0; const TR = [];   // últimos cambios (nuevo primero): de aquí sale la "edad" de cada zona
function pushTr(c, sp) { TR.unshift({ c: [c[0], c[1]], t0: performance.now() / 1000, sp }); TR.length = Math.min(TR.length, 3); }
let browseI = -1;
function browse(d) { browseI = (browseI + d + POINTS.length) % POINTS.length; commit(); POINT_PEN = P(browseI); palPen = 0; trC = origin(); pushTr(trC, .5); trR = 0; trSpeed = .5; trW = .14; soulT = 0;
  const slot = MODES.findIndex((m, i) => i < ALMA && m[0] === browseI);
  label('Point ' + (browseI + 1) + ' de ' + POINTS.length + ' · ' + (POINT_NAMES[browseI] || 'sin nombre') + (slot >= 0 ? '   (ya está en la tecla ' + (slot + 1) + ')' : '   → Shift+1…7 lo guarda en esa tecla')); }
let lblT; function label(t) { const e = document.getElementById('lbl'); e.textContent = t; e.style.opacity = 1; clearTimeout(lblT); lblT = setTimeout(() => e.style.opacity = 0, 4500); }
const PA = Object.fromEntries(Object.entries(PAL).map(([k, v]) => [k, new Float32Array(v.flat())]));

// ---------- audio ----------
let ac, an, fd, glow = 0, bass = 0, peak = .05, sens = 1; const keys = {};
const aud = document.getElementById('aud');
function audioSetup() { if (ac) return; ac = new (window.AudioContext || window.webkitAudioContext)(); an = ac.createAnalyser(); an.fftSize = 1024; an.smoothingTimeConstant = .8; fd = new Uint8Array(an.frequencyBinCount); }
async function startSong() {
  audioSetup(); await ac.resume();
  if (!aud._wired) { ac.createMediaElementSource(aud).connect(an); an.connect(ac.destination); aud._wired = true; }
  try { await aud.play(); return true; } catch (e) { return false; }
}
async function startMic() {
  audioSetup(); await ac.resume();
  const s = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
  ac.createMediaStreamSource(s).connect(an);
}
function listen() {
  let hi = 0, lo = 0;
  if (an) { an.getByteFrequencyData(fd); for (let i = 150; i < 350; i++) hi += fd[i]; hi /= 200 * 255; for (let i = 1; i < 9; i++) lo += fd[i]; lo /= 8 * 255; }
  peak = Math.max(peak * .9995, hi, .02);
  let tg = Math.min(1, Math.pow(hi / peak, 3) * sens); if (keys.g) tg = 1;
  glow += (tg - glow) * (tg > glow ? .08 : .02); bass += (lo - bass) * .2;
}

// ---------- venas (steering: wander + seek) ----------
let veins = [], fam = 0, erasing = 0; const vgrid = new Map(), VC = ['rgba(210,50,80,.7)', 'rgba(150,50,150,.65)', 'rgba(235,150,140,.55)'];
const gk = (x, y) => (x / 24 | 0) + ',' + (y / 24 | 0);
function addPt(x, y, f) { const k = gk(x, y); let a = vgrid.get(k); if (!a) vgrid.set(k, a = []); a.push({ x, y, f }); }
function spawnVein(x, y, ang, f) { if (veins.length >= 26) return; veins.push({ x, y, px: x, py: y, vx: Math.cos(ang) * 1.4, vy: Math.sin(ang) * 1.4, age: 0, life: 300 + Math.random() * 500, f, col: VC[Math.random() * 3 | 0] }); }
function growVeins(x, y) {
  let f = ++fam;
  if (x === undefined) { const a = [...vgrid.values()]; if (a.length && Math.random() < .85) { const c = a[Math.random() * a.length | 0], p = c[Math.random() * c.length | 0]; x = p.x; y = p.y; f = p.f; } else { x = Math.random() * W; y = Math.random() * H; } }
  spawnVein(x, y, Math.random() * 6.283, f); spawnVein(x, y, Math.random() * 6.283, f);
}
function eraseVeins() { veins = []; vgrid.clear(); erasing = 160; }
function nearest(v) {
  let best = null, bd = 3600; const cx = v.x / 24 | 0, cy = v.y / 24 | 0;
  for (let i = -2; i <= 2; i++) for (let j = -2; j <= 2; j++) { const a = vgrid.get((cx + i) + ',' + (cy + j)); if (a) for (const p of a) { if (p.f === v.f) continue; const d = (p.x - v.x) ** 2 + (p.y - v.y) ** 2; if (d < bd) { bd = d; best = p; } } }
  return best;
}
function updateVeins() {
  vctx.lineCap = 'round'; vctx.lineWidth = 1;
  for (const v of veins) {
    v.age++; const h = Math.atan2(v.vy, v.vx) + (Math.random() - .5) * .7; let fx = Math.cos(h) * .08, fy = Math.sin(h) * .08, join = null;
    if (v.age > 90) { const p = nearest(v); if (p) { const dx = p.x - v.x, dy = p.y - v.y, d = Math.hypot(dx, dy); if (d < 4) join = p; else { fx += dx / d * .25; fy += dy / d * .25; } } }
    v.vx += fx; v.vy += fy; const sp = Math.hypot(v.vx, v.vy); if (sp > 1.6) { v.vx *= 1.6 / sp; v.vy *= 1.6 / sp; }
    v.px = v.x; v.py = v.y; v.x += v.vx; v.y += v.vy;
    vctx.strokeStyle = v.col; vctx.beginPath(); vctx.moveTo(v.px, v.py); vctx.lineTo(join ? join.x : v.x, join ? join.y : v.y); vctx.stroke();
    if (join) v.dead = 1; if (v.age % 5 === 0) addPt(v.x, v.y, v.f);
    if (Math.random() < .004) spawnVein(v.x, v.y, Math.atan2(v.vy, v.vx) + (Math.random() < .5 ? -1 : 1) * (.6 + Math.random() * .5), v.f);
    if (v.age > v.life || v.x < 0 || v.y < 0 || v.x > W || v.y > H) v.dead = 1;
  }
  veins = veins.filter(v => !v.dead);
  if (erasing > 0) { vctx.globalCompositeOperation = 'destination-out'; vctx.fillStyle = 'rgba(0,0,0,.05)'; vctx.fillRect(0, 0, W, H); vctx.globalCompositeOperation = 'source-over'; if (--erasing === 0) vctx.clearRect(0, 0, W, H); }
}

// ---------- bucle ----------
let last = 0, ft = 16, tick = 0;
function quad() { gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); }
function frame(t) {
  const dt = Math.min(.05, (t - last) / 1000 || .016); last = t; ft += (Math.min(80, dt * 1000) - ft) * .05;
  listen(); const now = performance.now() / 1000;
  if (!TEST && ++tick % 40 === 0) { // calidad adaptativa: menos partículas si la GPU va justa
    if (ft > 21 && activeRows > PH * .3) activeRows = Math.max(Math.floor(PH * .3), Math.floor(activeRows * .88)); else if (ft < 13 && activeRows < PH) activeRows = Math.min(PH, Math.ceil(activeRows * 1.05)); }
  if (trR >= 0) { trR += trSpeed * dt; if (trR - trW > 2.4) commit(); }
  soul += (soulT - soul) * .03; vc.style.opacity = 1 - soul; flash *= .92;
  growR = TEST ? 9 : .08 + (now - growT0) * .06;

  gl.disable(gl.BLEND);
  // 1) mover partículas
  gl.useProgram(P_MOVE); const pm = P_MOVE;
  gl.bindFramebuffer(gl.FRAMEBUFFER, cur ? fA : fB); gl.viewport(0, 0, PW, activeRows);
  bindTex('uP', 0, cur ? pB : pA, pm, 'uP'); bindTex('uT', 1, curT ? tTB : tTA, pm, 'uT');
  gl.uniform2f(pm.l('uSim'), SIM_W, SIM_H); gl.uniform1f(pm.l('uTime'), now); gl.uniform2f(pm.l('uC'), trC[0], trC[1]);
  gl.uniform1f(pm.l('uR'), trR >= 0 ? trR : 0); gl.uniform1f(pm.l('uWd'), trR >= 0 ? trW : .05);
  gl.uniform1fv(pm.l('uA'), POINT_BG); gl.uniform1fv(pm.l('uB'), POINT_PEN || POINT_BG);
  gl.uniform1f(pm.l('uS'), S); gl.uniform1f(pm.l('uGrowR'), growR); gl.uniform1f(pm.l('uReset'), resetFlag); gl.uniform2f(pm.l('uOrigin'), originSim[0], originSim[1]); gl.uniform1i(pm.l('uFrame'), frameNo++);
  quad(); resetFlag = 0; cur ^= 1;
  // 2) contar partículas por píxel (equivale al atomicAdd del original)
  const pNow = cur ? pB : pA;
  gl.bindFramebuffer(gl.FRAMEBUFFER, cntF); gl.viewport(0, 0, SIM_W, SIM_H); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
  gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE); gl.useProgram(P_COUNT);
  bindTex('uP', 0, pNow, P_COUNT, 'uP'); gl.uniform2f(P_COUNT.l('uSim'), SIM_W, SIM_H); gl.uniform1i(P_COUNT.l('uPW'), PW);
  gl.drawArrays(gl.POINTS, 0, PW * activeRows); gl.disable(gl.BLEND);
  // 3) depósito + difusión + decay
  gl.useProgram(P_DIFF); gl.bindFramebuffer(gl.FRAMEBUFFER, curT ? fTA : fTB); gl.viewport(0, 0, SIM_W, SIM_H);
  bindTex('uT', 0, curT ? tTB : tTA, P_DIFF, 'uT'); bindTex('uCnt', 1, cntT, P_DIFF, 'uCnt');
  gl.uniform2f(P_DIFF.l('uSim'), SIM_W, SIM_H); gl.uniform1f(P_DIFF.l('uDec'), .75); gl.uniform1f(P_DIFF.l('uDep'), .003); quad(); curT ^= 1;
  // 4) mostrar
  gl.useProgram(P_SHOW); gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.viewport(0, 0, W, H);
  bindTex('uT', 0, curT ? tTB : tTA, P_SHOW, 'uT'); bindTex('uCnt', 1, cntT, P_SHOW, 'uCnt');
  gl.uniform2f(P_SHOW.l('uSim'), SIM_W, SIM_H); gl.uniform1f(P_SHOW.l('uTime'), now); gl.uniform2f(P_SHOW.l('uC'), trC[0], trC[1]);
  gl.uniform1f(P_SHOW.l('uR'), trR >= 0 ? trR : 0); gl.uniform1f(P_SHOW.l('uWd'), trR >= 0 ? trW : .05); gl.uniform2f(P_SHOW.l('uRes'), W, H);
  gl.uniform3fv(P_SHOW.l('uPR'), PA.rojo); gl.uniform3fv(P_SHOW.l('uPP'), PA.morado); gl.uniform3fv(P_SHOW.l('uPS'), PA.piel); gl.uniform3fv(P_SHOW.l('uPY'), PA.amarillo);
  gl.uniform1f(P_SHOW.l('uPalBg'), palBg); gl.uniform1f(P_SHOW.l('uPalPen'), trR >= 0 ? palPen : palBg); gl.uniform1f(P_SHOW.l('uHeal'), HEAL);
  const tc = new Float32Array(6), tt = new Float32Array(3).fill(1e9), ts = new Float32Array(3).fill(1);
  TR.forEach((q, i) => { tc[i * 2] = q.c[0]; tc[i * 2 + 1] = q.c[1]; tt[i] = q.t0; ts[i] = q.sp; });
  gl.uniform2fv(P_SHOW.l('uTC'), tc); gl.uniform1fv(P_SHOW.l('uTT'), tt); gl.uniform1fv(P_SHOW.l('uTS'), ts);
  gl.uniform1f(P_SHOW.l('uGlow'), glow * (1 - soul)); gl.uniform1f(P_SHOW.l('uBass'), bass); gl.uniform1f(P_SHOW.l('uFlash'), flash * .85); quad();
  updateVeins();
  if (TEST && frameNo >= +Q.get('n') ) window.__done = true;
  requestAnimationFrame(frame);
}

// ---------- control ----------
function setPanel(show) { document.getElementById('ui').hidden = !show; document.documentElement.classList.toggle('nocur', !show); } // sin panel = sin cursor
function reconstruct() { originSim = origin(); pushTr(originSim, .06); resetFlag = 1; growT0 = performance.now() / 1000; growR = .02; }
addEventListener('keydown', e => {
  const k = e.key.toLowerCase(); if (e.repeat) return; keys[k] = 1;
  if (e.shiftKey && /^Digit[1-7]$/.test(e.code)) { const n = +e.code.slice(5) - 1; MODES[n] = [browseI, 0]; try { localStorage.setItem('pielModes', JSON.stringify(MODES)); } catch (x) { } label('Tecla ' + (n + 1) + ' = Point ' + (browseI + 1) + ' · ' + POINT_NAMES[browseI]); }
  else if (/^[1-9]$/.test(k)) setMode(+k - 1); else if (k === '0') setMode(ALMA, true);
  else if (k === '[' || k === ']') browse(k === ']' ? 1 : -1); else if (k === 'v') growVeins(); else if (k === 'b') eraseVeins(); else if (k === 'r') reconstruct();
  else if (k === 'h') setPanel(document.getElementById('ui').hidden);
  else if (k === 'f') document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
  else if (k === 'p') { aud.paused ? aud.play() : aud.pause(); } else if (k === ',') sens *= .85; else if (k === '.') sens *= 1.18;
});
addEventListener('keyup', e => keys[e.key.toLowerCase()] = 0);
addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; hasMouse = true; });
document.addEventListener('pointerleave', () => hasMouse = false);
addEventListener('pointerdown', e => { if (e.target === document.documentElement || e.target === vc || e.target === cv) if (!soulT) growVeins(e.clientX, e.clientY); });
addEventListener('resize', () => { clearTimeout(init._t); init._t = setTimeout(() => { init(); }, 300); });

init(); POINT_BG = P(MODES[0] ? MODES[0][0] : 0); palBg = MODES[0] ? MODES[0][1] : 0;
if (TEST) { POINT_BG = P(+TEST); palBg = +(Q.get('pal') || 0); document.getElementById('start').hidden = true; document.getElementById('ui').hidden = true; requestAnimationFrame(frame); }
else {
  const st = document.getElementById('start'), msg = document.getElementById('msg');
  const go = () => { st.hidden = true; setPanel(false); label('H muestra el panel y el cursor'); growT0 = performance.now() / 1000; TR[0].t0 = growT0; requestAnimationFrame(frame); };
  document.getElementById('bSong').onclick = async () => { const ok = await startSong(); if (!ok) { msg.textContent = 'No pude reproducir cancion.mp3 (¿está en la misma carpeta que index.html?). Arranco sin audio; puedes cargar un archivo abajo.'; } go(); };
  document.getElementById('bMic').onclick = async () => { try { await startMic(); } catch (e) { msg.textContent = 'No se pudo abrir el micrófono.'; } go(); };
  document.getElementById('bNone').onclick = go;
  document.getElementById('file').onchange = async e => { aud.src = URL.createObjectURL(e.target.files[0]); await startSong(); if (st.hidden === false) go(); };
}
