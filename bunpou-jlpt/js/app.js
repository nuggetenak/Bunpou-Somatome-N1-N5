//  app.js — Core: localStorage, tabs, PWA, install modal
// ══════════════════════════════════════

// ── localStorage keys ──
const LS_PROGRESS  = 'bunpou_progress';
const LS_BOOKMARKS = 'bunpou_bookmarks';
const LS_STREAK    = 'bunpou_streak';
const LS_THEME     = 'bunpou-theme';

window.progress  = {};
window.bookmarks = new Set();

function loadStorage() {
  try {
    const p = localStorage.getItem(LS_PROGRESS);
    window.progress = p ? JSON.parse(p) : {};
  } catch(e) { window.progress = {}; }
  try {
    const b = localStorage.getItem(LS_BOOKMARKS);
    window.bookmarks = b ? new Set(JSON.parse(b)) : new Set();
  } catch(e) { window.bookmarks = new Set(); }
}

window.saveProgress = function(id, result) {
  window.progress[id] = result;
  try { localStorage.setItem(LS_PROGRESS, JSON.stringify(window.progress)); } catch(e) {}
  if (window.updateProgressPanel) window.updateProgressPanel();
};

window.toggleBookmark = function(id, btn, e) {
  e.stopPropagation();
  if (window.bookmarks.has(id)) {
    window.bookmarks.delete(id);
    btn.textContent = '☆';
    btn.classList.remove('bookmarked');
  } else {
    window.bookmarks.add(id);
    btn.textContent = '⭐';
    btn.classList.add('bookmarked');
  }
  try { localStorage.setItem(LS_BOOKMARKS, JSON.stringify([...window.bookmarks])); } catch(e) {}
  updateBookmarkPill();
};

function updateBookmarkPill() {
  const pill = document.getElementById('pill-bookmark');
  if (!pill) return;
  const n = window.bookmarks.size;
  pill.textContent = n > 0 ? `⭐ ${n}` : '⭐ Bookmark';
}

// ── Tabs ──
window.switchTab = function(tab, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(tab + 'Page').classList.add('active');
};

// ── Install modal ──
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  const note = document.getElementById('directInstallNote');
  if (note) note.textContent = 'Browser kamu mendukung install langsung!';
});

window.showInstallModal = function() {
  document.getElementById('installOverlay').style.display = 'flex';
};
window.hideInstallModal = function() {
  document.getElementById('installOverlay').style.display = 'none';
};
window.switchOS = function(os, btn) {
  document.querySelectorAll('.os-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.install-steps').forEach(s => s.classList.remove('active'));
  document.getElementById('steps-' + os).classList.add('active');
};
window.triggerInstall = async function() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const result = await deferredPrompt.userChoice;
  deferredPrompt = null;
};

function registerSW() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}

// ── Offline badge ──
window.addEventListener('online',  () => document.getElementById('offlineBadge')?.classList.remove('show'));
window.addEventListener('offline', () => document.getElementById('offlineBadge')?.classList.add('show'));

// ══════════════════════════════════════
