import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import usePageTitle from "@/hooks/usePageTitle";

const MentionsLegales = () => {
  usePageTitle("Mentions légales - Natalia Kourycheva");

  const sectionStyle = { padding: "80px 0" };

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
            Mentions légales
          </h1>

          <div style={{ marginBottom: "48px" }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "24px",
                fontWeight: "600",
                color: "hsl(var(--accent))",
                marginBottom: "20px",
              }}
            >
              Éditeur du site
            </h2>
            <p style={{ fontSize: "15px", lineHeight: "1.9", color: "hsl(var(--foreground))", opacity: 0.85 }}>
              Le présent site est édité par :<br /><br />
              <strong>Natalia Kourycheva</strong><br />
              Psychanalyste & Hypnothérapeute<br />
              19 rue de Choiseul<br />
              75002 Paris<br /><br />
              Adresse e-mail :{" "}
              <a href="mailto:contact@natalia-kourycheva.fr" style={{ color: "hsl(var(--accent))" }}>
                contact@natalia-kourycheva.fr
              </a>
            </p>
          </div>

          <div style={{ marginBottom: "48px" }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "24px",
                fontWeight: "600",
                color: "hsl(var(--accent))",
                marginBottom: "20px",
              }}
            >
              Directeur de publication
            </h2>
            <p style={{ fontSize: "15px", lineHeight: "1.9", color: "hsl(var(--foreground))", opacity: 0.85 }}>
              Natalia Kourycheva<br />
              Adresse e-mail :{" "}
              <a href="mailto:contact@natalia-kourycheva.fr" style={{ color: "hsl(var(--accent))" }}>
                contact@natalia-kourycheva.fr
              </a>
            </p>
          </div>

          <div style={{ marginBottom: "48px" }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "24px",
                fontWeight: "600",
                color: "hsl(var(--accent))",
                marginBottom: "20px",
              }}
            >
              Hébergeur du site
            </h2>
            <p style={{ fontSize: "15px", lineHeight: "1.9", color: "hsl(var(--foreground))", opacity: 0.85 }}>
              <strong>Vercel Inc.</strong><br />
              340 Pine Street, Suite 603<br />
              San Francisco, CA 94104, USA<br />
              Site web :{" "}
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: "hsl(var(--accent))" }}>
                vercel.com
              </a>
            </p>
          </div>

          <div style={{ marginBottom: "48px" }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "24px",
                fontWeight: "600",
                color: "hsl(var(--accent))",
                marginBottom: "20px",
              }}
            >
              Propriété intellectuelle
            </h2>
            <p style={{ fontSize: "15px", lineHeight: "1.9", color: "hsl(var(--foreground))", opacity: 0.85 }}>
              L'ensemble des contenus présents sur ce site (textes, images, vidéos, sons) est protégé par le droit d'auteur.
              Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation préalable est interdite.
            </p>
          </div>

          <div style={{ marginBottom: "48px" }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "24px",
                fontWeight: "600",
                color: "hsl(var(--accent))",
                marginBottom: "20px",
              }}
            >
              Données personnelles
            </h2>
            <p style={{ fontSize: "15px", lineHeight: "1.9", color: "hsl(var(--foreground))", opacity: 0.85 }}>
              Pour en savoir plus sur la gestion de vos données personnelles, veuillez consulter notre{" "}
              <Link to="/politique-confidentialite" style={{ color: "hsl(var(--accent))" }}>
                Politique de confidentialité
              </Link>.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MentionsLegales;
