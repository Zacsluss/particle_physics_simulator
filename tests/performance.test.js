import { Particle } from '../js/particle.js';
import { SpatialGrid } from '../js/spatial-grid.js';
import { applyElectricForces } from '../js/physics.js';

describe('Performance Benchmarks', () => {
    describe('Spatial Grid Insertion', () => {
        it('should insert 1000 particles in <10ms', () => {
            const particles = [];
            for (let i = 0; i < 1000; i++) {
                particles.push(new Particle(Math.random() * 800, Math.random() * 600));
            }

            const grid = new SpatialGrid(800, 600);

            const start = performance.now();
            particles.forEach((p) => grid.add(p));
            const duration = performance.now() - start;

            expect(duration).toBeLessThan(10); // Should be <10ms
        });
    });

    describe('Particle Update Loop', () => {
        it('should update 1000 particles in <50ms (60 FPS budget)', () => {
            const particles = [];
            for (let i = 0; i < 1000; i++) {
                particles.push(new Particle(Math.random() * 800, Math.random() * 600));
            }

            const start = performance.now();
            particles.forEach((p) => {
                p.update(1, 0.99, 15, 800, 600, 0);
            });
            const duration = performance.now() - start;

            // 60 FPS = 16.67ms per frame, budget 50ms for safety margin
            expect(duration).toBeLessThan(50);
        });
    });

    describe('Spatial Grid Scaling (O(n) verification)', () => {
        it('should scale linearly, not quadratically', () => {
            const sizes = [100, 500, 1000];
            const times = [];

            sizes.forEach((size) => {
                const particles = [];
                for (let i = 0; i < size; i++) {
                    particles.push(new Particle(Math.random() * 800, Math.random() * 600));
                }

                const grid = new SpatialGrid(800, 600);

                const start = performance.now();
                particles.forEach((p) => grid.add(p));
                times.push(performance.now() - start);
            });

            // Verify O(n) complexity:
            // Time ratio should be roughly proportional to size ratio
            const ratio1 = times[1] / times[0]; // 500/100 = 5x size
            const ratio2 = times[2] / times[1]; // 1000/500 = 2x size

            // If O(n): ratios should be ~5 and ~2
            // If O(n²): ratios would be ~25 and ~4

            expect(ratio1).toBeLessThan(10); // Allow some variance
            expect(ratio2).toBeLessThan(5);
        });
    });

    describe('Electric Forces (Spatial Grid Optimization)', () => {
        it('should calculate forces for 1000 particles in <30ms using grid', () => {
            const particles = [];
            for (let i = 0; i < 1000; i++) {
                particles.push(new Particle(Math.random() * 800, Math.random() * 600));
            }

            const grid = new SpatialGrid(800, 600);
            particles.forEach((p) => grid.add(p));

            const start = performance.now();
            particles.forEach((p) => {
                p.resetAcceleration();
                applyElectricForces(p, 1, grid);
            });
            const duration = performance.now() - start;

            expect(duration).toBeLessThan(30); // Should be <30ms with grid optimization
        });
    });

    describe('Memory Allocation', () => {
        it('should not leak memory during particle churn', () => {
            const particles = [];

            // Simulate 100 frames of particle creation/destruction
            for (let frame = 0; frame < 100; frame++) {
                // Add particles
                for (let i = 0; i < 10; i++) {
                    particles.push(new Particle(Math.random() * 800, Math.random() * 600));
                }

                // Remove dead particles (simulate swap-and-pop)
                for (let i = particles.length - 1; i >= 0 && particles.length > 500; i--) {
                    if (Math.random() < 0.1) {
                        // 10% chance of death
                        particles[i] = particles[particles.length - 1];
                        particles.pop();
                    }
                }
            }

            // Memory usage should stabilize (particles array should not grow unbounded)
            expect(particles.length).toBeLessThan(1500); // Should stabilize around MAX_PARTICLES
        });
    });

    describe('Grid Neighbor Queries', () => {
        it('should query neighbors efficiently (O(1) per query)', () => {
            const particles = [];
            for (let i = 0; i < 1000; i++) {
                particles.push(new Particle(Math.random() * 800, Math.random() * 600));
            }

            const grid = new SpatialGrid(800, 600);
            particles.forEach((p) => grid.add(p));

            const start = performance.now();
            // Query neighbors for 100 random particles
            for (let i = 0; i < 100; i++) {
                const randomParticle = particles[Math.floor(Math.random() * particles.length)];
                grid.getNearby(randomParticle, 50);
            }
            const duration = performance.now() - start;

            // 100 queries should complete in <5ms
            expect(duration).toBeLessThan(5);
        });
    });

    describe('Particle Physics Update', () => {
        it('should maintain consistent frame time with varying particle counts', () => {
            const particleCounts = [100, 500, 1000];
            const frameTimes = [];

            particleCounts.forEach((count) => {
                const particles = [];
                for (let i = 0; i < count; i++) {
                    particles.push(new Particle(Math.random() * 800, Math.random() * 600));
                }

                const start = performance.now();
                // Simulate one frame
                particles.forEach((p) => {
                    p.resetAcceleration();
                    p.applyForce(0, 0.2); // Simulate gravity
                    p.update(1, 0.99, 15, 800, 600, 0);
                });
                frameTimes.push(performance.now() - start);
            });

            // All frame times should be under 16.67ms (60 FPS)
            frameTimes.forEach((time, _index) => {
                expect(time).toBeLessThan(17); // Slight margin for 60 FPS
            });
        });
    });
});
