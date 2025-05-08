
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Pencil, Trash2, ArrowUpRight, FileText } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Generic interface for documents
interface Document {
  id: string;
  reference: string;
  vendor?: string;
  date: string;
  dueDate?: string;
  status: string;
  total: number;
}

interface PurchaseDocumentListProps {
  title: string;
  description: string;
  documents: Document[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAdd: () => void;
  onEdit: (document: Document) => void;
  onDelete: (document: Document) => void;
  onView?: (document: Document) => void;
  additionalAction?: {
    label: string;
    icon: React.ReactNode;
    onClick: (document: Document) => void;
    showFor?: (document: Document) => boolean;
  };
  statusColors: {
    [key: string]: {
      bg: string;
      text: string;
    };
  };
}

const PurchaseDocumentList: React.FC<PurchaseDocumentListProps> = ({
  title,
  description,
  documents,
  searchQuery,
  setSearchQuery,
  onAdd,
  onEdit,
  onDelete,
  onView,
  additionalAction,
  statusColors,
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<Document | null>(null);
  const { toast } = useToast();

  // Filter documents based on search query
  const filteredDocuments = documents.filter(
    doc =>
      doc.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.vendor && doc.vendor.toLowerCase().includes(searchQuery.toLowerCase())) ||
      doc.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle delete
  const handleConfirmDelete = () => {
    if (documentToDelete) {
      onDelete(documentToDelete);
      toast({
        title: "Document Deleted",
        description: `${documentToDelete.reference} has been removed.`,
        variant: "destructive"
      });
      setDeleteDialogOpen(false);
      setDocumentToDelete(null);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center space-y-2 sm:space-y-0">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Button onClick={onAdd}>
            <Plus className="mr-2 h-4 w-4" /> Add {title.slice(0, -1)}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder={`Search ${title.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  {documents.some(doc => doc.dueDate) && (
                    <TableHead className="hidden md:table-cell">Due Date</TableHead>
                  )}
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No {title.toLowerCase()} found. Try adjusting your search.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.reference}</TableCell>
                      <TableCell>{doc.vendor}</TableCell>
                      <TableCell className="hidden md:table-cell">{doc.date}</TableCell>
                      {documents.some(d => d.dueDate) && (
                        <TableCell className="hidden md:table-cell">{doc.dueDate || '-'}</TableCell>
                      )}
                      <TableCell>${doc.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            statusColors[doc.status]
                              ? `${statusColors[doc.status].bg} ${statusColors[doc.status].text}`
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {doc.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {onView && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onView(doc)}
                              title="View details"
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                          )}
                          
                          {additionalAction && 
                           (!additionalAction.showFor || additionalAction.showFor(doc)) && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => additionalAction.onClick(doc)}
                              title={additionalAction.label}
                            >
                              {additionalAction.icon}
                            </Button>
                          )}
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(doc)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setDocumentToDelete(doc);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{documentToDelete?.reference}".
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PurchaseDocumentList;
