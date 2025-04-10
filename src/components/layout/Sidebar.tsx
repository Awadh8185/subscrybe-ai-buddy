
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  MessageSquarePlus, 
  Music, 
  CreditCard, 
  HelpCircle 
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navItems = [
    { icon: MessageSquarePlus, label: "Chat", to: "/" },
    { icon: CreditCard, label: "Subscriptions", to: "/subscriptions" },
    { icon: Music, label: "Spotify", to: "/service/spotify" },
    { icon: HelpCircle, label: "Help", to: "/help" },
  ];

  return (
    <div className="hidden md:flex w-64 flex-col shrink-0 bg-sidebar border-r h-screen">
      <div className="p-4 flex items-center">
        <h2 className="text-xl font-bold text-sidebar-foreground">SubscrAIbe</h2>
      </div>
      
      <div className="flex-1 overflow-auto py-4">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => (
            <NavLink 
              key={item.to} 
              to={item.to}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                isActive 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="p-4">
        <Button variant="outline" className="w-full justify-start gap-2">
          <HelpCircle className="h-4 w-4" />
          Connect New Service
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
