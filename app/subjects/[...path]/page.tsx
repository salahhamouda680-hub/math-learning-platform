import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GeometryLessonContent from "../geometry-lesson-content";
import { courseLabel, courses, subjectPath } from "../../../lib/catalog";

type PageProps = { params: Promise<{ path: string[] }> };

function resolvePath(path: string[]) {
  const [courseSlug, unitSlug, lessonSlug] = path;
  const course = courses.find(({ slug }) => slug === courseSlug);
  const unit = course?.units.find(({ slug }) => slug === unitSlug);
  const lesson = unit?.lessons.find(({ slug }) => slug === lessonSlug);

  if (!course || (unitSlug && !unit) || (lessonSlug && !lesson) || path.length > 3) {
    notFound();
  }

  return { course, unit, lesson };
}

export function generateStaticParams() {
  return courses.flatMap((course) => [
    { path: [course.slug] },
    ...course.units.flatMap((unit) => [
      { path: [course.slug, unit.slug] },
      ...unit.lessons.map((lesson) => ({ path: [course.slug, unit.slug, lesson.slug] })),
    ]),
  ]);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { course, unit, lesson } = resolvePath((await params).path);
  return { title: lesson?.title ?? unit?.title ?? course.subject };
}

export default async function CatalogPage({ params }: PageProps) {
  const { course, unit, lesson } = resolvePath((await params).path);

  const lessonIndex = unit?.lessons.findIndex((item) => item === lesson) ?? -1;

  return (
    <main className="shell min-h-[65vh] py-8 sm:py-12">
      <nav aria-label="مسار الصفحة" className="mb-6 flex flex-wrap gap-x-3 gap-y-2 text-sm font-bold text-accent">
        <Link href="/subjects" className="hover:underline">المواد الدراسية</Link>
        {unit && <Link href={subjectPath(course.slug)} className="hover:underline">← {course.subject}</Link>}
        {unit && lesson && <Link href={subjectPath(course.slug, unit.slug)} className="hover:underline">← {unit.title}</Link>}
      </nav>
      <p className="mb-3 text-sm leading-6 text-muted">{course.subject} · {courseLabel(course)}</p>
      <h1 className="text-3xl leading-tight font-black sm:text-5xl">{lesson?.title ?? unit?.title ?? course.subject}</h1>
      <p className="notice mt-5">محتوى تدريبي تجريبي. لا يمثل المنهج المصري الرسمي.</p>

      {lesson && unit && "diagram" in lesson ? (
        <GeometryLessonContent
          lesson={lesson}
          unitPath={subjectPath(course.slug, unit.slug)}
          previous={unit.lessons[lessonIndex - 1]}
          next={unit.lessons[lessonIndex + 1]}
        />
      ) : lesson && "example" in lesson ? (
        <div className="mt-6 grid max-w-3xl gap-4">
          <section className="panel">
            <h2 className="text-xl font-bold">شرح الفكرة</h2>
            <p className="mt-3 leading-8">{lesson.explanation}</p>
            <h3 className="mt-5 font-bold">مثال محلول</h3>
            <p dir="ltr" className="mt-2 w-fit rounded-lg bg-mint px-4 py-2 font-mono text-lg font-bold text-accent">{lesson.example}</p>
          </section>
          <section className="panel">
            <h2 className="text-xl font-bold">جرّب بنفسك</h2>
            <p className="mt-3 leading-8">{lesson.question}</p>
            <details className="mt-4 rounded-xl bg-paper px-4 py-3">
              <summary className="cursor-pointer font-bold text-accent">عرض الإجابة</summary>
              <p className="mt-3 leading-8">{lesson.answer}</p>
            </details>
          </section>
        </div>
      ) : (
        <section className="mt-7" aria-labelledby="catalog-heading">
          <h2 id="catalog-heading" className="text-2xl font-bold">{unit ? "الدروس التجريبية" : "الوحدات التجريبية"}</h2>
          {unit && <p className="mt-2 leading-7 text-muted">{unit.description}</p>}
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {(unit?.lessons ?? course.units).map((item) => (
              <li key={item.slug}>
                <Link href={unit ? subjectPath(course.slug, unit.slug, item.slug) : subjectPath(course.slug, item.slug)} className="panel block h-full hover:border-accent">
                  {"symbol" in item && <span aria-hidden="true" dir="ltr" className="mb-3 inline-block rounded-lg bg-mint px-3 py-1 font-bold text-accent">{item.symbol}</span>}
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 leading-7 text-muted">{item.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
