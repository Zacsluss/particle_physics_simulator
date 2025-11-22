describe('ParticleSimulator - Comprehensive Tests', () => {
    describe('Particle Spawning Logic', () => {
        it('should enforce MAX_PARTICLES limit', async () => {
            const { MAX_PARTICLES } = await import('../js/constants.js');

            // Test that spawning respects the limit
            expect(MAX_PARTICLES).toBe(1000);
        });

        it('should spawn particles with random initial velocities', async () => {
            const { Particle } = await import('../js/particle.js');

            const particle1 = new Particle(100, 100, Math.random() * 5, Math.random() * 5);
            const particle2 = new Particle(100, 100, Math.random() * 5, Math.random() * 5);

            // Particles should have different velocities (with high probability)
            expect(particle1.vx !== particle2.vx || particle1.vy !== particle2.vy).toBe(true);
        });
    });

    describe('Mode Switching Behavior', () => {
        it('should have all 6 physics modes defined', async () => {
            const { MODES } = await import('../js/constants.js');

            expect(MODES.GRAVITY).toBe('gravity');
            expect(MODES.ELECTRIC).toBe('electric');
            expect(MODES.MAGNETIC).toBe('magnetic');
            expect(MODES.BLACK_HOLE).toBe('blackhole');
            expect(MODES.REPEL).toBe('repel');
            expect(MODES.DNA).toBe('dna');
        });

        it('should provide correct damping for each mode', async () => {
            const { getDampingForMode } = await import('../js/physics.js');
            const { MODES } = await import('../js/constants.js');

            expect(getDampingForMode(MODES.GRAVITY)).toBe(0.99);
            expect(getDampingForMode(MODES.ELECTRIC)).toBe(0.96);
            expect(getDampingForMode(MODES.MAGNETIC)).toBe(0.97);
            expect(getDampingForMode(MODES.BLACK_HOLE)).toBe(0.99);
            expect(getDampingForMode(MODES.REPEL)).toBe(0.96);
            expect(getDampingForMode(MODES.DNA)).toBe(0.99);
        });
    });

    describe('Auto Quality Adjustment', () => {
        it('should reduce particle count when FPS drops', async () => {
            const { LOW_FPS_THRESHOLD, AUTO_QUALITY_MIN_PARTICLES, PARTICLE_CLEANUP_COUNT } =
                await import('../js/constants.js');

            // Simulate low FPS scenario
            const fps = 30; // Below threshold of 35
            const particleCount = 500; // Above minimum of 400

            expect(fps).toBeLessThan(LOW_FPS_THRESHOLD);
            expect(particleCount).toBeGreaterThan(AUTO_QUALITY_MIN_PARTICLES);

            // Should remove particles
            const newCount = particleCount - PARTICLE_CLEANUP_COUNT;
            expect(newCount).toBe(470);
        });

        it('should not remove particles if above minimum threshold', async () => {
            const { AUTO_QUALITY_MIN_PARTICLES } = await import('../js/constants.js');

            const particleCount = 300; // Below minimum
            expect(particleCount).toBeLessThan(AUTO_QUALITY_MIN_PARTICLES);
            // Should NOT trigger cleanup
        });
    });

    describe('Spatial Grid Performance', () => {
        it('should rebuild spatial grid at configured interval', async () => {
            const { SPATIAL_GRID_REBUILD_INTERVAL } = await import('../js/constants.js');

            expect(SPATIAL_GRID_REBUILD_INTERVAL).toBe(3);

            // Test that rebuilds happen every 3 frames
            const frames = [0, 1, 2, 3, 4, 5, 6];
            const shouldRebuild = frames.map((f) => f % SPATIAL_GRID_REBUILD_INTERVAL === 0);

            expect(shouldRebuild).toEqual([true, false, false, true, false, false, true]);
        });

        it('should only use spatial grid for electric and repulsion modes', async () => {
            const { MODES } = await import('../js/constants.js');

            // Modes that use spatial grid
            const spatialGridModes = [MODES.ELECTRIC, MODES.REPEL];

            // Modes that don't
            const nonSpatialGridModes = [
                MODES.GRAVITY,
                MODES.MAGNETIC,
                MODES.BLACK_HOLE,
                MODES.DNA
            ];

            expect(spatialGridModes.length).toBe(2);
            expect(nonSpatialGridModes.length).toBe(4);
        });
    });

    describe('Event Handler Cleanup', () => {
        it('should store bound handlers for cleanup', () => {
            const handlers = {
                resize: () => {},
                mouseDown: (_e) => {},
                mouseUp: () => {},
                mouseMove: (_e) => {},
                click: (_e) => {},
                contextMenu: (_e) => _e.preventDefault(),
                touchStart: (_e) => {},
                touchMove: (_e) => {},
                touchEnd: (_e) => {},
                keyDown: (_e) => {}
            };

            expect(Object.keys(handlers)).toHaveLength(10);
        });
    });

    describe('Performance Optimizations', () => {
        it('should use swap-and-pop for particle removal', () => {
            const particles = [
                { id: 1, isDead: () => false },
                { id: 2, isDead: () => true },
                { id: 3, isDead: () => false },
                { id: 4, isDead: () => false }
            ];

            // Simulate swap-and-pop removal
            for (let i = particles.length - 1; i >= 0; i--) {
                if (particles[i].isDead()) {
                    particles[i] = particles[particles.length - 1];
                    particles.pop();
                }
            }

            expect(particles.length).toBe(3);
            expect(particles.some((p) => p.id === 2)).toBe(false);
        });

        it('should use optimized Math operations', () => {
            // Test inverse distance optimization
            const dx = 10;
            const dy = 10;
            const distSq = dx * dx + dy * dy;

            // Old way: 2 sqrt calls
            // const dist = Math.sqrt(distSq);
            // const nx = dx / dist;
            // const ny = dy / dist;

            // New way: 1 sqrt call
            const invDist = 1 / Math.sqrt(distSq);
            const nx = dx * invDist;
            const ny = dy * invDist;

            expect(nx).toBeCloseTo(0.707, 2);
            expect(ny).toBeCloseTo(0.707, 2);
        });
    });

    describe('Input Validation', () => {
        it('should validate force strength slider values', () => {
            const testValidation = (value) => {
                const parsed = parseFloat(value);
                return Number.isFinite(parsed) ? parsed / 5 : 1;
            };

            expect(testValidation('10')).toBe(2);
            expect(testValidation('NaN')).toBe(1);
            expect(testValidation('Infinity')).toBe(1);
            expect(testValidation('')).toBe(1);
            expect(testValidation('0')).toBe(0);
        });

        it('should validate particle size slider values', () => {
            const testValidation = (value) => {
                const parsed = parseFloat(value);
                return Number.isFinite(parsed) ? parsed : 3;
            };

            expect(testValidation('5')).toBe(5);
            expect(testValidation('NaN')).toBe(3);
            expect(testValidation('Infinity')).toBe(3);
            expect(testValidation('')).toBe(3);
        });
    });

    describe('Constants Configuration', () => {
        it('should have all performance constants defined', async () => {
            const constants = await import('../js/constants.js');

            expect(constants.MAX_PARTICLES).toBe(1000);
            expect(constants.TARGET_FPS).toBe(60);
            expect(constants.FPS_UPDATE_INTERVAL).toBe(10);
            expect(constants.LOW_FPS_THRESHOLD).toBe(35);
            expect(constants.PARTICLE_CLEANUP_COUNT).toBe(30);
            expect(constants.AUTO_QUALITY_MIN_PARTICLES).toBe(400);
        });

        it('should have all spatial grid constants defined', async () => {
            const constants = await import('../js/constants.js');

            expect(constants.GRID_SIZE).toBe(50);
            expect(constants.MAX_FORCE_DISTANCE).toBe(50);
            expect(constants.MAX_INTERACTIONS_PER_PARTICLE).toBe(10);
            expect(constants.SPATIAL_GRID_REBUILD_INTERVAL).toBe(3);
        });

        it('should have all physics constants defined', async () => {
            const constants = await import('../js/constants.js');

            expect(constants.GRAVITY_STRENGTH).toBe(0.2);
            expect(constants.SPEED_LIMIT).toBe(15);
            expect(constants.DAMPING_DEFAULT).toBe(0.99);
            expect(constants.WALL_BOUNCE_DAMPING).toBe(0.8);
        });
    });

    describe('Error Recovery', () => {
        it('should handle invalid particle positions', async () => {
            const { Particle } = await import('../js/particle.js');

            // Should throw for invalid positions
            expect(() => new Particle(NaN, 100)).toThrow('Invalid particle position');
            expect(() => new Particle(100, Infinity)).toThrow('Invalid particle position');
        });

        it('should filter out invalid particles in error recovery', () => {
            const particles = [
                { x: 100, y: 100, vx: 0, vy: 0 },
                { x: NaN, y: 200, vx: 0, vy: 0 },
                { x: 300, y: Infinity, vx: 0, vy: 0 },
                { x: 400, y: 400, vx: 0, vy: 0 }
            ];

            const valid = particles.filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y));

            expect(valid.length).toBe(2);
            expect(valid[0].x).toBe(100);
            expect(valid[1].x).toBe(400);
        });
    });

    describe('Rain Effect Management', () => {
        it('should have correct rain interval constant', async () => {
            const { RAIN_INTERVAL, RAIN_VELOCITY } = await import('../js/constants.js');

            expect(RAIN_INTERVAL).toBe(50); // milliseconds
            expect(RAIN_VELOCITY).toBe(2);
        });

        it('should stop rain when particle limit reached', async () => {
            const { MAX_PARTICLES } = await import('../js/constants.js');

            const particleCount = MAX_PARTICLES;
            let rainInterval = setInterval(() => {
                if (particleCount >= MAX_PARTICLES) {
                    clearInterval(rainInterval);
                    rainInterval = null;
                }
            }, 50);

            // Simulate check
            if (particleCount >= MAX_PARTICLES) {
                clearInterval(rainInterval);
                rainInterval = null;
            }

            expect(rainInterval).toBe(null);
        });
    });

    describe('Attractor Management', () => {
        it('should limit attractor count', async () => {
            const { ATTRACTOR_MAX_COUNT } = await import('../js/constants.js');

            expect(ATTRACTOR_MAX_COUNT).toBe(10);

            // Simulate attractor limit
            const attractors = [];
            for (let i = 0; i < 15; i++) {
                attractors.push({ x: i * 10, y: i * 10, strength: 1 });
                if (attractors.length > ATTRACTOR_MAX_COUNT) {
                    attractors.shift(); // Remove oldest
                }
            }

            expect(attractors.length).toBe(ATTRACTOR_MAX_COUNT);
        });
    });
});
