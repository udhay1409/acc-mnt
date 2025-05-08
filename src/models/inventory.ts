
import { Product } from './pos';

export type StockMovementType = 'purchase' | 'sale' | 'adjustment' | 'return' | 'transfer';

export interface StockMovement {
  id: string;
  productId: string;
  date: Date;
  type: StockMovementType;
  quantity: number;
  beforeQuantity: number;
  afterQuantity: number;
  reference?: string;
  notes?: string;
  createdBy: string;
  createdAt: Date;
}

export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
  productCount: number;
}

export interface ProductWithMovements extends Product {
  movements?: StockMovement[];
}
