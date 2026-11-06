"use client";

import { useEffect } from "react";

/**
 * Port of the Sillage template's inline "motion-kit" and scene scripts.
 *
 * The CSS in sillage.css only animates when <html data-8b-live> is set (done in
 * layout.tsx before paint). Elements with data-8b-motion start paused and play
 * once this kit gives them the `is-in` class; groups with data-8b-items get
 * --i / --n indexes; the method and experience scenes get measured offsets.
 * Without this component those elements would stay hidden in their first frame.
 */

type Box = { x: number; y: number; w: number; h: number };

declare global {
  interface Window {
    motionKit?: {
      live: boolean;
      wheel?: { stop(): void; start(): void };
    };
  }
}

const box = (element: HTMLElement): Box => {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = element;
  while (node) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y, w: element.offsetWidth, h: element.offsetHeight };
};

const set = (element: HTMLElement, vars: Record<string, string | number>) => {
  for (const [name, value] of Object.entries(vars)) element.style.setProperty(name, String(value));
};

const run = (fn: () => void) => {
  try {
    fn();
  } catch (error) {
    console.error("[motion-kit] measure failed", error);
  }
};

export default function MotionKit() {
  useEffect(() => {
    const root = document.documentElement;
    const live = root.hasAttribute("data-8b-live");
    window.motionKit = { live };
    const cleanups: Array<() => void> = [];

    // Hero: pause the drifting photo and wordmark streaks once scrolled past.
    const hero = document.getElementById("hero");
    if (hero) {
      const heroObserver = new IntersectionObserver(([entry]) =>
        hero.toggleAttribute("data-paused", !entry.isIntersecting)
      );
      heroObserver.observe(hero);
      cleanups.push(() => heroObserver.disconnect());
    }

    if (!live) return () => cleanups.forEach((fn) => fn());

    const on = <K extends keyof WindowEventMap>(
      target: Window | Document,
      type: K,
      handler: (event: WindowEventMap[K]) => void,
      options?: AddEventListenerOptions | boolean
    ) => {
      target.addEventListener(type, handler as EventListener, options);
      cleanups.push(() => target.removeEventListener(type, handler as EventListener, options));
    };

    /* ---------- measuring ---------- */
    const measures = new Set<() => void>();
    const realign = () =>
      document.getAnimations().forEach((animation) => {
        if (
          animation.timeline &&
          animation.timeline !== document.timeline &&
          animation.playState === "running"
        ) {
          animation.pause();
          animation.play();
        }
      });
    let queued = false;
    const remeasure = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        measures.forEach(run);
        realign();
      });
    };
    const measure = (fn: () => void) => {
      measures.add(fn);
      run(fn);
    };
    const scene = (id: string, fn: () => void) => {
      try {
        fn();
      } catch (error) {
        console.error(`[motion-kit] scene ${id} failed; its section stays static`, error);
      }
    };

    /* ---------- item indexes (--i / --n) ---------- */
    measure(() =>
      document.querySelectorAll<HTMLElement>("[data-8b-items]").forEach((group) => {
        let items: HTMLElement[];
        try {
          items = [...group.querySelectorAll<HTMLElement>(group.getAttribute("data-8b-items") || "")];
        } catch {
          return;
        }
        items.forEach((item, index) => set(item, { "--i": index, "--n": items.length }));
      })
    );

    /* ---------- scene: method (sideways track) ---------- */
    // Scenes only run on pages that have their section (not on /works/<id>).
    if (document.getElementById("method")) scene("method", () => {
      const section = document.getElementById("method");
      const track = section?.querySelector<HTMLElement>(".method__track");
      const frames = track ? [...track.querySelectorAll<HTMLElement>(".method__frame")] : [];
      if (!section || !track || !section.querySelector(".method__stage") || !frames.length)
        throw new Error("method: stage or frames missing");
      measure(() => {
        const room = section.clientWidth - parseFloat(getComputedStyle(section).paddingLeft) * 2;
        const distance = Math.max(0, track.scrollWidth - room);
        set(section, {
          "--method-distance": `${distance}px`,
          "--method-d": distance,
          "--method-w": window.innerWidth,
        });
        frames.forEach((frame) => set(frame, { "--method-x": box(frame).x }));
      });
    });

    /* ---------- scene: experience (cards deal out from a stack) ---------- */
    if (document.getElementById("experience")) scene("experience", () => {
      const grid = document.querySelector<HTMLElement>("#experience .crew__grid");
      const cards = grid ? [...grid.querySelectorAll<HTMLElement>(".crew__card")] : [];
      if (!grid || !cards.length) throw new Error("experience: cards missing");
      measure(() => {
        const area = box(grid);
        const first = box(cards[0]);
        const x = area.x + area.w / 2;
        const y = first.y + first.h * 0.45;
        cards.forEach((card) => {
          const own = box(card);
          set(card, {
            "--crew-dx": `${x - own.x - own.w / 2}px`,
            "--crew-dy": `${y - own.y - own.h * 0.45}px`,
          });
        });
      });
    });

    requestAnimationFrame(realign);
    const resizeObserver = new ResizeObserver(remeasure);
    resizeObserver.observe(document.body);
    cleanups.push(() => resizeObserver.disconnect());
    document.fonts?.ready.then(remeasure);
    on(window, "load", remeasure);

    /* ---------- reveal: add .is-in when an element enters the viewport ---------- */
    const enterAt = (element: Element) => {
      const own = /^(\d{1,3}(?:\.\d+)?)%$/.exec((element.getAttribute("data-8b-enter") || "").trim());
      return own && +own[1] <= 100 ? +own[1] / 100 : 0.88;
    };
    let pending = [...document.querySelectorAll<HTMLElement>("[data-8b-motion]")].map((element) => ({
      element,
      y: 0,
      at: enterAt(element),
    }));
    let checkQueued = false;
    const check = () => {
      checkQueued = false;
      pending = pending.filter((item) => {
        if (item.y > window.scrollY + window.innerHeight * item.at) return true;
        item.element.classList.add("is-in");
        return false;
      });
    };
    const queueCheck = () => {
      if (!checkQueued) {
        checkQueued = true;
        requestAnimationFrame(check);
      }
    };
    measure(() => {
      pending.forEach((item) => {
        item.y = box(item.element).y;
      });
      queueCheck();
    });
    on(window, "scroll", queueCheck, { passive: true });

    /* ---------- pause infinite animations while off screen ---------- */
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(
      "[data-8b-off],[data-8b-off]::before,[data-8b-off]::after{animation-play-state:paused!important}"
    );
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
    cleanups.push(() => {
      document.adoptedStyleSheets = document.adoptedStyleSheets.filter((s) => s !== sheet);
    });
    const watch = new IntersectionObserver((entries) =>
      entries.forEach((entry) => entry.target.toggleAttribute("data-8b-off", !entry.isIntersecting))
    );
    cleanups.push(() => watch.disconnect());
    const watched = new WeakSet<Element>();
    const scan = () =>
      document.getAnimations().forEach((animation) => {
        const effect = animation.effect as KeyframeEffect | null;
        const element = effect?.target;
        if (
          !element ||
          watched.has(element) ||
          effect.getTiming().iterations !== Infinity ||
          animation.timeline !== document.timeline
        )
          return;
        watched.add(element);
        watch.observe(element);
      });
    scan();
    on(window, "load", scan);
    document.addEventListener("animationstart", scan, true);
    cleanups.push(() => document.removeEventListener("animationstart", scan, true));

    /* ---------- smooth wheel scrolling (mouse / trackpad only) ---------- */
    if (window.matchMedia("(pointer: fine)").matches) {
      let target = window.scrollY;
      let current = window.scrollY;
      let last = 0;
      let running = false;
      let paused = false;
      const scrollsInside = (start: EventTarget | null, dy: number) => {
        for (
          let node = start instanceof Element ? start : null;
          node && node !== document.body && node !== root;
          node = node.parentElement
        ) {
          if (!/(auto|scroll)/.test(getComputedStyle(node).overflowY) || node.scrollHeight <= node.clientHeight)
            continue;
          if (dy > 0 ? node.scrollTop + node.clientHeight < node.scrollHeight - 1 : node.scrollTop > 0) return true;
        }
        return false;
      };
      const step = (now: number) => {
        current += (target - current) * (1 - Math.exp(-5.3 * Math.min(0.05, (now - last) / 1000)));
        last = now;
        if (Math.abs(target - current) < 0.5) current = target;
        window.scrollTo({ top: current, behavior: "instant" });
        if (current !== target) requestAnimationFrame(step);
        else running = false;
      };
      on(
        window,
        "wheel",
        (event) => {
          if (
            paused ||
            event.ctrlKey ||
            Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
            scrollsInside(event.target, event.deltaY)
          )
            return;
          event.preventDefault();
          if (!running) target = current = window.scrollY;
          const unit = event.deltaMode === 1 ? 40 : event.deltaMode === 2 ? window.innerHeight : 1;
          target = Math.max(
            0,
            Math.min(root.scrollHeight - window.innerHeight, target + event.deltaY * unit * 0.95)
          );
          if (!running) {
            running = true;
            last = performance.now();
            requestAnimationFrame(step);
          }
        },
        { passive: false }
      );
      // Keyboard, scrollbar and anchor jumps move the page without the wheel:
      // resync so the next wheel tick starts from the real position.
      on(window, "scroll", () => {
        if (!running) target = current = window.scrollY;
      }, { passive: true });
      window.motionKit.wheel = {
        stop() {
          paused = true;
        },
        start() {
          paused = false;
        },
      };
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
