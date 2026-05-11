import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, Clock, Calendar, MapPin, Star, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const GroupClasses = () => {
  const classes = [
    {
      title: "Sophrologie Débutant",
      description: "Initiation aux techniques de base de sophrologie et relaxation",
      duration: "1h30", participants: { current: 4, max: 8 }, level: "Débutant", price: "25€", schedule: "Mardi 19h - 20h30",
      benefits: ["Apprentissage des techniques de base", "Gestion du stress quotidien", "Amélioration du sommeil", "Renforcement de la confiance en soi"]
    },
    {
      title: "Sophrologie Avancée",
      description: "Approfondissement des techniques pour pratiquants confirmés",
      duration: "1h30", participants: { current: 6, max: 10 }, level: "Avancé", price: "30€", schedule: "Vendredi 18h - 19h30",
      benefits: ["Techniques avancées de visualisation", "Préparation mentale aux défis", "Développement de l'intuition", "Gestion des émotions complexes"]
    },
    {
      title: "Relaxation & Méditation",
      description: "Séances de relaxation profonde et méditation guidée",
      duration: "1h", participants: { current: 8, max: 12 }, level: "Tous niveaux", price: "20€", schedule: "Samedi 10h - 11h",
      benefits: ["Relaxation profonde", "Méditation guidée", "Réduction de l'anxiété", "Bien-être immédiat"]
    },
    {
      title: "Sophrologie Entreprise",
      description: "Ateliers adaptés aux besoins en entreprise",
      duration: "2h", participants: { current: 12, max: 15 }, level: "Tous niveaux", price: "Sur devis", schedule: "Planning flexible",
      benefits: ["Gestion du stress professionnel", "Amélioration de la concentration", "Cohésion d'équipe", "Prévention du burn-out"]
    }
  ];

  const getAvailabilityText = (current: number, max: number) => {
    const remaining = max - current;
    if (remaining === 0) return "Complet";
    if (remaining <= 2) return `${remaining} place${remaining > 1 ? 's' : ''} restante${remaining > 1 ? 's' : ''}`;
    return `${remaining} places disponibles`;
  };

  const sectionStyle = { padding: "80px 0" };
  const h2Style = { fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(26px, 3vw, 36px)", fontWeight: "400" as const, color: "hsl(var(--foreground))", textAlign: "center" as const, marginBottom: "48px" };

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--background))" }}>
      <Header />
      <main>

        {/* Hero */}
        <section style={{ ...sectionStyle, background: "hsl(var(--secondary))" }}>
          <div className="container mx-auto px-8" style={{ textAlign: "center" }}>
            <span className="arise-badge" style={{ marginBottom: "24px", display: "inline-block" }}>Cours collectifs</span>
            <h1 className="arise-serif" style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: "400", color: "hsl(var(--foreground))", marginBottom: "20px", marginTop: "16px" }}>Cours Collectifs</h1>
            <p style={{ fontSize: "18px", lineHeight: "1.7", color: "hsl(var(--foreground))", opacity: 0.7, maxWidth: "600px", margin: "0 auto 36px" }}>
              Découvrez les bienfaits de la sophrologie en groupe. Nos cours collectifs offrent un accompagnement de qualité dans une ambiance conviviale et bienveillante.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
              <Link to="/reservation"><button className="arise-btn-primary"><Calendar style={{ width: "18px", height: "18px" }} />Réserver ma place</button></Link>
              <Link to="/contact"><button className="arise-btn-outline"><Users style={{ width: "18px", height: "18px" }} />En savoir plus</button></Link>
            </div>
          </div>
        </section>

        {/* Classes */}
        <section style={sectionStyle}>
          <div className="container mx-auto px-8">
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2 style={h2Style}>Nos cours collectifs</h2>
              <p style={{ fontSize: "16px", color: "hsl(var(--foreground))", opacity: 0.7, maxWidth: "480px", margin: "0 auto" }}>
                Choisissez le cours qui correspond à votre niveau et vos objectifs
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {classes.map((c) => {
                const isFull = c.participants.current >= c.participants.max;
                const pct = (c.participants.current / c.participants.max) * 100;
                return (
                  <div key={c.title} className="arise-card" style={{ transition: "all 0.3s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"}
                    onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"}
                  >
                    {/* Header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                      <div>
                        <h3 className="arise-serif" style={{ fontSize: "20px", fontWeight: "400", color: "hsl(var(--foreground))", marginBottom: "8px" }}>{c.title}</h3>
                        <span style={{ background: "hsl(var(--secondary))", color: "hsl(var(--foreground))", fontSize: "12px", fontWeight: "700", padding: "4px 12px", borderRadius: "25px", fontFamily: "'Helvetica Neue', sans-serif" }}>{c.level}</span>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div className="arise-serif" style={{ fontSize: "28px", fontWeight: "400", color: "hsl(var(--foreground))" }}>{c.price}</div>
                        <div style={{ fontSize: "12px", color: "hsl(var(--foreground))", opacity: 0.5 }}>par séance</div>
                      </div>
                    </div>

                    <p style={{ fontSize: "14px", lineHeight: "1.6", color: "hsl(var(--foreground))", opacity: 0.7, marginBottom: "20px" }}>{c.description}</p>

                    {/* Participants bar */}
                    <div style={{ background: "hsl(var(--secondary))", borderRadius: "16px", padding: "16px", marginBottom: "20px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: "700", color: "hsl(var(--foreground))" }}>
                          <Users style={{ width: "14px", height: "14px" }} />Participants
                        </div>
                        <span style={{ fontSize: "12px", fontWeight: "700", color: isFull ? "#B20000" : "hsl(var(--foreground))", background: "hsl(var(--background))", padding: "3px 10px", borderRadius: "25px" }}>
                          {c.participants.current}/{c.participants.max}
                        </span>
                      </div>
                      <div style={{ height: "6px", background: "hsl(var(--background))", borderRadius: "99px", marginBottom: "8px" }}>
                        <div style={{ height: "6px", width: `${pct}%`, background: pct >= 90 ? "#B20000" : "hsl(var(--foreground))", borderRadius: "99px", transition: "width 0.3s" }} />
                      </div>
                      <p style={{ fontSize: "12px", color: "hsl(var(--foreground))", opacity: 0.6 }}>{getAvailabilityText(c.participants.current, c.participants.max)}</p>
                    </div>

                    {/* Schedule & Duration */}
                    <div className="grid grid-cols-2 gap-4" style={{ marginBottom: "20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "hsl(var(--foreground))" }}>
                        <Calendar style={{ width: "14px", height: "14px" }} />{c.schedule}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "hsl(var(--foreground))" }}>
                        <Clock style={{ width: "14px", height: "14px" }} />{c.duration}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div style={{ marginBottom: "24px" }}>
                      <p style={{ fontSize: "12px", fontWeight: "700", color: "hsl(var(--foreground))", opacity: 0.5, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px", fontFamily: "'Helvetica Neue', sans-serif" }}>Bénéfices</p>
                      <ul style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {c.benefits.map((b, bi) => (
                          <li key={bi} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "hsl(var(--foreground))", opacity: 0.75 }}>
                            <CheckCircle style={{ width: "14px", height: "14px", flexShrink: 0 }} />{b}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <div style={{ display: "flex", gap: "12px" }}>
                      <Link to="/reservation" style={{ flex: 1 }}>
                        <button
                          disabled={isFull}
                          style={{ width: "100%", background: isFull ? "hsl(var(--muted))" : "hsl(var(--foreground))", color: isFull ? "hsl(var(--muted-foreground))" : "hsl(var(--primary-foreground))", border: "3px solid", borderColor: isFull ? "hsl(var(--muted))" : "hsl(var(--foreground))", borderRadius: "30px", height: "52px", fontSize: "14px", fontWeight: "700", fontFamily: "'Helvetica Neue', sans-serif", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", cursor: isFull ? "not-allowed" : "pointer" }}
                        >
                          {isFull ? "Complet" : <><span>Réserver</span><ArrowRight style={{ width: "16px", height: "16px" }} /></>}
                        </button>
                      </Link>
                      <button className="arise-btn-outline" style={{ height: "52px", padding: "0 20px", fontSize: "13px" }}>
                        Plus d'infos
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pourquoi */}
        <section style={{ ...sectionStyle, background: "hsl(var(--secondary))" }}>
          <div className="container mx-auto px-8">
            <h2 style={h2Style}>Pourquoi choisir nos cours collectifs ?</h2>
            <div className="grid md:grid-cols-3 gap-8" style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
              {[
                { icon: Users, title: "Dynamique de groupe", desc: "L'énergie collective favorise la motivation et crée une émulation positive entre les participants." },
                { icon: Star, title: "Qualité professionnelle", desc: "Encadrement par un sophrologue certifié avec un programme structuré et adapté." },
                { icon: MapPin, title: "Cadre bienveillant", desc: "Environnement calme et sécurisant dans notre cabinet à Montreuil." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "64px", height: "64px", background: "hsl(var(--foreground))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon style={{ width: "28px", height: "28px", color: "hsl(var(--primary-foreground))" }} />
                  </div>
                  <h3 className="arise-serif" style={{ fontSize: "18px", fontWeight: "400", color: "hsl(var(--foreground))" }}>{title}</h3>
                  <p style={{ fontSize: "14px", lineHeight: "1.7", color: "hsl(var(--foreground))", opacity: 0.7 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ ...sectionStyle, background: "hsl(var(--foreground))" }}>
          <div className="container mx-auto px-8" style={{ textAlign: "center" }}>
            <h2 className="arise-serif" style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: "400", color: "hsl(var(--primary-foreground))", marginBottom: "16px" }}>Prêt à rejoindre nos cours ?</h2>
            <p style={{ fontSize: "16px", color: "hsl(var(--primary-foreground))", opacity: 0.7, maxWidth: "480px", margin: "0 auto 36px", lineHeight: "1.7" }}>Réservez dès maintenant votre place. Places limitées pour garantir un accompagnement de qualité.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
              <Link to="/reservation">
                <button style={{ background: "hsl(var(--primary-foreground))", color: "hsl(var(--foreground))", border: "3px solid hsl(var(--primary-foreground))", borderRadius: "30px", height: "60px", padding: "0 32px", fontSize: "14px", fontWeight: "700", fontFamily: "'Helvetica Neue', sans-serif", display: "inline-flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <Calendar style={{ width: "18px", height: "18px" }} />Réserver ma place
                </button>
              </Link>
              <Link to="/contact">
                <button style={{ background: "transparent", color: "hsl(var(--primary-foreground))", border: "3px solid hsl(var(--primary-foreground))", borderRadius: "30px", height: "60px", padding: "0 32px", fontSize: "14px", fontWeight: "700", fontFamily: "'Helvetica Neue', sans-serif", display: "inline-flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  Poser une question
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GroupClasses;