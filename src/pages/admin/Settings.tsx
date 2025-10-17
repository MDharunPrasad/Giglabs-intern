import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function Settings() {
  const [settings, setSettings] = useState({
    platformName: "LearnHub",
    platformEmail: "admin@learnhub.com",
    supportEmail: "support@learnhub.com",
    enableNotifications: true,
    enableEmailAlerts: true,
    maintenanceMode: false,
    maxStudentsPerBatch: "30",
    sessionDuration: "60",
    welcomeMessage: "Welcome to LearnHub! Start your learning journey today.",
  });

  const handleSave = () => {
    localStorage.setItem("platformSettings", JSON.stringify(settings));
    toast.success("Settings saved successfully");
  };

  return (
          <div className="p-6 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-display font-bold">Settings</h1>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="space-y-8">
        {/* General Settings */}
        <div className="bg-card rounded-lg border shadow-md p-6">
          <h2 className="text-xl font-display font-semibold mb-4">
            General Settings
          </h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="platformName">Platform Name</Label>
              <Input
                id="platformName"
                value={settings.platformName}
                onChange={(e) =>
                  setSettings({ ...settings, platformName: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="platformEmail">Platform Email</Label>
              <Input
                id="platformEmail"
                type="email"
                value={settings.platformEmail}
                onChange={(e) =>
                  setSettings({ ...settings, platformEmail: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                id="supportEmail"
                type="email"
                value={settings.supportEmail}
                onChange={(e) =>
                  setSettings({ ...settings, supportEmail: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="welcomeMessage">Welcome Message</Label>
              <Textarea
                id="welcomeMessage"
                value={settings.welcomeMessage}
                onChange={(e) =>
                  setSettings({ ...settings, welcomeMessage: e.target.value })
                }
                rows={3}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Notifications */}
        <div className="bg-card rounded-lg border shadow-md p-6">
          <h2 className="text-xl font-display font-semibold mb-4">
            Notifications
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Send system notifications to users
                </p>
              </div>
              <Switch
                checked={settings.enableNotifications}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, enableNotifications: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Email Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Send email notifications for important events
                </p>
              </div>
              <Switch
                checked={settings.enableEmailAlerts}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, enableEmailAlerts: checked })
                }
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Platform Configuration */}
        <div className="bg-card rounded-lg border shadow-md p-6">
          <h2 className="text-xl font-display font-semibold mb-4">
            Platform Configuration
          </h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="maxStudents">Max Students Per Batch</Label>
              <Input
                id="maxStudents"
                type="number"
                value={settings.maxStudentsPerBatch}
                onChange={(e) =>
                  setSettings({ ...settings, maxStudentsPerBatch: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="sessionDuration">
                Default Session Duration (minutes)
              </Label>
              <Input
                id="sessionDuration"
                type="number"
                value={settings.sessionDuration}
                onChange={(e) =>
                  setSettings({ ...settings, sessionDuration: e.target.value })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Temporarily disable platform access
                </p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, maintenanceMode: checked })
                }
              />
            </div>
          </div>
        </div>
      </div>
          </div>
  );
}
