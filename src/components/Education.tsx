import { education, certifications } from "../data/cv";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";

export function Education() {
  return (
    <section id="education" className="bg-surface-raised px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <SectionHeading label="05 — Education" title="Background & credentials" />
        </ScrollReveal>

        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="mb-6 text-lg font-semibold text-text">Education</h3>
            <div className="space-y-6">
              {education.map((item) => (
                <div
                  key={item.degree}
                  className="rounded-xl border border-border bg-surface p-6"
                >
                  <h4 className="font-medium text-text">{item.degree}</h4>
                  <p className="mt-1 text-sm text-text-muted">{item.institution}</p>
                  <p className="mt-2 font-mono text-xs text-accent">{item.status}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-semibold text-text">Certifications</h3>
            <ul className="space-y-4">
              {certifications.map((cert) => (
                <li
                  key={cert}
                  className="flex gap-3 rounded-xl border border-border bg-surface p-4 text-sm text-text-muted"
                >
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
