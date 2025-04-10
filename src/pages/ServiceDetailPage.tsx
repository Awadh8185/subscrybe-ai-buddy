import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import ServiceDetail from "@/components/services/ServiceDetail";
import { Music } from "lucide-react";
const ServiceDetailPage = () => {
    const { serviceId } = useParams<{ serviceId: string }>();
  
    const services = {
      spotify: {
        id: "spotify",
        name: "Spotify",
        description: "Music streaming service",
        price: 9.99,
        billingCycle: "monthly",
        nextBilling: "April 28, 2025",
        plan: "Premium Individual",
        icon: <Music className="h-6 w-6 text-spotify" />,
        usageData: [
          { amount: 88, label: "Monthly listening time" },
          { amount: 65, label: "Playlist engagement" },
          { amount: 45, label: "New discoveries" }
        ]
      }
    };
  
    const service = serviceId && serviceId in services 
      ? services[serviceId as keyof typeof services] 
      : null;
  
    if (!service) {
      return (
        <MainLayout>
          <div className="p-6">
            <h1 className="text-2xl font-bold">Service not found</h1>
            <p className="mt-2 text-muted-foreground">
              The service you're looking for doesn't exist or hasn't been connected yet.
            </p>
          </div>
        </MainLayout>
      );
    }
  
    return (
      <MainLayout>
        <ServiceDetail service={service} />
      </MainLayout>
    );
  };
  
  export default ServiceDetailPage;