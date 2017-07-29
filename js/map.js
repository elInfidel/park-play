
var map;

var _features = [];
var _nearbyCache = [];

var _dataLayers = [];


var _curUserLoc;
var _lastUserLoc;

var NEARBY_MAX_DIST = 2000;

_init();

function _init()
{
	console.log("Initializing leaflet map");

	// Build custom coordinate reference object for dealing with australian geolocation data.
	var crs = new L.Proj.CRS('EPSG:28355', '+proj=utm +zone=55 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');

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

	_initGeolocation();
}

function _initGeolocation()
{	
	// Locate user, also polls on a set interval
	map.locate({
		setView: true,
		maxZoom: 16,
		watch:   true,
		maxAge:  5000
	});
	RegisterGeolocationFoundFunc(_onLocationUpdateInternal);
}

function _onLocationUpdateInternal(loc)
{
	_lastUserLoc = _curUserLoc;
	_curUserLoc = loc.latlng;
}

function _isNearby(latLngA, latLngB)
{
	if(latLngA == undefined || latLngB == undefined)
		return false;
	
	var dist = latLngA.distanceTo(latLngB);

	if(dist < NEARBY_MAX_DIST)
		return true;
	else
		return false;
}

// Callback will be notified when geolocate obtains user location.
function RegisterGeolocationFoundFunc(cb)
{
	map.on('locationfound', cb);
}

// Callback will be notified when geolocate fails to obtain user location.
function RegisterGeoLocationErrorFunc(cb)
{
	map.on('locationerror', cb);
}

// Returns property information related to all nearby features
function GetNearbyFeatures()
{
	var nearbyFeatures = [];

	if(_lastUserLoc.distanceTo(_curUserLoc) > 25)
	{
		return _nearbyCache;
	}

	for(i = 0; i < _features.length; i++)
	{
		feature = _features[i];

		if(_isNearby(_curUserLoc, feature))
		{
			nearbyFeatures.push(feature.properties);
		}
		
		// Sort the features by distance
		// Todo: Avoid calling 
		nearbyFeatures.sort(function(a, b)
		{
			aLatlng = a.properties.latlng;
			bLatlng = b.properties.latlng;

			return _curUserLoc.distanceTo(bLatlng) - _curUserLoc.distanceTo(aLatlng)
		});

		_nearbyCache = nearbyFeatures;
		return nearbyFeatures;
	}
}

// If the user is currently within the bounds of a park, return that park. null otherwise.
function GetCurrentPark()
{
	for(i = 0; i < _nearbyCache.length; i++)
	{
		
	}
}

// Data loading
$(document).ready(function()
{
  // Brimbank playground data.
  DataLoader("http://data.gov.au/geoserver/playground/wfs?request=GetFeature&typeName=ckan_e8d3580c_3981_47ab_a675_573805c3fa86&outputFormat=json");
  // Brimbank dog off-leash areas.
  DataLoader("http://data.gov.au/geoserver/dog-off-leash-areas/wfs?request=GetFeature&typeName=ckan_e0e8e9ed_f781_453e_9424_83ed6cb9b8ec&outputFormat=json");
  // Brimbank open spaces data.
  DataLoader("http://data.gov.au/geoserver/brimbank-parks-and-open-spaces-0-1/wfs?request=GetFeature&typeName=ckan_90e012a2_8651_43f3_8e02_bb2ae3abede6&outputFormat=json");
  // Ballarat playground data.
  DataLoader("http://data.gov.au/dataset/a9b248c1-2078-45fa-b9c6-b2ae562c87b2/resource/693b8663-efd6-4583-9dd6-7a3793e54bae/download/ballaratplaygrounds.geojson");

  function DataLoader(url)
  {
    $.getJSON(url,
    function( data ) 
    { 
		_features.push(data.features);
    	_dataLayers.push(L.Proj.geoJson(data).addTo(map));
    });
  }

});
