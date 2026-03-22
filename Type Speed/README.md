# TypeFast — Typing Speed Test

A premium, brutalist-editorial typing speed test built with pure vanilla HTML, CSS, and JavaScript. No frameworks. No dependencies. Just three files.

---

## Live Demo

Open `index.html` in any browser. Works fully offline.

---

## Features

### Core Test
- Real-time WPM calculation (Net & Raw)
- Accuracy tracking per keystroke
- Configurable time modes — 15s / 30s / 60s
- Configurable word counts — 25 / 50 / 100
- Three content modes — words / +punctuation / +numbers
- Backspace support within current word
- Tab to restart at any time (with confirmation guard)
- Space on empty input counts as full-word penalty

### Live Stats During Test
- Live WPM with sparkline graph
- Accuracy percentage
- Countdown timer with color shift (white → amber → red)
- Consecutive correct word streak counter
- Keystroke rhythm visualizer (scrolling bar chart)
- Typing pace label — slow / building / good pace / fast / blazing
- Live clock in masthead
- Caps Lock warning chip

### Results Screen
- Giant Net WPM with CMYK misprint offset effect
- Raw WPM with tooltip explaining the difference
- Accuracy ring (animated SVG stroke)
- Consistency score (standard deviation of per-second WPM samples)
- Total keystrokes, correct, incorrect, elapsed time
- WPM over time line chart (Canvas)
- Confetti burst when personal best is beaten
- Copy result to clipboard — `TypeFast · 94 WPM · 98% ACC · 60s · 2026-03-22`

### Keyboard Heatmap
- Full QWERTY rendered in HTML/CSS
- Keys colored by relative mistake frequency
- Hover tooltips showing exact mistake count per key
- Staggered entrance animation

### Persistence
- Personal best score saved per mode in localStorage
- Top 5 leaderboard per mode with WPM, accuracy, date
- Sound toggle preference saved
- Theme preference saved
- localStorage schema versioning (auto-clears stale data)

### Visual & UX
- Three themes — INK (off-white) / CARBON (dark) / RUST (deep rust + gold)
- Smooth DOM caret that follows characters with `getBoundingClientRect()`
- Custom diamond cursor with hover scale
- Screen transitions (scale + opacity)
- Staggered result entrance animations
- Confetti on new personal best
- Torn paper SVG rules
- Letterpress ink-bleed text shadow on title
- Keyboard sound on every keystroke (embedded base64 MP3, pitch-varied)

---

## File Structure

```
typefast/
├── index.html      — markup and screen structure
├── style.css       — all styles, themes, animations
└── script.js       — all logic + embedded audio
```

No build step. No `node_modules`. No config files.

---

## Themes

| Theme | Background | Text | Accent |
|-------|-----------|------|--------|
| INK | `#f0ece4` off-white | `#0d0b08` ink | `#c0392b` sienna |
| CARBON | `#141210` near-black | `#f0ece4` warm white | `#c0392b` sienna |
| RUST | `#2a1208` deep rust | `#e8d5b0` parchment | `#d4a017` gold |

Switch with the `INK / CRBN / RUST` button on the home screen.

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Any key | Start test / type |
| `Space` | Advance to next word |
| `Backspace` | Delete last character in current word |
| `Tab` | Restart (first press warns, second press confirms mid-test) |

---

## WPM Formula

**Net WPM** = `(correct keystrokes / 5 / minutes) − (errors / minutes)`

**Raw WPM** = `(total keystrokes / 5 / minutes)`

**Consistency** = `max(0, 100 − (stdDev / avgWPM × 100))`

---

## Local Storage Keys

All keys are prefixed with `typefast_` and versioned. If the schema version doesn't match, all keys are cleared automatically.

| Key | Value |
|-----|-------|
| `typefast_schema_v` | Schema version string |
| `typefast_theme` | `ink` / `carbon` / `rust` |
| `typefast_sound` | `on` / `off` |
| `typefast_best_{time}s_{words}w_{mode}` | Best WPM integer |
| `typefast_lb_{time}s_{words}w_{mode}` | JSON array of top 5 scores |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
| Styles | CSS3 — custom properties, keyframes, clip-path, SVG backgrounds |
| Logic | Vanilla JavaScript (ES6+) |
| Audio | Web Audio API — base64 encoded MP3, pitch-varied per event |
| Charts | Canvas API — sparkline, rhythm visualizer, WPM chart |
| Fonts | Google Fonts — Playfair Display + Courier Prime |
| Storage | localStorage |

---

## Getting Started

```bash
git clone 
cd YOUR-REPO-NAME
open index.html
```

No install. No server required.

---

## Deployment

Works on any static host:

- **GitHub Pages** — push to `main`, enable Pages in repo settings
- **Netlify** — drag and drop the folder
- **Vercel** — `vercel --prod`
- **Any web server** — just serve the three files

---

## License

 free to use, modify, and distribute.
