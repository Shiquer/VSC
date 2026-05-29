import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import CookieBanner from "@/components/CookieBanner";

const Index = lazy(() => import("./pages/Index"));
const Sophrologie = lazy(() => import("./pages/Sophrologie"));
const Hypnose = lazy(() => import("./pages/Hypnose"));
const Entreprise = lazy(() => import("./pages/Entreprise"));
const Reservation = lazy(() => import("./pages/Reservation"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const MediaLibrary = lazy(() => import("./pages/MediaLibrary"));
const MentionsLegales = lazy(() => import("./pages/MentionsLegales"));
const PolitiqueConfidentialite = lazy(() => import("./pages/PolitiqueConfidentialite"));
const GroupClasses = lazy(() => import("./pages/GroupClasses"));
const PublicMediaLibrary = lazy(() => import("./pages/PublicMediaLibrary"));
const MonEspace = lazy(() => import("./pages/MonEspace"));
const TableauDeBord = lazy(() => import("./pages/TableauDeBord"));
const UserAuth = lazy(() => import("./pages/UserAuth"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ArticleDetail = lazy(() => import("./pages/ArticleDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

const Admin = lazy(() => import("./pages/Admin"));
const AdminAuth = lazy(() => import("./pages/AdminAuth"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminContent = lazy(() => import("./pages/AdminContent"));
const AdminBookings = lazy(() => import("./pages/AdminBookings"));
const AdminMedia = lazy(() => import("./pages/AdminMedia"));
const AdminMediaLibrary = lazy(() => import("./pages/AdminMediaLibrary"));
const AdminArticles = lazy(() => import("./pages/AdminArticles"));
const AdminStatistics = lazy(() => import("./pages/AdminStatistics"));
const AdminMessages = lazy(() => import("./pages/AdminMessages"));
const AdminTestimonials = lazy(() => import("./pages/AdminTestimonials"));
const AdminSettings = lazy(() => import("./pages/AdminSettings"));

const queryClient = new QueryClient();

const Spinner = () => <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CookieBanner />
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sophrologie" element={<Sophrologie />} />
            <Route path="/hypnose" element={<Hypnose />} />
            <Route path="/entreprise" element={<Entreprise />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/mediatheque" element={<MediaLibrary />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
            <Route path="/seances-collectives" element={<GroupClasses />} />
            <Route path="/bibliotheque-publique" element={<PublicMediaLibrary />} />
            <Route path="/mon-espace" element={<MonEspace />} />
            <Route path="/tableau-de-bord" element={<TableauDeBord />} />
            <Route path="/auth" element={<UserAuth />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/articles/:slug" element={<ArticleDetail />} />
            <Route path="/admin" element={<Admin />}>
              <Route index element={<AdminAuth />} />
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
