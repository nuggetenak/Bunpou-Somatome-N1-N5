// DUMMY DATA — Placeholder N1, N2, N4, N5
// Konten asli akan diisi dari PDF Soumatome masing-masing level

const makeDummy = (level, weeks, daysPerWeek) =>
  Array.from({length: weeks}, (_,wi) =>
    Array.from({length: daysPerWeek}, (_,di) => {
      const x = String.fromCharCode(65 + di); // A, B, C...
      return {
        id: `${level}-w${wi+1}d${di+1}-dummy`,
        level, week: wi+1, day: di+1, cat: 'dummy',
        grammar: `〜${x}${x.toLowerCase()}${x}（${level.toUpperCase()}）`,
        reading: `〜${x.toLowerCase()}${x.toLowerCase()} dummy`,
        meaning: `[DUMMY] Placeholder ${level.toUpperCase()} Week ${wi+1} — konten asli menyusul`,
        connection: `V＋${x}${x}`,
        desc: `Kartu <strong>placeholder</strong> untuk ${level.toUpperCase()} Week ${wi+1} Day ${di+1}. Konten akan diisi dari PDF Soumatome ${level.toUpperCase()}.`,
        nuance: 'Kartu dummy — belum ada konten.',
        examples: [
          {jp: `例文${x}。これはダミーカードです。`, id: `Contoh kalimat ${x} dummy.`},
          {jp: `例文${x}${x}。まだ内容がありません。`, id: `Kalimat dummy ${x}${x}.`}
        ]
      };
    })
  ).flat();

const N5_DUMMY = makeDummy('n5', 4, 3);
const N4_DUMMY = makeDummy('n4', 4, 3);
const N2_DUMMY = makeDummy('n2', 3, 2);
const N1_DUMMY = makeDummy('n1', 3, 2);

