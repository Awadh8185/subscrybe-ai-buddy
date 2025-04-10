
import { ArrowLeft, ExternalLink, CreditCard, CalendarClock, HelpCircle, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

interface ServiceDetailProps {
  service: {
    id: string;
    name: string;
    description: string;
    price: number;
    billingCycle: string;
    nextBilling: string;
    plan: string;
    icon: React.ReactNode;
    usageData?: {
      amount: number;
      label: string;
    }[];
  };
}

const ServiceDetail = ({ service }: ServiceDetailProps) => {
  // Monthly payment history - dummy data
  const paymentHistory = [
    { date: 'Apr 15, 2025', amount: service.price, status: 'Paid' },
    { date: 'Mar 15, 2025', amount: service.price, status: 'Paid' },
    { date: 'Feb 15, 2025', amount: service.price, status: 'Paid' },
    { date: 'Jan 15, 2025', amount: service.price - 2, status: 'Paid' },
    { date: 'Dec 15, 2024', amount: service.price - 2, status: 'Paid' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon" className="rounded-full">
            <Link to="/subscriptions">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            {service.icon}
            <h1 className="text-2xl font-bold">{service.name}</h1>
          </div>
        </div>
        <Button>
          <ExternalLink className="h-4 w-4 mr-2" />
          Open {service.name}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              Billing Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm font-medium">Current Plan</div>
              <div className="text-xl font-bold">{service.plan}</div>
            </div>
            
            <div>
              <div className="text-sm font-medium">Price</div>
              <div className="text-xl font-bold">${service.price.toFixed(2)}/{service.billingCycle}</div>
            </div>
            
            <div>
              <div className="text-sm font-medium">Next Billing Date</div>
              <div className="text-xl font-bold">{service.nextBilling}</div>
            </div>

            <div className="pt-3 flex gap-2">
              <Button variant="outline" className="flex-1">Change Plan</Button>
              <Button variant="destructive" className="flex-1">Cancel</Button>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Tabs defaultValue="usage">
            <TabsList className="mb-4">
              <TabsTrigger value="usage" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                Usage
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4" />
                Payment History
              </TabsTrigger>
              <TabsTrigger value="help" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                Help
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="usage" className="mt-0 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Usage Statistics</CardTitle>
                  <CardDescription>
                    View your {service.name} usage over time
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {service.usageData ? (
                    service.usageData.map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <div>{item.label}</div>
                          <div className="font-medium">{item.amount}%</div>
                        </div>
                        <Progress value={item.amount} className="h-2" />
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <p>No usage data is currently available for this service.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-3 bg-muted p-3 text-sm font-medium">
                      <div>Date</div>
                      <div>Amount</div>
                      <div>Status</div>
                    </div>
                    {paymentHistory.map((payment, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-3 p-3 text-sm hover:bg-muted border-t"
                      >
                        <div>{payment.date}</div>
                        <div>${payment.amount.toFixed(2)}</div>
                        <div className="flex items-center gap-2">
                          <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                          {payment.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="help" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Help & Support</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Common Questions</h3>
                    <div className="space-y-1">
                      <Button variant="link" className="p-0 h-auto text-left justify-start">
                        How do I change my plan?
                      </Button>
                      <Button variant="link" className="p-0 h-auto text-left justify-start">
                        Can I pause my subscription?
                      </Button>
                      <Button variant="link" className="p-0 h-auto text-left justify-start">
                        How to update payment method
                      </Button>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Button variant="outline" className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit {service.name} Help Center
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
