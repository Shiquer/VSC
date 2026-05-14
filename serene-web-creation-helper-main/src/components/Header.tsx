import { Button } from "@/components/ui/button";
import { Phone, Calendar, LogOut, User, ChevronDown } from "lucide-react";
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
                {getContent("header_title", "Christopher Quershi")}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "hsl(var(--accent))",
                  lineHeight: "1.2",
                }}
              >
                {getContent("header_subtitle", "Sophrologue & Hypnothérapeute")}
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center">
            <Link
              to="/"
              className="text-foreground hover:text-muted-foreground transition-colors"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "16px",
                padding: "0 15px",
                lineHeight: "69px",
              }}
            >
              Accueil
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger
                className="flex items-center text-foreground hover:text-muted-foreground transition-colors outline-none"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "16px",
                  padding: "0 15px",
                  lineHeight: "69px",
                }}
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

            <Link
              to="/entreprise"
              className="text-foreground hover:text-muted-foreground transition-colors"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "16px", padding: "0 15px" }}
            >
              Entreprise
            </Link>
            <Link
              to="/mediatheque"
              className="text-foreground hover:text-muted-foreground transition-colors"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "16px", padding: "0 15px" }}
            >
              Médiathèque
            </Link>
            <Link
              to="/reservation"
              className="text-foreground hover:text-muted-foreground transition-colors"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "16px", padding: "0 15px" }}
            >
              Réservation
            </Link>h
            <Link
              to="/contact"
              className="text-foreground hover:text-muted-foreground transition-colors"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "16px", padding: "0 15px" }}
            >
              Contact
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-3">
            <a href={`tel:${getContent("header_phone", "+33123456789")}`} className="hidden sm:flex">
              <button
                style={{
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
                }}
              >
                <Phone className="w-4 h-4" />
                Appeler
              </button>
            </a>

            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin">
                    <button
                      style={{
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
                      }}
                    >
                      <User className="w-4 h-4" />
                      Admin
                    </button>
                  </Link>
                )}
                {isAdmin && (
                <button
                  onClick={signOut}
                  style={{
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
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </button>
                )}
                <Link to="/reservation">
                  <button
                    style={{
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
                    }}
                  >
                    <Calendar className="w-4 h-4" />
                    Rendez-vous
                  </button>
                </Link>
              </>
            ) : (
              <Link to="/auth">
                <button
                  style={{
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
                  }}
                >
                  <User className="w-4 h-4" />
                  Connexion
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
