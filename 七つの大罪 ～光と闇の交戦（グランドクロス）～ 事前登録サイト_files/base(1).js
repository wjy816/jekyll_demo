/* -------------------------
  1. base
  2. intro & menu
	3. character
	4. slider
	5. voice
	6. modal
	7. anchor & scroll
	8. movie
------------------------- */

/*------------------------
	1. base
--------------------------*/

//Twitter Timeline Customize
function changeTwitterWidgetDesign(){
	'use strict';
    var $twitter_widget = $('iframe.twitter-timeline');
    var $twitter_widget_contents = $twitter_widget.contents();

    if ($twitter_widget.length > 0 && $twitter_widget[0].contentWindow.document.body.innerHTML !== ""){
      $twitter_widget_contents.find('head').append(
        '<style type="text/css"> span.TweetAuthor-name { color : #fff !important; } p { color: #fff; opacity : 0.8 !important; }  .TwitterCard .PollXChoice-optionContainer .PollXChoice-choice--radio{color: #555 !important;}  .TwitterCard .PollXChoice-optionContainer .PollXChoice-choice--text{color: #555 !important;} .TwitterCard .PollXChoice-footer .PollXChoice-info .PollXChoice-vote a:link{ color: #555 !important;} .TwitterCard .PollXChoice-footer .PollXChoice-info .PollXChoice-vote a:hover{ color: #aaa !important;}</style>'
      );
    }
    else {
      setTimeout(function(){
        changeTwitterWidgetDesign();
      }, 350);
    }
  }

changeTwitterWidgetDesign();

var scrollpos;
var windowWidth = $(window).width();

function scrollFixed(){
	'use strict';
	scrollpos = $(window).scrollTop();
   $('body').addClass('fixed').css({'top': -scrollpos});
}
function scrollActive(){
	'use strict';
	$('body').removeClass('fixed').css({'top': ""});
	window.scrollTo( 0 , scrollpos );
}

$(function(){
	'use strict';
	//コンテンツフェード
  $(window).scroll(function (){
    $('.contents_fade').each(function(){
      var elemPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > elemPos - windowHeight + 100){
        $(this).addClass('scrollin');
      }
   	});
  });
	$(window).scroll(function(){
		var preReg = $('.preReg'),
				scroll = $(window).scrollTop();
		if( scroll > 100 ) {
				preReg.addClass('scroll');
			} else{
				preReg.removeClass('scroll');
			}
	});
});


/*------------------------
	2. intro & menu
--------------------------*/


$(function(){
	"use strict";
	//intro&loading
	var windowHeight = $(window).innerHeight(),
			intro = $('#intro'),
			loading = $('#loading');
	intro.css({'height': windowHeight});
    loading.css({ 'height': windowHeight });
    $('#loading').css("display", "block");
    $(window).on('load', function () {

        if (getCookie("loadCookie") == "isLoad") {
            $('#loading').css("display", "none");
            $('#intro').css("display", "none");
            $('#main-contents').css({ 'opacity': '1' });
            $('body').addClass('is-open');
        } else {
            $('#loading').css("display", "block");
            $('#intro').css("display", "block");

		    scrollFixed();
		    $('body').addClass('is-load');
		    loading.delay(500).fadeOut(1000);
		    $.when(
			    intro.delay(5000).fadeOut(1000),
			    $('#main-contents').css({'opacity': '1'})
		    ).done(function(){
			    scrollActive();
                $('body').addClass('is-open');
                setCookie("loadCookie", "isLoad", 1);
                });
        }
	});

	
	//Menu
	$(".navBtn").on("click",function(){
		$("nav").addClass("active");
		$('nav .overlay').fadeIn();
		$('.menuWrapper').fadeIn();
		$('nav .overlay').animate({left:'0',opacity:'1'},'fast','swing');
		$('.menuWrapper').animate({left:'0',opacity:'1'},'fast','swing');
		scrollFixed();
		
		$('nav .closeBtn').on('click', function(){
			$("nav").removeClass("active");
			$('nav .overlay').animate({left:'-100vw',opacity:'0'},'fast','swing');
			$('.menuWrapper').animate({left:'-100vw',opacity:'0'},'fast','swing');
			$('nav .overlay').fadeOut();
			$('.menuWrapper').fadeOut();
			scrollActive();
			return false;
		});
		return false;
	});
	
	//Menu Anchor
	$(".menuWrapper a").on("click",function(){
		$("nav").removeClass("active");
		$('nav .overlay').animate({left:'-100vw',opacity:'0'},'fast','swing');
		$('.menuWrapper').animate({left:'-100vw',opacity:'0'},'fast','swing');
		$('nav .overlay').fadeOut();
		$('.menuWrapper').fadeOut();
		scrollActive();
	});
	
	//menu Float
	$(window).scroll(function(){
		var floatMenu = $('nav.pc'),
				scroll = $(window).scrollTop(),
				floatArea = $('nav.pc').outerHeight() - 44;
		if( scroll > floatArea ) {
				floatMenu.addClass('is-active');
			} else{
				floatMenu.removeClass('is-active');
			}
	});
});
	/*------------------------
		3. character
	--------------------------*/
