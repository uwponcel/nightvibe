import { useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  Phone,
} from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import {
  BARBERS,
  CONTACT,
  DAY_NAMES,
  HOURS,
  RATING,
  REVIEWS,
  SERVICES,
  formatHours,
  igUrl,
} from '../data';
import { LogoMark } from './LogoMark';

export function Services() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-head">
          <p className="overline">Services</p>
          <h2 className="section-title">La science de la lame</h2>
        </div>
        <div className="services-grid reveal" ref={ref}>
          {SERVICES.map((s, i) => (
            <article
              key={s.name}
              className="service-card"
              data-reveal-i
              style={{ ['--ri' as string]: i }}
            >
              <div className="service-top">
                <h3 className="service-name">{s.name}</h3>
                <span className="service-price">{s.price}</span>
              </div>
              <p className="service-desc">{s.description}</p>
            </article>
          ))}
        </div>
        <p className="services-note">* Prix indicatifs — à confirmer.</p>
      </div>
    </section>
  );
}

const STORY_SLIDES = [
  { photo: 'story.jpg', alt: 'Façade du salon Night-Vibe, enseigne « Salon de barbiers — Night-Vibe »' },
  { photo: 'story-2.jpg', alt: "Comptoir d'accueil du salon, chandails de hockey encadrés" },
  { photo: 'story-3.jpg', alt: 'Plancher du salon : chaises, miroirs et barbiers au travail' },
  { photo: 'story-4.jpg', alt: "Salle d'attente avec fauteuils en cuir et écrans géants" },
];

const STORY_ROTATE_MS = 5000;

const SWIPE_THRESHOLD_PX = 40;

