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
  // ============================================================
  // AGENCEMENT
  // ============================================================
  {
    id: "bibliotheque-chatou",
    title: "Bibliothèque sur mesure",
    category: "Agencement",
    categoryId: "agencement",
    city: "Chatou",
    department: "78",
    description:
      "Bibliothèque et meubles de rangement sur mesure intégrés dans un salon à Chatou. Chaque module est conçu pour s'adapter aux dimensions exactes de la pièce.",
    details:
      "Projet complet d'agencement : bibliothèques murales du sol au plafond et meubles sur mesure coordonnés. Les étagères sont ajustables pour accueillir livres, objets et déco. Fabrication en atelier à Montesson, pose sur site à Chatou. Finition soignée pour un rendu intégré à l'architecture existante.",
    materials: ["Bois massif", "Panneaux mélaminé"],
    duration: "4 semaines",
    techniques: ["Fabrication modulaire", "Assemblage sur site", "Finition vernis mat"],
    image: "/images/menuisier-chatou-78-bibliotheque-sur-mesure.webp",
    imageAlt: "Bibliothèque sur mesure à Chatou (78) — L'Atelier WillBois",
    additionalImages: [
      { src: "/images/menuisier-chatou-78-bibliotheque-en-cours.webp", alt: "Bibliothèque en cours de fabrication — Chatou (78)" },
      { src: "/images/menuisier-chatou-78-bibliotheque-meuble-fini.webp", alt: "Meuble bibliothèque terminé — Chatou (78)" },
      { src: "/images/menuisier-chatou-78-bibliotheque-vue-ensemble.webp", alt: "Vue d'ensemble de la bibliothèque sur mesure — Chatou (78)" },
      { src: "/images/menuisier-chatou-78-bibliotheque-detail.webp", alt: "Détail de la bibliothèque en bois — Chatou (78)" },
      { src: "/images/menuisier-chatou-78-placard-sur-mesure.webp", alt: "Placard sur mesure assorti — Chatou (78)" },
    ],
  },
  {
    id: "dressing-chatou",
    title: "Dressing sur mesure",
    category: "Agencement",
    categoryId: "agencement",
    city: "Chatou",
    department: "78",
    description:
      "Dressing sur mesure intégré dans une chambre à Chatou. Penderies, étagères et tiroirs optimisés pour exploiter chaque centimètre.",
    details:
      "Dressing conçu pour une chambre parentale : deux colonnes de penderies à hauteur différenciée, étagères ajustables et compartiments dédiés. L'intérieur est entièrement modulable. Les portes affleurent le mur pour un rendu épuré.",
    materials: ["Panneaux mélaminé", "Quincaillerie de qualité"],
    duration: "2 semaines",
    techniques: ["Prise de cotes laser", "Pose encastrée"],
    image: "/images/menuisier-chatou-78-dressing-sur-mesure.webp",
    imageAlt: "Dressing sur mesure à Chatou (78) — menuisier artisan",
    additionalImages: [
      { src: "/images/menuisier-chatou-78-dressing-interieur.webp", alt: "Vue intérieure du dressing — Chatou (78)" },
      { src: "/images/menuisier-chatou-78-dressing-detail.webp", alt: "Détail du dressing sur mesure — Chatou (78)" },
    ],
  },
  {
    id: "claustra-saint-germain",
    title: "Claustra sur mesure",
    category: "Agencement",
    categoryId: "agencement",
    city: "Saint-Germain-en-Laye",
    department: "78",
    description:
      "Claustra décoratif sur mesure à Saint-Germain-en-Laye. Sépare les espaces tout en laissant passer la lumière naturelle.",
    details:
      "Claustra conçu pour créer une séparation visuelle entre deux pièces sans cloisonner l'espace. Les lames sont espacées de façon régulière, créant un jeu d'ombres et de lumières tout au long de la journée. Fabrication sur mesure en atelier à Montesson, pose à Saint-Germain-en-Laye.",
    materials: ["Bois massif"],
    duration: "2 semaines",
    techniques: ["Lames usinées sur mesure", "Finition huile naturelle"],
    image: "/images/menuisier-saint-germain-78-claustra-sur-mesure.webp",
    imageAlt: "Claustra sur mesure à Saint-Germain-en-Laye (78) — menuisier artisan",
    additionalImages: [
      { src: "/images/menuisier-saint-germain-78-claustra-detail.webp", alt: "Détail du claustra — Saint-Germain-en-Laye (78)" },
      { src: "/images/menuisier-saint-germain-78-claustra-pose.webp", alt: "Pose du claustra sur mesure — Saint-Germain-en-Laye (78)" },
    ],
  },
  {
    id: "claustra-chene-massif",
    title: "Claustra en chêne massif",
    category: "Agencement",
    categoryId: "agencement",
    city: "Montesson",
    department: "78",
    description:
      "Claustra en chêne massif réalisé à Montesson. Pièce maîtresse qui sépare l'entrée du salon tout en conservant la luminosité.",
    details:
      "Ce claustra a été conçu pour créer une séparation élégante entre l'entrée et le salon. Les lames verticales en chêne massif sont espacées régulièrement, filtrant le regard tout en laissant passer la lumière. Finition à l'huile dure pour un toucher soyeux et une protection longue durée.",
    materials: ["Chêne massif"],
    duration: "1 semaine",
    techniques: ["Lames verticales usinées", "Finition huile dure"],
    image: "/images/menuisier-montesson-78-claustra-chene-massif.webp",
    imageAlt: "Claustra en chêne massif — menuisier à Montesson (78)",
    beforeImage: {
      src: "/images/menuisier-montesson-78-claustra-chene-avant.webp",
      alt: "Avant — espace ouvert avant installation du claustra",
    },
    additionalImages: [
      { src: "/images/menuisier-montesson-78-claustra-chene-detail.webp", alt: "Détail du claustra en chêne massif — Montesson (78)" },
      { src: "/images/menuisier-montesson-78-claustra-chene-en-cours.webp", alt: "Claustra en chêne en cours de fabrication — Montesson (78)" },
    ],
  },
  {
    id: "coffrage-wc-montesson",
    title: "Coffrage WC sur mesure",
    category: "Agencement",
    categoryId: "agencement",
    city: "Montesson",
    department: "78",
    description:
      "Coffrage et cache-tuyaux sur mesure pour WC à Montesson. Habillage bois qui masque la plomberie tout en restant accessible pour l'entretien.",
    details:
      "Réalisation d'un coffrage intégral pour masquer les tuyaux et la plomberie dans les WC. Le coffrage est conçu avec un accès technique pour faciliter l'entretien. Finition propre et intégrée au style de la pièce.",
    materials: ["Panneaux bois", "Quincaillerie invisible"],
    duration: "3 jours",
    techniques: ["Coffrage sur mesure", "Accès technique intégré"],
    image: "/images/menuisier-montesson-78-coffrage-wc.webp",
    imageAlt: "Coffrage WC sur mesure à Montesson (78) — L'Atelier WillBois",
    beforeImage: {
      src: "/images/menuisier-montesson-78-coffrage-wc-avant.webp",
      alt: "Avant — tuyaux apparents dans les WC — Montesson (78)",
    },
    additionalImages: [
      { src: "/images/menuisier-montesson-78-coffrage-wc-fini.webp", alt: "Coffrage WC terminé — Montesson (78)" },
      { src: "/images/menuisier-montesson-78-coffrage-cache-tuyaux.webp", alt: "Cache-tuyaux sur mesure — Montesson (78)" },
    ],
  },
  {
    id: "bureau-montesson",
    title: "Bureau sur mesure",
    category: "Agencement",
    categoryId: "agencement",
    city: "Montesson",
    department: "78",
    description:
      "Bureau sur mesure conçu et fabriqué à Montesson. Espace de travail optimisé, intégré à la pièce.",
    materials: ["Bois massif"],
    duration: "1 semaine",
    techniques: ["Conception sur mesure", "Finition soignée"],
    image: "/images/menuisier-montesson-78-bureau-sur-mesure.webp",
    imageAlt: "Bureau sur mesure à Montesson (78) — menuisier artisan",
  },
  {
    id: "cuisine-montesson",
    title: "Cuisine sur mesure",
    category: "Agencement",
    categoryId: "agencement",
    city: "Montesson",
    department: "78",
    description:
      "Aménagement de cuisine sur mesure à Montesson. Meubles et plan de travail adaptés aux dimensions exactes de la pièce.",
    details:
      "Conception et fabrication de meubles de cuisine sur mesure pour exploiter chaque recoin. Plan de travail adapté, rangements optimisés et finitions soignées.",
    materials: ["Panneaux mélaminé", "Plan de travail bois"],
    duration: "2 semaines",
    techniques: ["Prise de cotes précise", "Assemblage sur site"],
    image: "/images/menuisier-montesson-78-cuisine-sur-mesure.webp",
    imageAlt: "Cuisine sur mesure à Montesson (78) — menuisier artisan",
    additionalImages: [
      { src: "/images/menuisier-montesson-78-cuisine-detail.webp", alt: "Détail de la cuisine sur mesure — Montesson (78)" },
    ],
  },
  {
    id: "habillage-escalier",
    title: "Habillage d'escalier en chêne massif",
    category: "Agencement",
    categoryId: "agencement",
    city: "Montesson",
    department: "78",
    description:
      "Habillage complet d'un escalier en chêne massif. Marches, contremarches et limon recouverts pour transformer l'escalier existant.",
    details:
      "L'escalier existant en béton a été entièrement habillé en chêne massif : marches de 3 cm d'épaisseur, contremarches assorties et nez de marche arrondis. Prise de mesures précise de chaque marche (aucune n'est identique). Le chêne apporte chaleur et noblesse à l'ensemble.",
    materials: ["Chêne massif"],
    duration: "2 semaines",
    techniques: ["Prise de cotes individuelle", "Habillage sur support existant", "Finition huile dure"],
    image: "/images/menuisier-montesson-78-habillage-escalier-chene.webp",
    imageAlt: "Habillage d'escalier en chêne massif — Montesson (78)",
    beforeImage: {
      src: "/images/menuisier-montesson-78-escalier-prise-mesure.webp",
      alt: "Prise de mesures avant habillage de l'escalier — Montesson (78)",
    },
    additionalImages: [
      { src: "/images/menuisier-montesson-78-habillage-escalier-detail.webp", alt: "Détail de l'habillage escalier en chêne — Montesson (78)" },
      { src: "/images/menuisier-montesson-78-habillage-escalier-fini.webp", alt: "Escalier habillé en chêne — résultat final — Montesson (78)" },
    ],
  },
  {
    id: "rambarde-maisons-laffitte",
    title: "Main courante et rambarde sur mesure",
    category: "Agencement",
    categoryId: "agencement",
    city: "Maisons-Laffitte",
    department: "78",
    description:
      "Fabrication et pose d'une main courante et rambarde en bois sur mesure à Maisons-Laffitte. Protection et esthétique pour un escalier et des fenêtres.",
    details:
      "Conception d'une rambarde et main courante en bois massif pour sécuriser un escalier et des ouvertures de fenêtre. Chaque pièce a été fabriquée en atelier à Montesson puis posée sur site à Maisons-Laffitte. La rambarde allie sécurité et design épuré.",
    materials: ["Bois massif", "Fixations invisibles"],
    duration: "2 semaines",
    techniques: ["Fabrication sur mesure", "Cintrage", "Finition huile naturelle"],
    image: "/images/menuisier-maisons-laffitte-78-rambarde-main-courante.webp",
    imageAlt: "Main courante et rambarde sur mesure à Maisons-Laffitte (78)",
    beforeImage: {
      src: "/images/menuisier-maisons-laffitte-78-rambarde-avant.webp",
      alt: "Avant — escalier sans rambarde — Maisons-Laffitte (78)",
    },
    additionalImages: [
      { src: "/images/menuisier-maisons-laffitte-78-rambarde-fenetre.webp", alt: "Rambarde de fenêtre sur mesure — Maisons-Laffitte (78)" },
      { src: "/images/menuisier-maisons-laffitte-78-rambarde-fabrication.webp", alt: "Fabrication de la main courante en atelier — Montesson (78)" },
      { src: "/images/menuisier-maisons-laffitte-78-rambarde-en-cours.webp", alt: "Pose de la rambarde en cours — Maisons-Laffitte (78)" },
    ],
  },
  {
    id: "volets-velux-le-vesinet",
    title: "Volets intérieurs pour Velux",
    category: "Agencement",
    categoryId: "agencement",
    city: "Le Vésinet",
    department: "78",
    description:
      "Volets intérieurs en bois sur mesure pour fenêtres Velux au Vésinet. Solution élégante pour occulter la lumière sous les combles.",
    details:
      "Fabrication de volets intérieurs adaptés aux dimensions exactes des fenêtres de toit Velux. Le bois apporte une isolation thermique supplémentaire et un rendu chaleureux. Système d'ouverture et fermeture facile, adapté à l'inclinaison du toit.",
    materials: ["Bois massif"],
    duration: "1 semaine",
    techniques: ["Adaptation Velux", "Charnières sur mesure"],
    image: "/images/menuisier-le-vesinet-78-volets-interieurs-velux.webp",
    imageAlt: "Volets intérieurs pour Velux au Vésinet (78) — menuisier artisan",
    additionalImages: [
      { src: "/images/menuisier-le-vesinet-78-volets-velux-detail.webp", alt: "Détail des volets Velux — Le Vésinet (78)" },
    ],
  },
  {
    id: "mur-etageres-paris",
    title: "Mur avec étagères intégrées",
    category: "Agencement",
    categoryId: "agencement",
    city: "Paris 15e",
    department: "75",
    description:
      "Création d'un mur avec étagères intégrées dans un appartement parisien. Rangement et décoration en un seul aménagement.",
    materials: ["Bois massif", "Fixations murales"],
    duration: "1 semaine",
    techniques: ["Intégration murale", "Fixation invisible"],
    image: "/images/menuisier-paris-75-mur-etageres-sur-mesure.webp",
    imageAlt: "Mur avec étagères sur mesure — Paris 15e (75)",
  },

  // ============================================================
  // MOBILIER
  // ============================================================
  {
    id: "lit-cabane-le-vesinet",
    title: "Lit cabane enfant",
    category: "Mobilier",
    categoryId: "mobilier",
    city: "Le Vésinet",
    department: "78",
    description:
      "Lit cabane en bois massif pour chambre d'enfant au Vésinet. Structure ludique et sécurisée, entièrement fabriquée sur mesure.",
    details:
      "Lit cabane conçu pour stimuler l'imagination des enfants tout en garantissant leur sécurité. Structure en bois massif avec barrières de protection, échelle intégrée et espace de jeu en hauteur. Dimensions adaptées à la chambre. Finition douce au toucher, sans échardes.",
    materials: ["Bois massif", "Visserie inox"],
    duration: "2 semaines",
    techniques: ["Assemblage renforcé", "Ponçage grain fin", "Finition huile naturelle"],
    image: "/images/menuisier-le-vesinet-78-lit-cabane.webp",
    imageAlt: "Lit cabane enfant en bois au Vésinet (78) — L'Atelier WillBois",
    additionalImages: [
      { src: "/images/menuisier-le-vesinet-78-lit-cabane-vue-ensemble.webp", alt: "Vue d'ensemble du lit cabane — Le Vésinet (78)" },
      { src: "/images/menuisier-le-vesinet-78-lit-cabane-detail.webp", alt: "Détail du lit cabane en bois — Le Vésinet (78)" },
    ],
  },
  {
    id: "meuble-frene-massif",
    title: "Meuble en frêne massif",
    category: "Mobilier",
    categoryId: "mobilier",
    city: "Montesson",
    department: "78",
    description:
      "Meuble sur mesure en frêne massif avec assemblages traditionnels. Le veinage prononcé du frêne et sa teinte claire apportent chaleur et caractère.",
    details:
      "Ce meuble a été conçu entièrement en frêne massif, choisi pour son veinage prononcé et sa teinte claire. Les assemblages sont traditionnels (tenon-mortaise) sans aucune vis apparente. Finition vernis pour une protection durable tout en conservant l'aspect naturel du bois.",
    materials: ["Frêne massif", "Assemblages bois uniquement"],
    duration: "3 semaines",
    techniques: ["Tenon-mortaise", "Ponçage grain 320", "Finition vernis"],
    image: "/images/menuisier-montesson-78-meuble-frene-sur-mesure.webp",
    imageAlt: "Meuble en frêne massif sur mesure — Montesson (78)",
    beforeImage: {
      src: "/images/menuisier-montesson-78-meuble-frene-avant-vernis.webp",
      alt: "Meuble en frêne avant application du vernis — Montesson (78)",
    },
    additionalImages: [
      { src: "/images/menuisier-montesson-78-meuble-frene-detail.webp", alt: "Détail du meuble en frêne massif — Montesson (78)" },
      { src: "/images/menuisier-montesson-78-meuble-frene-en-cours.webp", alt: "Fabrication du meuble en frêne — en cours" },
      { src: "/images/menuisier-montesson-78-meuble-frene-finition.webp", alt: "Meuble en frêne — finition en cours" },
    ],
  },
  {
    id: "meuble-pliable-stand",
    title: "Meuble pliable pour stand",
    category: "Mobilier",
    categoryId: "mobilier",
    city: "Montesson",
    department: "78",
    description:
      "Meuble pliable sur mesure conçu pour un stand professionnel. Compact une fois plié, fonctionnel une fois déployé.",
    details:
      "Conception d'un meuble pliable pour un usage événementiel : facile à transporter, rapide à monter et démonter. La structure est robuste malgré sa légèreté. Idéal pour les marchés, salons et événements.",
    materials: ["Bois massif", "Charnières renforcées"],
    duration: "1 semaine",
    techniques: ["Conception pliable", "Assemblage léger et solide"],
    image: "/images/menuisier-montesson-78-meuble-pliable-stand.webp",
    imageAlt: "Meuble pliable sur mesure pour stand — Montesson (78)",
    additionalImages: [
      { src: "/images/menuisier-montesson-78-meuble-pliable-plie.webp", alt: "Meuble pliable replié — compact et transportable" },
    ],
  },
  {
    id: "chariots-xxl",
    title: "Chariots XXL en pin massif",
    category: "Mobilier",
    categoryId: "mobilier",
    city: "Montesson",
    department: "78",
    description:
      "Série de chariots XXL en pin massif pour un usage professionnel intensif. Roulettes industrielles, plateau renforcé, testés en charge.",
    details:
      "Commande de chariots identiques pour un professionnel. Cahier des charges strict : supporter 150 kg de charge, rouler facilement sur sol irrégulier, résister à un usage quotidien. Roulettes industrielles verrouillables, plateau renforcé, barres de maintien latérales. Chaque chariot a été testé en charge avant livraison.",
    materials: ["Pin massif traité", "Roulettes industrielles"],
    duration: "2 semaines",
    techniques: ["Assemblage renforcé", "Test de charge 150 kg"],
    image: "/images/menuisier-montesson-78-chariots-xxl.webp",
    imageAlt: "Chariot XXL en pin massif — L'Atelier WillBois, Montesson (78)",
    additionalImages: [
      { src: "/images/menuisier-montesson-78-chariots-xxl-serie.webp", alt: "Série de chariots XXL en pin — L'Atelier WillBois" },
      { src: "/images/menuisier-montesson-78-chariots-xxl-plan.webp", alt: "Plans de fabrication des chariots XXL" },
    ],
  },
  {
    id: "volets-persiennes",
    title: "Rénovation de volets persiennes",
    category: "Mobilier",
    categoryId: "mobilier",
    city: "Montesson",
    department: "78",
    description:
      "Rénovation complète de volets persiennes en bois : dépose, décapage, traitement, remise en peinture et repose. Un savoir-faire artisanal qui redonne vie aux volets anciens.",
    details:
      "Les volets persiennes étaient abîmés par le temps et les intempéries. Dépose soigneuse, transport à l'atelier, décapage intégral, traitement du bois, ponçage et application de deux couches de peinture. Les lames cassées sont remplacées à l'identique. Résultat : des volets comme neufs, avec le charme de l'ancien.",
    materials: ["Bois massif", "Peinture extérieure microporeuse"],
    duration: "2 semaines",
    techniques: ["Décapage", "Remplacement de lames", "Peinture 2 couches"],
    image: "/images/menuisier-montesson-78-volets-persiennes-renoves.webp",
    imageAlt: "Volets persiennes rénovés — Montesson (78)",
    beforeImage: {
      src: "/images/menuisier-montesson-78-volets-persiennes-avant.webp",
      alt: "Avant — volets persiennes abîmés avant rénovation",
    },
    additionalImages: [
      { src: "/images/menuisier-montesson-78-volets-persiennes-decapes.webp", alt: "Volets persiennes décapés à l'atelier — Montesson (78)" },
      { src: "/images/menuisier-montesson-78-volets-persiennes-atelier.webp", alt: "Rénovation des volets à l'atelier — L'Atelier WillBois" },
      { src: "/images/menuisier-montesson-78-volets-persiennes-pose.webp", alt: "Repose des volets rénovés — Montesson (78)" },
    ],
  },
  {
    id: "renovation-fauteuil",
    title: "Rénovation de fauteuil en bois",
    category: "Mobilier",
    categoryId: "mobilier",
    city: "Montesson",
    department: "78",
    description:
      "Restauration d'un fauteuil en bois ancien. Ponçage, réparation des assemblages fragilisés et nouvelle finition pour lui redonner sa splendeur.",
    materials: ["Bois massif", "Colle d'ébéniste"],
    duration: "1 semaine",
    techniques: ["Restauration d'assemblages", "Ponçage", "Finition huile"],
    image: "/images/menuisier-montesson-78-renovation-fauteuil-bois.webp",
    imageAlt: "Rénovation de fauteuil en bois — Montesson (78)",
    additionalImages: [
      { src: "/images/menuisier-montesson-78-renovation-fauteuil-detail.webp", alt: "Détail de la restauration du fauteuil — Montesson (78)" },
    ],
  },

  // ============================================================
  // ARTS DE LA TABLE
  // ============================================================
  {
    id: "planches-decouper",
    title: "Planches à découper artisanales",
    category: "Arts de la table",
    categoryId: "arts-table",
    city: "Montesson",
    department: "78",
    description:
      "Planches à découper artisanales en bois massif. Gravure laser personnalisée disponible. Fabriquées dans l'atelier de Montesson à partir de chutes de chantier — une démarche éco-responsable.",
    details:
      "Chaque planche est unique, réalisée à partir de bois massif récupéré sur les chantiers. Le bois est sélectionné, découpé, collé (technique du bois de bout pour les billots), poncé et fini à l'huile alimentaire. La gravure laser permet de personnaliser chaque pièce : prénom, logo, message. Idéal en cadeau.",
    materials: ["Bois massif (chutes de chantier)", "Huile alimentaire"],
    duration: "2-3 jours",
    techniques: ["Collage bois de bout", "Finition huile alimentaire", "Gravure laser"],
    image: "/images/menuisier-montesson-78-planche-decouper-artisanale.webp",
    imageAlt: "Planche à découper artisanale — L'Atelier WillBois, Montesson (78)",
    additionalImages: [
      { src: "/images/menuisier-montesson-78-planche-decouper-gravure.webp", alt: "Planche à découper avec gravure laser — Montesson (78)" },
      { src: "/images/menuisier-montesson-78-gravure-laser-planche.webp", alt: "Gravure laser sur planche à découper — personnalisation" },
      { src: "/images/menuisier-montesson-78-planche-decouper-fabrication.webp", alt: "Fabrication de planches à découper en atelier" },
      { src: "/images/menuisier-montesson-78-stand-marche-noel.webp", alt: "Stand marché de Noël — planches à découper artisanales" },
    ],
  },
  {
    id: "planches-presentation",
    title: "Planches de présentation",
    category: "Arts de la table",
    categoryId: "arts-table",
    city: "Montesson",
    department: "78",
    description:
      "Planches de présentation en bois massif pour la table. Idéales pour servir fromages, charcuterie ou apéritifs avec élégance.",
    materials: ["Bois massif", "Huile alimentaire"],
    duration: "2 jours",
    techniques: ["Ponçage fin", "Finition huile alimentaire"],
    image: "/images/menuisier-montesson-78-planche-presentation.webp",
    imageAlt: "Planche de présentation en bois — L'Atelier WillBois, Montesson (78)",
    additionalImages: [
      { src: "/images/menuisier-montesson-78-planche-presentation-detail.webp", alt: "Détail de la planche de présentation en bois" },
    ],
  },

  // ============================================================
  // VÉHICULE
  // ============================================================
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
    image: "/images/menuisier-montesson-78-amenagement-berlingo-tiroirs.webp",
    imageAlt: "Aménagement Berlingo sur mesure avec tiroirs — Montesson (78)",
    additionalImages: [
      { src: "/images/menuisier-montesson-78-amenagement-berlingo-sur-mesure.webp", alt: "Berlingo aménagement sur mesure — vue d'ensemble" },
      { src: "/images/menuisier-montesson-78-berlingo-test-charge.webp", alt: "Test de charge de l'aménagement Berlingo — Montesson (78)" },
    ],
  },

  // ============================================================
  // EXTÉRIEUR
  // ============================================================
  {
    id: "terrasse-piscine",
    title: "Terrasse piscine en bois",
    category: "Extérieur",
    categoryId: "exterieur",
    city: "Montesson",
    department: "78",
    description:
      "Construction et aménagement d'une terrasse de piscine en bois à Montesson. Platelage, margelles et local technique intégrés.",
    details:
      "Projet complet d'aménagement extérieur autour d'une piscine : structure porteuse renforcée, platelage en lames bois classe 4, margelles arrondies et habillage du local technique. L'espacement des lames est calibré pour l'évacuation de l'eau. Traitement saturateur pour une protection longue durée.",
    materials: ["Lames bois classe 4", "Saturateur extérieur"],
    duration: "3 semaines",
    techniques: ["Structure renforcée", "Espacement calibré", "Traitement saturateur"],
    image: "/images/menuisier-montesson-78-terrasse-piscine-bois.webp",
    imageAlt: "Terrasse piscine en bois — Montesson (78)",
    additionalImages: [
      { src: "/images/menuisier-montesson-78-terrasse-piscine-detail.webp", alt: "Détail du platelage piscine — Montesson (78)" },
      { src: "/images/menuisier-montesson-78-terrasse-piscine-finie.webp", alt: "Terrasse piscine terminée — Montesson (78)" },
      { src: "/images/menuisier-montesson-78-terrasse-piscine-structure.webp", alt: "Structure et partie technique de la terrasse — Montesson (78)" },
    ],
  },
  {
    id: "terrasse-ipe-chatou",
    title: "Rénovation terrasse en IPé",
    category: "Extérieur",
    categoryId: "exterieur",
    city: "Chatou",
    department: "78",
    description:
      "Rénovation complète d'une terrasse en bois IPé à Chatou. Ponçage, traitement et remise en état pour retrouver l'éclat du bois exotique.",
    details:
      "La terrasse en IPé avait grisé après plusieurs années d'exposition. Ponçage intégral au grain 80 puis 120 pour retrouver la couleur d'origine du bois exotique. Application de deux couches de saturateur teinté. L'IPé est un bois extrêmement dense et résistant — bien entretenu, il dure des décennies.",
    materials: ["IPé (bois exotique)", "Saturateur teinté"],
    duration: "1 semaine",
    techniques: ["Ponçage intégral", "Saturateur 2 couches"],
    image: "/images/menuisier-chatou-78-renovation-terrasse-ipe.webp",
    imageAlt: "Rénovation terrasse en IPé à Chatou (78) — L'Atelier WillBois",
    beforeImage: {
      src: "/images/menuisier-chatou-78-terrasse-ipe-avant.webp",
      alt: "Avant — terrasse IPé grisée avant rénovation — Chatou (78)",
    },
    additionalImages: [
      { src: "/images/menuisier-chatou-78-terrasse-ipe-en-cours.webp", alt: "Rénovation de la terrasse IPé en cours — Chatou (78)" },
      { src: "/images/menuisier-chatou-78-terrasse-ipe-finie.webp", alt: "Terrasse IPé rénovée — résultat final — Chatou (78)" },
      { src: "/images/menuisier-chatou-78-terrasse-ipe-detail.webp", alt: "Détail du bois IPé après rénovation — Chatou (78)" },
    ],
  },
  {
    id: "portail-bois",
    title: "Portail en bois et métal",
    category: "Extérieur",
    categoryId: "exterieur",
    city: "Montesson",
    department: "78",
    description:
      "Fabrication d'un portail sur mesure combinant bois massif et métal. Robustesse et esthétique pour l'entrée de la propriété.",
    details:
      "Portail double battant avec cadre bois et éléments métalliques. La combinaison bois-métal offre robustesse et esthétique. Le bois massif est traité autoclave pour résister aux intempéries. L'ensemble est conçu pour s'intégrer au style du jardin.",
    materials: ["Bois massif traité autoclave", "Acier"],
    duration: "1 semaine",
    techniques: ["Cadre bois assemblé", "Traitement autoclave"],
    image: "/images/menuisier-montesson-78-portail-bois-sur-mesure.webp",
    imageAlt: "Portail en bois et métal — Montesson (78)",
    additionalImages: [
      { src: "/images/menuisier-montesson-78-portail-bois-detail.webp", alt: "Détail du portail bois et métal — Montesson (78)" },
      { src: "/images/menuisier-montesson-78-portail-bois-atelier.webp", alt: "Fabrication du portail en atelier — Montesson (78)" },
    ],
  },
];
