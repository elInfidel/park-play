
var map;
Init();

function Init()
{
	console.log("Initializing leaflet map");

	// Build custom coordinate reference object for dealing with australian geolocation data.
	var crs = new L.Proj.CRS('EPSG:28355',
  		'+proj=utm +zone=55 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
	
	// Instantiate our map
	map = L.map('mapid',
	{ 
		zoomControl:false, 
		crs:crs 
	});
	
	// Build a tile layer to display map data.
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	    maxZoom: 18,
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    id: 'mapbox.streets'
	}).addTo(map);
}

function LoadPlaygrounds(featureCollection)
{
	//console.log("Loading playgrounds");
	//features = featureCollection.features;

	//for(i = 0; i < features.length; i++)
	//{
	//	// Create a marker for each available playground
	//	properties = features[i].properties;
	//	L.marker([properties.lat, properties.long]).addTo(map);
	//}
}

function LoadParks(featureCollection)
{

}

function LoadOffLeash(featureCollection)
{
	console.log("Loading off-leash dog parks");
	features = featureCollection.features;

	for(i = 0; i < features.length; i++)
	{
		coordList = features[i].geometry.coordinates[0][0];

		// We pull x,y coords from given pos data.
		//var parsedCoords = [];
		//for(j = 0; j < coordList.length; j++)
		//{
		//	parsedCoords.push(coordList[j][0], coordList[j][1])
		//}

		// Created the given boundary in leaflet
		//var polygon = L.polygon(parsedCoords, {color: 'green'}).addTo(map);
	}
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
