import { REALISATIONS, CATEGORIES } from "@/data/realisations";
import { RealisationsGallery } from "@/components/RealisationsGallery";

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

          {/* Galerie interactive — Client Component */}
          <RealisationsGallery
            realisations={REALISATIONS}
            categories={CATEGORIES}
          />
        </div>
      </section>
    </>
  );
}
