"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { siteConfig } from "@/lib/config";

const links = [
  { href: "/", label: "Home" },
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#about", label: "Capabilities" },
  { href: "/#tech-stack", label: "Tech Stack" },
  ...siteConfig.nav,
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const previousOverflowRef = useRef("");

  const closeMenu = () => {
    document.body.style.overflow = previousOverflowRef.current;
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    previousOverflowRef.current = previousOverflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  return (
    <header className="apple-header">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div className="mx-auto flex h-11 w-[calc(100%-40px)] max-w-[1120px] items-center justify-between gap-5 lg:gap-8">
        <Link href="/" className="shrink-0 text-[17px] font-semibold tracking-tight" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }} onClick={() => setOpen(false)} aria-label={`${siteConfig.name} — home`}>
          Noel Dcosta.
        </Link>
        <nav aria-label="Main navigation" className="hidden h-full flex-1 items-center justify-center gap-5 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} className="flex h-full items-center whitespace-nowrap text-[13px] font-[550] tracking-normal text-foreground/80 transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <button type="button" className="flex size-8 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-muted hover:text-foreground" aria-label="Toggle light and dark theme" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
                <Moon className="size-4 dark:hidden" aria-hidden="true" />
                <Sun className="hidden size-4 dark:block" aria-hidden="true" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="end" sideOffset={10} className="rounded-xl px-3.5 py-2 text-xs font-medium shadow-lg">
              Toggle light and dark theme
            </TooltipContent>
          </Tooltip>
          <button ref={menuButtonRef} type="button" className="flex size-10 items-center justify-center rounded-full hover:bg-muted lg:hidden" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
            {open ? <X size={20} strokeWidth={1.5} aria-hidden="true" /> : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d="M2 6.5h16M2 13.5h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" data-state="open" className="apple-mobile-nav lg:hidden" onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }}>
          <div className="flex flex-col items-start px-10 pb-12 pt-10 sm:px-[60px] sm:pt-12">
            {links.map((link, index) => (
              <Link key={link.href} href={link.href} style={{ animationDelay: `${80 + index * 35}ms` }} className="apple-mobile-menu-link py-2 text-[32px] font-semibold leading-[1.3] tracking-tight text-foreground/90 hover:text-foreground focus-visible:outline-offset-4" onClick={(event) => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                closeMenu();
                router.push(link.href);
              }}>{link.label}</Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}