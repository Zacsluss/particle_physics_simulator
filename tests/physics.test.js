import { Particle } from '../js/particle.js';
import { SpatialGrid } from '../js/spatial-grid.js';
import {
    applyGravityForces,
    applyElectricForces,
    applyMagneticForces,
    applyBlackHoleForces,
    applyRepulsionForces,
    getDampingForMode
} from '../js/physics.js';
import { MODES } from '../js/constants.js';

describe('Physics', () => {
    describe('applyGravityForces', () => {
        let particle;

        beforeEach(() => {
            particle = new Particle(400, 300);
            particle.resetAcceleration();
        });

        it('should apply downward gravity force', () => {
            applyGravityForces(particle, 1, false, 0, 0);

            expect(particle.ay).toBeGreaterThan(0); // Downward force
        });

        it('should scale gravity by force strength', () => {
            const weakParticle = new Particle(400, 300);
            const strongParticle = new Particle(400, 300);

            applyGravityForces(weakParticle, 1, false, 0, 0);
            applyGravityForces(strongParticle, 5, false, 0, 0);

            expect(strongParticle.ay).toBeGreaterThan(weakParticle.ay);
        });

        it('should attract particle to mouse when mouse is down', () => {
            const mouseX = 500;
            const mouseY = 300;

            applyGravityForces(particle, 1, true, mouseX, mouseY);

            expect(particle.ax).toBeGreaterThan(0); // Should pull toward mouse
        });

        it('should not attract to mouse when mouse is up', () => {
            const mouseX = 500;
            const mouseY = 300;
            const initialAx = particle.ax;

            applyGravityForces(particle, 1, false, mouseX, mouseY);

            expect(particle.ax).toBe(initialAx); // Should only have gravity
        });

        it('should handle zero distance to mouse gracefully', () => {
            applyGravityForces(particle, 1, true, particle.x, particle.y);
            // Should not throw or produce NaN
            expect(Number.isFinite(particle.ax)).toBe(true);
            expect(Number.isFinite(particle.ay)).toBe(true);
        });
    });

    describe('applyElectricForces', () => {
        let grid;
        const canvasWidth = 800;
        const canvasHeight = 600;

        beforeEach(() => {
            grid = new SpatialGrid(canvasWidth, canvasHeight);
        });

        it('should apply attractive force between opposite charges', () => {
            const particle1 = new Particle(400, 300);
            const particle2 = new Particle(420, 300);

            particle1.charge = 1;
            particle2.charge = -1;
            particle1.resetAcceleration();
            particle2.resetAcceleration();

            grid.add(particle1);
            grid.add(particle2);

            applyElectricForces(particle1, 1, grid);

            // Particle 1 should be attracted toward particle 2
            expect(particle1.ax).toBeGreaterThan(0);
        });

        it('should apply repulsive force between same charges', () => {
            const particle1 = new Particle(400, 300);
            const particle2 = new Particle(420, 300);

            particle1.charge = 1;
            particle2.charge = 1;
            particle1.resetAcceleration();

            grid.add(particle1);
            grid.add(particle2);

            applyElectricForces(particle1, 1, grid);

            // Particle 1 should be repelled away from particle 2
            expect(particle1.ax).toBeLessThan(0);
        });

        it('should handle null spatial grid gracefully', () => {
            const particle = new Particle(400, 300);
            expect(() => applyElectricForces(particle, 1, null)).not.toThrow();
        });

        it('should scale force by force strength', () => {
            const particle1 = new Particle(400, 300);
            const particle2 = new Particle(420, 300);

            particle1.charge = 1;
            particle2.charge = -1;
            particle1.resetAcceleration();

            grid.add(particle1);
            grid.add(particle2);

            applyElectricForces(particle1, 5, grid);

            expect(Math.abs(particle1.ax)).toBeGreaterThan(0);
        });

        it('should ignore particles too far away', () => {
            const particle1 = new Particle(400, 300);
            const particle2 = new Particle(600, 300); // Far away

            particle1.charge = 1;
            particle2.charge = -1;
            particle1.resetAcceleration();

            grid.add(particle1);
            grid.add(particle2);

            applyElectricForces(particle1, 1, grid);

            // Should have minimal or no force due to distance
            expect(Math.abs(particle1.ax)).toBeLessThan(1);
        });
    });

    describe('applyMagneticForces', () => {
        it('should apply perpendicular force creating rotation', () => {
            const particle = new Particle(500, 300); // Right of center
            const centerX = 400;
            const centerY = 300;

            particle.resetAcceleration();
            applyMagneticForces(particle, 1, centerX, centerY);

            // Should apply force perpendicular to radial direction
            expect(particle.ax !== 0 || particle.ay !== 0).toBe(true);
        });

        it('should apply inward spiral force', () => {
            const particle = new Particle(500, 300);
            const centerX = 400;
            const centerY = 300;

            particle.resetAcceleration();
            applyMagneticForces(particle, 1, centerX, centerY);

            // Should have component pulling toward center
            expect(particle.ax).toBeLessThan(0);
        });

        it('should scale force by force strength', () => {
            const weakParticle = new Particle(500, 300);
            const strongParticle = new Particle(500, 300);
            const centerX = 400;
            const centerY = 300;

            applyMagneticForces(weakParticle, 1, centerX, centerY);
            applyMagneticForces(strongParticle, 5, centerX, centerY);

            const weakMagnitude = Math.sqrt(weakParticle.ax ** 2 + weakParticle.ay ** 2);
            const strongMagnitude = Math.sqrt(strongParticle.ax ** 2 + strongParticle.ay ** 2);

            expect(strongMagnitude).toBeGreaterThan(weakMagnitude);
        });
    });

    describe('applyBlackHoleForces', () => {
        it('should pull particle toward center', () => {
            const particle = new Particle(500, 300);
            const centerX = 400;
            const centerY = 300;

            particle.resetAcceleration();
            applyBlackHoleForces(particle, 1, centerX, centerY);

            expect(particle.ax).toBeLessThan(0); // Pull left toward center
        });

        it('should kill particle near event horizon', () => {
            const particle = new Particle(405, 300); // Very close to center
            const centerX = 400;
            const centerY = 300;

            applyBlackHoleForces(particle, 1, centerX, centerY);

            expect(particle.life).toBe(0);
        });

        it('should apply stronger force closer to center', () => {
            const nearParticle = new Particle(420, 300);
            const farParticle = new Particle(500, 300);
            const centerX = 400;
            const centerY = 300;

            nearParticle.resetAcceleration();
            farParticle.resetAcceleration();

            applyBlackHoleForces(nearParticle, 1, centerX, centerY);
            applyBlackHoleForces(farParticle, 1, centerX, centerY);

            const nearMagnitude = Math.sqrt(nearParticle.ax ** 2 + nearParticle.ay ** 2);
            const farMagnitude = Math.sqrt(farParticle.ax ** 2 + farParticle.ay ** 2);

            expect(nearMagnitude).toBeGreaterThan(farMagnitude);
        });
    });

    describe('applyRepulsionForces', () => {
        let grid;
        const canvasWidth = 800;
        const canvasHeight = 600;

        beforeEach(() => {
            grid = new SpatialGrid(canvasWidth, canvasHeight);
        });

        it('should push particles away from each other', () => {
            const particle1 = new Particle(400, 300);
            const particle2 = new Particle(420, 300);

            particle1.resetAcceleration();
            grid.add(particle1);
            grid.add(particle2);

            applyRepulsionForces(particle1, 1, grid);

            expect(particle1.ax).toBeLessThan(0); // Should push away from particle2
        });

        it('should handle null spatial grid gracefully', () => {
            const particle = new Particle(400, 300);
            expect(() => applyRepulsionForces(particle, 1, null)).not.toThrow();
        });

        it('should scale force by force strength', () => {
            const particle1 = new Particle(400, 300);
            const particle2 = new Particle(420, 300);

            particle1.resetAcceleration();
            grid.add(particle1);
            grid.add(particle2);

            applyRepulsionForces(particle1, 5, grid);

            expect(Math.abs(particle1.ax)).toBeGreaterThan(0);
        });
    });

    describe('getDampingForMode', () => {
        it('should return correct damping for gravity mode', () => {
            const damping = getDampingForMode(MODES.GRAVITY);
            expect(damping).toBeGreaterThan(0);
            expect(damping).toBeLessThanOrEqual(1);
        });

        it('should return correct damping for magnetic mode', () => {
            const damping = getDampingForMode(MODES.MAGNETIC);
            expect(damping).toBeGreaterThan(0);
            expect(damping).toBeLessThanOrEqual(1);
        });

        it('should return correct damping for electric mode', () => {
            const damping = getDampingForMode(MODES.ELECTRIC);
            expect(damping).toBeGreaterThan(0);
            expect(damping).toBeLessThanOrEqual(1);
        });

        it('should return default damping for unknown mode', () => {
            const damping = getDampingForMode('unknown');
            expect(damping).toBeGreaterThan(0);
            expect(damping).toBeLessThanOrEqual(1);
        });
    });
});
