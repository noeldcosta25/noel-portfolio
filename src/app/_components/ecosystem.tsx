"use client";

import {
  IconBrandPython,
  IconBrandGithub,
  IconDatabase,
  IconCloud,
  IconChartBar,
  IconCode,
  IconBrandVscode,
} from "@tabler/icons-react";

import { Section } from "@/components/layouts/page";
import {
  TypographyH3,
  TypographyLead,
  TypographyMark,
  SectionLabel,
} from "@/components/ui/typography";
import { DecorIcon } from "@/components/ui/border";

export function Ecosystem() {
  return (
    <Section aria-label="Tech Stack">
      <h2 className="sr-only">Tech Stack</h2>

      <div className="flex items-center gap-3 mb-10" aria-hidden="true">
        <SectionLabel>Tech Stack</SectionLabel>
        <div className="flex-1 h-px bg-border/40" />
      </div>

      <div className="mb-12 max-w-3xl">
        <TypographyLead>
          I primarily work within the{" "}
          <TypographyMark>
            data, AI, and cloud ecosystem
          </TypographyMark>{" "}
          — building intelligent systems, analyzing data, and deploying scalable
          solutions.
        </TypographyLead>
      </div>

      <ul
        role="list"
        aria-label="Tools and technologies"
        className="w-full max-w-5xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {tools.map((item) => (
          <li
            key={item.label}
            className="group relative p-0 border-0 lg:p-6 lg:border flex flex-col items-center justify-center text-center transition-transform duration-300 hover:-translate-y-0.5"
          >
            <div className="hidden lg:block" aria-hidden="true">
              <DecorIcon position="top-left" />
              <DecorIcon position="top-right" />
              <DecorIcon position="bottom-left" />
              <DecorIcon position="bottom-right" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-3">
              <item.icon
                className="size-8 text-muted-foreground transition-colors duration-300 group-hover:text-foreground"
                stroke={1.5}
                aria-hidden="true"
              />
              <TypographyH3 className="text-sm font-medium">
                {item.label}
              </TypographyH3>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-12 max-w-2xl">
        <TypographyLead className="text-sm">
          I focus on practical, performance-driven solutions — combining data,
          automation, and cloud technologies to solve real-world problems.
        </TypographyLead>
      </div>
    </Section>
  );
}

const tools = [
  { label: "Python", icon: IconBrandPython },
  { label: "Pandas", icon: IconChartBar },
  { label: "Scikit-learn", icon: IconCode },
  { label: "SQL", icon: IconDatabase },
  { label: "Power BI", icon: IconChartBar },
  { label: "Azure (Foundational)", icon: IconCloud },
  { label: "GitHub", icon: IconBrandGithub },
  { label: "VS Code", icon: IconBrandVscode },
];