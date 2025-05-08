
import React from 'react';
import { Transaction } from '@/models/accounting';
import { TableCell, TableRow, TableHead, TableHeader, Table, TableBody } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface TransactionsTableProps {
  transactions: Transaction[];
  onViewTransaction?: (transaction: Transaction) => void;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ 
  transactions,
  onViewTransaction
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Calculate total value of a transaction
  const calculateTransactionTotal = (transaction: Transaction) => {
    // We can use either debits or credits as they should be equal in double-entry
    return transaction.entries.reduce((sum, entry) => sum + entry.debit, 0);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Reference</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="w-[100px] text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow 
              key={transaction.id}
              className="cursor-pointer hover:bg-muted/60"
              onClick={() => onViewTransaction && onViewTransaction(transaction)}
            >
              <TableCell className="font-medium">
                {format(transaction.date, 'MMM d, yyyy')}
              </TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.reference || '-'}</TableCell>
              <TableCell className="text-right font-mono">
                {formatCurrency(calculateTransactionTotal(transaction))}
              </TableCell>
              <TableCell className="text-center">
                {transaction.isReconciled ? (
                  <Badge variant="outline" className="border-green-500 text-green-500">
                    Reconciled
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-amber-500 text-amber-500">
                    Pending
                  </Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionsTable;