$(function(){
	'use strict';
	var charModalHeight,
			charCont,
			currentContents;
	function charContHeightChange(){
		charCont = currentContents.find('.charCont');
		charModalHeight = parseInt(charCont.css('top')) + charCont.outerHeight();
		$('.charContents').css({height: charModalHeight});
	}
	//Char Tab
	$('.charTab li').on('click',function(){
		var index = $('.charTab li').index(this);
		$('.charListWrapper > div').css({'display':'none'});
		$('.charListWrapper > div').eq(index).css({'display':'block'});
		$('.charTab li').removeClass('current');
		$(this).addClass('current');
		
		for(var i = 0; i < $('.charTab').find('li').length; i++) {
      $('.charTab').find('li').eq(i).find('img').attr('src', $('.charTab').find('li').eq(i).find('img').attr('src').replace('_on', '_off'));
    }
    $(this).find('img').attr('src', $(this).find('img').attr('src').replace('_off', '_on'));
		
		return false;
	});
	
	//Char Modal
	$('.charList li').on('click', function(){
		//グループ分け
		var group = $(this).parents('.charList').attr('class').split(' ')[1];
		var index = $(this).parents('.charList').find('li').index(this);
		/*$('.charModalList li').removeClass('current');*/
		//スクロール固定
		scrollFixed();
		
		//modalfadeIn
		var groupModal = $('.charModal' + '.' + group);
		currentContents = groupModal.find('.charContents').children('div').eq(index);
		groupModal.addClass('fade');
		groupModal.find('.charModalList.sp').find('li').eq(index).addClass('current');
		groupModal.find('.charModalList.pc').find('li').eq(index).addClass('current');
		currentContents.addClass('fade');
		charContHeightChange();
		
		for(var i = 0; i < $('.charModalList').find('li').length; i++) {
      $('.charModalList').find('li').eq(i).find('img').attr('src', $('.charModalList').find('li').eq(i).find('img').attr('src').replace('_on', '_off'));
    }
    $('.charModalList li.current').find('img').attr('src', $('.charModalList li.current').find('img').attr('src').replace('_off', '_on'));
		
		return false;
	});
	
	//Modal Tab
	$('.charModalList li').on('click', function(){
		var group = $(this).parents('.charModal').attr('class').split(' ')[1];
		var index = $(this).parents('.charModalList').find('li').index(this);
		$('.charModalList li').removeClass('current');
		//リストの画像切り替え
		$(this).addClass('current');
		var groupModal = $('.charModal' + '.' + group);
		currentContents = groupModal.find('.charContents').children('div').eq(index);
		groupModal.find('.charContents > div').removeClass('fade');
		currentContents.addClass('fade');
		charContHeightChange();

		for(var i = 0; i < $('.charModalList').find('li').length; i++) {
			$('.charModalList').find('li').eq(i).find('img').attr('src', $('.charModalList').find('li').eq(i).find('img').attr('src').replace('_on', '_off'));
		}
		$('.charModalList li.current').find('img').attr('src', $('.charModalList li.current').find('img').attr('src').replace('_off', '_on'));
	});
	
	$(".charModal .closeBtn").on('click', function(){
		$(".charModal").removeClass('fade');
		$(".charContents > div").removeClass('fade');
		$(".charModalList li").removeClass('current');
		
		//背景固定解除
		scrollActive();
		return false;
	});
});
	/*------------------------
		4. slider
	--------------------------*/
