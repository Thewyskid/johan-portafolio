// docs/vital123/js/agenda.js
document.addEventListener('DOMContentLoaded', async () => {
  initFirebase();
  await requireAuth();
  const form = document.getElementById('agForm');
  const msg = document.getElementById('msg');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
      servicio: document.getElementById('servicio').value,
      fecha: document.getElementById('fecha').value,
      hora: document.getElementById('hora').value,
      duracion: parseInt(document.getElementById('duracion').value, 10)
    };
    localStorage.setItem('vital123_agenda', JSON.stringify(data));
    window.location.href = 'consentimiento.html';
  });
});