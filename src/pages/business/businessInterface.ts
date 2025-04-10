export interface BusinessFormData {
    name: string;
    description?: string;
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    googleMapUrl?: string;
    socialLinks: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
    };
    operatingHours?: string[];
    services?: string[];
    categories?: string[];
    amenities?: string[];
    specialOffers?: string;
    bookingUrl?: string;
  }
  