$(document).ready(function() {
    // 初始化数据
    for(var i=0;i<19;i++){
    	var ob = $('#right .right').eq(0).clone(true);
    	ob.insertAfter($('#right .right:last'));
    }
    var tour = 2;
    var unit = 5;
    $('#left .leftli:lt('+tour+')').addClass('learned');
    $('#left .leftli:eq(' + tour +')').addClass('learned active');
    $('#left .leftli:gt('+tour+')').addClass('tolearn');
    $('#right .right').eq(tour).addClass('active');
    $('#right .right:lt( '+tour+' ) .rightli').removeClass('tolearn').addClass('learned');
    $('#right .right.active .rightli:lt('+unit+')').removeClass('tolearn').addClass('learned');
    $('#right .right.active .rightli:eq(' + unit +')').addClass('learned active');

    // 添加事件

    $('.leftli.learned').click(function(){
        $('.leftli.active').removeClass('active');
        $('.right.active').removeClass('active');
        $(this).addClass('active');
        $('.right').eq($(this).index()).addClass('active');
    });
});
