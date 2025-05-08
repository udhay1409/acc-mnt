
import React from 'react';
import { usePOS } from '@/contexts/POSContext';
import CartItemRow from './CartItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

const Cart: React.FC = () => {
  const { 
    state, 
    clearCart,
    calculateSubtotal,
    calculateTax,
    calculateDiscount,
    calculateTotal,
    setGlobalDiscount
  } = usePOS();

  const { cart, globalDiscount } = state;
  
  const handleGlobalDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setGlobalDiscount(value);
  };

  if (cart.length === 0) {
    return (
      <div className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-md">
        <div className="text-center">
          <p className="text-muted-foreground">Cart is empty</p>
          <p className="text-sm text-muted-foreground mt-1">
            Search for products or scan a barcode to add items
          </p>
        </div>
      </div>
    );
  }

  const subtotal = calculateSubtotal();
  const tax = calculateTax();
  const discount = calculateDiscount();
  const total = calculateTotal();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow border rounded-md overflow-hidden">
        <ScrollArea className="h-[400px]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-muted">
              <tr>
                <th className="py-3 px-2 text-left text-xs font-medium uppercase tracking-wider">
                  Product
                </th>
                <th className="py-3 px-2 text-left text-xs font-medium uppercase tracking-wider">
                  Qty
                </th>
                <th className="py-3 px-2 text-right text-xs font-medium uppercase tracking-wider">
                  Price
                </th>
                <th className="py-3 px-2 text-right text-xs font-medium uppercase tracking-wider">
                  Disc %
                </th>
                <th className="py-3 px-2 text-right text-xs font-medium uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cart.map((item) => (
                <CartItemRow key={item.product.id} item={item} />
              ))}
            </tbody>
          </table>
        </ScrollArea>
      </div>
      
      <div className="mt-4 space-y-3">
        <div className="flex justify-between items-center">
          <Label htmlFor="globalDiscount">Global Discount (%)</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="globalDiscount"
              type="number"
              min="0"
              max="100"
              value={globalDiscount}
              onChange={handleGlobalDiscountChange}
              className="w-20"
            />
            <span>%</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>Subtotal:</div>
          <div className="text-right">${subtotal.toFixed(2)}</div>
          
          <div>Tax:</div>
          <div className="text-right">${tax.toFixed(2)}</div>
          
          <div>Discount:</div>
          <div className="text-right">${discount.toFixed(2)}</div>
          
          <div className="font-bold">Total:</div>
          <div className="text-right font-bold">${total.toFixed(2)}</div>
        </div>
        
        <div className="mt-4">
          <Button variant="outline" onClick={clearCart} className="w-full">
            Clear Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
