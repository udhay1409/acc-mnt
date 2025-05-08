
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ShoppingCart, BookOpen, Package, Truck, Users, Percent, Receipt } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  // Welcome message based on the time of day
  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {getWelcomeMessage()}, {user?.name}!
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of your business today.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Sales Today</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.00</div>
            <p className="text-xs text-muted-foreground">
              0 transactions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Outstanding Invoices</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.00</div>
            <p className="text-xs text-muted-foreground">
              0 pending invoices
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.00</div>
            <p className="text-xs text-muted-foreground">
              0 items in stock
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pending Purchases</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.00</div>
            <p className="text-xs text-muted-foreground">
              0 pending orders
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              0 active customers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Tax Liability</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.00</div>
            <p className="text-xs text-muted-foreground">
              Current period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Module Access Cards */}
      <h2 className="text-xl font-semibold mt-8 mb-4">Quick Access</h2>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {/* These cards will be conditional based on user role */}
        {(user?.role === 'admin' || user?.role === 'cashier') && (
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <ShoppingCart className="h-10 w-10 text-bizblue-500 mb-2" />
              <CardTitle className="text-center text-sm">Point of Sale</CardTitle>
            </CardContent>
          </Card>
        )}
        
        {(user?.role === 'admin' || user?.role === 'accountant') && (
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <BookOpen className="h-10 w-10 text-bizblue-500 mb-2" />
              <CardTitle className="text-center text-sm">Accounting</CardTitle>
            </CardContent>
          </Card>
        )}
        
        {(user?.role === 'admin' || user?.role === 'inventory_manager') && (
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <Package className="h-10 w-10 text-bizblue-500 mb-2" />
              <CardTitle className="text-center text-sm">Inventory</CardTitle>
            </CardContent>
          </Card>
        )}
        
        {/* Add Sales module quick access */}
        {(user?.role === 'admin') && (
          <Link to="/sales">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <Receipt className="h-10 w-10 text-bizblue-500 mb-2" />
                <CardTitle className="text-center text-sm">Sales</CardTitle>
              </CardContent>
            </Card>
          </Link>
        )}
        
        {(user?.role === 'admin' || user?.role === 'purchase_manager') && (
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <Truck className="h-10 w-10 text-bizblue-500 mb-2" />
              <CardTitle className="text-center text-sm">Purchases</CardTitle>
            </CardContent>
          </Card>
        )}
        
        {(user?.role === 'admin' || user?.role === 'accountant' || user?.role === 'purchase_manager') && (
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <Users className="h-10 w-10 text-bizblue-500 mb-2" />
              <CardTitle className="text-center text-sm">CRM</CardTitle>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
