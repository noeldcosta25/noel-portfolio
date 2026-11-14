import type { SVGProps } from "react";

export function EyLogo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 768 776"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Signature EY Yellow Beam */}
      <path
        d="M0 279 768 0v145Z"
        fill="#FFE600"
      />

      {/* EY Letter 'E' */}
      <path
        d="M6 390h223l50 90H124v62h132v83H124v61h195v90H6Z"
        fill="#161D23"
      />

      {/* EY Letter 'Y' */}
      <path
        d="M264 390h130l65 123 65-123h129L518 626v150H399V626Z"
        fill="#161D23"
      />
    </svg>
  );
}
