var boydMap;

//function to instantiate the Leaflet map
function createMap(){
  boydMap = L.map('map',{
    center: [73,-27],
    zoom: 9
  });

  //add OSM baselayer
  L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}').addTo(boydMap);

  //call getData function
  getData(boydMap);
};
