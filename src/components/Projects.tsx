import { projects } from "../data/cv";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";
import { LazyScreenshotGallery } from "./LazyScreenshotGallery";

export function Projects() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <SectionHeading label="03 — Projects" title="Featured work" />
        </ScrollReveal>

        <div className="space-y-16">
          {projects.map((project) => (
            <article
              key={project.id}
              className="rounded-2xl border border-border bg-surface-raised [content-visibility:auto]"
            >
              <div className="border-b border-border p-6 md:p-8">
                {project.badges && project.badges.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {project.badges.map((badge) => (
                      <span
                        key={badge}
                        className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-text">{project.name}</h3>
                    {project.role && (
                      <p className="mt-1 text-sm text-accent">{project.role}</p>
                    )}
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-opacity hover:opacity-90"
                  >
                    Visit Site →
                  </a>
                </div>

                <p className="max-w-3xl leading-relaxed text-text-muted">{project.description}</p>

                {project.highlights && project.highlights.length > 0 && (
                  <ul className="mt-6 space-y-2">
                    {project.highlights.map((highlight) => (
                      <li key={highlight.slice(0, 48)} className="flex gap-3 text-sm text-text-muted">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span className="leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-text-subtle"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 md:p-8">
                <LazyScreenshotGallery screenshots={project.screenshots} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
