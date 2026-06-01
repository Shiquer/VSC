import { MapPin, Phone, Calendar } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import defaultPortrait from "@/assets/christopher-portrait.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  const { getContent, getImage } = useSiteContent("hero");
  const portraitImage = getImage("hero_portrait") || defaultPortrait;

  return (
    <section id="accueil" style={{ background: "hsl(var(--background))", padding: "80px 0", overflow: "hidden" }}>
      <div className="container mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Content */}
          <div className="space-y-8 animate-fade-in">

            {/* Badge */}
            <span className="arise-badge">Psychanalyste &amp; Hypnothérapeute certifiée</span>

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
                {getContent("hero_title", "Natalia Kourycheva")}
              </h1>
            </div>

            {/* Subtitle */}
            <p style={{ fontSize: "1.1rem", color: "hsl(var(--accent))", fontWeight: "600", marginTop: "4px", marginBottom: "0" }}>
              {getContent("hero_subtitle", "Psychanalyste & Hypnothérapeute")}
            </p>

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
                fontWeight: "400",
                color: "hsl(var(--foreground))",
                opacity: 0.75,
              }}
            >
              {getContent("hero_intro", "Bienvenue sur mon site.")}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link to="/reservation" className="w-full sm:w-auto">
                <button
                  style={{
                    background: "hsl(var(--foreground))",
                    color: "hsl(var(--primary-foreground))",
                    border: "3px solid hsl(var(--foreground))",
                    borderRadius: "30px",
                    height: "52px",
                    padding: "0 20px",
                    fontSize: "15px",
                    fontWeight: "700",
                    fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                    width: "100%",
                    justifyContent: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Calendar className="w-5 h-5" style={{ flexShrink: 0 }} />
                  Prendre rendez-vous
                </button>
              </Link>
              <a href="#specialites" className="w-full sm:w-auto">
                <button
                  style={{
                    background: "transparent",
                    color: "hsl(var(--foreground))",
                    border: "3px solid hsl(var(--foreground))",
                    borderRadius: "30px",
                    height: "52px",
                    padding: "0 20px",
                    fontSize: "15px",
                    fontWeight: "700",
                    fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                    width: "100%",
                    justifyContent: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  Découvrir mes services
                </button>
              </a>
            </div>

          </div>

          {/* Portrait */}
          <div className="flex justify-center lg:justify-end overflow-hidden items-center">
            <img
              src={portraitImage}
              alt="Portrait"
              className="rounded-2xl w-full max-h-80 sm:max-h-[420px] lg:max-h-[500px] object-cover object-center shadow-xl"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
