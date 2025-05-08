
import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { 
  Users, 
  FileText, 
  FileMinus, 
  FilePlus, 
  FileX, 
  Truck, 
  ShoppingCart, 
  Calendar, 
  Wallet 
} from 'lucide-react';

// Import our sales components
import CustomersList from '@/components/sales/CustomersList';
import EstimatesList from '@/components/sales/EstimatesList';
import InvoicesList from '@/components/sales/InvoicesList';
import DocumentList from '@/components/sales/DocumentList';
import DeliveryChallansList from '@/components/sales/DeliveryChallansList';
import { getRetainerInvoices, getSalesOrders } from '@/data/mockSales';

const Sales = () => {
  // State for each tab's search query
  const [retainerSearchQuery, setRetainerSearchQuery] = useState('');
  const [ordersSearchQuery, setOrdersSearchQuery] = useState('');
  
  const retainerInvoices = getRetainerInvoices();
  const salesOrders = getSalesOrders();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Sales Management</h1>
        <p className="text-muted-foreground">
          Manage your sales documents, customers and related transactions
        </p>
      </div>
      
      <Separator />
      
      <Tabs defaultValue="customers" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 w-full h-auto">
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="estimates">Estimates</TabsTrigger>
          <TabsTrigger value="retainer">Retainer</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="challans">Challans</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="recurring">Recurring</TabsTrigger>
          <TabsTrigger value="credits">Credits</TabsTrigger>
          <TabsTrigger value="returns">Returns</TabsTrigger>
          <TabsTrigger value="receipts">Receipts</TabsTrigger>
          <TabsTrigger value="debits">Debits</TabsTrigger>
        </TabsList>
        
        <div className="mt-4">
          <TabsContent value="customers">
            <CustomersList />
          </TabsContent>
          
          <TabsContent value="estimates">
            <EstimatesList />
          </TabsContent>
          
          <TabsContent value="retainer">
            <DocumentList
              title="Retainer Invoices"
              description="Manage retainer invoices for regular clients"
              documents={retainerInvoices}
              searchQuery={retainerSearchQuery}
              setSearchQuery={setRetainerSearchQuery}
              createButtonText="Create Retainer Invoice"
              showDueDates={true}
              additionalButtonText="Record Payment"
            />
          </TabsContent>
          
          <TabsContent value="orders">
            <DocumentList
              title="Sales Orders"
              description="Create and track sales orders"
              documents={salesOrders}
              searchQuery={ordersSearchQuery}
              setSearchQuery={setOrdersSearchQuery}
              createButtonText="Create Sales Order"
              additionalButtonText="Convert to Invoice"
            />
          </TabsContent>
          
          <TabsContent value="challans">
            <DeliveryChallansList />
          </TabsContent>
          
          <TabsContent value="invoices">
            <InvoicesList />
          </TabsContent>
          
          <TabsContent value="payments">
            <div className="flex items-center justify-center p-12 border rounded-lg border-dashed">
              <div className="flex flex-col items-center text-center space-y-2">
                <Wallet className="h-10 w-10 text-muted-foreground" />
                <h3 className="text-lg font-medium">Payments Received</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  This feature is coming soon. You'll be able to track and manage payments from customers.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="recurring">
            <div className="flex items-center justify-center p-12 border rounded-lg border-dashed">
              <div className="flex flex-col items-center text-center space-y-2">
                <Calendar className="h-10 w-10 text-muted-foreground" />
                <h3 className="text-lg font-medium">Recurring Invoices</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  This feature is coming soon. You'll be able to set up and manage recurring invoices.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="credits">
            <div className="flex items-center justify-center p-12 border rounded-lg border-dashed">
              <div className="flex flex-col items-center text-center space-y-2">
                <FileMinus className="h-10 w-10 text-muted-foreground" />
                <h3 className="text-lg font-medium">Credit Notes</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  This feature is coming soon. You'll be able to issue and manage credit notes.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="returns">
            <div className="flex items-center justify-center p-12 border rounded-lg border-dashed">
              <div className="flex flex-col items-center text-center space-y-2">
                <FileX className="h-10 w-10 text-muted-foreground" />
                <h3 className="text-lg font-medium">Sales Returns</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  This feature is coming soon. You'll be able to process and manage returned items.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="receipts">
            <div className="flex items-center justify-center p-12 border rounded-lg border-dashed">
              <div className="flex flex-col items-center text-center space-y-2">
                <FileText className="h-10 w-10 text-muted-foreground" />
                <h3 className="text-lg font-medium">Receipts</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  This feature is coming soon. You'll be able to generate and track payment receipts.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="debits">
            <div className="flex items-center justify-center p-12 border rounded-lg border-dashed">
              <div className="flex flex-col items-center text-center space-y-2">
                <FileMinus className="h-10 w-10 text-muted-foreground" />
                <h3 className="text-lg font-medium">Debit Notes</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  This feature is coming soon. You'll be able to create and manage debit notes.
                </p>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Sales;
