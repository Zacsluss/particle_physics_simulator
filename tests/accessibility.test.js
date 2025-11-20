import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Accessibility', () => {
    let dom;
    let document;

    beforeEach(() => {
        // Read the HTML file
        const html = fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf-8');
        dom = new JSDOM(html);
        document = dom.window.document;
    });

    describe('ARIA Labels', () => {
        it('should have ARIA labels on all buttons', () => {
            const buttons = document.querySelectorAll('button');
            expect(buttons.length).toBeGreaterThan(0);

            buttons.forEach((btn) => {
                expect(btn.hasAttribute('aria-label')).toBe(true);
            });
        });

        it('should have ARIA labels on all sliders', () => {
            const sliders = document.querySelectorAll('input[type="range"]');
            expect(sliders.length).toBeGreaterThan(0);

            sliders.forEach((slider) => {
                expect(slider.hasAttribute('aria-label')).toBe(true);
            });
        });

        it('should have ARIA live regions for dynamic content', () => {
            const liveRegions = document.querySelectorAll('[aria-live="polite"]');
            expect(liveRegions.length).toBeGreaterThan(0);
        });
    });

    describe('Semantic HTML', () => {
        it('should use semantic aside element for control panel', () => {
            const aside = document.querySelector('aside[role="region"]');
            expect(aside).toBeTruthy();
            expect(aside.hasAttribute('aria-label')).toBe(true);
        });

        it('should have proper section elements', () => {
            const sections = document.querySelectorAll('section[aria-label]');
            expect(sections.length).toBeGreaterThan(0);
        });

        it('should have canvas with role and aria-label', () => {
            const canvas = document.querySelector('canvas');
            expect(canvas).toBeTruthy();
            expect(canvas.hasAttribute('role')).toBe(true);
            expect(canvas.hasAttribute('aria-label')).toBe(true);
        });
    });

    describe('Document Structure', () => {
        it('should have a valid document title', () => {
            const title = document.querySelector('title');
            expect(title).toBeTruthy();
            expect(title.textContent.length).toBeGreaterThan(0);
        });

        it('should have meta description', () => {
            const metaDesc = document.querySelector('meta[name="description"]');
            expect(metaDesc).toBeTruthy();
            expect(metaDesc.getAttribute('content').length).toBeGreaterThan(0);
        });

        it('should have meta keywords', () => {
            const metaKeywords = document.querySelector('meta[name="keywords"]');
            expect(metaKeywords).toBeTruthy();
        });

        it('should have lang attribute on html element', () => {
            const html = document.querySelector('html');
            expect(html.hasAttribute('lang')).toBe(true);
            expect(html.getAttribute('lang')).toBe('en');
        });
    });

    describe('Form Controls', () => {
        it('should have labels for all sliders', () => {
            const sliders = document.querySelectorAll('input[type="range"]');

            sliders.forEach((slider) => {
                const label = document.querySelector(`label[for="${slider.id}"]`);
                expect(label || slider.hasAttribute('aria-label')).toBeTruthy();
            });
        });

        it('should have visible value displays for sliders', () => {
            const forceValue = document.getElementById('forceValue');
            const sizeValue = document.getElementById('sizeValue');

            expect(forceValue).toBeTruthy();
            expect(sizeValue).toBeTruthy();
        });
    });

    describe('Keyboard Accessibility', () => {
        it('should have documentation of keyboard controls', () => {
            const controlsInfo = document.getElementById('controls-info');
            expect(controlsInfo).toBeTruthy();

            const text = controlsInfo.textContent.toLowerCase();
            expect(text).toContain('space');
            expect(text).toContain('keys');
        });
    });

    describe('Screen Reader Support', () => {
        it('should have announcement region for screen readers', () => {
            const announcements = document.getElementById('announcements');
            expect(announcements).toBeTruthy();
            expect(announcements.getAttribute('role')).toBe('status');
            expect(announcements.getAttribute('aria-live')).toBe('polite');
        });

        it('should have sr-only class for screen reader text', () => {
            const srOnly = document.querySelector('.sr-only');
            expect(srOnly).toBeTruthy();
        });
    });

    describe('No Script Fallback', () => {
        it('should have noscript element with helpful message', () => {
            const noscript = document.querySelector('noscript');
            expect(noscript).toBeTruthy();

            const message = noscript.textContent.toLowerCase();
            expect(message).toContain('javascript');
        });
    });

    describe('Button Accessibility', () => {
        it('should have mode buttons with descriptive labels', () => {
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
                expect(btn.hasAttribute('aria-label')).toBe(true);

                const ariaLabel = btn.getAttribute('aria-label');
                expect(ariaLabel.length).toBeGreaterThan(0);
            });
        });

        it('should have action buttons with descriptive labels', () => {
            const actionButtons = ['explosionBtn', 'galaxyBtn', 'rainBtn', 'clearBtn'];

            actionButtons.forEach((id) => {
                const btn = document.getElementById(id);
                expect(btn).toBeTruthy();
                expect(btn.hasAttribute('aria-label')).toBe(true);
            });
        });
    });

    describe('Content Security Policy', () => {
        it('should have Content-Security-Policy meta tag', () => {
            const csp = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
            expect(csp).toBeTruthy();

            const content = csp.getAttribute('content');
            expect(content).toContain("default-src 'self'");
        });
    });

    describe('Responsive Meta Tags', () => {
        it('should have viewport meta tag for mobile', () => {
            const viewport = document.querySelector('meta[name="viewport"]');
            expect(viewport).toBeTruthy();
            expect(viewport.getAttribute('content')).toContain('width=device-width');
        });
    });
});
