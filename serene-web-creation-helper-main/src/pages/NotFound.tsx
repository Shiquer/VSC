import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-bg">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold text-foreground">Page introuvable</h2>
        <p className="text-soft-gray max-w-md mx-auto">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link to="/">
          <Button className="bg-gradient-warm border-0 text-white hover:opacity-90">
            <Home className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
