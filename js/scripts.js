---
---

window.huehue = window.huehue || {};

huehue.init = function() {
  console.log("huehue!");
  huehue.randomButton();
  huehue.alertTracking();
}

huehue.posts = [
  {% for post in site.categories.games %}
  "{{ post.url }}",
  {% endfor %}
];

huehue.randomButton = function() {
  var getRandomPost = function() {
    var postUrl = huehue.posts[Math.floor(Math.random()*huehue.posts.length)];
    return postUrl;
  };

  $("#random-button").click(function(e) {
    e.preventDefault();
    var postUrl = getRandomPost();
    window.location.href = postUrl;
  });
}

huehue.alertTracking = function() {
  if (Cookies.get('fdalert') === 'dismissed') {
    $('#main-alert').hide();
  }

  $('#main-alert').on('closed.bs.alert', function () {
    Cookies.set('fdalert', 'dismissed', { expires: 7 });
	});
}

$(document).ready(huehue.init);


// var main = function() {
//
//   $("body").tooltip({ selector: '[data-toggle=tooltip]' });
//
//   function toggleDiv(divId) {
//     $("#"+divId).slideToggle();
//   }
//   $('.icon-panel').click(function() {
//     toggleDiv('top-panel');
//     $('.navbar').toggleClass("navbar-transparent");
//     $('.navbar-brand, .navbar-left').toggle();
//     $(this).toggleClass("flipped");
//   });
//
//   // Remove widow words from project descriptions.
//   $(function($) {
//       $('.project p').each(function() {
//           $(this).html($(this).html().replace(/\s([^\s<]+)\s*$/,'&nbsp;$1'));
//       });
//   });
//
//   // When the button is clicked
//   $(document).on('click', '.modal-link', function (e) {
//     e.preventDefault();
//     // Find the link attribute
//     var link = $(this).attr('data-link');
//     // Find the associated modal
//     var modal = $(this).attr('data-target');
//     // Find the associated modal body
//     var body = $(modal).find('.modal-body');
//     // Load the link to the modal-body of the associated modal
//     $(body).load(link + ' #main-content');
//
//     state = {
//       action: 'popup'
//     };
//     history.pushState(state, '', link);
//   });
//
//   //Restore the URL when modal is closed
//   $(document).on('hidden.bs.modal', function (e) {
//     var currentstate = history.state;
//     if (currentstate) {
//       history.back();
//     }
//   });
//
//   // Listen for history state changes
//   window.addEventListener('popstate', function (e) {
//     var state = history.state;
//     // Back button pressed, close modal
//     if (!state) {
//       $('.modal.in').modal('hide');
//     } else {
//       // Forward button pressed, open modal
//       var pathname = window.location.pathname;
//       var modal = $('body').find("[data-pathname='" + pathname + "']");
//       $(modal).modal('show');
//     }
//   });
//
// }
//
// $(document).ready(main);
