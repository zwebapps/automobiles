"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { CarData } from "@/app/api/controllers/CarController";
import Nav from "@/app/Nav";
import Footer from "@/app/Footer";
import { CButton, CContainer, CRow, CCol } from "@coreui/react";
import ContactUs from "../../components/ContactUs";

export default function CarDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [car, setCar] = useState<CarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<CarData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMainImage, setSelectedMainImage] = useState<string>("");
  const [showMainImagePopup, setShowMainImagePopup] = useState(false);
  const [popupImageIndex, setPopupImageIndex] = useState(0);
  const [showContactPopup, setShowContactPopup] = useState(false);

  useEffect(() => {
    if (params.name) {
      fetchCarDetails();
      fetchAllCars();
    }
  }, [params.name]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!showMainImagePopup) return;
      
      switch (event.key) {
        case 'ArrowLeft':
          navigatePopupImage('prev');
          break;
        case 'ArrowRight':
          navigatePopupImage('next');
          break;
        case 'Escape':
          closeMainImagePopup();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showMainImagePopup, popupImageIndex, car]);

  const fetchCarDetails = async () => {
    try {
      const response = await fetch(`/api/car/${params.name}`);
      if (response.ok) {
        const carData = await response.json();
        setCar(carData);
        setSelectedMainImage(carData.mainImage || "");
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

  const handleGalleryImageClick = (image: string) => {
    setSelectedMainImage(image);
  };

  const handleMainImageClick = () => {
    setShowMainImagePopup(true);
    setPopupImageIndex(0); // Start with main image
  };

  const closeMainImagePopup = () => {
    setShowMainImagePopup(false);
  };

  const navigatePopupImage = (direction: 'prev' | 'next') => {
    if (!car) return;
    
    const allImages = [car.mainImage, ...(car.galleryImages || [])].filter(Boolean);
    if (allImages.length === 0) return;
    
    let newIndex;
    if (direction === 'prev') {
      newIndex = popupImageIndex > 0 ? popupImageIndex - 1 : allImages.length - 1;
    } else {
      newIndex = popupImageIndex < allImages.length - 1 ? popupImageIndex + 1 : 0;
    }
    
    setPopupImageIndex(newIndex);
    setSelectedMainImage(allImages[newIndex] || "");
  };

  const getCurrentPopupImage = () => {
    if (!car) return "";
    const allImages = [car.mainImage, ...(car.galleryImages || [])].filter(Boolean);
    return allImages[popupImageIndex] || "";
  };

  const getPopupImageCount = () => {
    if (!car) return 0;
    return [car.mainImage, ...(car.galleryImages || [])].filter(Boolean).length;
  };

  const handleShare = async () => {
    if (!car) return;

    const shareData = {
      title: `${car.name} - ${car.model || 'Car'}`,
      text: `Check out this amazing ${car.name}${car.model ? ` ${car.model}` : ''} for ${formatPrice(car.price)}!`,
      url: window.location.href
    };

    // Try native sharing first (mobile devices)
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        console.log('Native sharing failed, falling back to clipboard');
      }
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(window.location.href);
      // Show success toast instead of alert
      showToast('Link copied to clipboard!', 'success');
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showToast('Link copied to clipboard!', 'success');
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    // Create toast element
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
      color: white;
      padding: 12px 20px;
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      font-size: 14px;
      max-width: 300px;
      word-wrap: break-word;
      transform: translateX(100%);
      transition: transform 0.3s ease-in-out;
    `;
    toast.textContent = message;
    
    // Add to page
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  };

  const shareToSocialMedia = (platform: string) => {
    if (!car) return;

    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this amazing ${car.name}${car.model ? ` ${car.model}` : ''} for ${formatPrice(car.price)}!`);

    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
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
                  <div 
                    style={{ 
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                    onClick={handleMainImageClick}
                  >
                    <Image
                      src={selectedMainImage || car.mainImage || "/no-image.svg"}
                      alt={car.name}
                      width={800}
                      height={400}
                      className="img-fluid rounded"
                      unoptimized
                      style={{ objectFit: "cover", width: "100%", height: "400px" }}
                    />
                    <div 
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}
                    >
                      Click to enlarge
                    </div>
                  </div>
                </div>

                {/* Gallery */}
                {car.galleryImages && car.galleryImages.length > 0 && (
                  <div className="mb-4">
                    <h4>Gallery</h4>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {/* Main Image Thumbnail */}
                      <div 
                        className="position-relative" 
                        style={{ 
                          height: '120px', 
                          width: '120px',
                          cursor: 'pointer',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: selectedMainImage === car.mainImage ? '2px solid #007bff' : '1px solid #dee2e6'
                        }}
                        onClick={() => handleGalleryImageClick(car.mainImage || "")}
                      >
                        <Image
                          src={car.mainImage || "/no-image.svg"}
                          alt={`${car.name} main image`}
                          width={120}
                          height={120}
                          className="img-fluid"
                          unoptimized
                          style={{ objectFit: "cover", width: "100%", height: "100%" }}
                        />
                      </div>
                      
                      {/* Gallery Images */}
                      {car.galleryImages.map((image, index) => (
                        <div 
                          key={index}
                          className="position-relative" 
                          style={{ 
                            height: '120px', 
                            width: '120px',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: selectedMainImage === image ? '2px solid #007bff' : '1px solid #dee2e6'
                          }}
                          onClick={() => handleGalleryImageClick(image)}
                        >
                          <Image
                            src={image}
                            alt={`${car.name} gallery ${index + 1}`}
                            width={120}
                            height={120}
                            className="img-fluid"
                            unoptimized
                            style={{ objectFit: "cover", width: "100%", height: "100%" }}
                          />
                        </div>
                      ))}
                    </div>
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
                <CButton 
                  color="primary" 
                  size="lg" 
                  className="w-100 mb-2"
                  onClick={() => setShowContactPopup(true)}
                >
                  Contact for Details
                </CButton>
                
                {/* Share Section */}
                <div className="text-center">
                  <small className="text-muted mb-2 d-block">Share this car:</small>
                  <div className="d-flex justify-content-center gap-2 mb-2">
                    <CButton
                      color="info"
                      size="sm"
                      onClick={() => shareToSocialMedia('facebook')}
                      style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                    >
                      <i className="fab fa-facebook-f"></i>
                    </CButton>
                    <CButton
                      color="info"
                      size="sm"
                      onClick={() => shareToSocialMedia('twitter')}
                      style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                    >
                      <i className="fab fa-twitter"></i>
                    </CButton>
                    <CButton
                      color="info"
                      size="sm"
                      onClick={() => shareToSocialMedia('whatsapp')}
                      style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                    >
                      <i className="fab fa-whatsapp"></i>
                    </CButton>
                    <CButton
                      color="info"
                      size="sm"
                      onClick={() => shareToSocialMedia('telegram')}
                      style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                    >
                      <i className="fab fa-telegram-plane"></i>
                    </CButton>
                  </div>
                  <CButton
                    color="outline-secondary"
                    size="sm"
                    onClick={handleShare}
                    className="w-100"
                  >
                    📋 Copy Link
                  </CButton>
                </div>
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

      {/* Main Image Full Screen Popup with Navigation */}
      {showMainImagePopup && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            cursor: 'pointer'
          }}
          onClick={closeMainImagePopup}
        >
          <div 
            style={{
              position: 'relative',
              maxWidth: '95%',
              maxHeight: '95%'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={getCurrentPopupImage()}
              alt={car.name}
              width={1200}
              height={800}
              className="img-fluid rounded"
              unoptimized
              style={{ 
                objectFit: "contain", 
                maxWidth: "100%", 
                maxHeight: "100%" 
              }}
            />
            
            {/* Close Button */}
            <CButton
              color="light"
              size="sm"
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: 10000
              }}
              onClick={closeMainImagePopup}
            >
              ✕
            </CButton>

            {/* Image Counter */}
            <div
              style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '4px',
                fontSize: '14px',
                zIndex: 10000
              }}
            >
              {popupImageIndex + 1} / {getPopupImageCount()}
            </div>

            {/* Navigation Arrows */}
            {getPopupImageCount() > 1 && (
              <>
                <CButton
                  color="light"
                  size="sm"
                  style={{
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10000,
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onClick={navigatePopupImage.bind(null, 'prev')}
                >
                  ←
                </CButton>
                <CButton
                  color="light"
                  size="sm"
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10000,
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onClick={navigatePopupImage.bind(null, 'next')}
                >
                  →
                </CButton>
              </>
            )}
          </div>
        </div>
      )}

      {/* Contact Popup Modal */}
      {showContactPopup && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: '20px'
          }}
          onClick={() => setShowContactPopup(false)}
        >
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div 
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 24px',
                borderBottom: '1px solid #e5e7eb',
                backgroundColor: '#f9fafb'
              }}
            >
              <h2 
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  margin: 0
                }}
              >
                Contact Us
              </h2>
              <button
                onClick={() => setShowContactPopup(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#6b7280',
                  padding: '4px',
                  borderRadius: '4px',
                  transition: 'color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#374151'}
                onMouseOut={(e) => e.currentTarget.style.color = '#6b7280'}
              >
                ✕
              </button>
            </div>
            
            {/* Modal Body */}
            <div style={{ padding: '24px' }}>
              <ContactUs type="contact" />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
} 