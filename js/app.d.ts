/**
 * TypeScript definitions for app.js
 * Main application class for the Particle Physics Simulator
 */

import { Particle } from './particle';
import { SpatialGrid } from './spatial-grid';
import { PhysicsMode } from './constants';

/**
 * Main application class for the Particle Physics Simulator
 * Handles initialization, event binding, animation loop, and user interactions
 */
export class ParticleSimulator {
    // Canvas and rendering
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    // Particle system state
    particles: Particle[];
    attractors: Array<{ x: number; y: number; strength: number }>;
    spatialGrid: SpatialGrid | null;

    // Simulation state
    mode: PhysicsMode;
    isPaused: boolean;

    // Mouse state
    mouseX: number;
    mouseY: number;
    mouseDown: boolean;

    // Touch state
    touches: Touch[];
    lastPinchDistance: number;

    // Performance tracking
    frameCounter: number;
    lastFrameTime: number;
    fps: number;
    lastFpsUpdate: number;

    // Rain effect
    rainInterval: number | null;

    // Spawn rate limiting
    lastSpawnTime: number;
    readonly SPAWN_COOLDOWN: number;

    /**
     * Initialize the particle simulator
     * Sets up canvas, event listeners, and starts animation loop
     * @throws {Error} If canvas element not found or unsupported
     */
    constructor();

    /**
     * Initialize the canvas and set up rendering context
     */
    initCanvas(): void;

    /**
     * Bind all event listeners for user interaction
     */
    bindEvents(): void;

    /**
     * Start the main animation loop
     */
    start(): void;

    /**
     * Main animation loop - called every frame
     * @param currentTime - Current timestamp from requestAnimationFrame
     */
    animate(currentTime: number): void;

    /**
     * Handle keyboard input for accessibility
     * @param e - Keyboard event object
     */
    handleKeyDown(e: KeyboardEvent): void;

    /**
     * Handle mouse down event
     * @param e - Mouse event object
     */
    handleMouseDown(e: MouseEvent): void;

    /**
     * Handle mouse up event
     */
    handleMouseUp(): void;

    /**
     * Handle mouse move event
     * @param e - Mouse event object
     */
    handleMouseMove(e: MouseEvent): void;

    /**
     * Handle mouse click event
     * @param e - Mouse event object
     */
    handleClick(e: MouseEvent): void;

    /**
     * Handle touch start event
     * @param e - Touch event object
     */
    handleTouchStart(e: TouchEvent): void;

    /**
     * Handle touch move event
     * @param e - Touch event object
     */
    handleTouchMove(e: TouchEvent): void;

    /**
     * Handle touch end event
     * @param e - Touch event object
     */
    handleTouchEnd(e: TouchEvent): void;

    /**
     * Set the physics mode
     * @param mode - Physics mode identifier
     */
    setMode(mode: PhysicsMode): void;

    /**
     * Update the mode display text
     */
    updateModeDisplay(): void;

    /**
     * Update active mode button styling
     */
    updateActiveModeButton(): void;

    /**
     * Get current force strength from slider
     * @returns Normalized force strength value
     */
    getForceStrength(): number;

    /**
     * Get current particle size from slider
     * @returns Particle size in pixels
     */
    getParticleSize(): number;

    /**
     * Spawn a single particle at a position
     * @param x - X coordinate for particle spawn
     * @param y - Y coordinate for particle spawn
     */
    spawnParticle(x: number, y: number): void;

    /**
     * Spawn an explosion at the center (or specified position)
     * @param x - X coordinate for explosion center
     * @param y - Y coordinate for explosion center
     * @param count - Number of particles to spawn in explosion
     */
    spawnExplosionAt(x: number, y: number, count?: number): void;

    /**
     * Spawn explosion at canvas center
     */
    spawnExplosion(): void;

    /**
     * Spawn a galaxy formation at canvas center
     */
    spawnGalaxy(): void;

    /**
     * Start spawning rain particles
     */
    startRain(): void;

    /**
     * Add an attractor at a position
     * @param x - X coordinate for attractor
     * @param y - Y coordinate for attractor
     * @param strength - Optional force strength for attractor
     */
    addAttractor(x: number, y: number, strength?: number | null): void;

    /**
     * Clear all particles and attractors
     */
    clearParticles(): void;

    /**
     * Update spatial grid for efficient neighbor lookups
     */
    updateSpatialGrid(): void;

    /**
     * Update all particles
     * @param deltaTime - Time elapsed since last frame (normalized)
     */
    updateParticles(deltaTime: number): void;

    /**
     * Render all particles and effects to canvas
     */
    render(): void;

    /**
     * Update FPS counter and particle count display
     */
    updateStats(): void;

    /**
     * Automatically reduce particle count if FPS drops
     */
    autoQualityAdjust(): void;
}
