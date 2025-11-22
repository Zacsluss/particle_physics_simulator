/**
 * TypeScript definitions for physics.js
 * Physics engines for different simulation modes
 */

import { Particle } from './particle';
import { SpatialGrid } from './spatial-grid';
import { PhysicsMode } from './constants';

/**
 * Apply gravity mode physics
 * @param particle - The particle to apply forces to
 * @param forceStrength - User-controlled force multiplier
 * @param mouseDown - Is mouse button pressed
 * @param mouseX - Mouse X position
 * @param mouseY - Mouse Y position
 */
export function applyGravityForces(
    particle: Particle,
    forceStrength: number,
    mouseDown: boolean,
    mouseX: number,
    mouseY: number
): void;

/**
 * Apply electric field mode physics
 * @param particle - The particle to apply forces to
 * @param forceStrength - User-controlled force multiplier
 * @param spatialGrid - Grid for efficient neighbor lookup
 */
export function applyElectricForces(
    particle: Particle,
    forceStrength: number,
    spatialGrid: SpatialGrid | null
): void;

/**
 * Apply magnetic field mode physics
 * @param particle - The particle to apply forces to
 * @param forceStrength - User-controlled force multiplier
 * @param centerX - Canvas center X coordinate
 * @param centerY - Canvas center Y coordinate
 */
export function applyMagneticForces(
    particle: Particle,
    forceStrength: number,
    centerX: number,
    centerY: number
): void;

/**
 * Apply black hole mode physics
 * @param particle - The particle to apply forces to
 * @param forceStrength - User-controlled force multiplier
 * @param centerX - Black hole center X coordinate
 * @param centerY - Black hole center Y coordinate
 */
export function applyBlackHoleForces(
    particle: Particle,
    forceStrength: number,
    centerX: number,
    centerY: number
): void;

/**
 * Apply repulsion mode physics
 * @param particle - The particle to apply forces to
 * @param forceStrength - User-controlled force multiplier
 * @param spatialGrid - Grid for efficient neighbor lookup
 */
export function applyRepulsionForces(
    particle: Particle,
    forceStrength: number,
    spatialGrid: SpatialGrid | null
): void;

/**
 * Apply DNA helix mode physics
 * @param particle - The particle to apply forces to
 * @param forceStrength - User-controlled force multiplier
 * @param centerX - Helix center X coordinate
 * @param centerY - Helix center Y coordinate
 * @param time - Current simulation time for animation
 */
export function applyDNAHelixForces(
    particle: Particle,
    forceStrength: number,
    centerX: number,
    centerY: number,
    time: number
): void;

/**
 * Apply attractor forces to a particle
 * @param particle - The particle to apply forces to
 * @param attractors - Array of attractor objects
 */
export function applyAttractorForces(
    particle: Particle,
    attractors: Array<{ x: number; y: number; strength: number }>
): void;

/**
 * Get damping factor for a physics mode
 * @param mode - Physics mode identifier
 * @returns Damping factor (0-1)
 */
export function getDampingForMode(mode: PhysicsMode): number;
