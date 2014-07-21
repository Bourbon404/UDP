/**
 * 3-2-1、访问土地信息请求消息
 * */
function (paramArray){
	var array=[
   	    {type:MESSAGE_PARAM_TYPE.FLOAT,length:4,value:""},
		{type:MESSAGE_PARAM_TYPE.FLOAT,length:4,value:""},
		{type:MESSAGE_PARAM_TYPE.FLOAT,length:4,value:""},
		{type:MESSAGE_PARAM_TYPE.FLOAT,length:4,value:""},
		{type:MESSAGE_PARAM_TYPE.INT,length:4,value:""},
		{type:MESSAGE_PARAM_TYPE.SHORT,length:2,value:""},
		{type:MESSAGE_PARAM_TYPE.SHORT,length:2,value:""},
		{type:MESSAGE_PARAM_TYPE.STRING,length:16,value:""},
		{type:MESSAGE_PARAM_TYPE.INT,length:4,value:""}
	];
	for(var i in paramArray)
		array[i].value=paramArray[i];
	return MessageHeadReq("0x03","-94","64").concat(array);
}