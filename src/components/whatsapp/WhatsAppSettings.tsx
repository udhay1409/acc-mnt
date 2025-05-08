
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Settings,
  MessageSquare,
  Bell,
  Lock,
  SaveIcon,
  CheckCircle,
  Link
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const WhatsAppSettings = () => {
  const [apiKey, setApiKey] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('+91 98765 43210');
  const [businessName, setBusinessName] = React.useState('Your Business');
  const [businessDescription, setBusinessDescription] = React.useState('Your business description here');

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your WhatsApp integration settings have been updated.",
    });
  };

  const handleDisconnect = () => {
    toast({
      title: "Disconnect Confirmation",
      description: "Are you sure you want to disconnect your WhatsApp Business API?",
      variant: "destructive",
    });
  };

  const handleVerifyNumber = () => {
    toast({
      title: "Verification Started",
      description: "We've sent a verification code to your WhatsApp number.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>WhatsApp API Settings</CardTitle>
            <CardDescription>Configure your WhatsApp Business API integration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <div className="flex gap-2">
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Enter your WhatsApp Business API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <Button variant="secondary" size="sm" className="whitespace-nowrap">
                  Generate New
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Your API key is used to authenticate requests to the WhatsApp Business API
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <div className="flex gap-2">
                <Input
                  id="webhook-url"
                  value="https://your-app.com/api/whatsapp/webhook"
                  readOnly
                />
                <Button variant="outline" size="icon">
                  <Link className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Use this URL as your webhook endpoint in the WhatsApp Business API dashboard
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <Button variant="outline" onClick={handleDisconnect}>Disconnect API</Button>
            <Button onClick={handleSaveSettings}>
              <SaveIcon className="mr-2 h-4 w-4" /> Save Settings
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business Profile</CardTitle>
            <CardDescription>Configure your WhatsApp business profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone-number">Business Phone Number</Label>
              <div className="flex gap-2">
                <Input
                  id="phone-number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <Button variant="secondary" size="sm" onClick={handleVerifyNumber}>
                  Verify
                </Button>
              </div>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Verified</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="business-name">Business Name</Label>
              <Input
                id="business-name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="business-description">Business Description</Label>
              <Textarea
                id="business-description"
                value={businessDescription}
                onChange={(e) => setBusinessDescription(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button onClick={handleSaveSettings} className="w-full">
              <SaveIcon className="mr-2 h-4 w-4" /> Update Profile
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Configure how you receive WhatsApp notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="incoming-messages">Incoming Messages</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when you receive a new message
              </p>
            </div>
            <Switch id="incoming-messages" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="message-delivered">Message Delivered</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when your message is delivered
              </p>
            </div>
            <Switch id="message-delivered" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="message-read">Message Read</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when your message is read
              </p>
            </div>
            <Switch id="message-read" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="broadcast-complete">Broadcast Complete</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when a broadcast is complete
              </p>
            </div>
            <Switch id="broadcast-complete" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Send a copy of notifications to your email
              </p>
            </div>
            <Switch id="email-notifications" />
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button onClick={handleSaveSettings} className="w-full">
            <SaveIcon className="mr-2 h-4 w-4" /> Save Notification Settings
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WhatsAppSettings;
