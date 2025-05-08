
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import CustomerForm from './CustomerForm';
import { Customer } from '@/models/sales';
import { useToast } from '@/hooks/use-toast';

interface AddCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCustomerAdded: (customer: Customer) => void;
}

const AddCustomerDialog: React.FC<AddCustomerDialogProps> = ({ 
  open, 
  onOpenChange,
  onCustomerAdded 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = (formData: any) => {
    setIsSubmitting(true);
    
    // Create a new customer with a unique ID
    const newCustomer: Customer = {
      id: `C${uuidv4().substring(0, 5)}`, // Create a short unique ID starting with C
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address
    };
    
    // Simulate a network request
    setTimeout(() => {
      // Pass the new customer to the parent component
      onCustomerAdded(newCustomer);
      
      // Show a success toast
      toast({
        title: "Customer Added",
        description: `${newCustomer.name} has been added successfully.`,
      });
      
      // Reset submission state and close dialog
      setIsSubmitting(false);
      onOpenChange(false);
    }, 600);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
          <DialogDescription>
            Enter customer details below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <CustomerForm 
          onSubmit={handleFormSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddCustomerDialog;
