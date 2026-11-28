/* =============================================================
   resistant atlas — the menu and the page order

   This list builds the menu AND the ← → arrows at the bottom of
   every page, so the order here is the reading order.

   To add a page:
     1. Duplicate any page (e.g. 1c-prototypes.html) and rename it.
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
  { file: "vb-inaccurate-even-better.html", num: "va",  title: "Inaccurate? Even better.",  sub: true },
  { file: "va-foucaults-blind-spot.html",   num: "vb",  title: "Foucault’s Blind Spot",     sub: true },
  "line",
  { file: "1-names-of-the-sun.html",          num: "1",  title: "Names of the Sun" },
  { file: "1a-introduction.html",             num: "1a", title: "Introduction",             sub: true },
  { file: "1b-approach.html",                 num: "1b", title: "Approach",                 sub: true },
  { file: "1c-prototypes.html",               num: "1c", title: "Prototypes",               sub: true },
  { file: "1d-interactive-installation.html", num: "1d", title: "Interactive Installation", sub: true },
  { file: "1e-triennial-activations.html",    num: "1e", title: "Triennial Activations",    sub: true },
  { file: "2-houses-of-the-moon.html",        num: "2",  title: "Houses of the Moon" },
  { file: "2a-introduction.html",             num: "2a", title: "Introduction",             sub: true },
  { file: "3-clouds.html",                    num: "3",  title: "Bodies of the Clouds" },
  { file: "3a-introduction.html",             num: "3a", title: "Introduction",             sub: true },
  { file: "4-paths-of-the-wind.html",         num: "4",  title: "Paths of the Wind" },
  "line",
  // the back of the book: no numbers
  { file: "4-field-notes.html",       num: "", title: "Field Notes" },
  { file: "5-resources.html",         num: "", title: "Sources" },
  { file: "7-acknowledgments.html",   num: "", title: "Acknowledgments" },
  { file: "8-contact.html",           num: "", title: "Contact" },
];


/* ---------- you shouldn't need to edit below this line ---------- */

