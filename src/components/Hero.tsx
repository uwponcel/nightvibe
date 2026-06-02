import { useMemo } from 'react';
import { LogoMark } from './LogoMark';
import { RATING, getOpenState } from '../data';

const TICKER = [
  'Coupe',
  'Barbe à la lame',
  'Ligne-up',
  'Coupe enfant',
  'Taper',
  'Design',
];

export function Hero() {
  const openState = useMemo(() => getOpenState(), []);

  const tickerItems = (
    <span className="marquee-item" aria-hidden="true">
      {TICKER.map((t) => (
        <span key={t} className="marquee-item">
          {t}
          <LogoMark height={12} className="marquee-logo" />
        </span>
      ))}
    </span>
  );

  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="container hero-content">
        <p className="hero-overline">Barbershop — Saint-Jérôme</p>
        <h1 className="hero-title">
          <span className="hero-line">Les vrais</span>
          <span className="hero-line">barbiers</span>
          <span className="hero-line">
            du <span className="accent">Nord.</span>
          </span>
        </h1>
        <p className="hero-sub">
          La science de la lame. Coupes, barbes et lignes parfaites depuis
          2011.
        </p>
        <div className="hero-ctas">
          <a className="btn btn-primary" href="#infos">
            Réserver une chaise
          </a>
          <a className="btn btn-ghost" href="#services">
            Voir les services
          </a>
        </div>
        <div className="hero-trust">
          <span>
            {RATING.stars} ★ — {RATING.count} avis Google
          </span>
          <span>
            <span
              className={`open-dot ${openState.open ? 'is-open' : ''}`}
              aria-hidden="true"
            />
            {openState.label}
          </span>
        </div>
      </div>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {tickerItems}
          {tickerItems}
        </div>
      </div>
    </section>
  );
}
