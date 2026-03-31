export interface Avis {
  author: string;
  rating: number;
  text: string;
  city: string;
  service: string;
  date: string;
}

// Dernière mise à jour : 2026-03-31 — Source : avis Google vérifiés
export const AVIS: Avis[] = [
  {
    author: "Bagheera",
    rating: 5,
    text: "👍 Top 👍 Number 1 🏆 rapport qualité/prix Très professionnel, ponctuel et sympathique Commande de toutes mes portes de placard sur mesure + pose, histoire de donner un petit coup de neuf... Résultat au delà de mes attentes, j'ai l'impression d'avoir changé de cuisine , trop beau !!!!! 😍😍 Mille merciiiiii 🥰🥰",
    city: "Montesson",
    service: "Portes de placard sur mesure",
    date: "2026-03-01",
  },
  {
    author: "Aurélien T.",
    rating: 5,
    text: "Nous avons sollicité William pour la pose d'un dressing que nous voulions dans un esprit « sur-mesure » et nous pouvons que le recommander pour la qualité de son travail. Que cela soit au niveau du savoir-faire, ou son savoir-être, William a vraiment effectué sa prestation avec minutie et a été l'écoute de nos besoins. Nous ne manquerons pas de faire appel à lui à nouveau",
    city: "Montesson",
    service: "Dressing sur mesure",
    date: "2025-12-01",
  },
  {
    author: "H.A.",
    rating: 5,
    text: "Nous avons fait appel à Will Bois pour la réalisation de nos marches d'escaliers en chêne, et ce fut une très belle surprise. Il a su parfaitement comprendre nos attentes, tout en nous conseillant avec justesse. Son travail s'est distingué par une grande précision, une minutie remarquable et un véritable souci du détail. Il a pris le temps nécessaire pour livrer un résultat soigné. Un immense merci pour votre professionnalisme et la qualité exceptionnelle de votre travail. Vous faites honneur à votre métier !!!",
    city: "Montesson",
    service: "Escalier en chêne",
    date: "2025-08-01",
  },
];

export const GOOGLE_REVIEWS_URL = "https://www.google.com/search?q=avis+latelierwillbois.fr";
export const AVERAGE_RATING = 5;
export const TOTAL_REVIEWS = 3;
