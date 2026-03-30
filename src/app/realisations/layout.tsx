import type { Metadata } from "next";
import { BUSINESS } from "@/data/business";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: `Réalisations — Meubles et agencements sur mesure en bois massif`,
  description: `Placards, meubles TV, claustras et aménagements sur mesure en chêne, frêne et hêtre — réalisations dans les Yvelines (78) et Hauts-de-Seine (92).`,
  alternates: { canonical: `${BUSINESS.url}/realisations` },
  openGraph: {
    title: `Réalisations | ${BUSINESS.name}`,
    description: `Portfolio de menuiserie sur mesure — meubles et agencements en bois massif dans le 78 et 92.`,
    url: `${BUSINESS.url}/realisations`,
    siteName: BUSINESS.name,
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: `${BUSINESS.url}/images/menuisier-montesson-78-placard-claustra.webp`,
        width: 1200,
        height: 630,
        alt: `Réalisations menuiserie sur mesure — ${BUSINESS.name}`,
      },
    ],
  },
};

export default function RealisationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Réalisations", href: "/realisations" }]} />
      {children}
    </>
  );
}
