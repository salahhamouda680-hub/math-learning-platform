import type { Metadata } from "next";
import Link from "next/link";
import { courseLabel, courses, subjectPath } from "../../lib/catalog";

export const metadata: Metadata = { title: "المواد الدراسية" };

export default function Subjects() {
  return (
    <main className="shell min-h-[65vh] py-10 sm:py-14">
      <h1 className="text-4xl font-black">المواد الدراسية</h1>
      <p className="notice mt-5">المواد المعروضة هنا للتجربة والتدرب على الأساسيات.</p>
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {courses.map((course) => (
          <li key={course.slug}>
            <Link href={subjectPath(course.slug)} className="panel block hover:border-accent">
              <h2 className="text-xl font-bold">{course.subject}</h2>
              <p className="mt-2 leading-7 text-muted">{courseLabel(course)}</p>
              <span className="mt-4 inline-block font-bold text-accent">عرض الوحدات ←</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
