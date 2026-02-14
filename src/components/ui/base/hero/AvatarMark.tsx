import React from "react";

const AvatarMark: React.FC<{ size?: number }> = ({ size = 34 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 96 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    focusable="false"
  >
    {/* tile */}
    <rect x="10" y="10" width="76" height="76" rx="20" fill="rgba(255,255,255,0.03)" />
    <rect x="10.5" y="10.5" width="75" height="75" rx="20" stroke="rgba(255,255,255,0.18)" />

    {/* Y */}
    <path
      d="M30 30l18 20 18-20"
      stroke="#7a5cff"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M48 50v18" stroke="#7a5cff" strokeWidth="8" strokeLinecap="round" />

    {/* O */}
    <circle cx="66" cy="66" r="10" stroke="rgba(231,234,241,0.95)" strokeWidth="6" />
  </svg>
);

export default AvatarMark;
