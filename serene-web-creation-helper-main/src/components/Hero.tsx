import { MapPin } from "lucide-react";
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
                {getContent("hero_title", "Natalia Kourycheva")},
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
              }}
            >
              {getContent("hero_intro", "Bienvenue sur mon site.")}
            </p>

          </div>

          {/* Portrait */}
          <div className="flex justify-center">
            <img
              src={portraitImage}
              alt="Portrait"
              className="rounded-2xl max-h-[500px] object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
