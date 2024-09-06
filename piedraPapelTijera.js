const posibilidades = ["piedra", "papel", "tijera"];
var actual = 0;
// Selección del input de nombre
let nombre = document.querySelector('input[type="text"]');

// Función para validar el nombre
function nombreCorrecto(nombreInput) {
  const regex = /^[^\d][\w]*$/;
  // Corrige el nombre de la propiedad de longitud a 'length'
  if (!regex.test(nombreInput.value) || nombreInput.value.length < 3) {
    nombreInput.classList.add("fondoRojo");
    console.log("nombre incorrecto");
    return false;
  } else {
    nombreInput.classList.remove("fondoRojo");
    return true;
  }
}

// Lógica del número
let partidasAJugar = document.querySelector('input[type="number"]');

// Función para validar el número
function numeroCorrecto(partidasInput) {
  // Comprueba si el número es mayor que 0 y si no es un NaN (al convertirlo a número)
  if (partidasInput.value > 0 && !isNaN(Number(partidasInput.value))) {
    partidasInput.classList.remove("fondoRojo");
    return true;
  } else {
    partidasInput.classList.add("fondoRojo");

    return false;
  }
}

// Lógica del botón "Jugar"

document.querySelector("button").addEventListener("click", () => {
  // Llamar a las funciones de validación
  if (!nombreCorrecto(nombre) || !numeroCorrecto(partidasAJugar)) {
    return; // Si alguna validación falla, se detiene la ejecución
  }

  partidasAJugar.setAttribute("disabled", "true");
  nombre.setAttribute("disabled", "true");
  // Actualizar el número de partidas totales y establecer el valor actual
  document.getElementById("total").innerText = partidasAJugar.value;
  //actual.innerText = 1; // Se asume que es un elemento de texto, no un input
});

//LOGICA PARA SELECCIONAR IMAGEN
const DivimagenesPinguinosJugador = document.getElementById("jugador");
let indexJugadorSeleccionado = -1; // Índice de la imagen seleccionada por el jugador
let indexPCSeleccionado = -1; // Índice de la imagen seleccionada por la PC

const imagenesJugadorPinguino =
  DivimagenesPinguinosJugador.getElementsByTagName("img");
const imagenesJugador = [
  "/img/piedraJugador.png",
  "/img/papelJugador.png",
  "/img/tijeraJugador.png",
];

Array.from(imagenesJugadorPinguino).forEach((element, index) => {
  element.src = imagenesJugador[index];
});

// LOGICA DE SELECCIONADO
Array.from(imagenesJugadorPinguino).forEach((element, index) => {
  if (element.classList.contains("seleccionado")) {
    indexJugadorSeleccionado = index;
  }
});
DivimagenesPinguinosJugador.addEventListener("click", (e) => {
  Array.from(imagenesJugadorPinguino).forEach((element) => {
    element.classList.remove("seleccionado");
    element.classList.add("noSeleccionado");
  });
  if (e.target.tagName === "IMG") {
    e.target.classList.remove("noSeleccionado");
    e.target.classList.add("seleccionado");
    indexJugadorSeleccionado = Array.from(imagenesJugadorPinguino).indexOf(
      e.target
    ); // Guardamos el índice de la imagen seleccionada por el jugador
  }
});

// logica de seleccionado de imagen por CPU y eleccion del ganador

const imagenesPC = [
  "/img/piedraOrdenador.png",
  "/img/papelOrdenador.png",
  "/img/tijeraOrdenador.png",
];

var imagenPc = document.querySelector('img[src="img/defecto.png"]');

function seleccionaImagenPC() {
  var random = Math.floor(Math.random() * imagenesPC.length);
  imagenPc.src = imagenesPC[random];
  indexPCSeleccionado = random;
}

//LOGICA DEL GANADOR
const ul = document.getElementById("historial");
function seleccionaGanador() {
  const reglas = {
    piedra: { piedra: "empate", papel: "pierde", tijera: "gana" },
    papel: { piedra: "gana", papel: "empate", tijera: "pierde" },
    tijera: { piedra: "pierde", papel: "gana", tijera: "empate" },
  };

  let jugadaJugador = posibilidades[indexJugadorSeleccionado]; // Usamos el array posibilidades
  let jugadaPC = posibilidades[indexPCSeleccionado];
  let historial = "";
  if (jugadaJugador === jugadaPC) {
    historial = "Empate";
  } else {
    historial = `El jugador ${reglas[jugadaJugador][jugadaPC]}`;
  }

  let li = document.createElement("li");
  li.innerText = historial;
  ul.appendChild(li);
}

//LOGICA BOTON YA

const botonYa = document.querySelectorAll("button")[1];

botonYa.addEventListener("click", () => {
  if (actual < partidasAJugar.value) {
    if (nombreCorrecto(nombre) && numeroCorrecto(partidasAJugar)) {
      seleccionaImagenPC();
      seleccionaGanador();
      actual++;
      document.getElementById("actual").innerText = actual;
    } else {
      nombreCorrecto(nombre);
      numeroCorrecto(partidasAJugar);
    }
  } else {
    console.log("Todas las partidas ya han sido jugadas.");
    return;
  }
});

//LOGICA DEL BUTON RESET...

const resetB = document.querySelectorAll("button")[2];
resetB.addEventListener("click", () => {
  partidasAJugar.value = "";
  partidasAJugar.removeAttribute("disabled");
  document.getElementById("actual").innerText = 0;
  document.getElementById("total").innerText = 0;
  actual = 0;
  let li = document.createElement("li");
  li.innerHTML = "<strong>NUEVA PARTIDA</strong>";
  ul.appendChild(li);
});
