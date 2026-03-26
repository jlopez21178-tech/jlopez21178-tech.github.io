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


if (window.innerWidth > 1025) {
  const btnNav = document.querySelectorAll(".nav-item a");
  btnNav.forEach((btn) => {
    if(btn.href == window.location.href){
      btn.classList.add("btn-focus");
    };
  });
}
