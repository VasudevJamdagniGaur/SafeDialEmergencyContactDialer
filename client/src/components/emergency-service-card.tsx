import { Card, CardContent } from "@/components/ui/card";
import { EmergencyService } from "@/types/emergency";
import { Phone, MapPin } from "lucide-react";

interface EmergencyServiceCardProps {
  service: EmergencyService;
  onClick: (service: EmergencyService) => void;
}

export function EmergencyServiceCard({ service, onClick }: EmergencyServiceCardProps) {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'police':
        return '🚓';
      case 'fire':
        return '🔥';
      case 'medical':
        return '🏥';
      case 'disaster':
        return '🌊';
      case 'women':
        return '👩';
      case 'child':
        return '👧';
      case 'elderly':
        return '👴';
      case 'railway':
        return '🚆';
      default:
        return '📞';
    }
  };

  const getIconColor = (iconName: string) => {
    switch (iconName) {
      case 'police':
        return 'text-blue-600';
      case 'fire':
        return 'text-red-600';
      case 'medical':
        return 'text-red-500';
      case 'disaster':
        return 'text-orange-600';
      case 'women':
        return 'text-pink-600';
      case 'child':
        return 'text-purple-600';
      case 'elderly':
        return 'text-indigo-600';
      case 'railway':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow duration-200"
      onClick={() => onClick(service)}
    >
      <CardContent className="p-4">
        <div className="flex items-center mb-2">
          <div className={`text-2xl mr-3 ${getIconColor(service.icon)}`}>
            {getServiceIcon(service.icon)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{service.name}</h3>
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="w-3 h-3 mr-1" />
              <span>{service.phone}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <MapPin className="w-3 h-3 mr-1" />
          <span>{service.location} - {service.distance}</span>
        </div>
      </CardContent>
    </Card>
  );
}
