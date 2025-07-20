"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { CarData } from "@/app/api/controllers/CarController";
import Nav from "@/app/Nav";
import Footer from "@/app/Footer";
import { CButton, CContainer, CRow, CCol } from "@coreui/react";

export default function CarDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [car, setCar] = useState<CarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<CarData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (params.name) {
      fetchCarDetails();
      fetchAllCars();
    }
  }, [params.name]);

  const fetchCarDetails = async () => {
    try {
      const response = await fetch(`/api/car/${params.name}`);
      if (response.ok) {
        const carData = await response.json();
        setCar(carData);
        setLoading(false);
      } else {
        console.error("Car not found");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching car details:", error);
      setLoading(false);
    }
  };

  const fetchAllCars = async () => {
    try {
      const response = await fetch("/api/car");
      if (response.ok) {
        const carsData = await response.json();
        setCars(carsData);
        const currentCarIndex = carsData.findIndex((c: CarData) => c.name === params.name);
        setCurrentIndex(currentCarIndex >= 0 ? currentCarIndex : 0);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const formatPrice = (price: number | undefined) => {
    if (!price) return "Contact for price";
    
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const navigateToCar = (direction: 'prev' | 'next') => {
    if (cars.length === 0) return;
    
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : cars.length - 1;
    } else {
      newIndex = currentIndex < cars.length - 1 ? currentIndex + 1 : 0;
    }
    
    const nextCar = cars[newIndex];
    if (nextCar && nextCar.name) {
      router.push(`/car/${encodeURIComponent(nextCar.name)}`);
    }
  };

  if (loading) {
    return (
      <div>
        <Nav />
        <div className="text-center p-5">
          <p>Loading car details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!car) {
    return (
      <div>
        <Nav />
        <div className="text-center p-5">
          <p>Car not found</p>
          <CButton color="primary" onClick={() => router.push('/')}>
            Back to Home
          </CButton>
        </div>
        <Footer />
      </div>
    );
  }

  const description = typeof car.description === "object" && car.description && 'summary' in car.description
    ? (car.description as { summary: string }).summary
    : String(car.description || '');

  return (
    <div>
      <Nav />
      
      {/* Navigation Buttons */}
      <CContainer className="mt-4">
        <CRow className="justify-content-between align-items-center mb-4">
          <CCol>
            <CButton 
              color="secondary" 
              onClick={() => router.push('/')}
              className="me-2"
            >
              ← Back to Cars
            </CButton>
          </CCol>
          <CCol className="text-end">
            <CButton 
              color="outline-primary" 
              onClick={() => navigateToCar('prev')}
              className="me-2"
              disabled={cars.length <= 1}
            >
              ← Previous
            </CButton>
            <CButton 
              color="outline-primary" 
              onClick={() => navigateToCar('next')}
              disabled={cars.length <= 1}
            >
              Next →
            </CButton>
          </CCol>
        </CRow>
      </CContainer>

      <CContainer>
        <CRow>
          {/* Main Image and Gallery */}
          <CCol lg={9} className="mb-4">
            <div className="card">
              <div className="card-body">
                {/* Main Image */}
                <div className="mb-4">
                  <Image
                    src={car.mainImage || "/no-image.svg"}
                    alt={car.name}
                    width={800}
                    height={400}
                    className="img-fluid rounded"
                    unoptimized
                    style={{ objectFit: "cover", width: "100%", height: "400px" }}
                  />
                </div>

                {/* Gallery */}
                {car.galleryImages && car.galleryImages.length > 0 && (
                  <div className="mb-4">
                    <h4>Gallery</h4>
                    <CRow>
                      {car.galleryImages.map((image, index) => (
                        <CCol key={index} xs={6} sm={4} md={3} className="mb-3">
                          <Image
                            src={image}
                            alt={`${car.name} gallery ${index + 1}`}
                            width={200}
                            height={150}
                            className="img-fluid rounded"
                            unoptimized
                            style={{ objectFit: "cover", width: "100%", height: "150px" }}
                          />
                        </CCol>
                      ))}
                    </CRow>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="d-flex justify-content-between align-items-center">
                  <CButton
                    color="secondary"
                    onClick={() => navigateToCar('prev')}
                    disabled={cars.length <= 1}
                  >
                    ← Previous
                  </CButton>
                  <CButton
                    color="primary"
                    onClick={() => router.push("/")}
                  >
                    Back to Listings
                  </CButton>
                  <CButton
                    color="secondary"
                    onClick={() => navigateToCar('next')}
                    disabled={cars.length <= 1}
                  >
                    Next →
                  </CButton>
                </div>
              </div>
            </div>
          </CCol>

          {/* Car Details */}
          <CCol lg={3} className="mb-4">
            <div className="card h-100 d-flex flex-column">
              <div className="card-body flex-grow-1">
                <h2 className="card-title" style={{ 
                  whiteSpace: 'nowrap', 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis',
                  fontSize: '1.5rem',
                  lineHeight: '1.2'
                }}>
                  {car.name}
                </h2>
                <h4 className="text-primary mb-3">{formatPrice(car.price)}</h4>
                
                <div className="mb-3">
                  <strong>Model:</strong> {car.model || 'N/A'}
                </div>
                
                <div className="mb-3">
                  <strong>Year:</strong> {car.year || 'N/A'}
                </div>
                
                <div className="mb-3">
                  <strong>Color:</strong> 
                  <div className="d-flex align-items-center mt-1">
                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        backgroundColor: car.color || "#000000",
                        borderRadius: "50%",
                        display: "inline-block",
                        marginRight: "10px"
                      }}
                    />
                    {car.color || 'N/A'}
                  </div>
                </div>
              </div>
              
              <div className="card-footer">
                <CButton color="primary" size="lg" className="w-100">
                  Contact for Details
                </CButton>
              </div>
            </div>
          </CCol>
        </CRow>

        {/* Car Description - Full Width */}
        {description && (
          <CRow className="mt-4">
            <CCol>
              <div className="card">
                <div className="card-body">
                  <h3>Description</h3>
                  <p className="lead">{description}</p>
                </div>
              </div>
            </CCol>
          </CRow>
        )}
      </CContainer>

      <Footer />
    </div>
  );
} 