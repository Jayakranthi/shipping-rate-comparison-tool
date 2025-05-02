import { 
  PackageDetails, 
  ShippingRate, 
  ShippingRatesResponse 
} from '../types';

// Mock carrier data
const carriers = [
  { id: 'usps', name: 'USPS', logo: '/logos/usps.png' },
  { id: 'fedex', name: 'FedEx', logo: '/logos/fedex.png' },
  { id: 'ups', name: 'UPS', logo: '/logos/ups.png' },
  { id: 'dhl', name: 'DHL', logo: '/logos/dhl.png' }
];

// Mock shipping methods
const shippingMethods = {
  usps: [
    { id: 'priority', name: 'Priority Mail', description: '1-3 business days', estimatedDeliveryDays: 2 },
    { id: 'express', name: 'Priority Mail Express', description: '1-2 business days', estimatedDeliveryDays: 1 },
    { id: 'first-class', name: 'First-Class Mail', description: '2-5 business days', estimatedDeliveryDays: 3 },
    { id: 'ground', name: 'USPS Ground Advantage', description: '2-5 business days', estimatedDeliveryDays: 4 }
  ],
  fedex: [
    { id: 'ground', name: 'FedEx Ground', description: '1-5 business days', estimatedDeliveryDays: 3 },
    { id: 'express', name: 'FedEx Express Saver', description: '3 business days', estimatedDeliveryDays: 3 },
    { id: '2day', name: 'FedEx 2Day', description: '2 business days', estimatedDeliveryDays: 2 },
    { id: 'overnight', name: 'FedEx Overnight', description: 'Next business day', estimatedDeliveryDays: 1 }
  ],
  ups: [
    { id: 'ground', name: 'UPS Ground', description: '1-5 business days', estimatedDeliveryDays: 3 },
    { id: '3day', name: 'UPS 3 Day Select', description: '3 business days', estimatedDeliveryDays: 3 },
    { id: '2day', name: 'UPS 2nd Day Air', description: '2 business days', estimatedDeliveryDays: 2 },
    { id: 'next-day', name: 'UPS Next Day Air', description: 'Next business day', estimatedDeliveryDays: 1 }
  ],
  dhl: [
    { id: 'express', name: 'DHL Express', description: '1-2 business days', estimatedDeliveryDays: 1 },
    { id: 'ground', name: 'DHL Ground', description: '3-8 business days', estimatedDeliveryDays: 5 }
  ]
};

// Calculate a mock price based on package details and carrier
const calculateMockPrice = (packageDetails: PackageDetails, carrierId: string, methodId: string): number => {
  // Base price factors
  const weightFactor = 2.5;
  const volumeFactor = 0.0001;
  const distanceFactor = Math.abs(parseInt(packageDetails.originZip.substring(0, 3)) - 
                                 parseInt(packageDetails.destinationZip.substring(0, 3))) / 100;
  
  // Calculate volume
  const volume = packageDetails.length * packageDetails.width * packageDetails.height;
  
  // Base price calculation
  let basePrice = (packageDetails.weight * weightFactor) + (volume * volumeFactor) + distanceFactor;
  
  // Carrier-specific adjustments
  switch (carrierId) {
    case 'usps':
      basePrice *= 0.9; // USPS is generally cheaper
      break;
    case 'fedex':
      basePrice *= 1.1;
      break;
    case 'ups':
      basePrice *= 1.15;
      break;
    case 'dhl':
      basePrice *= 1.2; // DHL is generally more expensive
      break;
  }
  
  // Method-specific adjustments
  if (methodId.includes('express') || methodId.includes('overnight') || methodId.includes('next-day')) {
    basePrice *= 1.8; // Express shipping is more expensive
  } else if (methodId.includes('2day')) {
    basePrice *= 1.5;
  } else if (methodId.includes('3day')) {
    basePrice *= 1.3;
  }
  
  // Add some randomness
  basePrice *= (0.9 + Math.random() * 0.2);
  
  // Round to 2 decimal places
  return Math.round(basePrice * 100) / 100;
};

// Generate mock shipping rates
const generateMockRates = (packageDetails: PackageDetails): ShippingRate[] => {
  const rates: ShippingRate[] = [];
  
  carriers.forEach(carrier => {
    const methods = shippingMethods[carrier.id as keyof typeof shippingMethods];
    
    methods.forEach(method => {
      const price = calculateMockPrice(packageDetails, carrier.id, method.id);
      
      rates.push({
        carrierId: carrier.id,
        carrierName: carrier.name,
        methodId: method.id,
        methodName: method.name,
        price,
        currency: 'USD',
        estimatedDeliveryDays: method.estimatedDeliveryDays,
        guaranteedDelivery: method.id.includes('express') || method.id.includes('overnight'),
        transitTime: `${method.estimatedDeliveryDays} business days`,
        serviceName: method.description
      });
    });
  });
  
  // Sort rates by price
  rates.sort((a, b) => a.price - b.price);
  
  return rates;
};

// Mock function to get shipping rates
export const getShippingRates = (packageDetails: PackageDetails): Promise<ShippingRatesResponse> => {
  console.log('getShippingRates called with:', packageDetails);
  
  // Return a promise that resolves after a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const rates = generateMockRates(packageDetails);
        console.log('Generated rates:', rates);
        
        resolve({
          success: true,
          rates
        });
      } catch (error) {
        console.error('Error generating rates:', error);
        resolve({
          success: false,
          rates: [],
          errors: ['Failed to fetch shipping rates. Please try again.']
        });
      }
    }, 1500); // 1.5 second delay to simulate API call
  });
};

// Export carrier data for UI
export const getCarriers = () => carriers;