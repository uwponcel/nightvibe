import { useEffect, useRef } from 'react';
import { animate, createTimeline, cubicBezier, engine, stagger } from 'animejs';
import { LogoMark } from './LogoMark';

// Keep the intro running even when the tab/window is not visible (it is
// short, and freezing it would leave the overlay stuck on screen).
engine.pauseOnDocumentHidden = false;

const SEEN_KEY = 'nv_intro_seen';

/**
 * "The Lock & The Reveal" intro.
 *
 * Phase 1 — Lock: the N mark snaps into place (scale settle + a white flash
 * along its diagonal seam) and the wordmark staggers in.
 *
 * Phase 2 — Reveal: the overlay is two vertical panels, each holding a
 * synchronized copy of the locked stage. They slide apart, splitting the
 * screen through the logo and revealing the hero beneath.
 */
export function Intro({ onDone }: { onDone: () => void }) {
  const skipped =
    sessionStorage.getItem(SEEN_KEY) === '1' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (skipped) {
      sessionStorage.setItem(SEEN_KEY, '1');
      onDone();
      return;
    }

    const root = rootRef.current;
    if (!root) return;

    // The engine may have auto-paused if the document was hidden at load.
    if (engine.paused) engine.resume();

    document.body.style.overflow = 'hidden';

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      sessionStorage.setItem(SEEN_KEY, '1');
      document.body.style.overflow = '';
      onDone();
    };

    const tl = createTimeline({
      defaults: { ease: cubicBezier(0.16, 1, 0.3, 1) },
      onComplete: finish,
    });
    // Dev/demo affordance: allows scrubbing the intro from the console.
    (window as Window & { __nvTl?: unknown }).__nvTl = tl;

    tl.add('.intro-lock .intro-logo', {
      opacity: [0, 1],
      scale: [1.12, 1],
      duration: 750,
    })
      .add('.intro-lock .seam-flash', { opacity: [0, 1, 0], duration: 220 }, '-=180')
      .add(
        '.intro-lock .wm-letter',
        {
          translateY: [22, 0],
          opacity: [0, 1],
          delay: stagger(28),
          duration: 480,
        },
        '-=120',
      )
      // Swap the single lock stage for the duplicated panel stages.
      .add('.intro-lock', { opacity: [1, 0], duration: 0 }, '+=350')
      .add('.intro-panels', { opacity: [0, 1], duration: 0 }, '<')
      .add('.panel-left', { translateX: ['0%', '-100%'], duration: 1000 }, '<')
      .add('.panel-right', { translateX: ['0%', '100%'], duration: 1000 }, '<')
      .add('.intro-root', { opacity: [1, 0], duration: 150 }, '-=100');

    const skip = () => {
      tl.pause();
      animate('.intro-root', {
        opacity: 0,
        duration: 200,
        ease: 'linear',
        onComplete: finish,
      });
    };

    root.addEventListener('pointerdown', skip);
    window.addEventListener('keydown', skip);

    return () => {
      root.removeEventListener('pointerdown', skip);
      window.removeEventListener('keydown', skip);
      document.body.style.overflow = '';
      tl.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (skipped) return null;

  const stage = (
    <div className="intro-stage" aria-hidden="true">
      <div className="intro-logo">
        <LogoMark className="intro-logo-img" />
        <div className="seam-flash" />
      </div>
      <p className="intro-wordmark">
        {'BARBIER BORÉAL'.split('').map((ch, i) => (
          <span key={i} className="wm-letter">
            {ch === ' ' ? ' ' : ch}
          </span>
        ))}
      </p>
    </div>
  );

  return (
    <div className="intro-root" ref={rootRef} role="presentation">
      {/* Phase 2 panels (behind the lock stage until the swap) */}
      <div className="intro-panels">
        <div className="panel panel-left">{stage}</div>
        <div className="panel panel-right">{stage}</div>
      </div>
      {/* Phase 1 lock stage */}
      <div className="intro-lock">{stage}</div>
      <p className="intro-skip">Cliquez pour passer</p>
    </div>
  );
}
