import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import usePageTitle from "@/hooks/usePageTitle";
import { clientConfig } from "@/client.config";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Phone, Send, CheckCircle } from "lucide-react";

const MonEspace = () => {
  usePageTitle(`Mon Espace - ${clientConfig.name}`);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"connexion" | "inscription">("connexion");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [demande, setDemande] = useState({ nom: "", prenom: "", email: "", telephone: "", message: "" });
  const [demandeLoading, setDemandeLoading] = useState(false);
  const [demandeError, setDemandeError] = useState<string | null>(null);
  const [demandeSuccess, setDemandeSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate("/mon-espace/tableau-de-bord");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Une erreur est survenue.";
      if (msg.includes("Invalid login credentials")) setLoginError("Email ou mot de passe incorrect.");
      else if (msg.includes("Email not confirmed")) setLoginError("Veuillez confirmer votre email avant de vous connecter.");
      else setLoginError(msg);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleDemande = async (e: React.FormEvent) => {
    e.preventDefault();
    setDemandeError(null);
    setDemandeLoading(true);
    try {
      const { error } = await supabase.from("inscription_requests").insert({
        nom: demande.nom,
        prenom: demande.prenom,
        email: demande.email,
        telephone: demande.telephone || null,
        message: demande.message || null,
      });
      if (error) throw error;
      setDemandeSuccess(true);
    } catch (_err: unknown) {
      setDemandeError("Une erreur est survenue. Veuillez reessayer ou nous contacter directement.");
    } finally {
      setDemandeLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px 12px 44px", border: "1.5px solid hsl(var(--border))",
    borderRadius: "12px", fontSize: "15px", background: "hsl(var(--background))",
    color: "hsl(var(--foreground))", outline: "none", boxSizing: "border-box",
    fontFamily: "'Helvetica Neue', sans-serif", transition: "border-color 0.2s",
  };

  const inputSimple: React.CSSProperties = {
    width: "100%", padding: "12px 16px", border: "1.5px solid hsl(var(--border))",
    borderRadius: "12px", fontSize: "15px", background: "hsl(var(--background))",
    color: "hsl(var(--foreground))", outline: "none", boxSizing: "border-box",
    fontFamily: "'Helvetica Neue', sans-serif", transition: "border-color 0.2s",
  };

  const btnPrimary: React.CSSProperties = {
    width: "100%", padding: "14px", background: "hsl(var(--foreground))",
    color: "hsl(var(--primary-foreground))", border: "none", borderRadius: "12px",
    fontSize: "15px", fontWeight: "700", fontFamily: "'Helvetica Neue', sans-serif",
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
    gap: "8px", transition: "opacity 0.2s", marginTop: "4px",
  };

  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: "12px", fontWeight: "700",
    color: "hsl(var(--foreground))", opacity: 0.6, marginBottom: "6px",
    fontFamily: "'Helvetica Neue', sans-serif", textTransform: "uppercase", letterSpacing: "0.05em",
  };

  return (
    <div style={{ minHeight: "100vh", background: "hsl(var(--background))" }}>
      <Header />
      <main style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", minHeight: "calc(100vh - 140px)", padding: "60px 16px" }}>
        <div style={{ width: "100%", maxWidth: "480px" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div style={{ width: "72px", height: "72px", background: "hsl(var(--foreground))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <User style={{ width: "30px", height: "30px", color: "hsl(var(--primary-foreground))" }} />
            </div>
            <h1 style={{ fontSize: "32px", fontWeight: "400", fontFamily: "'Playfair Display', Georgia, serif", color: "hsl(var(--foreground))", marginBottom: "10px" }}>Mon Espace</h1>
            <p style={{ fontSize: "15px", color: "hsl(var(--foreground))", opacity: 0.6, fontFamily: "'Helvetica Neue', sans-serif" }}>Connectez-vous ou faites une demande d'acces</p>
          </div>
          <div style={{ display: "flex", background: "hsl(var(--secondary))", borderRadius: "16px", padding: "5px", marginBottom: "32px", gap: "4px" }}>
            {([{ key: "connexion", label: "Se connecter" }, { key: "inscription", label: "Demande d'acces" }] as const).map((tab) => (
              <button key={tab.key} onClick={() => { setActiveTab(tab.key); setLoginError(null); setDemandeError(null); }}
                style={{ flex: 1, padding: "10px 8px", borderRadius: "12px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: "700", fontFamily: "'Helvetica Neue', sans-serif", transition: "all 0.2s", background: activeTab === tab.key ? "#fff" : "transparent", color: "hsl(var(--foreground))", boxShadow: activeTab === tab.key ? "0 2px 8px rgba(0,0,0,0.1)" : "none" }}>
                {tab.label}
              </button>
            ))}
          </div>
          {activeTab === "connexion" && (
            <div style={{ background: "#fff", borderRadius: "24px", border: "1px solid hsl(var(--border))", padding: "36px", boxShadow: "0 4px 32px rgba(0,0,0,0.06)" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "400", fontFamily: "'Playfair Display', Georgia, serif", color: "hsl(var(--foreground))", marginBottom: "6px" }}>Connexion</h2>
              <p style={{ fontSize: "13px", color: "hsl(var(--foreground))", opacity: 0.5, marginBottom: "24px", fontFamily: "'Helvetica Neue', sans-serif" }}>Acces a votre espace personnel</p>
              <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ position: "relative" }}>
                  <Mail style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: "hsl(var(--foreground))", opacity: 0.4 }} />
                  <input type="email" placeholder="Adresse email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />
                </div>
                <div style={{ position: "relative" }}>
                  <Lock style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: "hsl(var(--foreground))", opacity: 0.4 }} />
                  <input type={showPassword ? "text" : "password"} placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, opacity: 0.4 }}>
                    {showPassword ? <EyeOff style={{ width: "16px", height: "16px" }} /> : <Eye style={{ width: "16px", height: "16px" }} />}
                  </button>
                </div>
                {loginError && <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "10px", padding: "12px 14px", fontSize: "13px", color: "#DC2626" }}>{loginError}</div>}
                <button type="submit" disabled={loginLoading} style={{ ...btnPrimary, opacity: loginLoading ? 0.7 : 1, cursor: loginLoading ? "not-allowed" : "pointer" }}>
                  {loginLoading ? "Connexion..." : "Se connecter"}
                  {!loginLoading && <ArrowRight style={{ width: "16px", height: "16px" }} />}
                </button>
                <p style={{ textAlign: "center", fontSize: "13px", color: "hsl(var(--foreground))", opacity: 0.5, marginTop: "4px" }}>
                  <Link to="/reset-password" style={{ color: "hsl(var(--foreground))", opacity: 0.7, textDecoration: "underline" }}>Mot de passe oublie ?</Link>
                </p>
              </form>
            </div>
          )}
          {activeTab === "inscription" && (
            <div style={{ background: "#fff", borderRadius: "24px", border: "1px solid hsl(var(--border))", padding: "36px", boxShadow: "0 4px 32px rgba(0,0,0,0.06)" }}>
              {demandeSuccess ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{ width: "64px", height: "64px", background: "#F0FDF4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                    <CheckCircle style={{ width: "32px", height: "32px", color: "#16A34A" }} />
                  </div>
                  <h2 style={{ fontSize: "22px", fontWeight: "400", fontFamily: "'Playfair Display', Georgia, serif", color: "hsl(var(--foreground))", marginBottom: "12px" }}>Demande envoyee !</h2>
                  <p style={{ fontSize: "14px", color: "hsl(var(--foreground))", opacity: 0.6, lineHeight: "1.6", marginBottom: "24px", fontFamily: "'Helvetica Neue', sans-serif" }}>Votre demande d'acces a bien ete transmise. Natalia vous contactera dans les meilleurs delais pour valider votre inscription.</p>
                  <button onClick={() => { setDemandeSuccess(false); setDemande({ nom: "", prenom: "", email: "", telephone: "", message: "" }); setActiveTab("connexion"); }}
                    style={{ padding: "12px 24px", background: "hsl(var(--foreground))", color: "hsl(var(--primary-foreground))", border: "none", borderRadius: "12px", fontSize: "14px", fontWeight: "700", fontFamily: "'Helvetica Neue', sans-serif", cursor: "pointer" }}>
                    Retour a la connexion
                  </button>
                </div>
              ) : (
                <>
                  <h2 style={{ fontSize: "20px", fontWeight: "400", fontFamily: "'Playfair Display', Georgia, serif", color: "hsl(var(--foreground))", marginBottom: "6px" }}>Demande d'acces</h2>
                  <p style={{ fontSize: "13px", color: "hsl(var(--foreground))", opacity: 0.5, marginBottom: "24px", fontFamily: "'Helvetica Neue', sans-serif" }}>Remplissez ce formulaire pour demander un acces a votre espace patient. Natalia validera votre demande.</p>
                  <form onSubmit={handleDemande} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div><label style={labelStyle}>Nom *</label><input type="text" placeholder="Dupont" value={demande.nom} onChange={e => setDemande(p => ({ ...p, nom: e.target.value }))} required style={inputSimple} /></div>
                      <div><label style={labelStyle}>Prenom *</label><input type="text" placeholder="Marie" value={demande.prenom} onChange={e => setDemande(p => ({ ...p, prenom: e.target.value }))} required style={inputSimple} /></div>
                    </div>
                    <div><label style={labelStyle}>Email *</label>
                      <div style={{ position: "relative" }}>
                        <Mail style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: "hsl(var(--foreground))", opacity: 0.4 }} />
                        <input type="email" placeholder="marie.dupont@email.com" value={demande.email} onChange={e => setDemande(p => ({ ...p, email: e.target.value }))} required style={inputStyle} />
                      </div>
                    </div>
                    <div><label style={labelStyle}>Telephone</label>
                      <div style={{ position: "relative" }}>
                        <Phone style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: "hsl(var(--foreground))", opacity: 0.4 }} />
                        <input type="tel" placeholder="+33 6 00 00 00 00" value={demande.telephone} onChange={e => setDemande(p => ({ ...p, telephone: e.target.value }))} style={inputStyle} />
                      </div>
                    </div>
                    <div><label style={labelStyle}>Message (facultatif)</label>
                      <textarea placeholder="Presentez-vous brievement..." value={demande.message} onChange={e => setDemande(p => ({ ...p, message: e.target.value }))} rows={3} style={{ ...inputSimple, resize: "vertical", minHeight: "90px" }} />
                    </div>
                    {demandeError && <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "10px", padding: "12px 14px", fontSize: "13px", color: "#DC2626" }}>{demandeError}</div>}
                    <button type="submit" disabled={demandeLoading} style={{ ...btnPrimary, opacity: demandeLoading ? 0.7 : 1, cursor: demandeLoading ? "not-allowed" : "pointer" }}>
                      {demandeLoading ? "Envoi en cours..." : "Envoyer ma demande"}
                      {!demandeLoading && <Send style={{ width: "16px", height: "16px" }} />}
                    </button>
                  </form>
                </>
              )}
            </div>
          )}
          <p style={{ textAlign: "center", marginTop: "24px", fontSize: "13px", color: "hsl(var(--foreground))", opacity: 0.5, fontFamily: "'Helvetica Neue', sans-serif" }}>
            Vous souhaitez prendre un rendez-vous ?{" "}
            <Link to="/reservation" style={{ color: "hsl(var(--foreground))", opacity: 0.7, textDecoration: "underline" }}>Reserver ici</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MonEspace;
