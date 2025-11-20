/**
 * TypeScript definitions for constants.js
 * Provides type safety for configuration constants
 */

// Performance Configuration
export const MAX_PARTICLES: number;
export const TARGET_FPS: number;
export const FPS_UPDATE_INTERVAL: number;
export const LOW_FPS_THRESHOLD: number;
export const PARTICLE_CLEANUP_COUNT: number;
export const AUTO_QUALITY_MIN_PARTICLES: number;

// Spatial Grid Optimization
export const GRID_SIZE: number;
export const MAX_FORCE_DISTANCE: number;
export const MAX_INTERACTIONS_PER_PARTICLE: number;
export const SPATIAL_GRID_REBUILD_INTERVAL: number;

// Physics Constants
export const GRAVITY_STRENGTH: number;
export const SPEED_LIMIT: number;
export const DAMPING_DEFAULT: number;
export const DAMPING_MAGNETIC: number;
export const DAMPING_ELECTRIC: number;
export const WALL_BOUNCE_DAMPING: number;
export const PARTICLE_SIZE_AGE_MULTIPLIER: number;

// Math Constants
export const TWO_PI: number;
export const HALF_PI: number;

// Particle Properties
export const DEFAULT_PARTICLE_SIZE: number;
export const MIN_PARTICLE_SIZE: number;
export const MAX_PARTICLE_SIZE: number;
export const PARTICLE_HUE_INCREMENT: number;
export const PARTICLE_PULSE_SPEED: number;
export const PARTICLE_AGE_FACTOR: number;

// Visual Effects
export const AURA_SIZE_MULTIPLIER: number;
export const AURA_PULSE_AMPLITUDE: number;
export const AURA_OPACITY: number;
export const CANVAS_FADE_ALPHA: number;

// Mode-Specific Physics
export const BLACK_HOLE_RADIUS: number;
export const BLACK_HOLE_EVENT_HORIZON: number;
export const BLACK_HOLE_INNER_RADIUS: number;
export const BLACK_HOLE_SINGULARITY_RADIUS: number;

export const DNA_HELIX_RADIUS: number;
export const DNA_HELIX_HEIGHT: number;
export const DNA_HELIX_SPEED: number;

// Spawn Presets
export const EXPLOSION_COUNT: number;
export const EXPLOSION_MIN_SPEED: number;
export const EXPLOSION_MAX_SPEED: number;
export const EXPLOSION_SPAWN_RADIUS: number;

export const GALAXY_COUNT: number;
export const GALAXY_MAX_RADIUS: number;
export const GALAXY_ORBITAL_CONSTANT: number;

export const RAIN_INTERVAL: number;
export const RAIN_VELOCITY: number;

export const CLICK_SPAWN_COUNT: number;
export const CLICK_SPAWN_SPREAD: number;

export const TOUCH_SPAWN_COUNT: number;
export const TOUCH_SPAWN_SPREAD: number;

// UI Configuration
export const FORCE_SLIDER_MIN: number;
export const FORCE_SLIDER_MAX: number;
export const FORCE_SLIDER_DEFAULT: number;
export const FORCE_NORMALIZATION: number;

export const SIZE_SLIDER_MIN: number;
export const SIZE_SLIDER_MAX: number;
export const SIZE_SLIDER_DEFAULT: number;

// Attractor Configuration
export const ATTRACTOR_VISUAL_RADIUS_OUTER: number;
export const ATTRACTOR_VISUAL_RADIUS_INNER: number;
export const ATTRACTOR_FORCE_MULTIPLIER: number;
export const ATTRACTOR_MAX_COUNT: number;

// Touch Gesture Configuration
export const PINCH_IN_THRESHOLD: number;
export const PINCH_OUT_THRESHOLD: number;
export const PINCH_EXPLOSION_COUNT: number;
export const PINCH_ATTRACTOR_STRENGTH: number;

// Frame Skipping
export const FRAME_SKIP_PARTICLE_THRESHOLD: number;
export const FRAME_SKIP_RATE: number;
export const SIZE_UPDATE_INTERVAL: number;

// Physics Modes
export const MODES: {
    readonly GRAVITY: 'gravity';
    readonly ELECTRIC: 'electric';
    readonly MAGNETIC: 'magnetic';
    readonly BLACK_HOLE: 'blackhole';
    readonly REPEL: 'repel';
    readonly DNA: 'dna';
};

export type PhysicsMode = typeof MODES[keyof typeof MODES];

// Accessibility
export const KEYBOARD_CONTROLS_ENABLED: boolean;
export const REDUCED_MOTION_QUERY: string;
