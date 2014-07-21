/**
 * 使用的地图api
 * baidu
 * google
 * */
var mapApi = "baidu";
/**
 * 数据传输接口字段类型
 * */
var MESSAGE_PARAM_TYPE = {
	STRING: "String",
	BYTE: "byte",
	INT: "int",
	SHORT: "short",
	FLOAT: "float"
};
/**
 * 请求报文头
 * @param cmdType:命令类	0x01：发往玩家服务器消息；
 *						0x02：玩家服务器主动发起消息；
 *						0x03：发往土地服务器消息；
 *						0x04：服务器间消息；
 * @param subType:命令子类
 * @param cmdLength:报文长度
 *
 * */
function MessageHeadReq(cmdType, subType, cmdLength) {
	//注册请求消息中为-1，响应报文中携带服务器分配的唯一编码，客户端要永久保存
	var userId = localStorage[USER_ID];
	if (userId == undefined || (cmdType == "0x01" && subType == "0x01") || (cmdType == "0x01" && subType == "0x02"))
		userId = "-1";
	//一次交互成为一个事务，发起事务的设备生成事务ID，并依次加一，不能用0作为事务ID
	var transactionId = localStorage[TRANSACTION_ID];
	if (transactionId == undefined)
		transactionId = 0;
	transactionId++;
	localStorage[TRANSACTION_ID] = transactionId;
	return [{
		type: MESSAGE_PARAM_TYPE.INT,
		length: 4,
		value: "-269484290"
	}, {
		type: MESSAGE_PARAM_TYPE.STRING,
		length: 3,
		value: "101"
	}, {
		type: MESSAGE_PARAM_TYPE.BYTE,
		length: 1,
		value: "0x01"
	}, {
		type: MESSAGE_PARAM_TYPE.BYTE,
		length: 1,
		value: cmdType
	}, {
		type: MESSAGE_PARAM_TYPE.BYTE,
		length: 1,
		value: subType
	}, {
		type: MESSAGE_PARAM_TYPE.SHORT,
		length: 2,
		value: cmdLength
	}, {
		type: MESSAGE_PARAM_TYPE.INT,
		length: 4,
		value: transactionId
	}, {
		type: MESSAGE_PARAM_TYPE.INT,
		length: 4,
		value: userId
	}];
}
/**
 * 响应报文头
 * */
function MessageHeadResp() {
	return [{
		type: MESSAGE_PARAM_TYPE.INT,
		length: 4,
		name: "Protocol"
	}, {
		type: MESSAGE_PARAM_TYPE.STRING,
		length: 3,
		name: "Version"
	}, {
		type: MESSAGE_PARAM_TYPE.BYTE,
		length: 1,
		name: "isreq"
	}, {
		type: MESSAGE_PARAM_TYPE.BYTE,
		length: 1,
		name: "CmdType"
	}, {
		type: MESSAGE_PARAM_TYPE.BYTE,
		length: 1,
		name: "SubType"
	}, {
		type: MESSAGE_PARAM_TYPE.SHORT,
		length: 2,
		name: "cmdLength"
	}, {
		type: MESSAGE_PARAM_TYPE.INT,
		length: 4,
		name: "TransactionID"
	}, {
		type: MESSAGE_PARAM_TYPE.INT,
		length: 4,
		name: "UserID"
	}];
}
/**
 * 浮点数加法
 * */
Number.prototype.add = function(arg1) {
	var r1, r2, m, c;
	var arg2 = this;
	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}

	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}

	c = Math.abs(r1 - r2);
	m = Math.pow(10, Math.max(r1, r2));
	if (c > 0) {
		var cm = Math.pow(10, c);
		if (r1 > r2) {
			arg1 = Number(arg1.toString().replace(".", ""));
			arg2 = Number(arg2.toString().replace(".", "")) * cm;
		} else {
			arg1 = Number(arg1.toString().replace(".", "")) * cm;
			arg2 = Number(arg2.toString().replace(".", ""));
		}
	} else {
		arg1 = Number(arg1.toString().replace(".", ""));
		arg2 = Number(arg2.toString().replace(".", ""));
	}
	return (arg1 + arg2) / m;
};
/**
 * 浮点数减法
 * */
