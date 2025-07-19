"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CarData } from "@/app/api/controllers/CarController";
import { toast } from "react-toastify";

export default function CarListingsComponent() {
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

  const handleDeleteCar = async (carId: string) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/car/${carId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          toast.success("Car deleted successfully");
          // Refresh the cars list
          fetch("/api/car")
            .then((res) => res.json())
            .then((data) => setCars(data));
        } else {
          toast.error("Error deleting car");
        }
      } catch (error) {
        console.error("Error deleting car:", error);
        toast.error("Error deleting car");
      }
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="container">
      <h2 className="my-4">Car Listings</h2>
      {cars.length === 0 ? (
        <div className="text-center p-4">
          <p>No cars found. Add some cars using the &quot;Add Cars&quot; section.</p>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Image</th>
              <th>Action</th>
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
                <td>
                  <button
                    onClick={() => handleDeleteCar(car._id as string)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 