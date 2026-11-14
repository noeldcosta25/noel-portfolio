import { EyLogo } from "@/components/shared/ey-logo";

export function Experience() {
  return (
    <section id="experience" className="apple-section" aria-labelledby="experience-title">
      <div className="apple-container">
        <p className="apple-eyebrow">Experience</p>
        <h2 id="experience-title" className="apple-heading">Intelligence.<br /><span className="text-muted-foreground">Put to work.</span></h2>
        <article className="experience-card mt-10 sm:mt-14">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
            <div className="flex items-center gap-5">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white p-3 shadow-sm sm:size-20">
                <EyLogo className="block size-full" role="img" aria-label="EY logo" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">AI Engineer</h3>
                <p className="mt-1 text-base text-muted-foreground sm:text-lg">Ernst &amp; Young (EY)</p>
              </div>
            </div>
            <p className="flex items-center gap-2 text-sm text-muted-foreground"><span className="relative flex h-2 w-2 shrink-0" aria-hidden="true"><span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-green-500/40" /><span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" /></span><time dateTime="2026-04">April 2026</time> – Present</p>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Building full-stack AI applications for enterprise document intelligence — connecting intuitive interfaces, backend services, databases, and AI-powered workflows.
          </p>
          <ul className="experience-details mt-8 grid gap-6 md:grid-cols-3">
            <li><h4>End-to-end development</h4><p>Working across frontend interfaces, backend APIs, and database integration.</p></li>
            <li><h4>Agentic workflows</h4><p>Developing and integrating AI agents to support intelligent automation.</p></li>
            <li><h4>Prompt engineering</h4><p>Designing and refining prompts for document understanding and structured information extraction.</p></li>
          </ul>
        </article>
      </div>
    </section>
  );
}