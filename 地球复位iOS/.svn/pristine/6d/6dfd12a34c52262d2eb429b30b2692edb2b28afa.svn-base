/**
 * 1-5-1、修改信息请求消息
 * */
function (paramArray){
	var array=[
   	    {type:MESSAGE_PARAM_TYPE.STRING,length:16,value:""},
		{type:MESSAGE_PARAM_TYPE.STRING,length:32,value:""},
		{type:MESSAGE_PARAM_TYPE.STRING,length:20,value:""},
		{type:MESSAGE_PARAM_TYPE.STRING,length:12,value:""},
		{type:MESSAGE_PARAM_TYPE.STRING,length:4,value:""},
		{type:MESSAGE_PARAM_TYPE.INT,length:4,value:""}
	];
	for(var i in paramArray)
		array[i].value=paramArray[i];
	return MessageHeadReq("0x01","0x05","108").concat(array);
}