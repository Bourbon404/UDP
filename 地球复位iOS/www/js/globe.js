/**
 * Created by Fiona.Wang on 14-5-13.
 */
$(document).ready(function(e) {
	var changId;
	//切换
	$("nav ul li").toggle(changeTab, changeTab);

	function changeTab() {
		var index = $(this).index();
		if (changId != undefined && index == changId) {
			menuBack();
			changId = undefined;
		} else {
			changId = index;
			menuOn();
			var aside = $(".area aside");
			aside.eq(index).removeClass("hide").siblings().addClass("hide");
			$(this).addClass("light").siblings().removeClass("light");
			aside.eq(index).html(getHtml("./indexcontent"+index+".html"));
		}
	}
	//弹出层的隐藏和显示（购买金币）
	$("#gou").bind("click", function() {
		//alert("zz")
		$(".tanchu").removeClass("hide");
	});
	$("#q_xiao").bind("click", function() {
		//alert("zz")
		$(".tanchu").addClass("hide");
	});

});
/**
 * 菜单缩回
 * */
function menuBack(){
	$("nav").animate({
		right: '0'
	}, "slow");
	$(".area").css({
		"display": "block"
	});
	$(".area").animate({
		right: '-72%'
	}, "slow");
	$("nav ul li").removeClass("light");
}
/**
 * 菜单出来
 * */
function menuOn(){
	$("nav").animate({
		right: '72%'
	}, "slow");
	
	$(".area").css({
		"display": "block"
	});
	$(".area").animate({
		right: '0'
	}, "slow");
}