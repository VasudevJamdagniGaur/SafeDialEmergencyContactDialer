import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, CheckCircle, Info, Share, AlertTriangle } from "lucide-react";
import { useLocation } from "wouter";
import { useLocation as useGeoLocation } from "@/hooks/use-location";
import { BottomNavigation } from "@/components/bottom-navigation";

export default function SOSMap() {
  const [, setLocation] = useLocation();
  const { location, loading: locationLoading, getCurrentLocation } = useGeoLocation();

  useEffect(() => {
    // Get fresh location when SOS is activated
    if (!location) {
      getCurrentLocation();
    }
  }, [location, getCurrentLocation]);
  const [sosMessage, setSOSMessage] = useState("");
  const [sosActive, setSOSActive] = useState(true);
  const [sosData, setSOSData] = useState({
    id: `SOS-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    status: "Emergency Alert Sent",
    timestamp: new Date().toLocaleString(),
    location: null as any
  });

  // Auto-capture location and update SOS data when location is available
  useEffect(() => {
    if (location) {
      setSOSData(prev => ({
        ...prev,
        location: {
          lat: location.lat,
          lng: location.lng,
          address: location.address
        }
      }));
    }
  }, [location]);

  const confirmSafety = () => {
    setSOSActive(false);
    setLocation("/");
  };

  const shareSOSStatus = () => {
    if (navigator.share) {
      navigator.share({
        title: "SOS Alert",
        text: `Emergency alert active. Location: ${location?.address || 'Getting location...'}`,
        url: window.location.href
      });
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-emergency-red text-white p-4 flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setLocation("/")}
          className="text-white hover:bg-white/20 p-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-semibold ml-3">SOS Emergency</h2>
        <span className="ml-auto bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
          {sosActive ? "ACTIVE" : "RESOLVED"}
        </span>
      </div>

      {/* Map Container */}
      <div className="h-64 bg-gray-200 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-emergency-red rounded-full flex items-center justify-center mx-auto mb-2 emergency-pulse">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-gray-600">Live Location Tracking</p>
            {locationLoading ? (
              <p className="text-xs text-gray-500">Getting location...</p>
            ) : location ? (
              <p className="text-xs text-gray-500">
                Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
              </p>
            ) : (
              <p className="text-xs text-gray-500">Location unavailable</p>
            )}
          </div>
        </div>

        {/* Location marker overlay */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-6 h-6 bg-emergency-red rounded-full border-4 border-white shadow-lg emergency-pulse"></div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center mb-3">
              <AlertTriangle className="w-5 h-5 text-emergency-red mr-2" />
              <h3 className="font-semibold text-gray-800">SOS Alert Active</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">SOS ID:</span> {sosData.id}</p>
              <p><span className="font-medium">Status:</span> <span className="text-emergency-red font-medium">{sosData.status}</span></p>
              <p><span className="font-medium">Time:</span> {sosData.timestamp}</p>
              {sosData.location ? (
                <>
                  <p><span className="font-medium">Location:</span> {sosData.location.address}</p>
                  <p><span className="font-medium">Coordinates:</span> {sosData.location.lat.toFixed(6)}, {sosData.location.lng.toFixed(6)}</p>
                </>
              ) : locationLoading ? (
                <p><span className="font-medium">Location:</span> <span className="text-orange-600">Capturing location...</span></p>
              ) : (
                <p><span className="font-medium">Location:</span> <span className="text-red-600">Location unavailable</span></p>
              )}
            </div>
          </CardContent>
        </Card>

        <div>
          <Label htmlFor="sos-message" className="text-sm font-medium text-gray-700 mb-2">
            SOS Message (Optional)
          </Label>
          <Textarea
            id="sos-message"
            placeholder="Describe your emergency situation..."
            value={sosMessage}
            onChange={(e) => setSOSMessage(e.target.value)}
            className="resize-none"
            rows={3}
          />
        </div>

        <div className="space-y-3">
          <Button 
            onClick={confirmSafety}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4"
            size="lg"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            I Am Safe
          </Button>

          <Button 
            onClick={() => {}}
            className="w-full bg-ocean-blue hover:bg-blue-700"
            size="lg"
          >
            <Info className="w-5 h-5 mr-2" />
            More Details
          </Button>

          <Button 
            onClick={shareSOSStatus}
            variant="outline"
            className="w-full"
            size="lg"
          >
            <Share className="w-5 h-5 mr-2" />
            Share SOS Status
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}