$(function(){
	'use strict';
	//slick
	var $sliders = $('.slick-slider');
	var $arrows = $('.arrows');
	$('.sliderWrapper').each(function(){
		var $this = $(this); 
		if($this.parent('div').hasClass('charModalList')){
			var slick = $this.find( $sliders ).slick({
          infinite : false,
					slidesToShow : 5,
					slidesToScroll : 1,
					prevArrow: '<div class="slide-arrow prev-arrow"><img src="images/common/char_list_arrow.png"></div>',
    			nextArrow: '<div class="slide-arrow next-arrow"><img src="images/common/char_list_arrow.png"></div>',
					draggable : true,
					variableWidth : true
        });
			
		}else{
			var slick = $this.find( $sliders ).slick({
          infinite : true,
					fade: true,
					slidesToShow : 1,
					slidesToScroll : 1,
					dots : true,
					arrows : true,
					appendArrows : $this.find( $arrows ),
					customPaging: function(slider, i) {
						var thumbSrc = 'images/common/' + $(slider.$slides[i]).data('thumb');
						return '<img src="' + thumbSrc + '">';
					},
					draggable : true,
        });
			$('.charList li').click(function(){
				$this.find( $sliders ).slick('setPosition');
			});
			$('.charModalList li').click(function(){
				$this.find( $sliders ).css('opacity',0);
				$this.find( $sliders ).animate({'z-index':1},100,function(){
             $this.find( $sliders ).slick('setPosition');
             $this.find( $sliders ).animate({'opacity':1});
         });
				$this.find( $sliders ).slick('setPosition');
			});
			$this.find( $sliders ).on('afterChange', function(){
				var index = $this.find('.slick-dots li').index(this);
				for(var i = 0; i < $this.find('.slick-dots').find('li').length; i++) {
					$this.find('.slick-dots').find('li').eq(i).find('img').attr('src', $this.find('.slick-dots').find('li').eq(i).find('img').attr('src').replace('_on', '_off'));
				}
				$this.find('.slick-dots li.slick-active').find('img').attr('src', $this.find('.slick-dots li.slick-active').find('img').attr('src').replace('_off', '_on'));
			}); 
		}
		
	});
	
	//swiper
	var $swiper = $('.swiper-container'),
	    $swiperBtnNext = $('.swiper-button-next'),
			$swiperBtnPrev = $('.swiper-button-prev');
	$('.swiper-parents').each(function(){
		var $this = $(this);
		var swiper = new Swiper( $this.find( $swiper ),{
			slidesPerView: 'auto',
			a11y: false,
			spaceBetween: 8,
			centeredSlides: true,
			observer: true,
			observeParents: true,
			pagination: {
					el: '.swiper-pagination',
					clickable: true,
					type: 'bullets'
				},
			navigation: {
					nextEl: $this.find( $swiperBtnNext ),
					prevEl: $this.find( $swiperBtnPrev )
			}
		});
	});
});	
	
	/*------------------------
		5. voice
	--------------------------*/
$(function(){
	'use strict';
	//Voice Play
	var voice = $("audio.voice"),
			play;
	//ボタン押されたら再生する
	$('.voiceBtn').on('click', function(){
		if($('.voiceBtn').hasClass('active')){
			console.log('playnow');
			play.pause();
			play.currentTime = 0;
			$('.voiceBtn').removeClass("active");
		}else{
			console.log('playstart');
			$(this).addClass("active");
			play = $(this).next(voice).get(0);
			play.play();
		}
		
	});
	//再生終了
		voice.on("ended",function(){
			if($(".voiceBtn").hasClass("active")){
				$(".voiceBtn").removeClass("active");
			}
		});
});
	
	/*------------------------
		6. modal
	--------------------------*/
