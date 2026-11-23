# resistant atlas — how to edit

Every page is one `.html` file in this folder. Open it in VS Code (or any text editor), change the words, save, and refresh the page in your browser. To look at the site on your computer, just double-click `index.html`.

| What | Where |
|---|---|
| Page text | the page's `.html` file, between `<main>` and `</main>` |
| Menu, page order, the ← → arrows | the list at the top of `site.js` |
| Colours, fonts, sizes, the dark frame | the top of `style.css` |
| Images and videos | the `media/` folder |

## Writing on a page

```html
<p>A normal paragraph.</p>
<p class="indent">A paragraph with its first line set in.</p>
<p><i>italic</i>, <b>bold</b>, <u>underlined</u>, <a href="https://…" target="_blank">a link</a></p>
<h3>A bold heading</h3>
<hr>                                   <!-- the thin line -->
<div class="journal"><p>A journal entry…</p></div>
<p class="center"><span class="pill">This page is still being updated...</span></p>
```

## Images and videos

Put the file in `media/`, then:

```html
<figure>
  <img src="media/my-photo.jpg" alt="">
</figure>

<!-- sizes: plain <figure> is full width; class="large" (75%), "half" or "small" are centred -->
<!-- smaller and centred, with a caption -->
<figure class="half">
  <img src="media/my-photo.jpg" alt="">
  <figcaption><i>Caption here</i></figcaption>
</figure>

<!-- a looping video (use this instead of big GIFs: much smaller files) -->
<figure>
  <video src="media/my-clip.mp4" autoplay loop muted playsinline></video>
</figure>

<!-- two images side by side -->
<div class="pair">
  <figure><img src="media/left.jpg" alt=""></figure>
  <figure><img src="media/right.jpg" alt=""></figure>
</div>
```

Keep images around 1600 px wide; anything bigger only makes the page slow.

## Adding a page

1. Duplicate a page (for example `3-clouds.html`) and rename it.
2. Change its `<title>`, the number and name in `<header class="title">`, and the text.
3. Add one line for it in the list at the top of `site.js`.

## Changing the Arabic name in the header

Save the new calligraphy as `media/name-ar.png`, replacing the old file. Use a PNG with a transparent background, cropped tight to the letters. It shows up on every page automatically.

## The opening page and the paper

- `index.html` is the opening page: just your name. The Introduction is `i-introduction.html`.
- The paper texture is `media/paper.jpg` ("light paper fibers" from Subtle Patterns, CC BY-SA 3.0, re-coloured to the cream). To change it, replace that file with another seamless tile, or delete the `--paper-texture` line's `url(...)` in `style.css` for plain cream.

## Notes

- The text font is **EB Garamond** (free, from Google Fonts). Cargo's Marist is only licensed for Cargo sites, so it can't come along. Arabic uses **Noto Naskh Arabic**.
- `404.html` sends old Cargo links that changed (like `/1b-prototypes-1`) to the new pages.
