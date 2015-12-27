$(function(){
  initial();
  nextClick();
});

// 初始化
function initial(){
  $('.part ').hide();
  $('.part:first').show();
  addActive($('.part:first'));
  addFocus($('.part:first').find('input').eq(0));
  $('.plain').click(function(){
    if($(this).parent().find('.horn').hasClass('press')){
      $(this).parent().find('.horn').removeClass('press');
      $(this).parent().find('.horn').attr('src','../imgs/icon_sound.png'); 
    }
    else{
      $(this).parent().find('.horn').addClass('press');
      $(this).parent().find('.horn').attr('src','../imgs/icon_sound_press.png'); 
    }
  });
  $('.part input').focus(function(){
    addFocus($(this));
  });
  $('.scrambled .piece').click(function(){
    $('.active input.focus').val($(this).text());
  });
}

function nextClick(){
  var length = $('.part').length;
  var index = 0;
  $('#next').click(function(){
    if(!inputIsEdited())
      showInputTip();
    else{
      if($(this).text() =='Answer'){
        showAnswer();
        $(this).text('Next');
      }
      else{
        showNextQestion();
        $(this).text('Answer');
      }
    }
  });
};
function inputIsEdited(){
  for(var i=0;i<$('.active input').length;i++){
    if($('.active input').eq(i).val().length == 0)
      return false;
  }
  return true;
}
function showAnswer(){
  $('.active .desired').show();
};
function showInputTip(){
  $('.active').find('.inputTip').show();
  setTimeout(function(){
    $('.active').find('.inputTip').hide();
  },3000);
};
function showNextQestion(){
  var ob = $('.active');
  var next = $('.active').next();
  ob.hide();
  if($('.part:last').hasClass('active')){
    $('.finish').show();
  }
  else{
    next.show();
    addActive(next);
    addFocus(next.find('input').eq(0));
  }
};

function addActive(ob){
  $('.part').removeClass('active');
  ob.addClass('active');
};
function addFocus(ob){
  $('.part input').removeClass('focus');
  ob.addClass('focus');
};