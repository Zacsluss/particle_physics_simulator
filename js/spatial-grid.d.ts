/**
 * TypeScript definitions for spatial-grid.js
 * Spatial grid for O(n) particle neighbor lookups
 */

import { Particle } from './particle';

/**
 * Spatial Grid for efficient particle neighbor lookups
 * Divides canvas into cells for O(n) collision detection
 */
export class SpatialGrid {
    cellSize: number;
    cols: number;
    rows: number;
    grid: Particle[][];

    /**
     * Create a new spatial grid
     * @param width - Canvas width
     * @param height - Canvas height
     * @param cellSize - Size of each grid cell in pixels
     */
    constructor(width: number, height: number, cellSize?: number);

    /**
     * Clear all particles from the grid
     */
    clear(): void;

    /**
     * Get the 1D array index for a 2D grid position
     * @param x - X coordinate
     * @param y - Y coordinate
     * @returns Grid index, or -1 if out of bounds
     */
    getIndex(x: number, y: number): number;

    /**
     * Add a particle to the grid
     * @param particle - Particle to add
     */
    add(particle: Particle): void;

    /**
     * Get all particles within a radius of a given particle
     * @param particle - Center particle
     * @param radius - Search radius in pixels
     * @returns Array of nearby particles
     */
    getNearby(particle: Particle, radius: number): Particle[];

    /**
     * Check if grid dimensions need updating (canvas resized)
     * @param width - New canvas width
     * @param height - New canvas height
     * @returns True if grid needs rebuilding
     */
    needsRebuild(width: number, height: number): boolean;
}
