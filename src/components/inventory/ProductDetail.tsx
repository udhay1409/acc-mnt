
import React from 'react';
import { ProductWithMovements } from '@/models/inventory';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import StockMovementsTable from './StockMovementsTable';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

interface ProductDetailProps {
  product: ProductWithMovements;
  onClose: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-muted-foreground">
            SKU: {product.sku}
            {product.barcode && ` • Barcode: ${product.barcode}`}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground"
        >
          Back to Products
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Current Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {product.stock_quantity}
            </div>
            <Badge 
              variant={
                product.stock_quantity > 10 ? "outline" : 
                product.stock_quantity > 5 ? "secondary" : 
                product.stock_quantity > 0 ? "default" : "destructive"
              }
              className="mt-1"
            >
              {product.stock_quantity > 10 ? "Well Stocked" :
               product.stock_quantity > 5 ? "Adequate" :
               product.stock_quantity > 0 ? "Low Stock" : "Out of Stock"}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Price
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${product.price.toFixed(2)}
            </div>
            <span className="text-xs text-muted-foreground">
              Tax Rate: {product.tax_rate}%
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {product.category || "Uncategorized"}
            </div>
          </CardContent>
        </Card>
      </div>

      <Accordion type="single" collapsible defaultValue="movements" className="w-full">
        <AccordionItem value="movements">
          <AccordionTrigger>Stock Movement History</AccordionTrigger>
          <AccordionContent>
            <StockMovementsTable movements={product.movements || []} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductDetail;
