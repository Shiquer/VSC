import { Quote, Award, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/hooks/useSiteContent";

const About = () => {
  const { getContent } = useSiteContent("about");

  return (
    <section id="a-propos" style={{ padding: "80px 0", background: "hsl(var(--secondary))" }}>
      <div className="container mx-auto px-8">

        {/* Header */}
        <div className="text-center animate-fade-in" style={{ marginBottom: "56px" }}>
          <h2 className="arise-serif" style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: "400", color: "hsl(var(--foreground))", marginBottom: "16px" }}>
            {getContent("about_title", "À propos de Christopher Quershi")}
          </h2>
          <p style={{ fontSize: "16px", lineHeight: "1.7", color: "hsl(var(--foreground))", opacity: 0.7, maxWidth: "480px", margin: "0 auto" }}>
            {getContent("about_intro", "Découvrez mon parcours et ma philosophie d'accompagnement.")}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* Left - Image + cards */}
          <div className="lg:col-span-8" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Calendrier */}
            <div style={{ borderRadius: "25px", overflow: "hidden", background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", padding: "28px", position: "relative" }}>
              {/* Header calendrier */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <span className="arise-serif" style={{ fontSize: "22px", fontWeight: "400", color: "hsl(var(--foreground))", letterSpacing: "0.05em" }}>SEPTEMBRE</span>
                <span style={{ fontSize: "16px", color: "hsl(var(--foreground))", opacity: 0.5, fontFamily: "'Helvetica Neue', sans-serif" }}>2025</span>
              </div>
              {/* Jours de la semaine */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", marginBottom: "6px" }}>
                {["LUN","MAR","MER","JEU","VEN","SAM","DIM"].map(d => (
                  <div key={d} style={{ textAlign: "center", fontSize: "10px", fontWeight: "700", color: "hsl(var(--foreground))", opacity: 0.45, fontFamily: "'Helvetica Neue', sans-serif", padding: "4px 0" }}>{d}</div>
                ))}
              </div>
              {/* Grille des jours */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" }}>
                {[
                  { day: 1, events: [{ label: "Séances petit groupe", color: "#5a9e6f" }] },
                  { day: 2, events: [] }, { day: 3, events: [] }, { day: 4, events: [] },
                  { day: 5, events: [{ label: "Breathwork", color: "#7b9ec9" }] },
                  { day: 6, events: [] }, { day: 7, events: [] },
                  { day: 8, events: [{ label: "Séances petit groupe", color: "#5a9e6f" }] },
                  { day: 9, events: [{ label: "Séances petit groupe", color: "#5a9e6f" }] },
                  { day: 10, events: [{ label: "Séances petit groupe", color: "#5a9e6f" }] },
                  { day: 11, events: [{ label: "Séances petit groupe", color: "#5a9e6f" }] },
                  { day: 12, events: [{ label: "Séance de pratique", color: "#d47fa6" }] },
                  { day: 13, events: [] }, { day: 14, events: [] },
                  { day: 15, events: [{ label: "Grand groupe", color: "#e8a87c" }] },
                  { day: 16, events: [{ label: "Séances petit groupe", color: "#5a9e6f" }] },
                  { day: 17, events: [{ label: "Séances petit groupe", color: "#5a9e6f" }] },
                  { day: 18, events: [{ label: "Séances petit groupe", color: "#5a9e6f" }] },
                  { day: 19, events: [{ label: "Séance de pratique", color: "#d47fa6" }] },
                  { day: 20, events: [] },
                  { day: 21, events: [{ label: "Breathwork", color: "#7b9ec9" }] },
                  { day: 22, events: [{ label: "Séances petit groupe", color: "#5a9e6f" }] },
                  { day: 23, events: [{ label: "Séances petit groupe", color: "#5a9e6f" }] },
                  { day: 24, events: [{ label: "Séances petit groupe", color: "#5a9e6f" }] },
                  { day: 25, events: [{ label: "Séances petit groupe", color: "#5a9e6f" }] },
                  { day: 26, events: [{ label: "Séance de pratique", color: "#d47fa6" }] },
                  { day: 27, events: [] }, { day: 28, events: [] },
                ].map(({ day, events }) => (
                  <div key={day} style={{ border: "1px solid hsl(var(--border))", borderRadius: "8px", padding: "6px 5px", minHeight: "60px", background: "hsl(var(--background))" }}>
                    <div style={{ fontSize: "11px", fontWeight: "600", color: "hsl(var(--foreground))", marginBottom: "4px", fontFamily: "'Helvetica Neue', sans-serif" }}>{day}</div>
                    {events.map(ev => (
                      <div key={ev.label} style={{ background: ev.color, borderRadius: "4px", padding: "2px 4px", fontSize: "9px", color: "#fff", fontWeight: "600", lineHeight: "1.3", fontFamily: "'Helvetica Neue', sans-serif", marginBottom: "2px" }}>
                        {ev.label}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              {/* CTA overlay */}
              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <Link to="/reservation">
                  <button style={{ background: "hsl(var(--foreground))", color: "hsl(var(--primary-foreground))", border: "none", borderRadius: "30px", height: "48px", padding: "0 24px", fontSize: "14px", fontWeight: "700", fontFamily: "'Helvetica Neue', Helvetica, sans-serif", display: "inline-flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                    <Calendar style={{ width: "16px", height: "16px" }} />
                    Prendre rendez-vous
                  </button>
                </Link>
              </div>
            </div>

            {/* Horaires */}
            <div className="arise-card">
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "40px", height: "40px", background: "hsl(var(--foreground))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Calendar style={{ width: "18px", height: "18px", color: "hsl(var(--primary-foreground))" }} />
                </div>
                <div>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: "400", color: "hsl(var(--foreground))", marginBottom: "4px" }}>Horaires d'ouverture</h4>
                  <p style={{ fontSize: "14px", color: "hsl(var(--foreground))", opacity: 0.7 }}>Mardi et vendredi 8h–21h · Samedi 8h–13h</p>
                </div>
              </div>
            </div>

            {/* 3 Cards */}
            <div className="grid md:grid-cols-3 gap-6">

              {/* Certifications */}
              <div className="arise-card">
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <div style={{ width: "36px", height: "36px", background: "hsl(var(--foreground))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Award style={{ width: "16px", height: "16px", color: "hsl(var(--primary-foreground))" }} />
                  </div>
                  <h4 className="arise-serif" style={{ fontSize: "15px", fontWeight: "400", color: "hsl(var(--foreground))" }}>Formations</h4>
                </div>
                <ul style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {["Sophrologue certifié RNCP", "Hypnothérapeute diplômé", "Thérapies brèves", "Accompagnement entreprise"].map((cert) => (
                    <li key={cert} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "hsl(var(--foreground))", opacity: 0.75 }}>
                      <div style={{ width: "5px", height: "5px", background: "hsl(var(--foreground))", borderRadius: "50%", flexShrink: 0 }} />
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Témoignages */}
              <div style={{ background: "hsl(var(--foreground))", borderRadius: "25px", padding: "28px", border: "1px solid hsl(var(--border))" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <Quote style={{ width: "20px", height: "20px", color: "hsl(var(--primary-foreground))", opacity: 0.6 }} />
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px", fontWeight: "400", color: "hsl(var(--primary-foreground))" }}>Témoignages</h4>
                </div>
                {[
                  { text: "Accompagnement exceptionnel, j'ai retrouvé confiance en moi.", author: "Marie L." },
                  { text: "Des séances qui ont transformé ma gestion du stress.", author: "Thomas R." }
                ].map((t, i) => (
                  <div key={t.author} style={{ marginBottom: i === 0 ? "16px" : 0 }}>
                    <p style={{ fontSize: "12px", fontStyle: "italic", color: "hsl(var(--primary-foreground))", opacity: 0.85, lineHeight: "1.6", marginBottom: "4px" }}>"{t.text}"</p>
                    <p style={{ fontSize: "12px", color: "hsl(var(--primary-foreground))", opacity: 0.5 }}>— {t.author}</p>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="arise-card">
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <div style={{ width: "36px", height: "36px", background: "hsl(var(--foreground))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Award style={{ width: "16px", height: "16px", color: "hsl(var(--primary-foreground))" }} />
                  </div>
                  <h4 className="arise-serif" style={{ fontSize: "15px", fontWeight: "400", color: "hsl(var(--foreground))" }}>Résultats</h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: "5+", label: "Années" },
                    { val: "200+", label: "Patients" },
                    { val: "95%", label: "Satisfaction" },
                    { val: "85%", label: "Amélioration" },
                  ].map(({ val, label }) => (
                    <div key={label} style={{ textAlign: "center" }}>
                      <div className="arise-serif" style={{ fontSize: "22px", fontWeight: "400", color: "hsl(var(--foreground))", marginBottom: "2px" }}>{val}</div>
                      <div style={{ fontSize: "12px", color: "hsl(var(--foreground))", opacity: 0.6 }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* CTA Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <Link to="/reservation">
                <button className="arise-btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  <Calendar style={{ width: "18px", height: "18px" }} />
                  Prendre rendez-vous
                </button>
              </Link>
              <button className="arise-btn-outline" style={{ width: "100%", justifyContent: "center" }}>
                Voir tous les avis
              </button>
            </div>

            {/* Address */}
            <div className="arise-card">
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ width: "36px", height: "36px", background: "hsl(var(--foreground))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <MapPin style={{ width: "16px", height: "16px", color: "hsl(var(--primary-foreground))" }} />
                </div>
                <div>
                  <h4 className="arise-serif" style={{ fontSize: "16px", fontWeight: "400", color: "hsl(var(--foreground))", marginBottom: "6px" }}>Cabinet</h4>
                  <p style={{ fontSize: "14px", color: "hsl(var(--foreground))", opacity: 0.7, lineHeight: "1.6" }}>93, Montreuil rue test<br />93100 Montreuil</p>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div style={{ background: "hsl(var(--foreground))", borderRadius: "25px", padding: "32px", position: "relative", overflow: "hidden" }}>
              <Quote style={{ width: "40px", height: "40px", color: "hsl(var(--primary-foreground))", opacity: 0.15, position: "absolute", top: "16px", right: "16px" }} />
              <blockquote className="arise-serif" style={{ fontSize: "16px", fontWeight: "400", color: "hsl(var(--primary-foreground))", lineHeight: "1.7", marginBottom: "16px", fontStyle: "italic" }}>
                {getContent("about_quote", "\"On ne change pas en luttant contre ce qui existe déjà. Pour changer quelque chose, construisez un modèle nouveau.\"")}
              </blockquote>
              <cite style={{ fontSize: "13px", color: "hsl(var(--primary-foreground))", opacity: 0.6 }}>— Buckminster Fuller</cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
 
