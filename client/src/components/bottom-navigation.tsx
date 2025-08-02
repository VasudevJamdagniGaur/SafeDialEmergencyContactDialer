import { cn } from "@/lib/utils";
import { Home, AlertTriangle, MapPin, User } from "lucide-react";
import { useLocation } from "wouter";

export function BottomNavigation() {
  const [location, setLocation] = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/sos-map", icon: AlertTriangle, label: "SOS" },
    { path: "/trackme", icon: MapPin, label: "Track" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = location === item.path;
            return (
              <button
                key={item.path}
                onClick={() => setLocation(item.path)}
                className={cn(
                  "flex flex-col items-center p-2 transition-colors",
                  isActive 
                    ? item.label === "SOS" 
                      ? "text-emergency-red" 
                      : "text-ocean-blue"
                    : "text-gray-600 dark:text-gray-400"
                )}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
