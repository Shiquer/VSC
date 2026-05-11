import { Heart, CheckCircle, Clock, Users, Phone, ArrowLeft, Target } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Hypnose = () => {
  const domaines = [
    { title: "Arrêt du tabac", description: "Accompagnement personnalisé pour se libérer définitivement de la dépendance au tabac" },
    { title: "Gestion des phobies", description: "Traitement en douceur des peurs irrationnelles et des phobies limitantes" },
    { title: "Perte de poids", description: "Modification des comportements alimentaires pour une perte de poids durable" },
    { title: "Confiance en soi", description: "Renforcement de l'estime de soi et développement de la confiance intérieure" },
    { title: "Gestion du stress", description: "Techniques pour réduire l'anxiété et retrouver un état de calme intérieur" },
    { title: "Troubles du sommeil", description: "Amélioration de la qualité du sommeil et traitement des insomnies" },
  ];

  const mythes = [
    { mythe: "L'hypnose fait perdre le contrôle", realite: "Vous restez conscient et maître de vos décisions à tout moment" },
    { mythe: "Tout le monde n'est pas hypnotisable", realite: "Chacun peut atteindre un état d'hypnose adapté à sa personnalité" },
    { mythe: "L'hypnose peut révéler des secrets", realite: "Vous ne direz que ce que vous souhaitez partager" },
  ];

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
            <div style={{ width: "72px", height: "72px", background: "hsl(var(--accent))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <Heart style={{ width: "32px", height: "32px", color: "#fff" }} />
            </div>
            <h1 className="arise-serif" style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: "400", color: "hsl(var(--foreground))", marginBottom: "20px" }}>Hypnose thérapeutique</h1>
            <p style={{ fontSize: "18px", lineHeight: "1.7", color: "hsl(var(--foreground))", opacity: 0.7, marginBottom: "36px" }}>
              L'hypnose thérapeutique est un état modifié de conscience qui permet d'accéder aux ressources inconscientes pour créer des changements durables et positifs dans votre vie.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
              <Link to="/reservation"><button className="arise-btn-primary"><Phone style={{ width: "18px", height: "18px" }} />Prendre rendez-vous</button></Link>
              <Link to="/contact"><button className="arise-btn-outline">Me contacter</button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Domaines */}
      <section style={sectionStyle}>
        <div className="container mx-auto px-8">
          <h2 style={h2Style}>Domaines d'application</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ maxWidth: "960px", margin: "0 auto" }}>
            {domaines.map((d) => (
              <div key={d.title} className="arise-card" style={{ transition: "transform 0.3s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
              >
                <div style={{ width: "44px", height: "44px", background: "hsl(var(--accent))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                  <Target style={{ width: "20px", height: "20px", color: "#fff" }} />
                </div>
                <h3 className="arise-serif" style={{ fontSize: "18px", fontWeight: "400", color: "hsl(var(--foreground))", marginBottom: "8px" }}>{d.title}</h3>
                <p style={{ fontSize: "14px", lineHeight: "1.6", color: "hsl(var(--foreground))", opacity: 0.7 }}>{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mythes */}
      <section style={{ ...sectionStyle, background: "hsl(var(--secondary))" }}>
        <div className="container mx-auto px-8">
          <h2 style={h2Style}>Mythes et réalités sur l'hypnose</h2>
          <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>
            {mythes.map((m) => (
              <div key={m.mythe} className="arise-card">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p style={{ fontSize: "12px", fontWeight: "700", color: "#B20000", marginBottom: "8px", fontFamily: "'Helvetica Neue', sans-serif" }}>❌ MYTHE</p>
                    <p style={{ fontSize: "15px", color: "hsl(var(--foreground))" }}>{m.mythe}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "12px", fontWeight: "700", color: "hsl(var(--accent))", marginBottom: "8px", fontFamily: "'Helvetica Neue', sans-serif" }}>✅ RÉALITÉ</p>
                    <p style={{ fontSize: "15px", color: "hsl(var(--foreground))" }}>{m.realite}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Séance */}
      <section style={sectionStyle}>
        <div className="container mx-auto px-8">
          <h2 style={h2Style}>Déroulement d'une séance d'hypnose</h2>
          <div className="arise-card" style={{ maxWidth: "640px", margin: "0 auto", padding: "40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
              <div style={{ width: "44px", height: "44px", background: "hsl(var(--foreground))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Clock style={{ width: "20px", height: "20px", color: "hsl(var(--primary-foreground))" }} />
              </div>
              <h3 className="arise-serif" style={{ fontSize: "22px", fontWeight: "400", color: "hsl(var(--foreground))" }}>Séance de 60 minutes</h3>
            </div>
            {[
              { n: "1", title: "Anamnèse et définition des objectifs", desc: "Discussion approfondie de votre demande et de vos attentes", time: "15 minutes" },
              { n: "2", title: "Induction et travail en hypnose", desc: "Accompagnement personnalisé vers l'état d'hypnose thérapeutique", time: "35 minutes" },
              { n: "3", title: "Retour et conseils", desc: "Échange sur la séance et conseils pour maintenir les bénéfices", time: "10 minutes" },
            ].map(step => (
              <div key={step.n} style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
                <div style={{ width: "36px", height: "36px", background: "hsl(var(--foreground))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: "hsl(var(--primary-foreground))", fontWeight: "700", fontSize: "14px" }}>{step.n}</span>
                </div>
                <div>
                  <p style={{ fontSize: "15px", fontWeight: "600", color: "hsl(var(--foreground))", marginBottom: "4px" }}>{step.title}</p>
                  <p style={{ fontSize: "13px", color: "hsl(var(--foreground))", opacity: 0.6, marginBottom: "4px" }}>{step.desc}</p>
                  <p style={{ fontSize: "12px", color: "hsl(var(--accent))", fontWeight: "700" }}>{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ ...sectionStyle, background: "hsl(var(--foreground))" }}>
        <div className="container mx-auto px-8" style={{ textAlign: "center" }}>
          <h2 className="arise-serif" style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: "400", color: "hsl(var(--primary-foreground))", marginBottom: "16px" }}>Libérez votre potentiel de changement</h2>
          <p style={{ fontSize: "16px", color: "hsl(var(--primary-foreground))", opacity: 0.7, maxWidth: "480px", margin: "0 auto 36px", lineHeight: "1.7" }}>L'hypnose thérapeutique peut vous aider à surmonter vos blocages et à atteindre vos objectifs.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <Link to="/reservation">
              <button style={{ background: "hsl(var(--primary-foreground))", color: "hsl(var(--foreground))", border: "3px solid hsl(var(--primary-foreground))", borderRadius: "30px", height: "60px", padding: "0 32px", fontSize: "14px", fontWeight: "700", fontFamily: "'Helvetica Neue', sans-serif", display: "inline-flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <Phone style={{ width: "18px", height: "18px" }} />Prendre rendez-vous
              </button>
            </Link>
            <Link to="/contact">
              <button style={{ background: "transparent", color: "hsl(var(--primary-foreground))", border: "3px solid hsl(var(--primary-foreground))", borderRadius: "30px", height: "60px", padding: "0 32px", fontSize: "14px", fontWeight: "700", fontFamily: "'Helvetica Neue', sans-serif", display: "inline-flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <Users style={{ width: "18px", height: "18px" }} />Poser une question
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Hypnose;