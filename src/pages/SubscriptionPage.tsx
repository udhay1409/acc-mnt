
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SubscriptionPlans from '@/components/subscription/SubscriptionPlans';
import SubscriptionDetails from '@/components/subscription/SubscriptionDetails';

const SubscriptionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('current');
  
  return (
    <div className="container max-w-6xl py-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="current">Current Subscription</TabsTrigger>
          <TabsTrigger value="plans">Available Plans</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current" className="mt-0">
          <SubscriptionDetails />
        </TabsContent>
        
        <TabsContent value="plans" className="mt-0">
          <SubscriptionPlans />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubscriptionPage;
