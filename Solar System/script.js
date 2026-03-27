const PLANETS = {
  sun:     { radius: 4.2,  trueRadius: 696, distance: 0,    trueDistance: 0,       speed: 0,       color: 0xff8c00, emissive: 0xff4400, emissiveIntensity: 2.5,  name: 'Sol',     mass: '1.989 × 10³⁰ kg', diameter: '1,391,000 km', temp: '5,778 K',   moons: '—',  type: 'G-Type Star',  orbitalPeriod: '—',        distAU: 0 },
  mercury: { radius: 0.38, trueRadius: 2.4, distance: 14,   trueDistance: 77.3,   speed: 0.0048,  color: 0xb5b5b5, emissive: 0x333333, emissiveIntensity: 0.1,  name: 'Mercury', mass: '3.30 × 10²³ kg',  diameter: '4,879 km',     temp: '167°C',     moons: '0',  type: 'Terrestrial',  orbitalPeriod: '88 days',   distAU: 0.387 },
  venus:   { radius: 0.95, trueRadius: 6,   distance: 20,   trueDistance: 108.2,  speed: 0.0035,  color: 0xe8c97a, emissive: 0x8b6914, emissiveIntensity: 0.2,  name: 'Venus',   mass: '4.87 × 10²⁴ kg',  diameter: '12,104 km',    temp: '464°C',     moons: '0',  type: 'Terrestrial',  orbitalPeriod: '225 days',  distAU: 0.723 },
  earth:   { radius: 1.0,  trueRadius: 6.4, distance: 28,   trueDistance: 149.6,  speed: 0.003,   color: 0x4fa3e0, emissive: 0x1a4f6e, emissiveIntensity: 0.3,  name: 'Earth',   mass: '5.97 × 10²⁴ kg',  diameter: '12,742 km',    temp: '15°C',      moons: '1',  type: 'Terrestrial',  orbitalPeriod: '365 days',  distAU: 1.000 },
  mars:    { radius: 0.53, trueRadius: 3.4, distance: 38,   trueDistance: 227.9,  speed: 0.0024,  color: 0xd05a2c, emissive: 0x6b2a10, emissiveIntensity: 0.2,  name: 'Mars',    mass: '6.39 × 10²³ kg',  diameter: '6,779 km',     temp: '-60°C',     moons: '2',  type: 'Terrestrial',  orbitalPeriod: '687 days',  distAU: 1.524 },
  jupiter: { radius: 2.8,  trueRadius: 71,  distance: 56,   trueDistance: 778.5,  speed: 0.0013,  color: 0xc88b3a, emissive: 0x5c3d10, emissiveIntensity: 0.15, name: 'Jupiter', mass: '1.90 × 10²⁷ kg',  diameter: '139,820 km',   temp: '-110°C',    moons: '95', type: 'Gas Giant',    orbitalPeriod: '12 years',  distAU: 5.203 },
  saturn:  { radius: 2.3,  trueRadius: 60,  distance: 76,   trueDistance: 1432,   speed: 0.00096, color: 0xe4d191, emissive: 0x7a6830, emissiveIntensity: 0.15, name: 'Saturn',  mass: '5.68 × 10²⁶ kg',  diameter: '116,460 km',   temp: '-140°C',    moons: '146',type: 'Gas Giant',    orbitalPeriod: '29 years',  distAU: 9.537 },
  uranus:  { radius: 1.6,  trueRadius: 25,  distance: 96,   trueDistance: 2867,   speed: 0.00068, color: 0x7de8e8, emissive: 0x2a7a7a, emissiveIntensity: 0.2,  name: 'Uranus',  mass: '8.68 × 10²⁵ kg',  diameter: '50,724 km',    temp: '-195°C',    moons: '28', type: 'Ice Giant',    orbitalPeriod: '84 years',  distAU: 19.19 },
  neptune: { radius: 1.5,  trueRadius: 25,  distance: 114,  trueDistance: 4515,   speed: 0.00054, color: 0x4b70dd, emissive: 0x1a2d6e, emissiveIntensity: 0.25, name: 'Neptune', mass: '1.02 × 10²⁶ kg',  diameter: '49,244 km',    temp: '-200°C',    moons: '16', type: 'Ice Giant',    orbitalPeriod: '165 years', distAU: 30.07 }
};
 
const PLANET_FACTS = {
  sun:     ['The Sun contains 99.86% of the total mass of the Solar System.', 'Every second, the Sun converts 4 million tons of matter into energy.', 'Light from the Sun takes 8 minutes 20 seconds to reach Earth.', 'The Sun is halfway through its 10-billion-year lifespan.'],
  mercury: ['Mercury has no atmosphere, so temperatures swing 600°C between day and night.', 'A day on Mercury is longer than its year.', 'Mercury shrinks slightly as its iron core slowly cools.', 'Despite being closest to the Sun, Venus is hotter than Mercury.'],
  venus:   ['Venus rotates backwards compared to most planets.', 'A day on Venus is longer than its year.', 'Venus has crushing atmospheric pressure 90× greater than Earth\'s.', 'The surface of Venus is hot enough to melt lead.'],
  earth:   ['Earth is the only known planet with active plate tectonics.', 'The Moon is the fifth-largest natural satellite in the Solar System.', 'Earth\'s magnetic field deflects harmful solar wind particles.', 'Liquid water covers 71% of Earth\'s surface.'],
  mars:    ['Olympus Mons on Mars is the tallest volcano in the Solar System.', 'Mars has the longest valley system: Valles Marineris at 4,000 km.', 'A Martian day is 24 hours 37 minutes — close to an Earth day.', 'Mars\' two moons, Phobos and Deimos, are likely captured asteroids.'],
  jupiter: ['Jupiter\'s Great Red Spot is a storm larger than Earth.', 'Jupiter has the shortest day of all planets — just 10 hours.', 'Jupiter\'s magnetic field is 14× stronger than Earth\'s.', 'Europa, one of Jupiter\'s moons, may have a subsurface ocean.'],
  saturn:  ['Saturn\'s rings are made mostly of ice and rock particles.', 'Saturn is the least dense planet — it could float on water.', 'Titan is the only moon in the Solar System with a thick atmosphere.', 'Saturn\'s rings span 282,000 km but are only ~10 meters thick.'],
  uranus:  ['Uranus rotates on its side with a 98° axial tilt.', 'Uranus was the first planet discovered with a telescope, in 1781.', 'A single Uranian season lasts 21 Earth years.', 'Uranus has 13 known rings, discovered in 1977.'],
  neptune: ['Neptune has the strongest winds in the Solar System — up to 2,100 km/h.', 'Neptune was predicted mathematically before it was observed.', 'Triton orbits Neptune backwards and will eventually be torn apart.', 'Neptune takes 165 Earth years to orbit the Sun once.']
};
 
