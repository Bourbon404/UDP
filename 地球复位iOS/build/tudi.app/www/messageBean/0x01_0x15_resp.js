/**
 * 1-10-1、共享位置信息给好友响应消息
 * */
function (paramArray){
	var array=[
		{type:MESSAGE_PARAM_TYPE.INT,length:4,name:"ResCode"},
		{type:MESSAGE_PARAM_TYPE.INT,length:4,name:"Checksum"}
	];
	return MessageHeadResp().concat(array);
}