import React, { useState } from 'react';
import { useTenant } from '@/contexts/TenantContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building, Plus, Edit, Trash2, Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Organization } from '@/models/organization';

const OrganizationsPage = () => {
  const { availableOrganizations, currentOrganizationId, setCurrentOrganizationId } = useTenant();
  const { user } = useAuth();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');

  const handleCreateOrg = () => {
    if (!newOrgName.trim()) {
      toast.error("Organization name can't be empty");
      return;
    }

    toast.success(`Organization "${newOrgName}" created`);
    setNewOrgName('');
    setIsCreateDialogOpen(false);
    // In a real app, this would make an API call to create the organization
  };

  const handleSwitchOrg = (orgId: string) => {
    setCurrentOrganizationId(orgId);
  };

  return (
    <div className="container max-w-5xl py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Organizations</h1>
          <p className="text-muted-foreground">
            Manage your organizations and settings
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Organization
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {availableOrganizations.map((org) => (
          <OrganizationCard 
            key={org.id}
            organization={org}
            isActive={org.id === currentOrganizationId}
            onSwitch={() => handleSwitchOrg(org.id)}
          />
        ))}
      </div>

      {/* Create Organization Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Organization</DialogTitle>
            <DialogDescription>
              Add a new organization to your account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Organization name</Label>
              <Input
                id="name"
                placeholder="Enter organization name"
                value={newOrgName}
                onChange={(e) => setNewOrgName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateOrg}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface OrganizationCardProps {
  organization: Organization;
  isActive: boolean;
  onSwitch: () => void;
}

const OrganizationCard = ({ organization, isActive, onSwitch }: OrganizationCardProps) => {
  return (
    <Card className={`overflow-hidden ${isActive ? 'border-primary' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="mr-2 h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
              {organization.logo ? (
                <img 
                  src={organization.logo} 
                  alt={organization.name} 
                  className="h-8 w-8" 
                />
              ) : (
                <Building className="h-5 w-5 text-primary" />
              )}
            </div>
            <div>
              <CardTitle>{organization.name}</CardTitle>
              <CardDescription>
                {organization.slug}
              </CardDescription>
            </div>
          </div>
          <Badge variant={isActive ? "default" : "outline"}>
            {isActive ? "Current" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="text-sm">
        <p className="text-muted-foreground">
          Created: {new Date(organization.createdAt).toLocaleDateString()}
        </p>
        <p className="text-muted-foreground capitalize">
          Status: {organization.status}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-3 pb-3">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
        
        {!isActive && (
          <Button size="sm" onClick={onSwitch}>
            <Check className="h-4 w-4 mr-1" />
            Switch
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default OrganizationsPage;
