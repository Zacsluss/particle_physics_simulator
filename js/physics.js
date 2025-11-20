'use strict';

import {
    MODES,
    GRAVITY_STRENGTH,
    BLACK_HOLE_EVENT_HORIZON,
    DNA_HELIX_RADIUS,
    DNA_HELIX_HEIGHT,
    DNA_HELIX_SPEED,
    MAX_INTERACTIONS_PER_PARTICLE,
    TWO_PI
} from './constants.js';

/**
 * @typedef {import('./particle.js').Particle} Particle
 * @typedef {import('./spatial-grid.js').SpatialGrid} SpatialGrid
 */

/**
 * Physics engine for different simulation modes
 * Each mode applies different forces to particles
 */

/**
 * Apply gravity mode physics
 * Particles fall downward and are attracted to mouse when pressed
 * @param {Particle} particle - The particle to apply forces to
 * @param {number} forceStrength - User-controlled force multiplier
 * @param {boolean} mouseDown - Is mouse button pressed
 * @param {number} mouseX - Mouse X position
 * @param {number} mouseY - Mouse Y position
 */
export function applyGravityForces(particle, forceStrength, mouseDown, mouseX, mouseY) {
    // F = ma, where a = g (gravitational acceleration)
    particle.applyForce(0, GRAVITY_STRENGTH * forceStrength);

    // Mouse attraction (like a massive object creating gravity well)
    if (mouseDown) {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 1) {
            // F = G*m1*m2/r² (simplified, assuming unit masses)
            const force = (100 * forceStrength) / (dist * dist);
            particle.applyForce((dx / dist) * force, (dy / dist) * force);
        }
    }
}

/**
 * Apply electric field mode physics
 * Particles with opposite charges attract, same charges repel
 *
 * Uses spatial grid for O(n) performance instead of O(n²)
 * @param {Particle} particle - The particle to apply forces to
 * @param {number} forceStrength - User-controlled force multiplier
 * @param {SpatialGrid} spatialGrid - Grid for efficient neighbor lookup
 */
export function applyElectricForces(particle, forceStrength, spatialGrid) {
    if (!spatialGrid) {
        return;
    }

    // Get nearby particles within interaction radius
    const nearbyParticles = spatialGrid.getNearby(particle, 50);

    let interactionCount = 0;

    for (
        let i = 0;
        i < nearbyParticles.length && interactionCount < MAX_INTERACTIONS_PER_PARTICLE;
        i++
    ) {
        const other = nearbyParticles[i];
        if (other === particle) {
            continue;
        }

        const dx = other.x - particle.x;
        const dy = other.y - particle.y;
        const distSq = dx * dx + dy * dy; // Avoid sqrt for comparison

        // Only interact within reasonable distance range
        if (distSq > 25 && distSq < 2500) {
            // 5² to 50²
            // Optimize: use inverse distance to avoid extra sqrt call
            const invDist = 1 / Math.sqrt(distSq);

            // Coulomb's Law: F = k*q1*q2/r²
            // Negative force = attraction, positive = repulsion
            const force = (particle.charge * other.charge * -2 * forceStrength) / distSq;

            particle.applyForce(dx * force * invDist, dy * force * invDist);
            interactionCount++;
        }
    }
}

/**
 * Apply magnetic field mode physics
 * Particles swirl around the center in a vortex pattern
 *
 * Simulates Lorentz force: F = q(v × B)
 * Perpendicular force creates rotation, slight inward force creates spiral
 * @param {Particle} particle - The particle to apply forces to
 * @param {number} forceStrength - User-controlled force multiplier
 * @param {number} centerX - Center X position (usually canvas center)
 * @param {number} centerY - Center Y position (usually canvas center)
 */
export function applyMagneticForces(particle, forceStrength, centerX, centerY) {
    const dx = centerX - particle.x;
    const dy = centerY - particle.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 1) {
        // Perpendicular force for swirl (cross product) - increased from 0.5 to 1.5
        particle.applyForce((-dy / dist) * 1.5 * forceStrength, (dx / dist) * 1.5 * forceStrength);

        // Slight inward force for spiral effect - increased from 0.1 to 0.25
        particle.applyForce((dx / dist) * 0.25 * forceStrength, (dy / dist) * 0.25 * forceStrength);
    }
}

/**
 * Apply black hole mode physics
 * Massive gravitational pull toward center, particles consumed at event horizon
 * @param {Particle} particle - The particle to apply forces to
 * @param {number} forceStrength - User-controlled force multiplier
 * @param {number} centerX - Black hole X position
 * @param {number} centerY - Black hole Y position
 */
export function applyBlackHoleForces(particle, forceStrength, centerX, centerY) {
    const dx = centerX - particle.x;
    const dy = centerY - particle.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > BLACK_HOLE_EVENT_HORIZON) {
        // Extreme gravitational force: F = G*M*m/r²
        // (M is very large for black hole)
        const force = (500 * forceStrength) / (dist * dist);
        particle.applyForce((dx / dist) * force, (dy / dist) * force);
    } else {
        // Particle crossed event horizon - no escape!
        particle.kill();
    }
}

