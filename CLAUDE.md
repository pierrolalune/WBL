# CLAUDE.md — Site Vitrine Artisan · Next.js · SEO & GEO

> Ce fichier est lu automatiquement par Claude Code à chaque session.
> Il contient toutes les règles, conventions et contraintes du projet.
> Ne jamais coder sans l'avoir relu.

---

## 🏗️ Vue d'ensemble du projet

**Type** : Site vitrine statique pour artisan local
**Marché cible** : Départements 78 (Yvelines) & 92 (Hauts-de-Seine) — Île-de-France
**Objectif principal** : Être trouvé sur Google (SEO local) ET être cité par les IA (GEO)
**Contrainte forte** : Pas de base de données — site quasi-statique, données en fichiers `.ts`

---

## 🛠️ Stack technique

```
Framework     : Next.js 15+ (App Router)
Langage       : TypeScript strict
Styling       : Tailwind CSS v4
Rendu         : SSG (Static Site Generation) par défaut — pas de SSR sauf exception justifiée
Déploiement   : Vercel (recommandé) ou tout hébergeur supportant Next.js
Données       : Fichiers TypeScript dans /src/data/ — pas de base de données
Images        : next/image obligatoire — format WebP/AVIF auto
Fonts         : next/font/google — auto-hébergement, font-display: swap
Icons         : lucide-react
```

---

## 📁 Structure des dossiers

```
/
├── CLAUDE.md                      ← ce fichier
├── next.config.ts                 ← config Next.js
├── next-sitemap.config.js         ← génération sitemap + robots.txt
├── public/
│   ├── llms.txt                   ← ⚡ GEO : résumé Markdown du site pour les LLMs
│   ├── images/                    ← images nommées avec ville + code postal (voir règles)
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx             ← métadonnées globales + JSON-LD LocalBusiness
│   │   ├── page.tsx               ← page Accueil
│   │   ├── services/page.tsx      ← page Services
│   │   ├── realisations/page.tsx  ← page Réalisations (galerie avant/après)
│   │   ├── zone-intervention/
│   │   │   └── page.tsx           ← page Zone d'intervention (villes 78 + 92)
│   │   ├── contact/page.tsx       ← page Contact
│   │   ├── faq/page.tsx           ← ⚡ GEO : page FAQ structurée
│   │   ├── sitemap.ts             ← sitemap.xml natif Next.js
│   │   └── robots.ts              ← robots.txt natif Next.js
│   ├── components/
│   │   ├── ui/                    ← composants génériques (boutons, cards...)
│   │   ├── seo/
│   │   │   ├── JsonLd.tsx         ← composant JSON-LD réutilisable
│   │   │   └── BreadcrumbJsonLd.tsx
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── PhoneButton.tsx    ← bouton tel: cliquable mobile — présent partout
│   └── data/
│       ├── business.ts            ← infos NAP (Nom, Adresse, Téléphone) — SOURCE UNIQUE DE VÉRITÉ
│       ├── services.ts            ← liste des prestations
│       ├── realisations.ts        ← liste des chantiers réalisés
│       ├── zones.ts               ← villes couvertes dans le 78 et 92
│       └── faq.ts                 ← questions/réponses FAQ
```

---

## 🔑 Règles absolues — NE JAMAIS DÉROGER

### 1. NAP — Source unique de vérité
Le fichier `/src/data/business.ts` contient le Nom, l'Adresse et le Téléphone.
**Toute** occurrence de ces informations dans le code doit être importée depuis ce fichier.
Ne jamais écrire le nom, l'adresse ou le téléphone en dur dans un composant.

```typescript
// src/data/business.ts — exemple de structure
export const BUSINESS = {
  name: "Plomberie Dupont",               // Nom exact — identique partout sur le web
  legalName: "Dupont Jean-Pierre",
  phone: "01 XX XX XX XX",               // Format identique partout
  phoneHref: "+33XXXXXXXXX",             // Format href tel:
  email: "contact@plomberie-dupont.fr",
  address: {
    street: "12 rue des Artisans",
    city: "Versailles",
    postalCode: "78000",
    department: "Yvelines",
    region: "Île-de-France",
    country: "FR",
  },
  geo: { lat: 48.8014, lng: 2.1301 },
  departments: ["78", "92"],
  siret: "XXX XXX XXX XXXXX",
  openingHours: "Mo-Fr 08:00-18:00",
  priceRange: "€€",
  url: "https://www.plomberie-dupont.fr",
  socialLinks: {
    facebook: "https://www.facebook.com/...",
    instagram: "https://www.instagram.com/...",
  },
} as const;
```

