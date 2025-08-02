import { Button } from "@/components/ui/button";
import { Phone, User, PhoneCall } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function Splash() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Auto-transition to login after 3 seconds
    const timer = setTimeout(() => {
      setLocation("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [setLocation]);

  const handleEmergencyCall = () => {
    if (confirm('This will call emergency services (112). Continue?')) {
      window.location.href = 'tel:112';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-blue to-sea-green flex flex-col items-center justify-center text-white relative">
      <div className="text-center mb-8 fade-in">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
          <PhoneCall className="w-12 h-12 ocean-blue" />
        </div>
        <h1 className="text-3xl font-bold mb-2">SafeDial</h1>
        <p className="text-lg opacity-90">Your lifeline in emergencies</p>
      </div>
      
      <div className="space-y-4 w-full px-8 max-w-sm">
        <Button 
          onClick={handleEmergencyCall}
          className="w-full bg-emergency-red hover:bg-red-600 text-white font-bold py-4 px-6 rounded-xl emergency-pulse shadow-lg"
          size="lg"
        >
          <AlertTriangle className="w-5 h-5 mr-2" />
          🔴 Emergency Call (112)
        </Button>
        
        <Button 
          onClick={() => setLocation("/login")}
          className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-3 px-6 rounded-xl backdrop-blur-sm"
          variant="ghost"
        >
          <User className="w-5 h-5 mr-2" />
          👤 Login
        </Button>
      </div>
      
      <div className="absolute bottom-4 text-center">
        <p className="text-sm opacity-75">Powered by SafeDial Team</p>
      </div>
    </div>
  );
}
