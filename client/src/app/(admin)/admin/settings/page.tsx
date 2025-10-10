'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Globe, Mail, Shield, Palette, Save } from 'lucide-react';

export default function AdminSettings() {
  const [isClient, setIsClient] = useState(false);
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'The Salty Devs Blog',
    siteDescription: 'A blog about web development and technology',
    siteUrl: 'https://thesaltydevs.com',
    adminEmail: 'admin@thesaltydevs.com',

    // Content Settings
    postsPerPage: 10,
    allowComments: true,
    moderateComments: true,
    allowRegistration: true,

    // Email Settings
    emailProvider: 'smtp',
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUsername: '',
    smtpPassword: '',

    // Security Settings
    enableTwoFactor: false,
    sessionTimeout: 24,
    maxLoginAttempts: 5,

    // Appearance Settings
    theme: 'light',
    primaryColor: '#3b82f6',
    enableDarkMode: true,
  });

  // Handle hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputChange = (
    field: string,
    value: string | number | boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Here you would call your API to save settings
    alert('Settings saved successfully!');
  };

  // Prevent hydration mismatch by not rendering until client-side
  if (!isClient) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Configure your blog settings and preferences.
          </p>
        </div>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) =>
                      handleInputChange('siteName', e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="adminEmail">Admin Email</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={settings.adminEmail}
                    onChange={(e) =>
                      handleInputChange('adminEmail', e.target.value)
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="siteDescription">Site Description</Label>
                <textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) =>
                    handleInputChange('siteDescription', e.target.value)
                  }
                  className="w-full p-2 border rounded-md resize-none"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="siteUrl">Site URL</Label>
                <Input
                  id="siteUrl"
                  value={settings.siteUrl}
                  onChange={(e) => handleInputChange('siteUrl', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Settings */}
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="postsPerPage">Posts Per Page</Label>
                  <Input
                    id="postsPerPage"
                    type="number"
                    value={settings.postsPerPage}
                    onChange={(e) =>
                      handleInputChange(
                        'postsPerPage',
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Allow Comments</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable comments on articles
                    </p>
                  </div>
                  <Switch
                    checked={settings.allowComments}
                    onCheckedChange={(checked) =>
                      handleInputChange('allowComments', checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Moderate Comments</Label>
                    <p className="text-sm text-muted-foreground">
                      Require approval before comments are published
                    </p>
                  </div>
                  <Switch
                    checked={settings.moderateComments}
                    onCheckedChange={(checked) =>
                      handleInputChange('moderateComments', checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Allow Registration</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow new users to register
                    </p>
                  </div>
                  <Switch
                    checked={settings.allowRegistration}
                    onCheckedChange={(checked) =>
                      handleInputChange('allowRegistration', checked)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="emailProvider">Email Provider</Label>
                <select
                  id="emailProvider"
                  value={settings.emailProvider}
                  onChange={(e) =>
                    handleInputChange('emailProvider', e.target.value)
                  }
                  className="w-full p-2 border rounded-md"
                >
                  <option value="smtp">SMTP</option>
                  <option value="sendgrid">SendGrid</option>
                  <option value="mailgun">Mailgun</option>
                </select>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input
                    id="smtpHost"
                    value={settings.smtpHost}
                    onChange={(e) =>
                      handleInputChange('smtpHost', e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    type="number"
                    value={settings.smtpPort}
                    onChange={(e) =>
                      handleInputChange('smtpPort', parseInt(e.target.value))
                    }
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input
                    id="smtpUsername"
                    value={settings.smtpUsername}
                    onChange={(e) =>
                      handleInputChange('smtpUsername', e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={settings.smtpPassword}
                    onChange={(e) =>
                      handleInputChange('smtpPassword', e.target.value)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="sessionTimeout">
                    Session Timeout (hours)
                  </Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) =>
                      handleInputChange(
                        'sessionTimeout',
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={settings.maxLoginAttempts}
                    onChange={(e) =>
                      handleInputChange(
                        'maxLoginAttempts',
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Require 2FA for admin accounts
                  </p>
                </div>
                <Switch
                  checked={settings.enableTwoFactor}
                  onCheckedChange={(checked) =>
                    handleInputChange('enableTwoFactor', checked)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="theme">Default Theme</Label>
                  <select
                    id="theme"
                    value={settings.theme}
                    onChange={(e) => handleInputChange('theme', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <Input
                    id="primaryColor"
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) =>
                      handleInputChange('primaryColor', e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Dark Mode Toggle</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow users to switch between light and dark themes
                  </p>
                </div>
                <Switch
                  checked={settings.enableDarkMode}
                  onCheckedChange={(checked) =>
                    handleInputChange('enableDarkMode', checked)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
