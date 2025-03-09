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
      let post = await res.json();
      post = post.map((p: DBCar) => JSON.parse(p.data)) as Car[];
      console.log("listing", post);
      setListing(post);
    });
  }, [type]);
  console.log("listing", listing);
  return (
    <CRow>
      {listing && listing.map((car: Car, index: number) => {        
        return (
          <CarCard
            key={index}
            id={index}
            name={car.vehicleName}
            price={car.price}
            image={getImageUrl(car.image)}
            description={car.description}
            color={car.vehicleColor}
          />
        )
      })} 
    </CRow>
  );
}
