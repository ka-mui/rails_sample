(function() {
  $(function() {
    var delayTime;
    $.scrollDefault({
      speed: 500,
      easing: 'swing',
      pcPosition: -70,
      tabPosition: -70,
      spPosition: -0
    });
    if (!my.ua.mobile) {
      $('[data-js-elm=viewport]').attr('content', 'width=1100');
    }
    delayTime = $body.is('.investment') ? 3000 : 1000;
    return $w.firstLoad({
      pc_tab: function() {
        return setTimeout(function() {
          return $('[data-js-elm=pcMap]').each(function() {
            return $(this).attr('src', $(this).attr('data-src'));
          });
        }, delayTime);
      },
      sp: function() {
        return setTimeout(function() {
          return $('[data-js-elm=spMap]').each(function() {
            return $(this).attr('src', $(this).attr('data-src'));
          });
        }, delayTime);
      }
    });
  });

}).call(this);
