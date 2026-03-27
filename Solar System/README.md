# 🪐 Solar System Explorer

An interactive 3D solar system built with Three.js — explore all 8 planets, real orbital mechanics, and a visually rich space environment directly in your browser.

## ✨ Features

### Visual
- Procedural Sun shader with animated surface, corona, and multi-layer glow
- Custom planet shaders — Earth with oceans, clouds & polar ice; Mars with rust terrain; Jupiter with animated bands and Great Red Spot
- Atmospheric rim-lighting on Earth, Venus, Mars, Jupiter, Saturn, Uranus, Neptune
- Saturn's rings with procedural banding
- Asteroid belt between Mars and Jupiter (2,200+ particles)
- Comet with glowing particle tail on an elliptical orbit
- 90,000 twinkling stars with color variation
- Nebula depth layer in the background
- Additional moons — Io, Europa (Jupiter), Titan (Saturn), Phobos & Deimos (Mars), Titania (Uranus), Triton (Neptune)

### Interaction
- Click any planet or use the sidebar list to fly to it
- Camera drag to orbit the solar system in overview mode
- Scroll wheel to zoom in and out
- Planet comparison — pick any two planets for a side-by-side stat panel
- Real-time AU distance readout for the focused planet
- Top-down mini-map showing live orbital positions
- "Did You Know" fact ticker with 4 rotating facts per planet
- Toggleable orbit rings
- Artistic vs True Scale toggle — see the dramatic real size differences
- Pause / Resume orbital motion

### Data
- Real planetary positions on page load using J2000 ephemeris data
- Orbital period, mass, diameter, temperature, and moon count for every body
- Keyboard shortcuts: `1–9` to jump to planets, `Space` to pause, `Esc` for overview

## 🚀 Getting Started

No build tools or dependencies required. Just open `index.html` in a browser.

```bash
git clone 
cd YOUR_REPO
open index.html
```

Or serve it locally to avoid any CORS issues:

```bash
npx serve .
# then open http://localhost:3000
```

## 📁 File Structure

```
├── index.html     # App shell and UI markup
├── style.css      # All styling and animations
├── script.js      # Three.js scene, shaders, and interaction logic
└── README.md
```

## 🛠 Built With

- [Three.js r128](https://threejs.org/) — 3D rendering
- [Syne](https://fonts.google.com/specimen/Syne) + [Space Mono](https://fonts.google.com/specimen/Space+Mono) — typography
- Web Audio API — ambient space drone
- Vanilla JS — no frameworks

## 🌍 Live Demo

[View Live →](https://YOUR_USERNAME.github.io/YOUR_REPO)

## 📄 License

 free to use, modify, and distribute.
