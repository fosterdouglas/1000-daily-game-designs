---
---

window.huehue = window.huehue || {};

huehue.init = function() {
  console.log("huehue!");
  huehue.randomButton();
  huehue.alertTracking();
  huehue.projectsMenu();
  huehue.topPanel();
  // if ($("body").hasClass("archive")) {
  //   huehue.archiveFilter();
  // }
}

huehue.gamePosts = [
  {% for post in site.categories.games %}
  {
    url: "{{ post.url }}",
    date: {
      year: "{{ post.date | date: '%Y' }}",
      month: "{{ post.date | date: '%-m' }}"
    }
  },
  {% endfor %}
];

huehue.topPanel = function() {
  $.get('/js/includes/top-panel.html', function(html) {
    $('body').prepend(html);
    $('.panel-toggle').click(function(e) {
      e.preventDefault();
      console.log("click");
      $('.top-panel').toggleClass('dn');
    });
    // $(".random-button").click(function(e) {
    //   console.log("click");
    //   e.preventDefault();
    //   var postUrl = getRandomPost();
    //   window.location.href = postUrl;
    // });
  });
}

huehue.projectsMenu = function() {
  var currentMenuItem = null;

  function openMenuItem(item) {
    currentMenuItem = item.data('index');
    var link = item.data('link');
    var contentElement = item.parent().next();
    $(contentElement).load(link + ' #main-content');
    item.toggleClass('light neutral open');
  }

  function hideMenuItem(item) {
    currentMenuItem = null;
    var contentElement = item.parent().next();
    $(contentElement).html("");
    item.toggleClass('light neutral open');
  }

  $('.post-link').click(function(e) {
    e.preventDefault();
    var index = $(this).data('index');
    if (currentMenuItem == index) {
      hideMenuItem($(this));
    } else if (currentMenuItem != index && currentMenuItem) {
      hideMenuItem($('[data-index=' + currentMenuItem +']'));
      openMenuItem($(this));
    } else {
      openMenuItem($(this));
    }
  });
}

huehue.randomButton = function() {
  var getRandomPost = function() {
    var postUrl = huehue.gamePosts[Math.floor(Math.random()*huehue.gamePosts.length)].url;
    return postUrl;
  };

  $(document).ready(function() {
    $.get('/js/includes/random-button.html', function(html) {
      $('.tweet-button').after(html);
      $(".random-button").click(function(e) {
        console.log("click");
        e.preventDefault();
        var postUrl = getRandomPost();
        window.location.href = postUrl;
      });
    });
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

huehue.archiveFilter = function() {

  // If month isn't available in current year, disable the button
  // If year is selected but current month isn't available... ??? show "no posts?" go to closest posts in that year??

  huehue.filter = {
    year: null,
    month: null
  };

  var firstState = true;
  var mostRecentPost = huehue.gamePosts[0];

  function updateFilterUrl(filter) {
    if (history.pushState) {
      var newState = "?year=" + filter.year + "&month=" + filter.month;
      if (firstState) {
        history.replaceState({}, null, newState);
        firstState = false;
        console.log("state replaced");
      } else {
        history.pushState({}, null, newState);
        console.log("new state pushed");
      }

    }
  }

  function updateView(filter) {
    $(".filter-button").removeClass("bg-white bright").addClass("bg-transparent white");
    $(".filter-button[data-year='" + filter.year + "'], .filter-button[data-month='" + filter.month + "']").removeClass("bg-transparent white").addClass("bg-white bright");
    var selectedPosts = $("[data-year='" + filter.year + "'][data-month='" + filter.month + "']");
    $(".post-list-item").hide();
    selectedPosts.show();
  }

  function updateFilterObject(year, month) {
    huehue.filter.year = year || huehue.filter.year;
    huehue.filter.month = month || huehue.filter.month;
  }

  function filterPosts(year, month, back) {
    updateFilterObject(year, month);
    updateView(huehue.filter);
    if (!back) {
      updateFilterUrl(huehue.filter);
    }
  }

  filterPosts(
    getUrlParameter("year") || mostRecentPost.date.year, getUrlParameter("month") || mostRecentPost.date.month
  );

  $(".filter-button").click(function() {
    filterPosts($(this).data("year"), $(this).data("month"));
  });

  $(window).on("popstate", function(e) {
    filterPosts(getUrlParameter("year"), getUrlParameter("month"), true);
  });

}

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

$(document).ready(function() {
  huehue.init();
  // main();
});
