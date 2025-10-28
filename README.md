<div align="center">

<!-- Hero Header with Name -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,12,20&height=200&section=header&text=Particle%20Physics%20Simulator&fontSize=70&fontColor=FFFFFF&animation=twinkling&fontAlignY=25&desc=1,000%20Real-Time%20Particles%20at%2060%20FPS&descSize=20&descAlignY=50&descAlign=50"/>

<br/>

<!-- Animated Typing Subtitle -->
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&duration=3000&pause=1000&color=FFFFFF&center=true&vCenter=true&random=false&width=700&lines=6+Physics+Modes+%E2%80%A2+O(n%C2%B2)+%E2%86%92+O(n)+%E2%80%A2+100x+Faster;Newton+%E2%80%A2+Coulomb+%E2%80%A2+Lorentz+%E2%80%A2+Verlet;Gravity+%E2%80%A2+Electric+%E2%80%A2+Magnetic+%E2%80%A2+Black+Holes" alt="Typing SVG" />

<br/>

<!-- Main Action Buttons -->
<p align="center">
  <a href="https://zacsluss.github.io/particle_physics_simulator/">
    <img src="https://img.shields.io/badge/🚀_VIEW-LIVE_DEMO-2e8b57?style=for-the-badge&labelColor=000000&logo=vercel&logoColor=white" alt="Live Site"/>
  </a>
  <a href="https://github.com/Zacsluss/particle_physics_simulator/archive/refs/heads/main.zip">
    <img src="https://img.shields.io/badge/⬇️_DOWNLOAD-PROJECT-d97706?style=for-the-badge&labelColor=000000&logo=github&logoColor=white" alt="Download"/>
  </a>
</p>

<!-- GitHub Stats Badges -->
<p align="center">
  <img src="https://img.shields.io/github/stars/Zacsluss/particle_physics_simulator?style=social" alt="Stars"/>
  <img src="https://img.shields.io/github/forks/Zacsluss/particle_physics_simulator?style=social" alt="Forks"/>
  <img src="https://img.shields.io/github/watchers/Zacsluss/particle_physics_simulator?style=social" alt="Watchers"/>
  <img src="https://img.shields.io/github/license/Zacsluss/particle_physics_simulator?style=flat-square&color=555555" alt="License"/>
  <img src="https://img.shields.io/github/last-commit/Zacsluss/particle_physics_simulator?style=flat-square&color=666666" alt="Last Commit"/>
</p>

</div>

<br/>

---

## 👋 Hey, I'm Zac

I work on enterprise platforms by day and build unusually fun projects by night. This one simulates **1,000 particles at 60 FPS** across several different physics modes including electric fields, magnetic vortices, black holes, repulsion fields, and DNA helixes.

**What makes it interesting:**
- **100x performance boost** from O(n²) brute force to O(n) spatial grid optimization
- Real physics formulas (Newton's gravity, Coulomb's law, Lorentz force, Verlet integration)
- Zero dependencies - pure JavaScript with Canvas API, no frameworks or libraries

Built with vanilla JavaScript, HTML5 Canvas, and a little creativity!

<div align="center">

<img src="particlesim.gif" alt="Particle Physics Simulator Preview" width="800"/>

*1,000 particles interacting in real-time at 60 FPS*

</div>

---

## ⚡ What This Does

<div align="center">

**Interactive physics sandbox** • **1,000 particles at 60 FPS** • **6 physics modes** • **100x faster than brute force**

</div>

**Key Features:**
- ✨ Six distinct physics modes with real formulas (gravity, electric, magnetic, black hole, repulsion, DNA helix)
- 🎮 Interactive controls—click to spawn, drag for streams, right-click for attractors
- 🔬 Spatial grid partitioning reduces collision detection from O(n²) to O(n)
- 📱 Responsive design with keyboard shortcuts and mobile touch support
- 🎯 Verlet integration for stable, accurate physics simulation

**Tech:** Vanilla JavaScript • HTML5 Canvas • CSS3 • ES6 Modules

---

## 📚 Table of Contents

<details>
<summary><b>Jump to a section</b></summary>

