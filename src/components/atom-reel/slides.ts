import type { AtomReelSlide } from "./atom-reel";

/**
 * The photos the reel cuts between. These are the same five club photographs
 * the old /imagespk carousel used, re-encoded to the three widths the reel
 * needs (-900, -1600, -2200 in both .webp and .jpg) under
 * public/atom-reel/photos.
 *
 * `mode` is the transition played on the way OUT of each photo:
 *   0 liquid   1 shatter   2 shockwave   3 ember   4 iris
 *   5 blinds   6 card      7 doors       8 whip
 * With `cycleEffects` on (the default) these are a starting point only — the
 * whole set shifts forward each loop, so all nine effects get an airing.
 */
export const REEL_SLIDES: AtomReelSlide[] = [
  {
    photo: "/atom-reel/photos/club-stage",
    kicker: "The club",
    title: "A.T.O.M Robotics",
    line: "The full club together on stage.",
    tag: "The club",
    alt: "The full A.T.O.M Robotics club gathered on stage under a lit atom logo.",
    mode: 0,
  },
  {
    photo: "/atom-reel/photos/build-squad",
    kicker: "The team",
    title: "The Build Squad",
    line: "The core team with their robots, on demo day.",
    tag: "Build team",
    alt: "Eight robotics club members seated on steps behind their robots and a drone.",
    mode: 1,
  },
  {
    photo: "/atom-reel/photos/showcase-table",
    kicker: "Demo day",
    title: "The Showcase Table",
    line: "Walking visitors through a build at the showcase.",
    tag: "Showcase",
    alt: "A student demonstrating a robot on a table, surrounded by a crowd of visitors.",
    mode: 2,
  },
  {
    photo: "/atom-reel/photos/campus-session",
    kicker: "Event",
    title: "Campus Session",
    line: "A full-house auditorium session on robotics.",
    tag: "Event",
    alt: "A packed campus auditorium during a robotics talk, with a presentation slide on the stage screen.",
    mode: 3,
  },
  {
    photo: "/atom-reel/photos/launch-day",
    kicker: "Launch day",
    title: "Launch Day",
    line: "The club celebrating together on campus.",
    tag: "Campus",
    alt: "Robotics club members holding up a large event banner outdoors.",
    mode: 4,
  },
];
