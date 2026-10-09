"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  CalendarCheck,
  CalendarDays,
  Check,
  CircleHelp,
  ClipboardCheck,
  Cuboid,
  Droplets,
  Eraser,
  Eye,
  Flame,
  Gauge,
  Grid2X2,
  Hand,
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

type ScenarioId = "discover" | "style" | "care" | "booking";

type StyleOption = {
  id: string;
  name: string;
  category: string;
  note: string;
  position: string;
  focus: string;
};

type ColorOption = {
  id: string;
  name: string;
  color: string;
  filter: string;
};

type ServiceOption = {
  id: string;
  name: string;
  note: string;
  price: string;
  icon: LucideIcon;
};

const navigation = [
  ["الرئيسية", HomeIcon],
  ["قصات الشعر", Scissors],
  ["أنماط الذقن", PersonStanding],
  ["احجز الآن", CalendarDays],
  ["تجربة ثلاثية الأبعاد", Cuboid],
  ["الإعدادات", Settings2],
] as const;

const scenarioOrder: ScenarioId[] = ["discover", "style", "care", "booking"];

const scenarioCopy: Record<ScenarioId, { label: string; caption: string; eyebrow: string; title: string; accent: string; heroTitle: string; heroAccent: string; description: string; cta: string; icon: LucideIcon }> = {
  discover: { label: "الاستكشاف", caption: "حلّل ملامحك", eyebrow: "الخطوة 1 · الاستكشاف", title: "اكتشف إطلالتك", accent: "بذكاء", heroTitle: "دع الذكاء الاصطناعي", heroAccent: "يقترح ما يناسبك", description: "ابدأ بتحليل شكل الوجه ثم استكشف القصات والألوان التي تبرز ملامحك قبل اتخاذ القرار.", cta: "ابدأ تركيب الإطلالة", icon: Sparkles },
  style: { label: "تركيب اللوك", caption: "اختر الشعر والذقن", eyebrow: "الخطوة 2 · تركيب اللوك", title: "ركّب اللوك", accent: "كما تتخيله", heroTitle: "غيّر كل تفصيلة", heroAccent: "وشاهدها فورًا", description: "اختر قصة الشعر، نمط الذقن، نوع الشعر ولونه، وستتبدل المعاينة المولّدة أمامك مباشرة.", cta: "اعتمد هذه الإطلالة", icon: Scissors },
  care: { label: "باقة العناية", caption: "أضف اللمسات", eyebrow: "الخطوة 3 · باقة العناية", title: "أكمل تجربتك", accent: "بلمسات العناية", heroTitle: "أضف وقتًا", heroAccent: "للاسترخاء والعناية", description: "اختر الماسكات والفوطة الساخنة وتدليك فروة الرأس لتصل إلى تجربة متكاملة.", cta: "احفظ باقة العناية", icon: Droplets },
  booking: { label: "التأكيد والحجز", caption: "احفظ موعدك", eyebrow: "الخطوة 4 · التأكيد والحجز", title: "إطلالتك جاهزة", accent: "للموعد القادم", heroTitle: "راجع اختياراتك", heroAccent: "ثم احجز بثقة", description: "راجع الشكل النهائي والخدمات المضافة، ثم أرسل تفاصيل الجلسة إلى الحلاق في خطوة واحدة.", cta: "تأكيد جلسة الحلاقة", icon: CalendarCheck },
};

