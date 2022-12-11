function playM3u8(url) {
  if (Hls.isSupported()) {
    var video = document.getElementById('player');
    video.volume = 1.0;
    var hls = new Hls();
    var m3u8Url = decodeURIComponent(url)
    hls.loadSource(m3u8Url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function() {
      video.play();
    });
  }
}
var uri = window.location.href.split("#")[1];
if (uri != null) {
  $('.s-input').val(uri)
  playM3u8(uri)
  setTimeout(function() {
    $("html,body").animate({
      scrollTop: $(".input-div").offset().top - 20
    }, 200);
  }, 3000);
}
$("#str-post").submit(function() {
  $("html,body").animate({
    scrollTop: $(".input-div").offset().top - 20
  }, 200);
  playM3u8($("#str-post").serializeArray()[0].value);
  return false;
})
function isIframe() {
  if (self != top) {
    $('header,footer,.logo,.input-div,.am-text-right,.am-alert-secondary').remove();
    $('#player,.am-container,body,html').css({
      'height': '100%',
      'width': '100%',
    });
    $('.am-container').removeClass('am-container');
  }
}
isIframe();
setTimeout(function() {
  isIframe();
}, 1000)