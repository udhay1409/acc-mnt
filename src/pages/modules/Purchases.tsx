
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

// Import our purchases components
import VendorsList from '@/components/purchases/VendorsList';
import ExpensesList from '@/components/purchases/ExpensesList';
import BillsList from '@/components/purchases/BillsList';
import { Textarea } from '@/components/ui/textarea';

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
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Purchase Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage vendors, expenses, purchase orders, and bills
        </p>
      </div>
      
      <Separator className="my-6" />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="bg-muted/30 rounded-lg p-1 overflow-x-auto">
          <TabsList className="inline-flex min-w-full h-auto bg-transparent p-0 gap-1">
            {purchasesTabs.map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="flex items-center gap-2 px-3 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md"
              >
                {tab.icon}
                <span>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        <div className="mt-6">
          {/* Render actual components for the tabs we've implemented */}
          <TabsContent value="vendors" className="m-0">
            <VendorsList />
          </TabsContent>
          
          <TabsContent value="expenses" className="m-0">
            <ExpensesList />
          </TabsContent>
          
          <TabsContent value="bills" className="m-0">
            <BillsList />
          </TabsContent>

          {/* Placeholder content for tabs we haven't fully implemented yet */}
          {purchasesTabs
            .filter(tab => !['vendors', 'expenses', 'bills'].includes(tab.id))
            .map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="m-0">
                <PlaceholderContent tabId={tab.id} tabLabel={tab.label} icon={tab.icon} />
              </TabsContent>
            ))}
        </div>
      </Tabs>
    </div>
  );
};

// A placeholder component for each tab's content with improved design
const PlaceholderContent = ({ tabId, tabLabel, icon }: { tabId: string, tabLabel: string, icon: React.ReactNode }) => {
  return (
    <div className="border rounded-lg p-8 text-center bg-muted/10">
      <div className="flex flex-col items-center justify-center max-w-lg mx-auto">
        <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <div className="h-8 w-8 text-primary">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-medium mb-2">{tabLabel} Module</h3>
        <p className="text-muted-foreground mb-6">
          This section will allow you to manage {tabLabel.toLowerCase()} in your business.
          Future updates will add functionality to this area.
        </p>
        <div className="flex justify-center w-full">
          <div className="bg-muted/20 w-full max-w-2xl h-64 rounded-lg flex items-center justify-center border border-dashed border-muted-foreground/30">
            <div className="text-center px-4">
              <p className="text-muted-foreground mb-4">
                The {tabLabel} module is under development
              </p>
              <button disabled className="bg-primary/70 text-primary-foreground px-4 py-2 rounded opacity-50 cursor-not-allowed">
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchases;
