
const btnMenu = document.querySelector(".btn-menu");
const btnClose = document.querySelector(".btn-close");
const navMenu = document.querySelector("header > nav")
const main = document.querySelector("main");

btnMenu.addEventListener("click", () => {
  btnMenu.style.display = "none";
  btnClose.style.display = "block";
  navMenu.style.display = "flex";
  main.style.display = "none"
}); 

btnClose.addEventListener("click", () => {
  btnMenu.style.display = "block";
  btnClose.style.display = "none";
  navMenu.style.display = "none";
  main.style.display = "block"
}); 

mapboxgl.accessToken = "pk.eyJ1IjoiamltYnJpZyIsImEiOiJjbHN0OGNidjQwbnE4Mmlsb3k0ajl2dG1wIn0.XRn2bYCu3pCPFqa0hRIoTw";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/navigation-night-v1",
  center: [4.292924486608561, 39.878564402477224], // starting position [lng, lat]
  zoom: 15 // starting zoom
});

const marker = new mapboxgl.Marker()
  .setLngLat([4.292924486608561, 39.878564402477224])
  .addTo(map)