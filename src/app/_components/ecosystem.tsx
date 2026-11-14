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

const tools = [
  { label: "Python", icon: IconBrandPython },
  { label: "Pandas", icon: IconChartBar },
  { label: "Scikit-learn", icon: IconCode },
  { label: "SQL", icon: IconDatabase },
  { label: "Power BI", icon: IconChartBar },
  { label: "Azure", icon: IconCloud },
  { label: "GitHub", icon: IconBrandGithub },
  { label: "VS Code", icon: IconBrandVscode },
];

export function Ecosystem() {
  return (
    <section
      id="tech-stack"
      className="apple-section"
      aria-labelledby="tech-stack-title"
    >
      <div className="apple-container">
        <p className="apple-eyebrow">Tools & technologies</p>
        <h2 id="tech-stack-title" className="apple-heading">
          Tech stack.
        </h2>
        <p className="section-description">
          The tools I use across data, AI, and cloud applications.
        </p>
        <ul
          aria-label="Tools and technologies"
          className="mt-10 grid grid-cols-2 gap-4 sm:mt-14 sm:gap-6 lg:grid-cols-4"
        >
          {tools.map(({ label, icon: Icon }) => (
            <li
              key={label}
              className="flex min-h-36 flex-col items-center justify-center gap-4 rounded-3xl bg-muted px-4 py-8 text-center transition-colors hover:bg-accent"
            >
              <Icon
                className="size-8 text-primary"
                stroke={1.5}
                aria-hidden="true"
              />
              <h3 className="text-sm font-semibold tracking-tight sm:text-base">
                {label}
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}