import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PhoneFrame from "../components/PhoneFrame";
import { useApp } from "../context/AppContext";
import { CheckIcon } from "../components/icons";

export default function Checkout() {
  const navigate = useNavigate();
  const { clearCart } = useApp();

  // Generate stable order number for this mount
  const orderNumber = useMemo(
    () => "LGM-" + (Math.floor(Math.random() * 90000) + 10000),
    []
  );

  // Clear cart on mount — treat as order placed
  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PhoneFrame>
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="h-24 w-24 rounded-full bg-ink text-cream-50 flex items-center justify-center">
          <CheckIcon size={34} />
        </div>
        <h1 className="font-display text-[32px] text-ink mt-6 tracking-tight">
          Заказ оформлен
        </h1>
        <p className="text-[14px] text-ink/60 mt-3 max-w-[300px] leading-[1.5]">
          Мы отправили подтверждение на вашу почту. Курьер свяжется с вами в
          ближайшие 24 часа.
        </p>

        <div className="mt-8 w-full max-w-[300px] rounded-[22px] ring-1 ring-ink/15 bg-cream-50 p-5 text-left">
          <div className="text-[10px] uppercase tracking-[0.2em] text-ink/50">
            Номер заказа
          </div>
          <div className="font-display text-[22px] text-ink mt-1">
            #{orderNumber}
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/home")}
          className="mt-8 h-14 px-8 rounded-full bg-ink text-cream-50 text-[13px] font-medium tracking-wide uppercase"
        >
          На главную
        </button>
      </div>
    </PhoneFrame>
  );
}