(function () {
  const pages = PAGES.filter((p) => p !== "line");

  // Which page are we on? Works for "/ii-the-beginning", "/ii-the-beginning.html" and "/".
  let here = decodeURIComponent(location.pathname.split("/").pop() || "index.html");
  if (!here.endsWith(".html")) here += ".html";
  if (!pages.some((p) => p.file === here)) here = "index.html"; // e.g. the bare address of a preview link
  const index = pages.findIndex((p) => p.file === here);

  // Addresses without ".html": resistantatlas.com/1a-introduction. The files keep their names;
  // the host opens "1a-introduction" as "1a-introduction.html", and the opening page is "./".
  const link = (p) => (p.file === "index.html" ? "./" : p.file.replace(/\.html$/, ""));

  // Someone arriving at an old ".html" address sees the clean one in the address bar.
  if (/resistantatlas\.com$/.test(location.hostname) && /\.html$/.test(location.pathname)) {
    history.replaceState(null, "", location.pathname.replace(/(index)?\.html$/, "") + location.search + location.hash);
  }

  const main = document.querySelector("main");

  // Your name in English and Arabic, on one line (top of the menu)
  const MARK = '<span>resistant atlas</span><img src="media/name-ar.png" alt="أطلس مقاوم" lang="ar">';

  // Icons drawn from your lockup, all with the same thin line:
  // the menu is two overlapping ellipses; close is two flattened ellipses crossing;
  // the arrows are hairlines with an open head.
  const LINES = '<svg viewBox="0 0 40 22" fill="none" stroke="currentColor" stroke-width="0.85" aria-hidden="true">' +
    '<ellipse class="orbit-a" cx="20" cy="7.2" rx="18.5" ry="5.5"/><ellipse class="orbit-b" cx="20" cy="14.8" rx="18.5" ry="5.5"/></svg>';
  const CROSS = '<svg viewBox="0 0 30 22" fill="none" stroke="currentColor" stroke-width="0.85" aria-hidden="true">' +
    '<ellipse cx="15" cy="11" rx="13" ry="1.3" transform="rotate(36 15 11)"/><ellipse cx="15" cy="11" rx="13" ry="1.3" transform="rotate(-36 15 11)"/></svg>';
  const ARROW = (dir) => `<svg class="arrow arrow-${dir}" viewBox="0 0 38 12" fill="none" stroke="currentColor" stroke-width="0.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">` +
    (dir === "next" ? '<path d="M1 6h35M30.5 1.2L36 6l-5.5 4.8"/>' : '<path d="M37 6H2M7.5 1.2L2 6l5.5 4.8"/>') + '</svg>';
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
    return `<li${p.sub ? ' class="sub"' : ""}><a href="${link(p)}"${current}>` +
      `<span class="n">${p.num}</span><span class="t">${p.title}</span></a></li>`;
  }).join("") + "</ul>").join("");

  const menu = document.createElement("nav");
  menu.className = "menu";
  menu.setAttribute("aria-label", "Contents");
  menu.innerHTML =
    `<div class="menu-top"><a class="mark" href="./">${MARK}</a>` +
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

  // Keep text on the grid below pictures (and the verse cards on Sources):
  // pad each one at the bottom up to a whole number of lines.
  function snapToGrid() {
    const line = parseFloat(getComputedStyle(document.body).lineHeight);
    if (!line) return;
    document.querySelectorAll("main figure, main .pair, main .verses li").forEach((el) => {
      if (el.parentElement.closest(".pair")) return;   // a picture inside a pair: the pair is padded as one
      el.style.paddingBottom = "";
      const base = parseFloat(getComputedStyle(el).paddingBottom) || 0;
      const h = el.getBoundingClientRect().height;
      const extra = Math.ceil(h / line - 0.001) * line - h;
      el.style.paddingBottom = extra > 0.5 ? base + extra + "px" : "";
    });
  }
  window.addEventListener("load", snapToGrid);
  if (document.fonts) document.fonts.ready.then(snapToGrid);
  window.addEventListener("resize", snapToGrid);
  document.querySelectorAll("main img, main video").forEach((m) => {
    m.addEventListener("load", snapToGrid);
    m.addEventListener("loadedmetadata", snapToGrid);
  });
  snapToGrid();

  // Pictures fade in when they arrive, instead of popping in
  document.querySelectorAll("main img").forEach((img) => {
    if (img.complete) return;
    img.classList.add("arriving");
    const done = () => img.classList.remove("arriving");
    img.addEventListener("load", done, { once: true });
    img.addEventListener("error", done, { once: true });
  });

  // Videos start loading only as the reader comes near them, and play only while on the screen
  // (faster pages, kinder to phone batteries).
  const videos = document.querySelectorAll("main video");
  const load = (v) => {
    if (v.dataset.src && !v.getAttribute("src")) {
      v.classList.add("arriving");
      v.addEventListener("loadeddata", () => v.classList.remove("arriving"), { once: true });
      v.src = v.dataset.src;
    }
  };
  if (!("IntersectionObserver" in window)) videos.forEach(load);
  else {
    const near = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { load(en.target); near.unobserve(en.target); } });
    }, { rootMargin: "900px 0px" });
    videos.forEach((v) => near.observe(v));
  }
  if ("IntersectionObserver" in window) {
    const watch = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { const p = en.target.play(); if (p) p.catch(() => {}); }
        else en.target.pause();
      });
    }, { threshold: 0.1 });
    videos.forEach((v) => watch.observe(v));
  }

  // A sound to listen to (1d): a drawn play / pause button, a hairline that fills as it plays, the time left
  const PLAY = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="0.85" stroke-linejoin="round" aria-hidden="true"><path d="M6 3.5l10 6.5-10 6.5z"/></svg>';
  const PAUSE = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="0.85" stroke-linecap="round" aria-hidden="true"><path d="M7 4v12M13 4v12"/></svg>';
  document.querySelectorAll(".listen").forEach((box) => {
    const audio = box.querySelector("audio"), btn = box.querySelector(".listen-button");
    const fill = box.querySelector(".listen-fill"), time = box.querySelector(".listen-time"), track = box.querySelector(".listen-track");
    const fmt = (s) => Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");
    btn.innerHTML = PLAY;
    btn.addEventListener("click", () => { if (audio.paused) audio.play(); else audio.pause(); });
    audio.addEventListener("play", () => { btn.innerHTML = PAUSE; btn.setAttribute("aria-label", "Pause the sound"); box.classList.add("playing"); });
    audio.addEventListener("pause", () => { btn.innerHTML = PLAY; btn.setAttribute("aria-label", "Play the sound"); box.classList.remove("playing"); });
    audio.addEventListener("timeupdate", () => {
      if (!audio.duration) return;
      fill.style.width = (audio.currentTime / audio.duration) * 100 + "%";
      time.textContent = fmt(audio.duration - audio.currentTime);
    });
    track.addEventListener("click", (e) => {
      const r = track.getBoundingClientRect();
      const go = () => { audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration; };
      if (audio.duration) go(); else { audio.addEventListener("loadedmetadata", go, { once: true }); audio.play(); }
    });
  });

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
      `<span>${prev ? `<a href="${link(prev)}" aria-label="Previous: ${prev.title}">${ARROW("prev")}</a>` : ""}</span>` +
      `<span>${pages[index].num}</span>` +
      `<span>${next ? `<a href="${link(next)}" aria-label="Next: ${next.title}"><span class="next-name">${next.title}</span>${ARROW("next")}</a>` : ""}</span>`;
    main.append(pager);

    // On a phone, a sideways swipe turns the page (not when the menu is open or inside something that scrolls sideways)
    let touch = null;
    document.addEventListener("touchstart", (e) => {
      if (e.touches.length !== 1) { touch = null; return; }
      const t = e.touches[0];
      touch = { x: t.clientX, y: t.clientY, time: Date.now(), inside: !!e.target.closest(".table, .menu, video") };
    }, { passive: true });
    document.addEventListener("touchend", (e) => {
      if (!touch || touch.inside || document.body.classList.contains("menu-open")) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touch.x, dy = t.clientY - touch.y;
      const quick = Date.now() - touch.time < 700;
      touch = null;
      if (!quick || Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 2) return;
      if (dx < 0 && next) location.href = link(next);
      if (dx > 0 && prev) location.href = link(prev);
    }, { passive: true });

    // ← and → on the keyboard turn the page, like a book
    document.addEventListener("keydown", (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      if (/input|textarea|select/i.test(document.activeElement.tagName)) return;
      if (document.body.classList.contains("menu-open")) return;
      if (e.key === "ArrowRight" && next) location.href = link(next);
      if (e.key === "ArrowLeft" && prev) location.href = link(prev);
    });

    // A chapter cover also has a small → right under its title, like the opening page
    const title = main.classList.contains("chapter-cover") && main.querySelector(".cover-title");
    if (title && next) {
      const arrow = document.createElement("a");
      arrow.className = "cover-next";
      arrow.href = link(next);
      arrow.title = next.title;
      arrow.setAttribute("aria-label", "Next: " + next.title);
      arrow.innerHTML = ARROW("next");
      // under the title, or under its note ("coming soon") when there is one
      const note = title.nextElementSibling && title.nextElementSibling.classList.contains("cover-note") ? title.nextElementSibling : title;
      note.after(arrow);
    }
  }
})();
