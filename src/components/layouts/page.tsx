import { cn } from "@/lib/cn";
import { ComponentPropsWithRef, forwardRef } from "react";

export const PageLayout = forwardRef<HTMLDivElement, ComponentPropsWithRef<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("relative flex min-h-screen w-full flex-col", className)} {...props} />
  ),
);
PageLayout.displayName = "PageLayout";

export const Content = forwardRef<HTMLElement, ComponentPropsWithRef<"main">>(
  ({ className, ...props }, ref) => (
    <main ref={ref} className={cn("relative w-full flex-1", className)} {...props} />
  ),
);
Content.displayName = "Content";

interface SectionProps extends ComponentPropsWithRef<"section"> {
  variant?: "default" | "hero" | "nav";
  noTopDivider?: boolean;
  innerPadding?: string;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ variant = "default", noTopDivider: _noTopDivider, innerPadding, children, className, ...props }, ref) => (
    <section
      ref={ref}
      className={cn("apple-section legacy-section", variant === "hero" && "legacy-hero", className)}
      {...props}
    >
      <div className={cn("apple-container", innerPadding)}>
        <div className={cn("flex flex-col gap-8", variant === "nav" && "flex-row items-center justify-between")}>
          {children}
        </div>
      </div>
    </section>
  ),
);
Section.displayName = "Section";