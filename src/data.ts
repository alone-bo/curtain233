export const photos = {
  hero: "https://images.unsplash.com/photo-1704040686510-b747ff423ebb?auto=format&fit=crop&w=2400&q=88",
  showroom:
    "https://images.unsplash.com/photo-1757924461488-ef9ad0670978?auto=format&fit=crop&w=1800&q=86",
  workshop:
    "https://images.unsplash.com/photo-1718184021018-d2158af6b321?auto=format&fit=crop&w=1800&q=86",
  drapery:
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2200&q=88",
  shade:
    "https://images.unsplash.com/photo-1631048501813-f9eda5b0b527?auto=format&fit=crop&w=1600&q=86",
  pillows:
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=86",
  curtains:
    "https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=1800&q=86",
  daylight:
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=86",
  kitchen:
    "https://images.unsplash.com/photo-1631048501619-a27088a3bb70?auto=format&fit=crop&w=1600&q=86",
  fabricLinen:
    "https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?auto=format&fit=crop&w=1200&q=88",
  fabricOat:
    "https://images.unsplash.com/photo-1686806374120-e7ae3f19801d?auto=format&fit=crop&w=1200&q=88",
  fabricFawn:
    "https://images.unsplash.com/photo-1591195854242-8804547cdcab?auto=format&fit=crop&w=1200&q=88",
  fabricSlate:
    "https://images.unsplash.com/photo-1518019671582-55004f1bc9ab?auto=format&fit=crop&w=1200&q=88",
  fabricFold:
    "https://images.unsplash.com/photo-1518019671582-55004f1bc9ab?auto=format&fit=crop&w=1600&q=88",
  headquarters:
    "https://images.unsplash.com/photo-1481253127861-534498168948?auto=format&fit=crop&w=1800&q=86",
  customPillows:
    "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=1600&q=86",
  designGuidance:
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=86",
  smartPhone: "/smart-phone-hand.jpg",
  livingRoom:
    "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1800",
  diningRoom:
    "https://images.pexels.com/photos/6588591/pexels-photo-6588591.jpeg?auto=compress&cs=tinysrgb&w=1600",
  wovenShades:
    "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1600",
  romanRoom:
    "https://images.pexels.com/photos/10267719/pexels-photo-10267719.jpeg?auto=compress&cs=tinysrgb&w=1800",
};

export type DestinationGroup =
  | "Window Treatment"
  | "Product Innovations"
  | "Why Us"
  | "Collections"
  | "Company"
  | "Support"
  | "Journal";

export const menuGroups = {
  window: {
    label: "Window Treatment",
    columns: [
      {
        title: "Draperies & More",
        links: [
          "Draperies & Side Panels",
          "Soft Fabric Shades",
          "Valances",
          "Drapery Hardware",
        ],
      },
      {
        title: "Shades",
        links: [
          "Roller / Solar Shades",
          "Woven Wood Shades",
          "Cellular (Honeycomb) Shades",
          "Banded (Zebra) Shades",
          "Sheer Shades",
        ],
      },
      {
        title: "Blinds",
        links: ["Wood Blinds", "Faux Wood Blinds", "Aluminum Blinds"],
      },
    ],
  },
  innovations: {
    label: "Product Innovations",
    links: [
      {
        title: "Cordless",
        copy: "A cleaner silhouette and a safer window for every room.",
      },
      {
        title: "Motorization",
        copy: "Quiet, effortless light control from a remote, app, or voice.",
      },
      {
        title: "Operable Lining",
        copy: "Adjust privacy and insulation without changing the drape.",
      },
      {
        title: "No Drill",
        copy: "A considered installation option for select shades.",
      },
    ],
  },
  why: {
    label: "Why Us",
    links: [
      {
        title: "Beyond Custom",
        copy: "Made-to-measure details that go beyond the standard.",
      },
      {
        title: "Children Safe",
        copy: "Thoughtful cordless options designed with family in mind.",
      },
      {
        title: "Warranty",
        copy: "Confidence in the craftsmanship behind every order.",
      },
    ],
  },
} as const;

export const standaloneLinks = [
  "Become a Dealer",
  "How to Buy",
  "Fabric Gallery",
  "New Arrival",
] as const;

