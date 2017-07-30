$(document).ready(function() {
  window.setInterval("updateNearbyFeatures()", 2000);
});

function updateNearbyFeatures() {
  var nearbyFeatures = GetNearbyFeatures();
  var nearest_feature = nearbyFeatures[0];
  var site_name = nearest_feature.site_name;
  
  console.log(site_name);
}
