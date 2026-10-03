/**
 * Light / dark theme controller.
 *
 * The initial theme is applied before first paint by the inline script in
 * `components/head/HeadScripts.astro`, so there is never a flash of the wrong
 * theme. This module owns the masthead toggle: it flips `data-theme` on
 * <html>, persists an explicit choice and keeps the sun/moon icon in sync.
 * Until the visitor chooses, the page follows the operating-system setting.
 */

export const THEME_STORAGE_KEY = "theme";

type Theme = "light" | "dark";

const root = document.documentElement;

function readSavedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function isDark(): boolean {
  return root.getAttribute("data-theme") === "dark";
}

function syncIcon(): void {
  const icon = document.getElementById("theme-icon");
  if (!icon) return;
  const dark = isDark();
  icon.classList.toggle("fa-moon", dark);
  icon.classList.toggle("fa-sun", !dark);
}

function applyTheme(theme: Theme, persist: boolean): void {
  if (theme === "dark") root.setAttribute("data-theme", "dark");
  else root.removeAttribute("data-theme");

  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* storage unavailable (private mode) — the choice lasts for this page only */
    }
  }
  syncIcon();
}

function toggleTheme(): void {
  applyTheme(isDark() ? "light" : "dark", true);
}

export function initTheme(): void {
  syncIcon();

  const toggle = document.getElementById("theme-toggle");
  const control = toggle?.querySelector<HTMLElement>('[role="button"]');

  toggle?.addEventListener("click", (event) => {
    event.preventDefault();
    toggleTheme();
  });

  control?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleTheme();
    }
  });

  // Follow OS-level changes until an explicit choice has been saved.
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    if (!readSavedTheme()) applyTheme(event.matches ? "dark" : "light", false);
  });
}
