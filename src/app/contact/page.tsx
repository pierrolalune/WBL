import type { Metadata } from "next";
import { Clock, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { BUSINESS } from "@/data/business";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { ContactForm } from "@/components/ContactForm";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: `Contact — Devis gratuit menuiserie sur mesure ${BUSINESS.address.city} (${BUSINESS.address.departmentCode})`,
  description: `Contactez ${BUSINESS.name} pour un devis gratuit de menuiserie sur mesure dans les Yvelines (78) et Hauts-de-Seine (92). Réponse sous 24h.`,
  alternates: { canonical: `${BUSINESS.url}/contact` },
  openGraph: {
    title: `Contact | ${BUSINESS.name}`,
    description: `Demandez un devis gratuit pour votre projet de menuiserie sur mesure.`,
    url: `${BUSINESS.url}/contact`,
    siteName: BUSINESS.name,
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: `${BUSINESS.url}/images/menuisier-montesson-78-bibliotheque-sur-mesure.webp`,
        width: 1200,
        height: 630,
        alt: `Contact — ${BUSINESS.name}, menuisier artisan`,
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Contact", href: "/contact" }]} />

      <section className="bg-cream-dark py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold text-charcoal sm:text-5xl">
              Contactez-moi
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-stone-500">
              Un projet de meuble ou d&apos;agencement sur mesure ? Décrivez-moi votre idée et je
              vous recontacte rapidement avec un devis gratuit et personnalisé.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Formulaire */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
                <h2 className="font-heading text-2xl font-bold text-charcoal">
                  Demander un devis gratuit
                </h2>
                <ContactForm />
              </div>
            </div>

            {/* Infos contact */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                  <h3 className="font-heading text-lg font-semibold text-charcoal">
                    Coordonnées
                  </h3>
                  <div className="mt-4 space-y-4">
                    <a
                      href={`tel:${BUSINESS.phoneHref}`}
                      className="flex items-center gap-3 text-stone-600 transition-colors hover:text-amber"
                    >
                      <Phone className="h-5 w-5 shrink-0 text-amber" />
                      <span className="font-medium">{BUSINESS.phone}</span>
                    </a>
                    <a
                      href={`mailto:${BUSINESS.email}`}
                      className="flex items-center gap-3 text-stone-600 transition-colors hover:text-amber"
                    >
                      <Mail className="h-5 w-5 shrink-0 text-amber" />
                      <span>{BUSINESS.email}</span>
                    </a>
                    <div className="flex items-start gap-3 text-stone-600">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
                      <span>
                        {BUSINESS.address.city} ({BUSINESS.address.postalCode})<br />
                        {BUSINESS.address.department}, {BUSINESS.address.region}
                      </span>
                    </div>
                    {BUSINESS.socialLinks.instagram && (
                      <a
                        href={BUSINESS.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-stone-600 transition-colors hover:text-amber"
                      >
                        <Instagram className="h-5 w-5 shrink-0 text-amber" />
                        <span>@will_bois78</span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                  <h3 className="font-heading text-lg font-semibold text-charcoal">
                    Horaires
                  </h3>
                  <div className="mt-4 flex items-start gap-3 text-stone-600">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
                    <div>
                      <p>Lundi — Samedi</p>
                      <p className="font-medium">9h00 — 18h00</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                  <h3 className="font-heading text-lg font-semibold text-charcoal">
                    Zone d&apos;intervention
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-stone-500">
                    J&apos;interviens dans tout le département des Yvelines (78) et des
                    Hauts-de-Seine (92) : {BUSINESS.address.city}, Le Vésinet, Chatou,
                    Saint-Germain-en-Laye, Nanterre, Rueil-Malmaison, Boulogne-Billancourt…
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
