
import React, { useState } from 'react';
import { CreditCard, Eye, EyeOff, Shield, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { PaymentGatewaySettings } from '@/models/superadmin';

const initialRazorpaySettings: PaymentGatewaySettings = {
  gateway: 'razorpay',
  apiKey: 'rzp_test_1234567890123456',
  apiSecret: 'abcdefghijklmnopqrstuvwxyz123456',
  isTestMode: true,
  webhookSecret: 'whsec_1234567890abcdef',
  isActive: false
};

const PaymentGateways = () => {
  const [razorpaySettings, setRazorpaySettings] = useState<PaymentGatewaySettings>(initialRazorpaySettings);
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({
    razorpayApiSecret: false,
    razorpayWebhook: false,
  });
  
  const toggleShowSecret = (key: string) => {
    setShowSecrets({
      ...showSecrets,
      [key]: !showSecrets[key]
    });
  };

  const handleSaveRazorpay = () => {
    // In a real app, this would save to an API endpoint
    toast.success("Razorpay settings saved successfully");
  };

  const toggleTestMode = () => {
    setRazorpaySettings({
      ...razorpaySettings,
      isTestMode: !razorpaySettings.isTestMode
    });
  };

  const toggleActiveStatus = () => {
    const newStatus = !razorpaySettings.isActive;
    setRazorpaySettings({
      ...razorpaySettings,
      isActive: newStatus
    });
    toast.success(`Razorpay gateway ${newStatus ? 'activated' : 'deactivated'}`);
  };

  const formatKey = (key: string, show: boolean) => {
    if (show) return key;
    return key.substring(0, 4) + '••••••••••••' + key.substring(key.length - 4);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Payment Gateways</h2>
        <p className="text-muted-foreground">
          Configure payment gateways for subscription billing
        </p>
      </div>
      
      <Tabs defaultValue="razorpay" className="max-w-4xl">
        <TabsList>
          <TabsTrigger value="razorpay">Razorpay</TabsTrigger>
          <TabsTrigger value="stripe" disabled>Stripe (Coming Soon)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="razorpay" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <CardTitle>Razorpay Configuration</CardTitle>
                </div>
                <Badge variant={razorpaySettings.isActive ? "default" : "outline"}>
                  {razorpaySettings.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <CardDescription>
                Configure Razorpay API keys and settings for subscription payments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-end space-x-2">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="test-mode" 
                    checked={razorpaySettings.isTestMode} 
                    onCheckedChange={toggleTestMode}
                  />
                  <Label htmlFor="test-mode" className="text-muted-foreground text-sm">
                    Test Mode
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="active-status" 
                    checked={razorpaySettings.isActive} 
                    onCheckedChange={toggleActiveStatus}
                  />
                  <Label htmlFor="active-status" className="text-muted-foreground text-sm">
                    Active
                  </Label>
                </div>
              </div>
              
              <div className={`p-3 rounded-md ${razorpaySettings.isTestMode ? 'bg-amber-50 border border-amber-200' : 'bg-emerald-50 border border-emerald-200'}`}>
                <div className="flex items-center">
                  <Shield className={`h-5 w-5 mr-2 ${razorpaySettings.isTestMode ? 'text-amber-500' : 'text-emerald-500'}`} />
                  <p className={`text-sm font-medium ${razorpaySettings.isTestMode ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {razorpaySettings.isTestMode 
                      ? "Test Mode Enabled: Payments will use the Razorpay test environment" 
                      : "Live Mode Enabled: Payments will be processed in the production environment"}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="api-key">API Key {razorpaySettings.isTestMode && <span className="text-sm text-muted-foreground">(Test)</span>}</Label>
                  <Input
                    id="api-key"
                    value={razorpaySettings.apiKey}
                    onChange={(e) => setRazorpaySettings({...razorpaySettings, apiKey: e.target.value})}
                    placeholder="rzp_test_XXXXXXXXXXXXX or rzp_live_XXXXXXXXXXXXX"
                  />
                  <p className="text-xs text-muted-foreground">
                    The API key can be found in your Razorpay dashboard under Settings &gt; API Keys
                  </p>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="api-secret">
                    API Secret {razorpaySettings.isTestMode && <span className="text-sm text-muted-foreground">(Test)</span>}
                  </Label>
                  <div className="flex">
                    <Input
                      id="api-secret"
                      type={showSecrets.razorpayApiSecret ? "text" : "password"}
                      value={formatKey(razorpaySettings.apiSecret, showSecrets.razorpayApiSecret)}
                      onChange={(e) => setRazorpaySettings({...razorpaySettings, apiSecret: e.target.value})}
                      className="rounded-r-none"
                      placeholder="API Secret Key"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-l-none border-l-0"
                      onClick={() => toggleShowSecret('razorpayApiSecret')}
                    >
                      {showSecrets.razorpayApiSecret ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    The API secret should be kept confidential and never exposed in client-side code
                  </p>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="webhook-secret">Webhook Secret (Optional)</Label>
                  <div className="flex">
                    <Input
                      id="webhook-secret"
                      type={showSecrets.razorpayWebhook ? "text" : "password"}
                      value={formatKey(razorpaySettings.webhookSecret || '', showSecrets.razorpayWebhook)}
                      onChange={(e) => setRazorpaySettings({...razorpaySettings, webhookSecret: e.target.value})}
                      className="rounded-r-none"
                      placeholder="Webhook Secret Key"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-l-none border-l-0"
                      onClick={() => toggleShowSecret('razorpayWebhook')}
                    >
                      {showSecrets.razorpayWebhook ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Used to verify webhook events sent by Razorpay
                  </p>
                </div>
                
                <div className="grid gap-2 py-4">
                  <Label>Webhook URL</Label>
                  <div className="flex">
                    <Input
                      value={`${window.location.origin}/api/webhooks/razorpay`}
                      readOnly
                      className="bg-muted"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="ml-2"
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/api/webhooks/razorpay`);
                        toast.success("Webhook URL copied to clipboard");
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Configure this URL in your Razorpay dashboard to receive webhook events
                  </p>
                </div>
                
                <div className="pt-4 space-y-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center">
                      {razorpaySettings.apiKey && razorpaySettings.apiSecret ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mr-2" />
                      )}
                      <span className={razorpaySettings.apiKey && razorpaySettings.apiSecret ? "text-green-700" : "text-red-700"}>
                        API Keys Configured
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      {razorpaySettings.isActive ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <XCircle className="h-5 w-5 text-amber-500 mr-2" />
                      )}
                      <span className={razorpaySettings.isActive ? "text-green-700" : "text-amber-700"}>
                        {razorpaySettings.isActive ? "Gateway Active" : "Gateway Not Active"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setRazorpaySettings(initialRazorpaySettings)}>
                      Reset
                    </Button>
                    <Button onClick={handleSaveRazorpay}>
                      Save Razorpay Settings
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentGateways;
