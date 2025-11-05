document.addEventListener('DOMContentLoaded', function () {
  var y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();
});
document.addEventListener('DOMContentLoaded', function () {
  var exp = document.querySelector('details.exp');
  var btn = document.getElementById('expBtn');
  if (exp && btn) {
    var setLabel = function () {
      btn.textContent = exp.open ? 'Ocultar experiencia' : 'Ver experiencia';
    };
    setLabel();
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      exp.open = !exp.open;
      setLabel();
    });
  }
});
