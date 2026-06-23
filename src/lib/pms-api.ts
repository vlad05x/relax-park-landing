/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * PMS API Integration Layer
 * TravelLine Shelter API wrapper with custom UI.
 * TODO: Replace mock data with actual API calls in production.
 */

export interface AvailabilityRequest {
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  adults: number;
  children?: number;
}

export interface RoomRate {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  available: boolean;
  amenities: string[];
  maxOccupancy: number;
  bedType: string;
  area: number; // m²
}

export interface BookingDetails {
  requestId: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  rooms: RoomRate[];
}

/**
 * Check room availability for given dates.
 * Currently returns mock data for development.
 * @param _req - Availability request (not used in mock implementation)
 */
export async function checkAvailability(
  _req: AvailabilityRequest
): Promise<RoomRate[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mock data for development
  return [
    {
      id: '1',
      name: 'Forest Villa',
      description: 'Отдельный дом в лесу с панорамными окнами',
      price: 25000,
      currency: 'UAH',
      available: true,
      amenities: ['WiFi', 'Камин', 'Терраса', 'Mini bar'],
      maxOccupancy: 2,
      bedType: 'King',
      area: 45,
    },
    {
      id: '2',
      name: 'Lake Suite',
      description: 'Люкс с видом на озеро',
      price: 35000,
      currency: 'UAH',
      available: true,
      amenities: ['WiFi', 'Джакузи', 'Балкон', 'Mini bar', 'SPA'],
      maxOccupancy: 4,
      bedType: 'King + Sofa',
      area: 65,
    },
    {
      id: '3',
      name: 'Royal Estate',
      description: 'Премиальный дом для большой компании',
      price: 55000,
      currency: 'UAH',
      available: false,
      amenities: ['WiFi', 'Камин', 'Терраса', 'Джакузи', 'Kitchen', 'SPA'],
      maxOccupancy: 6,
      bedType: '2x King + Sofa',
      area: 120,
    },
  ];
}

/**
 * Calculate total price for stay.
 */
export function calculateTotalPrice(
  room: RoomRate,
  nights: number
): number {
  return room.price * nights;
}

/**
 * Format price for display.
 */
export function formatPrice(price: number, currency: string = 'UAH'): string {
  const formatted = new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(price);
  // Replace "UAH" symbol with "грн" for Ukrainian formatting
  return formatted.replace('UAH', 'грн');
}