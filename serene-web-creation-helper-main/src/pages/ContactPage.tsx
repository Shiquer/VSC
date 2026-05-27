import usePageTitle from "@/hooks/usePageTitle";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Calendar, Clock, Award, Users, Heart, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import nataliaPortrait from "@/assets/christopher-portrait.jpg";

const ContactPage = () => {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const certifications = ["Psychanalyste certifiée RNCP", "Hypnothérapeute", "Formation en entreprise", "Accompagnement personnalisé"];
  const specialties = [
    { icon: Heart, title: "Gestion du stress", description: "Techniques de relaxation et d'apaisement" },
    { icon: Users, title: "Accompagnement professionnel", description: "Formations et coaching en entreprise" },
    { icon: Clock, title: "Troubles du sommeil", description: "Amélioration de la qualité du sommeil" },
    { icon: Award, title: "Développement personnel", description: "Confiance en soi et estime de soi" },
  ];
h
  const sectionStyle = { padding: "80px 0" };
  const inputStyle = { width: "100%", padding: "12px 16px", border: "1.5px solid hsl(var(--border))", borderRadius: "10px", fontSize: "14px", background: "hsl(var(--background))", color: "hsl(var(--foreground))", boxSizing: "border-box" as const };
  const labelStyle = { display: "block", fontWeight: "600", marginBottom: "6px", fontSize: "14px", color: "hsl(var(--foreground))" };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setFormStatus("sending");
    fetch("https://formspree.io/f/mykobvjq", {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
    })
      .then((res) => {
        if (res.ok) { setFormStatus("success"); form.reset(); }
        else setFormStatus("error");
      })
      .catch(() => setFormStatus("error"));
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
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: "800", marginBottom: "16px", lineHeight: "1.2" }}>
              Contact &amp; Prise de rendez-vous
            </h1>
            <p style={{ fontSize: "1.1rem", color: "hsl(var(--muted-foreground))", maxWidth: "600px", margin: "0 auto" }}>
              Contactez Natalia Kourycheva pour un accompagnement en psychanalyse et hypnothérapie.
            </p>
          </div>
        </section>

        <section style={sectionStyle}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
                  <img src={nataliaPortrait} alt="Natalia Kourycheva" style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover" }} />
                  <div>
                    <h2 style={{ fontSize: "1.4rem", fontWeight: "700", marginBottom: "4px" }}>Natalia Kourycheva</h2>
                    <p style={{ color: "hsl(var(--muted-foreground))", fontSize: "0.95rem" }}>Psychanalyste &amp; Hypnothérapeute</p>
                  </div>
                </div>

                <div style={{ marginBottom: "24px" }}>
                  <Link to="/reservation" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", padding: "12px 24px", borderRadius: "10px", textDecoration: "none", fontWeight: "600", fontSize: "0.95rem" }}>
                    <Calendar size={18} />
                    Réserver une séance
                  </Link>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "hsl(var(--primary)/0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Phone size={18} style={{ color: "hsl(var(--primary))" }} />
                    </div>
                    <div>
                      <p style={{ fontWeight: "600", fontSize: "0.9rem" }}>Téléphone</p>
                      <a href="tel:+33675394716" style={{ color: "hsl(var(--primary))", fontSize: "0.85rem", textDecoration: "none", fontWeight: "500" }}>+33 6 75 39 47 16</a>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "hsl(var(--primary)/0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <MapPin size={18} style={{ color: "hsl(var(--primary))" }} />
                    </div>
                    <div>
                      <p style={{ fontWeight: "600", fontSize: "0.9rem" }}>Cabinet</p>
                      <a href="https://maps.google.com/?q=19+rue+de+Choiseul,+75002+Paris" target="_blank" rel="noopener noreferrer" style={{ color: "hsl(var(--primary))", fontSize: "0.85rem", textDecoration: "none", fontWeight: "500" }}>19 rue de Choiseul, 75002 Paris</a>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "hsl(var(--primary)/0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Calendar size={18} style={{ color: "hsl(var(--primary))" }} />
                    </div>
                    <div>
                      <p style={{ fontWeight: "600", fontSize: "0.9rem" }}>Séances disponibles</p>
                      <p style={{ color: "hsl(var(--muted-foreground))", fontSize: "0.85rem" }}>En présentiel et à distance</p>
                    </div>
                  </div>
                </div>
                <div style={{ marginBottom: "32px" }}>
                  <h3 style={{ fontWeight: "700", marginBottom: "12px" }}>Certifications</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {certifications.map((cert, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <CheckCircle size={16} style={{ color: "hsl(var(--primary))", flexShrink: 0 }} />
                        <span style={{ fontSize: "0.9rem" }}>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 style={{ fontWeight: "700", marginBottom: "16px" }}>Spécialités</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    {specialties.map((s, i) => (
                      <div key={i} style={{ padding: "12px", border: "1px solid hsl(var(--border))", borderRadius: "10px" }}>
                        <s.icon size={20} style={{ color: "hsl(var(--primary))", marginBottom: "6px" }} />
                        <p style={{ fontWeight: "600", fontSize: "0.85rem", marginBottom: "2px" }}>{s.title}</p>
                        <p style={{ color: "hsl(var(--muted-foreground))", fontSize: "0.78rem" }}>{s.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "16px", padding: "32px" }}>
                <h2 style={{ fontSize: "1.4rem", fontWeight: "700", marginBottom: "8px" }}>Envoyez un message</h2>
                <p style={{ color: "hsl(var(--muted-foreground))", marginBottom: "24px", fontSize: "0.9rem" }}>Je vous répondrai dans les plus brefs délais.</p>
                {formStatus === "success" && (
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "hsl(142 76% 36% / 0.1)", border: "1px solid hsl(142 76% 36% / 0.3)", borderRadius: "10px", padding: "14px 16px", marginBottom: "20px" }}>
                    <CheckCircle size={18} style={{ color: "hsl(142 76% 36%)" }} />
                    <span style={{ color: "hsl(142 76% 36%)", fontWeight: "600", fontSize: "0.9rem" }}>Message envoyé avec succès ! Je vous répondrai dans les meilleurs délais.</span>
                  </div>
                )}
                {formStatus === "error" && (
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "hsl(0 84% 60% / 0.1)", border: "1px solid hsl(0 84% 60% / 0.3)", borderRadius: "10px", padding: "14px 16px", marginBottom: "20px" }}>
                    <AlertCircle size={18} style={{ color: "hsl(0 84% 60%)" }} />
                    <span style={{ color: "hsl(0 84% 60%)", fontWeight: "600", fontSize: "0.9rem" }}>Une erreur est survenue. Veuillez réessayer.</span>
                  </div>
                )}
                <form method="POST" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label style={labelStyle}>Prénom *</label>
                      <input name="firstName" required style={inputStyle} placeholder="Votre prénom" />
                    </div>
                    <div>
                      <label style={labelStyle}>Nom *</label>
                      <input name="lastName" required style={inputStyle} placeholder="Votre nom" />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input name="email" type="email" required style={inputStyle} placeholder="votre@email.com" />
                  </div>
                  <div>
                    <label style={labelStyle}>Téléphone</label>
                    <input name="phone" type="tel" style={inputStyle} placeholder="06 XX XX XX XX" />
                  </div>
                  <div>
                    <label style={labelStyle}>Sujet *</label>
                    <select name="subject" required style={inputStyle}>
                      <option value="">Choisissez un sujet</option>
                      <option value="psychanalyse">Psychanalyse</option>
                      <option value="hypnotherapie">Hypnothérapie</option>
                      <option value="entreprise">Formation en entreprise</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Message *</label>
                    <textarea name="message" required rows={5} style={{ ...inputStyle, resize: "vertical" }} placeholder="Décrivez votre demande..." />
                  </div>
                  <p style={{ fontSize: "12px", color: "hsl(var(--muted-foreground))", marginTop: "-8px" }}>* Champs obligatoires</p>
                  <button
                    type="submit"
                    disabled={formStatus === "sending"}
                    style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", border: "none", borderRadius: "10px", padding: "14px 24px", fontSize: "0.95rem", fontWeight: "600", cursor: formStatus === "sending" ? "not-allowed" : "pointer", opacity: formStatus === "sending" ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                  >
                    <Mail size={18} />
                    {formStatus === "sending" ? "Envoi en cours..." : "Envoyer le message"}
                  </button>
                </form>
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
