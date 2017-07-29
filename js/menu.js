
function toggleMenu(ele) {
    ele.classList.toggle("menu-button-active");

    if($(".menu-button-active").html()) {
      $("#menu").animate({left: '0px'});
    } else {
      $("#menu").animate({left: '-20%'});
    }
}
