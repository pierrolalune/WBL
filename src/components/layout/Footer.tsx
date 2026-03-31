import Link from "next/link";
import { Instagram, Mail, MapPin } from "lucide-react";
import { BUSINESS } from "@/data/business";
import { PhoneButton } from "./PhoneButton";

export function Footer() {
  return (
    <footer className="bg-charcoal text-stone-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-heading text-xl font-bold text-white">
              {BUSINESS.name}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-stone-400">
              {BUSINESS.descriptionCourte}
            </p>
            {BUSINESS.socialLinks.instagram && (
              <a
                href={BUSINESS.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm text-stone-400 transition-colors hover:text-white"
                aria-label="Suivez-nous sur Instagram"
              >
                <Instagram className="h-5 w-5" />
                <span>@will_bois78</span>
              </a>
            )}
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold text-white">
              Navigation
            </h4>
            <nav className="mt-4 flex flex-col gap-2">
              <Link href="/" className="text-sm text-stone-400 transition-colors hover:text-white">Accueil</Link>
              <Link href="/services" className="text-sm text-stone-400 transition-colors hover:text-white">Services</Link>
              <Link href="/realisations" className="text-sm text-stone-400 transition-colors hover:text-white">Réalisations</Link>
              <Link href="/zone-intervention" className="text-sm text-stone-400 transition-colors hover:text-white">Zone d&apos;intervention</Link>
              <Link href="/faq" className="text-sm text-stone-400 transition-colors hover:text-white">FAQ</Link>
              <Link href="/contact" className="text-sm text-stone-400 transition-colors hover:text-white">Contact</Link>
              <Link href="/mentions-legales" className="text-sm text-stone-400 transition-colors hover:text-white">Mentions légales &amp; CGV</Link>
            </nav>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold text-white">
              Contact
            </h4>
            <div className="mt-4 flex flex-col gap-3">
              <PhoneButton variant="footer" />
              <a
                href={`mailto:${BUSINESS.email}`}
                className="inline-flex items-center gap-2 text-sm text-stone-400 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0" />
                <span>{BUSINESS.email}</span>
              </a>
              <div className="inline-flex items-start gap-2 text-sm text-stone-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {BUSINESS.address.city} ({BUSINESS.address.postalCode})<br />
                  {BUSINESS.address.department}, {BUSINESS.address.region}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold text-white">
              Zone d&apos;intervention
            </h4>
            <p className="mt-4 text-sm text-stone-400">
              Yvelines (78) &amp; Hauts-de-Seine (92)
            </p>
            <p className="mt-2 text-sm text-stone-400">
              Montesson, Le Vésinet, Chatou, Saint-Germain-en-Laye, Nanterre, Rueil-Malmaison, Boulogne-Billancourt…
            </p>
            <Link
              href="/zone-intervention"
              className="mt-3 inline-block text-sm text-amber transition-colors hover:text-amber-light"
            >
              Voir toutes les villes &rarr;
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-stone-700 pt-8 text-center text-sm text-stone-500">
          <p>
            &copy; {new Date().getFullYear()} {BUSINESS.name} — {BUSINESS.metier} artisan à {BUSINESS.address.city} ({BUSINESS.address.postalCode})
          </p>
          <p className="mt-1">
            Formation Compagnons du devoir — {BUSINESS.experience} d&apos;expérience — SIRET : {BUSINESS.siret}
          </p>
        </div>
      </div>
    </footer>
  );
}
