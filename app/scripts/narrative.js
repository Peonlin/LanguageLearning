$(document).ready(function() {

  $('.part').eq(0).addClass('active');
  texture($('.btn'),$('.myprogress'));

  $('#next').click(function(){
    var index = $('.active').index();
    if(index < $('.part').length-1){
      $('.active').removeClass('active');
      $('.part').eq(index +1 ).addClass('active');
      $('.learned span').text(parseInt($('.learned span').eq(0).text()) + 1)
      $('.myprogress .learn1:last').next().addClass('learn1');
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
      var temp = (100-2*row )/row;
      ob.css({
        'max-width':temp+'%',
        'margin':'0 1% 20px 1%'
      });
    }
  })();

  // button的背景纹理和coins的纹理
  function texture(btns,coins){
    var image = 'url(../imgs/texture/Metal_texture_0' + myramdom(1,6) +'.jpg)'
    btns.css({
      'background-image':image,
      'color':'black',
      'font-weight':'bold'
    });
    coins.find('.learn0').eq(0).addClass('learn1');
  }
  function myramdom(min,max){
    return min + Math.round(Math.random() * (max - min));
  }
});