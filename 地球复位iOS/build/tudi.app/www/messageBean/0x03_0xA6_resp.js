/**
 * 3-6-2、撤销出售土地（RECT）响应消息
 * */
function (){
	var array=[
   	    {type:MESSAGE_PARAM_TYPE.INT,length:4,name:"ResCode"},
   	    {type:MESSAGE_PARAM_TYPE.INT,length:4,name:"LandSum"},
   	    {type:MESSAGE_PARAM_TYPE.INT,length:4,name:"Checksum"}
	];
	return MessageHeadResp().concat(array);
}