// Shared catalog data. All images come from Unsplash (direct CDN).
const u = (id, w = 600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=85&auto=format&fit=crop`;

export const newArrivals = [
  {
    id: "leatherette-sofa",
    name: "Диван «Leatherette»",
    price: "15 180 ₽",
    image: u("1555041469-a586c61ea9bc"),
    tag: "Диваны",
  },
  {
    id: "ork-armchair",
    name: "Кресло «Ork»",
    price: "15 180 ₽",
    image: u("1567538096630-e0c55bd6374c"),
    tag: "Кресла",
  },
  {
    id: "haines-chair",
    name: "Кресло «Haines»",
    price: "22 220 ₽",
    image: u("1519947486511-46149fa0a254"),
    tag: "Кресла",
  },
  {
    id: "dorothy-table",
    name: "Столик «Dorothy»",
    price: "8 390 ₽",
    image: u("1493663284031-b7e3aefcae8e"),
    tag: "Столы",
  },
];

export const recentlyViewed = [
  {
    id: "royal-palm-sofa",
    name: "Диван «Royal Palm»",
    price: "15 180 ₽",
    image: u("1540574163026-643ea20ade25", 200),
  },
  {
    id: "curve-minimalist",
    name: "Кресло «Curve»",
    price: "12 016 ₽",
    image: u("1506439773649-6e0eb8cfb237", 200),
  },
];

export const categories = [
  { id: "all", label: "Все" },
  { id: "chair", label: "Кресла" },
  { id: "sofa", label: "Диваны" },
  { id: "table", label: "Столы" },
  { id: "lamp", label: "Лампы" },
];
