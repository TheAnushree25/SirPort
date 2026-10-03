/**
 * Client entry point. Loaded once per page as a deferred module, so the DOM
 * is fully parsed when this runs.
 */
import { initGreedyNav } from "./greedy-nav";
import { initSmoothScroll } from "./smooth-scroll";
import { initTheme } from "./theme";

initTheme();
initGreedyNav();
initSmoothScroll();
