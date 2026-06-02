import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LogoMark } from './LogoMark';

const LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#equipe', label: 'Équipe' },
  { href: '#mur', label: 'Le mur' },
  { href: '#avis', label: 'Avis' },
  { href: '#infos', label: 'Infos' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container nav-inner">
          <a href="#" className="nav-logo" aria-label="Night-Vibe — accueil">
            <LogoMark height={30} />
            <span>Night-Vibe</span>
          </a>
          <nav aria-label="Navigation principale">
            <ul className="nav-links">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <a className="btn btn-primary" href="#infos">
            Réserver
          </a>
          <button
            className="nav-burger"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>
      {open && (
        <nav className="mobile-menu" aria-label="Navigation mobile">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a
            className="btn btn-primary"
            href="#infos"
            onClick={() => setOpen(false)}
          >
            Réserver
          </a>
        </nav>
      )}
    </>
  );
}
