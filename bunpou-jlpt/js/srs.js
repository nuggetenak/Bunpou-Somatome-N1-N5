//  SRS — SM-2 Algorithm (Anki-style)
// ══════════════════════════════════════
// Data per card: { reps, interval, ef, due, history[] }
// quality: know=4, unsure=2, forgot=0
const LS_SRS = 'bunpou_srs';
window.srsData = {};

function srsLoad() {
  try { window.srsData = JSON.parse(localStorage.getItem(LS_SRS)) || {}; } catch(e) { window.srsData = {}; }
}
function srsSave() {
  try { localStorage.setItem(LS_SRS, JSON.stringify(window.srsData)); } catch(e) {}
}

function srsReview(id, quality) {
  // quality: 4=know, 2=unsure, 0=forgot
  const now = Date.now();
  const today = Math.floor(now / 86400000); // days since epoch
  let c = window.srsData[id] || { reps: 0, interval: 1, ef: 2.5, due: today, history: [] };

  // Record history
  c.history = (c.history || []).slice(-19); // keep last 20
  c.history.push({ date: today, q: quality });

  if (quality < 3) {
    // Forgot or unsure — reset repetitions, short interval
    c.reps = 0;
    c.interval = quality === 0 ? 1 : 2;
  } else {
    // Correct
    if (c.reps === 0)      c.interval = 1;
    else if (c.reps === 1) c.interval = 6;
    else                   c.interval = Math.round(c.interval * c.ef);
    c.reps++;
  }

  // Update ease factor (clamp between 1.3 and 3.0)
  c.ef = Math.min(3.0, Math.max(1.3,
    c.ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  ));

  c.due = today + c.interval;
  c.lastReview = today;
  window.srsData[id] = c;
  srsSave();
  return c;
}

// Get cards due today (for Quick Review later)
window.srsDueToday = function() {
  const today = Math.floor(Date.now() / 86400000);
  return (window.grammarData || []).filter(d => {
    if (d.cat === 'dummy') return false;
    const c = window.srsData[d.id];
    return !c || c.due <= today;
  });
};

// SRS card status helper
window.srsStatus = function(id) {
  const c = window.srsData[id];
  if (!c || c.reps === 0) return 'new';
  if (c.interval < 7)    return 'learning';
  if (c.interval < 21)   return 'young';
  return 'mature';
};

// Hook into saveProgress — update SRS simultaneously
const _origSaveProgress = window.saveProgress;
window.saveProgress = function(id, result) {
  _origSaveProgress && _origSaveProgress(id, result);
  const q = result === 'know' ? 4 : result === 'unsure' ? 2 : 0;
  srsReview(id, q);
  if (window.updateProgressPanel) window.updateProgressPanel();
};

// ══════════════════════════════════════
//  STREAK — with broken animation & popup
// ══════════════════════════════════════
const STREAK_TIPS = [
  "Jangan nyerah! Satu hari absen bukan akhir segalanya. 始めましょう！",
  "Streak putus = kesempatan baru mulai lebih kuat. がんばれ！",
  "Otak butuh istirahat juga — yang penting balik lagi hari ini!",
  "Konsistensi bukan tentang sempurna, tapi tentang balik lagi. 頑張って！",
  "Anki pun bilang: review hari ini lebih baik dari tidak sama sekali!",
];

function loadStreak() {
  const today = new Date().toDateString();
  let data = { count: 0, lastDate: null, broken: false };
  try { data = JSON.parse(localStorage.getItem(LS_STREAK)) || data; } catch(e) {}

  let showBroken = false;
  if (data.lastDate === today) {
    // already counted today
  } else {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (data.lastDate === yesterday) {
      data.count++;
      data.broken = false;
    } else if (data.lastDate !== null) {
      // streak broken!
      showBroken = data.count > 1; // only show if had a real streak
      data.count = 1;
      data.broken = true;
    } else {
      data.count = 1; // first time
    }
    data.lastDate = today;
    try { localStorage.setItem(LS_STREAK, JSON.stringify(data)); } catch(e) {}
  }

  const badge = document.getElementById('streakBadge');
  const num   = document.getElementById('streakNum');
  if (badge && num) {
    num.textContent = data.count;
    badge.style.display = 'flex';
    if (data.count >= 7) badge.classList.add('streak-hot');
  }

  if (showBroken) setTimeout(showStreakBroken, 800);
  return data.count;
}