const REAL_EPOCH = Date.UTC(2000, 0, 1, 12, 0, 0);
const REAL_MEAN_LONGS = { mercury: 252.25, venus: 181.98, earth: 100.46, mars: 355.45, jupiter: 34.40, saturn: 49.94, uranus: 313.23, neptune: 304.88 };
const REAL_DAILY_MOTIONS = { mercury: 4.09236, venus: 1.60214, earth: 0.98565, mars: 0.52404, jupiter: 0.08313, saturn: 0.03346, uranus: 0.01176, neptune: 0.00600 };
 
let scene, camera, renderer, clock;
let planetMeshes = {}, orbitLines = {}, planetAngles = {};
let speedMultiplier = 1;
let showOrbits = true;
let targetPlanet = null;
let isFlying = false;
let flyProgress = 0;
let flyFrom = { pos: null, target: null };
let currentFocus = 'sun';
let raycaster, mouse;
let hoveredPlanet = null;
let labels = {};
let isPaused = false;
let solarDaysElapsed = 0;
let soundEnabled = false;
let audioCtx = null;
let droneNode = null;
let trueScale = false;
let comparePlanet = null;
let currentFactIndex = 0;
let factInterval = null;
let cometObj = null;
let cometAngle = 0;
let cometTailParticles = null;
let dragState = { active: false, lastX: 0, lastY: 0 };
let cameraTheta = 0.4;
let cameraPhi = 1.05;
let cameraRadius = 145;
let atmosphereMeshes = {};
 
function init() {
  scene = new THREE.Scene();
  clock = new THREE.Clock();
 
  camera = new THREE.PerspectiveCamera(58, innerWidth / innerHeight, 0.1, 10000);
  camera.position.set(0, 60, 130);
  camera.lookAt(0, 0, 0);
 
  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg'), antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);
  renderer.setClearColor(0x000005);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
 
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
 
  buildStarField();
  buildNebula();
  buildSun();
  buildPlanets();
  buildLights();
  buildSaturnRings();
  buildLabels();
  buildAsteroidBelt();
  buildComet();
  buildAtmospheres();
  buildAdditionalMoons();
  setRealPositions();
  setupEvents();
  setupMinimap();
  finishLoading();
  animate();
}
 
function buildStarField() {
  const count = 90000;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const starColors = [[1.0,0.9,0.8],[0.8,0.9,1.0],[1.0,0.95,0.7],[0.9,0.8,1.0],[0.7,0.9,1.0]];
 
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 600 + Math.random() * 1400;
    pos[i*3] = r * Math.sin(phi) * Math.cos(theta);
    pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i*3+2] = r * Math.cos(phi);
    const c = starColors[Math.floor(Math.random() * starColors.length)];
    const b = 0.4 + Math.random() * 0.6;
    colors[i*3] = c[0]*b; colors[i*3+1] = c[1]*b; colors[i*3+2] = c[2]*b;
    sizes[i] = Math.random() < 0.02 ? 3.5 : Math.random() < 0.1 ? 2.0 : 1.0;
  }
 
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
 
  const mat = new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 } },
    vertexShader: `attribute float size; varying vec3 vColor; varying float vSize; uniform float time;
      void main() { vColor = color; vSize = size; vec4 mv = modelViewMatrix * vec4(position, 1.0);
        float tw = 1.0 + 0.3 * sin(time * 2.0 + position.x * 0.01 + position.y * 0.013);
        gl_PointSize = size * tw * (300.0 / -mv.z); gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `varying vec3 vColor; varying float vSize;
      void main() { vec2 uv = gl_PointCoord - 0.5; float d = length(uv);
        float alpha = 1.0 - smoothstep(0.3, 0.5, d); float core = 1.0 - smoothstep(0.0, 0.15, d);
        gl_FragColor = vec4(vColor + core * 0.4, alpha); }`,
    transparent: true, depthWrite: false, vertexColors: true, blending: THREE.AdditiveBlending
  });
 
  scene.add(new THREE.Points(geo, mat));
  scene._starMat = mat;
}
 
function buildNebula() {
  const count = 3000;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const nebulaColors = [[0.2,0.1,0.5],[0.1,0.2,0.5],[0.4,0.1,0.3],[0.1,0.3,0.4]];
 
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 400 + Math.random() * 600;
    pos[i*3] = r * Math.sin(phi) * Math.cos(theta);
    pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta) * 0.3;
    pos[i*3+2] = r * Math.cos(phi);
    const c = nebulaColors[Math.floor(Math.random() * nebulaColors.length)];
    colors[i*3] = c[0] * (0.3 + Math.random()*0.4);
    colors[i*3+1] = c[1] * (0.3 + Math.random()*0.4);
    colors[i*3+2] = c[2] * (0.3 + Math.random()*0.4);
  }
 
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const mat = new THREE.PointsMaterial({ size: 20, transparent: true, opacity: 0.1, vertexColors: true, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true });
  scene.add(new THREE.Points(geo, mat));
}
 
function buildSun() {
  const geo = new THREE.SphereGeometry(PLANETS.sun.radius, 64, 64);
  const mat = new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 } },
    vertexShader: `varying vec2 vUv; varying vec3 vNormal;
      void main() { vUv = uv; vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `uniform float time; varying vec2 vUv; varying vec3 vNormal;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p) { vec2 i = floor(p); vec2 f = fract(p);
        float a = hash(i); float b = hash(i + vec2(1,0)); float c = hash(i + vec2(0,1)); float d = hash(i + vec2(1,1));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y; }
      void main() {
        float n1 = noise(vUv * 8.0 + time * 0.15); float n2 = noise(vUv * 16.0 - time * 0.1); float n3 = noise(vUv * 4.0 + time * 0.08);
        float n = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
        vec3 core = vec3(1.0, 0.97, 0.7); vec3 mid = vec3(1.0, 0.55, 0.0); vec3 surface = vec3(0.9, 0.2, 0.0); vec3 spot = vec3(0.5, 0.08, 0.0);
        vec3 col = mix(surface, mid, n); col = mix(col, core, pow(n, 3.0)); col = mix(col, spot, step(0.85, n) * 0.6);
        float rim = 1.0 - max(0.0, dot(vNormal, vec3(0,0,1))); col = mix(col, vec3(1.0, 0.4, 0.0), rim * 0.4);
        gl_FragColor = vec4(col * 2.2, 1.0); }`,
    transparent: false
  });
 
  const sun = new THREE.Mesh(geo, mat);
  sun.castShadow = false;
  scene.add(sun);
  planetMeshes['sun'] = sun;
  scene._sunMat = mat;
 
  const glowLayers = [
    { scale: 1.08, opacity: 0.35, color: 0xff6600 },
    { scale: 1.22, opacity: 0.18, color: 0xff4400 },
    { scale: 1.50, opacity: 0.08, color: 0xff2200 },
    { scale: 2.10, opacity: 0.03, color: 0xff1100 },
  ];
 
  glowLayers.forEach(({ scale, opacity, color }) => {
    const g = new THREE.SphereGeometry(PLANETS.sun.radius, 32, 32);
    const m = new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.BackSide, depthWrite: false, blending: THREE.AdditiveBlending });
    const glow = new THREE.Mesh(g, m);
    glow.scale.setScalar(scale);
    sun.add(glow);
  });
 
  const coronaGeo = new THREE.SphereGeometry(PLANETS.sun.radius * 1.3, 32, 32);
  const coronaMat = new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 } },
    vertexShader: `varying vec3 vNormal; void main() { vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `uniform float time; varying vec3 vNormal;
      void main() { float rim = 1.0 - max(0.0, dot(vNormal, vec3(0,0,1))); float pulse = 0.8 + 0.2 * sin(time * 1.5);
        float alpha = pow(rim, 2.5) * 0.5 * pulse; gl_FragColor = vec4(1.0, 0.4, 0.05, alpha); }`,
    transparent: true, side: THREE.BackSide, depthWrite: false, blending: THREE.AdditiveBlending
  });
  scene.add(new THREE.Mesh(coronaGeo, coronaMat));
  scene._coronaMat = coronaMat;
}
 
function buildPlanets() {
  Object.entries(PLANETS).forEach(([key, data]) => {
    if (key === 'sun') return;
    planetAngles[key] = Math.random() * Math.PI * 2;
 
    const geo = new THREE.SphereGeometry(data.radius, 64, 64);
    let mat;
 
    if (key === 'jupiter') {
      mat = buildJupiterMaterial();
    } else if (key === 'earth') {
      mat = buildEarthMaterial();
    } else if (key === 'mars') {
      mat = buildMarsMaterial();
    } else {
      mat = new THREE.MeshStandardMaterial({ color: data.color, emissive: data.emissive, emissiveIntensity: data.emissiveIntensity, roughness: 0.75, metalness: 0.0 });
    }
 
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData = { key, data };
 
    const x = Math.cos(planetAngles[key]) * data.distance;
    const z = Math.sin(planetAngles[key]) * data.distance;
    mesh.position.set(x, 0, z);
    scene.add(mesh);
    planetMeshes[key] = mesh;
    buildOrbit(key, data.distance);
 
    if (key === 'earth') buildMoon(mesh);
  });
}
 
function buildJupiterMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 } },
    vertexShader: `varying vec2 vUv; varying vec3 vNormal;
      void main() { vUv = uv; vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `uniform float time; varying vec2 vUv; varying vec3 vNormal;
      float hash(float n) { return fract(sin(n) * 43758.5453); }
      float noise(float x) { float i = floor(x); float f = fract(x); return mix(hash(i), hash(i+1.0), f*f*(3.0-2.0*f)); }
      void main() {
        float y = vUv.y;
        float band = noise(y * 18.0 + time * 0.02) * 0.5 + noise(y * 36.0 - time * 0.015) * 0.3;
        vec3 c1 = vec3(0.78, 0.55, 0.22); vec3 c2 = vec3(0.88, 0.72, 0.5); vec3 c3 = vec3(0.55, 0.35, 0.18); vec3 c4 = vec3(0.96, 0.88, 0.72);
        vec3 col = mix(c1, c2, band); col = mix(col, c3, noise(y * 9.0) * 0.4); col = mix(col, c4, noise(y * 55.0) * 0.15);
        float grsX = abs(mod(vUv.x - time * 0.003, 1.0) - 0.45);
        float grsY = abs(vUv.y - 0.42);
        float grs = 1.0 - smoothstep(0.0, 0.06, sqrt(grsX * grsX * 4.0 + grsY * grsY * 16.0));
        col = mix(col, vec3(0.72, 0.18, 0.1), grs * 0.85);
        float rim = 1.0 - max(0.0, dot(vNormal, vec3(0,0,1))); col *= (0.8 + rim * 0.3);
        gl_FragColor = vec4(col, 1.0); }`,
    lights: false
  });
}
 
function buildEarthMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 } },
    vertexShader: `varying vec2 vUv; varying vec3 vNormal; varying vec3 vPos;
      void main() { vUv = uv; vNormal = normalize(normalMatrix * normal); vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `uniform float time; varying vec2 vUv; varying vec3 vNormal; varying vec3 vPos;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p) { vec2 i = floor(p); vec2 f = fract(p); float a = hash(i); float b = hash(i+vec2(1,0)); float c = hash(i+vec2(0,1)); float d = hash(i+vec2(1,1)); vec2 u = f*f*(3.0-2.0*f); return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y; }
      void main() {
        float n = noise(vUv * 6.0) * 0.5 + noise(vUv * 12.0) * 0.3 + noise(vUv * 24.0) * 0.2;
        vec3 ocean = vec3(0.12, 0.35, 0.65); vec3 land = vec3(0.25, 0.5, 0.2); vec3 sand = vec3(0.7, 0.62, 0.4); vec3 ice = vec3(0.88, 0.92, 0.98);
        float landMask = smoothstep(0.45, 0.55, n);
        vec3 col = mix(ocean, land, landMask); col = mix(col, sand, smoothstep(0.52, 0.58, n) * 0.5);
        float polar = smoothstep(0.35, 0.15, abs(vUv.y - 0.5)); col = mix(col, ice, polar);
        float cloud = noise(vUv * 4.0 + time * 0.01) * noise(vUv * 8.0 - time * 0.008);
        col = mix(col, vec3(0.92, 0.94, 0.98), smoothstep(0.35, 0.55, cloud) * 0.7);
        float rim = 1.0 - max(0.0, dot(vNormal, vec3(0,0,1))); col = mix(col, vec3(0.3, 0.6, 1.0), rim * 0.35);
        gl_FragColor = vec4(col, 1.0); }`,
    lights: false
  });
}
 
function buildMarsMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 } },
    vertexShader: `varying vec2 vUv; varying vec3 vNormal;
      void main() { vUv = uv; vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `uniform float time; varying vec2 vUv; varying vec3 vNormal;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p) { vec2 i = floor(p); vec2 f = fract(p); float a = hash(i); float b = hash(i+vec2(1,0)); float c = hash(i+vec2(0,1)); float d = hash(i+vec2(1,1)); vec2 u = f*f*(3.0-2.0*f); return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y; }
      void main() {
        float n = noise(vUv * 5.0) * 0.5 + noise(vUv * 10.0) * 0.3 + noise(vUv * 20.0) * 0.2;
        vec3 rust = vec3(0.72, 0.28, 0.12); vec3 dark = vec3(0.45, 0.18, 0.08); vec3 pale = vec3(0.88, 0.6, 0.4);
        vec3 col = mix(dark, rust, n); col = mix(col, pale, smoothstep(0.6, 0.8, n));
        float polar = smoothstep(0.35, 0.1, abs(vUv.y - 0.5)); col = mix(col, vec3(0.9, 0.88, 0.85), polar * 0.7);
        float rim = 1.0 - max(0.0, dot(vNormal, vec3(0,0,1))); col = mix(col, vec3(0.8, 0.4, 0.2), rim * 0.3);
        gl_FragColor = vec4(col, 1.0); }`,
    lights: false
  });
}
 
