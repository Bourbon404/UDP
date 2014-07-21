/**
 * 3-3-2、占地响应消息
 * */
function (){
	var array=[
   	    {type:MESSAGE_PARAM_TYPE.INT,length:4,name:"ResCode"},
   	    {type:MESSAGE_PARAM_TYPE.BYTE,length:1,name:"IfHalf"},
   	    {type:MESSAGE_PARAM_TYPE.STRING,length:3,name:"Reserved"},
	    {type:MESSAGE_PARAM_TYPE.INT,length:4,name:"RealPay"},
	    {type:MESSAGE_PARAM_TYPE.INT,length:4,name:"TotalMoney"},
   	    {type:MESSAGE_PARAM_TYPE.INT,length:4,name:"Point"},
   	    {type:MESSAGE_PARAM_TYPE.FLOAT,length:4,name:"LngLeft"},
   	    {type:MESSAGE_PARAM_TYPE.FLOAT,length:4,name:"LngRight"},
   	    {type:MESSAGE_PARAM_TYPE.FLOAT,length:4,name:"LatTop"},
   	    {type:MESSAGE_PARAM_TYPE.FLOAT,length:4,name:"LatBottom"},
   	    {type:MESSAGE_PARAM_TYPE.INT,length:4,name:"Checksum"}
	];
	return MessageHeadResp().concat(array);
}