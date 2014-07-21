/**
 * 3-2-2、访问土地信息响应消息
 * */
function (){
	var array=[
   	    {type:MESSAGE_PARAM_TYPE.INT,length:4,name:"ResCode"},
   	    {type:MESSAGE_PARAM_TYPE.INT,length:4,name:"TotalMoney"},
   	    {type:MESSAGE_PARAM_TYPE.INT,length:4,name:"Point"},
   	    {type:MESSAGE_PARAM_TYPE.INT,length:4,name:"Checksum"}
	];
	return MessageHeadResp().concat(array);
}