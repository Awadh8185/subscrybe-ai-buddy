
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LucideIcon, User, Bell, Shield, CreditCard } from "lucide-react";

const SettingsPage = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully",
    });
  };

  interface SettingsSectionProps {
    icon: LucideIcon;
    title: string;
    description: string;
  }

  const SettingsSection = ({ icon: Icon, title, description }: SettingsSectionProps) => (
    <div className="flex items-start gap-4">
      <div className="p-2 rounded-md bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Settings</h1>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>

        <Tabs defaultValue="account">
          <TabsList className="mb-6">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <SettingsSection 
                  icon={User}
                  title="Personal Information"
                  description="Update your account details and profile information"
                />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
                <CardDescription>
                  Manage your connected subscription accounts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-md bg-spotify/10">
                      <Music className="h-5 w-5 text-spotify" />
                    </div>
                    <div>
                      <div className="font-medium">Spotify</div>
                      <div className="text-xs text-muted-foreground">Connected on Apr 20, 2025</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Disconnect</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-md bg-netflix/10">
                      <Film className="h-5 w-5 text-netflix" />
                    </div>
                    <div>
                      <div className="font-medium">Netflix</div>
                      <div className="text-xs text-muted-foreground">Connected on Apr 18, 2025</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Disconnect</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <SettingsSection 
                  icon={Bell}
                  title="Notification Preferences"
                  description="Control when and how you receive notifications"
                />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Billing Notifications</h3>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="upcoming-bill" className="flex-1">
                      Upcoming bill reminders
                    </Label>
                    <Switch id="upcoming-bill" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="price-changes" className="flex-1">
                      Price change alerts
                    </Label>
                    <Switch id="price-changes" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="payment-failed" className="flex-1">
                      Payment failure notifications
                    </Label>
                    <Switch id="payment-failed" defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Service Notifications</h3>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="new-features" className="flex-1">
                      New features and updates
                    </Label>
                    <Switch id="new-features" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="subscription-recommendations" className="flex-1">
                      Subscription recommendations
                    </Label>
                    <Switch id="subscription-recommendations" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <SettingsSection 
                  icon={Shield}
                  title="Privacy & Security"
                  description="Manage your privacy settings and data preferences"
                />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Data Collection</h3>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="usage-data" className="flex-1">
                      Allow usage data collection for service improvements
                    </Label>
                    <Switch id="usage-data" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="personalization" className="flex-1">
                      Personalized recommendations
                    </Label>
                    <Switch id="personalization" defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Security</h3>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="two-factor" className="flex-1">
                      Enable two-factor authentication
                    </Label>
                    <Switch id="two-factor" />
                  </div>

                  <Button variant="outline" className="w-full">Change Password</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>
                  Manage the data we store for your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline">Export Your Data</Button>
                <Button variant="destructive">Delete Account</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="space-y-6">
            <Card>
              <CardHeader>
                <SettingsSection 
                  icon={CreditCard}
                  title="Payment Methods"
                  description="Add and manage your payment methods"
                />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Your Payment Methods</h3>
                  
                  <div className="border rounded-md p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-1 rounded-md bg-black/10">
                        <CreditCardIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium">Visa ending in 1234</div>
                        <div className="text-xs text-muted-foreground">Expires 09/28</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm">Remove</Button>
                    </div>
                  </div>
                </div>

                <Button className="w-full">Add New Payment Method</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

function Music(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  )
}

function Film(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <line x1="7" x2="7" y1="3" y2="21" />
      <line x1="17" x2="17" y1="3" y2="21" />
      <line x1="3" x2="21" y1="12" y2="12" />
      <line x1="3" x2="7" y1="7" y2="7" />
      <line x1="3" x2="7" y1="17" y2="17" />
      <line x1="17" x2="21" y1="7" y2="7" />
      <line x1="17" x2="21" y1="17" y2="17" />
    </svg>
  )
}

function CreditCardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}

export default SettingsPage;
