// header搜索框
$.fn.UiSearh = function(){
	var ui = $(this);
	$('.ui-search-selected',ui).on('click',function(){
		$('.ui-search-select-list').show();
		// 取消冒泡
		return false;
	});
	$('.ui-search-select-list a',ui).on('click',function(){
		$('.ui-search-selected').text( $(this).text() );
		$('.ui-search-select-list').hide();
		return false;
	});
	$('body').on('click',function(){
		$('.ui-search-select-list').hide();
		return false;
	});
	// $('.ui-search-select-list',ui).on('mouseout',function(){
	// 	$('.ui-search-select-list').hide();
	// 	return false;
	// });
}

// content
$.fn.UiTab = function(header,content,){
	var ui = $(this);
	var tabs = $(header,ui);
	var cons = $(content,ui);
	tabs.on('click',function(){
		var index = $(this).index();
		tabs.removeClass('item_focus').eq(index).addClass('item_focus');
		cons.hide().eq(index).show();
		return false;
	})
}

// 返回顶部
$.fn.UiBackToTop = function(){
	var ui = $(this);
	var el = $('<a class="backToTop" href="#0">up</a>');
	var windowHeight = $(window).height();
	el.css(
		{
			'position':'fixed',
			'right':'50px',
			'top':'200px',
			'border-top':'2px solid #000'
		}
	);
	el.on('click',function(){
		$(window).scrollTop(0);
	});
	ui.append(el);

	// console.log(windowHeight);

	// $(window).scroll(function(){
	// 	var top = $('body').scrollTop();
	// 	console.log(top);
	// 	if(top > windowHeight){
	// 		el.show();
	// 	}else{
	// 		el.hide();
	// 	}
	// });
}

// slider
//1.左右箭头可控制翻页
//2.翻页时，进度条联动
//3.翻到尽头时，去到另一个尽头
//4.点击进度条时，切换到对应图片
//5.无动作时，自动滚动
//6.滚动过程中屏蔽其他动作
$.fn.UiSlider = function(){
	var ui = $(this);
	var wrap = $('.ui-slider-wrap',ui);
	var items = $('.ui-slider-wrap .item',ui);
	var btn_prev = $('.ui-slider-arrow .left',ui);
	var btn_next = $('.ui-slider-arrow .right',ui);
	var tips = $('.ui-slider-process .item',ui);

	var current = 0;
	var size = items.size();
	var width = items.eq(0).width();
	var enableAuto = true;

	ui
	.on('mouseover',function(){
		enableAuto = false;
		// console.log(1111);
	})
	.on('mouseout',function(){
		enableAuto = true;
		// console.log(2222);
	});

	// 事件定义
	wrap
	.on('move_prev',function(){
		current -= 1;
		if(current == -1){
			current = size - 1;
		}
		wrap.triggerHandler('move_to',current);
	})
	.on('move_next',function(){
		current += 1;
		if(current == size){
			current = 0;
		}
		wrap.triggerHandler('move_to',current);
	})
	.on('move_to',function(evt,index){
		wrap.css('left',(0-index)*width);
		current = index;
		tips.removeClass('item_focus').eq(index).addClass('item_focus');
	})
	.on('auto_move',function(){
		setInterval(function(){
			if(enableAuto){
				wrap.triggerHandler('move_next');
			}
		},3000);
	}).triggerHandler('auto_move');
	
	// 事件绑定
	btn_prev.on('click',function(){
		wrap.triggerHandler('move_prev');	
	});
	btn_next.on('click',function(){
		wrap.triggerHandler('move_next');	
	});
	tips.on('click',function(){
		var index = $(this).index();
		wrap.triggerHandler('move_to',index);	
	});
}




$(function(){
	$('.ui-search').UiSearh();
});

$('.content-tab').UiTab('.caption > .item','.block > .item');
$('.content-tab').UiTab('.block-caption > .block-caption-item','.block-content > .block-wrap');
$('.nav').UiBackToTop();
$('.ui-slider').UiSlider();