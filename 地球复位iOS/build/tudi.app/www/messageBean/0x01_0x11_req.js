/**
 * 1-6-1、添加好友请求消息
 * */
function (paramArray){
	var array=[
		{type:MESSAGE_PARAM_TYPE.STRING,length:16,value:""},
		{type:MESSAGE_PARAM_TYPE.INT,length:4,value:""}
	];
	for(var i in paramArray)
		array[i].value=paramArray[i];
	return MessageHeadReq("0x01","0x11","40").concat(array);
}