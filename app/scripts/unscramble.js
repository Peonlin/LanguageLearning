$(function(){

  var pressed = 0;
  $('.horn').click(function(){
    if(pressed == 0){
      $(this).attr('src','../imgs/icon_sound_press.png');
      pressed = 1;
    }
    else{
      $(this).attr('src','../imgs/icon_sound.png');
      pressed = 0;
    }
  })
});