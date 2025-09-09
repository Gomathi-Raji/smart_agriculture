import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";
// import { LanguageToggle } from "@/components/LanguageToggle";
// import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Home, 
  Camera, 
  ShoppingCart, 
  User, 
  Menu, 
  Leaf,
  TrendingUp,
  Users,
  MessageCircle,
  Cloud,
  Sparkles,
  Bell,
  Search
} from "lucide-react";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  // const { t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Diagnose", path: "/diagnose", icon: Camera },
    { name: "Marketplace", path: "/buy", icon: ShoppingCart },
    { name: "Recommendations", path: "/recommendations", icon: Sparkles },
    { name: "Weather", path: "/weather", icon: Cloud }, 
    { name: "", path: "/user-profile", icon: User }, 
  ];

  const moreItems = [
    { name: "Market Analysis", path: "/market-analysis", icon: TrendingUp },
    { name: "Crops & Hybrids", path: "/crops-hybrid", icon: Leaf },
    { name: "Government Schemes", path: "/government-schemes", icon: Users },
    { name: "Weather", path: "/weather", icon: Cloud },
    { name: "Seller Panel", path: "/seller-panel", icon: ShoppingCart },
    { name: "News & Blogs", path: "/blogs", icon: MessageCircle },
    { name: "Admin", path: "/admin", icon: Users },
    { name: "Support", path: "/support", icon: MessageCircle },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex bg-card border-b border-border shadow-elegant sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-primary">AgriSmart</span>
            </Link>

            {/* Desktop Menu */}
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name && <span>{item.name}</span>}
                </Link>
              ))}

              {/* Theme Toggle and Search */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center">
                    3
                  </Badge>
                </Button>
                <ThemeToggle />
              </div>

              {/* Authentication */}
              <SignedOut>
                <Link to="/auth">
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8"
                    }
                  }}
                />
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-elegant z-50">
        <div className="flex justify-around items-center py-2">
          {navItems.slice(0, 4).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center space-y-1 p-2 rounded-md min-w-[60px] ${
                isActive(item.path)
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.name && <span className="text-xs font-medium">{item.name}</span>}
            </Link>
          ))}
          {navItems.slice(4, 6).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center space-y-1 p-2 rounded-md min-w-[60px] ${
                isActive(item.path)
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
            </Link>
          ))}
          
          {/* More Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col items-center space-y-1 p-2 rounded-md min-w-[60px] text-muted-foreground"
          >
            <Menu className="h-5 w-5" />
            <span className="text-xs font-medium">More</span>
          </button>
        </div>
      </div>

      {/* Mobile More Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40">
          <div className="fixed bottom-16 left-0 right-0 bg-card border-t border-border rounded-t-2xl p-6">
            <div className="grid grid-cols-2 gap-4">
              {moreItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
                >
                  <item.icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Top Bar */}
      <div className="md:hidden bg-card border-b border-border shadow-sm sticky top-0 z-30">
        <div className="flex justify-between items-center h-14 px-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-primary">AgriSmart</span>
          </Link>
          
          <div className="flex items-center space-x-2">
            {/* Notifications and Theme for Mobile */}
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 text-xs p-0 flex items-center justify-center">
                3
              </Badge>
            </Button>
            <ThemeToggle />
            <SignedOut>
              <Link to="/auth">
                <Button variant="outline" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </>
  );
}