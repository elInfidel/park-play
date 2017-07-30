$(document).ready(function() {
  showSplash(enable_gps, 0, true);
  
  RegisterGeoLocationErrorFunc(function() {
    location.reload();
  });
  
  RegisterGeolocationFoundFunc(function() {
    showSplash(welcome, 0);
  });
});