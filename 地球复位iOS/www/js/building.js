/**
 * 一个建筑
 * @param newLngLeft 左边经度
 * @param newLatTop 上边纬度
 * @param newLngRight 右边经度
 * @param newLatBottom 下边纬度
 * @param newWidth 长度
 * @param newHeight 高度
 * @param newType 类型
 * */
var Building=function(newLngLeft,newLatTop,newLngRight,newLatBottom,newWidth,newHeight,newType){
	var lngLeft=newLngLeft,latTop=newLatTop,lngRight=newLngRight,latBottom=newLatBottom,width=newWidth,height=newHeight,type=newType;
	
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
	 * 设置长度
	 * */
	this.setWidth=function(w){
		width=w;
	};
	/**
	 * 获取长度
	 * */
	this.getWidth=function(){
		return width;
	};
	/**
	 * 设置高度
	 * */
	this.setHeight=function(h){
		height=h;
	};
	/**
	 * 获取高度
	 * */
	this.getHeight=function(){
		return height;
	};
	/**
	 * 设置类别
	 * */
	this.setType=function(t){
		type=t;
	};
	/**
	 * 获取类别
	 * */
	this.getType=function(){
		return type;
	};
	return this;
};