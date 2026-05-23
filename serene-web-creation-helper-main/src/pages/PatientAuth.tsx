import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import usePageTitle from "@/hooks/usePageTitle";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";

const PatientAuth = () => {
  usePageTitle("Mon Espace - Natalia Kourycheva");
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      if (mode === "register") {
        const { error: signUpError } = await supabase.auth.signUp({
          email, password,
          options: { data: { display_name: displayName }, emailRedirectTo: window.location.origin + "/mon-espace" },
        });
        if (signUpError) throw signUpError;
        setSuccess("Compte cree ! Verifiez votre email pour confirmer votre inscription.");
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        navigate("/mon-espace");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Une erreur est survenue.";
      if (msg.includes("Invalid login credentials")) setError("Email ou mot de passe incorrect.");
      else if (msg.includes("User already registered")) setError("Un compte existe deja avec cet email.");
      else if (msg.includes("Password should be")) setError("Le mot de passe doit contenir au moins 6 caracteres.");
      else setError(msg);
    } finally { setLoading(false); }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px 12px 44px", border: "1.5px solid hsl(var(--border))", borderRadius: "12px",
    fontSize: "15px", background: "hsl(var(--background))", color: "hsl(var(--foreground))", outline: "none",
    boxSizing: "border-box", fontFamily: "'Helvetica Neue', sans-serif", transition: "border-color 0.2s",
  };

  return (
    <div style={{ minHeight: "100vh", background: "hsl(var(--background))" }}>
      <Header />
      <main style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 140px)", padding: "40px 16px" }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ width: "64px", height: "64px", background: "hsl(var(--foreground))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <User style={{ width: "28px", height: "28px", color: "hsl(var(--primary-foreground))" }} />
            </div>
            <h1 className="arise-serif" style={{ fontSize: "28px", fontWeight: "400", color: "hsl(var(--foreground))", marginBottom: "8px" }}>Mon Espace</h1>
            <p style={{ fontSize: "15px", color: "hsl(var(--foreground))", opacity: 0.6 }}>
              {mode === "login" ? "Accedez a votre espace personnel" : "Creez votre compte patient"}
            </p>
          </div>
          <div style={{ background: "#fff", borderRadius: "20px", border: "1px solid hsl(var(--border))", padding: "32px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", background: "hsl(var(--secondary))", borderRadius: "12px", padding: "4px", marginBottom: "24px", gap: "4px" }}>
              {(["login", "register"] as const).map((m) => (
                <button key={m} onClick={() => { setMode(m); setError(null); setSuccess(null); }}
                  style={{ flex: 1, padding: "8px", borderRadius: "9px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: "700", fontFamily: "'Helvetica Neue', sans-serif", transition: "all 0.2s", background: mode === m ? "#fff" : "transparent", color: "hsl(var(--foreground))", boxShadow: mode === m ? "0 1px 4px rgba(0,0,0,0.1)" : "none" }}>
                  {m === "login" ? "Connexion" : "Inscription"}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {mode === "register" && (
                <div style={{ position: "relative" }}>
                  <User style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: "hsl(var(--foreground))", opacity: 0.4 }} />
                  <input type="text" placeholder="Prenom et nom" value={displayName} onChange={e => setDisplayName(e.target.value)} required style={inputStyle} />
                </div>
              )}
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
              {error && <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "10px", padding: "12px 14px", fontSize: "13px", color: "#DC2626" }}>{error}</div>}
              {success && <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "10px", padding: "12px 14px", fontSize: "13px", color: "#16A34A" }}>{success}</div>}
              <button type="submit" disabled={loading} style={{ width: "100%", padding: "14px", background: "hsl(var(--foreground))", color: "hsl(var(--primary-foreground))", border: "none", borderRadius: "12px", fontSize: "15px", fontWeight: "700", fontFamily: "'Helvetica Neue', sans-serif", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "opacity 0.2s" }}>
                {loading ? "Chargement..." : mode === "login" ? "Se connecter" : "Creer mon compte"}
                {!loading && <ArrowRight style={{ width: "16px", height: "16px" }} />}
              </button>
              {mode === "login" && (
                <p style={{ textAlign: "center", fontSize: "13px", color: "hsl(var(--foreground))", opacity: 0.5 }}>
                  <Link to="/reset-password" style={{ color: "hsl(var(--foreground))", opacity: 0.7, textDecoration: "underline" }}>Mot de passe oublie ?</Link>
                </p>
              )}
            </form>
          </div>
          <p style={{ textAlign: "center", marginTop: "20px", fontSize: "13px", color: "hsl(var(--foreground))", opacity: 0.5 }}>
            Vous souhaitez prendre un rendez-vous ?{" "}
            <Link to="/reservation" style={{ color: "hsl(var(--foreground))", opacity: 0.7, textDecoration: "underline" }}>Reserver ici</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PatientAuth;
