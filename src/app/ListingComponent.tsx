"use client";
import { useState, useEffect } from "react";
import CarCard from "./components/CarCard";
import { getImageUrl } from "./components/commonUtils";
import { CRow } from "@coreui/react";

export interface DBCar {
    id: number;
    name: string;
    data: string;
}

interface Car {
    _id: string;
    vehicleName: string;
    price: string;
    image: string;
    description: string;
    vehicleColor: string;
  }

export default function ListingComponent({ type = "listing"}: { type: string; }) {
  const [listing, setListing] = useState<Car[] >();
  useEffect(() => {
    fetch(`/api/post/${type}`, {
      method: "GET",
    }).then(async (res) => {
      const post = await res.json();
      console.log("listing Component", post);
      const listingPost = post.map((p: DBCar) => JSON.parse(p.data)) as Car[];      
      setListing(listingPost);
    });
  }, [type]);
  console.log("listing", listing);
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
          {listing && listing.map((car: Car, index: number) => {        
            return (
              <CarCard
                key={index}
                id={index}
                name={car.vehicleName}
                price={car.price}
                image={getImageUrl(car.image)}
                description={car.description}
                color={car.vehicleColor ? car.vehicleColor : "#000000"}
              />
            )
          })} 
        </CRow>
    </section>
  );
}
