
import React from 'react';
import PlaceholderPage from '../PlaceholderPage';
import { ChartBar } from 'lucide-react';

const Reports = () => {
  return (
    <PlaceholderPage 
      title="Reports & Analytics" 
      description="Gain insights into your business with comprehensive reports and analytics."
      icon={<ChartBar className="h-6 w-6" />}
    />
  );
};

export default Reports;
