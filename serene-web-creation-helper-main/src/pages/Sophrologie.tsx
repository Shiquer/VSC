import usePageTitle from "@/hooks/usePageTitle";
import { Brain, CheckCircle, Clock, Users, Phone, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Sophrologie = () => {
  const techniques = ["Relaxation dynamique", "Respiration consciente", "Visualisation positive", "Méditation guidée", "Ancrage corporel"];
  const benefices = ["Réduction du stress et de l'anxiété", "Amélioration du sommeil", "Renforcement de la confiance en soi", "Meilleure gestion des émotions", "Préparation mentale aux défis", "Développement de la concentration"];

  const sectionStyle = { padding: "80px 0" };
  const h2Style = { fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(26px, 3vw, 36px)", fontWeight: "400" as const, color: "hsl(var(--foreground))", textAlign: "center" as const, marginBottom: "48px" };
  usePageTitle("Sophrologie à Paris - Natalia Kourycheva");

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--background))" }}>
      <Header />

      {/* Hero */}
      <section style={{ ...sectionStyle, background: "hsl(var(--secondary))" }}>
        <div className="container mx-auto px-8">
          <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
            <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px", color: "hsl(var(--foreground))", textDecoration: "none", opacity: 0.7, marginBottom: "32px" }}>
              <ArrowLeft style={{ width: "16px", height: "16px" }} /> Retour à l'accueil
            </Link>
            <div style={{ width: "72px", height: "72px", background: "hsl(var(--foreground))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <Brain style={{ width: "32px", height: "32px", color: "hsl(var(--primary-foreground))" }} />
            </div>
            <h1 className="arise-serif" style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: "400", color: "hsl(var(--foreground))", marginBottom: "20px" }}>Sophrologie</h1>
            <p style={{ fontSize: "18px", lineHeight: "1.7", color: "hsl(var(--foreground))", opacity: 0.7, marginBottom: "36px" }}>
              La sophrologie est une méthode de relaxation basée sur la respiration, la décontraction musculaire et la visualisation. Elle vous aide à retrouver un équilibre entre votre corps et votre mental.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
              <Link to="/reservation"><button className="arise-btn-primary"><Phone style={{ width: "18px", height: "18px" }} />Prendre rendez-vous</button></Link>
              <Link to="/contact"><button className="arise-btn-outline">Me contacter</button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Techniques */}
      <section style={sectionStyle}>
        <div className="container mx-auto px-8">
          <h2 style={h2Style}>Mes techniques de sophrologie</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ maxWidth: "960px", margin: "0 auto" }}>
            {techniques.map((t) => (
              <div key={t} className="arise-card" style={{ textAlign: "center" }}>
                <div style={{ width: "48px", height: "48px", background: "hsl(var(--foreground))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <CheckCircle style={{ width: "22px", height: "22px", color: "hsl(var(--primary-foreground))" }} />
                </div>
                <h3 className="arise-serif" style={{ fontSize: "16px", fontWeight: "400", color: "hsl(var(--foreground))" }}>{t}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bénéfices */}
      <section style={{ ...sectionStyle, background: "hsl(var(--secondary))" }}>
        <div className="container mx-auto px-8">
          <h2 style={h2Style}>Les bénéfices de la sophrologie</h2>
          <div className="grid md:grid-cols-2 gap-10" style={{ maxWidth: "960px", margin: "0 auto" }}>
            <ul style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {benefices.map((b) => (
                <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "16px", color: "hsl(var(--foreground))" }}>
                  <div style={{ width: "24px", height: "24px", background: "hsl(var(--foreground))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                    <CheckCircle style={{ width: "14px", height: "14px", color: "hsl(var(--primary-foreground))" }} />
                  </div>
                  {b}
                </li>
              ))}
            </ul>
            <div className="arise-card">
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                <div style={{ width: "44px", height: "44px", background: "hsl(var(--foreground))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Clock style={{ width: "20px", height: "20px", color: "hsl(var(--primary-foreground))" }} />
                </div>
                <h3 className="arise-serif" style={{ fontSize: "20px", fontWeight: "400", color: "hsl(var(--foreground))" }}>Déroulement d'une séance</h3>
              </div>
              {[
                { n: "1", title: "Échange et définition des objectifs", time: "10 minutes" },
                { n: "2", title: "Exercices de relaxation dynamique", time: "35 minutes" },
                { n: "3", title: "Partage et conseils personnalisés", time: "15 minutes" },
              ].map(step => (
                <div key={step.n} style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "20px" }}>
                  <div style={{ width: "36px", height: "36px", background: "hsl(var(--foreground))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ color: "hsl(var(--primary-foreground))", fontWeight: "700", fontSize: "14px" }}>{step.n}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: "15px", fontWeight: "600", color: "hsl(var(--foreground))", marginBottom: "4px" }}>{step.title}</p>
                    <p style={{ fontSize: "13px", color: "hsl(var(--accent))" }}>{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ ...sectionStyle, background: "hsl(var(--foreground))" }}>
        <div className="container mx-auto px-8" style={{ textAlign: "center" }}>
          <h2 className="arise-serif" style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: "400", color: "hsl(var(--primary-foreground))", marginBottom: "16px" }}>Prêt à commencer votre parcours ?</h2>
          <p style={{ fontSize: "16px", color: "hsl(var(--primary-foreground))", opacity: 0.7, marginBottom: "36px", maxWidth: "480px", margin: "0 auto 36px", lineHeight: "1.7" }}>Prenez rendez-vous pour une première séance découverte et commencez votre chemin vers un mieux-être durable.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <Link to="/reservation">
              <button style={{ background: "hsl(var(--primary-foreground))", color: "hsl(var(--foreground))", border: "3px solid hsl(var(--primary-foreground))", borderRadius: "30px", height: "60px", padding: "0 32px", fontSize: "14px", fontWeight: "700", fontFamily: "'Helvetica Neue', sans-serif", display: "inline-flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <Phone style={{ width: "18px", height: "18px" }} />Prendre rendez-vous
              </button>
            </Link>
            <Link to="/contact">
              <button style={{ background: "transparent", color: "hsl(var(--primary-foreground))", border: "3px solid hsl(var(--primary-foreground))", borderRadius: "30px", height: "60px", padding: "0 32px", fontSize: "14px", fontWeight: "700", fontFamily: "'Helvetica Neue', sans-serif", display: "inline-flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <Users style={{ width: "18px", height: "18px" }} />En savoir plus
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sophrologie;
