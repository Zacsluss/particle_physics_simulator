'use strict';

import { GRID_SIZE } from './constants.js';

/**
 * @typedef {import('./particle.js').Particle} Particle
 */

/**
 * Spatial Grid for efficient O(n) particle neighbor lookups
 *
 * Instead of checking every particle against every other particle (O(n²)),
 * we divide the canvas into a grid and only check particles in nearby cells.
 *
 * This dramatically improves performance for electric and repulsion modes
 * where particle-to-particle interactions are expensive.
 */
export class SpatialGrid {
    /**
     * @param {number} width - Canvas width
     * @param {number} height - Canvas height
     * @param {number} cellSize - Size of each grid cell in pixels
     */
    constructor(width, height, cellSize = GRID_SIZE) {
        this.cellSize = cellSize;
        this.cols = Math.ceil(width / cellSize);
        this.rows = Math.ceil(height / cellSize);
        this.grid = [];
        this.clear();
    }

    /**
     * Clear all particles from the grid
     */
    clear() {
        // Create empty array for each cell
        this.grid = Array(this.cols * this.rows)
            .fill(null)
            .map(() => []);
    }

    /**
     * Get the 1D array index for a 2D grid position
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @returns {number} Grid index, or -1 if out of bounds
     */
    getIndex(x, y) {
        const col = Math.floor(x / this.cellSize);
        const row = Math.floor(y / this.cellSize);

        // Bounds check
        if (col < 0 || col >= this.cols || row < 0 || row >= this.rows) {
            return -1;
        }

        return row * this.cols + col;
    }

    /**
     * Add a particle to the grid
     * @param {Particle} particle - Particle to add
     */
    add(particle) {
        const index = this.getIndex(particle.x, particle.y);
        if (index >= 0 && index < this.grid.length) {
            this.grid[index].push(particle);
        }
    }

    /**
     * Get all particles within a radius of a given particle
     * Only checks cells that overlap with the search radius
     * @param {Particle} particle - Center particle
     * @param {number} radius - Search radius in pixels
     * @returns {Particle[]} Array of nearby particles
     */
    getNearby(particle, radius) {
        const nearby = [];

        // Calculate which grid cells overlap with the search radius
        const minCol = Math.max(0, Math.floor((particle.x - radius) / this.cellSize));
        const maxCol = Math.min(this.cols - 1, Math.floor((particle.x + radius) / this.cellSize));
        const minRow = Math.max(0, Math.floor((particle.y - radius) / this.cellSize));
        const maxRow = Math.min(this.rows - 1, Math.floor((particle.y + radius) / this.cellSize));

        // Collect particles from all overlapping cells
        for (let row = minRow; row <= maxRow; row++) {
            for (let col = minCol; col <= maxCol; col++) {
                const index = row * this.cols + col;
                if (this.grid[index]) {
                    nearby.push(...this.grid[index]);
                }
            }
        }

        return nearby;
    }

    /**
     * Check if grid dimensions need updating (canvas resized)
     * @param {number} width - New canvas width
     * @param {number} height - New canvas height
     * @returns {boolean} True if grid needs rebuilding
     */
    needsRebuild(width, height) {
        return this.cols * this.cellSize < width || this.rows * this.cellSize < height;
    }
}
