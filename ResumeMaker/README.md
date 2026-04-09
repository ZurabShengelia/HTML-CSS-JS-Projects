# ResuméCraft — Professional Resume Builder

A modern, feature-rich resume builder web application that helps professionals create stunning, customizable resumes in minutes.

## 🎯 Overview

**ResuméCraft** is a single-page application (SPA) that combines an intuitive form interface with real-time resume preview capabilities. Built with vanilla HTML, CSS, and JavaScript, it provides users with a seamless experience for crafting professional resumes.

**Branding**: Crafting careers, one line at a time

---

## ✨ Key Features

### 📝 7-Step Resume Building Process

1. **Personal Information** — Full name, job title, contact details, location, and professional links (LinkedIn, portfolio, GitHub)
2. **Professional Summary** — Compelling overview of your career highlights
3. **Experience** — Work history with company details, positions, and accomplishments
4. **Education** — Academic background and qualifications
5. **Skills** — Searchable skill database with 200+ predefined skills (technical, soft, and specialized)
6. **Projects** — Showcase portfolio projects with descriptions and links
7. **Design** — Customize resume appearance with templates and themes

### 🎨 Design Customization

- **6 Professional Templates**
  - Classic Elegant
  - Modern Minimal
  - Bold Executive
  - Creative Pro
  - Minimalist
  - Academic

- **5 Color Schemes**
  - Gold (default)
  - Midnight Blue
  - Forest Green
  - Burgundy
  - Slate

- **3 Font Combinations**
  - Serif (Cormorant Garamond + Arial)
  - Sans (Arial + Arial)
  - Mixed (Serif headings + Sans body)

### 🖼️ Advanced Features

- **Profile Photo Upload** — Add a professional headshot in drag-and-drop zone
- **Real-time Preview** — See changes instantly as you build
- **Draft Auto-Save** — Automatic periodic saving of your work
- **Zoom Controls** — Adjust preview display scale (1x - 2x)
- **Responsive Design** — Works perfectly on desktop, tablet, and mobile
- **Toast Notifications** — Real-time feedback for user actions
- **Progress Tracking** — Visual progress bar shows completion status
- **Step Navigation** — Jump between steps quickly or proceed sequentially

### 💼 Comprehensive Skill Database

200+ predefined skills across multiple categories:
- **Programming Languages** — JavaScript, Python, Java, C++, C#, Go, Rust, Swift, Kotlin, PHP, Ruby, Scala, R, TypeScript
- **Frontend Frameworks** — React, Vue.js, Angular, Next.js, Nuxt.js, Svelte, Solid.js
- **Backend Frameworks** — Node.js, Express.js, FastAPI, Django, Flask, Spring Boot, Laravel, Rails
- **Databases** — PostgreSQL, MySQL, MongoDB, Redis, Elasticsearch, DynamoDB, Firebase, Supabase
- **Cloud & DevOps** — AWS, Azure, Google Cloud, Docker, Kubernetes, CI/CD platforms
- **Design & UX** — Figma, Adobe Suite, Prototyping, Wireframing, Design Systems
- **Data & Analytics** — Machine Learning, TensorFlow, PyTorch, Power BI, Tableau
- **Soft Skills** — Leadership, Communication, Project Management, Problem Solving

---

## 🏗️ Project Structure

```
ResumeMaker/
├── index.html          # Main HTML markup with form and preview layout
├── script.js           # Core application logic (3000+ lines)
├── style.css           # Professional styling and animations
└── README.md           # This file
```

### File Sizes & Complexity
- **index.html** — Form panels, step indicators, input fields, and preview container
- **script.js** — State management, form validation, data persistence, rendering logic
- **style.css** — Dark theme with gold accents, responsive grid layouts, smooth animations

---

## 🎬 Getting Started

### Opening the Application

1. Open `index.html` in a modern web browser
2. You'll see the loading animation (shimmer screen)
3. Click "Start Building" or navigate through the navbar

### Building Your Resume

1. **Step 1**: Enter your personal information
   - Upload a profile photo (optional)
   - Fill in contact details and professional links

2. **Step 2**: Write a professional summary
   - Highlight key achievements and career goals

3. **Step 3**: Add work experience
   - Multiple entries supported
   - Include company name, position, dates, and accomplishments

4. **Step 4**: Add education
   - School name, degree, field of study, graduation date

5. **Step 5**: Select skills
   - Search and add from 200+ predefined skills
   - Customize order by importance

6. **Step 6**: Showcase projects
   - Add portfolio projects with descriptions
   - Include project links and images (if supported)

7. **Step 7**: Customize design
   - Choose template style
   - Select color scheme
   - Pick font combination
   - Adjust zoom level for preview

### Exporting

- **Download** — Save as PDF for sharing or printing
- **Print** — Direct browser print functionality
- **Copy** — Easy sharing of resume data

---

## 💾 Data Management

### Auto-Draft Saving
- Resume data is automatically saved during editing
- Continues where you left off when returning

### State Structure
The application maintains a comprehensive state object:

