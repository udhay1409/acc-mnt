
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import Dashboard from '@/pages/Dashboard';
import PointOfSale from '@/pages/modules/PointOfSale';
import Inventory from '@/pages/modules/Inventory';
import Sales from '@/pages/modules/Sales';
import Purchases from '@/pages/modules/Purchases';
import Accounting from '@/pages/modules/Accounting';
import CRM from '@/pages/modules/CRM';
import WhatsApp from '@/pages/modules/WhatsApp';
import Reports from '@/pages/modules/Reports';
import TaxManagement from '@/pages/modules/TaxManagement';
import EWaybill from '@/pages/modules/EWaybill';
import GSTEFiling from '@/pages/modules/GSTEFiling';
import UserManagement from '@/pages/UserManagement';
import Settings from '@/pages/modules/Settings';
import SuperAdminLayout from '@/pages/superadmin/SuperAdminLayout';
import SuperAdminDashboard from '@/pages/superadmin/SuperAdminDashboard';
import OrganizationsList from '@/pages/superadmin/OrganizationsList';
import SubscriptionPlans from '@/pages/superadmin/SubscriptionPlans';
import PaymentGateways from '@/pages/superadmin/PaymentGateways';
import SMTPSettings from '@/pages/superadmin/SMTPSettings';
import WhatsAppSettings from '@/pages/superadmin/WhatsAppSettings';
import AdvancedSettings from '@/pages/superadmin/AdvancedSettings';
import Login from '@/pages/Login';
import { useAuth } from '@/contexts/AuthContext';
import NotFound from '@/pages/NotFound';

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Login />;
  }

  // Check if user has superadmin role
  if (user?.role === 'superadmin') {
    return (
      <Routes>
        <Route element={<SuperAdminLayout />}>
          <Route path="/superadmin" element={<SuperAdminDashboard />} />
          <Route path="/superadmin/organizations" element={<OrganizationsList />} />
          <Route path="/superadmin/subscription-plans" element={<SubscriptionPlans />} />
          <Route path="/superadmin/payment-gateways" element={<PaymentGateways />} />
          <Route path="/superadmin/smtp-settings" element={<SMTPSettings />} />
          <Route path="/superadmin/whatsapp-settings" element={<WhatsAppSettings />} />
          <Route path="/superadmin/settings" element={<AdvancedSettings />} />
        </Route>
        <Route path="*" element={<Navigate to="/superadmin" replace />} />
      </Routes>
    );
  }

  // Regular user routes
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pos" element={<PointOfSale />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/accounting" element={<Accounting />} />
        <Route path="/crm" element={<CRM />} />
        <Route path="/whatsapp" element={<WhatsApp />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/tax" element={<TaxManagement />} />
        <Route path="/e-waybill" element={<EWaybill />} />
        <Route path="/gst-efiling" element={<GSTEFiling />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Index;
