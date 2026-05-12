import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, BookOpen, Image, BarChart3, TrendingUp } from "lucide-react";

interface Statistics {
    totalBookings: number;
    pendingBookings: number;
    confirmedBookings: number;
    cancelledBookings: number;
    totalArticles: number;
    publishedArticles: number;
    totalMedia: number;
    totalContent: number;
}

const AdminStatistics = () => {
    const [stats, setStats] = useState<Statistics>({
          totalBookings: 0,
          pendingBookings: 0,
          confirmedBookings: 0,
          cancelledBookings: 0,
          totalArticles: 0,
          publishedArticles: 0,
          totalMedia: 0,
          totalContent: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
          fetchStatistics();
    }, []);

    const fetchStatistics = async () => {
          try {
                  const [bookingsRes, articlesRes, mediaRes, contentRes] = await Promise.all([
                            supabase.from("bookings").select("status"),
                            supabase.from("articles").select("status"),
                            supabase.from("media_content").select("id"),
                            supabase.from("site_content" as any).select("id"),
                          ]);

            const bookings = bookingsRes.data || [];
                  const articles = articlesRes.data || [];
                  const media = mediaRes.data || [];
                  const content = contentRes.data || [];

            setStats({
                      totalBookings: bookings.length,
                      pendingBookings: bookings.filter((b) => b.status === "pending").length,
                      confirmedBookings: bookings.filter((b) => b.status === "confirmed").length,
                      cancelledBookings: bookings.filter((b) => b.status === "cancelled").length,
                      totalArticles: articles.length,
                      publishedArticles: articles.filter((a) => a.status === "published").length,
                      totalMedia: media.length,
                      totalContent: content.length,
            });
          } catch (error) {
                  console.error("Erreur lors du chargement des statistiques:", error);
          } finally {
                  setLoading(false);
          }
    };

    if (loading) {
          return (
                  <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {["a", "b", "c", "d"].map((k) => (
                                <Card key={k}>
                                              <CardContent className="p-6">
                                                              <div className="animate-pulse space-y-3">
                                                                                <div className="h-4 bg-muted rounded w-2/3"></div>
                                                                                <div className="h-8 bg-muted rounded w-1/3"></div>
                                                              </div>
                                              </CardContent>
                                </Card>
                              ))}
                          </div>
                  </div>
                );
    }
  
    return (
          <div className="space-y-6">
                <div>
                        <h2 className="text-2xl font-bold mb-2">Statistiques</h2>
                        <p className="text-muted-foreground">
                                  Vue d'ensemble des données de votre site.
                        </p>
                </div>
          
            {/* Réservations */}
                <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                  <Calendar className="h-5 w-5" /> Réservations
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                  <Card>
                                              <CardHeader className="pb-2">
                                                            <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
                                              </CardHeader>
                                              <CardContent>
                                                            <div className="text-3xl font-bold">{stats.totalBookings}</div>
                                              </CardContent>
                                  </Card>
                                  <Card>
                                              <CardHeader className="pb-2">
                                                            <CardTitle className="text-sm font-medium text-yellow-600">En attente</CardTitle>
                                              </CardHeader>
                                              <CardContent>
                                                            <div className="text-3xl font-bold text-yellow-600">{stats.pendingBookings}</div>
                                              </CardContent>
                                  </Card>
                                  <Card>
                                              <CardHeader className="pb-2">
                                                            <CardTitle className="text-sm font-medium text-green-600">Confirmées</CardTitle>
                                              </CardHeader>
                                              <CardContent>
                                                            <div className="text-3xl font-bold text-green-600">{stats.confirmedBookings}</div>
                                              </CardContent>
                                  </Card>
                                  <Card>
                                              <CardHeader className="pb-2">
                                                            <CardTitle className="text-sm font-medium text-red-600">Annulées</CardTitle>
                                              </CardHeader>
                                              <CardContent>
                                                            <div className="text-3xl font-bold text-red-600">{stats.cancelledBookings}</div>
                                              </CardContent>
                                  </Card>
                        </div>
                </div>
          
            {/* Articles */}
                <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                  <BookOpen className="h-5 w-5" /> Articles
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <Card>
                                              <CardHeader className="pb-2">
                                                            <CardTitle className="text-sm font-medium text-muted-foreground">Total articles</CardTitle>
                                              </CardHeader>
                                              <CardContent>
                                                            <div className="text-3xl font-bold">{stats.totalArticles}</div>
                                              </CardContent>
                                  </Card>
                                  <Card>
                                              <CardHeader className="pb-2">
                                                            <CardTitle className="text-sm font-medium text-green-600">Publiés</CardTitle>
                                              </CardHeader>
                                              <CardContent>
                                                            <div className="text-3xl font-bold text-green-600">{stats.publishedArticles}</div>
                                                {stats.totalArticles > 0 && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {Math.round((stats.publishedArticles / stats.totalArticles) * 100)}% du total
                            </p>
                                                            )}
                                              </CardContent>
                                  </Card>
                        </div>
                </div>
          
            {/* Contenus & Médias */}
                <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                  <BarChart3 className="h-5 w-5" /> Contenu & Médias
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <Card>
                                              <CardHeader className="pb-2">
                                                            <CardTitle className="text-sm font-medium text-muted-foreground">Éléments de contenu</CardTitle>
                                              </CardHeader>
                                              <CardContent>
                                                            <div className="text-3xl font-bold">{stats.totalContent}</div>
                                              </CardContent>
                                  </Card>
                                  <Card>
                                              <CardHeader className="pb-2">
                                                            <CardTitle className="text-sm font-medium text-muted-foreground">Médias</CardTitle>
                                              </CardHeader>
                                              <CardContent>
                                                            <div className="text-3xl font-bold">{stats.totalMedia}</div>
                                              </CardContent>
                                  </Card>
                        </div>
                </div>
          </div>
        );
};

export default AdminStatistics;
