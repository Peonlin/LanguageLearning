$(document).ready(function() {

  $('.part').eq(0).addClass('active');
  
  $('#next').click(function(){
    var index = $('.active').index();
    if(index < $('.part').length-1){
      $('.active').removeClass('active');
      $('.part').eq(index +1 ).addClass('active');
      $('.learned span').text(parseInt($('.learned span').eq(0).text()) + 1)
    }
  });
  $('#previous').click(function(){
    var index = $('.active').index();
    if(index > 0){
      $('.active').removeClass('active');
      $('.part').eq(index -1 ).addClass('active');
    }
  });
  (function imgLayout(){
    for(var i=0;i<$('.part').length;i++){
      var ob = $('.part').eq(i).find('.picture');
      var len = ob.length;
      if(len<4){
        var row = len;
      }
      else if(len>=4)
        var row = Math.ceil(len/2);
      var temp = (100-4*row )/row;
      ob.css({
        'max-width':temp+'%',
        'margin':'0 2% 20px 2%'
      });
    }
  })();
});