# PPT Builder (GitHub + Render جاهز)

هذا مشروع Next.js جاهز للرفع على GitHub وربطه مباشرةً بـ Render.
- محرّر شرائح (كل الشرائح قدامك)
- رفع صور من الجهاز
- اختيار خطوط عربية (أمثلة: Ruqaa / Naskh / Kufi / Cairo / Amiri)
- تنزيل PPTX + PDF
- دفع PayPal (Sandbox/Live)
- توليد عرض بالذكاء الاصطناعي (اختياري عبر OPENAI_API_KEY)
- لوحة أدمن لإضافة القوالب + صورة للثَمبنيل

> ملاحظة مهمة عن الخطوط: بعض الخطوط مثل "الديواني" قد تكون غير متاحة ترخيصيًا كملفات مفتوحة.
المشروع مجهّز بخطوط عربية مفتوحة المصدر موجودة في `public/fonts` وتقدر تضيف أي خط تملكه قانونيًا بنفس الطريقة.

---

## تشغيل محليًا

```bash
npm i
cp .env.example .env
npm run prisma:push
npm run dev
```

سيفتح على: http://localhost:3000

---

## قواعد البيانات (SQLite)
- المسار يعتمد على `DATABASE_URL` (افتراضيًا ملف داخل Render disk).

---

## ربطه على Render (الأسهل)
1) ارفع المشروع على GitHub.
2) Render > New > Web Service > اربطه بالريبو.
3) Build Command:
   - `npm install && npx prisma db push && npm run build`
4) Start Command:
   - `npm start`
5) أضف Environment Variables من `.env.example`.
6) أنشئ **Persistent Disk** واربطه على `/var/data`.

---

## لوحة الأدمن
- الرابط: `/admin`
- بيانات الدخول من البيئة:
  - `ADMIN_USER`
  - `ADMIN_PASSWORD`

---

## PayPal
- استخدم Sandbox أولًا:
  - `PAYPAL_CLIENT_ID`
  - `PAYPAL_CLIENT_SECRET`
  - `PAYPAL_ENV=sandbox`
- وبعدها بدّل إلى live.

---

## AI
- إذا ما عندك مفتاح:
  - اترك `OPENAI_API_KEY` فاضي، وزر AI سيظهر رسالة.
