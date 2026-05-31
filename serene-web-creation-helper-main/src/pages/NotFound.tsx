import usePageTitle from "@/hooks/usePageTitle";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Calendar, BookOpen, Phone, Headphones } from "lucide-react";

const NotFound = () => {
  usePageTitle("Page introuvable - Natalia Kourycheva");
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location]);

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-cream-bg">
        <div className="text-center space-y-8 px-4 max-w-xl mx-auto">
          <div>
            <h1 className="text-8xl font-bold text-primary">404</h1>
            <h2 className="text-2xl font-semibold text-foreground mt-2">Page introuvable</h2>
            <p className="text-soft-gray max-w-md mx-auto mt-3">
              Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
            </p>
          </div>

          <Link to="/">
            <Button className="bg-gradient-warm border-0 text-white hover:opacity-90">
              <Home className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Button>
          </Link>

          <div className="pt-4 border-t border-border">
            <p className="text-sm text-soft-gray mb-4">Ou accédez directement à :</p>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/reservation" className="flex items-center gap-2 p-3 rounded-xl border border-border hover:border-primary hover:text-primary transition-colors text-sm text-foreground">
                <Calendar className="w-4 h-4 text-primary shrink-0" />
                Prendre rendez-vous
              </Link>
              <Link to="/articles" className="flex items-center gap-2 p-3 rounded-xl border border-border hover:border-primary hover:text-primary transition-colors text-sm text-foreground">
                <BookOpen className="w-4 h-4 text-primary shrink-0" />
                Lire les articles
              </Link>
              <Link to="/contact" className="flex items-center gap-2 p-3 rounded-xl border border-border hover:border-primary hover:text-primary transition-colors text-sm text-foreground">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                Contact
              </Link>
              <Link to="/mediatheque" className="flex items-center gap-2 p-3 rounded-xl border border-border hover:border-primary hover:text-primary transition-colors text-sm text-foreground">
                <Headphones className="w-4 h-4 text-primary shrink-0" />
                Médiathèque
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
