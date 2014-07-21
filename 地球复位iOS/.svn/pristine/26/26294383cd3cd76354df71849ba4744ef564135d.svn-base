/**
 * 3-3-1、占地请求消息
 * */
function (paramArray){
	var array=[
   	    {type:MESSAGE_PARAM_TYPE.FLOAT,length:4,value:""},
		{type:MESSAGE_PARAM_TYPE.FLOAT,length:4,value:""},
		{type:MESSAGE_PARAM_TYPE.FLOAT,length:4,value:""},
		{type:MESSAGE_PARAM_TYPE.FLOAT,length:4,value:""},
		{type:MESSAGE_PARAM_TYPE.SHORT,length:2,value:""},
		{type:MESSAGE_PARAM_TYPE.SHORT,length:2,value:""},
		{type:MESSAGE_PARAM_TYPE.INT,length:4,value:""},
		{type:MESSAGE_PARAM_TYPE.STRING,length:16,value:""},
		{type:MESSAGE_PARAM_TYPE.INT,length:4,value:""}
	];
	for(var i in paramArray)
		array[i].value=paramArray[i];
	return MessageHeadReq("0x03","-93","64").concat(array);
}