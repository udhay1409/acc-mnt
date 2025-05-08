
import React from 'react';
import PlaceholderPage from '../PlaceholderPage';
import { Settings } from 'lucide-react';

const SettingsPage = () => {
  return (
    <PlaceholderPage 
      title="System Settings" 
      description="Configure system-wide settings and preferences."
      icon={<Settings className="h-6 w-6" />}
    />
  );
};

export default SettingsPage;
