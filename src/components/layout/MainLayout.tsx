
import { ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";
import Sidebar from './Sidebar';
import { BrainCog, Sparkles } from 'lucide-react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { toast } = useToast();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 p-0">
        <div className="flex flex-col min-h-screen">
          <header className="border-b bg-card p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-primary px-3 py-1 rounded-full">
                <Sparkles size={16} className="text-primary-foreground" />
                <h1 className="text-primary-foreground font-medium">SubscrAIbe</h1>
              </div>
              <span className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded">Beta</span>
            </div>
            <div className="flex items-center gap-2">
              <BrainCog className="h-5 w-5 text-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">AI Assistant Active</span>
            </div>
          </header>
          
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
