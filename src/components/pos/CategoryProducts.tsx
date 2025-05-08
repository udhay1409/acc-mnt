
import React from 'react';
import { usePOS } from '@/contexts/POSContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Eye } from 'lucide-react';
import { mockProducts } from '@/data/mockProducts';
import { Product } from '@/models/pos';
import { ScrollArea } from '@/components/ui/scroll-area';
import ProductViewModal from './ProductViewModal';

interface CategoryProductsProps {
  category: string;
  viewMode: 'grid' | 'list';
  gridSize: number;
}

const CategoryProducts: React.FC<CategoryProductsProps> = ({ 
  category, 
  viewMode,
  gridSize 
}) => {
  const { addToCart } = usePOS();
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [viewModalOpen, setViewModalOpen] = React.useState(false);
  
  // Filter products by category
  const products = mockProducts.filter(
    product => (product.category || 'Uncategorized') === category
  );
  
  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setViewModalOpen(true);
  };

  const gridSizeClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
  }[gridSize];

  return (
    <div className="py-2">
      <ScrollArea className="h-[400px]">
        {viewMode === 'grid' ? (
          <div className={`grid ${gridSizeClass} gap-3`}>
            {products.map((product) => (
              <Card 
                key={product.id} 
                className="flex flex-col overflow-hidden border hover:border-primary/50 transition-colors cursor-pointer"
              >
                <div className="p-3 flex-grow">
                  <div className="font-medium text-sm line-clamp-2">{product.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">SKU: {product.sku}</div>
                  <div className="mt-2 font-medium text-primary">${product.price.toFixed(2)}</div>
                  {product.stock_quantity <= 5 && (
                    <div className="mt-1 text-xs text-amber-500">
                      Only {product.stock_quantity} left
                    </div>
                  )}
                </div>
                <div className="flex border-t divide-x">
                  <Button 
                    variant="ghost" 
                    className="flex-1 h-9 rounded-none text-xs"
                    onClick={() => handleViewProduct(product)}
                  >
                    <Eye className="h-3.5 w-3.5 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="flex-1 h-9 rounded-none text-xs"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock_quantity <= 0}
                  >
                    <Plus className="h-3.5 w-3.5 mr-1" />
                    Add
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {products.map((product) => (
              <div 
                key={product.id}
                className="flex justify-between items-center p-2 hover:bg-accent rounded-md"
              >
                <div className="flex-grow">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-xs text-muted-foreground">SKU: {product.sku}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium mr-2">${product.price.toFixed(2)}</span>
                  <Button 
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    onClick={() => handleViewProduct(product)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock_quantity <= 0}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <ProductViewModal 
        product={selectedProduct} 
        open={viewModalOpen} 
        onOpenChange={setViewModalOpen}
      />
    </div>
  );
};

export default CategoryProducts;
