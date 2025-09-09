import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plane, 
  Cpu, 
  Satellite,
  Thermometer,
  Droplets,
  BarChart3
} from "lucide-react";

export function InnovationSection() {
  const innovations = [
    {
      icon: Plane,
      title: "Drone Technology",
      description: "Autonomous UAVs for crop monitoring, spraying, and field analysis",
      image: "/lovable-uploads/drone-spraying.jpg",
      badge: "AI-Powered",
      color: "bg-gradient-primary"
    },
    {
      icon: Thermometer,
      title: "IoT Soil Sensors",  
      description: "Smart sensors monitoring soil health, moisture, and nutrient levels",
      image: "/lovable-uploads/soil-sensors.jpg",
      badge: "Real-time",
      color: "bg-gradient-secondary"
    },
    {
      icon: Cpu,
      title: "AI Disease Detection",
      description: "Machine learning algorithms for early crop disease identification",
      image: "/lovable-uploads/ai-detection.jpg", 
      badge: "95% Accurate",
      color: "bg-gradient-primary"
    },
    {
      icon: Satellite,
      title: "Satellite Imaging",
      description: "High-resolution satellite data for large-scale field monitoring",
      image: "/lovable-uploads/satellite-view.jpg",
      badge: "Global Coverage",
      color: "bg-gradient-secondary"
    },
    {
      icon: Droplets,
      title: "Smart Irrigation",
      description: "Precision water management based on crop needs and weather data",
      image: "/lovable-uploads/smart-irrigation.jpg",
      badge: "Water Efficient", 
      color: "bg-gradient-primary"
    },
    {
      icon: BarChart3,
      title: "Market Analytics",
      description: "Real-time price tracking and demand forecasting for optimal sales",
      image: "/lovable-uploads/market-analytics.jpg",
      badge: "Profit Focused",
      color: "bg-gradient-secondary"
    }
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-60 h-60 bg-primary rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cutting-Edge{" "}
            <span className="text-primary">Agricultural Innovation</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how our advanced technologies are transforming traditional farming 
            into precision agriculture for maximum yield and sustainability.
          </p>
        </motion.div>

        {/* Innovation Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {innovations.map((innovation, index) => (
            <motion.div
              key={innovation.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="h-full bg-card hover:bg-accent/50 transition-all duration-300 shadow-tech hover:shadow-elegant border-border/50">
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${innovation.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <innovation.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <Badge className="bg-secondary/10 text-secondary-foreground border-secondary/20">
                      {innovation.badge}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {innovation.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {innovation.description}
                    </p>
                  </div>

                  {/* Image Placeholder */}
                  <div className="mt-4 h-32 bg-gradient-card rounded-lg border border-border/20 flex items-center justify-center">
                    <innovation.icon className="h-8 w-8 text-muted-foreground/50" />
                  </div>

                  {/* Action Indicator */}
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <div className="flex items-center text-sm text-primary font-medium group-hover:translate-x-2 transition-transform">
                      Learn More →
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground bg-card px-6 py-3 rounded-full shadow-elegant">
            <Cpu className="h-4 w-4 text-primary" />
            <span>Powered by Advanced AI & Machine Learning</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}