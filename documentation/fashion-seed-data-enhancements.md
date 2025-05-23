# تحسينات ملف `fashionSeedData.ts`

## نظرة عامة

تم تحسين ملف `fashionSeedData.ts` لتوفير بيانات اختبار عالية الجودة لمتجر أزياء إلكتروني مع علاقات صحيحة وفقًا لمخطط Prisma. تركز التحسينات على إنشاء منتجات أزياء واقعية، وطلبات، وصور منزلقة للصفحة الرئيسية.

## التحسينات الرئيسية

### 1. وظيفة تنظيف البيانات

- تمت إضافة دالة `cleanupExistingData()` التي تزيل البيانات الموجودة قبل ملء البيانات الأولية.
- تم تنفيذ ترتيب حذف مناسب لاحترام قيود المفاتيح الخارجية.
- تمت إضافة علامة سطر أوامر `--cleanup` أو `-c` للتحكم في تنظيف البيانات الموجودة.

### 2. بيانات منتجات أزياء محسنة

- تم توسيع مجموعة صور منتجات الأزياء عالية الجودة من Unsplash.
- تمت إضافة فئات منتجات أكثر تنوعًا بما في ذلك الأحذية.
- تم تحسين تفاصيل المنتج بأوصاف واقعية، ومواد، وتعليمات عناية.
- تم تحسين توليد الأسعار بناءً على الفئة وحالة الرفاهية.
- تمت إضافة توليد أحجام مناسبة بناءً على نوع المنتج.

### 3. موردون متعددون

- تم إنشاء عدة موردي أزياء بدلاً من مورد واحد فقط.
- تمت إضافة تنوع في أنواع الموردين (شركة، بوتيك، فاخر).
- تم توزيع المنتجات بين الموردين لبيانات أكثر واقعية.

### 4. توليد طلبات واقعية

- تم تنفيذ أنماط تسوق (طلبات فئة واحدة مقابل طلبات فئات مختلطة).
- تمت إضافة توزيع أكثر واقعية لحالة الطلب.
- تم تضمين أسباب الإلغاء للطلبات الملغاة.
- تم إنشاء علاقات صحيحة بين الطلبات والمنتجات والمستخدمين.

### 5. صور منزلقة للصفحة الرئيسية

- تمت إضافة توليد صور منزلقة/لافتات عالية الجودة للصفحة الرئيسية.
- تم إنشاء إدخالات مناسبة في نموذج `Promotion` المستخدم بواسطة مكون الشريط المنزلق.
- تم التأكد من أن الصور ذات حجم مناسب ومحسّنة للشريط المنزلق.

### 6. وسيطات سطر الأوامر

- تم تحسين معالجة وسيطات سطر الأوامر لتحكم أفضل.
- تمت إضافة خيارات لتحديد عدد المنتجات، وعدد الطلبات، وسلوك التنظيف.
- تم تحسين التسجيل مع طوابع زمنية لرؤية أفضل.

## الاستخدام

قم بتشغيل البرنامج النصي بالخيارات التالية:

```bash
# الاستخدام الأساسي (يستخدم الإعدادات الافتراضية: 1000 منتج، 500 طلب، بدون تنظيف)
npx tsx utils/fashionSeedData.ts

# مع التنظيف (يزيل البيانات الموجودة أولاً)
npx tsx utils/fashionSeedData.ts --cleanup

# تحديد عدد المنتجات والطلبات
npx tsx utils/fashionSeedData.ts --products=100 --orders=50

# خيارات مجمعة
npx tsx utils/fashionSeedData.ts --cleanup --products=100 --orders=50
```

## جودة البيانات

توفر البيانات الأولية المحسنة:

1.  **صور عالية الجودة** - جميع صور المنتجات والشرائح المنزلقة هي صور عالية الدقة من Unsplash.
2.  **تفاصيل منتج واقعية** - تحتوي المنتجات على أوصاف ومواد وتعليمات عناية مناسبة.
3.  **علاقات صحيحة** - تتبع جميع البيانات علاقات مخطط Prisma.
4.  **فئات متنوعة** - تمتد المنتجات عبر فئات أزياء متعددة.
5.  **تسعير واقعي** - تختلف الأسعار بناءً على الفئة وحالة الرفاهية.
6.  **أنماط طلبات مناسبة** - تعكس الطلبات سلوكيات تسوق واقعية.

تعتبر هذه البيانات المحسنة مثالية لاختبار أداء منصة التجارة الإلكترونية، ومكونات واجهة المستخدم، ومنطق الأعمال مع منتجات وطلبات أزياء واقعية.
