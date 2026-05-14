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
                  {getHeaderContent("header_title", "Natalia Kourycheva")}
                </p>
                <p style={{ fontSize: "12px", color: "hsl(var(--primary-foreground))", opacity: 0.6, lineHeight: "1.2" }}>
                  {getHeaderContent("header_subtitle", "Psychanalyste & Hypnotherapeute")}
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
                <a href={`tel:${getHeaderContent("header_phone", "+33123456789")}`} style={{ color: "inherit", textDecoration: "none" }}><span style={{ fontSize: "14px" }}>{getHeaderContent("header_phone", "+33 1 23 45 67 89")}</span></a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "hsl(var(--primary-foreground))", opacity: 0.8 }}>
