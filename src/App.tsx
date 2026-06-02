import { useEffect, useState } from 'react';
import './App.css';
import { Intro } from './components/Intro';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import {
  Boutique,
  Footer,
  Infos,
  Reviews,
  Services,
  Team,
  Wall,
} from './components/Sections';

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [introKey, setIntroKey] = useState(0);

  // Demo affordance: replay the intro via `window.__nvIntroReplay()`.
  useEffect(() => {
    (window as Window & { __nvIntroReplay?: () => void }).__nvIntroReplay =
      () => {
        sessionStorage.removeItem('nv_intro_seen');
        setIntroDone(false);
        setIntroKey((k) => k + 1);
      };
  }, []);

  return (
    <>
      <a className="skip-link" href="#services">
        Aller au contenu
      </a>
      {!introDone && (
        <Intro key={introKey} onDone={() => setIntroDone(true)} />
      )}
      <Nav />
      <main>
        <Hero />
        <div className="seam-divider" aria-hidden="true" />
        <Services />
        <div className="seam-divider" aria-hidden="true" />
        <Team />
        <div className="seam-divider" aria-hidden="true" />
        <Wall />
        <div className="seam-divider" aria-hidden="true" />
        <Reviews />
        <div className="seam-divider" aria-hidden="true" />
        <Boutique />
        <div className="seam-divider" aria-hidden="true" />
        <Infos />
      </main>
      <Footer />
    </>
  );
}
