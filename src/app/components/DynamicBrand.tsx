'use client';
import React from 'react';
import { getBrandName, getBrandTitle, getBrandDescription, BrandConfig } from '../common/domainUtils';

interface DynamicBrandProps {
  type?: 'name' | 'title' | 'description' | 'full';
  className?: string;
  as?: React.ElementType;
  host?: string;
}

export function DynamicBrand({ 
  type = 'name', 
  className = '', 
  as: Component = 'span',
  host 
}: DynamicBrandProps) {
  const getContent = () => {
    switch (type) {
      case 'name':
        return getBrandName(host);
      case 'title':
        return getBrandTitle(host);
      case 'description':
        return getBrandDescription(host);
      case 'full':
        return getBrandTitle(host);
      default:
        return getBrandName(host);
    }
  };

  return (
    <Component className={className}>
      {getContent()}
    </Component>
  );
}

// Convenience components for common use cases
export function BrandName({ className, host }: Omit<DynamicBrandProps, 'type'>) {
  return <DynamicBrand type="name" className={className} host={host} />;
}

export function BrandTitle({ className, host }: Omit<DynamicBrandProps, 'type'>) {
  return <DynamicBrand type="title" className={className} host={host} />;
}

export function BrandDescription({ className, host }: Omit<DynamicBrandProps, 'type'>) {
  return <DynamicBrand type="description" className={className} host={host} />;
}

// Hook for getting brand config in components
export function useBrand(host?: string): BrandConfig {
  const [brandConfig, setBrandConfig] = React.useState<BrandConfig>({
    name: getBrandName(host),
    title: getBrandTitle(host),
    description: getBrandDescription(host)
  });

  React.useEffect(() => {
    if (!host) {
      setBrandConfig({
        name: getBrandName(),
        title: getBrandTitle(),
        description: getBrandDescription()
      });
    }
  }, [host]);

  return brandConfig;
} 