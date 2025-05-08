
import React, { useState } from 'react';
import { mockAccounts, mockTransactions } from '@/data/mockAccounting';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import ChartOfAccounts from '@/components/accounting/ChartOfAccounts';
import JournalEntries from '@/components/accounting/JournalEntries';
import { BookOpen, FileText, ChartBar } from 'lucide-react';

const Accounting: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general-ledger');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Accounting</h1>
        <p className="text-muted-foreground">
          Manage your business finances with double-entry bookkeeping
        </p>
      </div>
      <Separator />
      
      <Tabs defaultValue="general-ledger" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="general-ledger" className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            General Ledger
          </TabsTrigger>
          <TabsTrigger value="journal" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Journal Entries
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center">
            <ChartBar className="mr-2 h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general-ledger" className="space-y-4">
          <ChartOfAccounts accounts={mockAccounts} />
        </TabsContent>
        
        <TabsContent value="journal" className="space-y-4">
          <JournalEntries 
            transactions={mockTransactions}
            accounts={mockAccounts} 
          />
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <div className="rounded-md border border-dashed p-8 text-center">
            <h3 className="text-lg font-medium">Financial Reports</h3>
            <p className="text-muted-foreground mt-2">
              Financial reports will be available in a future update.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Accounting;
