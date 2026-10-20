import { useEffect } from 'react';

/**
 * useScrollReveal
 * Observes all elements marked with `.reveal-slide-*` or `.section-header`
 * and applies `.is-revealed` when scrolled into view.
 */
export default function useScrollReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      document.querySelectorAll('[class*="reveal-slide"], .section-header').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        } else {
          // Revert effect when scrolling back out of view
          entry.target.classList.remove('is-revealed');
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '10px 0px -45px 0px',
      threshold: 0.08,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const observedSet = new WeakSet();

    const observeElements = () => {
      const elements = document.querySelectorAll(
        '.reveal-slide-up, .reveal-slide-down, .reveal-slide-left, .reveal-slide-right, .reveal-slide-scale, .section-slide-separator, .section-header'
      );
      elements.forEach((el) => {
        if (!observedSet.has(el)) {
          observedSet.add(el);
          observer.observe(el);
        }
      });
    };

    observeElements();

    // Observe dynamically added elements
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
