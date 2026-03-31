import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, ExternalLink, Hammer, MessageCircle, Newspaper, Star, TreePine } from "lucide-react";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { BUSINESS } from "@/data/business";
import { SERVICES } from "@/data/services";
import { REALISATIONS } from "@/data/realisations";
import { FAQ_DATA } from "@/data/faq";
import { PhoneButton } from "@/components/layout/PhoneButton";
import { AVIS, GOOGLE_REVIEWS_URL, AVERAGE_RATING, TOTAL_REVIEWS } from "@/data/avis";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: `Menuisier artisan à ${BUSINESS.address.city} (${BUSINESS.address.departmentCode}) — Mobilier & agencement sur mesure`,
  description: `${BUSINESS.artisan}, menuisier Compagnon du devoir à ${BUSINESS.address.city} (${BUSINESS.address.departmentCode}). Mobilier et agencement sur mesure en bois massif. Devis gratuit — Yvelines (78) & Hauts-de-Seine (92).`,
  alternates: { canonical: BUSINESS.url },
  openGraph: {
    title: `${BUSINESS.name} — Menuisier artisan dans les Yvelines (78) et Hauts-de-Seine (92)`,
    description: `Mobilier et agencement sur mesure en bois massif — chêne, frêne, hêtre. Devis gratuit.`,
    url: BUSINESS.url,
    siteName: BUSINESS.name,
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: `${BUSINESS.url}/images/menuisier-montesson-78-bibliotheque-sur-mesure.webp`,
        width: 1200,
        height: 630,
        alt: `${BUSINESS.name} — menuisier artisan à ${BUSINESS.address.city} (${BUSINESS.address.departmentCode})`,
      },
    ],
  },
};

