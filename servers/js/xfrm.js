var mobile=navigator.userAgent;
    mobile=mobile.toLowerCase();
document.writeln("<center><div id='iwq' style='display:none';></div></center>");
document.writeln("<iframe name=\'frm\' id=\'frm\' src=\'\' width=\'100%\' height=\'100%\' frameborder=\'no\'></iframe>");
username=username.replace(/\s/g,"");
var obj = /^[0-9a-zA-Z]*$/g;
var user_url=location.href.split("login.html")[0];
var agent_url="https://"+username+".3v.do/urla.asp";
if (username=="" ){
alert("�����˺Ų���Ϊ�գ���鿴�������÷�����");
location.href=user_url+"setup.html";
}
else if (username.length<3){
alert("�����˺Ų���С��3λ��");
location.href=user_url;
}
else if (username.length>18){
alert("�����˺Ų��ܴ���18λ��");
location.href=user_url;
}
else if (!obj.test(username)){
alert("�����˺�ֻ�������ֺ���ĸ��");
location.href=user_url;
}
else if (mobile.indexOf("mobile")!=-1 && (mobile.indexOf("iphone")!=-1 || mobile.indexOf("ipad")!=-1) && (mobile.indexOf("micromessenger")!=-1 || mobile.indexOf(" qq")!=-1)){
document.getElementById("iwq").style.display="";
document.getElementById("iwq").innerHTML="<font color=red><br><br>�븴��������������ӣ���������д򿪣�</font><br><br><br><br><br><font color=blue>"+location.href+"</font>"
}
else {
document.getElementById("frm").src=agent_url;
}