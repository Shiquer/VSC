import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Testimonial {
  id: string;
  author_name: string;
  author_title?: string;
  content: string;
  rating: number;
  is_published: boolean;
  created_at: string;
}

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ author_name: "", author_title: "", content: "", rating: 5, is_published: true });
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const resetForm = () => setForm({ author_name: "", author_title: "", content: "", rating: 5, is_published: true });

  const fetchTestimonials = async () => {
    setLoading(true);
    const { data } = await (supabase as any)
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false }) as { data: Testimonial[] };
    setTestimonials(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchTestimonials(); }, []);

  const handleSave = async () => {
    if (!form.author_name.trim() || !form.content.trim()) return;
    if (editing) {
      await (supabase as any).from("testimonials").update(form as any).eq("id", editing);
      showToast("Modifié ✓");
    } else {
      await (supabase as any).from("testimonials").insert(form as any);
      showToast("Ajouté ✓");
    }
    resetForm();
    setShowForm(false);
    setEditing(null);
    fetchTestimonials();
  };

  const handleEdit = (t: Testimonial) => {
    setForm({ author_name: t.author_name, author_title: t.author_title || "", content: t.content, rating: t.rating, is_published: t.is_published });
    setEditing(t.id);
    setShowForm(true);
  };

  const togglePublish = async (id: string, current: boolean) => {
    await (supabase as any).from("testimonials").update({ is_published: !current } as any).eq("id", id);
    showToast(!current ? "Publié ✓" : "Dépublié");
    fetchTestimonials();
  };

  const handleDelete = async (id: string) => {
    await (supabase as any).from("testimonials").delete().eq("id", id) as any;
    setTestimonials(prev => prev.filter(t => t.id !== id));
    showToast("Supprimé");
  };

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "4px" }}>Témoignages</h1>
          <p style={{ opacity: 0.6, fontSize: "14px" }}>{testimonials.length} témoignage{testimonials.length !== 1 ? "s" : ""}</p>
        </div>
        <button onClick={() => { resetForm(); setEditing(null); setShowForm(!showForm); }} style={{ padding: "10px 20px", background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", border: "none", borderRadius: "99px", cursor: "pointer", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
          + Ajouter
        </button>
      </div>

      {showForm && (
        <Card style={{ marginBottom: "24px" }}>
          <CardContent style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <h2 style={{ fontWeight: "700", fontSize: "18px" }}>{editing ? "Modifier" : "Nouveau témoignage"}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "6px", fontSize: "13px" }}>Nom *</label>
                <input value={form.author_name} onChange={e => setForm(p => ({ ...p, author_name: e.target.value }))} placeholder="Nom du patient" style={{ width: "100%", padding: "10px 14px", border: "1.5px solid hsl(var(--border))", borderRadius: "10px", fontSize: "14px", boxSizing: "border-box" as const }} />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "6px", fontSize: "13px" }}>Spécialité / Titre</label>
                <input value={form.author_title} onChange={e => setForm(p => ({ ...p, author_title: e.target.value }))} placeholder="ex: Sophrologie, Hypnose…" style={{ width: "100%", padding: "10px 14px", border: "1.5px solid hsl(var(--border))", borderRadius: "10px", fontSize: "14px", boxSizing: "border-box" as const }} />
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "6px", fontSize: "13px" }}>Témoignage *</label>
              <textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} placeholder="Contenu du témoignage..." rows={4} style={{ width: "100%", padding: "10px 14px", border: "1.5px solid hsl(var(--border))", borderRadius: "10px", fontSize: "14px", resize: "vertical", boxSizing: "border-box" as const }} />
            </div>
            <div>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", fontSize: "13px" }}>Note</label>
              <div style={{ display: "flex", gap: "6px" }}>
                {[1,2,3,4,5].map(n => (
                  <Star key={n} size={24} onClick={() => setForm(p => ({ ...p, rating: n }))} style={{ cursor: "pointer", fill: n <= form.rating ? "hsl(var(--primary))" : "transparent", color: "hsl(var(--primary))" }} />
                ))}
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "6px", fontSize: "13px" }}>Statut</label>
              <select value={form.is_published ? "published" : "draft"} onChange={e => setForm(p => ({ ...p, is_published: e.target.value === "published" }))} style={{ padding: "10px 14px", border: "1.5px solid hsl(var(--border))", borderRadius: "10px", fontSize: "14px", width: "200px" }}>
                <option value="published">Publié</option>
                <option value="draft">Brouillon</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={handleSave} style={{ padding: "10px 20px", background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", border: "none", borderRadius: "99px", cursor: "pointer", fontWeight: "600" }}>✓ Enregistrer</button>
              <button onClick={() => { setShowForm(false); setEditing(null); resetForm(); }} style={{ padding: "10px 20px", background: "transparent", border: "1.5px solid hsl(var(--border))", borderRadius: "99px", cursor: "pointer" }}>✕ Annuler</button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent style={{ padding: "0" }}>
          {loading ? (
            <div style={{ padding: "40px", textAlign: "center", opacity: 0.5 }}>Chargement...</div>
          ) : testimonials.length === 0 ? (
            <div style={{ padding: "60px", textAlign: "center" }}>
              <Star size={48} style={{ margin: "0 auto 16px", opacity: 0.3 }} />
              <p style={{ opacity: 0.6 }}>Aucun témoignage. Ajoutez-en un !</p>
            </div>
          ) : (
            <div>
              {testimonials.map((t, idx) => (
                <div key={t.id} style={{ padding: "20px 24px", borderBottom: idx < testimonials.length - 1 ? "1px solid hsl(var(--border))" : "none", display: "flex", justifyContent: "space-between", alignItems: "start", gap: "16px" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                      <span style={{ fontWeight: "700", fontSize: "15px" }}>{t.author_name}</span>
                      {t.author_title && <span style={{ fontSize: "13px", opacity: 0.6, padding: "2px 8px", background: "hsl(var(--secondary))", borderRadius: "99px" }}>{t.author_title}</span>}
                      <span style={{ fontSize: "12px", padding: "2px 8px", borderRadius: "99px", background: t.is_published ? "hsl(142 76% 36%/0.1)" : "hsl(var(--muted))", color: t.is_published ? "hsl(142 76% 36%)" : "hsl(var(--muted-foreground))" }}>
                        {t.is_published ? "Publié ✓" : "Brouillon"}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "3px", marginBottom: "8px" }}>
                      {[1,2,3,4,5].map(n => <Star key={n} size={13} style={{ fill: n <= t.rating ? "hsl(var(--primary))" : "transparent", color: "hsl(var(--primary))" }} />)}
                    </div>
                    <p style={{ fontSize: "14px", opacity: 0.8, lineHeight: "1.6" }}>{t.content}</p>
                  </div>
                  <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                    <button onClick={() => togglePublish(t.id, t.is_published)} style={{ padding: "6px 12px", fontSize: "13px", border: "1.5px solid hsl(var(--border))", borderRadius: "99px", cursor: "pointer", background: "transparent" }}>{t.is_published ? "Dépublier" : "Publier"}</button>
                    <button onClick={() => handleEdit(t)} style={{ padding: "6px 12px", fontSize: "13px", border: "1.5px solid hsl(var(--border))", borderRadius: "99px", cursor: "pointer", background: "transparent" }}>Modifier</button>
                    <button onClick={() => handleDelete(t.id)} style={{ padding: "6px 12px", fontSize: "13px", border: "1.5px solid hsl(var(--destructive)/0.3)", borderRadius: "99px", cursor: "pointer", background: "hsl(var(--destructive)/0.05)", color: "hsl(var(--destructive))" }}>Supprimer</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {toast && (
        <div style={{ position: "fixed", bottom: "24px", right: "24px", background: "hsl(var(--foreground))", color: "hsl(var(--background))", padding: "12px 20px", borderRadius: "99px", fontWeight: "600", fontSize: "14px", boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
          {toast}
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
