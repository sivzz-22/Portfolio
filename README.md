# 🕷️ Spider-Man Inspired 3D Developer Portfolio

> **Cinematic Spider-Man aesthetic developer portfolio with 3D WebGL animations, clean architecture, responsive design, and centralized data configuration.**

Built specifically for **Siva Saravana Kumar M** based strictly on verified resume details.

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0 or newer (v22+ recommended)
- **npm**: v9.0 or newer

### 1. Installation

Install dependencies for both frontend and backend:

```bash
# In project root:
npm run install:all

# Or separately:
cd client && npm install
cd ../server && npm install
```

### 2. Running Locally

#### Run Frontend (React + Vite + Three.js):
```bash
# In client/ folder:
npm run dev
```
Open **`http://localhost:5173`** in your web browser.

#### Run Backend (Node.js + Express + MongoDB):
```bash
# In server/ folder:
npm run dev
```
Server runs on **`http://localhost:5000`**.

> [!NOTE]
> **Database Resiliency**: If MongoDB is not configured or running, the entire portfolio still functions completely. Contact form submissions will be gracefully acknowledged and logged to the server console.

---

## 🛠️ How to Customize & Edit Your Portfolio

The entire website is designed so you **never have to modify complex component code** just to update your information or theme.

### 1. Where to Change Personal Information
Open **`client/src/data/portfolioData.js`**.
Under `personal: { ... }`, update:
- `name`: Your full name
- `role`: Your developer role / title
- `degreeTag`: Your college / degree info
- `description`: Your career objective or bio
- `email`: Your email address
- `phone`: Your phone number
- `location`: Your city and state

### 2. Where to Add or Edit Projects
Open **`client/src/data/portfolioData.js`**.
Under `projects: [ ... ]`, simply add a new object:
```javascript
{
  id: "new-project",
  title: "My Awesome Project",
  period: "2026",
  type: "Web Application",
  badge: "Featured App",
  description: "Detailed description of what you engineered...",
  technologies: ["React", "Node.js", "MongoDB"],
  github: "https://github.com/sivzz-22/...",
  highlight: "Key achievement or highlight",
  graphicType: "fitnessPulse" // Options: "fitnessPulse", "cinemaAnalytics", "eyeNavigation"
}
```
The new project card will **automatically appear** on the website with 3D tilt and styling!

### 3. Where to Change Colors & Spider-Man Theme
Open **`client/src/styles/global.css`**.
Modify the CSS variables at the top:
```css
:root {
  /* Change the Spider-Man Palette */
  --spider-red: #e62429;        /* Main Crimson Red */
  --spider-red-glow: #ff3b44;   /* Glowing Neon Red */
  --spider-blue: #1266f1;       /* Electric Web Blue */
  --spider-blue-glow: #00d2ff;  /* Cyan Glow Accent */

  /* Change Backgrounds */
  --bg-primary: #06070a;        /* Deep Space Black */
  --bg-secondary: #0b0d13;
  --bg-card: rgba(14, 18, 26, 0.7);
}
```
Changing these variables alters the visual theme across the **entire website** instantly.

### 4. Where to Replace the Resume
Place your updated PDF file at:
```text
client/public/resume.pdf
```
When users click the **`DOWNLOAD RESUME`** button on the hero section, this file will be opened and downloaded automatically.

### 5. Where to Change Social Links
Open **`client/src/data/portfolioData.js`**.
Under `social: { ... }`, update:
```javascript
social: {
  github: "https://github.com/sivzz-22",
  linkedin: "https://www.linkedin.com/in/siva-saravana-kumar-m-b684b8377/",
  email: "mailto:sivasaravanakumarm@gmail.com"
}
```
All social icons in the Navbar, Hero, Contact, and Footer update automatically.

### 6. How to Configure MongoDB
1. Open **`server/.env.example`** and save a copy as **`server/.env`**.
2. Set your MongoDB connection string in `server/.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority
   ```
