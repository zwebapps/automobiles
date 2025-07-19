export interface Car {
    id: number;
    name: string;
    price: string;
    image: string;
    year: number;
    model: string;
    mileage: number;
    description: string;
    galleryImage1: string;
    galleryImage2: string;
    galleryImage3: string;
    galleryImage4: string;
    color: string;
}

export const Cars = [
  {
    id: 1,
    name: "Tesla Model S",
    make: "Tesla",
    model: "S",
    price: 79990,
    image: "/p-3.jpeg",
    description: {
      summary: "A luxury electric sedan with long range and autopilot.",
      features: ["Autopilot", "Long Range", "Luxury Interior"]
    },
    color: "#c43e3e",
    year: 2019,
    mileage: 20225,
    galleryImages: ["/p-3.jpeg", "/p-2.jpeg", "/p-1.jpeg"]
  },
  {
    id: 2,
    name: "BMW M3",
    make: "BMW",
    model: "M3",
    price: 68900,
    image: "/sr4.jpg",
    description: {
      summary: "A high-performance sports sedan with a turbocharged engine.",
      features: ["Turbocharged", "Rear-Wheel Drive", "Sport Suspension"]
    },
    color: "#1a1a1a",
    year: 2021,
    mileage: 12000,
    galleryImages: ["/sr4.jpg", "/sr5.jpg", "/sr6.jpg"]
  },
  {
    id: 3,
    name: "Audi A6",
    make: "Audi",
    model: "A6",
    price: 55900,
    image: "/low-angle-white-modern-car-outdo.jpg",
    description: {
      summary: "A luxury sedan with advanced technology and comfort.",
      features: ["Quattro AWD", "Virtual Cockpit", "Leather Seats"]
    },
    color: "#ffffff",
    year: 2020,
    mileage: 18000,
    galleryImages: ["/low-angle-white-modern-car-outdo.jpg"]
  },
  {
    id: 4,
    name: "Mercedes-Benz C-Class",
    make: "Mercedes-Benz",
    model: "C300",
    price: 48900,
    image: "/koenigsegg-agera-rs.jpg",
    description: {
      summary: "A compact luxury sedan with premium features.",
      features: ["Panoramic Sunroof", "LED Headlights", "Heated Seats"]
    },
    color: "#2d2d2d",
    year: 2018,
    mileage: 35000,
    galleryImages: ["/koenigsegg-agera-rs.jpg"]
  },
  {
    id: 5,
    name: "Honda Civic",
    make: "Honda",
    model: "Civic",
    price: 23900,
    image: "/sr3.png",
    description: {
      summary: "A reliable and fuel-efficient compact car.",
      features: ["Eco Mode", "Backup Camera", "Bluetooth"]
    },
    color: "#3e65c4",
    year: 2022,
    mileage: 5000,
    galleryImages: ["/sr3.png", "/sr4.png"]
  },
  {
    id: 6,
    name: "Toyota Camry",
    make: "Toyota",
    model: "Camry",
    price: 25900,
    image: "/supercar-mountain-road.jpg",
    description: {
      summary: "A midsize sedan known for comfort and reliability.",
      features: ["Adaptive Cruise", "Lane Assist", "Touchscreen"]
    },
    color: "#b2b2b2",
    year: 2021,
    mileage: 8000,
    galleryImages: ["/supercar-mountain-road.jpg"]
  },
  {
    id: 7,
    name: "Ford Mustang",
    make: "Ford",
    model: "Mustang",
    price: 42900,
    image: "/moving-black-car-road.jpg",
    description: {
      summary: "A classic American muscle car with modern tech.",
      features: ["V8 Engine", "Convertible", "Apple CarPlay"]
    },
    color: "#ff0000",
    year: 2020,
    mileage: 15000,
    galleryImages: ["/moving-black-car-road.jpg"]
  },
  {
    id: 8,
    name: "Chevrolet Corvette",
    make: "Chevrolet",
    model: "Corvette",
    price: 59900,
    image: "/p-2.jpeg",
    description: {
      summary: "A high-performance sports car with iconic design.",
      features: ["Mid-Engine", "Removable Roof", "Performance Data Recorder"]
    },
    color: "#f5d142",
    year: 2021,
    mileage: 7000,
    galleryImages: ["/p-2.jpeg", "/p-1.jpeg"]
  },
  {
    id: 9,
    name: "Porsche 911",
    make: "Porsche",
    model: "911",
    price: 115000,
    image: "/sr5.jpg",
    description: {
      summary: "A legendary sports car with precision engineering.",
      features: ["Rear Engine", "PDK Transmission", "Sport Chrono"]
    },
    color: "#e0e0e0",
    year: 2019,
    mileage: 9000,
    galleryImages: ["/sr5.jpg", "/sr6.jpg"]
  },
  {
    id: 10,
    name: "Hyundai Sonata",
    make: "Hyundai",
    model: "Sonata",
    price: 21900,
    image: "/sr6.png",
    description: {
      summary: "A stylish and efficient midsize sedan.",
      features: ["Hybrid Option", "Smart Cruise", "Wireless Charging"]
    },
    color: "#4a90e2",
    year: 2022,
    mileage: 4000,
    galleryImages: ["/sr6.png"]
  }
];


export interface FormField {
    label: string;
    name: string;
    type: string;
    id: string;
    defaultValue?: string;
    placeholder: string;
    multiple?: boolean;
}