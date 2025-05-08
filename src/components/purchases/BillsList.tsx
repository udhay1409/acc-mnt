
import React, { useState } from 'react';
import { 
  getBills, 
  getVendors,
} from '@/data/mockPurchases';
import { Bill } from '@/models/purchases';
import PurchaseDocumentList from './PurchaseDocumentList';
import { CheckCircle, ArrowUpRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const BillsList = () => {
  const [bills, setBills] = useState<Bill[]>(getBills());
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentBill, setCurrentBill] = useState<Bill | null>(null);
  const { toast } = useToast();
  
  // Helper to get status colors
  const statusColors = {
    'draft': { bg: 'bg-gray-100', text: 'text-gray-800' },
    'pending': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    'approved': { bg: 'bg-blue-100', text: 'text-blue-800' },
    'paid': { bg: 'bg-green-100', text: 'text-green-800' },
    'overdue': { bg: 'bg-red-100', text: 'text-red-800' },
    'cancelled': { bg: 'bg-slate-100', text: 'text-slate-800' }
  };

  // Handle add new bill
  const handleAddBill = () => {
    setCurrentBill(null);
    setIsFormOpen(true);
    // In a real app, this would open a form
    toast({
      title: "Add Bill",
      description: "This would open a bill creation form"
    });
  };

  // Handle edit bill
  const handleEditBill = (bill: Bill) => {
    setCurrentBill(bill);
    setIsFormOpen(true);
    // In a real app, this would open a form with the bill data
    toast({
      title: "Edit Bill",
      description: `Editing bill ${bill.reference}`
    });
  };

  // Handle delete bill
  const handleDeleteBill = (bill: Bill) => {
    setBills(bills.filter(b => b.id !== bill.id));
  };

  // Handle view bill details
  const handleViewBill = (bill: Bill) => {
    toast({
      title: "View Bill Details",
      description: `Viewing details for bill ${bill.reference}`
    });
  };

  // Handle mark as paid
  const handleMarkAsPaid = (bill: Bill) => {
    const updatedBills = bills.map(b =>
      b.id === bill.id ? { ...b, status: 'paid' } : b
    );
    setBills(updatedBills);
    toast({
      title: "Bill Marked as Paid",
      description: `Bill ${bill.reference} has been marked as paid.`,
      variant: "default"
    });
  };

  return (
    <PurchaseDocumentList
      title="Bills"
      description="Manage invoices from your vendors"
      documents={bills}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onAdd={handleAddBill}
      onEdit={handleEditBill}
      onDelete={handleDeleteBill}
      onView={handleViewBill}
      additionalAction={{
        label: "Mark as Paid",
        icon: <CheckCircle className="h-4 w-4 text-green-600" />,
        onClick: handleMarkAsPaid,
        showFor: (bill) => bill.status === 'pending' || bill.status === 'approved' || bill.status === 'overdue'
      }}
      statusColors={statusColors}
    />
  );
};

export default BillsList;
