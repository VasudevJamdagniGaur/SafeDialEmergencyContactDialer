import { Home, MapPin, User, Moon, Sun } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";

const navigationItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: MapPin, label: "Track Me", path: "/trackme" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function BottomNavigation() {
  const [location, setLocation] = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Add theme toggle logic here
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-2 py-2">
      <div className="flex justify-around items-center">
        {navigationItems.map((item) => {
          const isActive = location === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => setLocation(item.path)}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                isActive 
                  ? "text-ocean-blue bg-blue-50" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="flex flex-col items-center p-2 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 mb-1" />
          ) : (
            <Moon className="w-5 h-5 mb-1" />
          )}
          <span className="text-xs font-medium">Theme</span>
        </button>
      </div>
    </div>
  );
}