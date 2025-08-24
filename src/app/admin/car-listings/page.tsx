"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CarData } from "@/app/api/controllers/CarController";

export default function CarListings() {
  const [cars, setCars] = useState<CarData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/car")
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setLoading(false);
      });
  }, []);
  
  console.log(cars)

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2 className="my-4">Avialable Cars</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car, idx) => (
            <tr key={idx}>
              <td>{car.name}</td>
              <td>
                {typeof car.description === "object" && car.description && 'summary' in car.description
                  ? (car.description as { summary: string }).summary
                  : String(car.description || '')}
              </td>
              <td>
                <Image
                  src={car.mainImage || "/no-image.png"}
                  alt="Car"
                  width={120}
                  height={80}
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 