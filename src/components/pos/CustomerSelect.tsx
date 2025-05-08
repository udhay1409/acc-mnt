
import React, { useState } from 'react';
import { usePOS } from '@/contexts/POSContext';
import { mockCustomers } from '@/data/mockProducts';
import { Customer } from '@/models/pos';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsDown, User, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const CustomerSelect: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { state, setCustomer } = usePOS();
  const { toast } = useToast();

  const handleSelectCustomer = (customer: Customer) => {
    setCustomer(customer);
    setOpen(false);
  };

  const handleAddNewCustomer = () => {
    toast({
      title: "Feature not available",
      description: "Adding new customers will be implemented soon.",
    });
    setOpen(false);
  };

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {state.customer ? state.customer.name : "Select Customer"}
            </div>
            <ChevronsDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" align="start">
          <Command>
            <CommandInput placeholder="Search customer..." />
            <CommandList>
              <CommandEmpty>No customer found.</CommandEmpty>
              <CommandGroup heading="Customers">
                {mockCustomers.map((customer) => (
                  <CommandItem
                    key={customer.id}
                    value={customer.name}
                    onSelect={() => handleSelectCustomer(customer)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        state.customer?.id === customer.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div>
                      <span>{customer.name}</span>
                      {customer.phone && (
                        <span className="text-xs text-muted-foreground block">{customer.phone}</span>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandGroup>
                <CommandItem onSelect={handleAddNewCustomer}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add New Customer
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CustomerSelect;
