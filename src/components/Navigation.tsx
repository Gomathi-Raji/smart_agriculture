import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Search,
  ChevronDown
} from "lucide-react";

export function Navigation() {

  const location = useLocation();
  // const { t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Market Analysis", path: "/market-analysis", icon: TrendingUp },
    { name: "Community", path: "/community", icon: Users },
    { name: "Profile", path: "/user-profile", icon: User },
  ];

  const diagnoseItems = [
    { name: "Diagnose Disease", path: "/diagnose", icon: Camera },
    { name: "Hybrid Breeding", path: "/hybrid", icon: Leaf },
  ];

  const moreItems = [
    { name: "Recommendations", path: "/recommendations", icon: Sparkles },
    { name: "Market Analysis", path: "/market-analysis", icon: TrendingUp },
    { name: "Government Schemes", path: "/government-schemes", icon: Users },
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
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/agri-logo.png" 
                alt="AgriSmart Logo" 
                className="w-10 h-10 object-contain"
              />
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

              {/* Diagnose Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive("/diagnose") || isActive("/hybrid")
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    <Camera className="h-4 w-4" />
                    <span>Diagnose</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="bg-background border-border">
                  {diagnoseItems.map((item) => (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link
                        to={item.path}
                        className="flex items-center space-x-2 w-full px-2 py-1.5 text-sm cursor-pointer"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Theme Toggle and Search */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></div>
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
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 shadow-elegant z-50 rounded-t-xl" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="relative flex items-center justify-between h-16 px-6">
          {/* Left icons: Home, Market Analysis */}
          <div className="flex items-center gap-8">
            <Link to="/" className={`flex items-center justify-center ${isActive('/') ? 'text-primary bg-slate-800 rounded-full p-2' : 'text-muted-foreground'}`}>
              <Home className="h-7 w-7" />
            </Link>

            <Link to="/market-analysis" className={`flex items-center justify-center ${isActive('/market-analysis') ? 'text-primary bg-slate-800 rounded-full p-2' : 'text-muted-foreground'}`}>
              <TrendingUp className="h-7 w-7" />
            </Link>
          </div>

          {/* Center FAB Diagnose */}
          <Link
            to="/diagnose"
            aria-label="Diagnose"
            className={`absolute -top-7 left-1/2 transform -translate-x-1/2 bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center shadow-xl border-4 border-slate-900 ${
              isActive('/diagnose') || isActive('/hybrid') ? 'ring-2 ring-green-200' : ''
            }`}
          >
            <Camera className="h-8 w-8" />
          </Link>

          {/* Right icons: Community, Profile */}
          <div className="flex items-center gap-8">
            <Link to="/community" className={`flex items-center justify-center ${isActive('/community') ? 'text-primary bg-slate-800 rounded-full p-2' : 'text-muted-foreground'}`}>
              <Users className="h-7 w-7" />
            </Link>

            <Link to="/user-profile" className={`flex items-center justify-center ${isActive('/user-profile') ? 'text-primary bg-slate-800 rounded-full p-2' : 'text-muted-foreground'}`}>
              <User className="h-7 w-7" />
            </Link>
          </div>
        </div>
      </div>



      {/* Mobile Top Bar */}
      <div className="md:hidden bg-card border-b border-border shadow-sm sticky top-0 z-30">
        <div className="flex justify-between items-center h-14 px-4">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/agri-logo.png" 
              alt="AgriSmart Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="font-bold text-lg text-primary">AgriSmart</span>
          </Link>
          
          <div className="flex items-center space-x-2">
            {/* Notifications and Theme for Mobile */}
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></div>
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