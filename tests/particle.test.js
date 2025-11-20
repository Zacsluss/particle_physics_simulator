import { Particle } from '../js/particle.js';

describe('Particle', () => {
    describe('constructor', () => {
        it('should create particle with valid parameters', () => {
            const particle = new Particle(100, 200, 5, 10);

            expect(particle.x).toBe(100);
            expect(particle.y).toBe(200);
            expect(particle.vx).toBe(5);
            expect(particle.vy).toBe(10);
        });

        it('should initialize with default velocity when not provided', () => {
            const particle = new Particle(100, 200);

            expect(particle.vx).toBe(0);
            expect(particle.vy).toBe(0);
        });

        it('should throw error for invalid position (NaN)', () => {
            expect(() => new Particle(NaN, 100)).toThrow('Invalid particle position');
            expect(() => new Particle(100, NaN)).toThrow('Invalid particle position');
        });

        it('should throw error for invalid position (Infinity)', () => {
            expect(() => new Particle(Infinity, 100)).toThrow('Invalid particle position');
            expect(() => new Particle(100, -Infinity)).toThrow('Invalid particle position');
        });

        it('should throw error for invalid velocity', () => {
            expect(() => new Particle(100, 100, NaN, 0)).toThrow('Invalid particle velocity');
            expect(() => new Particle(100, 100, 0, Infinity)).toThrow('Invalid particle velocity');
        });

        it('should initialize acceleration to zero', () => {
            const particle = new Particle(100, 200);

            expect(particle.ax).toBe(0);
            expect(particle.ay).toBe(0);
        });

        it('should initialize visual properties', () => {
            const particle = new Particle(100, 200);

            expect(particle.size).toBeDefined();
            expect(particle.baseSize).toBeDefined();
            expect(particle.hue).toBeGreaterThanOrEqual(0);
            expect(particle.hue).toBeLessThanOrEqual(360);
        });

        it('should initialize state properties', () => {
            const particle = new Particle(100, 200);

            expect(particle.life).toBe(1);
            expect(particle.age).toBe(0);
            expect([-1, 1]).toContain(particle.charge);
        });
    });

    describe('resetAcceleration', () => {
        it('should reset acceleration to zero', () => {
            const particle = new Particle(100, 200);
            particle.ax = 5;
            particle.ay = 10;

            particle.resetAcceleration();

            expect(particle.ax).toBe(0);
            expect(particle.ay).toBe(0);
        });
    });

    describe('applyForce', () => {
        it('should add force to acceleration', () => {
            const particle = new Particle(100, 200);

            particle.applyForce(5, 10);

            expect(particle.ax).toBe(5);
            expect(particle.ay).toBe(10);
        });

        it('should accumulate multiple forces', () => {
            const particle = new Particle(100, 200);

            particle.applyForce(5, 10);
            particle.applyForce(3, 7);

            expect(particle.ax).toBe(8);
            expect(particle.ay).toBe(17);
        });
    });

    describe('update', () => {
        let particle;
        const canvasWidth = 800;
        const canvasHeight = 600;
        const damping = 0.99;
        const maxSpeed = 15;

        beforeEach(() => {
            particle = new Particle(400, 300);
        });

        it('should update velocity based on acceleration', () => {
            particle.applyForce(2, 3);
            particle.update(1, damping, maxSpeed, canvasWidth, canvasHeight, 0);

            expect(particle.vx).toBeCloseTo(2 * damping, 5);
            expect(particle.vy).toBeCloseTo(3 * damping, 5);
        });

        it('should update position based on velocity', () => {
            particle.vx = 10;
            particle.vy = 5;
            particle.update(1, damping, maxSpeed, canvasWidth, canvasHeight, 0);

            expect(particle.x).toBeCloseTo(400 + 10 * damping, 5);
            expect(particle.y).toBeCloseTo(300 + 5 * damping, 5);
        });

        it('should enforce speed limit', () => {
            particle.vx = 100;
            particle.vy = 100;
            particle.update(1, damping, maxSpeed, canvasWidth, canvasHeight, 0);

            const speed = Math.sqrt(particle.vx ** 2 + particle.vy ** 2);
            expect(speed).toBeCloseTo(maxSpeed, 1); // Allow floating point precision
        });

        it('should bounce off left wall', () => {
            particle.x = 5;
            particle.vx = -10;
            particle.update(1, damping, maxSpeed, canvasWidth, canvasHeight, 0);

            expect(particle.x).toBeGreaterThanOrEqual(0);
            expect(particle.vx).toBeGreaterThan(0); // Should reverse direction
        });

        it('should bounce off right wall', () => {
            particle.x = canvasWidth - 5;
            particle.vx = 10;
            particle.update(1, damping, maxSpeed, canvasWidth, canvasHeight, 0);

            expect(particle.x).toBeLessThanOrEqual(canvasWidth);
            expect(particle.vx).toBeLessThan(0); // Should reverse direction
        });

        it('should bounce off top wall', () => {
            particle.y = 5;
            particle.vy = -10;
            particle.update(1, damping, maxSpeed, canvasWidth, canvasHeight, 0);

            expect(particle.y).toBeGreaterThanOrEqual(0);
            expect(particle.vy).toBeGreaterThan(0); // Should reverse direction
        });

        it('should bounce off bottom wall', () => {
            particle.y = canvasHeight - 5;
            particle.vy = 10;
            particle.update(1, damping, maxSpeed, canvasWidth, canvasHeight, 0);

            expect(particle.y).toBeLessThanOrEqual(canvasHeight);
            expect(particle.vy).toBeLessThan(0); // Should reverse direction
        });

        it('should update age', () => {
            const initialAge = particle.age;
            particle.update(1, damping, maxSpeed, canvasWidth, canvasHeight, 0);

            expect(particle.age).toBeGreaterThan(initialAge);
        });

        it('should update hue over time', () => {
            const initialHue = particle.hue;
            particle.update(1, damping, maxSpeed, canvasWidth, canvasHeight, 0);

            expect(particle.hue).not.toBe(initialHue);
        });

        it('should respect deltaTime multiplier', () => {
            particle.vx = 10;
            const dt = 0.5;
            particle.update(dt, damping, maxSpeed, canvasWidth, canvasHeight, 0);

            expect(particle.x).toBeCloseTo(400 + 10 * damping * dt, 5);
        });
    });

    describe('draw', () => {
        it('should call canvas drawing methods', () => {
            const particle = new Particle(100, 200);
            const mockCtx = {
                fillStyle: '',
                beginPath: vi.fn(),
                arc: vi.fn(),
                fill: vi.fn()
            };

            particle.draw(mockCtx);

            expect(mockCtx.beginPath).toHaveBeenCalled();
            expect(mockCtx.arc).toHaveBeenCalled();
            expect(mockCtx.fill).toHaveBeenCalled();
        });
    });

    describe('isDead', () => {
        it('should return false for alive particle', () => {
            const particle = new Particle(100, 200);
            expect(particle.isDead()).toBe(false);
        });

        it('should return true when life is zero', () => {
            const particle = new Particle(100, 200);
            particle.life = 0;
            expect(particle.isDead()).toBe(true);
        });

        it('should return true when life is negative', () => {
            const particle = new Particle(100, 200);
            particle.life = -1;
            expect(particle.isDead()).toBe(true);
        });
    });

    describe('kill', () => {
        it('should set life to zero', () => {
            const particle = new Particle(100, 200);
            particle.kill();
            expect(particle.life).toBe(0);
        });

        it('should make particle dead', () => {
            const particle = new Particle(100, 200);
            particle.kill();
            expect(particle.isDead()).toBe(true);
        });
    });

    describe('setSize', () => {
        it('should update base size and current size', () => {
            const particle = new Particle(100, 200);
            particle.setSize(5);

            expect(particle.baseSize).toBe(5);
            expect(particle.size).toBe(5);
        });
    });
});
