"use client";

import { useState, type FormEvent } from "react";
import { BUSINESS } from "@/data/business";

const WEB3FORMS_KEY = "ac8b71d9-57b4-4a9e-a604-3cb4c6d2dce4";

type FormStatus = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(form: HTMLFormElement): Record<string, string> {
    const errs: Record<string, string> = {};
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

    if (name.length < 2) errs.name = "Veuillez entrer votre nom (2 caractères minimum).";
    if (!/^[\d\s+()./-]{10,}$/.test(phone)) errs.phone = "Veuillez entrer un numéro de téléphone valide.";
    if (message.length < 10) errs.message = "Veuillez décrire votre projet (10 caractères minimum).";

    return errs;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("sending");

    const data = new FormData(form);
    data.append("access_key", WEB3FORMS_KEY);
    data.append("subject", `Nouveau devis — ${BUSINESS.name}`);
    data.append("from_name", BUSINESS.name);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();

      if (json.success) {
        setStatus("success");
        setErrors({});
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="font-heading text-xl font-bold text-charcoal">
          Message envoy&eacute; !
        </h3>
        <p className="mt-2 text-stone-600">
          Merci pour votre demande. Je vous recontacte sous 24h.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-amber underline underline-offset-4 hover:text-amber-light"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-stone-700">
            Nom complet
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-3 text-charcoal placeholder:text-stone-400 focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/20"
            placeholder="Votre nom"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-stone-700">
            T&eacute;l&eacute;phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-3 text-charcoal placeholder:text-stone-400 focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/20"
            placeholder="06 XX XX XX XX"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-stone-700">
          Ville
        </label>
        <input
          type="text"
          id="city"
          name="city"
          className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-3 text-charcoal placeholder:text-stone-400 focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/20"
          placeholder="Votre ville (ex : Montesson, Nanterre...)"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-stone-700">
          Votre projet
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-1 w-full resize-none rounded-lg border border-stone-300 px-4 py-3 text-charcoal placeholder:text-stone-400 focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/20"
          placeholder="D&eacute;crivez votre projet : type de meuble, dimensions souhait&eacute;es, type de bois..."
        />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
      </div>

      {/* Anti-spam honeypot (caché aux vrais visiteurs) */}
      <input type="checkbox" name="botcheck" className="hidden" />

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          Une erreur est survenue. Vous pouvez aussi me contacter directement au{" "}
          <a href={`tel:${BUSINESS.phoneHref}`} className="font-medium underline">
            {BUSINESS.phone}
          </a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-amber px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-amber-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Envoi en cours..." : "Envoyer ma demande"}
      </button>
      <p className="text-center text-sm text-stone-400">
        Devis gratuit et sans engagement — r&eacute;ponse sous 24h
      </p>
    </form>
  );
}
