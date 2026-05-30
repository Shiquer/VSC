import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import usePageTitle from "@/hooks/usePageTitle";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  author: string;
  content: string;
  rating: number;
  role?: string;
}

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (supabase as any)
      .from("testimonials")
      .select("id, author, content, rating, role")
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .limit(6)
      .then(({ data }: { data: Testimonial[] | null }) => {
        if (data && data.length > 0) setTestimonials(data);
        setLoading(false);
      });
  }, []);

  if (loading || testimonials.length === 0) return null;

  return (
    <section style={{ padding: "80px 0", background: "hsl(var(--secondary)/0.3)" }}>
      <div className="container mx-auto px-8">
        <div className="text-center animate-fade-in" style={{ marginBottom: "48px" }}>
          <h2 style={{ fontFamily: "'arise-serif', serif", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: "400", color: "hsl(var(--foreground))", marginBottom: "14px" }}>
            Témoignages
          </h2>
          <p style={{ fontSize: "16px", opacity: 0.7, maxWidth: "420px", margin: "0 auto", lineHeight: "1.7" }}>
            Ce que disent mes patients et clients
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
          {testimonials.map((t) => (
            <div key={t.id} style={{ background: "hsl(var(--background))", borderRadius: "16px", padding: "28px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", gap: "14px" }}>
              <Quote size={24} style={{ color: "hsl(var(--primary))", opacity: 0.5 }} />
              <p style={{ fontSize: "15px", lineHeight: "1.7", flex: 1, color: "hsl(var(--foreground))", opacity: 0.85 }}>{t.content}</p>
              <div>
                <div style={{ display: "flex", gap: "4px", marginBottom: "8px" }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} style={{ fill: i < t.rating ? "hsl(var(--primary))" : "transparent", color: "hsl(var(--primary))" }} />
                  ))}
                </div>
                <p style={{ fontWeight: "700", fontSize: "14px" }}>{t.author}</p>
                {t.role && <p style={{ fontSize: "12px", opacity: 0.6, marginTop: "2px" }}>{t.role}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  usePageTitle("Natalia Kourycheva - Psychanalyste & Hypnothérapeute à Paris");
  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content" aria-label="Contenu principal">
        <Hero />
        <Services />
        <About />
        <TestimonialsSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
