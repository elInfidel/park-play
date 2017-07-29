$(document).ready(function()
{

  // Brimbank playground data
  DataLoader("http://data.gov.au/geoserver/playground/wfs?request=GetFeature&typeName=ckan_e8d3580c_3981_47ab_a675_573805c3fa86&outputFormat=json",
  LoadPlaygrounds            
  );

  // Brimbank dog off-leash areas
  //DataLoader("http://data.gov.au/geoserver/dog-off-leash-areas/wfs?request=GetFeature&typeName=ckan_e0e8e9ed_f781_453e_9424_83ed6cb9b8ec&outputFormat=json",
  //LoadOffLeash            
  //);

  // Brimbank open spaces data.
  //DataLoader("http://data.gov.au/geoserver/brimbank-parks-and-open-spaces-0-1/wfs?request=GetFeature&typeName=ckan_90e012a2_8651_43f3_8e02_bb2ae3abede6&outputFormat=json",
  //LoadParks            
  //);

  function DataLoader(url, callback)
  {
    $.getJSON(url,
    function( data ) 
    { 
      callback(data.features)
    });
  }

});
