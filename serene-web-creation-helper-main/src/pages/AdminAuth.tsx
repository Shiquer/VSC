import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminAuthForm from "@/components/AdminAuthForm";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const AdminAuth = () => {
  const navigate = useNavigate();
  const { user, loading } = useAdminAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate("/admin");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Chargement…</p>
        </div>
      </div>
    );
  }

  const handleAuthSuccess = () => {
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Interface d'administration
          </h1>
          <p className="text-muted-foreground">
            Accès réservé aux administrateurs
          </p>
        </div>
        <AdminAuthForm onAuthSuccess={handleAuthSuccess} />
      </div>
    </div>
  );
};

export default AdminAuth;