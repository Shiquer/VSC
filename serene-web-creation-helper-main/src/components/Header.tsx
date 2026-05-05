import { Button } from "@/components/ui/button";
import { Phone, Mail, Calendar, LogOut, User, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { useSiteContent } from "@/hooks/useSiteContent";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, signOut } = useAuth();
  const isAdmin = useAdminCheck();
  const { getContent } = useSiteContent("header");

  return (
    <header className="bg-card/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 bg-gradient-warm rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">CQ</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {getContent("header_title", "Christopher Quershi")}
              </h1>
              <p className="text-sm text-soft-gray">
                {getContent("header_subtitle", "Sophrologue & Hypnothérapeute")}
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Accueil
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-foreground hover:text-primary transition-colors">
                Services
                <ChevronDown className="w-4 h-4 ml-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="/sophrologie" className="w-full">
                    Sophrologie
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/hypnose" className="w-full">
                    Hypnose
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/cours-collectifs" className="w-full">
                    Cours collectifs
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/entreprise" className="text-foreground hover:text-primary transition-colors">
              Entreprise
            </Link>
            <Link to="/mediatheque" className="text-foreground hover:text-primary transition-colors">
              Médiathèque
            </Link>
            <Link to="/reservation" className="text-foreground hover:text-primary transition-colors">
              Réservation
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-3">
            <a href={`tel:${getContent("header_phone", "+33123456789")}`}>
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Phone className="w-4 h-4 mr-2" />
                Appeler
              </Button>
            </a>
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm" className="hidden sm:flex">
                      <User className="w-4 h-4 mr-2" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={signOut}
                  className="hidden sm:flex"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </Button>
                <Link to="/reservation">
                  <Button size="sm" className="bg-gradient-warm border-0 text-white hover:opacity-90">
                    <Calendar className="w-4 h-4 mr-2" />
                    Rendez-vous
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/auth">
                <Button size="sm" className="bg-gradient-warm border-0 text-white hover:opacity-90">
                  <User className="w-4 h-4 mr-2" />
                  Connexion
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;