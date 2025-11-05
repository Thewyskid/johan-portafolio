// docs/vital123/js/consentimiento.js
function signaturePad(canvas){
  const ctx = canvas.getContext('2d');
  let drawing=false, last=null;
  const getPos = (e)=> {
    const r = canvas.getBoundingClientRect();
    const t = e.touches?.[0] || e;
    return {x: (t.clientX - r.left), y: (t.clientY - r.top)};
  };
  const start = (e)=>{ drawing=true; last=getPos(e); };
  const move = (e)=> {
    if (!drawing) return;
    const p = getPos(e);
    ctx.strokeStyle = '#333'; ctx.lineWidth = 2; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(last.x,last.y); ctx.lineTo(p.x,p.y); ctx.stroke();
    last = p; e.preventDefault();
  };
  const end = ()=>{ drawing=false; };
  canvas.addEventListener('mousedown',start);
  canvas.addEventListener('mousemove',move);
  canvas.addEventListener('mouseup',end);
  canvas.addEventListener('mouseleave',end);
  canvas.addEventListener('touchstart',start,{passive:false});
  canvas.addEventListener('touchmove',move,{passive:false});
  canvas.addEventListener('touchend',end);
  return {
    clear(){ ctx.clearRect(0,0,canvas.width,canvas.height); },
    toDataURL(){ return canvas.toDataURL('image/png'); }
  };
}

document.addEventListener('DOMContentLoaded', async () => {
  initFirebase();
  const user = await requireAuth();
  const ins = JSON.parse(localStorage.getItem('vital123_inscripcion')||'{}');
  const ag = JSON.parse(localStorage.getItem('vital123_agenda')||'{}');

  const canvas = document.getElementById('pad');
  const pad = signaturePad(canvas);
  document.getElementById('clear').addEventListener('click', ()=> pad.clear());

  const form = document.getElementById('consForm');
  const msg = document.getElementById('msg');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.textContent = '';
    if (!document.getElementById('acepto').checked){
      msg.textContent = 'Debes aceptar los términos.';
      return;
    }

    const payload = {
      tipo: 'nueva_cita',
      usuario: user?.email || ins.email,
      inscripcion: ins,
      agenda: ag,
      consentimiento: {
        acepto: true,
        firmaDataUrl: pad.toDataURL()
      }
    };

    try{
      await postJSON(WEBAPP_URL, payload);
      // Limpia estado local
      localStorage.removeItem('vital123_inscripcion');
      localStorage.removeItem('vital123_agenda');
      window.location.href = 'exito.html';
    }catch(err){
      msg.textContent = err.message;
    }
  });
});