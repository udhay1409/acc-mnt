
import React from 'react';
import { Product } from '@/models/pos';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PackageMinus } from 'lucide-react';

interface LowStockAlertProps {
  products: Product[];
  onViewProduct: (productId: string) => void;
}

const LowStockAlert: React.FC<LowStockAlertProps> = ({ products, onViewProduct }) => {
  // Filter out products with low stock (less than or equal to 5)
  const lowStockProducts = products
    .filter(product => product.stock_quantity <= 5)
    .sort((a, b) => a.stock_quantity - b.stock_quantity);

  if (lowStockProducts.length === 0) {
    return null;
  }

  return (
    <Card className="border-yellow-200 dark:border-yellow-900">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <PackageMinus className="h-5 w-5 text-yellow-500" />
          <CardTitle>Low Stock Alert</CardTitle>
        </div>
        <CardDescription>
          {lowStockProducts.length} products need attention
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {lowStockProducts.slice(0, 5).map((product) => (
            <div 
              key={product.id} 
              className="flex items-center justify-between bg-muted/50 p-2 rounded-md"
            >
              <div>
                <div className="font-medium">{product.name}</div>
                <div className="text-xs text-muted-foreground">SKU: {product.sku}</div>
              </div>
              <div className="flex items-center gap-3">
                <Badge 
                  variant={product.stock_quantity === 0 ? "destructive" : "outline"}
                  className="w-12 justify-center"
                >
                  {product.stock_quantity}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onViewProduct(product.id)}
                >
                  View
                </Button>
              </div>
            </div>
          ))}
          
          {lowStockProducts.length > 5 && (
            <div className="text-sm text-muted-foreground text-center pt-1">
              And {lowStockProducts.length - 5} more products with low stock...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LowStockAlert;
