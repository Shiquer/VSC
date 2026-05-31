import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Calendar, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
  fontWeight: "700",
  marginBottom: "8px",
};

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Save to Supabase contact_messages table
      const { error: dbError } = await supabase
        .from("contact_messages")
        .insert({
          name: formData.firstName + " " + formData.lastName,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        });

      if (dbError) {
        console.error("Supabase insert error:", dbError);
      }

      // Also send via Formspree (email notification)
      const form = new FormData();
      form.append("name", formData.firstName + " " + formData.lastName);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("subject", formData.subject);
      form.append("message", formData.message);

      const res = await fetch("https://formspree.io/f/mykobvjq", {
        method: "POST",
        body: form,
        headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
      });

      if (res.ok) {
        toast({ title: "Message envoyé !", description: "Vous recevrez une réponse rapidement." });
        setFormData({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" });
      } else {
        toast({ title: "Erreur", description: "Une erreur est survenue.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Erreur", description: "Une erreur est survenue.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactLinks = [
    { icon: Phone, label: "06 75 39 47 16", href: "tel:+33675394716" },
    { icon: Mail, label: "Email", href: "mailto:natalia.kourycheva@gmail.com" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
  ];

  return (
    <section id="contact" style={{ padding: "80px 0" }}>
      <div className="container mx-auto px-8">
        <div className="text-center animate-fade-in" style={{ marginBottom: "56px" }}>
          <h2 style={{ fontFamily: "'arise-serif', serif", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: "400", color: "hsl(var(--foreground))", marginBottom: "16px" }}>
            Prendre contact
          </h2>
          <p style={{ lineHeight: "1.7", opacity: 0.7, maxWidth: "480px", margin: "0 auto", fontSize: "16px" }}>
            N'hésitez pas à me contacter pour tout renseignement ou question, auxquels je répondrai avec plaisir.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(260px, 1fr) 2fr", gap: "48px", alignItems: "start" }} className="contact-main-grid">
          {/* Left - Contact info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className="arise-card" style={{ alignItems: "center", fontSize: "10px", letterSpacing: "0.12em", fontWeight: "700", color: "hsl(var(--primary))", marginBottom: "12px", textTransform: "uppercase" }}>
              Contact direct
            </div>
            {contactLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href !== "#" ? undefined : "_blank"}
                rel={href !== "#" ? undefined : "noopener noreferrer"}
                className="arise-btn-outline"
                style={{ justifyContent: "flex-start", height: "48px", padding: "0 16px", fontSize: "14px" }}
              >
                <Icon size={16} />
                {label}
              </a>
            ))}
            <Link to="/reservation" className="button" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "0 16px", height: "48px", background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", borderRadius: "99px", textDecoration: "none", fontWeight: "600", fontSize: "14px" }}>
              <Calendar size={16} />
              Réserver une séance
            </Link>
          </div>

          {/* Right - Contact form */}
          <div style={{ padding: "40px", background: "hsl(var(--background))", border: "1.5px solid hsl(var(--border))", borderRadius: "20px" }}>
            <h3 style={{ fontFamily: "'arise-serif', serif", fontSize: "22px", fontWeight: "400", marginBottom: "24px" }}>Envoyez-moi un message</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label htmlFor="contact-firstName" style={labelStyle}>Prénom *</label>
                  <input id="contact-firstName" name="firstName" type="text" required placeholder="Votre prénom" value={formData.firstName} onChange={(e) => handleInputChange("firstName", e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label htmlFor="contact-lastName" style={labelStyle}>Nom *</label>
                  <input id="contact-lastName" name="lastName" type="text" required placeholder="Votre nom" value={formData.lastName} onChange={(e) => handleInputChange("lastName", e.target.value)} style={inputStyle} />
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label htmlFor="contact-email" style={labelStyle}>Email *</label>
                <input id="contact-email" name="email" type="email" required placeholder="votre@email.com" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} style={inputStyle} />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label htmlFor="contact-phone" style={labelStyle}>Téléphone</label>
                <input id="contact-phone" name="phone" type="tel" placeholder="06 XX XX XX XX" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} style={inputStyle} />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label htmlFor="contact-subject" style={labelStyle}>Sujet *</label>
                <select id="contact-subject" name="subject" required value={formData.subject} onChange={(e) => handleInputChange("subject", e.target.value)} style={{ ...inputStyle, borderRadius: "16px", height: "60px", cursor: "pointer" }}>
                  <option value="">Choisissez un sujet</option>
                  <option value="Sophrologie">Sophrologie</option>
                  <option value="Hypnose">Hypnose</option>
                  <option value="Entreprise">Entreprise</option>
                  <option value="Renseignements">Renseignements</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label htmlFor="contact-message" style={labelStyle}>Message *</label>
                <textarea id="contact-message" name="message" required placeholder="Décrivez votre demande ou vos questions..." rows={5} value={formData.message} onChange={(e) => handleInputChange("message", e.target.value)} style={{ ...inputStyle, height: "auto", borderRadius: "16px", padding: "16px 24px", resize: "vertical", lineHeight: "1.5", color: "hsl(var(--muted-foreground))" }} />
              </div>

              <p style={{ fontSize: "12px", opacity: 0.6, marginBottom: "16px" }}>
                En soumettant ce formulaire, vos données sont traitées conformément à notre{" "}
                <Link to="/politique-confidentialite" style={{ color: "hsl(var(--primary))", textDecoration: "underline" }}>politique de confidentialité</Link>.
                <br />* Champs obligatoires
              </p>

              <button type="submit" className="arise-btn-primary" style={{ width: "100%" }} disabled={isSubmitting}>
                {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
