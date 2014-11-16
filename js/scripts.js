var main = function() {
  $('.icon-menu').click(function() {
    $('.menu').animate({
        top: '0px'
    }, 300);
    
    $('body').animate({
        top: '323px'
    }, 300);
  });
  
  $('.icon-close').click(function() {
      $('.menu').animate({
          top: '-323px'
      }, 300);
      
      $('body').animate({
          top: '0px'
      }, 300);
  });
};

$(document).ready(main);