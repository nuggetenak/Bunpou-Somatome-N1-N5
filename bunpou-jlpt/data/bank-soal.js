//  BANK SOAL — Fill-in Question Bank
//  Format: { id, level, week, type, sentence, blank, choices[], answer, grammarId, explanation }
//  type: 'fill_in' = kalimat berlubang pilihan ganda
//  blank ditandai dengan ▢ dalam sentence
//  answer = index di choices[] yang benar
// ══════════════════════════════════════

window.bankSoal = [
  // ── N3 Week 1 — 5 soal demo ──
  {
    id: 'bs-n3-w1-01', level: 'n3', week: 1, type: 'fill_in',
    sentence: '今日は早く帰ら▢。明日試験があるから。',
    choices: ['なくちゃ', 'なかった', 'ないで', 'ながら'],
    answer: 0,
    grammarId: 'n3-w1d1-03',
    explanation: '〜なくちゃ = 〜なければならない (keharusan, bentuk kasual). "Harus pulang cepat hari ini karena besok ada ujian."'
  },
  {
    id: 'bs-n3-w1-02', level: 'n3', week: 1, type: 'fill_in',
    sentence: 'あ、財布を家に忘れ▢！どうしよう。',
    choices: ['ちゃった', 'てしまいます', 'るところ', 'たばかり'],
    answer: 0,
    grammarId: 'n3-w1d2-01',
    explanation: '〜ちゃった = 〜てしまった (kasual, nuansa menyesal). "Aduh, dompet ketinggalan di rumah!"'
  },
  {
    id: 'bs-n3-w1-03', level: 'n3', week: 1, type: 'fill_in',
    sentence: '旅行の前に、ホテルを予約し▢ほうがいいよ。',
    choices: ['とく', 'たい', 'てから', 'てみる'],
    answer: 0,
    grammarId: 'n3-w1d2-03',
    explanation: '〜とく = 〜ておく (kasual, persiapan/advance action). "Sebelum perjalanan, lebih baik pesan hotel dulu."'
  },
  {
    id: 'bs-n3-w1-04', level: 'n3', week: 1, type: 'fill_in',
    sentence: '彼女は何を聞いても、笑う▢。全然答えてくれない。',
    choices: ['だけ', 'ために', 'ように', 'ながら'],
    answer: 0,
    grammarId: 'n3-w1d3-01',
    explanation: '〜だけ = hanya/cuma. "Dia hanya tertawa apapun yang ditanya. Sama sekali tidak mau menjawab."'
  },
  {
    id: 'bs-n3-w1-05', level: 'n3', week: 1, type: 'fill_in',
    sentence: '何度誘っても、彼は来よう▢。理由も言わない。',
    choices: ['としない', 'とする', 'としたら', 'としても'],
    answer: 0,
    grammarId: 'n3-w1d6-03',
    explanation: '〜ようとしない = tidak mau / tidak ada niat sama sekali. "Meski diajak berkali-kali, dia sama sekali tidak mau datang."'
  },
  // ── N3 Week 2+ — Coming Soon placeholder ──
  // {id:'bs-n3-w2-01', level:'n3', week:2, ...}

  // ── N1/N2/N4/N5 — Coming Soon ──
  // akan diisi saat konten PDF tersedia
];

// Helper: ambil soal berdasarkan filter
window.getBankSoal = function({ level = 'all', week = null } = {}) {
  return window.bankSoal.filter(q =>
    (level === 'all' || q.level === level) &&
    (week === null   || q.week  === week)
  );
};

