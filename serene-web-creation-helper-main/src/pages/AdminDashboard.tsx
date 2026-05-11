import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, FileText, Clock } from "lucide-react";

interface Stats {
  totalBookings: number;
  pendingBookings: number;
  totalContent: number;
  recentBookings: any[];
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    pendingBookings: 0,
    totalContent: 0,
    recentBookings: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Récupérer les statistiques des réservations
      const { data: bookings, error: bookingsError } = await supabase
        .from("bookings")
        .select("*");

      if (bookingsError) throw bookingsError;

      // Récupérer le nombre de contenus
      const { data: content, error: contentError } = await supabase
        .from("site_content" as any)
        .select("id");

      if (contentError) throw contentError;

      // Réservations récentes
      const { data: recentBookings, error: recentError } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (recentError) throw recentError;

      setStats({
        totalBookings: bookings?.length || 0,
        pendingBookings: bookings?.filter(b => b.status === 'pending').length || 0,
        totalContent: content?.length || 0,
        recentBookings: recentBookings || [],
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={`skeleton-${i}`}>
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
        <h2 className="text-2xl font-bold mb-2">Tableau de bord</h2>
        <p className="text-muted-foreground">
          Vue d'ensemble de votre site web et de vos réservations.
        </p>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total réservations</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              Toutes les demandes de rendez-vous
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingBookings}</div>
            <p className="text-xs text-muted-foreground">
              Réservations à traiter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contenus</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalContent}</div>
            <p className="text-xs text-muted-foreground">
              Éléments de contenu gérés
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Réservations récentes */}
      {stats.recentBookings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Réservations récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{booking.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {booking.service} • {booking.date} à {booking.time}
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    booking.status === 'pending' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : booking.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {booking.status === 'pending' ? 'En attente' : 
                     booking.status === 'confirmed' ? 'Confirmée' : 'Annulée'}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminDashboard;