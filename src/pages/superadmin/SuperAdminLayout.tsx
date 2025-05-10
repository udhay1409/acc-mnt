
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Shield, Building, Package, CreditCard, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const SuperAdminLayout = () => {
  const navItems = [
    { href: "/superadmin", label: "Dashboard", icon: <Shield className="mr-2 h-4 w-4" /> },
    { href: "/superadmin/organizations", label: "Organizations", icon: <Building className="mr-2 h-4 w-4" /> },
    { href: "/superadmin/subscription-plans", label: "Subscription Plans", icon: <Package className="mr-2 h-4 w-4" /> },
    { href: "/superadmin/payment-gateways", label: "Payment Gateways", icon: <CreditCard className="mr-2 h-4 w-4" /> },
    { href: "/superadmin/settings", label: "Advanced Settings", icon: <Settings className="mr-2 h-4 w-4" /> },
  ];

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-background border-r">
        <div className="p-4">
          <h2 className="text-lg font-bold flex items-center">
            <Shield className="mr-2 h-5 w-5 text-primary" />
            Super Admin
          </h2>
          <p className="text-xs text-muted-foreground">System Management</p>
        </div>
        <Separator />
        <div className="flex-1 py-4 space-y-1 px-2">
          {navItems.map((item) => (
            <NavLink
              to={item.href}
              end={item.href === "/superadmin"}
              key={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center px-3 py-2 text-sm rounded-md w-full",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                )
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 md:h-14 px-4 border-b flex items-center justify-between bg-background">
          <h1 className="md:hidden text-lg font-bold flex items-center">
            <Shield className="mr-2 h-5 w-5 text-primary" />
            Super Admin
          </h1>
          <div className="flex items-center ml-auto gap-4">
            <Button variant="outline" size="sm" asChild>
              <NavLink to="/">
                Return to Application
              </NavLink>
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
