// docs/vital123/js/api.js
const WEBAPP_URL = 'COLOCA_AQUI_TU_DEPLOY_DE_APPS_SCRIPT'; // e.g. https://script.google.com/macros/s/AKfycb.../exec

async function postJSON(url, data){
  const res = await fetch(url, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Error ${res.status}: ${msg}`);
  }
  return res.json().catch(()=>({ok:true}));
}