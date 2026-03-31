import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { BUSINESS } from "@/data/business";
import { ZONES_78, ZONES_92 } from "@/data/zones";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { PhoneButton } from "@/components/layout/PhoneButton";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: `Zone d'intervention — Menuisier dans les Yvelines (78) et Hauts-de-Seine (92)`,
  description: `Menuisier artisan intervenant dans les Yvelines (78) et Hauts-de-Seine (92) — Montesson, Versailles, Nanterre, Boulogne et 30+ villes. Devis gratuit.`,
  alternates: { canonical: `${BUSINESS.url}/zone-intervention` },
  openGraph: {
    title: `Zone d'intervention | ${BUSINESS.name}`,
    description: `Menuisier artisan intervenant dans tout le 78 et 92 — devis gratuit.`,
    url: `${BUSINESS.url}/zone-intervention`,
    siteName: BUSINESS.name,
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: `${BUSINESS.url}/images/menuisier-montesson-78-terrasse-piscine-finie.webp`,
        width: 1200,
        height: 630,
        alt: `Zone d'intervention menuisier — Yvelines (78) et Hauts-de-Seine (92)`,
      },
    ],
  },
};

export default function ZoneInterventionPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "Zone d'intervention", href: "/zone-intervention" }]}
      />

      <section className="bg-cream-dark py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold text-charcoal sm:text-5xl">
              Zone d&apos;intervention
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-stone-500">
              Basé à {BUSINESS.address.city} ({BUSINESS.address.postalCode}), j&apos;interviens dans
              l&apos;ensemble des départements des Yvelines (78) et des Hauts-de-Seine (92) pour
              la conception, la fabrication et la pose de vos meubles et agencements sur mesure.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Yvelines 78 */}
          <div>
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-amber" />
              <h2 className="font-heading text-2xl font-bold text-charcoal sm:text-3xl">
                Yvelines (78)
              </h2>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ZONES_78.map((zone) => (
                <div
                  key={zone.name}
                  className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="font-heading text-lg font-semibold text-charcoal">
                    {zone.name}{" "}
                    <span className="text-sm font-normal text-stone-400">
                      ({zone.postalCode})
                    </span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-500">
                    {zone.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Hauts-de-Seine 92 */}
          <div className="mt-16">
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-amber" />
              <h2 className="font-heading text-2xl font-bold text-charcoal sm:text-3xl">
                Hauts-de-Seine (92)
              </h2>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ZONES_92.map((zone) => (
                <div
                  key={zone.name}
                  className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="font-heading text-lg font-semibold text-charcoal">
                    {zone.name}{" "}
                    <span className="text-sm font-normal text-stone-400">
                      ({zone.postalCode})
                    </span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-500">
                    {zone.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Votre ville n&apos;est pas listée ?
          </h2>
          <p className="mt-4 text-lg text-stone-300">
            Contactez-moi, j&apos;étudie chaque demande. Je peux me déplacer au-delà de ma zone
            habituelle selon la nature du projet.
          </p>
          <div className="mt-8">
            <PhoneButton variant="hero" />
          </div>
        </div>
      </section>
    </>
  );
}
