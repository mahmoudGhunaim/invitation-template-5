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
        <div className="footer-social">
          <a href="https://wa.me/962789995755" target="_blank" rel="noopener noreferrer" className="footer-social-wa">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
          <span className="footer-social-sep">·</span>
          <a href="https://www.instagram.com/lamsawedding_/" target="_blank" rel="noopener noreferrer" className="footer-social-ig">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            @lamsawedding_
          </a>
        </div>
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
