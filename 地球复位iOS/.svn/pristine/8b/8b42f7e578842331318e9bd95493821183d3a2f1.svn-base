/**
 * 在地图上画一个网格
 * @param land 对象
 * */
function addPaneShade(land){
	if(mapApi=="baidu"){
		var polygon = new BMap.Polygon([
			new BMap.Point(land.getLngLeft(),land.getLatTop()),
		    new BMap.Point(land.getLngRight(),land.getLatTop()),
		    new BMap.Point(land.getLngRight(),land.getLatBottom()),
		    new BMap.Point(land.getLngLeft(),land.getLatBottom())
		], {strokeColor:"black", strokeWeight:1, strokeOpacity:1.0,fillOpacity:0.1});
		map.addOverlay(polygon);
	}else{
		
	}
}
/**
 * 在地图上画一个建筑
 * @param land 左上角土地对象
 * @param width 建筑长度
 * @param height 建筑高度
 * @param type 建筑类型
 * */
function addBuilding(land,width,height,type,data){
	
	//添加图片
	var pt = new BMap.Point(land.getLngLeft()+land.getLngLength()*width/2,land.getLatTop()-(DLAT_NUM*height/2));
    var myIcon = new BMap.Icon("image/d_img"+type+".png", new BMap.Size(52*width,52*height),{
    	anchor: new BMap.Size(26*width,26*height), // 指定定位位置  
        imageOffset: new BMap.Size(0, 0) // 设置图片偏移  
    });
    myIcon.setImageSize(new BMap.Size(52*width,52*height));
    var maker = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
    maker.data=data;
    maker.addEventListener("click", function(e){
    	clickBuilding=undefined;
    	clickBuilding=this;
    	var lng=this.data.LngLeft;
    	var lat=this.data.LatTop;
    	var type=getBuildingType(this.data.LandType);
    	var sContent ="<h4 style='margin:0 0 5px 0;padding:0.2em 0'>位置:"+lng+"</h4>" + 
        	"<h4 style='margin:0 0 5px 0;padding:0.4em 0'>"+lat+"</h4>" + 
        	"<h4 style='margin:0 0 5px 0;padding:0.2em 0'>类型:"+type+"</h4>" + 
        	"<h4 style='margin:0 0 5px 0;padding:0.2em 0'>价格:"+this.data.Price+"</h4>" + 
        	"<h4 style='margin:0 0 5px 0;padding:0.2em 0'>访问量:"+this.data.VisitNum+"</h4>";
    	if(this.data.IsMine=="1"){
    		sContent+="<input class='q_dele_land' type='button' value='删除土地' onclick='deleBuilding()'/>";
    		if(this.data.IfSale=="1")
    			sContent+="<input class='q_cancel_sale' type='button' value='取消出售' onclick='cancelSaleBuilding()'/>";
    		else
    			sContent+="<input class='q_sale' type='button' value='出售土地' onclick='saleBuilding()'/>";
    	}else{
    		visitBuilding();
    		if(this.data.IfSale=="1")
    			sContent+="<input class='q_dele_land' type='button' value='购买' onclick='buyBuilding()'/>";
    	}
    	sContent+="</div>";
    	var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
    	this.openInfoWindow(infoWindow);
    });
    map.addOverlay(maker);// 将标注添加到地图中
}
/**
 * 当前占地建筑移动操作
 * */
function curBuildingTouchmove(event){
	// 如果这个元素的位置内只有一个手指的话
	if (event.targetTouches.length == 1) {
		event.preventDefault();// 阻止浏览器默认事件，重要 
        var touch = event.targetTouches[0];
        var p=new BMap.Pixel(touch.pageX,touch.pageY); 
        var point1=map.pixelToPoint(p);
        curBuilding.setPosition(point1);
	}
}
/**
 * 当前占地建筑移动停止执行占地操作
 * */
function curBuildingTouchend(event){
	$(".alertMsg > span").text("确定占领这块土地吗？");
	$('.alertMsgForm').css('display','block');
	$('#alertLeftBtn').click(function(event) {
		$('.shadow').css('display','none');
		$('.alertMsgForm').css('display','none');
		//取到左上角的经纬度
		var mP=curBuilding.getPosition();
		var pixel=map.pointToPixel(mP);
		var size=curBuilding.getIcon().anchor;
		var p=new BMap.Pixel(pixel.x-size.width,pixel.y-size.height); 
		var point=map.pixelToPoint(p);
		var land=getLandByPoint(point.lng,point.lat);
		if(land!=undefined){
			//login();
			captureLand([land.getLngLeft(),land.getLngLeft().add(land.getLngLength().mul(curBuilding.width)).toFixed(LNG_LAT_DECIMAL),
			land.getLatTop(),land.getLatTop().subtraction(DLAT_NUM.mul(curBuilding.height)).toFixed(LNG_LAT_DECIMAL),
			curBuilding.type,"0",curBuilding.money,"","0"
			]);
		}
	});
	//不占地就清楚移动层和建筑图片
	$('#alertRightBtn').click(function(event) {
		$('.shadow').css('display','none');
		$('.alertMsgForm').css('display','none');
		$(".move")[0].removeEventListener('touchmove',curBuildingTouchmove,false);
		$(".move")[0].removeEventListener('touchend',curBuildingTouchend,false);
		$(".move").hide();
		map.removeOverlay(curBuilding);
		curBuilding=undefined;
	});
	
}