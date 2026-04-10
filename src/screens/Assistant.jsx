import { useNavigate } from "react-router-dom";
import PhoneFrame from "../components/PhoneFrame";
import TopHeader from "../components/TopHeader";
import ElasticScroll from "../components/ElasticScroll";
import { ArrowRightIcon, SparkleIcon } from "../components/icons";

const MESSAGES = [
  {
    role: "bot",
    text: "Добрый день! Я помогу подобрать мебель под ваш интерьер. Что вы ищете?",
  },
  {
    role: "user",
    text: "Нужен диван в гостиную, скандинавский стиль",
  },
  {
    role: "bot",
    text: "Отличный выбор. Какая площадь комнаты и сколько человек обычно сидит?",
  },
  {
    role: "user",
    text: "Комната 22 м², обычно 3–4 человека",
  },
  {
    role: "bot",
    text: "Посмотрите модели Oslo и Bjørn — обе рассчитаны на 3–4 места и отлично вписываются в спокойный скандинавский интерьер. Oslo шире, с шезлонгом; Bjørn компактнее.",
  },
];

const SUGGESTIONS = [
  "Подобрать стул к столу",
  "Что со скидкой?",
  "Доставка в мой город",
];

export default function Assistant() {
  const navigate = useNavigate();

  return (
    <PhoneFrame>
      <TopHeader
        title="ИИ-консультант"
        onBack={() => navigate(-1)}
        right={<SparkleIcon size={18} />}
      />

      <ElasticScroll className="flex-1 min-h-0 px-5 pt-2 pb-3">
      <div className="space-y-3">
        {MESSAGES.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={
                m.role === "user"
                  ? "max-w-[78%] px-4 py-3 text-[14px] leading-[1.45] bg-ink text-cream-50 rounded-[22px] rounded-br-md"
                  : "max-w-[78%] px-4 py-3 text-[14px] leading-[1.45] bg-cream-50 ring-1 ring-ink/15 text-ink rounded-[22px] rounded-bl-md"
              }
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>
      </ElasticScroll>

      {/* Suggestion chips */}
      <div className="shrink-0 flex gap-2 px-5 pb-3 overflow-x-auto no-scrollbar">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            className="shrink-0 px-4 h-9 rounded-full ring-1 ring-ink/15 text-[12px] text-ink/70 hover:ring-ink/35 transition-colors"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input bar */}
      <div className="shrink-0 px-5 pb-6">
        <div className="h-[54px] rounded-full ring-1 ring-ink/15 flex items-center px-5 gap-3">
          <input
            type="text"
            placeholder="Напишите сообщение…"
            className="flex-1 bg-transparent outline-none text-[14px] text-ink placeholder:text-ink/40"
          />
          <button
            type="button"
            aria-label="Отправить"
            className="h-10 w-10 rounded-full bg-ink text-cream-50 flex items-center justify-center active:scale-95 transition-transform"
          >
            <ArrowRightIcon size={16} />
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
