import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/hooks/useSiteContent";
import defaultPortrait from "@/assets/christopher-portrait.jpg";

const Hero = () => {
  const { getContent, getImage } = useSiteContent("hero");
  const portraitImage = getImage("hero_portrait") || defaultPortrait;
  return (
    <section id="accueil" className="min-h-screen bg-gradient-soft relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-accent rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                {getContent("hero_title", "Christopher Shiquer")},{" "}
                <span className="text-primary">
                  {getContent("hero_subtitle", "Sophrologue")}
                </span>
                <br />
                et <span className="text-primary">Hypnothérapeute</span>
              </h1>
              <p className="text-lg text-soft-gray">
                {getContent("hero_location", "")}
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-xl text-foreground font-medium">
                Sophrologie et hypnose
              </p>
              
              <div className="flex items-center space-x-3 text-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{getContent("hero_address", "15 rue XXXXX, 93100 Montreuil")}</span>
              </div>

              <p className="text-lg text-soft-gray leading-relaxed">
                {getContent("hero_intro", "Et si vous décidiez d'agir en vous faisant aider par un spécialiste ? Que vous soyez un particulier ou une entreprise, je vous propose un accompagnement personnalisé en sophrologie ou en hypnose.")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/reservation">
                <Button 
                  size="lg" 
                  className="bg-gradient-warm border-0 text-white hover:opacity-90 shadow-warm"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Prendre rendez-vous
                </Button>
              </Link>
              <Link to="/sophrologie">
               <Button variant="outline" size="lg">
                En savoir plus
                </Button>
              </Link>
            </div>

            {/* Contact Info */}
            <div className="border-l-4 border-primary pl-6 py-4 bg-card/50 rounded-r-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="font-medium text-foreground">
                  {getContent("hero_hours_title", "Horaires")}
                </span>
              </div>
              <div 
                className="text-soft-gray"
                dangerouslySetInnerHTML={{ 
                  __html: getContent("hero_hours", "Mardi et vendredi de 8h à 21h<br />et samedi de 8h à 13h")
                }}
              />
            </div>
          </div>

          {/* Portrait */}
          <div className="relative animate-scale-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-warm rounded-full blur-2xl opacity-20 scale-110"></div>
              <div className="relative bg-card rounded-full p-8 shadow-soft">
                <img
                  src={portraitImage}
                  alt="Christopher Quershi, Sophrologue et Hypnothérapeute"
                  className="w-full h-auto rounded-full"
                />
              </div>
            </div>
            
            {/* LinkedIn Badge */}
            <div className="absolute bottom-8 left-8 bg-primary p-3 rounded-lg shadow-warm">
              <span className="text-white font-bold text-sm">in</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;