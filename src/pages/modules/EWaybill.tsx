
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Truck, ClipboardCheck, History } from 'lucide-react';

const EWaybill = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">E-Waybill Management</h1>
      </div>
      
      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-4 h-auto">
          <TabsTrigger value="generate" className="flex items-center gap-2 py-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Generate</span>
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-2 py-2">
            <Truck className="h-4 w-4" />
            <span className="hidden sm:inline">Active Bills</span>
          </TabsTrigger>
          <TabsTrigger value="validate" className="flex items-center gap-2 py-2">
            <ClipboardCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Validate</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2 py-2">
            <History className="h-4 w-4" />
            <span className="hidden sm:inline">History</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate E-Waybill</CardTitle>
              <CardDescription>Create a new electronic way bill for goods transportation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Use this section to generate new e-waybills for intrastate or interstate goods transportation.
                Fill in the required details and submit to generate an e-waybill with a valid number from the GST portal.
              </p>
              {/* Placeholder for form content */}
              <div className="h-80 border rounded-md border-dashed border-muted-foreground/25 mt-6 flex items-center justify-center text-muted-foreground">
                E-Waybill generation form will be implemented here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Active E-Waybills</CardTitle>
              <CardDescription>Monitor and manage ongoing transportation with active e-waybills</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Track all active e-waybills, extend validity if needed, and update vehicle information for goods in transit.
              </p>
              {/* Placeholder for active waybills list */}
              <div className="h-80 border rounded-md border-dashed border-muted-foreground/25 mt-6 flex items-center justify-center text-muted-foreground">
                Active e-waybills list will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="validate" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Validate E-Waybill</CardTitle>
              <CardDescription>Check validity of e-waybill numbers</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Verify the authenticity and current status of any e-waybill by entering its number.
              </p>
              {/* Placeholder for validation form */}
              <div className="h-80 border rounded-md border-dashed border-muted-foreground/25 mt-6 flex items-center justify-center text-muted-foreground">
                E-Waybill validation tool will be implemented here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>E-Waybill History</CardTitle>
              <CardDescription>View and download past e-waybills</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Access your complete e-waybill history, download copies for record keeping, and check delivery status.
              </p>
              {/* Placeholder for history list */}
              <div className="h-80 border rounded-md border-dashed border-muted-foreground/25 mt-6 flex items-center justify-center text-muted-foreground">
                E-Waybill history will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EWaybill;
