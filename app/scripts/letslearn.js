$(document).ready(function() {
	$('body').click(function(){
		$('.options:visible').slideUp('200');
	});
	$('.myselect').click(function(){
		$('.options:visible').slideUp('200');
		$(this).find('.options').slideDown('200');
		return false;
	});
	$('.option').click(function(){
		$(this).parents('.myselect').find('.selected').text($(this).text());
		$('.options:visible').slideUp('200');
		return false;
	});
	$('.btn.start').click(function(){
		$('.part').eq(0).fadeOut(1500);
		$('.part').eq(1).fadeIn(1500);
	});
	$('#learn').click(function(){
		var flag = true;
		for(var i=0;i<$('.myselect').length;i++){
			if($('.myselect').eq(i).find('.selected').text()==''){
				$('.myselect').eq(i).find('.options').slideDown('200');
				flag = false;
				return false;
			}
		}
		if(flag){
			// $.ajax({
			// 	url: 'xx',
			// 	type: 'post',
			// 	data: {
			// 		learn: $('#myselect1 .selected').text(),
			// 		mather:$('#myselect2 .selected').text(),
			// 		gender:$('#myselect3 .selected').text()
			// 	}
			// })
			// .fail(function() {
			// 	location.reload();
			// })

			// 这个用于测试
			window.location.href = 'progressmap';

		}
	})
});