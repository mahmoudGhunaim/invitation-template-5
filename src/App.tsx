import { useEffect, useMemo, useState } from 'react'

type Lang = 'ar' | 'en'
type Phase = 'envelope' | 'fading' | 'landing'

// ─── detail icons ─────────────────────────────────────────────────────────────

const CalendarIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8"
       strokeLinecap="round" strokeLinejoin="round" width="44" height="44">
    <rect x="6" y="8" width="36" height="34" rx="3" />
    <line x1="6" y1="18" x2="42" y2="18" />
    <line x1="17" y1="6" x2="17" y2="12" />
    <line x1="31" y1="6" x2="31" y2="12" />
    <line x1="14" y1="27" x2="18" y2="27" />
    <line x1="22" y1="27" x2="26" y2="27" />
    <line x1="30" y1="27" x2="34" y2="27" />
    <line x1="14" y1="35" x2="18" y2="35" />
    <line x1="22" y1="35" x2="26" y2="35" />
  </svg>
)
const ClockIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8"
       strokeLinecap="round" strokeLinejoin="round" width="44" height="44">
    <circle cx="24" cy="24" r="19" /><polyline points="24,13 24,24 31,29" />
  </svg>
)
const PinIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8"
       strokeLinecap="round" strokeLinejoin="round" width="44" height="44">
    <path d="M24 4C16.27 4 10 10.27 10 18c0 10.5 14 26 14 26s14-15.5 14-26C38 10.27 31.73 4 24 4Z" />
    <circle cx="24" cy="18" r="5" />
  </svg>
)
const DressIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8"
       strokeLinecap="round" strokeLinejoin="round" width="44" height="44">
    <path d="M18 6 L14 18 L6 42 H42 L34 18 L30 6" />
    <path d="M18 6 Q24 12 30 6" />
    <line x1="24" y1="6" x2="24" y2="18" />
  </svg>
)

// ─── gallery icons — Jordanian motifs ─────────────────────────────────────────

const OliveBranchIcon = () => (
  <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.4" width="56" height="56">
    <path d="M30 54 Q30 30 28 12" strokeLinecap="round" />
    <ellipse cx="18" cy="28" rx="9" ry="5" transform="rotate(-40 18 28)" />
    <ellipse cx="22" cy="18" rx="8" ry="4.5" transform="rotate(-20 22 18)" />
    <ellipse cx="38" cy="24" rx="9" ry="5" transform="rotate(35 38 24)" />
    <ellipse cx="34" cy="14" rx="8" ry="4.5" transform="rotate(15 34 14)" />
    <circle cx="16" cy="34" r="3.5" fill="currentColor" stroke="none" opacity="0.7" />
    <circle cx="36" cy="30" r="3" fill="currentColor" stroke="none" opacity="0.7" />
    <circle cx="24" cy="10" r="2.5" fill="currentColor" stroke="none" opacity="0.6" />
  </svg>
)

const JordanStarIcon = () => (
  <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.4" width="56" height="56">
    {/* 7-pointed star */}
    <polygon
      points="30,4 34.5,17.5 47.8,13.5 40,24.5 53,30 40,35.5 47.8,46.5 34.5,42.5 30,56 25.5,42.5 12.2,46.5 20,35.5 7,30 20,24.5 12.2,13.5 25.5,17.5"
      strokeLinejoin="round"
    />
    <circle cx="30" cy="30" r="5" fill="currentColor" stroke="none" opacity="0.6" />
  </svg>
)

const DabkeIcon = () => (
  <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5" width="56" height="56">
    {/* stylised row of 4 dancing figures holding hands */}
    <circle cx="10" cy="14" r="4" /><circle cx="23" cy="12" r="4" />
    <circle cx="37" cy="12" r="4" /><circle cx="50" cy="14" r="4" />
    <path d="M10 18 Q10 28 14 36 L8 50" strokeLinecap="round" />
    <path d="M10 18 Q10 28 14 36 L18 50" strokeLinecap="round" />
    <path d="M23 16 Q22 28 24 36 L18 50" strokeLinecap="round" />
    <path d="M23 16 Q22 28 24 36 L28 50" strokeLinecap="round" />
    <path d="M37 16 Q38 28 36 36 L30 50" strokeLinecap="round" />
    <path d="M37 16 Q38 28 36 36 L40 50" strokeLinecap="round" />
    <path d="M50 18 Q50 28 46 36 L42 50" strokeLinecap="round" />
    <path d="M50 18 Q50 28 46 36 L52 50" strokeLinecap="round" />
    {/* hands joined */}
    <line x1="14" y1="22" x2="19" y2="22" strokeLinecap="round" />
    <line x1="27" y1="21" x2="33" y2="21" strokeLinecap="round" />
    <line x1="41" y1="21" x2="46" y2="22" strokeLinecap="round" />
  </svg>
)

