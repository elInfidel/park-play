
var map;
var crs;

var currentLocation;

Init();

function Init()
{
	console.log("Initializing leaflet map");

	// Build custom coordinate reference object for dealing with australian geolocation data.
	crs = new L.Proj.CRS('EPSG:28355',
  		'+proj=utm +zone=55 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');

	// Instantiate our map
	map = L.map('mapid',
	{ 
		zoomControl:false 
	}).setView([-37.773524, 144.758334], 13);
	
	// Build a tile layer to display map data.
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibGlhbTExMzUiLCJhIjoiY2o1cGU5NWU5MDlrMjJxcGhxcWQ1ZGtscCJ9.gB_auIuL3Mz7WLeV8vM8CA', {
	    maxZoom: 18,
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    id: 'mapbox.streets'
	}).addTo(map);

	InitGeolocation();
}

function InitGeolocation()
{	
	// Locate user, also polls on a set interval
	map.locate({
		setView: false,
		maxZoom: 16,
		watch:   true,
		maxAge:  5000
	});

	// Geolocation handling
	function onLocationFound(e) 
	{
		currentLocation = e.latlng;

    	var radius = e.accuracy / 2;
    	L.marker(e.latlng).addTo(map).bindPopup("You are within " + radius + " meters from this point").openPopup();
    	//L.circle(e.latlng, radius).addTo(map);
	}
	map.on('locationfound', onLocationFound);

	// Geolocation error handling
	function onLocationError(e) 
	{
    	alert(e.message);
	}
	map.on('locationerror', onLocationError);
}

function LoadPlaygrounds(featureCollection)
{
	console.log("Loading playgrounds");
	//L.Proj.geoJson(featureCollection).addTo(map);
}

function LoadParks(featureCollection)
{
	console.log("Loading parks");
	L.Proj.geoJson(featureCollection).addTo(map);
}

function LoadOffLeash(featureCollection)
{
	console.log("Loading off-leash dog parks");
	//L.Proj.geoJson(featureCollection).addTo(map);
}

function IsNearby()
{
	
    return false;
}




	//L.circle([51.508, -0.11], {
	//	color: 'red',
	//	fillColor: '#f03',
	//	fillOpacity: 0.5,
	//	radius: 500
	//}).addTo(map);

	//L.polygon([
	//	[51.509, -0.08],
	//	[51.503, -0.06],
	//	[51.51, -0.047]
	//]).addTo(map);
