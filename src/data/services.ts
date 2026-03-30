export interface Service {
  id: string;
  title: string;
  slug: string;
  icon: string;
  description: string;
  shortDescription: string;
  image: string;
  imageAlt: string;
  features: string[];
  priceIndication?: string;
}

export const SERVICES: Service[] = [
  {
    id: "agencement",
    title: "Agencement sur mesure",
    slug: "agencement-sur-mesure",
    icon: "PanelTopClose",
    description:
      "Placards, dressings, claustras, bibliothèques encastrées… Chaque espace est unique, chaque agencement est pensé pour s'y intégrer parfaitement. De Montesson à Boulogne-Billancourt, je conçois et fabrique des rangements sur mesure qui optimisent votre intérieur dans les Yvelines (78) et Hauts-de-Seine (92).",
    shortDescription:
      "Placards, dressings, claustras et rangements intégrés conçus pour s'adapter parfaitement à votre intérieur.",
    image: "/images/menuisier-montesson-78-placard-claustra.webp",
    imageAlt: "Placard sur mesure avec claustra en chêne massif — menuisier à Montesson (78)",
    features: [
      "Placards et dressings sur mesure",
      "Claustras en bois massif",
      "Bibliothèques encastrées",
      "Coffrages et habillages",
      "Optimisation de chaque recoin",
    ],
    priceIndication: "Sur devis — à partir de 800 €",
  },
  {
    id: "mobilier",
    title: "Mobilier sur mesure",
    slug: "mobilier-sur-mesure",
    icon: "Armchair",
    description:
      "Meubles TV, tables, étagères, consoles… Je fabrique du mobilier unique en bois massif — chêne, frêne, hêtre — avec des assemblages traditionnels. Livraison et pose dans tout le 78 (Versailles, Saint-Germain-en-Laye) et le 92 (Nanterre, Rueil-Malmaison).",
    shortDescription:
      "Meubles TV, tables et mobilier unique fabriqués en bois massif avec des assemblages traditionnels.",
    image: "/images/menuisier-montesson-78-meuble-tv-frene-massif.webp",
    imageAlt: "Meuble TV en frêne massif sur mesure — menuisier à Montesson (78)",
    features: [
      "Meubles TV sur mesure",
      "Tables et consoles",
      "Étagères et bibliothèques",
      "Chariots et dessertes",
      "Assemblages traditionnels",
    ],
    priceIndication: "Sur devis — à partir de 500 €",
  },
  {
    id: "semi-sur-mesure",
    title: "Semi sur mesure",
    slug: "semi-sur-mesure",
    icon: "Layers",
    description:
      "Vous avez déjà un meuble ou une base standard ? Je le sublime avec des éléments en bois massif sur mesure : façades, plans de travail, étagères, habillages… Le semi sur mesure combine le rapport qualité-prix d'un meuble existant avec la noblesse du bois massif. Disponible dans les Yvelines et les Hauts-de-Seine.",
    shortDescription:
      "Sublimez vos meubles existants avec des éléments en bois massif sur mesure — façades, plans de travail, habillages.",
    image: "/images/menuisier-montesson-78-agencement-etageres.webp",
    imageAlt: "Agencement semi sur mesure avec étagères en bois — menuisier à Montesson (78)",
    features: [
      "Façades en bois massif sur meuble existant",
      "Plans de travail sur mesure",
      "Habillages et finitions bois noble",
      "Étagères et ajouts personnalisés",
      "Rapport qualité-prix optimisé",
    ],
    priceIndication: "Sur devis — à partir de 300 €",
  },
  {
    id: "arts-table",
    title: "Arts de la table",
    slug: "arts-de-la-table",
    icon: "UtensilsCrossed",
    description:
      "Planches à découper, billots, plateaux de service… Des pièces utilitaires en bois massif, façonnées avec soin dans mon atelier à Montesson (78). Personnalisation par gravure laser pour un cadeau unique. Retrait en atelier ou livraison dans le 78 et 92.",
    shortDescription:
      "Planches à découper, billots et accessoires en bois massif. Gravure laser personnalisée disponible.",
    image: "/images/menuisier-montesson-78-planche-decouper-billot.webp",
    imageAlt: "Grande planche à découper type billot en bois massif — L'Atelier WillBois",
    features: [
      "Planches à découper artisanales",
      "Billots de cuisine",
      "Plateaux de service",
      "Gravure laser personnalisée",
      "Bois massif alimentaire",
    ],
    priceIndication: "À partir de 45 €",
  },
  {
    id: "amenagement-vehicule",
    title: "Aménagement véhicule utilitaire",
    slug: "amenagement-vehicule",
    icon: "Truck",
    description:
      "Aménagement intérieur sur mesure pour véhicules utilitaires : tiroirs, rangements, plans de travail. Conception optimisée pour maximiser l'espace et la praticité. Intervention dans les Yvelines (78) et Hauts-de-Seine (92). Test de charge inclus.",
    shortDescription:
      "Aménagement intérieur sur mesure pour utilitaires — tiroirs, rangements et plans de travail optimisés.",
    image: "/images/menuisier-montesson-78-amenagement-berlingo-tiroirs.webp",
    imageAlt: "Aménagement Berlingo sur mesure avec tiroirs — menuisier à Montesson (78)",
    features: [
      "Tiroirs et rangements sur mesure",
      "Plans de travail intégrés",
      "Optimisation de l'espace utilitaire",
      "Bois massif résistant",
      "Test de charge systématique",
    ],
    priceIndication: "Sur devis",
  },
  {
    id: "exterieur",
    title: "Agencement extérieur",
    slug: "agencement-exterieur",
    icon: "Fence",
    description:
      "Terrasses en bois, platelages de piscine, vérandas, portails et clôtures… Je conçois et réalise vos aménagements extérieurs sur mesure à Montesson, Le Vésinet, Chatou et dans tout le 78 et 92. De la rénovation de terrasse à la création d'un portail, chaque projet est adapté à votre extérieur.",
    shortDescription:
      "Terrasses, platelages piscine, portails et clôtures — aménagements extérieurs sur mesure en bois.",
    image: "/images/menuisier-montesson-78-terrasse-veranda-bois.webp",
    imageAlt: "Terrasse en bois sur mesure — menuisier à Montesson (78)",
    features: [
      "Terrasses en bois sur mesure",
      "Platelage de piscine",
      "Rénovation de terrasses existantes",
      "Portails et clôtures en bois",
      "Vérandas et pergolas",
    ],
    priceIndication: "Sur devis",
  },
];
