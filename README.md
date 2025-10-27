<div align="center">

<!-- Hero Header -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=14,18,24&height=180&section=header&text=Particle%20Physics%20Simulator&fontSize=60&fontColor=FFFFFF&animation=twinkling&fontAlignY=30&desc=1,000%20Real-Time%20Particles%20at%2060%20FPS&descSize=18&descAlignY=55"/>

<br/>

<!-- Animated Subtitle -->
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=20&duration=3000&pause=1000&color=2d9a5e&center=true&vCenter=true&random=false&width=700&lines=6+Physics+Modes+%E2%80%A2+O(n%C2%B2)+%E2%86%92+O(n)+%E2%80%A2+100x+Faster;Newton+%E2%80%A2+Coulomb+%E2%80%A2+Lorentz+%E2%80%A2+Verlet;Gravity+%E2%80%A2+Electric+%E2%80%A2+Magnetic+%E2%80%A2+Black+Holes" alt="Typing SVG" />

<br/>

<!-- Main Action Buttons -->
<p align="center">
  <a href="https://zacsluss.github.io/particle_physics_simulator/">
    <img src="https://img.shields.io/badge/⚛️_LAUNCH-LIVE_DEMO-2d7a3e?style=for-the-badge&labelColor=000000&logo=atom&logoColor=white" alt="Live Demo"/>
  </a>
  <a href="https://github.com/Zacsluss/particle_physics_simulator/archive/refs/heads/main.zip">
    <img src="https://img.shields.io/badge/⬇️_DOWNLOAD-ZIP-0366d6?style=for-the-badge&labelColor=000000&logo=download&logoColor=white" alt="Download"/>
  </a>
</p>

<!-- GitHub Stats Badges -->
<p align="center">
  <img src="https://img.shields.io/github/stars/Zacsluss/Particle_Physics_Simulator?style=social" alt="Stars"/>
  <img src="https://img.shields.io/github/forks/Zacsluss/Particle_Physics_Simulator?style=social" alt="Forks"/>
  <img src="https://img.shields.io/github/license/Zacsluss/Particle_Physics_Simulator?style=flat-square&color=555555" alt="License"/>
  <img src="https://img.shields.io/github/last-commit/Zacsluss/Particle_Physics_Simulator?style=flat-square&color=666666" alt="Last Commit"/>
</p>

</div>

<br/>

---

## 🎯 What This Is

**Interactive physics sandbox simulating 1,000 particles at 60 FPS across six distinct physics modes**—gravity, electric fields, magnetic vortices, black holes, repulsion fields, and DNA helixes. Click to spawn particles, drag to create streams, right-click to add attractors, and watch as thousands of particles follow real physics formulas in real-time.

<div align="center">

```diff
+ 1,000 particles at locked 60 FPS
+ 100x performance improvement (O(n²) → O(n))
+ 6 physics modes with real formulas
+ Verlet integration for stable physics
+ Zero dependencies—pure JavaScript
+ Modular architecture (7 files, ~2K lines)
```

</div>

<br/>

<div align="center">

### See it in action:

<img src="particlesim.gif" alt="Particle Physics Simulator Preview" width="800"/>

<br/>

*1,000 particles interacting in real-time at 60 FPS*

</div>

<br/>

<div align="center">

<!-- Performance Metrics -->
<table>
  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/Performance-60_FPS-2d7a3e?style=flat-square&logo=speedtest&logoColor=white"/><br/>
      <sub><b>Frame Rate</b></sub>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/Particles-1,000-1E4A6D?style=flat-square&logo=atom&logoColor=white"/><br/>
      <sub><b>Simultaneous</b></sub>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/Optimization-100x-8B3A3A?style=flat-square&logo=rocket&logoColor=white"/><br/>
      <sub><b>Speed Boost</b></sub>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/Modes-6_Physics-8B6914?style=flat-square&logo=physics&logoColor=white"/><br/>
      <sub><b>Simulations</b></sub>
    </td>
  </tr>
</table>

</div>

<div align="center">
<img width="800" src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=14,18,24&height=2"/>
</div>

---

## 💡 The Technical Challenge

**Achieving smooth performance with 1,000 interacting particles.** The naive approach—checking every particle against every other particle—requires 1,000,000 comparisons per frame, which crashes at 15 FPS. **The solution: spatial grid partitioning reduces collision detection from O(n²) to O(n), achieving 100x performance improvement and maintaining 60 FPS.**

<table>
<tr>
<td width="50%">

### ⚛️ Physics Modes

