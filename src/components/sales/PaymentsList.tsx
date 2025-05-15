
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Wallet, FileText, Calendar, Clock, Users } from 'lucide-react';
import { Payment } from '@/models/sales';
import { getPayments } from '@/data/mockSales';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const paymentMethodColors: Record<string, string> = {
  cash: "bg-green-100 text-green-800",
  bank_transfer: "bg-blue-100 text-blue-800",
  credit_card: "bg-purple-100 text-purple-800",
  check: "bg-amber-100 text-amber-800",
  online: "bg-cyan-100 text-cyan-800",
  other: "bg-gray-100 text-gray-800",
};

const PaymentsList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const payments = getPayments();
  
  const filteredPayments = payments.filter(payment => 
    payment.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.reference?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search payments..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Record Payment
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payments Received</CardTitle>
          <CardDescription>Track and manage all payments received from your customers</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Invoices</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        {format(payment.date, 'MMM dd, yyyy')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        {payment.customer.name}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">₹{payment.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={paymentMethodColors[payment.paymentMethod] || "bg-gray-100"}>
                        {payment.paymentMethod.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                    </TableCell>
                    <TableCell>{payment.reference || '-'}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        {payment.invoiceIds.length} {payment.invoiceIds.length === 1 ? 'invoice' : 'invoices'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Receipt</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No payments found. Try adjusting your search or record a new payment.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentsList;

