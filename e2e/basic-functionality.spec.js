import { test, expect } from '@playwright/test';

test.describe('Basic Functionality', () => {
    test('should load the simulator page', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle('Particle Physics Simulator');
    });

    test('should display canvas element', async ({ page }) => {
        await page.goto('/');
        const canvas = page.locator('#canvas');
        await expect(canvas).toBeVisible();
    });

    test('should display control panel', async ({ page }) => {
        await page.goto('/');
        const controls = page.locator('#controls');
        await expect(controls).toBeVisible();
    });

    test('should show particle count', async ({ page }) => {
        await page.goto('/');
        const particleCount = page.locator('#particleCount');
        await expect(particleCount).toBeVisible();
        const count = await particleCount.textContent();
        expect(parseInt(count)).toBeGreaterThanOrEqual(0);
    });

    test('should show FPS counter', async ({ page }) => {
        await page.goto('/');
        const fps = page.locator('#fps');
        await expect(fps).toBeVisible();
        // Wait a moment for FPS to update
        await page.waitForTimeout(500);
        const fpsValue = await fps.textContent();
        expect(parseInt(fpsValue)).toBeGreaterThan(0);
    });

    test('should show current mode', async ({ page }) => {
        await page.goto('/');
        const mode = page.locator('#mode');
        await expect(mode).toBeVisible();
        const modeText = await mode.textContent();
        expect(modeText).toBeTruthy();
    });
});
