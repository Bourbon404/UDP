/**
 * 1-1-1、注册请求消息
 * */
function (paramArray){
	var array=[
   	    {type:MESSAGE_PARAM_TYPE.STRING,length:16,value:""},
		{type:MESSAGE_PARAM_TYPE.STRING,length:16,value:""},
		{type:MESSAGE_PARAM_TYPE.STRING,length:20,value:""},
		{type:MESSAGE_PARAM_TYPE.STRING,length:12,value:""},
		{type:MESSAGE_PARAM_TYPE.STRING,length:4,value:""},
		{type:MESSAGE_PARAM_TYPE.BYTE,length:1,value:""},
		{type:MESSAGE_PARAM_TYPE.STRING,length:3,value:""},
		{type:MESSAGE_PARAM_TYPE.STRING,length:8,value:""},
		{type:MESSAGE_PARAM_TYPE.INT,length:4,value:""}
	];
	for(var i in paramArray)
		array[i].value=paramArray[i];
	return MessageHeadReq("0x01","0x01","104").concat(array);
}