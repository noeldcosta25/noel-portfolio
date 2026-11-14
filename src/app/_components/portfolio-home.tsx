import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Braces, BrainCircuit, Database, Layers, MessageSquare, Sparkles, Activity, GraduationCap, Award } from "lucide-react";
import { projects, siteConfig } from "@/lib/config";
import { Experience } from "./experience";
import { Ecosystem } from "./ecosystem";

const capabilities = [
  { icon: Layers, title: "Full-stack development", description: "Thoughtful interfaces. Reliable APIs. Connected experiences.", tools: "Frontend · Backend · APIs" },
  { icon: BrainCircuit, title: "AI agents", description: "Connecting reasoning and tools to build intelligent workflows.", tools: "Agent workflows · Automation" },
  { icon: MessageSquare, title: "Prompt engineering", description: "Turning complex requirements into clear, purposeful prompts.", tools: "LLMs · Structured extraction" },
  { icon: Database, title: "Data & intelligence", description: "From structured data to practical machine learning applications.", tools: "Python · SQL · Pandas · Scikit-learn" },
];

const projectVisuals = [
  { icon: Activity, category: "Machine learning", label: "Data. With a human impact.", className: "visual-health" },
  { icon: MessageSquare, category: "Natural language processing", label: "Meaning beyond the words.", className: "visual-language" },
  { icon: Database, category: "Predictive analytics", label: "Patterns into perspective.", className: "visual-data" },
  { icon: BrainCircuit, category: "Generative AI", label: "Your documents. In conversation.", className: "visual-ai" },
];

