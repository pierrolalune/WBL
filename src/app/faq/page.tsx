import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS } from "@/data/business";
import { FAQ_DATA } from "@/data/faq";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLd } from "@/components/seo/JsonLd";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: `FAQ — Menuiserie sur mesure à ${BUSINESS.address.city} (${BUSINESS.address.departmentCode}) et Hauts-de-Seine (92)`,
  description: `Délais, prix, bois, zone d'intervention 78 et 92 — réponses à vos questions sur la menuiserie sur mesure. ${BUSINESS.name}.`,
  alternates: { canonical: `${BUSINESS.url}/faq` },
  openGraph: {
    title: `FAQ | ${BUSINESS.name}`,
    description: `Toutes vos questions sur la menuiserie sur mesure dans les Yvelines et Hauts-de-Seine.`,
    url: `${BUSINESS.url}/faq`,
    siteName: BUSINESS.name,
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: `${BUSINESS.url}/images/menuisier-montesson-78-bibliotheque-sur-mesure.webp`,
        width: 1200,
        height: 630,
        alt: `FAQ menuiserie sur mesure — ${BUSINESS.name}`,
      },
    ],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_DATA.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "FAQ", href: "/faq" }]} />
      <JsonLd data={faqJsonLd} />

      <section className="bg-cream-dark py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold text-charcoal sm:text-5xl">
              Questions fréquentes — Menuiserie sur mesure (78 &amp; 92)
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-stone-500">
              Retrouvez les réponses aux questions les plus courantes sur la menuiserie sur mesure,
              les délais, les tarifs et la zone d&apos;intervention de {BUSINESS.name}.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {FAQ_DATA.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-stone-200 bg-white shadow-sm"
              >
                <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-left font-heading text-lg font-semibold text-charcoal">
                  <span className="pr-4">{item.question}</span>
                  <span className="shrink-0 text-xl text-stone-400 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="border-t border-stone-100 px-6 py-5 text-base leading-relaxed text-stone-500">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-12 rounded-xl bg-amber-subtle p-8 text-center">
            <h2 className="font-heading text-xl font-semibold text-charcoal">
              Vous avez une autre question ?
            </h2>
            <p className="mt-2 text-stone-600">
              N&apos;hésitez pas à me contacter directement, je vous réponds rapidement.
            </p>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-amber px-6 py-3 font-medium text-white transition-colors hover:bg-amber-light"
              >
                Me contacter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
