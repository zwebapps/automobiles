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
        <CCard className="shadow mb-4 h-100" key={id}>
        <Image
            className="img-fluid"
            src={imageSrc}
            alt="Car Image"
            width={460}
            height={360}
            unoptimized
            priority
            />
        <CCardBody>
            <CCardTitle>{name}</CCardTitle>
            <CCardText>{description && description.substring(0,150)} </CCardText>
            <h5 className="text-primary mb-3">Price: {formatPrice(price)}</h5>
            <div className="d-flex align-items-center mb-3">
            <span className="me-2">Available Color:</span>
            <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: `${color}`,
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              ></div>         
            </div>
            <CButton 
              color="primary" 
              size="sm" 
              onClick={handleDetailsClick}
              className="w-100"
            >
              View Details
            </CButton>
        </CCardBody>
        </CCard>
    </Col>
  );
};

export default CarCard;
