import { test, expect } from '@playwright/test';

test.describe('Keyboard Shortcuts', () => {
    test('should clear particles with C key', async ({ page }) => {
        await page.goto('/');

        // Spawn particles
        await page.click('#explosionBtn');
        await page.waitForTimeout(200);

        // Press C to clear
        await page.keyboard.press('c');
        await page.waitForTimeout(100);

        const particleCount = await page.locator('#particleCount').textContent();
        expect(parseInt(particleCount)).toBe(0);
    });

    test('should spawn explosion with E key', async ({ page }) => {
        await page.goto('/');

        const particleCountBefore = await page.locator('#particleCount').textContent();
        const countBefore = parseInt(particleCountBefore);

        await page.keyboard.press('e');
        await page.waitForTimeout(200);

        const particleCountAfter = await page.locator('#particleCount').textContent();
        const countAfter = parseInt(particleCountAfter);

        expect(countAfter).toBeGreaterThan(countBefore);
    });

    test('should spawn galaxy with G key', async ({ page }) => {
        await page.goto('/');

        const particleCountBefore = await page.locator('#particleCount').textContent();
        const countBefore = parseInt(particleCountBefore);

        await page.keyboard.press('g');
        await page.waitForTimeout(200);

        const particleCountAfter = await page.locator('#particleCount').textContent();
        const countAfter = parseInt(particleCountAfter);

        expect(countAfter).toBeGreaterThan(countBefore);
    });

    test('should switch modes with number keys', async ({ page }) => {
        await page.goto('/');

        // Test each mode number key
        await page.keyboard.press('2');
        await expect(page.locator('#mode')).toHaveText('Electric');

        await page.keyboard.press('3');
        await expect(page.locator('#mode')).toHaveText('Magnetic');

        await page.keyboard.press('4');
        await expect(page.locator('#mode')).toHaveText('Blackhole');

        await page.keyboard.press('5');
        await expect(page.locator('#mode')).toHaveText('Repel');

        await page.keyboard.press('6');
        await expect(page.locator('#mode')).toHaveText('Dna');

        await page.keyboard.press('1');
        await expect(page.locator('#mode')).toHaveText('Gravity');
    });
});
