import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { tilt } from './actions/tilt';

describe('tilt action (TDD)', () => {
    let element: HTMLElement;

    beforeEach(() => {
        element = document.createElement('div');
        document.body.appendChild(element);
    });

    afterEach(() => {
        document.body.removeChild(element);
        vi.restoreAllMocks();
    });

    it('attaches mouseenter, mousemove, and mouseleave listeners when motion is allowed', () => {
        const addSpy = vi.spyOn(element, 'addEventListener');
        const action = tilt(element, { max: 10 });
        
        expect(addSpy).toHaveBeenCalledWith('mouseenter', expect.any(Function));
        expect(addSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
        expect(addSpy).toHaveBeenCalledWith('mouseleave', expect.any(Function));

        action.destroy();
    });

    it('removes listeners on destroy', () => {
        const removeSpy = vi.spyOn(element, 'removeEventListener');
        const action = tilt(element);
        action.destroy();

        expect(removeSpy).toHaveBeenCalledWith('mouseenter', expect.any(Function));
        expect(removeSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
        expect(removeSpy).toHaveBeenCalledWith('mouseleave', expect.any(Function));
    });

    it('bypasses tilt transformations when user prefers reduced motion', () => {
        // Mock matchMedia to return matches: true for prefers-reduced-motion
        vi.stubGlobal('matchMedia', vi.fn().mockImplementation((query: string) => ({
            matches: query.includes('prefers-reduced-motion'),
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })));

        const addSpy = vi.spyOn(element, 'addEventListener');
        const action = tilt(element);

        // When reduced motion is preferred, no mousemove listener is bound
        expect(addSpy).not.toHaveBeenCalledWith('mousemove', expect.any(Function));
        action.destroy();
    });
});
