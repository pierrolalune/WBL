import sharp from 'sharp';
import { readdir, rm, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SOURCE_DIR = join(__dirname, '..', 'Realisations');
const OUTPUT_DIR = join(__dirname, '..', 'public', 'images');

const QUALITY = 80;
const MAX_WIDTH = 1920;

// Images Berlingo à ne PAS supprimer (pas de nouvelles photos)
const PRESERVE = new Set([
  'menuisier-montesson-78-amenagement-berlingo-tiroirs.webp',
  'menuisier-montesson-78-amenagement-berlingo-sur-mesure.webp',
  'menuisier-montesson-78-berlingo-test-charge.webp',
]);

// Mapping complet : source JPEG -> nom WebP final
const IMAGE_MAP = [
  // ============================================================
  // PROJET 1 : Bibliothèque sur mesure — Chatou (78)
  // ============================================================
  { src: 'bibliothèque Chatou.jpeg', out: 'menuisier-chatou-78-bibliotheque-sur-mesure' },
  { src: 'biblio chatou en cours.jpeg', out: 'menuisier-chatou-78-bibliotheque-en-cours' },
  { src: 'biblio chatou meuble sm fini.jpeg', out: 'menuisier-chatou-78-bibliotheque-meuble-fini' },
  { src: 'biblio chatou vue d\'ensemble.jpeg', out: 'menuisier-chatou-78-bibliotheque-vue-ensemble' },
  { src: 'bibliothèque Chatou 1.jpeg', out: 'menuisier-chatou-78-bibliotheque-detail' },
  { src: 'placard sur mesure Chatou.jpeg', out: 'menuisier-chatou-78-placard-sur-mesure' },
  // Alias hero/OG (utilisé dans page.tsx, faq, contact, zone-intervention)
  { src: 'bibliothèque Chatou.jpeg', out: 'menuisier-montesson-78-bibliotheque-sur-mesure' },

  // ============================================================
  // PROJET 2 : Dressing sur mesure — Chatou (78)
  // ============================================================
  { src: 'dressing sur mesure chatou.jpeg', out: 'menuisier-chatou-78-dressing-sur-mesure' },
  { src: 'dressing sur mesure chatou (2).jpeg', out: 'menuisier-chatou-78-dressing-interieur' },
  { src: 'dressing sur mesure chatou (3).jpeg', out: 'menuisier-chatou-78-dressing-detail' },

  // ============================================================
  // PROJET 3 : Claustra sur mesure — Saint-Germain-en-Laye (78)
  // ============================================================
  { src: 'Claustra sur mesure saint germain.jpeg', out: 'menuisier-saint-germain-78-claustra-sur-mesure' },
  { src: 'Claustra sur mesure saint germain (3).jpeg', out: 'menuisier-saint-germain-78-claustra-detail' },
  { src: 'claustra sur mesure saint germain (2).jpeg', out: 'menuisier-saint-germain-78-claustra-pose' },

  // ============================================================
  // PROJET 4 : Claustra en chêne massif — Montesson (78)
  // ============================================================
  { src: 'claustra sur mesure en chene massif.jpeg', out: 'menuisier-montesson-78-claustra-chene-massif' },
  { src: 'claustra sur mesure en chene massif avant.jpeg', out: 'menuisier-montesson-78-claustra-chene-avant' },
  { src: 'claustra sur mesure en chene massif (2).jpeg', out: 'menuisier-montesson-78-claustra-chene-detail' },
  { src: 'claustra sur mesure en chene massif en cours.jpeg', out: 'menuisier-montesson-78-claustra-chene-en-cours' },

  // ============================================================
  // PROJET 5 : Coffrage WC — Montesson (78)
  // ============================================================
  { src: 'coffrage WC Montesson.jpeg', out: 'menuisier-montesson-78-coffrage-wc' },
  { src: 'coffrage WC montesson avant.jpeg', out: 'menuisier-montesson-78-coffrage-wc-avant' },
  { src: 'coffrage WC Montesson 1.jpeg', out: 'menuisier-montesson-78-coffrage-wc-fini' },
  { src: 'coffrage cache tuyaux montesson.jpeg', out: 'menuisier-montesson-78-coffrage-cache-tuyaux' },

  // ============================================================
  // PROJET 6 : Bureau sur mesure — Montesson (78)
  // ============================================================
  { src: 'bureau sur mesure Montesson.jpeg', out: 'menuisier-montesson-78-bureau-sur-mesure' },

  // ============================================================
  // PROJET 7 : Cuisine sur mesure — Montesson (78)
  // ============================================================
  { src: 'cuisine Montesson.jpeg', out: 'menuisier-montesson-78-cuisine-sur-mesure' },
  { src: 'cuisine Montesson (2).jpeg', out: 'menuisier-montesson-78-cuisine-detail' },

  // ============================================================
  // PROJET 8 : Habillage escalier en chêne — Montesson (78)
  // ============================================================
  { src: 'habillage escalier en chene massif.jpeg', out: 'menuisier-montesson-78-habillage-escalier-chene' },
  { src: 'prise de mesure escalier chene massif.jpeg', out: 'menuisier-montesson-78-escalier-prise-mesure' },
  { src: 'habillage escalier en chene 4.jpeg', out: 'menuisier-montesson-78-habillage-escalier-detail' },
  { src: 'habillage escalier en chêne.jpeg', out: 'menuisier-montesson-78-habillage-escalier-fini' },

  // ============================================================
  // PROJET 9 : Main courante & rambarde — Maisons-Laffitte (78)
  // ============================================================
  { src: 'main courante rambarde fenetre maison laffitte.jpeg', out: 'menuisier-maisons-laffitte-78-rambarde-main-courante' },
  { src: 'main courante rambarde avant.jpeg', out: 'menuisier-maisons-laffitte-78-rambarde-avant' },
  { src: 'main courante rambarde fenetre.jpeg', out: 'menuisier-maisons-laffitte-78-rambarde-fenetre' },
  { src: 'main courante en cours de fabrication.jpeg', out: 'menuisier-maisons-laffitte-78-rambarde-fabrication' },
  { src: 'main courante en cours 6.jpeg', out: 'menuisier-maisons-laffitte-78-rambarde-en-cours' },

  // ============================================================
  // PROJET 10 : Volets intérieurs Velux — Le Vésinet (78)
  // ============================================================
  { src: 'volets intérieur pour velux.jpeg', out: 'menuisier-le-vesinet-78-volets-interieurs-velux' },
  { src: 'volets int velux le vesinet.jpeg', out: 'menuisier-le-vesinet-78-volets-velux-detail' },

  // ============================================================
  // PROJET 11 : Mur avec étagères — Paris 15e (75)
  // ============================================================
  { src: 'creation d\'un mur avec étagères paris 15eme.jpeg', out: 'menuisier-paris-75-mur-etageres-sur-mesure' },

  // ============================================================
  // PROJET 12 : Lit cabane enfant — Le Vésinet (78)
  // ============================================================
  { src: 'Lit cabane Le Vésinet.jpeg', out: 'menuisier-le-vesinet-78-lit-cabane' },
  { src: 'lit cabane le vesinet vue d\'ensemble 1.jpeg', out: 'menuisier-le-vesinet-78-lit-cabane-vue-ensemble' },
  { src: 'lit cabane le vesinet 3.jpeg', out: 'menuisier-le-vesinet-78-lit-cabane-detail' },

  // ============================================================
  // PROJET 13 : Meuble en frêne massif — Montesson (78)
  // ============================================================
  { src: 'meuble en frene fini.jpeg', out: 'menuisier-montesson-78-meuble-frene-sur-mesure' },
  { src: 'meuble en frene avant vernis.jpeg', out: 'menuisier-montesson-78-meuble-frene-avant-vernis' },
  { src: 'meuble en frene massif sur mesure.jpeg', out: 'menuisier-montesson-78-meuble-frene-detail' },
  { src: 'meubl en frene en cours.jpeg', out: 'menuisier-montesson-78-meuble-frene-en-cours' },
  { src: 'meuble en frene.jpeg', out: 'menuisier-montesson-78-meuble-frene-finition' },
  // Alias JSON-LD (utilisé dans layout.tsx)
  { src: 'meuble en frene fini.jpeg', out: 'menuisier-montesson-78-meuble-tv-frene-massif' },

  // ============================================================
  // PROJET 14 : Meuble pliable pour stand — Montesson (78)
  // ============================================================
  { src: 'Meuble pliable sur mesure pour stand.jpeg', out: 'menuisier-montesson-78-meuble-pliable-stand' },
  { src: 'meuble pliable sur mesure plié.jpeg', out: 'menuisier-montesson-78-meuble-pliable-plie' },

  // ============================================================
  // PROJET 15 : Chariots XXL — Montesson (78)
  // ============================================================
  { src: 'chariots XXL.jpeg', out: 'menuisier-montesson-78-chariots-xxl' },
  { src: 'chariots XXL (2).jpeg', out: 'menuisier-montesson-78-chariots-xxl-serie' },
  { src: 'plan chariots XXL.jpeg', out: 'menuisier-montesson-78-chariots-xxl-plan' },

  // ============================================================
  // PROJET 16 : Rénovation volets persiennes — Montesson (78)
  // ============================================================
  { src: 'volets persiennes renovés.jpeg', out: 'menuisier-montesson-78-volets-persiennes-renoves' },
  { src: 'volets persiennes avant dépose.jpeg', out: 'menuisier-montesson-78-volets-persiennes-avant' },
  { src: 'reno volets persiennes décapés.jpeg', out: 'menuisier-montesson-78-volets-persiennes-decapes' },
  { src: 'reno volets atelier.jpeg', out: 'menuisier-montesson-78-volets-persiennes-atelier' },
  { src: 'volets rénovés pose.jpeg', out: 'menuisier-montesson-78-volets-persiennes-pose' },

  // ============================================================
  // PROJET 17 : Rénovation fauteuil en bois — Montesson (78)
  // ============================================================
  { src: 'Rénovation de fauteuil en bois.jpeg', out: 'menuisier-montesson-78-renovation-fauteuil-bois' },
  { src: 'reno fauteuill en bois.jpeg', out: 'menuisier-montesson-78-renovation-fauteuil-detail' },

  // ============================================================
  // PROJET 18 : Terrasse piscine bois — Montesson (78)
  // ============================================================
  { src: 'piscine terrasse bois vue d\'ensemble.jpeg', out: 'menuisier-montesson-78-terrasse-piscine-bois' },
  { src: 'piscine terrasse bois 1.jpeg', out: 'menuisier-montesson-78-terrasse-piscine-detail' },
  { src: 'pisisne terrasse montesson.jpeg', out: 'menuisier-montesson-78-terrasse-piscine-finie' },
  { src: 'pisisne terrasse partie technique.jpeg', out: 'menuisier-montesson-78-terrasse-piscine-structure' },

  // ============================================================
  // PROJET 19 : Rénovation terrasse IPé — Chatou (78)
  // ============================================================
  { src: 'Reno terrasse Ipe.jpeg', out: 'menuisier-chatou-78-renovation-terrasse-ipe' },
  { src: 'reno terrasse ipé en cours.jpeg', out: 'menuisier-chatou-78-terrasse-ipe-en-cours' },
  { src: 'reno terrasse chatou.jpeg', out: 'menuisier-chatou-78-terrasse-ipe-finie' },
  { src: 'reno terrasse Ipé 2.jpeg', out: 'menuisier-chatou-78-terrasse-ipe-detail' },
  { src: 'reno terrasse ipé en cours 2.jpeg', out: 'menuisier-chatou-78-terrasse-ipe-avant' },

  // ============================================================
  // PROJET 20 : Portail bois et métal — Montesson (78)
  // ============================================================
  { src: 'portail kevin.jpeg', out: 'menuisier-montesson-78-portail-bois-sur-mesure' },
  { src: 'portail kevin 1.jpeg', out: 'menuisier-montesson-78-portail-bois-detail' },
  { src: 'poratil kevin en cours atelier.jpeg', out: 'menuisier-montesson-78-portail-bois-atelier' },

  // ============================================================
  // PROJET 21 : Berlingo — conservé (pas de conversion, images existantes)
  // ============================================================
  // Les 3 images Berlingo sont déjà en WebP dans public/images/ — on les préserve.

  // ============================================================
  // PROJET 22 : Planches à découper artisanales — Montesson (78)
  // ============================================================
  { src: 'planche à decouper 1.jpeg', out: 'menuisier-montesson-78-planche-decouper-artisanale' },
  { src: 'planche à decouper gravure.jpeg', out: 'menuisier-montesson-78-planche-decouper-gravure' },
  { src: 'gravure planche a decouper.jpeg', out: 'menuisier-montesson-78-gravure-laser-planche' },
  { src: 'planche a decouper en cours.jpeg', out: 'menuisier-montesson-78-planche-decouper-fabrication' },
  { src: 'stand marche de noel planche à decouper.jpeg', out: 'menuisier-montesson-78-stand-marche-noel' },

  // ============================================================
  // PROJET 23 : Planches de présentation — Montesson (78)
  // ============================================================
  { src: 'planche de presentation.jpeg', out: 'menuisier-montesson-78-planche-presentation' },
  { src: 'planche de presentation 2.jpeg', out: 'menuisier-montesson-78-planche-presentation-detail' },

  // ============================================================
  // ATELIER (pas un projet — utilisé pour la section À propos)
  // ============================================================
  { src: 'machine atelier Will Bois.jpeg', out: 'menuisier-montesson-78-william-blondel-atelier' },
  { src: 'Machine atelier Will Bois (2).jpeg', out: 'menuisier-montesson-78-atelier-willbois' },
];

async function convert() {
  console.log('=== Conversion JPEG -> WebP ===\n');

  // Étape 1 : Nettoyer le dossier de sortie (sauf images Berlingo)
  if (existsSync(OUTPUT_DIR)) {
    const existing = await readdir(OUTPUT_DIR);
    let deleted = 0;
    for (const file of existing) {
      if (!PRESERVE.has(file)) {
        await rm(join(OUTPUT_DIR, file));
        deleted++;
      }
    }
    console.log(`Nettoyage : ${deleted} anciens fichiers supprimés (${PRESERVE.size} préservés)\n`);
  } else {
    await mkdir(OUTPUT_DIR, { recursive: true });
  }

  // Étape 2 : Convertir chaque image
  let success = 0;
  const errors = [];

  for (const { src, out } of IMAGE_MAP) {
    const inputPath = join(SOURCE_DIR, src);
    const outputPath = join(OUTPUT_DIR, `${out}.webp`);

    try {
      await sharp(inputPath)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outputPath);

      success++;
      console.log(`  OK  ${out}.webp`);
    } catch (err) {
      errors.push({ src, error: err.message });
      console.error(`  FAIL  ${src} => ${err.message}`);
    }
  }

  console.log(`\n=== Résultat : ${success} convertis, ${errors.length} erreurs ===`);
  if (errors.length > 0) {
    console.log('\nErreurs :');
    errors.forEach(e => console.log(`  - ${e.src}: ${e.error}`));
  }

  // Étape 3 : Vérifier les fichiers critiques
  const critical = [
    'menuisier-montesson-78-bibliotheque-sur-mesure.webp',
    'menuisier-montesson-78-william-blondel-atelier.webp',
    'menuisier-montesson-78-meuble-tv-frene-massif.webp',
    ...PRESERVE,
  ];
  console.log('\nVérification fichiers critiques :');
  for (const file of critical) {
    const exists = existsSync(join(OUTPUT_DIR, file));
    console.log(`  ${exists ? 'OK' : 'MANQUANT'}  ${file}`);
  }
}

convert();
