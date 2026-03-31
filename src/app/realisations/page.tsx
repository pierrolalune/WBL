import { REALISATIONS, CATEGORIES } from "@/data/realisations";
import { RealisationsGallery } from "@/components/RealisationsGallery";
import { PhoneButton } from "@/components/layout/PhoneButton";

export const dynamic = "force-static";

export default function RealisationsPage() {
  return (
    <>
      {/* Header — rendu côté serveur */}
      <section className="bg-charcoal py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold sm:text-5xl lg:text-6xl">
              Réalisations — Yvelines&nbsp;(78) &amp; Hauts&#8209;de&#8209;Seine&nbsp;(92)
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-stone-300">
              Du sur mesure, du caractère, du bois massif.
              Chaque projet est pensé, fabriqué et posé avec soin.
            </p>
          </div>
        </div>
      </section>

      {/* Galerie interactive — Client Component */}
      <RealisationsGallery
        realisations={REALISATIONS}
        categories={CATEGORIES}
      />

      {/* CTA */}
      <section className="bg-charcoal py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Un projet vous inspire ?
          </h2>
          <p className="mt-4 text-lg text-stone-300">
            Décrivez-moi votre idée, je vous propose un devis gratuit et personnalisé.
          </p>
          <div className="mt-8">
            <PhoneButton variant="hero" />
          </div>
        </div>
      </section>
    </>
  );
}
