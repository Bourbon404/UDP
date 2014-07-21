/**
 * 1-4-2、忘记密码响应消息
 * */
function (){
	var array=[
   	    {type:MESSAGE_PARAM_TYPE.INT,length:4,name:"ResCode"},
	   	{type:MESSAGE_PARAM_TYPE.INT,length:4,name:"Checksum"}
	];
	return MessageHeadResp().concat(array);
}