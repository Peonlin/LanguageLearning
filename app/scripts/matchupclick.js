$(function(){
  initial();
  nextClick();
  texture($('#next'),$('.myprogress'));
});

// 初始化
function initial(){
  $('.part ').hide();
  $('.part:first').show();
  addActive($('.part:first'));
  addFocus($('.part:first').find('input').eq(0));
  for(var i=0;i<$('.part').length;i++){
    randomOrder($('.part').eq(i).find('.scrambled .piece'));
  }
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
    var inputText = $('.active input.focus').val()
    var text = $(this).text();
    $('.active input.focus').val( inputText + ' ' +$(this).text());
  });
}

function nextClick(){
  var length = $('.part').length;
  var index = 0;
  $('#next').click(function(){
    if($(this).hasClass('last'))
      sendAnswerAjax();
    if(!inputIsEdited())
      showInputTip();
    else{
      if($(this).text() =='Answer'){
        showAnswer();
        $(this).text('Next');
      }
      else{
        showNextQestion();
        $('.myprogress .learn1:last').next().addClass('learn1');
        $(this).text('Answer');
      }
    }
  });
};
function sendAnswerAjax(){
  $.ajax({
    url: 'nextType',
    type: 'post',
    data: getAnswers(),
  })
  .done(function(url){
    window.location.href = url;
  })
  .fail(function() {
    alert('刷新失败，请重试！');
  })
}
function getAnswers(){
  var data = {};
  // 当前所学习的语言、tour、unit、题目类型
  // 比如http://localhost:3000/A_GIVEN_B_CLOZE%EF%BC%9Flanguage=en&tour=1&unit=2
  data.type = window.location.pathname.substr(1);
  var search = window.location.search.substr(1).split(/[\=\&]/g);
  data.language = search[1];
  data.tour = search[3];
  data.unit = search[5];
  // 每道题的答案信息，题目id、答案
  data.answers = [];
  for(var i=0;i<$('.part').length;i++){
    var temp = {};
    temp._id = $('.part').eq(i).find('.num').attr('table_id');
    temp.answer = $('.part').eq(i).find('input').val();
    data.answers.push(temp);
  }
  return data;
}
function inputIsEdited(){
  for(var i=0;i<$('.active input').length;i++){
    if($('.active input').eq(i).val().length == 0)
      return false;
  }
  return true;
}
function showAnswer(){
  $('.active .desired').show();
  if($('.part:last').hasClass('active')){
    $('#next').addClass('last');
  }
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
  next.show();
  addActive(next);
  addFocus(next.find('input').eq(0));
};

function addActive(ob){
  $('.part').removeClass('active');
  ob.addClass('active');
};
function addFocus(ob){
  $('.part input').removeClass('focus');
  ob.addClass('focus');
};
// 打乱顺序
function randomOrder(ob){
  if(ob.length == 0)
    return;
  var ramdom = shuffle(ob.clone(true));
  for(var i=0;i<ob.length;i++){
    ob.eq(i).html(ramdom.eq(i).html());
  }
};
// 乱序函数
function shuffle(o){ //v1.0
  for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};
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
