
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Layout
import AppLayout from "@/components/layout/AppLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

// Auth Pages
import Login from "@/pages/Login";
import Unauthorized from "@/pages/Unauthorized";

// Dashboard
import Dashboard from "@/pages/Dashboard";

// User Management
import UserManagement from "@/pages/UserManagement";

// Module Pages
import PointOfSale from "@/pages/modules/PointOfSale";
import Accounting from "@/pages/modules/Accounting";
import Inventory from "@/pages/modules/Inventory";
import Purchases from "@/pages/modules/Purchases";
import CRM from "@/pages/modules/CRM";
import TaxManagement from "@/pages/modules/TaxManagement";
import Reports from "@/pages/modules/Reports";
import SettingsPage from "@/pages/modules/Settings";

// Not Found
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Protected Routes */}
            <Route element={<AppLayout />}>
              {/* Redirect root to dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" />} />
              
              {/* All authenticated users can access dashboard */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              
              {/* Role-specific routes */}
              
              {/* Admin Routes */}
              <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route path="/users" element={<UserManagement />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>
              
              {/* Cashier Routes */}
              <Route element={<ProtectedRoute allowedRoles={["admin", "cashier"]} />}>
                <Route path="/pos" element={<PointOfSale />} />
              </Route>
              
              {/* Accountant Routes */}
              <Route element={<ProtectedRoute allowedRoles={["admin", "accountant"]} />}>
                <Route path="/accounting" element={<Accounting />} />
                <Route path="/tax" element={<TaxManagement />} />
                <Route path="/reports" element={<Reports />} />
              </Route>
              
              {/* Inventory Manager Routes */}
              <Route element={<ProtectedRoute allowedRoles={["admin", "inventory_manager"]} />}>
                <Route path="/inventory" element={<Inventory />} />
              </Route>
              
              {/* Purchase Manager Routes */}
              <Route element={<ProtectedRoute allowedRoles={["admin", "purchase_manager"]} />}>
                <Route path="/purchases" element={<Purchases />} />
              </Route>
              
              {/* CRM Routes - Accessible to multiple roles */}
              <Route element={<ProtectedRoute allowedRoles={["admin", "accountant", "purchase_manager"]} />}>
                <Route path="/crm" element={<CRM />} />
              </Route>
              
              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
