# 📚 Bunpou JLPT — 日本語文法

> Referensi & Quiz Tata Bahasa Jepang JLPT N1–N5  
> Progressive Web App · Offline · SRS · Streak

[![Deploy to GitHub Pages](https://github.com/YOUR_USERNAME/bunpou-jlpt/actions/workflows/deploy.yml/badge.svg)](https://github.com/YOUR_USERNAME/bunpou-jlpt/actions/workflows/deploy.yml)

---

## 🌐 Live Demo

**→ https://YOUR_USERNAME.github.io/bunpou-jlpt**

---

## ✨ Fitur

| Fitur | Status |
|---|---|
| 📚 Browse grammar cards (N3 W1 — 18 pola) | ✅ |
| 🎯 Quiz Flip Card + self-assess | ✅ |
| ✏️ Quiz Fill-in (kalimat berlubang) | ✅ (5 soal demo N3 W1) |
| ⚡ Quick Review (SRS due today) | ✅ |
| 🧠 SRS SM-2 (Anki algorithm) | ✅ |
| 📊 Progress Panel (Mature/Young/Learning) | ✅ |
| 🔥 Day Streak + broken animation | ✅ |
| 👆 Swipe gesture di quiz | ✅ |
| 🎉 Confetti + Score Ring animasi | ✅ |
| ☀️🌙 Light / Dark mode | ✅ |
| 📱 PWA — installable + offline | ✅ |
| 🔖 Bookmark | ✅ |
| N3 W2–W6 content | 🚧 |
| N1, N2, N4, N5 content | 🚧 |

---

## 🚀 Deploy ke GitHub Pages

### 1. Fork / Clone repo ini

```bash
git clone https://github.com/YOUR_USERNAME/bunpou-jlpt.git
cd bunpou-jlpt
```

### 2. Enable GitHub Pages via Actions

Di repo GitHub kamu:
1. Buka **Settings → Pages**
2. Di bawah **Source**, pilih **GitHub Actions**
3. Push ke branch `main` — workflow otomatis deploy!

### 3. Akses

```
https://YOUR_USERNAME.github.io/bunpou-jlpt/
```

---

## 📁 Struktur Project

```
bunpou-jlpt/
├── index.html              # App shell — HTML utama
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker (offline support)
│
├── css/
│   └── style.css           # Semua styling (~1450 baris)
│
├── js/
│   ├── browse.js           # Browse page: filter, render, progress panel
│   ├── quiz.js             # Flip card quiz logic
│   ├── fillin.js           # Fill-in quiz mode
│   ├── srs.js              # SM-2 SRS + Streak + Swipe + Theme + Init
│   └── app.js              # Core: localStorage, tabs, PWA install
│
├── data/
│   ├── n3-w1.js            # ✅ N3 Week 1 — 18 pola grammar
│   ├── dummy.js            # Placeholder N1/N2/N4/N5
│   ├── bank-soal.js        # Bank soal fill-in (5 demo N3 W1)
│   └── index.js            # Gabungkan semua data + levelMeta
│
└── .github/
    └── workflows/
        └── deploy.yml      # Auto-deploy ke GitHub Pages
```

---

## ➕ Menambah Konten Baru

### Tambah N3 Week 2

1. Buat file `data/n3-w2.js` dengan format:

```js
const N3_W2 = [
  {
    id: 'n3-w2d1-01', level: 'n3', week: 2, day: 1, cat: 'ekspresi',
    grammar: '〜ばかり', reading: '〜bakari',
    meaning: 'Hanya... / Baru saja...',
    connection: 'V普通形／Nばかり',
    desc: 'Penjelasan dengan <strong>bold ok</strong>',
    nuance: 'Catatan opsional',
    examples: [
      { jp: 'Kalimat <b>pola</b>。', id: 'Terjemahan.' }
    ]
  },
  // ... dst
];
```

2. Tambahkan ke `index.html`:
```html
<script src="./data/n3-w2.js"></script>
```
*(sebelum `bank-soal.js`)*

3. Update `data/index.js`:
```js
window.grammarData = [
  ...N3_W1,
  ...N3_W2,  // ← uncomment / tambahkan ini
  ...
];
```

4. Update `levelMeta` di `data/index.js`, set `ready: true` untuk Week 2.

### Tambah Bank Soal Fill-in

Di `data/bank-soal.js`, tambah entry baru:

```js
{
  id: 'bs-n3-w2-01', level: 'n3', week: 2, type: 'fill_in',
  sentence: 'ご飯を食べた▢、すぐ寝た。',
  choices: ['ばかりで', 'だけで', 'からこそ', 'ために'],
  answer: 0,
  grammarId: 'n3-w2d1-01',
  explanation: '〜ばかりで = baru saja setelah melakukan X.'
}
```

---

## 🗃️ SRS Data Format

Tersimpan di `localStorage` key `bunpou_srs`:

```js
{
  "n3-w1d1-01": {
    reps: 3,          // jumlah review benar berurutan
    interval: 6,      // hari sampai review berikutnya
    ef: 2.5,          // ease factor (1.3 – 3.0)
    due: 20180,       // due date (days since epoch)
    lastReview: 20174,
    history: [{ date: 20174, q: 4 }, ...]
  }
}
```

Status kartu: `new` · `learning` (interval <7) · `young` (7–20) · `mature` (≥21)

---

## 📜 License

MIT — bebas dipakai, dimodifikasi, dan didistribusikan.

---

*Dibuat dengan ❤️ untuk belajar bahasa Jepang*
