
import React, { useState } from 'react';
import { Settings, Save, Undo2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { SuperAdminSettings } from '@/models/superadmin';

// Initial settings
const initialSettings: SuperAdminSettings = {
  id: "1",
  requireEmailVerification: true,
  allowOrganizationCreation: true,
  defaultTrialDays: 14,
  enforceStrongPasswords: true,
  logoUrl: "/logo.png",
  faviconUrl: "/favicon.ico",
  lightThemeColors: {
    primary: "#0284c7",
    secondary: "#64748b",
    accent: "#f59e0b",
    background: "#ffffff",
    text: "#0f172a",
  },
  darkThemeColors: {
    primary: "#38bdf8",
    secondary: "#94a3b8",
    accent: "#fbbf24",
    background: "#0f172a",
    text: "#f8fafc",
  },
  updatedAt: new Date().toISOString(),
};

const AdvancedSettings = () => {
  const [settings, setSettings] = useState<SuperAdminSettings>(initialSettings);
  const [hasChanges, setHasChanges] = useState(false);

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
      updatedAt: new Date().toISOString(),
    }));
    setHasChanges(true);
  };

  const updateThemeColor = (theme: 'light' | 'dark', colorKey: string, value: string) => {
    const themeKey = theme === 'light' ? 'lightThemeColors' : 'darkThemeColors';
    setSettings((prev) => ({
      ...prev,
      [themeKey]: {
        ...prev[themeKey],
        [colorKey]: value,
      },
      updatedAt: new Date().toISOString(),
    }));
    setHasChanges(true);
  };

  const handleSaveSettings = () => {
    // In a real app, this would save to an API
    toast.success("Settings saved successfully");
    setHasChanges(false);
  };

  const handleResetSettings = () => {
    setSettings(initialSettings);
    toast.info("Settings reset to default values");
    setHasChanges(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Advanced Settings</h2>
        <p className="text-muted-foreground">
          Configure global system settings and preferences
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              System Configuration
            </CardTitle>
            <CardDescription>
              Core system settings and authentication options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-verification" className="flex flex-col">
                  <span>Require Email Verification</span>
                  <span className="font-normal text-muted-foreground text-xs">
                    New users must verify their email before accessing the system
                  </span>
                </Label>
                <Switch
                  id="email-verification"
                  checked={settings.requireEmailVerification}
                  onCheckedChange={(checked) => updateSetting('requireEmailVerification', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="org-creation" className="flex flex-col">
                  <span>Allow Organization Self-Registration</span>
                  <span className="font-normal text-muted-foreground text-xs">
                    Users can create their own organizations without super admin approval
                  </span>
                </Label>
                <Switch
                  id="org-creation"
                  checked={settings.allowOrganizationCreation}
                  onCheckedChange={(checked) => updateSetting('allowOrganizationCreation', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="strong-passwords" className="flex flex-col">
                  <span>Enforce Strong Passwords</span>
                  <span className="font-normal text-muted-foreground text-xs">
                    Passwords must meet complexity requirements
                  </span>
                </Label>
                <Switch
                  id="strong-passwords"
                  checked={settings.enforceStrongPasswords}
                  onCheckedChange={(checked) => updateSetting('enforceStrongPasswords', checked)}
                />
              </div>

              <div className="grid gap-2 pt-2">
                <Label htmlFor="trial-days">Default Trial Period (Days)</Label>
                <Input
                  id="trial-days"
                  type="number"
                  min="0"
                  max="90"
                  value={settings.defaultTrialDays}
                  onChange={(e) => updateSetting('defaultTrialDays', Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Branding</CardTitle>
            <CardDescription>
              Customize logo and app appearance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="logo-url">Logo URL</Label>
                <Input
                  id="logo-url"
                  value={settings.logoUrl || ''}
                  onChange={(e) => updateSetting('logoUrl', e.target.value)}
                  placeholder="https://example.com/logo.png"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="favicon-url">Favicon URL</Label>
                <Input
                  id="favicon-url"
                  value={settings.faviconUrl || ''}
                  onChange={(e) => updateSetting('faviconUrl', e.target.value)}
                  placeholder="https://example.com/favicon.ico"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Theme Configuration</CardTitle>
            <CardDescription>
              Define color scheme for light and dark modes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Light Theme</h4>
                <div className="grid gap-3">
                  {settings.lightThemeColors && Object.entries(settings.lightThemeColors).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor={`light-${key}`} className="capitalize">
                        {key}
                      </Label>
                      <Input
                        id={`light-${key}`}
                        type="text"
                        value={value}
                        onChange={(e) => updateThemeColor('light', key, e.target.value)}
                        className="col-span-2"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Dark Theme</h4>
                <div className="grid gap-3">
                  {settings.darkThemeColors && Object.entries(settings.darkThemeColors).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor={`dark-${key}`} className="capitalize">
                        {key}
                      </Label>
                      <Input
                        id={`dark-${key}`}
                        type="text"
                        value={value}
                        onChange={(e) => updateThemeColor('dark', key, e.target.value)}
                        className="col-span-2"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-sm text-muted-foreground">
                Note: Theme changes require a rebuild of the application to take effect.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date(settings.updatedAt).toLocaleString()}
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={handleResetSettings}
                disabled={!hasChanges}
              >
                <Undo2 className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button 
                onClick={handleSaveSettings}
                disabled={!hasChanges}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedSettings;
