function random(min,max) {
    return Math.random()*(max-min)+min;
}

function floatInit(){
    //滚动下至上渐入
    var s = [];
    var t = [];
    var isComplete = [];
    var isfinished = [];
    var animate_type = [];
    var wH = window.innerHeight;
    var el_arr = [];
    var el_len = $('.animate_el').length;
    var img_arr_num = 0;
    var ss = $(window).scrollTop();
    var first_i;
    ss = parseInt(ss);
    for(var i = 0;i<el_len;i++) {
        s[i] = $('.animate_el').eq(i).offset().top - wH;
        if ($('.animate_el').eq(i).attr('animate_type')) {
        	animate_type[i] = $('.animate_el').eq(i).attr('animate_type');
        } else {
        	animate_type[i] = ''
        	var dur = random(0.6,1.4);
        	t[i] = dur;
        }
        var img_arr = $('.animate_el').eq(i).find('img');
        if (img_arr.length>0) {
            img_arr_num++;
        } else {
        	isComplete[i] = true
        }

        var complete_num = 0;
        for (var j = 0; j < img_arr.length; j++) {
            if (img_arr[j].complete) {
                complete_num++;
                if (complete_num == img_arr.length) {
                    isComplete[i] = true;                               
                    break;
                }
            }
        }

        if(ss>=s[i] && !isfinished[i]){
        	if (isComplete[i]) {
        		isfinished[i] = true;
        	}
        	if (!animate_type[i] || animate_type[i] == '') {
	            $('.animate_el').eq(i).css({
	                'animation-name':'upAnimate2',
	                'animation-delay':'0s',
	                'animation-duration':t[i]+'s',
	                'animation-iteration-count':1,
	                'animation-direction':false
	            });
	        } else if (animate_type[i] == 'rightsides' || animate_type[i] == 'leftsides') {
	        	$('.animate_el').eq(i).css({
	        		'animation-name':animate_type[i],
	                'animation-delay':'0s',
	                'animation-duration':'1s',
	                'animation-iteration-count':1,
	                'animation-direction':false
	            })
	        } else if (animate_type[i] == 'floatleft') {
	        	if (first_i == undefined) {
	        		first_i = i;
	        	}
	        	$('.animate_el').eq(i).css({
	        		'transform': 'translateX(0)',
	        		'transition': '1s',
	        		'transition-delay': (i - first_i) * 0.2 + 's'
	            })
	        	$('.animate_el').eq(i).find('img').css({
	        		'transform': 'translateX(0)',
	        		'transition': '1s',
	        		'transition-delay': 1 + (i - first_i) * 0.2 + 's'
	           })
	        } else if (animate_type[i] == 'floatdown') {
	        	if (first_i == undefined) {
	        		first_i = i;
	        	}
	        	$('.animate_el').eq(i).css({
	        		'transform': 'translateY(0)',
	        		'transition': '1.5s',
	        		'transition-delay': (i - first_i) * 0.5 + 's'
	            })
	        }
        }
    }

    $(window).bind('scroll',function () {
        ss = $(window).scrollTop();
        ss = parseInt(ss);
        var s_top;
        var first_i;
        for(var i = 0;i<el_len;i++){
            if (img_arr_num != isComplete.length ) {
                s[i] = $('.animate_el').eq(i).offset().top - wH;
                // 判断是否加载完成
                if (!isComplete[i]) {
                    // var dur = random(0.6,1.4);
                    // t[i] = dur;
                    var img_arr = $('.animate_el').eq(i).find('img');
                    var complete_num = 0;
                    for (var j = 0; j < img_arr.length; j++) {
                        if (img_arr[j].complete) {
                            complete_num++;
                            if (complete_num == img_arr.length) {
                                isComplete[i] = true;                               
                                break;
                            }
                        }
                    }
                }
            }

            if(ss>=s[i] && !isfinished[i]){
            	if (isComplete[i]) {
	        		isfinished[i] = true;
	        	}
            	
            	if (!animate_type[i] || animate_type[i] == '') {
	                $('.animate_el').eq(i).css({
	                    'animation-name':'upAnimate2',
	                    'animation-delay':'0s',
	                    'animation-duration':t[i]+'s',
	                    'animation-iteration-count':1,
	                    'animation-direction':false
	                })
	            } else if (animate_type[i] == 'rightsides' || animate_type[i] == 'leftsides') {
		        	$('.animate_el').eq(i).css({
		        		'animation-name': animate_type[i],
		                'animation-delay':'0s',
		                'animation-duration':'1s',
		                'animation-iteration-count':1,
		                'animation-direction':false
		            })
		        } else if (animate_type[i] == 'floatleft') {
		        	if (first_i == undefined) {
		        		first_i = i;
		        	}
		        	$('.animate_el').eq(i).css({
		        		'transform': 'translateX(0)',
		        		'transition': '1s',
		        		'transition-delay': (i - first_i) * 0.2 + 's'
		            })
		        	$('.animate_el').eq(i).find('img').css({
		        		'transform': 'translateX(0)',
		        		'transition': '1s',
		        		'transition-delay': 1 + (i - first_i) * 0.2 + 's'
		            })
		        }  else if (animate_type[i] == 'floatdown') {
		        	if (first_i == undefined) {
		        		first_i = i;
		        	}
		        	$('.animate_el').eq(i).css({
		        		'transform': 'translateY(0)',
		        		'transition': '1.5s',
		        		'transition-delay': (i - first_i) * 0.5 + 's'
		            })
		        }
            }
        }
    });
}
$(function() {
	floatInit()
})
