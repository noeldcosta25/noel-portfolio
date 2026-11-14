import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { NowPlaying } from "@/components/shared/now-playing";
import { SocialLogo } from "@/components/shared/social-logo";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function Footer() {
  return (
    <footer className="apple-footer" aria-label="Site footer">
      <div className="apple-container">
        <div className="flex flex-col justify-between gap-8 border-b border-border pb-8 md:flex-row">
          <div>
            <Link href="/" className="text-xl font-semibold tracking-tight" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>{siteConfig.name}</Link>
            <p className="mt-2 text-sm font-medium text-muted-foreground">AI engineering. Thoughtfully built.</p>
            <div className="mt-4 max-w-full [&>div]:flex-wrap">
              <NowPlaying />
            </div>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
            {siteConfig.nav.map((link) => <Link className="apple-nav-link" key={link.href} href={link.href}>{link.label}</Link>)}
          </nav>
        </div>
        <div className="flex flex-col justify-between gap-4 pt-6 text-xs font-medium text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <nav aria-label="Social links" className="flex items-center gap-2">
            {siteConfig.social.map((link) => (
              <Tooltip key={link.label} delayDuration={200}>
                <TooltipTrigger asChild>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-background" aria-label={`${link.label} (opens in a new tab)`}>
                    <SocialLogo platform={link.platform} className="size-5" aria-hidden="true" focusable="false" />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={10} className="rounded-xl px-3.5 py-2 text-xs font-medium shadow-lg">
                  {link.label}
                </TooltipContent>
              </Tooltip>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}