const hairStyles: StyleOption[] = [
  { id: "classic-side", name: "كلاسيك جانبي", category: "كلاسيك", note: "مرتب لكل يوم", position: "7% 82%", focus: "52% 43%" },
  { id: "french-crop", name: "كروب فرنسي", category: "عصري", note: "خفيف وسهل", position: "22% 82%", focus: "48% 42%" },
  { id: "low-fade", name: "فيدر منخفض", category: "تدرج", note: "نظيف وناعم", position: "37% 82%", focus: "50% 44%" },
  { id: "mid-fade", name: "فيدر متوسط", category: "تدرج", note: "الأكثر طلبًا", position: "52% 82%", focus: "51% 43%" },
  { id: "high-fade", name: "فيدر عالي", category: "تدرج", note: "حضور قوي", position: "67% 82%", focus: "54% 42%" },
  { id: "pompadour", name: "بومبادور", category: "كلاسيك", note: "فخامة واضحة", position: "82% 82%", focus: "55% 41%" },
  { id: "side-part", name: "سايد بارت", category: "كلاسيك", note: "أناقة عملية", position: "14% 58%", focus: "50% 42%" },
  { id: "modern-quiff", name: "كويف عصري", category: "عصري", note: "حجم وحركة", position: "29% 58%", focus: "54% 41%" },
  { id: "curly-top", name: "شعر مجعد", category: "مجعد", note: "طبيعي ومميز", position: "44% 58%", focus: "49% 42%" },
  { id: "undercut", name: "أندركت", category: "جريء", note: "تباين عصري", position: "59% 58%", focus: "53% 43%" },
  { id: "caesar", name: "قصة قيصر", category: "قصير", note: "مختصر وحاد", position: "74% 58%", focus: "49% 44%" },
  { id: "natural-medium", name: "طبيعي متوسط", category: "طبيعي", note: "مرن وأنيق", position: "89% 58%", focus: "52% 43%" },
];

const beardStyles: StyleOption[] = [
  { id: "clean", name: "حلاقة نظيفة", category: "نظيف", note: "ملامح واضحة", position: "7% 93%", focus: "49% 47%" },
  { id: "stubble", name: "ظل خفيف", category: "خفيف", note: "طبيعي وهادئ", position: "24% 93%", focus: "51% 47%" },
  { id: "defined", name: "ذقن محدد", category: "مرتب", note: "حدود دقيقة", position: "41% 93%", focus: "53% 47%" },
  { id: "short-boxed", name: "لحية قصيرة", category: "قصير", note: "توازن يومي", position: "58% 93%", focus: "50% 47%" },
  { id: "full", name: "لحية كاملة", category: "كثيف", note: "إطلالة قوية", position: "75% 93%", focus: "54% 47%" },
  { id: "boxed", name: "لحية مربعة", category: "كثيف", note: "فك أكثر تحديدًا", position: "92% 93%", focus: "52% 47%" },
  { id: "long", name: "لحية طويلة", category: "طويل", note: "شخصية مميزة", position: "15% 70%", focus: "51% 49%" },
  { id: "goatee", name: "فان دايك", category: "مميز", note: "ستايل فني", position: "32% 70%", focus: "49% 48%" },
  { id: "beard-mustache", name: "ذقن مع شارب", category: "كلاسيك", note: "تفصيل متوازن", position: "49% 70%", focus: "53% 48%" },
  { id: "sculpted", name: "لحية منحوتة", category: "احترافي", note: "تحديد فاخر", position: "66% 70%", focus: "51% 48%" },
];

const hairTypes = [
  { id: "straight", name: "ناعم", filter: "contrast(1.06) saturate(.94)" },
  { id: "wavy", name: "متموج", filter: "contrast(1.1) saturate(1.04)" },
  { id: "curly", name: "مجعد", filter: "contrast(1.14) saturate(1.1)" },
  { id: "thick", name: "كثيف", filter: "contrast(1.18) brightness(.96)" },
];

const hairColors: ColorOption[] = [
  { id: "black", name: "أسود", color: "#171311", filter: "brightness(.79) saturate(.82)" },
  { id: "dark-brown", name: "بني داكن", color: "#3d2115", filter: "sepia(.22) saturate(1.12) hue-rotate(-8deg)" },
  { id: "warm-brown", name: "بني دافئ", color: "#704422", filter: "sepia(.43) saturate(1.32) hue-rotate(-8deg)" },
  { id: "honey", name: "عسلي", color: "#b3783b", filter: "sepia(.7) saturate(1.46) hue-rotate(-10deg) brightness(1.04)" },
  { id: "ash", name: "أشقر رمادي", color: "#b6a58e", filter: "grayscale(.25) sepia(.18) saturate(.8) brightness(1.04)" },
  { id: "silver", name: "فضي", color: "#c8c8c3", filter: "grayscale(.82) brightness(1.12) contrast(.96)" },
];

