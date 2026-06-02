import { useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  MapPin,
  Phone,
} from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import {
  BARBERS,
  CONTACT,
  DAY_NAMES,
  HOURS,
  REVIEWS,
  SERVICES,
  formatHours,
} from '../data';
import { LogoN } from './LogoN';

function photo(seed: string, w: number, h: number): string {
  return `https://picsum.photos/seed/${seed}/${w}/${h}?grayscale`;
}

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
              key={b.name}
              className="barber-card"
              data-reveal-i
              style={{ ['--ri' as string]: i }}
            >
              <img
                className="barber-photo"
                src={photo(b.seed, 480, 600)}
                alt={`${b.name}, ${b.title.toLowerCase()} chez Night Vibe`}
                width={480}
                height={600}
                loading="lazy"
              />
              <div className="barber-meta">
                <div>
                  <h3 className="barber-name">{b.name}</h3>
                  <p className="barber-title">{b.title}</p>
                </div>
                <a
                  className="barber-ig"
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Instagram de Night Vibe — ${b.name}`}
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

const WALL_SEEDS = ['nv-cut-1', 'nv-cut-2', 'nv-cut-3', 'nv-cut-4', 'nv-cut-5', 'nv-cut-6'];

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
            src={photo('nv-feature', 900, 1100)}
            alt="Coupe vedette de la semaine chez Night Vibe"
            width={900}
            height={1100}
            loading="lazy"
            data-reveal-i
            style={{ ['--ri' as string]: 0 }}
          />
          {WALL_SEEDS.map((seed, i) => (
            <img
              key={seed}
              className="wall-item"
              src={photo(seed, 480, 600)}
              alt={`Coupe réalisée chez Night Vibe (${i + 1})`}
              width={480}
              height={600}
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
        <p className="reviews-badge">4,9 ★ sur Google — 141 avis vérifiés</p>
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
          <p className="overline">La boutique</p>
          <h2 className="section-title">Streetwear &amp; produits</h2>
          <p>
            Vêtements urbains et produits coiffants sélectionnés par l'équipe,
            directement au shop.
          </p>
          <p className="services-note">Disponible en boutique — 314 St-Georges.</p>
        </div>
        <img
          className="boutique-photo"
          src={photo('nv-shop', 800, 600)}
          alt="Coin boutique streetwear chez Night Vibe"
          width={800}
          height={600}
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
            <MapPin className="map-pin" size={28} aria-hidden="true" />
            <p className="map-address">
              314 rue Saint-Georges
              <br />
              Saint-Jérôme, QC J7Z 5A5
            </p>
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
          <LogoN color="var(--fg)" />
          <span>Night Vibe — Saint-Jérôme</span>
        </div>
        <div className="footer-social">
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram de Night Vibe"
          >
            <Instagram size={18} />
          </a>
          <a
            href={CONTACT.facebook}
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook de Night Vibe"
          >
            <Facebook size={18} />
          </a>
        </div>
        <p className="footer-credit">© 2026 Night Vibe · Démo conçue par Nord Studio</p>
      </div>
    </footer>
  );
}
