export interface Realisation {
  id: string;
  title: string;
  category: string;
  categoryId: string;
  city: string;
  department: string;
  description: string;
  image: string;
  imageAlt: string;
  additionalImages?: { src: string; alt: string }[];
}

export const CATEGORIES = [
  { id: "all", label: "Toutes" },
  { id: "agencement", label: "Agencement" },
  { id: "mobilier", label: "Mobilier" },
  { id: "arts-table", label: "Arts de la table" },
  { id: "vehicule", label: "Véhicule" },
  { id: "exterieur", label: "Extérieur" },
] as const;

export const REALISATIONS: Realisation[] = [
  {
    id: "placard-claustra-chene",
    title: "Placard avec claustra en chêne massif",
    category: "Agencement",
    categoryId: "agencement",
    city: "Montesson",
    department: "78",
    description:
      "Création d'un placard intégré avec coffrage et claustra en chêne massif. L'ensemble habille l'espace sous escalier tout en apportant une touche décorative ajourée.",
    image: "/images/menuisier-montesson-78-placard-claustra.jpg",
    imageAlt: "Placard avec claustra en chêne massif à Montesson (78)",
    additionalImages: [
      {
        src: "/images/menuisier-montesson-78-placard-claustra-2.jpg",
        alt: "Vue détail du claustra en chêne massif — Montesson (78)",
      },
      {
        src: "/images/menuisier-montesson-78-placard-claustra-escalier.jpg",
        alt: "Placard claustra vue depuis l'escalier — Montesson (78)",
      },
    ],
  },
  {
    id: "placard-sur-mesure",
    title: "Placard sur mesure intégré",
    category: "Agencement",
    categoryId: "agencement",
    city: "Montesson",
    department: "78",
    description:
      "Conception et fabrication d'un placard sur mesure avec aménagement intérieur optimisé. Chaque étagère et compartiment est pensé pour maximiser le rangement.",
    image: "/images/menuisier-montesson-78-placard-sur-mesure.jpg",
    imageAlt: "Placard sur mesure à Montesson (78) — vue extérieure",
    additionalImages: [
      {
        src: "/images/menuisier-montesson-78-placard-sur-mesure-interieur.jpg",
        alt: "Vue intérieure du placard sur mesure — Montesson (78)",
      },
      {
        src: "/images/menuisier-montesson-78-placard-sur-mesure-debut.jpg",
        alt: "Début de chantier — création du placard sur mesure à Montesson (78)",
      },
    ],
  },
  {
    id: "claustra-chene",
    title: "Claustra en chêne massif",
    category: "Agencement",
    categoryId: "agencement",
    city: "Montesson",
    department: "78",
    description:
      "Claustra décoratif en chêne massif. Une pièce qui sépare les espaces tout en laissant passer la lumière, avec un travail soigné sur les proportions et les finitions.",
    image: "/images/menuisier-montesson-78-claustra-chene-massif.jpg",
    imageAlt: "Claustra en chêne massif — menuisier à Montesson (78)",
  },
  {
    id: "meuble-tv-frene",
    title: "Meuble TV en frêne massif",
    category: "Mobilier",
    categoryId: "mobilier",
    city: "Montesson",
    department: "78",
    description:
      "Meuble TV sur mesure en frêne massif avec assemblages traditionnels. Design épuré qui met en valeur la beauté naturelle du bois et son veinage unique.",
    image: "/images/menuisier-montesson-78-meuble-tv-frene-massif.jpg",
    imageAlt: "Meuble TV en frêne massif sur mesure — Montesson (78)",
    additionalImages: [
      {
        src: "/images/menuisier-montesson-78-meuble-tv-frene.jpg",
        alt: "Détail du meuble TV en frêne massif — Montesson (78)",
      },
      {
        src: "/images/menuisier-montesson-78-assemblage-frene-massif.jpg",
        alt: "Assemblage en frêne massif — détail du travail artisanal",
      },
    ],
  },
  {
    id: "chariots-xxl-pin",
    title: "Chariots XXL en pin massif",
    category: "Mobilier",
    categoryId: "mobilier",
    city: "Montesson",
    department: "78",
    description:
      "Série de chariots XXL en pin massif pour un usage professionnel. Robustes et fonctionnels, conçus pour supporter de lourdes charges au quotidien.",
    image: "/images/menuisier-montesson-78-chariot-xxl-pin.jpg",
    imageAlt: "Chariot XXL en pin massif — L'Atelier WillBois, Montesson (78)",
    additionalImages: [
      {
        src: "/images/menuisier-montesson-78-chariots-xxl-commande.jpg",
        alt: "Commande de 4 chariots XXL en pin — L'Atelier WillBois",
      },
    ],
  },
  {
    id: "planche-decouper-billot",
    title: "Planche à découper type billot",
    category: "Arts de la table",
    categoryId: "arts-table",
    city: "Montesson",
    department: "78",
    description:
      "Grande planche à découper type billot, réalisée dans le fil du bois pour une résistance optimale. Pièce à la fois utilitaire et décorative pour votre cuisine.",
    image: "/images/menuisier-montesson-78-planche-decouper-billot.jpg",
    imageAlt: "Grande planche à découper type billot — L'Atelier WillBois, Montesson (78)",
    additionalImages: [
      {
        src: "/images/menuisier-montesson-78-planche-fil-du-bois.jpg",
        alt: "Planche dans le fil du bois — travail artisanal",
      },
    ],
  },
  {
    id: "amenagement-berlingo",
    title: "Aménagement Berlingo sur mesure",
    category: "Véhicule",
    categoryId: "vehicule",
    city: "Montesson",
    department: "78",
    description:
      "Aménagement intérieur complet d'un Berlingo avec système de tiroirs sur mesure. Conception optimisée pour un accès facile aux outils et matériaux, avec test de charge validé.",
    image: "/images/menuisier-montesson-78-amenagement-berlingo-tiroirs.jpg",
    imageAlt: "Aménagement Berlingo sur mesure avec tiroirs — Montesson (78)",
    additionalImages: [
      {
        src: "/images/menuisier-montesson-78-amenagement-berlingo-sur-mesure.jpg",
        alt: "Berlingo aménagement sur mesure — vue d'ensemble",
      },
      {
        src: "/images/menuisier-montesson-78-berlingo-test-charge.jpg",
        alt: "Test de charge de l'aménagement Berlingo — Montesson (78)",
      },
    ],
  },
  {
    id: "bibliotheque-chene",
    title: "Bibliothèque sur mesure en chêne",
    category: "Agencement",
    categoryId: "agencement",
    city: "Montesson",
    department: "78",
    description:
      "Bibliothèque monumentale en chêne massif occupant tout un couloir. Chaque étagère est fabriquée sur mesure pour s'intégrer parfaitement aux dimensions de la pièce, avec un travail soigné sur les finitions.",
    image: "/images/menuisier-montesson-78-bibliotheque-sur-mesure.jpg",
    imageAlt: "Bibliothèque sur mesure en chêne massif — Montesson (78)",
    additionalImages: [
      {
        src: "/images/menuisier-montesson-78-bibliotheque-chene-detail.jpg",
        alt: "Détail de la bibliothèque en chêne — Montesson (78)",
      },
      {
        src: "/images/menuisier-montesson-78-bibliotheque-construction.jpg",
        alt: "Construction de la bibliothèque sur mesure — Montesson (78)",
      },
    ],
  },
  {
    id: "terrasse-piscine",
    title: "Terrasse piscine en bois",
    category: "Extérieur",
    categoryId: "exterieur",
    city: "Montesson",
    department: "78",
    description:
      "Rénovation complète d'une terrasse de piscine en bois. Dépose de l'ancien platelage, préparation de la structure et pose de nouvelles lames pour un rendu neuf et durable.",
    image: "/images/menuisier-montesson-78-terrasse-piscine-bois.jpg",
    imageAlt: "Terrasse piscine en bois — rénovation à Montesson (78)",
    additionalImages: [
      {
        src: "/images/menuisier-montesson-78-terrasse-piscine-avant.jpg",
        alt: "Terrasse piscine avant rénovation — Montesson (78)",
      },
      {
        src: "/images/menuisier-montesson-78-terrasse-piscine-renovation.jpg",
        alt: "Rénovation de la terrasse piscine en cours — Montesson (78)",
      },
    ],
  },
  {
    id: "terrasse-veranda",
    title: "Terrasse véranda en bois massif",
    category: "Extérieur",
    categoryId: "exterieur",
    city: "Montesson",
    department: "78",
    description:
      "Rénovation d'une grande terrasse couverte avec pose de lames en bois massif. Travail de finition avec huile de protection pour un rendu satiné et une résistance aux intempéries.",
    image: "/images/menuisier-montesson-78-terrasse-veranda-bois.jpg",
    imageAlt: "Terrasse véranda en bois massif — Montesson (78)",
    additionalImages: [
      {
        src: "/images/menuisier-montesson-78-terrasse-veranda-finie.jpg",
        alt: "Terrasse véranda terminée — Montesson (78)",
      },
      {
        src: "/images/menuisier-montesson-78-terrasse-construction.jpg",
        alt: "Construction de la terrasse — chantier en cours",
      },
    ],
  },
  {
    id: "portail-bois",
    title: "Portail et clôture en bois",
    category: "Extérieur",
    categoryId: "exterieur",
    city: "Montesson",
    department: "78",
    description:
      "Fabrication d'un portail et d'une clôture en bois et métal. Structure solide avec barreaux verticaux, alliant esthétique et sécurité pour délimiter un terrain.",
    image: "/images/menuisier-montesson-78-portail-bois-cloture.jpg",
    imageAlt: "Portail et clôture en bois — Montesson (78)",
    additionalImages: [
      {
        src: "/images/menuisier-montesson-78-portail-bois-metal.jpg",
        alt: "Portail en bois et métal — fabrication en atelier",
      },
    ],
  },
];
