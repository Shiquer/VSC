import { Phone, Mail, MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/hooks/useSiteContent";

const Footer = () => {
  const { getContent } = useSiteContent("footer");
  const { getContent: getHeaderContent } = useSiteContent("header");

  return (
    <footer style={{ background: "hsl(var(--foreground))", padding: "64px 0 0" }}>
      <div className="container mx-auto px-8">

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10" style={{ marginBottom: "48px" }}>

          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "44px", height: "44px", background: "hsl(var(--primary-foreground))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "hsl(var(--foreground))", fontFamily: "'Playfair Display', serif", fontWeight: "700", fontSize: "16px" }}>NK</span>
              </div>
              <div>
                <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: "700", fontSize: "16px", color: "hsl(var(--primary-foreground))", lineHeight: "1.2" }}>
                  {getHeaderContent("header_title", "Natalia Kourycheva")}
                </p>
                <p style={{ fontSize: "12px", color: "hsl(var(--primary-foreground))", opacity: 0.6, lineHeight: "1.2" }}>
                  {getHeaderContent("header_subtitle", "Psychanalyste & Hypnotherapeute")}
                </p>
              </div>
            </div>
            <p style={{ fontSize: "14px", lineHeight: "1.7", color: "hsl(var(--primary-foreground))", opacity: 0.7 }}>
              {getContent("footer_description", "Accompagnement personnalisé en psychologie et hypnose pour particuliers et entreprises.")}
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
                <a href="https://maps.google.com/?q=19+rue+de+Choiseul,+75002+Paris" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none", fontSize: "14px", lineHeight: "1.5" }}>19 rue de Choiseul, 75002 Paris</a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "hsl(var(--primary-foreground))", opacity: 0.8 }}>
                <Phone style={{ width: "16px", height: "16px" }} />
                <a href={`tel:${getHeaderContent("header_phone", "+33675394716")}`} style={{ color: "inherit", textDecoration: "none" }}><span style={{ fontSize: "14px" }}>{getHeaderContent("header_phone", "+33675394716")}</span></a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "hsl(var(--primary-foreground))", opacity: 0.8 }}>
                <Mail style={{ width: "16px", height: "16px" }} />
                <a href={`mailto:${getHeaderContent("header_email", "contact@example.com")}`} style={{ color: "inherit", textDecoration: "none", fontSize: "14px" }}>{getHeaderContent("header_email", "contact@example.com")}</a>
              </div>
            </div>
          </div>

          {/* Booking */}
          <div>
            <p style={{ fontSize: "12px", fontWeight: "700", color: "hsl(var(--primary-foreground))", opacity: 0.5, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px", fontFamily: "'Helvetica Neue', sans-serif" }}>
              {getContent("footer_booking_title", "Rendez-vous")}
            </p>
            <p style={{ fontSize: "14px", lineHeight: "1.7", color: "hsl(var(--primary-foreground))", opacity: 0.7, marginBottom: "16px" }}>
              {getContent("footer_booking_text", "Prenez rendez-vous en ligne pour une consultation.")}
            </p>
            <Link to="/reservation" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#8a6b5c", color: "#fff", padding: "10px 20px", borderRadius: "99px", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>
              <Calendar style={{ width: "16px", height: "16px" }} />
              Réserver
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: "1px solid hsl(var(--primary-foreground) / 0.1)", padding: "24px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontSize: "13px", color: "hsl(var(--primary-foreground))", opacity: 0.5 }}>
            {getContent("footer_copyright", "© 2026 Natalia Kourycheva. Tous droits réservés.")}
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            <Link to="/contact" style={{ fontSize: "13px", color: "hsl(var(--primary-foreground))", opacity: 0.5, textDecoration: "none" }}>Contact</Link>
            <Link to="/reservation" style={{ fontSize: "13px", color: "hsl(var(--primary-foreground))", opacity: 0.5, textDecoration: "none" }}>Réservation</Link>
                        <Link to="/mentions-legales" style={{ fontSize: "13px", color: "hsl(var(--primary-foreground))", opacity: 0.5, textDecoration: "none" }}>Mentions légales</Link>
                        <Link to="/politique-confidentialite" style={{ fontSize: "13px", color: "hsl(var(--primary-foreground))", opacity: 0.5, textDecoration: "none" }}>Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
