
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { PlusCircle, Music, Film, Tv, BookOpen, ArrowRight } from "lucide-react";

const ServicesPage = () => {
  const { toast } = useToast();
  
  const connectedServices = [
    {
      id: "spotify",
      name: "Spotify",
      icon: Music,
      iconColor: "text-spotify",
      iconBg: "bg-spotify/10",
      status: "Connected",
    },
    {
      id: "netflix",
      name: "Netflix",
      icon: Film,
      iconColor: "text-netflix",
      iconBg: "bg-netflix/10",
      status: "Connected",
    }
  ];
  
  const availableServices = [
    {
      id: "hulu",
      name: "Hulu",
      icon: Tv,
      iconColor: "text-green-500",
      iconBg: "bg-green-500/10",
      status: "Connect",
    },
    {
      id: "audible",
      name: "Audible",
      icon: BookOpen,
      iconColor: "text-yellow-500",
      iconBg: "bg-yellow-500/10",
      status: "Connect",
    }
  ];
  
  const handleConnect = (service: string) => {
    toast({
      title: "Connection initiated",
      description: `We'll guide you through connecting your ${service} account.`,
    });
  };
  
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Services</h1>
        
        <div className="space-y-4">
          <h2 className="text-xl font-medium">Connected Services</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {connectedServices.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.id}>
                  <CardContent className="p-0">
                    <div className="flex items-center p-4">
                      <div className={`flex-shrink-0 p-2 mr-3 rounded-md ${service.iconBg}`}>
                        <Icon className={`h-6 w-6 ${service.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-medium">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">{service.status}</p>
                      </div>
                      <Button asChild variant="ghost">
                        <Link to={`/service/${service.id}`} className="flex items-center gap-1">
                          Manage
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-medium">Available Services</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {availableServices.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.id}>
                  <CardContent className="p-0">
                    <div className="flex items-center p-4">
                      <div className={`flex-shrink-0 p-2 mr-3 rounded-md ${service.iconBg}`}>
                        <Icon className={`h-6 w-6 ${service.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-medium">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">Not connected</p>
                      </div>
                      <Button 
                        variant="outline" 
                        className="gap-1"
                        onClick={() => handleConnect(service.name)}
                      >
                        <PlusCircle className="h-4 w-4" />
                        Connect
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Can't find your service?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              We're constantly adding new services to our platform. If you don't see your preferred service,
              request it and we'll let you know when it's available.
            </p>
            <Button>Request a Service</Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ServicesPage;
