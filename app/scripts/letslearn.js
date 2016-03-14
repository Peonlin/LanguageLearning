$(document).ready(function() {
	$('body').click(function(){
		$('.options:visible').slideUp('200');
	});
	$('.select').click(function(){
		$('.options:visible').slideUp('200');
		$(this).find('.options').slideDown('200');
		return false;
	});
	$('.option').click(function(){
		$(this).parents('.select').find('.selected').text($(this).text());
		$('.options:visible').slideUp('200');
		return false;
	});
	$('.btn.start').click(function(){
		$('.part').eq(0).fadeOut(1500);
		$('.part').eq(1).fadeIn(1500);
		console.log('adf');
	});
	$('#learn').click(function(){
		var flag = true;
		for(var i=0;i<$('.select').length;i++){
			if($('.select').eq(i).find('.selected').text()==''){
				$('.select').eq(i).find('.options').slideDown('200');
				flag = false;
				return false;
			}
		}
		if(flag){
			$.ajax({
				url: 'xx',
				type: 'post',
				data: {
					learn: $('#myselect1 .selected').text(),
					mather:$('#myselect2 .selected').text(),
					gender:$('#myselect3 .selected').text()
				}
			})
			.fail(function() {
				location.reload();
			})
		}
	})
});