export function Story() {
  const ref = useReveal<HTMLDivElement>();
  const [slide, setSlide] = useState(0);
  const timer = useRef<number | undefined>(undefined);
  const swipeStartX = useRef<number | null>(null);
  const reduced = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    if (reduced.current) return;
    timer.current = window.setInterval(
      () => setSlide((s) => (s + 1) % STORY_SLIDES.length),
      STORY_ROTATE_MS,
    );
    return () => window.clearInterval(timer.current);
  }, []);

  const go = (i: number) => {
    window.clearInterval(timer.current);
    setSlide(((i % STORY_SLIDES.length) + STORY_SLIDES.length) % STORY_SLIDES.length);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    swipeStartX.current = e.clientX;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (swipeStartX.current === null) return;
    const dx = e.clientX - swipeStartX.current;
    swipeStartX.current = null;
    if (Math.abs(dx) >= SWIPE_THRESHOLD_PX) {
      go(slide + (dx < 0 ? 1 : -1));
    }
  };

  const onPointerCancel = () => {
    swipeStartX.current = null;
  };

  return (
    <section className="section" id="histoire">
      <div className="container story reveal" ref={ref}>
        <div className="story-text" data-reveal-i style={{ ['--ri' as string]: 0 }}>
          <p className="overline">Notre histoire</p>
          <h2 className="section-title">Une nouvelle ère</h2>
          <p>
            Depuis 2011, le 314 rue Saint-Georges a été bien plus qu'un
            local : c'était notre maison, le cœur de tout ce qu'on a bâti
            avec vous.
          </p>
          <p>
            Aujourd'hui, une nouvelle page s'écrit au{' '}
            <strong>105 rue Valmont</strong>. Nouvelle adresse, même énergie.
          </p>
          <p className="story-stats">
            Depuis 2011 · {RATING.stars} ★ · {RATING.count} avis · Saint-Jérôme
          </p>
        </div>
        <div
          className="story-carousel"
          data-reveal-i
          style={{ ['--ri' as string]: 1 }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          onPointerLeave={onPointerCancel}
        >
          {STORY_SLIDES.map((s, i) => (
            <img
              key={s.photo}
              className={`story-photo ${i === slide ? 'is-active' : ''}`}
              src={`/photos/${s.photo}`}
              alt={s.alt}
              width={1000}
              height={1332}
              loading="lazy"
            />
          ))}
          <div className="story-dots">
            {STORY_SLIDES.map((s, i) => (
              <button
                key={s.photo}
                className={i === slide ? 'is-active' : ''}
                aria-label={`Photo ${i + 1} de ${STORY_SLIDES.length}`}
                onClick={() => go(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Team() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="section" id="equipe">
      <div className="container">
        <div className="section-head">
          <p className="overline">L'équipe</p>
          <h2 className="section-title">Les barbiers</h2>
        </div>
        <div className="team-grid reveal" ref={ref}>
          {BARBERS.map((b, i) => (
            <article
              key={b.handle}
              className="barber-card"
              data-reveal-i
              style={{ ['--ri' as string]: i }}
            >
              <img
                className="barber-photo"
                src={`/photos/${b.photo}`}
                alt={`${b.name === 'Nom du barbier' ? `@${b.handle}` : b.name}, barbier chez Night-Vibe`}
                width={800}
                height={1067}
                loading="lazy"
              />
              <div className="barber-meta">
                <div>
                  <h3 className="barber-name">{b.name}</h3>
                  <p className="barber-title">
                    {b.title} · @{b.handle}
                  </p>
                </div>
                <a
                  className="barber-ig"
                  href={igUrl(b.handle)}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Instagram de @${b.handle}`}
                >
                  <Instagram size={18} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const WALL = [
  'mur-1.jpg',
  'mur-2.jpg',
  'mur-3.jpg',
  'mur-4.jpg',
  'mur-5.jpg',
  'mur-6.jpg',
  'mur-7.jpg',
  'mur-8.jpg',
];

export function Wall() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="section" id="mur">
      <div className="container">
        <div className="section-head">
          <p className="overline">Le mur</p>
          <h2 className="section-title">Coupes de la semaine</h2>
        </div>
        <div className="wall-grid reveal" ref={ref}>
          <img
            className="wall-item is-feature"
            src="/photos/mur-feature.jpg"
            alt="Dégradé à la tondeuse, gros plan chez Night-Vibe"
            width={1100}
            height={733}
            loading="lazy"
            data-reveal-i
            style={{ ['--ri' as string]: 0 }}
          />
          {WALL.map((photo, i) => (
            <img
              key={photo}
              className="wall-item"
              src={`/photos/${photo}`}
              alt={`Coupe réalisée chez Night-Vibe (${i + 1})`}
              width={800}
              height={800}
              loading="lazy"
              data-reveal-i
              style={{ ['--ri' as string]: i + 1 }}
            />
          ))}
        </div>
        <p className="wall-caption">
          <a href={CONTACT.instagram} target="_blank" rel="noreferrer">
            @nightvibe
          </a>{' '}
          — suivez les coupes de la semaine
        </p>
      </div>
    </section>
  );
}

const ROTATE_MS = 6000;

export function Reviews() {
  const ref = useReveal<HTMLDivElement>();
  const [index, setIndex] = useState(0);
  const timer = useRef<number | undefined>(undefined);
  const reduced = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    if (reduced.current) return;
    timer.current = window.setInterval(
      () => setIndex((i) => (i + 1) % REVIEWS.length),
      ROTATE_MS,
    );
    return () => window.clearInterval(timer.current);
  }, []);

  const go = (next: number) => {
    window.clearInterval(timer.current);
    setIndex((next + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <section className="section reviews" id="avis">
      <div className="container reveal" ref={ref}>
        <div className="section-head">
          <p className="overline">Avis</p>
          <h2 className="section-title">Ils nous font confiance</h2>
        </div>
        <blockquote className="review-quote" aria-live="polite">
          « {REVIEWS[index].quote} »
        </blockquote>
        <div className="review-controls">
          <button aria-label="Avis précédent" onClick={() => go(index - 1)}>
            <ChevronLeft size={18} />
          </button>
          <div className="review-dots" aria-hidden="true">
            {REVIEWS.map((_, i) => (
              <span
                key={i}
                className={`review-dot ${i === index ? 'is-active' : ''}`}
              />
            ))}
          </div>
          <button aria-label="Avis suivant" onClick={() => go(index + 1)}>
            <ChevronRight size={18} />
          </button>
        </div>
        <p className="reviews-badge">
          {RATING.stars} ★ sur Google — {RATING.count} avis vérifiés
        </p>
      </div>
    </section>
  );
}

export function Boutique() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="section" id="boutique">
      <div className="container boutique reveal" ref={ref}>
        <div className="boutique-text" data-reveal-i style={{ ['--ri' as string]: 0 }}>
          <p className="overline">Partenaire</p>
          <h2 className="section-title">Boutique La Cité</h2>
          <p>
            Streetwear et casquettes, en partenariat avec Night-Vibe. Montez à
            la mezzanine, juste au-dessus des chaises.
          </p>
          <p className="services-note">La mezzanine — 105 rue Valmont.</p>
        </div>
        <img
          className="boutique-photo"
          src="/photos/boutique.jpg"
          alt="Boutique La Cité, à la mezzanine au-dessus de Night-Vibe : vêtements et casquettes"
          width={1000}
          height={1332}
          loading="lazy"
          data-reveal-i
          style={{ ['--ri' as string]: 1 }}
        />
      </div>
    </section>
  );
}

export function Infos() {
  const ref = useReveal<HTMLDivElement>();
  const today = new Date().getDay();

  return (
    <section className="section" id="infos">
      <div className="container">
        <div className="section-head">
          <p className="overline">Infos</p>
          <h2 className="section-title">Heures &amp; contact</h2>
        </div>
        <div className="infos reveal" ref={ref}>
          <div data-reveal-i style={{ ['--ri' as string]: 0 }}>
            <table className="hours-table">
              <tbody>
                {[1, 2, 3, 4, 5, 6, 0].map((d) => (
                  <tr key={d} className={d === today ? 'is-today' : ''}>
                    <td>{DAY_NAMES[d]}</td>
                    <td>{formatHours(HOURS[d])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="infos-contact">
              <a className="btn btn-primary" href={CONTACT.phoneHref}>
                <Phone size={16} />
                Appelez pour réserver — {CONTACT.phone}
              </a>
            </div>
          </div>
          <div className="map-card" data-reveal-i style={{ ['--ri' as string]: 1 }}>
            <iframe
              className="map-frame"
              title="Carte : Night-Vibe, 105 rue Valmont, Saint-Jérôme"
              src="https://www.google.com/maps?q=105+rue+Valmont,+Saint-J%C3%A9r%C3%B4me,+QC&hl=fr&z=15&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <p className="map-address">105 rue Valmont · Saint-Jérôme, QC</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <LogoMark height={26} />
          <span>Night-Vibe — Saint-Jérôme</span>
        </div>
        <div className="footer-social">
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram de Night-Vibe"
          >
            <Instagram size={18} />
          </a>
          <a
            href={CONTACT.facebook}
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook de Night-Vibe"
          >
            <Facebook size={18} />
          </a>
        </div>
        <p className="footer-credit">© 2026 Night-Vibe · Démo conçue par Nord Studio</p>
      </div>
    </footer>
  );
}
