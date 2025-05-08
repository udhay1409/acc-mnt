
import React from 'react';
import PlaceholderPage from '../PlaceholderPage';
import { Package } from 'lucide-react';

const Inventory = () => {
  return (
    <PlaceholderPage 
      title="Inventory Management" 
      description="Track products, stock levels, and movements with the upcoming Inventory module."
      icon={<Package className="h-6 w-6" />}
    />
  );
};

export default Inventory;
