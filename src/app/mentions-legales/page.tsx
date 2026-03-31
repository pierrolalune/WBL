import type { Metadata } from "next";
import { BUSINESS } from "@/data/business";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: `Mentions légales & CGV — ${BUSINESS.name}`,
  description: `Mentions légales, conditions générales de vente et politique de confidentialité de ${BUSINESS.name}, menuisier artisan à ${BUSINESS.address.city} (${BUSINESS.address.departmentCode}).`,
  alternates: { canonical: `${BUSINESS.url}/mentions-legales` },
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Mentions légales", href: "/mentions-legales" }]} />

      <section className="bg-cream-dark py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold text-charcoal sm:text-5xl">
              Mentions légales &amp; Conditions Générales de Vente
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-stone-500">
              Informations légales, politique de confidentialité et conditions générales
              de vente de {BUSINESS.name}.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-stone max-w-none prose-headings:font-heading prose-headings:text-charcoal prose-h2:text-2xl prose-h3:text-xl prose-a:text-amber">

            {/* ─── Mentions légales ─── */}
            <h2>1. Mentions légales</h2>

            <h3>Éditeur du site</h3>
            <p>
              <strong>{BUSINESS.name}</strong><br />
              Entreprise individuelle artisanale de menuiserie<br />
              {BUSINESS.address.street}, {BUSINESS.address.postalCode} {BUSINESS.address.city}<br />
              Téléphone : <a href={`tel:${BUSINESS.phoneHref}`}>{BUSINESS.phone}</a><br />
              Email : <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a><br />
              SIRET : {BUSINESS.siret}<br />
              Chambre des Métiers et de l&apos;Artisanat des Yvelines
            </p>

            <h3>Hébergement</h3>
            <p>
              Ce site est hébergé par <strong>Vercel Inc.</strong><br />
              440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br />
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>
            </p>

            <h3>Propriété intellectuelle</h3>
            <p>
              L&apos;ensemble du contenu de ce site (textes, images, photographies, logos) est la propriété
              exclusive de {BUSINESS.name} ou fait l&apos;objet d&apos;une autorisation d&apos;utilisation.
              Toute reproduction, même partielle, est interdite sans autorisation préalable écrite.
            </p>

            {/* ─── Protection des données ─── */}
            <h2>2. Politique de confidentialité (RGPD)</h2>

            <h3>Responsable du traitement</h3>
            <p>
              {BUSINESS.legalName}, {BUSINESS.address.street}, {BUSINESS.address.postalCode} {BUSINESS.address.city}.
            </p>

            <h3>Données collectées</h3>
            <p>
              Le formulaire de contact collecte les données suivantes : nom, téléphone, ville et message.
              Ces données sont transmises par email via le service Web3Forms et sont utilisées uniquement
              pour répondre à votre demande de devis.
            </p>

            <h3>Finalité et base légale</h3>
            <p>
              Les données sont collectées sur la base de votre consentement (envoi volontaire du formulaire)
              et sont utilisées exclusivement pour le traitement de votre demande. Elles ne sont ni vendues,
              ni cédées à des tiers.
            </p>

            <h3>Durée de conservation</h3>
            <p>
              Vos données sont conservées pendant la durée nécessaire au traitement de votre demande,
              puis supprimées dans un délai maximum de 3 ans.
            </p>

            <h3>Vos droits</h3>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez
              d&apos;un droit d&apos;accès, de rectification, de suppression et de portabilité de vos
              données. Pour exercer ces droits, contactez-nous à{" "}
              <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>.
            </p>

            <h3>Cookies</h3>
            <p>
              Ce site n&apos;utilise aucun cookie de suivi ni outil d&apos;analyse comportementale.
              Aucun cookie tiers n&apos;est déposé.
            </p>

            {/* ─── CGV ─── */}
            <h2>3. Conditions Générales de Vente</h2>

            <p>
              Les présentes Conditions Générales de Vente régissent les relations entre {BUSINESS.name} et
              l&apos;acheteur (ci-après l&apos;« Acheteur ») pour les prestations de menuiserie énoncées
              ci-dessous. Le fait pour tout Acheteur de commander une prestation emporte acceptation pleine
              et entière des présentes CGV.
            </p>

            <h3>3.1 Présentation</h3>
            <p>
              {BUSINESS.name} est une activité artisanale de menuiserie dont le siège est situé
              au {BUSINESS.address.street}, {BUSINESS.address.postalCode} {BUSINESS.address.city},
              enregistrée à la Chambre des Métiers et de l&apos;Artisanat des Yvelines.
            </p>
            <p>
              {BUSINESS.name} est couverte par une assurance Responsabilité Civile Professionnelle et Décennale
              souscrite auprès d&apos;<strong>AXA Assurances</strong>, garantissant l&apos;ensemble des travaux
              réalisés conformément à la loi Spinetta du 4 janvier 1978.
            </p>

            <h3>3.2 Prestations</h3>
            <p>
              {BUSINESS.name} propose la fabrication, la fourniture et la pose d&apos;ouvrages personnalisés
              de menuiserie : placards, dressings, aménagements intérieurs et extérieurs, mobilier sur mesure,
              terrasses, escaliers, etc.
            </p>
            <p>
              Le premier devis est gratuit dans tout le département. Le devis reste gratuit pour toutes
              commandes passées avant la date de validité, soit <strong>30 jours</strong> à compter de
              la date d&apos;émission.
            </p>

            <h3>3.3 Commande</h3>
            <p>
              Pour passer commande, l&apos;Acheteur doit retourner le devis signé avec la mention
              « BON POUR ACCORD », daté et signé, accompagné de ses coordonnées complètes.
              Tout rajout de travaux sera accompagné d&apos;un avenant et d&apos;une majoration.
            </p>

            <h3>3.4 Prix et paiement</h3>
            <p>Les modalités de paiement sont les suivantes :</p>
            <ul>
              <li><strong>30 %</strong> d&apos;acompte à la commande (non remboursable après démarrage de la fabrication)</li>
              <li><strong>40 %</strong> à la livraison des matériaux / début de pose</li>
              <li><strong>30 %</strong> solde à la réception des travaux</li>
            </ul>
            <p>
              Tout retard de paiement entraînera l&apos;application d&apos;intérêts de retard au taux
              légal en vigueur, ainsi qu&apos;une indemnité forfaitaire de recouvrement de 40 €
              conformément à l&apos;article D. 441-5 du Code de commerce.
            </p>

            <h3>3.5 Délais et livraison</h3>
            <p>
              Les délais de réalisation et de pose sont indiqués sur le devis à titre indicatif. Ils
              courent à compter de la réception de l&apos;acompte et de la confirmation écrite de commande.
              À la fin des travaux, l&apos;Acheteur procède à la réception des ouvrages. En cas de
              non-conformité ou de défaut apparent, l&apos;Acheteur dispose de deux jours ouvrables pour
              le notifier par écrit.
            </p>

            <h3>3.6 Garanties</h3>
            <ul>
              <li><strong>Garantie de parfait achèvement (1 an)</strong> : couvre tous les désordres signalés à la réception ou apparus dans l&apos;année suivant la réception.</li>
              <li><strong>Garantie biennale (2 ans)</strong> : couvre les éléments d&apos;équipement dissociables (quincailleries, mécanismes, etc.).</li>
              <li><strong>Garantie décennale (10 ans)</strong> : couvre les dommages compromettant la solidité de l&apos;ouvrage, conformément aux articles 1792 et suivants du Code civil.</li>
            </ul>

            <h3>3.7 Droit de rétractation</h3>
            <p>
              Pour les contrats conclus hors établissement, conformément aux articles L. 221-18 et suivants
              du Code de la consommation, l&apos;Acheteur dispose d&apos;un délai de <strong>14 jours</strong> à
              compter de la signature du contrat pour exercer son droit de rétractation, sans avoir à
              justifier de motifs ni à payer de pénalités. Ce droit ne s&apos;applique pas si les travaux
              ont été entièrement exécutés à la demande expresse de l&apos;Acheteur.
            </p>

            <h3>3.8 Litiges — Médiation</h3>
            <p>
              En cas de litige, l&apos;Acheteur peut recourir gratuitement à un médiateur de la consommation.
              {BUSINESS.name} adhère au service de médiation de la Chambre des Métiers et de l&apos;Artisanat.
              Tout litige sera, à défaut de résolution amiable, soumis aux juridictions compétentes du
              ressort du Tribunal de Commerce de Versailles.
            </p>
            <p>Le présent contrat est soumis au droit français.</p>

            {/* ─── Footer ─── */}
            <hr />
            <p className="text-sm text-stone-400">
              {BUSINESS.name} — {BUSINESS.address.street}, {BUSINESS.address.postalCode} {BUSINESS.address.city}<br />
              Tél. : {BUSINESS.phone} — Email : {BUSINESS.email}<br />
              Assurance RC Pro &amp; Décennale : AXA Assurances<br />
              Dernière mise à jour : mars 2026
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