function buildMoon(earthMesh) {
  const geo = new THREE.SphereGeometry(0.27, 24, 24);
  const mat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 0.9, metalness: 0 });
  const moon = new THREE.Mesh(geo, mat);
  moon.userData.isMoon = true;
  earthMesh.add(moon);
  scene._moon = moon;
  scene._moonAngle = 0;
}
 
function buildAdditionalMoons() {
  const moonDefs = [
    { parent: 'jupiter', name: 'io',     radius: 0.22, dist: 4.2, speed: 2.1, color: 0xe8d44d },
    { parent: 'jupiter', name: 'europa', radius: 0.19, dist: 5.8, speed: 1.5, color: 0xc8b89a },
    { parent: 'saturn',  name: 'titan',  radius: 0.28, dist: 4.8, speed: 0.9, color: 0xe89040 },
    { parent: 'mars',    name: 'phobos', radius: 0.12, dist: 1.6, speed: 3.0, color: 0x9a7a6a },
    { parent: 'mars',    name: 'deimos', radius: 0.09, dist: 2.4, speed: 1.8, color: 0x8a6a5a },
    { parent: 'uranus',  name: 'titania',radius: 0.18, dist: 3.2, speed: 0.7, color: 0xaacccc },
    { parent: 'neptune', name: 'triton', radius: 0.20, dist: 3.5, speed: 0.6, color: 0x88aacc },
  ];
 
  if (!scene._extraMoons) scene._extraMoons = [];
 
  moonDefs.forEach(def => {
    const parentMesh = planetMeshes[def.parent];
    if (!parentMesh) return;
    const geo = new THREE.SphereGeometry(def.radius, 16, 16);
    const mat = new THREE.MeshStandardMaterial({ color: def.color, roughness: 0.85, metalness: 0 });
    const moon = new THREE.Mesh(geo, mat);
    moon.userData.isMoon = true;
    const angle = Math.random() * Math.PI * 2;
    moon.position.set(Math.cos(angle) * def.dist, 0, Math.sin(angle) * def.dist);
    parentMesh.add(moon);
    scene._extraMoons.push({ mesh: moon, dist: def.dist, speed: def.speed, angle });
  });
}
 