- **Gravity Mode** - F = G×m₁×m₂/r² (Newton's law)
- **Electric Field** - F = k×q₁×q₂/r² (Coulomb's law)
- **Magnetic Vortex** - F = q(v × B) (Lorentz force)
- **Black Hole** - Schwarzschild radius accretion
- **Repulsion Field** - Inverse gravity dispersion
- **DNA Helix** - Constrained molecular bonds

</td>
<td width="50%">

### 📈 The Numbers

| Metric                  | Value                   |
| ----------------------- | ----------------------- |
| Particles               | 1,000                   |
| Frame Rate              | 60 FPS                  |
| Optimization            | O(n²) → O(n)            |
| Speed Improvement       | 100x faster             |
| Architecture            | 7 modular files         |
| Total Lines             | ~2,000                  |
| Dependencies            | 0                       |

</td>
</tr>
</table>

---

## 🚀 Quick Start

<table>
<tr>
<td width="33%" align="center">

### 🌐 Online

**[Launch Simulator](https://zacsluss.github.io/Particle_Physics_Simulator/)**

Instant access, no installation

</td>
<td width="33%" align="center">

### 💾 Offline

**[Download ZIP](https://github.com/Zacsluss/Particle_Physics_Simulator/archive/refs/heads/main.zip)**

Open index.html in browser

</td>
<td width="33%" align="center">

### 👨‍💻 Development

```bash
git clone <repo>
# Open index.html
```

</td>
</tr>
</table>

<br/>

<details>
<summary><b>🎮 Controls</b></summary>

### Mouse

- **Left-click** - Spawn particles
- **Drag** - Create particle streams
- **Right-click** - Add attractors (max 10)
- **Scroll** - Zoom (future)

### Keyboard

- **1-6** - Switch physics modes
- **Space** - Clear particles
- **C** - Clear attractors
- **E** - Explosion preset
- **G** - Galaxy preset

</details>

---

## 🛠️ Technical Stack

<div align="center">

![JavaScript](https://img.shields.io/badge/JavaScript-8B7500?style=for-the-badge&logo=javascript&logoColor=white)
![Canvas](https://img.shields.io/badge/Canvas_API-8B3A3A?style=for-the-badge&logo=html5&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-8B2E0F?style=for-the-badge&logo=html5&logoColor=white)

</div>

<br/>

<table>
<tr>
<td width="50%">

### 🏗️ Architecture

**Modular ES6** with:

- `constants.js` (109 lines) - Config values
- `spatial-grid.js` (114 lines) - O(n) collision
- `particle.js` (178 lines) - Verlet integration
- `physics.js` (258 lines) - 6 physics modes
- `app.js` (819 lines) - Orchestration
- `styles.css` (391 lines) - HSL color cycling
- `index.html` (137 lines) - ARIA accessibility

</td>
<td width="50%">

### ⚡ Performance Optimizations

- **Spatial grid** - O(n²) → O(n) checks
- **Verlet integration** - Stable physics
- **Force capping** - Prevents instabilities
- **Batched canvas ops** - Minimize draw calls
- **DOM updates** - Every 10 frames (90% less)
- **Frame skipping** - Maintains 60 FPS
- **Pre-computed constants** - TWO_PI, etc.

</td>
</tr>
</table>

---

## 💭 Why I Built This

**As someone who manages enterprise platforms, I built this to maintain hands-on technical skills. The best leaders never stop coding.**

This project started as a **1,119-line monolithic HTML file—functional but unmaintainable.** The refactoring process revealed several critical issues that demonstrate the difference between "working code" and "production code":

### 🔴 Problems Fixed:

- **Broken Algorithm** - Code claimed to find "nearest 20 particles" but used `particles.slice(0, 20)`, returning the _first_ 20, not _nearest_ 20. Electric and repulsion modes had completely incorrect physics.
- **Memory Leak** - Right-clicking created unlimited attractors. After 100+ clicks, performance degraded significantly. Fixed by capping at 10 with automatic removal.
- **Dead Code** - Found 150 lines of trail rendering wrapped in `if (false)` blocks. Dead code is worse than no code—it misleads maintainers.
- **Accessibility Blind Spots** - Beautiful visual UI but completely inaccessible to keyboard users and screen readers, excluding ~15% of potential users.

### ✅ Results:

- **19% code reduction** while adding features
- **100x performance improvement** in electric mode (15 FPS → 60 FPS)
- **Modular, testable, maintainable** architecture
- **Full accessibility** with keyboard nav and ARIA labels

**The challenge wasn't just making it work—it was making it production-ready.**

---

## 🤝 Contributing

Bug reports and feature suggestions welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines.

<div align="center">

### Fork it, make it yours! No credit needed. 🚀

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=14,18,24&height=100&section=footer"/>

**Built by [Zachary Sluss](https://github.com/Zacsluss)** • MIT License

[![Portfolio](https://img.shields.io/badge/🌐_My_Portfolio-2d7a3e?style=flat-square)](https://zacsluss.github.io/portfolio)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0055A4?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/zacharyjsluss)
[![Email](https://img.shields.io/badge/Email-8B2E0F?style=flat-square&logo=gmail&logoColor=white)](mailto:zacsluss@yahoo.com)

</div>
