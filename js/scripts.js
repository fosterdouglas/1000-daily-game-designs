---
---

window.huehue = window.huehue || {};

huehue.init = function() {
  console.log("huehue!");
  huehue.randomButton();
  huehue.alertTracking();
  huehue.projectsMenu();
  huehue.topPanel();
  huehue.archiveFilter();
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

  $('#alert-close').click(function() {
    $('#main-alert').hide();
    Cookies.set('fdalert', 'dismissed', { expires: 7 });
  });
}

huehue.archiveFilter = function() {

  var firstState = true;
  var mostRecentPost = huehue.gamePosts[0];
  var $filterButtons;

  var filter = {
    year: null,
    month: null
  };

  var firstYear = huehue.gamePosts[huehue.gamePosts.length - 1].date.year;
  var lastYear = huehue.gamePosts[0].date.year;
  var years = (function() {
    var yearCollection = {}
    for (var year = firstYear; year <= lastYear; year++) {
      yearCollection[year] = [];
      for (var i = 0, numPosts = huehue.gamePosts.length; i < numPosts; i++) {
        var date = huehue.gamePosts[i].date;
        if (date.year == year && yearCollection[year].indexOf(parseInt(date.month)) == -1) {
          yearCollection[year].push(parseInt(date.month));
        }
      }
    }
    return yearCollection;
  })();

  function monthIsNotActive(i) {
    return years[filter.year].indexOf(i) == -1;
  }

  console.log(years);
  function buildButtons() {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function monthButtonTemplate(monthIndex) {
      return '<button class="filter-button dib bree white bg-transparent bn br3 ph3 pv1" data-month="' + monthIndex + '">' + monthNames[monthIndex - 1] + '</button>';
    }
    function yearButtonTemplate(year) {
      return '<button class="filter-button bree b f4 white bg-transparent ba b--white br3 bw1 mr2 mb3 ph3" data-year="' + year + '">' + year + '</button>';
    }

    for (var i = 1; i <= 12; i++) {
      $('#month-buttons').append(monthButtonTemplate(i));
    }

    for (var year = firstYear; year <= lastYear; year++) {
      $('#year-buttons').append(yearButtonTemplate(year));
    }

    $filterButtons = $('.filter-button');

  }

  function updateFilterUrl() {
    if (history.pushState) {
      var newState = "?year=" + filter.year + "&month=" + filter.month;
      if (firstState) {
        history.replaceState({}, null, newState);
        firstState = false;
      } else {
        history.pushState({}, null, newState);
      }
    }
  }

  function updateView() {
    $filterButtons.removeClass("bg-white bright").addClass("bg-transparent white");
    $(".filter-button[data-year='" + filter.year + "'], .filter-button[data-month='" + filter.month + "']").removeClass("bg-transparent white").addClass("bg-white bright");
    var selectedPosts = $("[data-year='" + filter.year + "'][data-month='" + filter.month + "']");
    $(".post-list-item").hide();
    selectedPosts.show();
    $filterButtons.removeClass('o-50 disabled');
    for (var i = 1; i <= 12; i++) {
      if (monthIsNotActive(i)) {
        $('.filter-button[data-month=' + i + ']').addClass('o-50 disabled');
      }
    }
    var leftPosition = $('.filter-button[data-month="' + filter.month + '"]').offset().left;
    var currentPosition = $('#month-buttons').scrollLeft();
    if (leftPosition > window.innerWidth) {
      console.log(leftPosition);
      // console.log($('#month-buttons').scrollLeft());
      $('#month-buttons').scrollLeft(currentPosition + (leftPosition - window.innerWidth) + 120);
      console.log($('#month-buttons').scrollLeft());
    }
    if (leftPosition < 0) {
      $('#month-buttons').scrollLeft(currentPosition + leftPosition - 15);
    }
  }

  function updateFilterObject(year, month) {
    filter.year = year || getUrlParameter('year') || filter.year || mostRecentPost.date.year;
    filter.month = month || getUrlParameter('month') || filter.month || mostRecentPost.date.month;
    if (monthIsNotActive(parseInt(filter.month))) {
      filter.month = years[filter.year][0];
    }
  }

  function filterPosts(year, month, back) {
    updateFilterObject(year, month);
    updateView();
    if (!back) {
      updateFilterUrl();
    }
  }

  function init() {
    buildButtons();
    filterPosts();

    $filterButtons.click(function() {
      var year = $(this).data("year");
      var month = $(this).data("month");
      if (!$(this).hasClass("disabled")) {
        filterPosts($(this).data("year"), $(this).data("month"));
      }
    });

    $(window).on("popstate", function(e) {
      filterPosts(getUrlParameter("year"), getUrlParameter("month"), true);
    });
  }

  if ($('body').hasClass('archive')) {
    console.log("go");
    init();
  }

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
