var main = function() {
  $('.icon-panel').click(function() {
    var height = $('.top-panel').height();
    $('body').animate({
      top: height
    }, 750, 'easeOutCirc');
    
    $('.navbar').animate({
      backgroundColor: 'rgba(23, 165, 204, 0);'
    }, 300);
    $('.icon-panel').hide();
    $('.icon-close').show();
  });
  
  $('.icon-close').click(function() {
    $('body').animate({
      top: '0px'
    }, 300);
    
    $('.navbar').animate({
      backgroundColor: 'rgba(23, 165, 204, .90);'
    }, 300);
    $('.icon-panel').show();
    $('.icon-close').hide();
  });
};

$(document).ready(main);