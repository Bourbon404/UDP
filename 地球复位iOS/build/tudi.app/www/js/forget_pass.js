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

//按钮恢复
function reBtn() {
	$('#submit').css('background', '#00a0e9').removeAttr('clicked');
}

//返回
$('.header h1').click(function() {
	window.location.href = 'login.html';
});

//国家
$('#selectCountry').click(function() {
	if ($('#submit').attr('clicked') == 'clicked') {
		return;
	};
	$('.country_wrap').show('fast');
});

$('.country_wrap li').click(function() {
	$('#country').text($(this).text());
	$('#AreaCode').text($(this).attr('_value'));
	$('.country_wrap').hide('fast');
});

// 提交
$('#submit').click(function() {
	if ($(this).attr('clicked') == 'clicked') {
		return;
	};

	var AreaCode = $('#AreaCode').text(),
		MobileNum = $('#MobileNum').val();

	if (MobileNum == '') {
		warning('请输入手机号');
		return;
	};

	if (!MobileNum.match(/\d{11}/)) {
		warning('手机号格式不正确');
		return;
	};

	$(this).css('background', '#bfbfbf').attr('clicked', 'clicked');

	// 记录账户信息
	sessionStorage.AreaCode = AreaCode;
	sessionStorage.MobileNum = MobileNum;

	//发送数据（手机号码、新密码、验证码、校验码）
	var json = {
		requestItems: getMessage("messageBean/0x01_0x04_req.js", [AreaCode + MobileNum, "", "", ""]),
		responseItems: getMessage("messageBean/0x01_0x04_resp.js")
	};
	RndchinaPlugin.RequestPlugin(json, function(data) {
		data = JSON.parse(data);
		switch (data.ResCode) {
			case "0":
				window.location.href = 'set_passowrd.html';
				break;
			case "1":
				warning('验证码错误', reBtn);
				break;
			default:
				warning('未知错误，请重试', reBtn);
		};
	}, function(data) {
		warning('失败，请重试', reBtn);
	});
});