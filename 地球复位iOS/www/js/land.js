/**
 * 一块土地
 * @param newLngLeft 左边经度
 * @param newLatTop 上边纬度
 * @param newLngRight 右边经度
 * @param newLatBottom 下边纬度
 * */
var Land=function(newLngLeft,newLatTop,newLngRight,newLatBottom){
	var lngLeft=newLngLeft,latTop=newLatTop,lngRight=newLngRight,latBottom=newLatBottom;
	//经度长度
	var lngLength=undefined;
	//ER_LATBAND_ARRAY 数组中的第几个
	var bandNo=undefined;
	/**
	 * 设置左边经度
	 * */
	this.setLngLeft=function(newLngLeft){
		lngLeft=newLngLeft;
	};
	/**
	 * 获取左边经度
	 * */
	this.getLngLeft=function(){
		return lngLeft;
	};
	/**
	 * 设置右边经度
	 * */
	this.setLngRight=function(newLngRight){
		lngRight=newLngRight;
	};
	/**
	 * 获取右边经度
	 * */
	this.getLngRight=function(){
		return lngRight;
	};
	/**
	 * 设置上边纬度
	 * */
	this.setLatTop=function(newLatTop){
		latTop=newLatTop;
	};
	/**
	 * 获取上边纬度
	 * */
	this.getLatTop=function(){
		return latTop;
	};
	/**
	 * 设置下边纬度
	 * */
	this.setLatBottom=function(newLatBottom){
		latBottom=newLatBottom;
	};
	/**
	 * 获取下边纬度
	 * */
	this.getLatBottom=function(){
		return latBottom;
	};
	/**
	 * 设置经度长度
	 * */
	this.setLngLength=function(length){
		lngLength=length;
	};
	/**
	 * 获取经度长度
	 * */
	this.getLngLength=function(){
		return lngLength;
	};
	/**
	 * 设置ER_LATBAND_ARRAY 数组中的第几个
	 * */
	this.setBandNo=function(no){
		bandNo=no;
	};
	/**
	 * 获取ER_LATBAND_ARRAY 数组中的第几个
	 * */
	this.getBandNo=function(){
		return bandNo;
	};
	return this;
};