export function PortfolioHome() {
  return (
    <>
      <section className="portfolio-hero" aria-labelledby="hero-title">
        <div className="apple-container text-center">
          <p className="apple-eyebrow">Hi, I’m</p>
          <h1 id="hero-title" className="hero-title">{siteConfig.name}</h1>
          <p className="mt-5 text-xl font-medium tracking-tight text-muted-foreground sm:text-3xl">AI Engineer at EY</p>
          <p className="hero-description">I build full-stack AI applications, working across frontend, backend, databases, AI agents, and prompt engineering.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <a href="#work" className="apple-button">Explore my work <ArrowRight size={17} aria-hidden="true" /></a>
            <Link href="/resume" className="apple-link">View resume <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
          <div className="hero-showcase mt-16 sm:mt-20">
            <div className="hero-orbit orbit-one" aria-hidden="true" />
            <div className="hero-orbit orbit-two" aria-hidden="true" />
            <div className="hero-chip chip-code" aria-hidden="true"><Braces size={24} /><span>Full-stack</span></div>
            <div className="hero-chip chip-ai" aria-hidden="true"><Sparkles size={24} /><span>Applied AI</span></div>
            <div className="portrait-frame">
              <Image src="/profile.avif" alt={siteConfig.name} width={360} height={400} priority className="hero-portrait" />
            </div>
            <div className="hero-status"><span className="size-2 rounded-full bg-green-600" aria-hidden="true" />Currently building at EY</div>
          </div>
        </div>
      </section>

      <Experience />

      <section id="work" className="apple-section section-soft" aria-labelledby="work-title">
        <div className="apple-container">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div><p className="apple-eyebrow">Selected work</p><h2 id="work-title" className="apple-heading">Ideas into<br />real-world applications.</h2></div>
            <a href={siteConfig.social[0].href} target="_blank" rel="noopener noreferrer" className="apple-link">More on GitHub <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
          <div className="project-grid mt-10 sm:mt-14">
            {projects.map((project, index) => {
              const visual = projectVisuals[index % projectVisuals.length];
              const Icon = visual.icon;
              return (
                <article key={project.title} className="project-card">
                  <div className={`project-visual ${visual.className}`} aria-hidden="true">
                    <div className="visual-ring ring-outer" /><div className="visual-ring ring-inner" />
                    <div className="project-symbol"><Icon strokeWidth={1.2} size={64} /></div>
                    <p>{visual.label}</p>
                  </div>
                  <div className="project-content">
                    <p className="project-category">{visual.category}</p>
                    <h3>{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <ul className="project-technologies" aria-label="Technologies">{project.highlights.map((tool) => <li key={tool}>{tool}</li>)}</ul>
                    <div className="mt-auto flex flex-wrap gap-6 pt-7">
                      {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="apple-link" aria-label={`Live demo of ${project.title} (opens in a new tab)`}>Live demo <ArrowUpRight size={16} aria-hidden="true" /></a>}
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="apple-link" aria-label={`Source code for ${project.title} (opens in a new tab)`}>View code <ArrowUpRight size={16} aria-hidden="true" /></a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="apple-section" aria-labelledby="capabilities-title">
        <div className="apple-container">
          <p className="apple-eyebrow">Capabilities</p>
          <h2 id="capabilities-title" className="apple-heading">Every layer.<br /><span className="text-muted-foreground">One connected vision.</span></h2>
          <p className="section-description">From the first interaction to the intelligence behind it,<br className="hidden sm:block" /> I work across the stack to bring ideas to life.</p>
          <div className="capability-grid mt-10 sm:mt-14">
            {capabilities.map(({ icon: Icon, title, description, tools }) => (
              <article className="capability-card" key={title}>
                <Icon className="capability-icon" size={32} strokeWidth={1.4} aria-hidden="true" />
                <h3>{title}</h3><p>{description}</p><p className="capability-tools">{tools}</p>
              </article>
            ))}
          </div>
          <div className="learning-strip mt-6">
            <Sparkles size={26} strokeWidth={1.5} className="shrink-0 text-primary" aria-hidden="true" />
            <div><h3 className="text-lg font-semibold tracking-tight">Always learning. Always building.</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">Currently exploring advanced ML deployment, MLOps &amp; model monitoring, and Azure AI services.</p></div>
          </div>
        </div>
      </section>

      <Ecosystem />

      <section className="apple-section section-soft" aria-labelledby="education-title">
        <div className="apple-container">
          <p className="apple-eyebrow">Foundations</p>
          <h2 id="education-title" className="apple-heading">A curious mind.<br />A strong foundation.</h2>
          <div className="foundation-grid mt-10 sm:mt-14">
            <article className="foundation-card">
              <GraduationCap size={32} strokeWidth={1.4} className="text-primary" aria-hidden="true" />
              <p className="mt-8 text-sm text-muted-foreground">2021 – 2025</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">Bachelor of Engineering</h3>
              <p className="mt-2 text-lg">Electronics &amp; Communication</p>
              <p className="mt-5 leading-relaxed text-muted-foreground">A foundation in embedded systems, signal processing, control systems, and intelligent system design.</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Academic projects spanning ESP32, IoT monitoring, adaptive headlamp control, and MATLAB simulations.</p>
            </article>
            <article className="foundation-card">
              <Award size={32} strokeWidth={1.4} className="text-primary" aria-hidden="true" />
              <p className="mt-8 text-sm text-muted-foreground">Continuous development</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">Learning beyond the classroom.</h3>
              <p className="mt-5 leading-relaxed text-muted-foreground">Exploring AI, data science, and analytics through certifications and virtual experience programs.</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Boston Institute of Analytics · Oracle · Deloitte · British Airways · Qualcomm</p>
              <Link href="/certifications" className="apple-link mt-7">Explore certifications <ArrowRight size={17} aria-hidden="true" /></Link>
            </article>
          </div>
        </div>
      </section>

      <section id="contact" className="apple-section contact-section" aria-labelledby="contact-title">
        <div className="apple-container text-center">
          <p className="apple-eyebrow">Let’s connect</p>
          <h2 id="contact-title" className="apple-heading">Great things start<br />with a conversation.</h2>
          <p className="section-description mx-auto">Have an idea, an opportunity, or just a question?<br className="hidden sm:block" /> I’d love to hear from you.</p>
          <a href={`mailto:${siteConfig.email}`} className="apple-button mt-8">Get in touch <ArrowUpRight size={17} aria-hidden="true" /></a>
          <a href={`mailto:${siteConfig.email}`} className="mt-5 block break-all text-sm text-muted-foreground hover:text-primary">{siteConfig.email}</a>
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {siteConfig.social.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="apple-link">{social.label} <ArrowUpRight size={15} aria-hidden="true" /></a>)}
          </div>
        </div>
      </section>
    </>
  );
}