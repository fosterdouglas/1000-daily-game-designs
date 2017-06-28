---
---

window.huehue = window.huehue || {};

huehue.init = function() {
  console.log("huehue!");
  huehue.projectsMenu();
  huehue.topPanel();
  $.getJSON("/js/game-posts.json").done(function(data) {
    huehue.gamePosts = data.games;
    huehue.randomButton();
    huehue.archiveFilter();
  }).fail(function(err) {
    console.log(err);
  });
}

huehue.topPanel = function() {
  $.get('/js/includes/top-panel.html', function(html) {
    $('body').prepend(html);
    $('.panel-toggle').click(function(e) {
      e.preventDefault();
      $(this).toggleClass('open');
      $('.top-panel').slideToggle(500, 'easeOutQuint');
    });
  });
}

huehue.projectsMenu = function() {
  var currentMenuItem = null;
  var currentCategory = null;
  $('.projects-page').hide();
  $('.category-header').removeClass('fs-blue').addClass('light hover-fs-blue pointer transition');
  $('.project-list').hide();
  $('.projects-page').fadeIn();

  function openCategory(item) {
    currentCategory = item.data('category');
    $('#' + currentCategory).toggle();
    item.removeClass('light');
    item.addClass('fs-blue');
  }

  function hideCategory(item) {
    item.addClass('light');
    item.removeClass('fs-blue');
    var category = item.data('category');
    $('#' + currentCategory).hide();
    currentCategory = null;
  }

  function openMenuItem(item) {
    console.log('test');
    currentMenuItem = item.data('index');
    var link = item.data('link');
    var contentElement = item.parent().next();
    $(contentElement).load(link + ' #main-content', function() {
      window.instgrm.Embeds.process();
    });
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

  $('.category-header').click(function() {
    var category = $(this).data('category');
    if (currentCategory == category) {
      hideCategory($(this));
    } else if (currentCategory != category && currentCategory) {
      hideCategory($('[data-category="' + currentCategory + '"]'));
      openCategory($(this));
    } else {
      openCategory($(this));
    }
  });

  openCategory($('[data-category="recent-projects"]'));
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

  function buildButtons() {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function monthButtonTemplate(monthIndex) {
      return '<button class="filter-button dib bree white f5 bg-transparent bn br3 ph3 pb2 pt1" data-month="' + monthIndex + '">' + monthNames[monthIndex - 1] + '</button>';
    }
    function yearButtonTemplate(year) {
      return '<button class="filter-button bree b f4 white bg-transparent ba b--white br3 bw1 mr2 mb3 ph3 pb1" data-year="' + year + '">' + year + '</button>';
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

  function updateActiveButton() {
    $filterButtons.removeClass("bg-white bright").addClass("bg-transparent white");
    $(".filter-button[data-year='" + filter.year + "'], .filter-button[data-month='" + filter.month + "']").removeClass("bg-transparent white").addClass("bg-white bright");
  }

  function updateView() {
    updateActiveButton();
    var selectedPosts = $("[data-year='" + filter.year + "'][data-month='" + filter.month + "']");
    $(".archive-list").fadeOut(200, function() {
      $(".post-list-item").hide();
      selectedPosts.show();
      $(".archive-list").fadeIn(200);
    });
    // selectedPosts.show();

    $filterButtons.removeClass('o-50 disabled');
    for (var i = 1; i <= 12; i++) {
      if (monthIsNotActive(i)) {
        $('.filter-button[data-month=' + i + ']').addClass('o-50 disabled');
      }
    }
    var leftPosition = $('.filter-button[data-month="' + filter.month + '"]').offset().left;
    var currentPosition = $('#month-buttons').scrollLeft();
    if (leftPosition > window.innerWidth) {
      $('#month-buttons').scrollLeft(currentPosition + (leftPosition - window.innerWidth) + 120);
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
    $(".archive-list").hide();
    buildButtons();
    filterPosts();

    $filterButtons.click(function() {
      if (!$(this).hasClass("disabled")) {
        var year = $(this).data("year");
        var month = $(this).data("month");
        filterPosts(year, month);
      }
    });

    $(window).on("popstate", function(e) {
      filterPosts(getUrlParameter("year"), getUrlParameter("month"), true);
    });
  }

  if ($('body').hasClass('archive')) {
    init();
  }

}


$(document).ready(function() {
  huehue.init();
});
