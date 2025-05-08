
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
import { Search, Plus, FileText, Users } from 'lucide-react';
import { Invoice } from '@/models/sales';
import { getInvoices } from '@/data/mockSales';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

const statusColors: Record<string, string> = {
  draft: "bg-gray-200 text-gray-800",
  sent: "bg-blue-100 text-blue-800",
  viewed: "bg-yellow-100 text-yellow-800",
  paid: "bg-green-100 text-green-800",
  partially_paid: "bg-emerald-100 text-emerald-800",
  overdue: "bg-red-100 text-red-800",
  cancelled: "bg-slate-100 text-slate-800"
};

const InvoicesList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const invoices = getInvoices();
  
  const filteredInvoices = invoices.filter(invoice => 
    invoice.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search invoices..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Create Invoice
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>Manage your sales invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Number</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        {invoice.number}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        {invoice.customer.name}
                      </div>
                    </TableCell>
                    <TableCell>{format(invoice.date, 'MMM dd, yyyy')}</TableCell>
                    <TableCell>{format(invoice.dueDate || invoice.date, 'MMM dd, yyyy')}</TableCell>
                    <TableCell className="font-medium">${invoice.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[invoice.paymentStatus] || "bg-gray-100"}>
                        {invoice.paymentStatus.charAt(0).toUpperCase() + invoice.paymentStatus.slice(1).replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Record Payment</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No invoices found. Try adjusting your search.
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

export default InvoicesList;
