import { Button } from "@/components/ui/button";
import { Phone, Calendar, LogOut, User, ChevronDown, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { useSiteContent } from "@/hooks/useSiteContent";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinkStyle = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontSize: "16px",
  padding: "0 15px",
  lineHeight: "69px",
};

const ctaButtonStyle = {
  background: "transparent",
  color: "hsl(var(--foreground))",
  border: "3px solid hsl(var(--foreground))",
  borderRadius: "30px",
  height: "48px",
  padding: "0 20px",
  fontSize: "13px",
  fontWeight: "700",
  fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
  transition: "background 0.2s, opacity 0.2s",
};

const ctaPrimaryButtonStyle = {
  background: "hsl(var(--foreground))",
  color: "hsl(var(--primary-foreground))",
  border: "3px solid hsl(var(--foreground))",
  borderRadius: "30px",
  height: "48px",
  padding: "0 20px",
  fontSize: "13px",
  fontWeight: "700",
  fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
};

const Header = () => {
  const { user, signOut } = useAuth();
  const isAdmin = useAdminCheck();
  const { getContent } = useSiteContent("header");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  };

  const mobileLinkStyle = {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "16px",
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between" style={{ height: "72px" }}>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: "44px",
                height: "44px",
                background: "hsl(var(--foreground))",
              }}
            >
              <span
                className="font-bold"
                style={{
                  color: "hsl(var(--primary-foreground))",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "16px",
                }}
              >
                NK
              </span>
            </div>
            <div>
              <p
                className="font-bold text-foreground"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "16px",
                  lineHeight: "1.2",
                }}
              >
                {getContent("header_title", "Natalia Kourycheva")}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "hsl(var(--accent))",
                  lineHeight: "1.2",
                }}
              >
                {getContent("header_subtitle", "Psychanalyste & Hypnothérapeute")}
              </p>
            </div>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center">
            <Link
              to="/"
              className={isActive("/") ? "text-foreground font-semibold underline underline-offset-4" : "text-foreground hover:text-muted-foreground transition-colors"}
              style={navLinkStyle}
            >
              Accueil
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger
                className="flex items-center text-foreground hover:text-muted-foreground transition-colors outline-none"
                style={navLinkStyle}
              >
                Services
                <ChevronDown className="w-4 h-4 ml-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-2xl border border-border shadow-soft">
                <DropdownMenuItem asChild>
                  <Link to="/sophrologie" className="w-full" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Sophrologie
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/hypnose" className="w-full" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Hypnose
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/cours-collectifs" className="w-full" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Cours collectifs
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/entreprise" className={isActive("/entreprise") ? "text-foreground font-semibold underline underline-offset-4" : "text-foreground hover:text-muted-foreground transition-colors"} style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "16px", padding: "0 15px" }}>
              Entreprise
            </Link>
            <Link to="/mediatheque" className={isActive("/mediatheque") ? "text-foreground font-semibold underline underline-offset-4" : "text-foreground hover:text-muted-foreground transition-colors"} style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "16px", padding: "0 15px" }}>
              Médiathèque
            </Link>
            <Link to="/reservation" className={isActive("/reservation") ? "text-foreground font-semibold underline underline-offset-4" : "text-foreground hover:text-muted-foreground transition-colors"} style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "16px", padding: "0 15px" }}>
              Réservation
            </Link>
            <Link to="/contact" className={isActive("/contact") ? "text-foreground font-semibold underline underline-offset-4" : "text-foreground hover:text-muted-foreground transition-colors"} style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "16px", padding: "0 15px" }}>
              Contact
            </Link>
          </nav>

          {/* CTA Buttons desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <a href={`tel:${getContent("header_phone", "+33123456789")}`}>
              <button style={ctaButtonStyle}>
                <Phone className="w-4 h-4" />
                Appeler
              </button>
            </a>
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin">
                    <button style={ctaButtonStyle}>
                      <User className="w-4 h-4" />
                      Admin
                    </button>
                  </Link>
                )}
                {isAdmin && (
                  <button onClick={() => signOut()} style={ctaButtonStyle}>
                    <LogOut className="w-4 h-4" />
                    Déconnexion
                  </button>
                )}
                <Link to="/reservation">
                  <button style={ctaPrimaryButtonStyle}>
                    <Calendar className="w-4 h-4" />
                    Rendez-vous
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <button style={ctaPrimaryButtonStyle}>
                    <User className="w-4 h-4" />
                    Connexion
                  </button>
                </Link>
                <Link to="/reservation">
                  <button style={ctaPrimaryButtonStyle}>
                    <Calendar className="w-4 h-4" />
                    Rendez-vous
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Bouton hamburger mobile uniquement */}
          <button
            className="md:hidden p-2 rounded-md text-foreground hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

        </div>
      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-8 py-4 flex flex-col gap-1">

            <Link to="/" className="py-3 px-2 text-foreground hover:text-muted-foreground hover:bg-muted rounded-md transition-colors" style={mobileLinkStyle} onClick={closeMobileMenu}>
              Accueil
            </Link>

            <div>
              <button
                className="w-full flex items-center justify-between py-3 px-2 text-foreground hover:text-muted-foreground hover:bg-muted rounded-md transition-colors"
                style={mobileLinkStyle}
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                aria-expanded={mobileServicesOpen}
              >
                Services
                <ChevronDown className="h-4 w-4 transition-transform" style={{ transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
              </button>
              {mobileServicesOpen && (
                <div className="pl-4 flex flex-col gap-1 mt-1">
                  <Link to="/sophrologie" className="py-2 px-2 text-foreground hover:text-muted-foreground hover:bg-muted rounded-md transition-colors" style={mobileLinkStyle} onClick={closeMobileMenu}>Sophrologie</Link>
                  <Link to="/hypnose" className="py-2 px-2 text-foreground hover:text-muted-foreground hover:bg-muted rounded-md transition-colors" style={mobileLinkStyle} onClick={closeMobileMenu}>Hypnose</Link>
                  <Link to="/cours-collectifs" className="py-2 px-2 text-foreground hover:text-muted-foreground hover:bg-muted rounded-md transition-colors" style={mobileLinkStyle} onClick={closeMobileMenu}>Cours collectifs</Link>
                </div>
              )}
            </div>

            <Link to="/entreprise" className="py-3 px-2 text-foreground hover:text-muted-foreground hover:bg-muted rounded-md transition-colors" style={mobileLinkStyle} onClick={closeMobileMenu}>Entreprise</Link>
            <Link to="/mediatheque" className="py-3 px-2 text-foreground hover:text-muted-foreground hover:bg-muted rounded-md transition-colors" style={mobileLinkStyle} onClick={closeMobileMenu}>Médiathèque</Link>
            <Link to="/reservation" className="py-3 px-2 text-foreground hover:text-muted-foreground hover:bg-muted rounded-md transition-colors" style={mobileLinkStyle} onClick={closeMobileMenu}>Réservation</Link>
            <Link to="/contact" className="py-3 px-2 text-foreground hover:text-muted-foreground hover:bg-muted rounded-md transition-colors" style={mobileLinkStyle} onClick={closeMobileMenu}>Contact</Link>

            <div className="flex flex-col gap-3 pt-4 mt-2 border-t border-border">
              <a href={`tel:${getContent("header_phone", "+33123456789")}`} onClick={closeMobileMenu}>
                <button style={{ ...ctaButtonStyle, width: "100%", justifyContent: "center" }}>
                  <Phone className="w-4 h-4" />
                  Appeler
                </button>
              </a>
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin" onClick={closeMobileMenu}>
                      <button style={{ ...ctaButtonStyle, width: "100%", justifyContent: "center" }}>
                        <User className="w-4 h-4" />
                        Admin
                      </button>
                    </Link>
                  )}
                  <Link to="/reservation" onClick={closeMobileMenu}>
                    <button style={{ ...ctaPrimaryButtonStyle, width: "100%", justifyContent: "center" }}>
                      <Calendar className="w-4 h-4" />
                      Rendez-vous
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/auth" onClick={closeMobileMenu}>
                    <button style={{ ...ctaButtonStyle, width: "100%", justifyContent: "center" }}>
                      <User className="w-4 h-4" />
                      Connexion
                    </button>
                  </Link>
                  <Link to="/reservation" onClick={closeMobileMenu}>
                    <button style={{ ...ctaPrimaryButtonStyle, width: "100%", justifyContent: "center" }}>
                      <Calendar className="w-4 h-4" />
                      Rendez-vous
                    </button>
                  </Link>
                </>
              )}
            </div>

          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
