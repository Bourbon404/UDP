/**
 * 1-2-2、登录响应消息
 * */
function (){
	var array=[
   	    {type:MESSAGE_PARAM_TYPE.INT,length:4,name:"ResCode"},
   	    {type:MESSAGE_PARAM_TYPE.STRING,length:20,name:"NickName"},
   	    {type:MESSAGE_PARAM_TYPE.SHORT,length:2,name:"FriendNum"},
	   	{type:MESSAGE_PARAM_TYPE.SHORT,length:2,name:"LandsNum"},
	   	{type:MESSAGE_PARAM_TYPE.INT,length:4,name:"TotalValue"},
	   	{type:MESSAGE_PARAM_TYPE.INT,length:4,name:"Points"},
	   	{type:MESSAGE_PARAM_TYPE.INT,length:4,name:"GivenMoney"},
	   	{type:MESSAGE_PARAM_TYPE.INT,length:4,name:"TotalMoney"},
	   	{type:MESSAGE_PARAM_TYPE.BYTE,length:1,name:"Rank"},
	   	{type:MESSAGE_PARAM_TYPE.STRING,length:3,name:"Reserved"},
	   	{type:MESSAGE_PARAM_TYPE.INT,length:4,name:"Checksum"}
	];
	return MessageHeadResp().concat(array);
}