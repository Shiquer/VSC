import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, BookOpen, Image, BarChart3, TrendingUp, MessageSquare, Star } from "lucide-react";

interface Statistics {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalMedia: number;
  publishedMedia: number;
  totalContent: number;
  totalMessages: number;
  unreadMessages: number;
  totalTestimonials: number;
  publishedTestimonials: number;
}

const StatCard = ({ title, value, sub, icon: Icon, color }: {
  title: string; value: number; sub?: string; icon: React.ElementType; color: string;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className={`h-4 w-4 ${color}`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
    </CardContent>
  </Card>
);

const AdminStatistics = () => {
  const [stats, setStats] = useState<Statistics>({
    totalBookings: 0, pendingBookings: 0, confirmedBookings: 0, cancelledBookings: 0,
    totalArticles: 0, publishedArticles: 0, draftArticles: 0,
    totalMedia: 0, publishedMedia: 0, totalContent: 0,
    totalMessages: 0, unreadMessages: 0, totalTestimonials: 0, publishedTestimonials: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { fetchStatistics(); }, []);

  const fetchStatistics = async () => {
    try {
      const [bookingsRes, articlesRes, mediaRes, contentRes, messagesRes, testimonialsRes] = await Promise.all([
        supabase.from("bookings").select("status"),
        supabase.from("articles").select("id, status"),
        supabase.from("media_content").select("id, status"),
        supabase.from("site_content" as any).select("id"),
        supabase.from("contact_messages" as any).select("id, is_read"),
        supabase.from("testimonials" as any).select("id, is_published"),
      ]);

      const bookings = bookingsRes.data || [];
      const articles = articlesRes.data || [];
      const media = mediaRes.data || [];
      const content = contentRes.data || [];
      const messages = messagesRes.data || [];
      const testimonials = testimonialsRes.data || [];

      if (articlesRes.error) console.error("articles error:", articlesRes.error);
      if (messagesRes.error) console.error("messages error:", messagesRes.error);
      if (testimonialsRes.error) console.error("testimonials error:", testimonialsRes.error);

      setStats({
        totalBookings: bookings.length,
        pendingBookings: bookings.filter((b: any) => b.status === "pending").length,
        confirmedBookings: bookings.filter((b: any) => b.status === "confirmed").length,
        cancelledBookings: bookings.filter((b: any) => b.status === "cancelled").length,
        totalArticles: articles.length,
        publishedArticles: articles.filter((a: any) => a.status === "published").length,
        draftArticles: articles.filter((a: any) => a.status === "draft").length,
        totalMedia: media.length,
        publishedMedia: media.filter((m: any) => m.status === "published").length,
        totalContent: content.length,
        totalMessages: messages.length,
        unreadMessages: messages.filter((m: any) => !m.is_read).length,
        totalTestimonials: testimonials.length,
        publishedTestimonials: testimonials.filter((t: any) => t.is_published === true).length,
      });
    } catch (err) {
      console.error("Erreur stats:", err);
      setError("Erreur lors du chargement des statistiques.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );

  if (error) return (
    <div className="p-4 text-red-500">{error}</div>
  );

  const publishedPct = stats.totalArticles > 0
    ? Math.round((stats.publishedArticles / stats.totalArticles) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Statistiques</h1>
        <p className="text-muted-foreground">Vue d'ensemble des données de votre site.</p>
      </div>

      {/* Réservations */}
      <div>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" /> Réservations
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Total" value={stats.totalBookings} icon={Calendar} color="text-primary" />
          <StatCard title="En attente" value={stats.pendingBookings} icon={Calendar} color="text-orange-500"
            sub={stats.totalBookings > 0 ? `${Math.round(stats.pendingBookings / stats.totalBookings * 100)}% du total` : undefined} />
          <StatCard title="Confirmées" value={stats.confirmedBookings} icon={Calendar} color="text-green-500" />
          <StatCard title="Annulées" value={stats.cancelledBookings} icon={Calendar} color="text-red-500" />
        </div>
      </div>

      {/* Articles */}
      <div>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" /> Articles
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <StatCard title="Total articles" value={stats.totalArticles} icon={FileText} color="text-primary" />
          <StatCard title="Publiés" value={stats.publishedArticles} icon={TrendingUp} color="text-green-500"
            sub={`${publishedPct}% du total`} />
          <StatCard title="Brouillons" value={stats.draftArticles} icon={FileText} color="text-gray-400" />
        </div>
      </div>

      {/* Messages & Témoignages */}
      <div>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" /> Messages & Témoignages
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Messages reçus" value={stats.totalMessages} icon={MessageSquare} color="text-blue-500" />
          <StatCard title="Non lus" value={stats.unreadMessages} icon={MessageSquare} color="text-orange-500" />
          <StatCard title="Témoignages" value={stats.totalTestimonials} icon={Star} color="text-yellow-500" />
          <StatCard title="Publiés" value={stats.publishedTestimonials} icon={Star} color="text-green-500" />
        </div>
      </div>

      {/* Contenu & Médias */}
      <div>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Image className="h-5 w-5 text-primary" /> Contenu & Médias
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Éléments de contenu" value={stats.totalContent} icon={BarChart3} color="text-primary" />
          <StatCard title="Total médias" value={stats.totalMedia} icon={Image} color="text-purple-500" />
          <StatCard title="Médias publiés" value={stats.publishedMedia} icon={Image} color="text-green-500" />
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