const extraServices: ServiceOption[] = [
  { id: "hydration-mask", name: "ماسك ترطيب", note: "ترطيب عميق ولمعان", price: "+ 80 ج.م", icon: Droplets },
  { id: "purifying-mask", name: "ماسك تنقية", note: "تنظيف وانتعاش للبشرة", price: "+ 70 ج.م", icon: Sparkles },
  { id: "hot-towel", name: "فوطه ساخنة", note: "استرخاء قبل التشذيب", price: "+ 50 ج.م", icon: Flame },
  { id: "scalp-massage", name: "تدليك فروة الرأس", note: "جلسة هادئة لمدة 10 دقائق", price: "+ 90 ج.م", icon: Hand },
];

const hairModelAssets: Record<string, string> = {
  "classic-side": "/models/model-classic.png",
  "french-crop": "/models/model-french-crop.webp",
  "low-fade": "/models/model-low-fade.webp",
  "mid-fade": "/models/model-mid-fade.png",
  "high-fade": "/models/model-high-fade.png",
  pompadour: "/models/model-pompadour.png",
  "side-part": "/models/model-side-part.webp",
  "modern-quiff": "/models/model-modern-quiff.webp",
  "curly-top": "/models/model-curly.png",
  undercut: "/models/model-undercut.webp",
  caesar: "/models/model-caesar.webp",
  "natural-medium": "/models/model-natural-medium.webp",
};

const beardModelAssets: Record<string, string> = {
  clean: "/models/beard-clean.webp",
  stubble: "/models/beard-stubble.webp",
  defined: "/models/beard-defined.webp",
  "short-boxed": "/models/beard-short-boxed.webp",
  full: "/models/beard-full.webp",
  boxed: "/models/beard-boxed.webp",
  long: "/models/beard-long.webp",
  goatee: "/models/beard-goatee.webp",
  "beard-mustache": "/models/beard-mustache.webp",
  sculpted: "/models/beard-sculpted.webp",
};

const hairColorAssets: Record<string, string> = {
  black: "/models/color-black.png",
  "dark-brown": "/models/model-mid-fade.png",
  "warm-brown": "/models/color-warm-brown.png",
  honey: "/models/color-honey.png",
  ash: "/models/color-ash.png",
  silver: "/models/color-silver.png",
};

