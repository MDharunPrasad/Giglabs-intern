import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React from "react";
import Landing from "./pages/Landing";
import DashboardNew from "./pages/DashboardNew";
import Registration from "./pages/Registration";
import RegistrationSuccess from "./pages/RegistrationSuccess";
import BrowseCourses from "./pages/BrowseCourses";
import Certificate from "./pages/Certificate";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Students from "./pages/admin/Students";
import Courses from "./pages/admin/Courses";
import Tutors from "./pages/admin/Tutors";
import Batches from "./pages/admin/Batches";
import Payments from "./pages/admin/Payments";
import Settings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";
import { PageTransition } from "./components/PageTransition";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/dashboard" element={<PageTransition><DashboardNew /></PageTransition>} />
          <Route path="/registration" element={<PageTransition><Registration /></PageTransition>} />
          <Route path="/registration-success" element={<PageTransition><RegistrationSuccess /></PageTransition>} />
          <Route path="/browse-courses" element={<PageTransition><BrowseCourses /></PageTransition>} />
          <Route path="/certificate" element={<PageTransition><Certificate /></PageTransition>} />
          <Route path="/profile" element={<PageTransition><ProtectedRoute><Profile /></ProtectedRoute></PageTransition>} />
          <Route path="/admin" element={<PageTransition><ProtectedRoute><Admin /></ProtectedRoute></PageTransition>} />
          <Route path="/admin/students" element={<PageTransition><ProtectedRoute><Students /></ProtectedRoute></PageTransition>} />
          <Route path="/admin/courses" element={<PageTransition><ProtectedRoute><Courses /></ProtectedRoute></PageTransition>} />
          <Route path="/admin/tutors" element={<PageTransition><ProtectedRoute><Tutors /></ProtectedRoute></PageTransition>} />
          <Route path="/admin/batches" element={<PageTransition><ProtectedRoute><Batches /></ProtectedRoute></PageTransition>} />
          <Route path="/admin/payments" element={<PageTransition><ProtectedRoute><Payments /></ProtectedRoute></PageTransition>} />
          <Route path="/admin/settings" element={<PageTransition><ProtectedRoute><Settings /></ProtectedRoute></PageTransition>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
