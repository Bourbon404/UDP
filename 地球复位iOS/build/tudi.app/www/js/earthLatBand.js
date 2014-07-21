/**
 * 每块land跨纬度数
 * */
var DLAT_NUM=0.0004;
/**
 * 经纬度保留小数点后几位
 * */
var LNG_LAT_DECIMAL=6;
/**
 * 当前显示区域的土地信息集合
 * */
var CURRENT_LAND_ARRAY=[];
/**
 * 当前显示区域的建筑信息集合
 * */
var CURRENT_BUILDING_ARRAY=[];
/**
 * 根据经纬度获取当前的土地
 * */
function getLandByLngLat(lng,lat){
	var lLatBand=0;
	while(lat>ER_LATBAND_ARRAY[lLatBand].lMaxLatitude){
		lLatBand++;
	}
	var band=ER_LATBAND_ARRAY[lLatBand];
	//经度小数点后面的数
	var lngPoint=lng.remainder(band.lUnit);
	//有多少土地
	var lngLandCount=parseInt(lngPoint/band.dLngNum);
	//左侧的经度
	var lngLeft=parseFloat(((lngLandCount*(band.lUnit/band.lLandNum)).add(lng.subtraction(lngPoint))).toFixed(LNG_LAT_DECIMAL));
	//右侧的经度
	var lngRight=parseFloat(lngLeft.add(band.dLngNum).toFixed(LNG_LAT_DECIMAL));
	
	//纬度小数点后面的数
	var latPoint=lat.remainder(1);
	//有多少土地
	var latLandCount=parseInt(latPoint/DLAT_NUM);
	//下边的纬度
	var latBottom=parseFloat((lat.subtraction(latPoint)).add(latLandCount*DLAT_NUM).toFixed(LNG_LAT_DECIMAL));
	//上边的纬度
	var latTop=parseFloat(latBottom.add(DLAT_NUM).toFixed(LNG_LAT_DECIMAL));
	var land=new Land(lngLeft,latTop,lngRight,latBottom);
	land.setLngLength(band.dLngNum);
	land.setBandNo(lLatBand);
	return land;
}
/**
 * 获取当前可视区域的land
 * @param minLng:最小的经度
 * @param minLag:最小的纬度
 * @param maxLng:最大的经度
 * @param maxLat:最大的纬度
 * @param landCallBack:土地操作相关事件
 * */
function getCurrentLands(minLng,minLag,maxLng,maxLat,landCallBack){
	CURRENT_LAND_ARRAY=[];
	var land=getLandByLngLat(minLng,minLag);
	CURRENT_LAND_ARRAY.push(land);
	landCallBack(land);
	//土地经度长度
	var lngLength=land.getLngLength();
	var bandNo=land.getBandNo();
	//左下角土地右边经度
	var lng=land.getLngRight();
	var oldLand=land;
	while(maxLng>lng){
		getLatLineArray(maxLat,oldLand,landCallBack);
		var tempLand=new Land(oldLand.getLngRight(),oldLand.getLatTop(),oldLand.getLngRight().add(lngLength),oldLand.getLatBottom());
		tempLand.setLngLength(lngLength);
		tempLand.setBandNo(bandNo);
		//放入到数组中
		CURRENT_LAND_ARRAY.push(tempLand);
		landCallBack(tempLand);
		lng=lng.add(lngLength);
		oldLand=tempLand;
	}
	getLatLineArray(maxLat,oldLand,landCallBack);
	console.log("getCurrentLands finish");
}
/**
 * 获取当前land的一列land集合
 * @param maxLat:最大纬度
 * @param oldLand:当前的land
 * @param landCallBack:土地操作相关事件
 * */
