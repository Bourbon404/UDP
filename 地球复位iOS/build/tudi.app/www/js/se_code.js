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

//等待验证码
function waitCode() {
	$('#reGetBtn').css({
		"background": "#bfbfbf",
	}).text('60秒后重新获取').attr('wait', 'wait');

	var ind = 0;
	var timer = setInterval(function() {
		ind++;
		$('#reGetBtn').text(60 - ind + '秒后重新获取');
		if (ind == 60) {
			clearInterval(timer);
			$('#reGetBtn').css({
				"background": "#00a0e9",
			}).text('重新获取验证码').removeAttr('wait');
		};
	}, 1000);

	// 停止等待
	clearTimer = function() {
		clearInterval(timer);
		$('#reGetBtn').css({
			"background": "#00a0e9",
		}).text('重新获取验证码').removeAttr('wait');
	}
}

//按钮恢复
function reBtn() {
	$('#submit').css('background', '#00a0e9').removeAttr('clicked');
}

var MobileNum = localStorage[MOBILE_NUM],
	AreaCode = localStorage[AREA_CODE],
	Password = localStorage[POSSWORD];

// 返回
$('.header h1').click(function() {
	window.location.href = 'regist.html';
});

//等待验证码
waitCode();

// 手机号码
$('#MobileNum').text(MobileNum + ' ' + AreaCode);

//重新获取验证码
$('#reGetBtn').click(function() {
	if ($(this).attr('wait') == 'wait') {
		return;
	};

	//发送数据（手机号码、密码、昵称、手机型号、国家、语言、预留、验证码、校验码）
	var json = {
		requestItems: getMessage("messageBean/0x01_0x01_req.js", [AreaCode + MobileNum, Password, "", "mi", "CN", "0x00", "", "", ""]),
		responseItems: getMessage("messageBean/0x01_0x01_resp.js")
	};
	RndchinaPlugin.RequestPlugin(json, function(data) {
		data = JSON.parse(data);
		switch (data.ResCode) {
			case "255":
				warning('未知错误');
				clearTimer();
		};
	}, function(data) {
		warning('失败');
		clearTimer();
	});

	waitCode();
});

//确认提交
$('#submit').click(function() {
	if ($(this).attr('clicked') == 'clicked') {
		return;
	};

	var VeriCode = $('#VeriCode').val();

	if (VeriCode == '') {
		warning('请输入验证码');
		return;
	};

	$(this).css('background', '#bfbfbf').attr('clicked', 'clicked');

	//发送数据（手机号码、密码、昵称、手机型号、国家、语言、预留、验证码、校验码）
	var json = {
		requestItems: getMessage("messageBean/0x01_0x01_req.js", [AreaCode + MobileNum, Password, "", "mi", "CN", "0x00", "", VeriCode, ""]),
		responseItems: getMessage("messageBean/0x01_0x01_resp.js")
	};
	RndchinaPlugin.RequestPlugin(json, function(data) {
		data = JSON.parse(data);
		switch (data.ResCode) {
			case "0":
				$('#reGetBtn').hide();
				success('恭喜您，注册成功', function() {
					login();
				});
				break;
			case "1":
				warning('验证码错误', reBtn);
				break;
			case "255":
				warning('未知错误，请重试', reBtn);
				clearTimer();
		};
	}, function(data) {
		warning('失败，请重试', reBtn);
		clearTimer();
	});
});