import { personalInfo, languages } from "../data/cv";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <SectionHeading label="01 — About" title="Who I am" />
        </ScrollReveal>

        <div className="grid gap-12 md:grid-cols-3">
          <div className="md:col-span-2">
            <ScrollReveal>
              <p className="text-lg leading-relaxed text-text-muted">{personalInfo.about}</p>
            </ScrollReveal>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-surface-raised p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-subtle">
                Languages
              </h3>
              <ul className="space-y-3">
                {languages.map((lang) => (
                  <li key={lang.name} className="flex items-center justify-between">
                    <span className="text-text">{lang.name}</span>
                    <span className="text-sm text-text-muted">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-surface-raised p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-subtle">
                Location
              </h3>
              <p className="text-text-muted">{personalInfo.location}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
