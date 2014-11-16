var main = function() {
  $('.icon-panel').click(function() {
    $('.top-panel').animate({
        top: '0px'
    }, 300);
    
    $('body').animate({
        top: '323px'
    }, 300);
  });
  
  $('.icon-close').click(function() {
      $('.top-panel').animate({
          top: '-323px'
      }, 300);
      
      $('body').animate({
          top: '0px'
      }, 300);
  });
};

$(document).ready(main);