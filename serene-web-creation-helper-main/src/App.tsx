import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AdminAuthProvider } from "@/hooks/useAdminAuth";
import Index from "./pages/Index";
import Sophrologie from "./pages/Sophrologie";
import Hypnose from "./pages/Hypnose";
import Entreprise from "./pages/Entreprise";
import ContactPage from "./pages/ContactPage";
import GroupClasses from "./pages/GroupClasses";
import PublicMediaLibrary from "./pages/PublicMediaLibrary";
import Reservation from "./pages/Reservation";
import UserAuth from "./pages/UserAuth";
import MonEspace from "./pages/MonEspace";
import TableauDeBord from "./pages/TableauDeBord";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AdminAuth from "./pages/AdminAuth";
import AdminDashboard from "./pages/AdminDashboard";
import AdminContent from "./pages/AdminContent";
import AdminBookings from "./pages/AdminBookings";
import AdminMedia from "./pages/AdminMedia";
import AdminArticles from "./pages/AdminArticles";
import AdminStatistics from "./pages/AdminStatistics";
import ArticleDetail from "./pages/ArticleDetail";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import ResetPassword from "./pages/ResetPassword";
import CookieBanner from "./components/CookieBanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AdminAuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          
          <BrowserRouter>
                      <CookieBanner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/sophrologie" element={<Sophrologie />} />
              <Route path="/hypnose" element={<Hypnose />} />
              <Route path="/entreprise" element={<Entreprise />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cours-collectifs" element={<GroupClasses />} />
              <Route path="/mediatheque" element={<PublicMediaLibrary />} />
              <Route path="/article/:slug" element={<ArticleDetail />} />
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/auth" element={<UserAuth />} />
              <Route path="/mon-espace" element={<MonEspace />} />
              <Route path="/mon-espace/tableau-de-bord" element={<TableauDeBord />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
              <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
              <Route path="/admin/auth" element={<AdminAuth />} />
              <Route path="/admin" element={<Admin />}>
                <Route index element={<AdminDashboard />} />
                <Route path="content" element={<AdminContent />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="media" element={<AdminMedia />} />
                <Route path="articles" element={<AdminArticles />} />
                <Route path="statistics" element={<AdminStatistics />} />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AdminAuthProvider>
    </AuthProvider>
  </QueryClientProvider>
);
export default App;