$(function(){
	'use strict';
	//cautionModal
	$('.js-cautionBtn').on('click', function(){
		$('.cautionModal').css({display: 'block', opacity: '1'});
		scrollFixed();
		return false;
	});
    $('#cautionCloseBtn1').on('click', function(){
		$('.cautionModal').css({display: 'none', 'opacity': '0'});
        scrollActive();
        return false;
	});


	//registModal
	$('.js-registBtn').on('click', function(){
		scrollFixed();
        $('.registModal').css({ display: 'block' });
        $('.registModal .select').css({ display: 'block' });
		return false;
	});
	$('.js-cbtBtn').on('click', function(){
		if($(this).parents('div').hasClass('registModal')){
			$('.registModal .cbt').css({display: 'block'});
			$('.registModal .select').css({display: 'none'});
		} else{
			scrollFixed();
			$('.registModal #UP1 > div').css({display: 'none'});
			$('.registModal .cbt').css({display: 'block'});
			$('.registModal').css({display: 'block'});
		}
		return false;
	});
	$('.js-mailBtn').on('click', function(){
		$('.registModal .mail-regist').css({display: 'block'});
        $('.registModal .cbt').css({ display: 'none' });
		return false;
	});

	$('.js-close2').on('click', function(){
		$('.registModal').css({display: 'none'});
        $('.registModal #UP1 > div').css({ display: 'none' });
		//$('.registModal .select').css({display: 'block'});
        scrollActive();
        return false;
    });

    $('.js-close3').on('click', function () {
        $('.mail-error-invalid').css({ display: 'none' });
        $('.mail-error-registered').css({ display: 'none' });
        $('.registModal .mail-regist').css({ display: 'block' });
        return false;
    });

});	
	
	/*------------------------
		7. anchor & scroll
	--------------------------*/
$(function(){
	'use strict';
	//smoothscroll
  var urlHash = location.hash;
  if(urlHash) {
    /*$('body,html').stop().scrollTop(0);*/
    setTimeout(function () {
      scrollToAnker(urlHash) ;
    }, 100);
  }

  //通常のクリック時
  $(window).on('load resize', function() {
		$('a[href^="#"]').click(function() {
    	var href= $(this).attr("href");
			//リンク先が#か空だったらhtmlに
			var hash = href === "#" || href === "" ? 'html' : href;
			var windowWidth = window.innerWidth;
			if (windowWidth > 828) {
				// PCの処理
				scrollToAnkerPC(hash);
			} else {
				// SPの処理
				scrollToAnkerSP(hash);
			}
			return false;
		});		
	});
	
	  function scrollToAnkerSP(hash) {
    var target = $(hash),
				position = target.offset().top;
		if( hash === '#campaign' || hash === '#special'){
			$('body,html').stop().animate({
				scrollTop: position + windowWidth*0.19 }, 300);
		} else{
			$('body,html').stop().animate({scrollTop: position }, 300);
		}
  }
	function scrollToAnkerPC(hash) {
    var target = $(hash),
				position = target.offset().top;
		if( hash === '#campaign' || hash === '#special'){
			$('body,html').stop().animate({
				scrollTop: position + windowWidth*0.19 - 120 }, 300);
		} else{
			$('body,html').stop().animate({scrollTop: position - 120 }, 300);
		}
  }
});	

/*------------------------
	8. movie
--------------------------*/
// YouTubeのiframe apiの読み込み
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// YouTubeの埋め込み
var ytPlayer;
function onYouTubeIframeAPIReady() {
	'use strict';
  ytPlayer = new YT.Player(
    'player', // 埋め込む場所の指定
    {
			videoId: '7Te5ueHF0-o',
      playerVars: {
        playsinline: 1,
        autoplay: 1, // 自動再生
        loop: 1, //0 ループ有効 
        enablejsapi: 1, //JavaScript API 有効
        showinfo:0, //動画の再生が始まる前に動画のタイトルなどの情報を表示しない
        rel:0, //再生終了時に関連動画を表示しない
				playlist: '7Te5ueHF0-o'
      },
      events: {
        'onReady': function(event){
					event.target.setVolume(0);
					event.taeget.mute();
				}
      }
    }
  );
}
$(function(){
	'use strict';
	setInterval(function(){
		if($('body').hasClass('is-open')){
			ytPlayer.playVideo();
		}else{
			ytPlayer.pauseVideo();
		}
	},100);
});

