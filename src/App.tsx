import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React, { Suspense, lazy } from "react";
import { PageTransition } from "./components/PageTransition";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { AdminLayout } from "./components/AdminLayout";
import { TutorAdminLayout } from "./components/TutorAdminLayout";

// Lazy load pages for better performance
const Landing = lazy(() => import("./pages/Landing"));
const DashboardNew = lazy(() => import("./pages/DashboardNew"));
const Registration = lazy(() => import("./pages/Registration"));
const RegistrationSuccess = lazy(() => import("./pages/RegistrationSuccess"));
const BrowseCourses = lazy(() => import("./pages/BrowseCourses"));
const Certificate = lazy(() => import("./pages/Certificate"));
const Profile = lazy(() => import("./pages/Profile"));
const Login = lazy(() => import("./pages/Login"));
const Admin = lazy(() => import("./pages/Admin"));
const Students = lazy(() => import("./pages/admin/Students"));
const Courses = lazy(() => import("./pages/admin/Courses"));
const Tutors = lazy(() => import("./pages/admin/Tutors"));
const Batches = lazy(() => import("./pages/admin/Batches"));
const Payments = lazy(() => import("./pages/admin/Payments"));
const Settings = lazy(() => import("./pages/admin/Settings"));
const MyCourses = lazy(() => import("./pages/admin/MyCourses"));
const CourseViewer = lazy(() => import("./pages/admin/CourseViewer"));
const Assignments = lazy(() => import("./pages/admin/Assignments"));
const Certificates = lazy(() => import("./pages/admin/Certificates"));
const LiveClasses = lazy(() => import("./pages/admin/LiveClasses"));
const Materials = lazy(() => import("./pages/admin/Materials"));
const ProgressPage = lazy(() => import("./pages/admin/Progress"));
const TutorLiveSessions = lazy(() => import("./pages/tutor/TutorLiveSessions"));
const TutorModules = lazy(() => import("./pages/tutor/TutorModules"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ModuleViewer = lazy(() => import("./pages/ModuleViewer"));

const queryClient = new QueryClient();

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isTutorAdminRoute = location.pathname.startsWith('/tutor-admin');

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Tutor Admin routes with separate layout
  if (isTutorAdminRoute) {
    return (
      <TutorAdminLayout>
        <Suspense fallback={<LoadingFallback />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/tutor-admin" element={<Navigate to="/tutor-admin/live-sessions" replace />} />
              <Route path="/tutor-admin/live-sessions" element={<PageTransition><TutorLiveSessions /></PageTransition>} />
              <Route path="/tutor-admin/modules" element={<PageTransition><TutorModules /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </TutorAdminLayout>
    );
  }

  // Admin routes without navbar
  if (isAdminRoute) {
    return (
      <AdminLayout>
        <Suspense fallback={<LoadingFallback />}>
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
        </Suspense>
      </AdminLayout>
    );
  }

  // Public routes with navbar and footer
  return (
    <Layout>
      <Suspense fallback={<LoadingFallback />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
            <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
            <Route path="/dashboard" element={<PageTransition><DashboardNew /></PageTransition>} />
            <Route path="/registration" element={<PageTransition><Registration /></PageTransition>} />
            <Route path="/registration-success" element={<PageTransition><RegistrationSuccess /></PageTransition>} />
            <Route path="/browse-courses" element={<PageTransition><BrowseCourses /></PageTransition>} />
            <Route path="/certificate" element={<PageTransition><Certificate /></PageTransition>} />
            <Route path="/module/:moduleId" element={<PageTransition><ModuleViewer /></PageTransition>} />
            <Route path="/profile" element={<PageTransition><ProtectedRoute><Profile /></ProtectedRoute></PageTransition>} />
            <Route path="/admin" element={<PageTransition><ProtectedRoute><Admin /></ProtectedRoute></PageTransition>} />
            <Route path="/admin/students" element={<PageTransition><ProtectedRoute><Students /></ProtectedRoute></PageTransition>} />
            <Route path="/admin/courses" element={<PageTransition><ProtectedRoute><Courses /></ProtectedRoute></PageTransition>} />
            <Route path="/admin/tutors" element={<PageTransition><ProtectedRoute><Tutors /></ProtectedRoute></PageTransition>} />
            <Route path="/admin/batches" element={<PageTransition><ProtectedRoute><Batches /></ProtectedRoute></PageTransition>} />
            <Route path="/admin/payments" element={<PageTransition><ProtectedRoute><Payments /></ProtectedRoute></PageTransition>} />
            <Route path="/admin/settings" element={<PageTransition><ProtectedRoute><Settings /></ProtectedRoute></PageTransition>} />
            <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </Suspense>
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
