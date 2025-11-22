import { SpatialGrid } from '../js/spatial-grid.js';
import { Particle } from '../js/particle.js';

describe('SpatialGrid', () => {
    let grid;
    const width = 800;
    const height = 600;
    const cellSize = 50;

    beforeEach(() => {
        grid = new SpatialGrid(width, height, cellSize);
    });

    describe('constructor', () => {
        it('should initialize with correct dimensions', () => {
            expect(grid.cellSize).toBe(cellSize);
            expect(grid.cols).toBe(Math.ceil(width / cellSize));
            expect(grid.rows).toBe(Math.ceil(height / cellSize));
        });

        it('should create empty grid array', () => {
            expect(grid.grid).toBeDefined();
            expect(grid.grid.length).toBe(grid.cols * grid.rows);
            expect(grid.grid[0]).toEqual([]);
        });
    });

    describe('getIndex', () => {
        it('should return correct index for valid position', () => {
            const index = grid.getIndex(100, 100);
            const expectedCol = Math.floor(100 / cellSize);
            const expectedRow = Math.floor(100 / cellSize);
            const expectedIndex = expectedRow * grid.cols + expectedCol;
            expect(index).toBe(expectedIndex);
        });

        it('should return -1 for negative coordinates', () => {
            expect(grid.getIndex(-10, 100)).toBe(-1);
            expect(grid.getIndex(100, -10)).toBe(-1);
        });

        it('should return -1 for out of bounds coordinates', () => {
            expect(grid.getIndex(width + 100, 100)).toBe(-1);
            expect(grid.getIndex(100, height + 100)).toBe(-1);
        });

        it('should handle edge coordinates correctly', () => {
            expect(grid.getIndex(0, 0)).toBeGreaterThanOrEqual(0);
            expect(grid.getIndex(width - 1, height - 1)).toBeGreaterThanOrEqual(0);
        });
    });

    describe('add', () => {
        it('should add particle to correct grid cell', () => {
            const particle = new Particle(100, 100);
            grid.add(particle);

            const index = grid.getIndex(100, 100);
            expect(grid.grid[index]).toContain(particle);
        });

        it('should not add particle with out of bounds position', () => {
            const particle = new Particle(-100, -100);
            grid.add(particle);

            const totalParticles = grid.grid.reduce((sum, cell) => sum + cell.length, 0);
            expect(totalParticles).toBe(0);
        });

        it('should add multiple particles to same cell', () => {
            const particle1 = new Particle(100, 100);
            const particle2 = new Particle(105, 105);

            grid.add(particle1);
            grid.add(particle2);

            const index = grid.getIndex(100, 100);
            expect(grid.grid[index].length).toBe(2);
        });
    });

    describe('getNearby', () => {
        it('should return particles within radius', () => {
            const centerParticle = new Particle(200, 200);
            const nearbyParticle = new Particle(210, 210);
            const farParticle = new Particle(500, 500);

            grid.add(centerParticle);
            grid.add(nearbyParticle);
            grid.add(farParticle);

            const nearby = grid.getNearby(centerParticle, 50);

            expect(nearby).toContain(centerParticle);
            expect(nearby).toContain(nearbyParticle);
            expect(nearby).not.toContain(farParticle);
        });

        it('should handle edge particles correctly', () => {
            const edgeParticle = new Particle(0, 0);
            grid.add(edgeParticle);

            const nearby = grid.getNearby(edgeParticle, 100);
            expect(nearby).toContain(edgeParticle);
        });

        it('should return empty array when no particles nearby', () => {
            const particle = new Particle(400, 300);
            const nearby = grid.getNearby(particle, 50);

            expect(nearby).toEqual([]);
        });

        it('should search multiple cells when radius spans cells', () => {
            const particle1 = new Particle(100, 100);
            const particle2 = new Particle(140, 100); // In adjacent cell

            grid.add(particle1);
            grid.add(particle2);

            const nearby = grid.getNearby(particle1, 60);
            expect(nearby.length).toBeGreaterThan(0);
        });
    });

    describe('clear', () => {
        it('should remove all particles from grid', () => {
            const particle1 = new Particle(100, 100);
            const particle2 = new Particle(200, 200);

            grid.add(particle1);
            grid.add(particle2);
            grid.clear();

            const totalParticles = grid.grid.reduce((sum, cell) => sum + cell.length, 0);
            expect(totalParticles).toBe(0);
        });

        it('should maintain grid structure after clear', () => {
            grid.clear();
            expect(grid.grid.length).toBe(grid.cols * grid.rows);
        });
    });

    describe('needsRebuild', () => {
        it('should return true when width exceeds grid coverage', () => {
            const needsRebuild = grid.needsRebuild(width + 100, height);
            expect(needsRebuild).toBe(true);
        });

        it('should return true when height exceeds grid coverage', () => {
            const needsRebuild = grid.needsRebuild(width, height + 100);
            expect(needsRebuild).toBe(true);
        });

        it('should return false when dimensions fit current grid', () => {
            const needsRebuild = grid.needsRebuild(width - 10, height - 10);
            expect(needsRebuild).toBe(false);
        });
    });

    describe('performance', () => {
        it('should handle large number of particles efficiently', () => {
            const particleCount = 1000;
            const particles = [];

            for (let i = 0; i < particleCount; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                const particle = new Particle(x, y);
                particles.push(particle);
                grid.add(particle);
            }

            const testParticle = particles[0];
            const startTime = performance.now();
            const nearby = grid.getNearby(testParticle, 50);
            const endTime = performance.now();

            // Should complete in less than 5ms (O(n) performance)
            expect(endTime - startTime).toBeLessThan(5);
            expect(nearby.length).toBeGreaterThan(0);
        });
    });
});
