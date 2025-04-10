
import * as React from "react";
import { LucideIcon, PlusCircle, Film, Music, Tv, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface SubscriptionFormData {
  name: string;
  price: string;
  billingCycle: string;
  nextBilling: string;
}

interface AddSubscriptionDialogProps {
  onAddSubscription: (subscription: any) => void;
}

const AddSubscriptionDialog = ({ onAddSubscription }: AddSubscriptionDialogProps) => {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState<SubscriptionFormData>({
    name: "",
    price: "",
    billingCycle: "monthly",
    nextBilling: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.price || !formData.nextBilling) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }

    // Generate random ID
    const id = formData.name.toLowerCase().replace(/\s+/g, "-") + "-" + Math.floor(Math.random() * 1000);
    
    // Get icon based on subscription name and add iconName for serialization
    const icon = getIconForSubscription(formData.name);
    const iconName = getIconName(icon);
    
    // Create a new subscription object
    const newSubscription = {
      id,
      name: formData.name,
      icon: icon,
      iconName: iconName, // Add icon name for serialization
      iconColor: "text-primary",
      iconBg: "bg-primary/10",
      price: parseFloat(formData.price),
      billingCycle: formData.billingCycle,
      nextBilling: formData.nextBilling,
      status: "active" as const,
    };

    // Pass back to parent
    onAddSubscription(newSubscription);
    
    // Reset form and close dialog
    setFormData({
      name: "",
      price: "",
      billingCycle: "monthly",
      nextBilling: "",
    });
    
    toast({
      title: "Subscription added",
      description: `${formData.name} has been added to your subscriptions`,
    });
    
    setOpen(false);
  };

  // Helper function to determine icon based on subscription name
  const getIconForSubscription = (name: string): LucideIcon => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes("netflix") || nameLower.includes("hulu") || 
        nameLower.includes("disney") || nameLower.includes("prime") ||
        nameLower.includes("stream") || nameLower.includes("video")) {
      return Film;
    }
    if (nameLower.includes("spotify") || nameLower.includes("apple music") || 
        nameLower.includes("pandora") || nameLower.includes("tidal") || 
        nameLower.includes("music")) {
      return Music;
    }
    if (nameLower.includes("hbo") || nameLower.includes("sling") || 
        nameLower.includes("tv") || nameLower.includes("cable")) {
      return Tv;
    }
    if (nameLower.includes("audible") || nameLower.includes("kindle") || 
        nameLower.includes("book")) {
      return BookOpen;
    }
    return PlusCircle; // Default icon
  };

  // Helper function to get icon name as string
  const getIconName = (icon: LucideIcon): string => {
    if (icon === Film) return 'Film';
    if (icon === Music) return 'Music';
    if (icon === Tv) return 'Tv';
    if (icon === BookOpen) return 'BookOpen';
    return 'PlusCircle';
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Subscription
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Subscription</DialogTitle>
          <DialogDescription>
            Add the details of your subscription service below
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Service Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Disney+"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Monthly Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="9.99"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="billingCycle">Billing Cycle</Label>
              <select
                id="billingCycle"
                name="billingCycle"
                value={formData.billingCycle}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nextBilling">Next Billing Date</Label>
              <Input
                id="nextBilling"
                name="nextBilling"
                type="date"
                value={formData.nextBilling}
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Subscription</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSubscriptionDialog;
