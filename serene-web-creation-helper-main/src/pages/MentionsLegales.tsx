import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSiteContent } from "@/hooks/useSiteContent";

const MentionsLegales = () => {
    const { getContent } = useSiteContent("legal");

    const sectionStyle = { padding: "80px 0" };

    return (
          <div className="min-h-screen" style={{ background: "hsl(var(--background))" }}>
                  <Header />

                  <section style={sectionStyle}>
                            <div className="container mx-auto px-8" style={{ maxWidth: "860px" }}>
                                        <Link
                                                      to="/"
                                                      style={{
                                                                      display: "inline-flex",
                                                                      alignItems: "center",
                                                                      gap: "6px",
                                                                      fontSize: "14px",
                                                                      color: "hsl(var(--foreground))",
                                                                      textDecoration: "none",
                                                                      opacity: 0.7,
                                                                      marginBottom: "40px",
                                                      }}
                                                    >
                                                    <ArrowLeft style={{ width: "16px", height: "16px" }} /> Retour à l'accueil
                                        </Link>
                            
                                      <h1
                                                    className="arise-serif"
                                                    style={{
                                                                    fontSize: "clamp(32px, 4vw, 48px)",
                                                                    fontWeight: "700",
                                                                    color: "hsl(var(--foreground))",
                                                                    marginBottom: "48px",
                                                    }}
                                                  >
                                        {getContent("legal_title", "Mentions légales")}
                                      </h1>
                            
                              {/* Éditeur du site */}
                                      <div style={{ marginBottom: "48px" }}>
                                                  <h2
                                                                  style={{
                                                                                    fontFamily: "'Playfair Display', Georgia, serif",
                                                                                    fontSize: "24px",
                                                                                    fontWeight: "600",
                                                                                    color: "hsl(var(--accent))",
                                                                                    marginBottom: "20px",
                                                                  }}
                                                                >
                                                    {getContent("legal_editor_title", "Editeur du site")}
                                                  </h2>
                                                  <div
                                                                  style={{ fontSize: "15px", lineHeight: "1.9", color: "hsl(var(--foreground))", opacity: 0.85 }}
                                                                  dangerouslySetInnerHTML={{
                                                                                    __html: getContent(
                                                                                                        "legal_editor_content",
                                                                                                        `Le site helenebreton-sophrologue.fr est édité par la société :<br><br>
                                                                                                                          <strong>SOLMET – Solutions mieux-être</strong><br>
                                                                                                                                            13 bis avenue de Verdun<br>
                                                                                                                                                              94410 Saint-Maurice<br><br>
                                                                                                                                                                                817 759 749 RCS Créteil<br><br>
                                                                                                                                                                                                  Adresse e-mail : <a href="mailto:helenebreton94@gmail.com" style="color: hsl(var(--accent))">helenebreton94@gmail.com</a>`
                                                                                                      ),
                                                                  }}
                                                                />
                                      </div>
                            
                              {/* Directeur de publication */}
                                      <div style={{ marginBottom: "48px" }}>
                                                  <h2
                                                                  style={{
                                                                                    fontFamily: "'Playfair Display', Georgia, serif",
                                                                                    fontSize: "24px",
                                                                                    fontWeight: "600",
                                                                                    color: "hsl(var(--accent))",
                                                                                    marginBottom: "20px",
                                                                  }}
                                                                >
                                                    {getContent("legal_director_title", "Directeur de publication")}
                                                  </h2>
                                                  <div
                                                                  style={{ fontSize: "15px", lineHeight: "1.9", color: "hsl(var(--foreground))", opacity: 0.85 }}
                                                                  dangerouslySetInnerHTML={{
                                                                                    __html: getContent(
                                                                                                        "legal_director_content",
                                                                                                        `Hélène Breton<br>
                                                                                                                          Adresse e-mail : <a href="mailto:helenebreton94@gmail.com" style="color: hsl(var(--accent))">helenebreton94@gmail.com</a>`
                                                                                                      ),
                                                                  }}
                                                                />
                                      </div>
                            
                              {/* Hébergeur du site */}
                                      <div style={{ marginBottom: "48px" }}>
                                                  <h2
                                                                  style={{
                                                                                    fontFamily: "'Playfair Display', Georgia, serif",
                                                                                    fontSize: "24px",
                                                                                    fontWeight: "600",
                                                                                    color: "hsl(var(--accent))",
                                                                                    marginBottom: "20px",
                                                                  }}
                                                                >
                                                    {getContent("legal_host_title", "Hébergeur du site")}
                                                  </h2>
                                                  <div
                                                                  style={{ fontSize: "15px", lineHeight: "1.9", color: "hsl(var(--foreground))", opacity: 0.85 }}
                                                                  dangerouslySetInnerHTML={{
                                                                                    __html: getContent(
                                                                                                        "legal_host_content",
                                                                                                        `<strong>1&1 IONOS SARL</strong><br>
                                                                                                                          dont le siège est situé à l'adresse suivante : 7 place de la Gare, 57201 Sarreguemines<br>
                                                                                                                                            Téléphone : 0970 808 911`
                                                                                                      ),
                                                                  }}
                                                                />
                                      </div>
                            </div>
                  </section>
          
                <Footer />
          </div>
        );
};

export default MentionsLegales;</Link>
