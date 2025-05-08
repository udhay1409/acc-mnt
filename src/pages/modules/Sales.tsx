
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import PlaceholderPage from '@/pages/PlaceholderPage';

const SalesModuleTab = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => (
  <Card className="border-dashed h-full">
    <CardHeader className="gap-2">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <CardTitle className="text-xl">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">
        This feature will be implemented soon.
      </p>
    </CardContent>
  </Card>
);

const Sales = () => {
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
            <SalesModuleTab 
              icon={<Users className="h-6 w-6" />} 
              title="Customer Management" 
              description="Manage your customers and their information"
            />
          </TabsContent>
          
          <TabsContent value="estimates">
            <SalesModuleTab 
              icon={<FileText className="h-6 w-6" />} 
              title="Estimates" 
              description="Create and manage sales estimates"
            />
          </TabsContent>
          
          <TabsContent value="retainer">
            <SalesModuleTab 
              icon={<FilePlus className="h-6 w-6" />} 
              title="Retainer Invoices" 
              description="Manage retainer invoices for regular clients"
            />
          </TabsContent>
          
          <TabsContent value="orders">
            <SalesModuleTab 
              icon={<ShoppingCart className="h-6 w-6" />} 
              title="Sales Orders" 
              description="Create and track sales orders"
            />
          </TabsContent>
          
          <TabsContent value="challans">
            <SalesModuleTab 
              icon={<Truck className="h-6 w-6" />} 
              title="Delivery Challans" 
              description="Manage delivery documentation"
            />
          </TabsContent>
          
          <TabsContent value="invoices">
            <SalesModuleTab 
              icon={<FileText className="h-6 w-6" />} 
              title="Invoices" 
              description="Create and manage customer invoices"
            />
          </TabsContent>
          
          <TabsContent value="payments">
            <SalesModuleTab 
              icon={<Wallet className="h-6 w-6" />} 
              title="Payments Received" 
              description="Track payments from customers"
            />
          </TabsContent>
          
          <TabsContent value="recurring">
            <SalesModuleTab 
              icon={<Calendar className="h-6 w-6" />} 
              title="Recurring Invoices" 
              description="Set up automated recurring invoices"
            />
          </TabsContent>
          
          <TabsContent value="credits">
            <SalesModuleTab 
              icon={<FileMinus className="h-6 w-6" />} 
              title="Credit Notes" 
              description="Issue credit notes to customers"
            />
          </TabsContent>
          
          <TabsContent value="returns">
            <SalesModuleTab 
              icon={<FileX className="h-6 w-6" />} 
              title="Sales Returns" 
              description="Process and manage returned items"
            />
          </TabsContent>
          
          <TabsContent value="receipts">
            <SalesModuleTab 
              icon={<FileText className="h-6 w-6" />} 
              title="Receipts" 
              description="Generate and track payment receipts"
            />
          </TabsContent>
          
          <TabsContent value="debits">
            <SalesModuleTab 
              icon={<FileMinus className="h-6 w-6" />} 
              title="Debit Notes" 
              description="Create and manage debit notes"
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Sales;
