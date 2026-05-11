import { Phone, Mail, MapPin, Linkedin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/hooks/useSiteContent";

const Footer = () => {
  const { getContent } = useSiteContent("footer");
  const { getContent: getHeaderContent } = useSiteContent("header");
  const { getContent: getHeroContent } = useSiteContent("hero");

  return (
    <footer style={{ background: "hsl(var(--foreground))", padding: "64px 0 0" }}>
      <div className="container mx-auto px-8">

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10" style={{ marginBottom: "48px" }}>

          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "44px", height: "44px", background: "hsl(var(--primary-foreground))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "hsl(var(--foreground))", fontFamily: "'Playfair Display', serif", fontWeight: "700", fontSize: "16px" }}>CQ</span>
              </div>
              <div>
                <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: "700", fontSize: "16px", color: "hsl(var(--primary-foreground))", lineHeight: "1.2" }}>
                  {getHeaderContent("header_title", "Christopher Quershi")}
                </p>
                <p style={{ fontSize: "12px", color: "hsl(var(--primary-foreground))", opacity: 0.6, lineHeight: "1.2" }}>
                  {getHeaderContent("header_subtitle", "Sophrologue & Hypnothérapeute")}
                </p>
              </div>
            </div>
            <p style={{ fontSize: "14px", lineHeight: "1.7", color: "hsl(var(--primary-foreground))", opacity: 0.7 }}>
              {getContent("footer_description", "Accompagnement personnalisé en sophrologie et hypnose pour particuliers et entreprises.")}
            </p>
          </div>

          {/* Services */}
          <div>
            <p style={{ fontSize: "12px", fontWeight: "700", color: "hsl(var(--primary-foreground))", opacity: 0.5, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px", fontFamily: "'Helvetica Neue', sans-serif" }}>
              {getContent("footer_services_title", "Services")}
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { to: "/sophrologie", label: "Sophrologie" },
                { to: "/hypnose", label: "Hypnose" },
                { to: "/entreprise", label: "Formation entreprise" },
                { to: "/cours-collectifs", label: "Cours collectifs" },
              ].map(item => (
                <li key={item.to}>
                  <Link to={item.to} style={{ fontSize: "14px", color: "hsl(var(--primary-foreground))", opacity: 0.8, textDecoration: "none", fontFamily: "'Playfair Display', serif", transition: "opacity 0.2s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "1"}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "0.8"}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: "12px", fontWeight: "700", color: "hsl(var(--primary-foreground))", opacity: 0.5, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px", fontFamily: "'Helvetica Neue', sans-serif" }}>
              {getContent("footer_contact_title", "Contact")}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", color: "hsl(var(--primary-foreground))", opacity: 0.8 }}>
                <MapPin style={{ width: "16px", height: "16px", flexShrink: 0, marginTop: "2px" }} />
                <span style={{ fontSize: "14px", lineHeight: "1.5" }}>{getHeroContent("hero_address", "93100 Montreuil")}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "hsl(var(--primary-foreground))", opacity: 0.8 }}>
                <Phone style={{ width: "16px", height: "16px" }} />
                <span style={{ fontSize: "14px" }}>Téléphone sur demande</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "hsl(var(--primary-foreground))", opacity: 0.8 }}>
                <Mail style={{ width: "16px", height: "16px" }} />
                <span style={{ fontSize: "14px" }}>{getHeaderContent("header_email", "contact@christopherquershi.fr")}</span>
              </div>
            </div>
          </div>

          {/* Horaires & CTA */}
          <div>
            <p style={{ fontSize: "12px", fontWeight: "700", color: "hsl(var(--primary-foreground))", opacity: 0.5, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px", fontFamily: "'Helvetica Neue', sans-serif" }}>
              {getContent("footer_hours_title", "Horaires")}
            </p>
            <div style={{ fontSize: "14px", lineHeight: "1.8", color: "hsl(var(--primary-foreground))", opacity: 0.8, marginBottom: "24px" }}>
              {getContent("footer_hours", "Mardi: 8h - 21h\nVendredi: 8h - 21h\nSamedi: 8h - 13h").split(/\n|<br\s*\/?>/i).map((line) => (
                <span key={line} style={{ display: "block" }}>{line}</span>
              ))}
            </div>
            <Link to="/reservation">
              <button style={{ background: "hsl(var(--primary-foreground))", color: "hsl(var(--foreground))", border: "none", borderRadius: "30px", height: "48px", padding: "0 20px", fontSize: "13px", fontWeight: "700", fontFamily: "'Helvetica Neue', Helvetica, sans-serif", display: "inline-flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <Calendar style={{ width: "16px", height: "16px" }} />
                Prendre RDV
              </button>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(235,208,193,0.15)", padding: "24px 0" }}>
          <div className="flex flex-col md:flex-row justify-between items-center" style={{ gap: "16px" }}>
            <p style={{ fontSize: "13px", color: "hsl(var(--primary-foreground))", opacity: 0.5 }}>
              {getContent("footer_copyright", "© 2025 Christopher Quershi. Tous droits réservés.")}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <a href={getContent("footer_linkedin", "#")} aria-label="LinkedIn" style={{ color: "hsl(var(--primary-foreground))", opacity: 0.6, transition: "opacity 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "1"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "0.6"}
              >
                <Linkedin style={{ width: "20px", height: "20px" }} />
              </a>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "13px" }}>
                <Link to="/contact" style={{ color: "hsl(var(--primary-foreground))", opacity: 0.6, textDecoration: "none" }}>Contact</Link>
                <span style={{ color: "hsl(var(--primary-foreground))", opacity: 0.3 }}>•</span>
                <button style={{ color: "hsl(var(--primary-foreground))", opacity: 0.6, textDecoration: "none", background: "none", border: "none", cursor: "pointer", fontSize: "13px", padding: 0 }}>Mentions légales</button>
                <span style={{ color: "hsl(var(--primary-foreground))", opacity: 0.3 }}>•</span>
                <button style={{ color: "hsl(var(--primary-foreground))", opacity: 0.6, textDecoration: "none", background: "none", border: "none", cursor: "pointer", fontSize: "13px", padding: 0 }}>Confidentialité</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
