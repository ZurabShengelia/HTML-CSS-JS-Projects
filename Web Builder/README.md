# SamtrediaWebBuilder

A fast, browser-based visual website builder. Design layouts by dragging elements onto a canvas, styling them with a live property panel, and exporting clean HTML — no build tools, no dependencies, no install required.

---

## Demo

Open `index.html` in any modern browser and start building immediately.

---

## Features

### Canvas
- **Full HD canvas** — default resolution 1920 × 1080, matches your screen pixel-perfectly
- **Responsive presets** — switch between Desktop (1920×1080), Laptop (1280×800), Tablet (768×1024), and Mobile (390×844) in one click
- **Zoom & pan** — zoom from 10% to 300% with `Ctrl + Scroll` or the zoom controls; pan with `Space + Drag`
- **Fit to view** — auto-scales the canvas to fill the viewport
- **Grid snapping** — elements snap to an 8px grid for consistent alignment
- **Smart snap guides** — cyan guide lines appear when edges and centers align with other elements
- **Dark / light canvas** — toggle the canvas background between white and dark with the moon/sun button
- **Rulers** — horizontal and vertical rulers with tick marks and labels

### Elements

Drag any element from the left panel onto the canvas:

| Basic | Advanced |
|---|---|
| Text | Input |
| Heading | Video |
| Button | Icon |
| Image | Badge |
| Box (container) | Section |
| Divider | Spacer |

### Templates

One-click template blocks to kickstart your design:

- **Hero** — badge, heading, subtitle, two CTA buttons on a tinted background
- **Card** — image, category badge, title, description, and action button
- **Navbar** — logo, nav links, login and sign-up buttons
- **CTA** — dark full-width call-to-action section

### Style Panel (right sidebar → Style tab)

Edit every visual property of a selected element live:

- **Content** — text, font size, weight, line height, letter spacing, alignment
- **Colors** — foreground, background, border — with a color picker and 15 quick-access swatches
- **Appearance** — border radius, padding, opacity
- **Shadow** — enable/disable with a toggle; control X, Y, blur, spread, and shadow color
- **Image** — set via URL paste or file upload with live preview
- **Video** — upload an MP4/WebM/OGG file or paste a YouTube URL with embedded preview
- **Icon** — choose from 12 built-in icons (star, heart, check, arrow, mail, phone, user, search, settings, home, cart, bell)

### Layout Panel (right sidebar → Layout tab)

Numeric precision controls for:

- **Position** — X and Y coordinates
- **Size** — width and height
- **Spacing** — padding and border radius
- **Typography** — font size, line height, letter spacing, text alignment (text elements only)
- **Border** — width and color (container / section / input only)
- **Transform** — opacity slider
- **Z-Index** — stacking order

### Layers Panel (left sidebar → Layers tab)

- Lists all elements in stacking order
- Click to select, double-click to rename inline
- Lock icon shown on locked elements

### Editing

- **Drag to move** — grab any element and drag it freely; snaps to grid and shows alignment guides
- **8 resize handles** — drag corners and edge midpoints to resize
- **Multi-select** — `Shift + Click` to select multiple elements, then move them together
- **Inline text editing** — double-click any text, heading, button, or badge to edit text directly on the canvas
- **Context menu** — right-click any element for Duplicate, Bring Forward, Send Back, Lock/Unlock, and Delete
- **Element action bar** — appears above the selected element with quick Duplicate, layer move, and Delete buttons
- **Lock** — prevents accidental moves or edits

### History

- **Undo / Redo** — up to 80 steps of undo history (`Ctrl+Z` / `Ctrl+Shift+Z`)
- **History counter** — shows the number of saved states in the topbar

### Save & Load

- **Save project** — exports the full canvas state as a `.json` file
- **Load project** — restores a previously saved `.json` file, including canvas size and all elements
- **Autosave** — automatically saves to `localStorage` every 30 seconds; restores on next visit

### Export

- **HTML Snippet** — absolute-positioned `<div>` block ready to paste into any page
- **Full Page** — complete standalone `<!DOCTYPE html>` document with Google Fonts included
- **Copy All** — copies the full exported code to clipboard
- **Copy Element** — copies just the selected element's HTML
- **Preview** — opens the exported page in a new browser tab instantly

---

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl Z` | Undo |
| `Ctrl Shift Z` | Redo |
| `Ctrl C` | Copy element |
| `Ctrl V` | Paste element |
| `Ctrl D` | Duplicate element |
| `Delete` / `Backspace` | Delete selected |
| `← ↑ → ↓` | Nudge 1px |
| `Shift + ← ↑ → ↓` | Nudge 8px |
| `Ctrl + Scroll` | Zoom in / out |
| `Space + Drag` | Pan canvas |
| `Shift + Click` | Multi-select |
| `?` | Open shortcuts cheatsheet |
| `Escape` | Deselect all |

---

## Project Structure

```
SamtrediaWebBuilder/
├── index.html      # App shell, all modals and sidebar markup
├── script.js       # All application logic — state, rendering, interactions, export
└── styles.css      # Full dark-theme UI styles using CSS custom properties
```

No frameworks, no bundlers, no `node_modules`. Pure HTML, CSS, and vanilla JavaScript.

---

## Getting Started

```bash
git clone 
cd SamtrediaWebBuilder
# Open in browser — no server needed
open index.html
```

Or just download the three files and open `index.html` directly.

---

## Browser Support

Works in any modern browser that supports ES2020+ and the File/FileReader APIs:

- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 15+

---

## License

free to use, modify, and distribute.
