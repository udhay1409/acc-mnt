
import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Package } from 'lucide-react';
import ProductList from '@/components/inventory/ProductList';
import ProductDetail from '@/components/inventory/ProductDetail';
import LowStockAlert from '@/components/inventory/LowStockAlert';
import CategoryDistribution from '@/components/inventory/CategoryDistribution';
import { mockProducts } from '@/data/mockProducts';
import { getProductMovements } from '@/data/mockInventory';
import { ProductWithMovements } from '@/models/inventory';

const Inventory = () => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  
  const handleViewProduct = (productId: string) => {
    setSelectedProductId(productId);
  };
  
  const handleBackToProducts = () => {
    setSelectedProductId(null);
  };
  
  const selectedProduct = selectedProductId 
    ? {
        ...mockProducts.find(p => p.id === selectedProductId)!,
        movements: getProductMovements(selectedProductId)
      } as ProductWithMovements
    : null;
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Inventory Management</h1>
        <p className="text-muted-foreground">
          Track products, stock levels, and movements
        </p>
      </div>
      
      <Separator />
      
      {selectedProduct ? (
        <ProductDetail 
          product={selectedProduct} 
          onClose={handleBackToProducts} 
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <LowStockAlert 
                products={mockProducts} 
                onViewProduct={handleViewProduct} 
              />
            </div>
            <div>
              <CategoryDistribution products={mockProducts} />
            </div>
          </div>
          
          <ProductList 
            products={mockProducts} 
            onViewProduct={handleViewProduct} 
          />
        </>
      )}
    </div>
  );
};

export default Inventory;
