'use strict';

/**
 * Configuration constants for the Particle Physics Simulator
 * All magic numbers extracted here for easy maintenance and tuning
 */

// Performance Configuration
export const MAX_PARTICLES = 1000; // Maximum particle count optimized for smooth 60 FPS rendering
export const TARGET_FPS = 60;
export const FPS_UPDATE_INTERVAL = 10; // Update FPS display every N frames
export const LOW_FPS_THRESHOLD = 35; // Trigger particle cleanup if FPS drops below this
export const PARTICLE_CLEANUP_COUNT = 30; // Remove this many particles when FPS is low
export const AUTO_QUALITY_MIN_PARTICLES = 400; // Minimum particles before auto quality adjustment kicks in

// Spatial Grid Optimization
export const GRID_SIZE = 50; // Size of each grid cell in pixels
export const MAX_FORCE_DISTANCE = 50; // Maximum distance for force calculations
export const MAX_INTERACTIONS_PER_PARTICLE = 10; // Limit particle-to-particle interactions
export const SPATIAL_GRID_REBUILD_INTERVAL = 3; // Rebuild grid every N frames (optimized from 2)

// Physics Constants
export const GRAVITY_STRENGTH = 0.2; // Base gravity acceleration
export const SPEED_LIMIT = 15; // Maximum particle velocity to prevent runaway
export const DAMPING_DEFAULT = 0.99; // Default velocity damping factor
export const DAMPING_MAGNETIC = 0.97; // Damping for magnetic mode
export const DAMPING_ELECTRIC = 0.96; // Damping for electric/repulsion modes
export const WALL_BOUNCE_DAMPING = 0.8; // Energy loss on wall collision
export const PARTICLE_SIZE_AGE_MULTIPLIER = 1.5; // Maximum size multiplier from age effects

// Math Constants (cached for performance)
export const TWO_PI = Math.PI * 2;
export const HALF_PI = Math.PI / 2;

// Particle Properties
export const DEFAULT_PARTICLE_SIZE = 3;
export const MIN_PARTICLE_SIZE = 1;
export const MAX_PARTICLE_SIZE = 5;
export const PARTICLE_HUE_INCREMENT = 0.5; // Color change per frame
export const PARTICLE_PULSE_SPEED = 0.05; // Aura pulsing speed
export const PARTICLE_AGE_FACTOR = 0.03; // Size variation based on age

// Visual Effects
export const AURA_SIZE_MULTIPLIER = 1.5; // Aura size relative to particle
export const AURA_PULSE_AMPLITUDE = 0.5; // Aura pulsing intensity
export const AURA_OPACITY = 0.15; // Base aura transparency
export const CANVAS_FADE_ALPHA = 0.15; // Trail fade effect

// Mode-Specific Physics
export const BLACK_HOLE_RADIUS = 50; // Visual size of black hole
export const BLACK_HOLE_EVENT_HORIZON = 15; // Consumption distance
export const BLACK_HOLE_INNER_RADIUS = 35; // Inner visual ring
export const BLACK_HOLE_SINGULARITY_RADIUS = 10; // Central event horizon

export const DNA_HELIX_RADIUS = 120; // Radius of DNA helix
export const DNA_HELIX_HEIGHT = 200; // Vertical oscillation amplitude
export const DNA_HELIX_SPEED = 0.003; // Animation speed

// Spawn Presets
export const EXPLOSION_COUNT = 100;
export const EXPLOSION_MIN_SPEED = 5;
export const EXPLOSION_MAX_SPEED = 10;
export const EXPLOSION_SPAWN_RADIUS = 20; // Spawn radius for black hole mode

export const GALAXY_COUNT = 200;
export const GALAXY_MAX_RADIUS = 200;
export const GALAXY_ORBITAL_CONSTANT = 50; // For orbital velocity calculation

export const RAIN_INTERVAL = 50; // Milliseconds between rain drops
export const RAIN_VELOCITY = 2;

export const CLICK_SPAWN_COUNT = 5;
export const CLICK_SPAWN_SPREAD = 20;

export const TOUCH_SPAWN_COUNT = 3;
export const TOUCH_SPAWN_SPREAD = 15;

// UI Configuration
export const FORCE_SLIDER_MIN = 0;
export const FORCE_SLIDER_MAX = 20;
export const FORCE_SLIDER_DEFAULT = 5;
export const FORCE_NORMALIZATION = 5; // Divide slider value by this

export const SIZE_SLIDER_MIN = 1;
export const SIZE_SLIDER_MAX = 5;
export const SIZE_SLIDER_DEFAULT = 3;

// Attractor Configuration
export const ATTRACTOR_VISUAL_RADIUS_OUTER = 20;
export const ATTRACTOR_VISUAL_RADIUS_INNER = 10;
export const ATTRACTOR_FORCE_MULTIPLIER = 100;
export const ATTRACTOR_MAX_COUNT = 10; // Prevent memory leak by limiting attractors

// Touch Gesture Configuration
export const PINCH_IN_THRESHOLD = 0.9; // Ratio for pinch-in detection
export const PINCH_OUT_THRESHOLD = 1.1; // Ratio for pinch-out detection
export const PINCH_EXPLOSION_COUNT = 20;
export const PINCH_EXPLOSION_MIN_SPEED = 5;
export const PINCH_EXPLOSION_MAX_SPEED = 10;
export const PINCH_ATTRACTOR_STRENGTH = 10;

// Frame Skipping (Performance)
export const FRAME_SKIP_PARTICLE_THRESHOLD = 500; // Start frame skipping above this count
export const FRAME_SKIP_RATE = 2; // Skip every Nth frame for physics updates
export const SIZE_UPDATE_INTERVAL = 3; // Update particle size every N frames

// Physics Mode Names
export const MODES = {
    GRAVITY: 'gravity',
    ELECTRIC: 'electric',
    MAGNETIC: 'magnetic',
    BLACK_HOLE: 'blackhole',
    REPEL: 'repel',
    DNA: 'dna'
};

// Accessibility
export const KEYBOARD_CONTROLS_ENABLED = true;
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
