import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
    test('should not have any automatically detectable accessibility issues', async ({ page }) => {
        await page.goto('/');

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should have ARIA labels on mode buttons', async ({ page }) => {
        await page.goto('/');

        const gravityBtn = page.locator('#gravityBtn');
        await expect(gravityBtn).toHaveAttribute('aria-label', /gravity/i);

        const electricBtn = page.locator('#electricBtn');
        await expect(electricBtn).toHaveAttribute('aria-label', /electric/i);
    });

    test('should have proper heading structure', async ({ page }) => {
        await page.goto('/');

        // Check for h4 headings in controls
        const headings = page.locator('h4');
        await expect(headings).toHaveCount(3); // Particle Controls, Spawn Presets, Particle Spawn Effects
    });

    test('should have live regions for dynamic content', async ({ page }) => {
        await page.goto('/');

        const liveRegions = page.locator('[aria-live="polite"]');
        const count = await liveRegions.count();
        expect(count).toBeGreaterThan(0);
    });

    test('should navigate with tab key', async ({ page }) => {
        await page.goto('/');

        // Tab through controls
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');

        // Check if a button has focus
        const focusedElement = await page.evaluate(() => document.activeElement.tagName);
        expect(['BUTTON', 'INPUT']).toContain(focusedElement);
    });
});
