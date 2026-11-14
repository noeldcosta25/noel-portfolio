import { PdfViewer } from "@/components/ui/pdf-viewer";
import { JsonLd } from "@/components/shared/json-ld";
import { getResumeFilename } from "@/lib/resume";
import { buildMeta } from "@/lib/og";
import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = buildMeta({
  title: "Resume",
  pageTitle: "Professional Resume",
  description: `${siteConfig.name}'s resume — professional experience, projects, and technical expertise.`,
  path: "home / resume",
  canonicalPath: "/resume",
  type: "profile",
});

export default function ResumePage() {
  return (
    <>
      <JsonLd type="webpage" title="Resume" description={metadata.description ?? "Professional resume"} canonicalUrl={`${siteConfig.baseUrl}/resume`} />
      <section className="apple-section section-soft pb-16 text-center" aria-labelledby="resume-title">
        <div className="apple-container">
          <p className="apple-eyebrow">Experience &amp; expertise</p>
          <h1 id="resume-title" className="apple-heading">My resume.</h1>
          <p className="section-description mx-auto">A closer look at my experience, projects,<br className="hidden sm:block" /> and the skills behind my work.</p>
        </div>
      </section>
      <section className="apple-section" aria-label="Resume document">
        <div className="apple-container">
          <PdfViewer file="/api/resume" downloadHref="/api/resume/download" name={getResumeFilename()} />
        </div>
      </section>
    </>
  );
}