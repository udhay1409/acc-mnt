
import { 
  Customer, 
  Estimate, 
  Invoice, 
  RetainerInvoice, 
  SalesOrder,
  DeliveryChallan,
  Payment,
  RecurringInvoice,
  CreditNote,
  SalesReturn,
  Receipt,
  DebitNote,
  SalesItem
} from '@/models/sales';
import { mockProducts } from './mockProducts';

// Mock customers data
export const mockCustomers: Customer[] = [
  {
    id: "C1001",
    name: "Acme Corporation",
    email: "accounts@acmecorp.com",
    phone: "+1-555-123-4567",
    address: "123 Business Avenue, Tech City, TC 54321"
  },
  {
    id: "C1002",
    name: "TechSolutions Inc.",
    email: "billing@techsolutions.com",
    phone: "+1-555-987-6543",
    address: "456 Innovation Drive, Digital Valley, DV 98765"
  },
  {
    id: "C1003",
    name: "Global Enterprises Ltd.",
    email: "finance@globalent.com",
    phone: "+1-555-456-7890",
    address: "789 Corporate Plaza, Business Park, BP 45678"
  },
  {
    id: "C1004",
    name: "Local Retail Shop",
    email: "manager@localretail.com",
    phone: "+1-555-234-5678",
    address: "101 Main Street, Downtown, DT 12345"
  },
  {
    id: "C1005",
    name: "Creative Studios",
    email: "accounts@creativestudios.com",
    phone: "+1-555-345-6789",
    address: "202 Art Avenue, Design District, DD 67890"
  }
];

// Helper function to create sales items
const createSalesItems = (count: number = 3): SalesItem[] => {
  const items: SalesItem[] = [];
  for (let i = 0; i < count; i++) {
    const product = mockProducts[Math.floor(Math.random() * mockProducts.length)];
    const quantity = Math.floor(Math.random() * 5) + 1;
    const unitPrice = product.price;
    const tax = unitPrice * 0.18; // Assuming 18% tax
    const discount = i === 0 ? unitPrice * 0.05 : 0; // 5% discount on first item
    const total = (unitPrice * quantity + tax * quantity) - discount;
    
    items.push({
      id: `ITEM-${Date.now()}-${i}`,
      product,
      description: product.name,
      quantity,
      unitPrice,
      tax,
      discount,
      total
    });
  }
  return items;
};

// Helper to calculate document totals
const calculateTotals = (items: SalesItem[]) => {
  const subtotal = items.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  const taxTotal = items.reduce((acc, item) => acc + (item.tax * item.quantity), 0);
  const discountTotal = items.reduce((acc, item) => acc + item.discount, 0);
  const total = subtotal + taxTotal - discountTotal;
  
  return { subtotal, taxTotal, discountTotal, total };
};

// Mock Estimates
export const mockEstimates: Estimate[] = [
  {
    id: "EST1001",
    number: "EST-1001",
    customer: mockCustomers[0],
    date: new Date(2025, 3, 1), // April 1, 2025
    dueDate: new Date(2025, 3, 15), // April 15, 2025
    expiryDate: new Date(2025, 4, 1), // May 1, 2025
    items: createSalesItems(),
    ...calculateTotals(createSalesItems()),
    notes: "Project scope as discussed in our meeting.",
    termsAndConditions: "Standard terms apply.",
    status: "sent",
    isConvertedToInvoice: false,
    createdBy: "Admin User",
    createdAt: new Date(2025, 3, 1)
  },
  {
    id: "EST1002",
    number: "EST-1002",
    customer: mockCustomers[1],
    date: new Date(2025, 3, 5), // April 5, 2025
    dueDate: new Date(2025, 3, 20), // April 20, 2025
    expiryDate: new Date(2025, 4, 5), // May 5, 2025
    items: createSalesItems(2),
    ...calculateTotals(createSalesItems(2)),
    notes: "As per client requirements.",
    termsAndConditions: "Standard terms apply.",
    status: "viewed",
    isConvertedToInvoice: false,
    createdBy: "Admin User",
    createdAt: new Date(2025, 3, 5)
  }
];

