
import React from 'react';
import { Transaction, Account } from '@/models/accounting';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TableCell, TableRow, TableHead, TableHeader, Table, TableBody, TableFooter } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface TransactionModalProps {
  transaction: Transaction | null;
  accounts: Account[];
  isOpen: boolean;
  onClose: () => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  transaction,
  accounts,
  isOpen,
  onClose
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getAccountName = (accountId: string) => {
    return accounts.find(a => a.id === accountId)?.name || 'Unknown Account';
  };
  
  if (!transaction) return null;

  // Calculate totals
  const totalDebits = transaction.entries.reduce((sum, entry) => sum + entry.debit, 0);
  const totalCredits = transaction.entries.reduce((sum, entry) => sum + entry.credit, 0);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogDescription className="flex justify-between items-center">
            <span>{transaction.description} - {format(transaction.date, 'MMMM d, yyyy')}</span>
            <Badge variant={transaction.isReconciled ? "default" : "outline"} className={transaction.isReconciled ? "bg-green-500" : "border-amber-500 text-amber-500"}>
              {transaction.isReconciled ? 'Reconciled' : 'Pending'}
            </Badge>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Reference</p>
              <p>{transaction.reference || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Created</p>
              <p>{format(transaction.createdAt, 'MMM d, yyyy')}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Journal Entries</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Debit</TableHead>
                  <TableHead className="text-right">Credit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transaction.entries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{getAccountName(entry.accountId)}</TableCell>
                    <TableCell>{entry.description || '-'}</TableCell>
                    <TableCell className="text-right font-mono">
                      {entry.debit > 0 ? formatCurrency(entry.debit) : ''}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {entry.credit > 0 ? formatCurrency(entry.credit) : ''}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2} className="text-right font-medium">Totals</TableCell>
                  <TableCell className="text-right font-mono font-bold">
                    {formatCurrency(totalDebits)}
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold">
                    {formatCurrency(totalCredits)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} className="text-right font-medium">Difference</TableCell>
                  <TableCell colSpan={2} className={`text-right font-mono font-bold ${
                    totalDebits !== totalCredits ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {formatCurrency(totalDebits - totalCredits)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionModal;
