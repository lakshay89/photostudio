export const products = [
  {
    id: 1,
    name: "Portrait Acrylic Wall Photo",
    defaultImage: "/mockup/Portrait-Acrylic-Wall-Photo-min-500x500.jpg",
    images: [
      "/mockup/1-500x500.jpg",
      "/mockup/3-500x500.jpg",
      "/mockup/4-500x500.jpg",
    ],
    sizes: [
      { label: "Small", price: 30 },
      { label: "Medium", price: 50 },
      { label: "Large", price: 70 },
    ],
    orientation: "rectangle",
  },
  {
    id: 2,
    name: "Landscape Acrylic Wall Photo",
    defaultImage: "/mockup/Landscape-min-500x500.jpg",
    images: ["/mockup/l1.jpg", "/mockup/l2.jpg", "/mockup/l3.jpg"],
    sizes: [
      { label: "Small", price: 35 },
      { label: "Medium", price: 55 },
      { label: "Large", price: 75 },
    ],
    orientation: "rectangle",
  },
  {
    id: 3,
    name: "Circle Acrylic Wall Photo",
    defaultImage: "/mockup/1-min-1-500x500.jpg",
    images: [
      "/mockup/5-min-37-500x500.jpg",
      "/mockup/3-min-36-500x500.jpg",
      "/mockup/1-min-37-500x500.jpg",
    ],
    sizes: [
      { label: "Small", price: 40 },
      { label: "Medium", price: 60 },
      { label: "Large", price: 80 },
    ],
    orientation: "circle", // ✅ this activates circular crop in modal + slider
  },
  {
    id: 4,
    name: "Rounded Rect Portrait Acrylic Wall Photo",
    defaultImage: "/mockup/Rounded-Rect-Portrait-Acrylic-Wall-Photo-min-500x500.jpg",
    images: [
      "/mockup/2-min-53-500x500.jpg",
      "/mockup/4-min-53-500x500.jpg",
      "/mockup/5-min-54-500x500.jpg",
    ],
    sizes: [
      { label: "Small", price: 40 },
      { label: "Medium", price: 60 },
      { label: "Large", price: 80 },
    ],
    orientation: "rectangle-rounded", // ✅ this activates circular crop in modal + slider
  },
  {
    id: 5,
    name: "Rounded Rect Portrait Acrylic Wall Photo",
    defaultImage: "/mockup/Rounded-Rect-Landscape-Acrylic-Wall-Phot-min-500x500.jpg",
    images: [
      "/mockup/4-min-50-500x500.jpg",
      "/mockup/1-min-42-500x500.jpg",
      "/mockup/5-min-51-500x500.jpg",
    ],
    sizes: [
      { label: "Small", price: 40 },
      { label: "Medium", price: 60 },
      { label: "Large", price: 80 },
    ],
    orientation: "rectangle-rounded", // ✅ this activates circular crop in modal + slider
  },
  {
    id: 6,
    name: "Balloon Shape Acrylic Wall Photo",
    defaultImage: "/mockup/10-min-2-500x500.jpg",
    images: [
      "/mockup/1-min-36-500x500.jpg",
      "/mockup/2-min-35-500x500.jpg",
      "/mockup/3-min-35-500x500.jpg",
    ],
    sizes: [
      { label: "Small", price: 40 },
      { label: "Medium", price: 60 },
      { label: "Large", price: 80 },
    ],
    orientation: "rectangle-rounded", // ✅ this activates circular crop in modal + slider
  },
];
