"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { REALISATIONS, CATEGORIES } from "@/data/realisations";
import type { Realisation } from "@/data/realisations";
import { cn } from "@/lib/utils";

function getAllImages(r: Realisation) {
  const images = [{ src: r.image, alt: r.imageAlt }];
  if (r.additionalImages) {
    images.push(...r.additionalImages);
  }
  return images;
}

export default function RealisationsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selected, setSelected] = useState<Realisation | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  const filtered =
    activeCategory === "all"
      ? REALISATIONS
      : REALISATIONS.filter((r) => r.categoryId === activeCategory);

  const selectedImages = selected ? getAllImages(selected) : [];

  const close = useCallback(() => {
    setSelected(null);
    setPhotoIndex(0);
  }, []);

  const prev = useCallback(() => {
    setPhotoIndex((i) => (i === 0 ? selectedImages.length - 1 : i - 1));
  }, [selectedImages.length]);

  const next = useCallback(() => {
    setPhotoIndex((i) => (i === selectedImages.length - 1 ? 0 : i + 1));
  }, [selectedImages.length]);

  useEffect(() => {
    if (!selected) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [selected, close, prev, next]);

  return (
    <>
      {/* Header */}
      <section className="bg-charcoal py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold sm:text-5xl lg:text-6xl">
              Réalisations
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-stone-300">
              Du sur mesure, du caractère, du bois massif.
              Chaque projet est pensé, fabriqué et posé avec soin.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "rounded-full px-5 py-2.5 text-sm font-medium transition-all",
                  activeCategory === cat.id
                    ? "bg-white text-charcoal"
                    : "border border-stone-600 text-stone-300 hover:border-white hover:text-white"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Galerie */}
      <section className="bg-cream py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {filtered.map((r) => {
              const images = getAllImages(r);
              return (
                <article
                  key={r.id}
                  onClick={() => {
                    setSelected(r);
                    setPhotoIndex(0);
                  }}
                  className="group mb-5 cursor-pointer break-inside-avoid overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={r.image}
                      alt={r.imageAlt}
                      width={800}
                      height={600}
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Overlay au hover */}
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="w-full p-5">
                        <p className="text-xs font-medium uppercase tracking-wider text-amber">
                          {r.category}
                        </p>
                        <h2 className="mt-1 font-heading text-lg font-bold text-white">
                          {r.title}
                        </h2>
                      </div>
                      <div className="absolute right-4 top-4">
                        <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm">
                          <ZoomIn className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    </div>
                    {/* Badge nombre de photos */}
                    {images.length > 1 && (
                      <div className="absolute right-3 top-3 rounded-full bg-charcoal/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm opacity-100 group-hover:opacity-0 transition-opacity">
                        {images.length} photos
                      </div>
                    )}
                  </div>

                  {/* Infos sous l'image */}
                  <div className="p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-amber">
                      {r.category}
                    </p>
                    <h2 className="mt-1 font-heading text-base font-semibold text-charcoal">
                      {r.title}
                    </h2>
                    <p className="mt-0.5 text-xs text-stone-400">
                      {r.city} ({r.department})
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <p className="py-20 text-center text-lg text-stone-400">
              Aucune réalisation dans cette catégorie pour le moment.
            </p>
          )}
        </div>
      </section>

      {/* Lightbox plein écran */}
      {selected && (
        <div className="fixed inset-0 z-50 flex flex-col bg-charcoal/95 backdrop-blur-md">
          {/* Header lightbox */}
          <div className="flex items-center justify-between px-4 py-4 sm:px-8">
            <div className="min-w-0 flex-1">
              <h2 className="truncate font-heading text-lg font-bold text-white sm:text-xl">
                {selected.title}
              </h2>
              <p className="text-sm text-stone-400">
                {selected.category} — {selected.city} ({selected.department})
              </p>
            </div>
            <button
              onClick={close}
              className="ml-4 shrink-0 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Zone image principale */}
          <div className="relative flex flex-1 items-center justify-center px-4 sm:px-16">
            <div className="relative h-full w-full max-h-[70vh]">
              <Image
                key={selectedImages[photoIndex].src}
                src={selectedImages[photoIndex].src}
                alt={selectedImages[photoIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Flèches navigation */}
            {selectedImages.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/25 sm:left-4"
                  aria-label="Photo précédente"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/25 sm:right-4"
                  aria-label="Photo suivante"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {/* Barre du bas : miniatures + description */}
          <div className="border-t border-white/10 bg-charcoal/50 px-4 py-4 sm:px-8">
            <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center">
              {/* Miniatures */}
              {selectedImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {selectedImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setPhotoIndex(i)}
                      className={cn(
                        "relative h-14 w-18 shrink-0 overflow-hidden rounded-lg transition-all",
                        i === photoIndex
                          ? "ring-2 ring-amber ring-offset-2 ring-offset-charcoal"
                          : "opacity-50 hover:opacity-80"
                      )}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="72px"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Description */}
              <p className="flex-1 text-sm leading-relaxed text-stone-300 sm:text-right">
                {selected.description}
              </p>
            </div>

            {/* Compteur */}
            {selectedImages.length > 1 && (
              <p className="mt-2 text-center text-xs text-stone-500">
                {photoIndex + 1} / {selectedImages.length}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