const RingsIcon = () => (
  <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5" width="56" height="56">
    <circle cx="22" cy="30" r="14" />
    <circle cx="38" cy="30" r="14" />
    <path d="M30 19.5 Q30 22 30 30 Q30 38 30 40.5" opacity="0.3" />
  </svg>
)

// ─── i18n ─────────────────────────────────────────────────────────────────────

const C = {
  ar: {
    dir: 'rtl' as const,
    sealText: 'ع & ن',
    letterLine: 'أنتم مدعوون!',
    letterName: 'عمر ونور',
    tapToOpen: 'اضغط لفتح الدعوة',
    opening: 'جاري الفتح...',
    langBtn: 'EN',
    badge: 'دعوة زفاف',
    coupleName: 'عمر ونور',
    subtitle: 'يُعلنان زفافهما الميمون بأجمل فرحة وأعلى زفّة',
    desc1: 'يسعد أهل العريس وأهل العروسة',
    desc2: 'بدعوتكم الكريمة لحضور حفل الزفاف والزفّة',
    viewDetails: 'تفاصيل الحفل',
    quoteText: '"بَارَكَ اللهُ لَكُمَا، وَبَارَكَ عَلَيْكُمَا، وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ"',
    withLove: '— دعاء النبي ﷺ للمتزوجين',
    days: 'يوم', hours: 'ساعة', minutes: 'دقيقة', seconds: 'ثانية',
    joinTitle: 'تفاصيل الحفل',
    date: 'التاريخ', dateVal: 'الثلاثاء\n٣٠ يونيو ٢٠٢٦',
    time: 'الوقت', timeVal: 'الساعة ٦ مساءً\nوحتى آخر الليل',
    venue: 'المكان', venueVal: 'قاعات الروابي\nعمّان',
    dress: 'الزي المطلوب', dressVal: 'سهرة رسمية\nيُرحَّب بالزي التراثي',
    mapTitle: 'خريطة الوصول',
    mapAddr: 'قاعات الروابي للأفراح · عمّان',
    galleryTitle: 'من روح الأصالة',
    galleryCaptions: ['غصن الزيتون', 'نجمة الفرح', 'زفّة الدبكة', 'خاتم الميثاق'],
    rsvpTitle: 'شرّفونا بحضوركم',
    rsvpText: 'يُرجى تأكيد حضوركم قبل ١٥ يونيو ٢٠٢٦',
    rsvpBtn: 'تأكيد الحضور',
    rsvpMsg: 'على البركة والنعمة! في انتظار فرحتكم معنا',
    footerText: 'احتفاءً بزفاف عمر ونور',
    rights: 'جميع الحقوق محفوظة',
    arrow: '←',
  },
  en: {
    dir: 'ltr' as const,
    sealText: 'O & N',
    letterLine: "You're Invited!",
    letterName: 'Omar & Nour',
    tapToOpen: 'Tap to Open',
    opening: 'Opening...',
    langBtn: 'ع',
    badge: 'Wedding Invitation',
    coupleName: 'Omar & Nour',
    subtitle: 'Joyfully invite you to celebrate their wedding',
    desc1: 'The families of the bride and groom',
    desc2: 'request the honour of your presence at the wedding celebration',
    viewDetails: 'View Details',
    quoteText: '"May Allah bless you both and shower His blessings upon you, and may He unite you in goodness."',
    withLove: '— Prophetic Wedding Dua',
    days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds',
    joinTitle: 'The Celebration',
    date: 'Date', dateVal: 'Tuesday\nJune 30, 2026',
    time: 'Time', timeVal: '6:00 PM\nUntil Late',
    venue: 'Venue', venueVal: 'Al-Rawabi Halls\nAmman',
    dress: 'Dress Code', dressVal: 'Formal Evening\nTraditional Welcome',
    mapTitle: 'Venue Location',
    mapAddr: 'Al-Rawabi Wedding Halls · Amman',
    galleryTitle: 'Heritage & Joy',
    galleryCaptions: ['Olive Branch', 'Star of Joy', 'Dabke Dance', 'Ring of Covenant'],
    rsvpTitle: 'Honour Us With Your Presence',
    rsvpText: 'Kindly confirm your attendance by June 15, 2026',
    rsvpBtn: 'Confirm Attendance',
    rsvpMsg: 'With blessings and joy — we look forward to celebrating with you!',
    footerText: 'Celebrating the Union of Omar & Nour',
    rights: 'All rights reserved',
    arrow: '→',
  },
} as const

