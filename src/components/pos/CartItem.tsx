
import React, { useState } from 'react';
import { CartItem as CartItemType } from '@/models/pos';
import { usePOS } from '@/contexts/POSContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Minus, Plus } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface CartItemProps {
  item: CartItemType;
}

const CartItemRow: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, updateDiscount, removeFromCart } = usePOS();
  const [discountPercent, setDiscountPercent] = useState(item.discount_percent);
  const [isDiscountPopoverOpen, setIsDiscountPopoverOpen] = useState(false);

  const handleQuantityDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.product.id, item.quantity - 1);
    } else {
      removeFromCart(item.product.id);
    }
  };

  const handleQuantityIncrease = () => {
    updateQuantity(item.product.id, item.quantity + 1);
  };

  const handleApplyDiscount = () => {
    updateDiscount(item.product.id, discountPercent);
    setIsDiscountPopoverOpen(false);
  };

  return (
    <tr className="border-b">
      <td className="py-3 px-2">
        <div className="font-medium">{item.product.name}</div>
        <div className="text-xs text-muted-foreground">SKU: {item.product.sku}</div>
      </td>
      <td className="py-3 px-2">
        <div className="flex items-center space-x-1">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-7 w-7" 
            onClick={handleQuantityDecrease}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center">{item.quantity}</span>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-7 w-7" 
            onClick={handleQuantityIncrease}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </td>
      <td className="py-3 px-2 text-right">${item.unit_price.toFixed(2)}</td>
      <td className="py-3 px-2 text-right">
        <Popover open={isDiscountPopoverOpen} onOpenChange={setIsDiscountPopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm">
              {item.discount_percent}%
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  min="0"
                  max="100"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                />
              </div>
              <Button onClick={handleApplyDiscount}>Apply Discount</Button>
            </div>
          </PopoverContent>
        </Popover>
      </td>
      <td className="py-3 px-2 text-right">${item.total.toFixed(2)}</td>
    </tr>
  );
};

export default CartItemRow;
