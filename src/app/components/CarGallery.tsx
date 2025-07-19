"use client"
import React, { useEffect, useState, useRef } from "react";
import CarCard from "./CarCard";

interface Car {
  _id: string;
  name: string;
  description?: string;
  mainImage?: string;
  galleryImages?: string[];
  price?: string;
  color?: string;
}

const CarGallery = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [uploading, setUploading] = useState<string | null>(null);
  const fileInputs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  useEffect(() => {
    fetch("/api/car")
      .then((res) => res.json())
      .then(setCars);
  }, []);

  const handleUpload = async (carName: string) => {
    const fileInput = fileInputs.current[carName];
    if (!fileInput || !fileInput.files?.length) return;
    setUploading(carName);
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    await fetch(`/api/uploads/car/${carName}`, {
      method: "POST",
      body: formData,
    });
    // Refresh cars
    fetch("/api/car")
      .then((res) => res.json())
      .then(setCars);
    setUploading(null);
    fileInput.value = "";
  };

  return (
    <div className="row">
      {cars.map((car) => (
        <div key={car._id} className="mb-4 col-lg-4 col-md-6">
          <CarCard
            id={String(car._id)}
            name={car.name}
            price={car.price || "-"}
            image={car.mainImage || "/no-image.png"}
            description={car.description}
            color={car.color || "#ccc"}
          />
          <div className="mt-2">
            <input
              type="file"
              ref={(el) => {
                fileInputs.current[car.name] = el;
              }}
              style={{ display: "inline-block", marginRight: 8 }}
            />
            <button
              onClick={() => handleUpload(car.name)}
              disabled={uploading === car.name}
              className="btn btn-primary btn-sm"
            >
              {uploading === car.name ? "Uploading..." : "Upload Image"}
            </button>
          </div>
          {car.galleryImages && car.galleryImages.length > 0 && (
            <div className="mt-2">
              <strong>Gallery:</strong>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {car.galleryImages.map((img: string, idx: number) => (
                  <img
                    key={idx}
                    src={img || "/no-image.png"}
                    alt="Gallery"
                    style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 4 }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CarGallery; 