type Content = (typeof C)[Lang]

// ─── floating olive leaves ────────────────────────────────────────────────────

function FloatingOlives() {
  const olives = useMemo(() => Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 14,
    duration: 11 + Math.random() * 12,
    size: 0.6 + Math.random() * 1,
    rotate: Math.random() * 360,
    type: i % 3,
  })), [])
  return (
    <div className="olives-container" aria-hidden="true">
      {olives.map(o => (
        <div key={o.id} className={`olive-leaf olive-leaf--${o.type}`} style={{
          left: `${o.left}%`,
          animationDelay: `${o.delay}s`,
          animationDuration: `${o.duration}s`,
          transform: `rotate(${o.rotate}deg) scale(${o.size})`,
        }} />
      ))}
    </div>
  )
}

// ─── envelope ─────────────────────────────────────────────────────────────────

function Envelope({ c, onOpen }: { c: Content; onOpen: () => void }) {
  const [clicked, setClicked] = useState(false)
  const handle = () => { setClicked(true); setTimeout(onOpen, 1200) }
  return (
    <div className={`envelope-wrapper${clicked ? ' opening' : ''}`} onClick={handle}>
      <div className="envelope-ornament-top">✦ على البركة والنعمة ✦</div>
      <div className="envelope">
        <div className="envelope-flap" />
        <div className="envelope-body">
          <div className="envelope-seal">
            <div className="seal-ring" />
            <div className="seal-inner">{c.sealText}</div>
          </div>
          <div className="envelope-branch-left" aria-hidden="true" />
          <div className="envelope-branch-right" aria-hidden="true" />
        </div>
        <div className="envelope-letter">
          <div className="letter-content">
            <p className="letter-line">{c.letterLine}</p>
            <div className="letter-divider" />
            <p className="letter-name">{c.letterName}</p>
          </div>
        </div>
      </div>
      <p className="envelope-hint">{clicked ? c.opening : c.tapToOpen}</p>
    </div>
  )
}

// ─── countdown ────────────────────────────────────────────────────────────────

function Countdown({ targetDate, c }: { targetDate: Date; c: Content }) {
  const calc = () => {
    const diff = targetDate.getTime() - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }
  const [t, setT] = useState(calc)
  useEffect(() => { const id = setInterval(() => setT(calc()), 1000); return () => clearInterval(id) }, [])
  const units = [
    { key: 'days' as const, label: c.days },
    { key: 'hours' as const, label: c.hours },
    { key: 'minutes' as const, label: c.minutes },
    { key: 'seconds' as const, label: c.seconds },
  ]
  return (
    <div className="countdown">
      {units.map(({ key, label }) => (
        <div key={key} className="countdown-item">
          <span className="countdown-value">{String(t[key]).padStart(2, '0')}</span>
          <span className="countdown-label">{label}</span>
        </div>
      ))}
    </div>
  )
}

// ─── landing ──────────────────────────────────────────────────────────────────

