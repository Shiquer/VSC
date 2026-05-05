import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";

const Reservation = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-primary mb-4">
                Prendre rendez-vous
              </h1>
              <p className="text-lg text-muted-foreground">
                Réservez votre séance de sophrologie ou d'hypnose en quelques clics
              </p>
            </div>
            <BookingForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reservation;