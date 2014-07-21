/**
 * 3-6-1、撤销出售土地（RECT）请求消息
 * */
function (paramArray){
	var array=[
   	    {type:MESSAGE_PARAM_TYPE.FLOAT,length:4,value:""},
		{type:MESSAGE_PARAM_TYPE.FLOAT,length:4,value:""},
		{type:MESSAGE_PARAM_TYPE.FLOAT,length:4,value:""},
		{type:MESSAGE_PARAM_TYPE.FLOAT,length:4,value:""},
		{type:MESSAGE_PARAM_TYPE.INT,length:4,value:""}
	];
	for(var i in paramArray)
		array[i].value=paramArray[i];
	return MessageHeadReq("0x03","-90","40").concat(array);
}