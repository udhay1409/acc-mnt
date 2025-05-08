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
  Wallet,
  Repeat,
  Receipt
} from 'lucide-react';

// Import our sales components
import CustomersList from '@/components/sales/CustomersList';
import EstimatesList from '@/components/sales/EstimatesList';
import InvoicesList from '@/components/sales/InvoicesList';
import DocumentList from '@/components/sales/DocumentList';
import DeliveryChallansList from '@/components/sales/DeliveryChallansList';
import PaymentsList from '@/components/sales/PaymentsList';
import RecurringInvoicesList from '@/components/sales/RecurringInvoicesList';
import CreditNotesList from '@/components/sales/CreditNotesList';
import SalesReturnsList from '@/components/sales/SalesReturnsList';
import ReceiptsList from '@/components/sales/ReceiptsList';
import DebitNotesList from '@/components/sales/DebitNotesList';
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
            <PaymentsList />
          </TabsContent>
          
          <TabsContent value="recurring">
            <RecurringInvoicesList />
          </TabsContent>
          
          <TabsContent value="credits">
            <CreditNotesList />
          </TabsContent>
          
          <TabsContent value="returns">
            <SalesReturnsList />
          </TabsContent>
          
          <TabsContent value="receipts">
            <ReceiptsList />
          </TabsContent>
          
          <TabsContent value="debits">
            <DebitNotesList />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Sales;
