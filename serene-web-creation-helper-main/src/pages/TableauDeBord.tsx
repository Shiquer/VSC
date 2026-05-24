import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import usePageTitle from "@/hooks/usePageTitle";
import {
  Calendar, Clock, ChevronRight, ArrowRight, BookOpen,
  MessageSquare, TrendingUp, Star, Play, FileText,
  LogOut, User, Bell, CheckCircle, AlertCircle, Loader2
} from "lucide-react";

interface Booking {
  id: string;
  date: string;
  time: string;
  service: string;
  status: string | null;
  name: string;
}

const TableauDeBord = () => {
  usePageTitle("Tableau de bord - Mon Espace");
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [greeting, setGreeting] = useState("Bonjour");

  useEffect(() => {
    const h = new Date().getHours();
    if (h >= 18) setGreeting("Bonsoir");
    else if (h >= 12) setGreeting("Bon apres-midi");
    else setGreeting("Bonjour");
  }, []);

  useEffect(() => {
    if (!loading && !user) navigate("/mon-espace");
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    setBookingsLoading(true);
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("id, date, time, service, status, name")
        .eq("email", user?.email ?? "")
        .order("date", { ascending: true });
      if (!error && data) setBookings(data);
    } catch (_) {}
    finally { setBookingsLoading(false); }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingBookings = bookings.filter(b => {
    const d = new Date(b.date);
    d.setHours(0, 0, 0, 0);
    return d >= today;
  }).slice(0, 3);
  const pastBookings = bookings.filter(b => {
    const d = new Date(b.date);
    d.setHours(0, 0, 0, 0);
    return d < today;
  }).slice(0, 5);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
  };

  const getStatusStyle = (status: string | null) => {
    switch (status) {
      case "confirmed": return { bg: "#F0FDF4", color: "#16A34A", label: "Confirme" };
      case "pending": return { bg: "#FFFBEB", color: "#D97706", label: "En attente" };
      case "cancelled": return { bg: "#FEF2F2", color: "#DC2626", label: "Annule" };
      default: return { bg: "#F8F9FA", color: "#6B7280", label: "N/A" };
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/mon-espace");
  };

  const resources = [
    { icon: Play, title: "Seance de relaxation guidee", type: "Audio", duration: "20 min", color: "#EDE9FE" },
    { icon: FileText, title: "Guide de respiration", type: "PDF", duration: "5 min", color: "#FEF3C7" },
    { icon: Play, title: "Meditation de pleine conscience", type: "Audio", duration: "15 min", color: "#E0F2FE" },
  ];

  const progressItems = [
    { label: "Seances effectuees", value: pastBookings.length, max: 10, color: "#6D28D9" },
    { label: "Mois consecutifs", value: Math.min(Math.ceil(pastBookings.length / 2), 6), max: 6, color: "#0891B2" },
    { label: "Ressources consultees", value: 2, max: 10, color: "#059669" },
  ];

  const sectionCard: React.CSSProperties = {
    background: "#fff", borderRadius: "20px", border: "1px solid hsl(var(--border))",
    padding: "28px", boxShadow: "0 2px 16px rgba(0,0,0,0.05)", marginBottom: "24px",
  };

  const sectionTitle: React.CSSProperties = {
    fontSize: "18px", fontWeight: "400", fontFamily: "'Playfair Display', Georgia, serif",
    color: "hsl(var(--foreground))", marginBottom: "6px",
  };

  const sectionSubtitle: React.CSSProperties = {
    fontSize: "13px", color: "hsl(var(--foreground))", opacity: 0.5,
    fontFamily: "'Helvetica Neue', sans-serif", marginBottom: "20px",
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "hsl(var(--background))" }}>
        <Loader2 style={{ width: "32px", height: "32px", animation: "spin 1s linear infinite", color: "hsl(var(--foreground))", opacity: 0.4 }} />
      </div>
    );
  }

  if (!user) return null;

  const displayName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Patient";

  return (
    <div style={{ minHeight: "100vh", background: "hsl(var(--background))" }}>
      <Header />
      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 20px 80px" }}>

        {/* Header du dashboard */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <div style={{ width: "48px", height: "48px", background: "hsl(var(--foreground))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <User style={{ width: "20px", height: "20px", color: "hsl(var(--primary-foreground))" }} />
              </div>
              <div>
                <p style={{ fontSize: "13px", color: "hsl(var(--foreground))", opacity: 0.5, fontFamily: "'Helvetica Neue', sans-serif", marginBottom: "2px" }}>{greeting},</p>
                <h1 style={{ fontSize: "28px", fontWeight: "400", fontFamily: "'Playfair Display', Georgia, serif", color: "hsl(var(--foreground))" }}>
                  {displayName}
                </h1>
              </div>
            </div>
            <p style={{ fontSize: "14px", color: "hsl(var(--foreground))", opacity: 0.5, fontFamily: "'Helvetica Neue', sans-serif", paddingLeft: "60px" }}>
              {user.email}
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Link to="/reservation" style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 18px", background: "hsl(var(--foreground))", color: "hsl(var(--primary-foreground))", borderRadius: "12px", textDecoration: "none", fontSize: "14px", fontWeight: "700", fontFamily: "'Helvetica Neue', sans-serif" }}>
              <Calendar style={{ width: "15px", height: "15px" }} />
              Prendre RDV
            </Link>
            <button onClick={handleSignOut} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 16px", background: "transparent", border: "1.5px solid hsl(var(--border))", color: "hsl(var(--foreground))", borderRadius: "12px", cursor: "pointer", fontSize: "14px", fontFamily: "'Helvetica Neue', sans-serif", opacity: 0.7 }}>
              <LogOut style={{ width: "14px", height: "14px" }} />
              Deconnexion
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "32px" }}>
          {[
            { label: "Prochaine seance", value: upcomingBookings[0] ? formatDate(upcomingBookings[0].date) : "Aucune", icon: Calendar, color: "#EDE9FE" },
            { label: "Seances total", value: bookings.length.toString(), icon: CheckCircle, color: "#E0F2FE" },
            { label: "Statut", value: "Actif", icon: Star, color: "#FEF3C7" },
          ].map((stat, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: "16px", border: "1px solid hsl(var(--border))", padding: "20px", display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ width: "44px", height: "44px", background: stat.color, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <stat.icon style={{ width: "20px", height: "20px", color: "hsl(var(--foreground))" }} />
              </div>
              <div>
                <p style={{ fontSize: "11px", fontWeight: "700", color: "hsl(var(--foreground))", opacity: 0.5, fontFamily: "'Helvetica Neue', sans-serif", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>{stat.label}</p>
                <p style={{ fontSize: "15px", fontWeight: "600", color: "hsl(var(--foreground))", fontFamily: "'Helvetica Neue', sans-serif" }}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>

          {/* Colonne gauche */}
          <div>
            {/* Prochaines seances */}
            <div style={sectionCard}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                <h2 style={sectionTitle}>Prochaines seances</h2>
                <Calendar style={{ width: "18px", height: "18px", color: "hsl(var(--foreground))", opacity: 0.3 }} />
              </div>
              <p style={sectionSubtitle}>Vos prochains rendez-vous confirmes</p>
              {bookingsLoading ? (
                <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
                  <Loader2 style={{ width: "24px", height: "24px", animation: "spin 1s linear infinite", opacity: 0.4 }} />
                </div>
              ) : upcomingBookings.length === 0 ? (
                <div style={{ textAlign: "center", padding: "24px 16px", background: "hsl(var(--secondary))", borderRadius: "12px" }}>
                  <Calendar style={{ width: "28px", height: "28px", color: "hsl(var(--foreground))", opacity: 0.3, margin: "0 auto 10px" }} />
                  <p style={{ fontSize: "14px", color: "hsl(var(--foreground))", opacity: 0.6, fontFamily: "'Helvetica Neue', sans-serif", marginBottom: "14px" }}>
                    Aucune seance a venir
                  </p>
                  <Link to="/reservation" style={{ fontSize: "13px", fontWeight: "700", color: "hsl(var(--foreground))", fontFamily: "'Helvetica Neue', sans-serif", textDecoration: "underline" }}>
                    Reserver une seance
                  </Link>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {upcomingBookings.map(b => {
                    const st = getStatusStyle(b.status);
                    return (
                      <div key={b.id} style={{ background: "hsl(var(--secondary))", borderRadius: "12px", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div>
                          <p style={{ fontSize: "14px", fontWeight: "600", color: "hsl(var(--foreground))", fontFamily: "'Helvetica Neue', sans-serif", marginBottom: "3px", textTransform: "capitalize" }}>{formatDate(b.date)}</p>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <Clock style={{ width: "12px", height: "12px", color: "hsl(var(--foreground))", opacity: 0.4 }} />
                            <span style={{ fontSize: "13px", color: "hsl(var(--foreground))", opacity: 0.6, fontFamily: "'Helvetica Neue', sans-serif" }}>{b.time} — {b.service}</span>
                          </div>
                        </div>
                        <div style={{ background: st.bg, color: st.color, padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700", fontFamily: "'Helvetica Neue', sans-serif" }}>
                          {st.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Messages recents */}
            <div style={sectionCard}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                <h2 style={sectionTitle}>Messages recents</h2>
                <MessageSquare style={{ width: "18px", height: "18px", color: "hsl(var(--foreground))", opacity: 0.3 }} />
              </div>
              <p style={sectionSubtitle}>Communication avec Natalia</p>
              <div style={{ background: "hsl(var(--secondary))", borderRadius: "12px", padding: "20px", textAlign: "center" }}>
                <Bell style={{ width: "28px", height: "28px", color: "hsl(var(--foreground))", opacity: 0.25, margin: "0 auto 10px" }} />
                <p style={{ fontSize: "14px", color: "hsl(var(--foreground))", opacity: 0.6, fontFamily: "'Helvetica Neue', sans-serif", marginBottom: "14px" }}>
                  La messagerie arrive bientot
                </p>
                <Link to="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: "700", color: "hsl(var(--foreground))", fontFamily: "'Helvetica Neue', sans-serif", textDecoration: "none", background: "#fff", border: "1.5px solid hsl(var(--border))", padding: "8px 14px", borderRadius: "10px" }}>
                  Contacter Natalia <ArrowRight style={{ width: "13px", height: "13px" }} />
                </Link>
              </div>
            </div>
          </div>

          {/* Colonne droite */}
          <div>
            {/* Historique des rdv */}
            <div style={sectionCard}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                <h2 style={sectionTitle}>Historique des rdv</h2>
                <Clock style={{ width: "18px", height: "18px", color: "hsl(var(--foreground))", opacity: 0.3 }} />
              </div>
              <p style={sectionSubtitle}>Vos seances passees</p>
              {bookingsLoading ? (
                <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
                  <Loader2 style={{ width: "24px", height: "24px", animation: "spin 1s linear infinite", opacity: 0.4 }} />
                </div>
              ) : pastBookings.length === 0 ? (
                <div style={{ textAlign: "center", padding: "20px", background: "hsl(var(--secondary))", borderRadius: "12px" }}>
                  <p style={{ fontSize: "14px", color: "hsl(var(--foreground))", opacity: 0.5, fontFamily: "'Helvetica Neue', sans-serif" }}>Aucun historique disponible</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {pastBookings.map(b => {
                    const st = getStatusStyle(b.status);
                    return (
                      <div key={b.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: "10px", background: "hsl(var(--secondary))" }}>
                        <div>
                          <p style={{ fontSize: "13px", fontWeight: "600", color: "hsl(var(--foreground))", fontFamily: "'Helvetica Neue', sans-serif", marginBottom: "2px", textTransform: "capitalize" }}>{formatDate(b.date)}</p>
                          <p style={{ fontSize: "12px", color: "hsl(var(--foreground))", opacity: 0.5, fontFamily: "'Helvetica Neue', sans-serif" }}>{b.service}</p>
                        </div>
                        <span style={{ background: st.bg, color: st.color, padding: "3px 8px", borderRadius: "20px", fontSize: "11px", fontWeight: "700", fontFamily: "'Helvetica Neue', sans-serif" }}>{st.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Progression personnelle */}
            <div style={sectionCard}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                <h2 style={sectionTitle}>Progression personnelle</h2>
                <TrendingUp style={{ width: "18px", height: "18px", color: "hsl(var(--foreground))", opacity: 0.3 }} />
              </div>
              <p style={sectionSubtitle}>Votre parcours therapeutique</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {progressItems.map((item, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "13px", color: "hsl(var(--foreground))", opacity: 0.7, fontFamily: "'Helvetica Neue', sans-serif" }}>{item.label}</span>
                      <span style={{ fontSize: "13px", fontWeight: "700", color: "hsl(var(--foreground))", fontFamily: "'Helvetica Neue', sans-serif" }}>{item.value}/{item.max}</span>
                    </div>
                    <div style={{ height: "8px", background: "hsl(var(--secondary))", borderRadius: "4px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${Math.min((item.value / item.max) * 100, 100)}%`, background: item.color, borderRadius: "4px", transition: "width 0.5s ease" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ressources recommandees */}
            <div style={sectionCard}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                <h2 style={sectionTitle}>Ressources recommandees</h2>
                <BookOpen style={{ width: "18px", height: "18px", color: "hsl(var(--foreground))", opacity: 0.3 }} />
              </div>
              <p style={sectionSubtitle}>Selectionnees pour vous par Natalia</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {resources.map((res, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", background: "hsl(var(--secondary))", borderRadius: "12px", cursor: "pointer", transition: "background 0.2s" }}>
                    <div style={{ width: "40px", height: "40px", background: res.color, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <res.icon style={{ width: "17px", height: "17px", color: "hsl(var(--foreground))" }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: "13px", fontWeight: "600", color: "hsl(var(--foreground))", fontFamily: "'Helvetica Neue', sans-serif", marginBottom: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{res.title}</p>
                      <p style={{ fontSize: "12px", color: "hsl(var(--foreground))", opacity: 0.5, fontFamily: "'Helvetica Neue', sans-serif" }}>{res.type} • {res.duration}</p>
                    </div>
                    <ChevronRight style={{ width: "14px", height: "14px", color: "hsl(var(--foreground))", opacity: 0.3, flexShrink: 0 }} />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "14px" }}>
                <Link to="/mediatheque" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "10px", border: "1.5px solid hsl(var(--border))", borderRadius: "12px", textDecoration: "none", fontSize: "13px", fontWeight: "700", color: "hsl(var(--foreground))", fontFamily: "'Helvetica Neue', sans-serif", opacity: 0.7 }}>
                  Voir toutes les ressources <ArrowRight style={{ width: "13px", height: "13px" }} />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default TableauDeBord;