/**
 * Apply repulsion field mode physics
 * All particles repel each other, creating chaotic dispersion
 * @param {Particle} particle - The particle to apply forces to
 * @param {number} forceStrength - User-controlled force multiplier
 * @param {SpatialGrid} spatialGrid - Grid for efficient neighbor lookup
 */
export function applyRepulsionForces(particle, forceStrength, spatialGrid) {
    if (!spatialGrid) {
        return;
    }

    const nearbyParticles = spatialGrid.getNearby(particle, 100);

    let interactionCount = 0;

    for (
        let i = 0;
        i < nearbyParticles.length && interactionCount < MAX_INTERACTIONS_PER_PARTICLE;
        i++
    ) {
        const other = nearbyParticles[i];
        if (other === particle) {
            continue;
        }

        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distSq = dx * dx + dy * dy;

        if (distSq > 1 && distSq < 10000) {
            // 1 to 100²
            // Optimize: use inverse distance to avoid extra sqrt call
            const invDist = 1 / Math.sqrt(distSq);

            // Inverse gravity - push away
            const force = (50 * forceStrength) / distSq;

            particle.applyForce(dx * force * invDist, dy * force * invDist);
            interactionCount++;
        }
    }
}

/**
 * Apply DNA helix mode physics
 * Particles form two intertwined helical strands
 *
 * Complex orbital mechanics to create the characteristic double helix structure
 * @param {Particle} particle - The particle to apply forces to
 * @param {number} forceStrength - User-controlled force multiplier
 * @param {number} centerX - Helix center X position
 * @param {number} centerY - Helix center Y position
 * @param {number} time - Current time for animation
 * @param {number} canvasWidth - Canvas width for bounds checking
 * @param {number} canvasHeight - Canvas height for bounds checking
 */
export function applyDNAHelixForces(
    particle,
    forceStrength,
    centerX,
    centerY,
    time,
    canvasWidth,
    canvasHeight
) {
    // Determine which strand based on original hue
    // This ensures particles stay on their assigned strand
    const strand = particle.originalHue > 180 ? 1 : -1;

    // Calculate helix path
    const baseAngle = time * DNA_HELIX_SPEED + (particle.originalHue / 360) * TWO_PI;
    const helixHeight = Math.sin(baseAngle * 2) * DNA_HELIX_HEIGHT; // Vertical oscillation

    // Target position on helix
    const targetX = centerX + Math.cos(baseAngle) * DNA_HELIX_RADIUS * strand;
    const targetY = centerY + helixHeight + Math.cos(baseAngle * 2 + strand * Math.PI) * 100;

    // Strong attractive forces toward helix path
    const dx = targetX - particle.x;
    const dy = targetY - particle.y;
    const distToTarget = Math.sqrt(dx * dx + dy * dy);

    if (distToTarget > 10) {
        const attractionStrength = forceStrength * 0.5;
        particle.applyForce(
            (dx / distToTarget) * attractionStrength,
            (dy / distToTarget) * attractionStrength
        );
    }

    // Add orbital velocity for smooth rotation
    const orbitalSpeed = forceStrength * 0.8;
    particle.applyForce(
        -Math.sin(baseAngle) * orbitalSpeed * strand,
        Math.cos(baseAngle * 2) * orbitalSpeed * 0.5
    );

    // Teleport particles that escape bounds (instead of letting them fly away)
    if (
        particle.x < -100 ||
        particle.x > canvasWidth + 100 ||
        particle.y < -100 ||
        particle.y > canvasHeight + 100
    ) {
        particle.x = centerX + (Math.random() - 0.5) * 50;
        particle.y = centerY + (Math.random() - 0.5) * 50;
        particle.vx *= 0.1;
        particle.vy *= 0.1;
    }
}

/**
 * Apply forces from user-created attractors
 * Attractors are points that pull particles toward them
 * @param {Particle} particle - The particle to apply forces to
 * @param {Array} attractors - Array of attractor objects {x, y, strength}
 */
export function applyAttractorForces(particle, attractors) {
    attractors.forEach((attractor) => {
        const dx = attractor.x - particle.x;
        const dy = attractor.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 1) {
            // F = strength/r²
            const force = (attractor.strength * 100) / (dist * dist);
            particle.applyForce((dx / dist) * force, (dy / dist) * force);
        }
    });
}

/**
 * Get the appropriate damping factor for a given mode
 * Different modes need different energy dissipation rates
 * @param {string} mode - Current physics mode
 * @returns {number} Damping factor (0-1)
 */
export function getDampingForMode(mode) {
    const dampingMap = {
        [MODES.GRAVITY]: 0.99,
        [MODES.ELECTRIC]: 0.96, // Higher damping to prevent chaos
        [MODES.MAGNETIC]: 0.97,
        [MODES.BLACK_HOLE]: 0.99,
        [MODES.REPEL]: 0.96, // Higher damping to prevent explosion
        [MODES.DNA]: 0.99
    };

    return dampingMap[mode] || 0.99;
}
