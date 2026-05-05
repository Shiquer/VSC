import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Linkedin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/hooks/useSiteContent";

const Footer = () => {
  const { getContent } = useSiteContent("footer");
  const { getContent: getHeaderContent } = useSiteContent("header");
  const { getContent: getHeroContent } = useSiteContent("hero");
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-warm rounded-full flex items-center justify-center">
                <span className="text-white font-bold">CQ</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">
                  {getHeaderContent("header_title", "Christopher Quershi")}
                </h3>
                <p className="text-sm opacity-80">
                  {getHeaderContent("header_subtitle", "Sophrologue & Hypnothérapeute")}
                </p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              {getContent("footer_description", "Accompagnement personnalisé en sophrologie et hypnose pour particuliers et entreprises dans le Val-de-Marne.")}
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">
              {getContent("footer_services_title", "Services")}
            </h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/sophrologie" className="hover:opacity-100 transition-opacity">Sophrologie</Link></li>
              <li><Link to="/hypnose" className="hover:opacity-100 transition-opacity">Hypnose</Link></li>
              <li><Link to="/entreprise" className="hover:opacity-100 transition-opacity">Formation entreprise</Link></li>
              <li><Link to="/cours-collectifs" className="hover:opacity-100 transition-opacity">Cours collectifs</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">
              {getContent("footer_contact_title", "Contact")}
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2 opacity-80">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span
                  dangerouslySetInnerHTML={{
                    __html: getHeroContent("hero_address", "15 rue Adrien Damalix<br />94410 Saint-Maurice")
                  }}
                />
              </div>
              <div className="flex items-center space-x-2 opacity-80">
                <Phone className="w-4 h-4" />
                <span>Téléphone sur demande</span>
              </div>
              <div className="flex items-center space-x-2 opacity-80">
                <Mail className="w-4 h-4" />
                <span>{getHeaderContent("header_email", "contact@christopherquershi.fr")}</span>
              </div>
            </div>
          </div>

          {/* Horaires & CTA */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">
              {getContent("footer_hours_title", "Horaires")}
            </h4>
            <div
              className="text-sm opacity-80 space-y-1"
              dangerouslySetInnerHTML={{
                __html: getContent("footer_hours", "Mardi: 8h - 21h<br />Vendredi: 8h - 21h<br />Samedi: 8h - 13h")
              }}
            />
            <Link to="/reservation">
              <Button
                size="sm"
                className="bg-gradient-warm border-0 text-white hover:opacity-90"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Prendre RDV
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm opacity-80">
              {getContent("footer_copyright", "© 2025 Christopher Quershi. Tous droits réservés.")}
            </div>

            <div className="flex items-center space-x-6">
              <a
                href={getContent("footer_linkedin", "#")}
                className="opacity-80 hover:opacity-100 transition-opacity"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <div className="text-sm opacity-60 space-x-4">
                <Link to="/contact" className="hover:opacity-100 transition-opacity">Contact</Link>
                <span>•</span>
                <a href="#" className="hover:opacity-100 transition-opacity">Mentions légales</a>
                <span>•</span>
                <a href="#" className="hover:opacity-100 transition-opacity">Politique de confidentialité</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
