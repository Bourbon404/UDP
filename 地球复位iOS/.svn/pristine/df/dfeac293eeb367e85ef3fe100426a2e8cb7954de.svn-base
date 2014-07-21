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

//恢复按钮
function reBtn() {
	$('#submit').css('background', '#00a0e9').removeAttr('clicked');
}

//提交
$('#submit').click(function() {
	if ($(this).attr('clicked') == 'clicked') {
		return;
	};

	var oldPassword = $('#oldPassword').val(),
		Password = $('#Password').val(),
		rePassword = $('#rePassword').val();

	if (oldPassword == '') {
		warning('请输入旧密码');
		return;
	};

	if (!oldPassword.match(/\w{6,16}/)) {
		warning('旧密码格式不对');
		return;
	};

	if (Password == '') {
		warning('请输入新密码');
		return;
	};

	if (!Password.match(/\w{6,16}/)) {
		warning('新密码格式不对');
		return;
	};

	if (rePassword == '') {
		warning('请输入确认密码');
		return;
	};

	if (rePassword != Password) {
		warning('确认密码不一致');
		return;
	};

	$(this).css('background', '#bfbfbf').attr('clicked', 'clicked');

	oldPassword = hex_md5(oldPassword);
	Password = hex_md5(Password);

	//发送数据（手机号码、旧密码、新密码、校验码）
	var json = {
		requestItems: getMessage("messageBean/0x01_0x03_req.js", [localStorage[AREA_CODE] + localStorage[MOBILE_NUM], oldPassword, Password, "0"]),
		responseItems: getMessage("messageBean/0x01_0x03_resp.js")
	};
	RndchinaPlugin.RequestPlugin(json, function(data) {
		data = JSON.parse(data);
		switch (data.ResCode) {
			case "0":
				localStorage[POSSWORD] = Password;
				success('密码修改成功', function() {
					window.location.href = 'system_set.html';
				});
				break;
			case "4":
				warning('旧密码错误', reBtn);
				break;
			default:
				warning('未知错误，请重试', reBtn);
		};
	}, function(data) {
		warning('失败，请重试', reBtn);
	});

});