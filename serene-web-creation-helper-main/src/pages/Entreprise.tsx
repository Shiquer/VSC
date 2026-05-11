import { Users, CheckCircle, Clock, Phone, ArrowLeft, Building, Target, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Entreprise = () => {
  const services = [
    { icon: Target, title: "Formations anti-stress", description: "Programmes personnalisés pour apprendre à gérer le stress au quotidien", duree: "Demi-journée ou journée complète", participants: "5 à 15 personnes" },
    { icon: Users, title: "Cohésion d'équipe", description: "Activités de team building basées sur la sophrologie et la communication", duree: "1 à 2 jours", participants: "Équipes de 8 à 20 personnes" },
    { icon: TrendingUp, title: "Prévention burn-out", description: "Sensibilisation et outils pratiques pour prévenir l'épuisement professionnel", duree: "Ateliers de 2h à 4h", participants: "Managers et collaborateurs" },
    { icon: Award, title: "Qualité de vie au travail", description: "Amélioration du bien-être global et de l'ambiance de travail", duree: "Programme sur mesure", participants: "Selon les besoins" },
  ];

  const benefices = ["Réduction de l'absentéisme", "Amélioration de la productivité", "Meilleure ambiance de travail", "Diminution du stress collectif", "Renforcement de la communication", "Prévention des risques psychosociaux"];
  const secteurs = ["Entreprises privées", "Administrations publiques", "Établissements de santé", "Institutions scolaires", "Associations", "Startups et PME"];

  const sectionStyle = { padding: "80px 0" };
  const h2Style = { fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(26px, 3vw, 36px)", fontWeight: "400" as const, color: "hsl(var(--foreground))", textAlign: "center" as const, marginBottom: "48px" };

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
            <div style={{ width: "72px", height: "72px", background: "#334862", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <Users style={{ width: "32px", height: "32px", color: "#fff" }} />
            </div>
            <h1 className="arise-serif" style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: "400", color: "hsl(var(--foreground))", marginBottom: "20px" }}>Entreprise & Organisations</h1>
            <p style={{ fontSize: "18px", lineHeight: "1.7", color: "hsl(var(--foreground))", opacity: 0.7, marginBottom: "36px" }}>
              Accompagnement des entreprises et organisations pour améliorer le bien-être au travail, prévenir les risques psychosociaux et favoriser un environnement professionnel épanouissant.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
              <Link to="/contact"><button className="arise-btn-primary"><Phone style={{ width: "18px", height: "18px" }} />Demander un devis</button></Link>
              <Link to="/contact"><button className="arise-btn-outline"><Building style={{ width: "18px", height: "18px" }} />Présenter mon projet</button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={sectionStyle}>
        <div className="container mx-auto px-8">
          <h2 style={h2Style}>Nos accompagnements en entreprise</h2>
          <div className="grid md:grid-cols-2 gap-6" style={{ maxWidth: "960px", margin: "0 auto" }}>
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="arise-card" style={{ transition: "transform 0.3s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"}
                >
                  <div style={{ width: "52px", height: "52px", background: "#334862", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                    <Icon style={{ width: "24px", height: "24px", color: "#fff" }} />
                  </div>
                  <h3 className="arise-serif" style={{ fontSize: "20px", fontWeight: "400", color: "hsl(var(--foreground))", marginBottom: "8px" }}>{s.title}</h3>
                  <p style={{ fontSize: "14px", color: "hsl(var(--foreground))", opacity: 0.7, marginBottom: "16px", lineHeight: "1.6" }}>{s.description}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "hsl(var(--foreground))" }}>
                      <Clock style={{ width: "14px", height: "14px" }} /><strong>Durée :</strong> {s.duree}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "hsl(var(--foreground))" }}>
                      <Users style={{ width: "14px", height: "14px" }} /><strong>Participants :</strong> {s.participants}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bénéfices */}
      <section style={{ ...sectionStyle, background: "hsl(var(--secondary))" }}>
        <div className="container mx-auto px-8">
          <h2 style={h2Style}>Les bénéfices pour votre organisation</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ maxWidth: "960px", margin: "0 auto" }}>
            {benefices.map((b) => (
              <div key={b} className="arise-card" style={{ textAlign: "center" }}>
                <div style={{ width: "44px", height: "44px", background: "hsl(var(--foreground))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  <CheckCircle style={{ width: "20px", height: "20px", color: "hsl(var(--primary-foreground))" }} />
                </div>
                <p className="arise-serif" style={{ fontSize: "15px", fontWeight: "400", color: "hsl(var(--foreground))" }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secteurs */}
      <section style={sectionStyle}>
        <div className="container mx-auto px-8">
          <h2 style={h2Style}>Secteurs d'intervention</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ maxWidth: "960px", margin: "0 auto" }}>
            {secteurs.map((s) => (
              <div key={s} className="arise-card" style={{ textAlign: "center" }}>
                <div style={{ width: "44px", height: "44px", background: "#334862", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  <Building style={{ width: "20px", height: "20px", color: "#fff" }} />
                </div>
                <p className="arise-serif" style={{ fontSize: "15px", fontWeight: "400", color: "hsl(var(--foreground))" }}>{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approche */}
      <section style={{ ...sectionStyle, background: "hsl(var(--secondary))" }}>
        <div className="container mx-auto px-8">
          <h2 style={h2Style}>Notre approche</h2>
          <div className="arise-card" style={{ maxWidth: "640px", margin: "0 auto", padding: "40px" }}>
            {[
              { n: "1", title: "Diagnostic des besoins", desc: "Analyse de votre contexte et identification des enjeux spécifiques" },
              { n: "2", title: "Conception sur mesure", desc: "Élaboration d'un programme adapté à vos objectifs et contraintes" },
              { n: "3", title: "Mise en œuvre", desc: "Animation des ateliers avec des outils pratiques et concrets" },
              { n: "4", title: "Suivi et évaluation", desc: "Accompagnement dans la durée et mesure de l'impact des actions" },
            ].map(step => (
              <div key={step.n} style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
                <div style={{ width: "36px", height: "36px", background: "hsl(var(--foreground))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: "hsl(var(--primary-foreground))", fontWeight: "700", fontSize: "14px" }}>{step.n}</span>
                </div>
                <div>
                  <p style={{ fontSize: "15px", fontWeight: "600", color: "hsl(var(--foreground))", marginBottom: "4px" }}>{step.title}</p>
                  <p style={{ fontSize: "13px", color: "hsl(var(--foreground))", opacity: 0.6 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ ...sectionStyle, background: "hsl(var(--foreground))" }}>
        <div className="container mx-auto px-8" style={{ textAlign: "center" }}>
          <h2 className="arise-serif" style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: "400", color: "hsl(var(--primary-foreground))", marginBottom: "16px" }}>Investissez dans le bien-être de vos équipes</h2>
          <p style={{ fontSize: "16px", color: "hsl(var(--primary-foreground))", opacity: 0.7, maxWidth: "480px", margin: "0 auto 36px", lineHeight: "1.7" }}>Contactez-nous pour échanger sur vos besoins et construire ensemble un programme adapté.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <Link to="/contact">
              <button style={{ background: "hsl(var(--primary-foreground))", color: "hsl(var(--foreground))", border: "3px solid hsl(var(--primary-foreground))", borderRadius: "30px", height: "60px", padding: "0 32px", fontSize: "14px", fontWeight: "700", fontFamily: "'Helvetica Neue', sans-serif", display: "inline-flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <Phone style={{ width: "18px", height: "18px" }} />Demander un devis
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Entreprise;