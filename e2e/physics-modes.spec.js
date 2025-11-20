import { test, expect } from '@playwright/test';

test.describe('Physics Modes', () => {
    test('should switch to gravity mode', async ({ page }) => {
        await page.goto('/');
        await page.click('#gravityBtn');
        const mode = page.locator('#mode');
        await expect(mode).toHaveText('Gravity');
    });

    test('should switch to electric field mode', async ({ page }) => {
        await page.goto('/');
        await page.click('#electricBtn');
        const mode = page.locator('#mode');
        await expect(mode).toHaveText('Electric');
    });

    test('should switch to magnetic field mode', async ({ page }) => {
        await page.goto('/');
        await page.click('#magneticBtn');
        const mode = page.locator('#mode');
        await expect(mode).toHaveText('Magnetic');
    });

    test('should switch to black hole mode', async ({ page }) => {
        await page.goto('/');
        await page.click('#blackholeBtn');
        const mode = page.locator('#mode');
        await expect(mode).toHaveText('Blackhole');
    });

    test('should switch to repulsion mode', async ({ page }) => {
        await page.goto('/');
        await page.click('#repelBtn');
        const mode = page.locator('#mode');
        await expect(mode).toHaveText('Repel');
    });

    test('should switch to DNA helix mode', async ({ page }) => {
        await page.goto('/');
        await page.click('#dnaBtn');
        const mode = page.locator('#mode');
        await expect(mode).toHaveText('Dna');
    });

    test('should highlight active mode button', async ({ page }) => {
        await page.goto('/');
        await page.click('#electricBtn');
        const btn = page.locator('#electricBtn');
        await expect(btn).toHaveClass(/active/);
    });
});
