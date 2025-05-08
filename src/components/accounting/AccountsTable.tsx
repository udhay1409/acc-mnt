
import React from 'react';
import { Account, AccountType } from '@/models/accounting';
import { TableCell, TableRow, TableHead, TableHeader, Table, TableBody } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface AccountsTableProps {
  accounts: Account[];
  filter?: AccountType | 'all';
}

const AccountsTable: React.FC<AccountsTableProps> = ({ 
  accounts,
  filter = 'all' 
}) => {
  const filteredAccounts = filter === 'all' 
    ? accounts 
    : accounts.filter(account => account.type === filter);

  const getAccountTypeBadge = (type: AccountType) => {
    const types = {
      asset: { label: 'Asset', className: 'bg-blue-500 hover:bg-blue-600' },
      liability: { label: 'Liability', className: 'bg-red-500 hover:bg-red-600' },
      equity: { label: 'Equity', className: 'bg-green-500 hover:bg-green-600' },
      revenue: { label: 'Revenue', className: 'bg-emerald-500 hover:bg-emerald-600' },
      expense: { label: 'Expense', className: 'bg-amber-500 hover:bg-amber-600' },
    };

    return (
      <Badge className={types[type].className}>
        {types[type].label}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Code</TableHead>
            <TableHead>Account Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAccounts.map((account) => (
            <TableRow key={account.id}>
              <TableCell className="font-medium">{account.code}</TableCell>
              <TableCell>{account.name}</TableCell>
              <TableCell>{getAccountTypeBadge(account.type)}</TableCell>
              <TableCell className="text-right font-mono">
                {formatCurrency(account.balance)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AccountsTable;
