import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Play, Calendar, Radio, Shield } from "lucide-react";
import { useLocation } from "wouter";
import { BottomNavigation } from "@/components/bottom-navigation";
import { TrackingSettings } from "@/types/emergency";

export default function TrackMe() {
  const [, setLocation] = useLocation();
  
  const [tracking, setTracking] = useState<TrackingSettings>({
    alternateNumber: "",
    mpinEnabled: false,
    isActive: false
  });

  const startTracking = () => {
    setTracking({...tracking, isActive: true});
  };

  const scheduleTracking = () => {
    // Implementation for scheduled tracking
  };

  const goLive = () => {
    // Implementation for live tracking
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-ocean-blue text-white p-4 flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setLocation("/")}
          className="text-white hover:bg-white/20 p-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-semibold ml-3">TrackMe</h2>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-light-aqua rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Real-time Location Tracking</h3>
          <p className="text-gray-600">Share your live location with trusted contacts for safety</p>
        </div>
        
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <h4 className="font-semibold text-gray-800 mb-3">Key Features</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">Scheduled Tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <Radio className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">Go Live</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">MPIN Verification</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="alternateNumber">Alternate Contact Number (Optional)</Label>
            <Input
              id="alternateNumber"
              type="tel"
              placeholder="+91 9876543210"
              value={tracking.alternateNumber}
              onChange={(e) => setTracking({...tracking, alternateNumber: e.target.value})}
            />
          </div>
          
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-800">MPIN Protection</h4>
                  <p className="text-sm text-gray-600">Require PIN to stop tracking</p>
                </div>
                <Switch 
                  checked={tracking.mpinEnabled}
                  onCheckedChange={(checked) => setTracking({...tracking, mpinEnabled: checked})}
                  className="data-[state=checked]:bg-sea-green"
                />
              </div>
            </CardContent>
          </Card>
          
          <Button 
            onClick={startTracking}
            className="w-full bg-sea-green hover:bg-green-700 text-white font-bold py-4"
            size="lg"
          >
            <Play className="w-5 h-5 mr-2" />
            Get Started
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={scheduleTracking}
              variant="outline"
              className="flex flex-col items-center p-4 h-auto"
            >
              <Calendar className="w-6 h-6 ocean-blue mb-2" />
              <span className="text-sm font-medium text-gray-700">Schedule</span>
            </Button>
            
            <Button
              onClick={goLive}
              variant="outline"
              className="flex flex-col items-center p-4 h-auto"
            >
              <Radio className="w-6 h-6 text-red-500 mb-2" />
              <span className="text-sm font-medium text-gray-700">Go Live</span>
            </Button>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
