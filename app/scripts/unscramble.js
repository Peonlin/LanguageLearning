$(function(){
  initial();
  addPlay();
  nextClick();
});

// 初始化
function initial(){
  $('.part ').css('display','none');
  $('.part:first').css('display','block');
  for(var i=0;i<$('.part').length;i++){
    randomOrder($('.part').eq(i).find('.scrambled .piece'));
  }
  texture($('#next'),$('.myprogress'));
  $('.scrambled .piece').click(function(){
    var inputText = $('.part:visible input').val()
    var text = $(this).text();
    $('.part:visible input').val( inputText + ' ' +$(this).text());
  });
}

// 播放MP3文件
function addPlay(){

  //0表示未播放状态，1表示播放状态
  var play = 0;

  $('.text').click(function(){
    if(play == 0){
      play = 1;
      soundPlaying($(this).find('img'));
    }
    //播放录音中间，停止播放
    // else{
    //   stopSound($(this).find('img'));
    //   play = 0;
    // }
  });


  function soundPlaying(ob){
    ob.attr('src','../imgs/icon_sound_press.png');

    soundManager.setup({
      onready : function(){
        var mysound = soundManager.createSound({
          id: 'sound1',
          url:'../audio/F1_0000.mp3', // 按照服务器返回的mp3文件路径
          autoLoad : true,
        });

        mysound.stop();

        mysound.play({
           // start position
          from: 17,                  //按照服务器返回的开始时间
          // end position
          to: 670,                   // 安装服务器返回的结束时间
          onstop: function() {
            soundManager._writeDebug('sound stopped at position ' + this.position);
            play=0;                    //把mp3播放状态改回为停止
            stopSound(ob);             //把喇叭改为未播放状态
            // note that the "to" target may be over-shot by 200+ msec, depending on polling and other factors.
          }
        });
      }
    });
  }
  function stopSound(ob){
    ob.attr('src','../imgs/icon_sound.png');
  }
}
function nextClick(){
  var length = $('.part').length;
  var index = 0;
  $('#next').click(function(){
    if(index >= length-1){
      $('#next').css('display','none');
      $('.part').css('display','none');
      $('.finish').css('display','block');
    }
    else{
      //如果还未输入
      var part = $('.part').eq(index);
      if(part.find('input').val().length == 0){
        part.find('.inputTip').css('display','block');
      }
      else{
        index++;
        $('.part').css('display','none');
        $('.part').eq(index).css('display','block');
        $('.myprogress .learn1:last').next().addClass('learn1');
      }
    }
  });
}
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