function buildAtmospheres() {
  const atmDefs = [
    { key: 'earth',   color: 0x4499ff, opacity: 0.15, scale: 1.12 },
    { key: 'venus',   color: 0xffcc66, opacity: 0.18, scale: 1.10 },
    { key: 'neptune', color: 0x4466ff, opacity: 0.16, scale: 1.11 },
    { key: 'uranus',  color: 0x44dddd, opacity: 0.13, scale: 1.09 },
    { key: 'saturn',  color: 0xeedd88, opacity: 0.10, scale: 1.07 },
    { key: 'jupiter', color: 0xcc8833, opacity: 0.10, scale: 1.06 },
    { key: 'mars',    color: 0xff6633, opacity: 0.08, scale: 1.07 },
  ];
 
  atmDefs.forEach(({ key, color, opacity, scale }) => {
    const data = PLANETS[key];
    const geo = new THREE.SphereGeometry(data.radius, 32, 32);
    const mat = new THREE.ShaderMaterial({
      uniforms: { color: { value: new THREE.Color(color) }, opacity: { value: opacity } },
      vertexShader: `varying vec3 vNormal; void main() { vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `uniform vec3 color; uniform float opacity; varying vec3 vNormal;
        void main() { float rim = 1.0 - max(0.0, dot(vNormal, vec3(0,0,1))); float alpha = pow(rim, 1.8) * opacity * 3.0; gl_FragColor = vec4(color, alpha); }`,
      transparent: true, side: THREE.BackSide, depthWrite: false, blending: THREE.AdditiveBlending
    });
    const atm = new THREE.Mesh(geo, mat);
    atm.scale.setScalar(scale);
    planetMeshes[key].add(atm);
    atmosphereMeshes[key] = atm;
  });
}
 
function buildAsteroidBelt() {
  const count = 2200;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const innerR = PLANETS.mars.distance + 4;
  const outerR = PLANETS.jupiter.distance - 5;
 
  for (let i = 0; i < count; i++) {
    const r = innerR + Math.random() * (outerR - innerR);
    const angle = Math.random() * Math.PI * 2;
    const y = (Math.random() - 0.5) * 1.8;
    pos[i*3] = Math.cos(angle) * r;
    pos[i*3+1] = y;
    pos[i*3+2] = Math.sin(angle) * r;
    const g = 0.4 + Math.random() * 0.4;
    colors[i*3] = g * 1.1; colors[i*3+1] = g; colors[i*3+2] = g * 0.85;
    sizes[i] = 0.8 + Math.random() * 1.8;
  }
 
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
 
  const mat = new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 } },
    vertexShader: `attribute float size; varying vec3 vColor; uniform float time;
      void main() { vColor = color; vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (200.0 / -mv.z); gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `varying vec3 vColor;
      void main() { vec2 uv = gl_PointCoord - 0.5; float d = length(uv); float a = 1.0 - smoothstep(0.3, 0.5, d); gl_FragColor = vec4(vColor, a * 0.75); }`,
    transparent: true, depthWrite: false, vertexColors: true, blending: THREE.NormalBlending
  });
 
  scene.add(new THREE.Points(geo, mat));
  scene._asteroidBelt = mat;
}
 
function buildComet() {
  const headGeo = new THREE.SphereGeometry(0.35, 16, 16);
  const headMat = new THREE.MeshBasicMaterial({ color: 0xaaddff });
  const head = new THREE.Mesh(headGeo, headMat);
 
  const tailCount = 120;
  const tailGeo = new THREE.BufferGeometry();
  const tailPos = new Float32Array(tailCount * 3);
  const tailColors = new Float32Array(tailCount * 3);
  const tailSizes = new Float32Array(tailCount);
 
  for (let i = 0; i < tailCount; i++) {
    tailPos[i*3] = -i * 0.32;
    tailPos[i*3+1] = (Math.random()-0.5)*0.1;
    tailPos[i*3+2] = (Math.random()-0.5)*0.1;
    const t = i / tailCount;
    tailColors[i*3] = 0.6 * (1-t); tailColors[i*3+1] = 0.85 * (1-t); tailColors[i*3+2] = 1.0 * (1-t);
    tailSizes[i] = (1-t) * 3.5;
  }
 
  tailGeo.setAttribute('position', new THREE.BufferAttribute(tailPos, 3));
  tailGeo.setAttribute('color', new THREE.BufferAttribute(tailColors, 3));
  tailGeo.setAttribute('size', new THREE.BufferAttribute(tailSizes, 1));
 
  const tailMat = new THREE.ShaderMaterial({
    vertexShader: `attribute float size; varying vec3 vColor;
      void main() { vColor = color; vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_PointSize = size * (250.0 / -mv.z); gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `varying vec3 vColor;
      void main() { vec2 uv = gl_PointCoord - 0.5; float d = length(uv); float a = 1.0 - smoothstep(0.2, 0.5, d); gl_FragColor = vec4(vColor, a * 0.55); }`,
    transparent: true, depthWrite: false, vertexColors: true, blending: THREE.AdditiveBlending
  });
 
  const tail = new THREE.Points(tailGeo, tailMat);
  head.add(tail);
  scene.add(head);
  cometObj = head;
  cometAngle = 0;
}
 
function buildSaturnRings() {
  const inner = PLANETS.saturn.radius * 1.4;
  const outer = PLANETS.saturn.radius * 2.5;
  const geo = new THREE.RingGeometry(inner, outer, 128, 8);
  const pos = geo.attributes.position;
  const uv = geo.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i);
    const r = Math.sqrt(x*x + y*y);
    uv.setXY(i, (r - inner) / (outer - inner), 0);
  }
  const mat = new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 } },
    vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `varying vec2 vUv; uniform float time;
      float hash(float n) { return fract(sin(n) * 43758.5453); }
      void main() { float t = vUv.x; float band = step(0.0, sin(t * 60.0)) * 0.3 + 0.7;
        float noise = hash(floor(t * 200.0)) * 0.15; float alpha = (0.7 + noise) * band * smoothstep(0.0, 0.05, t) * smoothstep(1.0, 0.95, t);
        vec3 ic = vec3(0.9, 0.85, 0.65); vec3 oc = vec3(0.6, 0.55, 0.4); vec3 col = mix(ic, oc, t);
        gl_FragColor = vec4(col, alpha * 0.75); }`,
    transparent: true, side: THREE.DoubleSide, depthWrite: false, blending: THREE.NormalBlending
  });
  const rings = new THREE.Mesh(geo, mat);
  rings.rotation.x = Math.PI / 2.5;
  planetMeshes['saturn'].add(rings);
  scene._ringMat = mat;
}
 
function buildOrbit(key, distance) {
  const points = [];
  for (let i = 0; i <= 256; i++) {
    const a = (i / 256) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(a) * distance, 0, Math.sin(a) * distance));
  }
  const geo = new THREE.BufferGeometry().setFromPoints(points);
  const mat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.06, depthWrite: false });
  const line = new THREE.Line(geo, mat);
  scene.add(line);
  orbitLines[key] = line;
}
 
function buildLights() {
  const sun = new THREE.PointLight(0xfff5e0, 3.5, 0, 1.5);
  sun.position.set(0, 0, 0);
  sun.castShadow = true;
  sun.shadow.mapSize.width = 2048;
  sun.shadow.mapSize.height = 2048;
  scene.add(sun);
  scene._sunLight = sun;
  scene.add(new THREE.AmbientLight(0x111133, 0.4));
  const rim = new THREE.DirectionalLight(0x334466, 0.3);
  rim.position.set(-100, 80, -100);
  scene.add(rim);
}
 
function buildLabels() {
  Object.entries(PLANETS).forEach(([key, data]) => {
    const el = document.createElement('div');
    el.className = 'planet-label';
    el.textContent = key === 'sun' ? 'Sun' : data.name;
    el.style.display = 'none';
    document.body.appendChild(el);
    labels[key] = el;
  });
}
 
function setRealPositions() {
  const now = Date.now();
  const daysSinceEpoch = (now - REAL_EPOCH) / 86400000;
  Object.entries(PLANETS).forEach(([key, data]) => {
    if (key === 'sun') return;
    const meanLong = REAL_MEAN_LONGS[key] || 0;
    const dailyMotion = REAL_DAILY_MOTIONS[key] || 0;
    const currentLong = (meanLong + dailyMotion * daysSinceEpoch) % 360;
    planetAngles[key] = (currentLong * Math.PI) / 180;
    const mesh = planetMeshes[key];
    if (mesh) {
      mesh.position.x = Math.cos(planetAngles[key]) * data.distance;
      mesh.position.z = Math.sin(planetAngles[key]) * data.distance;
    }
  });
}
 
function setupMinimap() {
  scene._minimapCanvas = document.getElementById('minimap-canvas');
  scene._minimapCtx = scene._minimapCanvas.getContext('2d');
}
 
function drawMinimap() {
  const canvas = scene._minimapCanvas;
  const ctx = scene._minimapCtx;
  if (!ctx) return;
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);
 
  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth = 0.5;
  Object.values(PLANETS).forEach(data => {
    if (data.distance === 0) return;
    const scale = (w / 2 - 8) / PLANETS.neptune.distance;
    const r = data.distance * scale;
    ctx.beginPath();
    ctx.arc(w/2, h/2, r, 0, Math.PI*2);
    ctx.stroke();
  });
 
  const sunColors = { sun: '#ff8c00', mercury: '#b5b5b5', venus: '#e8c97a', earth: '#4fa3e0', mars: '#d05a2c', jupiter: '#c88b3a', saturn: '#e4d191', uranus: '#7de8e8', neptune: '#4b70dd' };
  const scale = (w / 2 - 8) / PLANETS.neptune.distance;
 
  ctx.fillStyle = '#ff8c00';
  ctx.beginPath(); ctx.arc(w/2, h/2, 3, 0, Math.PI*2); ctx.fill();
 
  Object.entries(PLANETS).forEach(([key, data]) => {
    if (key === 'sun') return;
    const mesh = planetMeshes[key];
    if (!mesh) return;
    const mx = w/2 + mesh.position.x * scale;
    const my = h/2 + mesh.position.z * scale;
    const pr = Math.max(1.5, data.radius * 0.6);
    ctx.fillStyle = sunColors[key] || '#fff';
    ctx.beginPath(); ctx.arc(mx, my, pr, 0, Math.PI*2); ctx.fill();
 
    if (key === currentFocus && currentFocus !== 'sun') {
      ctx.strokeStyle = 'rgba(255,255,255,0.55)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(mx, my, pr + 3, 0, Math.PI*2); ctx.stroke();
    }
  });
 
  const camX = w/2 + camera.position.x * scale;
  const camZ = h/2 + camera.position.z * scale;
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.beginPath(); ctx.arc(Math.min(Math.max(camX, 4), w-4), Math.min(Math.max(camZ, 4), h-4), 1.5, 0, Math.PI*2); ctx.fill();
}
 
function setupEvents() {
  window.addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });
 
  window.addEventListener('mousemove', e => {
    const crosshair = document.getElementById('crosshair');
    crosshair.style.left = e.clientX + 'px';
    crosshair.style.top = e.clientY + 'px';
    mouse.x = (e.clientX / innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / innerHeight) * 2 + 1;
    updateHover();
 
    if (dragState.active && !targetPlanet) {
      const dx = e.clientX - dragState.lastX;
      const dy = e.clientY - dragState.lastY;
      cameraTheta -= dx * 0.005;
      cameraPhi = Math.max(0.2, Math.min(Math.PI / 2, cameraPhi + dy * 0.004));
      dragState.lastX = e.clientX;
      dragState.lastY = e.clientY;
    }
  });
 
  window.addEventListener('mousedown', e => {
    if (e.target.closest('#ui') || e.target.closest('#back-btn') || e.target.closest('#compare-selector')) return;
    dragState.active = true;
    dragState.lastX = e.clientX;
    dragState.lastY = e.clientY;
  });
 
  window.addEventListener('mouseup', () => { dragState.active = false; });
 
  window.addEventListener('wheel', e => {
    if (!targetPlanet || targetPlanet === 'sun') {
      cameraRadius = Math.max(40, Math.min(300, cameraRadius + e.deltaY * 0.1));
    }
  });
 
  window.addEventListener('click', e => {
    if (e.target.closest('#ui') || e.target.closest('#back-btn') || e.target.closest('#compare-selector')) return;
    if (dragState.didDrag) { dragState.didDrag = false; return; }
    raycaster.setFromCamera(mouse, camera);
    const meshes = Object.entries(planetMeshes).map(([k, m]) => ({ key: k, mesh: m }));
    const hits = raycaster.intersectObjects(meshes.map(m => m.mesh), false);
    if (hits.length > 0) {
      const hit = hits[0].object;
      const entry = meshes.find(m => m.mesh === hit);
      if (entry) flyTo(entry.key);
    }
  });
 
  document.querySelectorAll('.pl-item').forEach((el, i) => {
    el.dataset.shortcut = String(i + 1);
    el.addEventListener('click', () => flyTo(el.dataset.planet));
  });
 
  document.getElementById('speed-slider').addEventListener('input', function() {
    speedMultiplier = parseFloat(this.value);
    document.getElementById('speed-val').textContent = parseFloat(speedMultiplier).toFixed(1) + 'x';
  });
 
  document.getElementById('orbit-toggle').addEventListener('click', function() {
    showOrbits = !showOrbits;
    this.textContent = showOrbits ? 'ON' : 'OFF';
    this.classList.toggle('active', showOrbits);
    Object.values(orbitLines).forEach(l => l.visible = showOrbits);
  });
 
  document.getElementById('pause-btn').addEventListener('click', togglePause);
 
 
  document.getElementById('scale-btn').addEventListener('click', toggleScale);
 
  document.getElementById('compare-btn').addEventListener('click', () => {
    if (!currentFocus || currentFocus === 'sun') return;
    showCompareSelector();
  });
 
  document.getElementById('compare-close').addEventListener('click', () => {
    document.getElementById('compare-panel').classList.add('hidden');
    comparePlanet = null;
  });
 
  document.getElementById('compare-selector-close').addEventListener('click', () => {
    document.getElementById('compare-selector').classList.add('hidden');
  });
 
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') resetCamera();
    if (e.key === ' ') { e.preventDefault(); togglePause(); }
    if (e.key >= '1' && e.key <= '9') {
      const keys = Object.keys(PLANETS);
      const idx = parseInt(e.key) - 1;
      if (keys[idx]) flyTo(keys[idx]);
    }
  });
}
 
function togglePause() {
  isPaused = !isPaused;
  const btn = document.getElementById('pause-btn');
  document.getElementById('pause-icon').textContent = isPaused ? '▶' : '⏸';
  document.getElementById('pause-label').textContent = isPaused ? 'RESUME' : 'PAUSE';
  btn.classList.toggle('active', isPaused);
}
 
function toggleSound() {
  soundEnabled = !soundEnabled;
  const btn = document.getElementById('sound-btn');
  btn.classList.toggle('active', soundEnabled);
  document.getElementById('sound-icon').textContent = soundEnabled ? '♫' : '♪';
 
  if (soundEnabled) {
    startAmbientSound();
  } else {
    stopAmbientSound();
  }
}
 
function startAmbientSound() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
 
  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const osc3 = audioCtx.createOscillator();
  const gain1 = audioCtx.createGain();
  const gain2 = audioCtx.createGain();
  const gain3 = audioCtx.createGain();
  const masterGain = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();
 
  osc1.type = 'sine'; osc1.frequency.value = 55;
  osc2.type = 'sine'; osc2.frequency.value = 82.5;
  osc3.type = 'sine'; osc3.frequency.value = 110;
 
  gain1.gain.value = 0.18;
  gain2.gain.value = 0.1;
  gain3.gain.value = 0.06;
  masterGain.gain.value = 0;
  filter.type = 'lowpass'; filter.frequency.value = 600;
 
  osc1.connect(gain1); osc2.connect(gain2); osc3.connect(gain3);
  gain1.connect(filter); gain2.connect(filter); gain3.connect(filter);
  filter.connect(masterGain); masterGain.connect(audioCtx.destination);
 
  osc1.start(); osc2.start(); osc3.start();
  masterGain.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 2.0);
 
  scene._audioNodes = { osc1, osc2, osc3, masterGain };
}
 
function stopAmbientSound() {
  if (!scene._audioNodes) return;
  const { masterGain, osc1, osc2, osc3 } = scene._audioNodes;
  masterGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1.5);
  setTimeout(() => { try { osc1.stop(); osc2.stop(); osc3.stop(); } catch(e){} }, 1600);
  scene._audioNodes = null;
}
 
function toggleScale() {
  trueScale = !trueScale;
  const track = document.querySelector('.hud-toggle-track');
  if (track) track.classList.toggle('on', trueScale);
  document.getElementById('scale-label').textContent = trueScale ? 'TRUE' : 'SCALE';
 
  const maxTrueR = 696;
  const artisticMax = 4.2;
  const scaleRatio = artisticMax / maxTrueR;
 
  Object.entries(PLANETS).forEach(([key, data]) => {
    const mesh = planetMeshes[key];
    if (!mesh) return;
    if (trueScale) {
      const newR = data.trueRadius * scaleRatio;
      const s = newR / data.radius;
      mesh.scale.setScalar(s);
    } else {
      mesh.scale.setScalar(1);
    }
  });
}
 
function showCompareSelector() {
  const sel = document.getElementById('compare-selector');
  const grid = document.getElementById('compare-selector-grid');
  grid.innerHTML = '';
  Object.entries(PLANETS).forEach(([key, data]) => {
    if (key === currentFocus) return;
    const item = document.createElement('div');
    item.className = 'cs-item';
    item.textContent = data.name;
    item.addEventListener('click', () => {
      comparePlanet = key;
      sel.classList.add('hidden');
      showComparePanel();
    });
    grid.appendChild(item);
  });
  sel.classList.remove('hidden');
}
 
function showComparePanel() {
  if (!comparePlanet || !currentFocus) return;
  const pA = PLANETS[currentFocus];
  const pB = PLANETS[comparePlanet];
  const fields = ['type', 'diameter', 'mass', 'temp', 'moons', 'orbitalPeriod', 'distAU'];
  const labels = ['Type', 'Diameter', 'Mass', 'Temperature', 'Moons', 'Orbital Period', 'Dist. (AU)'];
 
  const panel = document.getElementById('compare-panel');
  document.getElementById('compare-body').innerHTML = `
    <div class="cmp-col">
      <div class="cmp-col-head">${pA.name}</div>
      ${fields.map((f, i) => `<div class="cmp-row"><div class="cmp-label">${labels[i]}</div><div class="cmp-val">${pA[f]}</div></div>`).join('')}
    </div>
    <div class="cmp-divider"></div>
    <div class="cmp-col">
      <div class="cmp-col-head">${pB.name}</div>
      ${fields.map((f, i) => `<div class="cmp-row"><div class="cmp-label">${labels[i]}</div><div class="cmp-val">${pB[f]}</div></div>`).join('')}
    </div>
  `;
  panel.classList.remove('hidden');
}
 
function updateHover() {
  raycaster.setFromCamera(mouse, camera);
  const meshes = Object.values(planetMeshes);
  const hits = raycaster.intersectObjects(meshes, false);
  const prev = hoveredPlanet;
 
  if (hits.length > 0) {
    const mesh = hits[0].object;
    hoveredPlanet = Object.entries(planetMeshes).find(([k, m]) => m === mesh)?.[0] || null;
    document.getElementById('crosshair').classList.add('hovering');
  } else {
    hoveredPlanet = null;
    document.getElementById('crosshair').classList.remove('hovering');
  }
 
  if (prev !== hoveredPlanet) {
    if (prev && labels[prev]) labels[prev].classList.remove('hovered');
    if (hoveredPlanet && labels[hoveredPlanet]) labels[hoveredPlanet].classList.add('hovered');
  }
}
 
function flyTo(key) {
  if (isFlying) return;
  currentFocus = key;
  targetPlanet = key;
  isFlying = true;
  flyProgress = 0;
  flyFrom.pos = camera.position.clone();
 
  document.querySelectorAll('.pl-item').forEach(el => {
    el.classList.toggle('active', el.dataset.planet === key);
  });
 
  const data = PLANETS[key];
  showInfoPanel(data);
  startFactTicker(key);
 
  const backBtn = document.getElementById('back-btn');
  if (key !== 'sun') {
    backBtn.style.display = 'block';
    setTimeout(() => backBtn.classList.add('visible'), 10);
  } else {
    backBtn.classList.remove('visible');
    setTimeout(() => backBtn.style.display = 'none', 400);
  }
}
 
function resetCamera() {
  currentFocus = 'sun';
  targetPlanet = null;
  isFlying = true;
  flyProgress = 0;
  flyFrom.pos = camera.position.clone();
  flyFrom.target = new THREE.Vector3(0, 0, 0);
 
  document.querySelectorAll('.pl-item').forEach(el => {
    el.classList.toggle('active', el.dataset.planet === 'sun');
  });
 
  showInfoPanel(PLANETS['sun']);
  startFactTicker('sun');
  hideComparePanel();
 
  const backBtn = document.getElementById('back-btn');
  backBtn.classList.remove('visible');
  setTimeout(() => backBtn.style.display = 'none', 400);
}
 
function hideComparePanel() {
  document.getElementById('compare-panel').classList.add('hidden');
  comparePlanet = null;
}
 
function showInfoPanel(data) {
  document.getElementById('info-name').textContent = data.name;
 
  const distAU = data.distAU > 0 ? data.distAU.toFixed(3) + ' AU' : '—';
  document.getElementById('distance-val').textContent = distAU;
 
  document.getElementById('info-stats').innerHTML = `
    <div class="stat-row"><span class="stat-label">Diameter</span><span class="stat-val">${data.diameter}</span></div>
    <div class="stat-row"><span class="stat-label">Mass</span><span class="stat-val">${data.mass}</span></div>
    <div class="stat-row"><span class="stat-label">Temp</span><span class="stat-val">${data.temp}</span></div>
    <div class="stat-row"><span class="stat-label">Moons</span><span class="stat-val">${data.moons}</span></div>
    <div class="stat-row"><span class="stat-label">Year</span><span class="stat-val">${data.orbitalPeriod}</span></div>
  `;
  document.getElementById('info-panel').classList.add('visible');
}
 
function startFactTicker(key) {
  if (factInterval) clearInterval(factInterval);
  currentFactIndex = 0;
  const facts = PLANET_FACTS[key] || [];
  const factEl = document.getElementById('fact-text');
  const dotsEl = document.getElementById('fact-dots');
 
  dotsEl.innerHTML = facts.map((_, i) => `<div class="fact-dot${i === 0 ? ' active' : ''}"></div>`).join('');
 
  const showFact = (idx) => {
    factEl.style.opacity = 0;
    setTimeout(() => {
      factEl.textContent = facts[idx];
      factEl.style.opacity = 1;
      document.querySelectorAll('.fact-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
    }, 350);
  };
 
  if (facts.length > 0) {
    showFact(0);
    factInterval = setInterval(() => {
      currentFactIndex = (currentFactIndex + 1) % facts.length;
      showFact(currentFactIndex);
    }, 5000);
  }
}
 
function updateDistanceReadout() {
  if (!currentFocus || currentFocus === 'sun') return;
  const mesh = planetMeshes[currentFocus];
  if (!mesh) return;
  const distScene = mesh.position.length();
  const data = PLANETS[currentFocus];
  const auPerUnit = data.distAU / data.distance;
  const realAU = (distScene * auPerUnit).toFixed(3);
  document.getElementById('distance-val').textContent = realAU + ' AU';
}
 
function easeInOutCubic(t) {
  return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;
}
 
function updateCamera(dt) {
  if (isFlying) {
    flyProgress += dt * 0.45;
    if (flyProgress >= 1) { flyProgress = 1; isFlying = false; }
    const t = easeInOutCubic(Math.min(flyProgress, 1));
 
    let destPos, lookAt;
    if (targetPlanet === 'sun' || !targetPlanet) {
      const x = cameraRadius * Math.sin(cameraPhi) * Math.sin(cameraTheta);
      const y = cameraRadius * Math.cos(cameraPhi);
      const z = cameraRadius * Math.sin(cameraPhi) * Math.cos(cameraTheta);
      destPos = new THREE.Vector3(x, y, z);
      lookAt = new THREE.Vector3(0, 0, 0);
    } else {
      const mesh = planetMeshes[targetPlanet];
      const data = PLANETS[targetPlanet];
      const offset = data.radius * 5 + 6;
      const dir = new THREE.Vector3(1, 0.4, 0.8).normalize();
      destPos = mesh.position.clone().add(dir.multiplyScalar(offset));
      lookAt = mesh.position.clone();
    }
 
    camera.position.lerpVectors(flyFrom.pos, destPos, t);
    const currentLook = new THREE.Vector3(0, 0, 0);
    const targetLook = targetPlanet && targetPlanet !== 'sun' ? planetMeshes[targetPlanet].position.clone() : new THREE.Vector3(0, 0, 0);
    camera.lookAt(new THREE.Vector3().lerpVectors(currentLook, targetLook, t));
 
  } else if (!targetPlanet || targetPlanet === 'sun') {
    const x = cameraRadius * Math.sin(cameraPhi) * Math.sin(cameraTheta);
    const y = cameraRadius * Math.cos(cameraPhi);
    const z = cameraRadius * Math.sin(cameraPhi) * Math.cos(cameraTheta);
    camera.position.lerp(new THREE.Vector3(x, y, z), 0.05);
    camera.lookAt(0, 0, 0);
  } else {
    const mesh = planetMeshes[targetPlanet];
    const data = PLANETS[targetPlanet];
    const offset = data.radius * 5 + 6;
    const dir = new THREE.Vector3(1, 0.4, 0.8).normalize();
    const dest = mesh.position.clone().add(dir.multiplyScalar(offset));
    camera.position.lerp(dest, 0.04);
    camera.lookAt(mesh.position);
  }
}
 
function updateLabels() {
  Object.entries(planetMeshes).forEach(([key, mesh]) => {
    const label = labels[key];
    if (!label) return;
    const dist = camera.position.distanceTo(mesh.position);
    const data = PLANETS[key];
    if (dist > data.radius * 80 || (targetPlanet === key && !isFlying)) { label.style.display = 'none'; return; }
    const v = mesh.position.clone().project(camera);
    const x = (v.x * 0.5 + 0.5) * innerWidth;
    const y = (-v.y * 0.5 + 0.5) * innerHeight;
    if (v.z > 1) { label.style.display = 'none'; return; }
    label.style.display = 'block';
    label.style.left = x + 'px';
    label.style.top = (y - PLANETS[key].radius * 30) + 'px';
  });
}
 
function updateComet(dt, elapsed) {
  if (!cometObj) return;
  const orbitA = 155, orbitB = 60;
  cometAngle += dt * 0.08 * speedMultiplier;
  const x = Math.cos(cometAngle) * orbitA;
  const z = Math.sin(cometAngle) * orbitB;
  const y = Math.sin(cometAngle * 0.5) * 8;
  cometObj.position.set(x, y, z);
 
  const dx = -Math.sin(cometAngle) * orbitA;
  const dz = Math.cos(cometAngle) * orbitB;
  cometObj.rotation.y = Math.atan2(dx, dz);
}
 
function updateTimeDisplay(dt) {
  if (!isPaused) {
    solarDaysElapsed += dt * speedMultiplier * 10;
    document.getElementById('solar-days').textContent = solarDaysElapsed.toFixed(1);
  }
}
 
function animate() {
  requestAnimationFrame(animate);
  const dt = clock.getDelta();
  const elapsed = clock.getElapsedTime();
 
  if (scene._sunMat) scene._sunMat.uniforms.time.value = elapsed;
  if (scene._coronaMat) scene._coronaMat.uniforms.time.value = elapsed;
  if (scene._starMat) scene._starMat.uniforms.time.value = elapsed;
  if (scene._ringMat) scene._ringMat.uniforms.time.value = elapsed;
 
  const sunMesh = planetMeshes['sun'];
  if (sunMesh) sunMesh.rotation.y += dt * 0.05;
 
  if (!isPaused) {
    Object.entries(PLANETS).forEach(([key, data]) => {
      if (key === 'sun') return;
      planetAngles[key] += data.speed * speedMultiplier * dt * 60;
      const mesh = planetMeshes[key];
      if (!mesh) return;
      mesh.position.x = Math.cos(planetAngles[key]) * data.distance;
      mesh.position.z = Math.sin(planetAngles[key]) * data.distance;
 
      const rotSpeed = key === 'earth' ? 0.5 : key === 'jupiter' ? 0.9 : key === 'saturn' ? 0.75 : key === 'uranus' ? 0.6 : 0.3;
      mesh.rotation.y += dt * rotSpeed;
 
      if (key === 'jupiter' && mesh.material.uniforms) {
        mesh.material.uniforms.time.value = elapsed;
      }
      if (key === 'earth' && mesh.material.uniforms) {
        mesh.material.uniforms.time.value = elapsed;
      }
      if (key === 'mars' && mesh.material.uniforms) {
        mesh.material.uniforms.time.value = elapsed;
      }
    });
 
    if (scene._moon) {
      scene._moonAngle += dt * 1.2 * speedMultiplier;
      scene._moon.position.x = Math.cos(scene._moonAngle) * 2.2;
      scene._moon.position.z = Math.sin(scene._moonAngle) * 2.2;
    }
 
    if (scene._extraMoons) {
      scene._extraMoons.forEach(m => {
        m.angle += m.speed * dt * speedMultiplier;
        m.mesh.position.x = Math.cos(m.angle) * m.dist;
        m.mesh.position.z = Math.sin(m.angle) * m.dist;
      });
    }
 
    updateComet(dt, elapsed);
  }
 
  const sunPulse = 1.0 + Math.sin(elapsed * 1.2) * 0.005;
  if (planetMeshes['sun']) planetMeshes['sun'].scale.setScalar(trueScale ? 1 : sunPulse);
  if (scene._sunLight) scene._sunLight.intensity = 3.5 + Math.sin(elapsed * 0.8) * 0.3;
 
  updateCamera(dt);
  updateLabels();
  updateDistanceReadout();
  drawMinimap();
  renderer.render(scene, camera);
}
 
function finishLoading() {
  let progress = 0;
  const fill = document.getElementById('loading-fill');
  const subs = ['Mapping gravitational fields', 'Seeding asteroid belt', 'Igniting the Sun', 'Placing moons in orbit', 'Calibrating orbital mechanics'];
  let si = 0;
  const subEl = document.getElementById('loading-sub');
 
  const interval = setInterval(() => {
    progress += Math.random() * 22;
    fill.style.width = Math.min(progress, 100) + '%';
    si = Math.floor((progress / 100) * subs.length);
    if (subEl && subs[si]) subEl.textContent = subs[si];
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
        setTimeout(() => { const l = document.getElementById('loading'); if (l) l.remove(); }, 900);
      }, 400);
    }
  }, 110);
 
  const backBtn = document.createElement('button');
  backBtn.id = 'back-btn';
  backBtn.textContent = '← OVERVIEW';
  backBtn.addEventListener('click', resetCamera);
  document.getElementById('ui').appendChild(backBtn);
 
  showInfoPanel(PLANETS['sun']);
  startFactTicker('sun');
}
 
window.addEventListener('DOMContentLoaded', init);