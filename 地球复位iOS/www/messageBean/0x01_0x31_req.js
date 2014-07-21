/**
 * 1-14-1、出售我的所有土地请求消息
 * */
function (paramArray){
	var array=[
		{type:MESSAGE_PARAM_TYPE.INT,length:4,value:""}
	];
	for(var i in paramArray)
		array[i].value=paramArray[i];
	return MessageHeadReq("0x01","0x31","24").concat(array);
}