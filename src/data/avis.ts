export interface Avis {
  author: string;
  rating: number;
  text: string;
  city: string;
  service: string;
  date: string;
}

// TODO: Remplacer par tes vrais avis Google
export const AVIS: Avis[] = [
  {
    author: "Sophie M.",
    rating: 5,
    text: "William a réalisé un placard sur mesure sous notre escalier. Le travail est impeccable, les finitions parfaites. Un vrai artisan passionné, je recommande les yeux fermés !",
    city: "Montesson",
    service: "Agencement sur mesure",
    date: "2025-09",
  },
  {
    author: "Marc D.",
    rating: 5,
    text: "Meuble TV en frêne massif magnifique. William a su comprendre exactement ce que nous voulions. Délais respectés, pose soignée. Merci !",
    city: "Le Vésinet",
    service: "Mobilier sur mesure",
    date: "2025-07",
  },
  {
    author: "Isabelle R.",
    rating: 5,
    text: "J'ai fait appel à William pour une terrasse en bois autour de notre piscine. Résultat superbe, travail sérieux et professionnel. Je recommande vivement.",
    city: "Chatou",
    service: "Agencement extérieur",
    date: "2025-11",
  },
  {
    author: "Laurent P.",
    rating: 5,
    text: "Des planches à découper offertes à Noël, tout le monde était ravi. Gravure laser impeccable. Un cadeau original et artisanal.",
    city: "Saint-Germain-en-Laye",
    service: "Arts de la table",
    date: "2025-12",
  },
];

export const GOOGLE_REVIEWS_URL = "https://www.google.com/search?q=avis+latelierwillbois.fr";
export const AVERAGE_RATING = 5;
export const TOTAL_REVIEWS = 4;
