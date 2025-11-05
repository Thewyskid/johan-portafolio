// docs/vital123/js/base.js
// Configurar tu Firebase en firebaseConfig antes de usar auth.
let auth;
function initFirebase() {
  // Rellena esto en auth.html
  if (!window.firebase || !window.firebase.initializeApp) return;
  if (!window.firebase.apps?.length && window.firebaseConfig) {
    window.firebase.initializeApp(window.firebaseConfig);
  }
  auth = window.firebase.auth?.();
}

function requireAuth(redirectTo = 'auth.html') {
  return new Promise(resolve => {
    if (!auth) { resolve(null); return; }
    auth.onAuthStateChanged(user => {
      if (!user) window.location.href = redirectTo;
      resolve(user);
    });
  });
}

function $(sel, root=document){ return root.querySelector(sel); }
function $all(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }

function setUserNav(user){
  const el = document.getElementById('userNav');
  if (!el) return;
  if (user) {
    el.innerHTML = `<span>${user.email}</span> <button id="logoutBtn" class="btn secondary">Salir</button>`;
    const btn = document.getElementById('logoutBtn');
    btn?.addEventListener('click', () => auth?.signOut());
  } else {
    el.innerHTML = `<a href="auth.html" class="btn secondary">Ingresar</a>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initFirebase();
  if (auth) {
    auth.onAuthStateChanged(setUserNav);
  }
});