
import React from 'react';
import { POSProvider } from '@/contexts/POSContext';
import BarcodeScanner from '@/components/pos/BarcodeScanner';
import ProductSearch from '@/components/pos/ProductSearch';
import Cart from '@/components/pos/Cart';
import CustomerSelect from '@/components/pos/CustomerSelect';
import PaymentSection from '@/components/pos/PaymentSection';
import HeldSales from '@/components/pos/HeldSales';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { usePOS } from '@/contexts/POSContext';
import { mockProducts } from '@/data/mockProducts';
import { Print, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const POSContent: React.FC = () => {
  const { addToCart, state } = usePOS();
  
  const handleProductFound = (productId: string) => {
    const product = mockProducts.find(p => p.id === productId);
    if (product) {
      addToCart(product, 1);
    }
  };
  
  const handlePrint = () => {
    toast.info("Print functionality will be implemented soon");
  };
  
  const handleShare = () => {
    toast.info("WhatsApp sharing will be implemented soon");
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Point of Sale</CardTitle>
            <CardDescription>Add items to cart and process payment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-4">
              <CustomerSelect />
              <BarcodeScanner onProductFound={handleProductFound} />
              <ProductSearch />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Cart</CardTitle>
            <CardDescription>
              {state.cart.length} item(s) in cart
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Cart />
          </CardContent>
          <CardFooter className="pt-0 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Print className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="space-y-4">
        <PaymentSection />
        <HeldSales />
      </div>
    </div>
  );
};

const PointOfSale: React.FC = () => {
  return (
    <POSProvider>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Point of Sale</h1>
          <p className="text-muted-foreground">
            Process sales, manage inventory and handle payments
          </p>
        </div>
        <Separator />
        <POSContent />
      </div>
    </POSProvider>
  );
};

export default PointOfSale;
