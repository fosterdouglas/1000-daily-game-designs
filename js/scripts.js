var main = function() {
  function toggleDiv(divId) {
    $("#"+divId).slideToggle();
  }
  $('.icon-panel').click(function() {
    toggleDiv('top-panel');
    $('.navbar').toggleClass("transparent");
    $(this).toggleClass("flipped");
  });
}

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