- [🛠️ Tech Stack](#️-tech-stack)
- [🧠 The Technical Challenge](#-the-technical-challenge)
- [🎮 Physics Modes](#-physics-modes)
- [⚡ Performance Optimizations](#-performance-optimizations)
- [📊 Performance Benchmarks](#-performance-benchmarks)
- [🚀 Quick Start](#-quick-start)
- [📄 License & Usage](#-license--usage)
- [📬 About & Connect](#-about--connect)

</details>

---

## 🛠️ Tech Stack

<div align="center">

### What I Used to Build This

<img src="https://skillicons.dev/icons?i=js,html,css,git,github,vscode" alt="Tech Stack" />

### Core Technologies

<table>
<tr>
<td align="center" width="25%">
<img src="https://img.shields.io/badge/JavaScript-ES6+-f7df1e?style=flat-square&logo=javascript&logoColor=black"/><br/>
<sub><b>Core Logic</b></sub>
</td>
<td align="center" width="25%">
<img src="https://img.shields.io/badge/Canvas_API-2d-e34c26?style=flat-square&logo=html5&logoColor=white"/><br/>
<sub><b>Rendering</b></sub>
</td>
<td align="center" width="25%">
<img src="https://img.shields.io/badge/HTML5-Semantic-e34c26?style=flat-square&logo=html5&logoColor=white"/><br/>
<sub><b>Structure</b></sub>
</td>
<td align="center" width="25%">
<img src="https://img.shields.io/badge/CSS3-Modern-1572b6?style=flat-square&logo=css3&logoColor=white"/><br/>
<sub><b>Styling</b></sub>
</td>
</tr>
</table>

</div>

<details>
<summary><b>📦 See the full dependency list</b></summary>

```json
{
  "dependencies": {},
  "devDependencies": {}
}
```

**Zero external dependencies.** This project uses only native Web APIs:
- Canvas 2D Context for rendering
- ES6 Modules for code organization
- Vanilla JavaScript for all logic
- Native event handlers for interactivity

</details>

---

## 🧠 The Technical Challenge

**Achieving smooth performance with 1,000 interacting particles.** The naive approach is checking every particle against every other particle which requires a whopping 1,000,000 comparisons per frame! This crashes at ~15 FPS.

**The solution: Spatial grid partitioning reduces collision detection from O(n²) to O(n), achieving 100x performance improvement and maintaining 60 FPS.**

<details>
<summary><b>📐 How spatial grid optimization works</b></summary>

<br/>

Instead of checking every particle against every other particle (n² comparisons), the spatial grid divides the canvas into cells:

1. **Divide canvas into grid** (e.g., 10×10 cells)
2. **Hash particles to cells** based on position
3. **Only check particles in same/adjacent cells**
4. **Result: O(n) lookups** instead of O(n²)

**Example:**
- 1,000 particles, no grid: 1,000,000 comparisons/frame
- 1,000 particles, with grid: ~10,000 comparisons/frame
- **100x reduction** in computational cost

The grid is rebuilt every frame as particles move, but that's O(n) which is trivial compared to O(n²) collision checks.

</details>

---

## 🎮 Physics Modes

<details>
<summary><b>🌌 See all 6 physics modes and formulas</b></summary>

<br/>

### 1. Gravity Mode
**Formula:** `F = G × m₁ × m₂ / r²` (Newton's law of universal gravitation)

Particles attract each other based on mass and distance. Creates orbital patterns and galaxy formations.

### 2. Electric Field
**Formula:** `F = k × q₁ × q₂ / r²` (Coulomb's law)

Particles have positive/negative charges. Opposites attract, likes repel. Creates complex swirling patterns.

### 3. Magnetic Vortex
**Formula:** `F = q(v × B)` (Lorentz force)

Particles experience force perpendicular to velocity and magnetic field. Creates spiral vortex patterns.

### 4. Black Hole
**Formula:** Schwarzschild radius accretion

Particles are pulled into a central singularity. Those crossing the event horizon are consumed. Creates dramatic spiral infall.

### 5. Repulsion Field
**Formula:** Inverse gravity (repulsive force)

All particles push away from each other. Creates explosive dispersion patterns.

### 6. DNA Helix
**Formula:** Constrained molecular bonds

Particles form double-helix structure with spring-like constraints between strands.

</details>

---

## ⚡ Performance Optimizations

**How this maintains 60 FPS with 1,000 particles:**

- ✅ **Spatial grid partitioning** — O(n²) → O(n) collision detection
- ✅ **Verlet integration** — Stable physics with implicit velocity
- ✅ **Force capping** — Prevents instabilities from extreme forces
- ✅ **Batched canvas operations** — Minimize draw calls
- ✅ **DOM updates throttled** — Stats update every 10 frames (90% reduction)
- ✅ **Dynamic frame skipping** — Maintains responsiveness under heavy load
- ✅ **Pre-computed constants** — TWO_PI, cell sizes, etc.

---

## 📊 Performance Benchmarks

<div align="center">

### Real numbers from testing on various devices

<table style="margin: 0 auto;">
<tr>
<td width="50%">

#### Desktop (1920×1080)
| Metric | Value |
|:------:|:-----:|
| Frame Rate | 60 FPS |
| Particles | 1,000 simultaneous |
| CPU Usage | ~15% (single core) |
| Memory | ~25 MB |
| Load Time | <100ms |

</td>
<td width="50%">

#### Mobile (iPhone 13)
| Metric | Value |
|:------:|:-----:|
| Frame Rate | 60 FPS |
| Particles | 1,000 simultaneous |
| CPU Usage | ~25% |
| Memory | ~30 MB |
| Load Time | ~150ms |

</td>
</tr>
</table>

</div>

<details>
<summary><b>📦 File size breakdown</b></summary>

```
index.html       3.2 KB → 1.8 KB gzipped
css/styles.css  10.1 KB → 3.4 KB gzipped
js/constants.js  3.5 KB → 1.2 KB gzipped
js/spatial-grid.js 3.8 KB → 1.4 KB gzipped
js/particle.js   5.2 KB → 1.9 KB gzipped
js/physics.js    8.9 KB → 3.1 KB gzipped
js/app.js       24.3 KB → 8.2 KB gzipped
───────────────────────────────────────────────────────────
Total           59.0 KB → 21.0 KB gzipped (64% reduction)
```

</details>

---

## 🚀 Quick Start

<div align="center">

### Want to try it locally? Takes about 30 seconds

</div>

```bash
# 1️⃣ Clone this repo
git clone https://github.com/Zacsluss/particle_physics_simulator.git
cd particle_physics_simulator

# 2️⃣ Start a local server (required for ES6 modules)
python -m http.server 8000
# Or use: npx http-server -p 8000

# 3️⃣ Open in browser
# Navigate to http://localhost:8000

# 4️⃣ Start experimenting!
# - Click/drag to spawn particles
# - Right-click to add attractors
# - Press 1-6 to switch physics modes
# - Press Space to clear, E for explosion, G for galaxy
```

<details>
<summary><b>🔧 How to customize it for yourself</b></summary>

<br/>

Make it yours (takes about 5 minutes):

1. **Your physics:** Edit `js/constants.js` — tweak gravity strength, particle count limits, grid cell sizes
2. **Your colors:** Update `css/styles.css` — change the HSL color cycling formulas
3. **Your modes:** Add new physics in `js/physics.js` — implement your own force calculations
4. **Your UI:** Modify `index.html` — rearrange controls or add new buttons
5. **Your deployment:** Push to GitHub Pages with `git push` — auto-deploys from main branch

**Pro tip:** The spatial grid size (in `constants.js`) has a huge impact on performance. Too small = too many cells to check. Too large = too many particles per cell. Current value (100px) is optimized for 1920×1080 screens.

</details>

---

## 📄 License & Usage

**MIT License** — Fork it, customize it, do whatever you want with it. No credit needed (but a ⭐ appreciated).

**Quick setup:** `git clone` → start local server → open browser → experiment

<details>
<summary><b>📋 Full customization instructions</b></summary>

<br/>

**Learning Coding or Physics? Want to add a new physics mode?**
1. Add a button in `index.html` (copy existing button structure)
2. Create a new function in `js/physics.js` (follow existing pattern)
3. Add event listener in `js/app.js` to switch modes
4. Update constants in `js/constants.js` if needed (force strength, etc.)

</details>

<br/>

<div align="center">

<img src="https://img.shields.io/badge/License-MIT-555555?style=for-the-badge&logo=opensourceinitiative&logoColor=white"/>

Full license text in [LICENSE](LICENSE) file.

</div>

---

## 📬 About & Connect

I currently work as a Lead CRM Systems Analyst at Computershare, managing enterprise platforms and Salesforce integrations across global teams.

I'm into enterprise systems architecture and management, people management, programming, AI/ML, digital design, art, and photography - which you can find more info about by visiting my portfolio below. Above all, I'm on a never-ending quest for knowledge!

**Let's connect:**

<div align="center">

<a href="https://zacsluss.github.io/portfolio/">
  <img src="https://img.shields.io/badge/Portfolio-zacsluss.github.io-2e7d5a?style=for-the-badge&logo=vercel&logoColor=white"/>
</a>
<a href="https://github.com/Zacsluss">
  <img src="https://img.shields.io/badge/GitHub-@Zacsluss-181717?style=for-the-badge&logo=github&logoColor=white"/>
</a>
<a href="https://linkedin.com/in/zacharyjsluss">
  <img src="https://img.shields.io/badge/LinkedIn-Zachary_Sluss-064789?style=for-the-badge&logo=linkedin&logoColor=white"/>
</a>
<a href="Zachary_Sluss_Resume.pdf">
  <img src="https://img.shields.io/badge/Download-Resume-6366f1?style=for-the-badge&logo=adobeacrobatreader&logoColor=white"/>
</a>
<a href="mailto:zacharyjsluss@gmail.com">
  <img src="https://img.shields.io/badge/Email-zacharyjsluss@gmail.com-b91c1c?style=for-the-badge&logo=gmail&logoColor=white"/>
</a>

<br/>

**Found this helpful?** Give it a ⭐ to show support!

</div>
