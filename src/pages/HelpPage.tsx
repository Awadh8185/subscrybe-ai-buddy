
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, MessageSquare, FileQuestion, Youtube, Link } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HelpPage = () => {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Help & Support</h1>

        <div className="relative">
          <Input 
            placeholder="Search for help topics..." 
            className="pl-10"
          />
          <HelpCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileQuestion className="h-5 w-5 text-primary" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>
                Find quick answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Accordion 
                title="How do I connect a new subscription service?"
                content="To connect a new subscription service, go to Services and click on 'Connect' next to the service you want to add. Follow the authentication steps to link your account."
              />
              
              <Accordion 
                title="Can I manage subscriptions I didn't sign up through the app?"
                content="Yes! You can manually add any subscription by providing your account details and login information for that service. We'll securely connect and help you manage it."
              />
              
              <Accordion 
                title="Is my subscription data secure?"
                content="We use industry-standard encryption and security practices. Your data is encrypted both in transit and at rest, and we never share your personal information with third parties."
              />
              
              <Accordion 
                title="How do I cancel a subscription?"
                content="To cancel a subscription, navigate to the specific service page, click on 'Manage Subscription' and select 'Cancel Subscription'. Follow the prompts to complete the cancellation."
              />
              
              <Button variant="outline" className="w-full mt-2">View all FAQs</Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Contact Support
                </CardTitle>
                <CardDescription>
                  Get help from our support team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Our support team is available Monday-Friday, 9am-5pm EST.
                  We typically respond within 24 hours.
                </p>
                <Button className="w-full">Contact Support</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Youtube className="h-5 w-5 text-primary" />
                  Video Tutorials
                </CardTitle>
                <CardDescription>
                  Learn how to use SubsrAIbe with step-by-step videos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Link className="h-4 w-4 mr-2" />
                  Getting started with SubscrAIbe
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Link className="h-4 w-4 mr-2" />
                  How to connect your first service
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Link className="h-4 w-4 mr-2" />
                  Using the AI assistant effectively
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

interface AccordionProps {
  title: string;
  content: string;
}

const Accordion = ({ title, content }: AccordionProps) => {
  return (
    <details className="group border rounded-md">
      <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4">
        <h3 className="text-sm font-medium">{title}</h3>
        <svg
          className="h-5 w-5 text-muted-foreground group-open:rotate-180 transition-transform"
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
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </summary>
      <p className="text-sm text-muted-foreground px-4 pb-4">
        {content}
      </p>
    </details>
  );
};

export default HelpPage;
