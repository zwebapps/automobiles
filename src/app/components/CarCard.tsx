'use client'
import React from 'react';
import { CCard, CCardBody, CCardTitle, CCardText } from '@coreui/react';
import Image from "next/image";
import { Col } from 'react-bootstrap';



const CarCard = ({ id, name, price, image, description, color } : { id: number, name: string, price: string, image: string, description: string, color: string }) => {
  console.log("CarCard", id, name, price, image, description, color)
  return (
    <Col lg={3} md={4} className="mb-4 m-0 auto">
        <CCard className="shadow mb-4 h-100" key={id}>
        <Image
            className="img-fluid"
            src={image}
            alt="logo"
            width={460}
            height={360}
            loader={() => '/api/uploads/'+image}
            priority
            />
        <CCardBody>
            <CCardTitle>{name}</CCardTitle>
            <CCardText>{description && description.substring(0,150)} </CCardText>
            <h5 className="text-primary mb-3">Price: {price} €</h5>
            <div className="d-flex align-items-center">
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
        </CCardBody>
        </CCard>
    </Col>
  );
};

export default CarCard;
