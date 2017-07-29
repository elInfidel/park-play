var splash_visible = 0;
var last_content = null;
var last_index = null;
function showSplash(content, index, hide_continue) {
  if(last_content == content && last_index == index) {
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