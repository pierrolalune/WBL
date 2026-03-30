import type { Metadata } from "next";
import { BUSINESS } from "@/data/business";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: `Réalisations — Meubles et agencements sur mesure en bois massif`,
  description: `Découvrez les réalisations de ${BUSINESS.name} : placards, meubles TV, claustras, planches à découper et aménagements sur mesure en chêne, frêne et hêtre. Montesson (78).`,
  alternates: { canonical: `${BUSINESS.url}/realisations` },
  openGraph: {
    title: `Réalisations | ${BUSINESS.name}`,
    description: `Portfolio de menuiserie sur mesure — meubles et agencements en bois massif dans le 78 et 92.`,
    url: `${BUSINESS.url}/realisations`,
    siteName: BUSINESS.name,
    locale: "fr_FR",
    type: "website",
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
