
import { Button } from "@/components/ui/button";
import { Phone, User, AlertTriangle } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function Splash() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Auto-transition to login after 4 seconds
    const timer = setTimeout(() => {
      setLocation("/login");
    }, 4000);

    return () => clearTimeout(timer);
  }, [setLocation]);

  const handleEmergencyCall = () => {
    if (confirm('This will call emergency services (112). Continue?')) {
      window.location.href = 'tel:112';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100 flex flex-col items-center justify-center text-gray-800 relative">
      {/* Logo and App Name Section */}
      <div className="text-center mb-12 fade-in">
        <div className="w-32 h-32 mb-6 mx-auto">
          <img 
            src="/logo.png" 
            alt="SafeDial Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">SafeDial</h1>
        <p className="text-lg text-gray-600 opacity-90">Your lifeline in emergencies</p>
      </div>
      
      {/* Action Buttons */}
      <div className="space-y-4 w-full px-8 max-w-sm">
        <Button 
          onClick={handleEmergencyCall}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
          size="lg"
        >
          <AlertTriangle className="w-5 h-5 mr-2" />
          🔴 Emergency Call (112)
        </Button>
        
        <Button 
          onClick={() => setLocation("/login")}
          className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 px-6 rounded-xl shadow-md transform transition-all duration-200 hover:scale-105"
          variant="default"
        >
          <User className="w-5 h-5 mr-2" />
          👤 Get Started
        </Button>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-4 text-center">
        <p className="text-sm text-gray-500">Powered by SafeDial Team</p>
      </div>
    </div>
  );
}
