'use strict';

import {
    TWO_PI,
    DEFAULT_PARTICLE_SIZE,
    PARTICLE_HUE_INCREMENT,
    PARTICLE_PULSE_SPEED,
    PARTICLE_AGE_FACTOR,
    AURA_SIZE_MULTIPLIER,
    AURA_PULSE_AMPLITUDE,
    AURA_OPACITY,
    SIZE_UPDATE_INTERVAL,
    WALL_BOUNCE_DAMPING,
    PARTICLE_SIZE_AGE_MULTIPLIER
} from './constants.js';

/**
 * Particle class representing a single particle in the simulation
 * Each particle has position, velocity, acceleration, and visual properties
 */
export class Particle {
    /**
     * @param {number} x - Initial X position
     * @param {number} y - Initial Y position
     * @param {number} vx - Initial X velocity
     * @param {number} vy - Initial Y velocity
     * @throws {Error} If position or velocity values are invalid
     */
    constructor(x, y, vx = 0, vy = 0) {
        // Input validation
        if (!Number.isFinite(x) || !Number.isFinite(y)) {
            throw new Error(`Invalid particle position: x=${x}, y=${y}`);
        }
        if (!Number.isFinite(vx) || !Number.isFinite(vy)) {
            throw new Error(`Invalid particle velocity: vx=${vx}, vy=${vy}`);
        }

        // Physics properties
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.ax = 0; // Acceleration X
        this.ay = 0; // Acceleration Y

        // Visual properties
        this.size = DEFAULT_PARTICLE_SIZE;
        this.baseSize = DEFAULT_PARTICLE_SIZE;
        this.hue = Math.random() * 360;
        this.originalHue = this.hue; // Store for DNA mode strand determination
        this.pulsePhase = Math.random() * TWO_PI; // Random starting phase for aura pulsing

        // Particle state
        this.life = 1; // 0-1, particle dies when life reaches 0
        this.age = 0; // Age in frames
        this.charge = Math.random() > 0.5 ? 1 : -1; // Electric charge (+1 or -1)
    }

    /**
     * Reset acceleration for the next physics update
     * Called at the start of each update cycle
     */
    resetAcceleration() {
        this.ax = 0;
        this.ay = 0;
    }

    /**
     * Apply a force to this particle
     * @param {number} fx - Force X component
     * @param {number} fy - Force Y component
     */
    applyForce(fx, fy) {
        this.ax += fx;
        this.ay += fy;
    }

    /**
     * Update particle physics and visual properties
     * @param {number} dt - Delta time (frame time multiplier)
     * @param {number} damping - Velocity damping factor (0-1)
     * @param {number} maxSpeed - Maximum allowed speed
     * @param {number} canvasWidth - Canvas width for boundary checking
     * @param {number} canvasHeight - Canvas height for boundary checking
     * @param {number} frameCounter - Current frame number for conditional updates
     */
    update(dt, damping, maxSpeed, canvasWidth, canvasHeight, frameCounter) {
        // Update velocity based on acceleration
        this.vx += this.ax * dt;
        this.vy += this.ay * dt;

        // Apply damping (energy loss)
        this.vx *= damping;
        this.vy *= damping;

        // Enforce speed limit to prevent runaway particles
        const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (currentSpeed > maxSpeed) {
            const scale = maxSpeed / currentSpeed;
            this.vx *= scale;
            this.vy *= scale;
        }

        // Update position using Verlet integration
        this.x += this.vx * dt;
        this.y += this.vy * dt;

        // Bounce off walls with energy loss
        if (this.x < 0 || this.x > canvasWidth) {
            this.vx *= -WALL_BOUNCE_DAMPING;
            this.x = Math.max(0, Math.min(canvasWidth, this.x));
        }
        if (this.y < 0 || this.y > canvasHeight) {
            this.vy *= -WALL_BOUNCE_DAMPING;
            this.y = Math.max(0, Math.min(canvasHeight, this.y));
        }

        // Update visual properties
        this.hue = (this.hue + PARTICLE_HUE_INCREMENT) % 360;
        this.pulsePhase += PARTICLE_PULSE_SPEED;
        this.age += dt;

        // Update size based on age (only every few frames for performance)
        if (frameCounter % SIZE_UPDATE_INTERVAL === 0) {
            const ageFactor = Math.sin(this.age * PARTICLE_AGE_FACTOR) * 0.2 + 1;
            this.size = this.baseSize * ageFactor;
            // Clamp size to reasonable bounds
            this.size = Math.max(
                1,
                Math.min(this.size, this.baseSize * PARTICLE_SIZE_AGE_MULTIPLIER)
            );
        }
    }

    /**
     * Draw the particle to the canvas
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     */
    draw(ctx) {
        // Calculate pulsing aura effect
        const pulseIntensity = Math.sin(this.pulsePhase) * AURA_PULSE_AMPLITUDE + 0.5;
        const auraSize = this.size * (AURA_SIZE_MULTIPLIER + pulseIntensity * AURA_PULSE_AMPLITUDE);
        const auraOpacity = this.life * AURA_OPACITY * pulseIntensity;

        // Draw aura (behind particle) - skip if too transparent
        if (auraOpacity > 0.01) {
            ctx.fillStyle = `hsla(${this.hue}, 100%, 60%, ${auraOpacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, auraSize, 0, TWO_PI);
            ctx.fill();
        }

        // Draw particle core
        ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, ${this.life})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, TWO_PI);
        ctx.fill();
    }

    /**
     * Check if particle is dead (life <= 0)
     * @returns {boolean} True if particle should be removed
     */
    isDead() {
        return this.life <= 0;
    }

    /**
     * Kill this particle (for black hole consumption, etc.)
     */
    kill() {
        this.life = 0;
    }

    /**
     * Set the base size of this particle
     * @param {number} size - New base size
     */
    setSize(size) {
        this.baseSize = size;
        this.size = size;
    }
}