export default function Home() {
  const [active, setActive] = useState("الرئيسية");
  const [scenario, setScenario] = useState<ScenarioId>("discover");
  const [hair, setHair] = useState(3);
  const [beard, setBeard] = useState(2);
  const [hairType, setHairType] = useState("wavy");
  const [hairColor, setHairColor] = useState("dark-brown");
  const [services, setServices] = useState<string[]>([]);
  const [compare, setCompare] = useState(true);
  const [turn, setTurn] = useState(0);
  const [length, setLength] = useState(62);
  const [density, setDensity] = useState(52);
  const [applied, setApplied] = useState(false);
  const [lastSelection, setLastSelection] = useState<"hair" | "beard" | "color">("hair");

  const selectedHair = hairStyles[hair];
  const selectedBeard = beardStyles[beard];
  const selectedType = hairTypes.find((item) => item.id === hairType) ?? hairTypes[1];
  const selectedColor = hairColors.find((item) => item.id === hairColor) ?? hairColors[1];
  const selectedServices = extraServices.filter((service) => services.includes(service.id));
  const score = 91 + ((hair + beard + services.length) % 5);
  const selectedModel = (lastSelection === "color" ? hairColorAssets[selectedColor.id] : lastSelection === "beard" ? beardModelAssets[selectedBeard.id] : hairModelAssets[selectedHair.id]) ?? "/models/model-mid-fade.png";
  const currentScenario = scenarioCopy[scenario];
  const scenarioProgress = ((scenarioOrder.indexOf(scenario) + 1) / scenarioOrder.length) * 100;
  const serviceTotal = selectedServices.length * 75;

  const applyLook = () => {
    setApplied(true);
    window.setTimeout(() => setApplied(false), 2400);
  };

  const toggleService = (id: string) => {
    setServices((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const previewFilter = `${selectedColor.filter} ${selectedType.filter}`;

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
        <header className="topbar"><div><p className="eyebrow"><span className="status-dot" /> {currentScenario.eyebrow}</p><h1>{currentScenario.title} <span>{currentScenario.accent}</span></h1></div><div className="top-actions"><button className="ghost-action" type="button" onClick={() => setScenario("booking")}><Eye size={17} /> معاينة كاملة</button><button className="avatar-button" type="button" aria-label="الملف الشخصي">م</button></div></header>

        <ScenarioRail scenario={scenario} onChange={setScenario} progress={scenarioProgress} />

        <div className="workspace-grid">
          <section className="hero-card glass-panel">
            <div className="hero-copy"><span className="section-kicker"><currentScenario.icon size={14} /> {scenario === "discover" ? "توصية مخصصة" : currentScenario.label}</span><h2>{currentScenario.heroTitle}<br /><span>{currentScenario.heroAccent}</span></h2><p>{currentScenario.description}</p><div className="copy-divider" /><div className="hero-meta"><span><BadgeCheck size={15} /> تحليل ملامح الوجه</span><span><Gauge size={15} /> دقة التوصية {score}%</span></div></div>
            <div className="model-stage"><div className="stage-glow" /><div className="stage-grid" /><div className={`model-cutout ${turn === 1 ? "turn-left" : turn === 2 ? "turn-right" : ""}`}><img src={selectedModel} alt={`نموذج مولّد لمعاينة ${selectedHair.name} و${selectedBeard.name}`} style={{ filter: previewFilter }} /></div><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="model-badge"><span className="live-dot" /> نموذج مولّد الآن</div><div className="face-tag"><span>شكل الوجه</span><strong>بيضاوي</strong></div>
              <div className="look-ribbon"><span><small>الشعر</small><strong>{selectedHair.name}</strong></span><i /><span><small>الدقن</small><strong>{selectedBeard.name}</strong></span><i /><span><small>اللون</small><strong className="ribbon-color"><b style={{ background: selectedColor.color }} />{selectedColor.name}</strong></span></div>
              <div className="compare-card"><div className="compare-head"><span>مقارنة الإطلالة</span><button type="button" onClick={() => setCompare(!compare)} aria-label="تبديل المقارنة"><span className="blend-icon"><i /><i /></span></button></div><div className="compare-images"><div className="compare-image"><img src="/models/model-classic.png" alt="الإطلالة الأصلية" /><span>قبل</span></div>{compare && <div className="compare-image after"><img src={selectedModel} alt="الإطلالة المختارة" style={{ filter: previewFilter }} /><span>بعد</span><b><Check size={12} /></b></div>}</div><span className="compare-label">{compare ? "قبل / بعد" : "معاينة واحدة"}</span></div>
              <div className="stage-controls"><button type="button" aria-label="تدوير إلى اليسار" onClick={() => setTurn(1)}><Rotate3d size={18} /></button><span><Move3d size={16} /> اسحب للتدوير</span><button type="button" aria-label="تدوير إلى اليمين" onClick={() => setTurn(2)}><Rotate3d size={18} /></button></div>
            </div>
            <div className="hero-footer"><span><Star size={15} fill="currentColor" /> {selectedServices.length ? `${selectedServices.length} خدمات مضافة إلى الإطلالة` : "الإطلالة الأكثر طلبًا هذا الأسبوع"}</span><button type="button" onClick={() => setCompare(!compare)}>{compare ? "إخفاء المقارنة" : "عرض المقارنة"}</button></div>
          </section>

          <aside className="recommendation-card glass-panel"><div className="recommendation-heading"><div><span className="section-kicker"><Sparkles size={14} /> تحليل الذكاء الاصطناعي</span><h2>مناسب لشكل وجهك</h2></div><div className="score-ring"><strong>{score}%</strong><span>مناسب</span></div></div><div className="face-outline"><PersonStanding size={47} /><span>وجه بيضاوي</span></div><div className="check-list"><span><Check size={15} /> يبرز ملامح وجهك</span><span><Check size={15} /> متناسق مع {selectedBeard.name}</span><span><Check size={15} /> مظهر عصري ومتوازن</span></div><div className="panel-divider" />
            <label className="range-row"><span className="range-label"><span>طول الشعر</span><strong>{length < 40 ? "قصير" : length < 70 ? "متوسط" : "طويل"}</strong></span><input aria-label="طول الشعر" type="range" min="20" max="90" value={length} onChange={(event) => setLength(Number(event.target.value))} /></label><label className="range-row"><span className="range-label"><span>كثافة اللحية</span><strong>{density < 35 ? "خفيفة" : density < 70 ? "متوسطة" : "كاملة"}</strong></span><input aria-label="كثافة اللحية" type="range" min="10" max="90" value={density} onChange={(event) => setDensity(Number(event.target.value))} /></label>
            <div className="mini-config"><div className="config-block"><div className="config-label"><span>نوع الشعر</span><small>{selectedType.name}</small></div><div className="choice-pills">{hairTypes.map((type) => <button key={type.id} className={`choice-pill ${hairType === type.id ? "selected" : ""}`} type="button" onClick={() => setHairType(type.id)}>{type.name}</button>)}</div></div><div className="config-block"><div className="config-label"><span>لون الشعر</span><small>{selectedColor.name}</small></div><div className="color-swatches">{hairColors.map((color) => <button key={color.id} className={`color-swatch ${hairColor === color.id ? "selected" : ""}`} type="button" title={color.name} aria-label={`اختيار لون ${color.name}`} onClick={() => { setHairColor(color.id); setLastSelection("color"); }}>{hairColors.length > 0 && <span style={{ background: color.color }} />}</button>)}</div></div></div>
            <div className="selection-summary"><span className="selection-chip"><Scissors size={12} /> {selectedHair.name}</span><span className="selection-chip"><PersonStanding size={12} /> {selectedBeard.name}</span><span className="selection-chip"><span className="chip-dot" style={{ background: selectedColor.color }} /> {selectedColor.name}</span>{selectedServices.length > 0 && <span className="selection-chip"><Sparkles size={12} /> {selectedServices.length} خدمات</span>}</div><button className="apply-button" type="button" onClick={applyLook}>{applied ? <><Check size={20} /> تم حفظ السيناريو</> : <><WandSparkles size={20} /> {currentScenario.cta}</>}</button><span className="panel-note"><BadgeCheck size={14} /> يمكنك تعديل كل التفاصيل لاحقًا</span></aside>
        </div>

        <StyleShelf title="قصات الشعر" kicker="تخصيص الإطلالة" icon={<Scissors size={14} />} items={hairStyles} assets={hairModelAssets} selected={hair} onSelect={(index) => { setHair(index); setLastSelection("hair"); }} />
        <StyleShelf title="أنماط الذقن" kicker="تفاصيل الوجه" icon={<PersonStanding size={14} />} items={beardStyles} assets={beardModelAssets} selected={beard} onSelect={(index) => { setBeard(index); setLastSelection("beard"); }} beard />
        <ServiceShelf selected={services} onToggle={toggleService} />
        <ScenarioSummary scenario={scenario} hair={selectedHair.name} beard={selectedBeard.name} color={selectedColor.name} services={selectedServices.length} total={serviceTotal} />
        <footer className="page-footer"><span>© 2026 باربر 3D</span><span>مصمم لعشّاق التفاصيل</span><span><BadgeCheck size={14} /> سجل اختياراتك محفوظ محليًا</span></footer>
      </div>
    </main>
  );
}

function ScenarioRail({ scenario, onChange, progress }: { scenario: ScenarioId; onChange: (value: ScenarioId) => void; progress: number }) {
  return <section className="scenario-rail glass-panel"><div className="scenario-rail-head"><div><span className="section-kicker"><Sparkles size={14} /> مسار التجربة الذكية</span><strong>{scenarioCopy[scenario].label}</strong></div><span className="scenario-count">{scenarioOrder.indexOf(scenario) + 1} / {scenarioOrder.length}</span></div><div className="scenario-progress"><span style={{ width: `${progress}%` }} /></div><div className="scenario-steps">{scenarioOrder.map((id, index) => { const item = scenarioCopy[id]; const Icon = item.icon; return <button key={id} type="button" className={`scenario-step ${scenario === id ? "active" : ""} ${scenarioOrder.indexOf(scenario) > index ? "done" : ""}`} onClick={() => onChange(id)} aria-current={scenario === id ? "step" : undefined}><span className="scenario-icon"><Icon size={16} /></span><span><strong>{item.label}</strong><small>{item.caption}</small></span>{scenarioOrder.indexOf(scenario) > index && <Check size={14} className="scenario-done" />}</button>; })}</div></section>;
}

function ScenarioSummary({ scenario, hair, beard, color, services, total }: { scenario: ScenarioId; hair: string; beard: string; color: string; services: number; total: number }) {
  const item = scenarioCopy[scenario];
  const Icon = item.icon;
  return <section className="scenario-summary glass-panel"><div className="scenario-summary-icon"><Icon size={20} /></div><div className="scenario-summary-copy"><span className="section-kicker">{item.label}</span><h2>{scenario === "booking" ? "كل التفاصيل جاهزة للحجز" : scenario === "care" ? "باقة العناية المقترحة" : "ملخص الإطلالة الحالية"}</h2><p><strong>{hair}</strong> · <strong>{beard}</strong> · لون <strong>{color}</strong> · {services ? `${services} خدمات إضافية` : "بدون خدمات إضافية"}</p></div><div className="scenario-summary-action">{scenario === "booking" ? <><small>إجمالي الخدمات</small><strong>{total || 0} ج.م</strong></> : <button type="button">الانتقال للخطوة التالية <WandSparkles size={15} /></button>}</div></section>;
}

function StyleShelf({ title, kicker, icon, items, assets, selected, onSelect, beard = false }: { title: string; kicker: string; icon: React.ReactNode; items: readonly StyleOption[]; assets: Record<string, string>; selected: number; onSelect: (index: number) => void; beard?: boolean }) {
  return <section className={`style-section glass-panel ${beard ? "beard-section" : ""}`}><div className="style-heading"><div><span className="section-kicker">{icon} {kicker}</span><h2>{title}</h2></div><div className="style-tools"><span>{items.length} خيارات متاحة</span><button type="button" aria-label="عرض العناصر"><Grid2X2 size={17} /></button>{beard ? <button type="button" aria-label="أدوات اللحية"><Eraser size={17} /></button> : null}</div></div><div className={`style-grid ${beard ? "beard-grid" : ""}`}>{items.map((item, index) => <button className={`style-card ${selected === index ? "selected" : ""}`} type="button" key={item.id} onClick={() => onSelect(index)}><div className="style-visual"><img src={assets[item.id] ?? "/models/model-mid-fade.png"} alt={`نموذج ${item.name}`} /><span className="style-check"><Check size={14} /></span></div><span>{item.name}</span><small>{selected === index ? "اختيارك الحالي" : `${item.category} · ${item.note}`}</small></button>)}</div></section>;
}

function ServiceShelf({ selected, onToggle }: { selected: string[]; onToggle: (id: string) => void }) {
  return <section className="services-section glass-panel"><div className="style-heading"><div><span className="section-kicker"><Sparkles size={14} /> لمسات إضافية</span><h2>خدمات العناية</h2></div><div className="style-tools"><span>{selected.length} محددة</span><button type="button" aria-label="عرض الخدمات"><Grid2X2 size={17} /></button></div></div><div className="service-grid">{extraServices.map((service) => { const Icon = service.icon; const isSelected = selected.includes(service.id); return <button key={service.id} type="button" className={`service-card ${isSelected ? "selected" : ""}`} onClick={() => onToggle(service.id)} aria-pressed={isSelected}><span className="service-icon"><Icon size={19} /></span><span className="service-copy"><strong>{service.name}</strong><small>{service.note}</small></span><span className="service-price">{service.price}</span><span className="service-check"><Check size={13} /></span></button>; })}</div></section>;
}