export default function HomePage() {
  const featuredRealisations = REALISATIONS.slice(0, 3);
  const featuredFaq = FAQ_DATA.slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] items-center bg-charcoal">
        <div className="absolute inset-0">
          <Image
            src="/images/menuisier-montesson-78-bibliotheque-sur-mesure.webp"
            alt={`${BUSINESS.metier} artisan à ${BUSINESS.address.city} (${BUSINESS.address.departmentCode}) — mobilier sur mesure en bois massif`}
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Menuisier artisan dans les Yvelines&nbsp;(78) et Hauts‑de‑Seine&nbsp;(92)
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-stone-300 sm:text-xl">
              {BUSINESS.artisan}, menuisier formé chez les Compagnons du devoir, conçoit et fabrique
              du mobilier et de l&apos;agencement sur mesure en bois massif — chêne, frêne, hêtre.
              De la conception à la pose, un savoir-faire artisanal au service de vos projets.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <PhoneButton variant="hero" />
              <Link
                href="/realisations"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 px-8 py-4 text-lg font-medium text-white transition-colors hover:border-white hover:bg-white/10"
              >
                Voir mes réalisations
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* À propos */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative mx-auto w-full max-w-md lg:mx-0">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/images/menuisier-montesson-78-william-blondel-atelier.webp"
                  alt="William Blondel — menuisier artisan dans son atelier à Montesson (78)"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 rounded-xl bg-amber px-5 py-3 shadow-lg">
                <p className="font-heading text-2xl font-bold text-white">{BUSINESS.experience}</p>
                <p className="text-sm text-white/80">d&apos;expérience</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-amber">À propos</p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-charcoal sm:text-4xl">
                {BUSINESS.artisan}, menuisier de quartier à l&apos;ancienne
              </h2>
              <p className="mt-6 text-base leading-relaxed text-stone-500">
                Artisan dans l&apos;âme, j&apos;aime travailler la matière — le bois, la pierre. Formé
                chez les <strong className="text-charcoal">Compagnons du devoir</strong> en menuiserie
                et en taille de pierre, j&apos;ai acquis plus de 10 ans d&apos;expérience dans le
                travail du bois massif avant de créer L&apos;Atelier WillBois en 2023.
              </p>
              <p className="mt-4 text-base leading-relaxed text-stone-500">
                Mon crédo : être un menuisier de quartier à l&apos;ancienne. Je travaille le chêne,
                le frêne et le hêtre avec des techniques traditionnelles pour créer des pièces
                uniques et durables. De la conception à la pose, je suis votre interlocuteur unique.
              </p>
              <p className="mt-4 text-base leading-relaxed text-stone-500">
                Dans un souci éco-responsable, j&apos;optimise les chutes de bois de mes chantiers
                en créant des planches à découper et des accessoires artisanaux.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: Award, title: "Compagnon du devoir", text: "Menuiserie & taille de pierre" },
                  { icon: Hammer, title: "100% français", text: "De la conception à la pose" },
                  { icon: TreePine, title: "Bois massif français", text: "Chêne, frêne, hêtre" },
                  { icon: MessageCircle, title: "De A à Z", text: "Conception → pose" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
                    <div>
                      <p className="text-sm font-semibold text-charcoal">{item.title}</p>
                      <p className="text-xs text-stone-400">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-cream-dark py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl">
              Mes prestations
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-stone-500">
              Du mobilier au sur mesure complet, chaque projet est unique et réalisé avec passion dans mon atelier à {BUSINESS.address.city}.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <Link
                key={service.id}
                href={`/services#${service.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="p-5">
                      <p className="text-sm text-white/90">{service.shortDescription}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-subtle text-amber">
                      <ServiceIcon name={service.icon} />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-charcoal">
                      {service.title}
                    </h3>
                  </div>
                  {service.priceIndication && (
                    <p className="mt-3 text-sm font-medium text-amber">
                      {service.priceIndication}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-lg bg-charcoal px-6 py-3 font-medium text-white transition-colors hover:bg-charcoal-light"
            >
              Découvrir tous les détails
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Réalisations */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl">
              Dernières réalisations
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-stone-500">
              Chaque projet raconte une histoire — celle d&apos;un espace transformé par le travail du bois.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {featuredRealisations.map((realisation) => (
              <div
                key={realisation.id}
                className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={realisation.image}
                    alt={realisation.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-amber">
                    {realisation.category}
                  </p>
                  <h3 className="mt-1 font-heading text-lg font-semibold text-charcoal">
                    {realisation.title}
                  </h3>
                  <p className="mt-1 text-sm text-stone-500">
                    {realisation.city} ({realisation.department})
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/realisations"
              className="inline-flex items-center gap-2 rounded-lg bg-charcoal px-6 py-3 font-medium text-white transition-colors hover:bg-charcoal-light"
            >
              Toutes les réalisations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Presse */}
      <section className="bg-cream-dark py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Newspaper className="mx-auto h-8 w-8 text-amber" />
            <h2 className="mt-4 font-heading text-3xl font-bold text-charcoal sm:text-4xl">
              Ils parlent de nous
            </h2>
          </div>
          <div className="mt-12 rounded-2xl border border-stone-200 bg-white p-8 shadow-sm md:p-12">
            <blockquote className="text-center">
              <p className="font-heading text-xl leading-relaxed text-charcoal italic md:text-2xl">
                &laquo;&nbsp;On a souvent besoin d&apos;un menuisier chez soi&nbsp;!&nbsp;&raquo;
              </p>
              <p className="mt-6 text-base leading-relaxed text-stone-500">
                &laquo;&nbsp;J&apos;ai monté mon entreprise avec l&apos;idée d&apos;être un menuisier
                de quartier à l&apos;ancienne. J&apos;aménage des cuisines, je construis des dressings,
                je pose des étagères, j&apos;installe des terrasses…&nbsp;&raquo;
              </p>
              <footer className="mt-6">
                <p className="text-sm font-semibold text-charcoal">
                  {BUSINESS.artisan} — {BUSINESS.name}
                </p>
                <p className="mt-1 text-sm text-amber">
                  Montesson Mag n°28 — Novembre/Décembre 2025
                </p>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Zone d'intervention */}
      <section className="bg-charcoal py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-heading text-3xl font-bold sm:text-4xl">
                J&apos;interviens dans les Yvelines et les Hauts‑de‑Seine
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-stone-300">
                Basé à {BUSINESS.address.city} ({BUSINESS.address.postalCode}), je me déplace dans tout
                le département des Yvelines (78) et des Hauts-de-Seine (92) pour la prise de mesures,
                la livraison et la pose de vos meubles et agencements sur mesure.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {["Montesson", "Le Vésinet", "Chatou", "Saint-Germain-en-Laye", "Nanterre", "Rueil-Malmaison", "Boulogne-Billancourt", "Neuilly-sur-Seine"].map(
                  (city) => (
                    <span
                      key={city}
                      className="rounded-full border border-stone-600 px-3 py-1 text-sm text-stone-300"
                    >
                      {city}
                    </span>
                  )
                )}
                <Link
                  href="/zone-intervention"
                  className="rounded-full bg-amber px-3 py-1 text-sm font-medium text-white"
                >
                  + toutes les villes
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="rounded-2xl border border-stone-700 bg-charcoal-light p-8 text-center">
                <p className="font-heading text-6xl font-bold text-amber">2</p>
                <p className="mt-2 text-lg text-stone-300">départements couverts</p>
                <div className="mt-6 flex justify-center gap-8">
                  <div>
                    <p className="font-heading text-3xl font-bold">78</p>
                    <p className="text-sm text-stone-400">Yvelines</p>
                  </div>
                  <div className="h-16 w-px bg-stone-600" />
                  <div>
                    <p className="font-heading text-3xl font-bold">92</p>
                    <p className="text-sm text-stone-400">Hauts-de-Seine</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ courte */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl">
              Questions fréquentes
            </h2>
          </div>
          <div className="mt-12 space-y-4">
            {featuredFaq.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-stone-200 bg-white shadow-sm"
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
          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-amber transition-colors hover:text-amber-light"
            >
              Voir toutes les questions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Avis clients */}
      <section className="bg-cream-dark py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${i < AVERAGE_RATING ? "fill-amber text-amber" : "text-stone-300"}`}
                />
              ))}
            </div>
            <h2 className="mt-4 font-heading text-3xl font-bold text-charcoal sm:text-4xl">
              Avis clients
            </h2>
            <p className="mt-2 text-stone-500">
              {AVERAGE_RATING}/5 — {TOTAL_REVIEWS} avis sur latelierwillbois.fr
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {AVIS.map((avis) => (
              <div
                key={avis.author}
                className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < avis.rating ? "fill-amber text-amber" : "text-stone-300"}`}
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-stone-600">
                  &laquo;&nbsp;{avis.text}&nbsp;&raquo;
                </p>
                <div className="mt-4 border-t border-stone-100 pt-4">
                  <p className="text-sm font-semibold text-charcoal">{avis.author}</p>
                  <p className="text-xs text-stone-400">
                    {avis.city} — {avis.service}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-charcoal shadow-sm transition-colors hover:bg-stone-50"
            >
              Voir tous les avis sur Google
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-amber py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Un projet de menuiserie sur mesure ?
          </h2>
          <p className="mt-4 text-lg text-amber-subtle">
            Contactez-moi pour un devis gratuit et personnalisé. Je vous réponds sous 24h.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={`tel:${BUSINESS.phoneHref}`}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-amber shadow-lg transition-colors hover:bg-stone-100"
            >
              {BUSINESS.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-white/10"
            >
              Demander un devis
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
