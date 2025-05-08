
import React from 'react';
import PlaceholderPage from '../PlaceholderPage';
import { Truck } from 'lucide-react';

const Purchases = () => {
  return (
    <PlaceholderPage 
      title="Purchase Management" 
      description="Manage vendors, purchase orders, and bills in the upcoming Purchase module."
      icon={<Truck className="h-6 w-6" />}
    />
  );
};

export default Purchases;
