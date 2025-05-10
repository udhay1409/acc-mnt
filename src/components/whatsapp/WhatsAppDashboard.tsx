
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Users, Send, CheckCircle, RefreshCcw, ChevronRight, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { SignupStatus } from '@/models/whatsapp';

const WhatsAppDashboard = () => {
  
  const checkWhatsAppStatus = () => {
    toast({
      title: "WhatsApp Connection",
      description: "Your WhatsApp Business API is connected and active.",
    });
  };

  const goToSignup = () => {
    // Access the setActiveTab function through the parent component
    const event = new CustomEvent('whatsapp-tab-change', { detail: 'signup' });
    document.dispatchEvent(event);
  };

  // Simulated verification status - this would come from your API
  const verificationStatus: SignupStatus = 'pending';

  // Fix the border color conditional to avoid type errors
  const cardBorderClass = verificationStatus === 'verified' 
    ? "border-green-200" 
    : "border-amber-200";

  return (
    <div className="space-y-6">
      {/* Connection status card */}
      <Card className={cardBorderClass}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Account Status</CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex gap-2" 
              onClick={checkWhatsAppStatus}
            >
              <RefreshCcw className="h-4 w-4" /> Check Status
            </Button>
          </div>
          <CardDescription>Your WhatsApp Business API connection</CardDescription>
        </CardHeader>
        <CardContent>
          {verificationStatus === 'verified' ? (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Connected and Active</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-amber-600">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">Verification Pending</span>
            </div>
          )}
          
          {verificationStatus === 'verified' ? (
            <p className="text-sm text-muted-foreground mt-2">
              Phone Number: +91 98765 43210
            </p>
          ) : (
            <div className="mt-2 space-y-2">
              <p className="text-sm text-muted-foreground">
                Your WhatsApp Business account is awaiting verification. Please check your WhatsApp for a verification message.
              </p>
              <Button variant="outline" size="sm" onClick={goToSignup}>
                Complete Registration
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Contacts</CardTitle>
            <CardDescription>Total WhatsApp contacts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500 mr-2" />
              <div className="text-3xl font-bold">124</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Messages Sent</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Send className="h-8 w-8 text-purple-500 mr-2" />
              <div className="text-3xl font-bold">532</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Conversations</CardTitle>
            <CardDescription>Last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-green-500 mr-2" />
              <div className="text-3xl font-bold">18</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent messages */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Messages</CardTitle>
          <CardDescription>Your latest WhatsApp conversations</CardDescription>
        </CardHeader>
        <CardContent>
          {[1, 2, 3].map((_, index) => (
            <div 
              key={index} 
              className={`flex items-center justify-between p-3 ${
                index !== 2 ? "border-b" : ""
              } hover:bg-muted/50 cursor-pointer rounded-md`}
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Customer #{index + 1}</p>
                  <p className="text-sm text-muted-foreground">
                    {index === 0 
                      ? "Thanks for your quick response!" 
                      : index === 1 
                      ? "Is the product still available?" 
                      : "When will my order be delivered?"}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppDashboard;
