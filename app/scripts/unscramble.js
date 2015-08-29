$(function(){

  var play = 0;
  $('.horn').click(function(){
    if(play == 0){
      soundPlaying($(this));
      play = 1;
    }
    else{
      soundStop($(this));
      play = 0;
    }
  });

  console.log(audios[0].text);

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
            soundStop(ob);
            // note that the "to" target may be over-shot by 200+ msec, depending on polling and other factors.
          }
        })
      }
    })
  }
  function soundStop(ob){
    ob.attr('src','../imgs/icon_sound.png');
  }
});