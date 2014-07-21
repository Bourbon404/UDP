/**
 * 1-15-1、查询我的帐单请求消息
 * */
function (paramArray){
	var array=[
	    {type:MESSAGE_PARAM_TYPE.STRING,length:4,value:""},
		{type:MESSAGE_PARAM_TYPE.INT,length:4,value:""}
	];
	for(var i in paramArray)
		array[i].value=paramArray[i];
	return MessageHeadReq("0x01","0x14","28").concat(array);
}