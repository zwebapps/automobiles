export interface Car {
    id: number;
    name: string;
    price: string;
    image: string;
    description: string;
    color: string;
}

export const Cars: Car[] = [
    {
      id: 1,
      name: "Tesla Model S",
      price: "$79,990",
      image: "/p-3.jpeg",
      description: "A luxury electric sedan with long range and autopilot.",
      color: '#c43e3e',
    },
    {
      id: 2,
      name: "Ford Mustang",
      price: "$55,000",
      image: "/p-3.jpeg",
      description: "A high-performance sports car with a classic design.",
      color: '#c43e3a',
    },
    {
      id: 3,
      name: "BMW M3",
      price: "$72,800",
      image: "/p-3.jpeg",
      description: "A stylish sports sedan with incredible power and handling.",
      color: '#c43e3b',
    },
    {
        id: 4,
        name: "BMW M3",
        price: "$72,800",
        image: "/p-3.jpeg",
        description: "A stylish sports sedan with incredible power and handling.",
        color: '#c43e3b',
    },
    {
        id: 5,
        name: "BMW M3",
        price: "$72,800",
        image: "/p-3.jpeg",
        description: "A stylish sports sedan with incredible power and handling.",
        color: '#c43e3b',
    },
    {
        id: 6,
        name: "BMW M3",
        price: "$72,800",
        image: "/p-3.jpeg",
        description: "A stylish sports sedan with incredible power and handling.",
        color: '#c43e3b',
    },
    {
        id: 7,
        name: "BMW M3",
        price: "$72,800",
        image: "/p-3.jpeg",
        description: "A stylish sports sedan with incredible power and handling.",
        color: '#c43e3b',
    },
    {
        id: 8,
        name: "BMW M3",
        price: "$72,800",
        image: "/p-3.jpeg",
        description: "A stylish sports sedan with incredible power and handling.",
        color: '#c43e3b',
    }
  ];


export interface FormField {
    label: string;
    name: string;
    type: string;
    id: string;
    defaultValue?: string;
    placeholder: string;
}