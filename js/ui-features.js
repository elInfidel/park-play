$(document).ready(function() {
  window.setTimeout("updateNearbyFeatures()", 15000);
});

function updateNearbyFeatures() {
  var nearbyFeatures = GetNearbyFeatures();

  if(nearbyFeatures.length > 0)
    return;

  var nearest_feature = nearbyFeatures[0];
  //var site_name = nearest_feature.site_name;
}