// Mock Invoices
export const mockInvoices: Invoice[] = [
  {
    id: "INV1001",
    number: "INV-1001",
    customer: mockCustomers[0],
    date: new Date(2025, 3, 15), // April 15, 2025
    dueDate: new Date(2025, 4, 15), // May 15, 2025
    paymentDue: new Date(2025, 4, 15),
    paymentTerms: "Net 30",
    items: createSalesItems(),
    ...calculateTotals(createSalesItems()),
    notes: "Thank you for your business.",
    termsAndConditions: "Payment due within 30 days.",
    status: "sent",
    paymentStatus: "unpaid",
    amountPaid: 0,
    balanceDue: calculateTotals(createSalesItems()).total,
    createdBy: "Admin User",
    createdAt: new Date(2025, 3, 15)
  },
  {
    id: "INV1002",
    number: "INV-1002",
    customer: mockCustomers[1],
    date: new Date(2025, 3, 20), // April 20, 2025
    dueDate: new Date(2025, 4, 20), // May 20, 2025
    paymentDue: new Date(2025, 4, 20),
    paymentTerms: "Net 30",
    items: createSalesItems(4),
    ...calculateTotals(createSalesItems(4)),
    notes: "Thank you for your business.",
    termsAndConditions: "Payment due within 30 days.",
    status: "paid",
    paymentStatus: "paid",
    amountPaid: calculateTotals(createSalesItems(4)).total,
    balanceDue: 0,
    createdBy: "Admin User",
    createdAt: new Date(2025, 3, 20)
  }
];

// More mock data for other document types would follow similar patterns
// For this implementation, we'll provide just a couple of examples for each type

// Mock RetainerInvoices
export const mockRetainerInvoices: RetainerInvoice[] = [
  {
    id: "RET1001",
    number: "RET-1001",
    customer: mockCustomers[2],
    date: new Date(2025, 3, 1), // April 1, 2025
    dueDate: new Date(2025, 3, 15), // April 15, 2025
    paymentDue: new Date(2025, 3, 15),
    paymentTerms: "Net 15",
    items: createSalesItems(1),
    ...calculateTotals(createSalesItems(1)),
    notes: "Monthly retainer for consulting services.",
    termsAndConditions: "Retainer terms apply.",
    status: "paid",
    paymentStatus: "paid",
    amountPaid: calculateTotals(createSalesItems(1)).total,
    balanceDue: 0,
    retainerPeriod: {
      startDate: new Date(2025, 3, 1), // April 1, 2025
      endDate: new Date(2025, 3, 30), // April 30, 2025
    },
    createdBy: "Admin User",
    createdAt: new Date(2025, 3, 1)
  }
];

// Mock Sales Orders
export const mockSalesOrders: SalesOrder[] = [
  {
    id: "SO1001",
    number: "SO-1001",
    customer: mockCustomers[0],
    date: new Date(2025, 3, 5), // April 5, 2025
    items: createSalesItems(3),
    ...calculateTotals(createSalesItems(3)),
    notes: "Please fulfill as soon as possible.",
    status: "approved",
    isFulfilled: false,
    fulfillmentStatus: "unfulfilled",
    createdBy: "Admin User",
    createdAt: new Date(2025, 3, 5)
  }
];

// For brevity, other mock data collections would be defined similarly
// Mock collections for DeliveryChallan, Payment, RecurringInvoice, CreditNote, 
// SalesReturn, Receipt, and DebitNote would follow the same pattern

// Export functions to access mock data
export const getCustomers = () => mockCustomers;
export const getEstimates = () => mockEstimates;
export const getInvoices = () => mockInvoices;
export const getRetainerInvoices = () => mockRetainerInvoices;
export const getSalesOrders = () => mockSalesOrders;

// Additional export functions would be defined for other document types
