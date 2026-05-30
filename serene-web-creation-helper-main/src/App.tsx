import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AdminAuthProvider } from "@/hooks/useAdminAuth";
import CookieBanner from "@/components/CookieBanner";
import Index from "./pages/Index";
import Sophrologie from "./pages/Sophrologie";
import Hypnose from "./pages/Hypnose";
import Entreprise from "./pages/Entreprise";
import Reservation from "./pages/Reservation";
import ContactPage from "./pages/ContactPage";
import GroupClasses from "./pages/GroupClasses";
import PublicMediaLibrary from "./pages/PublicMediaLibrary";
import MediaLibrary from "./pages/MediaLibrary";
import Articles from "./pages/Articles";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
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
import AdminMediaLibrary from "./pages/AdminMediaLibrary";
import AdminArticles from "./pages/AdminArticles";
import AdminStatistics from "./pages/AdminStatistics";
import AdminMessages from "./pages/AdminMessages";
import AdminTestimonials from "./pages/AdminTestimonials";
import AdminSettings from "./pages/AdminSettings";
import ArticleDetail from "./pages/ArticleDetail";
import ResetPassword from "./pages/ResetPassword";

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
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/seances-collectives" element={<GroupClasses />} />
              <Route path="/bibliotheque-publique" element={<PublicMediaLibrary />} />
              <Route path="/mediatheque" element={<MediaLibrary />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:slug" element={<ArticleDetail />} />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
              <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
              <Route path="/auth" element={<UserAuth />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/mon-espace" element={<MonEspace />} />
              <Route path="/mon-espace/tableau-de-bord" element={<TableauDeBord />} />
              <Route path="/admin/auth" element={<AdminAuth />} />
              <Route path="/admin" element={<Admin />}>
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="content" element={<AdminContent />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="media" element={<AdminMedia />} />
                <Route path="media-library" element={<AdminMediaLibrary />} />
                <Route path="articles" element={<AdminArticles />} />
                <Route path="statistics" element={<AdminStatistics />} />
                <Route path="messages" element={<AdminMessages />} />
                <Route path="testimonials" element={<AdminTestimonials />} />
                <Route path="settings" element={<AdminSettings />} />
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
