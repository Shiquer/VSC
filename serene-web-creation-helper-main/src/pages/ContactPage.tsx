import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Calendar, Clock, Award, Users, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import christopherPortrait from "@/assets/christopher-portrait.jpg";

const ContactPage = () => {
  const certifications = ["Sophrologue certifié RNCP", "Hypnothérapeute", "Formation en entreprise", "Accompagnement personnalisé"];
  const specialties = [
    { icon: Heart, title: "Gestion du stress", description: "Techniques de relaxation et d'apaisement" },
    { icon: Users, title: "Accompagnement professionnel", description: "Formations et coaching en entreprise" },
    { icon: Clock, title: "Troubles du sommeil", description: "Amélioration de la qualité du sommeil" },
    { icon: Award, title: "Développement personnel", description: "Confiance en soi et estime de soi" },
  ];

  const sectionStyle = { padding: "80px 0" };

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--background))" }}>
      <Header />
      <main>

        {/* Hero */}
        <section style={{ ...sectionStyle, background: "hsl(var(--secondary))" }}>
          <div className="container mx-auto px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="arise-badge" style={{ marginBottom: "20px", display: "inline-block" }}>Sophrologue certifié</span>
                <h1 className="arise-serif" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: "400", color: "hsl(var(--foreground))", marginBottom: "12px", marginTop: "16px" }}>Christopher Quershi</h1>
                <p style={{ fontSize: "18px", color: "hsl(var(--accent))", marginBottom: "20px", fontFamily: "'Playfair Display', serif" }}>Sophrologue & Hypnothérapeute certifié</p>
                <p style={{ fontSize: "16px", lineHeight: "1.7", color: "hsl(var(--foreground))", opacity: 0.75, marginBottom: "32px" }}>
                  Passionné par l'accompagnement humain, je vous propose un suivi personnalisé en sophrologie et hypnose. Mon approche bienveillante vous permettra de retrouver équilibre, sérénité et confiance en vous.
                </p>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  <Link to="/reservation"><button className="arise-btn-primary"><Calendar style={{ width: "18px", height: "18px" }} />Prendre rendez-vous</button></Link>
                  <Link to="/contact"><button className="arise-btn-outline"><Phone style={{ width: "18px", height: "18px" }} />Me contacter</button></Link>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img src={christopherPortrait} alt="Christopher Quershi" style={{ borderRadius: "25px", maxWidth: "420px", width: "100%", border: "1px solid hsl(var(--border))" }} />
              </div>
            </div>
          </div>
        </section>

        {/* Parcours */}
        <section style={sectionStyle}>
          <div className="container mx-auto px-8">
            <h2 className="arise-serif" style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: "400", color: "hsl(var(--foreground))", textAlign: "center", marginBottom: "48px" }}>Mon parcours & mon approche</h2>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
              <div className="arise-card" style={{ marginBottom: "32px", padding: "36px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                  <div style={{ width: "44px", height: "44px", background: "hsl(var(--foreground))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Award style={{ width: "20px", height: "20px", color: "hsl(var(--primary-foreground))" }} />
                  </div>
                  <h3 className="arise-serif" style={{ fontSize: "22px", fontWeight: "400", color: "hsl(var(--foreground))" }}>Formation & Certifications</h3>
                </div>
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "hsl(var(--foreground))", opacity: 0.75, marginBottom: "20px" }}>
                  Diplômé en sophrologie et formé aux techniques d'hypnose thérapeutique, je me suis spécialisé dans l'accompagnement des particuliers et des entreprises.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {certifications.map((cert) => (
                    <span key={cert} className="arise-badge">{cert}</span>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {specialties.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.title} className="arise-card" style={{ transition: "transform 0.3s" }}
                      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"}
                      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                        <div style={{ width: "40px", height: "40px", background: "hsl(var(--foreground))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Icon style={{ width: "18px", height: "18px", color: "hsl(var(--primary-foreground))" }} />
                        </div>
                        <h4 className="arise-serif" style={{ fontSize: "18px", fontWeight: "400", color: "hsl(var(--foreground))" }}>{s.title}</h4>
                      </div>
                      <p style={{ fontSize: "14px", color: "hsl(var(--foreground))", opacity: 0.7 }}>{s.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Infos pratiques */}
        <section style={{ ...sectionStyle, background: "hsl(var(--secondary))" }}>
          <div className="container mx-auto px-8">
            <h2 className="arise-serif" style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: "400", color: "hsl(var(--foreground))", textAlign: "center", marginBottom: "48px" }}>Informations pratiques</h2>
            <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="arise-card">
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                    <div style={{ width: "40px", height: "40px", background: "hsl(var(--foreground))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <MapPin style={{ width: "18px", height: "18px", color: "hsl(var(--primary-foreground))" }} />
                    </div>
                    <h3 className="arise-serif" style={{ fontSize: "18px", fontWeight: "400", color: "hsl(var(--foreground))" }}>Adresse du cabinet</h3>
                  </div>
                  <p style={{ fontSize: "15px", color: "hsl(var(--foreground))", lineHeight: "1.6", marginBottom: "8px" }}>93, Montreuil rue test<br />93100 Montreuil</p>
                  <p style={{ fontSize: "13px", color: "hsl(var(--foreground))", opacity: 0.6 }}>Accessible en transport en commun, parking à proximité.</p>
                </div>

                <div className="arise-card">
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                    <div style={{ width: "40px", height: "40px", background: "hsl(var(--foreground))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Clock style={{ width: "18px", height: "18px", color: "hsl(var(--primary-foreground))" }} />
                    </div>
                    <h3 className="arise-serif" style={{ fontSize: "18px", fontWeight: "400", color: "hsl(var(--foreground))" }}>Horaires d'ouverture</h3>
                  </div>
                  {[["Mardi", "8h - 21h"], ["Vendredi", "8h - 21h"], ["Samedi", "8h - 13h"]].map(([day, hours]) => (
                    <div key={day} style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "hsl(var(--foreground))", marginBottom: "8px" }}>
                      <span style={{ fontWeight: "600" }}>{day}</span>
                      <span style={{ opacity: 0.7 }}>{hours}</span>
                    </div>
                  ))}
                  <p style={{ fontSize: "12px", color: "hsl(var(--foreground))", opacity: 0.5, marginTop: "12px" }}>Consultations sur rendez-vous uniquement</p>
                </div>
              </div>

              <div className="arise-card" style={{ padding: "32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                  <div style={{ width: "40px", height: "40px", background: "hsl(var(--foreground))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Phone style={{ width: "18px", height: "18px", color: "hsl(var(--primary-foreground))" }} />
                  </div>
                  <h3 className="arise-serif" style={{ fontSize: "18px", fontWeight: "400", color: "hsl(var(--foreground))" }}>Contact direct</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "hsl(var(--foreground))" }}>
                      <Mail style={{ width: "16px", height: "16px" }} />contact@christopherquershi.fr
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "hsl(var(--foreground))" }}>
                      <Phone style={{ width: "16px", height: "16px" }} />Téléphone communiqué sur demande
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <Link to="/reservation"><button className="arise-btn-primary" style={{ width: "100%", justifyContent: "center" }}><Calendar style={{ width: "16px", height: "16px" }} />Prendre rendez-vous</button></Link>
                    <Link to="/contact#contact"><button className="arise-btn-outline" style={{ width: "100%", justifyContent: "center" }}><Mail style={{ width: "16px", height: "16px" }} />Envoyer un message</button></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Formulaire de contact */}
                <section id="contact" style={{ ...sectionStyle, background: "hsl(var(--background))" }}>
                            <div className="container mx-auto px-8">
                                        <h2 className="arise-serif" style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: "400", color: "hsl(var(--foreground))", textAlign: "center", marginBottom: "48px" }}>Envoyez-moi un message</h2>
                                        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                                                      <div className="arise-card" style={{ padding: "40px" }}>
                                                                      <form
                                                                                          onSubmit={(e) => {
                                                                                                                e.preventDefault();
                                                                                                                const form = e.target as HTMLFormElement;
                                                                                                                const data = new FormData(form);
                                                                                                                fetch("https://formspree.io/f/mykobvjq", {
                                                                                                                                        method: "POST",
                                                                                                                                        body: data,
                                                                                                                                        headers: { Accept: "application/json" },
                                                                                                                  }).then((res) => {
                                                                                                                                        if (res.ok) {
                                                                                                                                                                  alert("Votre message a bien été envoyé !");
                                                                                                                                                                  form.reset();
                                                                                                                                          } else {
                                                                                                                                                                  alert("Une erreur est survenue. Veuillez réessayer.");
                                                                                                                                          }
                                                                                                                  });
                                                                                            }}
                                                                                          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
                                                                                        >
                                                                                        <div className="grid md:grid-cols-2 gap-4">
                                                                                                            <div>
                                                                                                                                  <label htmlFor="contact-name" style={{ display: "block", fontWeight: "600", marginBottom: "6px", fontSize: "14px", color: "hsl(var(--foreground))" }}>Nom complet *</label>
                                                                                                                                  <input id="contact-name" type="text" name="name" placeholder="Votre nom" required style={{ width: "100%", padding: "12px 16px", border: "1.5px solid hsl(var(--border))", borderRadius: "10px", fontSize: "14px", background: "hsl(var(--background))", color: "hsl(var(--foreground))", boxSizing: "border-box" }} />
                                                                                                              </div>
                                                                                                            <div>
                                                                                                                                  <label htmlFor="contact-email" style={{ display: "block", fontWeight: "600", marginBottom: "6px", fontSize: "14px", color: "hsl(var(--foreground))" }}>Email *</label>
                                                                                                                                  <input id="contact-email" type="email" name="email" placeholder="votre@email.com" required style={{ width: "100%", padding: "12px 16px", border: "1.5px solid hsl(var(--border))", borderRadius: "10px", fontSize: "14px", background: "hsl(var(--background))", color: "hsl(var(--foreground))", boxSizing: "border-box" }} />
                                                                                                              </div>
                                                                                          </div>
                                                                                        <div>
                                                                                                            <label htmlFor="contact-subject" style={{ display: "block", fontWeight: "600", marginBottom: "6px", fontSize: "14px", color: "hsl(var(--foreground))" }}>Sujet</label>
                                                                                                            <input id="contact-subject" type="text" name="subject" placeholder="Sujet de votre message" style={{ width: "100%", padding: "12px 16px", border: "1.5px solid hsl(var(--border))", borderRadius: "10px", fontSize: "14px", background: "hsl(var(--background))", color: "hsl(var(--foreground))", boxSizing: "border-box" }} />
                                                                                          </div>
                                                                                        <div>
                                                                                                            <label htmlFor="contact-message" style={{ display: "block", fontWeight: "600", marginBottom: "6px", fontSize: "14px", color: "hsl(var(--foreground))" }}>Message *</label>
                                                                                                            <textarea id="contact-message" name="message" placeholder="Décrivez votre demande..." required rows={5} style={{ width: "100%", padding: "12px 16px", border: "1.5px solid hsl(var(--border))", borderRadius: "10px", fontSize: "14px", background: "hsl(var(--background))", color: "hsl(var(--foreground))", resize: "vertical", boxSizing: "border-box" }} />
                                                                                          </div>
                                                                                        <button type="submit" className="arise-btn-primary" style={{ justifyContent: "center" }}>
                                                                                                            <Mail style={{ width: "18px", height: "18px" }} />Envoyer le message
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
