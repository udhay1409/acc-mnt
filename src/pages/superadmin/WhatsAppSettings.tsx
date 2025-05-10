
import React, { useState } from 'react';
import { Settings, Mail, Save, Globe, Link as LinkIcon, Download, Play } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { WhatsAppSettings as WhatsAppSettingsType } from '@/models/whatsapp';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const WhatsAppSettingsPage = () => {
  const [systemSettings, setSystemSettings] = useState<Partial<WhatsAppSettingsType>>({
    apiKey: '',
    phoneNumber: '+91 98765 43210',
    businessName: 'System WhatsApp',
    businessDescription: 'System-wide WhatsApp integration settings',
    status: 'pending',
    webhookUrl: 'https://your-app.com/api/whatsapp/system-webhook',
    notificationSettings: {
      incomingMessages: true,
      messageDelivered: false,
      messageRead: true,
      broadcastComplete: true,
      emailNotifications: false
    }
  });

  const [templateName, setTemplateName] = useState('');
  const [templateContent, setTemplateContent] = useState('');
  
  const businessCategories = [
    "RETAIL", "FOOD_AND_GROCERY", "PROFESSIONAL_SERVICES", "BUSINESS_TO_BUSINESS",
    "EDUCATION", "HEALTH_AND_BEAUTY", "TRAVEL_AND_TRANSPORTATION", "ENTERTAINMENT"
  ];

  const handleSaveSettings = () => {
    // In a real app, this would save the settings to an API
    toast.success('WhatsApp settings saved successfully');
  };

  const handleAddTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!templateName || !templateContent) {
      toast.error('Template name and content are required');
      return;
    }
    
    toast.success(`Template "${templateName}" added successfully`);
    setTemplateName('');
    setTemplateContent('');
  };

  const handleDownloadQR = () => {
    toast.info('QR code download initiated');
  };

  const updateSystemSetting = (key: string, value: any) => {
    setSystemSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updateNotificationSetting = (key: string, value: boolean) => {
    setSystemSettings(prev => ({
      ...prev,
      notificationSettings: {
        ...prev.notificationSettings,
        [key]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">WhatsApp Settings</h2>
        <p className="text-muted-foreground">
          Configure system-wide WhatsApp Business API integration settings
        </p>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <Settings className="h-4 w-4" /> Account Settings
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Globe className="h-4 w-4" /> Message Templates
          </TabsTrigger>
          <TabsTrigger value="defaults" className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4" /> Default Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                WhatsApp Business API Connection
              </CardTitle>
              <CardDescription>
                Connect your WhatsApp Business API account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Enter your WhatsApp Business API key"
                    value={systemSettings.apiKey}
                    onChange={(e) => updateSystemSetting('apiKey', e.target.value)}
                  />
                  <Button variant="secondary" size="sm" className="whitespace-nowrap">
                    Generate New
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  The API key is used to authenticate requests to the WhatsApp Business API
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="webhook-url">System Webhook URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="webhook-url"
                    value={systemSettings.webhookUrl}
                    readOnly
                  />
                  <Button variant="outline" size="icon">
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Use this URL as your webhook endpoint in the WhatsApp Business API dashboard
                </p>
              </div>

              <div className="pt-4">
                <Button onClick={handleDownloadQR} variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download QR Code for Connection
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Profile</CardTitle>
              <CardDescription>Configure your system WhatsApp business profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone-number">Business Phone Number</Label>
                <Input
                  id="phone-number"
                  value={systemSettings.phoneNumber}
                  onChange={(e) => updateSystemSetting('phoneNumber', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="business-name">Business Name</Label>
                <Input
                  id="business-name"
                  value={systemSettings.businessName}
                  onChange={(e) => updateSystemSetting('businessName', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="business-category">Business Category</Label>
                <Select 
                  onValueChange={(value) => updateSystemSetting('businessCategory', value)}
                  defaultValue="RETAIL"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.replace(/_/g, ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="business-description">Business Description</Label>
                <Textarea
                  id="business-description"
                  value={systemSettings.businessDescription}
                  onChange={(e) => updateSystemSetting('businessDescription', e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button onClick={handleSaveSettings} className="w-full">
                <Save className="mr-2 h-4 w-4" /> Save Business Profile
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Message Templates</CardTitle>
              <CardDescription>Create reusable message templates for organizations</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddTemplate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="template-name">Template Name</Label>
                  <Input
                    id="template-name"
                    placeholder="e.g., welcome_message"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="template-content">Template Content</Label>
                  <Textarea
                    id="template-content"
                    placeholder="Hello {{1}}, welcome to our service! We're glad to have you with us."
                    rows={5}
                    value={templateContent}
                    onChange={(e) => setTemplateContent(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Use {'{{'} 1 {'}}' }, {'{{'} 2 {'}}' }, etc. as placeholders for dynamic content
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="space-x-2">
                    <select className="text-sm border rounded p-1">
                      <option value="marketing">Marketing</option>
                      <option value="utility">Utility</option>
                      <option value="authentication">Authentication</option>
                    </select>
                    <select className="text-sm border rounded p-1">
                      <option value="en_US">English (US)</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                  <Button type="submit">Add Template</Button>
                </div>
              </form>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Templates</h3>
                <div className="border rounded-md divide-y">
                  {['welcome_message', 'order_confirmation', 'appointment_reminder'].map((template) => (
                    <div key={template} className="flex justify-between items-center p-4">
                      <div>
                        <h4 className="font-medium">{template}</h4>
                        <p className="text-sm text-muted-foreground">Utility • Approved</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm" className="text-destructive">Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="defaults" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Default Notification Settings</CardTitle>
              <CardDescription>Default notification settings for new organizations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="incoming-messages">Incoming Messages</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify when receiving a new message
                  </p>
                </div>
                <Switch 
                  id="incoming-messages" 
                  checked={systemSettings.notificationSettings?.incomingMessages} 
                  onCheckedChange={(checked) => updateNotificationSetting('incomingMessages', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="message-delivered">Message Delivered</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify when a message is delivered
                  </p>
                </div>
                <Switch 
                  id="message-delivered" 
                  checked={systemSettings.notificationSettings?.messageDelivered}
                  onCheckedChange={(checked) => updateNotificationSetting('messageDelivered', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="message-read">Message Read</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify when a message is read
                  </p>
                </div>
                <Switch 
                  id="message-read" 
                  checked={systemSettings.notificationSettings?.messageRead}
                  onCheckedChange={(checked) => updateNotificationSetting('messageRead', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="broadcast-complete">Broadcast Complete</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify when a broadcast is complete
                  </p>
                </div>
                <Switch 
                  id="broadcast-complete" 
                  checked={systemSettings.notificationSettings?.broadcastComplete}
                  onCheckedChange={(checked) => updateNotificationSetting('broadcastComplete', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send a copy of notifications to email
                  </p>
                </div>
                <Switch 
                  id="email-notifications" 
                  checked={systemSettings.notificationSettings?.emailNotifications}
                  onCheckedChange={(checked) => updateNotificationSetting('emailNotifications', checked)}
                />
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-end">
              <Button onClick={handleSaveSettings}>
                <Save className="mr-2 h-4 w-4" /> Save Default Settings
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Default WhatsApp Message Settings</CardTitle>
              <CardDescription>Set default behavior for all organizations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow Bulk Messages</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable organizations to send bulk messages
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow Custom Templates</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow organizations to create custom templates
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Read Receipts</Label>
                  <p className="text-sm text-muted-foreground">
                    Track when messages are read
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Responder</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable automated responses to incoming messages
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-end">
              <Button onClick={handleSaveSettings}>
                <Save className="mr-2 h-4 w-4" /> Save Message Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WhatsAppSettingsPage;
