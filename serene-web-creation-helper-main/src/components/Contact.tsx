import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Calendar, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const inputStyle = {
  background: "hsl(var(--background))",
  border: "3px solid hsl(var(--foreground))",
  borderRadius: "99px",
  height: "60px",
  padding: "0 24px",
  fontSize: "16px",
  fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
  color: "hsl(var(--foreground))",
  width: "100%",
  boxSizing: "border-box" as const,
  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.08)",
  outline: "none",
};

const labelStyle = {
  display: "block",
  fontSize: "13px",
  fontWeight: "700" as const,
  color: "hsl(var(--foreground))",
  marginBottom: "8px",
  fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
};

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("name", formData.firstName + " " + formData.lastName);
      fd.append("email", formData.email);
      fd.append("phone", formData.phone);
      fd.append("subject", formData.subject);
      fd.append("message", formData.message);
      const res = await fetch("https://formspree.io/f/mykobvjq", {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
      });
      if (!res.ok) throw new Error("err");
      toast({ title: "Message envoyé !", description: "Vous recevrez une réponse rapidement." });
      setFormData({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      toast({ title: "Erreur", description: "Une erreur est survenue.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" style={{ padding: "80px 0", background: "hsl(var(--background))" }}>
      <div className="container mx-auto px-8">
        <div className="text-center animate-fade-in" style={{ marginBottom: "56px" }}>
          <h2 className="arise-serif" style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: "400", color: "hsl(var(--foreground))", marginBottom: "16px" }}>
            Prendre contact
          </h2>
          <p style={{ fontSize: "16px", lineHeight: "1.7", color: "hsl(var(--foreground))", opacity: 0.7, maxWidth: "480px", margin: "0 auto" }}>
            N'hésitez pas à me contacter pour tout renseignement ou question, auxquels je répondrai avec plaisir.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className="arise-card">
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <div style={{ width: "36px", height: "36px", background: "hsl(var(--foreground))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <MapPin style={{ width: "16px", height: "16px", color: "hsl(var(--primary-foreground))" }} />
                </div>
                <h3 className="arise-serif" style={{ fontSize: "18px", fontWeight: "400", color: "hsl(var(--foreground))" }}>Adresse</h3>
              </div>
              <p style={{ fontSize: "14px", lineHeight: "1.7", color: "hsl(var(--foreground))", opacity: 0.7 }}>19 rue de Choiseul<br />75002 Paris</p>
            </div>

            <div className="arise-card">
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <div style={{ width: "36px", height: "36px", background: "hsl(var(--foreground))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Clock style={{ width: "16px", height: "16px", color: "hsl(var(--primary-foreground))" }} />
                </div>
                <h3 className="arise-serif" style={{ fontSize: "18px", fontWeight: "400", color: "hsl(var(--foreground))" }}>Horaires</h3>
              </div>
              <div style={{ fontSize: "14px", lineHeight: "1.8", color: "hsl(var(--foreground))", opacity: 0.7 }}>
                <p>Mardi: 8h - 21h</p><p>Vendredi: 8h - 21h</p><p>Samedi: 8h - 13h</p>
              </div>
            </div>

            <div className="arise-card">
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div style={{ width: "36px", height: "36px", background: "hsl(var(--foreground))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Phone style={{ width: "16px", height: "16px", color: "hsl(var(--primary-foreground))" }} />
                </div>
                <h3 className="arise-serif" style={{ fontSize: "18px", fontWeight: "400", color: "hsl(var(--foreground))" }}>Contact direct</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { href: "tel:+33675394716", icon: Phone, label: "06 75 39 47 16" },
                  { href: "mailto:natalia.kourycheva@gmail.com", icon: Mail, label: "Email" },
                  { href: "#", icon: Linkedin, label: "LinkedIn" },
                ].map(({ href, icon: Icon, label }) => (
                  <a key={label} href={href} target={label === "LinkedIn" ? "_blank" : undefined} rel="noopener noreferrer">
                    <button className="arise-btn-outline" style={{ width: "100%", justifyContent: "flex-start", height: "48px", padding: "0 16px", fontSize: "14px" }}>
                      <Icon style={{ width: "16px", height: "16px" }} />{label}
                    </button>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="arise-card" style={{ padding: "40px" }}>
              <h3 className="arise-serif" style={{ fontSize: "24px", fontWeight: "400", color: "hsl(var(--foreground))", marginBottom: "32px" }}>
                Envoyez-moi un message
              </h3>
              <form method="POST" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" style={labelStyle}>Prénom *</label>
                    <input id="firstName" name="firstName" style={inputStyle} placeholder="Votre prénom" value={formData.firstName} onChange={e => handleInputChange("firstName", e.target.value)} required />
                  </div>
                  <div>
                    <label htmlFor="lastName" style={labelStyle}>Nom *</label>
                    <input id="lastName" name="lastName" style={inputStyle} placeholder="Votre nom" value={formData.lastName} onChange={e => handleInputChange("lastName", e.target.value)} required />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" style={labelStyle}>Email *</label>
                  <input id="email" name="email" type="email" style={inputStyle} placeholder="votre.email@example.com" value={formData.email} onChange={e => handleInputChange("email", e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="phone" style={labelStyle}>Téléphone</label>
                  <input id="phone" name="phone" type="tel" style={inputStyle} placeholder="Votre numéro de téléphone" value={formData.phone} onChange={e => handleInputChange("phone", e.target.value)} />
                </div>
                <div>
                  <label htmlFor="subject" style={labelStyle}>Sujet *</label>
                  <select
                    id="subject" name="subject"
                    value={formData.subject}
                    onChange={e => handleInputChange("subject", e.target.value)}
                    required
                    style={{ ...inputStyle, cursor: "pointer" }}
                  >
                    <option value="">Choisissez un sujet</option>
                    <option value="psychanalyse">Psychanalyse</option>
                    <option value="hypnotherapie">Hypnothérapie</option>
                    <option value="entreprise">Formation en entreprise</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" style={labelStyle}>Message *</label>
                  <textarea id="message" name="message" placeholder="Décrivez votre demande ou vos questions..." rows={6} value={formData.message} onChange={e => handleInputChange("message", e.target.value)} required style={{ ...inputStyle, height: "auto", borderRadius: "25px", padding: "16px 24px", resize: "vertical" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }} className="sm:flex-row">
                  <button type="submit" className="arise-btn-primary" disabled={isSubmitting || !formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message} style={{ opacity: isSubmitting ? 0.7 : 1 }}>
                    {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                  </button>
                  <Link to="/reservation">
                    <button type="button" className="arise-btn-outline">
                      <Calendar style={{ width: "18px", height: "18px" }} />Prendre rendez-vous
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
