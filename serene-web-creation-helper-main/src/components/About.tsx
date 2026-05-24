import { Quote, Award, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/hooks/useSiteContent";

const CALENDAR_LEGEND = [
  { color: "#5a9e6f", label: "Séances petit groupe", desc: "Sophrologie & hypnose en groupe restreint (4-6 pers.)" },
  { color: "#e8a87c", label: "Grand groupe",          desc: "Ateliers collectifs ouverts (8-12 pers.)" },
  { color: "#d47fa6", label: "Séance de pratique",    desc: "Pratique guidée & intégration" },
  { color: "#7b9ec9", label: "Breathwork",            desc: "Séance de respiration consciente" },
];

const About = () => {
  const { getContent } = useSiteContent("about");

  const now = new Date();
  const currentYear = now.getFullYear();
  const moisFR = [
    "JANVIER", "FÉVRIER", "MARS", "AVRIL", "MAI", "JUIN",
    "JUILLET", "AOÛT", "SEPTEMBRE", "OCTOBRE", "NOVEMBRE", "DÉCEMBRE"
  ];
  const currentMonth = moisFR[now.getMonth()];

  return (
    <section id="a-propos" style={{ padding: "80px 0", background: "hsl(var(--secondary))" }}>
      <div className="container mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center animate-fade-in" style={{ marginBottom: "56px" }}>
          <h2 className="arise-serif" style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: "400", color: "hsl(var(--foreground))", marginBottom: "16px" }}>
            {getContent("about_title", "À propos de Natalia Kourycheva")}
          </h2>
          <p style={{ fontSize: "16px", lineHeight: "1.7", color: "hsl(var(--foreground))", opacity: 0.7, maxWidth: "480px", margin: "0 auto" }}>
            {getContent("about_intro", "Découvrez mon parcours et ma philosophie d'accompagnement.")}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* Left - Calendar + info */}
          <div className="lg:col-span-8" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Calendrier */}
            <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" as any, borderRadius: "25px" }}>
              <div style={{ borderRadius: "25px", overflow: "hidden", background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", padding: "28px", position: "relative", minWidth: "500px" }}>

                {/* Titre du planning */}
                <div style={{ marginBottom: "20px" }}>
                  <p style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.12em", color: "hsl(var(--primary))", fontFamily: "'Helvetica Neue', sans-serif", textTransform: "uppercase", marginBottom: "4px" }}>
                    Planning des séances collectives
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="arise-serif" style={{ fontSize: "22px", fontWeight: "400", color: "hsl(var(--foreground))", letterSpacing: "0.05em" }}>{currentMonth}</span>
                    <span style={{ fontSize: "16px", color: "hsl(var(--foreground))", opacity: 0.5, fontFamily: "'Helvetica Neue', sans-serif" }}>{currentYear}</span>
                  </div>
                  <p style={{ fontSize: "12px", color: "hsl(var(--muted-foreground))", marginTop: "4px", fontFamily: "'Helvetica Neue', sans-serif" }}>
                    Les rendez-vous individuels ne sont pas affichés ici.{" "}
                    <Link to="/contact" style={{ color: "hsl(var(--primary))", textDecoration: "underline" }}>Contactez-moi</Link> pour réserver.
                  </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(44px, 1fr))", gap: "4px", marginBottom: "6px" }}>
                  {["LUN","MAR","MER","JEU","VEN","SAM","DIM"].map(d => (
                    <div key={d} style={{ textAlign: "center", fontSize: "10px", fontWeight: "700", color: "hsl(var(--foreground))", opacity: 0.45, fontFamily: "'Helvetica Neue', sans-serif", padding: "4px 0" }}>{d}</div>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(44px, 1fr))", gap: "4px" }}>
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

                {/* Légende */}
                <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid hsl(var(--border))" }}>
                  <p style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", color: "hsl(var(--foreground))", opacity: 0.5, marginBottom: "10px", fontFamily: "'Helvetica Neue', sans-serif", textTransform: "uppercase" }}>
                    Légende
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
                    {CALENDAR_LEGEND.map(({ color, label, desc }) => (
                      <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                        <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: color, flexShrink: 0, marginTop: "2px" }} />
                        <div>
                          <p style={{ fontSize: "11px", fontWeight: "700", color: "hsl(var(--foreground))", fontFamily: "'Helvetica Neue', sans-serif", marginBottom: "1px" }}>{label}</p>
                          <p style={{ fontSize: "10px", color: "hsl(var(--muted-foreground))", fontFamily: "'Helvetica Neue', sans-serif", lineHeight: "1.3" }}>{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Info card */}
            <div style={{ borderRadius: "20px", background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", padding: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <MapPin size={20} style={{ color: "hsl(var(--primary))" }} />
                <span style={{ fontWeight: "600" }}>Cabinet à Paris (75)</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Calendar size={20} style={{ color: "hsl(var(--primary))" }} />
                <span style={{ fontSize: "14px", color: "hsl(var(--muted-foreground))" }}>Séances en présentiel et à distance disponibles</span>
              </div>
            </div>
          </div>

          {/* Right - Bio */}
          <div className="lg:col-span-4" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Quote */}
            <div style={{ borderRadius: "20px", background: "hsl(var(--primary)/0.05)", border: "1px solid hsl(var(--primary)/0.15)", padding: "24px" }}>
              <Quote size={24} style={{ color: "hsl(var(--primary))", marginBottom: "12px" }} />
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "hsl(var(--foreground))", fontStyle: "italic" }}>
                {getContent("about_quote", "Mon approche est centrée sur la personne, avec bienveillance et professionnalisme.")}
              </p>
            </div>

            {/* Stats */}
            <div style={{ borderRadius: "20px", background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", padding: "24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {[
                  { icon: Award, value: "10+", label: "Années d'expérience" },
                  { icon: Calendar, value: "500+", label: "Patients accompagnés" },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label} style={{ textAlign: "center" }}>
                    <Icon size={24} style={{ color: "hsl(var(--primary))", margin: "0 auto 8px" }} />
                    <p style={{ fontSize: "24px", fontWeight: "700", color: "hsl(var(--foreground))" }}>{value}</p>
                    <p style={{ fontSize: "12px", color: "hsl(var(--muted-foreground))" }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link to="/contact" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", padding: "14px 24px", borderRadius: "12px", textDecoration: "none", fontWeight: "600", fontSize: "15px" }}>
              Prendre contact
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
