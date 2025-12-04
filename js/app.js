'use strict';

import { Particle } from './particle.js';
import { SpatialGrid } from './spatial-grid.js';
import {
    applyGravityForces,
    applyElectricForces,
    applyMagneticForces,
    applyBlackHoleForces,
    applyRepulsionForces,
    applyDNAHelixForces,
    applyAttractorForces,
    getDampingForMode
} from './physics.js';
import {
    MAX_PARTICLES,
    MODES,
    GRID_SIZE,
    TWO_PI,
    SPEED_LIMIT,
    CANVAS_FADE_ALPHA,
    FPS_UPDATE_INTERVAL,
    LOW_FPS_THRESHOLD,
    PARTICLE_CLEANUP_COUNT,
    AUTO_QUALITY_MIN_PARTICLES,
    FRAME_SKIP_PARTICLE_THRESHOLD,
    FRAME_SKIP_RATE,
    SPATIAL_GRID_REBUILD_INTERVAL,
    BLACK_HOLE_RADIUS,
    BLACK_HOLE_INNER_RADIUS,
    BLACK_HOLE_EVENT_HORIZON,
    ATTRACTOR_VISUAL_RADIUS_OUTER,
    ATTRACTOR_VISUAL_RADIUS_INNER,
    ATTRACTOR_MAX_COUNT,
    EXPLOSION_COUNT,
    EXPLOSION_MIN_SPEED,
    EXPLOSION_MAX_SPEED,
    EXPLOSION_SPAWN_RADIUS,
    GALAXY_COUNT,
    GALAXY_MAX_RADIUS,
    GALAXY_ORBITAL_CONSTANT,
    RAIN_INTERVAL,
    RAIN_VELOCITY,
    CLICK_SPAWN_COUNT,
    CLICK_SPAWN_SPREAD,
    TOUCH_SPAWN_COUNT,
    TOUCH_SPAWN_SPREAD,
    PINCH_IN_THRESHOLD,
    PINCH_OUT_THRESHOLD,
    PINCH_EXPLOSION_COUNT,
    PINCH_ATTRACTOR_STRENGTH,
    FORCE_NORMALIZATION
} from './constants.js';

/**
 * Main application class for the Particle Physics Simulator
 * Handles initialization, event binding, animation loop, and user interactions
 */
class ParticleSimulator {
    /**
     *
     */
    constructor() {
        // Get canvas and context with error handling
        this.canvas = document.getElementById('canvas');
        if (!this.canvas) {
            throw new Error('Canvas element not found');
        }

        // Check if canvas is supported
        if (!this.canvas.getContext) {
            throw new Error(
                'Canvas is not supported in this browser. Please use a modern browser.'
            );
        }

        this.ctx = this.canvas.getContext('2d');
        if (!this.ctx) {
            throw new Error('Could not get 2D context from canvas');
        }

        // Particle system state management
        this.particles = [];
        this.attractors = [];
        this.spatialGrid = null;

        // Simulation state configuration
        this.mode = MODES.GRAVITY;
        this.isPaused = false;

        // Mouse state
        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseDown = false;

        // Touch state
        this.touches = [];
        this.lastPinchDistance = 0;

        // Performance tracking
        this.lastTime = performance.now();
        this.fps = 60;
        this.frameCounter = 0;

        // Rain effect interval
        this.rainInterval = null;

        // Spawn rate limiting (prevent abuse)
        this.lastSpawnTime = 0;
        this.SPAWN_COOLDOWN = 50; // milliseconds

        // Store bound event handlers for cleanup
        this.boundHandlers = {
            resize: () => this.resizeCanvas(),
            mouseDown: (e) => this.handleMouseDown(e),
            mouseUp: () => this.handleMouseUp(),
            mouseMove: (e) => this.handleMouseMove(e),
            click: (e) => this.handleClick(e),
            contextMenu: (e) => e.preventDefault(),
            touchStart: (e) => this.handleTouchStart(e),
            touchMove: (e) => this.handleTouchMove(e),
            touchEnd: (e) => this.handleTouchEnd(e),
            keyDown: (e) => this.handleKeyDown(e)
        };

        // Initialize
        this.init();
    }

