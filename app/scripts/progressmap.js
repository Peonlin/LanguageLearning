$(document).ready(function() {
    $('.leftli.learned').click(function(){
        $('.leftli.active').removeClass('active');
        $('.right.active').removeClass('active');
        $(this).addClass('active');
        $('.right').eq($(this).index()).addClass('active');
    })
});