export default function PhoneFrame({ children, variant = "light" }) {
  const isDark = variant === "dark";
  const pageBg = isDark ? "bg-ink" : "bg-cream-50";
  const innerBg = isDark ? "bg-ink text-cream-50" : "bg-cream-50 text-ink";
  const frame = isDark
    ? "sm:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
    : "sm:ring-1 sm:ring-ink/15 sm:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.12)]";

  return (
    <div
      className={`min-h-[100svh] w-full ${pageBg} flex items-center justify-center p-0 sm:p-6`}
    >
      <div
        className={`relative w-full max-w-[440px] h-[100svh] sm:h-[860px] ${innerBg} sm:rounded-[44px] ${frame} overflow-hidden flex flex-col`}
      >
        {children}
      </div>
    </div>
  );
}