### 2. Images — Nommage obligatoire avec géolocalisation
Toutes les images doivent être nommées avec : `[metier]-[ville]-[departement]-[description].webp`

```
✅ plombier-versailles-78-installation-douche.webp
✅ electricien-boulogne-92-tableau-electrique-avant.webp
✅ renovation-rueil-malmaison-92-salle-bain-apres.webp
❌ image1.jpg
❌ photo.png
❌ DSC_4821.JPG
```

Toujours utiliser `next/image` avec :
- `alt` descriptif incluant la ville (ex : `"Plombier à Versailles (78) — installation de douche"`)
- `width` et `height` explicites
- `priority` uniquement pour les images above-the-fold
- `sizes` adapté au contexte

### 3. Téléphone cliquable partout
Le numéro de téléphone doit toujours être un lien cliquable sur mobile :

```tsx
<a href={`tel:${BUSINESS.phoneHref}`} className="...">
  {BUSINESS.phone}
</a>
```
Le composant `<PhoneButton />` doit apparaître dans le Header ET dans le Footer.

### 4. Rendu statique obligatoire
Chaque page doit exporter `export const dynamic = 'force-static'` ou utiliser `generateStaticParams`.
Pas de `use client` sauf pour les composants interactifs (formulaire contact, menu mobile).
Les Server Components sont la règle, les Client Components l'exception.

---

## 🔍 SEO — Règles d'implémentation

### Métadonnées — chaque page a les siennes
```typescript
// app/[page]/page.tsx
export const metadata: Metadata = {
  title: "Titre unique de la page | Nom de l'artisan — Ville (78/92)",
  description: "Description unique 120-155 caractères avec ville et prestation.",
  alternates: { canonical: "https://www.votresite.fr/[slug]" },
  openGraph: {
    title: "...",
    description: "...",
    url: "https://www.votresite.fr/[slug]",
    siteName: BUSINESS.name,
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/og-[page].jpg", width: 1200, height: 630, alt: "..." }],
  },
};
```

### JSON-LD LocalBusiness — dans layout.tsx root
Le schema `LocalBusiness` complet doit être injecté dans le `<head>` de toutes les pages via `layout.tsx`.
Utiliser le composant `<JsonLd />` avec les données de `BUSINESS`.

```typescript
// Structure JSON-LD minimale requise
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",          // ou sous-type : Plumber, Electrician, etc.
  "name": BUSINESS.name,
  "url": BUSINESS.url,
  "telephone": BUSINESS.phone,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": BUSINESS.address.street,
    "addressLocality": BUSINESS.address.city,
    "postalCode": BUSINESS.address.postalCode,
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": BUSINESS.geo.lat,
    "longitude": BUSINESS.geo.lng
  },
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "Yvelines" },
    { "@type": "AdministrativeArea", "name": "Hauts-de-Seine" }
  ],
  "openingHours": BUSINESS.openingHours,
  "priceRange": BUSINESS.priceRange,
  "sameAs": [BUSINESS.socialLinks.facebook, ...]
}
```

### FAQ — schema FAQPage obligatoire sur /faq
```typescript
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqData.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer }
  }))
}
```

### BreadcrumbList — sur toutes les pages sauf Accueil
### sitemap.ts — toutes les pages avec priorités et fréquences
### robots.ts — autoriser tous les crawlers IA (GPTBot, ClaudeBot, PerplexityBot, Bingbot)

```typescript
// app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // ✅ Autoriser les crawlers IA — essentiel pour le GEO
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
    ],
    sitemap: `${BUSINESS.url}/sitemap.xml`,
  };
}
```

---

## 🤖 GEO — Règles d'optimisation pour les IA génératives

### llms.txt — obligatoire à la racine de /public
Ce fichier Markdown résume le site pour les LLMs. Il est servi à `/llms.txt`.
Structure obligatoire :

