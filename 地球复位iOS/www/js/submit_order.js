// 警告框
function warning(text, fun) {
	$('.warning_wrap').show().children('p').text(text);
	setTimeout(function() {
		$('.warning_wrap').hide();
		if (typeof fun != 'undefined') {
			fun();
		};
	}, 1000);
}

//成功提示
function success(text, fun) {
	$('.success_wrap').show().children('p').text(text);
	setTimeout(function() {
		$('.success_wrap').hide();
		if (typeof fun != 'undefined') {
			fun();
		};
	}, 1000);
}

//按钮恢复
function reBtn() {
	$('#loginBtn').css('background', '#00a0e9').removeAttr('clicked');
}

//实例iScroll
var submitIscroll = new iScroll('submitWrapper');

//选择银行或者支付宝
$('#selectBank').click(function() {
	$('#selectBank').attr('src', 'image/dot_light.png');
	$('#selectAlipay').attr('src', 'image/dot1.png');
});

$('#selectAlipay').click(function() {
	$('#selectAlipay').attr('src', 'image/dot_light.png');
	$('#selectBank').attr('src', 'image/dot1.png');
});