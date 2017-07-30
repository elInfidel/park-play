/*
License (MIT)

https://opensource.org/licenses/MIT

Copyright 2017 Liam Parker, Marcela Klocker, Daniel Mason

Permission is hereby granted, free of charge,
to any person obtaining a copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software,
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

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
	console.log("User Location: " + loc.latlng);

	if(_nearbyCache.length == 0)
		GetNearbyFeatures();

	_lastUserLoc = _curUserLoc;
	_curUserLoc = loc.latlng;
}

function _isNearby(latLngA, latLngB)
{
	var dist = latLngA.distanceTo(latLngB);

	if(dist < NEARBY_MAX_DIST)
		return true;
	else
		return false;
}

function _parkStyle()
{
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.6
    };
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
	var nearby = [];

	if(_curUserLoc == undefined)
		return nearby;

	for(i = 0; i < _features.length; i++)
	{
		feature = _features[i];
		featureLoc = L.latLng(feature.properties.lat, feature.properties.long);

		if(_isNearby(_curUserLoc, featureLoc))
		{
			var pName = "Undefined";

			if(feature.properties.site_name != undefined)
				pName = feature.properties.site_name;
			else if(feature.properties.facility_n != undefined)
				pName = feature.properties.facility_n;

			var data = {
				distance:_curUserLoc.distanceTo(featureLoc),
				name: pName
			}

			nearby.push(data);
		}
		
		// Sort the features by distance
		// Todo: Avoid calling 
		nearby.sort(function(a, b)
		{
			return a.distance - b.distance;
		});
	}

	console.log("Nearby Features: " + nearby.length);
	_nearbyCache = nearby;
	return nearby;
}

// If the user is currently within the bounds of a park, return that park. null otherwise.
function GetCurrentPark()
{

}

// Data loading
$(document).ready(function()
{
  // Brimbank playground data.
  DataLoader("http://data.gov.au/geoserver/playground/wfs?request=GetFeature&typeName=ckan_e8d3580c_3981_47ab_a675_573805c3fa86&outputFormat=json");
  // Brimbank dog off-leash areas.
  //DataLoader("http://data.gov.au/geoserver/dog-off-leash-areas/wfs?request=GetFeature&typeName=ckan_e0e8e9ed_f781_453e_9424_83ed6cb9b8ec&outputFormat=json");
  // Brimbank open spaces data.
  //DataLoader("http://data.gov.au/geoserver/brimbank-parks-and-open-spaces-0-1/wfs?request=GetFeature&typeName=ckan_90e012a2_8651_43f3_8e02_bb2ae3abede6&outputFormat=json");
  // Ballarat playground data.
  //DataLoader("http://data.gov.au/dataset/a9b248c1-2078-45fa-b9c6-b2ae562c87b2/resource/693b8663-efd6-4583-9dd6-7a3793e54bae/download/ballaratplaygrounds.geojson");
  // Golden Plains
  DataLoader("http://data.gov.au/geoserver/golden-plains-playgrounds/wfs?request=GetFeature&typeName=ckan_06548285_28fd_4300_8121_996604d58dfd&outputFormat=json");
  
  function DataLoader(url)
  {
    $.getJSON(url,
    function( data ) 
    {
		_features = _features.concat(data.features);
    	_dataLayers.push(L.Proj.geoJson(data).addTo(map));
    });
  }

});
