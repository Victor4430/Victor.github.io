function getTime(){
				var Week, Weekday;
				var date = new Date();
				Week = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
				Weekday = date.getDay();
				year = date.getFullYear();
				month = date.getMonth() + 1;
				day = date.getDate();
				hours = date.getHours();
				minutes = date.getMinutes();
				seconds = date.getSeconds();
				document.getElementById("getTime").innerHTML = year + "年" + month + "月" + day + "日" + "\t" + hours + ":" + minutes + ":" + seconds + "\t" + Week[Weekday];
			}