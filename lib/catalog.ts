export type Lesson = {
  slug: string;
  title: string;
  description: string;
  explanation: string;
  example: string;
  question: string;
  answer: string;
};

type Unit = {
  slug: string;
  title: string;
  description: string;
  symbol: string;
  lessons: Lesson[];
};

type Course = {
  slug: string;
  subject: string;
  grade: string;
  term: string;
  country: string;
  year: string;
  units: Unit[];
};

export const courses: Course[] = [
  {
    slug: "math-prep-2-eg-2026-term-1",
    subject: "الرياضيات",
    grade: "الصف الثاني الإعدادي",
    term: "الترم الأول",
    country: "مصر",
    year: "٢٠٢٦–٢٠٢٧",
    units: [
      {
        slug: "numbers",
        title: "الأعداد والعمليات",
        description: "تدرب على ترتيب الأعداد وجمعها وطرحها.",
        symbol: "− +",
        lessons: [
          {
            slug: "number-line",
            title: "خط الأعداد",
            description: "قارن بين الأعداد باستخدام موقعها على خط الأعداد.",
            explanation: "يزداد العدد كلما اتجهنا يمينًا على خط الأعداد. الصفر يفصل بين الأعداد السالبة على يساره والأعداد الموجبة على يمينه.",
            example: "−3 < 2",
            question: "أي العددين أكبر، سالب خمسة أم سالب اثنين؟",
            answer: "سالب اثنين أكبر، لأنه يقع إلى يمين سالب خمسة على خط الأعداد.",
          },
          {
            slug: "addition",
            title: "جمع الأعداد الموقّعة",
            description: "استخدم خط الأعداد لفهم الجمع.",
            explanation: "ابدأ من العدد الأول. عند إضافة عدد موجب تحرّك يمينًا، وعند إضافة عدد سالب تحرّك يسارًا.",
            example: "−2 + 5 = 3",
            question: "ابدأ من سالب واحد وأضف سالب ثلاثة. ما الناتج؟",
            answer: "سالب أربعة. تحرّك ثلاث خطوات يسارًا من سالب واحد.",
          },
        ],
      },
      {
        slug: "fractions",
        title: "فهم الكسور",
        description: "تعرّف على أجزاء الكل والكسور المتكافئة.",
        symbol: "½",
        lessons: [
          {
            slug: "equivalent-fractions",
            title: "الكسور المتكافئة",
            description: "تعرّف على طرق مختلفة لكتابة القيمة نفسها.",
            explanation: "عند ضرب بسط الكسر ومقامه في العدد نفسه، بشرط أن يكون غير صفر، تظل قيمة الكسر ثابتة.",
            example: "1/2 = 2/4 = 3/6",
            question: "ما الكسر الذي يكافئ ثلثًا واحدًا ومقامه تسعة؟",
            answer: "ثلاثة أتساع. نضرب البسط والمقام في ثلاثة.",
          },
        ],
      },
    ],
  },
];

export function subjectPath(...segments: string[]) {
  return ["/subjects", ...segments].join("/");
}

export function courseLabel(course: Course) {
  return [course.grade, course.term, course.country, course.year].join(" · ");
}
