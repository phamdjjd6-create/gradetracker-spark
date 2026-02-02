import React from "react";

interface FptLogoProps {
  className?: string;
  size?: number;
}

export const FptLogo: React.FC<FptLogoProps> = ({ className = "", size = 48 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main circle background */}
      <circle cx="50" cy="50" r="48" fill="url(#fptGradient)" />
      
      {/* FPT Text */}
      <text
        x="50"
        y="42"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize="24"
        fontWeight="800"
        fontFamily="Inter, sans-serif"
      >
        FPT
      </text>
      
      {/* University text */}
      <text
        x="50"
        y="62"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize="10"
        fontWeight="500"
        fontFamily="Inter, sans-serif"
        letterSpacing="1"
      >
        UNIVERSITY
      </text>
      
      {/* Decorative elements */}
      <circle cx="50" cy="50" r="46" stroke="white" strokeWidth="1" strokeOpacity="0.3" fill="none" />
      <circle cx="50" cy="50" r="42" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" fill="none" />
      
      <defs>
        <linearGradient id="fptGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="50%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#C2410C" />
        </linearGradient>
      </defs>
    </svg>
  );
};
