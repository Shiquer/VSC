import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Cookie } from "lucide-react";

const STORAGE_KEY = "cookie_consent";

const CookieBanner = () => {
      const [visible, setVisible] = useState(false);

      useEffect(() => {
              const consent = localStorage.getItem(STORAGE_KEY);
              if (!consent) setVisible(true);
      }, []);

      const accept = () => {
              localStorage.setItem(STORAGE_KEY, "accepted");
              setVisible(false);
      };

      const refuse = () => {
              localStorage.setItem(STORAGE_KEY, "refused");
              setVisible(false);
      };

      if (!visible) return null;

      return (
              <div
                        role="dialog"
                        aria-label="Consentement cookies"
                        aria-live="polite"
                        style={{
                                    position: "fixed",
                                    bottom: "24px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    width: "min(600px, calc(100vw - 32px))",
                                    background: "hsl(var(--card))",
                                    border: "1px solid hsl(var(--border))",
                                    borderRadius: "16px",
                                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                                    padding: "20px 24px",
                                    zIndex: 9999,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "16px",
                        }}
                      >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                            <Cookie size={20} style={{ color: "hsl(var(--primary))", flexShrink: 0, marginTop: "2px" }} />
                            <div style={{ flex: 1 }}>
                                      <p style={{ fontWeight: "600", fontSize: "14px", marginBottom: "6px", color: "hsl(var(--foreground))" }}>
                                                  Ce site collecte des données personnelles
                                      </p>
                                      <p style={{ fontSize: "13px", lineHeight: "1.6", color: "hsl(var(--muted-foreground))" }}>
                                                  En soumettant le formulaire de contact, vos données (nom, e-mail, message) sont traitées pour répondre à votre demande, conformément au RGPD.{" "}
                                                  <Link
                                                                    to="/politique-confidentialite"
                                                                    style={{ color: "hsl(var(--primary))", textDecoration: "underline" }}
                                                                  >
                                                                Politique de confidentialité
                                                  </Link>
                                      </p>
                            </div>
                            <button
                                          onClick={refuse}
                                          aria-label="Fermer"
                                          style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", color: "hsl(var(--muted-foreground))", flexShrink: 0 }}
                                        >
                                      <X size={16} />
                            </button>
                    </div>
                    <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", flexWrap: "wrap" }}>
                            <button
                                          onClick={refuse}
                                          style={{
                                                          padding: "8px 20px",
                                                          borderRadius: "8px",
                                                          border: "1px solid hsl(var(--border))",
                                                          background: "transparent",
                                                          color: "hsl(var(--foreground))",
                                                          fontSize: "13px",
                                                          cursor: "pointer",
                                          }}
                                        >
                                      Refuser
                            </button>
                            <button
                                          onClick={accept}
                                          style={{
                                                          padding: "8px 20px",
                                                          borderRadius: "8px",
                                                          border: "none",
                                                          background: "hsl(var(--primary))",
                                                          color: "hsl(var(--primary-foreground))",
                                                          fontSize: "13px",
                                                          cursor: "pointer",
                                          }}
                                        >
                                      Accepter
                            </button>
                    </div>
              </div>
            );
};

export default CookieBanner;
