export interface EmergencyService {
  id: string;
  name: string;
  category: string;
  phone: string;
  alternatePhone?: string;
  location: string;
  address: string;
  distance: string;
  available: boolean;
  icon: string;
  color: string;
}

export interface SOSData {
  id: string;
  status: string;
  timestamp: string;
  message?: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}

export interface UserProfile {
  fullName: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  state: string;
  about: string;
  specialNeed: boolean;
  profileImage?: string;
}

export interface TrackingSettings {
  alternateNumber: string;
  mpinEnabled: boolean;
  isActive: boolean;
}
