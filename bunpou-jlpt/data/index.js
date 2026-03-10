// DATA INDEX — Gabungkan semua database jadi satu array global
// Urutan load di index.html: n3-w1.js → dummy.js → index.js

// Tambahkan database baru di sini saat konten bertambah:
// const N3_W2 = [...]; → tambah N3_W2 ke array di bawah
// const N5 = [...];    → ganti N5_DUMMY dengan N5

window.grammarData = [
  ...N3_W1,
  // N3 Week 2–6 menyusul:
  // ...N3_W2,
  // ...N3_W3,
  // ...N3_W4,
  // ...N3_W5,
  // ...N3_W6,

  // Level lain menyusul (ganti dummy dengan data asli):
  ...N2_DUMMY,
  ...N1_DUMMY,
  ...N4_DUMMY,
  ...N5_DUMMY,
];

// Meta: info per level untuk UI (week count, tema, status)
window.levelMeta = {
  n1: {
    label: 'N1', name: 'Mahir Tinggi', total: 0,
    weeks: []  // akan diisi saat data asli tersedia
  },
  n2: {
    label: 'N2', name: 'Mahir', total: 0,
    weeks: []
  },
  n3: {
    label: 'N3', name: 'Menengah', total: 18,
    weeks: [
      {w:1, theme:'がんばらなくちゃ！',        ready: true},
      {w:2, theme:'がんばってごらん！',          ready: false},
      {w:3, theme:'もっとがんばってほしい！',    ready: false},
      {w:4, theme:'がんばるしかない！',          ready: false},
      {w:5, theme:'もっとがんばればよかった！',  ready: false},
      {w:6, theme:'もっとがんばることにした！',  ready: false},
    ]
  },
  n4: {
    label: 'N4', name: 'Dasar Menengah', total: 0,
    weeks: []
  },
  n5: {
    label: 'N5', name: 'Dasar', total: 0,
    weeks: []
  },
};

// Auto-hitung total per level dari data nyata (non-dummy)
Object.keys(window.levelMeta).forEach(lv => {
  window.levelMeta[lv].total = window.grammarData.filter(
    d => d.level === lv && d.cat !== 'dummy'
  ).length;
});

