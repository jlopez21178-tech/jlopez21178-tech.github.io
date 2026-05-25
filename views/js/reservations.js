// Datos del restaurante. Como ya esta en el local storage no importa tenerlo, pero lo dejo por si acaso
const restaurantInformation = {
  diesTancats: [1, 2],
  horaObertura: "21:00",
  horaTancament: "02:00",
};

localStorage.setItem("restaurantInfo", JSON.stringify(restaurantInformation));

// funcionalidades de los distintos pasos

const nextBtn = document.querySelector(".next-btn");
const backBtn = document.querySelector(".back-btn");

let num = 1;
const steps = document.querySelectorAll(".reservation-info article");
const formDatosPersonales = document.querySelector(".step-1 form");
const formFecha = document.querySelector(".step-2 form");

const finishRes = document.querySelector(".finished-reservation");
const title = document.querySelector(".title");
const resInfo = document.querySelector(".reservation-info");

// Esconde todos los pasos menos el inicial, cuando estan en movil o tablet

if (window.innerWidth < 1024) {
  for (let i = 1; i < steps.length; i++) {
    steps[i].style.display = "none";
  }

  nextBtn.addEventListener("click", () => {
    if (num == steps.length - 1) {
      nextBtn.textContent = "Finalizar reserva";
      nextBtn.classList.add("finish-btn");
    } else {
      nextBtn.textContent = "Siguiente";
      nextBtn.classList.remove("finish-btn");
    }

    if (emptyFields()) {
      alert("Rellena todos los campos");
    } else {
      // Enviar formulario al clickar next estando en el ultimo paso
      if (num == steps.length) {
        if (enviarFormulario()) {
          title.style.display = "none";
          resInfo.style.display = "none";
          showFinishReservation();
          completeReservation();
          return;
        }
      }

      num = Math.min(++num, steps.length);
      steps.forEach((step) => {
        step.style.display = step.className == "step-" + num ? "" : "none";
      });
    }
  });

  backBtn.addEventListener("click", () => {
    nextBtn.textContent = "Siguiente";
    nextBtn.classList.remove("finish-btn");

    num = Math.max(--num, 1);
    steps.forEach((step) => {
      step.style.display = step.className == "step-" + num ? "" : "none";
    });
  });
} else {
  nextBtn.textContent = "Finalizar reserva";
  nextBtn.classList.add("finish-btn");
  backBtn.style.display = "none";

  nextBtn.addEventListener("click", () => {
    if (emptyFields()) {
      alert("Rellena todos los campos");
    } else {
      if (enviarFormulario()) {
        title.style.display = "none";
        resInfo.style.display = "none";
        showFinishReservation();
        completeReservation();
      }
    }
  })
}


// Comprueba que en los forms no haya campos vacios
function emptyFields() {
  // Si es el 3 significa que es el paso de los extras
  // al no haber form devolvemos false, ya que si no no deja avanzar
  if (num == 3) return false;

  const form = document.querySelector(".step-" + num + " form");
  const fields = form.querySelectorAll("input");
  let empty = false;

  fields.forEach((field) => {
    if (field.value === "") empty = true;
  });

  return empty;
}

function showFinishReservation() {
  const infoReserva = JSON.parse(localStorage.getItem("infoReserva"));
  finishRes.style.display = "flex";
  document.querySelector(".finished-reservation .fecha").textContent =
    infoReserva.date;
  document.querySelector(".finished-reservation .hora").textContent =
    infoReserva.hour;
  document.querySelector(".finished-reservation .nombre").textContent =
    infoReserva.nom;
  document.querySelector(".finished-reservation .email").textContent =
    infoReserva.email;
  document.querySelector(".finished-reservation .telefono").textContent =
    infoReserva.telephone;
  document.querySelector(".finished-reservation .comensales").textContent =
    infoReserva.comensals;
}

