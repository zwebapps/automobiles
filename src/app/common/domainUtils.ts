// Utility functions for domain-based branding
import React from 'react';

export interface BrandConfig {
  name: string;
  title: string;
  description: string;
}

// Brand configurations for different domains
const BRAND_CONFIGS: Record<string, BrandConfig> = {
  'mjcrros.pt': {
    name: 'MJ Crros',
    title: 'MJ Crros - Premium Auto Solutions',
    description: 'Premium auto solutions and luxury vehicles at MJ Crros. Discover our exclusive collection of high-end cars.'
  },
  'majesticjourney.pt': {
    name: 'Majestic Journey',
    title: 'Majestic Journey - Luxury Car Experience',
    description: 'Experience luxury like never before with Majestic Journey. Premium cars, exceptional service, unforgettable journeys.'
  }
};

// Default brand configuration
const DEFAULT_BRAND: BrandConfig = {
  name: 'Majestic Journey',
  title: 'Majestic Journey',
  description: 'Luxury car dealership offering premium vehicles and exceptional service'
};

/**
 * Get brand configuration based on current domain
 * @param host - The host/domain (optional, will use window.location.host if not provided)
 * @returns BrandConfig object with name, title, and description
 */
export function getBrandConfig(host?: string): BrandConfig {
  // If host is provided, use it; otherwise try to get from window (client-side)
  let currentHost = host;
  
  if (!currentHost && typeof window !== 'undefined') {
    currentHost = window.location.host;
  }
  
  // If still no host, return default
  if (!currentHost) {
    return DEFAULT_BRAND;
  }
  
  // Check if we have a specific config for this domain
  for (const [domain, config] of Object.entries(BRAND_CONFIGS)) {
    if (currentHost.includes(domain)) {
      return config;
    }
  }
  
  return DEFAULT_BRAND;
}

/**
 * Get just the brand name
 * @param host - The host/domain (optional)
 * @returns Brand name string
 */
export function getBrandName(host?: string): string {
  return getBrandConfig(host).name;
}

/**
 * Get just the brand title
 * @param host - The host/domain (optional)
 * @returns Brand title string
 */
export function getBrandTitle(host?: string): string {
  return getBrandConfig(host).title;
}

/**
 * Get just the brand description
 * @param host - The host/domain (optional)
 * @returns Brand description string
 */
export function getBrandDescription(host?: string): string {
  return getBrandConfig(host).description;
}

/**
 * React hook for brand configuration (client-side only)
 * @returns BrandConfig object
 */
export function useBrandConfig(): BrandConfig {
  const [brandConfig, setBrandConfig] = React.useState<BrandConfig>(DEFAULT_BRAND);
  
  React.useEffect(() => {
    setBrandConfig(getBrandConfig());
  }, []);
  
  return brandConfig;
} 