var main = function() {
  function toggleDiv(divId) {
    $("#"+divId).slideToggle();
  }
  $('.icon-panel').click(function() {
    toggleDiv('top-panel');
    $('.navbar').toggleClass("transparent");
    $(this).toggleClass("flipped");
  });
  
  // When the button is clicked
  $(document).on('click', '.modal-link', function (e) {
    e.preventDefault();
    // Find the link attribute
    var link = $(this).attr('data-link');
    // Find the associated modal
    var modal = $(this).attr('data-target');
    // Find the associated modal body
    var body = $(modal).find('.modal-body');
    // Load the link to the modal-body of the associated modal
    $(body).load(link + ' #main-content');
    
    state = {
      action: 'popup'
    };
    history.pushState(state, '', link);
  });
  
  //Restore the URL when modal is closed
  $(document).on('hidden.bs.modal', function (e) {
    var currentstate = history.state;
    if (currentstate) {
      history.back();
    }
  });
  
  // Listen for history state changes
  window.addEventListener('popstate', function (e) {
    var state = history.state;
    // Back button pressed, close modal
    if (!state) {
      $('.modal.in').modal('hide');
    } else {
      // Forward button pressed, open modal
      var pathname = window.location.pathname;
      var modal = $('body').find("[data-pathname='" + pathname + "']");
      $(modal).modal('show');
    }
  });
  
}

$(document).ready(main);