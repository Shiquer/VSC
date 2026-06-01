import { Phone, Mail, MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/hooks/useSiteContent";

const Skeleton = ({ width = "100%", height = "14px", style = {} }: { width?: string; height?: string; style?: React.CSSProperties }) => (
  <div style={{ width, height, background: "hsl(var(--primary-foreground) / 0.15)", borderRadius: "4px", animation: "pulse 1.5s ease-in-out infinite", ...style }} />
);

// Obfuscated email: assembled from char codes at runtime to prevent bot scraping
const ObfuscatedEmail = ({ style }: { style?: React.CSSProperties }) => {
  const decode = (codes: number[]) => codes.map(c => String.fromCharCode(c)).join("");
  const emailCodes = [110,97,116,97,108,105,97,46,107,111,117,114,121,99,104,101,118,97,64,103,109,97,105,108,46,99,111,109];
  const email = decode(emailCodes);
  return (
    <a
      href={"mai" + "lto:" + email}
      onClick={(e) => { e.currentTarget.href = "mai" + "lto:" + decode(emailCodes); }}
      style={{ color: "inherit", textDecoration: "none", fontSize: "14px", ...style }}
    >
      {email}
    </a>
  );
};

const Footer = () => {
  const { getContent, loading: loadingFooter } = useSiteContent("footer");
  const { getContent: getHeaderContent, loading: loadingHeader } = useSiteContent("header");
  const loading = loadingFooter || loadingHeader;

  return (
    <footer style={{ background: "hsl(var(--foreground))", padding: "64px 0 0" }}>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
      <div className="container mx-auto px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 items-start" style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "44px", height: "44px", background: "hsl(var(--primary-foreground))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ color: "hsl(var(--foreground))", fontFamily: "'Playfair Display', serif", fontWeight: "700", fontSize: "16px" }}>NK</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
                {loading ? <Skeleton width="140px" height="16px" /> : (
                  <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: "700", fontSize: "16px", color: "hsl(var(--primary-foreground))", lineHeight: "1.2" }}>{getHeaderContent("header_title", "Natalia Kourycheva")}</p>
                )}
                {loading ? <Skeleton width="180px" height="12px" /> : (
                  <p style={{ fontSize: "13px", color: "hsl(var(--primary-foreground))", opacity: 0.6, lineHeight: "1.2" }}>{getHeaderContent("header_subtitle", "Psychanalyste & Hypnotherapeute")}</p>
                )}
              </div>
            </div>
            {loading ? <Skeleton height="42px" /> : (
              <p style={{ fontSize: "14px", lineHeight: "1.7", color: "hsl(var(--primary-foreground))", opacity: 0.7 }}>{getContent("footer_description", "Accompagnement personnalisé en psychologie et hypnose pour particuliers et entreprises.")}</p>
            )}
          </div>

          <div>
            <p style={{ fontSize: "12px", fontWeight: "700", color: "hsl(var(--primary-foreground))", opacity: 0.5, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px", fontFamily: "'Helvetica Neue', sans-serif" }}>{getContent("footer_services_title", "Services")}</p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[{ to: "/sophrologie", label: "Sophrologie" }, { to: "/hypnose", label: "Hypnose" }, { to: "/entreprise", label: "Formation entreprise" }, { to: "/cours-collectifs", label: "Cours collectifs" }].map(item => (
                <li key={item.to}><Link to={item.to} style={{ fontSize: "14px", color: "hsl(var(--primary-foreground))", opacity: 0.8, textDecoration: "none", fontFamily: "'Playfair Display', serif", transition: "opacity 0.2s" }} onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "1"} onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "0.8"}>{item.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <p style={{ fontSize: "12px", fontWeight: "700", color: "hsl(var(--primary-foreground))", opacity: 0.5, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px", fontFamily: "'Helvetica Neue', sans-serif" }}>{getContent("footer_contact_title", "Contact")}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", color: "hsl(var(--primary-foreground))", opacity: 0.8 }}>
                <MapPin style={{ width: "16px", height: "16px", flexShrink: 0, marginTop: "2px" }} />
                <a href="https://maps.google.com/?q=19+rue+de+Choiseul,+75002+Paris" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none", fontSize: "14px", lineHeight: "1.5" }}>19 rue de Choiseul, 75002 Paris</a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "hsl(var(--primary-foreground))", opacity: 0.8 }}>
                <Phone style={{ width: "16px", height: "16px" }} />
                {loading ? <Skeleton width="120px" height="14px" /> : (
                  <a href={`tel:${getHeaderContent("header_phone", "+33675394716")}`} style={{ color: "inherit", textDecoration: "none", fontSize: "14px" }}><span style={{ fontSize: "14px" }}>{getHeaderContent("header_phone", "+33675394716")}</span></a>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "hsl(var(--primary-foreground))", opacity: 0.8 }}>
                <Mail style={{ width: "16px", height: "16px" }} />
                {loading ? <Skeleton width="160px" height="14px" /> : (
                  <ObfuscatedEmail />
                )}
              </div>
            </div>
          </div>

          <div>
            <p style={{ fontSize: "12px", fontWeight: "700", color: "hsl(var(--primary-foreground))", opacity: 0.5, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px", fontFamily: "'Helvetica Neue', sans-serif" }}>{getContent("footer_booking_title", "Rendez-vous")}</p>
            <p style={{ fontSize: "14px", lineHeight: "1.7", color: "hsl(var(--primary-foreground))", opacity: 0.7, marginBottom: "16px" }}>{getContent("footer_booking_text", "Prenez rendez-vous en ligne pour une consultation.")}</p>
            <Link to="/reservation" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#8a6b5c", color: "#fff", padding: "10px 20px", borderRadius: "99px", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>
              <Calendar style={{ width: "16px", height: "16px" }} />Réserver
            </Link>
          </div>
        </div>

        <div style={{ borderTop: "1px solid hsl(var(--primary-foreground) / 0.1)", padding: "24px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontSize: "13px", color: "hsl(var(--primary-foreground))", opacity: 0.5 }}>{getContent("footer_copyright", "© 2026 Natalia Kourycheva. Tous droits réservés.")}</p>
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