```javascript
{
  step: 1,                    // Current step (1-7)
  template: 'classic',        // Selected template
  color: 'gold',             // Color theme
  font: 'serif',             // Font combination
  photo: null,               // Profile photo (base64)
  fields: { ... },           // Personal info fields
  experience: [],            // Work history array
  education: [],             // Education history array
  skills: [],                // Selected skills array
  projects: [],              // Projects portfolio array
  certs: [],                 // Certifications array
  zoomLevel: 1               // Preview zoom (1-2)
}
```

---

## 🎨 Design Highlights

### Color Palette (Dark Theme)
- **Background**: `#09090b` (near black)
- **Accent Gold**: `#c9a96e`
- **Text**: `#f2ede4` (ivory)
- **Borders**: Gold at 11% opacity

### Typography
- **Display Font**: Cormorant Garamond (elegant serif)
- **Body Font**: Outfit (modern sans-serif)
- **Sizes**: Responsive with CSS clamp() for scaling

### Visual Effects
- Subtle grain overlay for texture
- Smooth transitions (200ms cubic-bezier)
- Box shadows for depth
- Glassmorphism navbar with backdrop blur
- Shimmer loading animation

### Responsive Breakpoints
- Desktop-first design
- Hamburger menu on mobile
- Flexible grid layouts
- Mobile-optimized form panels

---

## 🔧 Technical Details

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features
- CSS Grid and Flexbox layouts
- HTML5 form capabilities

### Performance Optimizations
- Single-page application (no page reloads)
- Efficient state management
- Optimized CSS animations
- Debounced auto-save functionality
- Lazy loading for images

### Accessibility Features
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus management
- Color contrast compliance

---

## 🚀 Features in Detail

### Input Validation
- Required field checking
- Email format validation
- Date range validation
- Skill duplicate prevention
- Character count limits

### User Experience
- Progress visualization
- Step-by-step guidance
- Real-time preview updates
- Toast notifications for feedback
- Error recovery and handling

### Customization Options
- 6 templates × 5 colors × 3 fonts = 90+ combinations
- Adjustable preview zoom (1x to 2x)
- Reorderable resume sections
- Optional fields (not required)

---

## 📋 Supported Resume Sections

### Core Sections
- ✅ Personal Information
- ✅ Professional Summary
- ✅ Work Experience
- ✅ Education
- ✅ Skills
- ✅ Projects/Portfolio

### Optional Sections
- ✅ Certifications
- ✅ Profile Photo
- ✅ Social Links (LinkedIn, GitHub, Portfolio)

---

## 🎯 Use Cases

Perfect for:
- Job seekers creating new resumes
- Career changers updating work history
- Freelancers showcasing skills and projects
- Students entering the job market
- Professionals maintaining multiple resume versions
- Recruiters creating templates for candidates

---

## 🔐 Privacy & Data

- **Local Storage**: All data stored locally in your browser
- **No Server Upload**: Your resume stays on your device
- **No Tracking**: Privacy-focused design
- **Data Persistence**: Automatically saved between sessions

---

## 🎓 Learning Resources

This project demonstrates:
- Vanilla JavaScript state management
- Complex form handling
- Dynamic DOM manipulation
- CSS Grid and responsive layouts
- Modern web animations
- UX/UI best practices
- Real-time rendering systems

---

## 🤝 Contributing

This is a personal project. Feel free to fork and customize for your own needs!

### Possible Enhancements
- Cloud synchronization
- Multi-resume management
- Preset templates from industry experts
- PDF download with formatting preservation
- Dark/light theme toggle
- Support for multiple languages
- Resume builder AI suggestions

---

## 📄 License

Personal project. Feel free to use and modify.

---

## 💡 Tips for Best Results

1. **Photo**: Use a high-quality headshot in square format (200×200px minimum)
2. **Summary**: Keep it concise (2-3 sentences) highlighting key skills
3. **Experience**: Use action verbs and quantifiable achievements
4. **Skills**: List 5-20 most relevant skills in priority order
5. **Projects**: Include links to GitHub repos or live demos
6. **Template**: Choose "Classic Elegant" for conservative industries, "Creative Pro" for creative fields
7. **Colors**: Gold or Midnight for finance/law, Green or Burgundy for creative fields

---

## 🌟 Features at a Glance

| Feature | Status | Details |
|---------|--------|---------|
| Multi-Step Form | ✅ | 7-step guided process |
| Real-Time Preview | ✅ | Live resume updates |
| Template Selection | ✅ | 6 professional designs |
| Color Customization | ✅ | 5 theme options |
| Font Selection | ✅ | 3 combinations |
| Photo Upload | ✅ | Drag-and-drop support |
| Skill Database | ✅ | 200+ predefined skills |
| Auto-Save | ✅ | Periodic draft backup |
| Responsive Design | ✅ | Desktop, tablet, mobile |
| Export Options | ✅ | PDF & Print ready |

---

**ResuméCraft** — Building Professional Identities, One Resume at a Time 🚀
