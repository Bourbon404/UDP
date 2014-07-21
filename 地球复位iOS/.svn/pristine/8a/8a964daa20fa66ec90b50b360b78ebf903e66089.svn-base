$(function() {
	$('#checkFriends').css('display', 'none');
	buildMyRequestFriends();
	//初始化朋友验证列表
	$('.friend_Operate').css('background', '#bfbfbf');
	$('.friend_Operate span').css('color', '#fff');
	$('.friend_Operate span').text('待验证');
});

var tabIndex = 0; //我的邀请与验证好友tab切换索引
// 切换列表
$('#tabWrap span').click(function() {
	$('#tabWrap span').removeClass('hover');
	$(this).addClass('hover');
	tabIndex = $(this).index();
	if (tabIndex == 0) {
		$('#myInvitation').css('display', 'block');
		$('#checkFriends').css('display', 'none');
		buildMyRequestFriends();
		$('.friend_Operate').css('background', '#bfbfbf');
		$('.friend_Operate span').css('color', '#fff');
		$('.friend_Operate span').text('待验证');
	} else {
		$('#myInvitation').css('display', 'none');
		$('#checkFriends').css('display', 'block');
		buildConfirmationFriends();
		$('.friend_Operate').css('background', '#00A0E9');
		$('.friend_Operate span').css('color', '#fff');
		$('.friend_Operate span').text('接受');
		$(".friend_Operate span").bind("click",function(){
			var name=$(this).parents(1).children('div').eq(1).children('span').eq(0).text();
			var mobile=$(this).parents(1).children('div').eq(1).children('span').eq(1).text();
			var id=$(this).attr("id");
			agreeFriend(["0x01","",id,mobile,name,"0"]);
		});
	}
});
//创建验证好友列表
function buildConfirmationFriends(){
	var html="";
	if(localStorage[CONFIRMATION_FRIENDS]!=undefined){
		var friends=JSON.parse(localStorage[CONFIRMATION_FRIENDS]);
		for(var i=0;i<friends.length;i++){
			html+="<li><div class='friend_img'><img src=\"image/friend_img.png\"/></div>";
			html+="<div class='friend_info'><span>"+friends[i].friendName+"</span><span>"+friends[i].friendMobile+"</span></div>";
			html+="<div class='friend_Operate'><span id='"+friends[i].friendId+"'></span></div></li>";
		}
	}
	$("#checkFriends").html(html);
}
//创建我的邀请好友列表
function buildMyRequestFriends(){
	var html="";
	if(localStorage[MY_REQUEST_FRIENDS]!=undefined){
		var friends=JSON.parse(localStorage[MY_REQUEST_FRIENDS]);
		for(var i=0;i<friends.length;i++){
			html+="<li><div class='friend_img'><img src=\"image/friend_img.png\"/></div>";
			html+="<div class='friend_info'><span>"+friends[i].friendName+"</span><span>"+friends[i].friendMobile+"</span></div>";
			html+="<div class='friend_Operate'><span></span></div></li>";
		}
	}
	$("#myInvitation").html(html);
}
function agreeFriend(array){
	loading();
	var json = {
			requestItems: getMessage("messageBean/0x01_0x12_req.js", array),
			responseItems: getMessage("messageBean/0x01_0x12_resp.js")
		};
		RndchinaPlugin.RequestPlugin(json, function(data) {
			data = JSON.parse(data);
			switch (data.ResCode) {
				case "0":
					$('.alertSuccessDiv').show();
					setTimeout(function() {
						$('.alertSuccessDiv').hide();
					}, 1000);
					//将该条记录删掉
					var friends=JSON.parse(localStorage[CONFIRMATION_FRIENDS]);
					var j=0;
					for(var i=0;i<friends.length;i++){
						if(array[2]==friends[i].friendId){
							j=i;
							break;
						}
					}
					friends=friends.splice(j,1);
					localStorage[CONFIRMATION_FRIENDS]=JSON.stringify(friends);
					buildConfirmationFriends()
					break;
				case "255":
					warning('未知错误，请重试');
					break;
				default:
					warning('未知错误，请重试');
			};
			stopLoading();
		}, function(data) {
			stopLoading();
			warning('失败，请重试');
		});
}
//添加好友
$('.friend_add').click(function() {
	//发送数据（手机号码、校验码）
	var json = {
		requestItems: getMessage("messageBean/0x01_0x11_req.js", [localStorage[AREA_CODE] + localStorage[MOBILE_NUM], '']),
		responseItems: getMessage("messageBean/0x01_0x11_resp.js")
	};
	RndchinaPlugin.RequestPlugin(json, function(data) {
		data = JSON.parse(data);
		switch (data.ResCode) {
			case "0":
				window.location.href = 'friend_list.html';
				break;
			case "10":
				warning('对方未注册', reBtn);
				break;
			case "14":
				warning('已经是好友', reBtn);
				break;
			default:
				warning('未知错误，请重试', reBtn);
		};
	}, function(data) {
		warning('失败，请重试', reBtn);
	});
});

//同意成为好友请求与响应
$('.friend_Operate').click(function() {
	if (tabIndex == 1) {
		$(this).css('background', '#bfbfbf');
		$(this).find('span').text('已接受');
		var json = {
			requestItems: getMessage("messageBean/0x01_0x12_req.js", ['1', sessionStorage.Reserved, parseInt(sessionStorage.FriendID), sessionStorage.FriendMobile, sessionStorage.FriendName, parseInt(sessionStorage.Checksum)]),
			responseItems: getMessage("messageBean/0x01_0x12_resp.js")
		};
		RndchinaPlugin.RequestPlugin(json, function(data) {
			data = JSON.parse(data);
			switch (data.ResCode) {
				case "0":
					success('发送成功');
					break;
				default:
					warning('未知错误，请重试', reBtn);
			};
		}, function(data) {
			warning('失败，请重试', reBtn);
		});
	}
});


$('#alertLeftBtn,#alertRightBtn').click(function(event) {
	$('.shadow,.alertMsgForm').css('display','none');
});