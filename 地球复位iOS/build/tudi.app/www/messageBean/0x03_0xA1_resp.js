/**
 * 3-1-2、查询土地基本信息响应消息
 * */
function (){
	var array=[
   	    {type:MESSAGE_PARAM_TYPE.INT,length:4,name:"ResCode"},
   	    {type:MESSAGE_PARAM_TYPE.SHORT,length:2,name:"LandNum"},
   	    {type:MESSAGE_PARAM_TYPE.SHORT,length:2,name:"Pktnum"},
	    {type:MESSAGE_PARAM_TYPE.SHORT,length:2,name:"PktSeq"},
	    {type:MESSAGE_PARAM_TYPE.SHORT,length:2,name:"ThisLandNum"},
   	    {type:MESSAGE_PARAM_TYPE.FLOAT,length:4,name:"LngLeft"},
   	    {type:MESSAGE_PARAM_TYPE.FLOAT,length:4,name:"LngRight"},
   	    {type:MESSAGE_PARAM_TYPE.FLOAT,length:4,name:"LatTop"},
   	    {type:MESSAGE_PARAM_TYPE.FLOAT,length:4,name:"LatBottom"},
   	    {type:MESSAGE_PARAM_TYPE.SHORT,length:2,name:"LandType"},
   	    {type:MESSAGE_PARAM_TYPE.BYTE,length:1,name:"IfSale"},
   	    {type:MESSAGE_PARAM_TYPE.BYTE,length:1,name:"IsMine"},
   	    {type:MESSAGE_PARAM_TYPE.INT,length:4,name:"Price"},
   	    {type:MESSAGE_PARAM_TYPE.INT,length:4,name:"VisitNum"},
   	    {type:MESSAGE_PARAM_TYPE.STRING,length:4,name:"Ownername"},
   	    {type:MESSAGE_PARAM_TYPE.SHORT,length:2,name:"GivenMoney"},
   	    {type:MESSAGE_PARAM_TYPE.SHORT,length:2,name:"StatID"},
   	    {type:MESSAGE_PARAM_TYPE.STRING,length:16,name:"GivenTitle"},
   	    {type:MESSAGE_PARAM_TYPE.INT,length:4,name:"Checksum"}
	];
	return MessageHeadResp().concat(array);
}