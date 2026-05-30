import usePageTitle from "@/hooks/usePageTitle";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Calendar, Clock, Award, Users, Heart, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import nataliaPortrait from "@/assets/christopher-portrait.jpg";
import { supabase } from "@/integrations/supabase/client";

const ContactPage = () => {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const certifications = ["Psychanalyste certifiée RNCP", "Hypnothérapeute", "Formation en entreprise", "Accompagnement personnalisé"];
  const specialties = [
    { icon: Heart, title: "Gestion du stress", description: "Techniques de relaxation et d'apaisement" },
    { icon: Users, title: "Accompagnement professionnel", description: "Formations et coaching en entreprise" },
    { icon: Clock, title: "Troubles du sommeil", description: "Amélioration de la qualité du sommeil" },
    { icon: Award, title: "Développement personnel", description: "Confiance en soi et estime de soi" },
  ];

  const sectionStyle = { padding: "80px 0" };
  const inputStyle = { width: "100%", padding: "12px 16px", border: "1.5px solid hsl(var(--border))", borderRadius: "10px", fontSize: "14px", background: "hsl(var(--background))", color: "hsl(var(--foreground))", boxSizing: "border-box" as const };
  const labelStyle = { display: "block", fontWeight: "600", marginBottom: "6px", fontSize: "14px", color: "hsl(var(--foreground))" };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setFormStatus("sending");

    const formData = new FormData(form);
    const firstName = formData.get("firstName") as string || "";
    const lastName = formData.get("lastName") as string || "";
    const email = formData.get("email") as string || "";
    const phone = formData.get("phone") as string || "";
    const subject = formData.get("subject") as string || "";
    const message = formData.get("message") as string || "";

    try {
      // Save to Supabase contact_messages table
      const { error: dbError } = await supabase
        .from("contact_messages")
        .insert({
          name: firstName + " " + lastName,
          email,
          subject,
          message,
        });

      if (dbError) {
        console.error("Supabase insert error:", dbError);
      }

      // Also send via Formspree (email notification)
      const res = await fetch("https://formspree.io/f/mykobvjq", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
      });

      if (res.ok) {
        setFormStatus("success");
        form.reset();
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  usePageTitle("Contact & Prise de Rendez-vous - Natalia Kourycheva");
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section style={{ background: "linear-gradient(135deg, hsl(var(--primary)/0.08) 0%, hsl(var(--secondary)/0.15) 100%)", padding: "80px 0 60px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "hsl(var(--primary)/0.1)", borderRadius: "100px", padding: "6px 16px", marginBottom: "24px" }}>
              <MapPin size={14} style={{ color: "hsl(var(--primary))" }} />
              <span style={{ fontSize: "13px", color: "hsl(var(--primary))", fontWeight: "600" }}>Paris (75)</span>
            </div>
            <h1 style={{ fontFamily: "'arise-serif', serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: "400", color: "hsl(var(--foreground))", marginBottom: "20px", lineHeight: "1.1" }}>
              Contact & Prise de rendez-vous
            </h1>
            <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "hsl(var(--foreground))", opacity: 0.7, maxWidth: "500px", margin: "0 auto", lineHeight: "1.7" }}>
              Contactez Natalia Kourycheva pour un accompagnement en psychanalyse et hypnothérapie.
            </p>
          </div>
        </section>

        <section style={{ ...sectionStyle, background: "hsl(var(--background))" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }} className="contact-grid">

              {/* Left — Profile + info */}
              <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "20px", padding: "28px", background: "hsl(var(--secondary)/0.3)", borderRadius: "20px" }}>
                  <img src={nataliaPortrait} alt="Natalia Kourycheva" style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover", border: "3px solid hsl(var(--primary)/0.3)" }} />
                  <div>
                    <h2 style={{ fontSize: "20px", fontFamily: "'arise-serif', serif", fontWeight: "400", marginBottom: "4px" }}>Natalia Kourycheva</h2>
                    <p style={{ fontSize: "14px", color: "hsl(var(--primary))", fontWeight: "500" }}>Psychanalyste & Hypnothérapeute</p>
                  </div>
                </div>

                <Link to="/reservation" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "14px 28px", background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", borderRadius: "99px", textDecoration: "none", fontWeight: "600", fontSize: "15px" }}>
                  <Calendar size={18} />
                  Réserver une séance
                </Link>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[
                    { Icon: Phone, label: "Téléphone", value: "+33 6 75 39 47 16", href: "tel:+33675394716" },
                    { Icon: MapPin, label: "Cabinet", value: "19 rue de Choiseul, 75002 Paris", href: undefined },
                    { Icon: Calendar, label: "Séances disponibles", value: "En présentiel et à distance", href: undefined },
                  ].map(({ Icon, label, value, href }) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 20px", background: "hsl(var(--secondary)/0.2)", borderRadius: "14px" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "hsl(var(--primary)/0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon size={18} style={{ color: "hsl(var(--primary))" }} />
                      </div>
                      <div>
                        <p style={{ fontSize: "12px", opacity: 0.6, marginBottom: "2px" }}>{label}</p>
                        {href ? (
                          <a href={href} style={{ fontSize: "14px", fontWeight: "600", color: "hsl(var(--foreground))", textDecoration: "none" }}>{value}</a>
                        ) : (
                          <p style={{ fontSize: "14px", fontWeight: "600" }}>{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "12px" }}>Certifications</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {certifications.map((c) => (
                      <div key={c} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <CheckCircle size={16} style={{ color: "hsl(var(--primary))", flexShrink: 0 }} />
                        <span style={{ fontSize: "14px" }}>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "12px" }}>Spécialités</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    {specialties.map(({ icon: Icon, title, description }) => (
                      <div key={title} style={{ padding: "14px", background: "hsl(var(--secondary)/0.3)", borderRadius: "12px" }}>
                        <Icon size={18} style={{ color: "hsl(var(--primary))", marginBottom: "6px" }} />
                        <p style={{ fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>{title}</p>
                        <p style={{ fontSize: "12px", opacity: 0.65, lineHeight: "1.4" }}>{description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right — Contact form */}
              <div style={{ padding: "36px", background: "hsl(var(--background))", border: "1.5px solid hsl(var(--border))", borderRadius: "20px", boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}>
                <h2 style={{ fontFamily: "'arise-serif', serif", fontSize: "24px", fontWeight: "400", marginBottom: "8px" }}>Envoyez un message</h2>
                <p style={{ fontSize: "14px", opacity: 0.65, marginBottom: "28px" }}>Je vous répondrai dans les plus brefs délais.</p>

                {formStatus === "success" ? (
                  <div style={{ textAlign: "center", padding: "40px 20px" }}>
                    <CheckCircle size={48} style={{ color: "hsl(var(--primary))", margin: "0 auto 16px" }} />
                    <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>Message envoyé !</h3>
                    <p style={{ opacity: 0.7 }}>Merci pour votre message. Vous recevrez une réponse rapidement.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                      <div>
                        <label htmlFor="firstName" style={labelStyle}>Prénom *</label>
                        <input id="firstName" name="firstName" type="text" required placeholder="Votre prénom" style={inputStyle} />
                      </div>
                      <div>
                        <label htmlFor="lastName" style={labelStyle}>Nom *</label>
                        <input id="lastName" name="lastName" type="text" required placeholder="Votre nom" style={inputStyle} />
                      </div>
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <label htmlFor="email" style={labelStyle}>Email *</label>
                      <input id="email" name="email" type="email" required placeholder="votre@email.com" style={inputStyle} />
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <label htmlFor="phone" style={labelStyle}>Téléphone</label>
                      <input id="phone" name="phone" type="tel" placeholder="06 XX XX XX XX" style={inputStyle} />
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <label htmlFor="subject" style={labelStyle}>Sujet *</label>
                      <select id="subject" name="subject" required style={{ ...inputStyle, cursor: "pointer" }}>
                        <option value="">Choisissez un sujet</option>
                        <option value="Sophrologie">Sophrologie</option>
                        <option value="Hypnose">Hypnose</option>
                        <option value="Entreprise">Entreprise</option>
                        <option value="Renseignements">Renseignements</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: "24px" }}>
                      <label htmlFor="message" style={labelStyle}>Message *</label>
                      <textarea id="message" name="message" required placeholder="Décrivez votre demande ou vos questions..." rows={5} style={{ ...inputStyle, resize: "vertical", lineHeight: "1.5" }} />
                    </div>

                    <p style={{ fontSize: "12px", opacity: 0.6, marginBottom: "16px" }}>
                      En soumettant ce formulaire, vos données sont traitées conformément à notre{" "}
                      <Link to="/politique-confidentialite" style={{ color: "hsl(var(--primary))", textDecoration: "underline" }}>politique de confidentialité</Link>.
                    </p>

                    {formStatus === "error" && (
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 16px", background: "hsl(var(--destructive)/0.1)", borderRadius: "10px", marginBottom: "16px" }}>
                        <AlertCircle size={16} style={{ color: "hsl(var(--destructive))" }} />
                        <span style={{ fontSize: "14px", color: "hsl(var(--destructive))" }}>Une erreur est survenue. Veuillez réessayer.</span>
                      </div>
                    )}

                    <button type="submit" disabled={formStatus === "sending"} style={{ width: "100%", padding: "15px", background: formStatus === "sending" ? "hsl(var(--muted))" : "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", border: "none", borderRadius: "99px", fontSize: "15px", fontWeight: "600", cursor: formStatus === "sending" ? "not-allowed" : "pointer" }}>
                      {formStatus === "sending" ? "Envoi en cours..." : "Envoyer le message"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
