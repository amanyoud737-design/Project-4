import Link from "next/link";
import { isAdminRequest } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Admin() {
  const isAdmin = isAdminRequest();
  if (!isAdmin) {
    return (
      <div className="container">
        <div className="topbar">
          <Link className="btn secondary" href="/">رجوع</Link>
          <span className="badge">لوحة الأدمن</span>
        </div>

        <div className="card" style={{padding:18}}>
          <div style={{fontSize:20, fontWeight:900}}>تسجيل دخول الأدمن</div>
          <div style={{color:"var(--muted)", marginTop:8}}>ادخل بيانات الأدمن (من متغيرات البيئة).</div>
          <form action="/api/admin/login" method="post" style={{marginTop:14}} className="grid">
            <input className="input" name="user" placeholder="Username" />
            <input className="input" name="pass" placeholder="Password" type="password" />
            <button className="btn" type="submit">دخول</button>
          </form>
        </div>
      </div>
    );
  }

  const templates = await prisma.template.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="container">
      <div className="topbar">
        <div style={{display:"flex", gap:10, alignItems:"center"}}>
          <Link className="btn secondary" href="/">الرئيسية</Link>
          <span className="badge">أدمن (تم الدخول)</span>
        </div>
        <form action="/api/admin/logout" method="post">
          <button className="btn secondary" type="submit">تسجيل خروج</button>
        </form>
      </div>

      <div className="grid" style={{gridTemplateColumns:"repeat(12,1fr)"}}>
        <div className="card" style={{gridColumn:"span 5", padding:18}}>
          <div style={{fontWeight:900, fontSize:18}}>إضافة قالب</div>
          <div style={{color:"var(--muted)", marginTop:8, lineHeight:1.8}}>
            اكتب معلومات القالب + JSON بسيط، وارفع صورة.
          </div>
          <hr className="sep" style={{margin:"14px 0"}}/>
          <form action="/api/admin/templates/create" method="post" encType="multipart/form-data" className="grid">
            <input className="input" name="name" placeholder="اسم القالب" required />
            <input className="input" name="description" placeholder="وصف (اختياري)" />
            <textarea className="textarea" name="data" placeholder='مثال: {"bg":"#0b1220","accent":"#5eead4"}' required />
            <input className="input" type="file" name="thumbnail" accept="image/*" />
            <button className="btn" type="submit">حفظ</button>
          </form>
        </div>

        <div className="card" style={{gridColumn:"span 7", padding:18}}>
          <div style={{fontWeight:900, fontSize:18, marginBottom:12}}>القوالب الحالية</div>
          <div className="grid" style={{gridTemplateColumns:"repeat(12,1fr)"}}>
            {templates.map(t => (
              <div key={t.id} className="card" style={{gridColumn:"span 6", padding:12, background:"rgba(2,6,23,.35)"}}>
                <div style={{fontWeight:900}}>{t.name}</div>
                <div style={{color:"var(--muted)", marginTop:6}}>{t.description || "—"}</div>
                {t.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img alt={t.name} src={t.thumbnail} style={{width:"100%", borderRadius:14, marginTop:10, border:"1px solid var(--border)"}} />
                ) : null}
                <div style={{display:"flex", gap:10, marginTop:12, flexWrap:"wrap"}}>
                  <form action="/api/admin/templates/delete" method="post">
                    <input type="hidden" name="id" value={t.id} />
                    <button className="btn danger" type="submit">حذف</button>
                  </form>
                </div>
              </div>
            ))}
            {templates.length===0 && (
              <div className="badge" style={{gridColumn:"span 12"}}>لا يوجد قوالب.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
