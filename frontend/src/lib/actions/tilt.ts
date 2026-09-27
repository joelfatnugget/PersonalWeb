export function tilt(node: HTMLElement, { max = 15, scale = 1.05, speed = 400 } = {}) {
    // Check for prefers-reduced-motion to protect users with vestibular sensitivities
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return {
            destroy() {
                // No-op for reduced motion
            }
        };
    }

    let rect: DOMRect | null = null;

    function handleMouseEnter() {
        rect = node.getBoundingClientRect();
    }

    function handleMouseMove(e: MouseEvent) {
        if (!rect) {
            rect = node.getBoundingClientRect();
        }
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const tiltX = ((y - centerY) / centerY) * max;
        const tiltY = ((centerX - x) / centerX) * max;

        node.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scale}, ${scale}, ${scale})`;
    }

    function handleMouseLeave() {
        rect = null;
        node.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }

    node.style.transition = `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
    node.addEventListener('mouseenter', handleMouseEnter);
    node.addEventListener('mousemove', handleMouseMove);
    node.addEventListener('mouseleave', handleMouseLeave);

    return {
        destroy() {
            node.removeEventListener('mouseenter', handleMouseEnter);
            node.removeEventListener('mousemove', handleMouseMove);
            node.removeEventListener('mouseleave', handleMouseLeave);
        }
    };
}
