$(document).ready(function() {
  window.setTimeout("updateNearbyFeatures()", 5000);
});

function updateNearbyFeatures() {
  var nearbyFeatures = GetNearbyFeatures();

  for(var i = 0; i < nearbyFeatures.length; i++) {
    console.log(nearbyFeatures[i].name);
  }
}