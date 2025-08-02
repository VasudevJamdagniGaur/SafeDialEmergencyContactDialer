import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Phone, MapPin, Clock, ExternalLink, Share, Edit2, Save, X } from "lucide-react";
import { useLocation, useSearch } from "wouter";
import { EmergencyService } from "@/types/emergency";
import { useState } from "react";

export default function EmergencyDetails() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedService, setEditedService] = useState<EmergencyService | null>(null);
  
  // Parse service ID from URL
  const urlParams = new URLSearchParams(search);
  const serviceId = urlParams.get('service');

  // Mock service data - in production this would come from a database
  const services: Record<string, EmergencyService> = {
    police: {
      id: "police",
      name: "Police Emergency",
      category: "Law Enforcement",
      phone: "112",
      location: "Central Police Station",
      address: "Main Street, City Center - 0.8 km away",
      distance: "0.8 km",
      available: true,
      icon: "police",
      color: "blue"
    },
    fire: {
      id: "fire",
      name: "Fire Emergency",
      category: "Fire Department",
      phone: "101",
      location: "Fire Station",
      address: "Emergency Lane, Downtown - 1.2 km away",
      distance: "1.2 km",
      available: true,
      icon: "fire",
      color: "red"
    },
    medical: {
      id: "medical",
      name: "Medical Emergency",
      category: "Emergency Medical",
      phone: "102 / 108",
      location: "City Hospital",
      address: "Health Complex, Medical District - 0.5 km away",
      distance: "0.5 km",
      available: true,
      icon: "medical",
      color: "red"
    },
    cm: {
      id: "cm",
      name: "CM Helpline",
      category: "Chief Minister Office",
      phone: "1076",
      location: "CM Office",
      address: "Available 24x7",
      distance: "24x7",
      available: true,
      icon: "disaster",
      color: "orange"
    },
    women: {
      id: "women",
      name: "Women Help",
      category: "Women Safety",
      phone: "1090",
      location: "Women Helpline",
      address: "Available 24x7",
      distance: "24x7",
      available: true,
      icon: "women",
      color: "pink"
    },
    child: {
      id: "child",
      name: "Child Help",
      category: "Child Protection",
      phone: "1098",
      location: "Child Helpline",
      address: "Available 24x7",
      distance: "24x7",
      available: true,
      icon: "child",
      color: "purple"
    },
    nic: {
      id: "nic",
      name: "NIC Helpline",
      category: "Technical Support",
      phone: "1800 111 555",
      location: "NIC Support Center",
      address: "Available 24x7",
      distance: "24x7",
      available: true,
      icon: "elderly",
      color: "indigo"
    },
    railway: {
      id: "railway",
      name: "Railway",
      category: "Railway Security",
      phone: "182",
      location: "Railway Security",
      address: "Central Railway Station - 1.8 km away",
      distance: "1.8 km",
      available: true,
      icon: "railway",
      color: "green"
    }
  };

  const service = services[serviceId || ''] || services.police;

  const handleEditStart = () => {
    setEditedService({ ...service });
    setIsEditing(true);
  };

  const handleEditSave = () => {
    if (editedService) {
      // In a real app, you would save to a database here
      services[editedService.id] = editedService;
      setIsEditing(false);
      setEditedService(null);
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditedService(null);
  };

  const handleInputChange = (field: keyof EmergencyService, value: string) => {
    if (editedService) {
      setEditedService({
        ...editedService,
        [field]: value
      });
    }
  };

  const currentService = isEditing && editedService ? editedService : service;

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'police':
        return '🚓';
      case 'fire':
        return '🔥';
      case 'medical':
        return '🏥';
      default:
        return '📞';
    }
  };

  const getIconColor = (iconName: string) => {
    switch (iconName) {
      case 'police':
        return 'bg-blue-100 text-blue-600';
      case 'fire':
        return 'bg-red-100 text-red-600';
      case 'medical':
        return 'bg-red-100 text-red-500';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const handleCall = () => {
    if (confirm(`This will call ${currentService.name} (${currentService.phone}). Continue?`)) {
      const phoneNumber = currentService.phone.split(' / ')[0];
      window.location.href = `tel:${phoneNumber}`;
    }
  };

  const openInMaps = () => {
    const query = encodeURIComponent(currentService.location);
    window.open(`https://maps.google.com/?q=${query}`, '_blank');
  };

  const shareLocation = () => {
    if (navigator.share) {
      navigator.share({
        title: `${currentService.name} Location`,
        text: `I'm sharing the location of ${currentService.name}`,
        url: window.location.href
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-ocean-blue text-white p-4 flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setLocation("/")}
          className="text-white hover:bg-white/20 p-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-semibold ml-3">{currentService.name}</h2>
        <div className="ml-auto">
          {!isEditing ? (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleEditStart}
              className="text-white hover:bg-white/20 p-2"
            >
              <Edit2 className="w-5 h-5" />
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleEditSave}
                className="text-white hover:bg-white/20 p-2"
              >
                <Save className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleEditCancel}
                className="text-white hover:bg-white/20 p-2"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <Card className="shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mr-4 ${getIconColor(currentService.icon)}`}>
                <span className="text-2xl">{getServiceIcon(currentService.icon)}</span>
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-2">
                    <Input
                      value={editedService?.name || ''}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="text-xl font-bold"
                      placeholder="Service Name"
                    />
                    <Input
                      value={editedService?.category || ''}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="text-gray-600"
                      placeholder="Category"
                    />
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{currentService.name}</h3>
                    <p className="text-gray-600">{currentService.category}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-500" />
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-1">
                      <Input
                        value={editedService?.phone || ''}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="font-semibold"
                        placeholder="Phone Number"
                      />
                      <p className="text-sm text-gray-600">Emergency Hotline</p>
                    </div>
                  ) : (
                    <div>
                      <p className="font-semibold">{currentService.phone}</p>
                      <p className="text-sm text-gray-600">Emergency Hotline</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-1">
                      <Input
                        value={editedService?.location || ''}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="font-semibold"
                        placeholder="Location Name"
                      />
                      <Input
                        value={editedService?.address || ''}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="text-sm text-gray-600"
                        placeholder="Full Address"
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="font-semibold">{currentService.location}</p>
                      <p className="text-sm text-gray-600">{currentService.address}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-semibold">24/7 Available</p>
                  <p className="text-sm text-gray-600">Emergency services</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-3">
          <Button 
            onClick={handleCall}
            className="w-full bg-emergency-red hover:bg-red-600 text-white font-bold py-4 emergency-pulse"
            size="lg"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call Now
          </Button>
          
          <Button 
            onClick={openInMaps}
            className="w-full bg-ocean-blue hover:bg-blue-700"
            size="lg"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Open in Maps
          </Button>
          
          <Button 
            onClick={shareLocation}
            variant="outline"
            className="w-full"
            size="lg"
          >
            <Share className="w-5 h-5 mr-2" />
            Share My Location
          </Button>
        </div>
      </div>
    </div>
  );
}
