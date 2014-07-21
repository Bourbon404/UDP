/**
 * 1-14-2、出售我的所有土地响应消息
 * */
function (){
	var array=[
   	    {type:MESSAGE_PARAM_TYPE.INT,length:4,name:"ResCode"},
   	    {type:MESSAGE_PARAM_TYPE.INT,length:4,name:"LandNum"},
   	    {type:MESSAGE_PARAM_TYPE.INT,length:4,name:"Checksum"}
	];
	return MessageHeadResp().concat(array);
}