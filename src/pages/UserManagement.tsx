
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/contexts/AuthContext';
import { 
  User as UserIcon, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Trash, 
  Pencil, 
  Key,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import { useState as useStateCallback } from 'react';

// Interface for the User object
interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  username: string;
  role: UserRole;
  status: 'active' | 'inactive';
  createdAt: string;
}

// Mock data
const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@bizapp.com",
    phone: "123-456-7890",
    username: "admin",
    role: "admin",
    status: "active",
    createdAt: "2023-01-01T00:00:00.000Z"
  },
  {
    id: "2",
    name: "Cashier User",
    email: "cashier@bizapp.com",
    phone: "123-456-7891", 
    username: "cashier",
    role: "cashier",
    status: "active",
    createdAt: "2023-01-02T00:00:00.000Z"
  },
  {
    id: "3",
    name: "Accountant User",
    email: "accountant@bizapp.com",
    phone: "123-456-7892",
    username: "accountant",
    role: "accountant",
    status: "active",
    createdAt: "2023-01-03T00:00:00.000Z"
  },
  {
    id: "4",
    name: "Inventory User",
    email: "inventory@bizapp.com",
    phone: "123-456-7893",
    username: "inventory",
    role: "inventory_manager",
    status: "active",
    createdAt: "2023-01-04T00:00:00.000Z"
  },
  {
    id: "5",
    name: "Purchase User",
    email: "purchase@bizapp.com",
    phone: "123-456-7894",
    username: "purchase",
    role: "purchase_manager",
    status: "active",
    createdAt: "2023-01-05T00:00:00.000Z"
  },
  {
    id: "6",
    name: "Inactive User",
    email: "inactive@bizapp.com",
    phone: "123-456-7895",
    username: "inactive",
    role: "cashier",
    status: "inactive",
    createdAt: "2023-01-06T00:00:00.000Z"
  },
];

const UserManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNewUserDialogOpen, setIsNewUserDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  
  // New user form state
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: 'cashier' as UserRole,
    status: 'active' as 'active' | 'inactive'
  });
  
  // Edit form state
  const [editForm, setEditForm] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    username: '',
    role: '' as UserRole,
    status: '' as 'active' | 'inactive'
  });
  
  // Password reset state
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Pagination constants
  const itemsPerPage = 5;

  // Filter users based on search term, status and role filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  // Get paginated users
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Total pages
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Handle creating a new user
  const handleCreateUser = () => {
    // Validate form
    if (!newUser.name || !newUser.email || !newUser.username || !newUser.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (newUser.password !== newUser.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return;
    }

    // Check if username is already taken
    if (users.some(user => user.username === newUser.username)) {
      toast({
        title: "Error",
        description: "Username is already taken.",
        variant: "destructive"
      });
      return;
    }

    // Create new user
    const createdUser: User = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      username: newUser.username,
      role: newUser.role,
      status: newUser.status,
      createdAt: new Date().toISOString()
    };

    // Add user to list
    setUsers([...users, createdUser]);
    
    // Reset form and close dialog
    setNewUser({
      name: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      confirmPassword: '',
      role: 'cashier',
      status: 'active'
    });
    
    setIsNewUserDialogOpen(false);
    
    toast({
      title: "Success",
      description: `User ${createdUser.name} has been created.`
    });
  };

  // Handle user edit
  const handleEditUser = () => {
    // Validate form
    if (!editForm.name || !editForm.email || !editForm.username) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Check if username is already taken by another user
    if (users.some(user => user.username === editForm.username && user.id !== editForm.id)) {
      toast({
        title: "Error",
        description: "Username is already taken by another user.",
        variant: "destructive"
      });
      return;
    }

    // Update user
    const updatedUsers = users.map(user => {
      if (user.id === editForm.id) {
        return {
          ...user,
          name: editForm.name,
          email: editForm.email,
          phone: editForm.phone,
          username: editForm.username,
          role: editForm.role,
          status: editForm.status
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Success",
      description: `User ${editForm.name} has been updated.`
    });
  };

  // Handle user deletion
  const handleDeleteUser = () => {
    if (!currentUser) return;
    
    // Remove user
    const updatedUsers = users.filter(user => user.id !== currentUser.id);
    setUsers(updatedUsers);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Success",
      description: `User ${currentUser.name} has been deleted.`
    });
  };

  // Handle password reset
  const handleResetPassword = () => {
    if (!currentUser) return;
    
    if (!newPassword) {
      toast({
        title: "Error",
        description: "Please enter a new password.",
        variant: "destructive"
      });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, we would update the password in the backend
    
    toast({
      title: "Success",
      description: `Password for ${currentUser.name} has been reset.`
    });
    
    setNewPassword('');
    setConfirmNewPassword('');
    setIsResetPasswordDialogOpen(false);
  };

  // Open edit dialog with user data
  const openEditDialog = (user: User) => {
    setEditForm({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      username: user.username,
      role: user.role,
      status: user.status
    });
    setCurrentUser(user);
    setIsEditDialogOpen(true);
  };

  // Open delete confirmation dialog
  const openDeleteDialog = (user: User) => {
    setCurrentUser(user);
    setIsDeleteDialogOpen(true);
  };

  // Open reset password dialog
  const openResetPasswordDialog = (user: User) => {
    setCurrentUser(user);
    setIsResetPasswordDialogOpen(true);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get badge color based on user role
  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'cashier':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'accountant':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inventory_manager':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'purchase_manager':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage system users and their access permissions
          </p>
        </div>
        <Button 
          onClick={() => setIsNewUserDialogOpen(true)} 
          className="bg-bizblue-500 hover:bg-bizblue-600"
        >
          <Plus className="h-4 w-4 mr-2" /> Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            View and manage all system users
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6 items-end">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                  }}
                />
              </div>
            </div>
            <div className="w-full md:w-40">
              <Label htmlFor="status-filter" className="text-xs">Status</Label>
              <Select 
                value={statusFilter} 
                onValueChange={(value) => {
                  setStatusFilter(value as 'all' | 'active' | 'inactive');
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger id="status-filter">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-48">
              <Label htmlFor="role-filter" className="text-xs">Role</Label>
              <Select 
                value={roleFilter} 
                onValueChange={(value) => {
                  setRoleFilter(value as 'all' | UserRole);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger id="role-filter">
                  <SelectValue placeholder="Filter Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="cashier">Cashier</SelectItem>
                  <SelectItem value="accountant">Accountant</SelectItem>
                  <SelectItem value="inventory_manager">Inventory Manager</SelectItem>
                  <SelectItem value="purchase_manager">Purchase Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Users Table */}
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Name</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Role</TableHead>
                  <TableHead className="hidden lg:table-cell">Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <span className="w-8 h-8 rounded-full bg-bizblue-100 text-bizblue-500 flex items-center justify-center mr-2">
                            <UserIcon className="h-4 w-4" />
                          </span>
                          {user.name}
                        </div>
                      </TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {user.email}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className={`py-1 px-2 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                          {user.role.replace('_', ' ')}
                        </span>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {formatDate(user.createdAt)}
                      </TableCell>
                      <TableCell>
                        {user.status === 'active' ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                            Inactive
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditDialog(user)}>
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openResetPasswordDialog(user)}>
                              <Key className="h-4 w-4 mr-2" />
                              Reset Password
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => openDeleteDialog(user)} 
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  
                  {Array.from({length: totalPages}, (_, i) => i + 1).map(page => {
                    // Always show first page, current page, and last page
                    // For others, use ellipsis to avoid too many page buttons
                    if (
                      page === 1 || 
                      page === totalPages || 
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(page);
                            }}
                            isActive={page === currentPage}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (
                      (page === currentPage - 2 && page > 1) || 
                      (page === currentPage + 2 && page < totalPages)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create User Dialog */}
      <Dialog open={isNewUserDialogOpen} onOpenChange={setIsNewUserDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Add a new user to the system with role-based permissions
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="create-name">Full Name</Label>
                <Input
                  id="create-name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-username">Username</Label>
                <Input
                  id="create-username"
                  value={newUser.username}
                  onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                  placeholder="johndoe"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-email">Email</Label>
              <Input
                id="create-email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                placeholder="john.doe@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-phone">Phone Number (Optional)</Label>
              <Input
                id="create-phone"
                value={newUser.phone}
                onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                placeholder="123-456-7890"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="create-password">Password</Label>
                <Input
                  id="create-password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-confirm-password">Confirm Password</Label>
                <Input
                  id="create-confirm-password"
                  type="password"
                  value={newUser.confirmPassword}
                  onChange={(e) => setNewUser({...newUser, confirmPassword: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-role">Role</Label>
              <Select
                value={newUser.role}
                onValueChange={(value) => setNewUser({...newUser, role: value as UserRole})}
              >
                <SelectTrigger id="create-role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="cashier">Cashier</SelectItem>
                  <SelectItem value="accountant">Accountant</SelectItem>
                  <SelectItem value="inventory_manager">Inventory Manager</SelectItem>
                  <SelectItem value="purchase_manager">Purchase Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="create-status"
                checked={newUser.status === 'active'}
                onCheckedChange={(checked) => 
                  setNewUser({...newUser, status: checked ? 'active' : 'inactive'})
                }
              />
              <Label htmlFor="create-status">Active</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewUserDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateUser}>Create User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user details and permissions
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-username">Username</Label>
                <Input
                  id="edit-username"
                  value={editForm.username}
                  onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                  placeholder="johndoe"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                placeholder="john.doe@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Phone Number (Optional)</Label>
              <Input
                id="edit-phone"
                value={editForm.phone}
                onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                placeholder="123-456-7890"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-role">Role</Label>
              <Select
                value={editForm.role}
                onValueChange={(value) => setEditForm({...editForm, role: value as UserRole})}
              >
                <SelectTrigger id="edit-role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="cashier">Cashier</SelectItem>
                  <SelectItem value="accountant">Accountant</SelectItem>
                  <SelectItem value="inventory_manager">Inventory Manager</SelectItem>
                  <SelectItem value="purchase_manager">Purchase Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-status"
                checked={editForm.status === 'active'}
                onCheckedChange={(checked) => 
                  setEditForm({...editForm, status: checked ? 'active' : 'inactive'})
                }
              />
              <Label htmlFor="edit-status">Active</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditUser}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-destructive">Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {currentUser && (
            <div className="py-4">
              <div className="flex items-center p-4 mb-4 rounded-md bg-destructive/10">
                <UserIcon className="h-10 w-10 text-destructive mr-4" />
                <div>
                  <p className="font-medium">{currentUser.name}</p>
                  <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                  <p className="text-sm capitalize mt-1">
                    <span className="inline-flex items-center">
                      {currentUser.role.replace('_', ' ')}
                      {currentUser.status === 'active' ? (
                        <CheckCircle className="h-3 w-3 text-green-500 ml-1" />
                      ) : (
                        <XCircle className="h-3 w-3 text-gray-500 ml-1" />
                      )}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={isResetPasswordDialogOpen} onOpenChange={setIsResetPasswordDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Set a new password for {currentUser?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-new-password">Confirm New Password</Label>
              <Input
                id="confirm-new-password"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResetPasswordDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleResetPassword}>Reset Password</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
