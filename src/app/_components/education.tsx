"use client";

import { Section } from "@/components/layouts/page";
import {
  TypographyH2,
  TypographyLead,
  TypographyMuted,
  SectionLabel,
} from "@/components/ui/typography";
import { DecorIcon } from "@/components/ui/border";

export function Education() {
  return (
    <Section aria-label="Education">
      <div className="flex items-center gap-3 mb-10" aria-hidden="true">
        <SectionLabel>Education</SectionLabel>
        <div className="flex-1 h-px bg-border/40" />
      </div>

      <div className="w-full max-w-5xl">
        <div className="relative p-0 border-0 lg:p-8 lg:border">
          <div className="hidden lg:block" aria-hidden="true">
            <DecorIcon position="top-left" />
            <DecorIcon position="top-right" />
            <DecorIcon position="bottom-left" />
            <DecorIcon position="bottom-right" />
          </div>

          <div className="relative z-10 space-y-4">
            <TypographyH2 className="border-none pb-0">
              Bachelor of Engineering — Electronics & Communication
            </TypographyH2>

            <TypographyLead>
              Focused on embedded systems, control systems, signal processing,
              and intelligent system design.
            </TypographyLead>

            <TypographyMuted>
              Built academic and real-time projects involving ESP32, IoT
              monitoring systems, adaptive headlamp control, and MATLAB-based
              simulations.
            </TypographyMuted>

            <TypographyMuted className="font-mono text-sm">
              2021 – 2025
            </TypographyMuted>
          </div>
        </div>
      </div>
    </Section>
  );
}