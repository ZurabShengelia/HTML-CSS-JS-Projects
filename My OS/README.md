# SamtrediaOS

**A fully functional browser-based operating system — built with zero dependencies, zero frameworks, zero build steps.**

Open `index.html`. That's it.

---

## Preview

> Boot screen → BIOS POST sequence → Animated desktop → 7 fully working apps

SamtrediaOS runs entirely in vanilla HTML, CSS, and JavaScript. No React. No Node. No npm install. Just three files.

---

## Apps

| App | Description |
|-----|-------------|
| ⌨ **Terminal** | Real shell with flat-path filesystem. `ls`, `cd`, `mkdir`, `touch`, `rm`, `cat`, `git`, `neofetch` and 20+ more commands. Arrow key history, Tab autocomplete. |
| ◉ **Browser** | 8 built-in pages with full navigation history. Back/forward buttons work. Loading bar animation. Article pages with real content. |
| ✎ **Notes** | Multi-note editor with titles, autosave to localStorage, markdown preview, word count, and `.txt` export. |
| ▤ **Files** | Interactive filesystem explorer. Clickable breadcrumb navigation, file content preview, sidebar shortcuts, Trash. Shares the same FS as the Terminal. |
| ⊞ **Calculator** | iOS-style calculator with chained operations, `%`, `±`, keyboard support, and animated display. |
| ◈ **About PC** | Live CPU/RAM/GPU usage bars, real browser info, uptime counter, system log, Run Diagnostics animation. |
| ⬡ **Samtredai AI** | Local AI assistant with 60+ keyword triggers. No API key. No server. Math computation, jokes, philosophy, OS knowledge, code questions. |

---

## Features

- **BIOS boot sequence** — fake POST text scrolling before the logo appears
- **Boot screen** with glitch flicker animation and progress bar
- **Aurora background** — 3 slow-moving radial gradient blobs on a separate canvas
- **Particle network** — 90 connected particles that react to mouse movement
- **CRT scanline overlay** on the desktop
- **Glassmorphic windows** — draggable, resizable, minimizable, maximizable
- **Window focus system** — unfocused windows dim, focused windows glow
- **macOS-style dock** with hover magnification and active/minimized indicators
- **Desktop clock widget** — draggable, always visible
- **App Launcher** — `Ctrl+Space`, searchable, staggered animation
- **Keyboard Shortcuts overlay** — `Ctrl+/`
- **Right-click context menu** on desktop and on icons
- **Notification system** — stacked, typed (info/success/warn/error), with shrinking progress bar
- **Custom cursor** with trail and hover scale effect
- **Fully responsive** — mobile gets full-screen bottom sheet windows, tablet gets centered constrained windows
- **Touch support** — tap, swipe-scroll, all events work on mobile

---

## Browser Pages

| URL | Content |
|-----|---------|
| `samtredaos.io` | OS homepage with features, download button, news cards |
| `github.com` | Fake GitHub profile with contribution graph (CSS grid), repo list, stats |
| `news.samtredaos` | 4 articles — click **Read More** to open full article pages with back navigation |
| `docs.samtredaos` | Documentation with getting started guide and terminal reference |
| `store.samtredaos` | 6 app cards with install buttons |
| `mail.samtredaos` | Email inbox with unread badge, sender names, timestamps |
| `settings.samtredaos` | Toggle switches (functional), real browser info, security settings |
| anything else | Stylized 404 page |

---

## Terminal Commands

```
ls / ls -la    — list directory contents (reads live filesystem)
cd <path>      — change directory, updates prompt
mkdir <name>   — create directory
touch <file>   — create file
rm <name>      — remove file (moves to Trash)
cat <file>     — print file contents
pwd            — print working directory
whoami         — current user
uname          — kernel info
date           — current date/time
ps / top       — process list
neofetch       — system info with ASCII art
git status     — git status output
git log        — commit history
node -v        — Node version
python3 --version
df -h          — disk usage
free -h        — memory usage
ping samtredaos.io
curl status
history        — command history
find           — list files in current directory
echo <text>    — print text
clear          — clear output
help           — all commands
```

---

## Samtredai AI

No API key. No internet. Runs 100% locally.

Responds intelligently to questions about the OS, every app, programming languages (Python, Rust, JavaScript), git, math expressions, time and date, jokes, philosophy, existential questions, system status, and more.

Type any math expression and it computes it: `5 * 12 + 3` → `63`

---

## Getting Started

```bash
git clone
cd samtredaos
open index.html
```

No `npm install`. No build step. No server required.

Works in any modern browser: Chrome, Firefox, Safari, Edge.

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Space` | Open App Launcher |
| `Ctrl+/` | Keyboard shortcuts overlay |
| `Escape` | Close focused window / close overlays |
| Click icon | Open app |
| Drag titlebar | Move window |
| Drag ◢ corner | Resize window |
| ● Red dot | Close window |
| ● Yellow dot | Minimize |
| ● Green dot | Maximize / restore |
| `↑ ↓` in Terminal | Command history |
| `Tab` in Terminal | Autocomplete |

---

## File Structure

```
samtredaos/
├── index.html   — HTML structure, boot screens, overlays
├── style.css    — All styling, responsive breakpoints, animations
└── script.js    — All logic: filesystem, apps, AI, windowing, boot
```

Three files. ~1,800 lines of code total. Zero dependencies.

---

## Tech Stack

- **HTML5** — structure and boot screens
- **CSS3** — glassmorphism, animations, responsive layout, aurora, scanlines
- **Vanilla JavaScript** — windowing system, filesystem, terminal, AI engine, all app logic
- **Google Fonts** — Orbitron (UI), JetBrains Mono (terminal/code)
- **Canvas API** — particle network and aurora background

---

## License

 do whatever you want with it. It's free
