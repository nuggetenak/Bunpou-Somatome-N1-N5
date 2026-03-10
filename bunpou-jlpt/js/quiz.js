//  quiz.js — Quiz logic + UI
//  Fix: pill UI, week filter, akhiri quiz + modal konfirmasi
// ══════════════════════════════════════

let quizLevel = 'all', quizWeek = null, quizCat = 'all';
let quizDeck = [], quizIdx = 0, quizFlipped = false;
let qKnow = 0, qUnsure = 0, qForgot = 0, missedDeck = [];
let isQuickReview = false;

// ── Quick Review — launch due cards instantly ──
window.startQuickReview = function() {
  const due = window.srsDueToday ? window.srsDueToday() : [];
  if (!due.length) return;
  isQuickReview = true;

  // Switch to quiz tab
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const quizTab = document.querySelector('[onclick*="quiz"]');
  if (quizTab) quizTab.classList.add('active');
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('quizPage').classList.add('active');

  // Shuffle & start
  quizDeck = due.sort(() => Math.random() - 0.5);
  quizIdx = 0; qKnow = 0; qUnsure = 0; qForgot = 0; missedDeck = [];
  document.getElementById('quizSetup').style.display = 'none';
  document.getElementById('quizActive').style.display = 'block';
  document.getElementById('quizResult').style.display = 'none';
  showQuizCard();
};

// ── Setup: Level pills ──
function quizPillLevel(lv, btn) {
  quizLevel = lv; quizWeek = null;

  // Scope reset HANYA ke quiz page pills
  document.querySelectorAll('#quizPage .level-pills .pill').forEach(b => {
    b.classList.remove('active-all','active-n1','active-n2','active-n3','active-n4','active-n5');
  });
  btn.classList.add(lv === 'all' ? 'active-all' : `active-${lv}`);

  // Kategori panel: HANYA tampil saat "Semua" level
  // Saat level spesifik dipilih → sembunyikan kategori (pakai week filter saja)
  const quizCatGroup = document.getElementById('quizCatGroup');
  if (quizCatGroup) {
    quizCatGroup.style.display = lv === 'all' ? '' : 'none';
  }
  // Reset cat ke Semua
  quizCat = 'all';
  document.querySelectorAll('.quiz-cat-chip').forEach(b => {
    b.classList.remove('active', 'active-all-cat');
  });
  const qCatAll = document.querySelector('#quizCatGroup .quiz-cat-chip');
  if (qCatAll) qCatAll.classList.add('active-all-cat');

  buildQuizWeekStrip(lv);
}

function buildQuizWeekStrip(lv) {
  const strip = document.getElementById('quizWeekStrip');
  if (!strip) return;
  const meta = window.levelMeta && window.levelMeta[lv];
  if (lv === 'all' || !meta || !meta.weeks || !meta.weeks.length) {
    strip.classList.remove('show');
    strip.innerHTML = '';
    return;
  }
  strip.innerHTML = `
    <button class="week-pill active" onclick="quizSelectWeek(null,this)">
      <span class="week-num-badge">ALL</span>
      <span class="week-theme">Semua</span>
    </button>
    ${meta.weeks.map(w => `
      <button class="week-pill${w.ready ? '' : ' coming'}"
        ${w.ready ? `onclick="quizSelectWeek(${w.w},this)"` : 'disabled'}>
        <span class="week-num-badge">W${w.w}</span>
        <span class="week-theme">${w.theme}</span>
      </button>`).join('')}
  `;
  strip.classList.add('show');
}