export const fabrics = [
  {
    name: "Washed Linen",
    color: "Natural",
    opacity: "Light filtering",
    image: photos.fabricLinen,
  },
  {
    name: "Brushed Cotton",
    color: "Oat",
    opacity: "Semi-sheer",
    image: photos.fabricOat,
  },
  {
    name: "Woven Texture",
    color: "Fawn",
    opacity: "Room darkening",
    image: photos.fabricFawn,
  },
  {
    name: "Soft Weave",
    color: "Slate",
    opacity: "Light filtering",
    image: photos.fabricSlate,
  },
  {
    name: "Tailored Linen",
    color: "Parchment",
    opacity: "Semi-opaque",
    image: photos.fabricOat,
  },
  {
    name: "Fine Weave",
    color: "Stone",
    opacity: "Room darkening",
    image: photos.fabricLinen,
  },
  {
    name: "Natural Canvas",
    color: "Almond",
    opacity: "Semi-sheer",
    image: photos.fabricFawn,
  },
  {
    name: "Evening Weave",
    color: "Blue grey",
    opacity: "Blackout",
    image: photos.fabricSlate,
  },
] as const;

export const newArrivals = [
  {
    title: "Custom Drapery",
    label: "Drapery",
    image: photos.drapery,
  },
  {
    title: "Soft Fabric Shades",
    label: "Shades",
    image: photos.shade,
  },
  {
    title: "Roman Shades",
    label: "Window Treatments",
    image: photos.daylight,
  },
  {
    title: "Pillows & Cushions",
    label: "Soft Furnishings",
    image: photos.pillows,
  },
] as const;

export const footerColumns = [
  {
    title: "SHOP",
    links: [
      "Custom Drapes",
      "Roman Shades",
      "Pillows",
      "Hardware",
      "Swatches",
      "Window Treatment",
      "Shades",
      "Blinds",
      "New Arrival",
    ],
  },
  {
    title: "COMPANY",
    links: [
      "About Us",
      "Showrooms",
      "Trade Program",
      "Craftsmanship",
      "Reviews",
      "Product Innovations",
      "Why Us",
      "Become a Dealer",
    ],
  },
  {
    title: "SUPPORT",
    links: [
      "How to Buy",
      "Measuring Guide",
      "Installation",
      "FAQs",
      "Contact Us",
      "Track Order",
      "Fabric Gallery",
      "Warranty",
    ],
  },
] as const;

export const faqs = [
  {
    question: "How do I measure my windows for custom drapes?",
    answer:
      "Measure the width of your window opening at the top, middle, and bottom, then take the drop from the rod location to your desired finished length. Our measuring guide walks you through each step, and a design consultant can review your numbers before you order.",
  },
  {
    question: "How long does production and shipping take?",
    answer:
      "Each window treatment is made to order. Standard production takes approximately 10 business days, with shipping time added based on your location. You will receive tracking details once your order leaves our workroom.",
  },
  {
    question: "Can I order fabric samples before purchasing?",
    answer:
      "Yes. We offer up to five complimentary fabric swatches so you can experience the color, weight, and texture of our materials in your own light before ordering.",
  },
  {
    question: "What is your return and guarantee policy?",
    answer:
      "Every made-to-measure order includes our 45-Day Perfect Fit Guarantee. If something is not right, our team will help correct it. Because custom products are made specifically for your windows, our return policy differs from stock items.",
  },
  {
    question: "Do you offer professional installation services?",
    answer:
      "Professional measuring and installation are available through our design team and showroom partners. Book a consultation and we will confirm the services available in your area.",
  },
];

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function routeFor(label: string, group?: DestinationGroup) {
  const isCollection =
    group === "Window Treatment" ||
    group === "Collections" ||
    group === "Product Innovations";
  return `/${isCollection ? "collections" : "pages"}/${slugify(label)}`;
}

export function searchableLinks() {
  const links: {
    label: string;
    group: DestinationGroup;
    image: string;
  }[] = [];

  menuGroups.window.columns.forEach((column) => {
    column.links.forEach((label) => {
      links.push({ label, group: "Window Treatment", image: photos.drapery });
    });
  });

  menuGroups.innovations.links.forEach((link) => {
    links.push({
      label: link.title,
      group: "Product Innovations",
      image: photos.curtains,
    });
  });

  menuGroups.why.links.forEach((link) => {
    links.push({ label: link.title, group: "Why Us", image: photos.workshop });
  });

  standaloneLinks.forEach((label) => {
    links.push({
      label,
      group: label === "Fabric Gallery" ? "Collections" : "Company",
      image: label === "Fabric Gallery" ? photos.fabricOat : photos.showroom,
    });
  });

  return links;
}
