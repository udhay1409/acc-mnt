
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { TenantProvider } from "@/contexts/TenantContext";
import { WhatsAppProvider } from "@/contexts/WhatsAppContext";

// Layout
import AppLayout from "@/components/layout/AppLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import SuperAdminLayout from "@/pages/superadmin/SuperAdminLayout";

// Super Website - Landing Page
import SuperWebsite from "@/pages/SuperWebsite";

// Auth Pages
import Login from "@/pages/Login";
import Registration from "@/pages/Registration";
import Unauthorized from "@/pages/Unauthorized";

// Dashboard
import Dashboard from "@/pages/Dashboard";

// User Management
import UserManagement from "@/pages/UserManagement";

// Organization Management
import OrganizationsPage from "@/pages/OrganizationsPage";

// Module Pages
import PointOfSale from "@/pages/modules/PointOfSale";
import Accounting from "@/pages/modules/Accounting";
import Inventory from "@/pages/modules/Inventory";
import Sales from "@/pages/modules/Sales";
import Purchases from "@/pages/modules/Purchases";
import CRM from "@/pages/modules/CRM";
import WhatsApp from "@/pages/modules/WhatsApp";
import TaxManagement from "@/pages/modules/TaxManagement";
import Reports from "@/pages/modules/Reports";
import SettingsPage from "@/pages/modules/Settings";

// Super Admin Pages
import SuperAdminDashboard from "@/pages/superadmin/SuperAdminDashboard";
import OrganizationsList from "@/pages/superadmin/OrganizationsList";
import SubscriptionPlans from "@/pages/superadmin/SubscriptionPlans";
import PaymentGateways from "@/pages/superadmin/PaymentGateways";
import AdvancedSettings from "@/pages/superadmin/AdvancedSettings";
import SMTPSettings from "@/pages/superadmin/SMTPSettings";
import WhatsAppSettings from "@/pages/superadmin/WhatsAppSettings";

// Not Found
import NotFound from "./pages/NotFound";

// Subscription Page
import SubscriptionPage from './pages/SubscriptionPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <TenantProvider>
              <WhatsAppProvider>
                <Routes>
                  {/* Home/Landing Page */}
                  <Route path="/" element={<SuperWebsite />} />
                  
                  {/* Public Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Registration />} />
                  <Route path="/unauthorized" element={<Unauthorized />} />
                  
                  {/* Super Admin Routes - Now protected with admin role */}
                  <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                    <Route path="/superadmin" element={<SuperAdminLayout />}>
                      <Route index element={<SuperAdminDashboard />} />
                      <Route path="organizations" element={<OrganizationsList />} />
                      <Route path="subscription-plans" element={<SubscriptionPlans />} />
                      <Route path="payment-gateways" element={<PaymentGateways />} />
                      <Route path="smtp-settings" element={<SMTPSettings />} />
                      <Route path="whatsapp-settings" element={<WhatsAppSettings />} />
                      <Route path="settings" element={<AdvancedSettings />} />
                    </Route>
                  </Route>
                  
                  {/* Protected Routes */}
                  <Route element={<AppLayout />}>
                    {/* Dashboard is now at /dashboard instead of / */}
                    <Route element={<ProtectedRoute />}>
                      <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                    
                    {/* Organization Management - accessible to all authenticated users */}
                    <Route element={<ProtectedRoute />}>
                      <Route path="/organizations" element={<OrganizationsPage />} />
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
                    
                    {/* Sales Manager Routes */}
                    <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                      <Route path="/sales" element={<Sales />} />
                    </Route>
                    
                    {/* Purchase Manager Routes */}
                    <Route element={<ProtectedRoute allowedRoles={["admin", "purchase_manager"]} />}>
                      <Route path="/purchases" element={<Purchases />} />
                    </Route>
                    
                    {/* CRM Routes - Accessible to multiple roles */}
                    <Route element={<ProtectedRoute allowedRoles={["admin", "accountant", "purchase_manager"]} />}>
                      <Route path="/crm" element={<CRM />} />
                    </Route>
                    
                    {/* WhatsApp Integration Routes */}
                    <Route element={<ProtectedRoute allowedRoles={["admin", "accountant", "purchase_manager"]} />}>
                      <Route path="/whatsapp" element={<WhatsApp />} />
                    </Route>
                    
                    {/* Subscription Page */}
                    <Route path="/subscription" element={<SubscriptionPage />} />
                    
                    {/* 404 Not Found */}
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </WhatsAppProvider>
            </TenantProvider>
          </AuthProvider>
        </BrowserRouter>
        
        {/* Toast components placed at the app root */}
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
