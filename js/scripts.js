var main = function() {
  $('.icon-panel').click(function() {
    var height = $('.top-panel').height();
    $('body').animate({
        top: height
    }, 300, 'linear');
  });
  
  $('.icon-close').click(function() {
      $('body').animate({
          top: '0px'
      }, 300);
  });
};

$(document).ready(main);