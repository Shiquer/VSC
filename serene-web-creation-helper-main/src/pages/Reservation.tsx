import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import therapyOffice from "@/assets/therapy-office.jpg";

const Reservation = () => {
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

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div className="hidden lg:block">
              <div style={{ borderRadius: "25px", overflow: "hidden", position: "sticky", top: "100px" }}>
                <img
                  src={therapyOffice}
                  alt="Cabinet de sophrologie et hypnose"
                  style={{ width: "100%", height: "600px", objectFit: "cover", display: "block" }}
                />
              </div>
            </div>

            {/* Formulaire */}
            <div>
              <BookingForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reservation;
