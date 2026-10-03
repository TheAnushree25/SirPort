/**
 * Priority ("greedy") navigation.
 *
 * Keeps as many top-level links in the masthead as fit on one line. Links
 * that overflow are moved — last first — into the `.hidden-links` dropdown
 * behind the menu button, and moved back as space frees up. Items marked
 * `.persist` (the name and the theme control) never move.
 *
 * The masthead is `position: fixed`, so its measured height is mirrored into
 * `body { padding-top }` after every pass.
 */

const BUTTON_GUTTER = 30; // px of breathing room kept next to the menu button

function contentWidth(el: Element): number {
  const style = getComputedStyle(el);
  return (
    el.getBoundingClientRect().width -
    parseFloat(style.paddingLeft) -
    parseFloat(style.paddingRight) -
    parseFloat(style.borderLeftWidth) -
    parseFloat(style.borderRightWidth)
  );
}

export function initGreedyNav(): void {
  const nav = document.getElementById("site-nav");
  const button = nav?.querySelector<HTMLButtonElement>(":scope > button");
  const visible = nav?.querySelector<HTMLUListElement>(".visible-links");
  const hidden = nav?.querySelector<HTMLUListElement>(".hidden-links");
  if (!nav || !button || !visible || !hidden) return;

  const tail = visible.querySelector<HTMLLIElement>(":scope > .persist.tail");
  const masthead = document.querySelector<HTMLElement>(".masthead");

  // Width of the visible list at each point an item was folded away.
  const breakpoints: number[] = [];

  const movableItems = (): Element[] => Array.from(visible.children).filter((li) => !li.classList.contains("persist"));

  const availableSpace = (): number =>
    button.classList.contains("hidden") ? contentWidth(nav) : contentWidth(nav) - contentWidth(button) - BUTTON_GUTTER;

  function update(): void {
    let space = availableSpace();

    if (contentWidth(visible!) > space) {
      while (contentWidth(visible!) > space && movableItems().length > 0) {
        breakpoints.push(contentWidth(visible!));
        const items = movableItems();
        hidden!.prepend(items[items.length - 1]);
        space = availableSpace();
        button!.classList.remove("hidden");
      }
    } else {
      while (breakpoints.length > 0 && space > breakpoints[breakpoints.length - 1]) {
        const item = hidden!.firstElementChild;
        if (!item) break;
        if (tail) visible!.insertBefore(item, tail);
        else visible!.append(item);
        breakpoints.pop();
      }

      if (breakpoints.length < 1) {
        button!.classList.add("hidden");
        button!.classList.remove("close");
        button!.setAttribute("aria-expanded", "false");
        hidden!.classList.add("hidden");
      }
    }

    button!.setAttribute("count", String(breakpoints.length));

    if (masthead) {
      document.body.style.paddingTop = `${masthead.getBoundingClientRect().height}px`;
    }
  }

  button.addEventListener("click", () => {
    const open = hidden.classList.toggle("hidden") === false;
    button.classList.toggle("close", open);
    button.setAttribute("aria-expanded", String(open));
  });

  // Following a link from the dropdown closes it.
  hidden.addEventListener("click", (event) => {
    if ((event.target as Element).closest("a")) {
      hidden.classList.add("hidden");
      button.classList.remove("close");
      button.setAttribute("aria-expanded", "false");
    }
  });

  window.addEventListener("resize", update);
  screen.orientation?.addEventListener("change", update);

  // Measure the first pass as if the menu button were absent, so links that fit
  // without it stay in the bar; the button only appears once something folds.
  button.classList.add("hidden");
  update();
  // Re-measure once web fonts (icon font included) have settled.
  document.fonts?.ready.then(update).catch(() => {});
}