```markdown
# [Nom de l'artisan] — [Métier] dans les Yvelines (78) et Hauts-de-Seine (92)

## Qui sommes-nous
[Description en 2-3 phrases claires et factuelles]

## Prestations
- [Prestation 1]
- [Prestation 2]
...

## Zone d'intervention
Nous intervenons dans les départements 78 (Yvelines) et 92 (Hauts-de-Seine) :
[Liste des villes]

## Contact
Téléphone : [numéro]
Email : [email]
Adresse : [adresse complète]

## Horaires
[Horaires d'ouverture]

## Certifications
[Labels, certifications Qualibat, RGE, Maître Artisan...]
```

### Contenu — principes rédactionnels GEO
- Chaque page répond à **une question précise** en début de page (style réponse directe)
- Utiliser des formulations factuelles et assertives — pas de jargon vague
- Mentionner explicitement les villes du 78 et 92 dans le contenu textuel des pages
- La page FAQ doit contenir au minimum 8 questions/réponses couvrant les vraies interrogations clients
- Les avis clients (si affichés) doivent mentionner la ville et la prestation

### Page /zone-intervention — contenu local obligatoire
Lister explicitement toutes les villes couvertes dans le 78 et le 92 depuis `zones.ts`.
Chaque ville doit avoir un court texte contextuel (1-2 phrases) mentionnant la prestation dans cette ville.

---

## ⚡ Performance — objectifs Core Web Vitals

| Métrique | Objectif |
|---|---|
| LCP (Largest Contentful Paint) | < 2,5s |
| INP (Interaction to Next Paint) | < 200ms |
| CLS (Cumulative Layout Shift) | < 0,1 |
| Lighthouse Score Mobile | ≥ 90 |
| Lighthouse Score Desktop | ≥ 95 |

### Règles de performance
- `next/image` **obligatoire** — jamais de `<img>` HTML brut
- `next/font` **obligatoire** — jamais de `@import` Google Fonts en CSS
- Scripts tiers (analytics, etc.) : charger avec `strategy="lazyOnload"` via `next/script`
- Pas de librairie d'animation lourde (framer-motion à éviter sauf besoin justifié)
- CSS : Tailwind CSS v4 uniquement — pas de CSS-in-JS

---

## 📋 Pages du site — spécifications

### `/` — Accueil
- Hero avec H1 incluant métier + département (ex : "Plombier dans les Yvelines (78) et Hauts-de-Seine (92)")
- Réponse directe en 2-3 phrases : qui, quoi, où
- CTA téléphone visible above-the-fold
- Section prestations (résumé)
- Section réalisations (3 photos avant/après)
- Section avis clients
- Section zone d'intervention (carte ou liste de villes)
- FAQ courte (3-5 questions)

### `/services`
- Une section par prestation avec titre H2 descriptif
- Prix indicatifs si possible
- Schema `Service` en JSON-LD

### `/realisations`
- Galerie de photos avant/après
- Chaque réalisation : photo, titre, ville, description du chantier
- Mentionner systématiquement la ville dans le titre et l'alt de l'image

### `/zone-intervention`
- Liste complète des villes des deux départements
- Texte contextuel par ville ou groupe de villes
- Carte interactive (optionnel) ou liste structurée

### `/faq`
- Minimum 8 Q/R
- Schema FAQPage JSON-LD obligatoire
- Questions formulées comme les gens les tapent dans Google (ex : "Combien coûte un dépannage plomberie à Versailles ?")

### `/contact`
- Formulaire simple (nom, téléphone, message, ville)
- Numéro de téléphone cliquable
- Adresse avec lien Google Maps
- Horaires

---

## 📦 Packages npm

### Obligatoires
```bash
next                    # Framework principal
react react-dom         # React
typescript              # TypeScript strict
tailwindcss             # Styling
next-sitemap            # Génération sitemap.xml + robots.txt (complément de l'API native)
lucide-react            # Icons
```

### Recommandés
```bash
sharp                   # Optimisation images Next.js (requis en production)
clsx                    # Utilitaire className conditionnel
tailwind-merge          # Merge de classes Tailwind sans conflits
```

### À éviter
```
❌ next-seo              # Redondant avec l'API Metadata de Next.js 15
❌ react-helmet          # Idem
❌ framer-motion         # Trop lourd pour un site vitrine statique
❌ @prisma/client        # Pas de base de données
❌ axios                 # fetch natif suffisant
```

