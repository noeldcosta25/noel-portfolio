"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const LOGO_SIZE = 60;

type Instance = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vr: number;
  el: HTMLDivElement | null;
};

function makeInstances(count: number): Instance[] {
  return Array.from({ length: count }).map(() => ({
    x: Math.random() * (window.innerWidth - LOGO_SIZE),
    y: Math.random() * (window.innerHeight - LOGO_SIZE),
    vx: (Math.random() < 0.5 ? 1 : -1) * (0.8 + Math.random() * 0.8),
    vy: (Math.random() < 0.5 ? 1 : -1) * (0.8 + Math.random() * 0.8),
    rotation: Math.random() * 360,
    vr: (Math.random() - 0.5) * 0.5,
    el: null,
  }));
}

interface BouncingLogosProps {
  count?: number;
  opacity?: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function BouncingLogos({
  count = 6,
  opacity = "opacity-25",
  containerRef,
}: BouncingLogosProps) {
  const instancesRef = useRef<Instance[]>([]);
  const rafRef = useRef<number>(0);

  if (instancesRef.current.length === 0 && typeof window !== "undefined") {
    instancesRef.current = makeInstances(count);
  }

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const tick = () => {
      const maxX = container.clientWidth - LOGO_SIZE;
      const maxY = container.clientHeight - LOGO_SIZE;

      for (const inst of instancesRef.current) {
        inst.x += inst.vx;
        inst.y += inst.vy;
        inst.rotation += inst.vr;

        if (inst.x <= 0) {
          inst.x = 0;
          inst.vx = Math.abs(inst.vx);
        }
        if (inst.x >= maxX) {
          inst.x = maxX;
          inst.vx = -Math.abs(inst.vx);
        }
        if (inst.y <= 0) {
          inst.y = 0;
          inst.vy = Math.abs(inst.vy);
        }
        if (inst.y >= maxY) {
          inst.y = maxY;
          inst.vy = -Math.abs(inst.vy);
        }

        if (inst.el) {
          inst.el.style.transform = `translate3d(${inst.x}px, ${inst.y}px, 0) rotate(${inst.rotation}deg)`;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [containerRef]);

  return (
    <div role="presentation" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            const inst = instancesRef.current[i];
            if (!inst) return;
            inst.el = el;
          }}
          className={`pointer-events-none absolute ${opacity}`}
          style={{ willChange: "transform", top: 0, left: 0 }}
        >
          <Image
            src="logo.png" // 🔥 replace with your file name
            alt="Noel Logo"
            width={LOGO_SIZE}
            height={LOGO_SIZE}
            className=""
            priority={false}
          />
        </div>
      ))}
    </div>
  );
}
