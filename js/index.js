//01 网站换肤
$(document).ready(function(){
		var $li =$("#skin li");
		$li.click(function(){
			switchSkin( this.id );
		});
		var cookie_skin = $.cookie("MyCssSkin");
		if (cookie_skin) {
			switchSkin(cookie_skin);
		}
});

function switchSkin(skinName){
		$("#"+skinName).addClass("selected")                //当前<li>元素选中
		.siblings().removeClass("selected");  //去掉其他同辈<li>元素的选中
	    $("#cssfile").attr("href","css/skin/"+ skinName +".css"); //设置不同皮肤
		$.cookie( "MyCssSkin" ,  skinName , { path: '/', expires: 10 });
}

//02手风琴效果
$(function(){
	$(".banner .left .top h4").click(function(){
		if($(this).siblings("ul").is(":visible")){
			$(this).siblings("ul").stop().slideUp();
			$(this).children("i").css("transform","rotate(0deg)")
		}else{
			$(this).siblings("ul").stop().slideDown();
			$(this).children("i").css("transform","rotate(-180deg)")
		}
		
	})
	$(".banner .left .top ul h3").click(function(){
		if($(this).siblings("p").is(":visible")){
			$(this).siblings("p").stop().slideUp();
			$(this).children("i").css("transform","rotate(0deg)")
		}else{
			$(this).siblings("p").stop().slideDown();
			$(this).children("i").css("transform","rotate(-180deg)")
		}
		
	})
	$(".banner .left .bottom h4").click(function(){
		if($(this).siblings(".scrollNews").is(":visible")){
			$(this).siblings(".scrollNews").stop().slideUp();
			$(this).children("i").css("transform","rotate(0deg)")
		}else{
			$(this).siblings(".scrollNews").stop().slideDown();
			$(this).children("i").css("transform","rotate(-180deg)")
		}
		
	})
})

//03 新闻滚动 
$(function(){
        var $this = $(".scrollNews");
		var scrollTimer;
		$this.hover(function(){
			  clearInterval(scrollTimer);
		 },function(){
		   scrollTimer = setInterval(function(){
						 scrollNews( $this );
					}, 1000 );
		}).trigger("mouseleave");
});

function scrollNews(obj){
   var $self = obj.find("ul:first"); 
   var lineHeight = $self.find("li:first").height(); //获取行高
   $self.animate({ "marginTop" : -lineHeight +"px" }, 600 , function(){
         $self.css({marginTop:0}).find("li:first").appendTo($self); //appendTo能直接移动元素
   })
}



//04图片无缝轮播
$(function(){
	var pre=1;
	//向后	
	$(".new .next").bind("click",hou=function(){
		clearInterval(time);
		var width=$(".new>.show>ul>li").width()
		if(!$(".new>.show>ul").is(":animated") ){
			if(pre==4){
				$(".new>.show>ul").animate({left:"-="+(width+40)},"slow",function(){
					$(".new>.show>ul").animate({left:"-270px"},0);
				})
				pre=1;
			}else{
				$(".new>.show>ul").animate({left:"-="+(width+40)},"slow")
				pre++
			}
		}
	})
	//向前
	$(".new .prev").click(function(){
		clearInterval(time);
		var width=$(".new>.show>ul>li").width()
		if(!$(".new>.show>ul").is(":animated") ){
			if(pre==1){
				$(".new>.show>ul").animate({left:"+="+(width+40)},"slow",function(){
					$(".new>.show>ul").animate({left:"-1080px"},0)
				})
				pre=4;
			}else{
				$(".new>.show>ul").animate({left:"+="+(width+40)},"slow")
				pre--;
			}
		}
	})
	//轮播
	$(".new .show ul li").hover(function(){
		clearInterval(time)
	},function(){
		time=setInterval(hou,3000)
	}).trigger("mouseleave")
	
	
})

