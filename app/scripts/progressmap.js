$(document).ready(function() {
    // 初始化数据
    // tour 和 unit是从1开始计数，而不是从0开始的。
    var tour = 5;
    var unit = 14;
    for(var i=1;i<=18;i++){
    	var ob = $('#right').append('<div class="right"></div>');
    	for(var j =1 ;j<=20;j++){
    		if(i<=tour && j<=unit)
	    		$('#right .right').eq(i-1).append('<a href = begin_lesson?tour='+ i +'&unit='+ j +' class = "rightli learned">Unit '+ i+'_'+j +'</a>');
	    	else
	    		$('#right .right').eq(i-1).append('<a class = "rightli tolearn">Unit '+ i+'_'+j +'</a>');
    	}
    }
    // 因为数据是从1开始计数，减1变成从0开始计数
    tour -- ;
    unit --;
    $('#left .leftli:lt('+tour+')').addClass('learned');
    $('#left .leftli:eq(' + tour +')').addClass('learned active');
    $('#left .leftli:gt('+tour+')').addClass('tolearn');
    $('#right .right').eq(tour).addClass('active');
    $('#right .right.active .rightli:eq(' + unit +')').addClass('learned active');

    // 添加事件

    $('.leftli.learned').click(function(){
        $('.leftli.active').removeClass('active');
        $('.right.active').removeClass('active');
        $(this).addClass('active');
        $('.right').eq($(this).index()).addClass('active');
    });
});
