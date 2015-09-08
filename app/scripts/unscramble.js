$(function(){
  initial();
  addPlay();
  nextClick();
});

// 初始化
function initial(){
  $('.part ').css('display','none');
  $('.part:first').css('display','block');
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
      }
    }
  });
}