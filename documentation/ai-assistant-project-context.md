# سياق المشروع لمساعد الذكاء الاصطناعي

## 🎯 الأهداف الأساسية
1.  إعطاء الأولوية **للتنفيذات الآمنة من حيث النوع (type-safe)** باستخدام TypeScript
2.  الحفاظ على **تحسين محركات البحث (SEO)** في جميع المكونات
3.  فرض أفضل ممارسات **تقسيم الكود (code splitting)**
4.  ضمان **فحص تبعيات المكونات** أثناء التحديثات
5.  الحفاظ على **كود نظيف وقابل للصيانة** بهيكل واضح

## 🛠️ حزمة التقنيات (Tech Stack)
### الأطر الأساسية
- Next.js 15.2.1 (App Router) - [وثائق Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
- React 19 / TypeScript 5 - [مكونات خادم React](https://react.dev/reference/react/server)
- Prisma 6.6.0 (MongoDB) - [أفضل ممارسات Prisma](https://www.prisma.io/docs/guides/best-practices)
- NextAuth 5.0.0-beta.25 - [دليل الأمان](https://next-auth.js.org/security)

### الواجهة الخلفية (Backend)
- Server Actions (مدمجة)
- مسارات API (`app/api/*`)
- MongoDB (عبر Prisma)

### المكتبات الرئيسية
| الفئة          | الحزم والوثائق                                                                 |
|----------------|---------------------------------------------------------------------------------|
| إدارة الحالة (State) | [Zustand](https://zustand-demo.pmnd.rs/) / React Context                        |
| واجهة المستخدم (UI) | [shadcn](https://ui.shadcn.com/) / [Tailwind](https://tailwindcss.com/) / [Lucide](https://lucide.dev/) / [SweetAlert2](https://sweetalert2.github.io/) |
| أدوات مساعدة (Utilities) | [Date-fns](https://date-fns.org/) / [clsx](https://github.com/lukeed/clsx) / [Zod](https://zod.dev/) |
| معالجة الملفات (File Handling) | [Sharp](https://sharp.pixelplumbing.com/) |

## 🔧 معايير التطوير
### إجراءات الخادم (Server Actions) (المعالجة الأساسية للبيانات)
1.  تستخدم لـ:
    *   إرسال النماذج
    *   تعديلات قاعدة البيانات
    *   العمليات الحساسة
2.  تنظيمها في مجلد `app/actions/*`
3.  التحقق من صحة المدخلات باستخدام Zod
4.  معالجة الأخطاء باستخدام try/catch + حدود الخطأ (error boundaries)
5.  استخدام معاملات Prisma (transactions) للعمليات الذرية

### مسارات API
- الحفاظ على بساطة المسارات (thin controllers)
- التحقق من صحة المدخلات باستخدام Zod
- استخدام `export const runtime = 'edge'` لواجهات API العالمية

### هيكل المكونات
- نمط التصميم الذري (atoms/molecules/organisms)
- تفضيل مكونات الخادم (server components)
- استخدام `'use client'` فقط عند الضرورة القصوى
- الحفاظ على المكونات أقل من 50 سطراً من الكود (LOC)

## 🛡️ معايير الأمان
1.  التحقق من صحة جميع المدخلات باستخدام Zod
2.  استخدام استعلامات Prisma ذات المعلمات (parameterized queries)
3.  تنقية المحتوى الذي ينشئه المستخدم
4.  التحقق من صحة رموز JWT في مسارات API
5.  تعيين ترويسات الأمان المناسبة (حماية CSRF عبر فحص المصدر)

## 🤖 تعليمات لمساعد الذكاء الاصطناعي
1.  **معالجة البيانات**:
    *   استخدام Server Actions بدلاً من fetch من جانب العميل
    *   توضيح التحقق من صحة المدخلات باستخدام Zod
    *   إظهار أنماط معالجة الأخطاء المناسبة
    *   الإشارة إلى [وثائق Next.js Server Actions](https://nextjs.org/docs/app/api-reference/functions/server-actions)

2.  **أفضل الممارسات**:
    *   تفضيل مكونات الخادم لجلب البيانات
    *   استخدام `fetch()` مع ترويسات التخزين المؤقت (caching headers)
    *   تحسين الصور باستخدام `next/image`
    *   إضافة ميزات إمكانية الوصول بشكل افتراضي

3.  **معالجة الأخطاء**:
    *   تنفيذ حدود الخطأ العالمية (global error boundaries)
    *   إرجاع رسائل خطأ محددة من Server Actions
    *   إظهار إشعارات toast لملاحظات المستخدم

## 🚨 تذكيرات هامة
- تغييرات قاعدة البيانات: `prisma migrate dev`
- بيانات أولية (Seed data): `npm run seed`
- اختبار الاستجابة (Responsiveness): `npm run dev`
- التحقق من الأنواع (Types): `tsc --noEmit`
- فحص إجراءات الخادم: `next build && next start`
