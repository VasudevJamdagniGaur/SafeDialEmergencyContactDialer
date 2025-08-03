
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Shield, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function LocationPermission() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    // Check if user has already granted location permission
    if (localStorage.getItem('locationPermissionGranted') === 'true') {
      setLocation("/");
    }
  }, [setLocation]);

  const requestLocationPermission = () => {
    setRequesting(true);

    if (!navigator.geolocation) {
      toast({
        title: "Location Not Supported",
        description: "Your browser doesn't support location services.",
        variant: "destructive",
      });
      setRequesting(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Save location permission status
        localStorage.setItem('locationPermissionGranted', 'true');
        localStorage.setItem('lastKnownLocation', JSON.stringify({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          timestamp: Date.now()
        }));
        
        toast({
          title: "Location Access Granted",
          description: "Your location will be used for emergency services.",
        });
        
        setRequesting(false);
        setLocation("/");
      },
      (error) => {
        toast({
          title: "Location Access Denied",
          description: "You can enable location access later in settings.",
          variant: "destructive",
        });
        setRequesting(false);
        setLocation("/");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const skipForNow = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-ocean-blue rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Enable Location Access</h2>
          <p className="text-gray-600">
            SafeDial needs access to your location to provide emergency services and safety features.
          </p>
        </div>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Shield className="w-5 h-5 text-blue-600 mr-2" />
              Why we need location access:
            </h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p>• Send your exact location during SOS alerts</p>
              <p>• Help emergency services find you quickly</p>
              <p>• Enable real-time location tracking for safety</p>
              <p>• Find nearby emergency services</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Button 
            onClick={requestLocationPermission}
            disabled={requesting}
            className="w-full bg-ocean-blue hover:bg-blue-700"
            size="lg"
          >
            {requesting ? "Requesting Permission..." : "Allow Location Access"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <Button 
            onClick={skipForNow}
            variant="outline"
            className="w-full"
            size="lg"
          >
            Skip for Now
          </Button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          You can change location permissions anytime in your device settings.
        </p>
      </div>
    </div>
  );
}
