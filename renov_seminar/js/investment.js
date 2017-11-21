(function() {
  $(function() {
    var $accordion, $closeModal, $form, $input, $required, $slider, $submitBtn, $telBtn, $telModal, isValidAll, validation;
    $slider = $('[data-js-elm=slider]');
    $slider.slick({
      dots: true,
      prevArrow: '<span class="slick-prev"></span>',
      nextArrow: '<span class="slick-next"></span>'
    });
    $telBtn = $('[data-js-elm=tel_application]');
    $telModal = $('[data-js-elm=telModal]');
    $closeModal = $('[data-js-elm=closeModal]');
    $telBtn.on('click', function() {
      if (my.sp && my.ua.mobile) {
        $telModal.fadeIn(300);
      }
      return false;
    });
    $closeModal.on('click', function() {
      return $telModal.fadeOut(300);
    });
    $w.on('load', function() {
      var $scrollActive;
      $scrollActive = $('[data-js-elm=scrollActive]');
      return $w.on('scroll', function() {
        return $scrollActive.each(function() {
          if (!$(this).is('.is_viewing') && my.sT > $(this).offset().top - my.vh * .65) {
            return $(this).addClass('is_viewing');
          }
        });
      });
    });
    $w.on('load', function() {
      var $application, $cta;
      $application = $('[data-js-elm=application]');
      $cta = $('#lnk_form');
      return setTimeout(function() {
        return $w.on('scroll', function() {
          if (my.sp && my.sT > $cta.offset().top - my.vh && my.sT < $cta.offset().top + $cta.innerHeight()) {
            return $application.not(':animated').fadeOut(300);
          } else {
            return $application.not(':animated').fadeIn(300);
          }
        });
      }, 3000);
    });
    $accordion = $('[data-js-elm=accordion]');
    $accordion.on('click', function() {
      var $next;
      if ($(this).is('.sp_only') && my.sp || !$(this).is('.sp_only')) {
        $next = $(this).next();
        if ($next.not(':animated')) {
          $(this).toggleClass('is_active');
          return $next.slideToggle(300);
        }
      }
    });
    $form = $('[data-js-elm=form]');
    $input = $form.find(':input:visible');
    $required = $form.find('.required').children('td');
    $submitBtn = $('[data-js-elm=submit]');
    isValidAll = false;
    $.fn.autoKana('[name=contactName]', '[name=contactPhoneticName]', {
      katakana: false
    });
    $('[name=zip]').on('keyup', function() {
      var query, url, zip;
      if ($(this).parent().attr('data-valid') === "true") {
        zip = $(this).val();
        url = 'https://api.zipaddress.net?callback=?';
        query = {
          'zipcode': zip
        };
        return $.getJSON(url, query).done(function(json) {
          if (json.code == null) {
            $('[name=pref]').val(json.pref);
            $('[name=address]').val(json.address);
            return validation($('[name=pref],[name=address]'), true);
          }
        });
      }
    });
    validation = function($el, operation) {
      $el.each(function() {
        var isInputted, isValid, val;
        val = $el.val();
        isInputted = val.match(/\S/) ? true : false;
        isValid = "";
        switch ($el.attr('name')) {
          case 'contactName':
            isValid = isInputted;
            break;
          case 'contactPhoneticName':
            isValid = val.match(/^[ぁ-ん ー]+$/) ? true : false;
            break;
          case 'zip':
            isValid = val.match(/^\d{7}$/) ? true : false;
            break;
          case 'pref':
            isValid = isInputted;
            break;
          case 'address':
            isValid = isInputted;
            break;
          case 'email':
            isValid = val.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i) ? true : false;
            break;
          case 'tel':
            isValid = val.match(/^\d{10}$|^\d{11}$/) ? true : false;
        }
        $(this).parent().attr('data-inputted', isInputted);
        return $(this).parent().attr('data-valid', isValid);
      });
      isValidAll = $required.filter('[data-valid="true"]').length === $required.length ? true : false;
      return $submitBtn.attr('data-disabled', !isValidAll);
    };
    $('[name=zip],[name=tel]').on('blur', function() {
      var halfWidth, val;
      val = $(this).val();
      halfWidth = (function() {
        return val.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
          return String.fromCharCode(s.charCodeAt(0) - 65248);
        });
      })();
      $(this).val(halfWidth.replace(/[^0-9]/g, ''));
      return validation($(this), true);
    });
    $input.on('input blur change', function() {
      return validation($(this), true);
    });
    $form.on('submit', function(e) {
      var action, formData;
      e.preventDefault();
      formData = $form.serialize();
      action = $form.attr('action');
      $body.addClass('sendding').css('top', -my.sT);
      return $.ajax({
        type: 'POST',
        url: action,
        data: formData
      }).done(function(res) {
        var params;
        if (res.status === 400) {
          return location.href = "/investment/error.html";
        } else {
          params = {
            pageId: 'inquiry-investment',
            id: res.id
          };
          return location.href = "/investment/thanks.html?" + $.param(params);
        }
      }).fail(function() {
        return location.href = "/investment/error.html";
      });
    });
    $doc.on('input', 'textarea', function(e) {
      var oh, sh;
      $(this).height('auto');
      sh = this.scrollHeight;
      oh = this.offsetHeight;
      return $(this).height(sh > oh ? sh : oh);
    });
    if (my.ua.mouse) {
      $input.on('keydown', function(e) {
        var index, isEnter, isTab;
        isEnter = e.keyCode === 13;
        isTab = e.keyCode === 9;
        if (isEnter || isTab) {
          index = $input.index(this);
          if (index === $input.length - 1) {
            if (e.shiftKey || e.ctrlKey || e.metaKey || isTab) {
              if (isValidAll) {
                $submitBtn.focus();
              } else {
                $input.first().focus();
              }
              return false;
            }
          } else {
            $input.eq(index + 1).focus();
            return false;
          }
        }
      });
    }
    $submitBtn.on('keydown', function(e) {
      var isEnter, isTab;
      isEnter = e.keyCode === 13;
      isTab = e.keyCode === 9;
      if (isEnter && isValidAll) {
        $form.submit();
      } else if (isTab) {
        $form.find('input').first().focus();
      }
      return false;
    });
    return $submitBtn.on('click', function(e) {
      if (isValidAll) {
        return $form.submit();
      }
    });
  });

}).call(this);
