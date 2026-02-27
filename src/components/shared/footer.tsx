import Image from "next/image";
import { NowPlaying } from "@/components/shared/now-playing";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { DecorIcon, FullWidthDivider } from "@/components/ui/border";
import { Button } from "@/components/ui/button";
import { TypographyMuted, TypographySmall } from "@/components/ui/typography";
import { siteConfig } from "@/lib/config";
import Link from "next/link";
import { type ReactNode } from "react";
import {
  IconBrandGithubFilled,
  IconBrandLinkedinFilled,
  IconBrandDiscordFilled,
} from "@tabler/icons-react";

const platformIcons: Record<
  (typeof siteConfig.social)[number]["platform"],
  ReactNode
> = {
  github: <IconBrandGithubFilled aria-hidden="true" />,
  linkedin: <IconBrandLinkedinFilled aria-hidden="true" />,
  discord: <IconBrandDiscordFilled aria-hidden="true" />,
};

const footerNav = [...siteConfig.nav];

export function Footer() {
  return (
    <footer className="relative mt-auto" aria-label="Site footer">
      <div className="relative mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12 sm:px-8 lg:px-10 before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-border after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:w-px after:bg-border">
        <div aria-hidden="true">
          <DecorIcon position="top-left" />
          <DecorIcon position="top-right" />
          <FullWidthDivider position="top" />
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1fr_auto]">
          {/* Left Side */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              aria-label={`${siteConfig.name} — home`}
            >
              <img
                src="/logo.png"
                alt="Noel Logo"
                className="h-12 w-12 object-contain"
              />
            </Link>

            <TypographyMuted className="max-w-xs text-balance">
              {siteConfig.description}
            </TypographyMuted>

            {/* Social Icons */}
            <nav aria-label="Social links" className="flex gap-2">
              {siteConfig.social.map((item) => (
                <Button
                  key={item.label}
                  asChild
                  size="icon-sm"
                  variant="outline"
                >
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.label} (opens in new tab)`}
                  >
                    {platformIcons[item.platform]}
                  </a>
                </Button>
              ))}
            </nav>

            {/* 🎵 Now Playing */}
            <NowPlaying />
          </div>

          {/* Right Side */}
          <nav aria-label="Footer navigation" className="flex flex-col gap-2">
            <TypographyMuted
              className="uppercase tracking-widest font-mono mb-1"
              aria-hidden="true"
            >
              Pages
            </TypographyMuted>

            {footerNav.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-muted-foreground hover:text-foreground transition-colors w-max"
              >
                <TypographySmall>{label}</TypographySmall>
              </Link>
            ))}
          </nav>
        </div>

        <div aria-hidden="true">
          <FullWidthDivider position="bottom" />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TypographyMuted
            className="font-mono"
            aria-label={`© 2025 to ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.`}
          >
            &copy; 2025 - {new Date().getFullYear()} {siteConfig.name}. All
            rights reserved.
          </TypographyMuted>

          <ThemeToggle
            aria-label="Toggle theme"
            className="self-start sm:self-auto"
          />
        </div>
      </div>
    </footer>
  );
}