Number.prototype.subtraction = function(arg) {
	var r1, r2, m, n;
	try {
		r1 = this.toString().split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	//动态控制精度长度 
	n = (r1 >= r2) ? r1 : r2;
	return parseFloat(((this * m - arg * m) / m).toFixed(n));
};
/**
 * 浮点取余数
 */
Number.prototype.remainder = function(arg) {
	var r1, m;
	try {
		r1 = parseInt(this.toString().split(".")[0]);
	} catch (e) {
		r1 = 0;
	}
	if (r1 % arg == r1)
		return this;
	else {
		m = r1 % arg;
		return this.subtraction(r1 - m);
	}
};
/**
 * 浮点乘法
 */
Number.prototype.mul = function(arg) {
	var m = 0,
		s1 = arg.toString(),
		s2 = this.toString();
	try {
		m += s1.split(".")[1].length;
	} catch (e) {}
	try {
		m += s2.split(".")[1].length;
	} catch (e) {}
	return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
};
/**
 * 浮点除法
 * */
Number.prototype.div = function(arg2) {
	var t1 = 0,
		t2 = 0,
		r1, r2;
	try {
		t1 = this.toString().split(".")[1].length;
	} catch (e) {}
	try {
		t2 = arg2.toString().split(".")[1].length;
	} catch (e) {}
	with(Math) {
		r1 = Number(this.toString().replace(".", ""));
		r2 = Number(arg2.toString().replace(".", ""));
		return (r1 / r2) * pow(10, t2 - t1);
	}
};
//获取手机系统参数
function deviceType() {
	var checker = {
		ios : navigator.userAgent.match(/(iPhone|iPod|iPad)/i),
		blackberry : navigator.userAgent.match(/BlackBerry/i),
		android : navigator.userAgent.match(/Android/i),
		windows : navigator.userAgent.match(/windows/i),
	};
	if (checker.android) {
		return "android";
	} else if (checker.ios) {
		return "ios";
	} else if (checker.blackberry) {
		return "blackberry";
	} else if (checker.windows) {
		return "windows";
	} else {
		return "";
	}
}
/**
 * 获取页面
 * */
function getHtml(url) {
	var html;
	$.ajax({
		type: 'GET',
		url: url,
		dataType: 'html',
		timeout: 50000,
		async: false,
		cache: false,
		success: function(ret) {
			html = ret;
		}
	});
	return html;
}
/**
 * 获取报文
 * */
function getMessage(url, param) {
	var ret;
	$.ajax({
		type: 'GET',
		url: url,
		dataType: 'text',
		timeout: 50000,
		async: false,
		cache: false,
		success: function(message) {
			var f2 = eval('(' + message + ')');
			if (param != undefined)
				ret = f2(param);
			else
				ret = f2();
		}
	});
	return ret;
}
//安卓报文传输
var RndchinaPlugin = {
	//tn=[内容,图片url,内容超链接,平台]
	RequestPlugin: function(tn, success, error) {
		if(deviceType()=="android")
			cordova.exec(success, error, 'RequestPlugin', 'share', [tn]);
		else
			return Cordova.exec(success, error, "RequestPlugin", 'share', [tn]);
	},
	StartPushPlugin: function(tn, success, error) {
		if(deviceType()=="android")
			cordova.exec(success, error, 'PushPlugin', 'start', [tn]);
		else
			return Cordova.exec(success, error, "PushPlugin", 'start', [tn]);
	},
	ResponsePlugin: function(tn, success, error) {
		if(deviceType()=="android")
			cordova.exec(success, error, 'PushPlugin', 'response', [tn]);
		else
			return Cordova.exec(success, error, "PushPlugin", 'response', [tn]);
	},
	HeartPlugin: function(tn, success, error) {
		if(deviceType()=="android")
			cordova.exec(success, error, 'PushPlugin', 'heart', [tn]);
		else
			return Cordova.exec(success, error, "PushPlugin", 'heart', [tn]);
	}
};
/**
 * 启动心跳
 * */
function startHeartBeat() {
	//心跳
	HEART_BEAT_ID = setInterval(function() {
		getLocation();
		var lng = 0;
		var lat = 0;
		if (localStorage[USER_LNG] != undefined && localStorage[USER_LAT] != undefined) {
			lng = localStorage[USER_LNG];
			lat = localStorage[USER_LAT];
		}
		var json = {
			requestItems: getMessage("messageBean/0x01_0x20_req.js", [lng, lat, "0"]),
			responseItems: getMessage("messageBean/0x01_0x20_resp.js")
		};
		RndchinaPlugin.HeartPlugin(json, function(data) {
			data = JSON.parse(data);
			if (data.ResCode == "5") {
				warning('登陆超时', function() {
					window.location.href = 'login.html';
				});
			}
		}, function(data) {});
	}, 1000 * HEART_BEAT_TIME);
}
//警告框
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
//等待遮罩
function waiTing(text) {
	$('.wait_wrap').show().children('p').text(text);
	$('body').append('<div class="shadow"></div>');
}

function stopWaiTing() {
	$(".shadow").remove();
	$('.wait_wrap').hide();
}
//等待遮罩
function loading() {
	$('.loading').show();
	$('body').append('<div class="shadow"></div>');
}

function stopLoading() {
	$('.loading').hide();
	$(".shadow").remove();
}

function login() {
	waiTing("登录中");
	localStorage.removeItem(TRANSACTION_ID);
	//发送数据（手机号码、密码、昵称、手机型号、国家、语言、预留、验证码、校验码）
	var json = {
		requestItems: getMessage("messageBean/0x01_0x02_req.js", [localStorage[AREA_CODE] + localStorage[MOBILE_NUM], localStorage[POSSWORD], "", "mi", "0x00", "", VERSION, ""]),
		responseItems: getMessage("messageBean/0x01_0x02_resp.js")
	};
	RndchinaPlugin.RequestPlugin(json, function(data) {
		data = JSON.parse(data);
		stopWaiTing();
		switch (data.ResCode) {
			case "0":
				success('登录成功', function() {
					localStorage[USER_ID] = data.UserID;
					localStorage[NICK_NAME] = data.NickName;
					localStorage[FRIEND_NUM] = data.FriendNum;
					localStorage[LANDS_NUM] = data.LandsNum;
					localStorage[TOTAL_VALUE] = data.TotalValue;
					localStorage[POINTS] = data.Points;
					localStorage[GIVEN_MONEY] = data.GivenMoney;
					localStorage[TOTAL_MONEY] = data.TotalMoney;
					localStorage[RANK] = data.Rank;
					localStorage[FIRST_LOGIN] = data.FirstLogin;
					window.location.href = 'landindex.html';
				});
				break;
			case "3":
				warning('用户不存在', reBtn);
				break;
			case "4":
				warning('密码错误', reBtn);
				break;
			default:
				warning('未知错误，请重试', reBtn);
		};
	}, function(data) {
		stopWaiTing();
		warning(data, reBtn);
	});
}
/**
 * 获取推送消息
 * */
function getPushMessage(data) {
	var message = JSON.parse(data);
	var cmdType = "",
		subType = "",
		timeObj=new Date();
	switch (message.header.subType) {
		case "1":
			//一般通知
			cmdType = "0x02";
			subType = "0x01";
			var json = {
				key:0,
				datetime:timeObj.getTime(),
				contentLength: message.contentLength,
				msgContent: message.content
			};
			if (sessionStorage[System_SendMessage] == undefined)
				sessionStorage[System_SendMessage] = JSON.stringify([json]);
			else {
				var temp = JSON.parse(sessionStorage[System_SendMessage]);
				temp.push(json);
				sessionStorage[System_SendMessage] = JSON.stringify(temp);
			}
			break;
		case "2":
			//好友请求通知
			cmdType = "0x02";
			subType = "0x02";
			var json = {
				friendId: message.friendID,
				friendMobile: message.friendMobile,
				friendName: message.friendName
			};
			if (localStorage[CONFIRMATION_FRIENDS] == undefined)
				localStorage[CONFIRMATION_FRIENDS] = JSON.stringify([json]);
			else {
				var temp = JSON.parse(localStorage[CONFIRMATION_FRIENDS]);
				temp.push(json);
				localStorage[CONFIRMATION_FRIENDS] = JSON.stringify(temp);
			}
			break;
		case "3":
			//好友响应通知
			cmdType = "0x02";
			subType = "0x03";
			var json = {
				key:1,
				datetime:timeObj.getTime(),
				agree: message.agree,
				friendId: message.friendID,
				friendMobile: message.friendMobile,
				friendName: message.friendName,
				money: message.money,
				friendNum: message.friendNum,
				landsNum: message.landsNum,
				totalValue: message.totalValue,
				points: message.points,
				rank: message.rank,
				status: message.status,
				agreePosition: message.agreePosition,
				givenMoney: message.givenMoney,
				totalMoney: message.totalMoney
			};
			if (sessionStorage[System_SendMessage] == undefined)
				sessionStorage[System_SendMessage] = JSON.stringify([json]);
			else {
				var temp = JSON.parse(sessionStorage[System_SendMessage]);
				temp.push(json);
				sessionStorage[System_SendMessage] = JSON.stringify(temp);
			}
			break;
		case "4":
			//赠送金币通知
			cmdType = "0x02";
			subType = "0x04";
			var json = {
				key:2,
				datetime:timeObj.getTime(),
				givenMoney: message.givenMoney,
				totalMoney: message.totalMoney
			};
			if (sessionStorage[System_SendMessage] == undefined)
				sessionStorage[System_SendMessage] = JSON.stringify([json]);
			else {
				var temp = JSON.parse(sessionStorage[System_SendMessage]);
				temp.push(json);
				sessionStorage[System_SendMessage] = JSON.stringify(temp);
			}
			break;
		case "5":
			//土地成交通知
			cmdType = "0x02";
			subType = "0x05";
			var json = {
				key:3,
				datetime:timeObj.getTime(),
				landType: message.landType,
				price: message.price,
				address: message.address,
				money: message.money,
				landsNum: message.landsNum,
				totalValue: message.totalValue
			};
			if (sessionStorage[System_SendMessage] == undefined)
				sessionStorage[System_SendMessage] = JSON.stringify([json]);
			else {
				var temp = JSON.parse(sessionStorage[System_SendMessage]);
				temp.push(json);
				sessionStorage[System_SendMessage] = JSON.stringify(temp);
			}
			break;
		case "6":
			//用户升级通知
			cmdType = "0x02";
			subType = "0x06";
			var json = {
				key:4,
				datetime:timeObj.getTime(),
				newRank: message.newRank,
				givenMoney: message.givenMoney,
				totalMoney: message.totalMoney
			};
			if (sessionStorage[System_SendMessage] == undefined)
				sessionStorage[System_SendMessage] = JSON.stringify([json]);
			else {
				var temp = JSON.parse(sessionStorage[System_SendMessage]);
				temp.push(json);
				sessionStorage[System_SendMessage] = JSON.stringify(temp);
			}
			break;
		default:
			cmdType = "";
			subType = "";
	};
	if (cmdType != "" && subType != "") {
		var array = MessageHeadReq(cmdType, subType, "28").concat([{
			type: MESSAGE_PARAM_TYPE.INT,
			length: 4,
			value: "0"
		}, {
			type: MESSAGE_PARAM_TYPE.INT,
			length: 4,
			value: "0"
		}]);
		array[2].value = "0x00";
		array[6].value=message.header.transactionId;
		var json = {
			requestItems: array
		};
		RndchinaPlugin.ResponsePlugin(json, function(data) {}, function(data) {});
	} else
		console.error("未知的推送信息" + data);
}
/**
 * 获取位置
 * */
function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			localStorage[USER_LNG] = position.coords.longitude;
			localStorage[USER_LAT] = position.coords.latitude;
		});
	}
}

