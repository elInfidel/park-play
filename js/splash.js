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

var splash_visible = 0;
var last_content = null;
var last_index = null;
function showSplash(content, index, hide_continue) {
  if(last_content == content && index <= last_index) {
    return;
  }
  
  last_content = content;
  last_index = index;
  
  if(hide_continue == true) {
    $("#continue-button").hide();
  } else {
  $("#continue-button").fadeIn(1000);
  }
  
  if(splash_visible) {
    $("#dialogue-content").fadeOut(500, function() {
    
    var next_content = content[index];
    $("#dialogue-content").html(next_content);
    
    $("#dialogue-content").fadeIn(500);
    });
  } else {
    $(".splash").show();
    $(".background").fadeIn(600);
    $(".character, .dialogue").fadeIn(1000);

    var next_content = content[index];
    $("#dialogue-content").html(next_content);
  }
  
  $("#continue-button").off("click");
  
  $("#continue-button").click(function() {
    var next_index = index+1;
    
    if(content[next_index] != null) {
      showSplash(content, next_index);
    } else {
      hideSplash();
    }
  });
  
  splash_visible = 1;
}

function hideSplash() {
  splash_visible = 0;
  
  $(".character, .dialogue").fadeOut(500, function() {
    $(".background").fadeOut(700, function() {
      $(".splash").hide();
    });
  });
}