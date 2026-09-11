# A.T.O.M Reel

The cinematic photo reel in the "OUR GLIMPSES" section of `/home`. Five club
photographs cut together with nine WebGL transitions and a film grade.

```tsx
import AtomReel from "@/components/atom-reel";

<Box sx={{ height: 600, overflow: "hidden", borderRadius: "28px" }}>
  <AtomReel className="ar-framed" label="A.T.O.M Robotics" />
</Box>
```

## What is in here

| File | |
| --- | --- |
| `atom-reel.js` | The engine. Vendored verbatim from the standalone widget — see *Re-syncing* below. |
| `atom-reel.css` | The engine's stylesheet, also vendored verbatim. |
| `index.tsx` | The React wrapper. Mounts and tears down the engine around a host `<div>`. |
| `slides.ts` | The photos and captions. **This is the file to edit.** |
| `theme.css` | Site colours, Poppins, and the `ar-framed` sizing variant. |
| `atom-reel.d.ts` | Types for the engine's `window.AtomReel` global. |

The photographs live in `public/atom-reel/photos/` — three widths
(`-900`, `-1600`, `-2200`) in both `.webp` and `.jpg`, so the reel can pick the
right one for the screen. They are the same five photos the old `/imagespk`
carousel showed, re-encoded.

## Props

| Prop | Default | |
| --- | --- | --- |
| `slides` | `REEL_SLIDES` | Photos and captions, from `slides.ts`. |
| `mode` | `"auto"` | `auto` plays on a clock. `scroll` pins the reel and drives the cuts from the page scroll. |
| `holdMs` | `2500` | How long a photo rests before the next cut. |
| `cutMs` | `1350` | How long a cut takes. |
| `cycleEffects` | `true` | Shift the whole transition set forward each loop, so all nine effects get an airing. |
| `label` / `sublabel` | | The badge in the top-left of the frame. |
| `intensity` | `1` | `0.5` for a calmer grade, `0` for a plain dissolve. |
| `className` | | Pass `ar-framed` when the reel sits in a sized box. |

### `ar-framed`

Without it the reel takes the full viewport height, which is what the
standalone widget is built for. With it the reel fills its parent instead, and
its HUD is sized from the container rather than the viewport — so the captions
stay in proportion in a 1150&times;600 desktop slot and a 358&times;268 phone
one alike. `/home` uses it.

> If you ever switch to `mode="scroll"`, no ancestor may have
> `overflow: hidden` — that turns the element into a scroll container and stops
> `position: sticky` working, so the reel slides past instead of pinning. Use
> `overflow: clip`. The "OUR GLIMPSES" box and the page wrapper on `/home` both
> set `overflow: hidden` today.

## Changing the photos

Edit `slides.ts`. `photo` is the path with no size suffix or extension, so
`/atom-reel/photos/club-stage` resolves to `club-stage-2200.webp` and friends.
`mode` picks the transition played on the way *out* of that photo:

| `mode` | Effect | | `mode` | Effect |
| --- | --- | --- | --- | --- |
| `0` | Liquid | | `5` | Blinds |
| `1` | Shatter | | `6` | Card |
| `2` | Shockwave | | `7` | Doors |
| `3` | Ember | | `8` | Whip |
| `4` | Iris | | | |

To add a photo, generate the six files it needs with
[ffmpeg](https://ffmpeg.org):

```sh
for w in 900 1600 2200; do
  ffmpeg -i original.jpg -vf "scale=$w:-2:flags=lanczos" \
    -c:v libwebp -quality 72 -preset photo "public/atom-reel/photos/my-photo-$w.webp"
  ffmpeg -i original.jpg -vf "scale=$w:-2:flags=lanczos" \
    -q:v 5 "public/atom-reel/photos/my-photo-$w.jpg"
done
```

Landscape at 4:3 or 16:9 works best — the reel crops to fill, so anything
important should sit near the middle of the frame.

## Accessibility and fallbacks

Every caption is real text in the page, and the whole reel is written out again
in a screen-reader-only list. Visitors who have asked for reduced motion, and
any browser without WebGL, get a plain swipeable photo strip instead. The reel
only downloads photos and creates its GPU context once it is near the screen,
stops drawing when scrolled off or backgrounded, and lowers its own resolution
rather than stuttering on a weak machine.

## Re-syncing the engine

`atom-reel.js` and `atom-reel.css` are copies of the standalone widget and
carry **one** local change between them: the default `SLIDES` paths in the JS
were rebased from `photos/…` to `/atom-reel/photos/…` so they resolve from
Next's public folder. Nothing else was touched, so a newer build of the widget
can be dropped straight in — redo that one rebase and leave `theme.css`,
`slides.ts` and `index.tsx` alone.
