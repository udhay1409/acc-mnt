
import React from 'react';
import PlaceholderPage from '../PlaceholderPage';
import { ShoppingCart } from 'lucide-react';

const PointOfSale = () => {
  return (
    <PlaceholderPage 
      title="Point of Sale" 
      description="The POS module is being developed with fast checkout and inventory integration."
      icon={<ShoppingCart className="h-6 w-6" />}
    />
  );
};

export default PointOfSale;