function showStreakBroken() {
  const tip = STREAK_TIPS[Math.floor(Math.random() * STREAK_TIPS.length)];
  const modal = document.getElementById('streakBrokenModal');
  if (!modal) return;
  document.getElementById('streakTipText').textContent = tip;
  modal.classList.add('show');
  // animate fire crack
  const fire = document.getElementById('streakBrokenFire');
  if (fire) fire.classList.add('crack');
}
window.closeStreakBroken = function() {
  document.getElementById('streakBrokenModal')?.classList.remove('show');
};

// ══════════════════════════════════════
//  SWIPE GESTURE — left=✅ down=😅 right=❌
//  (matches button order: Hafal | Ragu | Lupa)
// ══════════════════════════════════════
function initSwipeGesture() {
  const wrap = document.getElementById('quizCardWrap');
  const overlay = document.getElementById('swipeOverlay');
  if (!wrap) return;

  let startX = 0, startY = 0, isDragging = false;
  const THRESHOLD = 72;
  const PREVIEW   = 45; // px to show preview overlay

  function showOverlay(cls, icon) {
    overlay.className = 'swipe-hint-overlay ' + cls;
    overlay.textContent = icon;
  }
  function hideOverlay() {
    overlay.className = 'swipe-hint-overlay';
    overlay.textContent = '';
  }

  wrap.addEventListener('touchstart', e => {
    if (!window.quizFlipped) return;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isDragging = true;
  }, { passive: true });

  wrap.addEventListener('touchmove', e => {
    if (!isDragging || !window.quizFlipped) return;
    const dx = e.touches[0].clientX - startX;
    const dy = e.touches[0].clientY - startY;
    const adx = Math.abs(dx), ady = Math.abs(dy);
    if (adx < 12 && ady < 12) { hideOverlay(); return; }
    // Swipe LEFT  → ✅ Hafal   (left button)
    // Swipe DOWN  → 😅 Ragu    (middle button)
    // Swipe RIGHT → ❌ Lupa    (right button)
    if (adx > ady && dx < -PREVIEW)      showOverlay('show-know',   '✅');
    else if (adx > ady && dx > PREVIEW)  showOverlay('show-forgot', '❌');
    else if (ady > adx && dy > PREVIEW)  showOverlay('show-unsure', '😅');
    else                                  hideOverlay();
  }, { passive: true });

  wrap.addEventListener('touchend', e => {
    if (!isDragging || !window.quizFlipped) { isDragging = false; return; }
    isDragging = false;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    const adx = Math.abs(dx), ady = Math.abs(dy);
    hideOverlay();
    if (adx > ady && dx < -THRESHOLD)     assess('know');
    else if (adx > ady && dx > THRESHOLD) assess('forgot');
    else if (ady > adx && dy > THRESHOLD) assess('unsure');
  }, { passive: true });
}

Object.defineProperty(window, 'quizFlipped', {
  get: () => typeof quizFlipped !== 'undefined' ? quizFlipped : false,
  configurable: true
});

// ── THEME TOGGLE ──
function toggleTheme() {
  const isLight = document.body.classList.toggle('light');
  document.getElementById('themeToggle').textContent = isLight ? '🌙' : '☀️';
  localStorage.setItem(LS_THEME, isLight ? 'light' : 'dark');
}
window.toggleTheme = toggleTheme;

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  loadStorage();
  srsLoad();
  updateBookmarkPill();
  registerSW();
  loadStreak();
  initSwipeGesture();
  if (window.browseInit) window.browseInit();
  if (localStorage.getItem(LS_THEME) === 'light') {
    document.body.classList.add('light');
    document.getElementById('themeToggle').textContent = '🌙';
  }
});

