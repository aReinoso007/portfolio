import { experiences } from "../data/cv";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="bg-surface-raised px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="02 — Experience" title="Where I've worked" />

        <div className="space-y-12">
          {experiences.map((job, index) => (
            <article
              key={job.company}
              className="group relative grid gap-6 border-l border-border pl-8 md:grid-cols-[200px_1fr]"
            >
              <div
                className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-surface-raised"
                aria-hidden="true"
              />

              <div>
                <p className="font-mono text-sm text-text-subtle">{job.period}</p>
              </div>

              <div>
                <div className="mb-4 flex flex-wrap items-baseline gap-3">
                  <h3 className="text-xl font-semibold text-text">{job.role}</h3>
                  <span className="text-accent">@ {job.company}</span>
                  {job.contract && (
                    <span className="rounded-full border border-border-subtle px-2 py-0.5 text-xs text-text-subtle">
                      Contract
                    </span>
                  )}
                </div>

                <ul className="mb-6 space-y-2">
                  {job.highlights.map((highlight) => (
                    <li
                      key={highlight.slice(0, 40)}
                      className="flex gap-3 text-text-muted"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {job.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-text-subtle transition-colors group-hover:border-border-subtle"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {index < experiences.length - 1 && (
                <div className="absolute -bottom-6 left-0 h-12 w-px bg-border md:hidden" />
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
