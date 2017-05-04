// have to declare boydMap in the global scope to get some things working
var boydMap;

// function to instantiate the Leaflet map
function createMap() {

  boydMap = L.map('map', {
    center: [73, -27],
    zoom: 9,
    maxZoom: 13 // Esri World Imagery basemap doesn't work past this zoom level -- consider looking for another basemap? (Custom one from Mapbox?)
  });

  // add OSM baselayer
  L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}').addTo(boydMap);

  // call getData function
  getData(boydMap);

};

// function to retrieve data and place it on the map
function getData(map){

  // This is me just experimenting with ImageOverlay :) -BS
  /* -------------------------------------------------------------------------------------------------- */
  var imageUrl = 'http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
    imageBounds = [[40.712216, -74.22655], [40.773941, -74.12544]];
  var imageLayer = L.imageOverlay(imageUrl, imageBounds);
  imageLayer.setOpacity(0.8);
  imageLayer.addTo(map);

  // create event listener for opacity range slider
  $("#opacity-slider").on("change", function() {
    var sliderValue = $(this).val();
	imageLayer.setOpacity(sliderValue / 10);
	$("#current-opacity").html(sliderValue * 10 + "%");
  });

  // "go to Newark, NJ image" link
  $("#zoom-to-newark").on("click", function(e) {
    e.preventDefault();
	boydMap.setView([40.74, -74.17], 13);
  });
  /* -------------------------------------------------------------------------------------------------- */

  // load the data
  $.ajax("data/map.geojson", {
    dataType: "json",
    success: function(response) {

	  // create marker options
      var geojsonMarkerOptions = {
        radius: 10,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      };

      // create a Leaflet GeoJSON layer
      var geojsonLayer = L.geoJSON(response.features, {
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, geojsonMarkerOptions);
        }
      });

	  // create a Leaflet markercluster from the GeoJSON layer and add it to the map
	  var markers = L.markerClusterGroup({
		  spiderfyOnMaxZoom: false,
		  disableClusteringAtZoom: boydMap.options.maxZoom
	  });
	  markers.addLayer(geojsonLayer);
	  markers.addTo(map);
   }

 });

};

$(document).ready(createMap);
