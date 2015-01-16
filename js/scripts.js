var main = function() {
  
  // Move the top panel out of view the same distance as its height.
  $(document).ready(function() {
    var height = $('.top-panel').height();
    $('.top-panel').css("top", -height);
  })
  
  // Show the panel, move the body down if scrolled to the top, update the navbar.
  $('.icon-panel').click(function() {
        
    $('.top-panel').animate({
      top: '0px'
    }, 750, 'easeOutCirc');
    
    if ($(window).scrollTop() == 0) {
      var height = $('.top-panel').height();
      
      $('body').animate({
        top: height
      }, 750, 'easeOutCirc');
    }
    
    $('.navbar').animate({
      backgroundColor: 'rgba(23, 165, 204, 0);'
    }, 300);
    
    $('.icon-panel').hide();
    $('.icon-close').show();
    
    $('.navbar-brand').animate({
      opacity: '0'
    }, 200);
  });
  
  // Hide the top panel, move the body back into normal position, reset the navbar.
  $('.icon-close').click(function() {
    var height = $('.top-panel').height();
    $('.top-panel').animate({
      top: -height
    }, 300);
    
    $('body').animate({
      top: '0px'
    }, 300);
    
    $('.navbar').animate({
      backgroundColor: 'rgba(23, 165, 204, .90);'
    }, 300);
    
    $('.icon-panel').show();
    $('.icon-close').hide();
    
    $('.navbar-brand').animate({
      opacity: '1'
    }, 200);
  });
};

$(document).ready(main);