//Modal Video
$(".js-video-button").modalVideo({
	channel: 'youtube',
	youtube: {
	  autoplay: 1,
	  cc_load_policy: 1,
	  color: null,
	  controls: 1,
	  disablekb: 0,
	  enablejsapi: 0,
	  end: null,
	  fs: 1,
	  h1: null,
	  iv_load_policy: 1,
	  list: null,
	  listType: null,
	  loop: 0,
	  modestbranding: null,
	  origin: null,
	  playlist: null,
	  playsinline: null,
	  rel: 0,
	  showinfo: 0,
	  start: 0,
	  wmode: 'transparent',
	  theme: 'dark'
	},
	ratio: '16:9',
});

//動画プレイヤー中コンテンツのスクロール固定
var scrollpos;
$('.js-video-button').on('click',function(){
	"use strict";
	if($('body').hasClass('fixed')){
		$('.charContentsWrapper').css({'pointer-events': 'none'});
		//黒背景クリックでクローズ
		$(document).on("click",function(event) {
			if(!$(event.target).closest('.modal-video-movie-wrap').length) {
				$('.charContentsWrapper').css({'pointer-events': ''});
			}
			$(document).off('click');
			return false;
		});
	}else{
		scrollFixed();
		//黒背景クリックでクローズ
		$(document).on("click",function(event) {
			if(!$(event.target).closest('.modal-video-movie-wrap').length) {
				//背景固定解除
				scrollActive();
			}
			$(document).off('click');
			return false;
		});
	}
	return false;
});

function setCookie(name, value, expiredays) {
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    todayDate.setHours(0, 0, 0, 0);
    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

function getCookie(name) {
    var nameOfCookie = name + "=";
    var x = 0;
    while (x <= document.cookie.length) {
        var y = (x + nameOfCookie.length);
        if (document.cookie.substring(x, y) == nameOfCookie) {
            if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
                endOfCookie = document.cookie.length;
            return unescape(document.cookie.substring(y, endOfCookie));
        }
        x = document.cookie.indexOf(" ", x) + 1;
        if (x == 0)
            break;
    }
    return "";
}

function f_cbtBtnClick() {
    if ($(this).parents('div').hasClass('registModal')) {
        $('.registModal .cbt').css({ display: 'block' });
        $('.registModal .select').css({ display: 'none' });
    } else {
        scrollFixed();
        $('.registModal #UP1 > div').css({ display: 'none' });
        $('.registModal .cbt').css({ display: 'block' });
        $('.registModal').css({ display: 'block' });
    }
    return false;
}

function f_jsMailBtn() {
    $('.registModal .mail-regist').css({ display: 'block' });
    $('.registModal .cbt').css({ display: 'none' });
    return false;
}

function f_reged() {
    //$('.registModal').css({display: 'none'});
    $('.select').css({ display: 'none' });
    $('.mail-finish').css({ 'display': 'none' });
    $('.mail-error-registered').css({ 'display': 'block' });
}
function f_regend() {
    $('.select').css({ display: 'none' });
    $('.mail-error-registered').css({ 'display': 'none' });
    $('.mail-finish').css({ 'display': 'block' });
}
function f_jsClose3Btn() {
    $('.mail-error-invalid').css({ display: 'none' });
    $('.mail-error-registered').css({ display: 'none' });
    $('.registModal .mail-regist').css({ display: 'block' });
    return false;
}
function f_regednClose() {
    $('.registModal').css({ display: 'none' });
    $('.select').css({ display: 'none' });
    $('.mail-error-registered').css({ 'display': 'none' });
    $('.mail-finish').css({ 'display': 'none' });
    scrollActive();
    return false;
}

document.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
    }
}, true);
