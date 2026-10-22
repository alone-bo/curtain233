import { photos } from "./data";

export type FabricCategory = "Curtain" | "Fabric" | "Roman";

export type FabricSwatch = {
  id: string;
  code: string;
  colorName: string;
  collection: string;
  collectionId: string;
  material: string;
  weight: "Midweight" | "Heavyweight";
  certification: string;
  categories: FabricCategory[];
  image: string;
  tone: string;
  description: string;
};

type SwatchSeed = {
  code: string;
  colorName: string;
  tone: string;
  texture: string;
  description: string;
};

type CollectionSeed = {
  id: string;
  name: string;
  intro: string;
  material: string;
  weight: "Midweight" | "Heavyweight";
  certification: string;
  categories: FabricCategory[];
  swatches: SwatchSeed[];
};

const texture = {
  linen: photos.fabricLinen,
  oat: photos.fabricOat,
  fawn: photos.fabricFawn,
  slate: photos.fabricSlate,
  fold: photos.fabricFold,
};

const collectionSeeds: CollectionSeed[] = [
  {
    id: "linen-blend-liz",
    name: "Linen Blend-Liz",
    intro:
      "A softened linen blend with a fine, even weave. Liz brings an easy drape and a quietly tailored finish to both curtains and Roman shades.",
    material: "Linen blend",
    weight: "Midweight",
    certification: "OEKO-TEX® Certified",
    categories: ["Curtain", "Fabric", "Roman"],
    swatches: [
      {
        code: "1908-0",
        colorName: "Snow White",
        tone: "#f2eee5",
        texture: texture.linen,
        description: "A clean, warm white with the faintest linen slub.",
      },
      {
        code: "LZ-102",
        colorName: "Flax",
        tone: "#d8c6a7",
        texture: texture.oat,
        description: "Sun-washed flax that shifts softly from cream to sand.",
      },
      {
        code: "LZ-118",
        colorName: "Dune",
        tone: "#c6b49c",
        texture: texture.fawn,
        description: "A grounded neutral inspired by wind-smoothed sand.",
      },
      {
        code: "LZ-220",
        colorName: "Sage",
        tone: "#a9ad98",
        texture: texture.linen,
        description: "A muted herbal green with a natural, undyed character.",
      },
      {
        code: "LZ-311",
        colorName: "Fog",
        tone: "#b9bbb5",
        texture: texture.slate,
        description: "A soft silvered grey that borrows from morning light.",
      },
      {
        code: "LZ-405",
        colorName: "Clay",
        tone: "#b88e76",
        texture: texture.oat,
        description: "Warm earthen clay with a subtle rosy undertone.",
      },
      {
        code: "LZ-516",
        colorName: "Harbor",
        tone: "#667b83",
        texture: texture.fold,
        description: "A deep coastal blue-grey with a calm, tailored feel.",
      },
      {
        code: "LZ-604",
        colorName: "Ink",
        tone: "#343b3f",
        texture: texture.fold,
        description: "A soft near-black that reads rich rather than severe.",
      },
    ],
  },
  {
    id: "linen-jawara",
    name: "Linen-Jawara",
    intro:
      "A heavier, textural linen with an inviting hand. Jawara is made for generous panels, structured Roman folds and rooms that ask for warmth.",
    material: "100% Linen",
    weight: "Heavyweight",
    certification: "OEKO-TEX® Certified",
    categories: ["Curtain", "Roman"],
    swatches: [
      {
        code: "J401-1",
        colorName: "White",
        tone: "#f4f0e7",
        texture: texture.linen,
        description: "A luminous natural white with a tactile, lived-in weave.",
      },
      {
        code: "J401-2",
        colorName: "Parchment",
        tone: "#e7dcc7",
        texture: texture.oat,
        description: "A creamy parchment tone with gentle warmth.",
      },
      {
        code: "J402-3",
        colorName: "Oat",
        tone: "#d4c1a3",
        texture: texture.fawn,
        description: "A classic oat that pairs easily with wood and stone.",
      },
      {
        code: "J403-4",
        colorName: "Wheat",
        tone: "#c3a577",
        texture: texture.fawn,
        description: "Golden wheat with a dry, sunlit finish.",
      },
      {
        code: "J404-5",
        colorName: "Olive",
        tone: "#898b6d",
        texture: texture.linen,
        description: "An understated olive that deepens beautifully in shade.",
      },
      {
        code: "J405-6",
        colorName: "Sediment",
        tone: "#a7947d",
        texture: texture.fawn,
        description: "A layered grey-brown drawn from river stone.",
      },
      {
        code: "J406-7",
        colorName: "Terracotta",
        tone: "#b56f55",
        texture: texture.oat,
        description: "A mellow fired-clay red with a soft, dusty edge.",
      },
      {
        code: "J407-8",
        colorName: "Charcoal",
        tone: "#454747",
        texture: texture.slate,
        description: "A smoky charcoal with the texture still clearly visible.",
      },
    ],
  },
  {
    id: "ribbed-linen-nara",
    name: "Ribbed Linen-Nara",
    intro:
      "A fine rib adds quiet architecture to a soft linen ground. Nara is a considered choice for Roman shades and lighter drapery.",
    material: "Ribbed linen",
    weight: "Midweight",
    certification: "OEKO-TEX® Certified",
    categories: ["Fabric", "Roman"],
    swatches: [
      {
        code: "CN-01",
        colorName: "Pearl",
        tone: "#ece6dc",
        texture: texture.linen,
        description: "A pearlescent ivory with a fine, directional rib.",
      },
      {
        code: "CN-02",
        colorName: "Dove",
        tone: "#cfcdc6",
        texture: texture.slate,
        description: "A pale, feather-soft grey with cool undertones.",
      },
      {
        code: "CN-03",
        colorName: "Mist",
        tone: "#b9c2c5",
        texture: texture.slate,
        description: "An airy blue-grey that catches light along the rib.",
      },
      {
        code: "CN-04",
        colorName: "Reed",
        tone: "#c2b78e",
        texture: texture.oat,
        description: "A natural straw tone with a dry, grassy warmth.",
      },
      {
        code: "CN-05",
        colorName: "Moss",
        tone: "#7f8970",
        texture: texture.linen,
        description: "A shaded woodland green, softened with grey.",
      },
      {
        code: "CN-06",
        colorName: "Sienna",
        tone: "#a5664e",
        texture: texture.fawn,
        description: "An earthy sienna that brings warmth to neutral rooms.",
      },
      {
        code: "CN-07",
        colorName: "Cacao",
        tone: "#745b4c",
        texture: texture.fawn,
        description: "A deep cocoa brown with a subtle lustre.",
      },
      {
        code: "CN-08",
        colorName: "Midnight",
        tone: "#394353",
        texture: texture.fold,
        description: "A dense blue-black with a soft, dimensional surface.",
      },
    ],
  },
];

