export interface Service {
  name: string;
  description: string;
  price: string;
}

export const SERVICES: Service[] = [
  {
    name: 'Coupe classique',
    description: 'Coupe sur mesure, consultation incluse, finition à la lame.',
    price: '35 $',
  },
  {
    name: 'Coupe + barbe',
    description: 'Le combo complet. Coupe, barbe sculptée, serviette chaude.',
    price: '55 $',
  },
  {
    name: 'Barbe à la lame',
    description: 'Rasage traditionnel au coupe-chou. La science de la lame.',
    price: '30 $',
  },
  {
    name: 'Ligne-up / contours',
    description: 'Contours nets entre deux coupes. Rapide et précis.',
    price: '20 $',
  },
  {
    name: 'Coupe enfant',
    description: '12 ans et moins. Patience et précision garanties.',
    price: '25 $',
  },
  {
    name: 'Design / gravures',
    description: 'Lignes et motifs gravés. Apportez votre idée, on exécute.',
    price: '10 $+',
  },
];

export interface Barber {
  name: string;
  title: string;
  handle: string;
  /** filename under /photos, or null for the "photo à venir" card */
  photo: string | null;
}

export const BARBERS: Barber[] = [
  { name: '2Saï', title: 'Maître barbier', handle: 'alexis.2sai.grullon', photo: 'equipe-2sai.jpg' },
  { name: 'Nom du barbier', title: 'Barbier', handle: 'barbercampos', photo: 'equipe-1.jpg' },
  { name: 'Nom du barbier', title: 'Barbier', handle: 'yankenoby', photo: 'equipe-2.jpg' },
  { name: 'Nom du barbier', title: 'Barbier', handle: 'molasauce', photo: 'equipe-3.jpg' },
  { name: 'Nom du barbier', title: 'Barbier', handle: 'tony.sama_', photo: 'equipe-4.jpg' },
  { name: 'Nom du barbier', title: 'Barbier', handle: 'cdingz.z', photo: 'equipe-5.jpg' },
  { name: 'Nom du barbier', title: 'Barbier', handle: 'bonsgood', photo: null },
];

export interface Review {
  quote: string;
  author: string;
}

export const REVIEWS: Review[] = [
  {
    quote:
      'Attention aux détails incroyable. Ils prennent le temps de comprendre exactement ce que tu veux.',
    author: 'Avis Google',
  },
  {
    quote: 'Ambiance hip-hop, place propre, coupe parfaite à chaque fois.',
    author: 'Avis Google',
  },
  {
    quote: 'Les vrais pros du Nord. Je ne vais plus nulle part ailleurs.',
    author: 'Avis Google',
  },
];

export const RATING = { stars: '4,9', count: 268 };

/** [open, close] in hours, or null when closed. Index 0 = Sunday. */
export const HOURS: ([number, number] | null)[] = [
  null, // dimanche
  null, // lundi
  [10, 19], // mardi
  [10, 19], // mercredi
  [10, 19], // jeudi
  [10, 19], // vendredi
  [10, 16], // samedi
];

export const DAY_NAMES = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
];

export function formatHours(slot: [number, number] | null): string {
  if (!slot) return 'Fermé';
  return `${slot[0]} h – ${slot[1]} h`;
}

export interface OpenState {
  open: boolean;
  label: string;
}

export function getOpenState(now: Date = new Date()): OpenState {
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;
  const today = HOURS[day];

  if (today && hour >= today[0] && hour < today[1]) {
    return { open: true, label: 'Ouvert en ce moment' };
  }

  // Find next opening.
  for (let i = 0; i < 7; i++) {
    const d = (day + i) % 7;
    const slot = HOURS[d];
    if (!slot) continue;
    if (i === 0 && hour >= slot[0]) continue; // already past today's opening
    const dayLabel = i === 0 ? '' : ` ${DAY_NAMES[d].toLowerCase().slice(0, 3)}`;
    return { open: false, label: `Fermé — réouverture${dayLabel} ${slot[0]} h` };
  }
  return { open: false, label: 'Fermé' };
}

export const CONTACT = {
  phone: '(450) 432-4774',
  phoneHref: 'tel:+14504324774',
  address: '105 rue Valmont, Saint-Jérôme, QC',
  instagram: 'https://www.instagram.com/nightvibe/',
  facebook: 'https://www.facebook.com/boutiquenightvibe/',
};

export function igUrl(handle: string): string {
  return `https://www.instagram.com/${handle}/`;
}
