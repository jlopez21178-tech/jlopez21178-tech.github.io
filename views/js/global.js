const file = "./menu_navegacion.html"

fetch(file)
  .then(x => x.text())
  .then(y => {
    document.querySelector("header").innerHTML = y
    init()
  })

function init() {

  const btnMenu = document.querySelector(".btn-menu");
  const btnClose = document.querySelector(".btn-close");
  const navMenu = document.querySelector(".navegacio");
  const main = document.querySelector("main");

  btnMenu.addEventListener("click", () => {
    btnMenu.style.display = "none";
    btnClose.style.display = "block";
    navMenu.style.display = "flex";
    main.style.display = "none";
  });

  btnClose.addEventListener("click", () => {
    btnMenu.style.display = "block";
    btnClose.style.display = "none";
    navMenu.style.display = "none";
    main.style.display = "block";
  });

  const btnNav = document.querySelectorAll(".nav-item p");

  btnNav.forEach((btn) => {
    btn.addEventListener("click", () => {
      window.location = "http://127.0.0.1:5500/Projecte/views/html/" + btn.id + ".html";
    })
  })

  if (window.innerWidth > 1025) {

    btnNav.forEach((btn) => {
      const url = window.location.href

      if (url.endsWith(btn.id + ".html")) btn.classList.add("btn-focus")
    })
  }
}

