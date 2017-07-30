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

$(document).ready(function() {
  window.setTimeout("updateNearbyFeatures()", 5000);
});

function updateNearbyFeatures() {
  var nearbyFeatures = GetNearbyFeatures();

  for(var i = 0; i < nearbyFeatures.length; i++) {
    var listContent = nearbyFeatures[i].name;
    
    var distance = Math.floor(nearbyFeatures[i].distance);
    var distance_measure = 'm';
    
    var start_button = "";
    if(distance <= 300) {
      start_button += "<div class=\"challenge-button\">Start Challenge</div>";
    }
    
    if(distance > 1000) {
      distance = Math.round((distance/1000) * 100)/100;
      distance_measure = 'km';
    }
    
    listContent += "<br />"
    listContent += distance + distance_measure + " Away";
    listContent += start_button;
    $("#challenges").append("<li>" + listContent + "</li>");
  }
  
  buttonActions();
}

function buttonActions() {
  $("#challenges li").click(function() {
    switch($(this).find(".challenge-button").text()) {
      case 'Start Challenge':
        $(this).find(".challenge-button").html('[Done]');
      break;
      default:
        $(this).find(".challenge-button").html('Completed!');
      break;
    }
  });
}