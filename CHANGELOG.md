# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2024-11-20

### Major Quality and Testing Update

Comprehensive quality improvements bringing the project to production-ready status with extensive testing coverage.

### Added

- **Comprehensive Testing Suite**: 63 unit tests with Vitest
    - 18 tests for spatial-grid.js (boundary handling, performance)
    - 25 tests for particle.js (validation, physics, collisions)
    - 20 tests for physics.js (all 6 modes, damping)
    - Coverage reporting with V8 provider
- **Enhanced Documentation**:
    - Architecture diagram with system flow
    - Performance tuning guide (low-end/high-end devices)
    - Physics formulas reference with Wikipedia links
    - Grid size optimization recommendations
- **UI/UX Improvements**:
    - Active mode button indicator (glowing cyan)
    - Reorganized control panel with "Particle Spawn Effects" section
    - Fixed panel positioning issues
    - Enhanced glassmorphism with visible borders
- **Security Enhancements**:
    - Content Security Policy (CSP) headers
    - Whitelisted Google Fonts in CSP
- **Code Quality**:
    - Input validation in Particle constructor (prevents NaN/Infinity)
    - Error boundary in animation loop with recovery
    - Memory leak fix (rainInterval cleanup method)
    - All remaining magic numbers extracted to constants

### Fixed

- **Critical**: Duplicate `position: relative` overriding `position: fixed` on UI panels
- **Bug**: Active mode button state now persists through Clear All
- **Inconsistency**: Portfolio URL capitalization standardized

### Changed

- Moved Clear All button to Particle Spawn Effects section
- Updated .gitignore to include coverage/ directory
- Improved button active state styling (brighter, more visible)

---

## [2.0.0] - 2024-10-15

### Major Refactoring Release

Complete architectural overhaul from monolithic HTML to modular, professional codebase.

### Added

- **Modular Architecture**: Separated into 7 distinct modules
    - `index.html` - Semantic HTML with ARIA accessibility
    - `css/styles.css` - Complete styling separation
    - `js/constants.js` - Configuration constants (50+ extracted)
    - `js/spatial-grid.js` - Optimized spatial hashing system
    - `js/particle.js` - Encapsulated Particle class
    - `js/physics.js` - Physics engine with all 6 modes
    - `js/app.js` - Main application logic
- **Accessibility Features**:
    - Full keyboard navigation (Space, C, E, G, 1-6)
    - ARIA labels on all interactive elements
    - `prefers-reduced-motion` media query support
    - Visible focus indicators for keyboard users
    - Screen reader friendly structure
- **Professional Documentation**:
    - Comprehensive JSDoc comments throughout
    - MIT LICENSE file
    - package.json with proper metadata
    - CHANGELOG.md (this file)
    - CONTRIBUTING.md guidelines
- **Error Handling**: Comprehensive null checks for canvas/DOM operations
- **Memory Management**: Attractor limit (max 10) to prevent memory leaks

### Fixed

- **Critical Bug**: Removed ~150 lines of dead trail rendering code
- **Memory Leak**: Attractors now properly limited and managed
- **Algorithm Bug**: Particle neighbor selection now uses spatial grid correctly (nearest 20, not first 20)
- **Event Handling**: Eliminated double-spawning issue
- **Code Smell**: Removed all inline event handlers (onclick attributes)
- **Broken Links**: Updated all README links to point to correct files

### Changed

- **Code Organization**: From 1 monolithic file (1,119 lines) to 7 modular files (~900 lines)
- **ES6 Modules**: Proper import/export statements throughout
- **Strict Mode**: Enabled in all JavaScript modules
- **Class-Based**: Encapsulated all logic in ParticleSimulator class (no global pollution)
- **Named Constants**: All magic numbers extracted to constants.js
- **UI Layout**: Condensed instructions panel for better mobile experience

### Performance

- Efficient DOM updates (stats refresh every 10 frames)
- Dynamic frame skipping based on particle count
- Batched canvas operations
- Proper spatial grid implementation for O(n) lookups
- Maintains 60 FPS with 1000 particles

### Removed

- Dead trail rendering code (~150 lines)
- Global variable pollution
- Inline event handlers
- Magic numbers scattered throughout code
- Old monolithic `Particle_Physics_Simulator.html`

---

## [1.2.0] - 2024-09-18

### Added

- Touch gesture support (pinch to zoom/explode)
- Mobile responsive design improvements

### Changed

- Updated default particle size to 3
- Improved button styling and hover effects

---

## [1.1.0] - 2024-08-10

### Added

- DNA Helix physics mode
- Multi-touch gesture support
- Particle rain effect

### Fixed

- Black hole event horizon physics
- Electric field particle interactions
- Performance optimizations for high particle counts

---

## [1.0.0] - 2024-07-05

### Initial Release

### Added

- 6 Physics Modes:
    - Gravity Mode (Newtonian physics)
    - Electric Field (Coulomb's Law)
    - Magnetic Vortex (Lorentz Force)
    - Black Hole (Gravitational singularity)
    - Repulsion Field (Inverse gravity)
    - DNA Helix (Double helix formation)
- Real-time particle system (up to 1000 particles)
- Interactive controls (mouse and touch)
- Force strength and particle size sliders
- Preset effects (explosion, galaxy, rain)
- FPS counter and statistics display
- Glassmorphism UI design
- Animated gradient backgrounds

### Performance

- Spatial grid optimization for particle interactions
- 60 FPS target with automatic quality adjustment
- Frame skipping under heavy load

---

## Version History Summary

| Version | Date       | Description                              |
| ------- | ---------- | ---------------------------------------- |
| 2.1.0   | 2024-11-20 | Testing & CI/CD implementation           |
| 2.0.0   | 2024-10-15 | Major refactoring - Modular architecture |
| 1.2.0   | 2024-09-18 | Touch gestures & mobile improvements     |
| 1.1.0   | 2024-08-10 | DNA Helix mode added                     |
| 1.0.0   | 2024-07-05 | Initial public release                   |

---

[2.0.0]: https://github.com/Zacsluss/particle_physics_simulator/compare/v1.2.0...v2.0.0
[1.2.0]: https://github.com/Zacsluss/particle_physics_simulator/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/Zacsluss/particle_physics_simulator/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/Zacsluss/particle_physics_simulator/releases/tag/v1.0.0
