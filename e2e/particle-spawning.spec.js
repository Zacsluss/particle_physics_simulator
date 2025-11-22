import { test, expect } from '@playwright/test';

test.describe('Particle Spawning', () => {
    test('should spawn particles on explosion button click', async ({ page }) => {
        await page.goto('/');

        // Get initial particle count
        const particleCountBefore = await page.locator('#particleCount').textContent();
        const countBefore = parseInt(particleCountBefore);

        // Click explosion button
        await page.click('#explosionBtn');

        // Wait for particles to spawn
        await page.waitForTimeout(200);

        // Get new particle count
        const particleCountAfter = await page.locator('#particleCount').textContent();
        const countAfter = parseInt(particleCountAfter);

        // Should have more particles
        expect(countAfter).toBeGreaterThan(countBefore);
    });

    test('should spawn particles on galaxy button click', async ({ page }) => {
        await page.goto('/');

        const particleCountBefore = await page.locator('#particleCount').textContent();
        const countBefore = parseInt(particleCountBefore);

        await page.click('#galaxyBtn');
        await page.waitForTimeout(200);

        const particleCountAfter = await page.locator('#particleCount').textContent();
        const countAfter = parseInt(particleCountAfter);

        expect(countAfter).toBeGreaterThan(countBefore);
    });

    test('should spawn particles on rain button click', async ({ page }) => {
        await page.goto('/');

        const particleCountBefore = await page.locator('#particleCount').textContent();
        const countBefore = parseInt(particleCountBefore);

        await page.click('#rainBtn');
        await page.waitForTimeout(300);

        const particleCountAfter = await page.locator('#particleCount').textContent();
        const countAfter = parseInt(particleCountAfter);

        expect(countAfter).toBeGreaterThan(countBefore);
    });

    test('should clear all particles', async ({ page }) => {
        await page.goto('/');

        // Spawn some particles
        await page.click('#explosionBtn');
        await page.waitForTimeout(200);

        // Clear them
        await page.click('#clearBtn');
        await page.waitForTimeout(100);

        // Check count is 0
        const particleCount = await page.locator('#particleCount').textContent();
        expect(parseInt(particleCount)).toBe(0);
    });

    test('should spawn particles on canvas click', async ({ page }) => {
        await page.goto('/');

        const canvas = page.locator('#canvas');
        await canvas.click({ position: { x: 400, y: 300 } });
        await page.waitForTimeout(100);

        const particleCount = await page.locator('#particleCount').textContent();
        expect(parseInt(particleCount)).toBeGreaterThan(0);
    });
});
