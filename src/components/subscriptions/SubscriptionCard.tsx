
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, LucideIcon, ChevronRight, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface Subscription {
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

interface SubscriptionCardProps {
  subscription: Subscription;
  onManage: () => void;
}

const SubscriptionCard = ({ subscription, onManage }: SubscriptionCardProps) => {
  const { toast } = useToast();
  const [status, setStatus] = useState(subscription.status);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleTogglePause = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const newStatus = status === 'active' ? 'paused' : 'active';
      setStatus(newStatus);
      setIsLoading(false);
      
      toast({
        title: `${subscription.name} ${newStatus === 'active' ? 'resumed' : 'paused'}`,
        description: newStatus === 'active' 
          ? `Your subscription has been resumed.` 
          : `Your subscription has been paused. You won't be charged on ${subscription.nextBilling}.`,
      });
    }, 1000);
  };
  
  const Icon = subscription.icon;
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-center p-4">
          <div className={`flex-shrink-0 p-2 mr-3 rounded-md ${subscription.iconBg}`}>
            <Icon className={`h-6 w-6 ${subscription.iconColor}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-medium truncate">{subscription.name}</h3>
            <p className="text-sm text-muted-foreground">
              ${subscription.price.toFixed(2)}/{subscription.billingCycle}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {status === 'active' ? (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded bg-green-500/10 text-green-500">
                <Check className="h-3 w-3 mr-1" />
                Active
              </span>
            ) : status === 'paused' ? (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded bg-yellow-500/10 text-yellow-500">
                Paused
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded bg-red-500/10 text-red-500">
                <X className="h-3 w-3 mr-1" />
                Cancelled
              </span>
            )}
          </div>
        </div>
        
        <div className="px-4 py-3 bg-secondary/30 text-xs">
          Next billing: {status === 'active' ? subscription.nextBilling : 'N/A'}
        </div>
        
        <div className="flex divide-x border-t">
          <Button 
            variant="ghost" 
            className="flex-1 rounded-none h-11" 
            onClick={handleTogglePause}
            disabled={isLoading}
          >
            {status === 'active' ? 'Pause' : 'Resume'}
          </Button>
          <Button 
            variant="ghost" 
            className="flex-1 rounded-none h-11 flex items-center justify-center"
            onClick={onManage}
          >
            Manage
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;
