
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { SendHorizontal, Bot, PlusCircle, LucideIcon, Film, Music, Tv, BookOpen, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ChatMessage from "./ChatMessage";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Subscription } from "../subscriptions/SubscriptionDashboard"; // Import the Subscription type

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi there! I'm your subscription management assistant. How can I help you today? You can ask me to check your Netflix bill, manage your Spotify subscription, or get insights on your spending.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Subscription management state
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);
  const [subscriptionFormData, setSubscriptionFormData] = useState({
    name: "",
    price: "",
    billingCycle: "monthly",
    nextBilling: ""
  });

  // Load subscriptions from localStorage
  const loadSubscriptions = (): Subscription[] => {
    const savedSubscriptions = localStorage.getItem('subscriptions');
    
    if (savedSubscriptions) {
      try {
        const parsed = JSON.parse(savedSubscriptions);
        
        // Restore the icon functions that were lost during serialization
        return parsed.map((sub: any) => {
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
        // Return default subscriptions if error
        return [
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
          }
        ];
      }
    }
    
    // Return default subscriptions if none saved
    return [
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
      }
    ];
  };

  // Sample subscriptions data - now loaded from localStorage
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(loadSubscriptions());

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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubscriptionFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSubscriptionFormData(prev => ({ ...prev, [name]: value }));
  };

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

  const getIconName = (icon: LucideIcon): string => {
    if (icon === Film) return 'Film';
    if (icon === Music) return 'Music';
    if (icon === Tv) return 'Tv';
    if (icon === BookOpen) return 'BookOpen';
    return 'PlusCircle';
  };

  const handleAddSubscription = () => {
    // Basic validation
    if (!subscriptionFormData.name || !subscriptionFormData.price || !subscriptionFormData.nextBilling) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }

    // Generate random ID
    const id = subscriptionFormData.name.toLowerCase().replace(/\s+/g, "-") + "-" + Math.floor(Math.random() * 1000);
    
    // Get icon based on subscription name
    const icon = getIconForSubscription(subscriptionFormData.name);
    const iconName = getIconName(icon);
    
    // Create a new subscription object
    const newSubscription = {
      id,
      name: subscriptionFormData.name,
      icon: icon,
      iconName: iconName,
      iconColor: "text-primary",
      iconBg: "bg-primary/10",
      price: parseFloat(subscriptionFormData.price),
      billingCycle: subscriptionFormData.billingCycle,
      nextBilling: subscriptionFormData.nextBilling,
      status: "active" as const,
    };

    // Add to subscriptions list
    setSubscriptions(prev => [...prev, newSubscription]);
    
    // Add confirmation message
    const assistantMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `I've added ${subscriptionFormData.name} to your subscriptions. The monthly cost is $${subscriptionFormData.price}. Your subscription list is now updated.`,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    
    // Reset form and close dialog
    setSubscriptionFormData({
      name: "",
      price: "",
      billingCycle: "monthly",
      nextBilling: ""
    });
    
    setShowAddDialog(false);
  };

  const handleEditSubscription = () => {
    if (!currentSubscription) return;
    
    // Get icon based on subscription name
    const icon = getIconForSubscription(subscriptionFormData.name || currentSubscription.name);
    const iconName = getIconName(icon);
    
    // Update the subscription
    setSubscriptions(prev => prev.map(sub => 
      sub.id === currentSubscription.id 
        ? {
            ...sub,
            name: subscriptionFormData.name || sub.name,
            price: subscriptionFormData.price ? parseFloat(subscriptionFormData.price) : sub.price,
            billingCycle: subscriptionFormData.billingCycle || sub.billingCycle,
            nextBilling: subscriptionFormData.nextBilling || sub.nextBilling,
            icon: icon,
            iconName: iconName
          }
        : sub
    ));
    
    // Add confirmation message
    const assistantMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `I've updated your ${currentSubscription.name} subscription with the new information.`,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    
    // Reset and close dialog
    setCurrentSubscription(null);
    setSubscriptionFormData({
      name: "",
      price: "",
      billingCycle: "monthly",
      nextBilling: ""
    });
    setShowEditDialog(false);
  };

  const handleViewSubscriptions = () => {
    // Calculate total monthly cost
    const totalMonthly = subscriptions.reduce((sum, sub) => sum + sub.price, 0).toFixed(2);
    
    // Format subscriptions for display in chat
    const subsList = subscriptions.map(sub => 
      `• ${sub.name}: $${sub.price.toFixed(2)}/${sub.billingCycle} (Next billing: ${sub.nextBilling})`
    ).join('\n');
    
    const assistantMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `Here are your current subscriptions:\n\n${subsList}\n\nTotal monthly cost: $${totalMonthly}`,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, assistantMessage]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Process user input
    setTimeout(() => {
      let response: string;
      
      const userInput = input.toLowerCase();
      
      // Check for subscription management commands
      if (userInput.includes('view') && (userInput.includes('subscription') || userInput.includes('subscriptions'))) {
        handleViewSubscriptions();
        setIsLoading(false);
        return;
      } else if (userInput.includes('add') && userInput.includes('subscription')) {
        setShowAddDialog(true);
        setIsLoading(false);
        return;
      } else if (userInput.includes('edit') && userInput.includes('subscription')) {
        // Find subscription to edit - look for subscription names in the input
        const subToEdit = subscriptions.find(sub => 
          userInput.toLowerCase().includes(sub.name.toLowerCase())
        );
        
        if (subToEdit) {
          setCurrentSubscription(subToEdit);
          setSubscriptionFormData({
            name: subToEdit.name,
            price: subToEdit.price.toString(),
            billingCycle: subToEdit.billingCycle,
            nextBilling: subToEdit.nextBilling
          });
          setShowEditDialog(true);
          setIsLoading(false);
          return;
        } else {
          response = "Which subscription would you like to edit? Please specify the name, or you can say 'view subscriptions' to see your current list.";
        }
      } else if (userInput.includes('netflix') && userInput.includes('bill')) {
        response = "Your Netflix subscription is currently at $15.99 per month. Your next billing date is May 15, 2025. Would you like me to show you the billing history or change your plan?";
      } else if (userInput.includes('spotify') && (userInput.includes('cancel') || userInput.includes('unsubscribe'))) {
        response = "I can help you cancel your Spotify subscription. Just to confirm: Your current plan is Spotify Premium at $9.99/month. Canceling now will maintain access until the end of your current billing cycle. Would you like to proceed with cancellation?";
      } else if (userInput.includes('spending') || userInput.includes('save')) {
        response = "Based on your subscription patterns, you could save about $25 monthly by switching to an annual plan for your streaming services. Would you like to see a detailed breakdown of potential savings?";
      } else if (userInput.includes('manage') && userInput.includes('subscription')) {
        response = "Would you like to view all your subscriptions, add a new subscription, or edit an existing one? You can also visit your subscription dashboard for a complete overview.";
      } else {
        response = "I can help you manage your subscriptions. You can ask me to view your subscriptions, add a new subscription, or edit an existing one. You can also ask about specific services like Netflix or Spotify.";
      }

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <div className="flex flex-col h-full max-h-[calc(100vh-4rem)]">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {isLoading && (
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                  <Bot size={18} />
                </Avatar>
                <div className="flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                type="button"
                onClick={() => {
                  setMessages([messages[0]]);
                  toast({
                    title: "Chat reset",
                    description: "Your conversation has been reset",
                  })
                }}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your subscriptions..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <SendHorizontal className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Add Subscription Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Subscription</DialogTitle>
            <DialogDescription>
              Add the details of your subscription service below
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Service Name</Label>
              <Input
                id="name"
                name="name"
                value={subscriptionFormData.name}
                onChange={handleSubscriptionFormChange}
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
                value={subscriptionFormData.price}
                onChange={handleSubscriptionFormChange}
                placeholder="9.99"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="billingCycle">Billing Cycle</Label>
              <select
                id="billingCycle"
                name="billingCycle"
                value={subscriptionFormData.billingCycle}
                onChange={handleSubscriptionFormChange}
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
                value={subscriptionFormData.nextBilling}
                onChange={handleSubscriptionFormChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleAddSubscription}>Add Subscription</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Subscription Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Subscription</DialogTitle>
            <DialogDescription>
              Update the details of your subscription
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Service Name</Label>
              <Input
                id="edit-name"
                name="name"
                value={subscriptionFormData.name}
                onChange={handleSubscriptionFormChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-price">Monthly Price</Label>
              <Input
                id="edit-price"
                name="price"
                type="number"
                step="0.01"
                value={subscriptionFormData.price}
                onChange={handleSubscriptionFormChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-billingCycle">Billing Cycle</Label>
              <select
                id="edit-billingCycle"
                name="billingCycle"
                value={subscriptionFormData.billingCycle}
                onChange={handleSubscriptionFormChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-nextBilling">Next Billing Date</Label>
              <Input
                id="edit-nextBilling"
                name="nextBilling"
                type="date"
                value={subscriptionFormData.nextBilling}
                onChange={handleSubscriptionFormChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleEditSubscription}>Update Subscription</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatInterface;
