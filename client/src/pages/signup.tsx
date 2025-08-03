
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, User } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Signup() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    gender: "",
    state: ""
  });
  
  const [loading, setLoading] = useState(false);

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
    "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal"
  ];

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.phoneNumber || !formData.gender || !formData.state) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (formData.phoneNumber.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Save user data to localStorage
    localStorage.setItem('userProfile', JSON.stringify(formData));
    localStorage.setItem('isFirstTimeUser', 'true');
    
    toast({
      title: "Account Created",
      description: "Welcome to SafeDial! Setting up your profile...",
    });

    setTimeout(() => {
      setLoading(false);
      setLocation("/location-permission");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="bg-ocean-blue text-white p-4 flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setLocation("/splash")}
          className="text-white hover:bg-white/20 p-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-semibold ml-3">Create Account</h2>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-light-aqua rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Welcome to SafeDial</h3>
          <p className="text-gray-600 mt-2">Let's set up your emergency profile</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName" className="text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </Label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>
          
          <div>
            <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </Label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                +91
              </span>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="9876543210"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                className="flex-1 rounded-l-none"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="gender" className="text-sm font-medium text-gray-700 mb-2">
              Gender *
            </Label>
            <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="state" className="text-sm font-medium text-gray-700 mb-2">
              State *
            </Label>
            <Select value={formData.state} onValueChange={(value) => setFormData({...formData, state: value})}>
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
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-ocean-blue hover:bg-blue-700 mt-6"
            size="lg"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </div>
        
        <div className="text-xs text-gray-500 text-center leading-relaxed">
          By continuing, you agree to our{" "}
          <a href="#" className="text-ocean-blue underline">Terms of Use</a> and{" "}
          <a href="#" className="text-ocean-blue underline">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}
