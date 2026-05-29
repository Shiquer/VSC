import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Mail, Phone, Check, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const AdminMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const { toast } = useToast();

  useEffect(() => { fetchMessages(); }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data, error } = await (supabase.from("contact_messages" as any).select("*").order("created_at", { ascending: false }) as any);
      if (error) throw error;
      setMessages(data || []);
    } catch {
      toast({ title: "Erreur", description: "Impossible de charger les messages.", variant: "destructive" });
    } finally { setLoading(false); }
  };

  const markAsRead = async (id: string) => {
    await (supabase.from("contact_messages" as any).update({ is_read: true } as any).eq("id", id) as any);
    setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: true } : m));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, is_read: true } : null);
    toast({ title: "Marqué comme lu" });
  };

  const deleteMessage = async (id: string) => {
    await (supabase.from("contact_messages" as any).delete().eq("id", id) as any);
    setMessages(prev => prev.filter(m => m.id !== id));
    if (selected?.id === id) setSelected(null);
    toast({ title: "Message supprimé" });
  };

  const openMessage = (msg: ContactMessage) => {
    setSelected(msg);
    if (!msg.is_read) markAsRead(msg.id);
  };

  const unreadCount = messages.filter(m => !m.is_read).length;

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Messages de contact</h1>
        <p className="text-muted-foreground">
          {messages.length} message{messages.length !== 1 ? "s" : ""}
          {unreadCount > 0 && <span className="ml-2 text-orange-500 font-medium">· {unreadCount} non lu{unreadCount !== 1 ? "s" : ""}</span>}
        </p>
      </div>

      {messages.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Aucun message reçu pour l'instant.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1 space-y-2">
            {messages.map(msg => (
              <Card
                key={msg.id}
                className={`cursor-pointer transition-all hover:shadow-md ${selected?.id === msg.id ? "border-primary ring-1 ring-primary" : ""} ${!msg.is_read ? "bg-blue-50/50 border-blue-200" : ""}`}
                onClick={() => openMessage(msg)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {!msg.is_read && <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />}
                        <p className={`text-sm font-medium truncate ${!msg.is_read ? "font-semibold" : ""}`}>{msg.name}</p>
                      </div>
                      {msg.subject && <p className="text-xs text-muted-foreground truncate mt-0.5">{msg.subject}</p>}
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{msg.message}</p>
                    </div>
                    <p className="text-xs text-muted-foreground flex-shrink-0">
                      {new Date(msg.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="md:col-span-2">
            {selected ? (
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{selected.name}</CardTitle>
                      {selected.subject && <p className="text-sm text-muted-foreground mt-1">{selected.subject}</p>}
                    </div>
                    <div className="flex gap-2">
                      {!selected.is_read && (
                        <Button variant="outline" size="sm" onClick={() => markAsRead(selected.id)}>
                          <Check className="h-4 w-4 mr-1" /> Marquer lu
                        </Button>
                      )}
                      <Button variant="destructive" size="sm" onClick={() => deleteMessage(selected.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Mail className="h-3 w-3" /><a href={`mailto:${selected.email}`} className="text-primary hover:underline">{selected.email}</a></span>
                    {selected.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{selected.phone}</span>}
                    <span>{new Date(selected.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</div>
                  <div className="mt-4">
                    <a href={`mailto:${selected.email}?subject=Re: ${selected.subject || "Votre message"}`}>
                      <Button size="sm"><Mail className="h-4 w-4 mr-2" /> Répondre par email</Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
                  <Eye className="h-10 w-10 mb-3 opacity-30" />
                  <p>Sélectionnez un message pour le lire</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
