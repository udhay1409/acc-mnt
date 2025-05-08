
import React from 'react';
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
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

export const statusColors: Record<string, string> = {
  draft: "bg-gray-200 text-gray-800",
  sent: "bg-blue-100 text-blue-800",
  viewed: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  paid: "bg-green-100 text-green-800",
  partially_paid: "bg-emerald-100 text-emerald-800",
  overdue: "bg-red-100 text-red-800",
  cancelled: "bg-slate-100 text-slate-800",
  unfulfilled: "bg-orange-100 text-orange-800",
  partially_fulfilled: "bg-yellow-100 text-yellow-800",
  fulfilled: "bg-green-100 text-green-800",
  pending: "bg-blue-100 text-blue-800",
  processed: "bg-green-100 text-green-800",
  expired: "bg-orange-100 text-orange-800",
};

interface Document {
  id: string;
  number: string;
  customer: {
    name: string;
  };
  date: Date;
  total: number;
  status: string;
}

interface DocumentListProps {
  title: string;
  description: string;
  documents: Document[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  createButtonText: string;
  showDueDates?: boolean;
  showExpiryDates?: boolean;
  additionalButtonText?: string;
}

const DocumentList: React.FC<DocumentListProps> = ({
  title,
  description,
  documents,
  searchQuery,
  setSearchQuery,
  createButtonText,
  showDueDates = false,
  showExpiryDates = false,
  additionalButtonText
}) => {
  const filteredDocuments = documents.filter(doc => 
    doc.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={`Search ${title.toLowerCase()}...`}
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> {createButtonText}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Number</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                {showDueDates && <TableHead>Due Date</TableHead>}
                {showExpiryDates && <TableHead>Expiry Date</TableHead>}
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        {doc.number}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        {doc.customer.name}
                      </div>
                    </TableCell>
                    <TableCell>{format(doc.date, 'MMM dd, yyyy')}</TableCell>
                    {/* @ts-ignore */}
                    {showDueDates && <TableCell>{doc.dueDate ? format(doc.dueDate, 'MMM dd, yyyy') : '-'}</TableCell>}
                    {/* @ts-ignore */}
                    {showExpiryDates && <TableCell>{doc.expiryDate ? format(doc.expiryDate, 'MMM dd, yyyy') : '-'}</TableCell>}
                    <TableCell className="font-medium">${doc.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[doc.status] || "bg-gray-100"}>
                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1).replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View</Button>
                        {additionalButtonText && (
                          <Button variant="outline" size="sm">{additionalButtonText}</Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell 
                    colSpan={7 + (showDueDates ? 1 : 0) + (showExpiryDates ? 1 : 0)} 
                    className="text-center py-8 text-muted-foreground"
                  >
                    No {title.toLowerCase()} found. Try adjusting your search.
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

export default DocumentList;
