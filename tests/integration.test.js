import { Particle } from '../js/particle.js';
import { SpatialGrid } from '../js/spatial-grid.js';
import {
    applyGravityForces,
    applyElectricForces,
    applyMagneticForces,
    applyBlackHoleForces,
    applyRepulsionForces,
    applyDNAHelixForces,
    applyAttractorForces,
    getDampingForMode
} from '../js/physics.js';
import { MODES, SPEED_LIMIT, GRID_SIZE } from '../js/constants.js';

describe('Integration Tests - Full Simulation Cycles', () => {
    const canvasWidth = 800;
    const canvasHeight = 600;
    let particles;
    let spatialGrid;

    beforeEach(() => {
        particles = [];
        spatialGrid = new SpatialGrid(canvasWidth, canvasHeight, GRID_SIZE);
    });

    describe('Gravity Mode Simulation', () => {
        it('should apply gravity and update particles correctly', () => {
            // Create test particles
            const particle = new Particle(400, 100, 0, 0);
            particles.push(particle);

            // Apply gravity forces
            applyGravityForces(particle, 1, false, 0, 0);

            // Initial state
            expect(particle.ay).toBeGreaterThan(0); // Gravity pulls down

            // Update particle
            const damping = getDampingForMode(MODES.GRAVITY);
            particle.update(1, damping, SPEED_LIMIT, canvasWidth, canvasHeight, 0);

            // Particle should have moved down
            expect(particle.y).toBeGreaterThan(100);
            expect(particle.vy).toBeGreaterThan(0);
        });

        it('should attract particles to mouse when pressed', () => {
            const particle = new Particle(400, 300, 0, 0);
            const mouseX = 100;
            const mouseY = 100;

            applyGravityForces(particle, 1, true, mouseX, mouseY);

            // Particle should be accelerating toward mouse horizontally
            expect(particle.ax).toBeLessThan(0); // Moving left toward mouse
            // Note: ay may be positive due to gravity pulling down, so we just check ax
        });
    });

    describe('Electric Mode Simulation', () => {
        it('should handle particle interactions with spatial grid', () => {
            // Create particles with opposite charges
            const particle1 = new Particle(400, 300, 0, 0);
            particle1.charge = 1;

            const particle2 = new Particle(420, 300, 0, 0);
            particle2.charge = -1;

            particles.push(particle1, particle2);

            // Build spatial grid
            spatialGrid.clear();
            particles.forEach((p) => spatialGrid.add(p));

            // Apply electric forces
            applyElectricForces(particle1, 1, spatialGrid);

            // Opposite charges should attract
            expect(particle1.ax).not.toBe(0);
            expect(particle1.ay).toBe(0); // Same y position
        });

        it('should repel same-charge particles', () => {
            const particle1 = new Particle(400, 300, 0, 0);
            particle1.charge = 1;

            const particle2 = new Particle(420, 300, 0, 0);
            particle2.charge = 1;

            spatialGrid.clear();
            spatialGrid.add(particle1);
            spatialGrid.add(particle2);

            const initialAx = particle1.ax;
            applyElectricForces(particle1, 1, spatialGrid);

            // Same charges should repel
            expect(particle1.ax).toBeLessThan(initialAx);
        });
    });

    describe('Magnetic Mode Simulation', () => {
        it('should create swirling motion around center', () => {
            const particle = new Particle(500, 300, 0, 0);
            const centerX = 400;
            const centerY = 300;

            applyMagneticForces(particle, 1, centerX, centerY);

            // Should have perpendicular force for swirl
            expect(particle.ax).not.toBe(0);
            expect(particle.ay).not.toBe(0);
        });
    });

    describe('Black Hole Mode Simulation', () => {
        it('should pull particles toward center', () => {
            const particle = new Particle(500, 300, 0, 0);
            const centerX = 400;
            const centerY = 300;

            applyBlackHoleForces(particle, 1, centerX, centerY);

            // Should be pulled toward center
            expect(particle.ax).toBeLessThan(0);
        });

        it('should kill particles at event horizon', () => {
            const particle = new Particle(400, 300, 0, 0); // At center
            const centerX = 400;
            const centerY = 300;

            expect(particle.life).toBe(1);
            applyBlackHoleForces(particle, 1, centerX, centerY);

            // Particle should be dead
            expect(particle.life).toBe(0);
            expect(particle.isDead()).toBe(true);
        });
    });

    describe('Repulsion Mode Simulation', () => {
        it('should push particles apart', () => {
            const particle1 = new Particle(400, 300, 0, 0);
            const particle2 = new Particle(420, 300, 0, 0);

            spatialGrid.clear();
            spatialGrid.add(particle1);
            spatialGrid.add(particle2);

            applyRepulsionForces(particle1, 1, spatialGrid);

            // Should push away from nearby particle
            expect(particle1.ax).toBeLessThan(0); // Push left
        });
    });

    describe('DNA Helix Mode Simulation', () => {
        it('should create helical motion', () => {
            const particle = new Particle(400, 300, 0, 0);
            particle.originalHue = 100; // Assign to strand 1

            applyDNAHelixForces(particle, 1, 400, 300, 1000, canvasWidth, canvasHeight);

            // Should have forces applied for helix formation
            expect(particle.ax).not.toBe(0);
            expect(particle.ay).not.toBe(0);
        });

        it('should teleport escaped particles', () => {
            const particle = new Particle(-200, 300, 0, 0); // Far outside
            particle.originalHue = 100;

            applyDNAHelixForces(particle, 1, 400, 300, 1000, canvasWidth, canvasHeight);

            // Should be teleported back
            expect(particle.x).toBeGreaterThan(-100);
            expect(particle.x).toBeLessThan(500);
        });
    });

    describe('Attractor Forces', () => {
        it('should pull particles toward attractors', () => {
            const particle = new Particle(500, 300, 0, 0);
            const attractors = [{ x: 400, y: 300, strength: 1 }];

            applyAttractorForces(particle, attractors);

            // Should be pulled toward attractor
            expect(particle.ax).toBeLessThan(0);
            expect(particle.ay).toBe(0);
        });

        it('should handle multiple attractors', () => {
            const particle = new Particle(500, 300, 0, 0);
            const attractors = [
                { x: 400, y: 300, strength: 1 },
                { x: 600, y: 300, strength: 1 }
            ];

            applyAttractorForces(particle, attractors);

            // Forces from both attractors should be applied
            // Net force should be minimal since attractors are on opposite sides
            const netForce = Math.abs(particle.ax);
            expect(netForce).toBeLessThan(10);
        });
    });

    describe('Full Update Cycle', () => {
        it('should complete full physics update without errors', () => {
            // Create multiple particles
            for (let i = 0; i < 10; i++) {
                particles.push(
                    new Particle(
                        Math.random() * canvasWidth,
                        Math.random() * canvasHeight,
                        Math.random() * 2 - 1,
                        Math.random() * 2 - 1
                    )
                );
            }

            // Build spatial grid
            spatialGrid.clear();
            particles.forEach((p) => spatialGrid.add(p));

            // Apply forces and update
            particles.forEach((particle) => {
                particle.resetAcceleration();
                applyElectricForces(particle, 1, spatialGrid);

                const damping = getDampingForMode(MODES.ELECTRIC);
                particle.update(1, damping, SPEED_LIMIT, canvasWidth, canvasHeight, 0);
            });

            // All particles should still be valid
            particles.forEach((particle) => {
                expect(Number.isFinite(particle.x)).toBe(true);
                expect(Number.isFinite(particle.y)).toBe(true);
                expect(Number.isFinite(particle.vx)).toBe(true);
                expect(Number.isFinite(particle.vy)).toBe(true);
            });
        });

        it('should remove dead particles correctly', () => {
            // Create particles
            for (let i = 0; i < 5; i++) {
                particles.push(new Particle(400, 300, 0, 0));
            }

            // Kill some particles
            particles[1].kill();
            particles[3].kill();

            // Remove dead particles using swap-and-pop
            for (let i = particles.length - 1; i >= 0; i--) {
                if (particles[i].isDead()) {
                    particles[i] = particles[particles.length - 1];
                    particles.pop();
                    i--;
                }
            }

            expect(particles.length).toBe(3);
            particles.forEach((p) => {
                expect(p.isDead()).toBe(false);
            });
        });
    });

    describe('Performance Under Load', () => {
        it('should handle 100 particles with spatial grid', () => {
            // Create 100 particles
            for (let i = 0; i < 100; i++) {
                particles.push(
                    new Particle(Math.random() * canvasWidth, Math.random() * canvasHeight, 0, 0)
                );
            }

            spatialGrid.clear();
            particles.forEach((p) => spatialGrid.add(p));

            // Apply forces to all particles
            const startTime = performance.now();

            particles.forEach((particle) => {
                particle.resetAcceleration();
                applyElectricForces(particle, 1, spatialGrid);
            });

            const endTime = performance.now();
            const duration = endTime - startTime;

            // Should complete in reasonable time (< 50ms for 100 particles)
            expect(duration).toBeLessThan(50);
        });
    });

    describe('Damping by Mode', () => {
        it('should return correct damping for each mode', () => {
            expect(getDampingForMode(MODES.GRAVITY)).toBe(0.99);
            expect(getDampingForMode(MODES.ELECTRIC)).toBe(0.96);
            expect(getDampingForMode(MODES.MAGNETIC)).toBe(0.97);
            expect(getDampingForMode(MODES.BLACK_HOLE)).toBe(0.99);
            expect(getDampingForMode(MODES.REPEL)).toBe(0.96);
            expect(getDampingForMode(MODES.DNA)).toBe(0.99);
        });

        it('should return default damping for unknown mode', () => {
            expect(getDampingForMode('unknown')).toBe(0.99);
        });
    });
});
