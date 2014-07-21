/**
 * 1-9-1、好友信息查询请求消息
 * */
function (paramArray){
	var array=[
		{type:MESSAGE_PARAM_TYPE.INT,length:4,value:""}
	];
	for(var i in paramArray)
		array[i].value=paramArray[i];
	return MessageHeadReq("0x01","0x14","24").concat(array);
}