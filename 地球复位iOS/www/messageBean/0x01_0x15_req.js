/**
 * 1-10-1、共享位置信息给好友请求消息
 * */
function (paramArray){
	var array=[
	    {type:MESSAGE_PARAM_TYPE.INT,length:4,value:""},
	    {type:MESSAGE_PARAM_TYPE.STRING,length:1,value:""},
	    {type:MESSAGE_PARAM_TYPE.STRING,length:3,value:""},
		{type:MESSAGE_PARAM_TYPE.INT,length:4,value:""}
	];
	for(var i in paramArray)
		array[i].value=paramArray[i];
	return MessageHeadReq("0x01","0x15","32").concat(array);
}