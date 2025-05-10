
import React, { useState } from 'react';
import { Package, Plus, Check, Edit, Trash2, AlertCircle, CheckCircle2, XCircle, Users, Grid3X3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { ApplicationModule, SubscriptionPlan } from '@/models/superadmin';

// All available modules in the system
const availableModules: {id: ApplicationModule, name: string}[] = [
  { id: 'inventory', name: 'Inventory Management' },
  { id: 'pos', name: 'Point of Sale' },
  { id: 'sales', name: 'Sales Management' },
  { id: 'purchases', name: 'Purchases & Expenses' },
  { id: 'accounting', name: 'Accounting' },
  { id: 'crm', name: 'CRM' },
  { id: 'whatsapp', name: 'WhatsApp Integration' },
  { id: 'reports', name: 'Reports & Analytics' }
];

// Mock subscription plans
const initialPlans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Essentials features for a small business",
    price: 999,
    currency: "INR",
    interval: "monthly",
    features: [
      "Basic Inventory Management",
      "Simple POS System",
      "Standard Support",
      "5GB Storage"
    ],
    userLimit: 10,
    modules: ['inventory', 'pos', 'sales'],
    isActive: true,
    isPopular: false,
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z"
  },
  {
    id: "standard",
    name: "Standard",
    description: "Perfect for growing businesses",
    price: 1999,
    currency: "INR",
    interval: "monthly",
    features: [
      "Advanced Inventory Management",
      "Complete POS System",
      "Priority Support",
      "15GB Storage",
      "CRM Integration",
      "Basic Reports"
    ],
    userLimit: 25,
    modules: ['inventory', 'pos', 'sales', 'purchases', 'crm', 'reports'],
    isActive: true,
    isPopular: true,
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z"
  },
  {
    id: "premium",
    name: "Premium",
    description: "Advanced features for larger operations",
    price: 3999,
    currency: "INR",
    interval: "monthly",
    features: [
      "Complete Inventory Management",
      "Advanced POS System",
      "24/7 Priority Support",
      "50GB Storage",
      "Full CRM Integration",
      "Advanced Reports",
      "WhatsApp Integration",
      "Multi-branch Support"
    ],
    userLimit: 0, // Unlimited users
    modules: ['inventory', 'pos', 'sales', 'purchases', 'accounting', 'crm', 'whatsapp', 'reports'],
    isActive: true,
    isPopular: false,
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z"
  }
];

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>(initialPlans);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleOpenCreateDialog = () => {
    setCurrentPlan({
      id: "",
      name: "",
      description: "",
      price: 999,
      currency: "INR",
      interval: "monthly",
      features: [""],
      userLimit: 10,
      modules: [],
      isActive: true,
      isPopular: false,
      createdAt: "",
      updatedAt: ""
    });
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (plan: SubscriptionPlan) => {
    setCurrentPlan({
      ...plan,
      features: [...plan.features]
    });
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleOpenDeleteDialog = (plan: SubscriptionPlan) => {
    setCurrentPlan(plan);
    setIsDeleteDialogOpen(true);
  };

  const handleSavePlan = () => {
    if (!currentPlan) return;
    
    if (!currentPlan.name || !currentPlan.description || currentPlan.price <= 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Filter out empty feature strings
    const features = currentPlan.features.filter(feature => feature.trim() !== "");
    
    if (features.length === 0) {
      toast.error("Please add at least one feature");
      return;
    }
    
    if (currentPlan.modules.length === 0) {
      toast.error("Please select at least one module");
      return;
    }

    if (isEditMode) {
      setPlans(plans.map(p => p.id === currentPlan.id ? {...currentPlan, features} : p));
      toast.success(`Plan "${currentPlan.name}" updated successfully`);
    } else {
      // Generate a simple ID from the name
      const newId = currentPlan.name.toLowerCase().replace(/\s+/g, '-');
      const newPlan = {
        ...currentPlan,
        id: newId,
        features,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setPlans([...plans, newPlan]);
      toast.success(`Plan "${currentPlan.name}" created successfully`);
    }
    setIsDialogOpen(false);
  };

  const handleDeletePlan = () => {
    if (!currentPlan) return;
    
    setPlans(plans.filter(p => p.id !== currentPlan.id));
    toast.success(`Plan "${currentPlan.name}" deleted successfully`);
    setIsDeleteDialogOpen(false);
  };

  const handleTogglePlanStatus = (planId: string) => {
    setPlans(plans.map(plan => 
      plan.id === planId 
        ? { ...plan, isActive: !plan.isActive } 
        : plan
    ));
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      toast.success(`Plan "${plan.name}" ${plan.isActive ? 'deactivated' : 'activated'}`);
    }
  };

  const handleAddFeature = () => {
    if (!currentPlan) return;
    
    setCurrentPlan({
      ...currentPlan,
      features: [...currentPlan.features, ""]
    });
  };

  const handleRemoveFeature = (index: number) => {
    if (!currentPlan) return;
    
    const features = [...currentPlan.features];
    features.splice(index, 1);
    setCurrentPlan({
      ...currentPlan,
      features
    });
  };

  const handleFeatureChange = (index: number, value: string) => {
    if (!currentPlan) return;
    
    const features = [...currentPlan.features];
    features[index] = value;
    setCurrentPlan({
      ...currentPlan,
      features
    });
  };

  const handleModuleToggle = (moduleId: ApplicationModule) => {
    if (!currentPlan) return;
    
    const modules = [...currentPlan.modules];
    if (modules.includes(moduleId)) {
      setCurrentPlan({
        ...currentPlan,
        modules: modules.filter(id => id !== moduleId)
      });
    } else {
      setCurrentPlan({
        ...currentPlan,
        modules: [...modules, moduleId]
      });
    }
  };

  const formatPrice = (price: number, currency: string) => {
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    });
    return formatter.format(price);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Subscription Plans</h2>
          <p className="text-muted-foreground">
            Create and manage subscription plans for organizations
          </p>
        </div>
        <Button onClick={handleOpenCreateDialog}>
          <Plus className="mr-2 h-4 w-4" /> New Plan
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id} className={`overflow-hidden ${plan.isPopular ? 'border-primary' : ''}`}>
            {plan.isPopular && (
              <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                Most Popular
              </div>
            )}
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center">
                    <Package className="mr-2 h-5 w-5 text-muted-foreground" />
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {plan.description}
                  </CardDescription>
                </div>
                <Badge variant={plan.isActive ? "default" : "outline"} className="ml-2">
                  {plan.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">
                {formatPrice(plan.price, plan.currency)}
                <span className="text-base font-normal text-muted-foreground">/{plan.interval}</span>
              </div>
              
              {/* User limit */}
              <div className="flex items-center mb-3 text-sm">
                <Users className="h-5 w-5 text-blue-500 mr-2 shrink-0" />
                <span className="font-medium">
                  {plan.userLimit === 0 ? 'Unlimited Users' : `${plan.userLimit} Users`}
                </span>
              </div>
              
              {/* Modules */}
              <div className="mb-4">
                <div className="flex items-center mb-2 text-sm">
                  <Grid3X3 className="h-5 w-5 text-blue-500 mr-2 shrink-0" />
                  <span className="font-medium">Available Modules:</span>
                </div>
                <div className="flex flex-wrap gap-1 ml-7 mb-4">
                  {plan.modules.map(moduleId => {
                    const module = availableModules.find(m => m.id === moduleId);
                    return (
                      <Badge key={moduleId} variant="outline" className="bg-blue-50">
                        {module?.name || moduleId}
                      </Badge>
                    );
                  })}
                </div>
              </div>
              
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id={`active-${plan.id}`} 
                  checked={plan.isActive} 
                  onCheckedChange={() => handleTogglePlanStatus(plan.id)}
                />
                <Label htmlFor={`active-${plan.id}`}>
                  {plan.isActive ? 'Active' : 'Inactive'}
                </Label>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleOpenEditDialog(plan)}>
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => handleOpenDeleteDialog(plan)}>
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Create/Edit Plan Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit' : 'Create'} Subscription Plan</DialogTitle>
            <DialogDescription>
              {isEditMode ? 'Update the details of this subscription plan.' : 'Define the details for a new subscription plan.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
            <div className="grid gap-2">
              <Label htmlFor="plan-name">Plan Name</Label>
              <Input
                id="plan-name"
                value={currentPlan?.name || ''}
                onChange={(e) => setCurrentPlan(currentPlan ? {...currentPlan, name: e.target.value} : null)}
                placeholder="e.g. Basic, Standard, Premium"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="plan-description">Description</Label>
              <Textarea
                id="plan-description"
                value={currentPlan?.description || ''}
                onChange={(e) => setCurrentPlan(currentPlan ? {...currentPlan, description: e.target.value} : null)}
                placeholder="Brief description of what this plan offers"
                rows={2}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="plan-price">Price</Label>
                <Input
                  id="plan-price"
                  type="number"
                  value={currentPlan?.price || ''}
                  onChange={(e) => setCurrentPlan(currentPlan ? {...currentPlan, price: Number(e.target.value)} : null)}
                  placeholder="0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="plan-currency">Currency</Label>
                <select
                  id="plan-currency"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={currentPlan?.currency || 'INR'}
                  onChange={(e) => setCurrentPlan(currentPlan ? {...currentPlan, currency: e.target.value} : null)}
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="plan-interval">Billing Interval</Label>
                <select
                  id="plan-interval"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={currentPlan?.interval || 'monthly'}
                  onChange={(e) => setCurrentPlan(currentPlan ? {...currentPlan, interval: e.target.value as 'monthly' | 'quarterly' | 'yearly'} : null)}
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="user-limit">User Limit</Label>
                <Input
                  id="user-limit"
                  type="number"
                  min="0"
                  value={currentPlan?.userLimit || 0}
                  onChange={(e) => setCurrentPlan(currentPlan ? {...currentPlan, userLimit: Number(e.target.value)} : null)}
                  placeholder="Number of users"
                />
                <p className="text-xs text-muted-foreground mt-1">Enter 0 for unlimited users</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Switch
                id="plan-popular"
                checked={currentPlan?.isPopular || false}
                onCheckedChange={(checked) => setCurrentPlan(currentPlan ? {...currentPlan, isPopular: checked} : null)}
              />
              <Label htmlFor="plan-popular">Mark as Popular</Label>
            </div>
            
            {/* Modules Selection */}
            <div className="grid gap-3 pt-2">
              <Label>Available Modules</Label>
              <div className="grid grid-cols-2 gap-3">
                {availableModules.map(module => (
                  <div key={module.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`module-${module.id}`}
                      checked={currentPlan?.modules.includes(module.id)}
                      onCheckedChange={() => handleModuleToggle(module.id)}
                    />
                    <Label htmlFor={`module-${module.id}`} className="text-sm font-normal">
                      {module.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid gap-2 pt-2">
              <Label className="flex justify-between items-center">
                <span>Features</span>
                <Button type="button" variant="outline" size="sm" onClick={handleAddFeature}>
                  <Plus className="h-4 w-4 mr-1" /> Add Feature
                </Button>
              </Label>
              
              {currentPlan?.features?.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => handleFeatureChange(idx, e.target.value)}
                    placeholder="e.g. 10 Users, 5GB Storage"
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="shrink-0" 
                    onClick={() => handleRemoveFeature(idx)}
                  >
                    <XCircle className="h-5 w-5 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePlan}>
              {isEditMode ? 'Update Plan' : 'Create Plan'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete Subscription Plan</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the "{currentPlan?.name}" plan? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center p-4 border rounded-md bg-destructive/10 text-destructive mb-4">
              <AlertCircle className="h-5 w-5 mr-2 shrink-0" />
              <p className="text-sm">Deleting this plan will not affect existing subscriptions, but organizations will not be able to subscribe to it anymore.</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeletePlan}>
              Delete Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubscriptionPlans;