---

## 🔌 MCP Servers recommandés pour Claude Code

Configurer dans `.mcp.json` à la racine du projet :

```json
{
  "mcpServers": {
    "next-devtools": {
      "command": "npx",
      "args": ["-y", "next-devtools-mcp@latest"]
    },
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    }
  }
}
```

### Description des MCP utiles

| MCP | Usage | Commande d'install |
|---|---|---|
| **next-devtools-mcp** | Accès en temps réel aux erreurs, logs et état du dev server Next.js — **essentiel** | `claude mcp add next-devtools npx next-devtools-mcp@latest` |
| **context7** | Documentation Next.js à jour — évite les hallucinations sur les API récentes | `npx @upstash/context7-mcp` |
| **GitHub MCP** | Gestion des PRs, issues, commits depuis Claude Code | `claude mcp add github` |
| **Playwright MCP** | Tests visuels et vérification du rendu dans un vrai navigateur | `npx @playwright/mcp` |

> ⚠️ **Important** : À chaque session sur ce projet, appeler d'abord le tool `init` de next-devtools-mcp pour établir le contexte Next.js avant tout codage.

---

## 🛠️ Commandes de développement

```bash
npm run dev          # Démarrer le serveur de développement (port 3000)
npm run build        # Build de production
npm run start        # Démarrer en production
npm run lint         # ESLint
npm run type-check   # Vérification TypeScript sans compilation
npx tsc --noEmit     # Alias type-check
```

### Post-build obligatoire
```bash
npm run postbuild    # Lance next-sitemap pour générer sitemap.xml et robots.txt
```

Ajouter dans `package.json` :
```json
{
  "scripts": {
    "postbuild": "next-sitemap"
  }
}
```

---

## 📐 Conventions de code

### TypeScript
- Mode `strict: true` dans `tsconfig.json` — pas de `any` implicite
- Toujours typer les props des composants avec une interface
- Préférer `interface` à `type` pour les props de composants

### Composants React
- Toujours des **functional components** — jamais de class components
- Nom de fichier en **PascalCase** (ex : `PhoneButton.tsx`)
- Un seul composant par fichier (sauf petits composants utilitaires)
- Commentaire JSDoc sur les composants réutilisables

### Tailwind CSS
- Classes utilitaires directement dans le JSX — pas de CSS séparé sauf cas exceptionnel
- Utiliser `clsx` + `tailwind-merge` pour les classes conditionnelles
- Respecter le mobile-first : commencer par les classes sans préfixe, puis `md:`, `lg:`

### Git
- Commits en français, format conventionnel : `feat:`, `fix:`, `chore:`, `seo:`, `content:`
- Exemple : `seo: ajouter schema FAQPage sur la page /faq`
- Une feature = une branche = une PR

---

## ✅ Checklist avant chaque commit

- [ ] `npm run type-check` passe sans erreur
- [ ] `npm run lint` passe sans warning
- [ ] `npm run build` passe sans erreur
- [ ] Les images uploadées sont nommées avec le format `[metier]-[ville]-[dept]-[desc].webp`
- [ ] Les métadonnées (title + description) sont uniques sur la page modifiée
- [ ] Le numéro de téléphone est toujours importé depuis `BUSINESS` — jamais en dur
- [ ] Le JSON-LD est valide (tester sur https://validator.schema.org/)

## ✅ Checklist avant mise en production

- [ ] Lighthouse Mobile ≥ 90 sur toutes les pages
- [ ] Rich Results Test validé (https://search.google.com/test/rich-results)
- [ ] sitemap.xml généré et accessible à `/sitemap.xml`
- [ ] robots.txt accessible à `/robots.txt` — vérifier que les crawlers IA sont autorisés
- [ ] `llms.txt` accessible à `/llms.txt`
- [ ] Toutes les images ont un `alt` descriptif avec la ville
- [ ] Le numéro de téléphone est cliquable sur mobile sur chaque page
- [ ] Soumettre le sitemap dans Google Search Console
- [ ] Soumettre le sitemap dans Bing Webmaster Tools

---

*CLAUDE.md — Site Vitrine Artisan 78/92 — Next.js 15 — SEO & GEO*
*Mis à jour : 2026*
