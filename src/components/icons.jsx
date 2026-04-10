const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
};

export function BackIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} {...base}>
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

export function CartIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} {...base}>
      <circle cx="9" cy="20" r="1.2" />
      <circle cx="17" cy="20" r="1.2" />
      <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20.5 8H6" />
    </svg>
  );
}

export function HeartIcon({ size = 18, filled = false }) {
  return (
    <svg
      width={size}
      height={size}
      {...base}
      fill={filled ? "currentColor" : "none"}
    >
      <path d="M20.8 7.6a5 5 0 0 0-8.8-2.1A5 5 0 0 0 3.2 7.6c0 5 8.8 10.4 8.8 10.4s8.8-5.4 8.8-10.4Z" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} {...base}>
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  );
}

export function PlusIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} {...base}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

export function MinusIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} {...base}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function CheckIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} {...base} strokeWidth="1.8">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function SparkleIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} {...base}>
      <path d="M12 3l1.9 4.8L18.8 9.7l-4.9 1.9L12 16.5l-1.9-4.9L5.2 9.7l4.9-1.9z" />
      <path d="M19 14.5l0.7 1.8 1.8 0.7-1.8 0.7-0.7 1.8-0.7-1.8-1.8-0.7 1.8-0.7z" />
    </svg>
  );
}
