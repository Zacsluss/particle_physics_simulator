/**
 * TypeScript definitions for particle.js
 * Particle class with physics and visual properties
 */

/**
 * Represents a single particle in the simulation
 */
export class Particle {
    // Physics properties
    x: number;
    y: number;
    vx: number;
    vy: number;
    ax: number;
    ay: number;

    // Visual properties
    size: number;
    baseSize: number;
    hue: number;
    originalHue: number;
    pulsePhase: number;

    // Particle state
    life: number;
    age: number;
    charge: 1 | -1;

    /**
     * Create a new particle
     * @param x - Initial X position
     * @param y - Initial Y position
     * @param vx - Initial X velocity (default: 0)
     * @param vy - Initial Y velocity (default: 0)
     * @throws {Error} If position or velocity values are invalid
     */
    constructor(x: number, y: number, vx?: number, vy?: number);

    /**
     * Reset acceleration for the next physics update
     */
    resetAcceleration(): void;

    /**
     * Apply a force to this particle
     * @param fx - Force X component
     * @param fy - Force Y component
     */
    applyForce(fx: number, fy: number): void;

    /**
     * Update particle physics and visual properties
     * @param dt - Delta time (frame time multiplier)
     * @param damping - Velocity damping factor (0-1)
     * @param maxSpeed - Maximum allowed speed
     * @param canvasWidth - Canvas width for boundary checking
     * @param canvasHeight - Canvas height for boundary checking
     * @param frameCounter - Current frame number for conditional updates
     */
    update(
        dt: number,
        damping: number,
        maxSpeed: number,
        canvasWidth: number,
        canvasHeight: number,
        frameCounter: number
    ): void;

    /**
     * Draw the particle to the canvas
     * @param ctx - Canvas rendering context
     */
    draw(ctx: CanvasRenderingContext2D): void;

    /**
     * Check if particle is dead (life <= 0)
     * @returns True if particle should be removed
     */
    isDead(): boolean;

    /**
     * Kill this particle (for black hole consumption, etc.)
     */
    kill(): void;

    /**
     * Set the base size of this particle
     * @param size - New base size
     */
    setSize(size: number): void;
}
