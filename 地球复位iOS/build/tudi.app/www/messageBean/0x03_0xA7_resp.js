/**
 * 3-7-2、购买土地响应消息
 * */
function (){
	var array=[
   	    {type:MESSAGE_PARAM_TYPE.INT,length:4,name:"ResCode"},
   	    {type:MESSAGE_PARAM_TYPE.INT,length:4,name:"Money"},
   	    {type:MESSAGE_PARAM_TYPE.INT,length:4,name:"Point"},
   	    {type:MESSAGE_PARAM_TYPE.INT,length:4,name:"Checksum"}
	];
	return MessageHeadResp().concat(array);
}