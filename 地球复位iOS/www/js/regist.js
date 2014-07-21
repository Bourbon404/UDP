$(function(){
	$(".country_wrap ul").html(getHtml("./country.html"));
	$('.country_wrap li').click(function() {
		$('#country').text($(this).text());
		$('#AreaCode').text($(this).attr('_value'));
		$('.country_wrap').hide('fast');
	});
});
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

//计算密码长度
function countLength(text) {
	var len = 0,
		arr = text.split('');

	for (var i = 0; i < arr.length; i++) {
		if (arr[i].charCodeAt(0) < 299) {
			len++;
		} else {
			len += 2;
		}
	}
	return len;
}

// 返回
$('.header h1').click(function() {
	window.location.href = 'index.html';
});

//按钮恢复
function reBtn() {
	$('#registNext').css('background', '#00a0e9').removeAttr('clicked');
}

//用户名相关提示信息
$('.user_name').focus(function() {
	$(this).next().hide();
}).blur(function() {
	if ($(this).val() == '') {
		$(this).next().show();
	};
});

//点击同意
$('.read-check').click(function(event) {
	if (!!$(this).attr('checked')) {
		$(this).css({
			'background': 'url(image/box.png) 0 bottom no-repeat',
			'backgroundSize': '13px'
		}).removeAttr('checked');
	} else {
		$(this).css({
			'background': 'url(image/right_box.png) 0 0 no-repeat',
			'backgroundSize': '15px'
		}).attr('checked', 'checked');
	};
});

//国家
$('#selectCountry').click(function() {
	if ($('#registNext').attr('clicked') == 'clicked') {
		return;
	};
	$('.country_wrap').show('fast');
});
//下一步
$('#registNext').click(function() {
	if ($(this).attr('clicked') == 'clicked') {
		return;
	};

	var AreaCode = $('#AreaCode').text(), //国家区号
		MobileNum = $('#MobileNum').val(), //手机号
		Password = $('#Password').val(), //密码
		rePassword = $('#rePassword').val(); //重复密码

	if (MobileNum == '') {
		warning('请输入手机号');
		return;
	};

	if (!MobileNum.match(/\d{11}/)) {
		warning('手机号格式不正确');
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

	if ($('.read-check').attr('checked') != 'checked') {
		warning('请阅读服务协议');
		return;
	};

	$(this).css('background', '#bfbfbf').attr('clicked', 'clicked');

	Password = hex_md5(Password);
	

	//发送数据（手机号码、密码、昵称、手机型号、国家、语言、预留、验证码、校验码）
	var json = {
		requestItems: getMessage("messageBean/0x01_0x01_req.js", [AreaCode + MobileNum, Password, "", "mi", "CN", "0x00", "", "", ""]),
		responseItems: getMessage("messageBean/0x01_0x01_resp.js")
	};
	RndchinaPlugin.RequestPlugin(json, function(data) {
		data = JSON.parse(data);
		switch (data.ResCode) {
			case "7":
				// 记录账户信息
				localStorage[AREA_CODE] = AreaCode;
				localStorage[MOBILE_NUM] = MobileNum;
				localStorage[POSSWORD] = Password;
				window.location.href = 'security_code.html';
				break;
			case "2":
				warning('用户已存在', reBtn);
				break;
			default:
				warning('未知错误，请重试', reBtn);
		};
	}, function(data) {
		warning('失败，请重试', reBtn);
	});
});