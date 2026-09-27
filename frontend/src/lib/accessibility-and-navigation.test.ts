import { describe, it, expect } from 'vitest';
import { 
    updatePaletteIndex, 
    parseProjectHash, 
    formatProjectHash, 
    findProjectByHash 
} from './utils';
import { projects, resumeSkills } from './data';

describe('Navigation & Accessibility Utilities (TDD)', () => {
    describe('updatePaletteIndex', () => {
        it('increments index with boundary wrapping on ArrowDown', () => {
            const totalItems = 5;
            expect(updatePaletteIndex(0, 'ArrowDown', totalItems)).toBe(1);
            expect(updatePaletteIndex(3, 'ArrowDown', totalItems)).toBe(4);
            expect(updatePaletteIndex(4, 'ArrowDown', totalItems)).toBe(0); // wraps to start
        });

        it('decrements index with boundary wrapping on ArrowUp', () => {
            const totalItems = 5;
            expect(updatePaletteIndex(0, 'ArrowUp', totalItems)).toBe(4); // wraps to end
            expect(updatePaletteIndex(3, 'ArrowUp', totalItems)).toBe(2);
            expect(updatePaletteIndex(1, 'ArrowUp', totalItems)).toBe(0);
        });

        it('handles single item or empty list gracefully', () => {
            expect(updatePaletteIndex(0, 'ArrowDown', 0)).toBe(0);
            expect(updatePaletteIndex(0, 'ArrowUp', 0)).toBe(0);
            expect(updatePaletteIndex(0, 'ArrowDown', 1)).toBe(0);
            expect(updatePaletteIndex(0, 'ArrowUp', 1)).toBe(0);
        });

        it('leaves index unchanged for unrelated keys', () => {
            expect(updatePaletteIndex(2, 'Enter', 5)).toBe(2);
            expect(updatePaletteIndex(2, 'Escape', 5)).toBe(2);
        });
    });

    describe('Modal Hash State Synchronization', () => {
        it('formats project id into clean url hash target', () => {
            expect(formatProjectHash('proj-1')).toBe('#proj-1');
            expect(formatProjectHash('#proj-1')).toBe('#proj-1');
            expect(formatProjectHash('')).toBe('');
        });

        it('parses raw url hash to retrieve target project id', () => {
            expect(parseProjectHash('#proj-lessons-to-payment')).toBe('proj-lessons-to-payment');
            expect(parseProjectHash('proj-lessons-to-payment')).toBe('proj-lessons-to-payment');
            expect(parseProjectHash('')).toBeNull();
            expect(parseProjectHash('#')).toBeNull();
        });

        it('finds existing project by hash', () => {
            const found = findProjectByHash('#proj-lessons-to-payment', projects);
            expect(found).toBeDefined();
            expect(found?.title).toContain('Lessons To Payment');
        });

        it('returns undefined for non-existent project hash', () => {
            const notFound = findProjectByHash('#non-existent-project-xyz', projects);
            expect(notFound).toBeUndefined();
        });
    });

    describe('Resume Data Decoupling', () => {
        it('exports typed resumeSkills categories from data.ts', () => {
            expect(resumeSkills).toBeDefined();
            expect(Array.isArray(resumeSkills)).toBe(true);
            expect(resumeSkills.length).toBeGreaterThanOrEqual(4);

            const categories = resumeSkills.map(s => s.category);
            expect(categories).toContain('Languages');
            expect(categories).toContain('Tools');
            expect(categories).toContain('Certifications');
            expect(categories).toContain('Frameworks & Architecture');
        });

        it('ensures all resume skills have populated item lists', () => {
            for (const section of resumeSkills) {
                expect(section.category.length).toBeGreaterThan(0);
                expect(section.items.length).toBeGreaterThan(0);
                for (const item of section.items) {
                    expect(typeof item).toBe('string');
                    expect(item.trim().length).toBeGreaterThan(0);
                }
            }
        });
    });
});
