/*Loop*/

var time = new Date();
var deltaTime = 0;

if (document.readyState === "complete" || document.readyState === "interactive") {
  setTimeout(Init, 1);
} else {
  document.addEventListener("DOMContentLoaded", Init);
}

function Init() {
  time = new Date();
  Start();
  Loop();
}

function Loop() {
  deltaTime = (new Date() - time) / 1000;
  time = new Date();
  Update()
  requestAnimationFrame(Loop)
}


/*Funcionamiento*/

var fondoY = 22;
var velY = 0;
var impulso = 900;
var gravedad = 2500

var jugadorxPosx = 42;
var jugadorxPosY = fondoY;

var fondoX = 0;
var velEscenario = 1280 / 3
var gameVel = 1
var puntaje = 0;

var parado = false;
var saltando = false;

var juego;
var jugadorx;
var textopuntaje;
var fondo;
var gameOver;

var tiempoHastaObstaculo = 2;
var tiempoObstaculoMin = 0.7;
var tiempoObstaculoMax = 1.8;
var obstaculoPosY = 16;
var obstaculos = [];



function Start() {
  gameOver = document.querySelector(".perder");
  fondo = document.querySelector(".fondo");
  juego = document.querySelector(".juego");
  textopuntaje = document.querySelector(".puntaje");
  jugadorx = document.querySelector(".jugadorx");
  document.addEventListener("keydown", HandleKeyDown)
    mensajePerder = document.querySelector(".perder");
  
  

}

function HandleKeyDown(ev) {
  if (ev.keyCode == 32) {
    if (parado) {
     
      Reiniciar();
    } else {
      Saltar();
    }
  }
}

function Saltar(){
if (jugadorxPosY == fondoY){
  saltando = true;
  velY = impulso;
  jugadorx.classList.remove("jugadorx-corriendo");

}

}


function Update() {

  if(parado) return;
    MoverJuguadorx();
    Moverfondo();
    DecidirCrearObstaculos();

    MoverObstaculos();


    velY -= gravedad * deltaTime;
    DetectarColision();

}

function Moverfondo() {
  fondoX += CalcularDesplazamiento();
  fondo.style.left = -(fondoX % juego.clientWidth) + "px";


}

function CalcularDesplazamiento() {
  return velEscenario * deltaTime * gameVel;

}

function Estrellarse() {
  jugadorx.classList.remove("jugadorx-corriendo");
  jugadorx.classList.add("jugadorx-estrellado");
  parado = true;
}

function MoverJuguadorx(){
  jugadorxPosY += velY * deltaTime;
  if(jugadorxPosY < fondoY){
    TocarFondo();
  }
 jugadorx.style.bottom = jugadorxPosY+"px";

}

function TocarFondo(){
jugadorxPosY=fondoY;
velY = 0;
if (saltando){
jugadorx.classList.add("jugadorx-corriendo")

}
saltando = false;

}

function DecidirCrearObstaculos() {
  tiempoHastaObstaculo -= deltaTime;
  if(tiempoHastaObstaculo <= 0) {
      CrearObstaculo();
  }
}


function CrearObstaculo() {
  var obstaculo = document.createElement("div");
  juego.appendChild(obstaculo);
  obstaculo.classList.add("monstruo");
  if(Math.random() > 0.3) obstaculo.classList.add("monstruo2");
  obstaculo.posX = juego.clientWidth;
  obstaculo.style.left = juego.clientWidth+"px";

  obstaculos.push(obstaculo);
  tiempoHastaObstaculo = tiempoObstaculoMin + Math.random() * (tiempoObstaculoMax-tiempoObstaculoMin) / gameVel;
}

function MoverObstaculos() {
  for (var i = obstaculos.length - 1; i >= 0; i--) {
      if(obstaculos[i].posX < -obstaculos[i].clientWidth) {
          obstaculos[i].parentNode.removeChild(obstaculos[i]);
          obstaculos.splice(i, 1);
          GanarPuntos();
      }else{
          obstaculos[i].posX -= CalcularDesplazamiento();
          obstaculos[i].style.left = obstaculos[i].posX+"px";
      }
  }
}

function GanarPuntos() {
  puntaje++;
  textopuntaje.innerText = puntaje;
  if(puntaje == 20){
      gameVel = 1.2;
     
  }else if(puntaje == 40) {
      gameVel = 1.7;
      
  } else if(puntaje == 60) {
      gameVel = 2.3;
    
  }
  fondo.style.animationDuration = (3/gameVel)+"s";
}

function DetectarColision() {
  for (var i = 0; i < obstaculos.length; i++) {
    if (obstaculos[i].posX > jugadorxPosx + jugadorx.clientWidth) {
     
      break; 
    } else {
      if (IsCollision(jugadorx, obstaculos[i], 10, 30, 15, 20)) {
        Estrellarse(); 
        GameOver();
      }
    }
  }
}


function IsCollision(a, b, paddingTop, paddingRight, paddingBottom, paddingLeft) {
  var aRect = a.getBoundingClientRect();
  var bRect = b.getBoundingClientRect();

  return !(
      ((aRect.top + aRect.height - paddingBottom) < (bRect.top)) ||
      (aRect.top + paddingTop > (bRect.top + bRect.height)) ||
      ((aRect.left + aRect.width - paddingRight) < bRect.left) ||
      (aRect.left + paddingLeft > (bRect.left + bRect.width))
  );
}


function GameOver() {
  Estrellarse();
  gameOver.style.display = "block";
}

function Reiniciar() {

  mensajePerder.style.display = "none";

  
  puntaje = 0;
  textopuntaje.innerText = puntaje;
  parado = false;
  saltando = false;
  velY = 0;
  jugadorxPosY = fondoY;
  fondoX = 0;

 
  jugadorx.style.bottom = jugadorxPosY + "px";
  jugadorx.classList.remove("jugadorx-estrellado");

 
  ReiniciarObstaculos();

  
  Loop();
}

function ReiniciarObstaculos() {
  for (var i = obstaculos.length - 1; i >= 0; i--) {
    obstaculos[i].parentNode.removeChild(obstaculos[i]);
    obstaculos.splice(i, 1);
  }
  tiempoHastaObstaculo = 0; 
}