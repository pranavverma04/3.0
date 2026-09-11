/**
 * Types for the vendored `atom-reel.js` engine.
 *
 * The engine is a plain IIFE that hangs `AtomReel` off `window`; importing the
 * module is a side effect, so this only needs to describe the global it leaves
 * behind. Keep it in step with the `mount()` signature in atom-reel.js.
 */

export interface AtomReelSlide {
  /** Path with no size suffix or extension, e.g. "/atom-reel/photos/club-stage". */
  photo: string;
  /** Small label above the title. */
  kicker: string;
  /** The big headline. */
  title: string;
  /** One-line description under the title. */
  line: string;
  /** Chip on the frame, and the label on the chapter rail. */
  tag: string;
  /** Description used for the canvas label and the screen-reader list. */
  alt: string;
  /**
   * Transition played on the way OUT of this photo:
   * 0 liquid, 1 shatter, 2 shockwave, 3 ember, 4 iris,
   * 5 blinds, 6 card, 7 doors, 8 whip.
   */
  mode: number;
}

export interface AtomReelOptions {
  /** 'auto' plays on a clock; 'scroll' pins the reel and follows the page scroll. */
  mode?: "auto" | "scroll";
  /** Milliseconds a photo rests before the next cut begins. */
  holdMs?: number;
  /** Milliseconds a cut takes. */
  cutMs?: number;
  /** Shift the whole transition set forward on every loop. */
  cycleEffects?: boolean;
  /** Top-left caption on the frame. */
  label?: string;
  sublabel?: string;
  /** 0 strips every flourish back to a dissolve, 1 is full strength. */
  intensity?: number;
  slides?: AtomReelSlide[];
}

export interface AtomReelInstance {
  /** Jump to a photo by index. */
  goTo(index: number): void;
  /** Park the reel at `index`, `local` of the way through its cycle. */
  seekTo(index: number, local?: number): void;
  /** Where a cut is at its midpoint, for `seekTo`. */
  midCut: number;
  /** Tear it down and free the GPU context. */
  destroy(): void;
}

declare global {
  interface Window {
    AtomReel?: {
      mount(root: HTMLElement, options?: AtomReelOptions): AtomReelInstance | undefined;
      slides: AtomReelSlide[];
      config: AtomReelOptions;
    };
  }
}

export {};
