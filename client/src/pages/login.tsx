import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Phone } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateOTP = async () => {
    if (!phoneNumber || !state) {
      toast({
        title: "Missing Information",
        description: "Please enter your phone number and select your state.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate OTP generation
    toast({
      title: "OTP Sent",
      description: "OTP has been sent to your mobile number",
    });

    // Simulate successful login after 1 second
    setTimeout(() => {
      setLoading(false);
      setLocation("/");
    }, 1000);
  };

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
    "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal"
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-ocean-blue text-white p-4 flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setLocation("/splash")}
          className="text-white hover:bg-white/20 p-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-semibold ml-3">Login / Sign Up</h2>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-light-aqua rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Verify your number</h3>
          <p className="text-gray-600 mt-2">Enter your mobile number to get started</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2">
              Mobile Number
            </Label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                +91
              </span>
              <Input
                id="phone"
                type="tel"
                placeholder="9876543210"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1 rounded-l-none"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="state" className="text-sm font-medium text-gray-700 mb-2">
              Select State
            </Label>
            <Select value={state} onValueChange={setState}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your state" />
              </SelectTrigger>
              <SelectContent>
                {states.map((stateName) => (
                  <SelectItem key={stateName} value={stateName.toLowerCase().replace(/\s+/g, '-')}>
                    {stateName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={handleGenerateOTP}
            disabled={loading}
            className="w-full bg-ocean-blue hover:bg-blue-700"
            size="lg"
          >
            {loading ? "Generating OTP..." : "Generate OTP"}
          </Button>
        </div>
        
        <div className="text-xs text-gray-500 text-center leading-relaxed">
          By continuing, you agree to our{" "}
          <a href="#" className="ocean-blue underline">Terms of Use</a> and{" "}
          <a href="#" className="ocean-blue underline">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}
