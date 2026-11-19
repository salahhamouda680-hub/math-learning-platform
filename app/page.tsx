import Link from "next/link";
import { courseLabel, courses, subjectPath } from "../lib/catalog";

export default function Home() {
  return (
    <main className="shell py-8 sm:py-12">
      <section className="grid overflow-hidden rounded-3xl bg-mint md:grid-cols-[1.25fr_1fr]">
        <div className="px-6 py-10 sm:p-12">
          <h1 className="max-w-xl text-4xl leading-tight font-black sm:text-6xl">الرياضيات خطوة بخطوة</h1>
          <p className="mt-5 max-w-md leading-8 text-muted">تدرّب على أساسيات الرياضيات مع شروحات قصيرة وأمثلة محلولة وتمارين يمكنك التحقق من إجاباتها.</p>
          <Link className="button mt-7" href="/subjects">استكشف المواد <span aria-hidden="true">←</span></Link>
        </div>
        <div aria-hidden="true" className="relative mx-6 mb-6 grid min-h-40 place-items-center overflow-hidden rounded-2xl bg-[#124b3e] text-white md:m-5">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff45_1px,transparent_1px)] bg-[length:20px_20px]" />
          <div dir="ltr" className="relative -rotate-6 rounded-2xl border border-white/30 bg-[#124b3e] px-7 py-4 font-mono text-3xl font-bold text-[#c8f3c6] shadow-xl sm:text-4xl">½ + ½ = 1</div>
        </div>
      </section>
      <section aria-labelledby="available" className="mt-10 sm:mt-14">
        <h2 id="available" className="text-2xl font-black">المواد المتاحة</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {courses.map((course) => (
            <Link key={course.slug} href={subjectPath(course.slug)} className="panel flex items-center gap-4 hover:border-accent">
              <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center rounded-xl bg-mint text-xl font-bold text-accent">∑</span>
              <div>
                <h3 className="text-xl font-bold">{course.subject}</h3>
                <p className="mt-1 text-sm leading-6 text-muted">{courseLabel(course)}</p>
              </div>
              <span aria-hidden="true" className="ms-auto text-accent">←</span>
            </Link>
          ))}
        </div>
        <p className="notice mt-6">المحتوى تجريبي للتدرب على الأساسيات، ولا يمثل المنهج المصري الرسمي.</p>
      </section>
    </main>
  );
}
