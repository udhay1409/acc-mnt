
import React from 'react';
import { StockMovement } from '@/models/inventory';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface StockMovementsTableProps {
  movements: StockMovement[];
}

const StockMovementsTable: React.FC<StockMovementsTableProps> = ({ movements }) => {
  const getMovementTypeColor = (type: string) => {
    switch (type) {
      case 'purchase':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'sale':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'adjustment':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'return':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'transfer':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Before</TableHead>
            <TableHead>After</TableHead>
            <TableHead>Reference</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movements.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                No stock movements found for this product.
              </TableCell>
            </TableRow>
          ) : (
            movements.map((movement) => (
              <TableRow key={movement.id}>
                <TableCell>{format(new Date(movement.date), 'MMM dd, yyyy')}</TableCell>
                <TableCell>
                  <Badge 
                    className={getMovementTypeColor(movement.type)}
                    variant="outline"
                  >
                    {movement.type.charAt(0).toUpperCase() + movement.type.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className={movement.quantity > 0 ? 'text-green-600' : 'text-red-600'}>
                  {movement.quantity > 0 ? `+${movement.quantity}` : movement.quantity}
                </TableCell>
                <TableCell>{movement.beforeQuantity}</TableCell>
                <TableCell>{movement.afterQuantity}</TableCell>
                <TableCell>{movement.reference || '-'}</TableCell>
                <TableCell>{movement.notes || '-'}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default StockMovementsTable;
