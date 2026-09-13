# A Little Something For You 💛

A romantic, interactive single-page gift experience for couples — pure **HTML5, CSS3, and vanilla JavaScript**, with GSAP, Swiper.js, and canvas-confetti loaded from CDN for the heavy-lifting animations. No build step, no framework, no backend.

## File structure

```
romantic-surprise/
├── index.html          ← all scenes, semantic structure
├── css/
│   └── style.css        ← design tokens, layout, animations, responsive rules
├── js/
│   └── script.js         ← CONFIG (your content) + all interactivity
├── bg_audio.mp4         ← background music (primary source)
├── bg_audio.mp3         ← background music (fallback source)
└── README.md
```

## How to run it

There's nothing to install. Just open `index.html` in a browser — or, better, serve it locally so relative paths and CDN scripts behave exactly like they will online:

```bash
cd romantic-surprise
python3 -m http.server 8000
# then visit http://localhost:8000
```

To share it with someone, upload the whole folder to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages — all have free tiers) and send them the link. It needs an internet connection once, to load the fonts and libraries from CDN.

## Libraries used (all via CDN, already wired up in `index.html`)

| Library | Purpose | Loaded from |
|---|---|---|
| [GSAP 3](https://gsap.com/) | High-framerate scene transitions, the unwrap, heart-pull physics, tree growth | `cdn.jsdelivr.net/npm/gsap@3` |
| [Swiper 11](https://swiperjs.com/) | The polaroid "cards" swipe gallery | `cdn.jsdelivr.net/npm/swiper@11` |
| [canvas-confetti](https://github.com/catdad/canvas-confetti) | Finale confetti, including heart-shaped particles | `cdn.jsdelivr.net/npm/canvas-confetti@1.9.3` |
| Google Fonts | Playfair Display (titles), Cormorant Garamond (subtitles), Dancing Script (handwriting), Poppins (UI labels) | `fonts.googleapis.com` |

If you'd rather not depend on CDNs (e.g. for an offline gift), download each library's minified file into a `vendor/` folder and swap the `<script src="...">` / `<link href="...">` URLs in `index.html` for local paths — nothing else needs to change.

## Personalizing it

Open `js/script.js` — everything editable lives at the very top in the `CONFIG` object:

- `recipientName` / `senderName`
- `treeLine1` / `treeLine2` — the message that fades in as the tree blooms
- `reasons` — exactly 5 strings work best with the balloon layout; each balloon pop reveals one
- `photos` — caption, date, and a two-color gradient per polaroid. Add `image: "photos/us-1.jpg"` to any entry to use a real photo instead of the gradient placeholder (drop your images in an `assets/` folder and point to them there)
- `letterSalutation` / `letterBody` / `letterSignoff` — the handwritten letter. Use a blank line for a paragraph break
- `questionMessages` — the escalating lines the bunny scene cycles through each time "NO" is dodged, ending on the one shown once NO is nearly gone
- `galaxyMessages` — exactly 10 short strings, one per rose-colored heart in the galaxy scene
- `cakeMessage` — the line under the candles ("Happy Birthday, Arina 🎂")
- `cakeTopperText` — the short phrase on the gold banner sitting above the cake ("Happy Birthday!")
- `finaleCutieLabel` — the small pill label under the bear illustration on the finale card ("Cutie")
- `favorites` — the heart-shaped filmstrip below the cake. Each entry has an `icon` (emoji shown on the placeholder), `label` (title, shown under the card and in the modal), `caption` (modal subtitle), `type` (`"image"` or `"video"`), and `src`. Leave `src: null` to show a soft gradient placeholder; set it to a real file path (e.g. `"assets/temple.jpg"` or `"assets/us.mp4"`) to show your own photo or video when the card is tapped

That's it — no other file needs to change for a full re-skin of the content.

### Changing the palette

Every color is a CSS custom property at the top of `css/style.css` under `:root`. Change `--color-rose`, `--color-gold`, `--color-night-a/b/c`, etc., and the whole site updates.

## Background music

`bg_audio.mp4` plays on a loop, starting on the very first tap anywhere on the page (browsers block audio until a user gesture — this is normal and not a bug). A small speaker button on the right edge lets the person mute or unmute at any time. `bg_audio.mp3` sits alongside it as an automatic fallback for the rare browser that won't decode the MP4's audio track — you don't need to do anything for this to work, it's handled by the `<audio>` element itself. To swap the music, replace both files, keeping the same two filenames.

## Desktop & laptop

The site is still mobile-first, but everything scales up meaningfully on wider screens (roughly 1024px and up) — bigger envelope, tree, cake, bunny, gallery cards, and finale card, more generous type sizes, less wasted padding. Portrait-shaped illustrations (the tree in particular) are height-limited by nature, so on very wide monitors you'll still see some background starfield on either side — that's expected and by design, not a bug; the alternative would be stretching or cropping the artwork, which would look worse.

## The experience, scene by scene

1. **Unwrap** — glowing envelope + button opens with a GSAP flip.
2. **Heart pull** — drag the heart down and release; past the threshold it flies off in a burst of floating hearts.
3. **Tree of hearts** — a large SVG branch structure draws itself stroke-by-stroke, then blooms with dozens of colorful heart "leaves" (rose, blush, gold, coral, lavender, and more) as the birthday message fades in.
4. **Pop the balloons** — five balloons drift freely around the screen rather than sitting in a row; each pop reveals a personalized reason card, and closing the last one automatically carries you into the next scene — no button to tap.
5. **Memory lane** — a tactile, 3D polaroid deck you swipe through (Swiper `cards` effect).
6. **Make a wish** — three sponge layers float down and stack with a bouncy landing, a glaze pours and settles on top, a gold trim snaps in between each layer, a swinging gold topper banner drops into place, candles rise and flicker and stay lit throughout, and gold orbs + a couple of stylized roses fly in from the sides to land along the base — all one continuous GSAP sequence. Below it, a self-scrolling filmstrip of heart-shaped cards — your favorite temple, food, place, movie, song, or anything else — opens a full memory in a modal when tapped.
7. **The letter** — tap the wax seal; it breaks slowly, the letter eases itself free of the envelope, and the message then types itself out in a handwriting font.
8. **Do you love me?** — a bunny covers its face while you're asked the question. Try to hit "NO" and it dodges away, shrinking every time, while the message above escalates ("Wait... are you sure?" → "Okay, last chance..."). "YES" only ever grows. Tap YES and a heart flies in from off-screen, blooms, then zooms and blurs into the next scene.
9. **A universe of us** — a draggable, continuously rotating galaxy full of drifting blue hearts, with a glowing 3D moon turning in perfect sync at the center and ten rose-colored hearts hidden among the stars. Tap a rose heart and a banner at the top reveals a message — always in the order given in `CONFIG.galaxyMessages`, no matter which heart you happen to find first.
10. **Finale** — a bright, kawaii-style birthday card whose pieces reveal one at a time — bunting, then the two-tone "Happy Birthday" title, then the name badge, the bear-with-cake illustration, and finally the actions — followed by a confetti burst. Just a "Replay Experience" button, which takes you all the way back to the very first scene.

Every scene past the first has a small back button on the left edge, so you (or the person opening it) can always step back to revisit an earlier part.

Built mobile-first: full-height scenes via a JS viewport-height fix (so mobile browser chrome doesn't cut things off), touch-first drag and swipe gestures, fluid type sizing, and `prefers-reduced-motion` support throughout.
