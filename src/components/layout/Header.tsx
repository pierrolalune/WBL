"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { BUSINESS } from "@/data/business";
import { PhoneButton } from "./PhoneButton";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="font-heading text-xl font-bold tracking-tight text-charcoal sm:text-2xl">
            {BUSINESS.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-charcoal"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <PhoneButton />
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-md p-2 text-stone-600 hover:bg-stone-100 lg:hidden"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-stone-200 bg-cream lg:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-3 py-3 text-base font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-charcoal"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <PhoneButton className="w-full justify-center" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
