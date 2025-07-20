"use client";
import { useState, useEffect } from "react";
import CarCard from "./components/CarCard";
import { CRow } from "@coreui/react";
import { CarData } from "./api/controllers/CarController";

export default function ListingComponent() {
  const [cars, setCars] = useState<CarData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/car")
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="cars">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-heading">Available Cars</h2>
              <div className="line-shape"></div>
            </div>
          </div>
        </div>
        <div className="text-center p-5">
          <p>Loading cars...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="cars">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="section-heading">Available Cars</h2>
            <div className="line-shape"></div>
          </div>
        </div>
      </div>
      <CRow className="p-5">
        {cars.length > 0 ? (
          cars.map((car, index) => (
            <CarCard
              key={car._id || index}
              id={String(car._id || index)}
              name={car.name}
              price={(car.price)?.toString() || "Contact for price"}
              image={car.mainImage || "/no-image.svg"}
              description={
                typeof car.description === "object" && car.description && 'summary' in car.description
                  ? (car.description as { summary: string }).summary
                  : String(car.description || '')
              }
              color={car.color || "#000000"}
            />
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No cars available at the moment.</p>
          </div>
        )}
      </CRow>
    </section>
  );
}
