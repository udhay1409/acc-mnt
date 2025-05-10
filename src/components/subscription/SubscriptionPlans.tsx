
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, CreditCard, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { getSubscriptionPlans, createSubscriptionOrder, processSubscriptionPayment, createSubscription } from '@/services/razorpayService';
import { SubscriptionPlan } from '@/models/subscription';
import { useTenant } from '@/contexts/TenantContext';
import { useAuth } from '@/contexts/AuthContext';

const SubscriptionPlans: React.FC = () => {
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [isTrialLoading, setIsTrialLoading] = useState<Record<string, boolean>>({});
  const { currentOrganization } = useTenant();
  const { user } = useAuth();
  
  const plans = getSubscriptionPlans();
  
  const handleSubscribe = async (plan: SubscriptionPlan) => {
    if (!currentOrganization) {
      toast.error("No organization selected");
      return;
    }
    
    if (!user?.email) {
      toast.error("User details not available");
      return;
    }
    
    try {
      // Set loading state for this plan
      setIsLoading(prev => ({ ...prev, [plan.id]: true }));
      
      // Create an order
      const order = await createSubscriptionOrder(currentOrganization.id, plan.id);
      
      // Process payment
      processSubscriptionPayment(
        order,
        { name: user.name || user.email, email: user.email },
        async (paymentId) => {
          try {
            // Create subscription after successful payment
            await createSubscription(currentOrganization.id, plan.id, paymentId);
            toast.success(`Successfully subscribed to ${plan.name} plan`);
          } catch (error) {
            toast.error("Failed to activate subscription");
            console.error("Subscription creation error:", error);
          } finally {
            setIsLoading(prev => ({ ...prev, [plan.id]: false }));
          }
        },
        (error) => {
          toast.error("Payment failed");
          console.error("Payment error:", error);
          setIsLoading(prev => ({ ...prev, [plan.id]: false }));
        }
      );
    } catch (error) {
      toast.error("Failed to process subscription");
      console.error("Subscription error:", error);
      setIsLoading(prev => ({ ...prev, [plan.id]: false }));
    }
  };

  const handleStartFreeTrial = async (plan: SubscriptionPlan) => {
    if (!currentOrganization) {
      toast.error("No organization selected");
      return;
    }
    
    try {
      setIsTrialLoading(prev => ({ ...prev, [plan.id]: true }));
      
      // In a real implementation, this would call an API to start a free trial
      // For now, we'll simulate it with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`Your free trial of ${plan.name} plan has started!`);
      // Here you would typically redirect to the dashboard or show next steps
      
    } catch (error) {
      console.error("Free trial error:", error);
      toast.error("Failed to start free trial");
    } finally {
      setIsTrialLoading(prev => ({ ...prev, [plan.id]: false }));
    }
  };

  const formatPrice = (price: number, currency: string) => {
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    });
    return formatter.format(price);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Subscription Plans</h2>
        <p className="text-muted-foreground mt-2">
          Choose a plan that's right for your organization
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`flex flex-col ${plan.isPopular ? 'border-primary shadow-md' : ''}`}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription className="mt-1">{plan.description}</CardDescription>
                </div>
                {plan.isPopular && (
                  <Badge>Most Popular</Badge>
                )}
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold">{formatPrice(plan.price, plan.currency)}</span>
                <span className="text-muted-foreground">/{plan.interval}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex-col space-y-3">
              <Button 
                className="w-full"
                onClick={() => handleSubscribe(plan)}
                disabled={isLoading[plan.id] || isTrialLoading[plan.id]}
              >
                {isLoading[plan.id] ? (
                  "Processing..."
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Subscribe
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleStartFreeTrial(plan)}
                disabled={isLoading[plan.id] || isTrialLoading[plan.id]}
              >
                {isTrialLoading[plan.id] ? (
                  "Starting Trial..."
                ) : (
                  <>
                    <Calendar className="mr-2 h-4 w-4" />
                    Start Free Trial
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
