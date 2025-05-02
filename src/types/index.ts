// Type definitions for the shipping rate comparison tool

// Package details interface
export interface PackageDetails {
  weight: number;
  length: number;
  width: number;
  height: number;
  originZip: string;
  destinationZip: string;
  isResidential: boolean;
  packageType: PackageType;
}

// Enum for package types
export enum PackageType {
  BOX = 'Box',
  ENVELOPE = 'Envelope',
  PAK = 'Pak',
  TUBE = 'Tube',
  CUSTOM = 'Custom'
}

// Shipping carrier interface
export interface Carrier {
  id: string;
  name: string;
  logo: string;
}

// Shipping method interface
export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  estimatedDeliveryDays: number;
}

// Shipping rate interface
export interface ShippingRate {
  carrierId: string;
  carrierName: string;
  methodId: string;
  methodName: string;
  price: number;
  currency: string;
  estimatedDeliveryDays: number;
  guaranteedDelivery: boolean;
  transitTime: string;
  serviceName: string;
}

// API response interface
export interface ShippingRatesResponse {
  success: boolean;
  rates: ShippingRate[];
  errors?: string[];
}