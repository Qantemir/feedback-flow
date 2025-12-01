import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Lazy load pages for code splitting
const Welcome = lazy(() => import("./pages/Welcome"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const SendMessage = lazy(() => import("./pages/SendMessage"));
const CheckStatus = lazy(() => import("./pages/CheckStatus"));
const CompanyDashboard = lazy(() => import("./pages/CompanyDashboard"));
const CompanyMessages = lazy(() => import("./pages/company/CompanyMessages"));
const CompanyGrowth = lazy(() => import("./pages/company/CompanyGrowth"));
const CompanyReports = lazy(() => import("./pages/company/CompanyReports"));
const CompanyBilling = lazy(() => import("./pages/company/CompanyBilling"));
const CompanySettings = lazy(() => import("./pages/company/CompanySettings"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const AdminMessages = lazy(() => import("./pages/admin/AdminMessages"));
const AdminPlans = lazy(() => import("./pages/admin/AdminPlans"));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics"));
const AdminAdmins = lazy(() => import("./pages/admin/AdminAdmins"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Применяем полноэкранный режим при загрузке
const applyFullscreenOnLoad = () => {
  const companyFullscreen = localStorage.getItem("feedbackhub_fullscreen_mode_company");
  const adminFullscreen = localStorage.getItem("feedbackhub_fullscreen_mode_admin");
  
  if (companyFullscreen === "true" || adminFullscreen === "true") {
    document.body.classList.add("fullscreen-mode");
  }
};

// Применяем при загрузке
applyFullscreenOnLoad();

// Loading component for Suspense
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
              {/* Public routes */}
            <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            <Route path="/send-message" element={<SendMessage />} />
            <Route path="/check-status" element={<CheckStatus />} />
              
              {/* Company routes */}
              <Route
                path="/company"
                element={
                  <ProtectedRoute requiredRole="company">
                    <CompanyDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/company/messages"
                element={
                  <ProtectedRoute requiredRole="company">
                    <CompanyMessages />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/company/growth"
                element={
                  <ProtectedRoute requiredRole="company">
                    <CompanyGrowth />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/company/reports"
                element={
                  <ProtectedRoute requiredRole="company">
                    <CompanyReports />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/company/billing"
                element={
                  <ProtectedRoute requiredRole="company">
                    <CompanyBilling />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/company/settings"
                element={
                  <ProtectedRoute requiredRole="company">
                    <CompanySettings />
                  </ProtectedRoute>
                }
              />
              
              {/* Admin routes */}
              <Route
                path="/admin/messages"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminMessages />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/plans"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminPlans />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/analytics"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminAnalytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/admins"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminAdmins />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminSettings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />
              
              {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
