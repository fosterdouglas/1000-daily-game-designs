var main = function() {
  
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
    
    $('.navbar-brand,.navbar-nav,.navbar-toggle').animate({
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
    
    $('.navbar-brand,.navbar-nav,.navbar-toggle').animate({
      opacity: '1'
    }, 200);
  });
};

$(document).on('click', '.popup-link', function (e) {
    e.preventDefault();
    var path = $(this).attr('data-link');
    state = {action: 'popup'};
    // Change URL in browser
    history.pushState(state, '', path);
});

// Restore URL when popup is closed
$(document).on("hidden.bs.modal", function (e) {
    var currentstate = history.state;
    if (currentstate) {
        history.back();
    }
});

// Listen for history state changes
window.addEventListener('popstate', function(e) {
    var state = history.state;
    // back button pressed. close popup
    if (!state) {
        $('.modal.in').modal('hide');
    }
    else {
        // Forward button pressed, reopen popup
        var pathname = window.location.pathname;
        var modal = $('body').find("[data-pathname='" + pathname + "']");
        $(modal).modal('show');
    }
});

$(document).ready(main);