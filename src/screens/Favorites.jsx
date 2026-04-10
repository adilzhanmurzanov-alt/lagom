import { useNavigate } from "react-router-dom";
import PhoneFrame from "../components/PhoneFrame";
import TopHeader from "../components/TopHeader";
import { useApp, getProductById } from "../context/AppContext";
import { HeartIcon, PlusIcon } from "../components/icons";

export default function Favorites() {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, addToCart } = useApp();

  const items = favorites.map(getProductById).filter(Boolean);

  return (
    <PhoneFrame>
      <TopHeader title="Избранное" onBack={() => navigate(-1)} />

      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div className="h-20 w-20 rounded-full ring-1 ring-ink/15 flex items-center justify-center text-ink/80">
            <HeartIcon size={24} />
          </div>
          <h2 className="font-display text-[24px] text-ink mt-5">
            Пока пусто
          </h2>
          <p className="text-[13px] text-ink/55 mt-2 max-w-[260px]">
            Отмечайте понравившиеся вещи сердечком — они появятся здесь.
          </p>
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="mt-6 h-12 px-6 rounded-full bg-ink text-cream-50 text-[13px] font-medium"
          >
            В каталог
          </button>
        </div>
      ) : (
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 pt-1 pb-8">
          <div className="grid grid-cols-2 gap-4">
            {items.map((p) => (
              <article
                key={p.id}
                onClick={() => navigate(`/product/${p.id}`)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] rounded-[22px] overflow-hidden bg-cream-50 ring-1 ring-ink/15 group-hover:ring-ink/35 transition-colors">
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(p.id);
                    }}
                    aria-label="Убрать из избранного"
                    className="absolute top-3 right-3 h-8 w-8 rounded-full bg-ink text-cream-50 flex items-center justify-center"
                  >
                    <HeartIcon size={15} filled />
                  </button>
                </div>
                <div className="mt-3 px-1 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="font-display text-[17px] leading-tight text-ink truncate">
                      {p.name}
                    </div>
                    <div className="text-[12px] text-ink/55 mt-0.5">
                      {p.price}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(p.id);
                    }}
                    aria-label="В корзину"
                    className="shrink-0 h-9 w-9 rounded-full bg-ink text-cream-50 flex items-center justify-center hover:scale-[1.05] active:scale-95 transition-transform"
                  >
                    <PlusIcon size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </PhoneFrame>
  );
}
