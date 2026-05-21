import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import usePageTitle from "@/hooks/usePageTitle";

const PolitiqueConfidentialite = () => {
  usePageTitle("Politique de confidentialité - Natalia Kourycheva");

  const sectionStyle = { padding: "80px 0" };
  const h2Style = {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "24px",
    fontWeight: "600" as const,
    color: "hsl(var(--accent))",
    marginBottom: "16px",
  };
  const pStyle = {
    fontSize: "15px",
    lineHeight: "1.9",
    color: "hsl(var(--foreground))",
    opacity: 0.85,
    marginBottom: "40px",
  };

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--background))" }}>
      <Header />

      <section style={sectionStyle}>
        <div className="container mx-auto px-8" style={{ maxWidth: "860px" }}>
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "14px",
              color: "hsl(var(--foreground))",
              textDecoration: "none",
              opacity: 0.7,
              marginBottom: "40px",
            }}
          >
            <ArrowLeft style={{ width: "16px", height: "16px" }} /> Retour à l'accueil
          </Link>

          <h1
            className="arise-serif"
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: "700",
              color: "hsl(var(--foreground))",
              marginBottom: "48px",
            }}
          >
            Politique de confidentialité
          </h1>

          <h2 style={h2Style}>Responsable du traitement</h2>
          <p style={pStyle}>
            Le responsable du traitement des données personnelles collectées via ce site est :<br /><br />
            <strong>Natalia Kourycheva</strong><br />
            Psychanalyste & Hypnothérapeute<br />
            19 rue de Choiseul, 75002 Paris<br />
            E-mail :{" "}
            <a href="mailto:contact@natalia-kourycheva.fr" style={{ color: "hsl(var(--accent))" }}>
              contact@natalia-kourycheva.fr
            </a>
          </p>

          <h2 style={h2Style}>Collecte des données</h2>
          <p style={pStyle}>
            Ce site collecte des données à caractère personnel via le formulaire de contact. Les données
            librement communiquées par l'utilisateur sont : nom, prénom, adresse e-mail et le contenu du message.
            Ces données sont utilisées uniquement pour répondre à vos demandes.
          </p>

          <h2 style={h2Style}>Finalités des données récoltées</h2>
          <p style={pStyle}>
            Les données personnelles collectées permettent de répondre aux messages envoyés, d'assurer le
            suivi avec la personne concernée et de traiter les demandes relatives aux droits au titre du RGPD.
          </p>

          <h2 style={h2Style}>Destinataires des données</h2>
          <p style={pStyle}>
            Les données personnelles collectées sont destinées exclusivement à Natalia Kourycheva. Elles
            ne sont jamais communiquées à des tiers à des fins commerciales et ne sont pas transférées
            en dehors de l'Union Européenne.
          </p>

          <h2 style={h2Style}>Protection des données</h2>
          <p style={pStyle}>
            Natalia Kourycheva s'engage à protéger les données personnelles traitées. Toutes les
            communications entre le navigateur de l'utilisateur et ce site sont chiffrées via le protocole HTTPS.
          </p>

          <h2 style={h2Style}>Durée de conservation</h2>
          <p style={pStyle}>
            Les données personnelles sont conservées aussi longtemps que nécessaire pour répondre à votre
            demande, sauf si vous souhaitez leur suppression ou leur modification.
          </p>

          <h2 style={h2Style}>Cookies</h2>
          <p style={pStyle}>
            Ce site peut utiliser des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie
            publicitaire ou de tracking tiers n'est utilisé sans votre consentement.
          </p>

          <h2 style={h2Style}>Vos droits</h2>
          <p style={pStyle}>
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un
            droit d'accès, de rectification, de suppression, de limitation et d'opposition concernant vos
            données personnelles.<br /><br />
            Pour exercer ces droits, contactez-nous à{" "}
            <a href="mailto:contact@natalia-kourycheva.fr" style={{ color: "hsl(var(--accent))" }}>
              contact@natalia-kourycheva.fr
            </a>{" "}
            ou par courrier : Natalia Kourycheva, 19 rue de Choiseul, 75002 Paris.
          </p>

          <p style={{ ...pStyle, marginTop: "20px" }}>
            Pour plus d'informations :{" "}
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: "hsl(var(--accent))" }}>
              www.cnil.fr
            </a>
          </p>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PolitiqueConfidentialite;
