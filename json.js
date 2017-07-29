$(document).ready(function(){

  $.getJSON( "http://data.gov.au/geoserver/playground/wfs?request=GetFeature&typeName=ckan_e8d3580c_3981_47ab_a675_573805c3fa86&outputFormat=json", function( data ) {
    var items = [];
    $.each( data.features, function( key, val ) {
      items.push( "<li id='" + val.properties + "'>" + val.properties.suburb + "</li>" );
  });

  $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "body" );
});


});
