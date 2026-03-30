export interface Realisation {
  id: string;
  title: string;
  category: string;
  categoryId: string;
  city: string;
  department: string;
  description: string;
  details?: string;
  materials?: string[];
  duration?: string;
  techniques?: string[];
  image: string;
  imageAlt: string;
  beforeImage?: { src: string; alt: string };
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
    details:
      "Le client souhaitait optimiser l'espace sous son escalier avec un rangement fonctionnel, tout en créant une séparation visuelle élégante. Le claustra en chêne massif a été dessiné sur mesure avec un espacement régulier des lames pour laisser passer la lumière naturelle. Le coffrage intègre un système de portes invisibles pour accéder au rangement.",
    materials: ["Chêne massif", "Quincaillerie invisible"],
    duration: "3 semaines",
    techniques: ["Assemblage tenon-mortaise", "Finition huile naturelle"],
    image: "/images/menuisier-montesson-78-placard-claustra.jpg",
    imageAlt: "Placard avec claustra en chêne massif à Montesson (78)",
    additionalImages: [
      { src: "/images/menuisier-montesson-78-placard-claustra-2.jpg", alt: "Vue détail du claustra en chêne massif — Montesson (78)" },
      { src: "/images/menuisier-montesson-78-placard-claustra-escalier.jpg", alt: "Placard claustra vue depuis l'escalier — Montesson (78)" },
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
      "Conception et fabrication d'un placard sur mesure avec aménagement intérieur optimisé.",
    details:
      "Placard encastré du sol au plafond, conçu pour exploiter chaque centimètre. L'intérieur est entièrement modulable : étagères ajustables, compartiments dédiés, et tringles. Les portes affleurent le mur pour un rendu épuré et intégré à l'architecture de la pièce.",
    materials: ["Panneaux mélaminé", "Chêne massif pour les façades"],
    duration: "2 semaines",
    techniques: ["Prise de cotes laser", "Pose encastrée"],
    image: "/images/menuisier-montesson-78-placard-sur-mesure.jpg",
    imageAlt: "Placard sur mesure à Montesson (78) — vue extérieure",
    beforeImage: {
      src: "/images/menuisier-montesson-78-placard-sur-mesure-debut.jpg",
      alt: "Avant — début de chantier, espace vide avant création du placard",
    },
    additionalImages: [
      { src: "/images/menuisier-montesson-78-placard-sur-mesure-interieur.jpg", alt: "Vue intérieure du placard sur mesure — Montesson (78)" },
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
      "Claustra décoratif en chêne massif. Sépare les espaces tout en laissant passer la lumière.",
    details:
      "Pièce maîtresse de la pièce de vie, ce claustra a été conçu pour créer une séparation visuelle entre l'entrée et le salon sans cloisonner. Les lames verticales en chêne massif sont espacées de façon régulière, créant un jeu d'ombres et de lumières tout au long de la journée. Finition à l'huile dure pour un toucher soyeux.",
    materials: ["Chêne massif"],
    duration: "1 semaine",
    techniques: ["Lames verticales usinées", "Finition huile dure"],
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
      "Meuble TV sur mesure en frêne massif avec assemblages traditionnels.",
    details:
      "Ce meuble TV bas a été conçu pour s'intégrer sous une grande fenêtre. Le frêne a été choisi pour son veinage prononcé et sa teinte claire. Les assemblages sont entièrement traditionnels (tenon-mortaise, queue d'aronde) sans aucune vis apparente. Le plateau de 4 cm d'épaisseur donne à la pièce une présence forte et chaleureuse.",
    materials: ["Frêne massif", "Assemblages bois uniquement"],
    duration: "2 semaines",
    techniques: ["Tenon-mortaise", "Queue d'aronde", "Ponçage grain 320"],
    image: "/images/menuisier-montesson-78-meuble-tv-frene-massif.jpg",
    imageAlt: "Meuble TV en frêne massif sur mesure — Montesson (78)",
    additionalImages: [
      { src: "/images/menuisier-montesson-78-meuble-tv-frene.jpg", alt: "Détail du meuble TV en frêne massif — Montesson (78)" },
      { src: "/images/menuisier-montesson-78-assemblage-frene-massif.jpg", alt: "Assemblage en frêne massif — détail du travail artisanal" },
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
      "Série de 4 chariots XXL en pin massif pour un usage professionnel intensif.",
    details:
      "Commande de 4 chariots identiques pour un professionnel. Cahier des charges strict : supporter 150 kg de charge, rouler facilement sur sol irrégulier, résister à un usage quotidien. Roulettes industrielles verrouillables, plateau renforcé, barres de maintien latérales. Chaque chariot a été testé en charge avant livraison.",
    materials: ["Pin massif traité", "Roulettes industrielles"],
    duration: "2 semaines (lot de 4)",
    techniques: ["Assemblage vissé renforcé", "Test de charge 150 kg"],
    image: "/images/menuisier-montesson-78-chariot-xxl-pin.jpg",
    imageAlt: "Chariot XXL en pin massif — L'Atelier WillBois, Montesson (78)",
    additionalImages: [
      { src: "/images/menuisier-montesson-78-chariots-xxl-commande.jpg", alt: "Commande de 4 chariots XXL en pin — L'Atelier WillBois" },
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
      "Grande planche à découper type billot, réalisée dans le fil du bois pour une résistance optimale.",
    details:
      "Pièce en bois de bout (technique du billot) pour une surface de coupe qui ne marque pas les lames. Épaisseur de 6 cm, pieds antidérapants intégrés. Le bois provient de chutes de chantiers — une démarche éco-responsable qui donne une seconde vie aux matériaux. Finition à l'huile alimentaire pour un usage en cuisine.",
    materials: ["Bois massif (chutes de chantier)", "Huile alimentaire"],
    duration: "3 jours",
    techniques: ["Collage bois de bout", "Finition huile alimentaire", "Gravure laser disponible"],
    image: "/images/menuisier-montesson-78-planche-decouper-billot.jpg",
    imageAlt: "Grande planche à découper type billot — L'Atelier WillBois, Montesson (78)",
    additionalImages: [
      { src: "/images/menuisier-montesson-78-planche-fil-du-bois.jpg", alt: "Planche dans le fil du bois — travail artisanal" },
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
      "Aménagement intérieur complet d'un Berlingo avec système de tiroirs sur mesure.",
    details:
      "Aménagement pensé pour un artisan qui avait besoin d'organiser ses outils dans son utilitaire. Système de tiroirs coulissants sur glissières à billes (ouverture totale), compartiments modulables, et plan de travail rabattable. Chaque élément a été fabriqué en atelier puis assemblé dans le véhicule. Test de charge réalisé à 80 km/h pour valider la solidité.",
    materials: ["Contreplaqué bouleau 18mm", "Glissières à billes", "Visserie inox"],
    duration: "1 semaine",
    techniques: ["Tiroirs sur glissières", "Test de charge routier", "Optimisation 3D"],
    image: "/images/menuisier-montesson-78-amenagement-berlingo-tiroirs.jpg",
    imageAlt: "Aménagement Berlingo sur mesure avec tiroirs — Montesson (78)",
    additionalImages: [
      { src: "/images/menuisier-montesson-78-amenagement-berlingo-sur-mesure.jpg", alt: "Berlingo aménagement sur mesure — vue d'ensemble" },
      { src: "/images/menuisier-montesson-78-berlingo-test-charge.jpg", alt: "Test de charge de l'aménagement Berlingo — Montesson (78)" },
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
      "Bibliothèque monumentale en chêne massif occupant tout un couloir — du sol au plafond.",
    details:
      "Projet ambitieux : habiller un couloir de 8 mètres de long avec des bibliothèques sur toute la hauteur (2,50 m). Chaque module a été fabriqué en atelier puis assemblé sur place. Les étagères sont ajustables tous les 3 cm grâce à des crémaillères invisibles. Finition vernis mat pour protéger le bois tout en conservant son aspect naturel.",
    materials: ["Chêne massif", "Crémaillères invisibles", "Vernis mat"],
    duration: "5 semaines",
    techniques: ["Fabrication modulaire", "Assemblage sur site", "Finition vernis mat"],
    image: "/images/menuisier-montesson-78-bibliotheque-sur-mesure.jpg",
    imageAlt: "Bibliothèque sur mesure en chêne massif — Montesson (78)",
    additionalImages: [
      { src: "/images/menuisier-montesson-78-bibliotheque-chene-detail.jpg", alt: "Détail de la bibliothèque en chêne — Montesson (78)" },
      { src: "/images/menuisier-montesson-78-bibliotheque-construction.jpg", alt: "Construction de la bibliothèque sur mesure — Montesson (78)" },
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
      "Rénovation complète d'une terrasse de piscine — dépose de l'ancien platelage et pose de nouvelles lames.",
    details:
      "La terrasse existante était grisée et abîmée après 15 ans d'exposition. Dépose complète de l'ancien platelage, vérification et renforcement de la structure porteuse, puis pose de nouvelles lames avec espacement calibré pour l'évacuation de l'eau. Traitement saturateur pour une protection longue durée contre les UV et l'humidité.",
    materials: ["Lames bois classe 4", "Saturateur extérieur"],
    duration: "2 semaines",
    techniques: ["Dépose et repose", "Structure renforcée", "Traitement saturateur"],
    image: "/images/menuisier-montesson-78-terrasse-piscine-bois.jpg",
    imageAlt: "Terrasse piscine en bois — rénovation à Montesson (78)",
    beforeImage: {
      src: "/images/menuisier-montesson-78-terrasse-piscine-avant.jpg",
      alt: "Avant — terrasse piscine grisée et abîmée",
    },
    additionalImages: [
      { src: "/images/menuisier-montesson-78-terrasse-piscine-renovation.jpg", alt: "Rénovation en cours — structure et nouvelles lames" },
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
      "Rénovation d'une grande terrasse couverte — ponçage, traitement et huile de finition.",
    details:
      "Cette véranda de 40 m² avait un platelage bois grisé par le temps. Plutôt que de tout remplacer, j'ai opté pour une rénovation : ponçage intégral au grain 80 puis 120, application de deux couches d'huile teintée pour retrouver la couleur d'origine et protéger le bois pour les 5 prochaines années. Résultat : un rendu satiné et chaleureux.",
    materials: ["Huile teintée extérieure", "Bois existant rénové"],
    duration: "1 semaine",
    techniques: ["Ponçage intégral", "Huile de protection 2 couches"],
    image: "/images/menuisier-montesson-78-terrasse-veranda-bois.jpg",
    imageAlt: "Terrasse véranda en bois massif — Montesson (78)",
    beforeImage: {
      src: "/images/menuisier-montesson-78-terrasse-construction.jpg",
      alt: "Avant — terrasse véranda grisée avant rénovation",
    },
    additionalImages: [
      { src: "/images/menuisier-montesson-78-terrasse-veranda-finie.jpg", alt: "Terrasse véranda terminée — rendu satiné" },
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
      "Fabrication d'un portail et d'une clôture en bois et métal.",
    details:
      "Portail double battant avec cadre bois et barreaux métalliques verticaux. La combinaison bois-métal offre robustesse et esthétique. Le cadre en bois massif est traité autoclave pour résister aux intempéries. Les barreaux en acier galvanisé sont soudés puis peints. L'ensemble est conçu pour s'intégrer au style du jardin.",
    materials: ["Bois massif traité autoclave", "Acier galvanisé peint"],
    duration: "1 semaine",
    techniques: ["Cadre bois assemblé", "Barreaux métalliques soudés", "Traitement autoclave"],
    image: "/images/menuisier-montesson-78-portail-bois-cloture.jpg",
    imageAlt: "Portail et clôture en bois — Montesson (78)",
    additionalImages: [
      { src: "/images/menuisier-montesson-78-portail-bois-metal.jpg", alt: "Portail en bois et métal — fabrication en atelier" },
    ],
  },
];
