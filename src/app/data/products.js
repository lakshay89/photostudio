export const products = [
  {
    id: 1,
    name: "Horizontal Portrait",
    image: "/images/horizontal.jpg",
    orientation: "horizontal",
    basePrice: 49.99,
    sizes: [
      { label: "8x6", price: 29.99 },
      { label: "12x8", price: 49.99 },
      { label: "16x12", price: 79.99 },
      { label: "20x16", price: 119.99 },
      { label: "24x18", price: 159.99 },
      { label: "30x20", price: 199.99 },
    ],
  },
  {
    id: 2,
    name: "Vertical Portrait",
    image: "/images/vertical.jpg",
    orientation: "vertical",
    basePrice: 49.99,
    sizes: [
      { label: "6x8", price: 29.99 },
      { label: "8x12", price: 49.99 },
      { label: "12x16", price: 79.99 },
      { label: "16x20", price: 119.99 },
    ],
  },
  {
    id: 3,
    name: "Circle Portrait",
    image: "/images/circle.jpg",
    orientation: "circle",
    basePrice: 59.99,
    sizes: [
      { label: "8x8", price: 39.99 },
      { label: "12x12", price: 69.99 },
      { label: "16x16", price: 99.99 },
    ],
  },
];
