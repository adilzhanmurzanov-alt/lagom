// Catalog data — products are grouped by category slug.
// Images live in /public/<Cyrillic category name>/ and are resolved through
// `asset()` so they work under both the "/" and "/lagom/" base URLs.
import { asset } from "../utils/asset";

const sofas = [
  {
    id: "oslo",
    name: "Oslo",
    price: "189 900 ₽",
    image: asset("Диваны/10bd5dee10b5d2dc27cee89c292a19f8.jpg"),
  },
  {
    id: "bjorn",
    name: "Bjørn",
    price: "142 500 ₽",
    image: asset("Диваны/c0ff420fde9ce36cd6ab2a0f95c8ee77.jpg"),
  },
  {
    id: "svea",
    name: "Svea",
    price: "164 200 ₽",
    image: asset("Диваны/d1e4fb557f04c1d28041a92641e15095.jpg"),
  },
  {
    id: "fjord",
    name: "Fjord",
    price: "158 000 ₽",
    image: asset("Диваны/efe205247be200ba022b678120d53c5c.jpg"),
  },
];

const chairs = [
  {
    id: "ch20",
    name: "CH20 Elbow",
    price: "72 400 ₽",
    image: asset("Стулья/30a735664391532e2dad92b3bfe82fe4.jpg"),
  },
  {
    id: "minuetto",
    name: "Minuetto",
    price: "48 900 ₽",
    image: asset("Стулья/da920d5ea766bac06455d891528ac276.jpg"),
  },
  {
    id: "neva",
    name: "Neva",
    price: "54 200 ₽",
    image: asset("Стулья/fc041f36617d5a9ffee6b1f31888a0f4.jpg"),
  },
  {
    id: "gallery",
    name: "Gallery Set",
    price: "от 38 000 ₽",
    image: asset("Стулья/b4d245152c174b0f4fa2d94e36912288.jpg"),
  },
];

const tables = [
  {
    id: "saga",
    name: "Saga",
    price: "94 500 ₽",
    image: asset("Столы/e713b0ed0c13ef7fd43a10e1ab6e3bf5.jpg"),
  },
  {
    id: "valhalla",
    name: "Valhalla",
    price: "138 700 ₽",
    image: asset("Столы/f2fabd56641bd9c55efabf69d231110a.jpg"),
  },
  {
    id: "oak-bench",
    name: "Nord Bench",
    price: "112 000 ₽",
    image: asset("Столы/f44b1409777ac2d3782b7400cba2cdee.jpg"),
  },
];

const lamps = [
  {
    id: "arc",
    name: "Arc",
    price: "42 800 ₽",
    image: asset("Торшеры/2359f2b3aa1a229f6ca5d5107d653f79.jpg"),
  },
  {
    id: "scallop",
    name: "Scallop",
    price: "38 400 ₽",
    image: asset("Торшеры/a2fb483bf297d7deb839084687de8c1f.jpg"),
  },
  {
    id: "tripod",
    name: "Tripod",
    price: "28 900 ₽",
    image: asset("Торшеры/d937963c0e190ffc7d2840870d77e075.jpg"),
  },
];

const armchairs = [
  {
    id: "boucle",
    name: "Bouclé",
    price: "82 500 ₽",
    image: asset("Кресла/71ae9997d4110b85558737008ad74077.jpg"),
  },
  {
    id: "tub",
    name: "Tub",
    price: "76 200 ₽",
    image: asset("Кресла/f371a3c3d724f345d86c1b5027813ab3.jpg"),
  },
  {
    id: "oak-frame",
    name: "Oak Frame",
    price: "68 400 ₽",
    image: asset("Кресла/51517b439c0b17a6a8356eff4a9279d0.jpg"),
  },
];

// Duplicate each base list with unique ids/name suffixes so product grids
// are meaningfully scrollable (demo content only).
const PRICE_VARIANTS = [0, -3200, 4100, -1800, 2700, -4500];
const NAME_SUFFIX = ["", " II", " Nordic", " Classic", " Edition", " Pro"];

function expand(base, times = 4) {
  const out = [];
  for (let copy = 0; copy < times; copy++) {
    base.forEach((p, i) => {
      const basePriceNum = parseInt(
        String(p.price).replace(/[^\d]/g, ""),
        10
      );
      const delta = PRICE_VARIANTS[(copy + i) % PRICE_VARIANTS.length];
      const newPrice =
        (basePriceNum + delta).toLocaleString("ru-RU") + " ₽";
      out.push({
        ...p,
        id: copy === 0 ? p.id : `${p.id}-${copy + 1}`,
        name: p.name + NAME_SUFFIX[copy % NAME_SUFFIX.length],
        price: copy === 0 ? p.price : newPrice,
      });
    });
  }
  return out;
}

const sofasX = expand(sofas, 4);
const chairsX = expand(chairs, 4);
const tablesX = expand(tables, 5);
const lampsX = expand(lamps, 5);
const armchairsX = expand(armchairs, 5);

export const CATEGORIES = {
  sofas: { slug: "sofas", label: "Диваны", products: sofasX },
  chairs: { slug: "chairs", label: "Стулья", products: chairsX },
  tables: { slug: "tables", label: "Столы", products: tablesX },
  lamps: { slug: "lamps", label: "Торшеры", products: lampsX },
  armchairs: { slug: "armchairs", label: "Кресла", products: armchairsX },
  all: {
    slug: "all",
    label: "Вся коллекция",
    products: [...sofasX, ...chairsX, ...tablesX, ...lampsX, ...armchairsX],
  },
};