function quizSelectWeek(wk, btn) {
  quizWeek = wk;
  document.querySelectorAll('#quizWeekStrip .week-pill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function quizSelCat(cat, btn) {
  quizCat = cat;
  document.querySelectorAll('.quiz-cat-chip').forEach(b => b.className = 'cat-chip quiz-cat-chip');
  btn.classList.add(cat === 'all' ? 'active-all-cat' : 'active');
}

// ── Shuffle ──
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

// ── Start quiz ──
function startQuiz(deck) {
  const data = window.grammarData || [];
  const pool = deck || data.filter(d =>
    (quizLevel === 'all' || d.level === quizLevel) &&
    (quizWeek  === null  || d.week  === quizWeek)  &&
    (quizCat   === 'all' || d.cat   === quizCat)   &&
    d.cat !== 'dummy'
  );
  if (!pool.length) {
    alert('Tidak ada kartu untuk konfigurasi ini.');
    return;
  }
  quizDeck = shuffle(pool);
  quizIdx = 0; qKnow = 0; qUnsure = 0; qForgot = 0; missedDeck = [];
  document.getElementById('quizSetup').style.display   = 'none';
  document.getElementById('quizResult').style.display  = 'none';
  document.getElementById('quizActive').style.display  = 'block';
  showQuizCard();
}

// ── Show card ──
function showQuizCard() {
  if (quizIdx >= quizDeck.length) { showResult(); return; }
  const d = quizDeck[quizIdx];
  quizFlipped = false;
  const wrap = document.getElementById('quizCardWrap');
  wrap.className = `quiz-card-wrap q${d.level}`;
  wrap.classList.remove('flipped');
  document.getElementById('qGrammar').textContent = d.grammar;
  document.getElementById('qReading').textContent = d.reading;
  document.getElementById('qMeaning').textContent = d.meaning;
  document.getElementById('qDesc').innerHTML = d.desc;
  document.getElementById('qExamples').innerHTML = d.examples.slice(0,2).map(e =>
    `<div class="quiz-ex"><div class="jp">${e.jp}</div><div class="id">${e.id}</div></div>`
  ).join('');
  document.getElementById('assessBtns').classList.remove('show');
  updateProgress();
}

function flipQuizCard() {
  if (quizFlipped) return;
  quizFlipped = true;
  document.getElementById('quizCardWrap').classList.add('flipped');
  document.getElementById('assessBtns').classList.add('show');
}

// ── Assess + save to localStorage ──
function assess(result) {
  const d = quizDeck[quizIdx];
  if (result === 'know')        { qKnow++;   }
  else if (result === 'unsure') { qUnsure++; missedDeck.push(d); }
  else                          { qForgot++; missedDeck.push(d); }
  if (window.saveProgress) window.saveProgress(d.id, result);
  quizIdx++;
  showQuizCard();
}

function updateProgress() {
  const total = quizDeck.length, done = quizIdx;
  document.getElementById('quizProgressTxt').textContent = `${done} / ${total}`;
  document.getElementById('quizProgressFill').style.width = `${total ? (done/total*100) : 0}%`;
  document.getElementById('quizScoreTxt').innerHTML =
    `✅ ${qKnow} &nbsp; 😅 ${qUnsure} &nbsp; ❌ ${qForgot}`;
}

// ── Akhiri quiz lebih awal ──
function confirmEndQuiz() {
  document.getElementById('confirmDone').textContent  = quizIdx;
  document.getElementById('confirmTotal').textContent = quizDeck.length;
  document.getElementById('endQuizModal').classList.add('show');
}
function cancelEndQuiz() {
  document.getElementById('endQuizModal').classList.remove('show');
}
function doEndQuiz() {
  document.getElementById('endQuizModal').classList.remove('show');
  showResult();
}

// ── Hasil — animated ──
function showResult() {
  document.getElementById('quizActive').style.display = 'none';
  const resultEl = document.getElementById('quizResult');
  resultEl.style.display = 'block';

  const played = quizIdx;
  const pct    = played > 0 ? Math.round(qKnow / played * 100) : 0;
  const isPerfect = pct === 100 && played > 0;

  // Title & subtitle
  const titles = pct >= 90 ? ['完璧！', '素晴らしい！', 'Luar Biasa! 🎌']
               : pct >= 70 ? ['いいね！', 'Terus Semangat! 💪', 'Bagus Sekali!']
               : pct >= 50 ? ['まあまあ', 'Lumayan! 📖', 'Bisa Lebih Baik!']
               :             ['頑張れ！', 'Ayo Review Lagi! 🔥', 'Jangan Menyerah!'];
  document.getElementById('resultTitle').textContent = titles[Math.floor(Math.random() * titles.length)];
  document.getElementById('resultSubtitle').textContent =
    `${qKnow} dari ${played} benar${played < quizDeck.length ? ` · berhenti di ${played}/${quizDeck.length}` : ''}.`;

  // Count-up animation
  animateCount('rKnow',   qKnow,   600);
  animateCount('rUnsure', qUnsure, 750);
  animateCount('rForgot', qForgot, 900);

  // Score ring
  animateRing(pct, isPerfect);

  // Missed
  const missedBtn = document.getElementById('retryMissedBtn');
  const missedCnt = document.getElementById('missedCount');
  if (missedBtn) missedBtn.style.display = missedDeck.length ? 'block' : 'none';
  if (missedCnt) missedCnt.textContent = missedDeck.length;

  // SRS hint
  const srsHint = document.getElementById('resultSrsHint');
  const srsText = document.getElementById('resultSrsText');
  if (srsHint && srsText && played > 0) {
    const dueNow = window.srsDueToday ? window.srsDueToday().length : 0;
    if (dueNow > 0) {
      srsText.textContent = `Masih ada ${dueNow} kartu jatuh tempo — review sekarang biar makin hafal!`;
      srsHint.style.display = 'flex';
    } else {
      // Find next due
      const srs = window.srsData || {};
      const today = Math.floor(Date.now() / 86400000);
      const dues = Object.values(srs).filter(c => c.due > today).map(c => c.due);
      if (dues.length) {
        const nextDays = Math.min(...dues) - today;
        srsText.textContent = `Kartu berikutnya jatuh tempo ${nextDays === 1 ? 'besok' : `${nextDays} hari lagi`}. Tetap semangat!`;
        srsHint.style.display = 'flex';
      } else {
        srsHint.style.display = 'none';
      }
    }
  }

  // Confetti — only on high score
  if (pct >= 80 && played >= 3) launchConfetti(isPerfect);

  // Update progress
  if (window.updateProgressPanel) window.updateProgressPanel();
  if (window.updateQuickReviewCard) window.updateQuickReviewCard();
}

// ── Count-up animation ──
function animateCount(id, target, delay) {
  const el = document.getElementById(id);
  if (!el || target === 0) { if(el) el.textContent = 0; return; }
  const dur = 600, steps = 20;
  let step = 0;
  setTimeout(() => {
    const iv = setInterval(() => {
      step++;
      el.textContent = Math.round(target * (step / steps));
      if (step >= steps) { el.textContent = target; clearInterval(iv); }
    }, dur / steps);
  }, delay);
}

// ── Score ring animation ──
function animateRing(pct, perfect) {
  const ring = document.getElementById('ringFill');
  const pctEl = document.getElementById('resultPct');
  if (!ring || !pctEl) return;

  const circumference = 327;
  const offset = circumference - (pct / 100) * circumference;

  // Color based on score
  ring.style.stroke = pct >= 80 ? '#34D399' : pct >= 50 ? '#FBBF24' : '#F87171';
  if (perfect) ring.style.stroke = 'url(#ringGradEl)';

  setTimeout(() => {
    ring.style.strokeDashoffset = offset;
    // Count up pct number
    let cur = 0;
    const iv = setInterval(() => {
      cur = Math.min(cur + Math.ceil(pct / 30), pct);
      pctEl.textContent = cur + '%';
      if (cur >= pct) clearInterval(iv);
    }, 40);
  }, 100);
}

// ══════════════════════════════════════
//  CONFETTI ENGINE — lightweight canvas
// ══════════════════════════════════════
function launchConfetti(intense) {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const ctx    = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const COLORS = ['#34D399','#60A5FA','#FBBF24','#F87171','#A78BFA','#2D6A4F','#3B82C4'];
  const count  = intense ? 160 : 90;
  const pieces = [];

  for (let i = 0; i < count; i++) {
    pieces.push({
      x:    Math.random() * canvas.width,
      y:    -Math.random() * canvas.height * 0.5 - 20,
      w:    Math.random() * 8 + 4,
      h:    Math.random() * 4 + 3,
      r:    Math.random() * Math.PI * 2,
      vx:   (Math.random() - 0.5) * 3,
      vy:   Math.random() * 3 + 2,
      vr:   (Math.random() - 0.5) * 0.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: 1,
    });
  }

  let frame = 0;
  const MAX = intense ? 220 : 160;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.x  += p.vx;
      p.y  += p.vy;
      p.vy += 0.07; // gravity
      p.r  += p.vr;
      if (frame > MAX * 0.6) p.alpha -= 0.025;
      p.alpha = Math.max(0, p.alpha);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    frame++;
    if (frame < MAX) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  requestAnimationFrame(draw);
}

function restartQuiz() {
  document.getElementById('quizResult').style.display = 'none';
  document.getElementById('quizSetup').style.display  = 'block';
}

function retryMissed() { startQuiz(missedDeck); }

// ── Expose ──
window.quizPillLevel    = quizPillLevel;
window.quizSelectWeek   = quizSelectWeek;
window.quizSelCat       = quizSelCat;
window.startQuiz        = startQuiz;
window.flipQuizCard     = flipQuizCard;
window.assess           = assess;
window.confirmEndQuiz   = confirmEndQuiz;
window.cancelEndQuiz    = cancelEndQuiz;
window.doEndQuiz        = doEndQuiz;
window.restartQuiz      = restartQuiz;
window.retryMissed      = retryMissed;

// ══════════════════════════════════════
