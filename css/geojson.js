var boydMap;

//function to instantiate the Leaflet map
function createMap(){
  boydMap = L.map('map',{
    center: [20,0],
    zoom: 2
  });

  //add OSM baselayer
  L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}').addTo(mymap);

  //call getData function
  getData(boydMap);
};
