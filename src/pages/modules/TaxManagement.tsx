
import React from 'react';
import PlaceholderPage from '../PlaceholderPage';
import { Percent } from 'lucide-react';

const TaxManagement = () => {
  return (
    <PlaceholderPage 
      title="Tax Management" 
      description="Configure tax rates and track tax liabilities with the upcoming Tax module."
      icon={<Percent className="h-6 w-6" />}
    />
  );
};

export default TaxManagement;
