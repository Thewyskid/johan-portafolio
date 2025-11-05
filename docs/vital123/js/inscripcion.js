// docs/vital123/js/inscripcion.js
document.addEventListener('DOMContentLoaded', async () => {
  initFirebase();
  const user = await requireAuth();
  const form = document.getElementById('insForm');
  const msg = document.getElementById('msg');
  // Prefill email if logged in
  if (user) document.getElementById('email').value = user.email;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
      nombre: document.getElementById('nombre').value.trim(),
      doc: document.getElementById('doc').value.trim(),
      whatsapp: document.getElementById('whatsapp').value.trim(),
      email: document.getElementById('email').value.trim(),
      cabello: document.getElementById('cabello').value,
      historial: document.getElementById('historial').value.trim(),
    };
    // Guardar en localStorage como paso temporal
    localStorage.setItem('vital123_inscripcion', JSON.stringify(data));
    msg.textContent = 'Inscripción guardada.';
    window.location.href = 'agenda.html';
  });
});