/**
 * 1-7-1、同意成为好友请求消息
 * */
function (paramArray){
	var array=[
	    {type:MESSAGE_PARAM_TYPE.BYTE,length:1,value:""},
		{type:MESSAGE_PARAM_TYPE.STRING,length:3,value:""},
		{type:MESSAGE_PARAM_TYPE.INT,length:4,value:""},
		{type:MESSAGE_PARAM_TYPE.STRING,length:16,value:""},
		{type:MESSAGE_PARAM_TYPE.STRING,length:32,value:""},
		{type:MESSAGE_PARAM_TYPE.INT,length:4,value:""}
	];
	for(var i in paramArray)
		array[i].value=paramArray[i];
	return MessageHeadReq("0x01","0x12","80").concat(array);
}