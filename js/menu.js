

<<<<<<< HEAD



function myFunction(x) {
    x.classList.toggle("change");
=======
function toggleMenu(ele) {
    ele.classList.toggle("menu-button-active");
    
    if($(".menu-button-active").html()) {
      $("#menu").animate({left: '0px'});
    } else {
      $("#menu").animate({left: '-20%'});
    }
>>>>>>> b6c4abd83366fd099cc3bce239ba68e1369e71d2
}
