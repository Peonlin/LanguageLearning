$(function(){
  initial();
  nextClick();
});

// 初始化
function initial(){
  $('.part ').hide();
  $('.part:first').show();
  addActive($('.part:first'));
  showInputs();
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
    showChoice();
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
  var str = 'Answer: &nbsp&nbsp' + $('.active .answer').eq(0).text();
  for(var i=1;i<$('.active .answer').length;i++){
    str += '、 ' +$('.active .answer').eq(i).text();
  }
  $('.active .answer:first').html(str);
  $('.active .answer:first').show();
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

function showInputs(){
  for(var i=0;i<$('.part .plain').length;i++){
    var text = $('.part .plain').eq(i).text();
    text = text.replace(/\[f\]/g,"<input type='text'><span class='answer'>").replace(/\[-f\]/g,'</span>');
    $('.part .plain').eq(i).html(text);
    insertAnswer($('.part').eq(i));
  }
};
function showChoice(){
  //---------------------------------------------------------------------
  //--------------------------还未想好怎么做-----------------------------
  //----------------------------------------------------------------------
};
function insertAnswer(ob){
  var myanswer = ob.find('.answer').text();
  var length = ob.find('.scrambled .piece').length;
  var index = getRandomNum(0,length)
  if(index == length)
    $("<span class='piece'>"+ myanswer +"</span>").insertAfter(ob.find('.scrambled .piece').eq(index-1));
  else
  $("<span class='piece'>"+ myanswer +"</span>").insertBefore(ob.find('.scrambled .piece').eq(index));
}
function addActive(ob){
  $('.part').removeClass('active');
  ob.addClass('active');
};
function addFocus(ob){
  $('.part input').removeClass('focus');
  ob.addClass('focus');
};
function getRandomNum(Min,Max){
  var Range = Max - Min;
  var Rand = Math.random();
  return(Min + Math.round(Rand * Range));
};