import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, User, Camera } from "lucide-react";
import { useLocation } from "wouter";
import { BottomNavigation } from "@/components/bottom-navigation";
import { useToast } from "@/hooks/use-toast";
import { UserProfile } from "@/types/emergency";

export default function Profile() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [profile, setProfile] = useState<UserProfile>({
    fullName: "John Doe",
    phoneNumber: "+91 9876543210",
    gender: "",
    dateOfBirth: "",
    state: "",
    about: "",
    specialNeed: false
  });

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
    "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal"
  ];

  const updateProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
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
        <h2 className="text-xl font-semibold ml-3">Update Profile</h2>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Profile Photo Section */}
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="w-12 h-12 text-gray-400" />
          </div>
          <Button variant="ghost" className="ocean-blue font-medium">
            <Camera className="w-4 h-4 mr-2" />
            Change Photo
          </Button>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              value={profile.fullName}
              onChange={(e) => setProfile({...profile, fullName: e.target.value})}
            />
          </div>
          
          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="+91 9876543210"
              value={profile.phoneNumber}
              onChange={(e) => setProfile({...profile, phoneNumber: e.target.value})}
            />
          </div>
          
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select value={profile.gender} onValueChange={(value) => setProfile({...profile, gender: value})}>
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
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={profile.dateOfBirth}
              onChange={(e) => setProfile({...profile, dateOfBirth: e.target.value})}
            />
          </div>
          
          <div>
            <Label htmlFor="state">State</Label>
            <Select value={profile.state} onValueChange={(value) => setProfile({...profile, state: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select State" />
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
          
          <div>
            <Label htmlFor="about">About Me</Label>
            <Textarea
              id="about"
              placeholder="Tell us about yourself..."
              value={profile.about}
              onChange={(e) => setProfile({...profile, about: e.target.value})}
              className="resize-none"
              rows={3}
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <Checkbox
              id="specialNeed"
              checked={profile.specialNeed}
              onCheckedChange={(checked) => setProfile({...profile, specialNeed: checked as boolean})}
            />
            <Label htmlFor="specialNeed" className="text-sm">
              I have special needs
            </Label>
          </div>
          
          <Button 
            onClick={updateProfile}
            className="w-full bg-ocean-blue hover:bg-blue-700"
            size="lg"
          >
            Update Account
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
