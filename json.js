var mapObjects = new Array();
$(document).ready(function(){

  $.getJSON( "http://data.gov.au/geoserver/playground/wfs?request=GetFeature&typeName=ckan_e8d3580c_3981_47ab_a675_573805c3fa86&outputFormat=json",
  function( data ) 
  { 
    mapObjects = data.features;
    LoadMapData(mapObjects);
  });

});
