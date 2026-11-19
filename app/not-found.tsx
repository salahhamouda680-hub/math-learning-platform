import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell min-h-[65vh] py-14">
      <h1 className="text-3xl font-black">الصفحة غير موجودة</h1>
      <Link className="button mt-6" href="/subjects">العودة إلى المواد الدراسية</Link>
    </main>
  );
}
