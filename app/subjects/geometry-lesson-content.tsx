import Link from "next/link";
import type { ReactNode } from "react";
import type { Lesson } from "../../lib/catalog";
import type { GeometryLesson } from "../../lib/geometry";

const levels = ["سهل", "متوسط", "متقدم"];

// Keep calculations and degree signs in their written order inside Arabic prose.
function withMathDirection(text: string) {
  const math = /([٠-٩]+°?(?:√[٠-٩]+|(?: [+=−×÷] [٠-٩]+°?)+)|[٠-٩]+°)/;
  return text.split(math).map((part, index) =>
    index % 2 === 0 ? part : <bdi key={index} dir="ltr">{part}</bdi>,
  );
}

function LessonSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="panel space-y-4 leading-8">
      <h2 className="text-xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

export default function GeometryLessonContent({
  lesson,
  unitPath,
  previous,
  next,
}: {
  lesson: GeometryLesson;
  unitPath: string;
  previous?: Lesson;
  next?: Lesson;
}) {
  const { diagram } = lesson;

  return (
    <article className="mt-6 grid max-w-3xl gap-4">
      <LessonSection title="أهداف الدرس">
        <ul className="list-disc space-y-1 ps-5">
          {lesson.objectives.map((objective) => <li key={objective}>{objective}</li>)}
        </ul>
      </LessonSection>
      <LessonSection title="مراجعة سريعة">
        <p>{withMathDirection(lesson.review)}</p>
      </LessonSection>
      <LessonSection title="شرح الدرس خطوة بخطوة">
        <figure className="rounded-xl bg-paper p-3 sm:p-4">
          <svg
            viewBox="0 0 300 182"
            role="img"
            aria-label={diagram.caption}
            className="mx-auto block h-auto w-full max-w-sm"
            style={{ direction: "ltr" }}
          >
            <path d={diagram.outline} fill="var(--color-mint)" stroke="var(--color-ink)" strokeWidth="2" strokeLinejoin="round" />
            <path d={diagram.marks} fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {diagram.exteriorArc && (
              <path d={diagram.exteriorArc} fill="none" className="stroke-amber-800" strokeWidth="3" strokeLinecap="round" />
            )}
            <g fill="var(--color-ink)" fontSize="17" fontWeight="bold" textAnchor="middle">
              {diagram.labels.map(([x, y, label]) => <text key={label} x={x} y={y}>{label}</text>)}
            </g>
          </svg>
          <figcaption className="mt-2 text-sm leading-7 text-muted">{diagram.caption}</figcaption>
        </figure>
        <ol className="list-decimal space-y-4 ps-5">
          {lesson.explanation.map(({ title, text, formula }) => (
            <li key={title}>
              <h3 className="font-bold">{title}</h3>
              <p>{withMathDirection(text)}</p>
              {formula && (
                <p dir="ltr" className="mt-2 w-fit rounded-lg bg-mint px-3 py-1 font-mono font-bold text-accent">{formula}</p>
              )}
            </li>
          ))}
        </ol>
      </LessonSection>
      <LessonSection title="أمثلة محلولة">
        {lesson.examples.map(({ question, steps }) => (
          <div key={question} className="rounded-xl bg-paper p-4">
            <h3 className="font-bold">{withMathDirection(question)}</h3>
            <ol className="mt-2 list-decimal space-y-1 ps-5">
              {steps.map((step) => <li key={step}>{withMathDirection(step)}</li>)}
            </ol>
          </div>
        ))}
      </LessonSection>
      <LessonSection title="أخطاء شائعة">
        <ul className="notice list-disc space-y-1 ps-8">
          {lesson.pitfalls.map((pitfall) => <li key={pitfall}>{withMathDirection(pitfall)}</li>)}
        </ul>
      </LessonSection>
      <LessonSection title="ملخص الدرس">
        <p>{withMathDirection(lesson.summary)}</p>
      </LessonSection>
      <LessonSection title="جرّب بنفسك">
        {lesson.exercises.map(([question, solution], index) => (
          <div key={question} className="rounded-xl bg-paper p-4">
            <h3 className="font-bold">{levels[index]}</h3>
            <p className="mt-1">{withMathDirection(question)}</p>
            <details className="group mt-2">
              <summary className="min-h-11 cursor-pointer py-1.5 font-bold text-accent">
                <span className="group-open:hidden">عرض الحل</span>
                <span className="hidden group-open:inline">إخفاء الحل</span>
                <span className="sr-only"> للتمرين {levels[index]}</span>
              </summary>
              <p className="mt-1">{withMathDirection(solution)}</p>
            </details>
          </div>
        ))}
      </LessonSection>
      <nav aria-label="التنقل بين دروس الهندسة" className="grid gap-3 sm:grid-cols-2">
        <Link className="panel block hover:border-accent" href={previous ? `${unitPath}/${previous.slug}` : unitPath}>
          <span className="block text-sm font-bold text-accent">{previous ? "الدرس السابق" : "العودة إلى الوحدة"}</span>
          <span className="mt-1 block font-bold">{previous?.title ?? "الهندسة"}</span>
        </Link>
        <Link className="panel block hover:border-accent" href={next ? `${unitPath}/${next.slug}` : unitPath}>
          <span className="block text-sm font-bold text-accent">{next ? "الدرس التالي" : "العودة إلى الوحدة"}</span>
          <span className="mt-1 block font-bold">{next?.title ?? "الهندسة"}</span>
        </Link>
      </nav>
    </article>
  );
}
