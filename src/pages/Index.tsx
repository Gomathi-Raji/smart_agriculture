import { HeroSection } from "@/components/home/HeroSection";
import { ProblemSolutionSection } from "@/components/home/ProblemSolutionSection";
import { StatsSection } from "@/components/home/StatsSection";
import { InnovationSection } from "@/components/home/InnovationSection"; 
import { DashboardPreviewSection } from "@/components/home/DashboardPreviewSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { IntegrationSection } from "@/components/home/IntegrationSection";
import { PricingSection } from "@/components/home/PricingSection";
import { CTASection } from "@/components/home/CTASection";
import { FAQSection } from "@/components/home/FAQSection";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  TrendingUp,
  ShoppingCart,
  Bell
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Problem & Solution Section */}
      <ProblemSolutionSection />

      {/* Impact Metrics Section */}
      <StatsSection />

      {/* Innovation Section */}
      <InnovationSection />

      {/* Smart Dashboard Preview */}
      <DashboardPreviewSection />

      {/* Case Study / Testimonial Section */}
      <TestimonialsSection />

      {/* Integration Section */}
      <IntegrationSection />

      {/* Pricing Plans Section */}
      <PricingSection />

      {/* Call-to-Action Section */}
      <CTASection />

      {/* FAQ Section */}
      <FAQSection />


      {/* Quick Actions for Mobile */}
      <div className="md:hidden pb-20">
        <Card className="mx-4 mb-4 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/diagnose")}
              className="h-auto py-4 flex-col gap-2"
            >
              <Camera className="h-6 w-6" />
              <span className="text-sm">Diagnose</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/buy")}
              className="h-auto py-4 flex-col gap-2"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="text-sm">Buy/Sell</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/market-analysis")}
              className="h-auto py-4 flex-col gap-2"
            >
              <TrendingUp className="h-6 w-6" />
              <span className="text-sm">Market</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;