function completeReservation() {
  // Añadimos el contenido al array de reservas completadas
  const arrayReservas = JSON.parse(localStorage.getItem("arrayReservas")) || [];
  arrayReservas.push(info);
  localStorage.setItem("arrayReservas", JSON.stringify(arrayReservas));
}

// Comprobar que el campo nom tiene al menos 3 letras al quitar el focus
const nomField = formDatosPersonales.inNom;

nomField.addEventListener("blur", () => {
  if (nomField.value.length < 3) {
    nomField.style.borderColor = "white";
    alert("Introduce minimo 3 characteres para el nombre");
  } else {
    nomField.style.borderColor = "";
  }
});

function enviarFormulario() {
  // Coge la id de todos los extras seleccionados
  const extras = [];
  document.querySelectorAll(".step-3 .item").forEach((item) => {
    if (item.children[1].classList.contains("active")) {
      extras.push(item.id);
    }
  });

  // Primero guarda la informacion y luego la compara
  let info = {
    nom: formDatosPersonales.inNom.value,
    telephone: formDatosPersonales.inPhone.value,
    email: formDatosPersonales.inEmail.value,
    comensals: formDatosPersonales.numComensales.value,
    date: formFecha.fecha.value,
    hour: formFecha.hora.value,
    extras: extras,
  };

  localStorage.setItem("infoReserva", JSON.stringify(info));

  // devuelve true o false
  return validateInformation();
}

// 'Function' para pasar una hora
// a minutos
// usada para verificar fechas
const toMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

function validateInformation() {
  let validRes = true;

  const infoReserva = JSON.parse(localStorage.getItem("infoReserva"));
  const infoRestaurant = JSON.parse(localStorage.getItem("restaurantInfo"));

  // Datos reserva
  const [day, month, year] = infoReserva.date.split("/").map(Number);
  const [hour, minute] = infoReserva.hour.split(":").map(Number);
  const reservationDate = new Date(year, month - 1, day, hour, minute);

  // Datos restaurante
  const closedDay = infoRestaurant.diesTancats.includes(
    reservationDate.getDay(),
  );

  const horaReserva = toMinutes(infoReserva.hour);
  const horaApertura = toMinutes(infoRestaurant.horaObertura);
  const horaCierre = toMinutes(infoRestaurant.horaTancament);

  const fueraDeHorario = horaApertura > horaReserva && horaCierre < horaReserva;

  const tablesUnavailable = checkTables(infoReserva);

  if (closedDay || fueraDeHorario) {
    alert("Fecha no valida. El restaurante esta cerrado");
    validRes = false;
  }

  if (tablesUnavailable) {
    alert("Fecha no valida. No hay mesas disponibless");
    validRes = false;
  }

  return validRes;
}

// Comprovar que hay mesas disponibles
// recorrer el array de reservas y ver si hay alguna
// con una fecha similar
function checkTables(reserva) {
  const arrRes = JSON.parse(localStorage.getItem("arrayReservas")) || [];

  let [day, month, year] = reserva.date.split("/").map(Number);
  let [hour, minute] = reserva.hour.split(":").map(Number);
  const reservationDate = new Date(year, month - 1, day, hour);

  // 'some' casi igual que el for each, pero en vez de
  // reccorer todo el array, se para cuando encuentra la primera coincidencia
  return arrRes.some((res) => {
    [day, month, year] = res.date.split("/").map(Number);
    [hour, minute] = res.hour.split(":").map(Number);
    const reservedDate = new Date(year, month - 1, day, hour);

    return reservedDate.getTime() === reservationDate.getTime();
  });
}

// Funcionalidad calendario

flatpickr("#datepicker", {
  locale: "es",
  minDate: "today",
  dateFormat: "d/m/Y",
  disableMobile: true,
});

// Paso 3. extras selector

const items = document.querySelectorAll(".step-3 .item");

items.forEach((item) => {
  item.addEventListener("click", () => {
    // [1] -> posicion del div "marcad"
    item.children[1].classList.toggle("active");
  });
});
