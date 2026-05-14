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
            {getContent("about_title", "À propos de Natalia Kourycheva")}
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