function getLatLineArray(maxLat,oldLand,landCallBack){
	var oldLatLand=oldLand;
	var lat=oldLatLand.getLatBottom();
	var lngLength=oldLand.getLngLength();
	var bandNo=oldLand.getBandNo();
	while(maxLat>lat){
		var top=oldLatLand.getLatTop().add(DLAT_NUM);
		var tempLand=new Land(oldLatLand.getLngLeft(),top,oldLatLand.getLngRight(),oldLatLand.getLatTop());
		tempLand.setLngLength(lngLength);
		tempLand.setBandNo(bandNo);
		CURRENT_LAND_ARRAY.push(tempLand);
		landCallBack(tempLand);
		lat=lat.add(DLAT_NUM);
		oldLatLand=tempLand;
	}
}
function getLandByPoint(lng,lat){
	for(var i in CURRENT_LAND_ARRAY){
		var land=CURRENT_LAND_ARRAY[i];
		if(lng>=land.getLngLeft()&&lng<land.getLngRight()&&lat>land.getLatBottom()&&lat<=land.getLatTop())
			return land;
	}
	return undefined;
}
/**
 * 检测两个建筑是否重叠
 * */
function checkBuildingSuccess(minLng,minLag,maxLng,maxLat){
	function _abs(val){
		return (val<0) ? -val : val;
	}
	for(var i in CURRENT_BUILDING_ARRAY){
		var building=CURRENT_BUILDING_ARRAY[i];
		var a_cx,a_cy; /* 第一个中心点*/
		var b_cx,b_cy; /* 第二个中心点*/
		var a_x_h=building.getLngRight().subtraction(building.getLngLeft())/2;/* 第一个宽度的一半*/
		var a_y_h=building.getLatTop().subtraction(building.getLatBottom())/2;/* 第一个高度的一半*/
		var b_x_h=maxLng.subtraction(minLng)/2;/* 第二个宽度的一半*/
		var b_y_h=maxLat.subtraction(minLag)/2;/* 第二个高度的一半*/
		a_cx = building.getLngLeft().add(a_x_h).toFixed(LNG_LAT_DECIMAL);
		a_cy = building.getLatBottom().add(a_y_h).toFixed(LNG_LAT_DECIMAL);
		b_cx = minLng.add(b_x_h).toFixed(LNG_LAT_DECIMAL);
		b_cy = minLag.add(b_y_h).toFixed(LNG_LAT_DECIMAL);
		if( (_abs(a_cx - b_cx) <= (a_x_h + b_x_h))
			     && (_abs(a_cy - b_cy) <= (a_y_h + b_y_h))){
			break;
			return false;
		}
	}
	return true;
}
/**
 * 占地
 * */
function captureLand(array){
	var json={
			requestItems:getMessage("messageBean/0x03_0xA3_req.js",array),
			responseItems:getMessage("messageBean/0x03_0xA3_resp.js")
	};
	RndchinaPlugin.RequestPlugin(json,function(data){
		data=JSON.parse(data);
		//data为返回的数据
		switch (data.ResCode) {
			case "0":
				success("占地成功");
				$(".move")[0].removeEventListener('touchmove',curBuildingTouchmove,false);
				$(".move")[0].removeEventListener('touchend',curBuildingTouchend,false);
				$(".move").hide();
				map.removeOverlay(curBuilding);
				var land=getLandByPoint(parseFloat(data.LngLeft),parseFloat(data.LatTop));
				if(land!=undefined){
					var width=parseInt(parseFloat(data.LngRight).subtraction(parseFloat(data.LngLeft)).div(land.getLngLength()));
					var height=parseInt(parseFloat(data.LatTop).subtraction(parseFloat(data.LatBottom)).div(DLAT_NUM));
					var type=array[4]=="0"?"1":data.LandType;
					addBuilding(land,width,height,type,data);
				}
				break;
			case "33":
				warning("已经被占");
				break;
			case "34":
				warning("钱币不够");
				break;
			case "35":
				warning("此处不允许占");
				break;
			case "37":
				warning("占地不允许跨越界限");
				break;
			case "255":
				warning("未知错误");
				break;
			default:
				warning("未知错误，请重试");
		};
	},function(data){
		warning(data);
	});
}
/**
 * 获取当前可视区域的建筑
 * */
