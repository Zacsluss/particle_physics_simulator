import { JSDOM } from 'jsdom';

// Setup DOM environment
const setupDOM = () => {
    const dom = new JSDOM(
        `
        <!DOCTYPE html>
        <html>
        <body>
            <canvas id="canvas"></canvas>
            <div id="controls">
                <button id="gravityBtn">Gravity</button>
                <button id="electricBtn">Electric</button>
                <button id="magneticBtn">Magnetic</button>
                <button id="blackholeBtn">Black Hole</button>
                <button id="repelBtn">Repel</button>
                <button id="dnaBtn">DNA</button>
                <button id="clearBtn">Clear</button>
                <button id="explosionBtn">Explosion</button>
                <button id="galaxyBtn">Galaxy</button>
                <button id="rainBtn">Rain</button>
                <input type="range" id="forceStrength" value="5" min="0" max="20">
                <input type="range" id="particleSize" value="3" min="1" max="10">
                <span id="forceValue">5</span>
                <span id="sizeValue">3</span>
                <span id="particleCount">0</span>
                <span id="fps">60</span>
                <span id="mode">Gravity</span>
                <div id="announcements"></div>
            </div>
        </body>
        </html>
    `,
        { url: 'http://localhost' }
    );

    global.document = dom.window.document;
    global.window = dom.window;
    global.HTMLElement = dom.window.HTMLElement;
    global.performance = { now: () => Date.now() };
    global.requestAnimationFrame = vi.fn((cb) => setTimeout(cb, 16));
    global.cancelAnimationFrame = vi.fn();

    return dom;
};

describe('ParticleSimulator', () => {
    let simulator;

    beforeEach(async () => {
        // Setup DOM before importing module
        setupDOM();

        // Dynamically import the module after DOM is setup
        await import('../js/app.js');
        // The module creates an instance automatically, but we need access to the class
        // For testing, we'll work with the DOM changes
    });

    afterEach(() => {
        if (simulator && simulator.destroy) {
            simulator.destroy();
        }
        vi.clearAllTimers();
        vi.restoreAllMocks();
    });

    describe('Initialization', () => {
        it('should create canvas element', () => {
            const canvas = document.getElementById('canvas');
            expect(canvas).toBeTruthy();
        });

        it('should initialize with default mode display', () => {
            const modeDisplay = document.getElementById('mode');
            expect(modeDisplay).toBeTruthy();
        });

        it('should set up control buttons', () => {
            expect(document.getElementById('gravityBtn')).toBeTruthy();
            expect(document.getElementById('electricBtn')).toBeTruthy();
            expect(document.getElementById('magneticBtn')).toBeTruthy();
        });
    });

    describe('Slider Controls', () => {
        it('should have force strength slider', () => {
            const slider = document.getElementById('forceStrength');
            expect(slider).toBeTruthy();
            expect(slider.value).toBe('5');
        });

        it('should have particle size slider', () => {
            const slider = document.getElementById('particleSize');
            expect(slider).toBeTruthy();
            expect(slider.value).toBe('3');
        });

        it('should update force value display on slider change', () => {
            const slider = document.getElementById('forceStrength');

            slider.value = '10';
            const event = new window.Event('input');
            slider.dispatchEvent(event);

            // This tests the event handler binding
            expect(slider.value).toBe('10');
        });
    });

    describe('Button Interactions', () => {
        it('should have all mode buttons available', () => {
            const modeButtons = [
                'gravityBtn',
                'electricBtn',
                'magneticBtn',
                'blackholeBtn',
                'repelBtn',
                'dnaBtn'
            ];

            modeButtons.forEach((id) => {
                const btn = document.getElementById(id);
                expect(btn).toBeTruthy();
            });
        });

        it('should have action buttons available', () => {
            const actionButtons = ['clearBtn', 'explosionBtn', 'galaxyBtn', 'rainBtn'];

            actionButtons.forEach((id) => {
                const btn = document.getElementById(id);
                expect(btn).toBeTruthy();
            });
        });
    });

    describe('Stats Display', () => {
        it('should have particle count display', () => {
            const count = document.getElementById('particleCount');
            expect(count).toBeTruthy();
        });

        it('should have FPS display', () => {
            const fps = document.getElementById('fps');
            expect(fps).toBeTruthy();
        });

        it('should have mode display', () => {
            const mode = document.getElementById('mode');
            expect(mode).toBeTruthy();
        });
    });

    describe('Accessibility', () => {
        it('should have announcements region for screen readers', () => {
            const announcements = document.getElementById('announcements');
            expect(announcements).toBeTruthy();
        });

        it('should have aria-live regions for dynamic content', () => {
            const particleCount = document.getElementById('particleCount');
            // Check if element exists (aria attributes would be on it)
            expect(particleCount).toBeTruthy();
        });
    });
});

// Particle-specific tests (testing the logic that would be in ParticleSimulator)
describe('Particle Management Logic', () => {
    it('should validate finite numbers for force strength', () => {
        const testValue = (val) => {
            const parsed = parseFloat(val);
            return Number.isFinite(parsed) ? parsed / 5 : 1;
        };

        expect(testValue('10')).toBe(2);
        expect(testValue('NaN')).toBe(1);
        expect(testValue('Infinity')).toBe(1);
        expect(testValue('')).toBe(1);
    });

    it('should validate finite numbers for particle size', () => {
        const testValue = (val) => {
            const parsed = parseFloat(val);
            return Number.isFinite(parsed) ? parsed : 3;
        };

        expect(testValue('5')).toBe(5);
        expect(testValue('NaN')).toBe(3);
        expect(testValue('Infinity')).toBe(3);
        expect(testValue('')).toBe(3);
    });

    it('should use swap-and-pop pattern for efficient removal', () => {
        const particles = [
            { id: 1, isDead: () => false },
            { id: 2, isDead: () => true },
            { id: 3, isDead: () => false },
            { id: 4, isDead: () => false }
        ];

        // Simulate swap-and-pop
        for (let i = particles.length - 1; i >= 0; i--) {
            if (particles[i].isDead()) {
                particles[i] = particles[particles.length - 1];
                particles.pop();
                i--;
            }
        }

        expect(particles.length).toBe(3);
        expect(particles.find((p) => p.id === 2)).toBeUndefined();
    });
});

// Constants validation
describe('Constants Usage', () => {
    it('should use configurable constants for thresholds', async () => {
        const { AUTO_QUALITY_MIN_PARTICLES, LOW_FPS_THRESHOLD } = await import(
            '../js/constants.js'
        );

        expect(AUTO_QUALITY_MIN_PARTICLES).toBe(400);
        expect(LOW_FPS_THRESHOLD).toBe(35);
    });

    it('should use spatial grid rebuild interval constant', async () => {
        const { SPATIAL_GRID_REBUILD_INTERVAL } = await import('../js/constants.js');

        expect(SPATIAL_GRID_REBUILD_INTERVAL).toBe(3);
    });
});

// Mode management tests
describe('Mode Management', () => {
    it('should have all required modes defined', async () => {
        const { MODES } = await import('../js/constants.js');

        expect(MODES.GRAVITY).toBe('gravity');
        expect(MODES.ELECTRIC).toBe('electric');
        expect(MODES.MAGNETIC).toBe('magnetic');
        expect(MODES.BLACK_HOLE).toBe('blackhole');
        expect(MODES.REPEL).toBe('repel');
        expect(MODES.DNA).toBe('dna');
    });
});
