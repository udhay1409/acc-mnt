
import React from 'react';
import PlaceholderPage from '../PlaceholderPage';
import { Users } from 'lucide-react';

const CRM = () => {
  return (
    <PlaceholderPage 
      title="Customer & Vendor CRM" 
      description="Manage your customer and vendor relationships with the upcoming CRM module."
      icon={<Users className="h-6 w-6" />}
    />
  );
};

export default CRM;
