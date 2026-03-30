/**
 * Récupère les avis Google via l'API Google Places
 * et met à jour src/data/avis.ts automatiquement.
 *
 * Usage :
 *   node scripts/fetch-google-reviews.mjs
 *
 * Variables d'environnement requises :
 *   GOOGLE_API_KEY  — clé API Google (activer "Places API" dans Google Cloud Console)
 *   GOOGLE_PLACE_ID — Place ID de ton business (trouver via https://developers.google.com/maps/documentation/places/web-service/place-id)
 *
 * Pour trouver ton Place ID :
 *   1. Va sur https://www.google.com/maps
 *   2. Cherche "L'Atelier WillBois Montesson"
 *   3. L'URL contient quelque chose comme "ChIJ..." — c'est ton Place ID
 *   Ou utilise : https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
 */

const API_KEY = process.env.GOOGLE_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID;

if (!API_KEY || !PLACE_ID) {
  console.error("❌ Variables manquantes :");
  if (!API_KEY) console.error("   → GOOGLE_API_KEY non définie");
  if (!PLACE_ID) console.error("   → GOOGLE_PLACE_ID non définie");
  console.error("\nUsage :");
  console.error("  GOOGLE_API_KEY=xxx GOOGLE_PLACE_ID=yyy node scripts/fetch-google-reviews.mjs");
  process.exit(1);
}

const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total,name&key=${API_KEY}&language=fr`;

console.log("📡 Récupération des avis Google...");

const res = await fetch(url);
const data = await res.json();

if (data.status !== "OK") {
  console.error("❌ Erreur API Google :", data.status, data.error_message || "");
  process.exit(1);
}

const { result } = data;
const reviews = result.reviews || [];
const rating = result.rating || 5;
const totalReviews = result.user_ratings_total || reviews.length;

console.log(`✅ ${reviews.length} avis récupérés (note moyenne : ${rating}/5, total : ${totalReviews})`);

// Formater les avis pour le fichier TypeScript
const avisArray = reviews.map((r) => ({
  author: r.author_name,
  rating: r.rating,
  text: r.text.replace(/"/g, '\\"').replace(/\n/g, " "),
  city: "", // Google ne donne pas la ville du reviewer
  service: "",
  date: new Date(r.time * 1000).toISOString().slice(0, 7), // YYYY-MM
}));

const fileContent = `export interface Avis {
  author: string;
  rating: number;
  text: string;
  city: string;
  service: string;
  date: string;
}

// Dernière mise à jour : ${new Date().toISOString().slice(0, 10)}
// Source : Google Places API (Place ID: ${PLACE_ID})
export const AVIS: Avis[] = ${JSON.stringify(avisArray, null, 2).replace(/"([^"]+)":/g, "$1:")};

export const GOOGLE_REVIEWS_URL = "https://search.google.com/local/reviews?placeid=${PLACE_ID}";
export const AVERAGE_RATING = ${rating};
export const TOTAL_REVIEWS = ${totalReviews};
`;

import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = join(__dirname, "..", "src", "data", "avis.ts");

writeFileSync(outputPath, fileContent, "utf-8");
console.log(`📝 Fichier mis à jour : ${outputPath}`);
console.log("🎉 Terminé ! Les avis seront visibles au prochain build.");
