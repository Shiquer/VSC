// ============================================================
// CLIENT CONFIGURATION FILE
// ============================================================
// Ce fichier centralise TOUTES les informations spécifiques
// au client. Pour un nouveau client, seul ce fichier change.
// ============================================================

export const clientConfig = {

  // --- IDENTITÉ ---
  name: "Natalia Kourycheva",
  tagline: "Psychanalyste & Hypnothérapeute",
  initials: "NK",
  sector: "sante", // sante | juridique | comptable | architecte | photo | consulting

  // --- CONTACT ---
  phone: "+33675394716",
  phoneDisplay: "06 75 39 47 16",
  email: "natalia.kourycheva@gmail.com",
  emailContact: "contact@natalia-kourycheva.fr",
  address: "19 rue de Choiseul, 75002 Paris",
  addressShort: "Rue Choiseul, 75002, M. Opera ou 4 Septembre",
  mapsUrl: "https://maps.google.com/?q=19+rue+de+Choiseul,+75002+Paris",

  // --- DOMAINE & SEO ---
  domain: "natalia-kourycheva.fr",
  siteUrl: "https://natalia-kourycheva.fr",
  seoTitle: "Natalia Kourycheva - Psychanalyste & Hypnothérapeute à Paris",
  seoDescription: "Psychanalyste & Hypnothérapeute certifiée à Paris 2. Sophrologie, hypnose, accompagnement stress.",
  seoKeywords: "psychanalyste Paris, hypnothérapeute Paris, sophrologie Paris 2, hypnose Paris, gestion stress, développement personnel, Natalia Kourycheva",
  ogImage: "https://natalia-kourycheva.fr/icon-512.png",

  // --- ADMIN ---
  adminEmails: [
    "natalia@sophrologue.com",
    "nataliakourycheva@gmail.com",
  ],

  // --- NOTIFICATIONS (Resend) ---
  notifEmail: "natalia.kourycheva@gmail.com",
  notifFrom: "Réservations <onboarding@resend.dev>",

  // --- RÉSEAUX SOCIAUX ---
  linkedin: "#",
  instagram: "#",

  // --- PAGES ACTIVES ---
  pages: {
    sophrologie: true,
    hypnose: true,
    entreprise: true,
    coursCollectifs: true,
    mediatheque: true,
    articles: true,
    reservation: true,
    monEspace: true,
  },

  // --- MENTIONS LÉGALES & CONFIDENTIALITÉ ---
  legalName: "Natalia Kourycheva",
  legalProfession: "Psychanalyste & Hypnothérapeute",
  legalSiret: "",
  legalCity: "Paris",

} as const;

export type ClientConfig = typeof clientConfig;
