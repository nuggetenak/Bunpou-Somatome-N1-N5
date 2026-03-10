//  FILL-IN QUIZ MODE
// ══════════════════════════════════════
let quizMode = 'flip'; // 'flip' | 'fill'
let fillDeck = [], fillIdx = 0, fillCorrect = 0, fillWrong = 0;
let fillAnswered = false;

window.setQuizMode = function(mode, btn) {
  quizMode = mode;
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
};

// Override startQuiz to route based on mode
const _origStartQuiz = window.startQuiz;
window.startQuiz = function(deck) {
  if (quizMode === 'fill') { startFillQuiz(); return; }
  _origStartQuiz(deck);
};

function startFillQuiz() {
  const pool = (window.getBankSoal || (() => []))({
    level: quizLevel,
    week:  quizWeek
  });

  // hide setup, show fill-in active
  document.getElementById('quizSetup').style.display  = 'none';
  document.getElementById('quizActive').style.display = 'none';
  document.getElementById('quizResult').style.display = 'none';
  document.getElementById('fillInActive').style.display = 'block';

  if (!pool.length) {
    // Coming soon state
    document.getElementById('fillCard').innerHTML = `
      <div class="fill-coming-soon">
        <div class="cs-icon">🚧</div>
        <h3>Soal belum tersedia</h3>
        <p>Bank soal untuk level/minggu ini sedang disiapkan.<br>
        Sementara coba <strong>N3 Week 1</strong> yang sudah ada 5 soal!</p>
      </div>`;
    document.getElementById('fillProgressTxt').textContent = '0 / 0';
    document.getElementById('fillProgressFill').style.width = '0%';
    document.getElementById('fillScoreTxt').innerHTML = '—';
    return;
  }

  fillDeck = pool.sort(() => Math.random() - 0.5);
  fillIdx = 0; fillCorrect = 0; fillWrong = 0;
  showFillQuestion();
}

function showFillQuestion() {
  if (fillIdx >= fillDeck.length) { showFillResult(); return; }
  fillAnswered = false;
  const q = fillDeck[fillIdx];

  // Progress
  const pct = fillDeck.length ? (fillIdx / fillDeck.length * 100) : 0;
  document.getElementById('fillProgressFill').style.width = pct + '%';
  document.getElementById('fillProgressTxt').textContent = `${fillIdx} / ${fillDeck.length}`;
  document.getElementById('fillScoreTxt').innerHTML = `✅ ${fillCorrect} &nbsp; ❌ ${fillWrong}`;

  // Level badge
  const badge = document.getElementById('fillLevelBadge');
  badge.textContent = q.level.toUpperCase();
  badge.style.cssText = `background:var(--${q.level}-dim);color:var(--${q.level});border:1px solid var(--${q.level}-border);`;

  // Sentence with blank
  const sentenceHtml = q.sentence.replace('▢',
    `<span class="fill-blank" id="fillBlankSpan">　　　</span>`
  );
  document.getElementById('fillSentence').innerHTML = sentenceHtml;

  // Grammar hint (linked grammar point)
  const linked = (window.grammarData || []).find(d => d.id === q.grammarId);
  document.getElementById('fillGrammarHint').textContent =
    linked ? `関連: ${linked.grammar} — ${linked.meaning}` : '';

  // Shuffle choices
  const shuffled = [...q.choices].map((c, i) => ({ c, i }))
                                  .sort(() => Math.random() - 0.5);
  document.getElementById('fillChoices').innerHTML = shuffled.map(({ c, i }) =>
    `<button class="fill-choice" onclick="fillAnswer(${i}, this)" data-idx="${i}">${c}</button>`
  ).join('');

  // Hide feedback
  document.getElementById('fillFeedback').style.display = 'none';

  // Reanimate card
  const card = document.getElementById('fillCard');
  card.style.animation = 'none';
  requestAnimationFrame(() => { card.style.animation = ''; });
}

window.fillAnswer = function(choiceIdx, btn) {
  if (fillAnswered) return;
  fillAnswered = true;
  const q = fillDeck[fillIdx];
  const correct = (choiceIdx === q.answer);

  if (correct) { fillCorrect++; } else { fillWrong++; }

  // Update blank
  const blank = document.getElementById('fillBlankSpan');
  if (blank) {
    blank.textContent = q.choices[q.answer];
    blank.className = 'fill-blank ' + (correct ? 'answered-correct' : 'answered-wrong');
  }

  // Style choices
  document.querySelectorAll('.fill-choice').forEach(b => {
    const idx = parseInt(b.dataset.idx);
    b.classList.add('disabled');
    if (idx === q.answer) b.classList.add('reveal-correct');
    if (b === btn && !correct) b.classList.add('selected-wrong');
    if (b === btn && correct)  b.classList.add('selected-correct');
  });

  // Show feedback
  const feedback = document.getElementById('fillFeedback');
  const verdict  = document.getElementById('fillVerdict');
  const expl     = document.getElementById('fillExplanation');
  verdict.textContent = correct ? '✅ Benar!' : '❌ Kurang tepat';
  verdict.style.color = correct ? '#34D399' : '#F87171';
  expl.textContent    = q.explanation || '';
  feedback.style.display = 'block';

  // Update score display
  document.getElementById('fillScoreTxt').innerHTML = `✅ ${fillCorrect} &nbsp; ❌ ${fillWrong}`;
};

window.fillNext = function() {
  fillIdx++;
  showFillQuestion();
};

function showFillResult() {
  document.getElementById('fillInActive').style.display = 'none';
  // Reuse existing result screen, inject fill stats
  const played = fillDeck.length;
  const pct    = played > 0 ? Math.round(fillCorrect / played * 100) : 0;
  qKnow   = fillCorrect;
  qUnsure = 0;
  qForgot = fillWrong;
  quizDeck = fillDeck;
  quizIdx  = played;
  missedDeck = [];
  showResult();
}

window.endFillQuiz = function() {
  document.getElementById('fillInActive').style.display = 'none';
  showFillResult();
};

// restartQuiz patch to also hide fill-in
const _origRestartQuiz = window.restartQuiz;
window.restartQuiz = function() {
  document.getElementById('fillInActive').style.display = 'none';
  document.getElementById('quizResult').style.display = 'none';
  document.getElementById('quizSetup').style.display  = 'block';
  if (window.updateQuickReviewCard) window.updateQuickReviewCard();
};


