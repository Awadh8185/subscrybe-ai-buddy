
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BarChart2, TrendingUp, TrendingDown, ArrowRight, Music, Film, Tv, BookOpen, PlusCircle, LucideIcon } from "lucide-react";
import SubscriptionCard from "./SubscriptionCard";
import { useNavigate } from "react-router-dom";
import AddSubscriptionDialog from "./AddSubscriptionDialog";
import { useToast } from "@/components/ui/use-toast";

// Define the Subscription type for better type safety
export interface Subscription {
  id: string;
  name: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  price: number;
  billingCycle: string;
  nextBilling: string;
  status: 'active' | 'paused' | 'cancelled';
}

const SubscriptionDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Initial subscriptions data
  const initialSubscriptions = [
    {
      id: "netflix",
      name: "Netflix",
      icon: Film,
      iconColor: "text-netflix",
      iconBg: "bg-netflix/10",
      price: 15.99,
      billingCycle: "monthly",
      nextBilling: "May 15, 2025",
      status: "active" as const,
    },
    {
      id: "spotify",
      name: "Spotify",
      icon: Music,
      iconColor: "text-spotify",
      iconBg: "bg-spotify/10",
      price: 9.99,
      billingCycle: "monthly",
      nextBilling: "April 28, 2025",
      status: "active" as const,
    },
    {
      id: "hulu",
      name: "Hulu",
      icon: Tv,
      iconColor: "text-green-500",
      iconBg: "bg-green-500/10",
      price: 7.99,
      billingCycle: "monthly",
      nextBilling: "May 3, 2025",
      status: "active" as const,
    },
    {
      id: "audible",
      name: "Audible",
      icon: BookOpen,
      iconColor: "text-yellow-500",
      iconBg: "bg-yellow-500/10",
      price: 14.95,
      billingCycle: "monthly",
      nextBilling: "May 7, 2025",
      status: "active" as const,
    }
  ];

  // Load subscriptions from localStorage or use initialSubscriptions
  const loadSubscriptions = (): Subscription[] => {
    const savedSubscriptions = localStorage.getItem('subscriptions');
    
    if (savedSubscriptions) {
      try {
        // Parse the saved JSON
        const parsed = JSON.parse(savedSubscriptions);
        
        // Restore the icon functions that were lost during serialization
        return parsed.map((sub: any) => {
          // Map the string icon name back to the actual icon component
          const iconMap: Record<string, LucideIcon> = {
            'Film': Film,
            'Music': Music, 
            'Tv': Tv,
            'BookOpen': BookOpen,
            'PlusCircle': PlusCircle
          };
          
          return {
            ...sub,
            icon: iconMap[sub.iconName] || PlusCircle
          };
        });
      } catch (error) {
        console.error('Error loading subscriptions from localStorage:', error);
        return initialSubscriptions;
      }
    }
    
    return initialSubscriptions;
  };

  // State to manage subscriptions
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(loadSubscriptions);
  
  // Save subscriptions to localStorage whenever they change
  useEffect(() => {
    // Prepare subscriptions for localStorage by adding iconName property
    const subscriptionsToSave = subscriptions.map(sub => {
      // Get the name of the icon component for serialization
      let iconName = 'PlusCircle';
      
      if (sub.icon === Film) iconName = 'Film';
      else if (sub.icon === Music) iconName = 'Music';
      else if (sub.icon === Tv) iconName = 'Tv';
      else if (sub.icon === BookOpen) iconName = 'BookOpen';
      
      return {
        ...sub,
        iconName, // Add the icon name for later reconstruction
        icon: undefined // Remove the icon function as it can't be serialized
      };
    });
    
    localStorage.setItem('subscriptions', JSON.stringify(subscriptionsToSave));
  }, [subscriptions]);
  
  // Calculate total monthly cost
  const totalMonthly = subscriptions.reduce((acc, sub) => acc + sub.price, 0);

  // Handler to add new subscription
  const handleAddSubscription = (newSubscription: any) => {
    setSubscriptions((prev) => [...prev, newSubscription]);
    
    toast({
      title: "Subscription added",
      description: `${newSubscription.name} has been added to your subscriptions`,
    });
  };
  
  return (
    <div className="space-y-6 p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Subscriptions</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalMonthly.toFixed(2)}/mo</div>
            <p className="text-xs text-muted-foreground">Across {subscriptions.length} services</p>
            <Progress className="mt-3" value={75} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Spending Trend</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-12%</div>
            <p className="text-xs text-muted-foreground">Compared to last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Next Billing</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Apr 28</div>
            <p className="text-xs text-muted-foreground">Spotify ($9.99)</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Potential Savings</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$25.50/mo</div>
            <p className="text-xs text-muted-foreground">With annual plans</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex items-center justify-between mt-6">
        <h2 className="text-xl font-bold">Your Subscriptions</h2>
        <AddSubscriptionDialog onAddSubscription={handleAddSubscription} />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {subscriptions.map(subscription => (
          <SubscriptionCard 
            key={subscription.id}
            subscription={subscription}
            onManage={() => navigate(`/service/${subscription.id}`)}
          />
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>AI Insights</CardTitle>
          <CardDescription>
            Personalized recommendations based on your subscription usage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-secondary p-4 rounded-lg border border-border">
            <h3 className="font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Bundle Opportunity
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              You could save $7.99/month by bundling your Hulu with Disney+ and ESPN+
            </p>
            <Button variant="link" className="pl-0 flex items-center gap-1 h-7 mt-1">
              View details
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="bg-secondary p-4 rounded-lg border border-border">
            <h3 className="font-medium flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-green-500" />
              Underutilized Service
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              You've only used Audible twice in the last 3 months. Consider pausing your subscription.
            </p>
            <Button variant="link" className="pl-0 flex items-center gap-1 h-7 mt-1">
              Analyze usage
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

export default SubscriptionDashboard;
