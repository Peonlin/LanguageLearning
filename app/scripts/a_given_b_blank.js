;$(document).ready(function() {
  initial(); 
  addEvents();
  texture($('.next'),$('.myprogress'));
});
function initial(){
  $('.part').eq(0).addClass('active');
  $('.part:gt(0)').hide();
};
function addEvents(){
  $('.horn').click(function(){
    if($(this).hasClass('press')){
      $(this).removeClass('press');
      $(this).attr('src','../imgs/icon_sound.png'); 
    }
    else{
      $(this).addClass('press');
      $(this).attr('src','../imgs/icon_sound_press.png'); 
    }
  });
  $('.next').click(function(){
    $('.part').removeClass('active');
    $(this).parent().addClass('active');
    if($('.active').find('input[type=text]').val().length == 0)
      $('.active').find('.inputTip').css('display','block');
    else{
      if($(this).text() =='Answer'){
        showAnwser();
        $(this).text('Next');
      }
      else{
        showNextQestion();
        $(this).text('Answer');
      }
    }
  });
};

function showAnwser(){
  $('.active').find('.answers').show();
}
function showNextQestion(){
  var ob = $('.active');
  ob.hide();
  ob.next().show();
  if($('.part:last').hasClass('active')){
    $('.finish').show();
  }
  else{
    $('.progress .learn1:last').next().addClass('learn1');
  }
};
// button的背景纹理和coins的纹理
function texture(btns,coins){
  var image = 'url(../imgs/texture/Metal_texture_0' + myramdom(1,6) +'.jpg)'
  btns.css({
    'background-image':image,
    'color':'black',
    'font-weight':'bold'
  });  coins.find('.learn0').eq(0).addClass('learn1');
}
function myramdom(min,max){
  return min + Math.round(Math.random() * (max - min));
}
