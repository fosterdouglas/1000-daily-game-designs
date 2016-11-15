---
---

window.huehue = window.huehue || {};

huehue.init = function() {
  console.log("huehue!");
  huehue.randomButton();
  huehue.alertTracking();
  if ($("body").hasClass("archive")) {
    huehue.archiveFilter();
  }
}

huehue.posts = [
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

huehue.randomButton = function() {
  var getRandomPost = function() {
    var postUrl = huehue.posts[Math.floor(Math.random()*huehue.posts.length)].url;
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

huehue.archiveFilter = function() {

  // If month isn't available in current year, disable the button
  // If year is selected but current month isn't available... ??? show "no posts?" go to closest posts in that year??
  // Stop extra back button on direct /archive link
  huehue.filter = {
    year: null,
    month: null
  };

  function updateFilterUrl(filter) {
    if (history.pushState) {
      history.pushState({}, null, "?year=" + filter.year + "&month=" + filter.month);
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

  var mostRecentPost = huehue.posts[0];

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

var main = function() {

  $("body").tooltip({ selector: '[data-toggle=tooltip]' });

  function toggleDiv(divId) {
    $("#"+divId).slideToggle();
  }
  $('.icon-panel').click(function() {
    toggleDiv('top-panel');
    $('.navbar').toggleClass("navbar-transparent");
    $('.navbar-brand, .navbar-left').toggle();
  });

  // Remove widow words from project descriptions.
  $(function($) {
      $('.project p').each(function() {
          $(this).html($(this).html().replace(/\s([^\s<]+)\s*$/,'&nbsp;$1'));
      });
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

$(document).ready(function() {
  huehue.init();
  main();
});
