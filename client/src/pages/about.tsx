import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useLocation } from "wouter";

export default function About() {
  const [, setLocation] = useLocation();
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const faqItems = [
    {
      id: "register",
      question: "How to Register?",
      answer: "To register with SafeDial, simply enter your mobile number and select your state. You'll receive an OTP to verify your account. Once verified, you can access all emergency services and features."
    },
    {
      id: "contacts",
      question: "How to Add Emergency Contacts?",
      answer: "Go to your Profile section and scroll down to \"Emergency Contacts\". You can add up to 5 trusted contacts who will be notified during emergencies. Make sure to verify their numbers."
    },
    {
      id: "kyc",
      question: "How to Complete KYC?",
      answer: "KYC verification helps authorities identify you during emergencies. Upload a clear photo of your government ID (Aadhaar, Driving License, or Passport) in the Profile section."
    },
    {
      id: "sos",
      question: "How to Raise Emergency SOS?",
      answer: "Press the red Emergency button on the home screen or press your phone's volume down button 5 times quickly. Your location will be shared with emergency services and your trusted contacts automatically."
    },
    {
      id: "profile",
      question: "How to Update Profile?",
      answer: "Tap the Profile icon on the home screen. You can update your personal information, emergency contacts, medical information, and preferences. Don't forget to save your changes."
    }
  ];

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-ocean-blue text-white p-4 flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setLocation("/")}
          className="text-white hover:bg-white/20 p-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-semibold ml-3">About Us / FAQ</h2>
      </div>
      
      <div className="p-6 space-y-4">
        {faqItems.map((item) => (
          <Card key={item.id} className="border border-gray-200 overflow-hidden">
            <Collapsible 
              open={openFAQ === item.id}
              onOpenChange={() => toggleFAQ(item.id)}
            >
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full p-4 text-left hover:bg-gray-50 flex items-center justify-between h-auto"
                >
                  <span className="font-medium text-gray-800">{item.question}</span>
                  {openFAQ === item.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="p-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-sm text-gray-700">{item.answer}</p>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
        
        <Card className="border-blue-200 bg-blue-50 mt-6">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-800 mb-2">About SafeDial</h3>
            <p className="text-sm text-gray-700 mb-3">
              SafeDial is a comprehensive emergency services directory designed to provide quick access to local emergency contacts and essential resources. Our mission is to ensure that help is always just one tap away.
            </p>
            <div className="text-xs text-gray-600">
              <p>Version 1.0.0</p>
              <p>© 2024 SafeDial Team. All rights reserved.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