export const fabricSwatches: FabricSwatch[] = collectionSeeds.flatMap(
  (collection) =>
    collection.swatches.map((swatch) => ({
      id: `${collection.id}-${swatch.code.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      code: swatch.code,
      colorName: swatch.colorName,
      collection: collection.name,
      collectionId: collection.id,
      material: collection.material,
      weight: collection.weight,
      certification: collection.certification,
      categories: collection.categories,
      image: swatch.texture,
      tone: swatch.tone,
      description: swatch.description,
    })),
);

export const fabricCollections = collectionSeeds.map((collection) => ({
  id: collection.id,
  name: collection.name,
  intro: collection.intro,
  material: collection.material,
  weight: collection.weight,
  certification: collection.certification,
  categories: collection.categories,
  colorCount: collection.swatches.length,
  image: collection.swatches[0].texture,
  swatches: fabricSwatches.filter(
    (swatch) => swatch.collectionId === collection.id,
  ),
}));

export const fabricMaterials = Array.from(
  new Set(fabricSwatches.map((swatch) => swatch.material)),
);

export const fabricWeights = ["Midweight", "Heavyweight"] as const;

export const SWATCH_LIMIT = 5;

export const fabricBenefits = [
  "Enjoy Up To 5 Free Swatches",
  "Shipping from Only $8.99",
  "Lead Time: 3-5 Days",
];

export type DraperyStyleType =
  | "ripple"
  | "tailored"
  | "pinch"
  | "grommet"
  | "flat"
  | "goblet"
  | "euro"
  | "inverted"
  | "rod"
  | "tab"
  | "tie"
  | "pencil";

export type DraperyStyle = {
  id: string;
  name: string;
  type: DraperyStyleType;
  price: number;
  hardwareIncluded: boolean;
  motorizationAvailable: boolean;
  info: string;
  bestFor: string;
};

export const draperyStyles: DraperyStyle[] = [
  {
    id: "ripple-fold",
    name: "Ripple Fold Drapes",
    type: "ripple",
    price: 210,
    hardwareIncluded: true,
    motorizationAvailable: true,
    info: "A continuous, gently undulating fold with a modern, architectural rhythm. Ripple Fold works beautifully on wide windows and full-height openings.",
    bestFor: "Contemporary living rooms and wide window walls",
  },
  {
    id: "tailored-pleat",
    name: "Tailored Pleat Drapes",
    type: "tailored",
    price: 235,
    hardwareIncluded: true,
    motorizationAvailable: true,
    info: "Crisp, structured pleats with a clean face and a precisely controlled fall. A tailored choice that feels formal without feeling fussy.",
    bestFor: "Traditional rooms and tailored, layered interiors",
  },
  {
    id: "pinch-pleat",
    name: "Pinch Pleat Drapes",
    type: "pinch",
    price: 245,
    hardwareIncluded: false,
    motorizationAvailable: true,
    info: "Three-finger pinch pleats gather the fabric into elegant, consistent folds. A classic header with a refined, hand-finished character.",
    bestFor: "Bedrooms, dining rooms and classic interiors",
  },
  {
    id: "grommet",
    name: "Grommet Drapes",
    type: "grommet",
    price: 210,
    hardwareIncluded: false,
    motorizationAvailable: false,
    info: "Metal grommets create relaxed, even waves with an easy glide. A pared-back header that suits casual, light-filled rooms.",
    bestFor: "Casual living spaces and sliders",
  },
  {
    id: "flat-panel",
    name: "Flat Panel Drapes",
    type: "flat",
    price: 195,
    hardwareIncluded: true,
    motorizationAvailable: true,
    info: "A clean, flat panel with a quiet, architectural profile. Flat panels offer a minimal look and work especially well in pairs.",
    bestFor: "Minimal interiors and modern panel systems",
  },
  {
    id: "goblet",
    name: "Goblet Drapes",
    type: "goblet",
    price: 285,
    hardwareIncluded: false,
    motorizationAvailable: false,
    info: "Hand-formed goblet pleats create a sculptural, formal header. Each pleat opens gently into a full, generous fold.",
    bestFor: "Formal dining rooms and statement windows",
  },
  {
    id: "euro-pleat",
    name: "Euro Pleat Drapes",
    type: "euro",
    price: 260,
    hardwareIncluded: true,
    motorizationAvailable: true,
    info: "A tailored pleat tacked at the top for a clean, contemporary line. Euro pleats bring structure with a lighter visual weight.",
    bestFor: "Transitional rooms and full-height windows",
  },
  {
    id: "inverted-pleat",
    name: "Inverted Pleat Drapes",
    type: "inverted",
    price: 250,
    hardwareIncluded: false,
    motorizationAvailable: true,
    info: "A box pleat turned inward for a tailored, architectural face. Inverted pleats create a precise rhythm and a polished finish.",
    bestFor: "Modern traditional interiors and offices",
  },
  {
    id: "rod-pocket",
    name: "Rod Pocket Drapes",
    type: "rod",
    price: 190,
    hardwareIncluded: false,
    motorizationAvailable: false,
    info: "A simple sewn pocket conceals the rod for a soft, gathered header. An easy, unfussy treatment for relaxed rooms.",
    bestFor: "Casual bedrooms and soft, relaxed rooms",
  },
  {
    id: "tab-top",
    name: "Tab Top Drapes",
    type: "tab",
    price: 185,
    hardwareIncluded: false,
    motorizationAvailable: false,
    info: "Fabric tabs create an easy, handcrafted rhythm above the rod. The open header adds texture without feeling heavy.",
    bestFor: "Relaxed living spaces and textured interiors",
  },
  {
    id: "tie-top",
    name: "Tie Top Drapes",
    type: "tie",
    price: 195,
    hardwareIncluded: false,
    motorizationAvailable: false,
    info: "Soft fabric ties bring a relaxed, romantic detail to the header. Each tie can be adjusted for a naturally uneven, personal fall.",
    bestFor: "Bedrooms, sunrooms and soft, layered spaces",
  },
  {
    id: "pencil-pleat",
    name: "Pencil Pleat Drapes",
    type: "pencil",
    price: 230,
    hardwareIncluded: false,
    motorizationAvailable: true,
    info: "Fine, closely gathered pleats create a neat, compact header. Pencil pleats offer fullness with a quieter footprint.",
    bestFor: "Compact rooms and traditional settings",
  },
];

export type RomanStyle = {
  name: string;
  type:
    | "classic"
    | "relaxed"
    | "pleated"
    | "hobbled"
    | "knife"
    | "ribbed";
  description: string;
};

export const romanStyles: RomanStyle[] = [
  {
    name: "Classic Roman",
    type: "classic",
    description:
      "Even horizontal folds stack cleanly at the bottom for a precise, timeless finish.",
  },
  {
    name: "Relaxed Roman",
    type: "relaxed",
    description:
      "Soft, shallow folds create an easier silhouette with a gentle drape.",
  },
  {
    name: "Pleated London Shade",
    type: "pleated",
    description:
      "Tailored pleats add structure and a refined, custom-made rhythm.",
  },
  {
    name: "Hobbled Roman",
    type: "hobbled",
    description:
      "Generous, rounded folds bring volume, shadow and a traditional feel.",
  },
  {
    name: "Knife Pleat Shade",
    type: "knife",
    description:
      "Crisp knife pleats give the shade a clean, architectural surface.",
  },
  {
    name: "Ribbed Pleat Shade",
    type: "ribbed",
    description:
      "Fine vertical ribbing adds texture and a subtle tailored detail.",
  },
];
