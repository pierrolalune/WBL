import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS } from "@/data/business";

export const metadata: Metadata = {
  title: `Page introuvable — ${BUSINESS.name}`,
  description: `La page que vous recherchez n'existe pas. Retrouvez ${BUSINESS.name}, menuisier artisan à ${BUSINESS.address.city} (${BUSINESS.address.departmentCode}) — mobilier et agencement sur mesure.`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-cream py-20">
      <div className="mx-auto max-w-lg px-4 text-center">
        <p className="font-heading text-6xl font-bold text-amber">404</p>
        <h1 className="mt-4 font-heading text-2xl font-bold text-charcoal">
          Page introuvable
        </h1>
        <p className="mt-4 text-stone-500">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-charcoal px-6 py-3 font-medium text-white transition-colors hover:bg-charcoal-light"
        >
          Retour à l&apos;accueil
        </Link>
        <p className="mt-6 text-sm text-stone-400">
          {BUSINESS.name} — {BUSINESS.metier} à {BUSINESS.address.city} ({BUSINESS.address.departmentCode})
        </p>
      </div>
    </section>
  );
}