//格式时间的函数  转化为年月日形式
function Convert2DateTime(date) {
	var result_date = new Date(date * 1000);
	var year = result_date.getFullYear();
	var month = result_date.getMonth();
	var hour = result_date.getHours();
	var miniute = result_date.getMinutes();
	month += 1;
	var day = result_date.getDate();
	var result = year + '-' + month + '-' + day + ' ' + hour + ':' + miniute;
	return result;
}
//获取经验百分比
function getExperience(score){
	var scoreArray=[0,200,500,1000,1500,2000,2500,3500,4000,5000];
	if(score>=5000){
		return 1.0;
	}else if(score==0){
		return 0.0;
	}else{
		for(var i in scoreArray){
			if((scoreArray[i]-score)>0){
				var scoreAll=(scoreArray[i]-scoreArray[i-1])/100;
				return (score-scoreArray[i-1])/100/scoreAll;
			}
		}
		return 0.0;
	}
}
/**
 * 使用占地的建筑在当前等级是否能占地或者合并
 * @param width:宽度
 * @param height:高度
 * @param rank:级别
 * @param merge:0不是合并  1合并
 * */
function ifCaptureLand(width,height,rank,merge){
	var flag=false;
	if(merge==undefined)
		merge="0";
	switch (rank) {
		case "1":
			if(width==1&&height==1&&merge=="0")
				flag=true;
			break;
		case "2":
			if(width<=2&&height==1&&merge=="0")
				flag=true;
			break;
		case "3":
			if(width<=2&&height==1)
				flag=true;
			break;
		case "4":
			if((width<=2&&height<=2&&merge=="0")||(width<=2&&height==1&&merge=="1"))
				flag=true;
			break;
		case "5":
			if(width<=2&&height<=2)
				flag=true;
			break;
		case "6":
			if((width<=3&&height<=3&&merge=="0")||(width<3&&height<3&&merge=="1"))
				flag=true;
			break;
		case "7":
			if(width<=3&&height<=3)
				flag=true;
			break;
		case "8":
			if((width<=4&&height<=4&&merge=="0")||(width<4&&height<4&&merge=="1"))
				flag=true;
			break;
		case "9":
			if(width<=4&&height<=4)
				flag=true;
			break;
		case "10":
			flag=true;
			break;
	};
	return flag;
}