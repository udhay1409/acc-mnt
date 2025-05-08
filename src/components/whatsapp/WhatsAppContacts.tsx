
import React, { useState } from 'react';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MessageSquare,
  Search,
  UserPlus,
  Download,
  Upload,
  Filter
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Mock data for contacts
const mockContacts = [
  { id: '1', name: 'John Smith', phone: '+91 98765 12345', status: 'active', tags: ['customer', 'retail'], lastContact: '2023-05-01' },
  { id: '2', name: 'Sarah Johnson', phone: '+91 87654 23456', status: 'active', tags: ['lead'], lastContact: '2023-05-03' },
  { id: '3', name: 'Michael Brown', phone: '+91 76543 34567', status: 'inactive', tags: ['customer', 'wholesale'], lastContact: '2023-04-15' },
  { id: '4', name: 'Emily Davis', phone: '+91 65432 45678', status: 'active', tags: ['customer', 'retail'], lastContact: '2023-05-06' },
  { id: '5', name: 'Daniel Wilson', phone: '+91 54321 56789', status: 'active', tags: ['lead', 'retail'], lastContact: '2023-05-07' },
];

const WhatsAppContacts = () => {
  const [contacts, setContacts] = useState(mockContacts);
  const [searchTerm, setSearchTerm] = useState('');

  const handleImportContacts = () => {
    toast({
      title: "Import Started",
      description: "Your contacts are being imported. This may take a few minutes.",
    });
  };

  const handleExportContacts = () => {
    toast({
      title: "Export Complete",
      description: "Your contacts have been exported successfully.",
    });
  };

  const handleSendMessage = (contactName: string) => {
    toast({
      title: "Message Composer",
      description: `Compose a message to ${contactName}`,
    });
  };

  // Filter contacts based on search term
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search contacts..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleImportContacts} variant="outline" className="flex gap-2">
            <Upload className="h-4 w-4" /> Import
          </Button>
          <Button onClick={handleExportContacts} variant="outline" className="flex gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button className="flex gap-2">
            <UserPlus className="h-4 w-4" /> New Contact
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>WhatsApp Contacts</CardTitle>
          <CardDescription>Manage your WhatsApp business contacts</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    No contacts found matching your search
                  </TableCell>
                </TableRow>
              ) : (
                filteredContacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">{contact.name}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                        contact.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {contact.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {contact.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(contact.lastContact).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleSendMessage(contact.name)}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppContacts;
