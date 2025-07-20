'use client'
import React from 'react';
import { CCard, CCardBody, CCardTitle, CCardText, CButton } from '@coreui/react';
import Image from "next/image";
import { Col } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

const CarCard = ({ id, name, price, image, description, color } : { id: string, name: string, price: string, image?: string, description?: string, color?: string }) => {
  const router = useRouter();

  const formatPrice = (price: string) => {
    const priceNumber = parseFloat(price);
    
    if (isNaN(priceNumber)) {
      return price; // Return original if not a valid number
    }
    
    // Format as currency with euro symbol
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(priceNumber);
  };

  const handleDetailsClick = () => {
    router.push(`/car/${encodeURIComponent(name)}`);
  };

  // Ensure we have a valid image source
  const imageSrc = image && image.trim() !== '' ? image : "/no-image.svg";

  return (
    <Col lg={3} md={4} className="mb-4 m-0 auto">
        <CCard className="shadow mb-4 h-100 d-flex flex-column" key={id}>
        <Image
            className="img-fluid"
            src={imageSrc}
            alt="Car Image"
            width={460}
            height={360}
            unoptimized
            priority
            />
        <CCardBody className="d-flex flex-column flex-grow-1">
            <CCardTitle className="h5 mb-2">{name}</CCardTitle>
            <CCardText className="flex-grow-1 mb-2">
              {description && (() => {
                // Strip HTML tags for preview
                const strippedText = description.replace(/<[^>]*>/g, '');
                // Show exactly 100 characters for uniform look
                const previewText = strippedText.substring(0, 100);
                return previewText + (strippedText.length > 100 ? '...' : '');
              })()}
            </CCardText>
            <h6 className="text-primary mb-2">Price: {formatPrice(price)}</h6>
            <div className="d-flex align-items-center mb-3">
            <span className="me-2 small">Color:</span>
            <div
                style={{
                  width: "16px",
                  height: "16px",
                  backgroundColor: `${color}`,
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              ></div>         
            </div>
            <div className="mt-auto">
              <CButton 
                color="outline-primary" 
                size="sm" 
                onClick={handleDetailsClick}
                className="w-100"
                style={{
                  fontSize: '0.875rem',
                  padding: '0.375rem 0.75rem',
                  fontWeight: '500'
                }}
              >
                <i className="fas fa-eye me-2"></i>
                View Details
              </CButton>
            </div>
        </CCardBody>
        </CCard>
    </Col>
  );
};

export default CarCard;
