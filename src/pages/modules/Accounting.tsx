
import React from 'react';
import PlaceholderPage from '../PlaceholderPage';
import { BookOpen } from 'lucide-react';

const Accounting = () => {
  return (
    <PlaceholderPage 
      title="Accounting" 
      description="The Accounting module with double-entry bookkeeping is coming soon."
      icon={<BookOpen className="h-6 w-6" />}
    />
  );
};

export default Accounting;
