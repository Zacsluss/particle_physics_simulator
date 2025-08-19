# ⚛️ Particle Physics Simulator

An interactive particle physics sandbox built with HTML5 Canvas and JavaScript. Experience real-time particle simulations with multiple physics modes, customizable parameters, and stunning visual effects.

## 🌟 Features

### Physics Modes
- **🌍 Gravity Mode**: Particles fall with gravitational force and attract to mouse cursor
- **⚡ Electric Field**: Charged particles attract and repel based on Coulomb's law
- **🧲 Magnetic Field**: Swirling magnetic forces create orbital patterns
- **🌌 Black Hole**: Massive gravitational well that consumes nearby particles
- **💫 Repulsion**: Particles push away from each other creating dispersal effects

### Interactive Controls
- **Force Strength Slider**: Adjust physics intensity (0-20)
- **Particle Size**: Control visual size of particles (1-10px)
- **Trail Length**: Customize particle trail effects (0-50)
- **Preset Patterns**: Explosion, Galaxy, Particle Rain effects
- **Mouse Interaction**: Click to spawn particles, drag for streams, right-click for attractors

### Visual Features
- Real-time particle trails with fade effects
- Dynamic color-shifting particles (HSL cycling)
- Glow effects with radial gradients
- Live FPS counter and particle count
- Sci-fi themed dark UI design

## 🚀 Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Zacsluss/Particle-Physics-Simulator.git
   ```

2. **Open in browser**:
   - Simply open `Particle-Generator.html` in any modern web browser
   - No build process or dependencies required!

3. **Start experimenting**:
   - Try different physics modes
   - Adjust sliders to see effects
   - Click and drag to create particle streams
   - Right-click to place attractors

## 🎮 Controls

| Action | Control |
|--------|---------|
| Spawn particles | Left click |
| Create particle stream | Click and drag |
| Place attractor | Right click |
| Clear all particles | "Clear All" button |
| Create explosion | "Explosion" button |
| Generate galaxy | "Galaxy" button |
| Rain effect | "Particle Rain" button |

## 🔧 Technical Details

### Performance Features
- **Particle Limit**: Maximum 1000 particles for optimal performance
- **Delta Time**: Frame-rate independent physics calculations
- **Memory Management**: Automatic cleanup of particle trails and intervals
- **Efficient Rendering**: Canvas optimization with alpha blending

### Physics Implementation
- **Verlet Integration**: Smooth particle motion with proper acceleration
- **Inverse Square Law**: Realistic force calculations for gravity and electricity
- **Boundary Collision**: Particles bounce off screen edges with energy damping
- **Spatial Optimization**: Distance-based force calculations with cutoffs

### Browser Compatibility
- Modern browsers with HTML5 Canvas support
- Responsive design adapts to window resizing
- Touch-friendly for mobile devices

## 🛠️ Code Architecture

```
Particle-Generator.html
├── HTML Structure (Canvas + UI Controls)
├── CSS Styling (Sci-fi theme)
└── JavaScript
    ├── Particle Class (Physics + Rendering)
    ├── Physics Modes (5 different simulations)
    ├── Event Handlers (Mouse + UI interactions)
    ├── Spawn Functions (Preset patterns)
    └── Animation Loop (60fps rendering)
```

## 🎨 Customization

The simulator is highly customizable:
- Modify physics constants in the code
- Adjust visual parameters (colors, sizes, effects)
- Add new physics modes
- Create custom spawn patterns
- Extend UI controls

## 📊 Performance Stats

- **60 FPS** smooth animation
- **1000+ particles** simultaneous simulation
- **5 physics modes** with real-time switching
- **Sub-millisecond** force calculations
- **Memory efficient** with automatic cleanup

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs or issues
- Suggest new physics modes
- Improve performance optimizations
- Add new visual effects
- Enhance UI/UX

## 📄 License

Open source - feel free to use, modify, and distribute!

## 🔬 Physics Background

This simulator demonstrates real physics concepts:
- **Newtonian Mechanics**: F = ma, gravitational attraction
- **Electromagnetism**: Coulomb's law, magnetic field interactions
- **Celestial Mechanics**: Orbital dynamics, black hole physics
- **Particle Systems**: Emergent behavior from simple rules

Perfect for educational use, physics demonstrations, or just having fun with particle effects!