//05图片横向轮播
$(function(){
	
	var r=$("#regular_features"),
		btns=r.find(">div.tabs>a"),
		btns2=r.find(">div.tabs2>a"),
		uls=r.find(">ul"),
		lis=uls.find(">li"),
		pages=lis.length,
		p=0,
		pw=950;
		
	btns.each(function(index,btn){
		btn=$(btn);
		//mouseenter当鼠标指针穿过元素时
		btn.bind("mouseenter",gun=function(ev){
			if (index!=p) {
				$(btns[p]).removeClass("bian");
				btn.addClass("bian");
				p=index;
				uls.stop().animate({
					left: -pw * index
				},300);
			}
		});
	})
});

//06衣服颜色切换
$(function(){
	$(".color_change ul li img").click(function(){           
		  var imgSrc = $(this).attr("src");
		  var i = imgSrc.lastIndexOf(".");
		  var unit = imgSrc.substring(i);
		  imgSrc = imgSrc.substring(0,i);
		  var imgSrc_small = imgSrc + "_one_small"+ unit;
		  var imgSrc_big = imgSrc + "_one_big"+ unit;
		  $("#bigImg").attr({"src": imgSrc_small ,"jqimg": imgSrc_big });
		  $("#thickImg").attr("href", imgSrc_big);
		  var alt = $(this).attr("alt");
		  $(".color_change strong").text(alt);
		  var url = imgSrc+".html";
		  $(".pro_detail_left ul.imgList")
				.empty()
				.load(url);
	});
});


//07衣服尺寸选择
$(function(){
	$(".pro_size li span").click(function(){
		$(this).parents("ul").siblings("strong").text(  $(this).text() );
	})
})


//08数量和价格联动
$(function(){
    var $span = $("div.pro_price span");
	var price = $span.text();	
	$("#num_sort").change(function(){
	    var num = $(this).val();
		var amount = num * price;
		$span.text( amount );
	}).change();
})


//09商品评分效果
$(function(){
	//通过修改样式来显示不同的星级
    $("ul.rating li a").click(function(){
	     var title = $(this).attr("title");
	     alert("您给此商品的评分是："+title);
		 var cl = $(this).parent().attr("class");
		 $(this).parent().parent().removeClass().addClass("rating "+cl+"star");
		 $(this).blur();//去掉超链接的虚线框
		 return false;
	})
})


//10最终购买输出
$(function(){
    var $product = $(".pro_detail_right");
	$("#cart a").click(function(){
        var pro_name = $product.find("h4:first").text();
		var pro_size = $product.find(".pro_size strong").text();
		var pro_color =  $(".color_change strong").text();
		var pro_num = $product.find("#num_sort").val();
	    var pro_price = $product.find(".pro_price span").text();
		var dialog = " 感谢您的购买。\n您购买的\n"+
		        "产品是："+pro_name+"；\n"+
				"尺寸是："+pro_size+"；\n"+
				"颜色是："+pro_color+"；\n"+
				"数量是："+pro_num+"；\n"+
				"总价是："+pro_price +"元。";
		if( confirm(dialog) ){
			alert("您已经下单!");
		}
		return false;//避免页面跳转
	})
})


//11tab标签
$(function(){
	$(".tab .tab_menu ul li").each(function(){
		$(this).click(function(){
			var index=$(this).index();
			$(this).addClass("selected")
			.siblings().removeClass("selected");
			$(".tab .tab_box div").eq(index).removeClass("hide")
			.siblings().addClass("hide");
		})
	})
})

//12点击产品小图片切换大图
$(function(){
	$(".pro_detail_left ul li img").livequery("click",function(){ 
		  var imgSrc = $(this).attr("src");  //图片路径
		  var i = imgSrc.lastIndexOf(".");   //返回.最后出现的位置  //lastIndexOf()可返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索
		  var unit = imgSrc.substring(i);    //文件扩展名 //substring(star,stop)用于提取字符串中介于两个指定下标之间的字符
		  imgSrc = imgSrc.substring(0,i);    //文件主名
		  var imgSrc_small = imgSrc + "_small"+ unit;
		  var imgSrc_big = imgSrc + "_big"+ unit;
		  $("#bigImg").attr({"src": imgSrc_small ,"jqimg": imgSrc_big });
		  $("#thickImg").attr("href", imgSrc_big);
	});
});


