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
import Admin from "./pages/Admin";
import Students from "./pages/admin/Students";
import Courses from "./pages/admin/Courses";
import Tutors from "./pages/admin/Tutors";
import Batches from "./pages/admin/Batches";
import Payments from "./pages/admin/Payments";
import Settings from "./pages/admin/Settings";
import MyCourses from "./pages/admin/MyCourses";
import CourseViewer from "./pages/admin/CourseViewer";
import Assignments from "./pages/admin/Assignments";
import Certificates from "./pages/admin/Certificates";
import LiveClasses from "./pages/admin/LiveClasses";
import Materials from "./pages/admin/Materials";
import ProgressPage from "./pages/admin/Progress";
import NotFound from "./pages/NotFound";
import { PageTransition } from "./components/PageTransition";
import { Layout } from "./components/Layout";
import { AdminLayout } from "./components/AdminLayout";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Admin routes without navbar
  if (isAdminRoute) {
    return (
      <AdminLayout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
            <Route path="/admin/students" element={<PageTransition><Students /></PageTransition>} />
            <Route path="/admin/courses" element={<PageTransition><Courses /></PageTransition>} />
            <Route path="/admin/tutors" element={<PageTransition><Tutors /></PageTransition>} />
            <Route path="/admin/batches" element={<PageTransition><Batches /></PageTransition>} />
            <Route path="/admin/payments" element={<PageTransition><Payments /></PageTransition>} />
            <Route path="/admin/settings" element={<PageTransition><Settings /></PageTransition>} />
            {/* Student Routes */}
            <Route path="/admin/my-courses" element={<PageTransition><MyCourses /></PageTransition>} />
            <Route path="/admin/course/:courseId" element={<PageTransition><CourseViewer /></PageTransition>} />
            <Route path="/admin/assignments" element={<PageTransition><Assignments /></PageTransition>} />
            <Route path="/admin/certificates" element={<PageTransition><Certificates /></PageTransition>} />
            <Route path="/admin/live-classes" element={<PageTransition><LiveClasses /></PageTransition>} />
            <Route path="/admin/materials" element={<PageTransition><Materials /></PageTransition>} />
            <Route path="/admin/progress" element={<PageTransition><ProgressPage /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </AdminLayout>
    );
  }

  // Public routes with navbar and footer
  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
          <Route path="/dashboard" element={<PageTransition><DashboardNew /></PageTransition>} />
          <Route path="/registration" element={<PageTransition><Registration /></PageTransition>} />
          <Route path="/registration-success" element={<PageTransition><RegistrationSuccess /></PageTransition>} />
          <Route path="/browse-courses" element={<PageTransition><BrowseCourses /></PageTransition>} />
          <Route path="/certificate" element={<PageTransition><Certificate /></PageTransition>} />
          <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
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
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