function LandingPage({ c }: { c: Content }) {
  const targetDate = new Date('2026-06-30T18:00:00')
  const galleryIcons = [<OliveBranchIcon />, <JordanStarIcon />, <DabkeIcon />, <RingsIcon />]

  return (
    <div className="landing-page">
      <header className="hero-section">
        <div className="hero-pattern" />
        <div className="hero-bands-top" />
        <FloatingOlives />
        <div className="hero-content">
          <div className="hero-bismillah">بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ</div>
          <div className="hero-badge">{c.badge}</div>
          <h1 className="hero-name">{c.coupleName}</h1>
          <p className="hero-subtitle">{c.subtitle}</p>
          <div className="hero-ornament">
            <span className="ornament-line" /><span className="ornament-gem">✦</span><span className="ornament-line" />
          </div>
          <p className="hero-description">{c.desc1}<br />{c.desc2}</p>
          <a href="#details" className="cta-button">
            {c.viewDetails} <span className="cta-arrow">{c.arrow}</span>
          </a>
        </div>
        <div className="hero-bands-bottom" />
      </header>

      <section className="message-section">
        <div className="message-card">
          <div className="message-corner mc-tl" /><div className="message-corner mc-tr" />
          <div className="message-corner mc-bl" /><div className="message-corner mc-br" />
          <div className="message-quote">"</div>
          <p className="message-text">{c.quoteText}</p>
          <p className="message-author">{c.withLove}</p>
        </div>
      </section>

      <div className="section-divider"><span className="div-gem">✦</span></div>

      <Countdown targetDate={targetDate} c={c} />

      <div className="section-divider"><span className="div-gem">✦</span></div>

      <section className="event-details" id="details">
        <h2 className="section-title">{c.joinTitle}</h2>
        <div className="details-grid">
          <div className="detail-card">
            <div className="detail-icon detail-icon--1"><CalendarIcon /></div>
            <h3>{c.date}</h3>
            <p>{c.dateVal.split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}</p>
          </div>
          <div className="detail-card">
            <div className="detail-icon detail-icon--2"><ClockIcon /></div>
            <h3>{c.time}</h3>
            <p>{c.timeVal.split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}</p>
          </div>
          <div className="detail-card">
            <div className="detail-icon detail-icon--3"><PinIcon /></div>
            <h3>{c.venue}</h3>
            <p>{c.venueVal.split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}</p>
          </div>
          <div className="detail-card">
            <div className="detail-icon detail-icon--4"><DressIcon /></div>
            <h3>{c.dress}</h3>
            <p>{c.dressVal.split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}</p>
          </div>
        </div>
      </section>

      <div className="section-divider"><span className="div-gem">✦</span></div>

      <section className="map-section" id="map">
        <h2 className="section-title">{c.mapTitle}</h2>
        <div className="map-wrapper">
          <iframe
            src="https://maps.google.com/maps?q=Rawabi+Halls+Amman+Jordan&output=embed"
            className="map-iframe" title="Venue Location" loading="lazy" referrerPolicy="no-referrer"
          />
        </div>
        <p className="map-address">{c.mapAddr}</p>
      </section>

      <div className="section-divider"><span className="div-gem">✦</span></div>

      <section className="gallery" id="gallery">
        <h2 className="section-title">{c.galleryTitle}</h2>
        <div className="gallery-grid">
          {galleryIcons.map((icon, i) => (
            <div key={i} className="gallery-card" style={{ animationDelay: `${i * 0.14}s` }}>
              <div className="gallery-image">{icon}</div>
              <p className="gallery-caption">{c.galleryCaptions[i]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rsvp-section" id="rsvp">
        <FloatingOlives />
        <div className="rsvp-inner">
          <div className="rsvp-olive-top" aria-hidden="true">🫒</div>
          <h2 className="section-title">{c.rsvpTitle}</h2>
          <p className="rsvp-text">{c.rsvpText}</p>
          <button className="cta-button" onClick={() => alert(c.rsvpMsg)}>
            {c.rsvpBtn} <span className="cta-arrow">{c.arrow}</span>
          </button>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-ornament">
          <span className="ornament-line" /><span>✦</span><span className="ornament-line" />
        </div>
        <p>{c.footerText}</p>
        <p className="footer-small">{c.rights} &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}

// ─── app ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [lang, setLang] = useState<Lang>('ar')
  const [phase, setPhase] = useState<Phase>('envelope')
  const c = C[lang]

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }, [lang])

  const handleOpen = () => { setPhase('fading'); setTimeout(() => setPhase('landing'), 800) }

  return (
    <div className="app">
      <button className="lang-toggle" onClick={() => setLang(l => l === 'ar' ? 'en' : 'ar')}>
        {c.langBtn}
      </button>
      {phase !== 'landing' && (
        <div className={`envelope-screen${phase === 'fading' ? ' fade-out' : ''}`}>
          <FloatingOlives />
          <Envelope c={c} onOpen={handleOpen} />
        </div>
      )}
      {phase === 'landing' && (
        <div className="landing-reveal"><LandingPage c={c} /></div>
      )}
    </div>
  )
}