3. When you run `npm run dev` in `server/`, you will see:
   ```text
   ✅ MongoDB Connected: cluster0.mongodb.net
   ```
4. Contact submissions will now be persisted directly to your MongoDB `contacts` collection.

---

## 📁 File & Section Architecture

| Section | Component File | Style File | Data Source |
| :--- | :--- | :--- | :--- |
| **Hero (3D Core & Intro)** | `client/src/components/Hero.jsx`<br>`client/src/components/ThreeScene.jsx`<br>`client/src/components/SpiderLogo.jsx` | `client/src/styles/hero.css` | `portfolioData.personal` |
| **3D Red Spider Logo** | `client/src/components/SpiderLogo.jsx` | `client/src/styles/spiderman-effects.css` | N/A |
| **Interactive Web-Slinger** | `client/src/components/WebShooter.jsx` | `client/src/styles/spiderman-effects.css` | N/A |
| **Screen-Crawling Spiders** | `client/src/components/SpiderCrawlers.jsx` | `client/src/styles/spiderman-effects.css` | N/A |
| **Hanging Spidey & CRT HUD** | `client/src/components/SpideyTrackerHUD.jsx` | `client/src/styles/spiderman-effects.css` | `portfolioData.personal` |
| **About Me** | `client/src/components/About.jsx` | `client/src/styles/about.css` | `portfolioData.about` |
| **Technical Skills** | `client/src/components/Skills.jsx` | `client/src/styles/skills.css` | `portfolioData.skills` |
| **Featured Projects** | `client/src/components/Projects.jsx` | `client/src/styles/projects.css` | `portfolioData.projects` |
| **Education Timeline** | `client/src/components/Education.jsx` | `client/src/styles/education.css` | `portfolioData.education` |
| **Achievements & Certs** | `client/src/components/Achievements.jsx` | `client/src/styles/achievements.css` | `portfolioData.certifications`<br>`portfolioData.achievements` |
| **Contact Form & Info** | `client/src/components/Contact.jsx` | `client/src/styles/contact.css` | `portfolioData.contact`<br>`portfolioData.personal` |
| **Navbar & Footer** | `client/src/components/Navbar.jsx`<br>`client/src/components/Footer.jsx` | `client/src/styles/navbar.css`<br>`client/src/styles/footer.css` | `portfolioData.personal`<br>`portfolioData.social` |
| **Spider Background & Cursor** | `client/src/components/SpiderWebBackground.jsx`<br>`client/src/components/CustomCursor.jsx` | `client/src/styles/cursor.css`<br>`client/src/styles/global.css` | N/A |

---

## 🛡️ Key Technical Features
- **The 3D Red Spider Logo**: Precision beveled 8-legged emblem with dual-tone crimson gradients and cast aura (from Reference Image 2).
- **Interactive Web-Shooter**: Click anywhere to shoot glowing silk strands with comic-book "THWIP!" badges and impact splatter.
- **Screen-Crawling Spiders**: Animated multi-legged spiders scurrying across the viewport with real-time mouse evasion.
- **Hanging Spidey Mascot & Retro CRT Tracker HUD**: Upside-down swinging Spider-Man on an elastic web strand triggering a retro-futuristic telemetry terminal (from Reference Image 3).
- **Miles Morales Cinematic Atmosphere**: Deep crimson backdrops, red suit highlights, and dynamic brush tags (from Reference Image 1).
- **Pure Vanilla CSS / No Tailwind**: Clean, modular CSS stylesheets with native CSS variables for frictionless theme modification.
- **Three.js WebGL Scene**: Lightweight 3D cybernetic spider-web core with dynamic dual point lights, orbiting rings, particle clouds, and mouse parallax.
- **Accessibility & Performance**: Smooth 60 FPS animations, custom desktop cursor with mobile-safe detection, and `prefers-reduced-motion` compliance.
