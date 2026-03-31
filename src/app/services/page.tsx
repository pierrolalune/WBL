import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { BUSINESS } from "@/data/business";
import { SERVICES } from "@/data/services";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLd } from "@/components/seo/JsonLd";
import { PhoneButton } from "@/components/layout/PhoneButton";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: `Services — Menuiserie sur mesure à ${BUSINESS.address.city} (${BUSINESS.address.departmentCode})`,
  description: `Agencement, mobilier en bois massif, arts de la table et aménagement véhicule. Devis gratuit dans les Yvelines (78) et Hauts-de-Seine (92).`,
  alternates: { canonical: `${BUSINESS.url}/services` },
  openGraph: {
    title: `Services — Menuiserie sur mesure | ${BUSINESS.name}`,
    description: `Agencement, mobilier, arts de la table — menuiserie artisanale en bois massif dans le 78 et 92.`,
    url: `${BUSINESS.url}/services`,
    siteName: BUSINESS.name,
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: `${BUSINESS.url}/images/menuisier-montesson-78-placard-claustra.webp`,
        width: 1200,
        height: 630,
        alt: `Services de menuiserie sur mesure — ${BUSINESS.name}`,
      },
    ],
  },
};

const servicesJsonLd = SERVICES.map((service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.title,
  description: service.description,
  provider: {
    "@type": "LocalBusiness",
    name: BUSINESS.name,
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Yvelines" },
    { "@type": "AdministrativeArea", name: "Hauts-de-Seine" },
  ],
}));

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Services", href: "/services" }]} />
      {servicesJsonLd.map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}

      <section className="bg-cream-dark py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold text-charcoal sm:text-5xl">
              Services de menuiserie sur mesure — Yvelines&nbsp;(78) &amp; Hauts‑de‑Seine&nbsp;(92)
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-stone-500">
              Artisan menuisier formé chez les Compagnons du devoir, je propose un accompagnement
              complet : de la conception à la pose, en passant par la fabrication dans mon atelier
              à {BUSINESS.address.city} ({BUSINESS.address.postalCode}).
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {SERVICES.map((service, index) => (
              <div
                key={service.id}
                id={service.slug}
                className={`grid items-center gap-12 lg:grid-cols-2 ${
                  index % 2 === 1 ? "lg:direction-rtl" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className={`flex flex-col justify-center ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-subtle text-amber">
                    <ServiceIcon name={service.icon} className="h-7 w-7" />
                  </div>
                  <h2 className="font-heading text-3xl font-bold text-charcoal">
                    {service.title}
                  </h2>
                  <p className="mt-4 line-clamp-4 text-base leading-relaxed text-stone-500">
                    {service.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {service.features.slice(0, 5).map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
                        <span className="text-sm text-stone-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {service.priceIndication && (
                    <p className="mt-6 rounded-lg bg-amber-subtle px-4 py-3 text-sm font-medium text-amber">
                      {service.priceIndication}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-white">
            Besoin d&apos;un devis personnalisé ?
          </h2>
          <p className="mt-4 text-lg text-stone-300">
            Décrivez-moi votre projet, je vous recontacte rapidement avec une proposition détaillée.
          </p>
          <div className="mt-8">
            <PhoneButton variant="hero" />
          </div>
        </div>
      </section>
    </>
  );
}
