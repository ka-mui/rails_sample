// viewport
$(function(){
    var ua = navigator.userAgent;
    if((ua.indexOf('iPhone') > 0) || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)){
        $('head').prepend('<meta name="viewport" content="width=device-width">');
    }
    else {
        $('head').prepend('<meta name="viewport" content="width=1280">');
    }                   // <meta name="viewport" content="width=1000">
});                     // <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">


//
$(function() {
    // スクロールしたら表示
    // ---------------------------------------
	var showFlag = false;
	var topBtn = $('#page-top');
    var topBtnSp = $('#page-top_sp');
    var formlink = $('#formlink-fixed');

	topBtn.css('bottom', '-100px');
    formlink.css('bottom', '-200px');

	//スクロールが100に達したらボタン表示
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			if (showFlag == false) {
				showFlag = true;
				topBtn.stop().animate({'bottom' : '20px'}, 300);
                topBtnSp.stop().animate({'bottom' : '180px'}, 300);
                formlink.stop().animate({'bottom' : '0px'}, 300);
			}
		} else {
			if (showFlag) {
				showFlag = false;
				topBtn.stop().animate({'bottom' : '-100px'}, 300);
                formlink.stop().animate({'bottom' : '-200px'}, 300);
			}
		}
	});


    // ページ内スクロールリンク
    // ---------------------------------------
    if(!navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/)){
    $('a[href^=#]').click(function(){
		var speed = 500;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top - 70;
		// 移動先を調整する場合 var position = target.offset().top - 調整値;
		$("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
	});
    }


    // ページ内スクロールリンク
    // ---------------------------------------
    if(navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/)){
    $('a[href^=#]').click(function(){
		var speed = 500;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top - 110;
		// 移動先を調整する場合 var position = target.offset().top - 調整値;
		$("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
	});
    }

    // キービ
    // ---------------------------------------
    var allImage = $("#keyv-slide img");
    var allImageCount = allImage.length;
    var completeImageCount = 0;

    for(var i = 0; i < allImageCount; i++){
        var img = $('<img>');
        img.load(function() {
            completeImageCount ++;
            if (allImageCount == completeImageCount){
                // 処理
                $.when(
                    $('#keyv-slide').flickity({
                        pageDots: false,
                        wrapAround: true,
                        autoPlay: 3000,
                        pauseAutoPlayOnHover: false
                    })
                ).done(function(){
                    $('h1').addClass('animate');
                    $('#keyv-balloon').addClass('animate');
                    $('#keyv .cta-btn').addClass('animate');
                });
            }
        });
        img.attr('src', $('#keyv-slide img').attr('src'));
    }

    // キービ SP
    // ---------------------------------------
    var allImage3 = $("#keyv-slide_sp img");
    var allImageCount3 = allImage.length;
    var completeImageCount3 = 0;

    for(var i = 0; i < allImageCount3; i++){
        var img = $('<img>');
        img.load(function() {
            completeImageCount3 ++;
            if (allImageCount3 == completeImageCount3){
                // 処理
                $.when(
                    $('#keyv-slide_sp').flickity({
                        pageDots: false,
                        wrapAround: true,
                        autoPlay: 3000,
                        pauseAutoPlayOnHover: false
                    })
                ).done(function(){
                    $('h1').addClass('animate');
                    $('#keyv-balloon_sp').addClass('animate');
                    $('#keyv .cta-btn').addClass('animate');
                });
            }
        });
        img.attr('src', $('#keyv-slide_sp img').attr('src'));
    }

    // 事例
    // ---------------------------------------
    //スライド
    var allImage2 = $("#selected img");
    var allImageCount2 = allImage.length;
    var completeImageCount2 = 0;

    for(var i = 0; i < allImageCount2; i++){
        var img = $('<img>');
        img.load(function() {
            completeImageCount2 ++;
            if (allImageCount2 == completeImageCount2){
                $('#selected').flickity();
            }
        });
        img.attr('src', $('#selected img').attr('src'));
    }

    // 事例
    // ---------------------------------------
    //スライド
    var allImage4 = $("#example-slide img");
    var allImageCount4 = allImage.length;
    var completeImageCount4 = 0;

    for(var i = 0; i < allImageCount4; i++){
        var img = $('<img>');
        img.load(function() {
            completeImageCount4 ++;
            if (allImageCount4 == completeImageCount4){
                $.when(
                    $('#example-slide').flickity()
                ).done(function(){
                    $('#example-slide .slide').css({
                        height: '100%'
                    });
                });

            }
        });
        img.attr('src', $('#example-slide img').attr('src'));
    }

    //after切り替え
    $('.after-nav .item').click(function(){
        var itemNum = $(this).index('.slide.is-selected .after-nav .item');

        $(this).closest('.slide').find('.after-image .is-selected').removeClass('is-selected');
        $(this).closest('.slide').find('.after-image li').eq(itemNum).addClass('is-selected');

        $(this).siblings('.is-selected').removeClass('is-selected');
        $(this).addClass('is-selected');
    });

    // コンテンツ内アニメーション
    // ---------------------------------------
    $('.left-to-right').on('inview', function(event, isInView) {
        if (isInView) {
            $(this).addClass('animate');
        }
    });
    $('.bottom-to-top').on('inview', function(event, isInView) {
        if (isInView) {
            $(this).addClass('animate');
        }
    });
    $('.page-in').on('inview', function(event, isInView) {
        if (isInView) {
            $(this).addClass('animate');
        }
    });
    $('.cta .cta-btn').on('inview', function(event, isInView) {
        if (isInView) {
            $(this).addClass('animate');
        }
    });
    $('#section-07 .faq h3').on('inview', function(event, isInView) {
        if (isInView) {
            $(this).addClass('animate');
        }
    });

    // フォーム部分(タブ)
    // ---------------------------------------
    var selected = $('#form-tab .is-selected').index('#form-tab h2');
    $('.form-body').eq(selected).addClass('is-selected');

    //表示切替(ヘッダ)
    $('#header-form-chenge a').click(function(){
        selected = $(this).index('#header-form-chenge a');
        ChengeForm(selected);
    });

    //表示切替(フォーム内)
    $('#form-tab h2').click(function(){
        selected = $(this).index('#form-tab h2');
        ChengeForm(selected);
    });

    //表示切替関数
    function ChengeForm(n){
        //タブ部分
        $('#form-tab .is-selected').removeClass('is-selected');
        $('#form-tab h2').eq(selected).addClass('is-selected');

        //フォーム部分
        $('#form-container .is-selected').removeClass('is-selected');
        $('.form-body').eq(selected).addClass('is-selected');
    }

    // フォームを開く
    // ---------------------------------------
    $('#form .event-btn').click(function(){
        $(this).toggleClass('open');
        $(this).closest('.form-block').find('.event-form').slideToggle(300, 'swing');
    });

    // 注意書きを開く
    // ---------------------------------------
    $('#form .event-form-attention h5').click(function(){
        $(this).toggleClass('open');
        $(this).next('.event-form-attention-text').slideToggle(300, 'swing');
    });

    // 個別相談会フォームを開く
    // ---------------------------------------
    $('#form .event-notes a').click(function(){
        $('#private-consultation .event-btn').addClass('open');
        $('#private-consultation .event-form').slideDown(300, 'swing');
    });
});
