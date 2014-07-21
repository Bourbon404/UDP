// 警告框
function warning(text, fun) {
	$('.warning_wrap').show().children('p').text(text);
	setTimeout(function() {
		$('.warning_wrap').hide();
		if (typeof fun != 'undefined') {
			fun();
		};
	}, 2000);
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

//恢复按钮
function reBtn() {
	$('#submit').css('background', '#00a0e9').removeAttr('clicked');
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

//返回
$('.header h1').click(function() {
	window.location.href = 'forget_pass.html';
});

//等待验证码
waitCode();

//提交
$('#submit').click(function() {
	if ($(this).attr('clicked') == 'clicked') {
		return;
	};

	var Password = $('#Password').val(),
		rePassword = $('#rePassword').val(),
		VeriCode = $('#VeriCode').val();

	if (VeriCode == '') {
		warning('请输入验证码');
		return;
	};

	if (Password == '') {
		warning('请输入密码');
		return;
	};

	if (!Password.match(/\w{6,16}/)) {
		warning('密码格式不正确');
		return;
	};

	if (rePassword != Password) {
		warning('两次密码不一致');
		return;
	};

	$(this).css('background', '#bfbfbf').attr('clicked', 'clicked');

	var AreaCode = sessionStorage.AreaCode,
		MobileNum = sessionStorage.MobileNum;

	Password = hex_md5(Password);

	//发送数据（手机号码、新密码、验证码、校验码）
	var json = {
		requestItems: getMessage("messageBean/0x01_0x02_req.js", [AreaCode + MobileNum, Password, VeriCode, ""]),
		responseItems: getMessage("messageBean/0x01_0x02_resp.js")
	};
	RndchinaPlugin.RequestPlugin(json, function(data) {
		data = JSON.parse(data);
		switch (data.ResCode) {
			case "0":
				success('密码设置成功', function() {
					window.location.href = 'login.html';
				})
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