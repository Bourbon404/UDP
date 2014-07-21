/**
 * 1-9-2、好友信息查询响应消息
 * */
function (){
	var array=[
		{type:MESSAGE_PARAM_TYPE.INT,length:4,name:"ResCode"},
		{type:MESSAGE_PARAM_TYPE.SHORT,length:2,name:"LandNum"},
		{type:MESSAGE_PARAM_TYPE.SHORT,length:2,name:"Pktnum"},
		{type:MESSAGE_PARAM_TYPE.SHORT,length:2,name:"PktSeq"},
		{type:MESSAGE_PARAM_TYPE.SHORT,length:2,name:"ThisLandNum"},
		{type:MESSAGE_PARAM_TYPE.INT,length:4,name:"DealTime"},
		{type:MESSAGE_PARAM_TYPE.INT,length:4,name:"Income"},
		{type:MESSAGE_PARAM_TYPE.INT,length:4,name:"Expenses"},
		{type:MESSAGE_PARAM_TYPE.INT,length:4,name:"Balance"},
		{type:MESSAGE_PARAM_TYPE.INT,length:4,name:"LandNum"},
		{type:MESSAGE_PARAM_TYPE.STRING,length:16,name:"DealType"},
		{type:MESSAGE_PARAM_TYPE.INT,length:4,name:"Checksum"}
	];
	return MessageHeadResp().concat(array);
}