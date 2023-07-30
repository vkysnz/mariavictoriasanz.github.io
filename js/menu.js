(function(){
  const openBottom = document.querySelector('.menu__menu');
  const nav = document.querySelector('.menu__link--menu');
  const closenav = document.querySelector('.menu__close');

  openBottom.addEventListener('click', ()=>{
    nav.classList.add('menu__link--show');
  });

  closenav.addEventListener('click', ()=>{
    nav.classList.remove('menu__link--show');
  });
})();

window.onload = function() {
    const miVideo = document.getElementById('miVideo');
  
    // Función para reproducir el video
    function reproducirVideo() {
      miVideo.play();
    }
  
    // Función para pausar el video
    function pausarVideo() {
      miVideo.pause();
    }
  
    // Puedes añadir más funciones o interacciones con el video aquí
  
    // Ejemplo de cómo reproducir el video automáticamente cuando se carga la página
    reproducirVideo();
  };
  
