$(function () {

	var user = {
		handle: '@RothschKe',
		img: 'images/keith.jpg',
	};

	$('body').on('click', '.compose', function () {
		$(this).addClass('expand');
	});

	$('main').on('click', '.tweet', function () {
		$(this).parent().toggleClass('expand');
	});

		var tweetTemplate = $('#template-tweet').text()
		var createTweet = Handlebars.compile(tweetTemplate);

	function renderTweet (user, message) {

		return createTweet({img: user.img, title: user.handle, message: message})
	
	} 
		
		var threadTemplate = $('#template-thread').text()
		var createThread = Handlebars.compile(threadTemplate);

	var renderThread = function (user, message) {

		return createThread({tweet: renderTweet(user,message), compose: renderCompose() });
	}


		var composeTemplate = $('#template-compose').text();
		var createCompose = Handlebars.compile(composeTemplate);
	var renderCompose = function () {

		return createCompose;
	}

	$('body').on('click', 'button', function () {
		var message = $(this).parents('form').find('textarea').val();
		
		// return the textarea to blank
		$(this).parents('form').find('textarea').val('')
		
		var charCount = 140;
		$(this).prev().text(charCount);

		$('.compose').removeClass('expand');

		if ($(this).parents('header').length) {
			var thread = renderThread(user, message);

			$('.tweets').append(thread);

		} else {
			var tweets = renderTweet(user, message);
			// var compose = renderCompose()
			$(this).parents('.replies').append(tweets);
		}
		
		return false

	})

	// character countdown in textarea
	 var left = 140
    $('.count').text('Characters left: ' + left);

    $('main').on('keyup', 'textarea', function () {

		left = 140 - $(this).val().length;

		// change count color to red if go over 140char
		if(left < 0){
		    $('.count').css('color', 'red');
		} else {
		    $('.count').css('color', 'black');
		}

		// $('.count').text('Characters left: ' + left);
		$(this).parents('form').find('.count').text('Characters left: ' + left)

    });

});