function getCurrentBuildings(array){
	loading();
	//flag:1 返回多个报文
	//offset: 多个返回报文总数是返回报文哪个字段前面的总数
	var json={
			requestItems:getMessage("messageBean/0x03_0xA1_req.js",array),
			responseItems:getMessage("messageBean/0x03_0xA1_resp.js"),
			flag:1,
			offset:26
	};
	RndchinaPlugin.RequestPlugin(json,function(data){
		data=JSON.parse(data);
		if(data.CmdType=="3"&&data.SubType=="-95"){
			//data为返回的数据
			switch (data.ResCode) {
				case "0":
					var land=getLandByPoint(parseFloat(data.LngLeft),parseFloat(data.LatTop));
					if(land!=undefined){
						var width=Math.round(parseFloat(data.LngRight).subtraction(parseFloat(data.LngLeft)).div(land.getLngLength()));
						var height=Math.round(parseFloat(data.LatTop).subtraction(parseFloat(data.LatBottom)).div(DLAT_NUM));
						var type=data.LandType=="0"?"1":data.LandType;
						console.log("width:"+width+",height:"+height+",type"+type);
						addBuilding(land,width,height,type,data);
					}else
						console.log("getCurrentBuildings error can not find land");
					break;
				case "255":
					warning("未知错误");
					break;
				default:
					warning("未知错误，请重试");
			};
			if(parseInt(data.Pktnum)==(1+parseInt(data.PktSeq)))
				stopLoading();
		}
	},function(data){
		stopLoading();
		warning(data);
	});
}
/**
 * 获取建筑类型
 * */
function getBuildingType(type){
	var landType="学校";
	switch (type) {
		case "1":
			landType="学校";
			break;
		case "2":
			landType="医院";
			break;
		case "3":
			landType="公园";
			break;
		case "4":
			landType="写字楼";
			break;
		case "5":
			landType="商铺";
			break;
		case "6":
			landType="工厂";
			break;
		default:
			landType="学校";
	};
	return landType;
}
/**
 * 购买土地
 * */
function buyBuilding(){
	loading();
	var json={
			requestItems:getMessage("messageBean/0x03_0xA7_req.js",[clickBuilding.data.LngLeft,clickBuilding.data.LngRight,clickBuilding.data.LatTop,clickBuilding.data.LatBottom,clickBuilding.data.Price,"0"]),
			responseItems:getMessage("messageBean/0x03_0xA7_resp.js")
	};
	RndchinaPlugin.RequestPlugin(json,function(data){
		data=JSON.parse(data);
		//data为返回的数据
		switch (data.ResCode) {
			case "0":
				localStorage[POINTS]=data.Point;
				localStorage[TOTAL_MONEY]=data.Money;
				$("header ul li:eq(2) > p").text(localStorage[TOTAL_MONEY]+"金币");
				$("header ul li:eq(4) > p").text(localStorage[POINTS]);
				clickBuilding.data.IfSale="0";
				clickBuilding.data.IsMine="1";
				clickBuilding.closeInfoWindow();
				success("购买土地成功");
				break;
			case "34":
				warning("金币不足");
				break;
			case "36":
				warning("此处无法购买");
				break;
			case "255":
				warning("购买土地失败，未知错误");
				break;
			default:
				warning("购买土地失败，请重试");
		};
		stopLoading();
	},function(data){
		stopLoading();
		warning(data);
	});
}
/**
 * 访问土地
 * */
