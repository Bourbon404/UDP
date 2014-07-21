/**
 * 1-2-1、登录请求消息
 * */
function (paramArray){
	var array=[
   	    {type:MESSAGE_PARAM_TYPE.STRING,length:16,value:""},
		{type:MESSAGE_PARAM_TYPE.STRING,length:32,value:""},
		{type:MESSAGE_PARAM_TYPE.STRING,length:20,value:""},
		{type:MESSAGE_PARAM_TYPE.STRING,length:12,value:""},
		{type:MESSAGE_PARAM_TYPE.BYTE,length:1,value:"0x00"},
		{type:MESSAGE_PARAM_TYPE.STRING,length:3,value:""},
		{type:MESSAGE_PARAM_TYPE.STRING,length:8,value:""},
		{type:MESSAGE_PARAM_TYPE.INT,length:4,value:""}
	];
	for(var i in paramArray)
		array[i].value=paramArray[i];
	return MessageHeadReq("0x01","0x02","116").concat(array);
}