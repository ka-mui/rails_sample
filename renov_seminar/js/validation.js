(function() {
  $('document').ready(function() {
    var $form, $input, $required, $submitBtn, isValidAll, validation;
    $form = $('[data-js-elm=form]');
    $input = $form.find(':input');
    $required = $form.find('.required').children('td');
    $submitBtn = $('[data-js-elm=submit]');
    isValidAll = false;

    $('[name=zip]').on('keyup', function() {
      var query, url, zip;
      if ($(this).parent().attr('data-valid') === "true") {
        zip = $(this).val();
        url = 'https://api.zipaddress.net?callback=?';
        query = {
          'zipcode': zip
        };
         $.getJSON(url, query).done(function(json) {
          if (json.code == null) {
            $('[name=pref]').val(json.pref);
            $('[name=address]').val(json.address);
             validation($('[name=pref],[name=address]'), true);
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
          case 'mobilePhone':
            isValid = val.match(/^\d{11}$/) ? true : false;
            break;
          case 'fixedPhone':
            isValid = val.match(/^\d{10}$|^\d{11}$/) ? true : false;
            break;
        }
        $(this).parent().attr('data-inputted', isInputted);
        $(this).parent().attr('data-valid', isValid);
      });
      $required = $('[data-js-elm=form]').find('.required').children('td');
      isValidAll = $required.filter('[data-valid="true"]').length === $required.length ? true : false;
      $submitBtn.attr('data-disabled', !isValidAll);
    };
    // $('[name=zip],[name=mobilePhone],[name=fixedPhone]').on('blur', function() {
    //   var halfWidth, val;
    //   val = $(this).val();
    //   halfWidth = (function() {
    //      val.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
    //        String.fromCharCode(s.charCodeAt(0) - 65248);
    //     });
    //   })();
    //   $(this).val(halfWidth.replace(/[^0-9]/g, ''));
    //    validation($(this), true);
    // });
    $input.on('input blur change', function() {
      validation($(this), true);
    });
    $form.on('submit', function(e) {
      var action, formData;
      e.preventDefault();
      formData = $form.serialize();
      action = $form.attr('action');
      $body.addClass('sendding').css('top', -my.sT);
      $.ajax({
        type: 'POST',
        url: action,
        data: formData
      }).done(function(res) {
        var params;
        if (res.status === 400) {
          location.href = "/renov_seminar/error.html";
        } else {
          params = {
            pageId: 'inquiry-renov_seminar',
            id: res.id
          };
          location.href = "/renov_seminar/thanks.html?" + $.param(params);
        }
      }).fail(function() {
        location.href = "/renov_seminar/error.html";
      });
    });
    // $doc.on('input', 'textarea', function(e) {
    //   var oh, sh;
    //   $(this).height('auto');
    //   sh = this.scrollHeight;
    //   oh = this.offsetHeight;
    //    $(this).height(sh > oh ? sh : oh);
    // });
    // if (my.ua.mouse) {
    //   $input.on('keydown', function(e) {
    //     var index, isEnter, isTab;
    //     isEnter = e.keyCode === 13;
    //     isTab = e.keyCode === 9;
    //     if (isEnter || isTab) {
    //       index = $input.index(this);
    //       if (index === $input.length - 1) {
    //         if (e.shiftKey || e.ctrlKey || e.metaKey || isTab) {
    //           if (isValidAll) {
    //             $submitBtn.focus();
    //           } else {
    //             $input.first().focus();
    //           }
    //            false;
    //         }
    //       } else {
    //         $input.eq(index + 1).focus();
    //          false;
    //       }
    //     }
    //   });
    // }
    $submitBtn.on('keydown', function(e) {
      var isEnter, isTab;
      isEnter = e.keyCode === 13;
      isTab = e.keyCode === 9;
      if (isEnter && isValidAll) {
        $form.submit();
      } else if (isTab) {
        $form.find('input').first().focus();
      }
      false;
    });
    $submitBtn.on('click', function(e) {
      if (isValidAll) {
        $form.submit();
      }
    });
  });

  $('ul.radio-wrap li input[type="radio"]').on("change click blur",function(){
    if($(this).attr('value') == 'tel-type01'){
      console.log("携帯");
       $('input.ttt').attr({
        'name': 'mobilePhone',
        'placeholder': '09012345678'
      });
      $(this).parents(".tel").removeClass("fixed");
      $(this).parents(".tel").addClass("mobile");
    } else {
          console.log("固定");
      $('input.ttt').attr({
        'name': 'fixedPhone',
        'placeholder': '0124567890'
      });
      $(this).parents(".tel").removeClass("mobile");
      $(this).parents(".tel").addClass("fixed");
    }
  });

  function selectColor() {
    // 現在選択されてる項目によって色設定
    if($('select').find('option:selected').hasClass('default')) {
      $('select').css({'color': '#666'});
    }

  　 // 項目が変更された時、条件によって色変更
    $('select').on('change', function(){
      if($(this).find('option:selected').hasClass('default')) {
        $(this).css({'color': '#666'});
      } else {
        $(this).css({'color': '#000'});
      }
    });
  }

  selectColor();

}).call(this);
