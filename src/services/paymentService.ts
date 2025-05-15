
import { toast } from "sonner";

// Common interface for payment processing across modules
export interface PaymentRequest {
  amount: number;
  currency: string;
  receipt?: string;
  notes?: Record<string, string>;
  customerInfo?: {
    name: string;
    email: string;
    contact?: string;
  };
  callbackUrl?: string;
}

export interface PaymentResponse {
  id: string;
  paymentId?: string;
  orderId?: string;
  signature?: string;
  status: 'success' | 'failed' | 'cancelled';
  method?: string;
}

// Get Razorpay configuration
export const getRazorpayConfig = () => {
  // In a real app, these would be fetched from your secure storage or state
  return {
    keyId: "rzp_test_1DP5mmOlF5G5ag", // Using a known test key for Razorpay
    apiBaseUrl: "/api/razorpay" // API proxy path
  };
};

// Create a Razorpay order via your backend
export const createRazorpayOrder = async (
  paymentRequest: PaymentRequest
): Promise<{ id: string; amount: number; currency: string; receipt?: string }> => {
  try {
    // In a real app, this would call your backend API which would then create a Razorpay order
    // For demo purposes, we're mocking the response
    console.log("Creating Razorpay order with:", paymentRequest);
    const order = {
      id: `order_${Math.random().toString(36).substring(2, 15)}`,
      amount: paymentRequest.amount,
      currency: paymentRequest.currency,
      receipt: paymentRequest.receipt || `rcpt_${Date.now()}`
    };
    
    return order;
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    toast.error("Failed to create payment order");
    throw error;
  }
};

// Load Razorpay script if not already loaded
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      toast.error("Failed to load Razorpay. Please check your internet connection.");
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

// Process payment using Razorpay checkout
export const processRazorpayPayment = async (
  order: { id: string; amount: number; currency: string },
  options: {
    name: string;
    description?: string;
    customerInfo: { name: string; email: string; contact?: string };
    theme?: { color?: string };
  }
): Promise<PaymentResponse> => {
  // Make sure Razorpay script is loaded
  const isScriptLoaded = await loadRazorpayScript();
  if (!isScriptLoaded) {
    throw new Error("Razorpay script failed to load");
  }
  
  const { keyId } = getRazorpayConfig();
  console.log("Initializing Razorpay payment with key:", keyId);
  
  return new Promise((resolve, reject) => {
    try {
      // Configure Razorpay options
      const razorpayOptions = {
        key: keyId,
        amount: Math.round(order.amount * 100), // Razorpay expects amount in paise (rounded to avoid decimal issues)
        currency: order.currency,
        name: options.name || "Your Business Name",
        description: options.description || "Payment for products/services",
        order_id: order.id,
        prefill: {
          name: options.customerInfo.name || "Customer",
          email: options.customerInfo.email || "customer@example.com",
          contact: options.customerInfo.contact || "",
        },
        handler: function(response: any) {
          console.log("Payment successful:", response);
          // This function is called when payment is successful
          resolve({
            id: order.id,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            status: 'success',
            method: 'razorpay'
          });
        },
        modal: {
          ondismiss: function() {
            console.log("Payment modal dismissed");
            resolve({
              id: order.id,
              status: 'cancelled'
            });
          },
        },
        theme: options.theme?.color 
          ? { color: options.theme.color } 
          : { color: "#4f46e5" }, // Default indigo color
      };

      console.log("Razorpay options:", razorpayOptions);

      // Initialize Razorpay checkout
      const razorpay = new (window as any).Razorpay(razorpayOptions);
      console.log("Opening Razorpay modal");
      razorpay.open();
    } catch (error) {
      console.error("Razorpay initialization error:", error);
      toast.error(`Razorpay error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      reject({
        id: order.id,
        status: 'failed'
      });
    }
  });
};

// Verify payment with your backend
export const verifyRazorpayPayment = async (
  paymentId: string, 
  orderId: string, 
  signature: string
): Promise<boolean> => {
  try {
    // In a production app, this would call your backend to verify the payment
    // For demo purposes, we'll assume it's successful
    console.log("Verifying payment:", { paymentId, orderId, signature });
    toast.success("Payment verified successfully");
    return true;
  } catch (error) {
    console.error("Payment verification failed:", error);
    toast.error("Payment verification failed");
    return false;
  }
};

// Add type definition for Razorpay to avoid TypeScript errors
declare global {
  interface Window {
    Razorpay: any;
  }
}
