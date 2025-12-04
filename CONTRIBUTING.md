# Contributing to Particle Physics Simulator

Thank you for considering contributing to the Particle Physics Simulator! It's people like you that make this project such a great learning tool.

## 🌟 Ways to Contribute

### 1. Report Bugs

Found a bug? Please create an issue with:

- **Clear title** describing the problem
- **Steps to reproduce** the behavior
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Browser/OS** information

### 2. Suggest Enhancements

Have an idea? Create an issue with:

- **Clear description** of the feature
- **Use case**: Why would this be useful?
- **Proposed solution** (if you have one)

### 3. Submit Pull Requests

Want to contribute code? Awesome! Please follow the guidelines below.

---

## 🚀 Development Setup

### Prerequisites

- A modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- A local web server (Python, Node.js, or any HTTP server)
- Git for version control

### Getting Started

1. **Fork the repository**

    ```bash
    # Click "Fork" on GitHub, then clone your fork
    git clone https://github.com/YOUR_USERNAME/particle_physics_simulator.git
    cd particle_physics_simulator
    ```

2. **Create a branch**

    ```bash
    git checkout -b feature/your-feature-name
    # or
    git checkout -b fix/your-bug-fix
    ```

3. **Start local server**

    ```bash
    # Python 3
    python -m http.server 8000

    # Python 2
    python -m SimpleHTTPServer 8000

    # Node.js (if you have http-server installed)
    npx http-server -p 8000
    ```

4. **Open in browser**
    ```
    http://localhost:8000
    ```

---

## 📝 Code Style Guidelines

### JavaScript

- **Use ES6+ features** (const/let, arrow functions, classes)
- **Strict mode**: Always include `'use strict';` at the top of files
- **Naming conventions**:
    - `camelCase` for variables and functions
    - `PascalCase` for classes
    - `UPPER_SNAKE_CASE` for constants
- **Comments**: Use JSDoc format for functions
    ```javascript
    /**
     * Brief description
     * @param {type} paramName - Description
     * @returns {type} Description
     */
    ```

### HTML

- **Semantic elements**: Use `<section>`, `<aside>`, `<nav>`, etc.
- **Accessibility**: Include ARIA labels where appropriate
- **Indentation**: 4 spaces

### CSS

- **Selectors**: Prefer classes over IDs for styling
- **Organization**: Group related styles together
- **Comments**: Use `/* ===== SECTION NAME ===== */` for major sections

---

## 🎯 Contribution Guidelines

### Before You Start

1. **Check existing issues** to avoid duplicates
2. **Discuss major changes** in an issue first
3. **Keep changes focused** - one feature/fix per PR

### Code Requirements

- ✅ **No console errors** in browser
- ✅ **Maintains 60 FPS** with 1000 particles
- ✅ **Accessible** - keyboard navigation works
- ✅ **Documented** - add JSDoc comments
- ✅ **No new dependencies** unless discussed

### Testing Checklist

Before submitting, test:

- [ ] All 6 physics modes work correctly
- [ ] Keyboard shortcuts (Space, C, E, G, 1-6) function
- [ ] Touch gestures work on mobile/tablet
- [ ] No console errors or warnings
- [ ] Performance maintains 60 FPS
- [ ] Responsive design works on different screen sizes
- [ ] Accessibility features intact (ARIA labels, focus indicators)

---

## 📤 Submitting a Pull Request

1. **Commit your changes**

    ```bash
    git add .
    git commit -m "feat: Add awesome feature

    - Detailed description of what changed
    - Why it changed
    - Any breaking changes

    Co-Authored-By: Your Name <your.email@example.com>"
    ```

2. **Push to your fork**

    ```bash
    git push origin feature/your-feature-name
    ```

3. **Create Pull Request**
    - Go to the original repository
    - Click "New Pull Request"
    - Select your branch
    - Fill out the PR template

### Pull Request Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] All physics modes tested
- [ ] Keyboard navigation verified
- [ ] Mobile/touch tested
- [ ] No console errors
- [ ] 60 FPS maintained

## Screenshots (if applicable)

Add screenshots or GIFs demonstrating the change
```

---

## 🏗️ Project Structure

Understanding the codebase:

```
particle_physics_simulator/
├── index.html              # HTML structure, ARIA labels
├── css/
│   └── styles.css         # All styling (responsive, animations)
├── js/
│   ├── constants.js       # Configuration constants (magic numbers)
│   ├── spatial-grid.js    # O(n) optimization system
│   ├── particle.js        # Particle class (physics state)
│   ├── physics.js         # Physics engines for all modes
│   └── app.js            # Main application (event handling, loop)
├── LICENSE                # MIT License
├── package.json           # Project metadata
├── CHANGELOG.md           # Version history
└── README.md              # Project documentation
```

### Key Files to Understand

**js/constants.js**

- All configuration values
- Change here to adjust physics parameters

**js/physics.js**

- Each physics mode is a separate function
- Add new modes here

**js/app.js**

- Main application orchestration
- Event handlers
- Animation loop

---

## 🐛 Debugging Tips

### Common Issues

**Canvas not rendering?**

- Check browser console for errors
- Verify canvas element exists: `document.getElementById('canvas')`
- Check if context is null: `canvas.getContext('2d')`

**Performance issues?**

- Open browser DevTools > Performance tab
- Record while running simulator
- Look for long frames or excessive repaints

**Module import errors?**

- Must use a local server (not file://)
- Check relative paths in import statements
- Verify `type="module"` in script tag

---

## 💡 Ideas for Contributions

Not sure where to start? Try these:

### Easy

- [ ] Add more keyboard shortcuts
- [ ] Improve mobile UI layout
- [ ] Add color themes (dark/light mode)
- [ ] Fix typos in documentation

### Medium

- [ ] Add particle export/import (JSON)
- [ ] Implement localStorage for settings
- [ ] Add new preset patterns (spiral, wave, etc.)
- [ ] Create unit tests for physics functions

### Advanced

- [ ] Add new physics mode (fluid dynamics?)
- [ ] Implement Web Workers for physics calculation
- [ ] Add WebGL renderer option
- [ ] Create recording/playback system

---

## 📜 Code of Conduct

### Our Standards

- **Be respectful** and inclusive
- **Be constructive** in feedback
- **Be patient** with newcomers
- **Be collaborative** over competitive

### Unacceptable Behavior

- Harassment or discriminatory language
- Trolling or insulting comments
- Publishing others' private information
- Other unprofessional conduct

---

## 🙏 Recognition

Contributors will be:

- Listed in CHANGELOG.md for their contributions
- Mentioned in release notes
- Added to a CONTRIBUTORS.md file (coming soon)

---

## 📬 Questions?

- **General questions**: Open a GitHub Discussion
- **Bug reports**: Create an Issue
- **Security issues**: Email directly (see README)

---

## 📚 Resources

### Learning Materials

- [MDN Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Physics Simulations](https://natureofcode.com/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Tools

- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) (accessibility auditing)
- [Git Documentation](https://git-scm.com/doc)

---

Thank you for contributing to Particle Physics Simulator! 🎉

Your efforts help make physics education more accessible and interactive for everyone.
