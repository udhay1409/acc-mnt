
import React, { useState } from 'react';
import { Account, AccountType } from '@/models/accounting';
import AccountsTable from './AccountsTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ChartOfAccountsProps {
  accounts: Account[];
}

const ChartOfAccounts: React.FC<ChartOfAccountsProps> = ({ accounts }) => {
  const [activeTab, setActiveTab] = useState<AccountType | 'all'>('all');

  // Calculate account totals by type
  const accountTotals = accounts.reduce((acc, account) => {
    acc.total += account.balance;
    if (account.type === 'asset') acc.assets += account.balance;
    if (account.type === 'liability') acc.liabilities += account.balance;
    if (account.type === 'equity') acc.equity += account.balance;
    if (account.type === 'revenue') acc.revenue += account.balance;
    if (account.type === 'expense') acc.expenses += account.balance;
    return acc;
  }, { total: 0, assets: 0, liabilities: 0, equity: 0, revenue: 0, expenses: 0 });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">Chart of Accounts</h2>
      
      {/* Account Type Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <SummaryCard
          title="Assets"
          value={accountTotals.assets}
          color="bg-blue-100 text-blue-800"
          onClick={() => setActiveTab('asset')}
          isActive={activeTab === 'asset'}
        />
        <SummaryCard
          title="Liabilities"
          value={accountTotals.liabilities}
          color="bg-red-100 text-red-800"
          onClick={() => setActiveTab('liability')}
          isActive={activeTab === 'liability'}
        />
        <SummaryCard
          title="Equity"
          value={accountTotals.equity}
          color="bg-green-100 text-green-800"
          onClick={() => setActiveTab('equity')}
          isActive={activeTab === 'equity'}
        />
        <SummaryCard
          title="Revenue"
          value={accountTotals.revenue}
          color="bg-emerald-100 text-emerald-800"
          onClick={() => setActiveTab('revenue')}
          isActive={activeTab === 'revenue'}
        />
        <SummaryCard
          title="Expenses"
          value={accountTotals.expenses}
          color="bg-amber-100 text-amber-800"
          onClick={() => setActiveTab('expense')}
          isActive={activeTab === 'expense'}
        />
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as AccountType | 'all')}>
        <TabsList>
          <TabsTrigger value="all">All Accounts</TabsTrigger>
          <TabsTrigger value="asset">Assets</TabsTrigger>
          <TabsTrigger value="liability">Liabilities</TabsTrigger>
          <TabsTrigger value="equity">Equity</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="expense">Expenses</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab}>
          <AccountsTable accounts={accounts} filter={activeTab} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface SummaryCardProps {
  title: string;
  value: number;
  color: string;
  onClick: () => void;
  isActive: boolean;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title, 
  value,
  color,
  onClick,
  isActive
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div 
      className={`p-4 rounded-lg ${color} cursor-pointer transition-all ${
        isActive ? 'ring-2 ring-primary ring-offset-2' : 'hover:opacity-90'
      }`}
      onClick={onClick}
    >
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xl font-bold mt-1 font-mono">{formatCurrency(value)}</p>
    </div>
  );
};

export default ChartOfAccounts;
