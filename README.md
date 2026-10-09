# Barber 3D

واجهة عربية تفاعلية لاختيار قصات الشعر وأنماط الذقن ومعاينتها على نموذج ثلاثي الأبعاد. المشروع مبني باستخدام Next.js وReact وTailwind CSS.

## المتطلبات

- Node.js `>=22.13.0`
- npm

## التشغيل المحلي

```bash
npm install
npm run dev
```

ثم افتح [http://localhost:3000](http://localhost:3000).

## بناء الإنتاج

```bash
npm run build
npm start
```

أوامر المشروع تستخدم Next.js مباشرة:

- `npm run dev` — خادم التطوير
- `npm run build` — بناء الإنتاج
- `npm start` — تشغيل نسخة الإنتاج

## النشر على Vercel

يستخدم المشروع `next build` عبر `vercel.json`، لذلك يجب ضبط المشروع على فرع `master` مع مجلد الإخراج الافتراضي لـNext.js (`.next`).

## بنية المشروع

- `app/` — صفحات ومكونات Next.js
- `components/` — مكونات واجهة قابلة لإعادة الاستخدام
- `public/` — الصور والأصول الثابتة
- `lib/` — الأدوات والمنطق المساعد
