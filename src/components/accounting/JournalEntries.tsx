
import React, { useState } from 'react';
import { Transaction, Account } from '@/models/accounting';
import TransactionsTable from './TransactionsTable';
import TransactionModal from './TransactionModal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface JournalEntriesProps {
  transactions: Transaction[];
  accounts: Account[];
}

const JournalEntries: React.FC<JournalEntriesProps> = ({ transactions, accounts }) => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Journal Entries</CardTitle>
          <CardDescription>
            View all transactions in the double-entry accounting system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionsTable 
            transactions={transactions} 
            onViewTransaction={handleViewTransaction} 
          />
        </CardContent>
      </Card>
      
      <TransactionModal 
        transaction={selectedTransaction}
        accounts={accounts}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default JournalEntries;
