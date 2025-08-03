import { useState, createContext, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { EmergencyServiceCard } from "@/components/emergency-service-card";
import { BottomNavigation } from "@/components/bottom-navigation";
import { EmergencyService } from "@/types/emergency";
import { useLocation } from "wouter";
import { 
  User, 
  History, 
  Bell, 
  Info, 
  Phone, 
  MessageCircle, 
  MapPin, 
  AlertTriangle,
  Moon,
  Sun
} from "lucide-react";

// Create Theme Context
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

// Theme Provider Component
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

export function Home() {
  const [, setLocation] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [volunteerOnline, setVolunteerOnline] = useState(false);

  const emergencyServices: EmergencyService[] = [
    {
      id: "police",
      name: "Police",
      category: "Law Enforcement",
      phone: "112",
      location: "Central Police Station",
      address: "Main Street, City Center",
      distance: "0.8 km",
      available: true,
      icon: "police",
      color: "blue"
    },
    {
      id: "fire",
      name: "Fire",
      category: "Fire Department",
      phone: "101",
      location: "Fire Station",
      address: "Emergency Lane, Downtown",
      distance: "1.2 km",
      available: true,
      icon: "fire",
      color: "red"
    },
    {
      id: "medical",
      name: "Medical",
      category: "Emergency Medical",
      phone: "102 / 108",
      location: "City Hospital",
      address: "Health Complex, Medical District",
      distance: "0.5 km",
      available: true,
      icon: "medical",
      color: "red"
    },
    {
      id: "cm",
      name: "CM Helpline",
      category: "Chief Minister Office",
      phone: "1076",
      location: "CM Office",
      address: "Available 24x7",
      distance: "24x7",
      available: true,
      icon: "disaster",
      color: "orange"
    },
    {
      id: "women",
      name: "Women Help",
      category: "Women Safety",
      phone: "1090",
      location: "Women Helpline",
      address: "Available 24x7",
      distance: "24x7",
      available: true,
      icon: "women",
      color: "pink"
    },
    {
      id: "child",
      name: "Child Help",
      category: "Child Protection",
      phone: "1098",
      location: "Child Helpline",
      address: "Available 24x7",
      distance: "24x7",
      available: true,
      icon: "child",
      color: "purple"
    },
    {
      id: "nic",
      name: "NIC Helpline",
      category: "Technical Support",
      phone: "1800 111 555",
      location: "NIC Support Center",
      address: "Available 24x7",
      distance: "24x7",
      available: true,
      icon: "elderly",
      color: "indigo"
    },
    {
      id: "railway",
      name: "Railway",
      category: "Railway Security",
      phone: "182",
      location: "Railway Security",
      address: "Central Railway Station",
      distance: "1.8 km",
      available: true,
      icon: "railway",
      color: "green"
    }
  ];

  const quickActions = [
    { icon: User, label: "Profile", action: () => setLocation("/profile") },
    { icon: History, label: "SOS History", action: () => {} },
    { icon: Bell, label: "Notifications", action: () => {} },
    { icon: Info, label: "About Us", action: () => setLocation("/about") },
    { icon: Phone, label: "Dial 112", action: () => window.location.href = 'tel:112' },
    { icon: MessageCircle, label: "Chat Us", action: () => {} },
    { icon: MapPin, label: "TrackMe", action: () => setLocation("/trackme") },
    { icon: AlertTriangle, label: "Emergency", action: () => setLocation("/sos-map") }
  ];

  const handleServiceClick = (service: EmergencyService) => {
    setLocation(`/emergency-details?service=${service.id}`);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-ocean-blue text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setLocation("/profile")}
            className="text-white hover:bg-white/20 p-2"
          >
            <User className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">SafeDial</h1>
        </div>

        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleTheme}
            className="text-white hover:bg-white/20 p-2"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/20 p-2"
          >
            <Bell className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Quick Actions Grid */}
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              onClick={action.action}
              className={`flex flex-col items-center p-3 h-auto rounded-xl shadow-sm hover:shadow-md transition-shadow ${
                action.label === "Emergency" 
                  ? "bg-emergency-red text-white hover:bg-red-600 emergency-pulse" 
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <action.icon className={`w-6 h-6 mb-1 ${action.label === "Emergency" ? "text-white" : "ocean-blue"}`} />
              <span className={`text-xs ${action.label === "Emergency" ? "text-white font-semibold" : "text-gray-700"}`}>
                {action.label}
              </span>
            </Button>
          ))}
        </div>

        {/* Emergency Services Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Emergency Services</h2>
          <div className="grid grid-cols-2 gap-3">
            {emergencyServices.map((service) => (
              <EmergencyServiceCard
                key={service.id}
                service={service}
                onClick={handleServiceClick}
              />
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}