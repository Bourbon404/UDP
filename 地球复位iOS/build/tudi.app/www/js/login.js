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

//等待遮罩
function waiTing(text) {
	$('.wait_wrap').show().children('p').text(text);
	$('body').append('<div class="shadow"></div>');
}

//waiTing('登录中,请稍候');

//按钮恢复
function reBtn() {
	$('#loginBtn').css('background', '#00a0e9').removeAttr('clicked');
}

// 返回
$('.header h1').click(function() {
	window.location.href = 'index.html';
});

//国家
$('#selectCountry').click(function() {
	if ($('#loginBtn').attr('clicked') == 'clicked') {
		return;
	};
	$('.country_wrap').show('fast');
});

$('.country_wrap li').click(function() {
	$('#country').text($(this).text());
	$('#AreaCode').text($(this).attr('_value'));
	$('.country_wrap').hide('fast');
});

// 登录
$('#loginBtn').click(function() {
	if ($(this).attr('clicked') == 'clicked') {
		return;
	};

	var AreaCode = $('#AreaCode').text(),
		MobileNum = $('#MobileNum').val(),
		Password = $('#Password').val();

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

	$(this).css('background', '#bfbfbf').attr('clicked', 'clicked');

	Password = hex_md5(Password);

	// 记录账户信息
	localStorage[AREA_CODE] = AreaCode;
	localStorage[MOBILE_NUM] = MobileNum;
	localStorage[POSSWORD] = Password;
	login();
	
});