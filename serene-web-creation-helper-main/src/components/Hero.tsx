import { Calendar, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/hooks/useSiteContent";
import defaultPortrait from "@/assets/christopher-portrait.jpg";

const Hero = () => {
  const { getContent, getImage } = useSiteContent("hero");
  const portraitImage = getImage("hero_portrait") || defaultPortrait;

  return (
    <section id="accueil" style={{ background: "hsl(var(--background))", padding: "80px 0" }}>
      <div className="container mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Content */}
          <div className="space-y-8 animate-fade-in">

            {/* Badge */}
            <span className="arise-badge">Sophrologue certifié</span>

            {/* Title */}
            <div style={{ marginTop: "20px" }}>
              <h1
                className="arise-serif"
                style={{
                  fontSize: "clamp(32px, 4vw, 48px)",
                  fontWeight: "400",
                  lineHeight: "1.2",
                  color: "hsl(var(--foreground))",
                  margin: "0 0 8px",
                }}
              >
                {getContent("hero_title", "Christopher Quershi")},
              </h1>
              <h1
                className="arise-serif"
                style={{
                  fontSize: "clamp(32px, 4vw, 48px)",
                  fontWeight: "400",
                  lineHeight: "1.2",
                  color: "hsl(var(--foreground))",
                  margin: "0 0 8px",
                }}
              >
                {getContent("hero_subtitle", "Sophrologue")}
              </h1>
              <h1
                className="arise-serif"
                style={{
                  fontSize: "clamp(32px, 4vw, 48px)",
                  fontWeight: "400",
                  lineHeight: "1.2",
                  color: "hsl(var(--accent))",
                  margin: "0",
                }}
              >
                & Hypnothérapeute
              </h1>
            </div>

            {/* Location */}
            <div className="flex items-center space-x-2" style={{ color: "hsl(var(--muted-foreground))" }}>
              <MapPin className="w-4 h-4" style={{ color: "hsl(var(--foreground))" }} />
              <span style={{ fontSize: "15px" }}>
                {getContent("hero_address", "93100 Montreuil")}
              </span>
            </div>

            {/* Intro text */}
            <p
              style={{
                fontSize: "16px",
                lineHeight: "1.7",
                color: "hsl(var(--foreground))",
                opacity: 0.75,
                maxWidth: "480px",
              }}
            >
              {getContent("hero_intro", "Et si vous décidiez d'agir en vous faisant aider par un spécialiste ? Accompagnement personnalisé en sophrologie ou en hypnose.")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/reservation">
                <button className="arise-btn-primary">
                  <Calendar className="w-5 h-5" />
                  Prendre rendez-vous
                </button>
              </Link>
              <Link to="/sophrologie">
                <button className="arise-btn-outline">
                  En savoir plus
                </button>
              </Link>
            </div>

            {/* Horaires */}
            <div
              style={{
                borderLeft: "3px solid hsl(var(--foreground))",
                paddingLeft: "20px",
                paddingTop: "16px",
                paddingBottom: "16px",
              }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4" style={{ color: "hsl(var(--foreground))" }} />
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "13px",
                    color: "hsl(var(--foreground))",
                    fontFamily: "'Helvetica Neue', sans-serif",
                  }}
                >
                  {getContent("hero_hours_title", "Horaires")}
                </span>
              </div>
              <div
                style={{
                  fontSize: "14px",
                  lineHeight: "1.7",
                  color: "hsl(var(--foreground))",
                  opacity: 0.7,
                }}
                dangerouslySetInnerHTML={{
                  __html: getContent("hero_hours", "Mardi et vendredi de 8h à 21h<br />et samedi de 8h à 13h"),
                }}
              />
            </div>
          </div>

          {/* Portrait */}
          <div className="relative animate-scale-in flex justify-center">
            <div className="relative" style={{ maxWidth: "420px", width: "100%" }}>
              <div
                style={{
                  background: "hsl(var(--secondary))",
                  borderRadius: "25px",
                  padding: "16px",
                  border: "1px solid hsl(var(--border))",
                }}
              >
                <img
                  src={portraitImage}
                  alt="Christopher Quershi, Sophrologue et Hypnothérapeute"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "16px",
                    display: "block",
                  }}
                />
              </div>

              {/* LinkedIn Badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: "24px",
                  left: "24px",
                  background: "hsl(var(--foreground))",
                  padding: "10px 14px",
                  borderRadius: "12px",
                }}
              >
                <span
                  style={{
                    color: "hsl(var(--primary-foreground))",
                    fontWeight: "700",
                    fontSize: "14px",
                  }}
                >
                  in
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
