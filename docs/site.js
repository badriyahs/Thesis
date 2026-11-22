/* =============================================================
   resistant atlas — the menu and the page order

   This list builds the menu AND the ← → arrows at the bottom of
   every page, so the order here is the reading order.

   To add a page:
     1. Duplicate any page (e.g. 3-clouds.html) and rename it.
     2. Add a line for it below, where it should sit.
   sub: true   → indented, not bold, in the menu
   "line"      → a thin divider in the menu
   ============================================================= */

const PAGES = [
  { file: "index.html",                     num: "i",   title: "Introduction" },
  { file: "ii-the-beginning.html",          num: "ii",  title: "The Beginning" },
  { file: "iii-the-manifesto.html",         num: "iii", title: "The Manifesto" },
  { file: "iv-method.html",                 num: "iv",  title: "Method" },
  { file: "v-essays.html",                  num: "v",   title: "Essays" },
  { file: "va-foucaults-blind-spot.html",   num: "va",  title: "Foucault’s Blind Spot",     sub: true },
  { file: "vb-inaccurate-even-better.html", num: "vb",  title: "Inaccurate? Even better.",  sub: true },
  "line",
  { file: "1-names-of-the-sun.html",          num: "1",  title: "Names of the Sun" },
  { file: "1a-approach.html",                 num: "1a", title: "Approach",                 sub: true },
  { file: "1b-prototypes.html",               num: "1b", title: "Prototypes",               sub: true },
  { file: "1c-interactive-installation.html", num: "1c", title: "Interactive Installation", sub: true },
  { file: "1d-triennial-activations.html",    num: "1d", title: "Triennial Activations",    sub: true },
  { file: "2-houses-of-the-moon.html",        num: "2",  title: "Houses of the Moon" },
  { file: "3-clouds.html",                    num: "3",  title: "Bodies of the Clouds" },
  "line",
  { file: "4-field-notes.html",       num: "4", title: "Field Notes" },
  { file: "5-resources.html",         num: "5", title: "Resources" },
  { file: "6-further-reading.html",   num: "6", title: "Further Reading" },
  { file: "7-acknowledgments.html",   num: "7", title: "Acknowledgments" },
];

const EMAIL = "badriyahalsalem@gmail.com";


/* ---------- you shouldn't need to edit below this line ---------- */

(function () {
  const pages = PAGES.filter((p) => p !== "line");

  // Which page are we on? Works for "/ii-the-beginning", "/ii-the-beginning.html" and "/".
  let here = decodeURIComponent(location.pathname.split("/").pop() || "index.html");
  if (!here.endsWith(".html")) here += ".html";
  const index = pages.findIndex((p) => p.file === here);

  // Menu button (top right)
  const button = document.createElement("button");
  button.className = "menu-button";
  button.setAttribute("aria-label", "Menu");
  button.setAttribute("aria-expanded", "false");
  button.innerHTML =
    '<svg viewBox="0 0 30 22" fill="none" stroke="currentColor" stroke-width="1.4">' +
    '<path d="M1 2h28M1 11h28M1 20h28"/></svg>';

  // Menu panel
  const items = PAGES.map((p) => {
    if (p === "line") return '<li class="line" aria-hidden="true"></li>';
    const current = p.file === here ? ' aria-current="page"' : "";
    return `<li${p.sub ? ' class="sub"' : ""}><a href="${p.file}"${current}>${p.num}. ${p.title}</a></li>`;
  }).join("");

  const menu = document.createElement("nav");
  menu.className = "menu";
  menu.setAttribute("aria-label", "Contents");
  menu.innerHTML =
    '<div class="menu-head"><p>resistant atlas</p>' +
    '<img src="media/title-03-copy.png" alt="أطلس مقاوم"></div>' +
    `<ul>${items}</ul>` +
    `<p class="menu-email"><a href="mailto:${EMAIL}">${EMAIL}</a></p>`;

  function setOpen(open) {
    document.body.classList.toggle("menu-open", open);
    button.setAttribute("aria-expanded", String(open));
  }
  button.addEventListener("click", () => setOpen(!document.body.classList.contains("menu-open")));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });

  document.body.append(menu, button);

  // "Collapse ↑" at the end of a field note closes it
  document.addEventListener("click", (e) => {
    const close = e.target.closest(".field-note .close");
    if (!close) return;
    e.preventDefault();
    const note = close.closest("details");
    note.open = false;
    note.scrollIntoView({ block: "nearest" });
  });

  // ← number → at the bottom of the page
  const main = document.querySelector("main");
  if (main && index !== -1) {
    const prev = pages[index - 1];
    const next = pages[index + 1];
    const pager = document.createElement("nav");
    pager.className = "pager";
    pager.setAttribute("aria-label", "Previous and next page");
    pager.innerHTML =
      `<span>${prev ? `<a href="${prev.file}" title="${prev.title}">←</a>` : ""}</span>` +
      `<span>${pages[index].num}</span>` +
      `<span>${next ? `<a href="${next.file}" title="${next.title}">→</a>` : ""}</span>`;
    main.append(pager);
  }
})();
