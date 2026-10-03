/**
 * Smooth in-page anchor scrolling that lands headings clear of the fixed
 * masthead. The browser still performs its normal hash jump (so history and
 * :target work); we then glide to the offset position over 400ms.
 */

const OFFSET = 70; // px kept above the target, roughly the masthead height
const DURATION = 400; // ms

// Classic "swing" easing: slow start and finish.
const swing = (t: number): number => 0.5 - Math.cos(t * Math.PI) / 2;

function animateScrollTo(targetY: number): void {
  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 1) return;

  const startTime = performance.now();
  const step = (now: number) => {
    const progress = Math.min(1, (now - startTime) / DURATION);
    window.scrollTo(0, startY + distance * swing(progress));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function isSamePageHashLink(link: HTMLAnchorElement): boolean {
  return (
    link.hash.length > 1 &&
    link.origin === location.origin &&
    link.pathname.replace(/\/$/, "") === location.pathname.replace(/\/$/, "")
  );
}

export function initSmoothScroll(): void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.addEventListener("click", (event) => {
    const link = (event.target as Element | null)?.closest?.("a");
    if (!(link instanceof HTMLAnchorElement) || !isSamePageHashLink(link)) return;

    const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
    if (!target) return;

    // Let the default hash navigation happen first, then glide to the offset.
    requestAnimationFrame(() => {
      const top = target.getBoundingClientRect().top + window.scrollY - OFFSET;
      animateScrollTo(Math.max(0, top));
    });
  });
}
