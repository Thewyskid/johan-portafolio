// docs/vital123/js/auth.js
document.addEventListener('DOMContentLoaded', () => {
  initFirebase();
  const form = document.getElementById('authForm');
  const msg = document.getElementById('msg');
  const registerBtn = document.getElementById('registerBtn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.textContent = '';
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    try{
      await firebase.auth().signInWithEmailAndPassword(email, password);
      window.location.href = 'inscripcion.html';
    }catch(err){
      msg.textContent = err.message;
    }
  });

  registerBtn.addEventListener('click', async () => {
    msg.textContent = '';
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    try{
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      window.location.href = 'inscripcion.html';
    }catch(err){
      msg.textContent = err.message;
    }
  });
});