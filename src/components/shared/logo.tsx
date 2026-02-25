"use client";

import { cn } from "@/lib/cn";
import { forwardRef, SVGProps } from "react";

export interface LogoProps extends SVGProps<SVGSVGElement> {
  size?: number;
  showWordmark?: boolean;
  full?: boolean;
  copyOnClick?: boolean;
}

const FONT_SIZE = 46;
const TEXT_Y = 57;

export const Logo = forwardRef<SVGSVGElement, LogoProps>(
  (
    {
      className,
      size = 64,
      showWordmark,
      full,
      copyOnClick = false,
      ...svgProps
    },
    ref,
  ) => {
    const scaledWidth = size * 2.8; // tighter overall width

    return (
      <svg
        ref={ref}
        viewBox="0 0 180 64"
        width={scaledWidth}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("transition-colors select-none", className)}
        onClick={() => {
          if (copyOnClick)
            navigator.clipboard.writeText("Noel Francis D'costa");
        }}
        {...svgProps}
      >
        {/* fr */}
        <text
          x="0"
          y={TEXT_Y}
          fontFamily="'Geist', ui-sans-serif, system-ui, sans-serif"
          fontSize={FONT_SIZE}
          fontWeight={600}
          letterSpacing="-0.03em"
          className="fill-current"
        >
          fr
        </text>

        {/* Styled A (tightened left) */}
        <polygon
          points="50,4 66,60 58.5,60 50,14 41.5,60 34,60"
          className="fill-current"
        />
        <rect
          x="36"
          y="36"
          width="11"
          height="5"
          rx="2.5"
          className="fill-current"
        />
        <rect
          x="53"
          y="36"
          width="11"
          height="5"
          rx="2.5"
          className="fill-current"
        />

        {/* ncis (tightened closer) */}
        <text
          x="70"
          y={TEXT_Y}
          fontFamily="'Geist', ui-sans-serif, system-ui, sans-serif"
          fontSize={FONT_SIZE}
          fontWeight={600}
          letterSpacing="-0.03em"
          className="fill-current"
        >
          ncis
        </text>
      </svg>
    );
  },
);

Logo.displayName = "Logo";