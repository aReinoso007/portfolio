import { skillCategories } from "../data/cv";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <SectionHeading label="04 — Skills" title="Tech stack" />
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <div
              key={category.name}
              className="rounded-xl border border-border bg-surface-raised p-6 transition-colors hover:border-border-subtle"
            >
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-surface px-2.5 py-1 text-sm text-text-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
