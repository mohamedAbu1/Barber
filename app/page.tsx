"use client";

import { useState } from "react";
import {
  BadgeCheck,
  CalendarDays,
  Check,
  CircleHelp,
  Cuboid,
  Eraser,
  Eye,
  Gauge,
  Grid2X2,
  Home as HomeIcon,
  Menu,
  Move3d,
  PersonStanding,
  Rotate3d,
  Scissors,
  Settings2,
  Sparkles,
  Star,
  WandSparkles,
} from "lucide-react";

const navigation = [
  ["الرئيسية", HomeIcon],
  ["قصات الشعر", Scissors],
  ["أنماط الذقن", PersonStanding],
  ["احجز الآن", CalendarDays],
  ["تجربة ثلاثية الأبعاد", Cuboid],
  ["الإعدادات", Settings2],
] as const;

const hairOptions = ["قصة كلاسيك", "كروب عصري", "بومبادور", "شعر مجعد", "قصة قصيرة", "أندركت"];
const beardOptions = ["حلاقة نظيفة", "لحية خفيفة", "ذقن محدد", "لحية كاملة", "ذقن مع شارب"];

export default function Home() {
  const [active, setActive] = useState("الرئيسية");
  const [hair, setHair] = useState(1);
  const [beard, setBeard] = useState(2);
  const [compare, setCompare] = useState(true);
  const [turn, setTurn] = useState(0);
  const [length, setLength] = useState(62);
  const [density, setDensity] = useState(52);
  const [applied, setApplied] = useState(false);

  const applyLook = () => {
    setApplied(true);
    window.setTimeout(() => setApplied(false), 2400);
  };

  return (
    <main className="app-shell" dir="rtl">
      <div className="ambient-image" aria-hidden="true" />
      <div className="ambient-vignette" aria-hidden="true" />

      <header className="mobile-header glass-panel">
        <div className="brand-lockup"><span className="brand-mark"><Scissors size={17} /></span><span>باربر <em>3D</em></span></div>
        <button className="icon-button" type="button" aria-label="فتح القائمة"><Menu size={20} /></button>
      </header>

      <aside className="side-rail glass-panel">
        <div className="side-brand"><span className="brand-mark large"><Scissors size={22} /></span><div><strong>باربر <em>3D</em></strong><span>استوديو الحلاقة الذكي</span></div></div>
        <nav className="nav-list" aria-label="التنقل الرئيسي">
          {navigation.map(([label, Icon]) => <button className={`nav-item ${active === label ? "active" : ""}`} key={label} type="button" onClick={() => setActive(label)} aria-current={active === label ? "page" : undefined}><Icon size={19} /><span>{label}</span>{label === "تجربة ثلاثية الأبعاد" && <small className="new-badge">جديد</small>}</button>)}
        </nav>
        <div className="rail-footer"><div className="profile-chip"><span className="profile-avatar">م</span><span><strong>محمد أحمد</strong><small>الخطة الذهبية</small></span><Settings2 size={16} /></div><div className="rail-tip"><CircleHelp size={16} /> تحتاج إلى مساعدة؟</div></div>
      </aside>

      <div className="content-area">
        <header className="topbar"><div><p className="eyebrow"><span className="status-dot" /> مساحة التصميم الشخصي</p><h1>اختيار ذكي <span>لإطلالتك القادمة</span></h1></div><div className="top-actions"><button className="ghost-action" type="button"><Eye size={17} /> معاينة كاملة</button><button className="avatar-button" type="button" aria-label="الملف الشخصي">م</button></div></header>

        <div className="workspace-grid">
          <section className="hero-card glass-panel">
            <div className="hero-copy"><span className="section-kicker"><Sparkles size={14} /> توصية مخصصة</span><h2>جرّب قصات الشعر وأنماط الذقن<br /><span>على نموذجك ثلاثي الأبعاد</span></h2><p>اختَر تفاصيل إطلالتك، شاهدها من كل زاوية، واحفظ الشكل المثالي قبل زيارة الحلاق.</p><div className="copy-divider" /><div className="hero-meta"><span><BadgeCheck size={15} /> تحليل ملامح الوجه</span><span><Gauge size={15} /> دقة التوصية 94%</span></div></div>
            <div className="model-stage"><div className="stage-glow" /><div className="stage-grid" /><div className={`model-cutout ${turn === 1 ? "turn-left" : turn === 2 ? "turn-right" : ""}`}><img src="/barber-reference.png" alt="نموذج رجل لمعاينة القصات" /></div><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="model-badge"><span className="live-dot" /> نموذجك الآن</div><div className="face-tag"><span>شكل الوجه</span><strong>بيضاوي</strong></div>
              <div className="compare-card"><div className="compare-head"><span>مقارنة الإطلالة</span><button type="button" onClick={() => setCompare(!compare)} aria-label="تبديل المقارنة"><span className="blend-icon"><i /><i /></span></button></div><div className="compare-images"><div className="compare-image"><span>قبل</span></div>{compare && <div className="compare-image after"><span>بعد</span><b><Check size={12} /></b></div>}</div><span className="compare-label">{compare ? "قبل / بعد" : "معاينة واحدة"}</span></div>
              <div className="stage-controls"><button type="button" aria-label="تدوير إلى اليسار" onClick={() => setTurn(1)}><Rotate3d size={18} /></button><span><Move3d size={16} /> اسحب للتدوير</span><button type="button" aria-label="تدوير إلى اليمين" onClick={() => setTurn(2)}><Rotate3d size={18} /></button></div>
            </div>
            <div className="hero-footer"><span><Star size={15} fill="currentColor" /> الإطلالة الأكثر طلبًا هذا الأسبوع</span><button type="button" onClick={() => setCompare(!compare)}>{compare ? "إخفاء المقارنة" : "عرض المقارنة"}</button></div>
          </section>

          <aside className="recommendation-card glass-panel"><div className="recommendation-heading"><div><span className="section-kicker"><Sparkles size={14} /> تحليل الذكاء الاصطناعي</span><h2>مناسب لشكل وجهك</h2></div><div className="score-ring"><strong>{91 + ((hair + beard) % 4)}%</strong><span>مناسب</span></div></div><div className="face-outline"><PersonStanding size={47} /><span>وجه بيضاوي</span></div><div className="check-list"><span><Check size={15} /> يبرز ملامح وجهك</span><span><Check size={15} /> متناسق مع ذقنك</span><span><Check size={15} /> مظهر عصري ومتوازن</span></div><div className="panel-divider" />
            <label className="range-row"><span className="range-label"><span>طول الشعر</span><strong>{length < 40 ? "قصير" : length < 70 ? "متوسط" : "طويل"}</strong></span><input aria-label="طول الشعر" type="range" min="20" max="90" value={length} onChange={(event) => setLength(Number(event.target.value))} /></label><label className="range-row"><span className="range-label"><span>كثافة اللحية</span><strong>{density < 35 ? "خفيفة" : density < 70 ? "متوسطة" : "كاملة"}</strong></span><input aria-label="كثافة اللحية" type="range" min="10" max="90" value={density} onChange={(event) => setDensity(Number(event.target.value))} /></label><button className="apply-button" type="button" onClick={applyLook}>{applied ? <><Check size={20} /> تم تركيب الإطلالة</> : <><WandSparkles size={20} /> ركّب على النموذج</>}</button><span className="panel-note"><BadgeCheck size={14} /> يمكنك تعديل كل التفاصيل لاحقًا</span></aside>
        </div>

        <StyleShelf title="قصات الشعر" kicker="تخصيص الإطلالة" icon={<Scissors size={14} />} items={hairOptions} selected={hair} onSelect={setHair} />
        <StyleShelf title="أنماط الذقن" kicker="تفاصيل الوجه" icon={<PersonStanding size={14} />} items={beardOptions} selected={beard} onSelect={setBeard} beard />
        <footer className="page-footer"><span>© 2026 باربر 3D</span><span>مصمم لعشّاق التفاصيل</span><span><BadgeCheck size={14} /> سجل اختياراتك محفوظ محليًا</span></footer>
      </div>
    </main>
  );
}

function StyleShelf({ title, kicker, icon, items, selected, onSelect, beard = false }: { title: string; kicker: string; icon: React.ReactNode; items: readonly string[]; selected: number; onSelect: (index: number) => void; beard?: boolean }) {
  return <section className={`style-section glass-panel ${beard ? "beard-section" : ""}`}><div className="style-heading"><div><span className="section-kicker">{icon} {kicker}</span><h2>{title}</h2></div><div className="style-tools"><span>{items.length} اقتراحات</span><button type="button" aria-label="عرض العناصر"><Grid2X2 size={17} /></button>{beard ? <button type="button" aria-label="أدوات اللحية"><Eraser size={17} /></button> : null}</div></div><div className={`style-grid ${beard ? "beard-grid" : ""}`}>{items.map((item, index) => <button className={`style-card ${selected === index ? "selected" : ""}`} type="button" key={item} onClick={() => onSelect(index)}><div className="style-visual"><img src="/barber-reference.png" alt="" /><span className="style-check"><Check size={14} /></span></div><span>{item}</span><small>{selected === index ? "اختيارك الحالي" : "ستايل مقترح"}</small></button>)}</div></section>;
}
