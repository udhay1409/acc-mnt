
import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { 
  Truck, 
  FileText, 
  FileMinus, 
  FilePlus, 
  FileX, 
  RotateCcw, 
  ShoppingCart, 
  Calendar, 
  Wallet,
  Repeat,
  Receipt,
  Users
} from 'lucide-react';
import PlaceholderPage from '../PlaceholderPage';

// Tab interface for structured tab data
interface PurchasesTab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const Purchases = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('vendors');

  // Define all purchases tabs with icons
  const purchasesTabs: PurchasesTab[] = [
    { id: 'vendors', label: 'Vendors', icon: <Users className="h-4 w-4" /> },
    { id: 'expenses', label: 'Expenses', icon: <FileText className="h-4 w-4" /> },
    { id: 'recurring-expenses', label: 'Recurring Expenses', icon: <Repeat className="h-4 w-4" /> },
    { id: 'purchase-orders', label: 'Purchase Orders', icon: <ShoppingCart className="h-4 w-4" /> },
    { id: 'bills', label: 'Bills', icon: <Receipt className="h-4 w-4" /> },
    { id: 'payments-made', label: 'Payments Made', icon: <Wallet className="h-4 w-4" /> },
    { id: 'recurring-bills', label: 'Recurring Bills', icon: <Calendar className="h-4 w-4" /> },
    { id: 'vendor-credits', label: 'Vendor Credits', icon: <FileMinus className="h-4 w-4" /> },
    { id: 'purchase-returns', label: 'Purchase Returns', icon: <RotateCcw className="h-4 w-4" /> },
    { id: 'credit-notes', label: 'Credit Notes', icon: <FilePlus className="h-4 w-4" /> },
    { id: 'debit-notes', label: 'Debit Notes', icon: <FileX className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Purchase Management</h1>
        <p className="text-muted-foreground">
          Manage vendors, expenses, purchase orders, and bills
        </p>
      </div>
      
      <Separator />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="inline-flex min-w-full md:grid md:grid-cols-6 lg:grid-cols-11 h-auto">
            {purchasesTabs.map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="flex items-center gap-2 px-4 py-2"
              >
                {tab.icon}
                <span>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        <div className="mt-4">
          {purchasesTabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              <PlaceholderContent tabId={tab.id} tabLabel={tab.label} />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

// A placeholder component for each tab's content
const PlaceholderContent = ({ tabId, tabLabel }: { tabId: string, tabLabel: string }) => {
  return (
    <div className="border rounded-lg p-8 text-center">
      <h3 className="text-xl font-medium mb-2">{tabLabel} Module</h3>
      <p className="text-muted-foreground mb-4">
        This section will contain {tabLabel.toLowerCase()} management functionality.
      </p>
      <div className="flex justify-center">
        <div className="bg-muted w-full max-w-2xl h-64 rounded-md flex items-center justify-center">
          <p className="text-muted-foreground">
            {tabLabel} content will be implemented here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Purchases;
