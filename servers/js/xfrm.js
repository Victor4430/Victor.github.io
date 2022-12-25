var mobile=navigator.userAgent;
    mobile=mobile.toLowerCase();
document.writeln("<center><div id='iwq' style='display:none';></div></center>");
document.writeln("<iframe name=\'frm\' id=\'frm\' src=\'\' width=\'100%\' height=\'100%\' frameborder=\'no\'></iframe>");
username=username.replace(/\s/g,"");
var obj = /^[0-9a-zA-Z]*$/g;
var user_url=location.href.split("login.html")[0];
var agent_url="https://"+username+".3v.do/urla.asp";
if (username=="" ){
alert("代理账号不能为空！请查看代理设置方法！");
location.href=user_url+"setup.html";
}
else if (username.length<3){
alert("代理账号不能小于3位！");
location.href=user_url;
}
else if (username.length>18){
alert("代理账号不能大于18位！");
location.href=user_url;
}
else if (!obj.test(username)){
alert("代理账号只能是数字和字母！");
location.href=user_url;
}
else if (mobile.indexOf("mobile")!=-1 && (mobile.indexOf("iphone")!=-1 || mobile.indexOf("ipad")!=-1) && (mobile.indexOf("micromessenger")!=-1 || mobile.indexOf(" qq")!=-1)){
document.getElementById("iwq").style.display="";
document.getElementById("iwq").innerHTML="<font color=red><br><br>请复制链接下面的链接，在浏览器中打开！</font><br><br><br><br><br><font color=blue>"+location.href+"</font>"
}
else {
document.getElementById("frm").src=agent_url;
}