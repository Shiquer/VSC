import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import usePageTitle from "@/hooks/usePageTitle";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import { useAuth } from "@/hooks/useAuth";

  const Reservation = () => {
      usePageTitle("Prendre Rendez-vous - Natalia Kourycheva");
      const { user, loading } = useAuth();
      const navigate = useNavigate();

      useEffect(() => {
            if (!loading && !user) {
                    navigate("/auth");
            }
      }, [user, loading, navigate]);

      if (loading) {
            return (
                    <div className="min-h-screen flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  );
      }
    
      if (!user) return null;
    
    return (
    <div className="min-h-screen">
      <Header />
      <main style={{ paddingTop: "80px", paddingBottom: "80px", background: "hsl(var(--background))" }}>
        <div className="container mx-auto px-8">
          <div className="text-center animate-fade-in" style={{ marginBottom: "56px" }}>
            <h1 className="arise-serif" style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: "400", color: "hsl(var(--foreground))", marginBottom: "16px" }}>
              Prendre rendez-vous
            </h1>
            <p style={{ fontSize: "16px", lineHeight: "1.7", color: "hsl(var(--foreground))", opacity: 0.7, maxWidth: "560px", margin: "0 auto" }}>
              Réservez votre séance de sophrologie ou d'hypnose en quelques clics
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <BookingForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reservation;