    /**
     * Initialize the simulator
     */
    init() {
        this.resizeCanvas();
        this.bindEvents();
        this.updateModeDisplay();
        this.updateActiveModeButton(); // Set initial active button state
        this.spawnExplosion(); // Start with some particles
        this.animate();
    }

    /**
     * Resize canvas to fill window
     */
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Rebuild spatial grid if needed
        if (this.spatialGrid) {
            this.spatialGrid = new SpatialGrid(this.canvas.width, this.canvas.height, GRID_SIZE);
        }
    }

    /**
     * Bind all event listeners
     */
    bindEvents() {
        // Window events
        window.addEventListener('resize', this.boundHandlers.resize);

        // Mouse events
        this.canvas.addEventListener('mousedown', this.boundHandlers.mouseDown);
        this.canvas.addEventListener('mouseup', this.boundHandlers.mouseUp);
        this.canvas.addEventListener('mousemove', this.boundHandlers.mouseMove);
        this.canvas.addEventListener('click', this.boundHandlers.click);
        this.canvas.addEventListener('contextmenu', this.boundHandlers.contextMenu);

        // Touch events
        this.canvas.addEventListener('touchstart', this.boundHandlers.touchStart);
        this.canvas.addEventListener('touchmove', this.boundHandlers.touchMove);
        this.canvas.addEventListener('touchend', this.boundHandlers.touchEnd);

        // Control events - use proper event listeners instead of inline handlers
        this.bindControlEvents();

        // Keyboard events (for accessibility)
        document.addEventListener('keydown', this.boundHandlers.keyDown);
    }

    /**
     * Bind control button and slider events
     */
    bindControlEvents() {
        // Mode buttons
        const modeButtons = {
            gravityBtn: MODES.GRAVITY,
            electricBtn: MODES.ELECTRIC,
            magneticBtn: MODES.MAGNETIC,
            blackholeBtn: MODES.BLACK_HOLE,
            repelBtn: MODES.REPEL,
            dnaBtn: MODES.DNA
        };

        for (const [id, mode] of Object.entries(modeButtons)) {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', () => this.setMode(mode));
            }
        }

        // Action buttons
        const actionButtons = {
            clearBtn: () => this.clearParticles(),
            explosionBtn: () => this.spawnExplosion(),
            galaxyBtn: () => this.spawnGalaxy(),
            rainBtn: () => this.spawnRain()
        };

        for (const [id, action] of Object.entries(actionButtons)) {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', action);
            }
        }

        // Sliders
        const forceSlider = document.getElementById('forceStrength');
        const sizeSlider = document.getElementById('particleSize');

        if (forceSlider) {
            forceSlider.addEventListener('input', (e) => {
                const valueDisplay = document.getElementById('forceValue');
                if (valueDisplay) {
                    valueDisplay.textContent = e.target.value;
                }
            });
        }

        if (sizeSlider) {
            sizeSlider.addEventListener('input', (e) => {
                const valueDisplay = document.getElementById('sizeValue');
                if (valueDisplay) {
                    valueDisplay.textContent = e.target.value;
                }
                // Update all existing particles
                const newSize = parseFloat(e.target.value);
                this.particles.forEach((p) => p.setSize(newSize));
            });
        }
    }

    /**
     * Handle keyboard input for accessibility
     * @param {KeyboardEvent} e - Keyboard event object
     */
    handleKeyDown(e) {
        switch (e.key) {
            case ' ': // Spacebar - pause/resume
                e.preventDefault();
                this.isPaused = !this.isPaused;
                break;
            case 'c': // C - clear
                this.clearParticles();
                break;
            case 'e': // E - explosion
                this.spawnExplosion();
                break;
            case 'g': // G - galaxy
                this.spawnGalaxy();
                break;
            case '1': // Number keys for modes
                this.setMode(MODES.GRAVITY);
                break;
            case '2':
                this.setMode(MODES.ELECTRIC);
                break;
            case '3':
                this.setMode(MODES.MAGNETIC);
                break;
            case '4':
                this.setMode(MODES.BLACK_HOLE);
                break;
            case '5':
                this.setMode(MODES.REPEL);
                break;
            case '6':
                this.setMode(MODES.DNA);
                break;
        }
    }

    /**
     * Handle mouse down event
     * @param {MouseEvent} e - Mouse event object
     */
    handleMouseDown(e) {
        this.mouseDown = true;

        if (e.button === 2) {
            // Right click - add attractor
            e.preventDefault();
            this.addAttractor(e.clientX, e.clientY);
        }
    }

    /**
     * Handle mouse up event
     */
    handleMouseUp() {
        this.mouseDown = false;
    }

    /**
     * Handle mouse move event
     * @param {MouseEvent} e - Mouse event object
     */
    handleMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;

        if (this.mouseDown && e.button !== 2) {
            this.spawnParticle(this.mouseX, this.mouseY);
        }
    }

    /**
     * Handle mouse click event
     * @param {MouseEvent} e - Mouse event object
     */
    handleClick(e) {
        if (e.button === 0) {
            // Left click - with rate limiting to prevent abuse
            const now = performance.now();
            if (now - this.lastSpawnTime < this.SPAWN_COOLDOWN) {
                return; // Ignore rapid clicks
            }
            this.lastSpawnTime = now;

            for (let i = 0; i < CLICK_SPAWN_COUNT; i++) {
                this.spawnParticle(
                    e.clientX + (Math.random() - 0.5) * CLICK_SPAWN_SPREAD,
                    e.clientY + (Math.random() - 0.5) * CLICK_SPAWN_SPREAD
                );
            }
        }
    }

    /**
     * Handle touch start event
     * @param {TouchEvent} e - Touch event object
     */
    handleTouchStart(e) {
        e.preventDefault();
        this.touches = Array.from(e.touches);

        if (this.touches.length === 1) {
            // Single touch - spawn particles with rate limiting
            const now = performance.now();
            if (now - this.lastSpawnTime < this.SPAWN_COOLDOWN) {
                return; // Ignore rapid touches
            }
            this.lastSpawnTime = now;

            const touch = this.touches[0];
            for (let i = 0; i < TOUCH_SPAWN_COUNT; i++) {
                this.spawnParticle(
                    touch.clientX + (Math.random() - 0.5) * TOUCH_SPAWN_SPREAD,
                    touch.clientY + (Math.random() - 0.5) * TOUCH_SPAWN_SPREAD
                );
            }
        } else if (this.touches.length === 2) {
            // Two finger touch - calculate initial distance for pinch detection
            const dx = this.touches[1].clientX - this.touches[0].clientX;
            const dy = this.touches[1].clientY - this.touches[0].clientY;
            this.lastPinchDistance = Math.sqrt(dx * dx + dy * dy);
        }
    }

    /**
     * Handle touch move event
     * @param {TouchEvent} e - Touch event object
     */
    handleTouchMove(e) {
        e.preventDefault();
        this.touches = Array.from(e.touches);

        if (this.touches.length === 1) {
            // Single touch drag - create particle stream
            const touch = this.touches[0];
            this.spawnParticle(touch.clientX, touch.clientY);
        } else if (this.touches.length === 2) {
            // Two finger gestures
            const dx = this.touches[1].clientX - this.touches[0].clientX;
            const dy = this.touches[1].clientY - this.touches[0].clientY;
            const currentDistance = Math.sqrt(dx * dx + dy * dy);
            const centerX = (this.touches[0].clientX + this.touches[1].clientX) / 2;
            const centerY = (this.touches[0].clientY + this.touches[1].clientY) / 2;

            if (this.lastPinchDistance > 0) {
                const pinchRatio = currentDistance / this.lastPinchDistance;

                if (pinchRatio < PINCH_IN_THRESHOLD) {
                    // Pinch in - create attractor
                    this.addAttractor(centerX, centerY, PINCH_ATTRACTOR_STRENGTH);
                } else if (pinchRatio > PINCH_OUT_THRESHOLD) {
                    // Pinch out - create explosion
                    this.spawnExplosionAt(centerX, centerY, PINCH_EXPLOSION_COUNT);
                }
            }

            this.lastPinchDistance = currentDistance;
        }
    }

    /**
     * Handle touch end event
     * @param {TouchEvent} e - Touch event object
     */
    handleTouchEnd(e) {
        e.preventDefault();
        this.touches = Array.from(e.touches);

        if (this.touches.length === 0) {
            this.lastPinchDistance = 0;
        }
    }

    /**
     * Set the physics mode
     * @param {string} mode - Physics mode identifier (e.g., MODES.GRAVITY)
     */
    setMode(mode) {
        this.mode = mode;
        this.updateModeDisplay();
        this.updateActiveModeButton();
    }

    /**
     * Update the mode display text
     */
    updateModeDisplay() {
        const modeDisplay = document.getElementById('mode');
        if (modeDisplay) {
            const modeName = this.mode.charAt(0).toUpperCase() + this.mode.slice(1);
            modeDisplay.textContent = modeName;
        }
    }

    /**
     * Update active state styling on mode buttons
     */
    updateActiveModeButton() {
        // Remove active class from all mode buttons
        const modeButtons = [
            'gravityBtn',
            'electricBtn',
            'magneticBtn',
            'blackholeBtn',
            'repelBtn',
            'dnaBtn'
        ];

        modeButtons.forEach((id) => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.classList.remove('active');
            }
        });

        // Add active class to current mode button
        const modeButtonMap = {
            [MODES.GRAVITY]: 'gravityBtn',
            [MODES.ELECTRIC]: 'electricBtn',
            [MODES.MAGNETIC]: 'magneticBtn',
            [MODES.BLACK_HOLE]: 'blackholeBtn',
            [MODES.REPEL]: 'repelBtn',
            [MODES.DNA]: 'dnaBtn'
        };

        const activeButtonId = modeButtonMap[this.mode];
        if (activeButtonId) {
            const activeBtn = document.getElementById(activeButtonId);
            if (activeBtn) {
                activeBtn.classList.add('active');
            }
        }
    }

    /**
     * Get current force strength from slider
     * @returns {number} Normalized force strength value
     */
    getForceStrength() {
        const slider = document.getElementById('forceStrength');
        if (!slider) {
            console.warn(
                '[ParticleSimulator] Force strength slider not found, using default value (1)'
            );
            return 1;
        }
        const value = parseFloat(slider.value);
        if (!Number.isFinite(value)) {
            console.warn(
                `[ParticleSimulator] Invalid slider value: ${slider.value}, using default (1)`
            );
            return 1;
        }
        return value / FORCE_NORMALIZATION;
    }

    /**
     * Get current particle size from slider
     * @returns {number} Particle size in pixels
     */
    getParticleSize() {
        const slider = document.getElementById('particleSize');
        if (!slider) {
            console.warn(
                '[ParticleSimulator] Particle size slider not found, using default value (3)'
            );
            return 3;
        }
        const value = parseFloat(slider.value);
        if (!Number.isFinite(value)) {
            console.warn(
                `[ParticleSimulator] Invalid slider value: ${slider.value}, using default (3)`
            );
            return 3;
        }
        return value;
    }

    /**
     * Spawn a single particle at a position
     * @param {number} x - X coordinate for particle spawn
     * @param {number} y - Y coordinate for particle spawn
     */
    spawnParticle(x, y) {
        if (this.particles.length >= MAX_PARTICLES) {
            return;
        }

        const angle = Math.random() * TWO_PI;
        const speed = Math.random() * 5;

        const particle = new Particle(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed);

        particle.setSize(this.getParticleSize());
        this.particles.push(particle);
    }

    /**
     * Spawn an explosion at the center (or specified position)
     * @param {number} x - X coordinate for explosion center
     * @param {number} y - Y coordinate for explosion center
     * @param {number} count - Number of particles to spawn in explosion
     */
    spawnExplosionAt(x, y, count = EXPLOSION_COUNT) {
        const spawnCount = Math.min(count, MAX_PARTICLES - this.particles.length);

        for (let i = 0; i < spawnCount; i++) {
            const angle = (TWO_PI * i) / spawnCount;
            const speed =
                EXPLOSION_MIN_SPEED + Math.random() * (EXPLOSION_MAX_SPEED - EXPLOSION_MIN_SPEED);

            // In black hole mode, spawn particles outside the event horizon
            const spawnRadius = this.mode === MODES.BLACK_HOLE ? EXPLOSION_SPAWN_RADIUS : 0;
            const spawnX = x + Math.cos(angle) * spawnRadius;
            const spawnY = y + Math.sin(angle) * spawnRadius;

            const particle = new Particle(
                spawnX,
                spawnY,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed
            );

            particle.setSize(this.getParticleSize());
            this.particles.push(particle);
        }
    }

    /**
     * Spawn explosion at canvas center
     */
    spawnExplosion() {
        this.spawnExplosionAt(this.canvas.width / 2, this.canvas.height / 2);
    }

    /**
     * Spawn a galaxy formation
     */
    spawnGalaxy() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const count = Math.min(GALAXY_COUNT, MAX_PARTICLES - this.particles.length);

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * TWO_PI;
            const radius = Math.random() * GALAXY_MAX_RADIUS;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            // Calculate orbital velocity for stable orbit
            const orbitalSpeed = Math.sqrt(GALAXY_ORBITAL_CONSTANT / radius) * 5;
            const vx = -Math.sin(angle) * orbitalSpeed;
            const vy = Math.cos(angle) * orbitalSpeed;

            const particle = new Particle(x, y, vx, vy);
            particle.setSize(this.getParticleSize());
            this.particles.push(particle);
        }
    }

    /**
     * Start spawning rain particles
     */
    spawnRain() {
        // Stop existing rain if any
        if (this.rainInterval) {
            clearInterval(this.rainInterval);
        }

        this.rainInterval = setInterval(() => {
            if (this.particles.length >= MAX_PARTICLES) {
                clearInterval(this.rainInterval);
                this.rainInterval = null;
                return;
            }

            const x = Math.random() * this.canvas.width;
            const particle = new Particle(x, 0, 0, RAIN_VELOCITY);
            particle.setSize(this.getParticleSize());
            this.particles.push(particle);
        }, RAIN_INTERVAL);
    }

    /**
     * Add an attractor at a position
     * @param {number} x - X coordinate for attractor
     * @param {number} y - Y coordinate for attractor
     * @param {number|null} strength - Optional force strength for attractor
     */
    addAttractor(x, y, strength = null) {
        // Limit number of attractors to prevent memory leak
        if (this.attractors.length >= ATTRACTOR_MAX_COUNT) {
            this.attractors.shift(); // Remove oldest attractor
        }

        this.attractors.push({
            x: x,
            y: y,
            strength: strength !== null ? strength : this.getForceStrength()
        });
    }

    /**
     * Clear all particles and attractors
     */
    clearParticles() {
        this.particles = [];
        this.attractors = [];

        if (this.rainInterval) {
            clearInterval(this.rainInterval);
            this.rainInterval = null;
        }
    }

    /**
     * Update spatial grid for efficient neighbor lookups
     */
    updateSpatialGrid() {
        // Only use spatial grid for modes that need it
        if (this.mode === MODES.ELECTRIC || this.mode === MODES.REPEL) {
            // Create or rebuild grid if needed
            if (
                !this.spatialGrid ||
                this.spatialGrid.needsRebuild(this.canvas.width, this.canvas.height)
            ) {
                this.spatialGrid = new SpatialGrid(
                    this.canvas.width,
                    this.canvas.height,
                    GRID_SIZE
                );
            }

            // Update less frequently for performance (optimized from every 2 frames to every 3)
            if (this.frameCounter % SPATIAL_GRID_REBUILD_INTERVAL === 0) {
                this.spatialGrid.clear();
                this.particles.forEach((p) => this.spatialGrid.add(p));
            }
        }
    }

    /**
     * Update all particles
     * @param {number} deltaTime - Time elapsed since last frame (normalized)
     */
    updateParticles(deltaTime) {
        const forceStrength = this.getForceStrength();
        const damping = getDampingForMode(this.mode);
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const currentTime = performance.now();

        // Dynamic frame skipping based on particle count
        const skipRate =
            this.particles.length > FRAME_SKIP_PARTICLE_THRESHOLD ? FRAME_SKIP_RATE : 1;
        const shouldUpdatePhysics = this.frameCounter % skipRate === 0;

        if (!shouldUpdatePhysics) {
            return;
        } // Skip physics this frame

        const adjustedDelta = deltaTime * skipRate;

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];

            // Reset acceleration
            particle.resetAcceleration();

            // Apply mode-specific forces
            switch (this.mode) {
                case MODES.GRAVITY:
                    applyGravityForces(
                        particle,
                        forceStrength,
                        this.mouseDown,
                        this.mouseX,
                        this.mouseY
                    );
                    break;
                case MODES.ELECTRIC:
                    applyElectricForces(particle, forceStrength, this.spatialGrid);
                    break;
                case MODES.MAGNETIC:
                    applyMagneticForces(particle, forceStrength, centerX, centerY);
                    break;
                case MODES.BLACK_HOLE:
                    applyBlackHoleForces(particle, forceStrength, centerX, centerY);
                    break;
                case MODES.REPEL:
                    applyRepulsionForces(particle, forceStrength, this.spatialGrid);
                    break;
                case MODES.DNA:
                    applyDNAHelixForces(
                        particle,
                        forceStrength,
                        centerX,
                        centerY,
                        currentTime,
                        this.canvas.width,
                        this.canvas.height
                    );
                    break;
            }

            // Apply attractor forces
            applyAttractorForces(particle, this.attractors);

            // Update particle
            particle.update(
                adjustedDelta,
                damping,
                SPEED_LIMIT,
                this.canvas.width,
                this.canvas.height,
                this.frameCounter
            );

            // Remove dead particles using swap-and-pop for O(1) removal
            if (particle.isDead()) {
                // Swap with last particle and pop (O(1) instead of O(n))
                this.particles[i] = this.particles[this.particles.length - 1];
                this.particles.pop();
                i--; // Re-check this index since we swapped
            }
        }
    }

    /**
     * Draw all particles and effects
     */
    draw() {
        // Clear canvas with fade effect for trails
        this.ctx.fillStyle = `rgba(0, 0, 0, ${CANVAS_FADE_ALPHA})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw attractors
        this.drawAttractors();

        // Draw black hole if in that mode
        if (this.mode === MODES.BLACK_HOLE) {
            this.drawBlackHole();
        }

        // Draw particles
        this.ctx.save();
        this.particles.forEach((particle) => particle.draw(this.ctx));
        this.ctx.restore();
    }

    /**
     * Draw all attractors
     */
    drawAttractors() {
        this.attractors.forEach((attractor) => {
            this.ctx.strokeStyle = '#0ff';
            this.ctx.lineWidth = 2;

            // Outer ring
            this.ctx.beginPath();
            this.ctx.arc(attractor.x, attractor.y, ATTRACTOR_VISUAL_RADIUS_OUTER, 0, TWO_PI);
            this.ctx.stroke();

            // Inner ring
            this.ctx.beginPath();
            this.ctx.arc(attractor.x, attractor.y, ATTRACTOR_VISUAL_RADIUS_INNER, 0, TWO_PI);
            this.ctx.stroke();
        });
    }

    /**
     * Draw black hole visualization
     */
    drawBlackHole() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        // Outer shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, BLACK_HOLE_RADIUS, 0, TWO_PI);
        this.ctx.fill();

        // Inner glow
        this.ctx.fillStyle = 'rgba(50, 0, 100, 0.4)';
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, BLACK_HOLE_INNER_RADIUS, 0, TWO_PI);
        this.ctx.fill();

        // Event horizon ring
        this.ctx.strokeStyle = '#f0f';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, BLACK_HOLE_EVENT_HORIZON, 0, TWO_PI);
        this.ctx.stroke();
    }

    /**
     * Update performance stats display
     */
    updateStats() {
        if (this.frameCounter % FPS_UPDATE_INTERVAL === 0) {
            const particleCountEl = document.getElementById('particleCount');
            const fpsEl = document.getElementById('fps');

            if (particleCountEl) {
                particleCountEl.textContent = this.particles.length;
            }
            if (fpsEl) {
                fpsEl.textContent = this.fps;
            }
        }
    }

    /**
     * Auto quality adjustment - remove particles if FPS drops too low
     */
    autoQualityAdjustment() {
        if (this.fps < LOW_FPS_THRESHOLD && this.particles.length > AUTO_QUALITY_MIN_PARTICLES) {
            // Optimize: reduce array length instead of splice (O(1) vs O(n))
            const removeCount = Math.min(PARTICLE_CLEANUP_COUNT, this.particles.length);
            this.particles.length -= removeCount;
        }
    }

    /**
     * Main animation loop with error boundary
     */
    animate() {
        try {
            // Calculate FPS and delta time
            const currentTime = performance.now();
            const deltaTime = Math.min((currentTime - this.lastTime) / 16.67, 2); // Cap at 2x for stability
            this.fps = Math.round(1000 / (currentTime - this.lastTime));
            this.lastTime = currentTime;
            this.frameCounter++;

            if (!this.isPaused) {
                // Update spatial grid
                this.updateSpatialGrid();

                // Update particles
                this.updateParticles(deltaTime);

                // Auto quality adjustment
                this.autoQualityAdjustment();
            }

            // Draw everything
            this.draw();

            // Update stats
            this.updateStats();
        } catch (error) {
            // Log error and pause simulation to prevent cascade failures
            console.error('Animation loop error:', error);
            this.isPaused = true;

            // Show user-friendly error message
            const announcement = document.getElementById('announcements');
            if (announcement) {
                announcement.textContent =
                    'Simulation paused due to an error. Check console for details.';
            }

            // Try to recover by clearing problematic particles
            this.particles = this.particles.filter((p) => {
                try {
                    return Number.isFinite(p.x) && Number.isFinite(p.y);
                } catch {
                    return false;
                }
            });
        }

        // Continue animation loop
        requestAnimationFrame(() => this.animate());
    }

    /**
     * Clean up resources and stop animation
     */
    destroy() {
        // Clear rain interval if active
        if (this.rainInterval) {
            clearInterval(this.rainInterval);
            this.rainInterval = null;
        }

        // Remove all event listeners to prevent memory leaks
        window.removeEventListener('resize', this.boundHandlers.resize);
        this.canvas.removeEventListener('mousedown', this.boundHandlers.mouseDown);
        this.canvas.removeEventListener('mouseup', this.boundHandlers.mouseUp);
        this.canvas.removeEventListener('mousemove', this.boundHandlers.mouseMove);
        this.canvas.removeEventListener('click', this.boundHandlers.click);
        this.canvas.removeEventListener('contextmenu', this.boundHandlers.contextMenu);
        this.canvas.removeEventListener('touchstart', this.boundHandlers.touchStart);
        this.canvas.removeEventListener('touchmove', this.boundHandlers.touchMove);
        this.canvas.removeEventListener('touchend', this.boundHandlers.touchEnd);
        document.removeEventListener('keydown', this.boundHandlers.keyDown);

        // Pause simulation
        this.isPaused = true;

        // Clear particles
        this.particles = [];
        this.attractors = [];
    }
}

// Start the simulator when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        new ParticleSimulator();
    } catch (error) {
        console.error('Failed to initialize simulator:', error);
        alert('Failed to start the simulator. Please check your browser compatibility.');
    }
});
