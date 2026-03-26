mapboxgl.accessToken =
  "pk.eyJ1IjoiamltYnJpZyIsImEiOiJjbHN0OGNidjQwbnE4Mmlsb3k0ajl2dG1wIn0.XRn2bYCu3pCPFqa0hRIoTw";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/navigation-night-v1",
  center: [4.292924486608561, 39.878564402477224], // starting position [lng, lat]
  zoom: 15, // starting zoom
});

const marker = new mapboxgl.Marker()
  .setLngLat([4.292924486608561, 39.878564402477224])
  .addTo(map);
