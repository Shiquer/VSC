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
    fontWeight: "600",
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
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px", color: "hsl(var(--foreground))", textDecoration: "none", opacity: 0.7, marginBottom: "40px" }}>
            <ArrowLeft style={{ width: "16px", height: "16px" }} /> Retour à l'accueil
          </Link>
          <h1 className="arise-serif" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: "700", color: "hsl(var(--foreground))", marginBottom: "48px" }}>
            Politique de confidentialité
          </h1>
          <div style={{ marginBottom: "48px" }}>
            <h2 style={h2Style}>Responsable du traitement</h2>
            <div style={pStyle} dangerouslySetInnerHTML={{ __html: "Le responsable est Natalia Kourycheva, Psychanalyste, 19 rue de Choiseul, 75002 Paris. E-mail : <a href='mailto:contact@natalia-kourycheva.fr' style='color:hsl(var(--accent))'>contact@natalia-kourycheva.fr</a>" }} />
          </div>
          <div style={{ marginBottom: "48px" }}>
            <h2 style={h2Style}>Collecte des données</h2>
            <div style={pStyle} dangerouslySetInnerHTML={{ __html: "Ce site collecte des données via le formulaire de contact : nom, prénom, adresse e-mail et le contenu du message, utilisées uniquement pour répondre à vos demandes." }} />
          </div>
          <div style={{ marginBottom: "48px" }}>
            <h2 style={h2Style}>Finalités des données</h2>
            <div style={pStyle} dangerouslySetInnerHTML={{ __html: "Les données collectées permettent de répondre aux messages et de traiter les demandes RGPD." }} />
          </div>
          <div style={{ marginBottom: "48px" }}>
            <h2 style={h2Style}>Destinataires</h2>
            <div style={pStyle} dangerouslySetInnerHTML={{ __html: "Les données sont destinées exclusivement à Natalia Kourycheva et ne sont pas communiquées à des tiers." }} />
          </div>
          <div style={{ marginBottom: "48px" }}>
            <h2 style={h2Style}>Sécurité</h2>
            <div style={pStyle} dangerouslySetInnerHTML={{ __html: "Les communications sont chiffrées via HTTPS." }} />
          </div>
          <div style={{ marginBottom: "48px" }}>
            <h2 style={h2Style}>Durée de conservation</h2>
            <div style={pStyle} dangerouslySetInnerHTML={{ __html: "Les données sont conservées aussi longtemps que nécessaire pour répondre à votre demande." }} />
          </div>
          <div style={{ marginBottom: "48px" }}>
            <h2 style={h2Style}>Vos droits (RGPD)</h2>
            <div style={pStyle} dangerouslySetInnerHTML={{ __html: "Vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Contactez-nous : <a href='mailto:contact@natalia-kourycheva.fr' style='color:hsl(var(--accent))'>contact@natalia-kourycheva.fr</a> ou Natalia Kourycheva, 19 rue de Choiseul, 75002 Paris. Plus d'infos : <a href='https://www.cnil.fr' target='_blank' rel='noopener noreferrer' style='color:hsl(var(--accent))'>www.cnil.fr</a>" }} />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PolitiqueConfidentialite;
