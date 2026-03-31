import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { BUSINESS } from "@/data/business";
import { AVIS, AVERAGE_RATING, TOTAL_REVIEWS } from "@/data/avis";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),
  title: {
    default: `${BUSINESS.name} — ${BUSINESS.metier} artisan à ${BUSINESS.address.city} (${BUSINESS.address.departmentCode}) | Mobilier & agencement sur mesure`,
    template: `%s | ${BUSINESS.name}`,
  },
  description: BUSINESS.description,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: BUSINESS.url,
    siteName: BUSINESS.name,
    title: `${BUSINESS.name} — ${BUSINESS.descriptionCourte}`,
    description: BUSINESS.description,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Carpenter",
  name: BUSINESS.name,
  url: BUSINESS.url,
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  description: BUSINESS.description,
  image: `${BUSINESS.url}/images/menuisier-montesson-78-meuble-tv-frene-massif.webp`,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.city,
    postalCode: BUSINESS.address.postalCode,
    addressRegion: BUSINESS.address.department,
    addressCountry: BUSINESS.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS.geo.lat,
    longitude: BUSINESS.geo.lng,
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Yvelines" },
    { "@type": "AdministrativeArea", name: "Hauts-de-Seine" },
  ],
  openingHours: BUSINESS.openingHours,
  priceRange: BUSINESS.priceRange,
  founder: {
    "@type": "Person",
    name: BUSINESS.artisan,
    jobTitle: BUSINESS.metier,
    description:
      "Menuisier artisan formé chez les Compagnons du devoir, spécialiste du mobilier et de l'agencement sur mesure en bois massif.",
    alumniOf: {
      "@type": "Organization",
      name: "Compagnons du devoir et du Tour de France",
      url: "https://www.compagnons-du-devoir.com",
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Menuiserie",
        recognizedBy: {
          "@type": "Organization",
          name: "Compagnons du devoir et du Tour de France",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Taille de pierre et marbrerie",
        recognizedBy: {
          "@type": "Organization",
          name: "Compagnons du devoir et du Tour de France",
        },
      },
    ],
    knowsAbout: [
      "Menuiserie sur mesure",
      "Travail du chêne",
      "Travail du frêne",
      "Travail du hêtre",
      "Assemblages traditionnels",
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: AVERAGE_RATING,
    bestRating: 5,
    ratingCount: TOTAL_REVIEWS,
    reviewCount: TOTAL_REVIEWS,
  },
  review: AVIS.map((avis) => ({
    "@type": "Review",
    author: { "@type": "Person", name: avis.author },
    reviewRating: {
      "@type": "Rating",
      ratingValue: avis.rating,
      bestRating: 5,
    },
    reviewBody: avis.text,
    datePublished: avis.date,
  })),
  sameAs: Object.values(BUSINESS.socialLinks).filter(Boolean),
  knowsAbout: [
    "Menuiserie sur mesure",
    "Mobilier en bois massif",
    "Agencement intérieur",
    "Travail du chêne",
    "Travail du frêne",
    "Travail du hêtre",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <JsonLd data={localBusinessJsonLd} />
      </head>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
