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
function getByteLength(str){
	var i,sum=0;
	for(i=0;i<str.length;i++){
		if((str.charCodeAt(i)>=0) && (str.charCodeAt(i)<=255))
			sum=sum+1;
		else
			sum=sum+3;
	}
	return sum; 
}
//提交
$('#submit').click(function() {
	if ($(this).attr('clicked') == 'clicked') {
		return;
	};

	var NickName = $('#NickName').val();

	if (NickName == '') {
		warning('请输入昵称');
		return;
	}else if(getByteLength(NickName)>19){
		warning('昵称不能超过19个字符，一个汉字占3个字符');
		return;
	}

	$(this).css('background', '#bfbfbf').attr('clicked', 'clicked');

	//发送数据（手机号码、密码、昵称、手机型号、国家、校验码）
	var json = {
		requestItems: getMessage("messageBean/0x01_0x05_req.js", [localStorage[AREA_CODE] + localStorage[MOBILE_NUM], localStorage[POSSWORD], NickName, "mi", "CN", "0"]),
		responseItems: getMessage("messageBean/0x01_0x05_resp.js")
	};
	RndchinaPlugin.RequestPlugin(json, function(data) {
		data = JSON.parse(data);
		switch (data.ResCode) {
			case "0":
				localStorage[NICK_NAME]=NickName;
				success('昵称设置成功', function() {
					window.location.href = 'system_set.html';
				});
				break;
			default:
				warning('未知错误，请重试', reBtn);
		};
	}, function(data) {
		warning('失败，请重试', reBtn);
	});
});