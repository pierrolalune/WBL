"use client";

import { BUSINESS } from "@/data/business";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-cream py-20">
      <div className="mx-auto max-w-lg px-4 text-center">
        <p className="font-heading text-6xl font-bold text-amber">Oups</p>
        <h1 className="mt-4 font-heading text-2xl font-bold text-charcoal">
          Une erreur est survenue
        </h1>
        <p className="mt-4 text-stone-500">
          Nous sommes désolés, quelque chose ne s&apos;est pas passé comme
          prévu. Veuillez réessayer ou nous contacter directement.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-lg bg-charcoal px-6 py-3 font-medium text-white transition-colors hover:bg-charcoal-light"
          >
            Réessayer
          </button>
          <a
            href={`tel:${BUSINESS.phoneHref}`}
            className="inline-flex items-center gap-2 rounded-lg border border-amber px-6 py-3 font-medium text-amber transition-colors hover:bg-amber hover:text-white"
          >
            Appeler le {BUSINESS.phone}
          </a>
        </div>
        <p className="mt-6 text-sm text-stone-400">
          {BUSINESS.name} — {BUSINESS.metier} à {BUSINESS.address.city} (
          {BUSINESS.address.departmentCode})
        </p>
      </div>
    </section>
  );
}
