/* =============================================================
   resistant atlas — the menu and the page order

   This list builds the menu AND the ← → arrows at the bottom of
   every page, so the order here is the reading order.

   To add a page:
     1. Duplicate any page (e.g. 3-clouds.html) and rename it.
     2. Add a line for it below, where it should sit.
   sub: true   → set in, in the menu
   cover: true → the opening page (not listed in the menu; your
                 name at the top of the menu takes you there)
   "line"      → a gap in the menu
   ============================================================= */

const PAGES = [
  { file: "index.html",                     num: "",    title: "resistant atlas", cover: true },
  { file: "i-introduction.html",            num: "i",   title: "Introduction" },
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
  { file: "8-contact.html",           num: "8", title: "Contact" },
];


/* ---------- you shouldn't need to edit below this line ---------- */

(function () {
  const pages = PAGES.filter((p) => p !== "line");

  // Which page are we on? Works for "/ii-the-beginning", "/ii-the-beginning.html" and "/".
  let here = decodeURIComponent(location.pathname.split("/").pop() || "index.html");
  if (!here.endsWith(".html")) here += ".html";
  if (!pages.some((p) => p.file === here)) here = "index.html"; // e.g. the bare address of a preview link
  const index = pages.findIndex((p) => p.file === here);

  const main = document.querySelector("main");

  // Your name in English and Arabic, on one line (top of the menu)
  const MARK = '<span>resistant atlas</span><img src="media/name-ar.png" alt="أطلس مقاوم" lang="ar">';

  // The menu button: three thin lines in the top right corner of the page, like the old Cargo one
  const LINES = '<svg viewBox="0 0 30 22" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M1 2h28M1 11h28M1 20h28"/></svg>';
  const CROSS = '<svg viewBox="0 0 30 22" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M6 1l18 20M24 1L6 21"/></svg>';
  const button = document.createElement("button");
  button.type = "button";
  button.className = "menu-button";
  button.setAttribute("aria-label", "menu");
  button.setAttribute("aria-expanded", "false");
  button.innerHTML = LINES;

  // Menu: a leaf of blue paper laid over the right of the page, set as a table of contents.
  // Each "line" in PAGES starts a new group. The opening page isn't listed.
  const groups = [[]];
  PAGES.forEach((p) => {
    if (p === "line") groups.push([]);
    else if (!p.cover) groups[groups.length - 1].push(p);
  });
  const lists = groups.map((g) => "<ul>" + g.map((p) => {
    const current = p.file === here ? ' aria-current="page"' : "";
    return `<li${p.sub ? ' class="sub"' : ""}><a href="${p.file}"${current}>` +
      `<span class="n">${p.num}</span><span class="t">${p.title}</span></a></li>`;
  }).join("") + "</ul>").join("");

  const menu = document.createElement("nav");
  menu.className = "menu";
  menu.setAttribute("aria-label", "Contents");
  menu.innerHTML =
    `<div class="menu-top"><a class="mark" href="index.html">${MARK}</a>` +
    `<button type="button" class="menu-close" aria-label="close">${CROSS}</button></div>` +
    `<div class="toc">${lists}</div>`;

  function setOpen(open) {
    document.body.classList.toggle("menu-open", open);
    button.setAttribute("aria-expanded", String(open));
  }
  button.addEventListener("click", () => setOpen(!document.body.classList.contains("menu-open")));
  menu.querySelector(".menu-close").addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
  // clicking the page below the sheet closes it
  document.addEventListener("click", (e) => {
    if (document.body.classList.contains("menu-open") && !e.target.closest(".menu, .menu-button")) setOpen(false);
  });

  document.body.append(button, menu);

  // Press G to show the guides (grid lines and margins). Press again to hide.
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() !== "g" || e.metaKey || e.ctrlKey || e.altKey) return;
    if (/input|textarea/i.test(document.activeElement.tagName)) return;
    document.body.classList.toggle("guides");
  });

  // Keep text on the grid below pictures: pad each picture up to a whole number of lines.
  function snapToGrid() {
    const line = parseFloat(getComputedStyle(document.body).lineHeight);
    if (!line) return;
    document.querySelectorAll("main figure, main .pair").forEach((el) => {
      if (el.closest(".pair") && el.tagName === "FIGURE") return;
      el.style.paddingBottom = "";
      const h = el.getBoundingClientRect().height;
      const extra = Math.ceil(h / line - 0.001) * line - h;
      el.style.paddingBottom = extra > 0.5 ? extra + "px" : "";
    });
  }
  window.addEventListener("load", snapToGrid);
  window.addEventListener("resize", snapToGrid);
  document.querySelectorAll("main img, main video").forEach((m) => {
    m.addEventListener("load", snapToGrid);
    m.addEventListener("loadedmetadata", snapToGrid);
  });
  snapToGrid();

  // "Close" at the end of a field note closes it
  document.addEventListener("click", (e) => {
    const close = e.target.closest(".field-note .close");
    if (!close) return;
    e.preventDefault();
    const note = close.closest("details");
    note.open = false;
    note.scrollIntoView({ block: "nearest" });
  });

  // ← number → at the foot of the page
  if (main && index !== -1) {
    const prev = pages[index - 1];
    const next = pages[index + 1];
    const pager = document.createElement("nav");
    pager.className = "pager label";
    pager.setAttribute("aria-label", "Previous and next page");
    pager.innerHTML =
      `<span>${prev ? `<a href="${prev.file}" title="${prev.title}">←</a>` : ""}</span>` +
      `<span>${pages[index].num}</span>` +
      `<span>${next ? `<a href="${next.file}" title="${next.title}">→</a>` : ""}</span>`;
    main.append(pager);
  }
})();
