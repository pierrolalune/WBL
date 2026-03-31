"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Clock, Hammer, Layers, X, ZoomIn } from "lucide-react";
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


function ProjectCard({
  realisation: r,
  imageCount,
  onOpen,
}: {
  realisation: Realisation;
  imageCount: number;
  onOpen: () => void;
}) {
  const [showBefore, setShowBefore] = useState(false);
  const displayImage = showBefore && r.beforeImage ? r.beforeImage : { src: r.image, alt: r.imageAlt };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-[4/3] cursor-pointer overflow-hidden" onClick={onOpen}>
        <Image
          src={displayImage.src}
          alt={displayImage.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Bouton avant/après sur la photo */}
        {r.beforeImage && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowBefore(!showBefore);
            }}
            className={cn(
              "absolute left-3 top-3 z-10 rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-sm transition-colors",
              showBefore
                ? "bg-charcoal/80 text-white hover:bg-charcoal"
                : "bg-amber/90 text-white hover:bg-amber"
            )}
          >
            {showBefore ? "AVANT — voir l'après" : "Voir l'avant"}
          </button>
        )}
        {/* Overlay hover */}
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="w-full p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-amber">{r.category}</p>
            <h2 className="mt-1 font-heading text-lg font-bold text-white">{r.title}</h2>
          </div>
          <div className="absolute right-4 top-4">
            <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm">
              <ZoomIn className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
        {/* Badges */}
        {!r.beforeImage && imageCount > 1 && (
          <div className="absolute right-3 top-3 opacity-100 group-hover:opacity-0 transition-opacity">
            <span className="rounded-full bg-charcoal/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {imageCount} photos
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-amber">{r.category}</p>
        <h2 className="mt-1 font-heading text-base font-semibold text-charcoal">{r.title}</h2>
        <div className="mt-auto pt-2">
          <p className="text-xs text-stone-400">{r.city} ({r.department})</p>
          {r.duration && (
            <div className="mt-1 flex items-center gap-1.5 text-xs text-stone-400">
              <Clock className="h-3 w-3" />
              <span>{r.duration}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function RealisationsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selected, setSelected] = useState<Realisation | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);

  const filtered =
    activeCategory === "all"
      ? REALISATIONS
      : REALISATIONS.filter((r) => r.categoryId === activeCategory);

  const selectedImages = selected ? getAllImages(selected) : [];

  const close = useCallback(() => {
    setSelected(null);
    setPhotoIndex(0);
    setShowBeforeAfter(false);
  }, []);

  const prev = useCallback(() => {
    setShowBeforeAfter(false);
    setPhotoIndex((i) => (i === 0 ? selectedImages.length - 1 : i - 1));
  }, [selectedImages.length]);

  const next = useCallback(() => {
    setShowBeforeAfter(false);
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
              Réalisations — Yvelines&nbsp;(78) &amp; Hauts‑de‑Seine&nbsp;(92)
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r) => {
              const images = getAllImages(r);
              return (
                <ProjectCard
                  key={r.id}
                  realisation={r}
                  imageCount={images.length}
                  onOpen={() => {
                    setSelected(r);
                    setPhotoIndex(0);
                    setShowBeforeAfter(false);
                  }}
                />
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
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-8">
            <div className="min-w-0 flex-1">
              <h2 className="truncate font-heading text-lg font-bold text-white sm:text-xl">
                {selected.title}
              </h2>
              <p className="text-sm text-stone-400">
                {selected.category} — {selected.city} ({selected.department})
                {selected.duration && <span> — {selected.duration}</span>}
              </p>
            </div>
            <div className="ml-4 flex items-center gap-2">
              {selected.beforeImage && (
                <button
                  onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    showBeforeAfter
                      ? "bg-amber text-white"
                      : "bg-white/10 text-white hover:bg-white/20"
                  )}
                >
                  {showBeforeAfter ? "Voir l'après" : "Voir l'avant"}
                </button>
              )}
              <button
                onClick={close}
                className="rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Zone principale */}
          <div className="flex flex-1 overflow-hidden">
            {/* Image / Before-After */}
            <div className="relative flex flex-1 items-center justify-center px-4 sm:px-12">
              <div className="relative h-full w-full max-h-[65vh]">
                {showBeforeAfter && selected.beforeImage ? (
                  <Image
                    key="before"
                    src={selected.beforeImage.src}
                    alt={selected.beforeImage.alt}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                ) : (
                  <Image
                    key={selectedImages[photoIndex].src}
                    src={selectedImages[photoIndex].src}
                    alt={selectedImages[photoIndex].alt}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                )}
                {/* Label avant/après */}
                {showBeforeAfter && selected.beforeImage && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-charcoal/80 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                    AVANT
                  </div>
                )}
              </div>
              {selectedImages.length > 1 && !showBeforeAfter && (
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

            {/* Panneau détails (sidebar droite sur desktop) */}
            <div className="hidden w-80 shrink-0 overflow-y-auto border-l border-white/10 bg-charcoal/50 p-6 lg:block">
              <h3 className="font-heading text-lg font-bold text-white">{selected.title}</h3>
              <p className="mt-1 text-sm text-amber">{selected.city} ({selected.department})</p>

              <p className="mt-4 text-sm leading-relaxed text-stone-300">
                {selected.details || selected.description}
              </p>

              {selected.materials && selected.materials.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-stone-400">
                    <Layers className="h-3.5 w-3.5" />
                    Matériaux
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {selected.materials.map((m) => (
                      <span key={m} className="rounded-full bg-white/10 px-3 py-1 text-xs text-stone-300">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selected.techniques && selected.techniques.length > 0 && (
                <div className="mt-5">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-stone-400">
                    <Hammer className="h-3.5 w-3.5" />
                    Techniques
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {selected.techniques.map((t) => (
                      <span key={t} className="rounded-full bg-white/10 px-3 py-1 text-xs text-stone-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selected.duration && (
                <div className="mt-5">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-stone-400">
                    <Clock className="h-3.5 w-3.5" />
                    Durée
                  </div>
                  <p className="mt-1 text-sm text-stone-300">{selected.duration}</p>
                </div>
              )}

              {/* Miniatures */}
              {selectedImages.length > 1 && (
                <div className="mt-6 border-t border-white/10 pt-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
                    Photos ({selectedImages.length})
                  </p>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {selectedImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => { setPhotoIndex(i); setShowBeforeAfter(false); }}
                        className={cn(
                          "relative aspect-square overflow-hidden rounded-lg transition-all",
                          i === photoIndex && !showBeforeAfter
                            ? "ring-2 ring-amber ring-offset-1 ring-offset-charcoal"
                            : "opacity-50 hover:opacity-80"
                        )}
                      >
                        <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="80px" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Barre du bas (mobile) */}
          <div className="border-t border-white/10 bg-charcoal/50 px-4 py-4 sm:px-8 lg:hidden">
            <div className="flex items-start gap-4">
              {selectedImages.length > 1 && (
                <div className="flex shrink-0 gap-1.5 overflow-x-auto">
                  {selectedImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => { setPhotoIndex(i); setShowBeforeAfter(false); }}
                      className={cn(
                        "relative h-12 w-14 shrink-0 overflow-hidden rounded-lg transition-all",
                        i === photoIndex && !showBeforeAfter
                          ? "ring-2 ring-amber ring-offset-1 ring-offset-charcoal"
                          : "opacity-50 hover:opacity-80"
                      )}
                    >
                      <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="56px" />
                    </button>
                  ))}
                </div>
              )}
              <p className="flex-1 text-xs leading-relaxed text-stone-400 line-clamp-3">
                {selected.details || selected.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
