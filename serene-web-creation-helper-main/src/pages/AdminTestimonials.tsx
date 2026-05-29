import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Star, Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Testimonial {
  id: string; author: string; role?: string; content: string; rating: number; status: string; created_at: string;
}
const StarRating = ({ value, onChange }: { value: number; onChange?: (v: number) => void }) => (
  <div className="flex gap-1">
    {[1,2,3,4,5].map(s => <Star key={s} className={`h-5 w-5 cursor-pointer ${s <= value ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} onClick={() => onChange?.(s)} />)}
  </div>
);
const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState({ author: "", role: "", content: "", rating: 5, status: "published" });
  const { toast } = useToast();
  useEffect(() => { fetchTestimonials(); }, []);
  const fetchTestimonials = async () => {
    setLoading(true);
    const { data } = await (supabase.from("testimonials" as any).select("*").order("created_at", { ascending: false }) as any);
    setTestimonials(data || []); setLoading(false);
  };
  const resetForm = () => { setForm({ author: "", role: "", content: "", rating: 5, status: "published" }); setEditing(null); setShowForm(false); };
  const openEdit = (t: Testimonial) => { setForm({ author: t.author, role: t.role || "", content: t.content, rating: t.rating, status: t.status }); setEditing(t); setShowForm(true); };
  const save = async () => {
    if (!form.author.trim() || !form.content.trim()) { toast({ title: "Champs requis", variant: "destructive" }); return; }
    if (editing) { await (supabase.from("testimonials" as any).update(form as any).eq("id", editing.id) as any); toast({ title: "Modifié ✓" }); }
    else { await (supabase.from("testimonials" as any).insert(form as any) as any); toast({ title: "Ajouté ✓" }); }
    resetForm(); fetchTestimonials();
  };
  const toggleStatus = async (t: Testimonial) => {
    const s = t.status === "published" ? "draft" : "published";
    await (supabase.from("testimonials" as any).update({ status: s } as any).eq("id", t.id) as any);
    setTestimonials(prev => prev.map(x => x.id === t.id ? { ...x, status: s } : x));
    toast({ title: s === "published" ? "Publié ✓" : "Masqué ✓" });
  };
  const remove = async (id: string) => {
    await (supabase.from("testimonials" as any).delete().eq("id", id) as any);
    setTestimonials(prev => prev.filter(t => t.id !== id)); toast({ title: "Supprimé" });
  };
  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold tracking-tight">Témoignages</h1><p className="text-muted-foreground">{testimonials.length} témoignage{testimonials.length !== 1 ? "s" : ""}</p></div>
        <Button onClick={() => { resetForm(); setShowForm(true); }}><Plus className="h-4 w-4 mr-2" /> Ajouter</Button>
      </div>
      {showForm && (
        <Card><CardContent className="p-6 space-y-4">
          <h2 className="font-semibold text-lg">{editing ? "Modifier" : "Nouveau"} témoignage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium mb-1 block">Nom *</label><Input value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} /></div>
            <div><label className="text-sm font-medium mb-1 block">Rôle</label><Input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} /></div>
          </div>
          <div><label className="text-sm font-medium mb-1 block">Témoignage *</label><Textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={3} /></div>
          <div><label className="text-sm font-medium mb-2 block">Note</label><StarRating value={form.rating} onChange={v => setForm(f => ({ ...f, rating: v }))} /></div>
          <div><label className="text-sm font-medium mb-1 block">Statut</label><select className="border rounded px-3 py-2 text-sm w-full" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}><option value="published">Publié</option><option value="draft">Brouillon</option></select></div>
          <div className="flex gap-2"><Button onClick={save}><Check className="h-4 w-4 mr-1" /> Enregistrer</Button><Button variant="outline" onClick={resetForm}><X className="h-4 w-4 mr-1" /> Annuler</Button></div>
        </CardContent></Card>
      )}
      {testimonials.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center justify-center py-16 text-center"><Star className="h-12 w-12 text-muted-foreground mb-4" /><p className="text-muted-foreground">Aucun témoignage. Ajoutez-en un !</p></CardContent></Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map(t => (
            <Card key={t.id} className={`${t.status !== "published" ? "opacity-60" : ""}`}><CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div><p className="font-semibold text-sm">{t.author}</p>{t.role && <p className="text-xs text-muted-foreground">{t.role}</p>}</div>
                <Badge variant={t.status === "published" ? "default" : "secondary"} className="text-xs">{t.status === "published" ? "Publié" : "Brouillon"}</Badge>
              </div>
              <StarRating value={t.rating} />
              <p className="text-sm text-muted-foreground mt-2 line-clamp-3">"{t.content}"</p>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm" onClick={() => openEdit(t)}><Pencil className="h-3 w-3" /></Button>
                <Button variant="outline" size="sm" onClick={() => toggleStatus(t)}>{t.status === "published" ? "Masquer" : "Publier"}</Button>
                <Button variant="destructive" size="sm" onClick={() => remove(t.id)}><Trash2 className="h-3 w-3" /></Button>
              </div>
            </CardContent></Card>
          ))}
        </div>
      )}
    </div>
  );
};
export default AdminTestimonials;
