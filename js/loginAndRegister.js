
/*用于设置CSS样式的js代码 开始*/

//用户头像的旋转效果
$(".login-head img").hover(function() {
	$(this).css({
		"transform": "rotateZ(360deg)",
		"-webkit-transform": "rotateZ(360deg)",
		"transition": "transform 0.5s",
		"-webkit-transition": "transform 0.5s"
	});
}, function() {
	$(this).css({
		"transform": "rotateZ(-360deg)",
		"-webkit-transform": "rotateZ(-360deg)",
		"transition": "transform 0.5s",
		"-webkit-transition": "transform 0.5s"
	});
})

//页面加载完成后 执行改变背景高度
$(function() {
	changeBGHeight();
	$(".login-head img").css({
		"transform": "rotateZ(360deg)",
		"-webkit-transform": "rotateZ(360deg)",
		"transition": "transform 0.6s",
		"-webkit-transition": "transform 0.6s"
	});
})

//当浏览器窗口大小改变时，设置显示内容的高度  
window.onresize = function() {
	changeBGHeight();
}

//用于设置 背景图片自适应高度
function changeBGHeight() {
//导航高度
	var h = $(window).height();
	$(".bg").css("height", h);
}

/*用于设置CSS样式的js代码 结束*/



/*用于登录校验 和 验证码校验的js代码 开始*/

//点击登录进行验证码校验
function Login() {
	loginVerify();
}

var code; //在全局定义验证码
window.onload = function() {
		createCode();
	}

//产生验证码
function createCode() {
	code = "";
	var codeLength = 4; //验证码的长度  
	var checkCode = document.getElementById("code");
	var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
		'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数  
	for(var i = 0; i < codeLength; i++) { //循环操作  
		var index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）  
		code += random[index]; //根据索引取得随机数加到code上  
	}
	checkCode.value = code; //把code值赋给验证码  
}

//校验验证码 和 登录信息
function loginVerify() {

	var inputCode = document.getElementById("codeValidValue").value.toUpperCase(); //取得输入的验证码并转化为大写        
	if(inputCode.length <= 0) { //若输入的验证码长度为0  		
		alert("请输入验证码！"); //则弹出请输入验证码  
	} else if(inputCode != code) { //若输入的验证码与产生的验证码不一致时		
		alert("验证码输入错误，请重新输入！"); //则弹出验证码输入错误  
		createCode(); //刷新验证码  
		document.getElementById("codeValidValue").value = ""; //清空文本框  
	} else { //输入正确时

		//alert("验证成功,正在跳转页面"); //验证成功
		loginLoading();
	}
}
//登录加载状态
function loginLoading() {
	var loadMes = $(".loadMessage");
	loadMes.css({
		"color": "#5cb85c"
	});
	var count = 0;
	var strHead = "验证成功,正在跳转页面";
	var strFull = "";
	var time = setInterval(function() {

		if(count < 18) {
			strFull = strHead + getDian(count);
			loadMes.html(strFull);
			count++;
		} else {
			loadMes.html("");
			clearInterval(time);
			location.href = "index.html";
		}

	}, 600);

	//获取加载的小点
	function getDian(ti) {
		var symbolStr="·";
		var str = "";
		var len = ti + 1;
		var newLen = 0;
		if(len > 6) {
			if(len == 6) {
				newLen = 1
			} else {
				newLen = len % 6;
				if(newLen == 0) {newLen = 6}
			}			
		} else {
			newLen = len;
		}
		for(var i = 0; i < newLen; i++) {
			if(i == 0) {
				str = symbolStr;
			} else {
				str += symbolStr;
			};
		}
		return str;
	}

}