import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SendMessage from "./pages/SendMessage";
import CheckStatus from "./pages/CheckStatus";
import CompanyDashboard from "./pages/CompanyDashboard";
import CompanyMessages from "./pages/company/CompanyMessages";
import CompanyGrowth from "./pages/company/CompanyGrowth";
import CompanyReports from "./pages/company/CompanyReports";
import CompanyBilling from "./pages/company/CompanyBilling";
import CompanySettings from "./pages/company/CompanySettings";
import AdminPanel from "./pages/AdminPanel";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminPlans from "./pages/admin/AdminPlans";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminAdmins from "./pages/admin/AdminAdmins";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
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
            
            {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