function visitBuilding(){
	loading();
	var tempData=clickBuilding.data;
	var totalMoney=parseInt(localStorage[TOTAL_MONEY])+parseInt(tempData.GivenMoney);
	var json={
			requestItems:getMessage("messageBean/0x03_0xA2_req.js",[tempData.LngLeft,tempData.LngRight,tempData.LatTop,tempData.LatBottom,
			                                                        totalMoney,tempData.GivenMoney,tempData.StatID,tempData.GivenTitle,"0"]),
			responseItems:getMessage("messageBean/0x03_0xA2_resp.js")
	};
	RndchinaPlugin.RequestPlugin(json,function(data){
		data=JSON.parse(data);
		//data为返回的数据
		switch (data.ResCode) {
			case "0":
				localStorage[POINTS]=data.Point;
				localStorage[TOTAL_MONEY]=data.TotalMoney;
				$("header ul li:eq(2) > p").text(localStorage[TOTAL_MONEY]+"金币");
				$("header ul li:eq(4) > p").text(localStorage[POINTS]);
				success(tempData.GivenTitle+"赠送"+tempData.GivenMoney+"金币");
				break;
			case "255":
				warning("访问土地失败，未知错误");
				break;
			default:
				warning("访问土地失败，请重试");
		};
		stopLoading();
	},function(data){
		stopLoading();
		warning(data);
	});
}
/**
 * 出售土地
 * */
function saleBuilding(){
	loading();
	var json={
			requestItems:getMessage("messageBean/0x03_0xA5_req.js",[clickBuilding.data.LngLeft,clickBuilding.data.LngRight,clickBuilding.data.LatTop,clickBuilding.data.LatBottom,"0"]),
			responseItems:getMessage("messageBean/0x03_0xA5_resp.js")
	};
	RndchinaPlugin.RequestPlugin(json,function(data){
		data=JSON.parse(data);
		//data为返回的数据
		switch (data.ResCode) {
			case "0":
				clickBuilding.data.IfSale="1";
				clickBuilding.closeInfoWindow();
				success("设置出售成功");
				break;
			case "255":
				warning("设置出售失败，未知错误");
				break;
			default:
				warning("设置出售失败，请重试");
		};
		stopLoading();
	},function(data){
		stopLoading();
		warning(data);
	});
}
/**
 * 取消出售土地
 * */
function cancelSaleBuilding(){
	loading();
	var json={
			requestItems:getMessage("messageBean/0x03_0xA6_req.js",[clickBuilding.data.LngLeft,clickBuilding.data.LngRight,clickBuilding.data.LatTop,clickBuilding.data.LatBottom,"0"]),
			responseItems:getMessage("messageBean/0x03_0xA6_resp.js")
	};
	RndchinaPlugin.RequestPlugin(json,function(data){
		data=JSON.parse(data);
		//data为返回的数据
		switch (data.ResCode) {
			case "0":
				clickBuilding.data.IfSale="0";
				clickBuilding.closeInfoWindow();
				success("取消出售成功");
				break;
			case "255":
				warning("取消出售失败，未知错误");
				break;
			default:
				warning("取消出售失败，请重试");
		};
		stopLoading();
	},function(data){
		stopLoading();
		warning(data);
	});
}
/**
 * 删除土地
 * */
function deleBuilding(){
	loading();
	var json={
			requestItems:getMessage("messageBean/0x03_0xAA_req.js",[clickBuilding.data.LngLeft,clickBuilding.data.LngRight,clickBuilding.data.LatTop,clickBuilding.data.LatBottom,clickBuilding.data.Price,"0"]),
			responseItems:getMessage("messageBean/0x03_0xAA_resp.js")
	};
	RndchinaPlugin.RequestPlugin(json,function(data){
		data=JSON.parse(data);
		//data为返回的数据
		switch (data.ResCode) {
			case "0":
				localStorage[TOTAL_MONEY]=data.TotalMoney;
				$("header ul li:eq(2) > p").text(localStorage[TOTAL_MONEY]+"金币");
				success("删除成功");
				map.removeOverlay(clickBuilding);
				break;
			case "255":
				warning("删除失败，未知错误");
				break;
			default:
				warning("删除失败，请重试");
		};
		stopLoading();
	},function(data){
		stopLoading();
		warning(data);
	});
}