jQuery(document).ready(function() {
	var $players_on_page = $('.jp-audio').length;
	var $song_title = '';
	if ($players_on_page > 0) {
		for (var i = 1; i <= $players_on_page; i++) {
			$('.jp-audio').eq(i - 1).addClass('jp-audio' + i);
		};
		setTimeout(function() {
			for (var i = 1; i <= $players_on_page; i++) {
				$song_title = $('.jp-audio' + i +
					' .jp-playlist ul li.jp-playlist-current .jp-playlist-item').html();
				$('.jp-audio' + i + ' .song_title').html($song_title);
			};
		}, 1000);

		function switchSong() {
			setTimeout(function() {
				for (var i = 1; i <= $players_on_page; i++) {
					$('.jp-audio' + i + ' .jp-previous, .jp-audio' + i + ' .jp-next').removeClass(
						'disabled');
					if ($('.jp-audio' + i + ' .jp-playlist ul li:last-child').hasClass(
							'jp-playlist-current')) {
						$('.jp-audio' + i + ' .jp-next').addClass('disabled');
					}
					if ($('.jp-audio' + i + ' .jp-playlist ul li:first-child').hasClass(
							'jp-playlist-current')) {
						$('.jp-audio' + i + ' .jp-previous').addClass('disabled');
					}
					$song_title = $('.jp-audio' + i +
						' .jp-playlist ul li.jp-playlist-current .jp-playlist-item').html();
					$('.jp-audio' + i + ' .song_title').html($song_title);
				}
			}, 0)
		};
		$('.jp-previous, .jp-next, .jp-playlist ul').click(function() {
			switchSong()
		});
		$(".jp-jplayer").on($.jPlayer.event.ended, function(event) {
			switchSong()
		});
	};
	$(".jp-playlist-toggle").click(function() {
		var $this = $(this);
		for (var i = 1; i <= $players_on_page; i++) {
			if ($this.parents('.jp-audio').hasClass('jp-audio' + i)) {
				$('.jp-audio' + i + ' .jp-playlist').slideToggle("slow");
			}
		}
	});
});
